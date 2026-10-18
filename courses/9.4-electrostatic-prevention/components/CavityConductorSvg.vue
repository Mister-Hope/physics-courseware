<script setup lang="ts">
// 第 9 页：空腔导体 —— 外表面感应电荷、内表面无电荷、壳壁与腔内 E = 0
defineProps<{ step: number }>();
</script>

<template>
  <svg viewBox="0 0 460 260" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 280px">
    <CourseArrow
      v-for="y in [56, 92, 128, 164, 200]"
      :key="`l${y}`"
      :from="{ x: 16, y }"
      :to="{ x: 118, y }"
      stroke="var(--c-field)"
      stroke-width="1.6"
      :opacity="0.8"
    />
    <CourseArrow
      v-for="y in [56, 92, 128, 164, 200]"
      :key="`r${y}`"
      :from="{ x: 342, y }"
      :to="{ x: 444, y }"
      stroke="var(--c-field)"
      stroke-width="1.6"
      :opacity="0.8"
    />
    <path
      d="M 120 34 L 340 34 C 356 34 366 46 366 62 L 366 198 C 366 214 356 226 340 226 L 120 226 C 104 226 94 214 94 198 L 94 62 C 94 46 104 34 120 34 Z"
      fill="var(--c-line)"
      fill-opacity="0.6"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.5"
      stroke-width="2"
    />
    <rect x="170" y="86" width="120" height="88" rx="10" fill="var(--c-bg-soft, #0f1425)" stroke="var(--c-text-mute)" stroke-opacity="0.55" stroke-width="2" />
    <text x="230" y="132" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text)">C</text>
    <text x="382" y="70" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text)">W</text>
    <template v-if="step >= 1">
      <text v-for="y in [70, 104, 138, 172, 204]" :key="`mm${y}`" x="100" :y="y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="var(--c-danger)">−</text>
      <text v-for="y in [70, 104, 138, 172, 204]" :key="`pp${y}`" x="360" :y="y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="var(--c-accent-2)">+</text>
    </template>
    <template v-if="step >= 2">
      <text x="230" y="216" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">内表面没有电荷；壳壁内 E = 0</text>
    </template>
    <template v-if="step >= 3">
      <text x="230" y="132" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">E = 0</text>
      <text x="230" y="60" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-mute)">外部电场线进不去</text>
    </template>
  </svg>
</template>
