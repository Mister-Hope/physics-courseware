<script setup lang="ts">
/** 第 6 页例 1：多个金属圆筒依次排列，圆筒内无电场、间隙中加速；点击后标出"匀速"与"加速"。 */
defineProps<{ showAnalysis?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 440 220" width="440" height="220" font-family="Inter, system-ui, sans-serif">
    <line x1="14" y1="112" x2="426" y2="112" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="6 5" stroke-opacity="0.5" />
    <rect x="36" y="82" width="7" height="60" rx="2" fill="var(--c-text-dim)" fill-opacity="0.7" />
    <rect
      x="53"
      y="82"
      width="26"
      height="60"
      rx="2"
      fill="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)"
      stroke="var(--c-text)"
      stroke-width="1.5"
      stroke-opacity="0.85"
    />
    <rect
      x="88"
      y="82"
      width="37"
      height="60"
      rx="2"
      fill="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)"
      stroke="var(--c-text)"
      stroke-width="1.5"
      stroke-opacity="0.85"
    />
    <rect
      x="134"
      y="82"
      width="45"
      height="60"
      rx="2"
      fill="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)"
      stroke="var(--c-text)"
      stroke-width="1.5"
      stroke-opacity="0.85"
    />
    <rect
      x="188"
      y="82"
      width="52"
      height="60"
      rx="2"
      fill="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)"
      stroke="var(--c-text)"
      stroke-width="1.5"
      stroke-opacity="0.85"
    />
    <rect
      x="249"
      y="82"
      width="58"
      height="60"
      rx="2"
      fill="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)"
      stroke="var(--c-text)"
      stroke-width="1.5"
      stroke-opacity="0.85"
    />
    <text x="39" y="74" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">0</text>
    <text x="66" y="74" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">1</text>
    <text x="106" y="74" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">2</text>
    <text x="156" y="74" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">3</text>
    <text x="214" y="74" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">4</text>
    <text x="278" y="74" text-anchor="middle" fill="var(--c-text-dim)" font-size="13">5</text>
    <text x="330" y="118" fill="var(--c-text-dim)" font-size="16">……</text>
    <circle cx="26" cy="112" r="6" fill="var(--c-velocity)" stroke="var(--c-text)" stroke-width="1.1" />
    <text x="26" y="115.5" text-anchor="middle" fill="var(--c-text)" font-size="9" font-weight="700">−</text>
    <text x="26" y="166" text-anchor="middle" fill="var(--c-text-dim)" font-size="11">电子</text>
    <g v-if="showAnalysis">
      <text x="24" y="34" fill="var(--c-text-dim)" font-size="12.5">圆筒内：匀速直线运动</text>
      <line x1="96" y1="40" x2="105" y2="80" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" />
      <text x="242" y="34" fill="var(--c-text-dim)" font-size="12.5">间隙：被静电力加速</text>
      <line x1="310" y1="40" x2="244" y2="80" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 4" />
    </g>
  </svg>
</template>
