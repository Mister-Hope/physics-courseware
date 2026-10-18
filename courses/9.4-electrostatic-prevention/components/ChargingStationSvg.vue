<script setup lang="ts">
// 第 2 / 17 页：加油站场景 + 静电释放器（可选接地线、电荷转移、放火花的对照小画面）
withDefaults(
  defineProps<{
    showGrounding?: boolean;
    showChargeFlow?: boolean;
    showSpark?: boolean;
  }>(),
  { showGrounding: false, showChargeFlow: false, showSpark: false },
);

const charges = [
  { x: 150, y: 196 },
  { x: 140, y: 220 },
  { x: 158, y: 232 },
];
</script>

<template>
  <svg viewBox="0 0 460 320" class="w-full" xmlns="http://www.w3.org/2000/svg" style="height: 300px">
    <SurfaceHatch :from="{ x: 16, y: 268 }" :to="{ x: 444, y: 268 }" side="below" />
    <!-- 加油机 -->
    <rect x="286" y="150" width="66" height="118" rx="8" fill="var(--c-line)" fill-opacity="0.6" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <rect x="296" y="164" width="46" height="34" rx="4" fill="var(--c-bg-soft, #0f1425)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <text x="319" y="186" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="13" fill="var(--c-accent)">油</text>
    <path d="M 352 196 C 380 196 384 232 360 240" fill="none" stroke="var(--c-text-mute)" stroke-width="3" stroke-linecap="round" />
    <!-- 汽车 -->
    <path d="M 246 250 L 254 222 L 300 222 L 310 250 Z" fill="var(--c-line)" fill-opacity="0.7" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <rect x="240" y="248" width="220" height="22" rx="6" fill="var(--c-line)" fill-opacity="0.65" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <circle cx="272" cy="272" r="12" fill="var(--c-bg-soft, #0f1425)" stroke="var(--c-text-mute)" stroke-opacity="0.6" />
    <circle cx="420" cy="272" r="12" fill="var(--c-bg-soft, #0f1425)" stroke="var(--c-text-mute)" stroke-opacity="0.6" />
    <!-- 人 -->
    <circle cx="150" cy="168" r="14" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <rect x="136" y="182" width="28" height="52" rx="10" fill="var(--c-line)" stroke="var(--c-text-mute)" stroke-opacity="0.5" />
    <line x1="140" y1="236" x2="136" y2="262" stroke="var(--c-text-mute)" stroke-width="5" stroke-linecap="round" />
    <line x1="160" y1="236" x2="164" y2="262" stroke="var(--c-text-mute)" stroke-width="5" stroke-linecap="round" />
    <text
      v-for="(c, i) in charges"
      :key="`c${i}`"
      :x="c.x"
      :y="c.y"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="16"
      fill="var(--c-danger)"
    >
      +
    </text>
    <!-- 静电释放器 -->
    <rect x="196" y="196" width="34" height="72" rx="6" fill="var(--c-accent)" fill-opacity="0.85" />
    <text x="213" y="236" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="13" fill="#0f1425">静电</text>
    <template v-if="showGrounding">
      <path d="M 213 268 L 213 296" fill="none" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
      <line x1="196" y1="298" x2="230" y2="298" stroke="var(--c-accent)" stroke-width="3" />
      <line x1="202" y1="304" x2="224" y2="304" stroke="var(--c-accent)" stroke-width="2.4" />
      <line x1="208" y1="310" x2="218" y2="310" stroke="var(--c-accent)" stroke-width="2" />
    </template>
    <CourseArrow
      v-if="showChargeFlow"
      :from="{ x: 146, y: 150 }"
      :to="{ x: 204, y: 210 }"
      stroke="var(--c-danger)"
      stroke-width="2.4"
    />
    <template v-if="showSpark">
      <rect x="292" y="34" width="150" height="86" rx="10" fill="none" stroke="var(--c-danger)" stroke-width="1.6" stroke-dasharray="6 5" />
      <text x="367" y="54" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-danger)">若跳过释放器</text>
      <path d="M 360 74 L 372 90 L 360 92 L 374 112" fill="none" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <text x="367" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="12" fill="var(--c-danger)">放电火花</text>
    </template>
  </svg>
</template>
