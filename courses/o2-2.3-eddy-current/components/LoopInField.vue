<!--
  单匝线圈落入磁场（第 15 页）
  磁场垂直纸面向里且只存在于下半部分；线圈下边已进入磁场、上边还在外面。
  第一眼只有干净装置；show-forces 打开后才逐层给出电流方向、安培力与速度。
    下落 → 穿过线圈的向里磁通增加 → 感应电流逆时针（产生向外的磁场）
    → 下边电流向右，F = IL×B 向上 → 安培力阻碍下落
-->
<script setup lang="ts">
const { showForces = false } = defineProps<{
  /** 是否显示电流方向、安培力与速度等分析标注 */
  showForces?: boolean;
}>();
</script>

<template>
  <svg
    class="fig-svg"
    viewBox="0 0 620 400"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="单匝线圈落入磁场"
  >
    <rect
      x="40"
      y="152"
      width="540"
      height="238"
      fill="rgb(226 168 70 / 7%)"
      stroke="rgb(226 168 70 / 45%)"
      stroke-width="1.6"
      stroke-dasharray="8 6"
    />
    <FieldDots :x="56" :y="168" :cols="12" :rows="6" :spacing="46" dir="in" />
    <rect
      x="210"
      y="88"
      width="200"
      height="120"
      rx="3"
      fill="none"
      stroke="#cbd5e1"
      stroke-width="4"
    />
    <text x="310" y="72" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">线圈</text>
    <g v-if="showForces">
      <CourseArrow
        :from="{ x: 386, y: 102 }"
        :to="{ x: 234, y: 102 }"
        stroke="#60a5fa"
        stroke-width="2.6"
      />
      <CourseArrow
        :from="{ x: 224, y: 120 }"
        :to="{ x: 224, y: 188 }"
        stroke="#60a5fa"
        stroke-width="2.6"
      />
      <CourseArrow
        :from="{ x: 234, y: 196 }"
        :to="{ x: 386, y: 196 }"
        stroke="#60a5fa"
        stroke-width="2.6"
      />
      <CourseArrow
        :from="{ x: 396, y: 188 }"
        :to="{ x: 396, y: 120 }"
        stroke="#60a5fa"
        stroke-width="2.6"
      />
      <text
        x="310"
        y="126"
        text-anchor="middle"
        font-family="KaTeX_Math, serif"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
      >
        I
      </text>
      <CourseArrow
        :from="{ x: 310, y: 208 }"
        :to="{ x: 310, y: 148 }"
        stroke="#2dd4bf"
        stroke-width="3.4"
      />
      <text
        x="322"
        y="166"
        font-family="KaTeX_Math, serif"
        font-style="italic"
        font-size="21"
        fill="#2dd4bf"
      >
        F
      </text>
      <text x="334" y="172" font-family="KaTeX_Main, serif" font-size="13" fill="#2dd4bf">安</text>
      <CourseArrow
        :from="{ x: 462, y: 108 }"
        :to="{ x: 462, y: 174 }"
        stroke="#e2a846"
        stroke-width="3"
      />
      <text
        x="474"
        y="146"
        font-family="KaTeX_Math, serif"
        font-style="italic"
        font-size="21"
        fill="#e2a846"
      >
        v
      </text>
    </g>
  </svg>
</template>
