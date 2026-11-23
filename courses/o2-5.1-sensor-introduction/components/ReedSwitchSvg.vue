<template>
  <!-- 原理页：干簧管玻璃管内两片软磁性簧片，磁体靠近后被磁化并接通（step=1 磁体靠近，step=2 接通） -->
  <svg viewBox="0 0 460 270" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="55" y="70" width="350" height="88" rx="44" fill="rgba(96,165,250,0.05)" stroke="#60a5fa" stroke-width="2" opacity="0.85" />
    <line x1="18" y1="114" x2="63" y2="114" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round" />
    <line x1="442" y1="120" x2="397" y2="120" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round" />
    <g :opacity="step >= 2 ? 0 : 1" style="transition: opacity 0.3s ease">
      <line x1="65" y1="112" x2="248" y2="112" stroke="#e2e8f0" stroke-width="7" stroke-linecap="round" />
      <line x1="395" y1="120" x2="212" y2="120" stroke="#e2e8f0" stroke-width="7" stroke-linecap="round" />
    </g>
    <g :opacity="step >= 2 ? 1 : 0" style="transition: opacity 0.3s ease">
      <polyline points="65,112 238,112 250,116" fill="none" stroke="#e2e8f0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="395,120 262,120 250,116" fill="none" stroke="#e2e8f0" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <g :opacity="step >= 2 ? 1 : 0" style="transition: opacity 0.3s ease">
      <circle cx="250" cy="116" r="10" fill="rgba(251,191,36,0.2)" />
      <circle cx="250" cy="116" r="4" fill="#fbbf24" />
    </g>
    <text x="46" y="44" fill="#94a3b8" font-size="14">玻璃管</text>
    <line x1="83" y1="50" x2="100" y2="70" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <text x="414" y="44" text-anchor="end" fill="#94a3b8" font-size="14">软磁性簧片</text>
    <line x1="398" y1="52" x2="330" y2="120" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <g :opacity="step >= 1 ? 1 : 0" style="transition: opacity 0.4s ease">
      <BarMagnet :x="250" :y="218" :length="64" :width="34" n-side="top" :label-size="15" />
      <CourseArrow
        :from="{ x: 222, y: 184 }"
        :to="{ x: 238, y: 160 }"
        stroke="#e2a846"
        stroke-width="1.6"
        stroke-dasharray="5 5"
        :head-size="7"
        opacity="0.65"
      />
      <CourseArrow
        :from="{ x: 250, y: 184 }"
        :to="{ x: 250, y: 156 }"
        stroke="#e2a846"
        stroke-width="1.6"
        stroke-dasharray="5 5"
        :head-size="7"
        opacity="0.65"
      />
      <CourseArrow
        :from="{ x: 278, y: 184 }"
        :to="{ x: 262, y: 160 }"
        stroke="#e2a846"
        stroke-width="1.6"
        stroke-dasharray="5 5"
        :head-size="7"
        opacity="0.65"
      />
      <text x="318" y="210" fill="#e2a846" font-size="14">磁场</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ step: number }>();
</script>
