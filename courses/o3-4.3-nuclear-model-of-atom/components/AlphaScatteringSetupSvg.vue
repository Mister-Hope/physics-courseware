<!-- 4.3 第 4 页 α 粒子散射实验装置：铅块包围的放射源 R、细通道、金箔 F、真空腔、可转动的显微镜 M 与荧光屏 S -->
<template>
  <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="20"
      y="28"
      width="520"
      height="244"
      rx="18"
      fill="var(--c-surface)"
      fill-opacity="0.35"
      stroke="var(--c-line)"
      stroke-width="1.1"
      stroke-dasharray="7 6"
    />
    <text x="34" y="50" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-mute)">真空</text>
    <rect x="36" y="106" width="84" height="88" rx="7" fill="var(--c-neutral-700)" stroke="var(--c-line)" stroke-width="1.4" />
    <rect x="50" y="120" width="56" height="60" rx="5" fill="var(--c-bg)" />
    <rect x="104" y="146" width="18" height="8" fill="var(--c-bg)" />
    <circle cx="78" cy="150" r="13" fill="var(--c-danger)" fill-opacity="0.15" />
    <circle cx="78" cy="150" r="6.5" fill="var(--c-danger)" />
    <text x="78" y="98" text-anchor="middle" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">铅块</text>
    <text x="78" y="184" text-anchor="middle" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">R</text>
    <rect x="300" y="80" width="6" height="140" rx="2" fill="var(--c-accent)" fill-opacity="0.85" stroke="var(--c-accent)" stroke-width="1" />
    <text x="292" y="66" text-anchor="end" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">金箔</text>
    <text x="298" y="66" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">F</text>
    <g class="nu-hide" :class="{ 'nu-show': step >= 1 }">
      <CourseArrow :from="{ x: 122, y: 150 }" :to="{ x: 297, y: 150 }" stroke="var(--c-velocity)" :stroke-width="1.8" stroke-dasharray="7 5" :head-size="8" />
      <circle cx="152" cy="150" r="2.4" fill="var(--c-velocity)" />
      <circle cx="192" cy="150" r="2.4" fill="var(--c-velocity)" />
      <circle cx="232" cy="150" r="2.4" fill="var(--c-velocity)" />
      <text x="140" y="134" font-size="16" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Math" font-style="italic">α</tspan><tspan font-family="system-ui, sans-serif"> 粒子束</tspan>
      </text>
    </g>
    <g class="nu-hide" :class="{ 'nu-show': step >= 2 }">
      <path d="M 377.3 123.3 A 78 78 0 0 1 348.7 213.9" fill="none" stroke="var(--c-accent)" stroke-width="1.3" stroke-dasharray="5 6" opacity="0.7" />
      <circle cx="377.3" cy="123.3" r="2.6" fill="var(--c-accent)" />
      <circle cx="348.7" cy="213.9" r="2.6" fill="var(--c-accent)" />
      <g transform="translate(304 150) rotate(-62)" opacity="0.3">
        <rect x="64" y="-13" width="7" height="26" fill="var(--c-physics)" />
        <rect x="70" y="-12" width="60" height="24" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-line)" stroke-width="1.2" />
      </g>
      <g transform="translate(304 150) rotate(55)" opacity="0.3">
        <rect x="64" y="-13" width="7" height="26" fill="var(--c-physics)" />
        <rect x="70" y="-12" width="60" height="24" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-line)" stroke-width="1.2" />
      </g>
      <path d="M 307 146 L 350 58" fill="none" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.6" />
      <path d="M 307 154 L 418 220" fill="none" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.6" />
      <path d="M 302 154 L 286 250" fill="none" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.5" />
      <path d="M 300 146 L 244 112" fill="none" stroke="var(--c-velocity)" stroke-width="1.2" stroke-dasharray="4 5" opacity="0.45" />
    </g>
    <g transform="translate(304 150) rotate(-24)">
      <rect x="100" y="-15" width="8" height="30" fill="var(--c-physics)" fill-opacity="0.9" />
      <rect x="108" y="-13" width="104" height="26" rx="6" fill="var(--c-surface-solid)" stroke="var(--c-line)" stroke-width="1.4" />
      <rect x="212" y="-9" width="16" height="18" rx="3" fill="var(--c-neutral-600)" stroke="var(--c-line)" stroke-width="1.2" />
    </g>
    <text x="410" y="88" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="var(--c-physics)">S</text>
    <text x="446" y="122" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">显微镜</text>
    <text x="506" y="122" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">M</text>
  </svg>
</template>

<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<style scoped>
.nu-hide {
  visibility: hidden;
}

.nu-show {
  visibility: visible;
}
</style>
