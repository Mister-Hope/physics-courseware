<script setup lang="ts">
/**
 * 秤上的烧杯与木球（§4.6 习题页）
 *
 * 烧杯放在秤上，杯中装水，木球用细绳拴在杯底、浸没在水中。`showAnalysis` 为 true 时叠上分析标注： 木球向上加速（金）、木球上浮时被挤向下流的水向下加速（蓝）。
 */
const { showAnalysis = false } = defineProps<{
  showAnalysis?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 230 300" width="240" height="313" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <!-- 玻璃杯身的竖向光泽 -->
      <linearGradient id="bbGlass" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-neutral-200) 18%, transparent)" />
        <stop offset="26%" stop-color="color-mix(in srgb, var(--c-neutral-50) 7%, transparent)" />
        <stop offset="76%" stop-color="color-mix(in srgb, var(--c-text-dim) 6%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-text-dim) 20%, transparent)" />
      </linearGradient>
      <!-- 水体深浅渐变 -->
      <linearGradient id="bbWater" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-physics-light) 40%, transparent)" />
        <stop offset="55%" stop-color="color-mix(in srgb, var(--c-accent-2) 46%, transparent)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.55)" />
      </linearGradient>
      <!-- 木球木纹底色 -->
      <linearGradient id="bbWood" x1="12%" y1="0%" x2="82%" y2="100%">
        <stop offset="0%" stop-color="#d8aa6d" />
        <stop offset="58%" stop-color="#b37c43" />
        <stop offset="100%" stop-color="#8a5a2b" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 秤：平台 + 表身 + 示数窗 ==================== -->
    <rect x="30" y="248" width="170" height="7" rx="2.4" fill="var(--c-surface-solid)" stroke="var(--c-border)" stroke-width="1.2" />
    <rect
      x="50"
      y="255"
      width="130"
      height="30"
      rx="5"
      fill="color-mix(in srgb, var(--c-surface-solid) 86%, transparent)"
      stroke="var(--c-border)"
      stroke-width="1.2"
    />
    <rect x="86" y="261" width="58" height="17" rx="2.4" fill="var(--c-bg-soft)" stroke="var(--c-border)" stroke-width="1" />
    <rect x="58" y="285" width="12" height="4" rx="1.4" fill="color-mix(in srgb, var(--c-neutral-400) 55%, transparent)" />
    <rect x="160" y="285" width="12" height="4" rx="1.4" fill="color-mix(in srgb, var(--c-neutral-400) 55%, transparent)" />

    <!-- ==================== 2. 烧杯与水体 ==================== -->
    <!-- 水体（贴着杯内壁） -->
    <path d="M 61 104 L 61 241 Q 61 247 68 247 L 162 247 Q 169 247 169 241 L 169 104 Z" fill="url(#bbWater)" />
    <!-- 液面 -->
    <ellipse cx="115" cy="104" rx="54" ry="4" fill="rgba(125,211,252,0.30)" stroke="#7dd3fc" stroke-width="1.4" />
    <!-- 杯身外轮廓（圆底） -->
    <path
      d="M 57 44 L 57 242 Q 57 250 65 250 L 165 250 Q 173 250 173 242 L 173 44"
      fill="url(#bbGlass)"
      stroke="color-mix(in srgb, var(--c-neutral-300) 72%, transparent)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />
    <!-- 杯口两端的翻边 -->
    <line x1="57" y1="44" x2="49" y2="44" stroke="color-mix(in srgb, var(--c-neutral-300) 72%, transparent)" stroke-width="2.4" stroke-linecap="round" />
    <line x1="173" y1="44" x2="181" y2="44" stroke="color-mix(in srgb, var(--c-neutral-300) 72%, transparent)" stroke-width="2.4" stroke-linecap="round" />
    <!-- 杯壁左侧竖向高光 -->
    <line x1="63" y1="60" x2="63" y2="238" stroke="color-mix(in srgb, var(--c-neutral-50) 30%, transparent)" stroke-width="2.6" stroke-linecap="round" />

    <!-- ==================== 3. 木球与拴在杯底的细绳 ==================== -->
    <circle cx="115" cy="204" r="20" fill="url(#bbWood)" stroke="#5f3d1d" stroke-width="1.2" />
    <path d="M 101 197 Q 115 191 129 198" fill="none" stroke="rgba(84,52,22,0.5)" stroke-width="1.3" />
    <path d="M 100 211 Q 115 205 130 212" fill="none" stroke="rgba(84,52,22,0.5)" stroke-width="1.3" />
    <line x1="115" y1="224" x2="115" y2="246" stroke="var(--c-neutral-200)" stroke-width="1.7" />
    <circle cx="115" cy="246" r="2.4" fill="var(--c-neutral-300)" />

    <!-- ==================== 4. 分析标注（点击后才出） ==================== -->
    <g v-if="showAnalysis">
      <!-- 木球向上加速 -->
      <CourseArrow :from="{ x: 148, y: 206 }" :to="{ x: 148, y: 164 }" stroke="var(--c-accent)" :stroke-width="3" />
      <!-- 被挤向下流的水：向下加速 -->
      <CourseArrow :from="{ x: 80, y: 122 }" :to="{ x: 80, y: 210 }" stroke="var(--c-accent-2)" :stroke-width="2.8" />
    </g>
  </svg>
</template>
