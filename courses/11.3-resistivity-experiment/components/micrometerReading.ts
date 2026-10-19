/**
 * 螺旋测微器读数规则（真实规则实现）。
 *
 * 移植自 `~/projects/physics-modal/src/views/micrometer/micrometerPhysics.ts`：原项目是一套独立的 three.js
 * 三维演示，这里只搬读数计算这一层——课件不需要三维模型，但读数规则必须与之一致。
 *
 * 规则：螺距 0.5 mm ÷ 可动刻度 50 等分 = 0.01 mm/格。 先读固定刻度（整毫米刻度线露出多少；再看 0.5 mm 半毫米线是否露出）， 再读可动刻度格数（末位要估读一位），
 * 读数 = 固定刻度 + 可动刻度格数 × 0.01 mm。
 */
export interface MicrometerReading {
  /** 被测长度（mm） */
  rawMm: number;
  /** 固定刻度上露出的整毫米数 */
  sleeveMainMm: number;
  /** 半毫米线露出时 0.5，未露出时 0 */
  halfMm: number;
  /** 固定刻度总读数 */
  sleeveTotalMm: number;
  /** 与基准线对齐的可动刻度格数（可含半格，如 22.5） */
  thimbleGrids: number;
  /** 可动刻度读数（mm） */
  thimbleMm: number;
  /** 三位小数的读数文本 */
  formatted: string;
}

/**
 * 由被测长度反推刻度状态：整毫米 → 半毫米线是否露出 → 可动刻度格数。
 *
 * @param value 被测长度（mm，量程 0～25）
 * @returns 该长度对应的固定刻度读数、半毫米线状态与可动刻度格数
 */
export const calculateMicrometerReading = (value: number): MicrometerReading => {
  const rawMm = Math.max(0, Math.min(25, value));
  const sleeveMainMm = Math.floor(rawMm);
  const remainder = rawMm - sleeveMainMm;
  const halfMm = remainder >= 0.5 ? 0.5 : 0;
  const sleeveTotalMm = sleeveMainMm + halfMm;
  const thimbleMm = remainder - halfMm;
  const thimbleGrids = Number((thimbleMm / 0.01).toFixed(1));

  return {
    rawMm,
    sleeveMainMm,
    halfMm,
    sleeveTotalMm,
    thimbleGrids,
    thimbleMm,
    formatted: rawMm.toFixed(3),
  };
};
