<!--
  思考页布局：整页只有一个大问题 / 大操作指引，垂直居中、顶天立地（教师会在学生讨论时长时间停留）。
  可选具名 slot：#icon（大号图标，常显）、#hint（讨论提示，点击后出）、#answer（讨论后的解析，点击后出）。
  默认 slot = 问题文字本身（用 .text-4xl / .text-5xl 放大）。写法见 .agents/notes/exercise-layouts.md。
-->
<template>
  <div class="slidev-layout focus-question">
    <div class="fq-center">
      <div v-if="hasIcon" class="fq-icon">
        <slot name="icon" />
      </div>

      <div class="fq-question text-4xl">
        <slot />
      </div>

      <div v-if="hasHint" class="fq-hint" v-click>
        <slot name="hint" />
      </div>

      <div v-if="hasAnswer" class="fq-answer" v-click>
        <slot name="answer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";
import { Comment, Fragment, Text, computed, useSlots } from "vue";

const slots = useSlots();

/**
 * Slot 里是否有真实内容（注释节点/纯空白不算）——空 slot 直接不渲染，避免留空容器
 *
 * @param nodes Slot 产出的 VNode 列表
 * @returns 有真实内容时为 `true`
 */
const hasRealContent = (nodes: VNode[] | undefined): boolean => {
  if (!nodes) return false;
  return nodes.some((node) => {
    if (!node) return false;
    if (node.type === Comment) return false;
    if (node.type === Text) return String(node.children ?? "").trim() !== "";
    if (node.type === Fragment) return hasRealContent(node.children as VNode[]);
    return true;
  });
};

const hasIcon = computed(() => hasRealContent(slots.icon?.()));
const hasHint = computed(() => hasRealContent(slots.hint?.()));
const hasAnswer = computed(() => hasRealContent(slots.answer?.()));
</script>

<style>
/* 页面外壳：整页垂直+水平居中；内边距沿用 common.css 的 .slidev-layout（!important），不要覆盖 */
.slidev-layout.focus-question {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 内容列：图标 → 大问题 →（点击出）提示/解析；不加任何背景/圆角容器。
   flex:1 是关键：它把整页高度撑开，根元素的 justify-content:center 才能把内容真正垂直居中
   （少了它内容会堆在顶部、下面留一大片空）。 */
.fq-center {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 1.4rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 0 auto;
}

/* 大图标：用 icon-* 阶梯放大（common.css 给 svg 钉了 16px 基准，普通字号压不过它）；
   这里兜底 4rem，页面里给图标换 .icon-2xl 等可覆盖 */
.fq-icon svg {
  color: var(--c-accent);
  font-size: 4rem !important;
}

/* 问题文字：默认 .text-4xl（2.1rem）；整页更空时在默认 slot 里包一层 <div class="text-5xl"> 即可放大 */
.fq-question {
  max-width: 46rem;
  font-weight: 700;
  line-height: 1.45;
  text-align: center;
}

/* 顶部一段、下面两段点击出的节奏；提示弱化为次级色，解析恢复正常正文色 */
.fq-hint {
  max-width: 40rem;

  color: var(--c-text-dim);

  font-size: 1.05rem;
  line-height: 1.6;
  text-align: center;
}

/* 讨论后的解析：整页居中的大问题之下，用正文色 + 居中排；⛔ 不套左侧竖线
   （教师明确要求：左侧竖线只给弱提示性文字用，解析是主体内容，不该套） */
.fq-answer {
  max-width: 44rem;
  font-size: 1.05rem;
  line-height: 1.7;
  text-align: center;
}
</style>
