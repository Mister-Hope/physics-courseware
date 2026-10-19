<!--
  第 13 页：两个点电荷周围电场线的**三维分布**（立体版电场线图）。
  —— 物理：电场线由真实合成场强数值积分得到：E(P) = Σ k·qᵢ/rᵢ² · r̂ᵢ（几何量取 +Q / −Q 等量异号），
     沿 E 方向逐步推进（中点法），从正电荷出发、终止于负电荷或飞向远处；
     场线上每一点的切线方向就是该点的电场强度方向（教材 9.3 行 273）。
  —— 本页是定性页：屏幕上不出现任何数值，也不出现公式。
  —— 交互：拖动旋转（不抢滚轮 / 翻页），未拖动时缓慢自转；不做等势面（§10.2 内容）。
-->
<script setup lang="ts">
import {
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  ConeGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const { autoRotate = true, showArrows = false } = defineProps<{
  /** 是否缓慢自转（拖动时暂停） */
  autoRotate?: boolean;
  /** 第 1 击后才出现的场线方向箭头 */
  showArrows?: boolean;
}>();

const mountEl = ref<HTMLDivElement | null>(null);

// ── 物理：两个等量异号点电荷 ────────────────────────────────
const CHARGES = [
  { q: 1, pos: new Vector3(-1.55, 0, 0) },
  { q: -1, pos: new Vector3(1.55, 0, 0) },
];
const BOUND = 3.1; // 追踪边界（超出即停止，避免无意义的长线）
const STEP = 0.05;

const tmpA = new Vector3();
const tmpB = new Vector3();

/** 合成场强方向（只关心方向，电荷量取 ±1；与电荷重合处做最小距离保护） */
function fieldAt(p: Vector3, out: Vector3): Vector3 {
  out.set(0, 0, 0);
  for (const charge of CHARGES) {
    tmpA.subVectors(p, charge.pos);
    const r = Math.max(0.16, tmpA.length());
    out.addScaledVector(tmpA, charge.q / (r * r * r));
  }
  return out;
}

/** 从正电荷出发、沿场线推进（中点法），直到落到负电荷或飞出边界 */
function traceLine(dir: Vector3): Vector3[] {
  const points: Vector3[] = [];
  const p = CHARGES[0].pos.clone().addScaledVector(dir, 0.3);
  const k1 = new Vector3();
  const k2 = new Vector3();

  for (let i = 0; i < 900; i += 1) {
    points.push(p.clone());
    fieldAt(p, k1).normalize();
    tmpB.copy(p).addScaledVector(k1, STEP / 2);
    fieldAt(tmpB, k2).normalize();
    p.addScaledVector(k2, STEP);
    if (p.length() > BOUND) break;
    if (p.distanceTo(CHARGES[1].pos) < 0.22) {
      points.push(CHARGES[1].pos.clone());
      break;
    }
  }
  return points;
}

/** 均匀分布在球面上的种子方向（斐波那契球） */
function sphereSeeds(count: number): Vector3[] {
  const seeds: Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (2 * i) / (count - 1);
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    seeds.push(new Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).normalize());
  }
  return seeds;
}
const SEEDS = sphereSeeds(72);
const LINES = SEEDS.map(traceLine);

// ── 主题色（与课件设计系统一致；取不到时用回退色）──────────
function cssColor(name: string, fallback: string): number {
  if (typeof window === "undefined") return Number.parseInt(fallback.slice(1), 16);
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = value.startsWith("#") ? value : fallback;
  return Number.parseInt(hex.slice(1), 16);
}

// ── three.js 场景 ──────────────────────────────────────────
let renderer: WebGLRenderer | null = null;
let scene: Scene | null = null;
let camera: PerspectiveCamera | null = null;
let arrowGroup: Group | null = null;
let animId = 0;
let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;
let visible = true;

const DISTANCE = 9.4;
let azimuth = 0.62;
let elevation = 0.34;
const dragging = ref(false);
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let appliedPixelRatio = 0;
const MAX_PIXEL_RATIO = 3;

/** 画布容器在幻灯片里的有效缩放（Slidev 会给整页 transform: scale，需按比例提高光栅化像素比） */
const getElementScale = (el: HTMLElement): number => {
  const layoutWidth = el.clientWidth;
  if (!layoutWidth) return 1;
  return el.getBoundingClientRect().width / layoutWidth;
};

const syncRendererScale = (force = false): void => {
  const el = mountEl.value;
  if (!el || !renderer) return;
  const ratio = Math.max(
    1,
    Math.min(window.devicePixelRatio * getElementScale(el), MAX_PIXEL_RATIO),
  );
  const changed = Math.abs(ratio - appliedPixelRatio) >= 0.01;
  if (changed) {
    appliedPixelRatio = ratio;
    renderer.setPixelRatio(ratio);
  }
  if (changed || force) renderer.setSize(el.clientWidth || 880, el.clientHeight || 320, false);
};

const updateCamera = (): void => {
  if (!camera) return;
  const cosE = Math.cos(elevation);
  camera.position.set(
    DISTANCE * cosE * Math.sin(azimuth),
    DISTANCE * Math.sin(elevation),
    DISTANCE * cosE * Math.cos(azimuth),
  );
  camera.lookAt(0, 0, 0);
};

function buildFieldLines(colors: { field: number; plus: number; minus: number }): Group {
  const group = new Group();

  // 场线：所有曲线合并成一份 LineSegments（一次绘制，帧率稳）
  const positions: number[] = [];
  for (const points of LINES) {
    for (let i = 1; i < points.length; i += 1) {
      positions.push(
        points[i - 1].x,
        points[i - 1].y,
        points[i - 1].z,
        points[i].x,
        points[i].y,
        points[i].z,
      );
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  group.add(
    new LineSegments(
      geometry,
      new LineBasicMaterial({ color: colors.field, transparent: true, opacity: 0.75 }),
    ),
  );

  // 方向箭头：每隔一条场线放两个小圆锥，锥尖指向该点的场强方向
  arrowGroup = new Group();
  const coneGeometry = new ConeGeometry(0.05, 0.15, 8);
  const coneMaterial = new MeshStandardMaterial({
    color: colors.field,
    emissive: colors.field,
    emissiveIntensity: 0.45,
  });
  const up = new Vector3(0, 1, 0);
  const dir = new Vector3();

  LINES.forEach((points, lineIndex) => {
    if (lineIndex % 2 !== 0) return;
    for (const ratio of [0.34, 0.64]) {
      const index = Math.round((points.length - 1) * ratio);
      if (index < 1 || index >= points.length) continue;
      dir.subVectors(points[index], points[index - 1]).normalize();
      const cone = new Mesh(coneGeometry, coneMaterial);
      cone.position.copy(points[index]);
      cone.quaternion.setFromUnitVectors(up, dir);
      arrowGroup?.add(cone);
    }
  });
  arrowGroup.visible = showArrows;
  group.add(arrowGroup);

  return group;
}

function buildCharges(colors: { plus: number; minus: number }): Group {
  const group = new Group();
  const geometry = new SphereGeometry(0.3, 32, 32);

  for (const [index, charge] of CHARGES.entries()) {
    const color = charge.q > 0 ? colors.plus : colors.minus;
    const mesh = new Mesh(
      geometry,
      new MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.35,
        roughness: 0.35,
      }),
    );
    mesh.position.copy(charge.pos);
    group.add(mesh);

    // 电荷标签：画在 canvas 上的 "+Q" / "−Q"，做成 Sprite（内容只标电荷量与正负）
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 80;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
      ctx.font = "600 46px KaTeX_Main, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(index === 0 ? "+Q" : "−Q", canvas.width / 2, canvas.height / 2);
    }
    const texture = new CanvasTexture(canvas);
    const sprite = new Sprite(
      new SpriteMaterial({ map: texture, transparent: true, depthWrite: false }),
    );
    sprite.scale.set(0.9, 0.45, 1);
    sprite.position.set(charge.pos.x, charge.pos.y - 0.62, charge.pos.z);
    group.add(sprite);
  }

  return group;
}

function initScene(): void {
  const el = mountEl.value;
  if (!el) return;

  try {
    scene = new Scene();
    camera = new PerspectiveCamera(
      40,
      (el.clientWidth || 880) / (el.clientHeight || 320),
      0.1,
      100,
    );
    updateCamera();

    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    syncRendererScale(true);
    el.innerHTML = "";
    el.append(renderer.domElement);

    const colors = {
      field: cssColor("--c-field", "#7dd3fc"),
      plus: cssColor("--c-danger", "#f87171"),
      minus: cssColor("--c-velocity", "#60a5fa"),
    };

    scene.add(new AmbientLight(0xffffff, 1.1));
    const lightA = new DirectionalLight(0xffffff, 1.5);
    lightA.position.set(5, 7, 6);
    scene.add(lightA);
    const lightB = new DirectionalLight(0x93c5fd, 0.8);
    lightB.position.set(-6, -4, -5);
    scene.add(lightB);

    scene.add(buildFieldLines(colors));
    scene.add(buildCharges(colors));

    animate();
  } catch {
    // WebGL 不可用（极少数环境）：静默降级，不占用版面、不报错
    renderer = null;
  }
}

function animate(): void {
  animId = requestAnimationFrame(animate);
  if (!visible || !renderer || !scene || !camera) return;

  const now = performance.now();
  const delta = Math.min(0.05, (now - lastTime) / 1000 || 0);
  lastTime = now;

  if (autoRotate && !dragging.value) azimuth += delta * 0.16;
  updateCamera();
  renderer.render(scene, camera);
}

const handleResize = (): void => {
  const el = mountEl.value;
  if (!el || !camera) return;
  camera.aspect = (el.clientWidth || 880) / (el.clientHeight || 320);
  camera.updateProjectionMatrix();
  syncRendererScale(true);
};

function onPointerDown(event: PointerEvent): void {
  dragging.value = true;
  lastX = event.clientX;
  lastY = event.clientY;
  (event.target as Element).setPointerCapture?.(event.pointerId);
}
function onPointerMove(event: PointerEvent): void {
  if (!dragging.value) return;
  azimuth -= (event.clientX - lastX) * 0.008;
  elevation = Math.min(1.15, Math.max(-1.15, elevation + (event.clientY - lastY) * 0.006));
  lastX = event.clientX;
  lastY = event.clientY;
}
function onPointerUp(event: PointerEvent): void {
  dragging.value = false;
  (event.target as Element).releasePointerCapture?.(event.pointerId);
}

watch(
  () => showArrows,
  (value) => {
    if (arrowGroup) arrowGroup.visible = value;
  },
);

onMounted(() => {
  initScene();
  const el = mountEl.value;
  globalThis.addEventListener("resize", handleResize);
  if (el && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(el);
  }
  // 幻灯片不在视口内时停画，省电也不抢 GPU
  if (el && typeof IntersectionObserver !== "undefined") {
    intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
    });
    intersectionObserver.observe(el);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animId);
  globalThis.removeEventListener("resize", handleResize);
  resizeObserver?.disconnect();
  resizeObserver = null;
  intersectionObserver?.disconnect();
  intersectionObserver = null;
  scene?.traverse((object) => {
    const mesh = object as Mesh;
    mesh.geometry?.dispose?.();
    const material = mesh.material as MeshStandardMaterial | MeshStandardMaterial[] | undefined;
    if (Array.isArray(material)) material.forEach((item) => item.dispose());
    else material?.dispose?.();
  });
  renderer?.dispose();
  renderer = null;
  scene = null;
  camera = null;
  arrowGroup = null;
});
</script>

<template>
  <div
    ref="mountEl"
    class="fl3d"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  />
</template>

<style scoped>
.fl3d {
  overflow: hidden;

  width: 100%;
  height: 312px;

  cursor: grab;
  touch-action: none;
}

.fl3d :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
