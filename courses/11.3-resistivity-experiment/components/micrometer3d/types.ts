/** 三维演示用到的类型（移植自 physics-modal 的 micrometerPhysics，只留课件用得到的部分）。 */

/** 相机预设：整体 / 刻度特写 / 测砧 / 俯视 */
export type ViewPreset = "overview" | "closeup" | "anvil" | "top";

/** 可以夹在测砧与螺杆之间的待测物 */
export interface SampleObject {
  id: string;
  name: string;
  /** 待测物尺寸（mm），决定螺杆能推进到的最大读数 */
  sizeMm: number;
  color: string;
  type: "wire" | "box" | "sphere";
}
