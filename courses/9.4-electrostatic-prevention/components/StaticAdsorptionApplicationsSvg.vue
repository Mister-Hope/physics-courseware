<script setup lang="ts">
// 第 15 页：静电喷漆与静电复印
defineProps<{ step: number }>();
</script>

<template>
  <svg viewBox="0 0 560 260" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 270px">
    <!-- (a) 静电喷漆 -->
    <rect x="42" y="96" width="54" height="76" rx="8" fill="var(--c-line)" fill-opacity="0.7" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <text x="69" y="124" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent-2)">−</text>
    <text x="69" y="150" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">雾化器</text>
    <rect x="238" y="72" width="24" height="128" rx="6" fill="var(--c-danger)" fill-opacity="0.8" />
    <text x="250" y="62" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="var(--c-danger)">+</text>
    <text x="250" y="220" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">工件</text>
    <template v-if="step >= 1">
      <circle v-for="i in 5" :key="`d${i}`" :cx="112 + i * 20" :cy="104 + ((i * 29) % 60)" r="4" fill="var(--c-accent-2)" />
      <CourseArrow :from="{ x: 120, y: 134 }" :to="{ x: 232, y: 134 }" stroke="var(--c-accent-2)" stroke-width="2" />
      <text x="168" y="234" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent-2)">漆滴带负电，向正极工件沉积</text>
    </template>
    <text v-else x="168" y="234" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">静电喷漆</text>
    <!-- (b) 静电复印 -->
    <circle cx="420" cy="132" r="52" fill="var(--c-line)" fill-opacity="0.55" stroke="var(--c-text-mute)" stroke-opacity="0.5" stroke-width="2" />
    <circle cx="420" cy="132" r="40" fill="none" stroke="var(--c-text-mute)" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="5 4" />
    <text x="420" y="204" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">有机光导体鼓（OPC）</text>
    <template v-if="step >= 2">
      <line x1="356" y1="70" x2="404" y2="106" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      <text x="330" y="58" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">光照</text>
      <text x="420" y="234" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">无光照：绝缘体；受光照：导体</text>
    </template>
  </svg>
</template>
