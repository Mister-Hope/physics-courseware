<script setup lang="ts">
import { computed, ref } from "vue";

// 第 11 页：电场强度的矢量叠加。
// 真实公式：E1 = k|Q1|/r1²（沿 Q1P 方向向外，Q1 为正），E2 = k|Q2|/r2²（沿 PQ2 方向，Q2 为负），
// 合场强 E = E1 + E2：Ex = E1x + E2x，Ey = E1y + E2y，E = √(Ex² + Ey²)。
// showE1 / showE2 / showResultant：第 1/2/3 击依次出现（用 visibility 占位，不删不插）。
const { showE1, showE2, showResultant } = defineProps<{
  showE1?: boolean;
  showE2?: boolean;
  showResultant?: boolean;
}>();

const K = 9e9;
const Q1 = 4e-8; // 正电荷，C
const Q2 = -1e-8; // 负电荷，C
const M_PER_UNIT = 1.6667e-4; // 1 视图单位 = 1.6667e-4 m（两电荷相距 360 单位 = 6 cm）
// 1.25e-4 时 E2（|Q2| 只有 Q1 的 1/4）只有约 11 单位、方向读不出 ⇒ 提到 2.2e-4，
// 让 E2 在默认位置也有约 20 单位（E1 约 78 单位，仍保持 4 : 1 的真实比例，平行四边形法则成立）。
const SCALE = 2.2e-4; // 视图单位 / (N/C)

const Q1P = { x: 110, y: 104 };
const Q2P = { x: 470, y: 104 };
const P = ref({ x: 290, y: 40 });

const r1 = computed(() => Math.max(12, Math.hypot(P.value.x - Q1P.x, P.value.y - Q1P.y)));
const r2 = computed(() => Math.max(12, Math.hypot(P.value.x - Q2P.x, P.value.y - Q2P.y)));
const r1m = computed(() => r1.value * M_PER_UNIT);
const r2m = computed(() => r2.value * M_PER_UNIT);

const e1 = computed(() => (K * Q1) / (r1m.value * r1m.value));
const e2 = computed(() => (K * Math.abs(Q2)) / (r2m.value * r2m.value));

// 分场强的方向：Q1 为正 ⇒ 由 Q1 指向 P；Q2 为负 ⇒ 由 P 指向 Q2
const u1 = computed(() => ({
  x: (P.value.x - Q1P.x) / r1.value,
  y: (P.value.y - Q1P.y) / r1.value,
}));
const u2 = computed(() => ({
  x: (Q2P.x - P.value.x) / r2.value,
  y: (Q2P.y - P.value.y) / r2.value,
}));

const ex = computed(() => e1.value * u1.value.x + e2.value * u2.value.x);
const ey = computed(() => e1.value * u1.value.y + e2.value * u2.value.y);
const eMag = computed(() => Math.hypot(ex.value, ey.value));

/** 箭头长度既受"画布边界"约束也受上限约束：长度可以压，方向一点不能改（改了矢量关系就假了） */
const fitLen = (ux: number, uy: number, want: number): number => {
  const M = 10; // 画布内边距（视图单位）
  let len = want;
  if (ux > 1e-6) len = Math.min(len, (700 - M - P.value.x) / ux);
  else if (ux < -1e-6) len = Math.min(len, (M - P.value.x) / ux);
  if (uy > 1e-6) len = Math.min(len, (150 - M - P.value.y) / uy);
  else if (uy < -1e-6) len = Math.min(len, (M - P.value.y) / uy);
  return Math.max(6, len);
};

const len1 = computed(() => fitLen(u1.value.x, u1.value.y, Math.min(118, e1.value * SCALE)));
const len2 = computed(() => fitLen(u2.value.x, u2.value.y, Math.min(118, e2.value * SCALE)));
const lenR = computed(() =>
  fitLen(
    ex.value / (eMag.value || 1),
    ey.value / (eMag.value || 1),
    Math.min(120, eMag.value * SCALE),
  ),
);

const e1End = computed(() => ({
  x: P.value.x + u1.value.x * len1.value,
  y: P.value.y + u1.value.y * len1.value,
}));
const e2End = computed(() => ({
  x: P.value.x + u2.value.x * len2.value,
  y: P.value.y + u2.value.y * len2.value,
}));
const eEnd = computed(() => {
  const ux = ex.value / (eMag.value || 1);
  const uy = ey.value / (eMag.value || 1);
  return { x: P.value.x + ux * lenR.value, y: P.value.y + uy * lenR.value };
});

const svgRef = ref<SVGSVGElement | null>(null);
const dragging = ref(false);

const updateFromEvent = (event: PointerEvent): void => {
  const svg = svgRef.value;
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 700;
  const y = ((event.clientY - rect.top) / rect.height) * 150;
  P.value = {
    x: Math.min(676, Math.max(24, x)),
    y: Math.min(130, Math.max(18, y)),
  };
};

const onPointerDown = (event: PointerEvent): void => {
  dragging.value = true;
  (event.target as Element).setPointerCapture?.(event.pointerId);
  updateFromEvent(event);
};

const onPointerMove = (event: PointerEvent): void => {
  if (dragging.value) updateFromEvent(event);
};

const onPointerUp = (event: PointerEvent): void => {
  dragging.value = false;
  (event.target as Element).releasePointerCapture?.(event.pointerId);
};

const sci = (value: number, digits = 2): { m: string; e: number } => {
  const e = Math.floor(Math.log10(value));
  const m = value / 10 ** e;
  return { m: m.toFixed(digits), e };
};
const fieldTex = (name: string, value: number): string => {
  const s = sci(value);
  return `${name} = ${s.m}\\times 10^{${s.e}}\\ \\text{N/C}`;
};
const e1Tex = computed(() => fieldTex("E_1", e1.value));
const e2Tex = computed(() => fieldTex("E_2", e2.value));
const eTex = computed(() => fieldTex("E", eMag.value));
</script>

<template>
  <div class="spl">
    <svg
      ref="svgRef"
      viewBox="0 0 700 150"
      class="spl-fig"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <line
        :x1="Q1P.x"
        :y1="Q1P.y"
        :x2="Q2P.x"
        :y2="Q2P.y"
        stroke="var(--c-neutral-500)"
        stroke-opacity="0.3"
        stroke-width="1.4"
        stroke-dasharray="4 6"
      />
      <line
        :x1="Q1P.x"
        :y1="Q1P.y"
        :x2="P.x"
        :y2="P.y"
        stroke="var(--c-neutral-500)"
        stroke-opacity="0.5"
        stroke-width="1.4"
        stroke-dasharray="5 5"
      />
      <line
        :x1="Q2P.x"
        :y1="Q2P.y"
        :x2="P.x"
        :y2="P.y"
        stroke="var(--c-neutral-500)"
        stroke-opacity="0.5"
        stroke-width="1.4"
        stroke-dasharray="5 5"
      />
      <text
        :x="(Q1P.x + P.x) / 2 - 10"
        :y="(Q1P.y + P.y) / 2"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-neutral-500)"
      >
        r
      </text>
      <text
        :x="(Q1P.x + P.x) / 2 - 4"
        :y="(Q1P.y + P.y) / 2 + 14"
        font-family="KaTeX_Main"
        font-size="11"
        fill="var(--c-neutral-500)"
      >
        1
      </text>
      <text
        :x="(Q2P.x + P.x) / 2 + 6"
        :y="(Q2P.y + P.y) / 2"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="14"
        fill="var(--c-neutral-500)"
      >
        r
      </text>
      <text
        :x="(Q2P.x + P.x) / 2 + 12"
        :y="(Q2P.y + P.y) / 2 + 14"
        font-family="KaTeX_Main"
        font-size="11"
        fill="var(--c-neutral-500)"
      >
        2
      </text>
      <g :style="{ visibility: showE1 ? 'visible' : 'hidden' }">
        <CourseArrow :from="P" :to="e1End" stroke="var(--c-danger)" :stroke-width="3" />
        <text
          :x="e1End.x - 6"
          :y="e1End.y - 12"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-danger)"
        >
          E
        </text>
        <text
          :x="e1End.x + 6"
          :y="e1End.y - 8"
          font-family="KaTeX_Main"
          font-size="11"
          fill="var(--c-danger)"
        >
          1
        </text>
      </g>
      <g :style="{ visibility: showE2 ? 'visible' : 'hidden' }">
        <CourseArrow :from="P" :to="e2End" stroke="var(--c-velocity)" :stroke-width="3" />
        <text
          :x="e2End.x - 6"
          :y="e2End.y - 12"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-velocity)"
        >
          E
        </text>
        <text
          :x="e2End.x + 6"
          :y="e2End.y - 8"
          font-family="KaTeX_Main"
          font-size="11"
          fill="var(--c-velocity)"
        >
          2
        </text>
      </g>
      <g :style="{ visibility: showResultant ? 'visible' : 'hidden' }">
        <line
          :x1="e1End.x"
          :y1="e1End.y"
          :x2="eEnd.x"
          :y2="eEnd.y"
          stroke="var(--c-neutral-500)"
          stroke-opacity="0.55"
          stroke-width="1.5"
          stroke-dasharray="5 5"
        />
        <line
          :x1="e2End.x"
          :y1="e2End.y"
          :x2="eEnd.x"
          :y2="eEnd.y"
          stroke="var(--c-neutral-500)"
          stroke-opacity="0.55"
          stroke-width="1.5"
          stroke-dasharray="5 5"
        />
        <CourseArrow :from="P" :to="eEnd" stroke="var(--c-force)" :stroke-width="3.8" />
        <text
          :x="eEnd.x + 8"
          :y="eEnd.y + 4"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-force)"
        >
          E
        </text>
      </g>
      <circle :cx="Q1P.x" :cy="Q1P.y" r="17" fill="var(--c-danger)" fill-opacity="0.9" />
      <text
        :x="Q1P.x"
        :y="Q1P.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#fff"
      >
        +
      </text>
      <text
        :x="Q1P.x"
        :y="Q1P.y + 30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-danger)"
      >
        Q
      </text>
      <text
        :x="Q1P.x + 10"
        :y="Q1P.y + 34"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="10"
        fill="var(--c-danger)"
      >
        1
      </text>
      <circle :cx="Q2P.x" :cy="Q2P.y" r="17" fill="var(--c-velocity)" fill-opacity="0.9" />
      <text
        :x="Q2P.x"
        :y="Q2P.y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="17"
        fill="#fff"
      >
        −
      </text>
      <text
        :x="Q2P.x"
        :y="Q2P.y + 30"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="13"
        fill="var(--c-velocity)"
      >
        Q
      </text>
      <text
        :x="Q2P.x + 10"
        :y="Q2P.y + 34"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="10"
        fill="var(--c-velocity)"
      >
        2
      </text>
      <circle
        :cx="P.x"
        :cy="P.y"
        r="18"
        fill="transparent"
        style="cursor: grab"
        @pointerdown="onPointerDown"
      />
      <circle :cx="P.x" :cy="P.y" r="9" fill="rgba(148, 163, 184, 0.18)" />
      <text
        :x="P.x + 16"
        :y="P.y - 12"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="15"
        fill="var(--c-accent)"
      >
        P
      </text>
    </svg>
    <div class="spl-panel">
      <div class="spl-read spl-e1" :class="{ 'spl-hidden': !showE1 }"><Latex :tex="e1Tex" /></div>
      <div class="spl-read spl-e2" :class="{ 'spl-hidden': !showE2 }"><Latex :tex="e2Tex" /></div>
      <div class="spl-read spl-e" :class="{ 'spl-hidden': !showResultant }">
        <Latex :tex="eTex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spl {
  display: flex;
  gap: 1.25rem;
  align-items: stretch;
}

.spl-fig {
  flex: 1 1 0;
  min-width: 0;
  height: 144px;
  touch-action: none;
}

.spl-panel {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: center;

  width: 11rem;
}

.spl-read {
  font-size: 0.95rem;
}

.spl-e1 {
  color: var(--c-danger);
}

.spl-e2 {
  color: var(--c-velocity);
}

.spl-e {
  color: var(--c-force);
}

.spl-hidden {
  visibility: hidden;
}
</style>
