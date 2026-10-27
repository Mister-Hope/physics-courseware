<!--
  电磁阻尼的应用：磁电式仪表（灵敏电流计）的铝框（第 16 页）
  两个完全相同的表：左表两接线柱未连接，右表用导线短接。
  晃动表壳后指针自由摆动 —— 左表要摆很久，右表很快停在平衡位置。
  表盘用共享 Galvanometer（G、零点居中、正角向右偏），导线止于表盘左右接线柱；
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
      <!-- 铝框：线圈绕在铝框上、指针固定在铝框上（虚线方框套在表盘里） -->
      <rect
        :x="m.cx - 52"
        y="108"
        width="104"
        height="84"
        rx="3"
        fill="none"
        stroke="var(--c-neutral-500)"
        stroke-width="1.6"
        stroke-dasharray="6 5"
      />
      <!-- 表盘：共享灵敏电流计（G、零点居中、指针正角向右偏） -->
      <Galvanometer :x="m.cx" :y="150" :r="96" :angle="angle(m.b)" />
      <text :x="m.cx - 40" y="212" text-anchor="middle" font-size="14" fill="var(--c-text-mute)">
        铝框
      </text>
      <!-- 右表：导线把两个接线柱短接（左右接线柱 = 表盘 9 点 / 3 点） -->
      <path
        v-if="i === 1"
        d="M 428 150 H 412 Q 406 150 406 156 V 282 Q 406 288 412 288 H 636 Q 642 288 642 282 V 156 Q 642 150 636 150 H 620"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
    </g>
  </svg>
</template>
