<script setup lang="ts">
/**
 * 第 2 页：教材 9.2「问题」实验（9-text.md 行 93）
 *
 * 带电体 C 置于铁架台旁（图的左侧）；横梁上从左（近 C）到右是三个**悬挂点** P₁、P₂、P₃， 每个悬挂点各垂一根丝线、末端一个带正电的小球；小球被 C 排斥，一律向远离 C 的方向偏转， 悬挂点离 C 越远、丝线偏离竖直方向的角度越小（tanθ = F/mg）。
 *
 * 教材没给 C、q、m 的数值 ⇒ 图上**只作定性示意、不标数值**； `showMarks`（第 1 击）后出现三个偏角的竖直参考虚线与「球—C」的距离 r₁<r₂<r₃ 标注。
 */
const { showMarks = false } = defineProps<{ showMarks?: boolean }>();

const VB_W = 560;
const VB_H = 300;

/** 悬挂点的横梁纵坐标 / 丝线长度（从横梁到球心） */
const BEAM_Y = 48;
const L = 99;
/** 带电体 C 的球心（球的偏转方向一律远离它 ⇒ 向右） */
const CX = 190;
const CY = 148;

const pct = (x: number, y: number): { xPercent: number; yPercent: number } => ({
  xPercent: (x / VB_W) * 100,
  yPercent: (y / VB_H) * 100,
});

/** 三个悬挂点与各自小球的偏角（示意；越远越小） */
const spots = [
  { px: 250, deg: 30 },
  { px: 340, deg: 15 },
  { px: 430, deg: 7 },
];

const balls = spots.map((spot) => {
  const rad = (spot.deg * Math.PI) / 180;

  return {
    px: spot.px,
    bx: spot.px + L * Math.sin(rad),
    by: BEAM_Y + L * Math.cos(rad),
  };
});

/** 距离标注（r₁、r₂、r₃）放在「球—C」连线的中点稍下方 */
const distMarks = balls.map((ball, index) => {
  const mark = pct((CX + ball.bx) / 2, (CY + ball.by) / 2 + 20);

  return { xPercent: mark.xPercent, yPercent: mark.yPercent, tex: `r_${index + 1}` };
});
</script>

<template>
  <div class="cde-host">
    <svg viewBox="0 0 560 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <SurfaceHatch :from="{ x: 24, y: 266 }" :to="{ x: 536, y: 266 }" side="below" :thickness="16" :gap="26" :line-width="1.8" />
      <rect x="56" y="250" width="104" height="16" rx="5" fill="var(--c-neutral-700)" fill-opacity="0.65" />
      <line x1="108" y1="48" x2="108" y2="252" stroke="var(--c-neutral-600)" stroke-width="7" stroke-linecap="round" />
      <SurfaceHatch :from="{ x: 100, y: 48 }" :to="{ x: 470, y: 48 }" side="above" :thickness="12" :gap="20" :line-width="1.8" />
      <rect x="168" y="250" width="44" height="14" rx="4" fill="var(--c-neutral-700)" fill-opacity="0.65" />
      <line x1="190" y1="250" x2="190" y2="164" stroke="var(--c-neutral-600)" stroke-width="5" stroke-linecap="round" />
      <circle :cx="CX" :cy="CY" r="17" fill="var(--c-danger)" fill-opacity="0.9" />
      <text :x="CX" :y="CY + 1" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="18" fill="#0c1122">+</text>
      <text :x="CX" :y="190" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-text)">C</text>
      <g v-if="showMarks">
        <line
          v-for="(ball, index) in balls"
          :key="`deg-${index}`"
          :x1="ball.px"
          :y1="BEAM_Y"
          :x2="ball.px"
          :y2="BEAM_Y + L + 2"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="5 5"
          opacity="0.7"
        />
        <line
          v-for="(ball, index) in balls"
          :key="`dist-${index}`"
          :x1="CX"
          :y1="CY"
          :x2="ball.bx"
          :y2="ball.by"
          stroke="var(--c-accent)"
          stroke-width="1.4"
          stroke-dasharray="6 5"
          opacity="0.85"
        />
      </g>
      <g v-for="(ball, index) in balls" :key="`ball-${index}`">
        <line :x1="ball.px" :y1="BEAM_Y" :x2="ball.bx" :y2="ball.by" stroke="var(--c-text-dim)" stroke-width="1.4" />
        <circle :cx="ball.bx" :cy="ball.by" r="11" fill="var(--c-danger)" fill-opacity="0.9" />
        <text :x="ball.bx" :y="ball.by + 1" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="12" fill="#0c1122">+</text>
      </g>
    </svg>
    <ChartLabel
      v-for="(spot, index) in spots"
      :key="`p-${index}`"
      v-bind="pct(spot.px, BEAM_Y)"
      :parts="[{ tex: `P_${index + 1}` }]"
      :dy="-13"
      :size="16"
      color="var(--c-accent)"
    />
    <ChartLabel
      v-for="mark in distMarks"
      :key="mark.tex"
      v-bind="{ xPercent: mark.xPercent, yPercent: mark.yPercent }"
      :parts="[{ tex: mark.tex }]"
      :visible="showMarks"
      :size="16"
      color="var(--c-accent)"
      halo
    />
  </div>
</template>

<style scoped>
.cde-host {
  position: relative;
  width: 100%;
}

.cde-host > svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
