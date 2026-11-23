<script setup lang="ts">
const { showForces = false } = defineProps<{ showForces?: boolean }>();
</script>

<template>
  <svg class="em-qual-svg" viewBox="0 0 520 260" role="img" aria-label="木筷竖直浮在水中">
    <path
      d="M 150 55 L 150 225 Q 150 245 170 245 L 350 245 Q 370 245 370 225 L 370 55"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path d="M 158 138 L 158 224 Q 158 237 171 237 L 349 237 Q 362 237 362 224 L 362 138 Z" fill="var(--c-sky)" opacity="0.22" />
    <path d="M 158 138 L 362 138" stroke="var(--c-sky)" stroke-width="2.5" opacity="0.9" />
    <rect x="252" y="30" width="16" height="180" rx="5" fill="var(--c-accent-2)" opacity="0.9" />
    <ellipse cx="260" cy="196" rx="15" ry="4.5" fill="none" stroke="var(--c-text)" stroke-width="2" opacity="0.55" />
    <ellipse cx="260" cy="204" rx="15" ry="4.5" fill="none" stroke="var(--c-text)" stroke-width="2" opacity="0.55" />
    <ellipse cx="260" cy="212" rx="15" ry="4.5" fill="none" stroke="var(--c-text)" stroke-width="2" opacity="0.55" />
    <text x="292" y="46" font-family="KaTeX_Main" font-size="16" fill="var(--c-text-dim)">木筷</text>
    <text x="372" y="132" font-family="KaTeX_Main" font-size="15" fill="var(--c-sky)">水面</text>
    <g v-if="showForces">
      <line x1="260" y1="118" x2="302" y2="118" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7" />
      <CourseArrow :from="[302, 118]" :to="[302, 180]" stroke="var(--c-danger)" :stroke-width="3" :head-size="9" />
      <CourseArrow :from="[302, 118]" :to="[302, 82]" stroke="var(--c-sky)" :stroke-width="3" :head-size="9" />
      <text x="312" y="192" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-danger)">mg</text>
      <text x="312" y="78" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-sky)">F</text>
      <text x="326" y="78" font-family="KaTeX_Main" font-size="15" fill="var(--c-sky)">浮</text>
    </g>
  </svg>
</template>

<style scoped>
.em-qual-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
