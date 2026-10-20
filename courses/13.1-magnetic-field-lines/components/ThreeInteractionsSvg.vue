<script setup lang="ts">
/**
 * 不接触也有力的作用（13.1 P4）
 * 三格：磁体与磁体、蹄形磁体与通电导线、通电导线与通电导线；
 * show-field（点击 1）时在两者之间出现「磁场」与波纹——说明三种相互作用都通过磁场发生。
 */
const { showField = false } = defineProps<{ showField?: boolean }>();

const W = 960;
const H = 230;
const Y = 106;
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <!-- 第一格：磁体与磁体（异名相对） -->
    <rect x="56" :y="Y - 12" width="44" height="24" rx="4" fill="var(--c-velocity)" opacity="0.9" />
    <rect x="100" :y="Y - 12" width="44" height="24" rx="4" fill="var(--c-danger)" opacity="0.9" />
    <text x="78" :y="Y + 5" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text x="122" :y="Y + 5" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    <rect x="216" :y="Y - 12" width="44" height="24" rx="4" fill="var(--c-velocity)" opacity="0.9" />
    <rect x="260" :y="Y - 12" width="44" height="24" rx="4" fill="var(--c-danger)" opacity="0.9" />
    <text x="238" :y="Y + 5" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text x="282" :y="Y + 5" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    <line x1="150" :y1="Y" x2="210" :y2="Y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />

    <!-- 第二格：蹄形磁体与通电导线 -->
    <path
      d="M 366 146 V 92 Q 366 76 382 76 H 470 V 92 H 412 Q 404 92 404 100 V 146 Z"
      fill="var(--c-danger)"
      opacity="0.9"
    />
    <path
      d="M 500 146 V 92 Q 500 76 516 76 H 556 V 92 H 524 Q 516 92 516 100 V 146 Z"
      fill="var(--c-velocity)"
      opacity="0.9"
    />
    <text x="382" y="130" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
    <text x="508" y="130" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <circle cx="452" :cy="Y" r="12" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.8" />
    <circle cx="452" :cy="Y" r="3.5" fill="var(--c-text)" />
    <line x1="420" :y1="Y" x2="436" :y2="Y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />
    <line x1="468" :y1="Y" x2="496" :y2="Y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />

    <!-- 第三格：两根通电导线 -->
    <circle cx="700" :cy="Y" r="12" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.8" />
    <circle cx="700" :cy="Y" r="3.5" fill="var(--c-text)" />
    <circle cx="820" :cy="Y" r="12" fill="var(--c-surface)" stroke="var(--c-text)" stroke-width="1.8" />
    <circle cx="820" :cy="Y" r="3.5" fill="var(--c-text)" />
    <line x1="718" :y1="Y" x2="798" :y2="Y" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" />

    <!-- 点击 1：两者之间出现「磁场」 -->
    <g v-if="showField" fill="var(--c-field)">
      <text x="180" :y="Y - 22" text-anchor="middle" font-size="13" font-family="KaTeX_Main">磁场</text>
      <path :d="`M 164 ${Y - 34} q 6 -7 12 0 t 12 0`" fill="none" stroke="var(--c-field)" stroke-width="1.6" />
      <text x="452" :y="Y - 32" text-anchor="middle" font-size="13" font-family="KaTeX_Main">磁场</text>
      <path :d="`M 436 ${Y - 44} q 6 -7 12 0 t 12 0`" fill="none" stroke="var(--c-field)" stroke-width="1.6" />
      <text x="760" :y="Y - 22" text-anchor="middle" font-size="13" font-family="KaTeX_Main">磁场</text>
      <path :d="`M 744 ${Y - 34} q 6 -7 12 0 t 12 0`" fill="none" stroke="var(--c-field)" stroke-width="1.6" />
    </g>

    <!-- 三格说明 -->
    <g fill="var(--c-text-dim)" font-size="12" font-family="KaTeX_Main" text-anchor="middle">
      <text x="180" y="196">磁体与磁体</text>
      <text x="460" y="196">磁体与通电导线</text>
      <text x="760" y="196">通电导线与通电导线</text>
    </g>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
