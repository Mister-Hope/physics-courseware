/**
 * 多用电表（J0411 型）挡位模型与读数引擎 —— 移植自 physics-modal 项目
 * （~/projects/physics-modal/src/views/multimeter/），按本仓课件口径改写： 数值规则原样保留，输出改为 LaTeX 字符串（页面用 <Latex>
 * 渲染）。
 *
 * 读数规则（一切以教材为准）：
 *
 * - 欧姆挡：刻度不均匀、左 ∞ 右 0；指针偏转 f 对应 R_x = R_中(1−f)/f（中值 R_中 = 15 Ω， 与教材 12.2「电阻表的原理」的 I_x/I_g =
 *   R_Ω/(R_Ω+R_x) 同一条式子）；电阻值 = 读数 × 倍率。
 * - 直流电压/电流挡：刻度均匀，读数 = 偏转比例 × 量程，按分度值决定是否估读。
 */

export type GearCategory = "ohm" | "dcv" | "dcma" | "acv" | "off";

export type ScaleType = "ohm" | "linear_250" | "linear_50" | "linear_10" | "ac_10" | "off";

export interface Gear {
  id: string;
  category: GearCategory;
  // 旋钮药丸上的短标签
  label: string;
  // 读数面板里的完整名称
  name: string;
  // 选择开关上的方位角（度）
  angle: number;
  // 欧姆挡倍率
  multiplier?: number;
  // 电压/电流挡量程
  range?: number;
  // 单位（LaTeX）
  unitTex: string;
  scaleType: ScaleType;
  // 该挡位该读哪一排刻度线
  scaleName: string;
}

// 欧姆挡中值电阻（Ω）：指针落在正中时刻度盘读数
export const OHM_MID = 15;

export const GEARS: Gear[] = [
  {
    id: "off",
    category: "off",
    label: "OFF",
    name: "OFF 挡",
    angle: 310,
    unitTex: "",
    scaleType: "off",
    scaleName: "—",
  },
  // ── 直流电压挡 ──
  {
    id: "dcv_2_5",
    category: "dcv",
    label: "2.5 V",
    name: "直流电压 2.5 V 挡",
    angle: 155,
    range: 2.5,
    unitTex: String.raw`\text{V}`,
    scaleType: "linear_250",
    scaleName: "第二排直流 0~250 刻度线",
  },
  {
    id: "dcv_10",
    category: "dcv",
    label: "10 V",
    name: "直流电压 10 V 挡",
    angle: 180,
    range: 10,
    unitTex: String.raw`\text{V}`,
    scaleType: "linear_10",
    scaleName: "第二排直流 0~10 刻度线",
  },
  {
    id: "dcv_50",
    category: "dcv",
    label: "50 V",
    name: "直流电压 50 V 挡",
    angle: 205,
    range: 50,
    unitTex: String.raw`\text{V}`,
    scaleType: "linear_50",
    scaleName: "第二排直流 0~50 刻度线",
  },
  {
    id: "dcv_250",
    category: "dcv",
    label: "250 V",
    name: "直流电压 250 V 挡",
    angle: 225,
    range: 250,
    unitTex: String.raw`\text{V}`,
    scaleType: "linear_250",
    scaleName: "第二排直流 0~250 刻度线",
  },
  // ── 直流电流挡 ──
  {
    id: "dcma_2_5",
    category: "dcma",
    label: "2.5 mA",
    name: "直流电流 2.5 mA 挡",
    angle: 252,
    range: 2.5,
    unitTex: String.raw`\text{mA}`,
    scaleType: "linear_250",
    scaleName: "第二排直流 0~250 刻度线",
  },
  {
    id: "dcma_25",
    category: "dcma",
    label: "25 mA",
    name: "直流电流 25 mA 挡",
    angle: 270,
    range: 25,
    unitTex: String.raw`\text{mA}`,
    scaleType: "linear_250",
    scaleName: "第二排直流 0~250 刻度线",
  },
  {
    id: "dcma_250",
    category: "dcma",
    label: "250 mA",
    name: "直流电流 250 mA 挡",
    angle: 288,
    range: 250,
    unitTex: String.raw`\text{mA}`,
    scaleType: "linear_250",
    scaleName: "第二排直流 0~250 刻度线",
  },
  // ── 欧姆挡 ──
  {
    id: "ohm_1",
    category: "ohm",
    label: "×1",
    name: "欧姆 ×1 挡",
    angle: 325,
    multiplier: 1,
    unitTex: String.raw`\Omega`,
    scaleType: "ohm",
    scaleName: "最上排欧姆刻度线（左 ∞ 右 0、不均匀）",
  },
  {
    id: "ohm_10",
    category: "ohm",
    label: "×10",
    name: "欧姆 ×10 挡",
    angle: 340,
    multiplier: 10,
    unitTex: String.raw`\Omega`,
    scaleType: "ohm",
    scaleName: "最上排欧姆刻度线（左 ∞ 右 0、不均匀）",
  },
  {
    id: "ohm_100",
    category: "ohm",
    label: "×100",
    name: "欧姆 ×100 挡",
    angle: 355,
    multiplier: 100,
    unitTex: String.raw`\Omega`,
    scaleType: "ohm",
    scaleName: "最上排欧姆刻度线（左 ∞ 右 0、不均匀）",
  },
  {
    id: "ohm_1k",
    category: "ohm",
    label: "×1k",
    name: "欧姆 ×1k 挡",
    angle: 10,
    multiplier: 1000,
    unitTex: String.raw`\Omega`,
    scaleType: "ohm",
    scaleName: "最上排欧姆刻度线（左 ∞ 右 0、不均匀）",
  },
  // ── 交流电压挡 ──
  {
    id: "acv_10",
    category: "acv",
    label: "10 V~",
    name: "交流电压 10 V 挡",
    angle: 45,
    range: 10,
    unitTex: String.raw`\text{V}`,
    scaleType: "ac_10",
    scaleName: "第三排交流 10 V~ 专用刻度线",
  },
  {
    id: "acv_50",
    category: "acv",
    label: "50 V~",
    name: "交流电压 50 V 挡",
    angle: 75,
    range: 50,
    unitTex: String.raw`\text{V}`,
    scaleType: "linear_50",
    scaleName: "第二排 0~50 刻度线",
  },
  {
    id: "acv_250",
    category: "acv",
    label: "250 V~",
    name: "交流电压 250 V 挡",
    angle: 105,
    range: 250,
    unitTex: String.raw`\text{V}`,
    scaleType: "linear_250",
    scaleName: "第二排 0~250 刻度线",
  },
];

export interface Reading {
  // 归一化偏转 0（左）~ 1（右）
  deflection: number;
  // 刻度线上读到的数（LaTeX）
  scaleReadingTex: string;
  // 最终读数（LaTeX，不含单位）
  valueTex: string;
  // 单位（LaTeX）
  unitTex: string;
  // 换算步骤（LaTeX，逐条）
  stepsTex: string[];
  // 读数要点（纯文本）
  note: string;
  // 提示级别
  level: "ok" | "warn" | "info";
}

// 欧姆刻度盘上实际印出来的刻度值（决定读数落到哪一格）
const OHM_SCALE_VALUES = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 25, 30, 35, 40,
  45, 50, 60, 70, 80, 90, 100, 150, 200, 300, 400, 500, 1000,
];
/**
 * 欧姆刻度盘刻度值 → 指针归一化偏转位置（右 0、左 ∞）
 *
 * @param resistance 刻度盘上印的刻度值（Ω）
 * @returns 归一化偏转，0 = 最左（∞）、1 = 最右（0）
 */
export const ohmPositionOf = (resistance: number): number =>
  resistance <= 0 ? 1 : OHM_MID / (OHM_MID + resistance);

/**
 * 指针偏转 → 待测电阻真实值（Ω）
 *
 * @param deflection 归一化偏转，0 = 最左、1 = 最右
 * @returns 该偏转对应的欧姆刻度值（中值刻度 15 Ω）
 */
export const resistanceAt = (deflection: number): number => {
  const f = Math.min(1, Math.max(1e-4, deflection));
  return OHM_MID * (1 / f - 1);
};

/**
 * 反向：给定挡位与被测物理量的真实值 → 指针偏转。
 *
 * - 欧姆挡：该挡中值电阻 = R_中 × 倍率，f = 中值/(中值 + R_x)（＝教材 12.2 的 I_x/I_g）；
 * - 电压/电流挡：f = 实测值 / 量程，超过量程则打到最右（打表）。
 *
 * @param gear 当前挡位
 * @param value 被测物理量的真实值（Ω / V / mA）
 * @returns 归一化偏转 0~1
 */
export const deflectionOf = (gear: Gear, value: number): number => {
  if (gear.category === "ohm") {
    const mid = OHM_MID * (gear.multiplier ?? 1);
    return mid / (mid + Math.max(0, value));
  }
  const range = gear.range ?? 1;
  if (range <= 0) return 0;
  return Math.min(1, Math.max(0, value / range));
};

/**
 * 该挡位下指针是否落在"表盘中间区域"（教材口径：偏转过大过小误差都大）
 *
 * @param deflection 归一化偏转 0~1
 * @returns 是否落在 0.2~0.8 的中间区域
 */
export const isMidZone = (deflection: number): boolean => deflection >= 0.2 && deflection <= 0.8;

const texNumber = (value: number, digits = 1): string =>
  Number.isInteger(value) ? value.toString() : value.toFixed(digits);

// ─────────────────────────────────────────────────────────────
// 各挡位的读数实现：一个函数只管一段刻度线，`calculateReading` 只做分派。
// 数值规则与拆分前逐字一致：均匀刻度按分度值取位、欧姆挡取刻度值再乘倍率。
// ─────────────────────────────────────────────────────────────

// OFF 挡：表内电路与表笔断开
const readOff = (f: number): Reading => ({
  deflection: f,
  scaleReadingTex: String.raw`\text{—}`,
  valueTex: String.raw`\text{—}`,
  unitTex: "",
  stepsTex: [],
  note: "选择开关在 OFF 挡：表内电路与表笔断开，处于停用保护状态。用完应拨到这一挡。",
  level: "info",
});

// 指针几乎不偏转：待测电阻远大于本挡中值
const readOhmOverflow = (f: number): Reading => ({
  deflection: f,
  scaleReadingTex: String.raw`\infty`,
  valueTex: String.raw`\infty`,
  unitTex: String.raw`\Omega`,
  stepsTex: [],
  note: "指针几乎不偏转，说明待测电阻远大于本挡中值；应换用更大倍率挡，换挡后必须重新短接调零。",
  level: "warn",
});

// 指针满偏：短接调零点，被测电阻为 0
const readOhmFullScale = (f: number, mult: number): Reading => ({
  deflection: f,
  scaleReadingTex: "0",
  valueTex: "0",
  unitTex: String.raw`\Omega`,
  stepsTex: [String.raw`0 \times ` + mult + String.raw` = 0\ \Omega`],
  note: "指针满偏（短接调零点）：被测电阻为 0，或所选倍率太大读不出差别。",
  level: "warn",
});

// 欧姆挡读数要点：偏转太小/太大都说明倍率选得不合适
const ohmAccuracyNote = (f: number): { note: string; level: Reading["level"] } => {
  if (f < 0.2) {
    return {
      note: "指针偏转角太小（左端刻度过密），读数误差大：应换用更大倍率挡，并重新短接调零。",
      level: "warn",
    };
  }
  if (f > 0.8) {
    return {
      note: "指针偏转角太大（靠近右端 0 刻度），读数误差大：应换用更小倍率挡，并重新短接调零。",
      level: "warn",
    };
  }
  return {
    note: "指针落在刻度盘的中间区域，此时读数误差最小 —— 这正是选倍率的依据。",
    level: "ok",
  };
};

// 欧姆挡正常区间：读数落到最近的刻度格，再乘倍率（R = 刻度值 × 倍率）
const readOhmScale = (f: number, mult: number): Reading => {
  const rawR = resistanceAt(f);
  const snapped = OHM_SCALE_VALUES.reduce((nearest, value) =>
    Math.abs(value - rawR) < Math.abs(nearest - rawR) ? value : nearest,
  );
  const scaleTex = texNumber(snapped);
  const finalValue = snapped * mult;
  const useKilo = finalValue >= 1000;

  return {
    deflection: f,
    scaleReadingTex: scaleTex,
    valueTex: useKilo ? (finalValue / 1000).toFixed(2) : texNumber(finalValue),
    unitTex: useKilo ? String.raw`\text{k}\Omega` : String.raw`\Omega`,
    stepsTex: [`\\text{读数} = ${scaleTex} \\times ${mult} = ${texNumber(finalValue)}\\ \\Omega`],
    ...ohmAccuracyNote(f),
  };
};

// 欧姆挡总入口
const readOhm = (gear: Gear, f: number): Reading => {
  const mult = gear.multiplier ?? 1;
  if (f <= 0.002) return readOhmOverflow(f);
  if (f >= 0.998) return readOhmFullScale(f, mult);
  return readOhmScale(f, mult);
};

// 直流 0~250 刻度线（量程 250 / 25 / 2.5 共用）
const readLinear250 = (f: number, range: number, unitTex: string): Reading => {
  const reading250 = Math.round((f * 250) / 5) * 5;
  const divisor = range === 250 ? 1 : range === 25 ? 10 : 100;
  const value = reading250 / divisor;
  const digits = divisor === 1 ? 0 : divisor === 10 ? 1 : 2;
  const divisionTex = texNumber(5 / divisor, 3);

  return {
    deflection: f,
    scaleReadingTex: reading250.toString(),
    valueTex: value.toFixed(digits),
    unitTex,
    stepsTex: [
      `\\text{看 } 0\\sim250 \\text{ 刻度线读到 } ${reading250}`,
      `\\text{分度值} = ${range}\\ \\text{量程} \\div 50 = ${divisionTex}\\ ${unitTex}`,
      `${reading250} \\div ${divisor} = ${value.toFixed(digits)}\\ ${unitTex}`,
    ],
    note: `量程 ${range} 时不估读，直接读到分度值 ${divisionTex} ${range === 250 ? "V" : ""}。视线要正对表盘、与反光镜里的像重合以消除视差。`,
    level: "ok",
  };
};

// 直流 0~50 刻度线：每小格 1，按 1/10 估读
const readLinear50 = (f: number, range: number, unitTex: string): Reading => {
  const value = Math.round(f * 50 * 10) / 10;
  return {
    deflection: f,
    scaleReadingTex: value.toFixed(1),
    valueTex: value.toFixed(1),
    unitTex,
    stepsTex: [
      `\\text{看 } 0\\sim50 \\text{ 刻度线，每小格} = 1`,
      `\\text{估读到 } 0.1\\ \\text{（读数的 } \\tfrac{1}{10} \\text{）} \\Rightarrow ${value.toFixed(1)}\\ ${unitTex}`,
    ],
    note: `量程 ${range}，刻度盘 50 小格，分度值 1，读到 0.1。`,
    level: "ok",
  };
};

// 直流 0~10 刻度线：分度值 0.2，不估读
const readLinear10 = (f: number, unitTex: string): Reading => {
  const value = Math.round(f * 10 * 5) / 5;
  return {
    deflection: f,
    scaleReadingTex: value.toFixed(1),
    valueTex: value.toFixed(1),
    unitTex,
    stepsTex: [
      `\\text{看 } 0\\sim10 \\text{ 刻度线，每小格} = 0.2`,
      `\\text{分度值是 } 0.2 \\text{，一律不估读} \\Rightarrow ${value.toFixed(1)}\\ ${unitTex}`,
    ],
    note: "量程 10，刻度盘 50 小格，分度值 0.2，读到 0.2 这一位即可。",
    level: "ok",
  };
};

// 直流电压 / 直流电流（均匀刻度）：按 scaleType 选对应刻度线
const readDc = (gear: Gear, f: number): Reading | null => {
  const range = gear.range ?? 1;
  const { unitTex } = gear;
  if (gear.scaleType === "linear_250") return readLinear250(f, range, unitTex);
  if (gear.scaleType === "linear_50") return readLinear50(f, range, unitTex);
  if (gear.scaleType === "linear_10") return readLinear10(f, unitTex);
  return null;
};

// 交流 10 V 挡：必须读第三排红色专用刻度线
const readAcv10 = (f: number): Reading => {
  const value = Math.round(f * 10 * 100) / 100;
  return {
    deflection: f,
    scaleReadingTex: value.toFixed(2),
    valueTex: value.toFixed(2),
    unitTex: String.raw`\text{V}`,
    stepsTex: [
      `\\text{专门读第三排红色 } 10\\ \\text{V}\\sim \\text{ 刻度线，每小格} = 0.1\\ \\text{V}`,
      `\\text{估读到 } 0.01\\ \\text{V} \\Rightarrow ${value.toFixed(2)}\\ \\text{V}`,
    ],
    note: "交流 10 V 挡内部整流二极管的非线性最明显，必须读它自己的专用刻度线，不能借用直流刻度。",
    level: "warn",
  };
};

// 交流 50 V 挡：借 0~50 刻度线
const readAcv50 = (f: number): Reading => {
  const value = Math.round(f * 50 * 10) / 10;
  return {
    deflection: f,
    scaleReadingTex: value.toFixed(1),
    valueTex: value.toFixed(1),
    unitTex: String.raw`\text{V}`,
    stepsTex: [`\\text{读 } 0\\sim50 \\text{ 刻度线} \\Rightarrow ${value.toFixed(1)}\\ \\text{V}`],
    note: "交流电压读的是正弦交流电的有效值。",
    level: "ok",
  };
};

// 交流 250 V 挡：借 0~250 刻度线
const readAcv250 = (f: number): Reading => {
  const value = Math.round(f * 250);
  return {
    deflection: f,
    scaleReadingTex: value.toString(),
    valueTex: value.toString(),
    unitTex: String.raw`\text{V}`,
    stepsTex: [`\\text{读 } 0\\sim250 \\text{ 刻度线} \\Rightarrow ${value}\\ \\text{V}`],
    note: "交流 250 V 挡常用来测市电（有效值约 220 V）；它也是没有 OFF 挡时的停用挡位。",
    level: "ok",
  };
};

// 交流电压：按挡位选刻度线
const readAcv = (gear: Gear, f: number): Reading | null => {
  if (gear.id === "acv_10") return readAcv10(f);
  if (gear.scaleType === "linear_50") return readAcv50(f);
  if (gear.scaleType === "linear_250") return readAcv250(f);
  return null;
};

// 兜底：挡位模型与刻度线对不上时不显示读数
const readNone = (f: number): Reading => ({
  deflection: f,
  scaleReadingTex: String.raw`\text{—}`,
  valueTex: String.raw`\text{—}`,
  unitTex: "",
  stepsTex: [],
  note: "",
  level: "info",
});

/**
 * 读数主入口：把归一化偏转与挡位换算成表盘读数。
 *
 * @param gear 当前挡位（决定读哪一排刻度线、要不要乘倍率）
 * @param rawDeflection 指针归一化偏转，0 = 最左、1 = 最右
 * @returns 读数明细（刻度值、最终值、换算步骤、读数要点）
 */
export const calculateReading = (gear: Gear, rawDeflection: number): Reading => {
  const f = Math.max(0, Math.min(1, rawDeflection));
  if (gear.category === "off") return readOff(f);
  if (gear.category === "ohm") return readOhm(gear, f);
  if (gear.category === "dcv" || gear.category === "dcma") return readDc(gear, f) ?? readNone(f);
  if (gear.category === "acv") return readAcv(gear, f) ?? readNone(f);
  return readNone(f);
};
