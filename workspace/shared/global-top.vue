<!--
  共享 addon 的默认顶栏层：所有课件都由它渲染（没有单课自己的 `global-top.vue` 时；参数全部从 slides.md
  headmatter 的 `chapter` / `title` 自动读取，见 components/CourseTopBar.vue）。

  Slidev 会把 addon 根目录的 global-top.vue 与课件自己的 global-top.vue **一起**渲染，所以这里挂载后检查
  同一父节点下是否还有别的顶栏：有就让位（单课确有特殊需求时自己放一个即可覆盖，不会叠出两条顶栏）。
-->
<template>
  <div v-if="visible" ref="layer" class="shared-global-top">
    <CourseTopBar />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const layer = ref<HTMLElement | null>(null);
const visible = ref(true);

onMounted(async () => {
  // 同一批挂载的兄弟组件在本轮渲染结束后全部就位，再判断才看得到课件自己的顶栏
  await nextTick();

  const parent = layer.value?.parentElement;

  if (!parent) return;

  const hasOwnTopBar = [...parent.children].some(
    (child) => child !== layer.value && child.classList.contains("global-top"),
  );

  if (hasOwnTopBar) visible.value = false;
});
</script>
