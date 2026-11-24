<!-- 第 2 页：汽缸同时被压缩（W）和加热（Q），内能上升（ΔU）。step 控制三个箭头依次出现 -->
<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="100 8 290 292" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="压缩并加热汽缸内气体的示意">
    <g stroke="var(--c-text-dim)" stroke-width="2.4" fill="none" stroke-linecap="round">
      <path d="M120 80 L120 236 L300 236 L300 80" />
      <path d="M124 112 L296 112" opacity="0.5" />
    </g>
    <rect x="124" y="112" width="172" height="14" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="1.6" />
    <g stroke="var(--c-text)" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M210 112 L210 54" />
      <path d="M176 54 L244 54" />
    </g>
    <g fill="var(--c-physics)" opacity="0.8">
      <circle cx="146" cy="144" r="3.6" />
      <circle cx="176" cy="144" r="3.6" />
      <circle cx="206" cy="144" r="3.6" />
      <circle cx="236" cy="144" r="3.6" />
      <circle cx="158" cy="160" r="3.6" />
      <circle cx="188" cy="160" r="3.6" />
      <circle cx="218" cy="160" r="3.6" />
      <circle cx="248" cy="160" r="3.6" />
      <circle cx="146" cy="176" r="3.6" />
      <circle cx="176" cy="176" r="3.6" />
      <circle cx="206" cy="176" r="3.6" />
      <circle cx="236" cy="176" r="3.6" />
      <circle cx="158" cy="192" r="3.6" />
      <circle cx="188" cy="192" r="3.6" />
      <circle cx="218" cy="192" r="3.6" />
      <circle cx="146" cy="208" r="3.6" />
      <circle cx="176" cy="208" r="3.6" />
      <circle cx="236" cy="208" r="3.6" />
      <circle cx="158" cy="224" r="3.6" />
      <circle cx="188" cy="224" r="3.6" />
      <circle cx="218" cy="224" r="3.6" />
      <circle cx="248" cy="224" r="3.6" />
    </g>
    <line x1="168" y1="292" x2="252" y2="292" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <g fill="var(--c-danger)" opacity="0.85">
      <path d="M174 290 C174 278 182 274 184 258 C186 274 194 278 194 290 Z" />
      <path d="M200 290 C200 272 210 266 212 244 C214 266 224 272 224 290 Z" />
      <path d="M230 290 C230 278 238 274 240 258 C242 274 250 278 250 290 Z" />
    </g>
    <g :class="{ 'ce-hidden': step < 1 }">
      <CourseArrow :from="{ x: 210, y: 16 }" :to="{ x: 210, y: 46 }" stroke="var(--c-velocity)" :stroke-width="3" :head-size="11" />
      <text x="176" y="32" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-velocity)">W</text>
    </g>
    <g :class="{ 'ce-hidden': step < 2 }">
      <path d="M210 232 C200 222 220 216 210 204" fill="none" stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="5 4" />
      <path d="M210 204 L210 216 M203 210 L210 202 L217 210" fill="none" stroke="var(--c-danger)" stroke-width="2.4" stroke-linecap="round" />
      <text x="258" y="262" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-danger)">Q</text>
    </g>
    <g :class="{ 'ce-hidden': step < 3 }">
      <CourseArrow :from="{ x: 350, y: 226 }" :to="{ x: 350, y: 150 }" stroke="var(--c-accent)" :stroke-width="3" :head-size="11" />
      <text x="360" y="196" font-family="KaTeX_Math" font-style="italic" font-size="17" fill="var(--c-accent)">ΔU</text>
    </g>
    <text x="252" y="106" font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)">活塞</text>
    <text x="252" y="196" font-family="KaTeX_Main" font-size="13" fill="var(--c-text-dim)">气体</text>
  </svg>
</template>

<style scoped>
.ce-hidden {
  visibility: hidden;
}
</style>
