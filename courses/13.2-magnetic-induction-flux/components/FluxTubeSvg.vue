<template>
  <!--
    第 16 页《思考与讨论》：同一束磁感线（4 条，向右发散）。
    S₁ 在磁感线密的一侧（小面），S₂ 在疏的一侧：第 1 击时 S₂ 变大，直到 4 条线全部穿过它。
    两处拦的是同一束线 ⇒ 穿过它们的条数相同 ⇒ 磁通量相等（与面积大小无关）。
  -->
  <div class="ftb">
    <svg viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 同一束发散的磁感线 -->
      <g>
        <path v-for="(ln, i) in LINES" :key="`d${i}`" :d="ln.d" fill="none" stroke="var(--c-accent)" stroke-width="2.2" opacity="0.8" />
        <CourseArrow v-for="(ln, i) in LINES" :key="`t${i}`" :from="ln.tailFrom" :to="ln.tailTo" stroke="var(--c-accent)" :stroke-width="2.2" :opacity="0.8" />
      </g>
      <!-- 面 S₁（小，位于密处；4 条线全穿过） -->
      <polygon :points="sheet(S1)" fill="var(--c-accent-soft)" stroke="var(--c-physics)" stroke-width="2" />
      <!-- 面 S₂（第 1 击后放大，4 条线全穿过） -->
      <polygon :points="sheet(s2)" fill="var(--c-accent-soft)" stroke="var(--c-accent-2)" stroke-width="2" />
      <ChartLabel :x-percent="pct(S1).x" :y-percent="pct(S1).y" :parts="[{ tex: 'S_1' }]" :size="19" color="var(--c-physics)" :dx="-10" :dy="-14" />
      <ChartLabel :x-percent="pct(s2).x" :y-percent="pct(s2).y" :parts="[{ tex: 'S_2' }]" :size="19" color="var(--c-accent-2)" :dx="18" :dy="-12" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { step = 0 } = defineProps<{ /** 0 = S₂ 还小（只被 2 条线穿过）；1 = S₂ 已放大（4 条线全穿过） */ step?: number }>()

/** 4 条发散磁感线：左端密（间距 16）、右端疏（间距 44） */
const ROWS = [
  { y0: 138, y1: 96 },
  { y0: 154, y1: 140 },
  { y0: 170, y1: 184 },
  { y0: 186, y1: 228 },
]
const X0 = 60
const X1 = 470
const YC = 162
const N = 20

const LINES = ROWS.map(({ y0, y1 }) => {
  const pts = [] as { x: number; y: number }[]
  for (let i = 0; i <= N; i += 1) {
    const t = i / N
    // 二次贝塞尔：中间略向 YC 收，读起来像"同一束"
    const y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * ((y0 + y1) / 2 - (y0 - YC) * 0.12) + t * t * y1
    pts.push({ x: X0 + (X1 - X0) * t, y })
  }
  const d = pts.map((q, i) => `${i === 0 ? 'M' : 'L'} ${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ')
  return { d, tailFrom: pts[N - 1], tailTo: pts[N] }
})

const THICK = { x: 7, y: 7 }
/** S₁：密处的小面（高度 74，4 条线全穿过） */
const S1 = { x: 120, y1: 126, y2: 200 }
/** S₂：小（高度 68，只被中间 2 条穿过）↔ 大（高度 134，4 条全穿过） */
const S2_SMALL = { x: 400, y1: 128, y2: 196 }
const S2_BIG = { x: 400, y1: 96, y2: 230 }
const s2 = computed(() => (step >= 1 ? S2_BIG : S2_SMALL))

const sheet = (s: { x: number; y1: number; y2: number }): string =>
  `${s.x},${s.y1} ${s.x + THICK.x},${s.y1 + THICK.y} ${s.x + THICK.x},${s.y2 + THICK.y} ${s.x},${s.y2}`
const pct = (s: { x: number; y1: number; y2: number }): { x: number; y: number } => ({
  x: (s.x / 520) * 100,
  y: ((s.y1 + s.y2) / 2 / 320) * 100,
})
</script>

<style scoped>
.ftb {
  position: relative;

  width: 100%;
  min-width: 0;
}

.ftb svg {
  display: block;
  width: 100%;
  height: auto;
}

/* "面积扩大"用几何过渡演出来（多边形点坐标随之变） */
polygon {
  transition: all 0.4s ease;
}
</style>
