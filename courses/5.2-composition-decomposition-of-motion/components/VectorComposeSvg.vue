<script setup lang="ts">
import { computed } from "vue";

/** 矢量合成图：两个互相垂直的分矢量和它们的合矢量（平行四边形 + 对角线）。 用于"合速度 v = v_x + v_y"和"参考系变换 v船对岸 = v船对水 + v水对岸"两处， 通过 aSub / bSub / rSub 换角标文字即可复用。 */
const {
  aLetter = "v",
  aSub = "x",
  bLetter = "v",
  bSub = "y",
  rLetter = "v",
  rSub = "",
  angle = 33,
  showResultant = true,
} = defineProps<{
  aLetter?: string;
  aSub?: string;
  bLetter?: string;
  bSub?: string;
  rLetter?: string;
  rSub?: string;
  /** 合矢量与水平方向的夹角（度） */
  angle?: number;
  /** 分步显示：点击后才画合矢量 */
  showResultant?: boolean;
}>();

const OX = 84;
const OY = 246;
const LEN = 296;

const rad = (deg: number): number => (deg * Math.PI) / 180;
const aTip = computed(() => ({ x: OX + LEN * Math.cos(rad(angle)), y: OY }));
const bTip = computed(() => ({ x: OX, y: OY - LEN * Math.sin(rad(angle)) }));
const rTip = computed(() => ({
  x: OX + LEN * Math.cos(rad(angle)),
  y: OY - LEN * Math.sin(rad(angle)),
}));
</script>

<template>
  <div class="vector-compose">
    <svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="分矢量与合矢量">
      <g v-if="showResultant">
        <line :x1="aTip.x" :y1="aTip.y" :x2="rTip.x" :y2="rTip.y" stroke="rgba(148,163,184,0.75)" stroke-width="2" stroke-dasharray="7 6" />
        <line :x1="bTip.x" :y1="bTip.y" :x2="rTip.x" :y2="rTip.y" stroke="rgba(148,163,184,0.75)" stroke-width="2" stroke-dasharray="7 6" />
      </g>
      <CourseArrow :from="{ x: OX, y: OY }" :to="aTip" stroke="#60a5fa" :stroke-width="3.2" />
      <CourseArrow :from="{ x: OX, y: OY }" :to="bTip" stroke="#e2a846" :stroke-width="3.2" />
      <CourseArrow v-if="showResultant" :from="{ x: OX, y: OY }" :to="rTip" stroke="#f87171" :stroke-width="3.4" />
      <text :x="aTip.x - 44" :y="OY + 26" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#93c5fd">
        {{ aLetter }}
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">{{ aSub }}</tspan>
      </text>
      <text :x="OX - 40" :y="bTip.y + 24" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2a846">
        {{ bLetter }}
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">{{ bSub }}</tspan>
      </text>
      <text v-if="showResultant" :x="rTip.x + 10" :y="rTip.y - 8" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#f87171">
        {{ rLetter }}
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4">{{ rSub }}</tspan>
      </text>
      <circle :cx="OX" :cy="OY" r="4" fill="#e2e8f0" />
    </svg>
  </div>
</template>

<style scoped>
.vector-compose {
  min-width: 0;
}

.vector-compose svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
