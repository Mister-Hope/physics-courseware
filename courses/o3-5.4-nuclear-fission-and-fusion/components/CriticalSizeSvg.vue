<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();

const reveal = (at: number): { visibility: "visible" | "hidden" } => ({
  visibility: step >= at ? "visible" : "hidden",
});
</script>

<template>
  <!-- 第 7 页：临界体积示意。左边铀块小，中子容易逃逸；右边铀块大，链式反应可以继续 -->
  <svg viewBox="0 0 760 280" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="临界体积示意图">
    <rect x="80" y="50" width="170" height="160" rx="16" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="2" />
    <text x="165" y="36" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">小铀块</text>
    <circle cx="110" cy="80" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="145" cy="72" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="185" cy="86" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="215" cy="74" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="120" cy="115" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="160" cy="112" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="200" cy="124" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="225" cy="145" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="140" cy="155" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="180" cy="165" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="210" cy="185" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="130" cy="190" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <g :style="reveal(1)">
      <CourseArrow :from="{ x: 190, y: 100 }" :to="{ x: 280, y: 55 }" stroke="var(--c-velocity)" stroke-width="2" stroke-dasharray="6 4" />
      <CourseArrow :from="{ x: 220, y: 145 }" :to="{ x: 290, y: 145 }" stroke="var(--c-velocity)" stroke-width="2" stroke-dasharray="6 4" />
      <CourseArrow :from="{ x: 190, y: 185 }" :to="{ x: 275, y: 235 }" stroke="var(--c-velocity)" stroke-width="2" stroke-dasharray="6 4" />
      <text x="298" y="242" font-size="13" fill="var(--c-velocity)">中子逃逸</text>
    </g>
    <rect x="440" y="40" width="240" height="200" rx="18" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="2" />
    <text x="560" y="26" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">大铀块</text>
    <circle cx="480" cy="80" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="530" cy="72" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="580" cy="88" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="630" cy="75" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="470" cy="120" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="520" cy="112" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="570" cy="128" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="620" cy="118" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="490" cy="160" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="540" cy="152" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="590" cy="168" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="640" cy="158" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="480" cy="200" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="530" cy="192" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="580" cy="208" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <circle cx="630" cy="198" r="5" fill="var(--c-text-dim)" opacity="0.65" />
    <g :style="reveal(2)">
      <line x1="500" y1="95" x2="540" y2="130" stroke="var(--c-accent)" stroke-width="2" />
      <line x1="540" y1="130" x2="580" y2="165" stroke="var(--c-accent)" stroke-width="2" />
      <line x1="580" y1="165" x2="620" y2="200" stroke="var(--c-accent)" stroke-width="2" />
      <circle cx="500" cy="95" r="8" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.8" />
      <circle cx="540" cy="130" r="8" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.8" />
      <circle cx="580" cy="165" r="8" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.8" />
      <circle cx="620" cy="200" r="8" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.8" />
      <circle cx="520" cy="112" r="2.6" fill="var(--c-velocity)" />
      <circle cx="560" cy="148" r="2.6" fill="var(--c-velocity)" />
      <circle cx="600" cy="182" r="2.6" fill="var(--c-velocity)" />
      <text x="560" y="266" text-anchor="middle" font-size="13" fill="var(--c-accent)">链式反应继续</text>
    </g>
  </svg>
</template>
