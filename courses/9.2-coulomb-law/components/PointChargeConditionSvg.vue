<script setup lang="ts">
/**
 * 第 4 页：什么时候可以把带电体看作点电荷（9-text.md 行 109）
 *
 * 左右对照：左"带电体之间的距离比它们自身的大小大得多 ⇒ 可以看作点电荷"； 右"距离与自身大小差不多 ⇒ 不能看作点电荷，形状、大小、电荷分布的影响不能忽略"。 判据只用尺寸比例说话（球心距 / 球半径），不画力、不标任何数值以外的解释性小字。
 */
const { showMarks = true, showVerdict = true } = defineProps<{
  showMarks?: boolean;
  showVerdict?: boolean;
}>();

const VB_W = 560;
const VB_H = 212;

const pct = (x: number, y: number): { xPercent: number; yPercent: number } => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});
</script>

<template>
  <div class="pcc-host">
    <svg viewBox="0 0 560 212" width="100%" xmlns="http://www.w3.org/2000/svg">
      <line x1="280" y1="12" x2="280" y2="200" stroke="var(--c-border)" stroke-width="1.2" stroke-dasharray="6 6" />

      <circle cx="72" cy="88" r="24" fill="var(--c-danger)" fill-opacity="0.85" />
      <text x="72" y="89" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#0c1122">+</text>
      <circle cx="218" cy="88" r="24" fill="var(--c-velocity)" fill-opacity="0.85" />
      <text x="218" y="89" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#0c1122">−</text>

      <circle cx="340" cy="88" r="30" fill="var(--c-danger)" fill-opacity="0.85" />
      <text x="340" y="89" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="26" fill="#0c1122">+</text>
      <circle cx="420" cy="88" r="30" fill="var(--c-velocity)" fill-opacity="0.85" />
      <text x="420" y="89" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="26" fill="#0c1122">−</text>

      <g v-if="showMarks">
        <line x1="72" y1="88" x2="96" y2="88" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line x1="72" y1="132" x2="218" y2="132" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5" />
        <line x1="72" y1="124" x2="72" y2="140" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line x1="218" y1="124" x2="218" y2="140" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line x1="340" y1="88" x2="370" y2="88" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line x1="340" y1="132" x2="420" y2="132" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5" />
        <line x1="340" y1="124" x2="340" y2="140" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <line x1="420" y1="124" x2="420" y2="140" stroke="var(--c-text-dim)" stroke-width="1.4" />
      </g>
    </svg>

    <ChartLabel v-bind="pct(145, 22)" :parts="[{ text: '距离比自身大小大得多' }]" :size="15" color="var(--c-accent)" />
    <ChartLabel v-bind="pct(380, 22)" :parts="[{ text: '距离与自身大小差不多' }]" :size="15" color="var(--c-danger)" />
    <ChartLabel v-bind="pct(84, 74)" :parts="[{ tex: 'r' }]" :visible="showMarks" :size="15" color="var(--c-text-dim)" />
    <ChartLabel v-bind="pct(355, 74)" :parts="[{ tex: 'r' }]" :visible="showMarks" :size="15" color="var(--c-text-dim)" />
    <ChartLabel v-bind="pct(145, 152)" :parts="[{ tex: '6r' }]" :visible="showMarks" :size="15" color="var(--c-text-dim)" />
    <ChartLabel v-bind="pct(380, 152)" :parts="[{ tex: '3r' }]" :visible="showMarks" :size="15" color="var(--c-text-dim)" />
    <ChartLabel v-bind="pct(145, 176)" :parts="[{ text: '可以看作点电荷' }]" :visible="showVerdict" :size="17" color="var(--c-accent)" halo />
    <ChartLabel
      v-bind="pct(145, 196)"
      :parts="[{ text: '形状、大小、电荷分布的影响可以忽略' }]"
      :visible="showVerdict"
      :size="14"
      color="var(--c-text-dim)"
      halo
    />
    <ChartLabel v-bind="pct(380, 176)" :parts="[{ text: '不能看作点电荷' }]" :visible="showVerdict" :size="17" color="var(--c-danger)" halo />
    <ChartLabel v-bind="pct(380, 196)" :parts="[{ text: '影响不能忽略' }]" :visible="showVerdict" :size="14" color="var(--c-text-dim)" halo />
  </div>
</template>

<style scoped>
.pcc-host {
  position: relative;
  width: 100%;
}

.pcc-host > svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
