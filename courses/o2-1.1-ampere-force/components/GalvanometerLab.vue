<!-- 第 13–14 页：磁电式电流表工作原理（辐向磁场、线圈受力、指针偏转） -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  step: { type: Number, default: 0 },
  current: { type: Number, default: 60 },
  showSlider: { type: Boolean, default: false },
});
const emit = defineEmits(["update:current"]);

const angle = computed(() => -0.45 * props.current);
const showField = computed(() => props.step >= 1);
const showCurrent = computed(() => props.step >= 2);
const showForce = computed(() => props.step >= 3);
const showDial = computed(() => (props.showSlider ? true : props.step >= 4));
const currentModel = computed({
  get: () => props.current,
  set: (v) => emit("update:current", v),
});
</script>

<template>
  <div class="gal-lab">
    <svg viewBox="0 0 480 340" class="course-fig" role="img" aria-label="磁电式电流表工作原理示意">
      <!-- 辐向磁场 -->
      <g v-show="showField">
        <CourseArrow
          :from="{ x: 92, y: 140 }"
          :to="{ x: 178, y: 160 }"
          stroke="var(--c-field)"
          :stroke-width="1.6"
          :head-size="7"
        />
        <CourseArrow
          :from="{ x: 92, y: 230 }"
          :to="{ x: 178, y: 250 }"
          stroke="var(--c-field)"
          :stroke-width="1.6"
          :head-size="7"
        />
        <CourseArrow
          :from="{ x: 388, y: 140 }"
          :to="{ x: 302, y: 160 }"
          stroke="var(--c-field)"
          :stroke-width="1.6"
          :head-size="7"
        />
        <CourseArrow
          :from="{ x: 388, y: 230 }"
          :to="{ x: 302, y: 250 }"
          stroke="var(--c-field)"
          :stroke-width="1.6"
          :head-size="7"
        />
        <text
          x="240"
          y="300"
          text-anchor="middle"
          fill="var(--c-field)"
          font-size="15"
          font-family="KaTeX_Math"
          font-style="italic"
        >
          B
        </text>
      </g>
      <!-- 磁极与软铁芯 -->
      <rect
        x="42"
        y="120"
        width="42"
        height="150"
        rx="7"
        fill="var(--c-danger)"
        opacity="0.16"
        stroke="var(--c-danger)"
        stroke-width="1.6"
      />
      <text
        x="63"
        y="200"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--c-danger)"
        font-size="18"
        font-weight="700"
      >
        N
      </text>
      <rect
        x="396"
        y="120"
        width="42"
        height="150"
        rx="7"
        fill="var(--c-accent-2)"
        opacity="0.16"
        stroke="var(--c-accent-2)"
        stroke-width="1.6"
      />
      <text
        x="417"
        y="200"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--c-accent-2)"
        font-size="18"
        font-weight="700"
      >
        S
      </text>
      <circle
        cx="240"
        cy="220"
        r="46"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-dim)"
        stroke-width="1.8"
      />
      <!-- 线圈两侧 -->
      <rect
        x="196"
        y="180"
        width="17"
        height="80"
        rx="4"
        fill="var(--c-accent-2)"
        opacity="0.28"
        stroke="var(--c-accent-2)"
        stroke-width="1.6"
      />
      <rect
        x="267"
        y="180"
        width="17"
        height="80"
        rx="4"
        fill="var(--c-accent-2)"
        opacity="0.28"
        stroke="var(--c-accent-2)"
        stroke-width="1.6"
      />
      <FieldMark v-show="showCurrent" :x="204" :y="220" dir="in" :r="10" label="" />
      <FieldMark v-show="showCurrent" :x="276" :y="220" dir="out" :r="10" label="" />
      <!-- 安培力：左侧向下、右侧向上 -->
      <g v-show="showForce">
        <CourseArrow
          :from="{ x: 204, y: 300 }"
          :to="{ x: 204, y: 268 }"
          stroke="var(--c-force)"
          :stroke-width="2.6"
          label="F"
        />
        <CourseArrow
          :from="{ x: 276, y: 140 }"
          :to="{ x: 276, y: 172 }"
          stroke="var(--c-force)"
          :stroke-width="2.6"
          label="F"
        />
      </g>
      <!-- 指针与表盘 -->
      <g v-show="showDial">
        <Galvanometer :x="240" :y="62" :r="34" :angle="angle" />
      </g>
    </svg>
    <div v-if="showSlider" class="gal-control">
      <CourseSlider
        v-model="currentModel"
        label="电流"
        label-tex="I"
        :min="-100"
        :max="100"
        :step="5"
        accent="blue"
        label-width="4.6rem"
      >
        <template #value>{{ currentModel }} μA</template>
      </CourseSlider>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.gal-lab {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}
.gal-control {
  max-width: 24rem;
}
</style>
