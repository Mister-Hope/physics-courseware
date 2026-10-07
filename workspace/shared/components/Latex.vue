<template>
  <component
    :is="display ? 'div' : 'span'"
    class="latex"
    :class="{ 'latex-display': display }"
    v-html="html"
  />
</template>

<script setup lang="ts">
import { renderToString } from "katex";
import { computed } from "vue";

const { tex, display = false } = defineProps<{
  /** KaTeX 源码，如 `x_1`、`\Delta x = x_2 - x_1` */
  tex: string;
  /** 渲染为块级公式（居中、独立成行） */
  display?: boolean;
}>();

// 只输出 HTML：默认的 htmlAndMathml 会额外塞一份 MathML，课件里用不上还会引入重复字体
const html = computed(() =>
  renderToString(tex, { displayMode: display, throwOnError: false, output: "html" }),
);
</script>

<style scoped>
.latex :deep(.katex) {
  font-size: 1em;
}

.latex-display {
  margin: 0.4rem 0;
  text-align: center;
}
</style>
