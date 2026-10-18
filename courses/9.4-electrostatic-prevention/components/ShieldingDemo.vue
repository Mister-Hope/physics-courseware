<script setup lang="ts">
// 第 10 页：静电屏蔽演示 —— 无屏蔽 / 金属网 / 封闭金属壳；箔片张角为定性映射，无公式
import { computed, ref } from "vue";

const props = defineProps<{ mode: number }>();

const Q = ref(3); // ×10⁻⁸ C
const r = ref(10); // cm
const k = 9e9;

const E = computed(() =>
  props.mode === 0 ? (k * (Q.value * 1e-8)) / (r.value / 100) ** 2 : 0,
);
const angle = computed(() => (16 * E.value) / (E.value + 2.5e4));
const leaf = computed(() => {
  const a = (angle.value * Math.PI) / 180;
  const hx = 336;
  const hy = 196;
  const len = 46;
  return {
    left: { x: hx - Math.sin(a) * len, y: hy + Math.cos(a) * len },
    right: { x: hx + Math.sin(a) * len, y: hy + Math.cos(a) * len },
  };
});
const eTex = computed(() => {
  if (E.value === 0) return "0";
  const e = Math.floor(Math.log10(E.value));
  const m = E.value / 10 ** e;
  return `${m.toFixed(1)}\\times10^{${e}}\\ \\text{N/C}`;
});
</script>

<template>
  <div class="stack">
    <svg viewBox="0 0 460 250" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 150px">
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
    <div class="flex items-center gap-4">
      <CourseSlider v-model="Q" :min="1" :max="5" :step="0.5" label="电荷量" label-tex="Q" class="flex-1" label-width="5.6rem">
        <template #value>{{ Q.toFixed(1) }} ×10⁻⁸ <Latex tex="\text{C}" /></template>
      </CourseSlider>
      <CourseSlider v-model="r" :min="5" :max="20" :step="1" label="距离" label-tex="r" class="flex-1" label-width="4.2rem">
        <template #value>{{ r }} <Latex tex="\text{cm}" /></template>
      </CourseSlider>
    </div>
    <div class="text-[0.95rem] tabular-nums" style="align-self: stretch; width: 100%">
      <div><Latex tex="E=" /><Latex :tex="eTex" /></div>
      <div class="text-dim" style="font-size: 0.85rem">验电器处场强；箔片张角为定性示意</div>
    </div>
  </div>
</template>
