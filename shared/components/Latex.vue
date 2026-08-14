<script setup lang="ts">
import katex from "katex";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** LaTeX 源码（不含 $ 包裹符） */
    tex: string;
    /** 是否块级展示（默认行内） */
    display?: boolean;
  }>(),
  { display: false },
);

const html = computed<string>(() =>
  katex.renderToString(props.tex, {
    throwOnError: false,
    displayMode: props.display,
  }),
);
</script>

<template>
  <span v-html="html" class="latex" :class="{ 'latex-display': display }" />
</template>

<style scoped>
.latex-display {
  display: block;
  text-align: center;
  margin: 0.4rem 0;
}
</style>
