/**
 * 能级图（EnergyLevelDiagram）与发射光谱（EmissionSpectrumSvg）共用的几何/能量差数据。
 *
 * 能级纵坐标 y 从下往上能量增大（E ∝ AXIS_BOTTOM − y）。四条能级「越高越密」， 只作定性示意：教材 13.5 没有给能级数值，全课不标任何能量值。
 *
 * ⛔ 两个组件都必须从这里取数据：
 *
 * - 跃迁箭头的起止点要精确落在能级线上；
 * - 发射光谱两条亮线的位置由同一份能级差换算。 各写一套数字，两页就会对不上。
 */

export const AXIS_BOTTOM = 272;

/** N = 1…4 的能级线纵坐标（从低到高） */
export const LEVEL_Y = [246, 178, 138, 114];

/** 相邻能级的能量差（用纵坐标差表示，正比于真实能量差） */
export const GAP = {
  /** N = 2 → n = 1 */
  twoOne: LEVEL_Y[0] - LEVEL_Y[1],
  /** N = 3 → n = 2 */
  threeTwo: LEVEL_Y[1] - LEVEL_Y[2],
};
