<!-- 第 14 页：电流表指针随电流偏转的交互表盘（固定公式 angle = -0.45 * I，I 单位 μA） -->
<script setup>
import { computed, ref } from "vue";

const current = ref(60);
const angle = computed(() => -0.45 * current.value);
</script>

<template>
  <div class="gal-interactive">
    <svg viewBox="0 0 480 220" class="course-fig" role="img" aria-label="电流表指针随电流偏转">
      <Galvanometer :x="240" :y="110" :r="60" :angle="angle" />
    </svg>
    <CourseSlider
      v-model="current"
      label="电流"
      label-tex="I"
      :min="-100"
      :max="100"
      :step="5"
      accent="blue"
      label-width="8rem"
    />
  </div>
</template>

<style scoped>
.gal-interactive {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: min(100%, 20rem);
  margin: 0 auto;
}
</style>
