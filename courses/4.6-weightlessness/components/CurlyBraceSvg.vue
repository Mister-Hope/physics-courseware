<script setup lang="ts">
/**
 * 竖向花括号（把"上升过程 / 下降过程"和它下面的三个阶段括在一起）
 *
 * 只能在 `<svg>` 里用；`preserveAspectRatio="none"` 让它跟着右侧条目列的高度拉伸。
 */
</script>

<template>
  <svg class="curly-brace" viewBox="0 0 18 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M 17 2 C 9 2 11 16 11 26 L 11 42 C 11 48 5 50 2 50 C 5 50 11 52 11 58 L 11 74 C 11 84 9 98 17 98"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.curly-brace {
  display: block;
  align-self: stretch;

  width: 14px;
  min-height: 4.5rem;

  color: var(--c-neutral-500);
}
</style>
