<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 「运动的分类」板书树：先按 a 与 v 是否共线分两大类，再把直线运动按 a 是否恒定细分。
 *
 * 由页面 $clicks 驱动（slides.md 里使用该组件的页面 frontmatter 必须写 clicks: 4）： 0 → 只有根节点「运动」 1 → 分出「曲线运动 / 直线运动」
 * 2 → 直线运动下分出「匀速 / 匀变速 / 非匀变速」 3 → 匀变速下分出「匀加速 / 匀减速」 4 → 强调匀变速这一支，并在底部给出判断依据
 *
 * 分步只切 visibility、绝不增删节点：隐藏的节点仍占原来的位置， 因此相邻两次点击之间，已经可见的元素一动不动（不能用条件渲染真删真插）。
 * 连线是伪元素，跟着各自节点同一步出现，不会单独把版面顶跑。
 */
const { $clicks } = useSlideContext();
const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 4)));

/**
 * 第 from 步起可见；不到就占着位置但不可见
 *
 * @param from 起始步号（含）
 * @returns 未到时返回隐藏类对象
 */
const vis = (from: number): Record<string, boolean> =>
  step.value >= from ? {} : { "ua-tree-hidden": true };
</script>

<template>
  <div class="ua-tree">
    <div class="ua-tree-tree">
      <!-- 根：运动 -->
      <div class="ua-tree-root-col">
        <div
          class="ua-tree-node ua-tree-node-root ua-tree-node-stub"
          :class="{ 'ua-tree-stub-on': step >= 1 }"
        >
          <span class="ua-tree-label">运动</span>
        </div>
      </div>

      <!-- 第 1 层：按 a 与 v 是否共线分成两大类 -->
      <div class="ua-tree-col">
        <div class="ua-tree-item" :class="vis(1)">
          <div class="ua-tree-node">
            <span class="ua-tree-label">曲线运动</span>
            <span class="ua-tree-note ua-tree-note-curve"
              ><Latex tex="a" /> 与 <Latex tex="v" /> 不共线</span
            >
          </div>
        </div>

        <div class="ua-tree-item ua-tree-item-row" :class="vis(1)">
          <div class="ua-tree-node ua-tree-node-stub" :class="{ 'ua-tree-stub-on': step >= 2 }">
            <span class="ua-tree-label">直线运动</span>
            <span class="ua-tree-note ua-tree-note-line"
              ><Latex tex="a" /> 与 <Latex tex="v" /> 共线</span
            >
          </div>

          <!-- 第 2 层：直线运动按 a 是否恒定细分 -->
          <div class="ua-tree-col">
            <div class="ua-tree-item" :class="vis(2)">
              <div class="ua-tree-node">
                <span class="ua-tree-label">匀速直线运动</span>
                <span class="ua-tree-note ua-tree-note-uniform"><Latex tex="a = 0" /></span>
              </div>
            </div>

            <div class="ua-tree-item ua-tree-item-row" :class="vis(2)">
              <div
                class="ua-tree-node ua-tree-node-stub"
                :class="[{ 'ua-tree-stub-on': step >= 3 }, { 'ua-tree-emph': step >= 4 }]"
              >
                <span class="ua-tree-label">匀变速直线运动</span>
                <span class="ua-tree-note ua-tree-note-variable"
                  ><Latex tex="a" /> 恒定，<Latex tex="a \ne 0"
                /></span>
              </div>

              <!-- 第 3 层：匀变速再分加、减 -->
              <div class="ua-tree-col">
                <div class="ua-tree-item" :class="vis(3)">
                  <div class="ua-tree-node" :class="{ 'ua-tree-emph-soft': step >= 4 }">
                    <span class="ua-tree-label">匀加速直线运动</span>
                    <span class="ua-tree-note ua-tree-note-accel"
                      ><Latex tex="a" /> 与 <Latex tex="v" /> 同向</span
                    >
                  </div>
                </div>

                <div class="ua-tree-item" :class="vis(3)">
                  <div class="ua-tree-node" :class="{ 'ua-tree-emph-soft': step >= 4 }">
                    <span class="ua-tree-label">匀减速直线运动</span>
                    <span class="ua-tree-note ua-tree-note-decel"
                      ><Latex tex="a" /> 与 <Latex tex="v" /> 反向</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="ua-tree-item" :class="vis(2)">
              <div class="ua-tree-node">
                <span class="ua-tree-label">非匀变速直线运动</span>
                <span class="ua-tree-note ua-tree-note-nonuniform"><Latex tex="a" /> 非恒量</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第 4 步：结论条（一直占位，第 4 步才可见） -->
    <div class="ua-tree-conclusion" :class="vis(4)">
      判断匀变速：<Latex tex="a" /> 与 <Latex tex="v" /> 共线，且加速度恒定不变
    </div>
  </div>
</template>

<style scoped>
.ua-tree {
  /* 列间距：所有连线都画在这段空隙里；同列节点的纵向间距 */
  --ua-tree-gap: 1.7rem;
  --ua-tree-vgap: 0.22rem;
  display: flex;
  flex-direction: column;
  gap: 0.26rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

/* ── 四列主干：运动 → 曲线/直线 → 匀速/匀变速/非匀变速 → 匀加速/匀减速 ── */
.ua-tree-tree {
  display: flex;
  gap: var(--ua-tree-gap);
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
}

.ua-tree-root-col {
  display: flex;
  align-items: center;
}

.ua-tree-col {
  display: flex;
  flex-direction: column;
  gap: var(--ua-tree-vgap);
  justify-content: center;
}

/* 叶子节点撑满本列宽度，同列卡片左右对齐；带子列的行按内容宽度排版 */
.ua-tree-item {
  position: relative;
  display: flex;
  align-items: center;
}

.ua-tree-item-row {
  gap: var(--ua-tree-gap);
}

/* ── 节点卡片 ── */
.ua-tree-node {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  align-items: center;

  padding: 0.26rem 0.85rem;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);

  text-align: center;
  white-space: nowrap;

  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* 行内节点不参与压缩（放在 .ua-tree-node 之后：specificity 必须升序，否则 stylelint 报 no-descending-specificity） */
.ua-tree-item > .ua-tree-node {
  flex: 0 0 auto;
}

.ua-tree-label {
  color: var(--c-text);
  font-weight: 600;
  font-size: 0.97rem;
  line-height: 1.15;
}

.ua-tree-note {
  color: var(--c-text-dim);
  font-size: 0.79rem;
  line-height: 1.15;
}

.ua-tree-node-root {
  padding: 0.46rem 1.05rem;
  border-color: rgb(226 168 70 / 38%);
  background: linear-gradient(135deg, rgb(226 168 70 / 16%), rgb(226 168 70 / 5%));
  box-shadow: 0 0 22px rgb(226 168 70 / 12%);
}

.ua-tree-node-root .ua-tree-label {
  color: var(--c-accent);
  font-size: 1.05rem;
  letter-spacing: 0.08em;
}

/* 第 4 步：匀变速这一支的强调态（只改颜色/发光，不动占位尺寸） */
.ua-tree-node.ua-tree-emph {
  border-color: var(--c-accent);
  background: linear-gradient(135deg, rgb(226 168 70 / 20%), rgb(226 168 70 / 6%));
  box-shadow:
    0 0 0 1px rgb(226 168 70 / 35%),
    0 0 20px rgb(226 168 70 / 30%);
}

.ua-tree-node.ua-tree-emph .ua-tree-label {
  color: var(--c-accent);
}

.ua-tree-node.ua-tree-emph-soft {
  border-color: rgb(226 168 70 / 50%);
  background: rgb(226 168 70 / 8%);
}

/* ── 连线：全部是伪元素，不占版面位置 ── */

/* 子节点到本列竖线的一小段横线 */
.ua-tree-col > *::before {
  content: "";

  position: absolute;
  top: 50%;
  left: calc(-0.5 * var(--ua-tree-gap));

  width: calc(0.5 * var(--ua-tree-gap));
  height: 1.5px;

  background: var(--c-text-dim);

  opacity: 0.35;

  transform: translateY(-50%);
}

/* 本列竖线：从第一个子节点中心拉到最后一个子节点中心 */
.ua-tree-col > *::after {
  content: "";

  position: absolute;
  top: calc(-1 * var(--ua-tree-vgap));
  bottom: calc(-1 * var(--ua-tree-vgap));
  left: calc(-0.5 * var(--ua-tree-gap) - 0.75px);

  width: 1.5px;

  background: var(--c-text-dim);

  opacity: 0.35;
}

.ua-tree-col > *:first-child::after {
  top: 50%;
}

.ua-tree-col > *:last-child::after {
  bottom: 50%;
}

/* 有子列的分支节点：向右伸出一小段接上下一列的竖线 */
.ua-tree-node-stub::after {
  content: "";

  position: absolute;
  top: 50%;
  left: 100%;

  width: calc(0.5 * var(--ua-tree-gap));
  height: 1.5px;

  background: var(--c-text-dim);

  opacity: 0.35;
  visibility: hidden;

  transform: translateY(-50%);
}

.ua-tree-node-stub.ua-tree-stub-on::after {
  visibility: visible;
}

/* ── 底部结论条 ── */
.ua-tree-conclusion {
  width: 100%;
  padding: 0.26rem 0.9rem;
  border: 1.5px solid rgb(226 168 70 / 42%);
  border-radius: var(--radius-md);

  background: rgb(226 168 70 / 8%);
  color: var(--c-text);

  font-size: 0.95rem;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
}

/* 副注的专属修饰类（--curve / --line / --uniform / --variable / --nonuniform / --accel / --decel）：
   既是按分支单独调样式的钩子，也让 e2e 的"稳定标识"能区分不同节点里的同名符号——
   span.latex 的文本都是 a / v，而稳定标识只回溯 3 层祖先，不加修饰类就会互相错配、报出假位移。 */

/* 隐藏态：仍然占着原来的位置，只是看不见 */
.ua-tree-hidden {
  visibility: hidden;
}
</style>
