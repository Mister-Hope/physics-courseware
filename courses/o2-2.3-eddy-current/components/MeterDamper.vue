<!--
  电磁阻尼的应用：磁电式仪表的铝框（第 17 页）
  两个完全相同的表：左表两接线柱未连接，右表用导线短接。
  晃动表壳后指针自由摆动 —— 左表要摆很久，右表很快停在平衡位置。
  指针角度按阻尼振动 θ = θ₀·e^(−bt)·cos(2πft) 实时计算，左右取不同的 b。
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";

const { step = 0 } = defineProps<{
  /** Step ≥ 1 时播放晃动后指针的衰减摆动 */
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

    t.value = Math.min(dt, 2.8);
    if (dt < 2.8) raf = requestAnimationFrame(tick);
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

/** 阻尼振动角位移（度）；未释放时指针竖直 */
const angle = (b: number): number =>
  step >= 1 ? 40 * Math.exp(-b * t.value) * Math.cos(2 * Math.PI * 1.4 * t.value) : 0;

const rad = (deg: number): number => (deg * Math.PI) / 180;
const TICKS = [-60, -40, -20, 0, 20, 40, 60];
</script>

<template>
  <svg
    class="fig-svg"
    viewBox="0 0 720 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="短接前后表针摆动的对比"
  >
    <g
      v-for="(m, i) in [
        { cx: 196, label: '未短接', b: 0.6 },
        { cx: 524, label: '短接两接线柱', b: 3.4 },
      ]"
      :key="m.cx"
    >
      <text
        :x="m.cx"
        y="24"
        text-anchor="middle"
        font-size="16"
        :fill="i === 0 ? 'var(--c-text-dim)' : 'var(--c-accent)'"
      >
        {{ m.label }}
      </text>
      <circle
        :cx="m.cx"
        cy="150"
        r="112"
        fill="rgb(30 41 59 / 45%)"
        stroke="#64748b"
        stroke-width="2.4"
      />
      <path
        :d="`M ${m.cx - 96} 106 A 112 112 0 0 1 ${m.cx + 96} 106`"
        fill="none"
        stroke="#475569"
        stroke-width="1.6"
      />
      <line
        v-for="a in TICKS"
        :key="a"
        :x1="m.cx + 94 * Math.sin(rad(a))"
        :y1="150 - 94 * Math.cos(rad(a))"
        :x2="m.cx + 104 * Math.sin(rad(a))"
        :y2="150 - 104 * Math.cos(rad(a))"
        stroke="#475569"
        stroke-width="1.6"
      />
      <circle :cx="m.cx" cy="150" r="4" fill="#94a3b8" />
      <rect
        :x="m.cx - 54"
        y="106"
        width="108"
        height="88"
        rx="3"
        fill="none"
        stroke="#64748b"
        stroke-width="1.6"
        stroke-dasharray="6 5"
      />
      <text :x="m.cx" y="216" text-anchor="middle" font-size="14" fill="#64748b">铝框</text>
      <g :transform="`rotate(${angle(m.b)} ${m.cx} 150)`">
        <line
          :x1="m.cx"
          y1="150"
          :x2="m.cx"
          y2="40"
          stroke="#cbd5e1"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <circle :cx="m.cx" cy="40" r="3" fill="#cbd5e1" />
      </g>
      <circle :cx="m.cx - 20" cy="286" r="5" fill="none" stroke="#94a3b8" stroke-width="2" />
      <circle :cx="m.cx + 20" cy="286" r="5" fill="none" stroke="#94a3b8" stroke-width="2" />
      <path
        v-if="i === 1"
        :d="`M ${m.cx - 20} 286 Q ${m.cx} 314 ${m.cx + 20} 286`"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
    </g>
  </svg>
</template>
