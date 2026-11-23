<!--
  第 6 页练习：每个图给出 I、B、F 中的两个，点击后补全第三个。
  甲：B 向里 + I 向右 → F 向上；乙：I 向外 + F 向下 → B 向左；丙：F 向上 + B 向右 → I 向外。
  step = 1/2/3 时分别显示甲/乙/丙的答案。
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /** 当前点击步数：1 显甲，2 显乙，3 显丙 */
  step?: number;
}>();

const showA = computed(() => step >= 1);
const showB = computed(() => step >= 2);
const showC = computed(() => step >= 3);
</script>

<template>
  <div class="quiz-row">
    <div class="quiz-item">
      <div class="quiz-label">甲</div>
      <svg viewBox="0 0 260 220" role="img" aria-label="甲图补全安培力方向">
        <rect
          x="30"
          y="30"
          width="200"
          height="150"
          rx="10"
          fill="color-mix(in srgb, var(--c-accent) 5%, transparent)"
          stroke="color-mix(in srgb, var(--c-accent) 26%, transparent)"
          stroke-width="1.2"
          stroke-dasharray="6 5"
        />
        <FieldDots
          :x="50"
          :y="48"
          dir="in"
          :cols="4"
          :rows="3"
          :spacing="44"
          :size="4"
          :line-width="1.3"
          opacity="0.75"
        />
        <text
          x="222"
          y="48"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="15"
          fill="var(--c-accent)"
        >
          B
        </text>
        <line
          x1="50"
          y1="150"
          x2="210"
          y2="150"
          stroke="var(--c-text-dim)"
          stroke-width="5"
          stroke-linecap="round"
        />
        <CourseArrow
          :from="{ x: 80, y: 150 }"
          :to="{ x: 170, y: 150 }"
          stroke="var(--c-accent-2)"
          :stroke-width="3"
          label="I"
          :label-dx="0"
          :label-dy="19"
        />
        <g v-show="showA">
          <CourseArrow
            :from="{ x: 125, y: 150 }"
            :to="{ x: 125, y: 72 }"
            stroke="var(--c-danger)"
            :stroke-width="3.2"
            label="F"
            :label-dx="13"
            :label-dy="0"
          />
        </g>
      </svg>
    </div>
    <div class="quiz-item">
      <div class="quiz-label">乙</div>
      <svg viewBox="0 0 260 220" role="img" aria-label="乙图补全磁场方向">
        <FieldMark
          :x="130"
          :y="110"
          dir="out"
          :r="13"
          :line-width="1.6"
          color="var(--c-accent-2)"
        />
        <text
          x="148"
          y="100"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="var(--c-accent-2)"
        >
          I
        </text>
        <CourseArrow
          :from="{ x: 130, y: 110 }"
          :to="{ x: 130, y: 190 }"
          stroke="var(--c-danger)"
          :stroke-width="3.2"
          label="F"
          :label-dx="14"
          :label-dy="0"
        />
        <g v-show="showB">
          <CourseArrow
            :from="{ x: 130, y: 110 }"
            :to="{ x: 42, y: 110 }"
            stroke="var(--c-accent)"
            :stroke-width="3.2"
            label="B"
            :label-dx="0"
            :label-dy="-13"
          />
        </g>
      </svg>
    </div>
    <div class="quiz-item">
      <div class="quiz-label">丙</div>
      <svg viewBox="0 0 260 220" role="img" aria-label="丙图补全电流方向">
        <CourseArrow
          :from="{ x: 130, y: 130 }"
          :to="{ x: 130, y: 52 }"
          stroke="var(--c-danger)"
          :stroke-width="3.2"
          label="F"
          :label-dx="14"
          :label-dy="0"
        />
        <CourseArrow
          :from="{ x: 130, y: 130 }"
          :to="{ x: 218, y: 130 }"
          stroke="var(--c-accent)"
          :stroke-width="3.2"
          label="B"
          :label-dx="0"
          :label-dy="-13"
        />
        <g v-show="showC">
          <FieldMark
            :x="130"
            :y="130"
            dir="out"
            :r="13"
            :line-width="1.6"
            color="var(--c-accent-2)"
            label="I"
            :label-size="16"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.quiz-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
  width: 100%;
}

.quiz-item {
  min-width: 0;
}

.quiz-label {
  margin-bottom: 0.1rem;

  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
}

.quiz-item svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
