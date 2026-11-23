<!--
  第 7 页练习：导线 ab 水平，电流 a→b，B 在纸面内与导线成 30°。
  I 沿 +x，B 在纸面内斜向上，F = I × B 垂直纸面向外（⊙）。
  第一眼只给「试卷上本来就有」的导线、I、B、30°；点击后才显示 F。
-->
<script setup lang="ts">
const { showF = false } = defineProps<{
  /** 是否显示安培力 F（点击后） */
  showF?: boolean;
}>();
</script>

<template>
  <svg
    viewBox="0 0 480 300"
    width="480"
    height="300"
    class="course-fig"
    role="img"
    aria-label="斜向磁场中导线所受安培力的方向"
  >
    <line
      x1="60"
      y1="200"
      x2="420"
      y2="200"
      stroke="var(--c-text-dim)"
      stroke-width="6"
      stroke-linecap="round"
    />
    <text
      x="48"
      y="226"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text)"
    >
      a
    </text>
    <text
      x="426"
      y="226"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text)"
    >
      b
    </text>
    <CourseArrow
      :from="{ x: 100, y: 200 }"
      :to="{ x: 176, y: 200 }"
      stroke="var(--c-accent-2)"
      :stroke-width="3.2"
      label="I"
      :label-dx="0"
      :label-dy="-14"
    />
    <CourseArrow
      :from="{ x: 240, y: 200 }"
      :to="{ x: 352.6, y: 135 }"
      stroke="var(--c-accent)"
      :stroke-width="3.2"
      label="B"
      :label-dx="10"
      :label-dy="-10"
    />
    <path
      d="M 292 200 Q 288 186 281 176"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.5"
      stroke-dasharray="5 4"
      opacity="0.8"
    />
    <text
      x="298"
      y="186"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="16"
      fill="var(--c-accent)"
    >
      θ
    </text>
    <g v-show="showF">
      <FieldMark
        :x="240"
        :y="200"
        dir="out"
        :r="13"
        :line-width="1.8"
        color="var(--c-danger)"
        label="F"
        :label-size="16"
      />
    </g>
  </svg>
</template>
