<!--
  磁场方向的规定（第 5 页）：切换某一点的磁场方向，小磁针静止时 N 极的指向始终与它一致。
  针的转角直接取磁场方向角（真实几何），切换按钮是 @click 演示，不占翻页点击。
-->
<script setup>
import { computed, ref } from "vue";

/** 方向角：0° = 屏幕向上（北），顺时针为正（SVG rotate 同向） */
const ang = ref(0);
const DIRS = [
  { label: "↑ 北", a: 0 },
  { label: "→ 东", a: 90 },
  { label: "↓ 南", a: 180 },
  { label: "← 西", a: 270 },
];
const rad = computed(() => (ang.value * Math.PI) / 180);
/** 场景里的那一点（左侧），B 从它指向磁场方向 */
const P = { x: 95, y: 140 };
const from = computed(() => ({
  x: P.x + 16 * Math.sin(rad.value),
  y: P.y - 16 * Math.cos(rad.value),
}));
const tip = computed(() => ({
  x: P.x + 84 * Math.sin(rad.value),
  y: P.y - 84 * Math.cos(rad.value),
}));
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 flex-col">
    <div class="mb-1 flex shrink-0 flex-wrap items-center justify-center gap-2">
      <button
        v-for="d in DIRS"
        :key="d.a"
        type="button"
        class="mf-btn"
        :class="{ 'mf-btn-on': ang === d.a }"
        @click="ang = d.a"
      >
        {{ d.label }}
      </button>
    </div>

    <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="min-h-0 w-full flex-1">
      <!-- 某一点的磁场方向 -->
      <circle cx="95" cy="140" r="5.5" fill="var(--c-text)" />
      <CourseArrow
        :from="from"
        :to="tip"
        stroke="var(--c-field)"
        stroke-width="4"
        label="B"
        :label-dx="20"
        :label-dy="-6"
      />

      <!-- 小磁针（转角 = 磁场方向角） -->
      <circle
        cx="280"
        cy="140"
        r="58"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="2"
        opacity="0.7"
      />
      <g stroke="var(--c-text-dim)" stroke-width="1.6" opacity="0.7">
        <path d="M 280 82 V 94" />
        <path d="M 280 186 V 198" />
        <path d="M 222 140 H 234" />
        <path d="M 326 140 H 338" />
      </g>
      <g :transform="`rotate(${ang} 280 140)`" style="transition: transform 0.4s">
        <path d="M 280 92 L 291 140 L 280 152 L 269 140 Z" fill="var(--c-danger)" />
        <path d="M 269 140 L 291 140 L 280 188 Z" fill="var(--c-velocity)" />
        <text
          x="280"
          y="112"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="14"
          fill="var(--c-text)"
        >
          N
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.mf-btn {
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  font-size: 0.85rem;
  border: 1px solid var(--c-border);
  color: var(--c-text-dim);
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}
.mf-btn-on {
  color: var(--c-accent);
  border-color: var(--c-accent-border);
  background-color: var(--c-accent-soft);
}
</style>
