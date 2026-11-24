/* oxlint-disable max-lines, max-statements, max-lines-per-function -- 高精度 Apple Watch Series 9 (45mm) + 磁吸快充头 3D 装配体（09 第3轮修改版）集中在单模块，便于统一管理几何、PBR 材质与纹理释放 */
/**
 * 高精度 Apple Watch (45mm) + 磁吸充电头 (27.5mm) 3D 装配体模块（09 第 3 轮修改版）
 *
 * 第 3 轮核心升级（严格对齐 09-第3轮修改方案-P2-P3与模型.md §4 / §5 / §6.1）：
 *
 * 1. 表冠（Digital Crown）：作为独立组件/Mesh（不与表身布尔混合），侧面采用 56 齿真实 3D 齿轮凹槽几何（能清晰看到齿轮滚花立体感）+ bump 纹理。
 * 2. 屏幕（2.5D Sapphire Screen）：屏幕加大（3.58 × 4.28），边缘采用 8 段大曲率 2.5D 弧面直接流畅过渡连到表壳中框，彻底消除正面明显的“棱/台阶”。
 * 3. 侧边按钮（Side Button）：右侧偏下长条按钮加宽，采用 32 段高细分轮廓与 4 段精致圆弧倒角，彻底消除毛刺。
 * 4. 表带方向与连接（Strap & Lug）：旋转 90° 改为正确的展开方向（在手表上下表耳处沿 ±Y 顺畅向两侧展开），并通过真实金属表耳滑轨（Lug）与表壳精密连接，无悬空、无穿模。
 * 5. 充电线（Charger Cable）：从磁吸充电盘左侧（-X）白色护套（strain relief）自然向左引出，绝不从模型内部凭空冒出，也不挡表盘。
 * 6. 表背非金属化 + 内部电路板（Ceramic/Sapphire Back & Internal PCB）：
 *
 *    - 背盖主体改为微磨砂深色精密陶瓷/蓝宝石（非金属，metalness: 0.03），避免整块亮金属板产生涡流屏蔽磁场；金属只保留在中框与外侧窄圈。
 *    - 背盖透明/剖开后：首先看到黄铜/金属光泽的受电线圈，其后方是一块深色柔性电路板（PCB）+ Apple S9 主控芯片 + 电源管理 IC +
 *      金色排线与微贴片电容（代表手表的负载，而非整块金属板）。
 * 7. 开放项 §6.1（像“线圈扎带”的部件）：提供 `"A" | "B" | "C"` 三种模式接口 `setClipVariant(variant)`，默认 `"C"`（真实精密切削表耳连接件 +
 *    内部微型压片），亦可切 `"A"`（去掉）或 `"B"`（保留并改为深色非金属定位卡扣）。
 */
import type { BufferGeometry, Material, Scene, Texture } from "three";
import {
  BoxGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Path,
  PlaneGeometry,
  RepeatWrapping,
  RingGeometry,
  Shape,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";

export type WatchPose = "front" | "side" | "back" | "coil";

export interface WatchModelApi {
  /** 手表根组（局部中心在原点，表盘正面朝 +Z，表背朝 -Z） */
  root: Group;
  /** 磁吸充电头根组（充电白面朝 +Z，银色铝壳朝 -Z，白线向 -X 左侧引出） */
  chargerRoot: Group;
  /** 切换预设展示状态 */
  setPose: (pose: WatchPose) => void;
  /** 控制手表后盖与充电头外壳透明度（0~1） 屏幕、金属中框、表带、表冠、内部 PCB 芯片永远保持不透明实体！ */
  setBackCoverOpacity: (v: number) => void;
  /** 控制屏幕亮起/熄灭（屏幕玻璃本体永远不透明） */
  setScreenOn: (on: boolean) => void;
  /** 控制屏幕绿色闪电与 12 点钟顺时针充电环进度（0 为暗屏，0..1 为充电进度，如 0.65） */
  setChargeProgress: (progress: number) => void;
  /**
   * 控制黄铜线圈透明度与高亮：
   *
   * - False / 静态：黄铜金属光泽实体（opacity ≈ 0.94）
   * - True / 电流动效出现时：变为半透明黄铜管（opacity ≈ 0.38），清晰露出管内连续运动的蓝色电子
   */
  setCoilTranslucent: (translucent: boolean) => void;
  /** 兼容旧调用：控制线圈显隐与高亮 */
  setCoilVisible: (v: boolean) => void;
  /** 返回受电线圈（rxCurve，位于 root 局部 z = -0.35）与送电线圈（txCurve，位于 chargerRoot 局部 z = -0.13）路径 */
  getCoilPaths: () => { rxCurve: CatmullRomCurve3; txCurve: CatmullRomCurve3 };
  /** 释放所有几何体、材质与 CanvasTexture 资源 */
  dispose: () => void;
}

const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));

// 创建中心在原点的超高细分平滑圆角矩形 Shape（XY 平面，64 段圆弧无毛刺）
const createRoundedRectPath = (w: number, h: number, r: number): Shape => {
  const shape = new Shape();
  const hw = w / 2;
  const hh = h / 2;
  const cr = Math.min(r, hw * 0.96, hh * 0.96);
  shape.moveTo(-hw + cr, -hh);
  shape.lineTo(hw - cr, -hh);
  shape.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hh - cr);
  shape.absarc(hw - cr, hh - cr, cr, 0, Math.PI / 2, false);
  shape.lineTo(-hw + cr, hh);
  shape.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hh + cr);
  shape.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
  return shape;
};

// 创建带内孔的圆角矩形框 Shape
const createRoundedRingShape = (
  outer: { w: number; h: number; r: number },
  inner: { w: number; h: number; r: number },
): Shape => {
  const outerShape = createRoundedRectPath(outer.w, outer.h, outer.r);
  const hole = new Path();
  const hw = inner.w / 2;
  const hh = inner.h / 2;
  const cr = Math.min(inner.r, hw * 0.96, hh * 0.96);
  hole.moveTo(-hw + cr, -hh);
  hole.lineTo(hw - cr, -hh);
  hole.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
  hole.lineTo(hw, hh - cr);
  hole.absarc(hw - cr, hh - cr, cr, 0, Math.PI / 2, false);
  hole.lineTo(-hw + cr, hh);
  hole.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
  hole.lineTo(-hw, -hh + cr);
  hole.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
  outerShape.holes.push(hole);
  return outerShape;
};

// 生成真实 3D 齿轮滚花截面 Shape（56 个精密波峰波谷，挤出后在侧面直接呈现真实齿轮滚花立体感）
const createGearCrownShape = (outerR: number, grooveDepth: number, teeth: number): Shape => {
  const shape = new Shape();
  const steps = teeth * 4;
  for (let i = 0; i <= steps; i += 1) {
    const a = (i / steps) * Math.PI * 2;
    const wave = Math.cos(a * teeth);
    const r = outerR - grooveDepth * 0.5 * (1 - wave);
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  return shape;
};

// 生成 XY 平面上的精密平面阿基米德螺旋曲线（中心在 (0, 0, zOffset)，供受电线圈使用）
const createPlanarSpiralCurve = (
  innerR: number,
  outerR: number,
  turns: number,
  zOffset: number,
): CatmullRomCurve3 => {
  const pts: Vector3[] = [];
  const totalSegments = Math.round(turns * 48);
  for (let i = 0; i <= totalSegments; i += 1) {
    const u = i / totalSegments;
    const angle = u * turns * Math.PI * 2;
    const r = innerR + (outerR - innerR) * u;
    pts.push(new Vector3(r * Math.cos(angle), r * Math.sin(angle), zOffset));
  }
  return new CatmullRomCurve3(pts, false);
};

// 生成送电线圈（TX Coil）螺旋 + 中心逆变器圆盘两端引线连续回路 Curve：
// 1. USB 供电线先通入充电器中央圆盘（逆变器，直流 -> 高频交流），再从逆变器接出两根线：
//    一根连到螺旋线圈的最外端，一根连到螺旋线圈的内端；
// 2. 蓝色电子只在这条“逆变器 <-> 螺旋线圈”的高频交流回路中往返振荡，USB 供电线里绝不出现电子图示！
const createTxCompleteLoopCurve = (
  innerR: number,
  outerR: number,
  turns: number,
  zOffset: number,
): CatmullRomCurve3 => {
  // 1. 逆变器圆盘上侧输出端 -> 跨越各匝后方 (z = zOffset - 0.055) -> 连到螺旋线圈最外端 (-outerR, 0, zOffset)
  const pts: Vector3[] = [
    new Vector3(-0.22, 0.14, -0.2),
    new Vector3(-0.56, 0.24, zOffset - 0.055),
    new Vector3(-0.92, 0.18, zOffset - 0.055),
    new Vector3(-outerR, 0.05, zOffset - 0.025),
  ];

  // 2. 7 匝阿基米德螺旋：从最外端 (angle = π, r = outerR) 向内绕到最内端 (angle = π + turns*2π, r = innerR)
  const totalSegments = Math.round(turns * 48);
  for (let i = 0; i <= totalSegments; i += 1) {
    const u = i / totalSegments;
    const angle = Math.PI + u * turns * Math.PI * 2;
    const r = outerR - (outerR - innerR) * u;
    pts.push(new Vector3(r * Math.cos(angle), r * Math.sin(angle), zOffset));
  }

  // 3. 螺旋线圈最内端 (-innerR, 0, zOffset) -> 直接连回中央逆变器圆盘下侧输出端
  pts.push(new Vector3(-innerR + 0.04, -0.09, zOffset - 0.015), new Vector3(-0.22, -0.14, -0.2));

  return new CatmullRomCurve3(pts, false);
};

// 生成数码表冠的微滚花法线/凹凸纹理
const createCrownKnurlBumpTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const grooves = 56;
    const step = canvas.width / grooves;
    for (let i = 0; i < grooves; i += 1) {
      const x = i * step;
      const grad = ctx.createLinearGradient(x, 0, x + step, 0);
      grad.addColorStop(0, "#1f1f1f");
      grad.addColorStop(0.28, "#e5e5e5");
      grad.addColorStop(0.5, "#ffffff");
      grad.addColorStop(0.72, "#e5e5e5");
      grad.addColorStop(1, "#1f1f1f");
      ctx.fillStyle = grad;
      ctx.fillRect(x, 2, step, canvas.height - 4);
    }
  }
  const tex = new CanvasTexture(canvas);
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
};

// 生成运动表带侧视轮廓 Shape（在 XY 平面先设 x = -worldZ, y = worldY），经 rotateY(PI/2) 后直接映射为 X = worldX, Y = worldY, Z = worldZ！
const createSideProfileStrapShape = (dirY: 1 | -1): Shape => {
  const outerPts = [
    new Vector2(-0.1, dirY * 2.18),
    new Vector2(-0.02, dirY * 2.95),
    new Vector2(0.22, dirY * 3.85),
    new Vector2(0.68, dirY * 4.75),
    new Vector2(1.32, dirY * 5.45),
  ];
  const innerPts = [
    new Vector2(1.52, dirY * 5.28),
    new Vector2(0.88, dirY * 4.58),
    new Vector2(0.44, dirY * 3.72),
    new Vector2(0.2, dirY * 2.86),
    new Vector2(0.14, dirY * 2.18),
  ];
  const shape = new Shape();
  shape.moveTo(outerPts[0].x, outerPts[0].y);
  shape.splineThru(outerPts.slice(1));
  shape.lineTo(innerPts[0].x, innerPts[0].y);
  shape.splineThru(innerPts.slice(1));
  shape.closePath();
  return shape;
};

// 绘制 Apple Watch OLED 无线充电界面 CanvasTexture
const drawChargeScreenCanvas = (canvas: HTMLCanvasElement, progress: number): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const clamped = clamp(progress, 0, 1);
  if (clamped <= 0.001) return;

  const cx = w / 2;
  const cy = h * 0.48;
  const radius = w * 0.31;
  const lineWidth = w * 0.058;

  // 1. 屏幕中心柔和绿色径向辉光（透明底，直接叠在 2.5D 蓝宝石深黑玻璃上）
  const bgGlow = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.35);
  bgGlow.addColorStop(0, "rgba(16, 185, 129, 0.25)");
  bgGlow.addColorStop(0.55, "rgba(5, 150, 105, 0.08)");
  bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = bgGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // 2. 充电圆环暗色轨道底环
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(16, 185, 129, 0.18)";
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();

  // 3. 从 12 点钟方向（-Math.PI / 2）顺时针延伸的绿色渐变进度弧
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + clamped * Math.PI * 2;

  ctx.save();
  ctx.shadowColor = "rgba(52, 211, 153, 0.85)";
  ctx.shadowBlur = 24;
  const ringGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
  ringGrad.addColorStop(0, "#10b981");
  ringGrad.addColorStop(0.5, "#34d399");
  ringGrad.addColorStop(1, "#6ee7b7");

  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle, false);
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();

  // 进度弧末端亮白绿高光点
  const tipX = cx + radius * Math.cos(endAngle);
  const tipY = cy + radius * Math.sin(endAngle);
  ctx.save();
  ctx.beginPath();
  ctx.arc(tipX, tipY, lineWidth * 0.34, 0, Math.PI * 2);
  ctx.fillStyle = "#ecfdf5";
  ctx.shadowColor = "#6ee7b7";
  ctx.shadowBlur = 14;
  ctx.fill();
  ctx.restore();

  // 4. 中央绿色闪电图标
  ctx.save();
  ctx.fillStyle = "#34d399";
  ctx.shadowColor = "rgba(52, 211, 153, 0.9)";
  ctx.shadowBlur = 18;
  const s = radius * 0.46;
  ctx.beginPath();
  ctx.moveTo(cx + s * 0.12, cy - s * 0.95);
  ctx.lineTo(cx - s * 0.56, cy + s * 0.08);
  ctx.lineTo(cx - s * 0.04, cy + s * 0.08);
  ctx.lineTo(cx - s * 0.18, cy + s * 0.95);
  ctx.lineTo(cx + s * 0.56, cy - s * 0.12);
  ctx.lineTo(cx + s * 0.04, cy - s * 0.12);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

export const createWatchAssembly = (scene?: Scene): WatchModelApi => {
  const root = new Group();
  root.name = "AppleWatch45mmRoot";

  const chargerRoot = new Group();
  chargerRoot.name = "MagSafeChargerPuckRoot";
  chargerRoot.position.set(0, 0, -0.54);

  if (scene) {
    scene.add(root);
    scene.add(chargerRoot);
  }

  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();

  const trackGeo = <T extends BufferGeometry>(geo: T): T => {
    geometries.add(geo);
    return geo;
  };
  const trackMat = <T extends Material>(mat: T): T => {
    materials.add(mat);
    return mat;
  };
  const trackTex = <T extends Texture>(tex: T): T => {
    textures.add(tex);
    return tex;
  };

  // =========================================================================
  // 1. PBR 材质定义（非金属陶瓷/蓝宝石背盖 + 钛金属中框 + 2.5D 蓝宝石屏 + 黄铜线圈 + 内部深色 PCB）
  // =========================================================================

  // (1) 钛金属 / 深空灰拉丝不锈钢中框（只保留在中框与外侧窄圈，实体不透明）
  const titaniumCaseMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#7b8696",
      metalness: 0.88,
      roughness: 0.24,
      clearcoat: 0.25,
      clearcoatRoughness: 0.18,
      transparent: false,
      opacity: 1,
    }),
  );

  const darkMetalTrimMat = trackMat(
    new MeshStandardMaterial({
      color: "#1e2430",
      metalness: 0.65,
      roughness: 0.42,
      transparent: false,
      opacity: 1,
    }),
  );

  // 数码表冠滚花材质（真实 3D 齿轮槽 + bumpMap）
  const crownBumpTex = trackTex(createCrownKnurlBumpTexture());
  const crownKnurlMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#8894a6",
      metalness: 0.9,
      roughness: 0.22,
      bumpMap: crownBumpTex,
      bumpScale: 0.04,
      clearcoat: 0.22,
      transparent: false,
      opacity: 1,
    }),
  );

  const crownRedRingMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#dc2626",
      metalness: 0.35,
      roughness: 0.25,
      clearcoat: 0.8,
      transparent: false,
      opacity: 1,
    }),
  );

  // (2) 2.5D 蓝宝石弧面玻璃屏幕本体（永远不透明 opacity: 1, transparent: false，与中框弧线连接无台阶）
  const sapphireScreenMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#020306",
      metalness: 0.02,
      roughness: 0.22,
      clearcoat: 0.18,
      clearcoatRoughness: 0.28,
      reflectivity: 0.25,
      envMapIntensity: 0.12,
      transparent: false,
      opacity: 1,
    }),
  );

  const uiCanvas = document.createElement("canvas");
  uiCanvas.width = 512;
  uiCanvas.height = 608;
  drawChargeScreenCanvas(uiCanvas, 0);

  const uiTexture = trackTex(new CanvasTexture(uiCanvas));
  uiTexture.colorSpace = SRGBColorSpace;
  uiTexture.minFilter = LinearFilter;
  uiTexture.magFilter = LinearFilter;

  const screenUiMat = trackMat(
    new MeshBasicMaterial({
      map: uiTexture,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );

  // (3) 氟橡胶运动表带材质（深午夜蓝灰，细腻哑光亲肤质感）
  const fluoroStrapMat = trackMat(
    new MeshStandardMaterial({
      color: "#223044",
      metalness: 0.04,
      roughness: 0.62,
      transparent: false,
      opacity: 1,
    }),
  );

  const strapPinMat = trackMat(
    new MeshStandardMaterial({
      color: "#94a3b8",
      metalness: 0.85,
      roughness: 0.24,
      transparent: false,
      opacity: 1,
    }),
  );

  // (4) 表背精密陶瓷/蓝宝石外盖（非金属！metalness: 0.03，微磨砂暗曜石陶瓷，绝不是亮金属板）
  const backCeramicMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#1c2331",
      metalness: 0.03,
      roughness: 0.36,
      clearcoat: 0.45,
      clearcoatRoughness: 0.28,
      transparent: true,
      opacity: 1,
    }),
  );

  // 中央深色蓝宝石传感器模组圆台（非金属蓝宝石晶体）
  const backSapphireDomeMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#0b101b",
      metalness: 0.02,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 1,
    }),
  );

  const backSensorElectrodeMat = trackMat(
    new MeshStandardMaterial({
      color: "#334155",
      metalness: 0.15,
      roughness: 0.42,
      transparent: true,
      opacity: 1,
    }),
  );

  const backLedLensMat = trackMat(
    new MeshStandardMaterial({
      color: "#064e3b",
      emissive: "#10b981",
      emissiveIntensity: 0.15,
      metalness: 0.08,
      roughness: 0.2,
      transparent: true,
      opacity: 1,
    }),
  );

  // (5) 内部深色柔性电路板（PCB）+ 芯片 + 金色排线材质（09 §4.8：背盖透明后看到铜线圈 + 深色电路板/芯片/排线）
  const pcbBoardMat = trackMat(
    new MeshStandardMaterial({
      color: "#0c1914",
      metalness: 0.08,
      roughness: 0.72,
      transparent: false,
      opacity: 1,
    }),
  );

  const icChipMat = trackMat(
    new MeshStandardMaterial({
      color: "#111827",
      metalness: 0.25,
      roughness: 0.35,
      transparent: false,
      opacity: 1,
    }),
  );

  const goldRibbonMat = trackMat(
    new MeshStandardMaterial({
      color: "#d97706",
      metalness: 0.85,
      roughness: 0.26,
      transparent: false,
      opacity: 1,
    }),
  );

  const smdCapMat = trackMat(
    new MeshStandardMaterial({
      color: "#92400e",
      metalness: 0.4,
      roughness: 0.4,
      transparent: false,
      opacity: 1,
    }),
  );

  // (6) 两个线圈材质（09 §5：黄铜/金属光泽；充电动效出现时变半透明，里面蓝色电子连续运动）
  const rxCoilMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#e5a93c",
      emissive: "#b45309",
      emissiveIntensity: 0.22,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.4,
      transparent: true,
      opacity: 0.94,
    }),
  );

  const txCoilMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#eab308",
      emissive: "#ca8a04",
      emissiveIntensity: 0.24,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.4,
      transparent: true,
      opacity: 0.94,
    }),
  );

  const magnetCoreMat = trackMat(
    new MeshStandardMaterial({
      color: "#1e293b",
      metalness: 0.25,
      roughness: 0.55,
      transparent: false,
      opacity: 1,
    }),
  );

  // (7) 磁吸充电头材质：微磨砂白色浅凹顶盖 + 银色金属底壳
  const chargerWhiteTopMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#f8fafc",
      metalness: 0.02,
      roughness: 0.34,
      clearcoat: 0.2,
      clearcoatRoughness: 0.35,
      side: DoubleSide,
      transparent: true,
      opacity: 1,
    }),
  );

  const chargerSilverBodyMat = trackMat(
    new MeshPhysicalMaterial({
      color: "#d1d5db",
      metalness: 0.82,
      roughness: 0.26,
      clearcoat: 0.18,
      clearcoatRoughness: 0.25,
      transparent: true,
      opacity: 1,
    }),
  );

  const chargerSeamMat = trackMat(
    new MeshStandardMaterial({
      color: "#475569",
      metalness: 0.4,
      roughness: 0.45,
      transparent: false,
      opacity: 1,
    }),
  );

  const chargerCableMat = trackMat(
    new MeshStandardMaterial({
      color: "#f1f5f9",
      metalness: 0.03,
      roughness: 0.45,
      transparent: true,
      opacity: 1,
    }),
  );

  // =========================================================================
  // 2. 组装 Apple Watch 主体（表盘朝 +Z，表背朝 -Z）
  // =========================================================================

  // 2.1 金属中框（Case）— 外廓 3.80 × 4.50，圆角 0.95；正面与大曲面蓝宝石屏无缝弧线衔接，无割手台阶
  const caseGroup = new Group();
  caseGroup.name = "MetalCaseGroup";
  root.add(caseGroup);

  const outerCaseRingShape = createRoundedRingShape(
    { w: 3.8, h: 4.5, r: 0.95 },
    { w: 3.16, h: 3.86, r: 0.76 },
  );
  const outerCaseGeo = trackGeo(
    new ExtrudeGeometry(outerCaseRingShape, {
      depth: 0.44,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.16,
      bevelThickness: 0.16,
      curveSegments: 48,
    }),
  );
  // 中框分布在 Z ∈ [-0.38, +0.38]，正面边缘圆弧直接滑入 2.5D 屏幕曲面
  outerCaseGeo.translate(0, 0, -0.22);
  const outerCaseMesh = new Mesh(outerCaseGeo, titaniumCaseMat);
  caseGroup.add(outerCaseMesh);

  // 左侧（-X）双条扬声器出音槽与麦克风孔
  for (const offsetY of [-0.55, 0.55]) {
    const slotShape = createRoundedRectPath(0.07, 0.72, 0.03);
    const slotGeo = trackGeo(
      new ExtrudeGeometry(slotShape, {
        depth: 0.1,
        bevelEnabled: false,
      }),
    );
    slotGeo.rotateY(Math.PI / 2);
    const slotMesh = new Mesh(slotGeo, darkMetalTrimMat);
    slotMesh.position.set(-1.98, offsetY, -0.02);
    caseGroup.add(slotMesh);
  }

  // 2.2 2.5D 蓝宝石大曲面玻璃屏幕（09 §4.2：屏幕再大一点，与机身弧线连接，去掉正面明显棱/台阶；永远不透明）
  const screenGroup = new Group();
  screenGroup.name = "SapphireScreenGroup";
  root.add(screenGroup);

  // 屏幕基礎尺寸 3.36 × 4.06 + bevelSize 0.21*2 => 总外廓 3.78 × 4.48，背面停在 z = -0.15（与 z = -0.22 的 PCB 留出充足间距，彻底杜绝 Z-fighting 闪烁！）
  const screenShape = createRoundedRectPath(3.36, 4.06, 0.78);
  const screenGeo = trackGeo(
    new ExtrudeGeometry(screenShape, {
      depth: 0.27,
      bevelEnabled: true,
      bevelSegments: 10,
      bevelSize: 0.21,
      bevelThickness: 0.18,
      curveSegments: 48,
    }),
  );
  screenGeo.translate(0, 0, 0.03);
  const screenMesh = new Mesh(screenGeo, sapphireScreenMat);
  screenGroup.add(screenMesh);

  // 屏幕表面 OLED 充电界面层（z = +0.485）
  const uiPlaneGeo = trackGeo(new PlaneGeometry(3.24, 3.92));
  const uiPlaneMesh = new Mesh(uiPlaneGeo, screenUiMat);
  uiPlaneMesh.position.set(0, 0, 0.486);
  screenGroup.add(uiPlaneMesh);

  // 2.3 独立数码表冠（Digital Crown，09 §4.1：独立组件，56 齿真实 3D 齿轮滚花）+ 加宽精致侧键（§4.3）
  const controlsGroup = new Group();
  controlsGroup.name = "DigitalCrownAndButtonGroup";
  root.add(controlsGroup);

  // 独立表冠转轴柱
  const crownStemGeo = trackGeo(new CylinderGeometry(0.15, 0.15, 0.28, 24));
  crownStemGeo.rotateZ(Math.PI / 2);
  const crownStemMesh = new Mesh(crownStemGeo, titaniumCaseMat);
  crownStemMesh.position.set(1.96, 0.78, 0.04);
  controlsGroup.add(crownStemMesh);

  // 表冠内侧平滑金属底环
  const crownCollarGeo = trackGeo(new CylinderGeometry(0.35, 0.32, 0.05, 36));
  crownCollarGeo.rotateZ(Math.PI / 2);
  const crownCollarMesh = new Mesh(crownCollarGeo, titaniumCaseMat);
  crownCollarMesh.position.set(2.04, 0.78, 0.04);
  controlsGroup.add(crownCollarMesh);

  // 表冠核心：56 齿真实 3D 齿轮滚花柱体（能清晰看到齿轮凹凸刻度感）
  const gearShape = createGearCrownShape(0.395, 0.026, 56);
  const crownGearGeo = trackGeo(
    new ExtrudeGeometry(gearShape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.018,
      bevelThickness: 0.02,
      curveSegments: 56,
    }),
  );
  crownGearGeo.rotateY(Math.PI / 2);
  crownGearGeo.translate(2.06, 0.78, 0.04);
  const crownGearMesh = new Mesh(crownGearGeo, crownKnurlMat);
  controlsGroup.add(crownGearMesh);

  // 表冠外侧倒角金属端盖 + 标志性红圈
  const crownCapGeo = trackGeo(new CylinderGeometry(0.33, 0.37, 0.05, 36));
  crownCapGeo.rotateZ(Math.PI / 2);
  const crownCapMesh = new Mesh(crownCapGeo, titaniumCaseMat);
  crownCapMesh.position.set(2.35, 0.78, 0.04);
  controlsGroup.add(crownCapMesh);

  const redRingGeo = trackGeo(new TorusGeometry(0.24, 0.024, 14, 36));
  redRingGeo.rotateY(Math.PI / 2);
  const redRingMesh = new Mesh(redRingGeo, crownRedRingMat);
  redRingMesh.position.set(2.375, 0.78, 0.04);
  controlsGroup.add(redRingMesh);

  // 右侧偏下侧边长条按钮（09 §4.3：加宽一点，36 段高细分边缘 + 4 段精致圆弧倒角，彻底消除毛刺）
  const sideBtnShape = createRoundedRectPath(0.28, 1.04, 0.13);
  const sideBtnGeo = trackGeo(
    new ExtrudeGeometry(sideBtnShape, {
      depth: 0.11,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.032,
      bevelThickness: 0.032,
      curveSegments: 36,
    }),
  );
  sideBtnGeo.rotateY(Math.PI / 2);
  const sideBtnMesh = new Mesh(sideBtnGeo, titaniumCaseMat);
  sideBtnMesh.position.set(1.94, -0.72, 0.01);
  controlsGroup.add(sideBtnMesh);

  // 2.4 氟橡胶表带与一体式弧形表耳连接件（Lug）
  const strapGroup = new Group();
  strapGroup.name = "FluoroelastomerStrapGroup";
  root.add(strapGroup);

  for (const dirY of [1, -1] as const) {
    // 真实 Apple Watch 一体式弧形表耳连接件（Lug），无缝嵌入表壳上下滑轨槽
    const lugCShape = createRoundedRectPath(2.48, 0.32, 0.14);
    const lugCGeo = trackGeo(
      new ExtrudeGeometry(lugCShape, {
        depth: 0.24,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.035,
        bevelThickness: 0.035,
        curveSegments: 28,
      }),
    );
    lugCGeo.translate(0, 0, -0.12);
    const lugCMesh = new Mesh(lugCGeo, titaniumCaseMat);
    lugCMesh.position.set(0, dirY * 2.22, -0.02);
    strapGroup.add(lugCMesh);

    // 表带本体：通过侧视弧形轮廓沿 X 轴挤出（宽幅 2.36 沿 X 轴完全水平对齐表耳，带圆润侧边倒角，绝无扭转！）
    const sideProfile = createSideProfileStrapShape(dirY);
    const bandGeo = trackGeo(
      new ExtrudeGeometry(sideProfile, {
        depth: 2.22,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.08,
        bevelThickness: 0.08,
        curveSegments: 32,
      }),
    );
    bandGeo.translate(0, 0, -1.11);
    bandGeo.rotateY(Math.PI / 2);
    const bandMesh = new Mesh(bandGeo, fluoroStrapMat);
    strapGroup.add(bandMesh);
  }

  // 上表带金属按扣 Pin（嵌在表带中央 X=0）
  const pinCapGeo = trackGeo(new CylinderGeometry(0.15, 0.15, 0.06, 24));
  pinCapGeo.rotateX(Math.PI / 2.2);
  const pinCapMesh = new Mesh(pinCapGeo, strapPinMat);
  pinCapMesh.position.set(0, 3.45, -0.08);
  strapGroup.add(pinCapMesh);

  // 2.5 表背内部结构（09 §4.8：背盖透明后，先看到黄铜色受电线圈，再后面是深色柔性电路板 + 1~2 个芯片 + 排线，绝不是整块亮金属板！）
  const watchInternalGroup = new Group();
  watchInternalGroup.name = "WatchInternalPcbAndCoilGroup";
  root.add(watchInternalGroup);

  // (a) 深色柔性电路板（Dark Matte Flex PCB，位于 z = -0.22 ~ -0.18，作为手表的真实内部负载电路）
  const pcbShape = createRoundedRectPath(2.86, 3.46, 0.56);
  const pcbGeo = trackGeo(
    new ExtrudeGeometry(pcbShape, {
      depth: 0.04,
      bevelEnabled: false,
      curveSegments: 24,
    }),
  );
  pcbGeo.translate(0, 0, -0.22);
  const pcbMesh = new Mesh(pcbGeo, pcbBoardMat);
  watchInternalGroup.add(pcbMesh);

  // (b) Apple S9 SiP 主控芯片与电源管理芯片（PMIC）：严格分层贴在 PCB 背面 (z = -0.220 -> -0.268)，无任何共面重叠！
  const mainChipGeo = trackGeo(new BoxGeometry(0.96, 1.08, 0.048));
  const mainChipMesh = new Mesh(mainChipGeo, icChipMat);
  mainChipMesh.position.set(-0.34, 0.36, -0.244);
  watchInternalGroup.add(mainChipMesh);

  const pmicChipGeo = trackGeo(new BoxGeometry(0.58, 0.64, 0.044));
  const pmicChipMesh = new Mesh(pmicChipGeo, icChipMat);
  pmicChipMesh.position.set(0.56, -0.48, -0.242);
  watchInternalGroup.add(pmicChipMesh);

  // (c) 金色柔性排线（FPC Ribbon Cables，位于 z = -0.220 -> -0.236，避开芯片区域且高度与芯片分层，彻底消除交错闪动！）
  for (const [rx, ry, rw, rh] of [
    [0.46, 0.42, 0.48, 0.14],
    [-0.46, -0.56, 0.16, 0.58],
    [0.05, 1.15, 0.85, 0.12],
    [-0.1, -1.18, 0.72, 0.12],
  ] as [number, number, number, number][]) {
    const ribGeo = trackGeo(new BoxGeometry(rw, rh, 0.016));
    const ribMesh = new Mesh(ribGeo, goldRibbonMat);
    ribMesh.position.set(rx, ry, -0.228);
    watchInternalGroup.add(ribMesh);
  }

  for (const [cx, cy] of [
    [-0.98, 0.2],
    [-0.98, 0.45],
    [0.64, 0.12],
    [0.64, -0.08],
    [0.12, -0.86],
  ] as [number, number][]) {
    const capGeo = trackGeo(new BoxGeometry(0.14, 0.08, 0.028));
    const capMesh = new Mesh(capGeo, smdCapMat);
    capMesh.position.set(cx, cy, -0.234);
    watchInternalGroup.add(capMesh);
  }

  // (d) 中心小面积暗色磁吸定位薄片（厚度仅 0.03，位于 z = -0.31，不突出于受电线圈表面）
  const rxMagnetGeo = trackGeo(new CylinderGeometry(0.28, 0.28, 0.03, 28));
  rxMagnetGeo.rotateX(Math.PI / 2);
  const rxMagnetMesh = new Mesh(rxMagnetGeo, magnetCoreMat);
  rxMagnetMesh.position.set(0, 0, -0.31);
  watchInternalGroup.add(rxMagnetMesh);

  // (e) 表背受电线圈（RX Coil：6.5 匝黄铜/金属光泽螺旋绕组，位于 z = -0.355，表面完全位于芯片与排线后方，零交错零穿模！）
  const rxCurve = createPlanarSpiralCurve(0.42, 1.18, 6.5, -0.355);
  const rxCoilGeo = trackGeo(new TubeGeometry(rxCurve, 260, 0.032, 12, false));
  const rxCoilMesh = new Mesh(rxCoilGeo, rxCoilMat);
  watchInternalGroup.add(rxCoilMesh);

  // 微型非金属线圈固定卡爪（4 个极小暗色卡点在螺旋外沿，不抢线圈视觉）
  for (const ang of [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75]) {
    const clipGeo = trackGeo(new BoxGeometry(0.12, 0.12, 0.04));
    const clipMesh = new Mesh(clipGeo, darkMetalTrimMat);
    clipMesh.position.set(1.22 * Math.cos(ang), 1.22 * Math.sin(ang), -0.34);
    watchInternalGroup.add(clipMesh);
  }

  // 2.6 表背非金属陶瓷/蓝宝石外盖与传感器凸台（唯一受 setBackCoverOpacity 控制的透明/剖开组）
  const backCoverGroup = new Group();
  backCoverGroup.name = "NonMetallicCeramicBackCoverGroup";
  root.add(backCoverGroup);

  const backPlateShape = createRoundedRectPath(3.48, 4.18, 0.82);
  const backHolePath = new Path();
  backHolePath.absarc(0, 0, 1.12, 0, Math.PI * 2, false);
  backPlateShape.holes.push(backHolePath);

  const backCeramicGeo = trackGeo(
    new ExtrudeGeometry(backPlateShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 32,
    }),
  );
  backCeramicGeo.translate(0, 0, -0.38);
  const backCeramicMesh = new Mesh(backCeramicGeo, backCeramicMat);
  backCoverGroup.add(backCeramicMesh);

  // 深色蓝宝石传感器圆台（z = -0.36 ~ -0.58）
  const backDomeProfile = [
    new Vector2(0.001, -0.58),
    new Vector2(0.38, -0.575),
    new Vector2(0.75, -0.55),
    new Vector2(1.04, -0.5),
    new Vector2(1.14, -0.43),
    new Vector2(1.14, -0.36),
    new Vector2(0.001, -0.36),
  ];
  const backDomeGeo = trackGeo(new LatheGeometry(backDomeProfile, 48));
  backDomeGeo.rotateX(Math.PI / 2);
  const backDomeMesh = new Mesh(backDomeGeo, backSapphireDomeMat);
  backCoverGroup.add(backDomeMesh);

  for (const startAng of [0.18, Math.PI + 0.18]) {
    const electrodeGeo = trackGeo(new RingGeometry(1.15, 1.32, 32, 1, startAng, Math.PI - 0.36));
    const electrodeMesh = new Mesh(electrodeGeo, backSensorElectrodeMat);
    electrodeMesh.position.set(0, 0, -0.42);
    electrodeMesh.rotation.y = Math.PI;
    backCoverGroup.add(electrodeMesh);
  }

  for (const [sx, sy, sr] of [
    [0.24, 0, 0.08],
    [-0.24, 0, 0.08],
    [0, 0.24, 0.08],
    [0, -0.24, 0.08],
  ] as [number, number, number][]) {
    const lensGeo = trackGeo(new CircleGeometry(sr, 20));
    const lensMesh = new Mesh(lensGeo, backLedLensMat);
    lensMesh.position.set(sx, sy, -0.582);
    lensMesh.rotation.y = Math.PI;
    backCoverGroup.add(lensMesh);
  }

  // =========================================================================
  // 3. 组装磁吸充电头（MagSafe Charger Puck，白线从左侧 -X 护套自然向左引出，不挡表盘）
  // =========================================================================

  const chargerBaseGroup = new Group();
  chargerBaseGroup.name = "ChargerSilverHousingGroup";
  chargerRoot.add(chargerBaseGroup);

  const silverShellProfile = [
    new Vector2(0.001, -0.56),
    new Vector2(1.12, -0.56),
    new Vector2(1.28, -0.53),
    new Vector2(1.36, -0.45),
    new Vector2(1.375, -0.32),
    new Vector2(1.375, -0.065),
  ];
  const silverShellGeo = trackGeo(new LatheGeometry(silverShellProfile, 56));
  silverShellGeo.rotateX(Math.PI / 2);
  const silverShellMesh = new Mesh(silverShellGeo, chargerSilverBodyMat);
  chargerBaseGroup.add(silverShellMesh);

  const seamTorusGeo = trackGeo(new TorusGeometry(1.368, 0.014, 12, 56));
  const seamTorusMesh = new Mesh(seamTorusGeo, chargerSeamMat);
  seamTorusMesh.position.set(0, 0, -0.062);
  chargerBaseGroup.add(seamTorusMesh);

  // 3.2 充电盘白线（09 §2.1 C1 & §4.5：从充电盘左侧 -X 护套正确引出，向左走，不被表体挡住也不挡表盘）
  const strainReliefGeo = trackGeo(new CylinderGeometry(0.13, 0.18, 0.48, 24));
  strainReliefGeo.rotateZ(Math.PI / 2);
  const strainReliefMesh = new Mesh(strainReliefGeo, chargerCableMat);
  // 护套根部严密嵌在充电盘左侧壁（x = -1.35, y = -0.18, z = -0.30），向左外侧延伸到 x = -1.78
  strainReliefMesh.position.set(-1.55, -0.18, -0.3);
  chargerBaseGroup.add(strainReliefMesh);

  // 线缆从护套末端（x = -1.75）平滑向左延伸（保持在 z = -0.30 平面，与内部双芯引出黄铜导线严格同轴），直接穿出左侧屏幕画面最外缘
  const cableCurve = new CatmullRomCurve3([
    new Vector3(-1.75, -0.18, -0.3),
    new Vector3(-5.2, -0.32, -0.3),
    new Vector3(-11.8, -0.58, -0.3),
    new Vector3(-22, -0.95, -0.3),
  ]);
  const cableGeo = trackGeo(new TubeGeometry(cableCurve, 64, 0.115, 16, false));
  const cableMesh = new Mesh(cableGeo, chargerCableMat);
  cableMesh.name = "PuckShortCableMesh";
  chargerBaseGroup.add(cableMesh);

  // 3.3 充电头内部结构（黄铜色送电线圈 TX Coil + 中心暗色定位磁铁 + 内部深色电路衬底）
  const chargerInternalGroup = new Group();
  chargerInternalGroup.name = "ChargerInternalCoilGroup";
  chargerInternalGroup.visible = false;
  chargerRoot.add(chargerInternalGroup);

  const pcbDiskGeo = trackGeo(new CylinderGeometry(1.24, 1.24, 0.05, 44));
  pcbDiskGeo.rotateX(Math.PI / 2);
  const pcbDiskMesh = new Mesh(pcbDiskGeo, pcbBoardMat);
  pcbDiskMesh.position.set(0, 0, -0.32);
  chargerInternalGroup.add(pcbDiskMesh);

  // 中心逆变器圆盘（Inverter Disk）：做成极薄圆盘（厚度仅 0.03，位于 z = -0.22，在线圈平面 z = -0.15 后方）
  const txMagnetGeo = trackGeo(new CylinderGeometry(0.32, 0.32, 0.03, 28));
  txMagnetGeo.rotateX(Math.PI / 2);
  const txMagnetMesh = new Mesh(txMagnetGeo, magnetCoreMat);
  txMagnetMesh.position.set(0, 0, -0.22);
  chargerInternalGroup.add(txMagnetMesh);

  // USB 供电线通向中央逆变器圆盘的直流输入引线（无电子图示，与螺旋线圈后方分层不穿模）
  const dcFeedCurve = new CatmullRomCurve3([
    new Vector3(-1.55, -0.18, -0.3),
    new Vector3(-1.18, -0.15, -0.28),
    new Vector3(-0.68, -0.07, -0.26),
    new Vector3(-0.24, 0, -0.22),
  ]);
  const dcFeedGeo = trackGeo(new TubeGeometry(dcFeedCurve, 32, 0.042, 12, false));
  const dcFeedMesh = new Mesh(dcFeedGeo, chargerCableMat);
  chargerInternalGroup.add(dcFeedMesh);

  // 送电线圈（TX Coil：逆变器圆盘接出两根线分别连到螺旋最外端与最内端 + 7 匝黄铜金属光泽螺旋绕组，位于 chargerRoot 局部 z = -0.15）
  const txCurve = createTxCompleteLoopCurve(0.45, 1.15, 7, -0.15);
  const txCoilGeo = trackGeo(new TubeGeometry(txCurve, 340, 0.033, 12, false));
  const txCoilMesh = new Mesh(txCoilGeo, txCoilMat);
  chargerInternalGroup.add(txCoilMesh);

  // 3.4 朝向表背（+Z）的微磨砂白色浅凹充电面顶盖
  const chargerTopCoverGroup = new Group();
  chargerTopCoverGroup.name = "ChargerWhiteConcaveTopGroup";
  chargerRoot.add(chargerTopCoverGroup);

  const concaveTopProfile = [
    new Vector2(0.001, -0.15),
    new Vector2(0.65, -0.135),
    new Vector2(1.16, -0.075),
    new Vector2(1.34, -0.06),
    new Vector2(1.365, -0.058),
    new Vector2(1.365, -0.01),
    new Vector2(1.33, 0),
    new Vector2(1.18, 0),
    new Vector2(1.14, -0.018),
    new Vector2(0.85, -0.058),
    new Vector2(0.45, -0.088),
    new Vector2(0.001, -0.1),
  ];
  const concaveTopGeo = trackGeo(new LatheGeometry(concaveTopProfile, 56));
  concaveTopGeo.rotateX(Math.PI / 2);
  const concaveTopMesh = new Mesh(concaveTopGeo, chargerWhiteTopMat);
  chargerTopCoverGroup.add(concaveTopMesh);

  // =========================================================================
  // 4. 状态控制 API 实现
  // =========================================================================

  let currentChargeProgress = 0;

  const setChargeProgress = (progress: number): void => {
    const clamped = clamp(progress, 0, 1);
    currentChargeProgress = clamped;
    if (clamped <= 0.001) {
      drawChargeScreenCanvas(uiCanvas, 0);
      uiTexture.needsUpdate = true;
      screenUiMat.opacity = 0;
      uiPlaneMesh.visible = false;
      // 息屏态：深邃暗黑，不泛灰白反光
      sapphireScreenMat.envMapIntensity = 0.12;
      sapphireScreenMat.clearcoat = 0.18;
      return;
    }
    drawChargeScreenCanvas(uiCanvas, clamped);
    uiTexture.needsUpdate = true;
    screenUiMat.opacity = 1;
    uiPlaneMesh.visible = true;
    sapphireScreenMat.envMapIntensity = 0.55;
    sapphireScreenMat.clearcoat = 0.75;
  };

  const setScreenOn = (on: boolean): void => {
    if (on) setChargeProgress(currentChargeProgress > 0.05 ? currentChargeProgress : 0.65);
    else setChargeProgress(0);
  };

  const setBackCoverOpacity = (v: number): void => {
    const opacity = clamp(v, 0, 1);
    const isOpaque = opacity >= 0.96;

    for (const mat of [
      backCeramicMat,
      backSapphireDomeMat,
      backSensorElectrodeMat,
      backLedLensMat,
    ]) {
      mat.opacity = opacity;
      mat.depthWrite = isOpaque;
    }

    chargerWhiteTopMat.opacity = opacity;
    chargerWhiteTopMat.depthWrite = isOpaque;
    chargerSilverBodyMat.opacity = isOpaque ? 1 : Math.max(0.2, opacity);
    chargerSilverBodyMat.depthWrite = isOpaque;
    pcbDiskMesh.visible = isOpaque;

    // 充电器整盘不透明且尚未剖开（如 P2 C1/C2 磁吸充电或 P3 全景链路）时隐藏内部送电线圈及引出黄铜线，避免在 C1 飞入过程中黄铜芯线与白色线缆发生透视穿模；
    // 只有进入 P2 C3–C6 半透明剖开态时才显示内部送电螺旋线圈与双芯引出导线！
    chargerInternalGroup.visible = !isOpaque;

    const splitOffset = (1 - opacity) * 0.12;
    backCoverGroup.position.z = -splitOffset;
    backCoverGroup.visible = isOpaque;
    chargerTopCoverGroup.position.z = splitOffset;
    chargerTopCoverGroup.visible = isOpaque;
  };

  const setCoilTranslucent = (translucent: boolean): void => {
    rxCoilMesh.visible = true;
    txCoilMesh.visible = true;
    if (translucent) {
      // 充电动效出现时变半透明黄铜管，清晰露出逆变器驱动螺旋线圈内部的蓝色电子；USB 白色供电线保持不透明实体且内部无电子！
      rxCoilMat.opacity = 0.36;
      txCoilMat.opacity = 0.36;
      rxCoilMat.depthWrite = false;
      txCoilMat.depthWrite = false;
      rxCoilMat.emissiveIntensity = 0.32;
      txCoilMat.emissiveIntensity = 0.35;
    } else {
      // 静态展示线圈时呈现饱满的黄铜/金属光泽
      rxCoilMat.opacity = 0.94;
      txCoilMat.opacity = 0.94;
      rxCoilMat.depthWrite = true;
      txCoilMat.depthWrite = true;
      rxCoilMat.emissiveIntensity = 0.22;
      txCoilMat.emissiveIntensity = 0.24;
    }
    chargerCableMat.opacity = 1;
    chargerCableMat.depthWrite = true;
  };

  const setCoilVisible = (v: boolean): void => {
    rxCoilMesh.visible = true;
    txCoilMesh.visible = true;
    if (!v) setCoilTranslucent(false);
  };

  const setPose = (pose: WatchPose): void => {
    switch (pose) {
      case "front": {
        setBackCoverOpacity(1);
        setCoilTranslucent(false);
        setScreenOn(false);
        break;
      }
      case "side": {
        setBackCoverOpacity(1);
        setCoilTranslucent(false);
        setScreenOn(true);
        break;
      }
      case "back": {
        setBackCoverOpacity(0.14);
        setCoilTranslucent(false);
        setScreenOn(true);
        break;
      }
      case "coil": {
        setBackCoverOpacity(0.14);
        setCoilTranslucent(true);
        setScreenOn(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  const getCoilPaths = (): { rxCurve: CatmullRomCurve3; txCurve: CatmullRomCurve3 } => ({
    rxCurve,
    txCurve,
  });

  const dispose = (): void => {
    for (const geo of geometries) geo.dispose();
    for (const mat of materials) mat.dispose();
    for (const tex of textures) tex.dispose();
    geometries.clear();
    materials.clear();
    textures.clear();
    root.clear();
    chargerRoot.clear();
  };

  return {
    root,
    chargerRoot,
    setPose,
    setBackCoverOpacity,
    setScreenOn,
    setChargeProgress,
    setCoilTranslucent,
    setCoilVisible,
    getCoilPaths,
    dispose,
  };
};
