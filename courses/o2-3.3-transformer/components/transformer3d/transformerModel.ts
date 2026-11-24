/* oxlint-disable max-lines -- 写实 3D 变压器组件建模（圆角铁芯+3D线框、12:4细绕组、输入端u~与输出端U2、闭合磁场环流、血管式管内微粒子、铜损发热/铁损涡流/漏磁弧线及3D世界坐标锚点投影）集中在单文件 */
/**
 * 写实 3D 变压器模型（供 P4 结构页、P5 原理页、P10 损耗与理想变压器页、P11 核心推导页共用）
 *
 * 第五轮升级要点（13-Gemini4修改清单.md §2 & §4）：
 *
 * 1. 右侧不再连写实负载电阻，统一改为**抽象的输出电压**：输出端两条平滑引出线 + 接线端子 + 正对镜头的 `U₂` 标注。
 * 2. P4 结构页（`mode = "structure"`，3 击 + 3D 锚点实时投影 `onFrame`）：
 *
 *    - 0 击 / 第 1 击：完全正视图（`rigRotY = 0`）展示两个线圈与闭合铁芯；
 *    - 第 2 击：隐藏刚才的两个线圈文字标注，模型向右旋转、把左侧原线圈放大，并**闪烁左（原）线圈**，同时原线圈文字/引线锚点放在 3D 世界坐标中跟随模型一起旋转！
 *    - 第 3 击：**闪烁右（副）线圈**，显示副线圈文字和 3D 锚点引线。
 * 3. P10 损耗与理想变压器合并页（`mode = "loss"`，5 击）：
 *
 *    - 第 1 击（铜损）：原、副线圈发红色微光（体现通电发热 `I²r`），铁芯不红；
 *    - 第 2 击（铁损）：镜头近距离拉近铁芯左/上支腿局部，展示变化磁场下的**涡旋电场/涡流闭合环**，铁芯内部泛红光；
 *    - 第 3 击（漏磁）：原线圈一侧靠近电压端有漏磁感线，铁芯每个转角也有磁感线漏出；
 *    - 第 4 击（收拢）：左侧模型**同时呈现三种非理想现象**（铜损红光 + 铁芯涡流泛红 + 转角与原边漏磁）；
 *    - 第 5 击（理想变压器）：去掉一切非理想效应（不红、不涡流、不漏磁），呈现纯净闭合磁通量的理想变压器。
 */
import type { BufferGeometry, Material } from "three";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  CatmullRomCurve3,
  CanvasTexture,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Quaternion,
  Scene,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));

// 很淡的接触阴影：径向渐变贴图，只垫在铁芯底部，跟着 rig 一起动
const createContactShadowTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.62)");
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  return new CanvasTexture(canvas);
};

const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// 创建圆角矩形 Path/Shape（中心在原点）
const createRoundedRectPath = (w: number, h: number, r: number): Shape => {
  const shape = new Shape();
  const hw = w / 2;
  const hh = h / 2;
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  return shape;
};

// 创建绕竖直铁芯支腿的平滑螺旋线圈 + 两端平滑引出线（无奇怪硬折角）
const createSmoothCoilWithLeads = (options: {
  centerX: number;
  radius: number;
  height: number;
  turns: number;
  tubeRadius: number;
  terminalX: number;
  topTerminalY: number;
  botTerminalY: number;
  clockwise?: boolean;
}): { geo: TubeGeometry; curve: CatmullRomCurve3 } => {
  const {
    centerX,
    radius,
    height,
    turns,
    tubeRadius,
    terminalX,
    topTerminalY,
    botTerminalY,
    clockwise = true,
  } = options;

  const pts: Vector3[] = [];
  const dir = clockwise ? 1 : -1;
  const halfH = height / 2;
  const sideSign = terminalX < centerX ? -1 : 1;

  // 顶部接线柱 -> 平滑过渡进螺旋顶圈
  const entryX = centerX + sideSign * radius;
  pts.push(
    new Vector3(terminalX, topTerminalY, 0),
    new Vector3((terminalX + entryX) * 0.5, topTerminalY, sideSign * 0.18),
  );

  const startAngle = sideSign < 0 ? Math.PI : 0;
  const totalSteps = Math.round(turns * 36);
  for (let i = 0; i <= totalSteps; i += 1) {
    const u = i / totalSteps;
    const angle = startAngle + dir * u * turns * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle);
    const y = halfH - u * height;
    const z = radius * Math.sin(angle);
    pts.push(new Vector3(x, y, z));
  }

  // 螺旋底圈 -> 平滑过渡回底部接线柱
  pts.push(
    new Vector3((terminalX + entryX) * 0.5, botTerminalY, -sideSign * 0.18),
    new Vector3(terminalX, botTerminalY, 0),
  );

  const curve = new CatmullRomCurve3(pts);
  const geo = new TubeGeometry(curve, totalSteps + 28, tubeRadius, 12, false);
  return { geo, curve };
};

// 创建铁芯内部的一条闭合圆角矩形磁感线路径
const createRoundedFluxCurve = (
  halfW: number,
  halfH: number,
  cornerR: number,
): CatmullRomCurve3 => {
  const pts: Vector3[] = [];
  const segs = 6;
  const corners = [
    { cx: -halfW + cornerR, cy: halfH - cornerR, start: Math.PI, end: Math.PI * 0.5 },
    { cx: halfW - cornerR, cy: halfH - cornerR, start: Math.PI * 0.5, end: 0 },
    { cx: halfW - cornerR, cy: -halfH + cornerR, start: 0, end: -Math.PI * 0.5 },
    { cx: -halfW + cornerR, cy: -halfH + cornerR, start: Math.PI * 1.5, end: Math.PI },
  ];
  for (const c of corners) {
    for (let i = 0; i <= segs; i += 1) {
      const a = c.start + ((c.end - c.start) * i) / segs;
      pts.push(new Vector3(c.cx + cornerR * Math.cos(a), c.cy + cornerR * Math.sin(a), 0));
    }
  }
  return new CatmullRomCurve3(pts, true);
};

// 生成正对镜头的 `U₁ ~` 交流输入标识贴图
const createAcInputPlateTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 256, 192);
    ctx.fillStyle = "#60a5fa";
    ctx.font = "italic bold 64px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("U", 112, 64);

    ctx.font = "bold 42px Georgia, 'Times New Roman', serif";
    ctx.fillText("1", 154, 82);

    // 交流正弦符号 ~
    ctx.strokeStyle = "#e2a846";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(76, 138);
    ctx.bezierCurveTo(96, 110, 114, 110, 128, 138);
    ctx.bezierCurveTo(142, 166, 160, 166, 180, 138);
    ctx.stroke();
  }
  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

// 生成正对镜头的抽象输出端 `U₂` 电压标识贴图（暖琥珀金铜色调，与原线圈冷蓝形成鲜明冷暖对比）
const createAcOutputPlateTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 256, 192);
    ctx.fillStyle = "#f59e0b";
    ctx.font = "italic bold 64px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("U", 112, 74);

    ctx.font = "bold 42px Georgia, 'Times New Roman', serif";
    ctx.fillText("2", 154, 92);

    // 上下抽象电压双向虚线/箭头指示
    ctx.strokeStyle = "rgba(245, 158, 11, 0.78)";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(128, 16);
    ctx.lineTo(128, 36);
    ctx.moveTo(128, 148);
    ctx.lineTo(128, 170);
    ctx.stroke();
  }
  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
};

export interface TransformerPose {
  rigX: number;
  rigY: number;
  rigRotY: number;
  camPos: Vector3;
  camLookAt: Vector3;
  coreOpacity: number;
  wireframeOpacity: number;
  primaryCoilOpacity: number;
  secondaryCoilOpacity: number;
  primaryCurrentAlpha: number;
  secondaryCurrentAlpha: number;
  fluxAlpha: number;
  resistorPinAlpha: number;
  powerBridgeAlpha: number;
  copperHeatAlpha: number;
  ironHeatAlpha: number;
  eddyLoopAlpha: number;
  leakFluxAlpha: number;
}

export type TransformerSceneMode =
  | "intro"
  | "structure"
  | "principle"
  | "derivation"
  | "loss"
  | "ue";

export interface ProjectedTransformerAnchors {
  leftCoil: { x: number; y: number };
  rightCoil: { x: number; y: number };
  coreTop: { x: number; y: number };
}

// P4 结构页（3 击，13 §2.2：
// 0/C1 完全正视图展示两线圈与铁芯；
// C2 向右旋转、把左侧原线圈放大并闪烁左线圈，原线圈引线跟随 3D 模型一起旋转；
// C3 闪烁右（副）线圈并显示副线圈文字和引线）
const STRUCTURE_POSES: TransformerPose[] = [
  // Step 0: 完全正视图
  {
    rigX: -0.25,
    rigY: 0,
    rigRotY: 0,
    camPos: new Vector3(-0.25, 0.15, 14.5),
    camLookAt: new Vector3(-0.25, 0, 0),
    coreOpacity: 0.94,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.96,
    secondaryCoilOpacity: 0.96,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // C1 (step 1): 完全正视图，展示左线圈、右线圈、铁芯三根引线与文字标注
  {
    rigX: -0.25,
    rigY: 0,
    rigRotY: 0,
    camPos: new Vector3(-0.25, 0.15, 14.5),
    camLookAt: new Vector3(-0.25, 0, 0),
    coreOpacity: 0.94,
    wireframeOpacity: 0.32,
    primaryCoilOpacity: 0.98,
    secondaryCoilOpacity: 0.98,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // C2 (step 2): 隐藏刚才的两个线圈通用标注；把模型向右旋转 (rigRotY = +0.46)，把左侧原线圈放大；闪烁左（原）线圈；显示原线圈文字和跟随 3D 旋转的引线！
  {
    rigX: 0.35,
    rigY: -0.05,
    rigRotY: 0.46,
    camPos: new Vector3(-0.95, 0.55, 12.1),
    camLookAt: new Vector3(-0.75, -0.05, 0),
    coreOpacity: 0.88,
    wireframeOpacity: 0.34,
    primaryCoilOpacity: 1,
    secondaryCoilOpacity: 0.55,
    primaryCurrentAlpha: 0.8,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // C3 (step 3): 闪烁右（副）线圈；显示副线圈文字和 3D 跟随引线
  {
    rigX: -0.15,
    rigY: -0.02,
    rigRotY: 0.24,
    camPos: new Vector3(-0.2, 0.55, 13.4),
    camLookAt: new Vector3(-0.15, -0.02, 0),
    coreOpacity: 0.88,
    wireframeOpacity: 0.34,
    primaryCoilOpacity: 0.82,
    secondaryCoilOpacity: 1,
    primaryCurrentAlpha: 0.65,
    secondaryCurrentAlpha: 0.85,
    fluxAlpha: 0.45,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
];

// P5 原理页（3 击，无任何公式）
const PRINCIPLE_POSES: TransformerPose[] = [
  {
    rigX: -0.6,
    rigY: 0,
    rigRotY: 0.2,
    camPos: new Vector3(-0.6, 1.1, 14.6),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.88,
    wireframeOpacity: 0.25,
    primaryCoilOpacity: 0.92,
    secondaryCoilOpacity: 0.92,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  {
    rigX: -0.3,
    rigY: 0,
    rigRotY: 0.26,
    camPos: new Vector3(-1, 0.95, 13.4),
    camLookAt: new Vector3(-0.9, 0, 0),
    coreOpacity: 0.45,
    wireframeOpacity: 0.65,
    primaryCoilOpacity: 0.48,
    secondaryCoilOpacity: 0.65,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0.65,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  {
    rigX: -0.6,
    rigY: 0,
    rigRotY: 0.16,
    camPos: new Vector3(-0.6, 1.05, 13.8),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.26,
    wireframeOpacity: 0.88,
    primaryCoilOpacity: 0.55,
    secondaryCoilOpacity: 0.55,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  {
    rigX: -0.6,
    rigY: 0,
    rigRotY: -0.18,
    camPos: new Vector3(-0.5, 1.05, 14),
    camLookAt: new Vector3(-0.5, 0, 0),
    coreOpacity: 0.28,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.52,
    secondaryCoilOpacity: 0.48,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
];

// P4 结构与原理合并页（4 击，5 帧：
// 0/1 击：保持正视图 STRUCTURE_POSES[0]；
// 2 击（原线圈）：镜头绕着变压器转，停在只露原线圈左半截的机位（副线圈移出右画面外），展现线圈侧面立体厚度；
// 3 击（闭合铁芯）：镜头下沉并继续绕转，铁芯从画面下缘转进来、只露上半截，上半圈磁环流完整清晰；
// 4 击（副线圈）：镜头从左侧绕回，只露副线圈右半截，U₂ 与接线端在视野内）
const INTRO_POSES: TransformerPose[] = [
  STRUCTURE_POSES[0],
  STRUCTURE_POSES[0],
  // Step 2 (原线圈特写)：向右旋转 + 大幅右移（rigX = 3.15），副线圈完全移出画面右外侧，只露左半截原线圈与输入端 U₁~
  {
    rigX: 3.15,
    rigY: -0.05,
    rigRotY: 0.44,
    camPos: new Vector3(-0.35, 0.72, 9.2),
    camLookAt: new Vector3(-0.2, -0.05, 0),
    coreOpacity: 0.38,
    wireframeOpacity: 0.72,
    primaryCoilOpacity: 0.56,
    secondaryCoilOpacity: 0.65,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0.68,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 3 (闭合铁芯上半截特写)：镜头下沉并继续旋转，铁芯从画面下缘转进来、只露上半截，上半圈磁环流完整清晰
  {
    rigX: -0.08,
    rigY: -1.48,
    rigRotY: 0.14,
    camPos: new Vector3(-0.08, -0.45, 9.6),
    camLookAt: new Vector3(-0.08, 0.18, 0),
    coreOpacity: 0.28,
    wireframeOpacity: 0.88,
    primaryCoilOpacity: 0.52,
    secondaryCoilOpacity: 0.52,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 4 (副线圈特写)：镜头从左侧绕回，只露副线圈右半截（原线圈完全移出画面左外侧），U₂ 与接线端在视野内
  {
    rigX: -3.15,
    rigY: -0.05,
    rigRotY: -0.42,
    camPos: new Vector3(0.35, 0.72, 9.2),
    camLookAt: new Vector3(0.2, -0.05, 0),
    coreOpacity: 0.34,
    wireframeOpacity: 0.78,
    primaryCoilOpacity: 0.52,
    secondaryCoilOpacity: 0.54,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
];

// P9 实际变压器的能量损耗 + 理想变压器合并页（5 击，13 §4）
const LOSS_POSES: TransformerPose[] = [
  // Step 0: 初始全景实际变压器（镜头机位与 C1 完全一致，避免点第 1 击时出现多余的放大/缩回跳动）
  {
    rigX: 0.48,
    rigY: 0,
    rigRotY: 0.2,
    camPos: new Vector3(0.1, 1.05, 15.1),
    camLookAt: new Vector3(0.1, 0, 0),
    coreOpacity: 0.88,
    wireframeOpacity: 0.3,
    primaryCoilOpacity: 0.94,
    secondaryCoilOpacity: 0.94,
    primaryCurrentAlpha: 0.5,
    secondaryCurrentAlpha: 0.5,
    fluxAlpha: 0.4,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // C1 (step 1 - 铜损): 原、副线圈发红色呼吸光芒（体现发热 I²r），铁芯不红，不画引线上的方块电阻
  {
    rigX: 0.48,
    rigY: 0,
    rigRotY: 0.2,
    camPos: new Vector3(0.1, 1.05, 15.1),
    camLookAt: new Vector3(0.1, 0, 0),
    coreOpacity: 0.9,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.96,
    secondaryCoilOpacity: 0.96,
    primaryCurrentAlpha: 0.95,
    secondaryCurrentAlpha: 0.95,
    fluxAlpha: 0.35,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 1,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // C2 (step 2 - 铁损): 镜头推近铁芯上横轭一小段（避开线圈，克制干净）；铁芯表面保持亮银钢金属光泽，仅展示内部 3 个垂直于磁通方向的橙红闭合涡流环 + 铁芯内部很淡的红热辉光（不整块变红）
  {
    rigX: 0.45,
    rigY: -0.95,
    rigRotY: 0.24,
    camPos: new Vector3(0.25, 1.35, 6.8),
    camLookAt: new Vector3(0.25, 0.78, 0),
    coreOpacity: 0.42,
    wireframeOpacity: 0.85,
    primaryCoilOpacity: 0.22,
    secondaryCoilOpacity: 0.22,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0.32,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 1,
    eddyLoopAlpha: 1,
    leakFluxAlpha: 0,
  },
  // C3 (step 3 - 漏磁): 原线圈一侧靠近电压端有漏磁感线；铁芯每个转角也有磁感线漏出
  {
    rigX: 0.48,
    rigY: 0,
    rigRotY: 0.2,
    camPos: new Vector3(0.1, 1.05, 15.2),
    camLookAt: new Vector3(0.1, 0, 0),
    coreOpacity: 0.35,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.68,
    secondaryCoilOpacity: 0.68,
    primaryCurrentAlpha: 0.85,
    secondaryCurrentAlpha: 0.65,
    fluxAlpha: 0.85,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 1,
  },
  // C4 (step 4 - 收拢): 左侧模型同时呈现三种现象（铜损线圈发红呼吸光芒 + 铁损涡流泛红 + 漏磁感线）
  {
    rigX: 0.48,
    rigY: 0,
    rigRotY: 0.22,
    camPos: new Vector3(0.1, 1.1, 15.1),
    camLookAt: new Vector3(0.1, 0, 0),
    coreOpacity: 0.38,
    wireframeOpacity: 0.84,
    primaryCoilOpacity: 0.86,
    secondaryCoilOpacity: 0.86,
    primaryCurrentAlpha: 0.9,
    secondaryCurrentAlpha: 0.8,
    fluxAlpha: 0.85,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0.92,
    ironHeatAlpha: 0.88,
    eddyLoopAlpha: 0.92,
    leakFluxAlpha: 0.95,
  },
  // C5 (step 5 - 理想变压器): 去掉一切非理想效应（不红、不涡流、不漏磁），磁通量 100% 闭合约束在铁芯内
  {
    rigX: 0.48,
    rigY: 0,
    rigRotY: 0.18,
    camPos: new Vector3(0.1, 1.05, 15),
    camLookAt: new Vector3(0.1, 0, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.86,
    primaryCoilOpacity: 0.62,
    secondaryCoilOpacity: 0.62,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0.65,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
];

// P11(原P12) 核心推导页（7 击：
// 1-2 击：变压器右移使副线圈完全移出画面，左侧对称公式卡；
// 3-4 击：变压器左移使原线圈完全移出画面，右侧与前两次完全镜像对称的副线圈分析与公式卡；
// 5-7 击：镜头拉远、变压器缩小并左移，右侧列完整 5 条推导公式，与变压器主体完全不重叠！）
const DERIVATION_POSES: TransformerPose[] = [
  // Step 0: 整体变压器居中
  {
    rigX: 0,
    rigY: 0,
    rigRotY: 0.22,
    camPos: new Vector3(0, 1.3, 15.8),
    camLookAt: new Vector3(0, 0, 0),
    coreOpacity: 0.86,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.9,
    secondaryCoilOpacity: 0.9,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 1 (C1): 推近原线圈；变压器整体往右移（rigX = 6.95），右侧副线圈完全移出画面外不可见，左侧输入接线柱与公式区留出充足间距不重叠
  {
    rigX: 6.95,
    rigY: -0.06,
    rigRotY: 0.22,
    camPos: new Vector3(1.15, 0.75, 11.2),
    camLookAt: new Vector3(1.15, -0.05, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.48,
    secondaryCoilOpacity: 0.75,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0.95,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 2 (C2): 左侧推导原线圈电动势与端电压方程（U₁ = E₁ + I₁r₁）；标出 r₁
  {
    rigX: 6.95,
    rigY: -0.06,
    rigRotY: 0.22,
    camPos: new Vector3(1.15, 0.75, 11.2),
    camLookAt: new Vector3(1.15, -0.05, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.48,
    secondaryCoilOpacity: 0.75,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0.95,
    resistorPinAlpha: 1,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0.35,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 3 (C3): 与 C1 严格镜像对称！变压器绕竖轴连续转体并飞到画面最左（rigX = -6.95），左侧原线圈完全移出画面不可见；上方分析副线圈因磁通量变化产生感应电动势与交变电流
  {
    rigX: -6.95,
    rigY: -0.06,
    rigRotY: -0.22,
    camPos: new Vector3(-1.15, 0.75, 11.2),
    camLookAt: new Vector3(-1.15, -0.05, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.7,
    secondaryCoilOpacity: 0.48,
    primaryCurrentAlpha: 0.75,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 0.95,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 4 (C4): 与 C2 严格镜像对称！下方列出副线圈两条公式（E₂ = n₂ ΔΦ/Δt，U₂ = E₂ - I₂r₂），标出内阻 r₂
  {
    rigX: -6.95,
    rigY: -0.06,
    rigRotY: -0.22,
    camPos: new Vector3(-1.15, 0.75, 11.2),
    camLookAt: new Vector3(-1.15, -0.05, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.7,
    secondaryCoilOpacity: 0.48,
    primaryCurrentAlpha: 0.75,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 0.95,
    resistorPinAlpha: 1,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0.35,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 5 (C5): 输出最后五个公式——镜头拉远（Z = 18.8），变压器缩小并置于左侧（rigX = -5.65），与右侧五个公式完全分开、绝不重叠！
  {
    rigX: -5.65,
    rigY: -0.05,
    rigRotY: -0.14,
    camPos: new Vector3(-0.3, 1.15, 18.8),
    camLookAt: new Vector3(-0.3, 0, 0),
    coreOpacity: 0.28,
    wireframeOpacity: 0.86,
    primaryCoilOpacity: 0.55,
    secondaryCoilOpacity: 0.55,
    primaryCurrentAlpha: 0.9,
    secondaryCurrentAlpha: 0.9,
    fluxAlpha: 1,
    resistorPinAlpha: 0.7,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 6 (C6): r₁、r₂ 归零/淡出（理想化 U₁/U₂ = n₁/n₂）
  {
    rigX: -5.65,
    rigY: -0.05,
    rigRotY: -0.14,
    camPos: new Vector3(-0.3, 1.15, 18.8),
    camLookAt: new Vector3(-0.3, 0, 0),
    coreOpacity: 0.32,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.55,
    secondaryCoilOpacity: 0.55,
    primaryCurrentAlpha: 0.95,
    secondaryCurrentAlpha: 0.95,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 7 (C7): 功率能量流从原边流向副边（P₁ = P₂ -> I₁/I₂ = n₂/n₁）
  {
    rigX: -5.65,
    rigY: -0.05,
    rigRotY: -0.12,
    camPos: new Vector3(-0.3, 1.15, 18.8),
    camLookAt: new Vector3(-0.3, 0, 0),
    coreOpacity: 0.32,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.52,
    secondaryCoilOpacity: 0.52,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 1,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
];

// P11 实际变压器的 U 与 E（3 击，全页静止：无磁环流、无电流粒子、无循环 rAF，只留 3 次平滑切镜：0 整体 -> 1 原线圈侧特写 -> 2 副线圈侧特写 -> 3 拉远复盘）
const UE_POSES: TransformerPose[] = [
  // Step 0: 整体变压器居中
  {
    ...DERIVATION_POSES[0],
    camPos: DERIVATION_POSES[0].camPos.clone(),
    camLookAt: DERIVATION_POSES[0].camLookAt.clone(),
    coreOpacity: 0.92,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.95,
    secondaryCoilOpacity: 0.95,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 1 (C1): 原线圈特写（主体在右 rigX = 6.95，文字在左）
  {
    ...DERIVATION_POSES[1],
    camPos: DERIVATION_POSES[1].camPos.clone(),
    camLookAt: DERIVATION_POSES[1].camLookAt.clone(),
    coreOpacity: 0.92,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.96,
    secondaryCoilOpacity: 0.94,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 2 (C2): 副线圈特写（主体在左 rigX = -6.95，文字在右）
  {
    ...DERIVATION_POSES[3],
    camPos: DERIVATION_POSES[3].camPos.clone(),
    camLookAt: DERIVATION_POSES[3].camLookAt.clone(),
    coreOpacity: 0.92,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.94,
    secondaryCoilOpacity: 0.96,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
  // Step 3 (C3): 拉远复盘（主体在左 rigX = -5.65，右侧竖排三块文字）
  {
    ...DERIVATION_POSES[5],
    camPos: DERIVATION_POSES[5].camPos.clone(),
    camLookAt: DERIVATION_POSES[5].camLookAt.clone(),
    coreOpacity: 0.92,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.95,
    secondaryCoilOpacity: 0.95,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
    copperHeatAlpha: 0,
    ironHeatAlpha: 0,
    eddyLoopAlpha: 0,
    leakFluxAlpha: 0,
  },
];

const clonePose = (pose: TransformerPose): TransformerPose => ({
  ...pose,
  camPos: pose.camPos.clone(),
  camLookAt: pose.camLookAt.clone(),
});

interface FluxRingItem {
  curve: CatmullRomCurve3;
  lineMat: MeshBasicMaterial;
  arrowMat: MeshBasicMaterial;
  arrows: { mesh: Mesh; baseU: number }[];
}

interface EddyLoopItem {
  ringMat: MeshBasicMaterial;
  arrowMat: MeshBasicMaterial;
  arrows: { mesh: Mesh; baseAngle: number; radius: number; x: number }[];
}

interface LeakArcItem {
  curve: CatmullRomCurve3;
  lineMat: MeshBasicMaterial;
  arrowMat: MeshBasicMaterial;
  arrowMesh: Mesh;
}

export class TransformerCoreModel {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  private readonly rig = new Group();
  private coreMaterial!: MeshPhysicalMaterial;
  private wireframeMaterial!: LineBasicMaterial;
  private primaryCoilMaterial!: MeshStandardMaterial;
  private secondaryCoilMaterial!: MeshStandardMaterial;
  private powerBridgeMaterial!: MeshBasicMaterial;
  private pmremGenerator: PMREMGenerator | null = null;

  private primaryCurve!: CatmullRomCurve3;
  private secondaryCurve!: CatmullRomCurve3;

  // 5 条闭合圆角磁感线环流（线上只放箭头，不放球形粒子）
  private readonly fluxRings: FluxRingItem[] = [];

  // P10 铁损：铁芯内部涡旋电场/涡流环 + 铁芯内部泛红光体
  private readonly eddyGroup = new Group();
  private readonly eddyLoops: EddyLoopItem[] = [];
  private ironGlowMat!: MeshBasicMaterial;

  // P10 漏磁：原线圈靠近电压端 + 铁芯四个转角散出的漏磁感线
  private readonly leakGroup = new Group();
  private readonly leakArcs: LeakArcItem[] = [];

  // 血管红细胞式管内小电流粒子（InstancedMesh，48 颗/线圈）
  private primaryParticleMesh!: InstancedMesh;
  private primaryParticleMat!: MeshBasicMaterial;
  private readonly primaryParticleCount = 48;

  private secondaryParticleMesh!: InstancedMesh;
  private secondaryParticleMat!: MeshBasicMaterial;
  private readonly secondaryParticleCount = 32;

  private readonly poses: TransformerPose[];
  private currentPose: TransformerPose;
  private startPose: TransformerPose;
  private targetPose: TransformerPose;

  private currentStep = 0;
  private tweenStart = 0;
  private tweenDuration = 850;
  private flowDuration = 0;
  private flashStart = 0;
  private flashTarget: "none" | "primary" | "secondary" = "none";
  private isAnimating = false;
  private active = true;
  private destroyed = false;
  private rafId = 0;
  private appliedPixelRatio = 1;
  private resizeObserver: ResizeObserver | null = null;
  private readonly dummy = new Object3D();
  private readonly upVec = new Vector3(0, 1, 0);
  private readonly projTmp = new Vector3();

  private readonly onFrameCallback?: (anchors: ProjectedTransformerAnchors) => void;

  constructor(
    private readonly container: HTMLElement,
    private readonly mode: TransformerSceneMode = "derivation",
    onFrame?: (anchors: ProjectedTransformerAnchors) => void,
  ) {
    this.onFrameCallback = onFrame;
    this.poses =
      mode === "intro"
        ? INTRO_POSES
        : mode === "structure"
          ? STRUCTURE_POSES
          : mode === "principle"
            ? PRINCIPLE_POSES
            : mode === "loss"
              ? LOSS_POSES
              : mode === "ue"
                ? UE_POSES
                : DERIVATION_POSES;

    this.scene = new Scene();
    this.scene.background = null;

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    this.camera = new PerspectiveCamera(34, width / height, 0.1, 200);

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.24;
    container.append(this.renderer.domElement);

    // 注入 RoomEnvironment 真实高光反射贴图，使硅钢铁芯与黄铜/铜线圈呈现鲜明金属质感（绝不再像深色塑料支架）
    this.pmremGenerator = new PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    this.scene.environment = this.pmremGenerator.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose();

    this.currentPose = clonePose(this.poses[0]);
    this.startPose = clonePose(this.poses[0]);
    this.targetPose = clonePose(this.poses[0]);
    this.tweenStart = performance.now();

    this.setupLights();
    this.buildTransformerRig();

    this.syncRendererScale(true);
    this.applyPose(this.currentPose, Math.PI * 0.42, 0);
    this.renderOnce();

    if (this.shouldLoopFlow()) {
      this.isAnimating = true;
      this.rafId = requestAnimationFrame(this.tick);
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
  }

  private shouldLoopFlow(): boolean {
    if (this.mode === "loss") return true;
    if (this.mode === "intro" && this.currentStep >= 2) return true;
    if (this.mode === "principle" && this.currentStep >= 1) return true;
    return false;
  }

  private getElementScale(): number {
    const layoutW = this.container.clientWidth;
    if (!layoutW) return 1;
    return this.container.getBoundingClientRect().width / layoutW;
  }

  private syncRendererScale(force = false): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;

    const ratio = clamp((globalThis.devicePixelRatio || 1) * this.getElementScale(), 1, 2);
    const changed = Math.abs(ratio - this.appliedPixelRatio) >= 0.02;
    if (changed) {
      this.appliedPixelRatio = ratio;
      this.renderer.setPixelRatio(ratio);
    }
    if (changed || force) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    }
  }

  handleResize(): void {
    if (this.destroyed) return;
    this.syncRendererScale(true);
    this.renderOnce();
  }

  private setupLights(): void {
    this.scene.add(new AmbientLight("#e2e8f0", 0.98));
    this.scene.add(new HemisphereLight("#f8fafc", "#0f172a", 1));

    const keyLight = new DirectionalLight("#ffffff", 2.3);
    keyLight.position.set(10, 15, 16);
    this.scene.add(keyLight);

    const fillLight = new DirectionalLight("#60a5fa", 1.2);
    fillLight.position.set(-14, 6, 12);
    this.scene.add(fillLight);

    const backLight = new DirectionalLight("#e2a846", 1.25);
    backLight.position.set(0, -10, -14);
    this.scene.add(backLight);
  }

  // oxlint-disable-next-line max-statements -- 写实变压器整体建模：硅钢叠片圆角铁芯+3D线框、12:4细绕组、输入u~与抽象输出U2、闭合磁场环流、涡旋电场与漏磁感线
  private buildTransformerRig(): void {
    this.scene.add(this.rig);

    // 1. 圆角/倒角金属闭合铁芯 + 3D 结构线框
    const coreShape = createRoundedRectPath(5.4, 4.4, 0.36);
    const holeShape = createRoundedRectPath(3.1, 2.3, 0.22);
    coreShape.holes.push(holeShape);

    const coreGeo = new ExtrudeGeometry(coreShape, {
      depth: 1.12,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    });
    coreGeo.translate(0, 0, -0.56);

    this.coreMaterial = new MeshPhysicalMaterial({
      color: "#cbd5e1",
      emissive: "#000000",
      emissiveIntensity: 0,
      metalness: 0.88,
      roughness: 0.2,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.35,
      transparent: true,
      opacity: 0.94,
    });
    const coreMesh = new Mesh(coreGeo, this.coreMaterial);
    this.rig.add(coreMesh);

    // 铁芯底部的接触阴影（跟随 rig 移动/旋转）
    const contactShadow = new Mesh(
      new PlaneGeometry(6.8, 4.2).rotateX(-Math.PI / 2),
      new MeshBasicMaterial({
        map: createContactShadowTexture(),
        color: 0x000000,
        transparent: true,
        depthWrite: false,
        opacity: 0.72,
      }),
    );
    contactShadow.position.y = -2.26;
    contactShadow.renderOrder = -1;
    this.rig.add(contactShadow);

    // 3D 铁芯结构线框（EdgesGeometry）
    const edgesGeo = new EdgesGeometry(coreGeo, 22);
    this.wireframeMaterial = new LineBasicMaterial({
      color: "#e2e8f0",
      transparent: true,
      opacity: 0.36,
    });
    const coreWireframe = new LineSegments(edgesGeo, this.wireframeMaterial);
    this.rig.add(coreWireframe);

    // 2. 原线圈（左支腿 X = -2.125，12 匝，细线径 tubeRadius = 0.054，饱和电光钴蓝色）
    this.primaryCoilMaterial = new MeshStandardMaterial({
      color: "#2563eb",
      emissive: "#1d4ed8",
      emissiveIntensity: 0.28,
      metalness: 0.78,
      roughness: 0.18,
      envMapIntensity: 1.25,
      transparent: true,
      opacity: 0.94,
    });
    const primaryHelix = createSmoothCoilWithLeads({
      centerX: -2.125,
      radius: 0.86,
      height: 2.15,
      turns: 12,
      tubeRadius: 0.054,
      terminalX: -4.25,
      topTerminalY: 0.85,
      botTerminalY: -0.85,
      clockwise: true,
    });
    this.primaryCurve = primaryHelix.curve;
    this.rig.add(new Mesh(primaryHelix.geo, this.primaryCoilMaterial));

    // 金属接线端子
    const postMat = new MeshStandardMaterial({
      color: "#e2e8f0",
      metalness: 0.92,
      roughness: 0.18,
    });
    const redRingMat = new MeshStandardMaterial({
      color: "#ef4444",
      metalness: 0.3,
      roughness: 0.38,
    });
    const blueRingMat = new MeshStandardMaterial({
      color: "#3b82f6",
      metalness: 0.3,
      roughness: 0.38,
    });
    const tealRingMat = new MeshStandardMaterial({
      color: "#f59e0b",
      metalness: 0.35,
      roughness: 0.32,
    });

    const buildBindingPost = (x: number, y: number, ringMat: MeshStandardMaterial): Group => {
      const g = new Group();
      g.position.set(x, y, 0);
      const metalPin = new Mesh(
        new CylinderGeometry(0.11, 0.11, 0.46, 20).rotateX(Math.PI / 2),
        postMat,
      );
      const insRing = new Mesh(
        new CylinderGeometry(0.17, 0.17, 0.18, 20).rotateX(Math.PI / 2),
        ringMat,
      );
      insRing.position.z = 0.08;
      const cap = new Mesh(new SphereGeometry(0.12, 16, 16), postMat);
      cap.position.z = 0.24;
      g.add(metalPin, insRing, cap);
      return g;
    };

    this.rig.add(buildBindingPost(-4.25, 0.85, redRingMat));
    this.rig.add(buildBindingPost(-4.25, -0.85, blueRingMat));

    // 原边两接线柱之间正对镜头的 `U₁ ~` 交流标识牌
    const acPlateTex = createAcInputPlateTexture();
    const acPlateMat = new MeshBasicMaterial({
      map: acPlateTex,
      transparent: true,
      depthWrite: false,
    });
    const acPlate = new Mesh(new PlaneGeometry(1.22, 0.92), acPlateMat);
    acPlate.position.set(-4.35, 0, 0.15);
    this.rig.add(acPlate);

    // 3. 副线圈（右支腿 X = +2.125，4 匝，细线径 tubeRadius = 0.058，暖琥珀金铜色，与原线圈冷蓝形成鲜明冷暖对比，彻底告别双冷色）
    this.secondaryCoilMaterial = new MeshStandardMaterial({
      color: "#f59e0b",
      emissive: "#d97706",
      emissiveIntensity: 0.26,
      metalness: 0.82,
      roughness: 0.18,
      envMapIntensity: 1.3,
      transparent: true,
      opacity: 0.94,
    });
    const secondaryHelix = createSmoothCoilWithLeads({
      centerX: 2.125,
      radius: 0.86,
      height: 1.95,
      turns: 4,
      tubeRadius: 0.058,
      terminalX: 4.25,
      topTerminalY: 0.85,
      botTerminalY: -0.85,
      clockwise: false,
    });
    this.secondaryCurve = secondaryHelix.curve;
    this.rig.add(new Mesh(secondaryHelix.geo, this.secondaryCoilMaterial));

    // 副边抽象输出电压端（13 §2.1：右侧不连负载电阻，改成输出端两条线 + 两个开路输出端球 + U₂ 标注！）
    this.rig.add(buildBindingPost(4.25, 0.85, tealRingMat));
    this.rig.add(buildBindingPost(4.25, -0.85, tealRingMat));

    const outPlateTex = createAcOutputPlateTexture();
    const outPlateMat = new MeshBasicMaterial({
      map: outPlateTex,
      transparent: true,
      depthWrite: false,
    });
    const outPlate = new Mesh(new PlaneGeometry(1.22, 0.92), outPlateMat);
    outPlate.position.set(4.38, 0, 0.15);
    this.rig.add(outPlate);

    // 4. 铁芯内部 5 条不同半径的闭合圆角磁感线环流（线上只放箭头）
    const ringConfigs = [
      { hw: 1.72, hh: 1.32, r: 0.24 },
      { hw: 1.92, hh: 1.52, r: 0.28 },
      { hw: 2.12, hh: 1.72, r: 0.32 },
      { hw: 2.32, hh: 1.92, r: 0.36 },
      { hw: 2.52, hh: 2.12, r: 0.4 },
    ];
    const coneGeo = new ConeGeometry(0.088, 0.24, 14);
    const arrowBaseUs = [0.06, 0.19, 0.31, 0.44, 0.56, 0.69, 0.81, 0.94];

    for (const cfg of ringConfigs) {
      const curve = createRoundedFluxCurve(cfg.hw, cfg.hh, cfg.r);
      const lineGeo = new TubeGeometry(curve, 84, 0.02, 8, true);
      const lineMat = new MeshBasicMaterial({
        color: "#e2a846",
        transparent: true,
        opacity: 0,
      });
      this.rig.add(new Mesh(lineGeo, lineMat));

      const arrowMat = new MeshBasicMaterial({
        color: "#fbbf24",
        transparent: true,
        opacity: 0,
      });
      const arrows: { mesh: Mesh; baseU: number }[] = [];
      for (const baseU of arrowBaseUs) {
        const arrowMesh = new Mesh(coneGeo, arrowMat);
        arrows.push({ mesh: arrowMesh, baseU });
        this.rig.add(arrowMesh);
      }
      this.fluxRings.push({ curve, lineMat, arrowMat, arrows });
    }

    // 6. 血管红细胞式管内小电流粒子
    const microSphereGeo = new SphereGeometry(0.036, 10, 10);
    this.primaryParticleMat = new MeshBasicMaterial({
      color: "#e0f2fe",
      transparent: true,
      opacity: 0,
    });
    this.primaryParticleMesh = new InstancedMesh(
      microSphereGeo,
      this.primaryParticleMat,
      this.primaryParticleCount,
    );
    this.rig.add(this.primaryParticleMesh);

    this.secondaryParticleMat = new MeshBasicMaterial({
      color: "#fef3c7",
      transparent: true,
      opacity: 0,
    });
    this.secondaryParticleMesh = new InstancedMesh(
      microSphereGeo,
      this.secondaryParticleMat,
      this.secondaryParticleCount,
    );
    this.rig.add(this.secondaryParticleMesh);

    // 7. 功率守恒能量光束（P₁ -> P₂）
    this.powerBridgeMaterial = new MeshBasicMaterial({
      color: "#e2a846",
      transparent: true,
      opacity: 0,
    });
    const powerGeo = new CylinderGeometry(0.14, 0.14, 2.8, 20).rotateZ(Math.PI / 2);
    this.rig.add(new Mesh(powerGeo, this.powerBridgeMaterial));

    // 8. P10 铁损专项：铁芯左支腿与上横轭交界处的涡旋电场/涡流闭合环 + 铁芯内部泛红热核
    this.buildEddyCurrentAssets();

    // 9. P10 漏磁专项：原线圈靠近电压端一侧 + 铁芯四个转角散出的漏磁感线
    this.buildLeakageFluxAssets();
  }

  private buildEddyCurrentAssets(): void {
    this.rig.add(this.eddyGroup);
    this.eddyGroup.visible = false;

    // 铁芯上横轭内部很淡的红色热辉光核（只在铁芯内部，铁芯表面绝不整块发红！）
    this.ironGlowMat = new MeshBasicMaterial({
      color: "#ef4444",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const topYokeGlow = new Mesh(
      new CylinderGeometry(0.32, 0.32, 2.55, 24).rotateZ(Math.PI / 2),
      this.ironGlowMat,
    );
    topYokeGlow.position.set(0, 1.625, 0);
    this.eddyGroup.add(topYokeGlow);

    // 在铁芯上横轭内部（y = 1.625，x = -0.82, 0, +0.82）布置 3 个克制干净的闭合涡流环：
    // 细线（tube = 0.013）、橙红 #f97316 / #ef4444，环平面在 YZ 平面（严格与沿 X 轴的磁通方向垂直），带楞次定律方向箭头
    const eddyConeGeo = new ConeGeometry(0.044, 0.13, 12);
    const xPositions = [-0.82, 0, 0.82];
    for (let i = 0; i < xPositions.length; i += 1) {
      const xPos = xPositions[i];
      const radius = 0.33;
      const ringGeo = new TorusGeometry(radius, 0.013, 12, 40).rotateY(Math.PI / 2);
      const ringMat = new MeshBasicMaterial({
        color: i === 1 ? "#ef4444" : "#f97316",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const ringMesh = new Mesh(ringGeo, ringMat);
      ringMesh.position.set(xPos, 1.625, 0);
      this.eddyGroup.add(ringMesh);

      const arrowMat = new MeshBasicMaterial({
        color: "#f97316",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const arrows: { mesh: Mesh; baseAngle: number; radius: number; x: number }[] = [];
      for (const baseAngle of [0.25, Math.PI + 0.25]) {
        const arrowMesh = new Mesh(eddyConeGeo, arrowMat);
        arrows.push({ mesh: arrowMesh, baseAngle, radius, x: xPos });
        this.eddyGroup.add(arrowMesh);
      }
      this.eddyLoops.push({ ringMat, arrowMat, arrows });
    }
  }

  private buildLeakageFluxAssets(): void {
    this.rig.add(this.leakGroup);
    this.leakGroup.visible = false;

    const leakConeGeo = new ConeGeometry(0.072, 0.2, 12);
    // 真实漏磁：原线圈自己产生的一部分磁通量经绕组之间的空气（以及原线圈外侧空气）自行闭合、根本不经过右侧副线圈（X = +2.125）！
    // 画成从原线圈一端鼓到铁芯之外、再回到原线圈另一端的 3 条蓝色闭合回路（前后错开，像绕在左支腿与窗口空气外面）：
    const leakPaths: Vector3[][] = [
      // 回路 1（窗口内侧偏前 z = +0.26）：从左支腿原线圈上端出 -> 经两绕组之间的窗口空气鼓出 -> 回到原线圈下端（不经过右支腿副线圈）
      [
        new Vector3(-2.05, -0.92, 0.14),
        new Vector3(-2.12, 0, 0.16),
        new Vector3(-2.05, 0.92, 0.14),
        new Vector3(-1.32, 1.32, 0.26),
        new Vector3(-0.38, 0.72, 0.34),
        new Vector3(-0.22, 0, 0.38),
        new Vector3(-0.38, -0.72, 0.34),
        new Vector3(-1.32, -1.32, 0.26),
      ],
      // 回路 2（窗口内侧偏后 z = -0.26）：与回路 1 前后错开，从原线圈上端经绕组间空气自行闭合回原线圈下端
      [
        new Vector3(-2.02, -0.76, -0.14),
        new Vector3(-2.08, 0, -0.16),
        new Vector3(-2.02, 0.76, -0.14),
        new Vector3(-1.42, 1.12, -0.24),
        new Vector3(-0.78, 0.56, -0.32),
        new Vector3(-0.64, 0, -0.35),
        new Vector3(-0.78, -0.56, -0.32),
        new Vector3(-1.42, -1.12, -0.24),
      ],
      // 回路 3（原线圈左外侧空气 z = +0.18）：从原线圈上端鼓到左支腿外侧空气再回到原线圈下端
      [
        new Vector3(-2.22, -0.88, 0.08),
        new Vector3(-2.16, 0, 0.1),
        new Vector3(-2.22, 0.88, 0.08),
        new Vector3(-2.95, 1.24, 0.18),
        new Vector3(-3.55, 0.65, 0.24),
        new Vector3(-3.72, 0, 0.26),
        new Vector3(-3.55, -0.65, 0.24),
        new Vector3(-2.95, -1.24, 0.18),
      ],
    ];

    for (const path of leakPaths) {
      const curve = new CatmullRomCurve3(path, true);
      const lineGeo = new TubeGeometry(curve, 48, 0.022, 8, true);
      const lineMat = new MeshBasicMaterial({
        color: "#60a5fa",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      this.leakGroup.add(new Mesh(lineGeo, lineMat));

      const arrowMat = new MeshBasicMaterial({
        color: "#93c5fd",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const arrowMesh = new Mesh(leakConeGeo, arrowMat);
      this.leakGroup.add(arrowMesh);
      this.leakArcs.push({ curve, lineMat, arrowMat, arrowMesh });
    }
  }

  // 计算左线圈、右线圈、铁芯顶部在当前容器像素坐标系（0..width, 0..height）中的实时投影位置（13 §2.2）
  getProjectedAnchors(): ProjectedTransformerAnchors {
    const w = Math.max(this.container.clientWidth, 1);
    const h = Math.max(this.container.clientHeight, 1);
    this.rig.updateMatrixWorld(true);
    this.camera.updateMatrixWorld(true);

    const projectLocal = (lx: number, ly: number, lz: number): { x: number; y: number } => {
      this.projTmp.set(lx, ly, lz).applyMatrix4(this.rig.matrixWorld).project(this.camera);
      return {
        x: (this.projTmp.x * 0.5 + 0.5) * w,
        y: (-this.projTmp.y * 0.5 + 0.5) * h,
      };
    };

    return {
      leftCoil: projectLocal(-2.125, -0.78, 0.82),
      rightCoil: projectLocal(2.125, -0.78, 0.82),
      coreTop: projectLocal(0, 1.88, 0.35),
    };
  }

  private emitProjectedAnchors(): void {
    if (this.onFrameCallback) this.onFrameCallback(this.getProjectedAnchors());
  }

  // 切换到指定点击步
  // oxlint-disable-next-line complexity, max-statements -- 处理 P4 线圈闪烁、P10 跨屏转体与交流正负半周演示
  setStep(step: number, immediate = false): void {
    if (this.destroyed) return;
    const clamped = clamp(step, 0, this.poses.length - 1);
    if (!immediate && clamped === this.currentStep) return;

    const isForward = clamped > this.currentStep;
    const prevStep = this.currentStep;
    this.currentStep = clamped;

    if (immediate) {
      this.currentPose = clonePose(this.poses[clamped]);
      this.startPose = clonePose(this.poses[clamped]);
      this.targetPose = clonePose(this.poses[clamped]);
      this.tweenStart = performance.now();
      this.tweenDuration = 1;
      this.flashTarget = "none";
      this.flowDuration = 0;
      this.applyPose(this.currentPose, Math.PI * 0.42, 9999);
      this.renderOnce();
      if (this.shouldLoopFlow() && !this.isAnimating && this.active) {
        this.isAnimating = true;
        this.rafId = requestAnimationFrame(this.tick);
      }
      return;
    }

    this.startPose = clonePose(this.currentPose);
    this.targetPose = clonePose(this.poses[clamped]);

    // P11(原P12) 核心推导页 C2 -> C3：绕竖轴 360° 连续转体 + 跨屏飞越
    if (this.mode === "derivation") {
      if (prevStep === 2 && clamped === 3) this.startPose.rigRotY -= Math.PI * 2;
      else if (prevStep === 3 && clamped === 2) this.startPose.rigRotY += Math.PI * 2;
    }

    const now = performance.now();
    this.tweenStart = now;
    this.tweenDuration =
      this.mode === "intro" && clamped >= 2
        ? 1120
        : this.mode === "ue"
          ? 700
          : this.mode === "derivation" &&
              ((prevStep === 2 && clamped === 3) || (prevStep === 3 && clamped === 2))
            ? 960
            : 780;

    // P4 结构页：第 2 击闪烁左（原）线圈，第 3 击闪烁右（副）线圈（13 §2.2）
    if (this.mode === "structure" && isForward && (clamped === 2 || clamped === 3)) {
      this.flashStart = now;
      this.flashTarget = clamped === 2 ? "primary" : "secondary";
    } else {
      this.flashTarget = "none";
    }

    this.flowDuration = this.mode === "ue" ? 0 : clamped >= 1 && isForward ? 2200 : 0;

    if (!this.isAnimating && this.active) {
      this.isAnimating = true;
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  // oxlint-disable-next-line max-statements -- 插值所有位姿参数、线圈闪烁脉冲与交流正负半周相位
  private readonly tick = (now: number): void => {
    if (this.destroyed || !this.active) {
      this.isAnimating = false;
      return;
    }

    const elapsed = now - this.tweenStart;
    const tTween = clamp(elapsed / this.tweenDuration, 0, 1);
    const ease = easeInOutCubic(tTween);

    const lerp = (a: number, b: number): number => a + (b - a) * ease;
    this.currentPose.rigX = lerp(this.startPose.rigX, this.targetPose.rigX);
    this.currentPose.rigY = lerp(this.startPose.rigY, this.targetPose.rigY);
    this.currentPose.rigRotY = lerp(this.startPose.rigRotY, this.targetPose.rigRotY);
    this.currentPose.coreOpacity = lerp(this.startPose.coreOpacity, this.targetPose.coreOpacity);
    this.currentPose.wireframeOpacity = lerp(
      this.startPose.wireframeOpacity,
      this.targetPose.wireframeOpacity,
    );
    this.currentPose.primaryCoilOpacity = lerp(
      this.startPose.primaryCoilOpacity,
      this.targetPose.primaryCoilOpacity,
    );
    this.currentPose.secondaryCoilOpacity = lerp(
      this.startPose.secondaryCoilOpacity,
      this.targetPose.secondaryCoilOpacity,
    );
    this.currentPose.primaryCurrentAlpha = lerp(
      this.startPose.primaryCurrentAlpha,
      this.targetPose.primaryCurrentAlpha,
    );
    this.currentPose.secondaryCurrentAlpha = lerp(
      this.startPose.secondaryCurrentAlpha,
      this.targetPose.secondaryCurrentAlpha,
    );
    this.currentPose.fluxAlpha = lerp(this.startPose.fluxAlpha, this.targetPose.fluxAlpha);
    this.currentPose.resistorPinAlpha = lerp(
      this.startPose.resistorPinAlpha,
      this.targetPose.resistorPinAlpha,
    );
    this.currentPose.powerBridgeAlpha = lerp(
      this.startPose.powerBridgeAlpha,
      this.targetPose.powerBridgeAlpha,
    );
    this.currentPose.copperHeatAlpha = lerp(
      this.startPose.copperHeatAlpha,
      this.targetPose.copperHeatAlpha,
    );
    this.currentPose.ironHeatAlpha = lerp(
      this.startPose.ironHeatAlpha,
      this.targetPose.ironHeatAlpha,
    );
    this.currentPose.eddyLoopAlpha = lerp(
      this.startPose.eddyLoopAlpha,
      this.targetPose.eddyLoopAlpha,
    );
    this.currentPose.leakFluxAlpha = lerp(
      this.startPose.leakFluxAlpha,
      this.targetPose.leakFluxAlpha,
    );

    this.currentPose.camPos.lerpVectors(this.startPose.camPos, this.targetPose.camPos, ease);
    this.currentPose.camLookAt.lerpVectors(
      this.startPose.camLookAt,
      this.targetPose.camLookAt,
      ease,
    );

    const flashDuration = this.flashTarget === "none" ? 0 : 1450;
    const totalDuration = Math.max(this.tweenDuration, this.flowDuration, flashDuration);
    const isContinuousFlow = this.shouldLoopFlow();
    const phase = isContinuousFlow
      ? now * 0.001 * ((Math.PI * 2) / 2.2)
      : this.flowDuration > 0 && elapsed < this.flowDuration
        ? (elapsed / this.flowDuration) * Math.PI * 2.42
        : Math.PI * 0.42;

    const flashElapsed = this.flashTarget === "none" ? 9999 : now - this.flashStart;
    this.applyPose(this.currentPose, phase, flashElapsed);
    this.renderer.render(this.scene, this.camera);
    this.emitProjectedAnchors();

    if (elapsed < totalDuration || isContinuousFlow) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.currentPose = clonePose(this.targetPose);
      this.flashTarget = "none";
      this.applyPose(this.currentPose, Math.PI * 0.42, 9999);
      this.renderer.render(this.scene, this.camera);
      this.emitProjectedAnchors();
      this.isAnimating = false;
    }
  };

  // oxlint-disable-next-line max-statements -- 同步铁芯半透明+线框、5条箭头环流、铜损红光、铁损涡流与漏磁感线
  private applyPose(pose: TransformerPose, acPhase: number, flashElapsedMs: number): void {
    this.rig.position.set(pose.rigX, pose.rigY, 0);
    this.rig.rotation.y = pose.rigRotY;

    this.coreMaterial.opacity = pose.coreOpacity;
    this.coreMaterial.depthWrite = pose.coreOpacity > 0.72;
    this.wireframeMaterial.opacity = pose.wireframeOpacity;

    // 铁芯表面始终保持亮银钢金属本色（绝不整块变红！铁损的红光只存在于铁芯内部的 ironGlowMat）
    this.coreMaterial.emissive.set("#000000");
    this.coreMaterial.emissiveIntensity = 0;

    this.primaryCoilMaterial.opacity = pose.primaryCoilOpacity;
    this.primaryCoilMaterial.depthWrite = pose.primaryCoilOpacity > 0.75;
    this.secondaryCoilMaterial.opacity = pose.secondaryCoilOpacity;
    this.secondaryCoilMaterial.depthWrite = pose.secondaryCoilOpacity > 0.75;

    // 线圈闪烁高光（P4 C2 闪烁左线圈，C3 闪烁右线圈：3 次呼吸脉冲）
    let primaryFlashBoost = 0;
    let secondaryFlashBoost = 0;
    if (this.flashTarget !== "none" && flashElapsedMs < 1450) {
      const pulse = Math.sin((flashElapsedMs / 1450) * Math.PI * 3) ** 2;
      if (this.flashTarget === "primary") primaryFlashBoost = pulse * 1.15;
      else if (this.flashTarget === "secondary") secondaryFlashBoost = pulse * 1.15;
    }

    // 铜损：原、副线圈发红色呼吸光芒（体现通电发热 I²r，随连续时间柔和明暗呼吸）
    if (pose.copperHeatAlpha > 0.02) {
      const heatBreath = 0.5 + 0.5 * Math.sin(acPhase * 1.4);
      const heatIntensity = (0.35 + 0.85 * heatBreath) * pose.copperHeatAlpha;

      this.primaryCoilMaterial.color.set("#f87171");
      this.primaryCoilMaterial.emissive.set("#ef4444");
      this.primaryCoilMaterial.emissiveIntensity = 0.25 + heatIntensity;

      this.secondaryCoilMaterial.color.set("#fb7185");
      this.secondaryCoilMaterial.emissive.set("#e11d48");
      this.secondaryCoilMaterial.emissiveIntensity = 0.25 + heatIntensity;
    } else {
      this.primaryCoilMaterial.color.set("#2563eb");
      this.primaryCoilMaterial.emissive.set(primaryFlashBoost > 0.1 ? "#93c5fd" : "#1d4ed8");
      this.primaryCoilMaterial.emissiveIntensity = 0.28 + primaryFlashBoost;

      this.secondaryCoilMaterial.color.set("#f59e0b");
      this.secondaryCoilMaterial.emissive.set(secondaryFlashBoost > 0.1 ? "#fde68a" : "#d97706");
      this.secondaryCoilMaterial.emissiveIntensity = 0.26 + secondaryFlashBoost;
    }

    this.powerBridgeMaterial.opacity = pose.powerBridgeAlpha * 0.38;

    const acVal = Math.sin(acPhase);
    const acMag = Math.abs(acVal);
    const dirSign = acVal >= 0 ? 1 : -1;

    // 5 条闭合磁感线环流
    const activeFloat = acMag * this.fluxRings.length;
    const quat = new Quaternion();

    for (let idx = 0; idx < this.fluxRings.length; idx += 1) {
      const ring = this.fluxRings[idx];
      const ringStrength = clamp(activeFloat - idx * 0.75, 0, 1);
      const radialFalloff = 1 - idx * 0.11;
      const alpha = pose.fluxAlpha * ringStrength * radialFalloff;

      ring.lineMat.opacity = alpha * 0.72;
      ring.arrowMat.opacity = alpha * 0.98;

      const drift = dirSign * ((acPhase * 0.06) % 1);
      for (const item of ring.arrows) {
        const u = (((item.baseU + drift) % 1) + 1) % 1;
        const pos = ring.curve.getPointAt(u);
        const tangent = ring.curve.getTangentAt(u).multiplyScalar(dirSign).normalize();
        item.mesh.position.copy(pos);
        quat.setFromUnitVectors(this.upVec, tangent);
        item.mesh.quaternion.copy(quat);
      }
    }

    // P10 铁损：铁芯上横轭内部 3 个垂直于磁通方向的闭合涡流环 + 铁芯内部很淡的红热辉光
    this.eddyGroup.visible = pose.eddyLoopAlpha > 0.005 || pose.ironHeatAlpha > 0.005;
    if (this.eddyGroup.visible) {
      this.ironGlowMat.opacity = pose.ironHeatAlpha * 0.22;
      // 楞次定律：涡流方向由 -dΦ/dt 决定（即 -cos(acPhase) 的符号），环平面在 YZ 平面，垂直于上横轭 X 轴磁通方向
      const lenzSign = Math.cos(acPhase) >= 0 ? -1 : 1;
      const eddyAngleOffset = acPhase * 0.65;
      for (const loop of this.eddyLoops) {
        loop.ringMat.opacity = pose.eddyLoopAlpha * 0.88;
        loop.arrowMat.opacity = pose.eddyLoopAlpha * 0.96;
        for (const arr of loop.arrows) {
          const theta = arr.baseAngle + lenzSign * eddyAngleOffset;
          const ay = 1.625 + arr.radius * Math.cos(theta);
          const az = arr.radius * Math.sin(theta);
          arr.mesh.position.set(arr.x, ay, az);
          const tangent = new Vector3(
            0,
            -Math.sin(theta) * lenzSign,
            Math.cos(theta) * lenzSign,
          ).normalize();
          quat.setFromUnitVectors(this.upVec, tangent);
          arr.mesh.quaternion.copy(quat);
        }
      }
    }

    // P9 漏磁：原线圈产生的部分磁通量经绕组间空气自行闭合，不经过副线圈
    this.leakGroup.visible = pose.leakFluxAlpha > 0.005;
    if (this.leakGroup.visible) {
      const visualMag = 0.22 + 0.78 * acMag;
      const uMid = 0.62 + 0.08 * Math.sin(acPhase);
      for (const arc of this.leakArcs) {
        arc.lineMat.opacity = pose.leakFluxAlpha * 0.86 * visualMag;
        arc.arrowMat.opacity = pose.leakFluxAlpha * 0.96 * visualMag;
        const pos = arc.curve.getPointAt(uMid);
        const tangent = arc.curve.getTangentAt(uMid).multiplyScalar(dirSign).normalize();
        arc.arrowMesh.position.copy(pos);
        quat.setFromUnitVectors(this.upVec, tangent);
        arc.arrowMesh.quaternion.copy(quat);
      }
    }

    // 血管红细胞式管内微粒子
    this.primaryParticleMat.opacity = pose.primaryCurrentAlpha * 0.96;
    const pOffset = 0.08 * Math.sin(acPhase);
    for (let i = 0; i < this.primaryParticleCount; i += 1) {
      const u = (((i / this.primaryParticleCount + pOffset) % 1) + 1) % 1;
      this.dummy.position.copy(this.primaryCurve.getPointAt(u));
      this.dummy.updateMatrix();
      this.primaryParticleMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.primaryParticleMesh.instanceMatrix.needsUpdate = true;

    this.secondaryParticleMat.opacity = pose.secondaryCurrentAlpha * 0.96;
    const sOffset = -0.08 * Math.cos(acPhase);
    for (let i = 0; i < this.secondaryParticleCount; i += 1) {
      const u = (((i / this.secondaryParticleCount + sOffset) % 1) + 1) % 1;
      this.dummy.position.copy(this.secondaryCurve.getPointAt(u));
      this.dummy.updateMatrix();
      this.secondaryParticleMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.secondaryParticleMesh.instanceMatrix.needsUpdate = true;

    this.camera.position.copy(pose.camPos);
    this.camera.lookAt(pose.camLookAt);
  }

  renderOnce(): void {
    if (this.destroyed || !this.active) return;
    this.renderer.render(this.scene, this.camera);
    this.emitProjectedAnchors();
  }

  setActive(active: boolean): void {
    if (this.destroyed || this.active === active) return;
    this.active = active;
    if (!active && this.isAnimating) {
      cancelAnimationFrame(this.rafId);
      this.isAnimating = false;
    } else if (active) {
      this.syncRendererScale(true);
      if (this.shouldLoopFlow() && !this.isAnimating) {
        this.isAnimating = true;
        this.rafId = requestAnimationFrame(this.tick);
      } else {
        this.renderOnce();
      }
    }
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.active = false;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;

    this.scene.traverse((obj) => {
      const mesh = obj as { geometry?: BufferGeometry; material?: Material | Material[] };
      mesh.geometry?.dispose();
      if (mesh.material != null) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) m.dispose();
      }
    });

    this.pmremGenerator?.dispose();
    this.pmremGenerator = null;
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
