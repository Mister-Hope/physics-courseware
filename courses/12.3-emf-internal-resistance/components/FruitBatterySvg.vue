<script setup lang="ts">
/** 水果电池：铜片、锌片相隔约 1 cm 插入水果（教材 §12.3 参考案例 2 的示意图） */
</script>

<template>
  <div class="figure fruit-figure">
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
      <!-- 果身 -->
      <path
        d="M 150 52 C 168 52 178 72 182 96 C 186 120 206 138 206 164 C 206 190 182 206 150 206 C 118 206 94 190 94 164 C 94 138 114 120 118 96 C 122 72 132 52 150 52 Z"
        fill="color-mix(in srgb, var(--c-accent) 16%, transparent)"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
      <line x1="150" y1="52" x2="157" y2="32" stroke="var(--c-ok)" stroke-width="3" stroke-linecap="round" />
      <!-- 引线 -->
      <g fill="none" stroke="var(--c-neutral-300)" stroke-width="2.4" stroke-linecap="round">
        <path d="M 127.5 88 V 30 H 300" />
        <path d="M 173.5 88 V 56 H 300" />
      </g>
      <circle cx="300" cy="30" r="3.4" fill="var(--c-neutral-300)" />
      <circle cx="300" cy="56" r="3.4" fill="var(--c-neutral-300)" />
      <!-- 铜片（正极）与锌片（负极） -->
      <rect x="124" y="88" width="7" height="76" rx="2" fill="var(--c-force)" />
      <rect x="170" y="88" width="7" height="76" rx="2" fill="var(--c-neutral-300)" />
      <text x="116" y="80" text-anchor="end" font-size="19" fill="var(--c-force)">铜片（正极）</text>
      <text x="186" y="80" font-size="19" fill="var(--c-neutral-300)">锌片（负极）</text>
      <!-- 两片相距约 1 cm -->
      <g stroke="var(--c-text-dim)" stroke-width="1.4" stroke-linecap="round">
        <line x1="131" y1="178" x2="170" y2="178" />
        <line x1="131" y1="173" x2="131" y2="183" />
        <line x1="170" y1="173" x2="170" y2="183" />
      </g>
      <text x="150" y="200" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">约 1 cm</text>
    </svg>
  </div>
</template>

<style scoped>
/* 果身图：挂共享 .figure 撑满栏宽，只加宽度上限（图内符号按 16px 体系画，别放太大） */
.fruit-figure {
  max-width: 460px;
  margin: 0 auto;
}
</style>
