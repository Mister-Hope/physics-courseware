<script setup lang="ts">
// 第 7 页：尖端放电的利用（避雷针）与防止（高压设备光滑、电晕）
defineProps<{ step: number }>();
</script>

<template>
  <svg viewBox="0 0 560 270" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 290px">
    <SurfaceHatch :from="{ x: 20, y: 232 }" :to="{ x: 266, y: 232 }" side="below" />
    <!-- 建筑物与避雷针 -->
    <rect x="120" y="150" width="120" height="82" rx="6" fill="var(--c-line)" fill-opacity="0.6" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <rect x="150" y="170" width="24" height="30" rx="3" fill="var(--c-bg-soft)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <rect x="188" y="170" width="24" height="30" rx="3" fill="var(--c-bg-soft)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <line x1="180" y1="150" x2="180" y2="70" stroke="var(--c-accent)" stroke-width="4" stroke-linecap="round" />
    <path d="M 180 150 L 180 232" fill="none" stroke="var(--c-accent)" stroke-width="3" />
    <line x1="166" y1="236" x2="194" y2="236" stroke="var(--c-accent)" stroke-width="3" />
    <line x1="172" y1="242" x2="188" y2="242" stroke="var(--c-accent)" stroke-width="2.2" />
    <!-- 雷雨云 -->
    <path
      d="M 36 74 C 36 52 56 40 76 46 C 84 28 112 26 124 44 C 148 40 166 56 162 76 C 158 92 138 98 120 94 L 52 94 C 40 92 34 86 36 74 Z"
      fill="var(--c-line)"
      fill-opacity="0.7"
      stroke="var(--c-text-mute)"
      stroke-opacity="0.5"
    />
    <text x="80" y="78" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">−</text>
    <text x="108" y="86" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">−</text>
    <text x="132" y="76" font-family="KaTeX_Main" font-size="15" fill="var(--c-danger)">−</text>
    <template v-if="step >= 1">
      <text x="188" y="66" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">+</text>
      <text x="172" y="86" font-family="KaTeX_Main" font-size="15" fill="var(--c-accent-2)">+</text>
      <CourseArrow :from="{ x: 180, y: 62 }" :to="{ x: 180, y: 26 }" stroke="var(--c-accent-2)" stroke-width="2" />
      <CourseArrow :from="{ x: 168, y: 66 }" :to="{ x: 148, y: 30 }" stroke="var(--c-accent-2)" stroke-width="2" />
      <text x="96" y="132" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">尖端放电</text>
    </template>
    <!-- 高压设备 / 高压线 -->
    <SurfaceHatch :from="{ x: 300, y: 232 }" :to="{ x: 544, y: 232 }" side="below" />
    <line x1="316" y1="80" x2="316" y2="232" stroke="var(--c-text-mute)" stroke-width="3" />
    <line x1="508" y1="80" x2="508" y2="232" stroke="var(--c-text-mute)" stroke-width="3" />
    <line x1="308" y1="86" x2="516" y2="86" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 320 96 C 400 116 440 116 504 96" fill="none" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 320 112 C 400 134 440 134 504 112" fill="none" stroke="var(--c-text-mute)" stroke-width="3" />
    <path d="M 320 128 C 400 152 440 152 504 128" fill="none" stroke="var(--c-text-mute)" stroke-width="3" />
    <template v-if="step >= 2">
      <path d="M 320 96 C 400 116 440 116 504 96" fill="none" stroke="var(--c-physics)" stroke-width="5" stroke-opacity="0.45" />
      <path d="M 320 112 C 400 134 440 134 504 112" fill="none" stroke="var(--c-physics)" stroke-width="5" stroke-opacity="0.45" />
      <path d="M 320 128 C 400 152 440 152 504 128" fill="none" stroke="var(--c-physics)" stroke-width="5" stroke-opacity="0.45" />
      <text x="404" y="70" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-physics)">绿色光晕（电晕）</text>
      <text x="404" y="200" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-accent)">表面尽量光滑</text>
    </template>
  </svg>
</template>
