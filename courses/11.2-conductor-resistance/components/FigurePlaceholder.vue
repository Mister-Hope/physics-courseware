<script setup lang="ts">
/** 题目图占位块：本课例题/习题待教师更换，题目图暂不重画。 换题后把本组件从页面里删掉、换成真正的图组件即可。 */
const { label = "题目图占位" } = defineProps<{ label?: string }>();
</script>

<template>
  <div class="figure-placeholder">
    <mdi-image-outline />
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.figure-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 6rem;
  border: 1px dashed var(--c-neutral-600);
  border-radius: 0.9rem;
  color: var(--c-text-dim);
  font-size: 1rem;
}
</style>
