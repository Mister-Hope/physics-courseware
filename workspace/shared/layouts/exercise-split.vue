<!--
  题目页布局：题干整宽在最上 + 一侧窄示意图 + 剩余空间给解析。
  给"一道题占一页、题干与题目图常显、解析点击分步出"的页面用（headmatter 写 layout: exercise-split）。
  #fig 为空时自动退化成整宽解析；具名 slot 的写法见 .agents/notes/exercise-layouts.md（⚠️ 不能写 <template #stem>）。
-->
<template>
  <div class="slidev-layout exercise-split">
    <div class="ex-stem">
      <slot name="stem" />
    </div>
    <div class="ex-body">
      <div v-if="hasFig" class="ex-fig">
        <slot name="fig" />
      </div>
      <div class="ex-analysis page-grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";
import { Comment, Fragment, Text, computed, useSlots } from "vue";

const slots = useSlots();

/** Slot 里是否有真实内容（注释节点/纯空白不算）——用于 #fig 缺省时自动整宽 */
function hasRealContent(nodes: VNode[] | undefined): boolean {
  if (!nodes) return false;
  return nodes.some((node) => {
    if (!node) return false;
    if (node.type === Comment) return false;
    if (node.type === Text) return String(node.children ?? "").trim() !== "";
    if (node.type === Fragment) return hasRealContent(node.children as VNode[]);
    return true;
  });
}

/** 题目图存在才渲染图栏；否则解析栏自动吃掉整行 */
const hasFig = computed(() => hasRealContent(slots.fig?.()));
</script>

<style>
/* 页面外壳：题干行 + 下方两栏。内边距沿用 common.css 的 .slidev-layout（!important），这里不要覆盖 */
.slidev-layout.exercise-split {
  display: flex;
  flex-direction: column;
  gap: var(--page-gap);
}

/* 题干行：整宽置顶、不参与拉伸。
   ⛔ 不套边框/竖线：题干是这一页的主体，不是弱提示（教师明确要求：左侧竖线只给弱提示性文字用）。
   题干视觉靠字号与留白立住，与页面其它内容的区分由位置（置顶整宽）承担。 */
.ex-stem {
  flex: none;
  min-width: 0;
}

/* 下方两栏：图栏自适应窄、解析栏吃掉剩余空间 */
.ex-body {
  display: flex;
  flex: 1 1 auto;
  gap: 1.6rem;
  align-items: stretch;

  min-height: 0;
}

/* 图栏：宽度按图自身尺寸收（max-content）、上限 42%；不加背景/边框，无缝嵌入页面 */
.ex-fig {
  flex: none;
  width: max-content;
  max-width: 42%;
  min-width: 0;
  align-self: center;
}

/* 图栏里的 svg 只负责占满栏宽、保持比例，不加装饰（作者组件自带的 width/max-width 优先生效） */
.ex-fig svg {
  display: block;
  height: auto;
  max-width: 100%;
}

/* 解析栏：复用共享 .page-grow（内容少时垂直居中、多时撑满，e2e 的"正文越界"检查照常生效）；
   这里补两个防撑爆约束——长公式/长链接不可把栏撑出画布 */
.ex-analysis {
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
