<!--
  阴极射线管高精度 3D 实体模型 (CathodeRayTube3D.vue)
  —— 严格遵循真实物理实验构造：
     1. 二维扁平磁场箭头 (45° 顶角 Axial Billboard)：
        - 箭头部为扁平三角形，顶角严格控制在 45°（半顶角 22.5°，高宽比严格匹配）；
        - 箭身与箭尖同平面、半透明金黄面片 + 高亮锐利轮廓线；
        - 物理指向守恒：沿磁场轴线 (Z 轴) 穿透，向外为 +Z，向里为 -Z；
        - 轴向广告牌自动旋转 (Axial Billboard)：始终绕箭柄轴线 (Z 轴) 旋转，正面永远朝向摄像机，彻底避免从水平或垂直角度观察时退化成“一条线”；
     2. 9 个磁场箭头 3×3 均匀阵列，真实反映偏转区匀强磁场；
     3. 视界宽度完全连续：去除多余嵌套圆柱，自阴极向阳极加速聚焦，出阳极孔后平滑延伸至狭缝，穿过狭缝至偏转区始终连续，俯视图无任何“多余大圆柱突然消失”的突兀感；
     4. 左右长度平衡：狭缝挡板置于正中 (x = 0.0)，加速区与偏转区对称协调；
     5. 支架托座位于下半周 (y <= 0) 稳稳托住玻璃管；
     6. 真实金属电极与高压电源标志；
     7. 光束严格终止于玻璃管内壁，绝不穿出外壳；
     8. 纯净教学控件。
-->
<script setup lang="ts">
import * as THREE from "three";
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

const props = withDefaults(
  defineProps<{
    initialState?: "none" | "out" | "in";
  }>(),
  {
    initialState: "none",
  },
);

const mountEl = ref<HTMLDivElement | null>(null);
const state = ref<"none" | "out" | "in">(props.initialState);

// Three.js 核心对象引用
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let animId = 0;

// 固定视角控制（绝无自动旋转）
const defaultAzimuth = 0.58;
const defaultElevation = 0.28;
const defaultDistance = 9.4;
let azimuth = defaultAzimuth;
let elevation = defaultElevation;
let distance = defaultDistance;
let isDragging = false;
let previousPointerX = 0;
let previousPointerY = 0;

// 偏转量平滑过渡
let currentBend = 0;
const targetBend = computed(() => {
  if (state.value === "out") return 0.78; // 洛伦兹力向上（严控幅度，确保不出管壁）
  if (state.value === "in") return -0.78; // 洛伦兹力向下
  return 0; // 无磁场沿轴线直飞
});

// 场景模型句柄
let beamGroup: THREE.Group | null = null;
let vectorsGroup: THREE.Group | null = null;
let labelsGroup: THREE.Group | null = null;
let bFieldGroup: THREE.Group | null = null;

/** 3D 实体圆柱锥体矢量构造 (用于 v 和 F) */
function createVectorMesh(color: number, radius = 0.038, coneRadius = 0.11, coneHeight = 0.35) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.25,
    metalness: 0.75,
    emissive: color,
    emissiveIntensity: 0.2,
  });

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 1, 16), material);
  shaft.name = "shaft";
  shaft.position.y = 0.5;

  const cone = new THREE.Mesh(new THREE.ConeGeometry(coneRadius, coneHeight, 20), material);
  cone.name = "cone";
  cone.position.y = 1;

  group.add(shaft);
  group.add(cone);
  return group;
}

function orientVector(
  vecMesh: THREE.Group,
  start: THREE.Vector3,
  direction: THREE.Vector3,
  length: number,
) {
  vecMesh.position.copy(start);
  const up = new THREE.Vector3(0, 1, 0);
  const dirNorm = direction.clone().normalize();
  vecMesh.quaternion.setFromUnitVectors(up, dirNorm);

  const coneHeight = 0.35;
  const shaftLength = Math.max(0.08, length - coneHeight);
  const shaft = vecMesh.getObjectByName("shaft") as THREE.Mesh;
  const cone = vecMesh.getObjectByName("cone") as THREE.Mesh;

  if (shaft && cone) {
    shaft.scale.set(1, shaftLength, 1);
    shaft.position.y = shaftLength / 2;
    cone.position.y = shaftLength + coneHeight / 2;
  }
}

/**
 * 构造通用二维扁平矢量箭头 (2D Flat Axial Billboard Arrow)
 *
 * - 纯二维扁平结构：扁平细长箭柄 + 顶角严格为 45° 的扁平三角形箭头部
 * - 顶角 45° 几何严谨性： 半顶角 α = 22.5°，tan(22.5°) = √2 - 1 ≈ 0.41421356 三角形高度 H = 0.36，底边半宽 W_half = 0.36 *
 *   tan(22.5°) ≈ 0.1491 顶角 = 2 * atan(0.1491 / 0.36) = 45.0°
 * - 支持颜色配置（如金黄色 B、鲜红色 F 等）
 * - 外层 arrow 组支持在三维空间中定位与定向，并绕自身轴线实时自适应旋转 (Axial Billboard)， 正面始终朝向摄像机，绝不退化为一条线！
 */
function createFlatAxialArrow(fillColor = 0xfbbf24, lineColor = 0xfef08a, fillOpacity = 0.85) {
  const group = new THREE.Group();

  // 内部翻转/对齐组：用于沿局部 Z 轴方向朝向
  const inner = new THREE.Group();
  inner.name = "arrowInner";

  const H = 0.36; // 45° 顶角三角形高度
  const halfW = H * (Math.SQRT2 - 1); // 45° 顶角底边半宽 ≈ 0.1491
  const tipZ = 0.56;
  const baseZ = tipZ - H; // 0.20
  const shaftStartZ = -0.56;
  const shaftHalfW = 0.022; // 箭柄半宽 0.022 (总宽 0.044)

  // 1. 二维扁平填充面网格 (在 X-Z 平面，y = 0)
  const positions: number[] = [
    // 箭柄矩形 (4 个顶点)
    -shaftHalfW,
    0,
    shaftStartZ, // 0: 尾左
    shaftHalfW,
    0,
    shaftStartZ, // 1: 尾右
    shaftHalfW,
    0,
    baseZ, // 2: 颈右
    -shaftHalfW,
    0,
    baseZ, // 3: 颈左

    // 箭头部三角形 (3 个顶点)
    0,
    0,
    tipZ, // 4: 顶点 (尖端)
    -halfW,
    0,
    baseZ, // 5: 底角左
    halfW,
    0,
    baseZ, // 6: 底角右
  ];

  const indices: number[] = [0, 3, 2, 0, 2, 1, 4, 5, 6];

  const arrowGeo = new THREE.BufferGeometry();
  arrowGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  arrowGeo.setIndex(indices);
  arrowGeo.computeVertexNormals();

  const arrowMat = new THREE.MeshBasicMaterial({
    color: fillColor,
    transparent: true,
    opacity: fillOpacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
  inner.add(arrowMesh);

  // 2. 边缘高光轮廓线
  const linePoints: number[] = [
    -shaftHalfW,
    0,
    shaftStartZ,
    shaftHalfW,
    0,
    shaftStartZ,
    shaftHalfW,
    0,
    shaftStartZ,
    shaftHalfW,
    0,
    baseZ,
    shaftHalfW,
    0,
    baseZ,
    halfW,
    0,
    baseZ,
    halfW,
    0,
    baseZ,
    0,
    0,
    tipZ,
    0,
    0,
    tipZ,
    -halfW,
    0,
    baseZ,
    -halfW,
    0,
    baseZ,
    -shaftHalfW,
    0,
    baseZ,
    -shaftHalfW,
    0,
    baseZ,
    -shaftHalfW,
    0,
    shaftStartZ,
  ];

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.95,
  });
  const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
  inner.add(lineMesh);

  group.add(inner);
  return group;
}

/** 磁场专用的轴向扁平箭头 */
function createAxialFlatArrow() {
  return createFlatAxialArrow(0xfbbf24, 0xfef08a, 0.82);
}

/** 纯中文 Sprite 文字标牌（3:1 宽高比） */
function createTextSprite(text: string, color: string, bgColor = "rgba(15, 23, 42, 0.88)") {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 100;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 300, 100);
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.roundRect(10, 10, 280, 80, 20);
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.font = 'bold 46px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 150, 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(0.96, 0.32, 1);
  return sprite;
}

/** 专用正圆形 1:1 像素 Sprite 标牌（专为「＋」「－」设计，绝不压扁） */
function createBadgeSprite(text: string, color: string, bgColor = "rgba(15, 23, 42, 0.94)") {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.arc(64, 64, 54, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.font = 'bold 74px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(0.32, 0.32, 1);
  return sprite;
}

/** 初始化 Three.js 场景 */
function initScene() {
  if (!mountEl.value) return;
  const width = mountEl.value.clientWidth || 700;
  const height = mountEl.value.clientHeight || 420;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  updateCameraTransform();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  mountEl.value.innerHTML = "";
  mountEl.value.appendChild(renderer.domElement);

  // 物理光照
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xf1f5f9, 1.8);
  dirLight1.position.set(6, 9, 8);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.0);
  dirLight2.position.set(-6, -4, -6);
  scene.add(dirLight2);

  // 1. 玻璃外壳与底部下托式支架
  buildGlassAndStands();

  // 2. 金属真实质感电极（阴极与加速孔阳极）与高压电源
  buildElectrodesAndPower();

  // 3. 细狭缝挡板 (精确置于正中央 x = 0.0)
  buildSlitBaffle();

  // 4. 连续平滑电子流系统（前后等宽连续，杜绝外圆柱突然消失）
  buildElectronBeamSystem();

  // 5. 轴向对齐扁平磁场阵列 (B 阵列)
  buildMagneticFieldArray();

  // 6. 速度 v、洛伦兹力 F 与中文结构标签
  buildVectorsAndLabels();

  // 启动循环
  animate();
}

/** 1. 建造半透明玻璃管与正确定位在底部的托架支架 */
function buildGlassAndStands() {
  const tubeGroup = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.16,
    roughness: 0.08,
    transmission: 0.85,
    thickness: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // 主圆柱 (半径 1.05, 长度 8.6, 沿 x 轴，以 x = 0 为正中)
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.05, 8.6, 36, 1, true),
    glassMat,
  );
  cylinder.rotation.z = Math.PI / 2;
  tubeGroup.add(cylinder);

  // 左半球封头 (x = -4.3)
  const capLeft = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat,
  );
  capLeft.position.x = -4.3;
  capLeft.rotation.z = Math.PI / 2;
  tubeGroup.add(capLeft);

  // 右半球封头 (x = 4.3)
  const capRight = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat,
  );
  capRight.position.x = 4.3;
  capRight.rotation.z = -Math.PI / 2;
  tubeGroup.add(capRight);

  // 外部底座支架：左右对称位于 x = -2.4 和 x = +2.4
  const standMetal = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.25,
  });
  const standLocations = [-2.4, 2.4];

  standLocations.forEach((xPos) => {
    // 下半圆托架卡箍 (从 y = 0 弯向 y = -1.06 再回到 y = 0，托住下半部)
    const clamp = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.04, 16, 32, Math.PI), standMetal);
    clamp.position.set(xPos, 0, 0);
    clamp.rotation.set(0, Math.PI / 2, Math.PI);
    tubeGroup.add(clamp);

    // 立柱
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.84, 16), standMetal);
    leg.position.set(xPos, -1.48, 0);
    tubeGroup.add(leg);

    // 橡胶防滑底脚垫
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 20), standMetal);
    foot.position.set(xPos, -1.9, 0);
    tubeGroup.add(foot);
  });

  scene!.add(tubeGroup);
}

/** 2. 真实银白不锈钢电极 + 高压电源模块 */
function buildElectrodesAndPower() {
  const electrodeGroup = new THREE.Group();

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d8,
    metalness: 0.95,
    roughness: 0.18,
  });

  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.9,
    roughness: 0.3,
  });

  // —— 阴极 (Cathode): x = -3.2，垂直于轴线的银色圆形金属盘
  const cathode = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.08, 32), steelMat);
  cathode.position.set(-3.2, 0, 0);
  cathode.rotation.z = Math.PI / 2;
  electrodeGroup.add(cathode);

  // 阴极引线向下穿出管底
  const cathodeWire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 16), wireMat);
  cathodeWire.position.set(-3.2, -0.8, 0);
  electrodeGroup.add(cathodeWire);

  // —— 阳极 (Anode): x = -1.6，严格平行共轴！中心为通透加速孔 (外径 0.72, 孔径 0.22)
  const ringShape = new THREE.Shape();
  ringShape.absarc(0, 0, 0.72, 0, Math.PI * 2, false);
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, 0.22, 0, Math.PI * 2, true);
  ringShape.holes.push(holePath);

  const anodeGeo = new THREE.ExtrudeGeometry(ringShape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015,
  });
  anodeGeo.center();
  const anode = new THREE.Mesh(anodeGeo, steelMat);
  anode.position.set(-1.6, 0, 0);
  anode.rotation.y = Math.PI / 2;
  electrodeGroup.add(anode);

  // 阳极引线向下穿出管底（连接在阳极环的外圆下边缘 y = -0.72 处，严禁伸入中央通透加速孔！）
  const anodeWire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.88, 16), wireMat);
  anodeWire.position.set(-1.6, -1.16, 0);
  electrodeGroup.add(anodeWire);

  // —— 阴极与阳极下方的高压电源模块 ——
  const powerGroup = new THREE.Group();
  powerGroup.position.set(-2.4, -1.6, 0);

  // 连接水平导线
  const horizWire = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 16), wireMat);
  horizWire.rotation.z = Math.PI / 2;
  powerGroup.add(horizWire);

  // 电池负极板与正极板
  const negPlate = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.28), steelMat);
  negPlate.position.x = -0.12;
  powerGroup.add(negPlate);

  const posPlate = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.52, 0.28), steelMat);
  posPlate.position.x = 0.12;
  powerGroup.add(posPlate);

  // 电源正负极标牌
  const lblNeg = createBadgeSprite("－", "#60a5fa");
  lblNeg.position.set(-0.4, 0, 0);
  powerGroup.add(lblNeg);

  const lblPos = createBadgeSprite("＋", "#f87171");
  lblPos.position.set(0.4, 0, 0);
  powerGroup.add(lblPos);

  const lblPower = createTextSprite("高压电源", "#e2a846");
  lblPower.position.set(0, -0.42, 0);
  lblPower.scale.set(0.84, 0.28, 1);
  powerGroup.add(lblPower);

  electrodeGroup.add(powerGroup);
  scene!.add(electrodeGroup);
}

/** 3. 细狭缝挡板 (精确置于正中央 x = 0.0) */
function buildSlitBaffle() {
  const baffleGroup = new THREE.Group();
  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.85,
    roughness: 0.3,
  });

  // 上下两块挡板，在中心留出宽度 0.08 的水平细狭缝 (Z轴开槽宽度 0.54)
  const topPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.88, 0.88, 0.05, 32, 1, false, 0, Math.PI),
    darkMetal,
  );
  topPlate.rotation.z = Math.PI / 2;
  topPlate.position.y = 0.04;
  baffleGroup.add(topPlate);

  const bottomPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.88, 0.88, 0.05, 32, 1, false, Math.PI, Math.PI),
    darkMetal,
  );
  bottomPlate.rotation.z = Math.PI / 2;
  bottomPlate.position.y = -0.04;
  baffleGroup.add(bottomPlate);

  baffleGroup.position.set(0.0, 0, 0);
  scene!.add(baffleGroup);
}

/** 4. 连续平滑电子流系统： 消除生硬嵌套圆柱！从阴极向阳极自然收拢聚焦，自阳极孔到狭缝前宽度在 Z 轴上严格保持为 0.52， 穿过狭缝后以完全相同的 0.52 宽度平滑展布，俯视角度完全等宽连续！ */
function buildElectronBeamSystem() {
  beamGroup = new THREE.Group();

  const beamGlowMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const softHaloMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.26,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // —— 阶段 A：阴极到阳极聚焦加速段 (x: -3.2 ~ -1.6) ——
  // 从阴极表面自然收拢至阳极孔
  const preGeo = createPreAnodeBeamGeometry();
  const preMesh = new THREE.Mesh(preGeo, beamGlowMat);
  beamGroup.add(preMesh);

  // —— 阶段 B：阳极到狭缝准直段 (x: -1.6 ~ 0.0) ——
  // 宽度严格定为 0.52（与狭缝宽度完全一致！），高度在 Y 轴上从 0.22 逐渐收缩至狭缝高度 0.06
  const midGeo = createPreSlitBeamGeometry();
  const midMesh = new THREE.Mesh(midGeo, beamGlowMat);
  beamGroup.add(midMesh);

  // —— 阶段 C：狭缝后准直扁平薄片光带 (x: 0.0 ~ 4.15) ——
  // 宽度与阶段 B 严密相接为 0.52！俯视图看毫无跳变与缩颈！
  const ribbonGeo = createFlatRibbonGeometry(0, 0.52);
  const ribbonMesh = new THREE.Mesh(ribbonGeo, beamGlowMat);
  ribbonMesh.name = "dynamicRibbon";
  beamGroup.add(ribbonMesh);

  const glowRibbonGeo = createFlatRibbonGeometry(0, 0.64);
  const glowRibbonMesh = new THREE.Mesh(glowRibbonGeo, softHaloMat);
  glowRibbonMesh.name = "glowRibbon";
  beamGroup.add(glowRibbonMesh);

  scene!.add(beamGroup);
}

/** 阴极至阳极孔的收敛加速束 (x: -3.2 ~ -1.6) */
function createPreAnodeBeamGeometry() {
  // 圆锥形聚焦束
  const geo = new THREE.CylinderGeometry(0.2, 0.52, 1.6, 24, 1, true);
  geo.rotateZ(Math.PI / 2);
  geo.translate(-2.4, 0, 0);
  return geo;
}

/** 阳极孔至狭缝入口的等宽过渡束 (x: -1.6 ~ 0.0) */
function createPreSlitBeamGeometry() {
  // 宽度在 Z 轴上严格保持为 0.52！高度在 Y 轴上微收缩 (0.24 -> 0.06)
  const segments = 16;
  const startX = -1.6;
  const endX = 0.0;
  const halfW = 0.26; // 总宽 0.52

  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + t * (endX - startX);
    // 高度微缩
    const halfH = 0.12 * (1 - t * 0.7);

    // 四边形 4 顶点
    positions.push(x, halfH, -halfW);
    positions.push(x, halfH, halfW);
    positions.push(x, -halfH, -halfW);
    positions.push(x, -halfH, halfW);
  }

  for (let i = 0; i < segments; i++) {
    const rA = i * 4;
    const rB = (i + 1) * 4;

    // 顶面
    indices.push(rA, rB, rA + 1, rA + 1, rB, rB + 1);
    // 底面
    indices.push(rA + 2, rA + 3, rB + 2, rA + 3, rB + 3, rB + 2);
    // 侧面
    indices.push(rA, rA + 2, rB, rB, rA + 2, rB + 2);
    indices.push(rA + 1, rB + 1, rA + 3, rB + 1, rB + 3, rA + 3);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/** 动态生成准直扁平长条薄片带几何体 (Flat Ribbon，从 x = 0.0 起始) */
function createFlatRibbonGeometry(bend: number, width = 0.52) {
  const startX = 0.0;
  const maxEndX = 4.15;
  const segments = 40;
  const innerRadius = 0.95;

  const positions: number[] = [];
  const indices: number[] = [];
  const halfW = width / 2;

  let actualCount = 0;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = startX + t * (maxEndX - startX);
    let y = bend * Math.pow(t, 1.85);

    // 严密内壁碰撞检测：一旦碰触内部上/下管壁，直接终止
    let hitWall = false;
    if (Math.abs(y) >= innerRadius) {
      y = Math.sign(y) * innerRadius;
      hitWall = true;
    }

    positions.push(x, y, -halfW);
    positions.push(x, y, 0);
    positions.push(x, y, halfW);
    actualCount++;

    if (hitWall) break;
  }

  // 拼接网格三角面
  for (let i = 0; i < actualCount - 1; i++) {
    const rowA = i * 3;
    const rowB = (i + 1) * 3;

    // 左半片四边形
    indices.push(rowA, rowB, rowA + 1);
    indices.push(rowA + 1, rowB, rowB + 1);

    // 右半片四边形
    indices.push(rowA + 1, rowB + 1, rowA + 2);
    indices.push(rowA + 2, rowB + 1, rowB + 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * 5. 轴向对齐扁平磁场阵列 (Axial Billboard B-Array) 9 个二维扁平半透明箭头均布于偏转区 (3×3 规整阵列)； 顶角精确为 45°，箭尖与箭身随相机绕自身 Z
 *    轴旋转，正面永远朝向摄像机
 */
function buildMagneticFieldArray() {
  bFieldGroup = new THREE.Group();

  // 3×3 均匀磁场阵列 (9 个)，充分体现匀强磁场
  // x 坐标分布在偏转区 1.0, 2.2, 3.4
  // y 坐标分布在 +0.45, 0.0, -0.45
  const positions: { x: number; y: number }[] = [];
  const xCols = [1.0, 2.2, 3.4];
  const yRows = [0.45, 0.0, -0.45];

  xCols.forEach((x) => {
    yRows.forEach((y) => {
      positions.push({ x, y });
    });
  });

  positions.forEach((pos, idx) => {
    const arrow = createAxialFlatArrow();
    arrow.name = `axialArrow_${idx}`;
    arrow.position.set(pos.x, pos.y, 0);
    bFieldGroup!.add(arrow);
  });

  // 磁感应强度 B 字母符号标注
  const labelB = createTextSprite("B", "#f59e0b");
  labelB.name = "labelB_Array";
  labelB.scale.set(0.65, 0.22, 1);
  labelB.position.set(2.2, 1.25, 0);
  bFieldGroup.add(labelB);

  bFieldGroup.visible = false;
  scene!.add(bFieldGroup);
}

/** 6. 速度 v、洛伦兹力 F 与中文结构标签 */
function buildVectorsAndLabels() {
  vectorsGroup = new THREE.Group();
  labelsGroup = new THREE.Group();

  // 速度 v: 亮蓝，位于狭缝出口 (x = 0.08)，水平向右
  const vecV = createVectorMesh(0x38bdf8);
  vecV.name = "vecV";
  vectorsGroup.add(vecV);

  const labelV = createTextSprite("v", "#38bdf8");
  labelV.name = "labelV";
  labelV.scale.set(0.65, 0.22, 1);
  labelsGroup.add(labelV);

  // 洛伦兹力 F: 鲜红高对比色 (二维扁平 45° 顶角 Axial Billboard 箭头)
  const vecF = createFlatAxialArrow(0xef4444, 0xfca5a5, 0.9);
  vecF.name = "vecF";
  vecF.scale.set(1.15, 1.15, 1.15);
  vectorsGroup.add(vecF);

  const labelF = createTextSprite("F", "#ef4444");
  labelF.name = "labelF";
  labelF.scale.set(0.65, 0.22, 1);
  labelsGroup.add(labelF);

  // 部件纯中文标签
  const lblCathode = createTextSprite("阴极", "#cbd5e1");
  lblCathode.position.set(-3.2, 1.75, 0);
  labelsGroup.add(lblCathode);

  const lblAnode = createTextSprite("阳极", "#cbd5e1");
  lblAnode.position.set(-1.6, 1.75, 0);
  labelsGroup.add(lblAnode);

  const lblSlit = createTextSprite("狭缝挡板", "#60a5fa");
  lblSlit.position.set(0.0, 1.75, 0);
  labelsGroup.add(lblSlit);

  scene!.add(vectorsGroup);
  scene!.add(labelsGroup);
  updateVectors();
}

/** 更新扁平磁场箭头 (B) 与洛伦兹力箭头 (F) 绕各自轴线的旋转，使其正面始终朝向摄像机 (Axial Billboard) */
function updateAxialBillboards() {
  if (!camera) return;
  const camPos = camera.position;

  // 1. 更新 9 个磁场 B 箭头 (轴线固定沿 Z 轴)
  if (bFieldGroup && state.value !== "none") {
    const isOut = state.value === "out";
    for (let i = 0; i < 9; i++) {
      const arrow = bFieldGroup.getObjectByName(`axialArrow_${i}`) as THREE.Group;
      if (arrow) {
        const inner = arrow.getObjectByName("arrowInner") as THREE.Group;
        if (inner) {
          inner.rotation.x = isOut ? 0 : Math.PI;
        }

        const ax = arrow.position.x;
        const ay = arrow.position.y;
        const dx = camPos.x - ax;
        const dy = camPos.y - ay;
        const angle = Math.atan2(dy, dx);
        arrow.rotation.z = angle - Math.PI / 2;
      }
    }
  }

  // 2. 更新洛伦兹力 F 箭头 (轴线固定沿 Y 轴，在 X-Z 平面自适应旋转使其正面永远朝向相机)
  if (vectorsGroup) {
    const vecF = vectorsGroup.getObjectByName("vecF") as THREE.Group;
    if (vecF && vecF.visible) {
      const isOut = state.value === "out";
      const inner = vecF.getObjectByName("arrowInner") as THREE.Group;
      if (inner) {
        // inner 默认 tip 在 +Z，我们需要其尖端指向 +Y (向上) 或 -Y (向下)
        // 旋转 inner 绕 X 轴：-Math.PI / 2 使 tip 指向 +Y；+Math.PI / 2 使 tip 指向 -Y
        inner.rotation.x = isOut ? -Math.PI / 2 : Math.PI / 2;
      }

      // 箭柄轴线沿 Y 轴：计算相机相对箭头位置在 X-Z 平面的方位角
      const fx = vecF.position.x;
      const fz = vecF.position.z;
      const dx = camPos.x - fx;
      const dz = camPos.z - fz;
      const angle = Math.atan2(dx, dz);
      // 让 vecF 绕 Y 轴旋转，正面 (法线) 精准朝向相机
      vecF.rotation.y = angle;
    }
  }
}

/** 动态更新矢量与磁场阵列 */
function updateVectors() {
  if (!vectorsGroup || !labelsGroup || !bFieldGroup) return;

  const vecV = vectorsGroup.getObjectByName("vecV") as THREE.Group;
  const vecF = vectorsGroup.getObjectByName("vecF") as THREE.Group;
  const labelV = labelsGroup.getObjectByName("labelV") as THREE.Sprite;
  const labelF = labelsGroup.getObjectByName("labelF") as THREE.Sprite;

  if (!vecV || !vecF || !labelV || !labelF) return;

  // 速度 v：位于狭缝出口处 (x = 0.08)，水平指向右侧 (+x)
  orientVector(vecV, new THREE.Vector3(0.08, 0, 0), new THREE.Vector3(1, 0, 0), 1.25);
  labelV.position.set(0.72, 0.35, 0);

  // 磁场阵列 (B) 控制
  if (state.value === "none") {
    bFieldGroup.visible = false;
    vecF.visible = false;
    labelF.visible = false;
  } else {
    bFieldGroup.visible = true;
    const isOut = state.value === "out";

    // 洛伦兹力 F：电子带负电，B 向外时受力向上(+y)，B 向里时受力向下(-y)
    // 采用红色二维扁平 45° Axial Billboard 箭头
    const fCenterY = isOut ? 0.32 : -0.32;
    vecF.position.set(2.0, fCenterY, 0);
    vecF.visible = Math.abs(currentBend) > 0.05;
    labelF.visible = Math.abs(currentBend) > 0.05;
    labelF.position.set(2.0, isOut ? 1.45 : -1.45, 0);

    updateAxialBillboards();
  }
}

/** 动画渲染循环 */
function animate() {
  animId = requestAnimationFrame(animate);

  const diff = targetBend.value - currentBend;
  if (Math.abs(diff) > 0.004) {
    currentBend += diff * 0.12;

    if (beamGroup) {
      const dynamicRibbon = beamGroup.getObjectByName("dynamicRibbon") as THREE.Mesh;
      const glowRibbon = beamGroup.getObjectByName("glowRibbon") as THREE.Mesh;
      if (dynamicRibbon && glowRibbon) {
        dynamicRibbon.geometry.dispose();
        dynamicRibbon.geometry = createFlatRibbonGeometry(currentBend, 0.52);

        glowRibbon.geometry.dispose();
        glowRibbon.geometry = createFlatRibbonGeometry(currentBend, 0.64);
      }
    }
    updateVectors();
  }

  // 无论是否偏转，每帧更新轴向对齐广告牌，跟随相机视角平滑转动
  updateAxialBillboards();

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function updateCameraTransform() {
  if (!camera) return;
  const x = distance * Math.cos(elevation) * Math.sin(azimuth);
  const y = distance * Math.sin(elevation);
  const z = distance * Math.cos(elevation) * Math.cos(azimuth);
  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);
  updateAxialBillboards();
}

// 自由触摸/鼠标交互事件
function onPointerDown(e: PointerEvent) {
  isDragging = true;
  previousPointerX = e.clientX;
  previousPointerY = e.clientY;
  if (mountEl.value) mountEl.value.style.cursor = "grabbing";
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const deltaX = e.clientX - previousPointerX;
  const deltaY = e.clientY - previousPointerY;
  previousPointerX = e.clientX;
  previousPointerY = e.clientY;

  azimuth -= deltaX * 0.008;
  elevation = Math.max(-0.4, Math.min(1.2, elevation + deltaY * 0.008));
  updateCameraTransform();
}

function onPointerUp() {
  isDragging = false;
  if (mountEl.value) mountEl.value.style.cursor = "grab";
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  distance = Math.max(5.5, Math.min(15.0, distance + e.deltaY * 0.008));
  updateCameraTransform();
}

function resetView() {
  azimuth = defaultAzimuth;
  elevation = defaultElevation;
  distance = defaultDistance;
  updateCameraTransform();
}

function handleResize() {
  if (!mountEl.value || !renderer || !camera) return;
  const width = mountEl.value.clientWidth;
  const height = mountEl.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  updateAxialBillboards();
}

watch(state, () => {
  updateVectors();
});

onMounted(() => {
  initScene();
  window.addEventListener("resize", handleResize);
  const el = mountEl.value;
  if (el) {
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("dblclick", resetView);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animId);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

<template>
  <div
    class="flex flex-col w-full h-full min-h-[460px] bg-slate-950/80 rounded-2xl border border-slate-800 p-4"
  >
    <!-- 纯粹控件栏 -->
    <div class="flex items-center justify-between pb-3 border-b border-slate-800">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-300">阴极射线管模型</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="state = 'none'"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border',
            state === 'none'
              ? 'bg-slate-800 text-amber-400 border-amber-400/70 shadow-sm'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200',
          ]"
        >
          无磁场
        </button>
        <button
          type="button"
          @click="state = 'out'"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border',
            state === 'out'
              ? 'bg-amber-400/15 text-amber-300 border-amber-400 shadow-sm'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200',
          ]"
        >
          B ⊙ 向外
        </button>
        <button
          type="button"
          @click="state = 'in'"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border',
            state === 'in'
              ? 'bg-sky-400/15 text-sky-300 border-sky-400 shadow-sm'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200',
          ]"
        >
          B ⊗ 向里
        </button>
        <button
          type="button"
          @click="resetView"
          title="复位视角"
          class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
        >
          复位视角
        </button>
      </div>
    </div>

    <!-- 3D 画布区域 -->
    <div
      ref="mountEl"
      class="relative flex-1 w-full min-h-[400px] mt-3 rounded-xl overflow-hidden cursor-grab bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"
    />
  </div>
</template>

<style scoped>
/* 触控防抖 */
</style>
