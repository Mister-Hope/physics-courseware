<!--
  通电导线在磁场中受力（俯视）：平行导轨 + 横放的导线棒 + 垂直纸面向里/向外的磁场。
  I 沿导线棒向上/向下，B 垂直纸面，F 沿水平方向（I 与 B 所决定的平面的法线方向）。
  第 2 页用于「点击后揭示 F」；第 3 页把 i-up / b-in 绑到按钮上，现场反向。
-->
<script setup lang="ts">
import { computed } from "vue";

const {
  iUp = true,
  bIn = true,
  showForce = false,
  step = 0,
  rails = true,
} = defineProps<{
  /** 导线棒中的电流方向：true = 向上，false = 向下 */
  iUp?: boolean;
  /** 磁场方向：true = 垂直纸面向里（×），false = 垂直纸面向外（·） */
  bIn?: boolean;
  /** 是否显示安培力 F（第 3 页常显） */
  showForce?: boolean;
  /** 第 2 页的点击步数：≥1 时显 F */
  step?: number;
  /** 是否画平行导轨（第 8 页只要「导线 + 磁场」时可关掉） */
  rails?: boolean;
}>();

/** F 是否可见：常显开关或点击步数任一满足 */
const forceVisible = computed(() => showForce || step >= 1);

/** F 的水平指向：I 向上 + B 向里 → F 向左；只反一个就向右 */
const fLeft = computed(() => iUp === bIn);

/** 安培力箭头：从导线棒中点出发，沿水平方向 */
const forceFrom = { x: 240, y: 160 };
const forceTo = computed(() => ({ x: fLeft.value ? 92 : 388, y: 160 }));

/** 电流箭头沿导线棒，方向随 iUp 翻转 */
const currentFrom = computed(() => ({ x: 240, y: iUp ? 200 : 120 }));
const currentTo = computed(() => ({ x: 240, y: iUp ? 120 : 200 }));
</script>

<template>
  <svg
    viewBox="0 0 480 300"
    width="480"
    height="300"
    class="course-fig"
    role="img"
    aria-label="通电导线在磁场中受力"
  >
    <rect
      x="70"
      y="45"
      width="340"
      height="230"
      rx="14"
      fill="color-mix(in srgb, var(--c-accent) 5%, transparent)"
      stroke="color-mix(in srgb, var(--c-accent) 26%, transparent)"
      stroke-width="1.4"
      stroke-dasharray="7 6"
    />
    <FieldDots
      :x="96"
      :y="64"
      :dir="bIn ? 'in' : 'out'"
      :cols="7"
      :rows="5"
      :spacing="48"
      :size="4"
      :line-width="1.4"
      opacity="0.7"
    />
    <text
      x="402"
      y="34"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      fill="var(--c-accent)"
    >
      B
    </text>
    <template v-if="rails">
      <line
        x1="60"
        y1="95"
        x2="420"
        y2="95"
        stroke="var(--c-text-dim)"
        stroke-width="4"
        stroke-linecap="round"
        opacity="0.75"
      />
      <line
        x1="60"
        y1="225"
        x2="420"
        y2="225"
        stroke="var(--c-text-dim)"
        stroke-width="4"
        stroke-linecap="round"
        opacity="0.75"
      />
    </template>
    <line
      x1="240"
      y1="95"
      x2="240"
      y2="225"
      stroke="var(--c-accent)"
      stroke-width="7"
      stroke-linecap="round"
    />
    <CourseArrow
      :from="currentFrom"
      :to="currentTo"
      stroke="var(--c-accent-2)"
      :stroke-width="3.4"
      label="I"
      :label-dx="15"
      :label-dy="-14"
    />
    <g v-show="forceVisible">
      <CourseArrow
        :from="forceFrom"
        :to="forceTo"
        stroke="var(--c-danger)"
        :stroke-width="3.6"
        label="F"
        :label-dx="0"
        :label-dy="-13"
      />
    </g>
  </svg>
</template>
