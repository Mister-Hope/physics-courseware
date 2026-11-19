<!--
  第 7、8 页：交流发电机的结构和工作过程。
  采用清晰的剖面示意：磁极上下放置，磁场竖直向下；线圈绕水平轴转动；
  滑环 K、L 在右侧，电刷 E、F 把电流引到外电路 R。
-->
<template>
  <svg
    viewBox="0 0 900 430"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="交流发电机：磁极、线圈、滑环、电刷和外电路"
  >
    <polygon
      points="140,38 700,38 680,82 160,82"
      fill="var(--c-danger)"
      fill-opacity="0.16"
      stroke="var(--c-danger)"
      stroke-width="1.4"
    />
    <polygon
      points="160,348 680,348 700,392 140,392"
      fill="var(--c-accent-2)"
      fill-opacity="0.16"
      stroke="var(--c-accent-2)"
      stroke-width="1.4"
    />
    <text
      x="450"
      y="68"
      fill="var(--c-danger)"
      font-family="KaTeX_Main"
      font-size="28"
      text-anchor="middle"
    >
      N
    </text>
    <text
      x="450"
      y="378"
      fill="var(--c-accent-2)"
      font-family="KaTeX_Main"
      font-size="28"
      text-anchor="middle"
    >
      S
    </text>

    <CourseArrow
      v-for="x in fieldXs"
      :key="x"
      :from="{ x, y: 94 }"
      :to="{ x, y: 336 }"
      stroke="var(--c-text-dim)"
      :stroke-width="1.5"
      stroke-dasharray="7 6"
      :arrow-size="7"
    />
    <text
      x="238"
      y="116"
      fill="var(--c-text-dim)"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
    >
      B
    </text>

    <line
      x1="266"
      y1="215"
      x2="782"
      y2="215"
      stroke="var(--c-text-dim)"
      stroke-width="1.3"
      stroke-dasharray="7 5"
      opacity="0.75"
    />
    <text x="272" y="203" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="13">O</text>
    <text x="764" y="203" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="13">O′</text>

    <polyline
      :points="coilPath1"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="4.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <polyline
      :points="coilPath2"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="4.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <line
      :x1="coil.b.x"
      :y1="coil.b.y"
      x2="690"
      :y2="coil.b.y"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      opacity="0.8"
    />
    <line
      :x1="coil.c.x"
      :y1="coil.c.y"
      x2="690"
      :y2="coil.c.y"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      opacity="0.8"
    />

    <ellipse
      cx="700"
      cy="215"
      rx="7"
      ry="34"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="4"
    />
    <ellipse
      cx="735"
      cy="215"
      rx="7"
      ry="34"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="4"
      opacity="0.7"
    />
    <text
      x="700"
      y="166"
      fill="var(--c-accent)"
      font-family="KaTeX_Main"
      font-size="14"
      text-anchor="middle"
    >
      K
    </text>
    <text
      x="735"
      y="166"
      fill="var(--c-accent)"
      font-family="KaTeX_Main"
      font-size="14"
      text-anchor="middle"
    >
      L
    </text>

    <rect
      x="694"
      y="252"
      width="12"
      height="8"
      rx="2"
      fill="var(--c-bg)"
      stroke="var(--c-text)"
      stroke-width="1.3"
    />
    <rect
      x="729"
      y="174"
      width="12"
      height="8"
      rx="2"
      fill="var(--c-bg)"
      stroke="var(--c-text)"
      stroke-width="1.3"
    />
    <text
      x="682"
      y="266"
      fill="var(--c-text)"
      font-family="KaTeX_Main"
      font-size="14"
      text-anchor="end"
    >
      E
    </text>
    <text x="748" y="186" fill="var(--c-text)" font-family="KaTeX_Main" font-size="14">F</text>

    <polyline
      points="700,252 760,252 760,300 790,300"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <polyline
      points="735,174 760,174 760,342 790,342"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <rect
      x="790"
      y="300"
      width="16"
      height="42"
      rx="3"
      fill="var(--c-bg)"
      stroke="var(--c-accent)"
      stroke-width="1.4"
    />
    <text x="816" y="327" fill="var(--c-text)" font-family="KaTeX_Main" font-size="14">R</text>

    <g v-if="showLabels">
      <text
        :x="coil.a.x - 16"
        :y="coil.a.y - 12"
        fill="var(--c-text)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
        text-anchor="end"
      >
        A
      </text>
      <text
        :x="coil.b.x + 12"
        :y="coil.b.y - 12"
        fill="var(--c-text)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
      >
        B
      </text>
      <text
        :x="coil.c.x + 12"
        :y="coil.c.y + 22"
        fill="var(--c-text)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
      >
        C
      </text>
      <text
        :x="coil.d.x - 16"
        :y="coil.d.y + 22"
        fill="var(--c-text)"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
        text-anchor="end"
      >
        D
      </text>
    </g>

    <g v-if="showCurrent">
      <CourseArrow
        :from="currentArrow.from"
        :to="currentArrow.to"
        stroke="var(--c-danger)"
        :stroke-width="3"
        label="i"
        :label-dx="14"
        :label-dy="0"
        :opacity="currentOpacity"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const {
  animated = false,
  angle: initialAngle = 34,
  showLabels = true,
  showCurrent = false,
} = defineProps<{
  animated?: boolean;
  angle?: number;
  showLabels?: boolean;
  showCurrent?: boolean;
}>();

const fieldXs = [260, 450, 640];
const cx = 450;
const cy = 215;
const halfW = 110;
const angle = ref((initialAngle * Math.PI) / 180);
let raf = 0;
let last = 0;

const coil = computed(() => {
  const h = Math.max(3, 48 * Math.abs(Math.cos(angle.value)));
  return {
    a: { x: cx - halfW, y: cy - h - 6 },
    b: { x: cx + halfW, y: cy - h + 2 },
    c: { x: cx + halfW, y: cy + h + 2 },
    d: { x: cx - halfW, y: cy + h - 6 },
  };
});

const coilPath1 = computed(
  () => `${coil.value.a.x},${coil.value.a.y} ${coil.value.b.x},${coil.value.b.y}`,
);
const coilPath2 = computed(
  () =>
    `${coil.value.c.x},${coil.value.c.y} ${coil.value.d.x},${coil.value.d.y} ${coil.value.a.x},${coil.value.a.y}`,
);

const currentOpacity = computed(() => Math.min(0.95, Math.abs(Math.sin(angle.value)) * 1.5));
const currentArrow = computed(() => {
  const sign = Math.cos(angle.value) >= 0 ? 1 : -1;
  return {
    from: { x: 760, y: 320 - 20 * sign },
    to: { x: 760, y: 320 + 20 * sign },
  };
});

const tick = (time: number): void => {
  if (!animated) return;
  if (!last) last = time;
  const delta = Math.min(0.05, (time - last) / 1000);
  last = time;
  angle.value = (angle.value + delta * 0.9) % (Math.PI * 2);
  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  const reduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (animated && !reduced) raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>
