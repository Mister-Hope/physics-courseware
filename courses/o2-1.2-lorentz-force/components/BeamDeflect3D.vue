<!--
  阴极射线管高精度 3D 实体模型 (CathodeRayTube3D.vue)
  —— 严格遵循真实物理实验构造：
     1. 完美视觉平衡：狭缝挡板严格置于中央 (x = 0.0)，左侧加速区 (阴极-阳极-挡板，长 3.2) 与右侧偏转区 (长 4.0) 比例匀称平衡，管径均匀无失真；
     2. 磁场矢量阵列 (B)：选择磁场方向后，偏转区均布 6 个匀强磁场矢量；箭尖采用半透明琥珀金三角形 Sprite，正面始终朝向摄像头；
     3. 狭缝扁平长条电子束 (Ribbon)：自狭缝喷射出的真实薄片带状发光束流，整个薄长条在磁场中平滑向上/向下整体弯曲；
     4. 支架卡箍修正：下半圆托座 (y <= 0) 从底部稳稳托住玻璃管；
     5. 真实金属电极与高压电源：银灰拉丝不锈钢电极，正负极 1:1 圆形徽标绝不压扁；
     6. 严格内壁碰撞截断，绝不穿出玻璃管外壁；
     7. 纯净教学控件：仅保留无磁场 / B ⊙ 向外 / B ⊗ 向里 / 复位视角。
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

/** 构造半透明三角形箭头 Sprite (正面始终朝向摄像头) 用于磁场 B 的多个箭头尖部 */
function createTriangleArrowSprite(pointingUp = true) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, 128, 128);

  // 半透明琥珀金填充 + 亮金描边
  ctx.fillStyle = "rgba(245, 158, 11, 0.68)";
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";

  ctx.beginPath();
  if (pointingUp) {
    ctx.moveTo(64, 18);
    ctx.lineTo(110, 102);
    ctx.lineTo(18, 102);
  } else {
    ctx.moveTo(64, 110);
    ctx.lineTo(110, 26);
    ctx.lineTo(18, 26);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const mat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    opacity: 0.9,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(0.34, 0.34, 1);
  return sprite;
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
  sprite.scale.set(0.96, 0.32, 1); // 严格保持 3:1 比例
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
  sprite.scale.set(0.32, 0.32, 1); // 严格 1:1 正圆形比例
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

  // 1. 玻璃外壳与对称底部支架
  buildGlassAndStands();

  // 2. 金属真实质感电极（阴极与加速孔阳极）与高压电源
  buildElectrodesAndPower();

  // 3. 细狭缝挡板 (置于正中 x = 0.0)
  buildSlitBaffle();

  // 4. 电子雾状云与准直扁平薄片光带 (Ribbon)
  buildElectronBeamSystem();

  // 5. 多个磁场矢量的匀强磁场阵列 (B 阵列)
  buildMagneticFieldArray();

  // 6. 速度 v、洛伦兹力 F 与中文结构标签
  buildVectorsAndLabels();

  // 启动循环
  animate();
}

/** 1. 建造半透明玻璃管与正确定位在底部的托架支架（两侧完全对称） */
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
    clamp.rotation.set(0, Math.PI / 2, Math.PI); // 翻转至下半圆
    tubeGroup.add(clamp);

    // 立柱：上顶面正好在 y = -1.06 (与托架最低点无缝承接)，立柱高度 0.84，底面在 y = -1.9
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

/** 2. 真实银白不锈钢电极 + 高压电源模块（左侧加速区） */
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

  // 阳极引线向下穿出管底
  const anodeWire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 16), wireMat);
  anodeWire.position.set(-1.6, -0.8, 0);
  electrodeGroup.add(anodeWire);

  // —— 阴极与阳极下方的高压电源模块 (位于 x = -2.4 正中央) ——
  const powerGroup = new THREE.Group();
  powerGroup.position.set(-2.4, -1.6, 0);

  // 连接水平导线 (长 1.6)
  const horizWire = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 16), wireMat);
  horizWire.rotation.z = Math.PI / 2;
  powerGroup.add(horizWire);

  // 电池负极板 (厚且短，在阴极侧 x = -0.12)
  const negPlate = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.28, 0.28), steelMat);
  negPlate.position.x = -0.12;
  powerGroup.add(negPlate);

  // 电池正极板 (薄且长，在阳极侧 x = 0.12)
  const posPlate = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.52, 0.28), steelMat);
  posPlate.position.x = 0.12;
  powerGroup.add(posPlate);

  // 电源正负极标牌（1:1 正圆形徽章，绝不压扁）
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

/** 3. 细狭缝挡板 (精确置于正中央 x = 0.0，使左右两侧长度完全平衡) */
function buildSlitBaffle() {
  const baffleGroup = new THREE.Group();
  const darkMetal = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.85,
    roughness: 0.3,
  });

  // 上下两块挡板，在中心留出只有 0.08 宽度的水平细狭缝
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

/** 4. 电子系统：前段雾状弥散云 (x: -3.2 ~ 0) + 狭缝后准直扁平长条薄片光带 (x: 0 ~ 4.1) */
function buildElectronBeamSystem() {
  beamGroup = new THREE.Group();

  // —— 狭缝前全截面弥散柔和雾状电子云 (x: -3.2 ~ 0.0，长度 3.2) ——
  const fogGeo1 = new THREE.CylinderGeometry(0.48, 0.62, 3.2, 32, 1, true);
  const fogMat1 = new THREE.MeshBasicMaterial({
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const fog1 = new THREE.Mesh(fogGeo1, fogMat1);
  fog1.position.set(-1.6, 0, 0);
  fog1.rotation.z = Math.PI / 2;
  beamGroup.add(fog1);

  const fogGeo2 = new THREE.CylinderGeometry(0.24, 0.38, 3.2, 32, 1, true);
  const fogMat2 = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.26,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const fog2 = new THREE.Mesh(fogGeo2, fogMat2);
  fog2.position.set(-1.6, 0, 0);
  fog2.rotation.z = Math.PI / 2;
  beamGroup.add(fog2);

  // —— 狭缝后准直扁平长条薄片光带 (x: 0.0 ~ 4.1，长度 4.1，与前段长度完全平衡) ——
  // 核心发光薄片带 (宽度 0.52，沿 Z 轴分布，厚度极薄)
  const ribbonGeo = createFlatRibbonGeometry(0, 0.52);
  const ribbonMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
  ribbonMesh.name = "dynamicRibbon";
  beamGroup.add(ribbonMesh);

  // 扁平长条光带的柔和外晕薄片 (稍宽 0.64)
  const glowRibbonGeo = createFlatRibbonGeometry(0, 0.64);
  const glowRibbonMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const glowRibbonMesh = new THREE.Mesh(glowRibbonGeo, glowRibbonMat);
  glowRibbonMesh.name = "glowRibbon";
  beamGroup.add(glowRibbonMesh);

  scene!.add(beamGroup);
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

/** 5. 多个磁场矢量的匀强磁场阵列 (B 阵列) 在偏转区均布 6 个磁场矢量 (2 行 × 3 列) 箭头尖部采用半透明三角形 Sprite，正面始终朝向摄像头 */
function buildMagneticFieldArray() {
  bFieldGroup = new THREE.Group();

  // 6 个磁场箭头的空间坐标 (x: 0.8, 2.0, 3.2；y: +0.45, -0.45)
  const positions = [
    { x: 0.8, y: 0.45 },
    { x: 2.0, y: 0.45 },
    { x: 3.2, y: 0.45 },
    { x: 0.8, y: -0.45 },
    { x: 2.0, y: -0.45 },
    { x: 3.2, y: -0.45 },
  ];

  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.72,
    roughness: 0.3,
    metalness: 0.7,
  });

  positions.forEach((pos, idx) => {
    const arrowGroup = new THREE.Group();
    arrowGroup.name = `bArrow_${idx}`;
    arrowGroup.position.set(pos.x, pos.y, 0);

    // 细圆柱箭杆 (沿 Z 轴穿透，长度 1.3)
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.3, 16), shaftMat);
    shaft.name = "shaft";
    shaft.rotation.x = Math.PI / 2; // 沿 z 轴
    arrowGroup.add(shaft);

    // 半透明三角形箭头 Sprite (正面始终朝向摄像头！)
    const tipSprite = createTriangleArrowSprite(true);
    tipSprite.name = "tipSprite";
    tipSprite.position.set(0, 0, 0.72); // 位于朝向观察者的近端
    arrowGroup.add(tipSprite);

    bFieldGroup!.add(arrowGroup);
  });

  // 磁感应强度 B 字母符号标注 (位于阵列上方中央)
  const labelB = createTextSprite("B", "#f59e0b");
  labelB.name = "labelB_Array";
  labelB.scale.set(0.65, 0.22, 1);
  labelB.position.set(2.0, 1.25, 0);
  bFieldGroup.add(labelB);

  bFieldGroup.visible = false;
  scene!.add(bFieldGroup);
}

/** 6. 速度 v、洛伦兹力 F 与中文结构标签 */
function buildVectorsAndLabels() {
  vectorsGroup = new THREE.Group();
  labelsGroup = new THREE.Group();

  // 速度 v: 亮蓝，位于狭缝出口 (x = 0.15)，水平向右
  const vecV = createVectorMesh(0x38bdf8);
  vecV.name = "vecV";
  vectorsGroup.add(vecV);

  const labelV = createTextSprite("v", "#38bdf8");
  labelV.name = "labelV";
  labelV.scale.set(0.65, 0.22, 1);
  labelsGroup.add(labelV);

  // 洛伦兹力 F: 青碧绿，位于偏转区弧段
  const vecF = createVectorMesh(0x2dd4bf);
  vecF.name = "vecF";
  vectorsGroup.add(vecF);

  const labelF = createTextSprite("F", "#2dd4bf");
  labelF.name = "labelF";
  labelF.scale.set(0.65, 0.22, 1);
  labelsGroup.add(labelF);

  // 部件纯中文标签（位于上方一行，严格对称间距：-3.2, -1.6, 0.0）
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

/** 动态更新矢量与磁场阵列 */
function updateVectors() {
  if (!vectorsGroup || !labelsGroup || !bFieldGroup) return;

  const vecV = vectorsGroup.getObjectByName("vecV") as THREE.Group;
  const vecF = vectorsGroup.getObjectByName("vecF") as THREE.Group;
  const labelV = labelsGroup.getObjectByName("labelV") as THREE.Sprite;
  const labelF = labelsGroup.getObjectByName("labelF") as THREE.Sprite;

  if (!vecV || !vecF || !labelV || !labelF) return;

  // 速度 v：位于狭缝出口处 (x = 0.1)，水平指向右侧 (+x)
  orientVector(vecV, new THREE.Vector3(0.08, 0, 0), new THREE.Vector3(1, 0, 0), 1.25);
  labelV.position.set(0.72, 0.35, 0);

  // 磁场阵列 (B) 控制：无磁场时隐藏，有磁场时点亮 6 个矢量
  if (state.value === "none") {
    bFieldGroup.visible = false;
    vecF.visible = false;
    labelF.visible = false;
  } else {
    bFieldGroup.visible = true;
    const isOut = state.value === "out";

    // 更新 6 个磁场箭头的尖部位置与朝向
    for (let i = 0; i < 6; i++) {
      const arrowGroup = bFieldGroup.getObjectByName(`bArrow_${i}`) as THREE.Group;
      if (arrowGroup) {
        const tip = arrowGroup.getObjectByName("tipSprite") as THREE.Sprite;
        if (tip) {
          // B 向外：三角形在近端 (z = +0.72)；B 向里：三角形在远端 (z = -0.72)
          tip.position.set(0, 0, isOut ? 0.72 : -0.72);
        }
      }
    }

    // 洛伦兹力 F：电子带负电，B 向外时受力向上(+y)，B 向里时受力向下(-y)
    const fDir = isOut ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, -1, 0);
    const fCenterY = isOut ? 0.32 : -0.32;
    vecF.visible = Math.abs(currentBend) > 0.05;
    labelF.visible = Math.abs(currentBend) > 0.05;
    orientVector(vecF, new THREE.Vector3(2.0, fCenterY, 0), fDir, 1.25);
    labelF.position.set(2.0, isOut ? 1.85 : -1.85, 0);
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
    <!-- 纯粹控件栏：无任何额外宣传词或冗余提示 -->
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
