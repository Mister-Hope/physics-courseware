<!-- 4.1 P4：带小孔的空腔——电磁波射入小孔后在腔内多次反射并被吸收（step 控制分步） -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 460 280" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="56" y="46" width="262" height="178" rx="10" fill="var(--c-surface)" stroke="var(--c-border-glow)" stroke-width="1.5" />
    <rect x="74" y="64" width="226" height="142" rx="6" fill="var(--c-bg)" stroke="var(--c-border)" stroke-width="1.1" />
    <circle cx="300" cy="135" r="13" fill="var(--c-bg)" stroke="var(--c-accent)" stroke-width="1.5" />
    <circle cx="300" cy="135" r="20" fill="var(--c-accent)" fill-opacity="0.12" />
    <g class="bb-hide" :class="{ 'bb-show': step >= 1 }">
      <CourseArrow :from="{ x: 434, y: 112 }" :to="{ x: 318, y: 130 }" stroke="var(--c-velocity)" :stroke-width="1.6" :head-size="8" />
      <CourseArrow :from="{ x: 434, y: 156 }" :to="{ x: 318, y: 140 }" stroke="var(--c-velocity)" :stroke-width="1.6" :head-size="8" />
      <path
        d="M 300 135 L 268 96 L 238 172 L 206 110 L 174 176 L 142 118 L 112 168"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.3"
        stroke-dasharray="4 4"
        opacity="0.5"
      />
      <circle cx="268" cy="96" r="2.6" fill="var(--c-accent)" opacity="0.8" />
      <circle cx="238" cy="172" r="2.6" fill="var(--c-accent)" opacity="0.8" />
      <circle cx="206" cy="110" r="2.6" fill="var(--c-accent)" opacity="0.8" />
      <circle cx="174" cy="176" r="2.6" fill="var(--c-accent)" opacity="0.8" />
      <text x="410" y="96" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">入射电磁波</text>
    </g>
    <g class="bb-hide" :class="{ 'bb-show': step >= 2 }">
      <path d="M 310 112 C 332 96 338 142 358 118" fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-linecap="round" opacity="0.8" />
      <path d="M 312 128 C 336 116 342 156 366 132" fill="none" stroke="var(--c-physics)" stroke-width="1.5" stroke-linecap="round" opacity="0.65" />
      <path d="M 312 146 C 334 138 340 170 362 154" fill="none" stroke="var(--c-velocity)" stroke-width="1.4" stroke-linecap="round" opacity="0.5" />
      <text x="402" y="214" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">出射辐射</text>
    </g>
    <line x1="300" y1="152" x2="330" y2="182" stroke="var(--c-text-dim)" stroke-width="1" opacity="0.6" />
    <text x="336" y="194" font-size="13" fill="var(--c-text-dim)">小孔</text>
    <text x="180" y="248" text-anchor="middle" font-size="13" fill="var(--c-text-dim)">空腔</text>
  </svg>
</template>

<style scoped>
.bb-hide {
  visibility: hidden;
}

.bb-show {
  visibility: visible;
}
</style>
