<script setup lang="ts">
// 第 3 页：匀强电场中的矩形导体 ABCD —— 感应电荷与内部 E'
withDefaults(
  defineProps<{
    showCharges?: boolean;
    showInducedField?: boolean;
  }>(),
  { showCharges: false, showInducedField: false },
);

const ys = [56, 92, 128, 164, 200];
const minusY = [86, 118, 150, 182];
const plusY = [86, 118, 150, 182];
</script>

<template>
  <svg viewBox="0 0 420 250" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 280px">
    <CourseArrow
      v-for="y in ys"
      :key="`fl${y}`"
      :from="{ x: 22, y }"
      :to="{ x: 140, y }"
      stroke="var(--c-field)"
      stroke-width="1.8"
      :opacity="0.85"
    />
    <CourseArrow
      v-for="y in ys"
      :key="`fr${y}`"
      :from="{ x: 280, y }"
      :to="{ x: 398, y }"
      stroke="var(--c-field)"
      stroke-width="1.8"
      :opacity="0.85"
    />
    <rect x="146" y="52" width="128" height="150" rx="8" fill="var(--c-line)" fill-opacity="0.55" stroke="var(--c-text-mute)" stroke-opacity="0.5" stroke-width="2" />
    <text x="146" y="44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text)">A</text>
    <text x="146" y="216" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text)">B</text>
    <text x="274" y="216" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text)">C</text>
    <text x="274" y="44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text)">D</text>
    <template v-if="showCharges">
      <text
        v-for="y in minusY"
        :key="`m${y}`"
        x="162"
        :y="y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-danger)"
      >
        −
      </text>
      <text
        v-for="y in plusY"
        :key="`p${y}`"
        x="258"
        :y="y"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-accent-2)"
      >
        +
      </text>
    </template>
    <CourseArrow
      v-if="showInducedField"
      :from="{ x: 258, y: 127 }"
      :to="{ x: 162, y: 127 }"
      stroke="var(--c-accent)"
      stroke-width="3"
      label="E′"
    />
    <text x="210" y="236" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-field)">E<tspan baseline-shift="sub" font-size="10">0</tspan></text>
  </svg>
</template>
