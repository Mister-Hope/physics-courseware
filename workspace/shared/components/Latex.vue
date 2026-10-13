<template>
  <component
    :is="display ? 'div' : 'span'"
    class="latex"
    :class="{ 'latex-display': display }"
    v-html="html"
  />
</template>

<script setup lang="ts">
import { KATEX_DISPLAY, KATEX_INLINE } from "virtual:courseware-katex-html";
import { computed, ref, watchEffect } from "vue";

const { tex, display = false } = defineProps<{
  /** KaTeX 源码，如 `x_1`、`\Delta x = x_2 - x_1` */
  tex: string;
  /** 渲染为块级公式（居中、独立成行） */
  display?: boolean;
}>();

/**
 * 静态公式在 build 期由共享 addon 的 vite 插件预渲染好（`virtual:courseware-katex-html`）， 运行时直接查表 —— 这样课件不必打包
 * katex；只有动态绑定（`:tex="..."`）的值查不到时才懒加载 katex。
 */
const preset = computed(() => (display ? KATEX_DISPLAY[tex] : KATEX_INLINE[tex]));
const lazyHtml = ref("");

watchEffect(() => {
  /**
   * ⚠️ 必须在**同步阶段**先把 tex / display 读出来，它们才会被登记为依赖。 若只在 `import("katex").then(...)` 里读，props
   * 变化不会重跑这个 effect —— 动态公式（`:tex="…"`）会永远停在首次渲染的值上（拖动滑块数值不变，踩过）。
   */
  const source = tex;
  const mode = display;

  if (preset.value) {
    lazyHtml.value = "";
    return;
  }

  let cancelled = false;

  void import("katex").then(({ renderToString }) => {
    if (cancelled) return;

    // 只输出 HTML：默认的 htmlAndMathml 会额外塞一份 MathML，课件里用不上还会引入重复字体
    lazyHtml.value = renderToString(source, {
      displayMode: mode,
      throwOnError: false,
      output: "html",
    });
  });

  return (): void => {
    cancelled = true;
  };
});

const html = computed(() => preset.value ?? lazyHtml.value);
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
