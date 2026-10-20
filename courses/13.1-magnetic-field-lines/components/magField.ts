/**
 * 13.1 磁场 磁感线 —— 磁感线公用场模型
 *
 * 用「多个磁极」的点磁极模型：N 极 s = +1、S 极 s = −1 B(r) = Σ s_i · (r − r_i) / |r − r_i|³
 * 只取方向（大小为任意标度），因此这一节的铁屑、小磁针、磁感线、两磁铁靠近、 矢量叠加全部共用同一套方向，屏幕上不会出现互相矛盾的两张图。
 * 注意：点磁极模型只在磁体外部有意义；磁体内部那一段一律当「示意」另画。
 */

export interface Pole {
  x: number;
  y: number;
  /** +1 = N 极，−1 = S 极 */
  s: number;
}

export interface Line {
  points: [number, number][];
  d: string;
  /** 是否在 S 极附近自然收尾（false = 走到 bounds 被裁断，端点会是硬切口） */
  closed?: boolean;
}

export interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

const MIN_R3 = 1e-3;

export const fieldAt = (
  x: number,
  y: number,
  poles: readonly Pole[],
): readonly [number, number] => {
  let bx = 0;
  let by = 0;
  for (const p of poles) {
    const dx = x - p.x;
    const dy = y - p.y;
    const r3 = Math.max(Math.hypot(dx, dy) ** 3, MIN_R3);
    bx += (p.s * dx) / r3;
    by += (p.s * dy) / r3;
  }

  return [bx, by] as const;
};

/**
 * 该点磁场方向角（屏幕坐标，弧度）
 *
 * @param x 屏幕坐标 x
 * @param y 屏幕坐标 y
 * @param poles 磁极列表
 * @returns 方向角（弧度）
 */
export const fieldAngle = (x: number, y: number, poles: readonly Pole[]): number => {
  const [bx, by] = fieldAt(x, y, poles);
  return Math.atan2(by, bx);
};

/**
 * 条形磁体（N 在 +x 端）：返回两个磁极
 *
 * @param cx 磁体中心 x
 * @param cy 磁体中心 y
 * @param halfLength 磁体半长
 * @returns N、S 两个磁极
 */
export const barPoles = (cx: number, cy: number, halfLength: number): Pole[] => [
  { x: cx + halfLength, y: cy, s: 1 },
  { x: cx - halfLength, y: cy, s: -1 },
];

const toPath = (points: readonly [number, number][]): string =>
  points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

/**
 * 从 N 极附近的起点沿磁场方向积分一条磁感线（RK4，步长 h）。 进入任一 S 极附近或走出 bounds 即停；太短的线丢掉。
 *
 * @param start 起点坐标
 * @param poles 磁极列表
 * @param bounds 画布边界，走出即停
 * @param opts 步长、最大步数与收尾半径
 * @returns 折线；步数不足 8 时返回 null
 */
export const traceLine = (
  start: readonly [number, number],
  poles: readonly Pole[],
  bounds: Bounds,
  opts: { h?: number; maxSteps?: number; stopRadius?: number } = {},
): Line | null => {
  const h = opts.h ?? 3;
  const maxSteps = opts.maxSteps ?? 1200;
  const stopRadius = opts.stopRadius ?? 14;
  let [x, y] = start;
  const points: [number, number][] = [[x, y]];
  const step = (px: number, py: number): readonly [number, number] => {
    const [bx, by] = fieldAt(px, py, poles);
    const m = Math.hypot(bx, by);
    return m < 1e-12 ? [0, 0] : [bx / m, by / m];
  };
  // 是否已走到任一 S 极附近（走到即收尾）
  const reachesS = (px: number, py: number): boolean =>
    poles.some((p) => p.s === -1 && Math.hypot(px - p.x, py - p.y) < stopRadius);
  let closed = false;
  for (let i = 0; i < maxSteps; i += 1) {
    // 自适应步长：靠近磁极时场变化剧烈，固定步长会在极附近走出小折角
    let dmin = Number.POSITIVE_INFINITY;
    for (const p of poles) dmin = Math.min(dmin, Math.hypot(x - p.x, y - p.y));
    const hs = Math.min(h, 0.3 * dmin + 0.8);
    const k1 = step(x, y);
    const k2 = step(x + (hs / 2) * k1[0], y + (hs / 2) * k1[1]);
    const k3 = step(x + (hs / 2) * k2[0], y + (hs / 2) * k2[1]);
    const k4 = step(x + hs * k3[0], y + hs * k3[1]);
    x += (hs / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (hs / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    if (x < bounds.x || x > bounds.x + bounds.w || y < bounds.y || y > bounds.y + bounds.h) break;
    points.push([x, y]);
    if (i > 4 && reachesS(x, y)) {
      closed = true;
      break;
    }
  }

  return points.length < 8 ? null : { points, d: toPath(points), closed };
};

/**
 * 在一条线的若干比例处取箭头（返回位置、方向角、三角形 path）
 *
 * @param line 磁感线
 * @param fractions 取箭头的比例位置（0–1）
 * @param size 箭头大小
 * @returns 每个箭头的位置与三角形 path
 */
export const arrowsAlong = (
  line: Line,
  fractions: readonly number[],
  size = 7,
): { x: number; y: number; d: string }[] => {
  const n = line.points.length;
  return fractions.map((f) => {
    const i = Math.max(1, Math.min(n - 2, Math.round(f * (n - 1))));
    const [x, y] = line.points[i];
    const [px, py] = line.points[i - 1];
    const [nx, ny] = line.points[i + 1];
    const ang = Math.atan2(ny - py, nx - px);
    const back = Math.atan2(py - ny, px - nx);
    const tipX = x + size * Math.cos(ang);
    const tipY = y + size * Math.sin(ang);
    const lx = x + size * 0.9 * Math.cos(back + Math.PI / 6);
    const ly = y + size * 0.9 * Math.sin(back + Math.PI / 6);
    const rx = x + size * 0.9 * Math.cos(back - Math.PI / 6);
    const ry = y + size * 0.9 * Math.sin(back - Math.PI / 6);
    return {
      x,
      y,
      d: `M ${lx.toFixed(1)} ${ly.toFixed(1)} L ${tipX.toFixed(1)} ${tipY.toFixed(1)} L ${rx.toFixed(1)} ${ry.toFixed(1)} Z`,
    };
  });
};

/**
 * 沿 N 极周围取一圈起点（角度单位：度，0° 指向屏幕右侧，顺时针为正）
 *
 * @param pole 目标磁极
 * @param radius 起点圈的半径
 * @param anglesDeg 角度列表（度）
 * @returns 起点坐标列表
 */
export const seedsAround = (
  pole: Pole,
  radius: number,
  anglesDeg: readonly number[],
): [number, number][] =>
  anglesDeg.map((a) => {
    const r = (a * Math.PI) / 180;
    return [pole.x + radius * Math.cos(r), pole.y + radius * Math.sin(r)] as [number, number];
  });

/**
 * 点在某个磁体矩形内（用于避开磁体、跳过内部起点）
 *
 * @param x 点 x
 * @param y 点 y
 * @param box 矩形
 * @returns 是否落在矩形内（边界算外）
 */
export const inBox = (
  x: number,
  y: number,
  box: { x: number; y: number; w: number; h: number },
): boolean => x > box.x && x < box.x + box.w && y > box.y && y < box.y + box.h;

/**
 * 纵向压缩：点磁极模型算出的磁感线回路在竖向上张得很开（±240 用户单位）， 而一页里给图的高度只有 300 左右。这里把整幅图沿竖直方向按 k 压扁（以 cy 为中心），
 * 磁感线、箭头、小磁针转角都用同一个 k，画出来的切向与曲线仍然自洽。
 *
 * @param y 原始 y
 * @param cy 压缩中心
 * @param k 压缩比
 * @returns 压缩后的 y
 */
export const squashY = (y: number, cy: number, k: number): number => cy + (y - cy) * k;

/**
 * 压缩后的磁场方向角（先压 y 分量再取角）
 *
 * @param x 屏幕 x
 * @param y 屏幕 y
 * @param poles 磁极列表
 * @param opts 压缩中心 cy 与压缩比 k
 * @returns 方向角（弧度）
 */
export const squashedAngle = (
  x: number,
  y: number,
  poles: readonly Pole[],
  opts: { cy: number; k: number },
): number => {
  const [bx, by] = fieldAt(x, y, poles);
  return Math.atan2(by * opts.k, bx);
};

/**
 * 把一条线沿竖直方向压扁（cy 为中心、k 为压缩比）
 *
 * @param line 原始折线
 * @param cy 压缩中心
 * @param k 压缩比
 * @returns 压缩后的折线
 */
export const squashLine = (line: Line, cy: number, k: number): Line => {
  const points = line.points.map(([x, y]) => [x, squashY(y, cy, k)] as [number, number]);
  const d = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  return { points, d };
};
