/** EmWaveChain 的三维场景几何构建：透视投影 + 半波波瓣 / 场强矢量 / 传播轴绘制列表。 纯函数实现，相位、展开长度与磁场透明度全部由调用方传入，便于单独阅读与调整。 */

export const TOTAL_LEN = 600;
export const LAMBDA = 224; // 波长（world units），约 2.68 个完整周期
export const K_WAVE = (2 * Math.PI) / LAMBDA;
export const A_E = 78; // 电场 E 振幅（竖直 y）
export const A_B = 72; // 磁场 B 振幅（水平纵深 z）

const FOV = 2200;
const CX = 450;
const CY = 166;
const X_MID = 285;

const AXIS_SEG_COUNT = 10; // 传播轴分段数（参与画家算法排序）
const ARROW_SPACING = 28; // 每波长 8 根场强矢量箭头
const ARROW_MIN_LEN = 5; // 投影后太短（几乎正对镜头）的箭头不画
const LOBE_MIN_SPAN = 1.5; // 过零点之间太窄的碎瓣不画

export interface ProjectedPoint {
  x: number;
  y: number;
  z: number; // 摄像机深度（越大越靠前）
  scale: number;
}

export type Projector = (wx: number, wy: number, wz: number) => ProjectedPoint;

export type RenderPrimitive =
  | {
      kind: "lobe";
      key: string;
      depth: number;
      field: "E" | "B";
      fillPath: string;
      strokePath: string;
      opacity: number;
    }
  | {
      kind: "arrow";
      key: string;
      depth: number;
      field: "E" | "B";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      headPoints: string;
      opacity: number;
      strokeWidth: number;
    }
  | {
      kind: "axis-seg";
      key: string;
      depth: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      isTip: boolean;
      headPoints?: string;
    };

// 把 yaw / pitch 的三角函数预算一次，返回逐点投影函数
export const createProjector = (yaw: number, pitch: number): Projector => {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  return (wx, wy, wz) => {
    const px = wx - X_MID;

    // 绕 Y 轴旋转 (yaw)
    const x1 = px * cy + wz * sy;
    const z1 = -px * sy + wz * cy;
    // 绕 X 轴旋转 (pitch)
    const y2 = wy * cp - z1 * sp;
    const z2 = wy * sp + z1 * cp;

    const scale = FOV / (FOV - z2);
    return { x: CX + x1 * scale, y: CY - y2 * scale, z: z2, scale };
  };
};

// 平滑前缘包络：步进前沿尾部 42 单位内优雅收敛
const envelope = (wx: number, reachLen: number): number => {
  if (reachLen <= 1) return 0;
  const taper = 42;
  if (wx <= reachLen - taper) return 1;
  if (wx >= reachLen) return 0;
  const u = (reachLen - wx) / taper;
  return u * u * (3 - 2 * u);
};

interface ArrowStyle {
  headLen: number;
  headW: number;
  stemFactor: number;
}

interface ArrowGeometry {
  x2: number;
  y2: number;
  headPoints: string;
}

// 由起点、尖端算出线条回退后的终点与三角箭头顶点（尖端严格落在 tip 上）
const arrowGeometry = (
  base: ProjectedPoint,
  tip: ProjectedPoint,
  { headLen, headW, stemFactor }: ArrowStyle,
): ArrowGeometry => {
  const dx = tip.x - base.x;
  const dy = tip.y - base.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const tipX = tip.x.toFixed(1);
  const tipY = tip.y.toFixed(1);
  const leftX = (tip.x - ux * headLen + nx * headW).toFixed(1);
  const leftY = (tip.y - uy * headLen + ny * headW).toFixed(1);
  const rightX = (tip.x - ux * headLen - nx * headW).toFixed(1);
  const rightY = (tip.y - uy * headLen - ny * headW).toFixed(1);

  return {
    x2: tip.x - ux * (headLen * stemFactor),
    y2: tip.y - uy * (headLen * stemFactor),
    headPoints: `${tipX},${tipY} ${leftX},${leftY} ${rightX},${rightY}`,
  };
};

const buildAxisSegments = (
  reachLen: number,
  isPropagating: boolean,
  project: Projector,
): RenderPrimitive[] => {
  const items: RenderPrimitive[] = [];
  const axisExt = reachLen + (isPropagating ? 36 : 12);

  for (let i = 0; i < AXIS_SEG_COUNT; i += 1) {
    const xA = (i / AXIS_SEG_COUNT) * axisExt;
    const xB = ((i + 1) / AXIS_SEG_COUNT) * axisExt;
    const pA = project(xA, 0, 0);
    const pB = project(xB, 0, 0);
    const isTip = i === AXIS_SEG_COUNT - 1;
    const geometry = isTip
      ? arrowGeometry(pA, pB, { headLen: 10, headW: 4.4, stemFactor: 0.6 })
      : null;

    items.push({
      kind: "axis-seg",
      key: `axis-${i}`,
      depth: (pA.z + pB.z) / 2,
      x1: pA.x,
      y1: pA.y,
      x2: geometry?.x2 ?? pB.x,
      y2: geometry?.y2 ?? pB.y,
      isTip,
      headPoints: geometry?.headPoints,
    });
  }

  return items;
};

// 过零点：K_WAVE * x - ph = m * PI  =>  x = (m * PI + ph) / K_WAVE
const lobeBreakpoints = (reachLen: number, ph: number): number[] => {
  const breakpoints = [0];
  const mMin = Math.floor(-ph / Math.PI) - 1;
  const mMax = Math.ceil((K_WAVE * reachLen - ph) / Math.PI) + 1;

  for (let m = mMin; m <= mMax; m += 1) {
    const zx = (m * Math.PI + ph) / K_WAVE;
    if (zx > 0.8 && zx < reachLen - 0.8) breakpoints.push(zx);
  }

  breakpoints.push(reachLen);
  breakpoints.sort((a, b) => a - b);
  return breakpoints;
};

interface LobeSampleOptions {
  xStart: number;
  xEnd: number;
  reachLen: number;
  bAlpha: number;
  ph: number;
  project: Projector;
}

interface LobeSamples {
  ePts: ProjectedPoint[];
  basePts: ProjectedPoint[];
  bPts: ProjectedPoint[];
  avgX: number;
  avgE: number;
  avgB: number;
}

const sampleLobe = ({
  xStart,
  xEnd,
  reachLen,
  bAlpha,
  ph,
  project,
}: LobeSampleOptions): LobeSamples => {
  const samples = Math.max(8, Math.ceil((xEnd - xStart) / 6));
  const ePts: ProjectedPoint[] = [];
  const basePts: ProjectedPoint[] = [];
  const bPts: ProjectedPoint[] = [];
  let sumMidX = 0;
  let sumMidE = 0;
  let sumMidB = 0;

  for (let s = 0; s <= samples; s += 1) {
    const wx = xStart + ((xEnd - xStart) * s) / samples;
    const val = Math.sin(K_WAVE * wx - ph) * envelope(wx, reachLen);
    const ey = A_E * val;
    const bz = A_B * val * bAlpha;

    basePts.push(project(wx, 0, 0));
    ePts.push(project(wx, ey, 0));
    if (bAlpha > 0.02) bPts.push(project(wx, 0, bz));

    sumMidX += wx;
    sumMidE += ey;
    sumMidB += bz;
  }

  const count = samples + 1;
  return {
    ePts,
    basePts,
    bPts,
    avgX: sumMidX / count,
    avgE: sumMidE / count,
    avgB: sumMidB / count,
  };
};

const pathOf = (points: ProjectedPoint[]): string =>
  points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

const backPathOf = (points: ProjectedPoint[]): string =>
  [...points]
    .reverse()
    .map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

interface LobeOptions {
  reachLen: number;
  bAlpha: number;
  ph: number;
  project: Projector;
}

// 半波波瓣严格在过零点处切割，杜绝透视穿插接缝并保证前后遮挡绝对正确
const buildLobePrimitives = ({ reachLen, bAlpha, ph, project }: LobeOptions): RenderPrimitive[] => {
  const items: RenderPrimitive[] = [];
  const breakpoints = lobeBreakpoints(reachLen, ph);

  for (let idx = 0; idx < breakpoints.length - 1; idx += 1) {
    const xStart = breakpoints[idx];
    const xEnd = breakpoints[idx + 1];
    if (xEnd - xStart < LOBE_MIN_SPAN) continue;

    const { ePts, basePts, bPts, avgX, avgE, avgB } = sampleLobe({
      xStart,
      xEnd,
      reachLen,
      bAlpha,
      ph,
      project,
    });
    const back = backPathOf(basePts);
    const eCurve = pathOf(ePts);

    items.push({
      kind: "lobe",
      key: `elobe-${idx}`,
      depth: project(avgX, avgE * 0.55, 0).z,
      field: "E",
      fillPath: `${eCurve} ${back} Z`,
      strokePath: eCurve,
      opacity: 1,
    });

    if (bAlpha > 0.02 && bPts.length > 1) {
      const bCurve = pathOf(bPts);
      items.push({
        kind: "lobe",
        key: `blobe-${idx}`,
        depth: project(avgX, 0, avgB * 0.55).z,
        field: "B",
        fillPath: `${bCurve} ${back} Z`,
        strokePath: bCurve,
        opacity: bAlpha,
      });
    }
  }

  return items;
};

interface FieldArrowOptions {
  wx: number;
  sinVal: number;
  absSin: number;
  base: ProjectedPoint;
  project: Projector;
}

const buildEArrow = ({
  wx,
  sinVal,
  absSin,
  base,
  project,
}: FieldArrowOptions): RenderPrimitive | null => {
  const tip = project(wx, A_E * sinVal, 0);
  const len = Math.hypot(tip.x - base.x, tip.y - base.y);
  if (len <= ARROW_MIN_LEN) return null;

  const headLen = Math.min(7.4, len * 0.42);
  return {
    kind: "arrow",
    key: `ea-${wx}`,
    depth: project(wx, A_E * sinVal * 0.55, 0).z + 0.2,
    field: "E",
    x1: base.x,
    y1: base.y,
    ...arrowGeometry(base, tip, { headLen, headW: headLen * 0.46, stemFactor: 0.72 }),
    opacity: Math.min(1, absSin * 1.6) * 0.92,
    strokeWidth: 1.75 * tip.scale,
  };
};

interface BArrowOptions extends FieldArrowOptions {
  bAlpha: number;
}

const buildBArrow = ({
  wx,
  sinVal,
  absSin,
  base,
  project,
  bAlpha,
}: BArrowOptions): RenderPrimitive | null => {
  const bz = A_B * sinVal * bAlpha;
  const tip = project(wx, 0, bz);
  const len = Math.hypot(tip.x - base.x, tip.y - base.y);
  if (len <= ARROW_MIN_LEN) return null;

  const headLen = Math.min(7.2, len * 0.42);
  // 纵深方向明暗层次：前侧更锐利、后侧略微柔和
  const depthFade = bz >= 0 ? 0.96 : 0.78;
  return {
    kind: "arrow",
    key: `ba-${wx}`,
    depth: project(wx, 0, bz * 0.55).z + 0.2,
    field: "B",
    x1: base.x,
    y1: base.y,
    ...arrowGeometry(base, tip, { headLen, headW: headLen * 0.46, stemFactor: 0.72 }),
    opacity: Math.min(1, absSin * 1.6) * bAlpha * depthFade,
    strokeWidth: 1.75 * tip.scale,
  };
};

const buildFieldArrows = ({ reachLen, bAlpha, ph, project }: LobeOptions): RenderPrimitive[] => {
  const items: RenderPrimitive[] = [];

  for (let wx = ARROW_SPACING; wx <= reachLen - 6; wx += ARROW_SPACING) {
    const env = envelope(wx, reachLen);
    if (env < 0.08) continue;

    const sinVal = Math.sin(K_WAVE * wx - ph) * env;
    const absSin = Math.abs(sinVal);
    if (absSin < 0.09) continue;

    const base = project(wx, 0, 0);
    const fieldArrow = { wx, sinVal, absSin, base, project };

    const eArrow = buildEArrow(fieldArrow);
    if (eArrow) items.push(eArrow);

    if (bAlpha > 0.05) {
      const bArrow = buildBArrow({ ...fieldArrow, bAlpha });
      if (bArrow) items.push(bArrow);
    }
  }

  return items;
};

export interface SceneParams {
  reachLen: number;
  bAlpha: number;
  phase: number;
  step: number;
  project: Projector;
}

// 三维绘制列表，按摄像机深度从远到近排序（画家算法）
export const buildScenePrimitives = ({
  reachLen,
  bAlpha,
  phase,
  step,
  project,
}: SceneParams): RenderPrimitive[] => {
  if (reachLen <= 2) return [];

  const items = [
    ...buildAxisSegments(reachLen, step >= 4, project),
    ...buildLobePrimitives({ reachLen, bAlpha, ph: phase, project }),
    ...buildFieldArrows({ reachLen, bAlpha, ph: phase, project }),
  ];
  items.sort((a, b) => a.depth - b.depth);
  return items;
};
