/**
 * 电梯实测（视频）里的示数剖面 —— 电梯模拟与 F–t 图像共用这一份数据
 *
 * 视频：商场玻璃电梯，电子秤上放一个小盒子，从 1 楼上到 4 楼（跨三层），再返回。
 * 读数是秤面的原样数字（kg 口径，与视频完全一致，不做单位换算）：
 *   静止 11.36 → 上升加速 12.58 → 匀速 11.36 → 上升减速 10.08 → 静止 11.36
 *   下降加速 10.20 → 匀速 11.36 → 下降减速 12.54 → 静止 11.36
 *
 * 关键：示数 = 视重 ∝ 加速度。电梯为了舒适，加速度是**连续地从 0 长出来、再连续回到 0**，
 * 所以示数在加速段是一个圆润的峰（不是梯形平台），峰附近只停留很短时间；
 * 模拟里的轿厢位移也由同一条加速度曲线积分得到（起步加速 → 匀速 → 到站减速）。
 */

/** 静止时的示数（1 楼、4 楼停稳时都是它） */
export const READING_BASE = 11.36;
/** 上升加速阶段：超重，示数最大 */
export const READING_UP_PEAK = 12.58;
/** 上升减速阶段：失重，示数最小 */
export const READING_UP_MIN = 10.08;
/** 下降加速阶段：失重，示数最小 */
export const READING_DOWN_MIN = 10.2;
/** 下降减速阶段：超重，示数最大 */
export const READING_DOWN_PEAK = 12.54;

/** 单程三段时长（s） */
export const PHASE_ACCEL = 3.2;
export const PHASE_CONST = 6.6;
export const PHASE_DECEL = 3.2;
/** 单程总时长（s） */
export const TRIP = PHASE_ACCEL + PHASE_CONST + PHASE_DECEL;
/** 两程之间的停稳时间（s） */
export const REST = 2;

/** 上升段在时间轴上的起点 */
export const UP_START = 0;
/** 下降段在时间轴上的起点 */
export const DOWN_START = TRIP + REST;
/** 一整趟（上升 + 停稳 + 下降）的总时长 */
export const TOTAL = DOWN_START + TRIP;

/** 从 1 楼出发跨三层到 4 楼 */
export const FLOOR_SPAN = 3;

export type TripDirection = "up" | "down";
export type TripPhase = "accel" | "const" | "decel";

/** 加速度峰值（任意单位，只用它的形状；位移最后归一化到「一层组」） */
const A_PEAK = 2;
/** 位移积分步长（s） */
const SAMPLE_DT = 0.002;

/**
 * 单程内 t 时刻的归一化加速度（竖直向上为正，取值 −1 ~ 1）：
 * 加速段 `+shape`、匀速段 0、减速段 `−shape`。
 * `shape` 是「圆角梯形」：中间 50% 的平台（学生要能看清 12.58 / 10.08 各停一会儿），
 * 两端各 25% 用半个余弦平滑升起/回落（导数为 0，加速度连续，示数不跳变）。
 */
/** 平台两侧各占这一段的比例：0.25 → 平台正好占中间一半 */
const PHASE_RAMP = 0.25;

/**
 * 段的形状（0 → 1 → 0）：两端各 `PHASE_RAMP` 用半个余弦平滑过渡，中间是 1 的平台。
 * 导数在接缝处为 0，加速度连续。
 */
function phaseShape(u: number): number {
  const clamped = Math.min(1, Math.max(0, u));
  if (clamped < PHASE_RAMP) return 0.5 - 0.5 * Math.cos((Math.PI * clamped) / PHASE_RAMP);
  if (clamped > 1 - PHASE_RAMP) {
    return 0.5 - 0.5 * Math.cos((Math.PI * (1 - clamped)) / PHASE_RAMP);
  }
  return 1;
}

export function accelNormAt(t: number): number {
  if (t <= 0 || t >= TRIP) return 0;
  if (t < PHASE_ACCEL) return phaseShape(t / PHASE_ACCEL);
  if (t < PHASE_ACCEL + PHASE_CONST) return 0;
  return -phaseShape((t - PHASE_ACCEL - PHASE_CONST) / PHASE_DECEL);
}

/* -------------------------------------------------------------------------- */
/* 运动学：把加速度积分两次得到「走了多远」（与旧模型 displacementTable 同一套做法） */
/* -------------------------------------------------------------------------- */

const displacementTable: number[] = (() => {
  const table: number[] = [0];
  let velocity = 0;
  const steps = Math.ceil(TRIP / SAMPLE_DT);
  for (let index = 1; index <= steps; index += 1) {
    velocity += A_PEAK * accelNormAt((index - 0.5) * SAMPLE_DT) * SAMPLE_DT;
    table.push((table[index - 1] ?? 0) + velocity * SAMPLE_DT);
  }
  return table;
})();

const S_TOTAL = displacementTable[displacementTable.length - 1] ?? 1;

/** 单程归一化位移（0 → 1）：起步加速、中段匀速、到站减速，总位移恰好跨三层 */
export function displacementFractionAt(t: number): number {
  if (t <= 0) return 0;
  if (t >= TRIP) return 1;
  const index = Math.min(Math.floor(t / SAMPLE_DT), displacementTable.length - 1);
  return (displacementTable[index] ?? 0) / (S_TOTAL || 1);
}

/** 单程内 t 时刻的示数：视重 ∝ 加速度 → 示数在参考值上按同一条曲线起伏 */
export function readingAt(t: number, dir: TripDirection): number {
  // accelNormAt 给的是「竖直向上」为正的加速度；下降一趟物理加速度向下，取反才是视重的方向
  const k = accelNormAt(t) * (dir === "up" ? 1 : -1);
  const peak = dir === "up" ? READING_UP_PEAK : READING_DOWN_PEAK;
  const min = dir === "up" ? READING_UP_MIN : READING_DOWN_MIN;
  return k >= 0 ? READING_BASE + (peak - READING_BASE) * k : READING_BASE + (READING_BASE - min) * k;
}

/** 单程内 t 时刻所处的阶段 */
export function phaseAt(t: number): TripPhase {
  if (t < PHASE_ACCEL) return "accel";
  if (t < PHASE_ACCEL + PHASE_CONST) return "const";
  return "decel";
}

/** 单程内 t 时刻的运动状态文字（用于模拟面板、F–t 图标注） */
export function motionLabelAt(t: number, dir: TripDirection): string {
  if (t <= 0 || t >= TRIP) return "静止";
  const phase = phaseAt(t);
  const word = phase === "accel" ? "加速" : phase === "const" ? "匀速" : "减速";
  return `${word}${dir === "up" ? "上升" : "下降"}`;
}

/** 单程内 t 时刻所在楼层（1 → 4 或 4 → 1，连续值，按积分出的真实位移走） */
export function floorAt(t: number, dir: TripDirection): number {
  const k = displacementFractionAt(t);
  return dir === "up" ? 1 + FLOOR_SPAN * k : 4 - FLOOR_SPAN * k;
}

/** 一整趟时间轴（上升 → 停稳 → 下降）上 t 时刻的示数：F–t 图像直接用它采样 */
export function readingAtTimeline(t: number): number {
  if (t < TRIP) return readingAt(t, "up");
  if (t < DOWN_START) return READING_BASE;
  return readingAt(t - DOWN_START, "down");
}

/** 一整趟时间轴上的运动状态文字 */
export function motionLabelAtTimeline(t: number): string {
  if (t < TRIP) return motionLabelAt(t, "up");
  if (t < DOWN_START) return "静止";
  return motionLabelAt(t - DOWN_START, "down");
}
