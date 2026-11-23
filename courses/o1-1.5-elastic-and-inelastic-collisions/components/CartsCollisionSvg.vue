<script setup lang="ts">
/** 第 4 页（怎样减少动能损失）：两辆小车在气垫导轨上相撞。 上排「碰前」：左车带速度撞向静止的右车，两车都装了弹性碰撞架（弹簧缓冲）； 下排「碰后」：两车被弹开，各自反向运动。 */
const railTicks = Array.from({ length: 17 }, (_, i) => 36 + i * 30);
</script>

<template>
  <svg viewBox="0 0 560 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <text x="20" y="66" font-size="13" fill="var(--c-text-dim)">碰前</text>
    <line x1="20" y1="88" x2="540" y2="88" stroke="var(--c-text-mute)" stroke-width="2.5" />
    <line v-for="x in railTicks" :key="`t1-${x}`" :x1="x" y1="88" :x2="x - 8" y2="97" stroke="var(--c-text-mute)" stroke-width="1.4" opacity="0.6" />
    <rect x="60" y="52" width="88" height="26" rx="5" fill="var(--c-surface)" stroke="var(--c-text-mute)" stroke-width="1.6" />
    <circle cx="80" cy="84" r="6" fill="var(--c-text-dim)" />
    <circle cx="128" cy="84" r="6" fill="var(--c-text-dim)" />
    <path d="M148 65 l4.5 -7 l4.5 14 l4.5 -14 l4.5 14 l4.5 -7" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linejoin="round" />
    <CourseArrow :from="{ x: 62, y: 32 }" :to="{ x: 138, y: 32 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
    <text x="100" y="20" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)" text-anchor="middle">
      v<tspan font-size="10" dy="4">1</tspan>
    </text>
    <line x1="182" y1="58" x2="170" y2="64" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="3 3" />
    <text x="186" y="55" font-size="13" fill="var(--c-text-dim)">弹性碰撞架</text>
    <rect x="336" y="52" width="88" height="26" rx="5" fill="var(--c-surface)" stroke="var(--c-text-mute)" stroke-width="1.6" />
    <circle cx="356" cy="84" r="6" fill="var(--c-text-dim)" />
    <circle cx="404" cy="84" r="6" fill="var(--c-text-dim)" />
    <path d="M336 65 l-4.5 -7 l-4.5 14 l-4.5 -14 l-4.5 14 l-4.5 -7" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linejoin="round" />
    <text x="380" y="32" font-size="13" fill="var(--c-text-dim)" text-anchor="middle">静止</text>

    <text x="20" y="164" font-size="13" fill="var(--c-text-dim)">碰后</text>
    <line x1="20" y1="186" x2="540" y2="186" stroke="var(--c-text-mute)" stroke-width="2.5" />
    <line v-for="x in railTicks" :key="`t2-${x}`" :x1="x" y1="186" :x2="x - 8" y2="195" stroke="var(--c-text-mute)" stroke-width="1.4" opacity="0.6" />
    <rect x="58" y="150" width="88" height="26" rx="5" fill="var(--c-surface)" stroke="var(--c-text-mute)" stroke-width="1.6" />
    <circle cx="78" cy="182" r="6" fill="var(--c-text-dim)" />
    <circle cx="126" cy="182" r="6" fill="var(--c-text-dim)" />
    <path d="M146 163 l4.5 -7 l4.5 14 l4.5 -14 l4.5 14 l4.5 -7" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linejoin="round" />
    <CourseArrow :from="{ x: 96, y: 136 }" :to="{ x: 28, y: 136 }" stroke="var(--c-accent)" :stroke-width="2.4" :head-size="9" />
    <text x="92" y="126" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)" text-anchor="middle">
      v′<tspan font-size="10" dy="4">1</tspan>
    </text>
    <rect x="360" y="150" width="88" height="26" rx="5" fill="var(--c-surface)" stroke="var(--c-text-mute)" stroke-width="1.6" />
    <circle cx="380" cy="182" r="6" fill="var(--c-text-dim)" />
    <circle cx="428" cy="182" r="6" fill="var(--c-text-dim)" />
    <path d="M360 163 l-4.5 -7 l-4.5 14 l-4.5 -14 l-4.5 14 l-4.5 -7" fill="none" stroke="var(--c-accent)" stroke-width="2" stroke-linejoin="round" />
    <CourseArrow :from="{ x: 452, y: 136 }" :to="{ x: 520, y: 136 }" stroke="var(--c-physics)" :stroke-width="2.4" :head-size="9" />
    <text x="486" y="126" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-physics)" text-anchor="middle">
      v′<tspan font-size="10" dy="4">2</tspan>
    </text>
  </svg>
</template>
