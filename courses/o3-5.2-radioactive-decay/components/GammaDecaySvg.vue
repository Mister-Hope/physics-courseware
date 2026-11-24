<!-- 第 7 页：新核从高能级跃迁到低能级，放出 γ 光子 -->
<script setup lang="ts">
interface Props {
  showTransition?: boolean;
}

const { showTransition = false } = defineProps<Props>();
</script>

<template>
  <div class="gamma-figure">
    <svg viewBox="0 0 420 300" width="100%" xmlns="http://www.w3.org/2000/svg">
      <line x1="108" y1="86" x2="356" y2="86" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
      <line x1="108" y1="226" x2="356" y2="226" stroke="var(--c-accent-2)" stroke-width="2.6" stroke-linecap="round" />
      <text x="96" y="91" text-anchor="end" font-size="15" fill="var(--c-text-dim)">高能级</text>
      <text x="96" y="231" text-anchor="end" font-size="15" fill="var(--c-text-dim)">低能级</text>
      <g :class="{ 'vp-hidden': !showTransition }">
        <CourseArrow :from="{ x: 232, y: 98 }" :to="{ x: 232, y: 212 }" stroke="var(--c-accent)" :stroke-width="2.2" :head-size="10" />
        <path d="M 248 150 q 10 -13 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" />
      </g>
    </svg>
    <div class="gamma-label mini-note" :class="{ 'vp-hidden': !showTransition }"><Latex tex="\gamma" /> 光子</div>
  </div>
</template>
