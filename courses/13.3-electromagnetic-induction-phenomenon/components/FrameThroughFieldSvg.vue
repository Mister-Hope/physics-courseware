<!--
  P18 练习 3 的题目图：闭合线圈由位置 1 穿过虚线框内的有限磁场到位置 2。
  三幅阶段图（① 进入 ② 完全在框内 ③ 离开），重叠面积用淡金填充标出。
  第一眼只有干净题目图；"Φ 增大 / 不变 / 减小"按 :step 逐击出现（固定 SVG 内 v-if）。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 当前点击步：1 = ① 进入，2 = ② 框内，3 = ③ 离开 */
  step?: number;
}>();

/** 三幅阶段图：虚线框都画在 (90, 36)–(240, 144)，线圈 44×44 在 y=68–112 */
const PANELS = [
  { x: 0, name: "①", coilX: 66, answerAt: 1, answer: "增大", label: "位置 1" },
  { x: 300, name: "②", coilX: 118, answerAt: 2, answer: "不变", label: "" },
  { x: 600, name: "③", coilX: 206, answerAt: 3, answer: "减小", label: "位置 2" },
];
/** 线圈与虚线框的重叠区（x 区间） */
const OVERLAP: Record<number, [number, number]> = {
  0: [90, 110],
  300: [118, 162],
  600: [206, 240],
};
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 900 195" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g v-for="p in PANELS" :key="p.name">
        <text :x="p.x + 18" y="18" font-size="19" fill="var(--c-text-dim)">{{ p.name }}</text>
        <!-- 有限的匀强磁场：虚线框 + 框内磁场（垂直纸面向里）-->
        <rect :x="p.x + 90" y="36" width="150" height="108" rx="4" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="9 6" />
        <FieldDots :x="p.x + 104" :y="48" :cols="5" :rows="4" :spacing="24" dir="in" />
        <!-- 线圈与磁场的重叠面积 -->
        <rect :x="p.x + OVERLAP[p.x][0]" y="68" :width="OVERLAP[p.x][1] - OVERLAP[p.x][0]" height="44" fill="var(--c-accent)" opacity="0.18" />
        <!-- 线圈（位置 1 / 框内 / 位置 2）-->
        <rect :x="p.x + p.coilX" y="68" width="44" height="44" fill="none" stroke="var(--c-accent-2)" stroke-width="3" />
        <!-- 位置标注 -->
        <text
          v-if="p.label"
          :x="p.x + (p.coilX < 100 ? 40 : 268)"
          y="166"
          :text-anchor="p.coilX < 100 ? 'start' : 'end'"
          font-size="16"
          fill="var(--c-text-dim)"
        >
          {{ p.label }}
        </text>
        <!-- 结论：逐击出现 -->
        <text
          v-if="step >= p.answerAt"
          :x="p.x + 154"
          y="186"
          text-anchor="middle"
          font-size="18"
          :fill="p.answer === '不变' ? 'var(--c-text-dim)' : 'var(--c-accent)'"
        >
          <tspan font-family="KaTeX_Math" font-style="italic">Φ</tspan>
          <tspan>{{ p.answer }}</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
