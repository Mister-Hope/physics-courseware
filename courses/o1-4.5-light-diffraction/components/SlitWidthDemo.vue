<!-- 4.5 光的衍射：单缝宽度与条纹宽度的定性交互（几何示意，不伪造光场） -->
<template>
  <div class="swd">
    <CourseSlider
      v-model="ratio"
      :min="1"
      :max="8"
      :step="0.5"
      label="缝宽"
      label-tex="d/\lambda"
      accent="gold"
    />
    <div class="swd-screen">
      <div class="swd-pattern">
        <div
          class="swd-bar swd-side"
          :style="{ width: sideWidth + '%', opacity: sideOpacity }"
        ></div>
        <div
          class="swd-bar swd-side"
          :style="{ width: sideWidth + '%', opacity: sideOpacity }"
        ></div>
        <div
          class="swd-bar swd-center"
          :style="{ width: centralWidth + '%', opacity: centerOpacity }"
        ></div>
        <div
          class="swd-bar swd-side"
          :style="{ width: sideWidth + '%', opacity: sideOpacity }"
        ></div>
        <div
          class="swd-bar swd-side"
          :style="{ width: sideWidth + '%', opacity: sideOpacity }"
        ></div>
      </div>
    </div>
    <div class="swd-meta">
      <span>缝宽与波长之比 <Latex tex="d/\lambda" />：{{ ratio.toFixed(1) }}</span>
      <span class="swd-status">{{ statusText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const ratio = ref(2);
const centralWidth = computed(() => Math.max(7, 56 / ratio.value));
const sideWidth = computed(() => Math.max(3, 9 / ratio.value));
const centerOpacity = computed(() => 0.35 + 0.65 * ((ratio.value - 1) / 7));
const sideOpacity = computed(() => 0.2 + 0.45 * ((ratio.value - 1) / 7));
const statusText = computed(() => {
  if (ratio.value <= 2.5) return "缝较窄：中央亮纹宽而暗";
  if (ratio.value >= 5) return "缝较宽：中央亮纹窄而亮";
  return "缝宽适中：条纹宽度居中";
});
</script>

<style scoped>
.swd {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}

.swd-screen {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 0.9rem;
  background: var(--c-neutral-900);
}

.swd-pattern {
  display: flex;
  gap: 0.45rem;
  align-items: center;
  justify-content: center;

  height: 6.8rem;
}

.swd-bar {
  flex: 0 0 auto;
  border-radius: 3px;
  background: var(--c-accent);
}

.swd-center {
  height: 100%;
}

.swd-side {
  height: 56%;
}

.swd-meta {
  display: flex;
  gap: 0.8rem;
  align-items: baseline;
  justify-content: space-between;

  color: var(--c-text-dim);

  font-size: 0.82rem;
}

.swd-status {
  color: var(--c-accent);
}
</style>
