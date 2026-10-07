<script setup lang="ts">
/**
 * 侧壁扎孔的塑料瓶（§4.6 完全失重页）
 *
 * `falling` 为 false：瓶子静止，水从小孔喷出； `falling` 为 true：瓶子自由下落，水不再从小孔流出（瓶对水没有支持力，水对瓶壁也没有压力）。
 */
const { falling = false, label = "" } = defineProps<{
  falling?: boolean;
  label?: string;
}>();
</script>

<template>
  <svg viewBox="0 0 220 300" width="100%" style="max-width: 200px" xmlns="http://www.w3.org/2000/svg">
    <!-- 瓶身与瓶口 -->
    <rect x="84" y="24" width="52" height="18" rx="5" fill="rgba(148,163,184,0.28)" stroke="rgba(148,163,184,0.6)" stroke-width="1.5" />
    <rect x="70" y="40" width="80" height="218" rx="14" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.6)" stroke-width="1.8" />
    <!-- 水 -->
    <path d="M 73 128 H 147 V 243 A 11 11 0 0 1 136 254 H 84 A 11 11 0 0 1 73 243 Z" fill="rgba(59,130,246,0.3)" />
    <line x1="73" y1="128" x2="147" y2="128" stroke="rgba(96,165,250,0.75)" stroke-width="2" />
    <!-- 侧壁小孔 -->
    <circle cx="150" cy="192" r="3.4" fill="#0f1425" stroke="#94a3b8" stroke-width="1.4" />

    <!-- 静止：水从孔中喷出 -->
    <g v-if="!falling">
      <path d="M 152 192 C 178 198 196 220 204 252" fill="none" stroke="#60a5fa" stroke-width="4.2" stroke-linecap="round" />
      <circle cx="186" cy="224" r="4" fill="#60a5fa" />
      <circle cx="199" cy="243" r="4" fill="#60a5fa" />
    </g>

    <!-- 自由下落：箭头标出 a = g -->
    <CourseArrow v-else :from="{ x: 200, y: 100 }" :to="{ x: 200, y: 160 }" stroke="#2dd4bf" :stroke-width="2.8" label="g" :label-dx="12" />

    <text v-if="label" x="110" y="288" text-anchor="middle" font-size="16" fill="#94a3b8">{{ label }}</text>
  </svg>
</template>
