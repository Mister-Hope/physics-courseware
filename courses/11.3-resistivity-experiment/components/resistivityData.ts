/**
 * 第二课时的实验数据与电阻率计算（真实公式，供各组件共用，保证全课数字自洽）。
 *
 * 电阻丝取镍铬合金丝：教材只说"与已知材料的电阻率进行对比"，具体数值取教材 11.2 节电阻率表 （镍铬合金约 1.1×10⁻⁶ Ω·m，20 ℃）——**待教师核对**。 有效长度 0.600
 * m（刻度尺）、直径 0.635 mm（螺旋测微器，教材习题 3 的取值）。
 */
export const WIRE = {
  material: "镍铬合金",
  /** 20 ℃ 时的电阻率（Ω·m） */
  resistivity: 1.1e-6,
  /** 接入电路的有效长度（m） */
  length: 0.6,
  /** 直径（m），即 0.635 mm */
  diameter: 0.635e-3,
  /** 电源电动势（V） */
  emf: 3,
  /** 滑动变阻器最大阻值（Ω） */
  rheostatMax: 20,
  /** 电流表量程（A） */
  ammeterRange: 0.6,
} as const;

/**
 * 电阻丝横截面积 S = πd²/4。
 *
 * @returns 横截面积（m²）
 */
export const crossSection = (): number => (Math.PI * WIRE.diameter ** 2) / 4;

/**
 * 由材料电阻率算出的"真值"电阻 R = ρl/S——实验要测的就是它。
 *
 * @returns 电阻丝的电阻（Ω）
 */
export const nominalResistance = (): number => (WIRE.resistivity * WIRE.length) / crossSection();

/** 实验记录的 6 组数据：移动滑片，电流由小到大（滑片接入阻值 20 Ω → 3 Ω） */
export const MEASURED_POINTS: { i: number; u: number }[] = [
  { i: 0.14, u: 0.297 },
  { i: 0.197, u: 0.413 },
  { i: 0.262, u: 0.545 },
  { i: 0.336, u: 0.703 },
  { i: 0.443, u: 0.925 },
  { i: 0.56, u: 1.165 },
];

/**
 * U-I 图线斜率：过原点作最小二乘拟合，R = Σ(IU) / Σ(I²)。
 *
 * @param points 测量数据点，默认用本课记录的 6 组
 * @returns 图线斜率，即电阻丝的电阻（Ω）
 */
export const fittedResistance = (points: { i: number; u: number }[] = MEASURED_POINTS): number => {
  let numerator = 0;
  let denominator = 0;
  for (const point of points) {
    numerator += point.i * point.u;
    denominator += point.i * point.i;
  }
  return numerator / denominator;
};

/**
 * 由测量值算出的电阻率 ρ = SR/l。
 *
 * @returns 电阻率（Ω·m）
 */
export const measuredResistivity = (): number =>
  (crossSection() * fittedResistance()) / WIRE.length;

/**
 * 把数字写成 LaTeX 科学计数法，如 3.17 \times 10^{-7}。
 *
 * @param value 要写的数字
 * @param digits 科学计数法保留的小数位数
 * @returns LaTeX 片段
 */
export const scientific = (value: number, digits = 2): string => {
  const [mantissa, exponent] = value.toExponential(digits).split("e");
  return `${mantissa} \\times 10^{${Number(exponent)}}`;
};
