<script setup lang="ts">
import { computed } from "vue";

/**
 * 第 20–23 页：竖直上抛全过程的**单幅**图像（一页一幅，由 `chart` 指定 a-t / v-t / x-t / v-x）。
 *
 * 正方向：**竖直向下为正**，位移原点取在抛出点（与第 18、19 页的约定一致）。 已知量只有抛出速度 v₀ 与重力加速度 g：**图上不出现任何数值**，刻度与关键点坐标一律写成
 * v₀/g、v₀²/(2g)、2v₀、g 这样的符号。
 *
 * 画图时把 v₀/g 当作 1 个时间单位、v₀²/(2g) 当作 1 个位移单位、v₀ 当作 1 个速度单位， 所以下面的数据坐标都是纯数（1 就代表 v₀/g 或
 * v₀²/(2g)），刻度文字再翻译回符号。
 *
 * 全过程：t = v₀/g 到最高点（x = −v₀²/(2g)）、t = 2v₀/g 回到抛出点，**此后继续落到抛出点以下**。 图线一律画到 t = 3v₀/g（此时 x =
 * 3v₀²/(2g)、v = 2v₀）——抛出点可以在地面以上很高的地方（比如十五楼的阳台）， "落到地面"并不由 v₀、g
 * 决定，所以四幅图只画到"明显落到抛出点以下"为止，并在这一段打上"抛出点以下"的底色。
 *
 * 纵轴方向：a-t、v-t、v-x 的正方向朝上（读图习惯）；**x-t 的纵轴朝下**——x 本身就是向下为正，
 * 这样画出来的图线正好是小球的真实轨迹形状（先升到顶点、再落回抛出点并继续落到抛出点以下）。
 *
 * 字体：SVG 里嵌不了 <Latex>，按项目规定用 KaTeX 字体——量用 KaTeX_Math 斜体、数字与单位用 KaTeX_Main 正体。
 *
 * 版面：viewBox 900 × 285（宽高比压扁一点，一页里还要挤下提问与落点）；本组件放在整页宽的 .fig-full 里， 渲染宽约 910px ⇒ 缩放 ≈ 1.0，所以轴字母
 * 24、刻度 16、图内标注 16 在屏幕上就是 ≈24px / ≈16px。
 */

/** 量（v、a、x、t、g…）：KaTeX_Math 斜体 */
const MATH = "KaTeX_Math";
/** 数字、运算符、单位：KaTeX_Main 正体 */
const MAIN = "KaTeX_Main";

/* ── 画布与绘图区（viewBox 用户单位；SVG 自成 16px 体系，不写单位、不用 rem） ── */
const VIEW = { w: 900, h: 285 };
const PAD = { left: 92, right: 40, top: 36, bottom: 44 };
const PLOT_WIDTH = VIEW.w - PAD.left - PAD.right;
const PLOT_HEIGHT = VIEW.h - PAD.top - PAD.bottom;

/** 图上字号（用户单位）：轴字母 24、单位 17、刻度 16、图内标注 16、原点 O 20 */
const AXIS_LETTER = 24;
const AXIS_UNIT = 17;
const TICK_SIZE = 16;
const MARK_SIZE = 16;
const ORIGIN_SIZE = 20;
/** 轴上刻度短线长度：紧贴轴、**向图内**伸 */
const TICK_LENGTH = 8;
/** 横轴刻度文字离轴的距离 */
const TICK_LABEL_GAP = 21;
/** Marker 三角形长（与 markerWidth 一致）：线段回退半个箭头长，尖端才正好落在轴端 */
const ARROW = 12;

/** 主曲线（暖金）、抛出（蓝）、回到抛出点及以下（青）、轴与刻度（灰） */
const CURVE = "#e2a846";
const RISE = "#60a5fa";
const FALL = "#2dd4bf";
const AXIS = "#64748b";
const TICK_COLOR = "#94a3b8";
/** 「抛出点以下」区域的底色（青，透明度极低；颜色里不能有空格，UnoCSS 会把数字当工具类） */
const BAND_FILL = "rgba(45,212,191,0.07)";

/**
 * 固定坐标范围（**图上没有数值，所以范围也写死**）：时间以 v₀/g 为单位、位移以 v₀²/(2g) 为单位、 速度以 v₀ 为单位、加速度以 g 为单位。范围端点比"最后一个刻度"多留
 * 5–10%，末端箭头才好看。
 */
const TIME_RANGE = { min: 0, max: 3.3 };
const ACCELERATION_RANGE = { min: 0, max: 1.4 };
const VELOCITY_RANGE = { min: -1.4, max: 2.4 };
/** X-t 的纵轴：−1 是最高点（v₀²/(2g) 在抛出点上方）、0 是抛出点、3 是画到的地方 */
const POSITION_RANGE = { min: -1.9, max: 3.6 };
/** V-x 的横轴：−1 是最高点所在位移、0 是抛出点、1.5 是画到的地方 */
const POSITION_AXIS_RANGE = { min: -1.4, max: 3.5 };

/**
 * 数值保留一位小数，避免 SVG 路径里出现一长串浮点数
 *
 * @param value 原始数值
 * @returns 四舍五入到 0.1 的数值
 */
const round1 = (value: number): number => Math.round(value * 10) / 10;

/**
 * 数据值 → 画布横坐标（绘图区内）
 *
 * @param value 数据值
 * @param xMin 横轴下限（固定值）
 * @param xMax 横轴上限（固定值）
 * @returns 画布横坐标
 */
const mapX = (value: number, xMin: number, xMax: number): number =>
  round1(PAD.left + ((value - xMin) / (xMax - xMin)) * PLOT_WIDTH);

/**
 * 数据值 → 画布纵坐标（**数值越大画得越高**，a-t / v-t / v-x 的纵轴都用它）
 *
 * @param value 数据值
 * @param yMin 纵轴下限（固定值）
 * @param yMax 纵轴上限（固定值）
 * @returns 画布纵坐标
 */
const mapY = (value: number, yMin: number, yMax: number): number =>
  round1(PAD.top + ((yMax - value) / (yMax - yMin)) * PLOT_HEIGHT);

/**
 * 数据值 → 画布纵坐标（**数值越大画得越低**）：给 x-t 的 x 轴用——x 向下为正，图线才是小球的真实轨迹形状
 *
 * @param value 数据值
 * @param min 纵轴下限（固定值，画在最上面）
 * @param max 纵轴上限（固定值，画在最下面）
 * @returns 画布纵坐标
 */
const mapDown = (value: number, min: number, max: number): number =>
  round1(PAD.top + ((value - min) / (max - min)) * PLOT_HEIGHT);

/**
 * 把线段终点沿反方向回退半个箭头长，让箭头尖端正好落在轴端（marker 的 refX 在三角形中心）
 *
 * @param x1 线段起点横坐标
 * @param y1 线段起点纵坐标
 * @param x2 线段终点横坐标
 * @param y2 线段终点纵坐标
 * @returns 回退后的线段终点坐标
 */
const shaftEnd = (x1: number, y1: number, x2: number, y2: number): { x: number; y: number } => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const back = ARROW / 2 / (Math.hypot(dx, dy) || 1);

  return { x: round1(x2 - dx * back), y: round1(y2 - dy * back) };
};

/** 一段文字：量与单位的字体不同，所以一段一段拼 */
interface Seg {
  /** 段落文字（首尾不带空格，需要间距用 dx） */
  text: string;
  /** 字体；不写就跟随正文（中文走这里） */
  font?: string;
  /** 段前额外间距（用户单位） */
  dx?: number;
  /** 上标：抬高并缩小 */
  sup?: boolean;
  /** 下标：压低并缩小 */
  sub?: boolean;
  /** 纵向位移（由 scripts 补出） */
  dy?: number;
  /** 该段字号；不写就跟随所在 text */
  size?: number;
}

/** 轴上刻度：数据值 + 画布坐标 + 显示内容（全符号，如 v₀/g、−v₀） */
interface Tick {
  value: number;
  pos: number;
  segs: Seg[];
}

/** 图内标注 */
interface Mark {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  fill: string;
  segs: Seg[];
}

/** 关键点的圆点 */
interface Dot {
  x: number;
  y: number;
  fill: string;
}

/** 辅助虚线（如 x-t 里从顶点连到两轴的那两条） */
interface Guide {
  path: string;
  stroke: string;
  opacity: number;
}

/** 底色区域（画布坐标矩形）：本课只用来标「回到抛出点之后 / 抛出点以下」 */
interface Band {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/** 一段曲线：回到抛出点之前用暖金、之后（抛出点以下）用青色 */
interface Curve {
  path: string;
  stroke: string;
}

/** 一幅图的全部几何：换图只换这份数据，模板只有一套 */
interface ChartSpec {
  /** 无障碍说明 */
  aria: string;
  /** 横轴的量与单位 */
  xLabel: Seg[];
  /** 纵轴的量与单位 */
  yLabel: Seg[];
  /** 纵轴刻度文字挂在哪一侧（v-x 的纵轴靠右） */
  yTickSide: "left" | "right";
  /** 纵轴箭头朝上（a-t / v-t / v-x）还是朝下（x-t：x 向下为正） */
  yArrow: "up" | "down";
  /** 纵轴量标签画在轴上端还是下端（x-t 画在下端，免得跟"上端=正方向"的直觉打架） */
  yLabelEnd: "top" | "bottom";
  xTicks: Tick[];
  yTicks: Tick[];
  /** 纵轴（竖线）所在画布横坐标 */
  axisX: number;
  /** 横轴（横线）所在画布纵坐标 */
  axisY: number;
  /** 原点 O 标签相对交点的偏移 */
  originDx: number;
  originDy: number;
  bands: Band[];
  guides: Guide[];
  curves: Curve[];
  dots: Dot[];
  marks: Mark[];
}

/**
 * 量：KaTeX_Math 斜体
 *
 * @param text 文字
 * @param dx 段前额外间距
 * @returns 文字段
 */
const math = (text: string, dx = 0): Seg => ({ text, font: MATH, dx });

/**
 * 数字、运算符、单位：KaTeX_Main 正体
 *
 * @param text 文字
 * @param dx 段前额外间距
 * @returns 文字段
 */
const main = (text: string, dx = 0): Seg => ({ text, font: MAIN, dx });

/**
 * 中文等继承页面字体的文字
 *
 * @param text 文字
 * @param dx 段前额外间距
 * @returns 文字段
 */
const plain = (text: string, dx = 0): Seg => ({ text, dx });

/**
 * 上标（如 m/s 的平方、v₀ 的平方）
 *
 * @param text 上标文字
 * @returns 文字段
 */
const sup = (text: string): Seg => ({ text, sup: true });

/**
 * 下标（如 v₀ 里的 0）
 *
 * @param text 下标文字
 * @returns 文字段
 */
const sub = (text: string): Seg => ({ text, sub: true });

/**
 * 轴上的单位段：正体、比轴字母小一档
 *
 * @param text 文字（前面带斜杠，如 " /s"）
 * @returns 文字段
 */
const axisUnit = (text: string): Seg => ({ text, font: MAIN, size: AXIS_UNIT });

/**
 * 把上标/下标 抬高（压低）、缩小，并给紧随其后的段落补一个反向 dy 复位（dy 在 SVG 里是累加的）
 *
 * @param segs 文字段数组
 * @param base 基线字号（上标的大小与抬升量都按它算）
 * @returns 补好 dy / size 的文字段数组
 */
const scripts = (segs: Seg[], base: number): Seg[] => {
  let size = base;
  let rise = 0;

  return segs.map((part) => {
    const { size: partSize, sup: isSup, sub: isSub } = part;

    if (isSup || isSub) {
      const amount = Math.round(size * 0.34);

      rise = isSub ? -amount : amount;

      return {
        ...part,
        font: part.font ?? MAIN,
        size: Math.round(size * 0.72),
        dy: isSub ? amount : -amount,
      };
    }

    const fixed = rise === 0 ? { ...part } : { ...part, dy: rise };

    rise = 0;
    if (partSize) size = partSize;

    return fixed;
  });
};

/**
 * 速度符号：v₀、−v₀、2v₀（系数含符号，1 就传空串）
 *
 * @param coeff 系数（如 "2"、"−"）
 * @returns 文字段数组
 */
const speedSegs = (coeff = ""): Seg[] => [...(coeff ? [main(coeff)] : []), math("v"), sub("0")];

/**
 * 位移符号：−v₀²/(2g)（关键点高度都写成它）
 *
 * @returns 文字段数组
 */
const heightSegs = (): Seg[] => [
  main("−"),
  math("v"),
  sub("0"),
  sup("2"),
  main("/(2"),
  math("g"),
  main(")"),
];

/**
 * 时间符号：v₀/g、2v₀/g、3v₀/g（系数 1 就传空串）
 *
 * @param coeff 系数（如 "2"、"3"）
 * @returns 文字段数组
 */
const timeSegs = (coeff = ""): Seg[] => [
  ...(coeff ? [main(coeff)] : []),
  math("v"),
  sub("0"),
  main("/"),
  math("g"),
];

/**
 * 时间轴刻度：0 不画（原点另有 O），只标三个关键/参照时刻
 *
 * @param xMin 时间轴下限
 * @param xMax 时间轴上限
 * @returns 刻度数组
 */
const timeTicks = (xMin: number, xMax: number): Tick[] =>
  [
    { value: 1, coeff: "" },
    { value: 2, coeff: "2" },
    { value: 3, coeff: "3" },
  ].map(({ value, coeff }) => ({
    value,
    pos: mapX(value, xMin, xMax),
    segs: scripts(timeSegs(coeff), TICK_SIZE),
  }));

/**
 * 速度轴刻度：−v₀、v₀、2v₀（0 不画，原点另有 O）
 *
 * @param yMin 速度轴下限
 * @param yMax 速度轴上限
 * @returns 刻度数组
 */
const speedTicks = (yMin: number, yMax: number): Tick[] =>
  [
    { value: -1, coeff: "−" },
    { value: 1, coeff: "" },
    { value: 2, coeff: "2" },
  ].map(({ value, coeff }) => ({
    value,
    pos: mapY(value, yMin, yMax),
    segs: scripts(speedSegs(coeff), TICK_SIZE),
  }));

/**
 * 两点之间的线段路径
 *
 * @param x1 起点横坐标
 * @param y1 起点纵坐标
 * @param x2 终点横坐标
 * @param y2 终点纵坐标
 * @returns SVG 路径字符串
 */
const segment = (x1: number, y1: number, x2: number, y2: number): string =>
  `M ${round1(x1)} ${round1(y1)} L ${round1(x2)} ${round1(y2)}`;

/**
 * 按参数采样一条曲线
 *
 * @param from 参数起点
 * @param to 参数终点
 * @param steps 采样段数
 * @param pointOf 参数 → 画布坐标
 * @returns SVG 折线路径字符串
 */
const sampleCurve = (
  from: number,
  to: number,
  steps: number,
  pointOf: (param: number) => { x: number; y: number },
): string => {
  const points: string[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const param = from + ((to - from) * index) / steps;
    const { x, y } = pointOf(param);

    points.push(`${round1(x)},${round1(y)}`);
  }

  return `M ${points.join(" L ")}`;
};

/** 两轴箭头的 marker id：同一页只有一个实例，取随机后缀避免多实例撞 id */
const arrowId = `vtg-arrow-${Math.random().toString(36).slice(2, 8)}`;

/**
 * ① a-t：a = g 的水平线，从抛出一直画到 t = 3v₀/g（回到抛出点之后仍是这条线）
 *
 * @returns 这一幅图的几何数据
 */
const buildAccelerationChart = (): ChartSpec => {
  const { min: xMin, max: xMax } = TIME_RANGE;
  const { min: yMin, max: yMax } = ACCELERATION_RANGE;
  const axisX = mapX(0, xMin, xMax);
  const axisY = mapY(0, yMin, yMax);
  const lineY = mapY(1, yMin, yMax);
  const backX = mapX(2, xMin, xMax);
  const endX = mapX(3, xMin, xMax);
  const plotRight = PAD.left + PLOT_WIDTH;

  return {
    aria: "加速度—时间图像：以竖直向下为正，全过程（球落到抛出点以下也一样）加速度恒为 g，是一条水平线",
    xLabel: scripts([math("t"), axisUnit(" /s")], AXIS_LETTER),
    yLabel: scripts([math("a"), axisUnit(" /(m/s"), sup("2"), axisUnit(")")], AXIS_LETTER),
    yTickSide: "left",
    yArrow: "up",
    yLabelEnd: "top",
    xTicks: timeTicks(xMin, xMax),
    yTicks: [{ value: 1, pos: lineY, segs: scripts([math("g")], TICK_SIZE) }],
    axisX,
    axisY,
    originDx: -16,
    originDy: 26,
    bands: [{ x1: backX, x2: plotRight, y1: PAD.top, y2: PAD.top + PLOT_HEIGHT }],
    guides: [{ path: segment(backX, lineY, backX, axisY), stroke: TICK_COLOR, opacity: 0.55 }],
    curves: [
      { path: segment(axisX, lineY, backX, lineY), stroke: CURVE },
      { path: segment(backX, lineY, endX, lineY), stroke: FALL },
    ],
    dots: [
      { x: axisX, y: lineY, fill: CURVE },
      { x: endX, y: lineY, fill: FALL },
    ],
    marks: [
      {
        x: Math.round((axisX + endX) / 2),
        y: lineY - 16,
        anchor: "middle",
        fill: CURVE,
        segs: scripts([math("a"), main("=", 7), math("g", 7)], MARK_SIZE),
      },
      {
        x: backX - 10,
        y: lineY + 30,
        anchor: "end",
        fill: FALL,
        segs: scripts([plain("回到抛出点")], MARK_SIZE),
      },
      {
        x: Math.round((backX + plotRight) / 2),
        y: PAD.top + PLOT_HEIGHT - 22,
        anchor: "middle",
        fill: FALL,
        segs: scripts([plain("抛出点以下")], MARK_SIZE),
      },
    ],
  };
};

/**
 * ② v-t：从 (0, −v₀) 出发的直线，过零点就是最高点、t = 2v₀/g 时 v = +v₀（回到抛出点），之后继续增大到 2v₀
 *
 * @returns 这一幅图的几何数据
 */
const buildVelocityChart = (): ChartSpec => {
  const { min: xMin, max: xMax } = TIME_RANGE;
  const { min: yMin, max: yMax } = VELOCITY_RANGE;
  const axisX = mapX(0, xMin, xMax);
  const axisY = mapY(0, yMin, yMax);
  const startY = mapY(-1, yMin, yMax);
  const riseX = mapX(1, xMin, xMax);
  const backX = mapX(2, xMin, xMax);
  const backY = mapY(1, yMin, yMax);
  const endX = mapX(3, xMin, xMax);
  const endY = mapY(2, yMin, yMax);
  const plotRight = PAD.left + PLOT_WIDTH;

  return {
    aria:
      "速度—时间图像：以竖直向下为正，图线从负 v₀ 匀加速到正 v₀（回到抛出点），过零点就是最高点（t = v₀/g），" +
      "回到抛出点后速度继续增大到 2v₀，全程斜率都是 g",
    xLabel: scripts([math("t"), axisUnit(" /s")], AXIS_LETTER),
    yLabel: scripts([math("v"), axisUnit(" /(m/s)")], AXIS_LETTER),
    yTickSide: "left",
    yArrow: "up",
    yLabelEnd: "top",
    xTicks: timeTicks(xMin, xMax),
    yTicks: speedTicks(yMin, yMax),
    axisX,
    axisY,
    originDx: -16,
    originDy: 26,
    bands: [{ x1: backX, x2: plotRight, y1: PAD.top, y2: PAD.top + PLOT_HEIGHT }],
    guides: [{ path: segment(backX, axisY, backX, backY), stroke: TICK_COLOR, opacity: 0.55 }],
    curves: [
      { path: segment(axisX, startY, backX, backY), stroke: CURVE },
      { path: segment(backX, backY, endX, endY), stroke: FALL },
    ],
    dots: [
      { x: axisX, y: startY, fill: RISE },
      { x: riseX, y: axisY, fill: CURVE },
      { x: backX, y: backY, fill: FALL },
      { x: endX, y: endY, fill: FALL },
    ],
    marks: [
      {
        x: axisX + 14,
        y: startY + 6,
        anchor: "start",
        fill: RISE,
        segs: scripts([plain("抛出")], MARK_SIZE),
      },
      {
        x: riseX - 10,
        y: axisY - 16,
        anchor: "end",
        fill: CURVE,
        segs: scripts([plain("最高点 "), math("v"), main("= 0", 8)], MARK_SIZE),
      },
      {
        x: backX + 12,
        y: backY + 28,
        anchor: "start",
        fill: FALL,
        segs: scripts(
          [plain("回到抛出点 "), math("v"), main("= +", 8), ...speedSegs("")],
          MARK_SIZE,
        ),
      },
      {
        x: Math.round((backX + plotRight) / 2),
        y: PAD.top + PLOT_HEIGHT - 22,
        anchor: "middle",
        fill: FALL,
        segs: scripts([plain("抛出点以下")], MARK_SIZE),
      },
    ],
  };
};

/**
 * ③ x-t：抛物线 x = ½g(t − v₀/g)² − v₀²/(2g)；顶点 (v₀/g, −v₀²/(2g)) 是最高点， t = 2v₀/g 回到抛出点（x = 0）后继续向下，x
 * 变成正值（抛出点以下）且越来越大
 *
 * @returns 这一幅图的几何数据
 */
const buildPositionChart = (): ChartSpec => {
  const { min: xMin, max: xMax } = TIME_RANGE;
  const { min: yMin, max: yMax } = POSITION_RANGE;
  const axisX = mapX(0, xMin, xMax);
  const axisY = mapDown(0, yMin, yMax);
  const vertexX = mapX(1, xMin, xMax);
  const vertexY = mapDown(-1, yMin, yMax);
  const backX = mapX(2, xMin, xMax);
  const plotRight = PAD.left + PLOT_WIDTH;
  /**
   * τ = t/(v₀/g) 时的画布坐标：x = (τ² − 2τ)·(v₀²/(2g))
   *
   * @param tau 以 v₀/g 为单位的时间
   * @returns 画布坐标
   */
  const pointOf = (tau: number): { x: number; y: number } => ({
    x: mapX(tau, xMin, xMax),
    y: mapDown(tau * tau - 2 * tau, yMin, yMax),
  });

  return {
    aria:
      "位移—时间图像：以竖直向下为正，抛物线顶点在 t = v₀/g、x = −v₀²/(2g)（最高点），" +
      "t = 2v₀/g 回到抛出点，此后位移为正且越来越大（落到抛出点以下）",
    xLabel: scripts([math("t"), axisUnit(" /s")], AXIS_LETTER),
    yLabel: scripts([math("x"), axisUnit(" /m")], AXIS_LETTER),
    yTickSide: "left",
    yArrow: "down",
    yLabelEnd: "bottom",
    xTicks: timeTicks(xMin, xMax),
    yTicks: [{ value: -1, pos: vertexY, segs: scripts(heightSegs(), TICK_SIZE) }],
    axisX,
    axisY,
    originDx: -18,
    originDy: -12,
    bands: [{ x1: PAD.left, x2: plotRight, y1: axisY, y2: PAD.top + PLOT_HEIGHT }],
    guides: [
      { path: segment(axisX, vertexY, vertexX, vertexY), stroke: TICK_COLOR, opacity: 0.55 },
      { path: segment(vertexX, vertexY, vertexX, axisY), stroke: TICK_COLOR, opacity: 0.55 },
    ],
    curves: [
      { path: sampleCurve(0, 2, 36, pointOf), stroke: CURVE },
      { path: sampleCurve(2, 3, 22, pointOf), stroke: FALL },
    ],
    dots: [
      { x: axisX, y: axisY, fill: CURVE },
      { x: vertexX, y: vertexY, fill: CURVE },
      { x: backX, y: axisY, fill: FALL },
    ],
    marks: [
      {
        x: axisX + 16,
        y: axisY + 30,
        anchor: "start",
        fill: CURVE,
        segs: scripts([plain("抛出点")], MARK_SIZE),
      },
      {
        x: vertexX + 14,
        y: vertexY - 8,
        anchor: "start",
        fill: CURVE,
        segs: scripts([plain("最高点")], MARK_SIZE),
      },
      {
        x: backX + 14,
        y: axisY - 16,
        anchor: "start",
        fill: FALL,
        segs: scripts([plain("回到抛出点")], MARK_SIZE),
      },
      {
        x: axisX + 190,
        y: PAD.top + PLOT_HEIGHT - 22,
        anchor: "middle",
        fill: FALL,
        segs: scripts([plain("抛出点以下")], MARK_SIZE),
      },
    ],
  };
};

/**
 * ④ v-x：v² = v₀² + 2gx，顶点 (−v₀²/(2g), 0)、开口向右；x = 0 处 v = ±v₀， 位移为正（抛出点以下）时速度继续增大到 2v₀
 *
 * @returns 这一幅图的几何数据
 */
const buildVelocityPositionChart = (): ChartSpec => {
  const { min: xMin, max: xMax } = POSITION_AXIS_RANGE;
  const { min: yMin, max: yMax } = VELOCITY_RANGE;
  const axisX = mapX(0, xMin, xMax);
  const axisY = mapY(0, yMin, yMax);
  const vertexX = mapX(-0.5, xMin, xMax);
  const startY = mapY(-1, yMin, yMax);
  const backY = mapY(1, yMin, yMax);
  const endX = mapX(1.5, xMin, xMax);
  const endY = mapY(2, yMin, yMax);
  const plotRight = PAD.left + PLOT_WIDTH;
  /**
   * 速度 v（以 v₀ 为单位）对应的画布坐标：x = (v² − v₀²)/(2g)（以 v₀²/(2g) 为单位）
   *
   * @param velocity 以 v₀ 为单位的速度
   * @returns 画布坐标
   */
  const pointOf = (velocity: number): { x: number; y: number } => ({
    x: mapX((velocity * velocity - 1) / 2, xMin, xMax),
    y: mapY(velocity, yMin, yMax),
  });

  return {
    aria:
      "速度—位移图像：顶点在 x = −v₀²/(2g)、v = 0 的开口向右曲线；抛出点（x = 0）处速度是 ±v₀，" +
      "位移为正（抛出点以下）时速度继续增大到 2v₀",
    xLabel: scripts([math("x"), axisUnit(" /m")], AXIS_LETTER),
    yLabel: scripts([math("v"), axisUnit(" /(m/s)")], AXIS_LETTER),
    yTickSide: "right",
    yArrow: "up",
    yLabelEnd: "top",
    xTicks: [{ value: -1, pos: mapX(-1, xMin, xMax), segs: scripts(heightSegs(), TICK_SIZE) }],
    yTicks: speedTicks(yMin, yMax),
    axisX,
    axisY,
    originDx: 16,
    originDy: 26,
    bands: [{ x1: axisX, x2: plotRight, y1: PAD.top, y2: PAD.top + PLOT_HEIGHT }],
    guides: [],
    curves: [
      { path: sampleCurve(-1, 1, 32, pointOf), stroke: CURVE },
      { path: sampleCurve(1, 2, 20, pointOf), stroke: FALL },
    ],
    dots: [
      { x: axisX, y: startY, fill: RISE },
      { x: vertexX, y: axisY, fill: CURVE },
      { x: axisX, y: backY, fill: FALL },
      { x: endX, y: endY, fill: FALL },
    ],
    marks: [
      {
        x: vertexX - 12,
        y: axisY - 10,
        anchor: "end",
        fill: CURVE,
        segs: scripts([plain("最高点")], MARK_SIZE),
      },
      {
        x: axisX - 14,
        y: startY + 6,
        anchor: "end",
        fill: RISE,
        segs: scripts([plain("抛出 "), math("v"), main("= −", 8), ...speedSegs("")], MARK_SIZE),
      },
      {
        x: axisX - 14,
        y: backY - 6,
        anchor: "end",
        fill: FALL,
        segs: scripts(
          [plain("回到抛出点 "), math("v"), main("= +", 8), ...speedSegs("")],
          MARK_SIZE,
        ),
      },
      {
        x: Math.round((axisX + plotRight) / 2),
        y: PAD.top + PLOT_HEIGHT - 22,
        anchor: "middle",
        fill: FALL,
        segs: scripts([plain("抛出点以下")], MARK_SIZE),
      },
    ],
  };
};

/** 要画哪一幅：a-t | v-t | x-t | v-x，默认 v-t */
const { chart = "v-t" } = defineProps<{ chart?: "a-t" | "v-t" | "x-t" | "v-x" }>();

/** 当前这幅图的几何：整幅图是静态的（图上没有任何数值，也就没有可拖动的参数） */
const spec = computed<ChartSpec>(() => {
  if (chart === "a-t") return buildAccelerationChart();
  if (chart === "v-t") return buildVelocityChart();
  if (chart === "x-t") return buildPositionChart();

  return buildVelocityPositionChart();
});

/** 横轴的线段终点（回退半个箭头长，尖端正好落在轴端） */
const xShaft = computed(() =>
  shaftEnd(spec.value.axisX, spec.value.axisY, PAD.left + PLOT_WIDTH, spec.value.axisY),
);
/** 纵轴的线段两端：箭头朝上时从下往上画、朝下（x-t）时从上往下画 */
const yShaft = computed(() => {
  const { axisX, yArrow } = spec.value;
  const bottom = PAD.top + PLOT_HEIGHT;
  const tail = yArrow === "down" ? PAD.top : bottom;
  const tip = yArrow === "down" ? bottom : PAD.top;
  const end = shaftEnd(axisX, tail, axisX, tip);

  return { x1: axisX, y1: tail, x2: end.x, y2: end.y };
});
</script>

<template>
  <div class="vtg">
    <svg
      class="vtg-chart"
      :viewBox="`0 0 ${VIEW.w} ${VIEW.h}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="spec.aria"
    >
      <defs>
        <marker
          :id="arrowId"
          markerWidth="12"
          markerHeight="12"
          refX="6"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
          viewBox="0 0 12 12"
        >
          <path d="M 0 0 L 12 6 L 0 12 z" :fill="AXIS" />
        </marker>
      </defs>
      <rect
        v-for="(band, index) in spec.bands"
        :key="`band${index}`"
        :x="band.x1"
        :y="band.y1"
        :width="round1(band.x2 - band.x1)"
        :height="round1(band.y2 - band.y1)"
        :fill="BAND_FILL"
      />
      <g :stroke="TICK_COLOR" stroke-width="1" opacity="0.13">
        <line
          v-for="tick in spec.xTicks"
          :key="`gx${tick.value}`"
          :x1="tick.pos"
          :y1="PAD.top"
          :x2="tick.pos"
          :y2="PAD.top + PLOT_HEIGHT"
        />
        <line
          v-for="tick in spec.yTicks"
          :key="`gy${tick.value}`"
          :x1="PAD.left"
          :y1="tick.pos"
          :x2="PAD.left + PLOT_WIDTH"
          :y2="tick.pos"
        />
      </g>
      <line
        :x1="PAD.left"
        :y1="spec.axisY"
        :x2="xShaft.x"
        :y2="xShaft.y"
        :stroke="AXIS"
        stroke-width="2.4"
        :marker-end="`url(#${arrowId})`"
      />
      <line
        :x1="yShaft.x1"
        :y1="yShaft.y1"
        :x2="yShaft.x2"
        :y2="yShaft.y2"
        :stroke="AXIS"
        stroke-width="2.4"
        :marker-end="`url(#${arrowId})`"
      />
      <g :stroke="AXIS" stroke-width="1.7">
        <line
          v-for="tick in spec.xTicks"
          :key="`tx${tick.value}`"
          :x1="tick.pos"
          :y1="spec.axisY"
          :x2="tick.pos"
          :y2="spec.axisY - TICK_LENGTH"
        />
        <line
          v-for="tick in spec.yTicks"
          :key="`ty${tick.value}`"
          :x1="spec.axisX"
          :y1="tick.pos"
          :x2="spec.axisX + (spec.yTickSide === 'left' ? TICK_LENGTH : -TICK_LENGTH)"
          :y2="tick.pos"
        />
      </g>
      <text
        v-for="tick in spec.xTicks"
        :key="`nx${tick.value}`"
        :x="tick.pos"
        :y="spec.axisY + TICK_LABEL_GAP"
        text-anchor="middle"
        :fill="TICK_COLOR"
        class="vtg-halo"
        stroke-width="3"
      >
        <tspan
          v-for="(part, index) in tick.segs"
          :key="index"
          :dx="part.dx"
          :dy="part.dy"
          :font-size="part.size"
          :font-family="part.font"
          :font-style="part.font === MATH ? 'italic' : undefined"
        >
          {{ part.text }}
        </tspan>
      </text>
      <text
        v-for="tick in spec.yTicks"
        :key="`ny${tick.value}`"
        :x="spec.axisX + (spec.yTickSide === 'left' ? -12 : 12)"
        :y="tick.pos + 6"
        :text-anchor="spec.yTickSide === 'left' ? 'end' : 'start'"
        :fill="TICK_COLOR"
        class="vtg-halo"
        stroke-width="3"
      >
        <tspan
          v-for="(part, index) in tick.segs"
          :key="index"
          :dx="part.dx"
          :dy="part.dy"
          :font-size="part.size"
          :font-family="part.font"
          :font-style="part.font === MATH ? 'italic' : undefined"
        >
          {{ part.text }}
        </tspan>
      </text>
      <text
        :x="spec.axisX + spec.originDx"
        :y="spec.axisY + spec.originDy"
        text-anchor="middle"
        :font-size="ORIGIN_SIZE"
        :font-family="MATH"
        font-style="italic"
        :fill="TICK_COLOR"
        class="vtg-halo"
        stroke-width="3"
      >
        O
      </text>
      <text
        :x="PAD.left + PLOT_WIDTH - 8"
        :y="spec.axisY - 15"
        text-anchor="end"
        :font-size="AXIS_LETTER"
        :fill="TICK_COLOR"
        class="vtg-halo"
        stroke-width="3.4"
      >
        <tspan
          v-for="(part, index) in spec.xLabel"
          :key="index"
          :dx="part.dx"
          :dy="part.dy"
          :font-size="part.size"
          :font-family="part.font"
          :font-style="part.font === MATH ? 'italic' : undefined"
        >
          {{ part.text }}
        </tspan>
      </text>
      <text
        :x="spec.yLabelEnd === 'top' ? spec.axisX : spec.axisX - 14"
        :y="spec.yLabelEnd === 'top' ? PAD.top - 16 : PAD.top + PLOT_HEIGHT"
        :text-anchor="spec.yLabelEnd === 'top' ? 'middle' : 'end'"
        :font-size="AXIS_LETTER"
        :fill="TICK_COLOR"
        class="vtg-halo"
        stroke-width="3.4"
      >
        <tspan
          v-for="(part, index) in spec.yLabel"
          :key="index"
          :dx="part.dx"
          :dy="part.dy"
          :font-size="part.size"
          :font-family="part.font"
          :font-style="part.font === MATH ? 'italic' : undefined"
        >
          {{ part.text }}
        </tspan>
      </text>
      <path
        v-for="(guide, index) in spec.guides"
        :key="`guide${index}`"
        :d="guide.path"
        fill="none"
        :stroke="guide.stroke"
        :opacity="guide.opacity"
        stroke-width="1.6"
        stroke-dasharray="6 5"
      />
      <path
        v-for="(curve, index) in spec.curves"
        :key="`curve${index}`"
        :d="curve.path"
        fill="none"
        :stroke="curve.stroke"
        stroke-width="4.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        v-for="(dot, index) in spec.dots"
        :key="`dot${index}`"
        :cx="dot.x"
        :cy="dot.y"
        r="5.5"
        :fill="dot.fill"
      />
      <text
        v-for="(mark, index) in spec.marks"
        :key="`mark${index}`"
        class="vtg-halo"
        :x="mark.x"
        :y="mark.y"
        :text-anchor="mark.anchor"
        :font-size="MARK_SIZE"
        :fill="mark.fill"
        stroke-width="3.6"
      >
        <tspan
          v-for="(part, partIndex) in mark.segs"
          :key="partIndex"
          :dx="part.dx"
          :dy="part.dy"
          :font-size="part.size"
          :font-family="part.font"
          :font-style="part.font === MATH ? 'italic' : undefined"
        >
          {{ part.text }}
        </tspan>
      </text>
    </svg>
  </div>
</template>

<style scoped>
/* 一幅图占满整页宽；viewBox 固定 + width:100% + height:auto ⇒ 高度恒定、不跳动 */
.vtg {
  width: 100%;
  min-width: 0;
}

.vtg-chart {
  display: block;

  width: 100%;
  height: auto;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: rgb(15 20 37 / 45%);
}

/* 图内文字压在曲线/刻度上时加描边光晕，保证读得清 */
.vtg-halo {
  paint-order: stroke;
  stroke: #0f1425;
}
</style>
