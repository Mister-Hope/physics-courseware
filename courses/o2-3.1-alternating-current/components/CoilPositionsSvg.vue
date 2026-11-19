<!--
  第 9 页：线圈转动的四个位置（沿转轴方向看）。
  磁场竖直向下，四格都画两条贯穿全图的实线箭头并标 B，避免学生误读方向。
  线圈投影成一条过圆心的线段；速度箭头按逆时针画切线方向。
  θ、e 与面名在点击后出现；e 用 KaTeX 字体排，不走纯文本。
-->
<template>
  <svg
    viewBox="0 0 700 260"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="沿转轴方向看线圈的四个位置，磁场竖直向下，依次为中性面、与磁感线平行、中性面、与磁感线平行"
  >
    <text x="350" y="12" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">沿转轴方向看，线圈投影成一条线段（逆时针转动）</text>
    <g v-for="(panel, index) in panels" :key="panel.no" :transform="`translate(${10 + index * 170}, 0)`">
      <CourseArrow :from="{ x: 20, y: 38 }" :to="{ x: 20, y: 178 }" stroke="var(--c-text-dim)" stroke-width="1.8" opacity="0.55" />
      <CourseArrow :from="{ x: 140, y: 38 }" :to="{ x: 140, y: 178 }" stroke="var(--c-text-dim)" stroke-width="1.8" opacity="0.55" />
      <text x="80" y="28" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14" text-anchor="middle">B</text>
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
          <tspan> = </tspan>
          <template v-if="panel.e === '0'">
            <tspan>0</tspan>
          </template>
          <template v-else>
            <tspan v-if="panel.e === 'neg'" font-family="KaTeX_Main">−</tspan>
            <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
            <tspan font-family="KaTeX_Math" font-style="italic" font-size="10" dy="4">m</tspan>
          </template>
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
  e: "0" | "max" | "neg";
  face: string;
}

const panels: Panel[] = [
  { no: "甲", coil: "h", ab: "right", angle: "0°", e: "0", face: "中性面" },
  { no: "乙", coil: "v", ab: "top", angle: "90°", e: "max", face: "与磁感线平行" },
  { no: "丙", coil: "h", ab: "left", angle: "180°", e: "0", face: "中性面" },
  { no: "丁", coil: "v", ab: "bottom", angle: "270°", e: "neg", face: "与磁感线平行" },
];
</script>
