<!--
  第 7 页：立体交流发电机。磁极上下放置，磁场竖直向下；线圈绕水平轴 OO′ 转动，
  A、D 两端经滑环 K、L 和电刷 E、F 接外电路 R。
  线圈持续逆时针转动；`showCurrent` 时在外电路标出电流方向，经过中性面时换向。
-->
<template>
  <svg
    viewBox="0 0 900 420"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="立体交流发电机：磁极上下放置，线圈绕水平轴转动，经滑环、电刷接外电路"
  >
    <defs>
      <linearGradient id="ac31-gen-n" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-danger)" stop-opacity="0.34" />
        <stop offset="100%" stop-color="var(--c-danger)" stop-opacity="0.12" />
      </linearGradient>
      <linearGradient id="ac31-gen-s" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="var(--c-accent-2)" stop-opacity="0.34" />
        <stop offset="100%" stop-color="var(--c-accent-2)" stop-opacity="0.12" />
      </linearGradient>
      <linearGradient id="ac31-gen-coil" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.16" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0.02" />
      </linearGradient>
    </defs>

    <polygon
      :points="nTop"
      fill="var(--c-danger)"
      fill-opacity="0.2"
      stroke="var(--c-danger)"
      stroke-opacity="0.45"
      stroke-width="1"
    />
    <polygon
      :points="nFront"
      fill="url(#ac31-gen-n)"
      stroke="var(--c-danger)"
      stroke-opacity="0.55"
      stroke-width="1.2"
    />
    <polygon
      :points="sBottom"
      fill="var(--c-accent-2)"
      fill-opacity="0.2"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.45"
      stroke-width="1"
    />
    <polygon
      :points="sFront"
      fill="url(#ac31-gen-s)"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.55"
      stroke-width="1.2"
    />

    <text
      :x="nLabel.x"
      :y="nLabel.y"
      fill="var(--c-danger)"
      font-size="26"
      font-weight="700"
      text-anchor="middle"
    >
      N
    </text>
    <text
      :x="sLabel.x"
      :y="sLabel.y"
      fill="var(--c-accent-2)"
      font-size="26"
      font-weight="700"
      text-anchor="middle"
    >
      S
    </text>

    <CourseArrow
      v-for="(arrow, index) in fieldArrows"
      :key="`field-${index}`"
      :from="arrow.from"
      :to="arrow.to"
      stroke="var(--c-text-dim)"
      stroke-width="1.3"
      stroke-dasharray="7 5"
    />
    <text
      :x="fieldLabel.x"
      :y="fieldLabel.y"
      fill="var(--c-text-dim)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="14"
    >
      B
    </text>

    <line
      :x1="axisStart.x"
      :y1="axisStart.y"
      :x2="axisEnd.x"
      :y2="axisEnd.y"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-dasharray="6 5"
      opacity="0.75"
    />
    <text
      :x="axisStart.x"
      :y="axisStart.y + 20"
      fill="var(--c-text-dim)"
      font-size="12"
      text-anchor="middle"
    >
      O
    </text>
    <text
      :x="axisEnd.x"
      :y="axisEnd.y - 10"
      fill="var(--c-text-dim)"
      font-size="12"
      text-anchor="middle"
    >
      O′
    </text>

    <ellipse
      :cx="ringK.x"
      :cy="ringK.y"
      :rx="ringR"
      :ry="ringR * SY"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="4"
      opacity="0.9"
    />
    <ellipse
      :cx="ringL.x"
      :cy="ringL.y"
      :rx="ringR"
      :ry="ringR * SY"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="4"
      opacity="0.65"
    />
    <text :x="ringK.x + 26" :y="ringK.y + 4" fill="var(--c-accent)" font-size="12">K</text>
    <text :x="ringL.x + 26" :y="ringL.y + 4" fill="var(--c-accent)" font-size="12" opacity="0.75">
      L
    </text>

    <polygon :points="planePoints" fill="none" />
    <polygon
      :points="innerPlanePoints"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.4"
      opacity="0.5"
    />
    <polyline
      :points="wirePoints"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <line
      :x1="coil.pa.x"
      :y1="coil.pa.y"
      :x2="leadA.x"
      :y2="leadA.y"
      stroke="var(--c-accent)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <line
      :x1="coil.pd.x"
      :y1="coil.pd.y"
      :x2="leadD.x"
      :y2="leadD.y"
      stroke="var(--c-accent)"
      stroke-width="2.4"
      stroke-linecap="round"
      opacity="0.8"
    />

    <g v-if="showLabels">
      <text
        v-for="label in cornerLabels"
        :key="label.text"
        :x="label.x"
        :y="label.y"
        fill="var(--c-text)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        text-anchor="middle"
        paint-order="stroke"
        stroke="var(--c-bg)"
        stroke-width="4"
      >
        {{ label.text }}
      </text>
    </g>

    <rect
      :x="brushE.x - 6"
      :y="brushE.y - 4"
      width="12"
      height="9"
      rx="2"
      fill="var(--c-bg)"
      stroke="var(--c-text)"
      stroke-width="1.2"
    />
    <rect
      :x="brushF.x - 6"
      :y="brushF.y - 4"
      width="12"
      height="9"
      rx="2"
      fill="var(--c-bg)"
      stroke="var(--c-text)"
      stroke-width="1.2"
    />
    <text
      :x="brushE.x - 12"
      :y="brushE.y + 4"
      fill="var(--c-text)"
      font-size="11"
      text-anchor="end"
    >
      E
    </text>
    <text
      :x="brushF.x - 12"
      :y="brushF.y + 4"
      fill="var(--c-text)"
      font-size="11"
      text-anchor="end"
    >
      F
    </text>

    <polyline
      :points="externalWire"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <rect
      x="455"
      y="300"
      width="12"
      height="34"
      rx="3"
      fill="var(--c-bg)"
      stroke="var(--c-accent)"
      stroke-width="1.4"
    />
    <text x="482" y="322" fill="var(--c-text)" font-size="12">R</text>

    <g v-if="showCurrent">
      <CourseArrow
        :from="currentArrow.from"
        :to="currentArrow.to"
        stroke="var(--c-danger)"
        stroke-width="2.8"
        label="i"
        :label-dx="-16"
        :label-dy="0"
        :opacity="currentOpacity"
      />
      <text v-if="currentOpacity < 0.15" x="505" y="300" fill="var(--c-text-dim)" font-size="12">
        i = 0
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Vec2 {
  x: number;
  y: number;
}

const {
  animated = true,
  angle: propAngle = 0,
  showCurrent = false,
  showLabels = true,
} = defineProps<{
  animated?: boolean;
  angle?: number;
  showCurrent?: boolean;
  showLabels?: boolean;
}>();

const CX = 460;
const CY = 190;
const KX = 0.5;
const KY = 0.28;
const SY = 0.78;
const coilRadius = 72;
const coilDepth = 140;
const ringR = 20;

const project = (p: Vec3): Vec2 => ({
  x: CX + p.x + p.z * KX,
  y: CY - p.y * SY + p.z * KY,
});

const points = (list: Vec3[]): string =>
  list
    .map((p) => {
      const q = project(p);
      return `${q.x.toFixed(1)},${q.y.toFixed(1)}`;
    })
    .join(" ");

const poleN = { x1: -220, x2: 220, y1: 150, y2: 195, z1: -40, z2: 100 };
const poleS = { x1: -220, x2: 220, y1: -240, y2: -195, z1: -40, z2: 100 };

const nFront = points([
  { x: poleN.x1, y: poleN.y1, z: poleN.z1 },
  { x: poleN.x2, y: poleN.y1, z: poleN.z1 },
  { x: poleN.x2, y: poleN.y2, z: poleN.z1 },
  { x: poleN.x1, y: poleN.y2, z: poleN.z1 },
]);
const nTop = points([
  { x: poleN.x1, y: poleN.y2, z: poleN.z1 },
  { x: poleN.x2, y: poleN.y2, z: poleN.z1 },
  { x: poleN.x2, y: poleN.y2, z: poleN.z2 },
  { x: poleN.x1, y: poleN.y2, z: poleN.z2 },
]);
const sFront = points([
  { x: poleS.x1, y: poleS.y1, z: poleS.z1 },
  { x: poleS.x2, y: poleS.y1, z: poleS.z1 },
  { x: poleS.x2, y: poleS.y2, z: poleS.z1 },
  { x: poleS.x1, y: poleS.y2, z: poleS.z1 },
]);
const sBottom = points([
  { x: poleS.x1, y: poleS.y1, z: poleS.z1 },
  { x: poleS.x2, y: poleS.y1, z: poleS.z1 },
  { x: poleS.x2, y: poleS.y1, z: poleS.z2 },
  { x: poleS.x1, y: poleS.y1, z: poleS.z2 },
]);

const nLabel = project({ x: 0, y: 172, z: -40 });
const sLabel = project({ x: 0, y: -217, z: -40 });
const fieldArrows = [-140, 0, 140].map((x) => ({
  from: project({ x, y: 145, z: 65 }),
  to: project({ x, y: -180, z: 65 }),
}));
const fieldLabel = project({ x: -170, y: 0, z: 65 });
const axisStart = project({ x: 0, y: 0, z: -150 });
const axisEnd = project({ x: 0, y: 0, z: 220 });

const angle = ref((propAngle * Math.PI) / 180);
let rafId = 0;
let last = 0;

onMounted(() => {
  if (!animated) return;
  if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  last = performance.now();
  const tick = (now: number): void => {
    const dt = Math.min(now - last, 50);
    last = now;
    angle.value += dt * 0.0009;
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});

const coil = computed(() => {
  const c = Math.cos(angle.value);
  const s = Math.sin(angle.value);
  const a = { x: coilRadius * c, y: coilRadius * s, z: 0 };
  const b = { x: coilRadius * c, y: coilRadius * s, z: coilDepth };
  const cc = { x: -coilRadius * c, y: -coilRadius * s, z: coilDepth };
  const d = { x: -coilRadius * c, y: -coilRadius * s, z: 0 };
  return {
    a,
    b,
    c: cc,
    d,
    pa: project(a),
    pb: project(b),
    pc: project(cc),
    pd: project(d),
  };
});

const planePoints = computed(() =>
  points([coil.value.a, coil.value.b, coil.value.c, coil.value.d]),
);
const wirePoints = computed(() =>
  [coil.value.pa, coil.value.pb, coil.value.pc, coil.value.pd]
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" "),
);

const innerPlanePoints = computed(() => {
  const center = { x: 0, y: 0, z: coilDepth / 2 };
  const shrink = (p: Vec3): Vec3 => ({
    x: center.x + (p.x - center.x) * 0.8,
    y: center.y + (p.y - center.y) * 0.8,
    z: center.z + (p.z - center.z) * 0.8,
  });
  return points([
    shrink(coil.value.a),
    shrink(coil.value.b),
    shrink(coil.value.c),
    shrink(coil.value.d),
  ]);
});

const leadA = computed(() =>
  project({ x: ringR * Math.cos(angle.value), y: ringR * Math.sin(angle.value), z: -85 }),
);
const leadD = computed(() =>
  project({ x: -ringR * Math.cos(angle.value), y: -ringR * Math.sin(angle.value), z: -120 }),
);
const ringK = project({ x: 0, y: 0, z: -85 });
const ringL = project({ x: 0, y: 0, z: -120 });

const brushE = project({ x: 0, y: -ringR, z: -85 });
const brushF = project({ x: 0, y: -ringR, z: -120 });
const externalWire = computed(() => {
  const e = brushE;
  const f = brushF;
  return [
    `${e.x},${e.y}`,
    `${e.x},296`,
    `${455},296`,
    `${467},296`,
    `${467},334`,
    `${455},334`,
    `${f.x},334`,
    `${f.x},${f.y}`,
  ].join(" ");
});

const current = computed(() => Math.sin(angle.value));
const currentOpacity = computed(() => Math.min(1, Math.abs(current.value) * 2.5));
const currentArrow = computed(() =>
  current.value >= 0
    ? { from: { x: 430, y: 270 }, to: { x: 430, y: 294 } }
    : { from: { x: 430, y: 294 }, to: { x: 430, y: 270 } },
);

const cornerLabels = computed(() => [
  { text: "A", x: coil.value.pa.x + 10, y: coil.value.pa.y - 8 },
  { text: "B", x: coil.value.pb.x + 10, y: coil.value.pb.y - 8 },
  { text: "C", x: coil.value.pc.x - 10, y: coil.value.pc.y - 8 },
  { text: "D", x: coil.value.pd.x - 10, y: coil.value.pd.y - 8 },
]);
</script>
