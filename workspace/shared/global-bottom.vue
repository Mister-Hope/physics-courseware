<!--
  共享 addon 的默认底栏层：所有课件都由它渲染（没有单课自己的 `global-bottom.vue` 时）。

  Slidev 会把 addon 根目录的 global-bottom.vue 与课件自己的 global-bottom.vue **一起**渲染；两条装饰线
  叠在一起会把渐隐线加亮，所以这里挂载后检查同一父节点下是否还有别的底栏：有就让位。
-->
<template>
  <div v-if="visible" ref="layer" class="shared-global-bottom">
    <CourseBottomBar />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const layer = ref<HTMLElement | null>(null);
const visible = ref(true);

onMounted(async () => {
  await nextTick();

  const parent = layer.value?.parentElement;

  if (!parent) return;

  const hasOwnBottomBar = [...parent.children].some(
    (child) => child !== layer.value && child.classList.contains("global-bottom"),
  );

  if (hasOwnBottomBar) visible.value = false;
});
</script>
