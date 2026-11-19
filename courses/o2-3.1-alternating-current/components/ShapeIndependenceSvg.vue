<!--
  第 13 页：峰值与线圈形状、转轴位置无关。四个线圈面积 S 相同，
  处于同一匀强磁场 B 中，以相同 ω 转动；转轴都在纸面内且与 B 垂直。
-->
<template>
  <svg viewBox="0 0 1080 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="面积相同的方形、圆形、偏置轴方形和斜轴方形线圈在同一磁场中转动">
    <g v-for="(panel, index) in panels" :key="panel.label" :transform="`translate(${panel.cx}, 110)`">
      <CourseArrow :from="{ x: -64, y: -104 }" :to="{ x: -64, y: 104 }" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.5" />
      <CourseArrow :from="{ x: 0, y: -104 }" :to="{ x: 0, y: 104 }" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.5" />
      <CourseArrow :from="{ x: 64, y: -104 }" :to="{ x: 64, y: 104 }" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.5" />
      <text v-if="index === 0" x="-88" y="-88" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14">B</text>
      <rect
        v-if="panel.kind === 'square'"
        :x="-panel.size"
        :y="-panel.size"
        :width="panel.size * 2"
        :height="panel.size * 2"
        fill="var(--c-accent)"
        fill-opacity="0.06"
        stroke="var(--c-accent)"
        stroke-width="4"
        rx="5"
      />
      <circle
        v-if="panel.kind === 'circle'"
        cx="0"
        cy="0"
        :r="panel.size"
        fill="var(--c-accent)"
        fill-opacity="0.06"
        stroke="var(--c-accent)"
        stroke-width="4"
      />
      <template v-if="panel.axis === 'diagonal'">
        <line
          :x1="-panel.size"
          :y1="-panel.size"
          :x2="panel.size"
          :y2="panel.size"
          stroke="var(--c-accent-2)"
          stroke-width="1.6"
          stroke-dasharray="7 5"
          opacity="0.85"
        />
        <text :x="panel.size + 12" :y="panel.size + 4" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="13">O</text>
      </template>
      <template v-else>
        <line
          :x1="-panel.size - 24"
          :y1="panel.axisY"
          :x2="panel.size + 24"
          :y2="panel.axisY"
          stroke="var(--c-accent-2)"
          stroke-width="1.6"
          stroke-dasharray="7 5"
          opacity="0.85"
        />
        <text :x="panel.size + 30" :y="panel.axisY + 4" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic" font-size="13">O</text>
      </template>
      <text x="0" y="122" fill="var(--c-text)" font-size="16" text-anchor="middle">{{ panel.label }}</text>
      <text x="0" y="142" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">{{ panel.sub }}</text>
    </g>
    <text x="540" y="286" fill="var(--c-text-dim)" font-size="13" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">S</tspan>、<tspan font-family="KaTeX_Math" font-style="italic">B</tspan>、<tspan
        font-family="KaTeX_Math"
        font-style="italic"
        >ω</tspan
      >
      相同，<tspan font-family="KaTeX_Math" font-style="italic">E</tspan><tspan font-family="KaTeX_Main" font-size="10" dy="4">m</tspan
      ><tspan dy="-4"> 相同</tspan>
    </text>
  </svg>
</template>

<script setup lang="ts">
interface Panel {
  label: string;
  kind: "square" | "circle";
  cx: number;
  size: number;
  axis: "mid" | "edge" | "diagonal";
  axisY: number;
  sub: string;
}

const panels: Panel[] = [
  { label: "甲", kind: "square", cx: 135, size: 54, axis: "mid", axisY: 0, sub: "轴过对边中点" },
  { label: "乙", kind: "circle", cx: 405, size: 61, axis: "mid", axisY: 0, sub: "圆形线圈" },
  { label: "丙", kind: "square", cx: 675, size: 54, axis: "edge", axisY: 54, sub: "轴在一条边上" },
  { label: "丁", kind: "square", cx: 945, size: 54, axis: "diagonal", axisY: 0, sub: "轴在对角线上" },
];
</script>
