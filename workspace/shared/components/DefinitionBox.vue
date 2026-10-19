<!--
  定义气泡（规范 D）：磨砂玻璃圆角气泡 + 左上角浮动标题（**跨在框边上，一半在框里、一半在框外**）+ 灯泡图标。

  用法（slides.md 里直接用，不用 import）：

    <DefinitionBox term="机械运动" tone="gold">

    <div>物体的<span class="def-term">空间位置随时间变化</span>，是自然界中最简单、最基本的运动形态。</div>

    </DefinitionBox>

  - `term` 必填：浮动标题文字；`tone`：`gold`（默认，--c-accent）/ `blue`（--c-accent-2）；
  - 正文里的术语用 `<span class="def-term">` 标主题色（自动跟随本气泡的 tone）；
  - 多个定义并排：外层套一个 `<div class="def-row">`（两列等高）；
  - ⛔ 浮动标题有一半在框外：气泡自带 margin-top 留位，别把它顶到页面标题行上；
  - ⛔ 标题必须有自己的不透明底（--c-surface-solid），压在玻璃框边上才不会糊；
  - 正文按 HTML 写（`$...$` 在 HTML 块里不生效，公式一律 `<Latex tex="…" />`）。
-->
<template>
  <div class="def-box" :class="`def-box--${tone}`">
    <div class="def-title">{{ term }}</div>
    <div class="def-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 浮动标题文字（定义的名字） */
    term: string;
    /** 主题色：gold = 强调金（默认），blue = 辅助蓝 */
    tone?: "gold" | "blue";
  }>(),
  { tone: "gold" },
);
</script>

<style>
/* 气泡本体：与提示气泡（.tip-hint 等）同一套玻璃语言 */
.def-box {
  position: relative;

  margin-top: 0.9rem;

  /* 内边距走变量：内容多的页调小（`--def-pad-y`），内容少的页调大；各课 `:root` 或单页元素上都能覆盖 */
  padding: var(--def-pad-y, 1.1rem) var(--def-pad-x, 1.35rem);
  border: 1px solid var(--def-border);
  border-radius: var(--radius-lg);

  background: var(--def-surface);

  backdrop-filter: blur(16px);
}

.def-box--gold {
  --def-tone: var(--c-accent);
  --def-border: var(--c-accent-border);
  --def-surface: var(--c-accent-soft);
}

.def-box--blue {
  --def-tone: var(--c-accent-2);
  --def-border: var(--c-accent-2-border);
  --def-surface: var(--c-accent-2-soft);
}

/* 浮动标题：一半在框外（top 取负值），左上角；自带不透明底 + 灯泡 */
.def-title {
  position: absolute;
  top: -0.8rem;
  left: 1.15rem;

  display: flex;
  gap: 0.4rem;
  align-items: center;

  padding: 0.18rem 0.8rem;
  border: 1px solid var(--def-border);
  border-radius: 2rem;

  background: var(--c-surface-solid);
  color: var(--def-tone);

  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 标题前的小灯泡：形状取共享图标正本 `--icon-tip`，颜色跟随 tone */
.def-title::before {
  content: "";

  flex: none;

  width: 0.95rem;
  height: 0.95rem;

  background-color: var(--def-tone);

  mask: var(--icon-tip) center / contain no-repeat;
}

.def-body {
  font-size: 1rem;
  line-height: 1.7;
}

/* 正文最后一段不必再留整段段距：正文写成 markdown 时（最常见）整块就是一个 `<p>`，
   而 p 带着自己的段距（Slidev 幻灯片根字号 22px ⇒ 1rem = 22px，实测段距就是 22px）——
   不压掉会拖出「内边距 17.6px + 段距 22px ≈ 40px」的底部空隙，气泡看着底下发空。
   收一半（0.5rem = 11px）即够分隔；`> p:last-child` 只在最后一项确实是段落时生效，
   正文以 `<div>` / hint 气泡收尾（如并排定义、带提示的定义）时不受影响。 */
.def-body > p:last-child {
  margin-bottom: 0.5rem;
}
</style>
