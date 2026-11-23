<script setup lang="ts">
// 第 8 页：光敏电阻 RG 的两态（有光照电阻小、遮光电阻大）——左亮右暗并排
</script>

<template>
  <svg viewBox="0 0 460 210" class="photo-svg" role="img" aria-label="光敏电阻在光照和遮光下的电阻变化">
    <!-- 左：有光照 -->
    <g>
      <text x="110" y="34" text-anchor="middle" font-size="16" fill="var(--c-accent)">有光照</text>
      <CourseArrow
        :from="{ x: 42, y: 82 }"
        :to="{ x: 84, y: 124 }"
        stroke="var(--c-accent)"
        :head-size="9"
      />
      <CourseArrow
        :from="{ x: 68, y: 62 }"
        :to="{ x: 110, y: 104 }"
        stroke="var(--c-accent)"
        :head-size="9"
      />
      <line x1="18" y1="140" x2="72" y2="140" stroke="var(--c-text)" stroke-width="1.6" />
      <line x1="148" y1="140" x2="202" y2="140" stroke="var(--c-text)" stroke-width="1.6" />
      <rect
        x="72"
        y="124"
        width="76"
        height="32"
        rx="2"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="1.6"
      />
    </g>

    <line
      x1="230"
      y1="26"
      x2="230"
      y2="176"
      stroke="var(--c-border)"
      stroke-width="1"
      stroke-dasharray="5 6"
    />

    <!-- 右：遮光 -->
    <g>
      <text x="345" y="34" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">遮光</text>
      <CourseArrow
        :from="{ x: 277, y: 82 }"
        :to="{ x: 319, y: 124 }"
        stroke="var(--c-text-mute)"
        :head-size="9"
        opacity="0.35"
      />
      <CourseArrow
        :from="{ x: 303, y: 62 }"
        :to="{ x: 345, y: 104 }"
        stroke="var(--c-text-mute)"
        :head-size="9"
        opacity="0.35"
      />
      <line x1="253" y1="140" x2="307" y2="140" stroke="var(--c-text)" stroke-width="1.6" />
      <line x1="383" y1="140" x2="437" y2="140" stroke="var(--c-text)" stroke-width="1.6" />
      <rect
        x="307"
        y="124"
        width="76"
        height="32"
        rx="2"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text)"
        stroke-width="1.6"
      />
    </g>

  </svg>
</template>

<style scoped>
.photo-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
