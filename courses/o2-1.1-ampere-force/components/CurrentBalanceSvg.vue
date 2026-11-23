<!-- 第 16 页：电流天平示意（右臂悬挂矩形线圈，磁场垂直纸面，左盘加砝码） -->
<script setup>
defineProps({ step: { type: Number, default: 0 } });
</script>

<template>
  <svg viewBox="0 0 480 340" width="480" height="340" class="course-fig" role="img" aria-label="电流天平示意">
    <!-- 支架与横梁 -->
    <line x1="240" y1="30" x2="240" y2="96" stroke="var(--c-text-dim)" stroke-width="6" stroke-linecap="round" />
    <line x1="96" y1="70" x2="384" y2="70" stroke="var(--c-text-dim)" stroke-width="4" stroke-linecap="round" />
    <polygon points="240,70 231,88 249,88" fill="var(--c-text-dim)" />
    <!-- 左盘与砝码 -->
    <line x1="130" y1="70" x2="130" y2="122" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <path d="M98 122 H162 L152 144 H108 Z" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <rect x="120" y="100" width="20" height="18" rx="2" fill="var(--c-accent)" opacity="0.8" />
    <text x="130" y="172" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">m</text>
    <!-- 右臂与矩形线圈 -->
    <line x1="350" y1="70" x2="350" y2="112" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <rect x="312" y="112" width="76" height="112" rx="3" fill="none" stroke="var(--c-accent)" stroke-width="3" />
    <!-- 线圈下边（在磁场中） -->
    <line x1="312" y1="224" x2="388" y2="224" stroke="var(--c-accent)" stroke-width="6" stroke-linecap="round" />
    <CourseArrow :from="{ x: 320, y: 208 }" :to="{ x: 372, y: 208 }" stroke="var(--c-accent-2)" :stroke-width="2" label="I" />
    <!-- 磁场：垂直于线圈平面向里 -->
    <FieldDots :x="292" :y="190" dir="in" :cols="5" :rows="2" :spacing="22" :size="3" :opacity="0.9" />
    <text x="272" y="186" text-anchor="end" fill="var(--c-field)" font-size="15" font-family="KaTeX_Math" font-style="italic">B</text>
    <!-- 安培力（点击后） -->
    <g v-show="step >= 1">
      <CourseArrow :from="{ x: 350, y: 224 }" :to="{ x: 350, y: 148 }" stroke="var(--c-force)" :stroke-width="2.6" label="F" />
      <text x="400" y="244" fill="var(--c-text-dim)" font-size="13">n 匝</text>
    </g>
  </svg>
</template>
