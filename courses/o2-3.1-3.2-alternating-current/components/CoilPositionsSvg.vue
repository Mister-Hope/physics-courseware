<!--
  第 5 页：线圈转动的四个位置。视角沿转轴看，线圈投影成一条过圆心的线段，
  两端就是切割磁感线的 AB、CD 边；速度箭头画成圆的切线方向。
  甲、丙为中性面，乙、丁线圈平面与磁感线平行。e 的值和位置名称在点击后出现。
-->
<template>
  <svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="线圈转动的四个位置：中性面、与磁感线平行面、中性面、与磁感线平行面">
    <text x="350" y="12" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">沿转轴方向看，线圈投影成一条线段（逆时针转动）</text>
    <g v-for="(panel, index) in panels" :key="panel.no" :transform="`translate(${10 + index * 170}, 0)`">
      <CourseArrow :from="{ x: 80, y: 22 }" :to="{ x: 80, y: 44 }" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
      <text v-if="index === 0" x="91" y="35" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="13">B</text>
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
      <text
        v-if="panel.coil === 'v'"
        x="64"
        :y="panel.ab === 'top' ? 68 : 142"
        fill="var(--c-text)"
        font-family="KaTeX_Main"
        font-size="11"
        font-weight="600"
        text-anchor="end"
      >
        AB
      </text>
      <text
        v-if="panel.coil === 'v'"
        x="64"
        :y="panel.ab === 'top' ? 142 : 68"
        fill="var(--c-text)"
        font-family="KaTeX_Main"
        font-size="11"
        font-weight="600"
        text-anchor="end"
      >
        CD
      </text>
      <text
        v-if="panel.coil === 'h'"
        :x="panel.ab === 'left' ? 47 : 113"
        y="94"
        fill="var(--c-text)"
        font-family="KaTeX_Main"
        font-size="11"
        font-weight="600"
        text-anchor="middle"
      >
        AB
      </text>
      <text
        v-if="panel.coil === 'h'"
        :x="panel.ab === 'left' ? 113 : 47"
        y="94"
        fill="var(--c-text)"
        font-family="KaTeX_Main"
        font-size="11"
        font-weight="600"
        text-anchor="middle"
      >
        CD
      </text>
      <text x="80" y="174" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="12" text-anchor="middle">
        <tspan font-family="KaTeX_Math" font-style="italic">θ</tspan><tspan> = {{ panel.angle }}</tspan>
      </text>
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
  ab: "top" | "bottom" | "left" | "right";
  angle: string;
  e: string;
  face: string;
}

const panels: Panel[] = [
  { no: "甲", coil: "h", ab: "right", angle: "0°", e: " = 0", face: "中性面" },
  { no: "乙", coil: "v", ab: "top", angle: "90°", e: " 最大", face: "与磁感线平行" },
  { no: "丙", coil: "h", ab: "left", angle: "180°", e: " = 0", face: "中性面" },
  { no: "丁", coil: "v", ab: "bottom", angle: "270°", e: " 最大（反向）", face: "与磁感线平行" },
];
</script>
