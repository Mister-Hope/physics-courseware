<!-- 第 5 页：电磁波的产生链——振源出发，电场区与磁场区依次交替出现，由近及远向右传播 -->
<script setup lang="ts">
defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 700 285" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g v-if="(step ?? 0) >= 1">
      <line
        x1="42"
        y1="98"
        x2="42"
        y2="176"
        stroke="var(--c-accent)"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <circle cx="42" cy="98" r="5.5" fill="var(--c-accent)" />
      <text x="42" y="196" text-anchor="middle" font-size="12" fill="var(--c-text-soft)">振源</text>
      <rect
        x="96"
        y="58"
        width="132"
        height="146"
        rx="10"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <g stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round">
        <line x1="128" y1="176" x2="128" y2="90" />
        <line x1="162" y1="176" x2="162" y2="90" />
        <line x1="196" y1="176" x2="196" y2="90" />
      </g>
      <path d="M 128 82 L 122 94 L 134 94 Z" fill="var(--c-danger)" />
      <path d="M 162 82 L 156 94 L 168 94 Z" fill="var(--c-danger)" />
      <path d="M 196 82 L 190 94 L 202 94 Z" fill="var(--c-danger)" />
      <text x="162" y="232" text-anchor="middle" font-size="15" fill="var(--c-text)">
        电场区
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
      </text>
    </g>
    <g v-if="(step ?? 0) >= 2">
      <CourseArrow
        :from="{ x: 236, y: 131 }"
        :to="{ x: 272, y: 131 }"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
      <rect
        x="280"
        y="58"
        width="132"
        height="146"
        rx="10"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <FieldDots
        :x="306"
        :y="84"
        :cols="4"
        :rows="5"
        :size="9"
        :gap="22"
        fill="var(--c-accent-2)"
      />
      <text x="346" y="232" text-anchor="middle" font-size="15" fill="var(--c-text)">
        磁场区
        <tspan font-family="KaTeX_Math" font-style="italic">B</tspan>
      </text>
    </g>
    <g v-if="(step ?? 0) >= 3">
      <CourseArrow
        :from="{ x: 420, y: 131 }"
        :to="{ x: 456, y: 131 }"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
      <rect
        x="464"
        y="58"
        width="132"
        height="146"
        rx="10"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 5"
      />
      <g stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round">
        <line x1="496" y1="176" x2="496" y2="90" />
        <line x1="530" y1="176" x2="530" y2="90" />
        <line x1="564" y1="176" x2="564" y2="90" />
      </g>
      <path d="M 496 82 L 490 94 L 502 94 Z" fill="var(--c-danger)" />
      <path d="M 530 82 L 524 94 L 536 94 Z" fill="var(--c-danger)" />
      <path d="M 564 82 L 558 94 L 570 94 Z" fill="var(--c-danger)" />
      <FieldMark type="out" :x="474" :y="112" r="7" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <FieldMark type="out" :x="474" :y="158" r="7" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <FieldMark type="in" :x="586" :y="112" r="7" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <FieldMark type="in" :x="586" :y="158" r="7" stroke="var(--c-accent-2)" stroke-width="1.8" />
      <text x="530" y="232" text-anchor="middle" font-size="15" fill="var(--c-text)">
        电场区
        <tspan font-family="KaTeX_Math" font-style="italic">E</tspan>
      </text>
    </g>
    <g v-if="(step ?? 0) >= 4">
      <text x="346" y="262" text-anchor="middle" font-size="15.5" fill="var(--c-accent)">
        变化的电场与磁场交替产生，由近及远传播
      </text>
      <CourseArrow
        :from="{ x: 96, y: 277 }"
        :to="{ x: 596, y: 277 }"
        stroke="var(--c-accent)"
        stroke-width="2.8"
      />
    </g>
  </svg>
</template>
