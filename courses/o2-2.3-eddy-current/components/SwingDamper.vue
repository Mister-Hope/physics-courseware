<!--
  电磁阻尼引课（第 13 页）：两个相同的金属摆，右边的摆锤在两磁极之间摆动。
  点击后同时释放：左边的摆要摆很久，右边只要几个来回就停了。
  摆角按阻尼振动 θ = θ₀·e^(−bt)·cos(ωt) 实时计算，两侧取不同的 b。
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const { step = 0 } = defineProps<{
  /** Step ≥ 1 时释放两个摆 */
  step?: number;
}>();

const t = ref(0);
let raf = 0;

const stop = (): void => {
  cancelAnimationFrame(raf);
};

const run = (): void => {
  stop();
  t.value = 0;
  const t0 = performance.now();

  const tick = (now: number): void => {
    const dt = (now - t0) / 1000;

    t.value = Math.min(dt, 3.2);
    if (dt < 3.2) raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  if (step >= 1) run();
});
watch(
  () => step,
  (v) => {
    if (v >= 1) run();
  },
);
onUnmounted(stop);

const angle = (b: number): number =>
  step >= 1 ? 26 * Math.exp(-b * t.value) * Math.sin(2 * Math.PI * 0.9 * t.value) : 0;
</script>

<template>
  <svg
    class="fig-svg"
    viewBox="0 0 720 330"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="金属摆在磁场中很快停下"
  >
    <text x="200" y="32" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">
      没有磁场
    </text>
    <text x="500" y="32" text-anchor="middle" font-size="18" fill="var(--c-accent)">
      摆锤在两磁极之间
    </text>
    <g
      v-for="p in [
        { x: 200, b: 0.28 },
        { x: 500, b: 2.6 },
      ]"
      :key="p.x"
    >
      <line
        :x1="p.x - 34"
        y1="46"
        :x2="p.x + 34"
        y2="46"
        stroke="#64748b"
        stroke-width="4"
        stroke-linecap="round"
      />
      <g :transform="`rotate(${angle(p.b)} ${p.x} 46)`">
        <line :x1="p.x" y1="46" :x2="p.x" y2="206" stroke="#94a3b8" stroke-width="2.4" />
        <rect
          :x="p.x - 22"
          y="206"
          width="44"
          height="30"
          rx="4"
          fill="rgb(148 163 184 / 30%)"
          stroke="#cbd5e1"
          stroke-width="2"
        />
      </g>
    </g>
    <rect
      x="368"
      y="180"
      width="30"
      height="72"
      rx="3"
      fill="#f87171"
      stroke="#fca5a5"
      stroke-width="1.2"
    />
    <rect
      x="602"
      y="180"
      width="30"
      height="72"
      rx="3"
      fill="#60a5fa"
      stroke="#93c5fd"
      stroke-width="1.2"
    />
    <text
      x="383"
      y="224"
      text-anchor="middle"
      font-size="18"
      font-family="KaTeX_Main, serif"
      fill="#0f172a"
    >
      N
    </text>
    <text
      x="617"
      y="224"
      text-anchor="middle"
      font-size="18"
      font-family="KaTeX_Main, serif"
      fill="#0f172a"
    >
      S
    </text>
    <line
      x1="398"
      y1="216"
      x2="602"
      y2="216"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      stroke-dasharray="6 5"
    />
    <text x="360" y="310" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">
      两个摆完全相同，摆锤都是金属
    </text>
  </svg>
</template>
