<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 第 6 页：电荷量的平分（9-text.md 行 118–119）
 *
 * 左边照「接触前」：两个**完全相同**的金属小球，A 带 q、B 不带电；
 * 第 1 击（`clicks: 3`）后并排出现「接触后」：两球相切，电荷量重新分配为各 q/2。
 *
 * 球内的小「+」记号个数就是电荷量的可视化单位（4 → 2 + 2）。
 * ⚠️ 两组球的位置都固定不动：新状态一律以**新增一栏**的方式出现，避免"点击把已有元素顶跑"。
 */
const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, Math.min($clicks.value, 2)));

const VB_W = 600;
const VB_H = 200;

const R = 28;
const Y = 105;

/** 接触前 */
const BEFORE = { a: 130, b: 250 };
/** 接触后（两球相切） */
const AFTER = { a: 415, b: 471 };

/** 球内记号的位置：4 个摆成方阵、2 个摆成一行 */
const marksFor = (count: number) => {
  if (count === 4) {
    return [
      { dx: -13, dy: -13 },
      { dx: 13, dy: -13 },
      { dx: -13, dy: 13 },
      { dx: 13, dy: 13 },
    ];
  }

  return Array.from({ length: count }, (_, index) => ({
    dx: index === 0 ? -13 : 13,
    dy: 0,
  }));
};

const beforeAMarks = marksFor(4);
const beforeBMarks = marksFor(0);
const afterMarks = marksFor(2);

const pct = (x: number, y: number) => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});
</script>

<template>
  <div class="cs-host">
    <svg viewBox="0 0 600 200" width="100%" xmlns="http://www.w3.org/2000/svg">
      <circle :cx="BEFORE.a" :cy="Y" :r="R" fill="var(--c-danger)" fill-opacity="0.28" stroke="var(--c-neutral-500)" stroke-width="1.8" />
      <text
        v-for="(mark, index) in beforeAMarks"
        :key="`ba-${index}`"
        :x="BEFORE.a + mark.dx"
        :y="Y + mark.dy + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        +
      </text>
      <circle :cx="BEFORE.b" :cy="Y" :r="R" fill="var(--c-neutral-700)" fill-opacity="0.55" stroke="var(--c-neutral-500)" stroke-width="1.8" />
      <text
        v-for="(mark, index) in beforeBMarks"
        :key="`bb-${index}`"
        :x="BEFORE.b + mark.dx"
        :y="Y + mark.dy + 1"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        +
      </text>
      <text
        :x="BEFORE.a"
        :y="152"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-text)"
      >
        A
      </text>
      <text
        :x="BEFORE.b"
        :y="152"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-text)"
      >
        B
      </text>
      <g v-if="step >= 1">
        <CourseArrow :from="{ x: 300, y: Y }" :to="{ x: 352, y: Y }" stroke="var(--c-accent)" stroke-width="2.4" />
        <circle :cx="AFTER.a" :cy="Y" :r="R" fill="var(--c-danger)" fill-opacity="0.28" stroke="var(--c-neutral-500)" stroke-width="1.8" />
        <text
          v-for="(mark, index) in afterMarks"
          :key="`aa-${index}`"
          :x="AFTER.a + mark.dx"
          :y="Y + mark.dy + 1"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="18"
          fill="var(--c-danger)"
        >
          +
        </text>
        <circle :cx="AFTER.b" :cy="Y" :r="R" fill="var(--c-danger)" fill-opacity="0.28" stroke="var(--c-neutral-500)" stroke-width="1.8" />
        <text
          v-for="(mark, index) in afterMarks"
          :key="`ab-${index}`"
          :x="AFTER.b + mark.dx"
          :y="Y + mark.dy + 1"
          text-anchor="middle"
          dominant-baseline="central"
          font-family="KaTeX_Main"
          font-size="18"
          fill="var(--c-danger)"
        >
          +
        </text>
      </g>
    </svg>
    <ChartLabel v-bind="pct(BEFORE.a, 61)" :parts="[{ tex: 'q' }]" :size="18" color="var(--c-accent)" />
    <ChartLabel v-bind="pct(BEFORE.b, 61)" :parts="[{ tex: '0' }]" :size="18" color="var(--c-text-dim)" />
    <ChartLabel v-bind="pct(AFTER.a, 61)" :parts="[{ tex: '\\dfrac{q}{2}' }]" :visible="step >= 1" :size="18" color="var(--c-accent)" />
    <ChartLabel v-bind="pct(AFTER.b, 61)" :parts="[{ tex: '\\dfrac{q}{2}' }]" :visible="step >= 1" :size="18" color="var(--c-accent)" />
  </div>
</template>

<style scoped>
.cs-host {
  position: relative;
  width: 100%;
}

.cs-host > svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
