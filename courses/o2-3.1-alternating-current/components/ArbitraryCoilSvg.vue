<!--
  第 17 页：任意形状线圈的电流方向。
  圆形线圈转到任意角度时，投影成椭圆；把线圈分成许多小段，
  各段的电流箭头沿回路相加。箭头方向随磁通量增减而反向。
-->
<template>
  <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="圆形线圈分成许多小段，各段电流方向沿回路相加">
    <g opacity="0.32">
      <FieldDots :x="28" :y="26" :cols="25" :rows="10" :spacing="28" dir="in" color="var(--c-text-dim)" />
    </g>
    <text x="18" y="20" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="16">B</text>

    <ellipse :cx="cx" :cy="cy" :rx="rx" :ry="ry" fill="var(--c-accent)" fill-opacity="0.06" stroke="var(--c-accent)" stroke-width="3.4" />

    <g v-for="(seg, index) in segments" :key="index">
      <CourseArrow :from="seg.from" :to="seg.to" stroke="var(--c-danger)" :stroke-width="3" :opacity="currentOpacity" />
    </g>

    <circle :cx="cx" :cy="cy" r="3" fill="var(--c-text-dim)" />
    <text :x="cx + 10" :y="cy - 8" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13">O</text>
  </svg>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { animated = true } = defineProps<{ animated?: boolean }>();

const cx = 300;
const cy = 160;
const rx = 152;
const angle = ref(0.8);
let raf = 0;
let last = 0;

const ry = computed(() => Math.max(10, rx * Math.abs(Math.cos(angle.value))));
const currentOpacity = computed(() => Math.min(0.95, Math.abs(Math.sin(angle.value)) * 1.6));
const direction = computed(() => (Math.sin(angle.value) >= 0 ? 1 : -1));

const segments = computed(() => {
  const count = 14;
  return Array.from({ length: count }, (_, index) => {
    const t = (index / count) * Math.PI * 2;
    const px = cx + rx * Math.cos(t);
    const py = cy + ry.value * Math.sin(t);
    const tx = -rx * Math.sin(t);
    const ty = ry.value * Math.cos(t);
    const length = Math.hypot(tx, ty) || 1;
    const half = 19;
    const ux = (tx / length) * half * direction.value;
    const uy = (ty / length) * half * direction.value;
    return {
      from: { x: px - ux, y: py - uy },
      to: { x: px + ux, y: py + uy },
    };
  });
});

const tick = (time: number): void => {
  if (!animated) return;
  if (!last) last = time;
  const delta = Math.min(0.05, (time - last) / 1000);
  last = time;
  angle.value = (angle.value + delta * 0.7) % (Math.PI * 2);
  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  const reduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (animated && !reduced) raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>
