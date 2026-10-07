<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 16 页：力的分解——已知条件不同，解的个数也不同。
 *
 * 三栏各配一个小图，点击节奏完全按上课顺序来（页面 frontmatter 写 `clicks: 6`）：
 *
 * - 第 1 次点击：三个白字问题（已知什么条件，解有几个？）
 * - 第 2 次点击：三张图
 * - 第 3/4/5 次点击：三个黄字结论
 * - 第 6 次点击由页面给出这一页的落点
 *
 * 三个结论分别是： ① 已知两个分力的**方向** → 唯一解（由合力末端向两方向引平行线，只有一个平行四边形） ② 已知两个分力的**大小** → 以合力两端为圆心作圆，平面内 4
 * 个解、空间中无数个解 ③ 已知一个分力的**大小和方向** → 另一个分力随之确定，唯一解
 *
 * 分步只切 `visibility`，三个小图始终占位，不出画布、不顶跑已有元素。
 */
const { $clicks } = useSlideContext();

const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 5)));

const rad = (deg: number): number => (deg * Math.PI) / 180;

/* ── ① 已知两个分力的方向 ── */
const A_O = { x: 40, y: 164 };
const A_F = { x: 130, y: -112 };
const A_R1 = { x: Math.cos(rad(15)), y: -Math.sin(rad(15)) };
const A_R2 = { x: Math.cos(rad(70)), y: -Math.sin(rad(70)) };

const caseA = computed(() => {
  const det = A_R1.x * A_R2.y - A_R2.x * A_R1.y;
  const a = (A_F.x * A_R2.y - A_R2.x * A_F.y) / det;
  const b = (A_R1.x * A_F.y - A_F.x * A_R1.y) / det;

  return {
    tip: { x: A_O.x + A_F.x, y: A_O.y + A_F.y },
    pointA: { x: A_O.x + a * A_R1.x, y: A_O.y + a * A_R1.y },
    pointB: { x: A_O.x + b * A_R2.x, y: A_O.y + b * A_R2.y },
    ray1: { x: A_O.x + 150 * A_R1.x, y: A_O.y + 150 * A_R1.y },
    ray2: { x: A_O.x + 150 * A_R2.x, y: A_O.y + 150 * A_R2.y },
  };
});

/* ── ② 已知两个分力的大小 ── */
const B_O = { x: 82, y: 140 };
const B_T = { x: 82, y: 56 };
const B_R = 54;

const caseB = computed(() => {
  const half = (B_T.y - B_O.y) / 2;
  const h = Math.sqrt(B_R ** 2 - half ** 2);
  const centerX = B_O.x;
  const centerY = (B_O.y + B_T.y) / 2;

  return {
    left: { x: centerX - h, y: centerY },
    right: { x: centerX + h, y: centerY },
  };
});

/* ── ③ 已知一个分力的大小和方向 ── */
const C_O = { x: 44, y: 176 };
/** 合力：从 C_O 指向 C_T */
const C_F = { x: 140, y: -80 };
const C_T = { x: C_O.x + C_F.x, y: C_O.y + C_F.y };
const C_DIR = rad(62);
const C_LEN = 95;
const C_P1 = {
  x: C_O.x + C_LEN * Math.cos(C_DIR),
  y: C_O.y - C_LEN * Math.sin(C_DIR),
};
</script>

<template>
  <div class="dc-wrap">
    <div class="dc-case">
      <div class="dc-title" :class="{ 'dc-hidden': step < 1 }">已知两个分力的方向，解有几个？</div>
      <div class="dc-figure" :class="{ 'dc-hidden': step < 2 }">
        <svg viewBox="0 0 260 200">
          <line
            :x1="A_O.x"
            :y1="A_O.y"
            :x2="caseA.ray1.x"
            :y2="caseA.ray1.y"
            stroke="var(--c-accent)"
            stroke-width="1.6"
            stroke-dasharray="6 5"
            opacity="0.65"
          />
          <line
            :x1="A_O.x"
            :y1="A_O.y"
            :x2="caseA.ray2.x"
            :y2="caseA.ray2.y"
            stroke="var(--c-accent-2)"
            stroke-width="1.6"
            stroke-dasharray="6 5"
            opacity="0.65"
          />
          <line
            :x1="caseA.pointA.x"
            :y1="caseA.pointA.y"
            :x2="caseA.tip.x"
            :y2="caseA.tip.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.3"
            stroke-dasharray="5 5"
            opacity="0.6"
          />
          <line
            :x1="caseA.pointB.x"
            :y1="caseA.pointB.y"
            :x2="caseA.tip.x"
            :y2="caseA.tip.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.3"
            stroke-dasharray="5 5"
            opacity="0.6"
          />
          <CourseArrow
            :from="A_O"
            :to="caseA.tip"
            stroke="var(--c-physics)"
            stroke-width="3"
            pointer-events="none"
          />
          <CourseArrow
            :from="A_O"
            :to="caseA.pointA"
            stroke="var(--c-accent)"
            stroke-width="3"
            pointer-events="none"
          />
          <CourseArrow
            :from="A_O"
            :to="caseA.pointB"
            stroke="var(--c-accent-2)"
            stroke-width="3"
            pointer-events="none"
          />
          <circle :cx="A_O.x" :cy="A_O.y" r="3" fill="var(--c-text)" />
        </svg>
        <ChartLabel
          :visible="step >= 2"
          :x-percent="(caseA.tip.x / 260) * 100"
          :y-percent="(caseA.tip.y / 200) * 100"
          :parts="[{ tex: 'F' }]"
          anchor="top-right"
          :dx="4"
          color="var(--c-physics)"
          halo
        />
        <ChartLabel
          :visible="step >= 2"
          :x-percent="(caseA.pointA.x / 260) * 100"
          :y-percent="(caseA.pointA.y / 200) * 100"
          :parts="[{ tex: 'F_1' }]"
          anchor="bottom-left"
          color="var(--c-accent)"
        />
        <ChartLabel
          :visible="step >= 2"
          :x-percent="(caseA.pointB.x / 260) * 100"
          :y-percent="(caseA.pointB.y / 200) * 100"
          :parts="[{ tex: 'F_2' }]"
          anchor="top-left"
          :dx="-6"
          color="var(--c-accent-2)"
        />
      </div>
      <div class="dc-verdict" :class="{ 'dc-hidden': step < 3 }">唯一解</div>
    </div>

    <div class="dc-case">
      <div class="dc-title" :class="{ 'dc-hidden': step < 1 }">已知两个分力的大小，解有几个？</div>
      <div class="dc-figure" :class="{ 'dc-hidden': step < 2 }">
        <svg viewBox="0 0 260 200">
          <circle
            :cx="B_O.x"
            :cy="B_O.y"
            :r="B_R"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.5"
            stroke-dasharray="6 5"
            opacity="0.6"
          />
          <circle
            :cx="B_T.x"
            :cy="B_T.y"
            :r="B_R"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.5"
            stroke-dasharray="6 5"
            opacity="0.6"
          />
          <line
            :x1="B_O.x"
            :y1="B_O.y"
            :x2="caseB.left.x"
            :y2="caseB.left.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.3"
            stroke-dasharray="5 5"
            opacity="0.55"
          />
          <line
            :x1="B_T.x"
            :y1="B_T.y"
            :x2="caseB.left.x"
            :y2="caseB.left.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.3"
            stroke-dasharray="5 5"
            opacity="0.55"
          />
          <line
            :x1="B_O.x"
            :y1="B_O.y"
            :x2="caseB.right.x"
            :y2="caseB.right.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.3"
            stroke-dasharray="5 5"
            opacity="0.55"
          />
          <line
            :x1="B_T.x"
            :y1="B_T.y"
            :x2="caseB.right.x"
            :y2="caseB.right.y"
            stroke="var(--c-text-dim)"
            stroke-width="1.3"
            stroke-dasharray="5 5"
            opacity="0.55"
          />
          <CourseArrow
            :from="B_O"
            :to="B_T"
            stroke="var(--c-physics)"
            stroke-width="3"
            pointer-events="none"
          />
          <circle :cx="caseB.left.x" :cy="caseB.left.y" r="4" fill="var(--c-accent)" />
          <circle :cx="caseB.right.x" :cy="caseB.right.y" r="4" fill="var(--c-accent-2)" />
          <circle :cx="B_O.x" :cy="B_O.y" r="3" fill="var(--c-text)" />
        </svg>
        <ChartLabel
          :visible="step >= 2"
          :x-percent="((B_T.x + 8) / 260) * 100"
          :y-percent="((B_T.y + 26) / 200) * 100"
          :parts="[{ tex: 'F' }]"
          anchor="right"
          :dx="6"
          color="var(--c-physics)"
          halo
        />
        <ChartLabel
          :visible="step >= 2"
          :x-percent="(caseB.left.x / 260) * 100"
          :y-percent="(caseB.left.y / 200) * 100"
          :parts="[{ text: '交于两点' }]"
          anchor="bottom-left"
          :dy="8"
          :size="14"
          color="var(--c-text-dim)"
        />
      </div>
      <div class="dc-verdict" :class="{ 'dc-hidden': step < 4 }">
        <div>平面内 4 个解</div>
        <div class="dc-verdict-sub">空间中无数个解</div>
      </div>
    </div>

    <div class="dc-case">
      <div class="dc-title" :class="{ 'dc-hidden': step < 1 }">
        已知一个分力的大小和方向，解有几个？
      </div>
      <div class="dc-figure" :class="{ 'dc-hidden': step < 2 }">
        <svg viewBox="0 0 260 200">
          <CourseArrow
            :from="C_O"
            :to="C_T"
            stroke="var(--c-physics)"
            stroke-width="3"
            pointer-events="none"
          />
          <CourseArrow
            :from="C_O"
            :to="C_P1"
            stroke="var(--c-accent)"
            stroke-width="3"
            pointer-events="none"
          />
          <CourseArrow
            :from="C_P1"
            :to="C_T"
            stroke="var(--c-accent-2)"
            stroke-width="3"
            pointer-events="none"
          />
          <circle :cx="C_O.x" :cy="C_O.y" r="3" fill="var(--c-text)" />
          <circle :cx="C_P1.x" :cy="C_P1.y" r="4" fill="var(--c-accent)" />
        </svg>
        <ChartLabel
          :visible="step >= 2"
          :x-percent="((C_T.x - 4) / 260) * 100"
          :y-percent="((C_T.y - 8) / 200) * 100"
          :parts="[{ tex: 'F' }]"
          anchor="top-right"
          :dx="6"
          color="var(--c-physics)"
          halo
        />
        <ChartLabel
          :visible="step >= 2"
          :x-percent="(C_P1.x / 260) * 100"
          :y-percent="(C_P1.y / 200) * 100"
          :parts="[{ tex: 'F_1' }]"
          anchor="top-left"
          :dx="-8"
          :dy="-6"
          color="var(--c-accent)"
        />
        <ChartLabel
          :visible="step >= 2"
          :x-percent="((C_P1.x + C_T.x) / 2 / 260) * 100"
          :y-percent="((C_P1.y + C_T.y) / 2 / 200) * 100"
          :parts="[{ tex: 'F_2' }]"
          anchor="bottom-right"
          :dy="10"
          color="var(--c-accent-2)"
        />
      </div>
      <div class="dc-verdict" :class="{ 'dc-hidden': step < 5 }">唯一解</div>
    </div>
  </div>
</template>

<style scoped>
.dc-wrap {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
  align-items: start;
}

.dc-case {
  min-width: 0;
  text-align: center;
}

.dc-hidden {
  visibility: hidden;
}

.dc-title {
  margin-bottom: 0.4rem;
  color: var(--c-text);
  font-weight: 700;
  font-size: 1.02rem;
}

.dc-figure {
  position: relative;
  min-width: 0;
}

.dc-figure svg {
  display: block;
  width: 100%;
  height: auto;
}

.dc-verdict {
  margin-top: 0.35rem;

  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.45;
}

.dc-verdict-sub {
  font-size: 0.98rem;
  opacity: 0.9;
}
</style>
