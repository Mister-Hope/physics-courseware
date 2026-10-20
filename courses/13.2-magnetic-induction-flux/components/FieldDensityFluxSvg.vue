<template>
  <!--
    第 12 页《磁感线的疏密》：两处疏密不同的磁感线（方向向下）。
    画面按"垂直于纸面取同样面积"来画：面画成垂直于磁感线的薄片（一端向纸内斜出去一点），
    穿过薄片的磁感线条数按几何真实统计（左边 3 条、右边 2 条），不是估计值。
  -->
  <div class="fdf">
    <svg viewBox="0 0 500 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 左：密 -->
      <g v-for="x in LEFT" :key="`l${x}`">
        <CourseArrow
          :from="{ x, y: 40 }"
          :to="{ x, y: 280 }"
          :stroke="lit(x, S1, 1) ? 'var(--c-accent)' : 'var(--c-text-dim)'"
          :stroke-width="lit(x, S1, 1) ? 3.2 : 2"
          :opacity="dim(x, S1, 1) ? 0.32 : 0.95"
        />
      </g>
      <!-- 右：疏 -->
      <g v-for="x in RIGHT" :key="`r${x}`">
        <CourseArrow
          :from="{ x, y: 40 }"
          :to="{ x, y: 280 }"
          :stroke="lit(x, S2, 2) ? 'var(--c-accent)' : 'var(--c-text-dim)'"
          :stroke-width="lit(x, S2, 2) ? 3.2 : 2"
          :opacity="dim(x, S2, 2) ? 0.32 : 0.95"
        />
      </g>
      <!-- 面 S₁（垂直于纸面的薄片） -->
      <g v-if="step >= 1">
        <polygon :points="sheet(S1)" fill="var(--c-accent-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
      </g>
      <!-- 面 S₂ -->
      <g v-if="step >= 2">
        <polygon :points="sheet(S2)" fill="var(--c-accent-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
      </g>
      <ChartLabel v-if="step >= 1" :x-percent="pct(S1).x" :y-percent="pct(S1).y" :parts="[{ tex: 'S_1' }]" :size="19" color="var(--c-accent-2)" />
      <ChartLabel v-if="step >= 2" :x-percent="pct(S2).x" :y-percent="pct(S2).y" :parts="[{ tex: 'S_2' }]" :size="19" color="var(--c-accent-2)" />
    </svg>
  </div>
</template>

<script setup lang="ts">
/** 左簇（间距 26）与右簇（间距 46） */
const LEFT = [96, 122, 148, 174, 200, 226];
const RIGHT = [320, 366, 412, 458];
/** 两个同样大小的面：薄片沿 x 的宽度都是 88（表示"取同样面积"） */
const S1 = { x1: 108, x2: 196, y: 152 };
const S2 = { x1: 330, x2: 418, y: 152 };
/** 薄片"向纸内斜出去"的偏移，用来提示这是垂直于纸面的面 */
const SKEW = { x: 9, y: 9 };

const { step = 1 } = defineProps<{ /** 1 = 只有磁感线；2 = 出现 S₁ 并点亮穿过的条数；3 = 出现 S₂ */ step?: number }>();

interface Sheet {
  x1: number;
  x2: number;
  y: number;
}

const inSheet = (x: number, s: Sheet): boolean => x >= s.x1 && x <= s.x2;
/** 面已经出现、且这条线穿过它 → 高亮 */
const lit = (x: number, s: Sheet, minStep: number): boolean => step >= minStep && inSheet(x, s);
/** 面已经出现、但这条线不穿过 → 压淡 */
const dim = (x: number, s: Sheet, minStep: number): boolean => step >= minStep && !inSheet(x, s);
const sheet = (s: Sheet): string => `${s.x1},${s.y} ${s.x2},${s.y} ${s.x2 + SKEW.x},${s.y + SKEW.y} ${s.x1 + SKEW.x},${s.y + SKEW.y}`;
const pct = (s: Sheet): { x: number; y: number } => ({
  x: ((s.x1 + s.x2) / 2 / 500) * 100,
  y: ((s.y - 16) / 320) * 100,
});
</script>

<style scoped>
.fdf {
  position: relative;
  width: 100%;
  min-width: 0;
}

.fdf svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
