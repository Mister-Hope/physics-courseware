<script setup lang="ts">
// 第 10 页：静电屏蔽 —— 点击分步三态（无屏蔽 / 金属网 / 封闭金属壳）；箔片"张开 → 闭合"用 rAF 形态动画；无滑块、无数值读数
import { computed, ref, watch } from "vue";

const props = defineProps<{ mode: number }>();

const open = ref(15); // 当前箔片张角（度）
let raf = 0;

function target() {
  return props.mode === 0 ? 15 : 0;
}

function animate() {
  if (typeof requestAnimationFrame === "undefined") {
    open.value = target();
    return;
  }
  if (raf) cancelAnimationFrame(raf);
  const from = open.value;
  const to = target();
  const start = performance.now();
  const dur = 420;
  const tick = (t: number) => {
    const p = Math.min(1, (t - start) / dur);
    open.value = from + (to - from) * p;
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

watch(
  () => props.mode,
  () => animate(),
);

const leaf = computed(() => {
  const a = (open.value * Math.PI) / 180;
  const hx = 336;
  const hy = 196;
  const len = 46;
  return {
    left: { x: hx - Math.sin(a) * len, y: hy + Math.cos(a) * len },
    right: { x: hx + Math.sin(a) * len, y: hy + Math.cos(a) * len },
  };
});
</script>

<template>
  <svg viewBox="0 0 460 250" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 220px">
    <circle cx="76" cy="126" r="24" fill="var(--c-danger)" fill-opacity="0.85" />
    <text x="76" y="126" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="18" fill="#fff">+</text>
    <text x="76" y="168" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">带电金属球</text>
    <CourseArrow
      v-for="y in [92, 126, 160]"
      :key="`f${y}`"
      :from="{ x: 104, y }"
      :to="{ x: 286, y }"
      stroke="var(--c-field)"
      stroke-width="1.6"
      :opacity="0.55"
    />
    <!-- 验电器 -->
    <circle cx="336" cy="76" r="14" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.6" stroke-width="2" />
    <line x1="336" y1="90" x2="336" y2="196" stroke="var(--c-text-mute)" stroke-width="4" />
    <line x1="336" y1="196" :x2="leaf.left.x" :y2="leaf.left.y" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <line x1="336" y1="196" :x2="leaf.right.x" :y2="leaf.right.y" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    <text x="336" y="232" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">验电器</text>
    <template v-if="props.mode >= 1">
      <rect x="286" y="52" width="100" height="168" rx="12" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" :stroke-dasharray="props.mode === 1 ? '8 6' : '0'" />
      <template v-if="props.mode === 1">
        <line v-for="x in [306, 326, 346, 366]" :key="`v${x}`" :x1="x" y1="52" :x2="x" y2="220" stroke="var(--c-accent-2)" stroke-width="1" stroke-opacity="0.55" />
        <line v-for="y in [74, 104, 134, 164, 194]" :key="`h${y}`" x1="286" :y1="y" x2="386" :y2="y" stroke="var(--c-accent-2)" stroke-width="1" stroke-opacity="0.55" />
      </template>
    </template>
  </svg>
</template>
