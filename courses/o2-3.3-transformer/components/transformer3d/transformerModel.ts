/* oxlint-disable max-lines -- 写实 3D 变压器组件建模（圆角铁芯+3D线框、12:4细绕组、双接线柱+u、写实电阻、5条纯箭头环流、血管式管内微粒子）集中在单文件 */
/**
 * 写实 3D 变压器模型（供 P4 结构页、P5 原理页、P8 核心推导页共用，M9 & M10 & M14 & §6.5 & §8）
 *
 * 严格落实 07-给Gemini4的执行指令.md §1 M10、§6.5、§8：
 *
 * 1. 圆角/倒角金属铁芯；聚焦磁感线时铁芯半透明并保留清晰的 3D 线框（EdgesGeometry），让内部结构清晰可见。
 * 2. 原线圈匝数明显多于副线圈（12 : 4），线径减细；研究某线圈时线圈半透明。
 * 3. 输入端两个金属接线柱 + 交流符号 `~` + `u` 正对镜头；导线平滑无硬折角。
 * 4. 输出端两个金属接线柱 + 写实圆柱电阻（带金属端帽与色环）；导线平滑。
 * 5. 铁芯窗口内 5 条不同半径的闭合圆角磁感线环流（读得出“疏密”），场线上**只放圆锥箭头、不放球形粒子**； 箭头随交变电流往返：正向增强（1→5 条激活）→ 减弱（5→0）→ 反向增强（0→5
 *    条反向）→ 减弱。
 * 6. 线圈导线内部：血管红细胞式的小电流微粒子在半透明导线管内连续往返流动。
 */
import type { BufferGeometry, Material } from "three";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  CatmullRomCurve3,
  CanvasTexture,
  Color,
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
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  Shape,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));

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
  const geo = new TubeGeometry(curve, totalSteps + 28, tubeRadius, 10, false);
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
  // 四个圆角按顺时针排列：左上 -> 右上 -> 右下 -> 左下
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

// 生成正对镜头的 `u ~` 交流输入标识贴图
const createAcInputPlateTexture = (): CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 256, 192);
    // 物理量 u（斜体暖金）
    ctx.fillStyle = "#e2a846";
    ctx.font = "italic bold 66px Georgia, 'Times New Roman', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("u", 128, 66);

    // 交流正弦符号 ~
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(76, 134);
    ctx.bezierCurveTo(96, 106, 114, 106, 128, 134);
    ctx.bezierCurveTo(142, 162, 160, 162, 180, 134);
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
}

export type TransformerSceneMode = "structure" | "principle" | "derivation";

// P4 结构页（3 击：0 整体、1 原线圈12匝、2 副线圈4匝、3 闭合铁芯+3~5条磁感线）
const STRUCTURE_POSES: TransformerPose[] = [
  {
    rigX: -0.6,
    rigY: 0,
    rigRotY: 0.22,
    camPos: new Vector3(-0.6, 1.1, 14.8),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.92,
    wireframeOpacity: 0.22,
    primaryCoilOpacity: 0.95,
    secondaryCoilOpacity: 0.95,
    primaryCurrentAlpha: 0,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
  },
  // C1: 聚焦原线圈（初级，12 匝，接交流电源 u~）
  {
    rigX: -0.4,
    rigY: 0,
    rigRotY: 0.3,
    camPos: new Vector3(-1.1, 1, 13.8),
    camLookAt: new Vector3(-0.9, 0, 0),
    coreOpacity: 0.85,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 1,
    secondaryCoilOpacity: 0.45,
    primaryCurrentAlpha: 0.75,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
  },
  // C2: 聚焦副线圈（次级，4 匝，接负载电阻 R）
  {
    rigX: -0.7,
    rigY: 0,
    rigRotY: -0.26,
    camPos: new Vector3(-0.3, 1, 13.8),
    camLookAt: new Vector3(-0.4, 0, 0),
    coreOpacity: 0.85,
    wireframeOpacity: 0.28,
    primaryCoilOpacity: 0.45,
    secondaryCoilOpacity: 1,
    primaryCurrentAlpha: 0.35,
    secondaryCurrentAlpha: 0.75,
    fluxAlpha: 0,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
  },
  // C3: 闭合铁芯半透明 + 3D 线框 + 内部闭合磁感线箭头环流
  {
    rigX: -0.6,
    rigY: 0,
    rigRotY: 0.2,
    camPos: new Vector3(-0.6, 1.15, 14.4),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.88,
    secondaryCoilOpacity: 0.88,
    primaryCurrentAlpha: 0.85,
    secondaryCurrentAlpha: 0.85,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
  },
];

// P5 原理页（3 击，无任何公式：0 整体静帧、1 原线圈交变电流+变化磁场、2 铁芯闭合导磁5条箭头环流、3 副线圈感应电流）
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
  },
  // C1: 原线圈通入交变电流（线圈半透明，内部红细胞式微粒子往返流动 + 激发变化磁场）
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
  },
  // C2: 铁芯半透明 + 3D 线框 + 5 条纯箭头环流随交流增强/减弱/反向
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
  },
  // C3: 变化的磁通穿过副线圈，副线圈半透明，内部产生感应电流微粒子流向写实负载电阻
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
  },
];

// P8 核心推导页（6 击：左出画、右出画、公式占 2/3、连续运镜）
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
  },
  // Step 1 (C1): 推近左侧；变压器移到画面最右、右半出画；原线圈半透明+微粒子流动+铁芯5条箭头环流
  {
    rigX: 5.45,
    rigY: -0.08,
    rigRotY: 0.24,
    camPos: new Vector3(1.15, 0.8, 10.5),
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
  },
  // Step 2 (C2): 左侧推导（公式占左 2/3，变压器占右 1/3 且右半出画）；标出 r₁
  {
    rigX: 5.6,
    rigY: -0.08,
    rigRotY: 0.26,
    camPos: new Vector3(1.2, 0.75, 10.3),
    camLookAt: new Vector3(1.2, -0.05, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.48,
    secondaryCoilOpacity: 0.75,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 0,
    fluxAlpha: 0.95,
    resistorPinAlpha: 1,
    powerBridgeAlpha: 0,
  },
  // Step 3 (C3): 绕竖轴连续转体并飞到画面最左、左半出画（公式占右 2/3，变压器占左 1/3）；副线圈半透明+微粒子+r₂
  {
    rigX: -5.6,
    rigY: -0.08,
    rigRotY: -0.26,
    camPos: new Vector3(-1.2, 0.75, 10.3),
    camLookAt: new Vector3(-1.2, -0.05, 0),
    coreOpacity: 0.3,
    wireframeOpacity: 0.82,
    primaryCoilOpacity: 0.7,
    secondaryCoilOpacity: 0.48,
    primaryCurrentAlpha: 0.75,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 0.95,
    resistorPinAlpha: 1,
    powerBridgeAlpha: 0,
  },
  // Step 4 (C4): 两侧磁通路径同时高亮，同一磁通 Φ（5 条箭头环流 + 铁芯半透明线框）
  {
    rigX: -3.65,
    rigY: -0.05,
    rigRotY: -0.16,
    camPos: new Vector3(-0.6, 1.1, 14.2),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.26,
    wireframeOpacity: 0.88,
    primaryCoilOpacity: 0.55,
    secondaryCoilOpacity: 0.55,
    primaryCurrentAlpha: 0.9,
    secondaryCurrentAlpha: 0.9,
    fluxAlpha: 1,
    resistorPinAlpha: 0.7,
    powerBridgeAlpha: 0,
  },
  // Step 5 (C5): r₁、r₂ 归零/淡出（理想化 U₁/U₂ = n₁/n₂）
  {
    rigX: -3.65,
    rigY: -0.05,
    rigRotY: -0.14,
    camPos: new Vector3(-0.6, 1.05, 14),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.32,
    wireframeOpacity: 0.8,
    primaryCoilOpacity: 0.55,
    secondaryCoilOpacity: 0.55,
    primaryCurrentAlpha: 0.95,
    secondaryCurrentAlpha: 0.95,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 0,
  },
  // Step 6 (C6): 功率能量流从原边流向副边（P₁ = P₂ -> I₁/I₂ = n₂/n₁）
  {
    rigX: -3.65,
    rigY: -0.05,
    rigRotY: -0.12,
    camPos: new Vector3(-0.6, 1.05, 14),
    camLookAt: new Vector3(-0.6, 0, 0),
    coreOpacity: 0.32,
    wireframeOpacity: 0.8,
    primaryCoilOpacity: 0.52,
    secondaryCoilOpacity: 0.52,
    primaryCurrentAlpha: 1,
    secondaryCurrentAlpha: 1,
    fluxAlpha: 1,
    resistorPinAlpha: 0,
    powerBridgeAlpha: 1,
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

export class TransformerCoreModel {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  private readonly rig = new Group();
  private coreMaterial!: MeshStandardMaterial;
  private wireframeMaterial!: LineBasicMaterial;
  private primaryCoilMaterial!: MeshStandardMaterial;
  private secondaryCoilMaterial!: MeshStandardMaterial;
  private resistorPinMaterial!: MeshStandardMaterial;
  private powerBridgeMaterial!: MeshBasicMaterial;

  private primaryCurve!: CatmullRomCurve3;
  private secondaryCurve!: CatmullRomCurve3;

  // 5 条闭合圆角磁感线环流（线上只放箭头，不放球形粒子）
  private readonly fluxRings: FluxRingItem[] = [];

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
  private isAnimating = false;
  private active = true;
  private destroyed = false;
  private rafId = 0;
  private appliedPixelRatio = 1;
  private resizeObserver: ResizeObserver | null = null;
  private readonly dummy = new Object3D();
  private readonly upVec = new Vector3(0, 1, 0);

  constructor(
    private readonly container: HTMLElement,
    private readonly mode: TransformerSceneMode = "derivation",
  ) {
    this.poses =
      mode === "structure"
        ? STRUCTURE_POSES
        : mode === "principle"
          ? PRINCIPLE_POSES
          : DERIVATION_POSES;

    this.scene = new Scene();
    this.scene.background = new Color("#090d1a");

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    this.camera = new PerspectiveCamera(34, width / height, 0.1, 200);

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    container.append(this.renderer.domElement);

    this.currentPose = clonePose(this.poses[0]);
    this.startPose = clonePose(this.poses[0]);
    this.targetPose = clonePose(this.poses[0]);

    this.setupLights();
    this.buildTransformerRig();

    this.syncRendererScale(true);
    this.applyPose(this.currentPose, Math.PI * 0.42);
    this.renderOnce();

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
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
    this.scene.add(new AmbientLight("#e2e8f0", 0.95));
    this.scene.add(new HemisphereLight("#f8fafc", "#0f172a", 0.95));

    const keyLight = new DirectionalLight("#ffffff", 2.2);
    keyLight.position.set(10, 15, 16);
    this.scene.add(keyLight);

    const fillLight = new DirectionalLight("#60a5fa", 1.15);
    fillLight.position.set(-14, 6, 12);
    this.scene.add(fillLight);

    const backLight = new DirectionalLight("#e2a846", 1.2);
    backLight.position.set(0, -10, -14);
    this.scene.add(backLight);
  }

  // oxlint-disable-next-line max-statements -- 写实变压器整体建模：圆角铁芯+3D线框、12:4细绕组、双接线柱+u、写实色环电阻、5条纯箭头环流、管内微粒子
  private buildTransformerRig(): void {
    this.scene.add(this.rig);

    // 1. 圆角/倒角金属闭合铁芯 + 3D 结构线框（聚焦磁感线时半透明并保留 3D 线框）
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

    this.coreMaterial = new MeshStandardMaterial({
      color: "#64748b",
      metalness: 0.82,
      roughness: 0.28,
      transparent: true,
      opacity: 0.88,
    });
    const coreMesh = new Mesh(coreGeo, this.coreMaterial);
    this.rig.add(coreMesh);

    // 3D 铁芯结构线框（EdgesGeometry）
    const edgesGeo = new EdgesGeometry(coreGeo, 22);
    this.wireframeMaterial = new LineBasicMaterial({
      color: "#94a3b8",
      transparent: true,
      opacity: 0.3,
    });
    const coreWireframe = new LineSegments(edgesGeo, this.wireframeMaterial);
    this.rig.add(coreWireframe);

    // 2. 原线圈（左支腿 X = -2.125，12 匝，细线径 tubeRadius = 0.052，蓝色；研究时可半透明露出管内微粒子）
    this.primaryCoilMaterial = new MeshStandardMaterial({
      color: "#3b82f6",
      emissive: "#1d4ed8",
      emissiveIntensity: 0.32,
      metalness: 0.65,
      roughness: 0.22,
      transparent: true,
      opacity: 0.9,
    });
    const primaryHelix = createSmoothCoilWithLeads({
      centerX: -2.125,
      radius: 0.86,
      height: 2.15,
      turns: 12,
      tubeRadius: 0.052,
      terminalX: -4.25,
      topTerminalY: 0.85,
      botTerminalY: -0.85,
      clockwise: true,
    });
    this.primaryCurve = primaryHelix.curve;
    this.rig.add(new Mesh(primaryHelix.geo, this.primaryCoilMaterial));

    // 原边两个写实金属接线柱（不再用一个大圆盘把两条线糊在一起）
    const postMat = new MeshStandardMaterial({
      color: "#e2e8f0",
      metalness: 0.9,
      roughness: 0.2,
    });
    const redRingMat = new MeshStandardMaterial({
      color: "#ef4444",
      metalness: 0.3,
      roughness: 0.4,
    });
    const blueRingMat = new MeshStandardMaterial({
      color: "#3b82f6",
      metalness: 0.3,
      roughness: 0.4,
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

    // 两接线柱之间正对镜头的 `u ~` 交流标识牌
    const acPlateTex = createAcInputPlateTexture();
    const acPlateMat = new MeshBasicMaterial({
      map: acPlateTex,
      transparent: true,
      depthWrite: false,
    });
    const acPlate = new Mesh(new PlaneGeometry(1.15, 0.86), acPlateMat);
    acPlate.position.set(-4.25, 0, 0.15);
    this.rig.add(acPlate);

    // 3. 副线圈（右支腿 X = +2.125，4 匝，细线径 tubeRadius = 0.056，青色；与原线圈形成鲜明 12 : 4 对比）
    this.secondaryCoilMaterial = new MeshStandardMaterial({
      color: "#2dd4bf",
      emissive: "#0d9488",
      emissiveIntensity: 0.32,
      metalness: 0.65,
      roughness: 0.22,
      transparent: true,
      opacity: 0.9,
    });
    const secondaryHelix = createSmoothCoilWithLeads({
      centerX: 2.125,
      radius: 0.86,
      height: 1.95,
      turns: 4,
      tubeRadius: 0.056,
      terminalX: 4.25,
      topTerminalY: 0.85,
      botTerminalY: -0.85,
      clockwise: false,
    });
    this.secondaryCurve = secondaryHelix.curve;
    this.rig.add(new Mesh(secondaryHelix.geo, this.secondaryCoilMaterial));

    // 副边两个写实金属接线柱
    this.rig.add(buildBindingPost(4.25, 0.85, redRingMat));
    this.rig.add(buildBindingPost(4.25, -0.85, blueRingMat));

    // 副边输出端写实轴向电阻器（米色陶瓷圆柱 + 银色金属端帽 + 4 道色环 + 引脚）
    const resistorGroup = new Group();
    resistorGroup.position.set(4.25, 0, 0);
    // 金属引线连接上下接线柱
    const leadWire = new Mesh(new CylinderGeometry(0.038, 0.038, 1.7, 12), postMat);
    resistorGroup.add(leadWire);
    // 陶瓷主体
    const ceramicBodyMat = new MeshStandardMaterial({
      color: "#d6c7a9",
      metalness: 0.1,
      roughness: 0.45,
    });
    const resBody = new Mesh(new CylinderGeometry(0.22, 0.22, 0.88, 24), ceramicBodyMat);
    resistorGroup.add(resBody);
    // 两端金属帽
    const topCap = new Mesh(new CylinderGeometry(0.235, 0.235, 0.14, 24), postMat);
    topCap.position.y = 0.39;
    const botCap = topCap.clone();
    botCap.position.y = -0.39;
    resistorGroup.add(topCap, botCap);
    // 4 道色环（棕、黑、红、金）
    const bandColors = ["#7c2d12", "#111827", "#dc2626", "#eab308"];
    const bandYs = [0.2, 0.06, -0.08, -0.24];
    for (let i = 0; i < bandColors.length; i += 1) {
      const bMat = new MeshStandardMaterial({
        color: bandColors[i],
        metalness: i === 3 ? 0.75 : 0.15,
        roughness: 0.3,
      });
      const bMesh = new Mesh(new CylinderGeometry(0.226, 0.226, 0.055, 24), bMat);
      bMesh.position.y = bandYs[i];
      resistorGroup.add(bMesh);
    }
    this.rig.add(resistorGroup);

    // 4. 线圈等效内阻“电压钉” r₁ / r₂（P8 C2/C3 显影，C5 理想化时归零淡出）
    this.resistorPinMaterial = new MeshStandardMaterial({
      color: "#f87171",
      emissive: "#ef4444",
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0,
    });
    const r1Pin = new Mesh(
      new CylinderGeometry(0.14, 0.14, 0.52, 16).rotateZ(Math.PI / 2),
      this.resistorPinMaterial,
    );
    r1Pin.position.set(-3.4, 0.85, 0);
    const r2Pin = r1Pin.clone();
    r2Pin.position.set(3.4, 0.85, 0);
    this.rig.add(r1Pin, r2Pin);

    // 5. 铁芯内部 5 条不同半径的闭合圆角磁感线环流（线上只放箭头，不放球形粒子！）
    const ringConfigs = [
      { hw: 1.72, hh: 1.32, r: 0.24 }, // 最内圈（最先亮起）
      { hw: 1.92, hh: 1.52, r: 0.28 },
      { hw: 2.12, hh: 1.72, r: 0.32 }, // 中线圈
      { hw: 2.32, hh: 1.92, r: 0.36 },
      { hw: 2.52, hh: 2.12, r: 0.4 }, // 最外圈
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

    // 6. 血管红细胞式管内小电流粒子（半径 0.036 < 线圈管径 0.052，完全在半透明导线管内流动）
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
      color: "#ccfbf1",
      transparent: true,
      opacity: 0,
    });
    this.secondaryParticleMesh = new InstancedMesh(
      microSphereGeo,
      this.secondaryParticleMat,
      this.secondaryParticleCount,
    );
    this.rig.add(this.secondaryParticleMesh);

    // 7. P8 C6 功率守恒能量光束（P₁ -> P₂）
    this.powerBridgeMaterial = new MeshBasicMaterial({
      color: "#e2a846",
      transparent: true,
      opacity: 0,
    });
    const powerGeo = new CylinderGeometry(0.14, 0.14, 2.8, 20).rotateZ(Math.PI / 2);
    this.rig.add(new Mesh(powerGeo, this.powerBridgeMaterial));
  }

  // 切换到指定点击步：播放连续运镜与交变电流/磁感线环流往返演示，结束后冻结在静帧
  setStep(step: number): void {
    if (this.destroyed) return;
    const clamped = clamp(step, 0, this.poses.length - 1);
    const isForward = clamped > this.currentStep;
    const prevStep = this.currentStep;
    this.currentStep = clamped;

    this.startPose = clonePose(this.currentPose);
    this.targetPose = clonePose(this.poses[clamped]);

    // P8 核心推导页 C2 -> C3：绕竖轴 360° 连续转体 + 跨屏飞越
    if (this.mode === "derivation") {
      if (prevStep === 2 && clamped === 3) this.startPose.rigRotY -= Math.PI * 2;
      else if (prevStep === 3 && clamped === 2) this.startPose.rigRotY += Math.PI * 2;
    }

    this.tweenStart = performance.now();
    this.tweenDuration =
      this.mode === "derivation" &&
      ((prevStep === 2 && clamped === 3) || (prevStep === 3 && clamped === 2))
        ? 960
        : 760;
    // 播放 2200 ms 的交流正负半周往返（正向 1->5 增强 -> 5->0 减弱 -> 反向 0->5 增强 -> 减弱 -> 停在正向 5 条全亮静帧）
    this.flowDuration = clamped >= 1 && isForward ? 2200 : 0;

    if (!this.isAnimating && this.active) {
      this.isAnimating = true;
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  // oxlint-disable-next-line max-statements -- 插值所有位姿参数与交流正负半周相位
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

    this.currentPose.camPos.lerpVectors(this.startPose.camPos, this.targetPose.camPos, ease);
    this.currentPose.camLookAt.lerpVectors(
      this.startPose.camLookAt,
      this.targetPose.camLookAt,
      ease,
    );

    const totalDuration = Math.max(this.tweenDuration, this.flowDuration);
    // 交流相位：在 2200 ms 内走完 1.25 个完整正负周期（0 -> 2.5π），经历正向增强(1->5)、减弱(5->0)、反向增强(0->5)、减弱，最终停在 0.42π（5 条全亮）
    const phase =
      this.flowDuration > 0 && elapsed < this.flowDuration
        ? (elapsed / this.flowDuration) * Math.PI * 2.42
        : Math.PI * 0.42;

    this.applyPose(this.currentPose, phase);
    this.renderer.render(this.scene, this.camera);

    if (elapsed < totalDuration) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.currentPose = clonePose(this.targetPose);
      this.applyPose(this.currentPose, Math.PI * 0.42);
      this.renderer.render(this.scene, this.camera);
      this.isAnimating = false;
    }
  };

  // oxlint-disable-next-line max-statements -- 同步铁芯半透明+线框、5条箭头环流随交流增减反向、血管式管内微粒子
  private applyPose(pose: TransformerPose, acPhase: number): void {
    this.rig.position.set(pose.rigX, pose.rigY, 0);
    this.rig.rotation.y = pose.rigRotY;

    this.coreMaterial.opacity = pose.coreOpacity;
    this.coreMaterial.depthWrite = pose.coreOpacity > 0.72;
    this.wireframeMaterial.opacity = pose.wireframeOpacity;

    this.primaryCoilMaterial.opacity = pose.primaryCoilOpacity;
    this.primaryCoilMaterial.depthWrite = pose.primaryCoilOpacity > 0.75;
    this.secondaryCoilMaterial.opacity = pose.secondaryCoilOpacity;
    this.secondaryCoilMaterial.depthWrite = pose.secondaryCoilOpacity > 0.75;

    this.resistorPinMaterial.opacity = pose.resistorPinAlpha;
    this.powerBridgeMaterial.opacity = pose.powerBridgeAlpha * 0.38;

    // 交变电流与磁通瞬时值：sin(acPhase) 经历 +峰值 -> 0 -> -峰值 -> 0 -> +峰值
    const acVal = Math.sin(acPhase);
    const acMag = Math.abs(acVal);
    const dirSign = acVal >= 0 ? 1 : -1;

    // 5 条磁感线环流：按 |sin(acPhase)| 依次激活 1->5 条（增强）与 5->0 条（减弱），负半周箭头全部反向！
    const activeFloat = acMag * this.fluxRings.length;
    const quat = new Quaternion();

    for (let idx = 0; idx < this.fluxRings.length; idx += 1) {
      const ring = this.fluxRings[idx];
      const ringStrength = clamp(activeFloat - idx * 0.75, 0, 1);
      // 内圈亮、外圈略淡，体现磁感线疏密分布
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

    // 血管红细胞式管内微粒子：沿螺旋线圈中心线连续往返振荡
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
  }

  setActive(active: boolean): void {
    if (this.destroyed || this.active === active) return;
    this.active = active;
    if (!active && this.isAnimating) {
      cancelAnimationFrame(this.rafId);
      this.isAnimating = false;
    } else if (active) {
      this.syncRendererScale(true);
      this.renderOnce();
    }
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.active = false;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;

    const materials = new Set<Material>();
    const geometries = new Set<BufferGeometry>();
    this.scene.traverse((obj) => {
      const { geometry, material } = obj as {
        geometry?: BufferGeometry;
        material?: Material | Material[];
      };
      if (geometry) geometries.add(geometry);
      if (!material) return;
      for (const item of Array.isArray(material) ? material : [material]) materials.add(item);
    });
    for (const geo of geometries) geo.dispose();
    for (const mat of materials) {
      (mat as MeshBasicMaterial).map?.dispose();
      mat.dispose();
    }

    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
