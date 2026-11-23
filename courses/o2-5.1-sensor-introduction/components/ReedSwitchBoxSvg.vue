<template>
  <!-- 问题页：小盒子 A 的侧面露出小灯泡，盒外没有开关；把磁体 B 放到盒子上，灯泡发光（step=1） -->
  <svg viewBox="0 0 400 255" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <SurfaceHatch :from="{ x: 30, y: 232 }" :to="{ x: 370, y: 232 }" side="below" color="rgba(148,163,184,0.35)" :thickness="9" :gap="20" />
    <rect x="80" y="72" width="190" height="160" rx="14" fill="rgba(30,41,59,0.72)" stroke="#94a3b8" stroke-width="2" />
    <text x="175" y="170" text-anchor="middle" fill="rgba(226,168,70,0.26)" font-size="78" font-weight="700">?</text>
    <circle cx="102" cy="94" r="11" fill="none" stroke="#94a3b8" stroke-width="1.4" opacity="0.8" />
    <text x="102" y="99" text-anchor="middle" fill="#94a3b8" font-size="13">A</text>
    <line x1="270" y1="150" x2="285" y2="150" stroke="#94a3b8" stroke-width="2" />
    <rect x="282" y="140" width="10" height="20" rx="3" fill="#94a3b8" />
    <circle
      cx="308"
      cy="150"
      r="18"
      :fill="step >= 1 ? 'rgba(251,191,36,0.92)' : 'rgba(251,191,36,0.07)'"
      :stroke="step >= 1 ? '#fbbf24' : '#94a3b8'"
      stroke-width="2"
    />
    <path d="M 299 139 A 12 12 0 0 1 315 136" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.6" stroke-linecap="round" />
    <rect x="300" y="166" width="16" height="10" rx="2" fill="#94a3b8" />
    <g :opacity="step >= 1 ? 1 : 0" style="transition: opacity 0.35s ease">
      <circle cx="308" cy="150" r="28" fill="rgba(251,191,36,0.14)" />
      <circle cx="308" cy="150" r="43" fill="rgba(251,191,36,0.06)" />
      <g stroke="#fbbf24" stroke-width="2" stroke-linecap="round">
        <line x1="308" y1="120" x2="308" y2="110" />
        <line x1="328" y1="130" x2="335" y2="123" />
        <line x1="338" y1="150" x2="348" y2="150" />
        <line x1="328" y1="170" x2="335" y2="177" />
        <line x1="288" y1="130" x2="281" y2="123" />
        <line x1="278" y1="150" x2="268" y2="150" />
        <line x1="288" y1="170" x2="281" y2="177" />
      </g>
    </g>
    <g :style="{ transform: step >= 1 ? 'translate(-155px, 12px)' : 'translate(0px, 0px)', transition: 'transform 0.6s ease' }">
      <BarMagnet :x="330" :y="48" :length="76" :width="24" n-side="right" :label-size="15" />
      <text x="330" y="24" text-anchor="middle" fill="#94a3b8" font-size="14">B</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ step: number }>();
</script>
