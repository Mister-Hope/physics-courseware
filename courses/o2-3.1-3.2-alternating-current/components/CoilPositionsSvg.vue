<!--
  第 5 页：线圈转动的四个位置。视角沿转轴看，线圈投影成一条过圆心的线段，
  两端就是切割磁感线的 AB、CD 边；速度箭头画成圆的切线方向。
  甲、丙为中性面，乙、丁线圈平面与磁感线平行。e 的值和位置名称在点击后出现。
-->
<template>
  <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="350" y="12" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">沿转轴方向看，线圈投影成一条线段</text>
    <g v-for="(panel, index) in panels" :key="panel.no" :transform="`translate(${10 + index * 170}, 0)`">
      <CourseArrow :from="{ x: 16, y: 30 }" :to="{ x: 144, y: 30 }" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
      <text v-if="index === 0" x="80" y="17" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13" text-anchor="middle">B</text>
      <line v-if="panel.coil === 'v'" x1="80" y1="50" x2="80" y2="160" stroke="var(--c-accent)" stroke-width="4.5" stroke-linecap="round" />
      <line v-else x1="25" y1="105" x2="135" y2="105" stroke="var(--c-accent)" stroke-width="4.5" stroke-linecap="round" />
      <circle v-if="panel.coil === 'v'" cx="80" cy="50" r="4" fill="var(--c-accent)" />
      <circle v-if="panel.coil === 'v'" cx="80" cy="160" r="4" fill="var(--c-accent)" />
      <circle v-if="panel.coil === 'h'" cx="25" cy="105" r="4" fill="var(--c-accent)" />
      <circle v-if="panel.coil === 'h'" cx="135" cy="105" r="4" fill="var(--c-accent)" />
      <circle cx="80" cy="105" r="2.6" fill="var(--c-text-dim)" />
      <text v-if="index === 0" x="89" y="99" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="12">O</text>
      <CourseArrow
        v-if="panel.coil === 'v'"
        :from="{ x: 80, y: 50 }"
        :to="{ x: 46, y: 50 }"
        stroke="var(--c-accent-2)"
        stroke-width="2.5"
        label="v"
        :label-dy="-9"
      />
      <CourseArrow v-if="panel.coil === 'v'" :from="{ x: 80, y: 160 }" :to="{ x: 114, y: 160 }" stroke="var(--c-accent-2)" stroke-width="2.5" />
      <CourseArrow
        v-if="panel.coil === 'h'"
        :from="{ x: 135, y: 105 }"
        :to="{ x: 135, y: 71 }"
        stroke="var(--c-accent-2)"
        stroke-width="2.5"
        label="v"
        :label-dx="10"
        :label-dy="4"
      />
      <CourseArrow v-if="panel.coil === 'h'" :from="{ x: 25, y: 105 }" :to="{ x: 25, y: 139 }" stroke="var(--c-accent-2)" stroke-width="2.5" />
      <text x="80" y="196" fill="var(--c-text)" font-size="16" text-anchor="middle">{{ panel.no }}</text>
      <g :visibility="step >= 1 ? 'visible' : 'hidden'">
        <text x="80" y="220" fill="var(--c-accent)" font-family="KaTeX_Main" font-size="14" text-anchor="middle">
          <tspan font-family="KaTeX_Math" font-style="italic">e</tspan>
          <tspan>{{ panel.e }}</tspan>
        </text>
        <text x="80" y="243" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">{{ panel.face }}</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

interface Panel {
  no: string;
  coil: "v" | "h";
  e: string;
  face: string;
}

const panels: Panel[] = [
  { no: "甲", coil: "v", e: " = 0", face: "中性面" },
  { no: "乙", coil: "h", e: " 最大", face: "平行面" },
  { no: "丙", coil: "v", e: " = 0", face: "中性面" },
  { no: "丁", coil: "h", e: " 最大（反向）", face: "平行面" },
];
</script>
