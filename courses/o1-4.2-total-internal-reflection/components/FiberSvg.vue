<!-- 光导纤维：内芯折射率大于外套，光在芯-套界面发生全反射 -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 480 260" class="fiber-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fiberCore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b82f6" stop-opacity=".55" />
        <stop offset="1" stop-color="#1e3a8a" stop-opacity=".8" />
      </linearGradient>
    </defs>
    <rect x="40" y="104" width="400" height="92" rx="12" fill="#1e293b" stroke="#64748b" stroke-width="1.4" />
    <rect x="40" y="118" width="400" height="64" rx="8" fill="url(#fiberCore)" stroke="#93c5fd" stroke-width="1.4" />
    <g :opacity="step >= 1 ? 1 : 0">
      <polyline
        points="10,150 40,150 90,118 140,182 190,118 240,182 290,118 340,182 390,118 440,150"
        fill="none"
        stroke="#fbbf24"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <line x1="90" y1="104" x2="90" y2="132" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 4" opacity=".7" />
      <line x1="140" y1="168" x2="140" y2="196" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 4" opacity=".7" />
      <text x="100" y="98" fill="#fbbf24" font-size="15">全反射</text>
      <text x="150" y="204" fill="#fbbf24" font-size="15">全反射</text>
    </g>
    <text x="52" y="144" fill="#dbeafe" font-size="15">内芯</text>
    <text x="120" y="144" fill="#93c5fd" font-size="15">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan><tspan baseline-shift="sub" font-size="11">1</tspan>
    </text>
    <text x="52" y="222" fill="#94a3b8" font-size="15">外套</text>
    <text x="120" y="222" fill="#94a3b8" font-size="15">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan><tspan baseline-shift="sub" font-size="11">2</tspan>
    </text>
    <text x="350" y="96" fill="#93c5fd" font-size="16">
      <tspan font-family="KaTeX_Math" font-style="italic">n</tspan><tspan baseline-shift="sub" font-size="11">1</tspan><tspan> &gt; </tspan
      ><tspan font-family="KaTeX_Math" font-style="italic">n</tspan><tspan baseline-shift="sub" font-size="11">2</tspan>
    </text>
  </svg>
</template>
