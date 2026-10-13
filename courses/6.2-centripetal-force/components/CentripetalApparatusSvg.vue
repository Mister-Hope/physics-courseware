<script setup lang="ts">
// 第 10 页：向心力演示器（示意图）。
// step ≥ 1：标出两球的向心力由"横臂挡板对球的压力"提供（挡板在球的外侧，把球推向圆心）；
// step ≥ 2：挡板受到的反作用力使弹簧测力套筒下降、露出标尺，由露出的格数比较两个向心力。
const { step = 0 } = defineProps<{ step?: number }>();

/** 标尺上的红白相间等分标记 */
const marks = [0, 1, 2, 3, 4, 5, 6];
</script>

<template>
  <svg viewBox="60 55 600 390" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="250" y="384" width="160" height="20" rx="6" fill="rgba(148,163,184,0.18)" stroke="#64748b" stroke-width="1.6" />
    <rect x="321" y="112" width="18" height="276" rx="5" fill="rgba(148,163,184,0.22)" stroke="#94a3b8" stroke-width="1.6" />
    <!-- 手柄 -->
    <circle cx="330" cy="120" r="8" fill="rgba(148,163,184,0.3)" stroke="#94a3b8" stroke-width="1.5" />
    <line x1="330" y1="120" x2="418" y2="120" stroke="#e2a846" stroke-width="5" stroke-linecap="round" />
    <rect x="411" y="88" width="14" height="34" rx="7" fill="#e2a846" opacity="0.85" />
    <text x="436" y="112" font-family="KaTeX_Main" font-size="22" fill="#e2a846" text-anchor="start">手柄</text>
    <!-- 变速塔轮 -->
    <ellipse cx="330" cy="192" rx="46" ry="12" fill="rgba(226,168,70,0.12)" stroke="#e2a846" stroke-width="1.6" />
    <ellipse cx="330" cy="168" rx="30" ry="9" fill="rgba(226,168,70,0.12)" stroke="#e2a846" stroke-width="1.6" />
    <text x="384" y="184" font-family="KaTeX_Main" font-size="22" fill="#e2a846" text-anchor="start">变速塔轮</text>
    <!-- 长槽（大半径）/ 短槽（小半径） -->
    <rect x="336" y="250" width="268" height="16" rx="8" fill="rgba(148,163,184,0.14)" stroke="#64748b" stroke-width="1.4" />
    <rect x="76" y="250" width="268" height="16" rx="8" fill="rgba(148,163,184,0.14)" stroke="#64748b" stroke-width="1.4" />
    <text x="470" y="240" font-family="KaTeX_Main" font-size="22" fill="#94a3b8" text-anchor="middle">长槽</text>
    <text x="210" y="240" font-family="KaTeX_Main" font-size="22" fill="#94a3b8" text-anchor="middle">短槽</text>
    <!-- 两球与挡板 -->
    <circle cx="556" cy="258" r="15" fill="rgba(96,165,250,0.25)" stroke="#60a5fa" stroke-width="1.8" />
    <rect x="571" y="234" width="10" height="48" rx="3" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="1.8" />
    <circle cx="164" cy="258" r="15" fill="rgba(96,165,250,0.25)" stroke="#60a5fa" stroke-width="1.8" />
    <rect x="139" y="234" width="10" height="48" rx="3" fill="rgba(226,168,70,0.25)" stroke="#e2a846" stroke-width="1.8" />
    <text x="606" y="240" font-family="KaTeX_Main" font-size="22" fill="#e2a846" text-anchor="start">挡板</text>
    <!-- 弹簧测力套筒与标尺 -->
    <line x1="576" y1="282" x2="576" y2="310" stroke="#94a3b8" stroke-width="1.6" />
    <rect x="565" y="310" width="22" height="56" fill="rgba(15,20,37,0.85)" stroke="#94a3b8" stroke-width="1.2" />
    <rect
      v-for="i in marks"
      :key="`r${i}`"
      :x="565"
      :y="310 + (i - 1) * 8"
      width="22"
      height="8"
      :fill="i % 2 ? '#ef4444' : 'rgba(226,232,240,0.9)'"
      opacity="0.8"
    />
    <line x1="144" y1="282" x2="144" y2="310" stroke="#94a3b8" stroke-width="1.6" />
    <rect x="133" y="310" width="22" height="56" fill="rgba(15,20,37,0.85)" stroke="#94a3b8" stroke-width="1.2" />
    <rect
      v-for="i in marks"
      :key="`l${i}`"
      :x="133"
      :y="310 + (i - 1) * 8"
      width="22"
      height="8"
      :fill="i % 2 ? '#ef4444' : 'rgba(226,232,240,0.9)'"
      opacity="0.8"
    />
    <text x="606" y="348" font-family="KaTeX_Main" font-size="22" fill="#94a3b8" text-anchor="start">标尺</text>
    <!-- step 1：挡板对球的压力提供向心力 -->
    <g v-if="step >= 1">
      <CourseArrow :from="{ x: 556, y: 258 }" :to="{ x: 502, y: 258 }" stroke="#e2a846" :stroke-width="3.2" />
      <CourseArrow :from="{ x: 164, y: 258 }" :to="{ x: 218, y: 258 }" stroke="#e2a846" :stroke-width="3.2" />
      <text
        x="530"
        y="294"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="#e2a846"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="16">n</tspan>
      </text>
      <text
        x="190"
        y="294"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="#e2a846"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="4" font-size="16">n</tspan>
      </text>
    </g>
    <!-- step 2：标尺露出的格数反映向心力大小 -->
    <g v-if="step >= 2">
      <rect x="558" y="304" width="36" height="70" rx="5" fill="none" stroke="#e2a846" stroke-width="2.4" />
      <rect x="126" y="304" width="36" height="70" rx="5" fill="none" stroke="#e2a846" stroke-width="2.4" />
      <text x="350" y="422" font-family="KaTeX_Main" font-size="22" fill="#e2a846" text-anchor="middle">标尺露出的格数 ∝ 向心力</text>
    </g>
  </svg>
</template>
