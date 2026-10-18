<script setup lang="ts">
import { ref } from "vue";

/**
 * 第 5 页「检验物体是否带电」：点带电体 C（透明热区）让它靠近 / 移开导体棒的上端，
 * 两片金属箔随之张开 / 闭合。只做"张开、闭合"的定性判定，不出任何数值
 * （教材只问"金属箔片是否张开"，本阶段没有可算的张角公式）。
 */
const near = ref(false);
</script>

<template>
  <svg viewBox="0 0 420 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 玻璃瓶 -->
    <rect x="110" y="118" width="190" height="182" rx="14" fill="var(--c-surface)" fill-opacity="0.3" stroke="var(--c-text-dim)" stroke-width="2" />
    <!-- 绝缘瓶塞 -->
    <rect x="180" y="98" width="50" height="26" rx="6" fill="var(--c-neutral-700)" />
    <!-- 导体棒与顶端 -->
    <line x1="205" y1="44" x2="205" y2="214" stroke="var(--c-text)" stroke-width="3" stroke-linecap="round" />
    <circle cx="205" cy="42" r="13" fill="var(--c-text)" fill-opacity="0.85" />

    <!-- 两片金属箔：带电体靠近时张开 -->
    <g style="transition: transform 0.4s ease" :transform="near ? 'rotate(16 205 214)' : ''">
      <line x1="205" y1="214" x2="203" y2="256" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g style="transition: transform 0.4s ease" :transform="near ? 'rotate(-16 205 214)' : ''">
      <line x1="205" y1="214" x2="207" y2="256" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- 带电体 C：点它切换靠近 / 移开 -->
    <g style="transition: transform 0.45s ease" :transform="near ? 'translate(-86 0)' : ''">
      <line x1="344" y1="60" x2="382" y2="140" stroke="var(--c-neutral-600)" stroke-width="7" stroke-linecap="round" />
      <circle cx="344" cy="44" r="18" fill="var(--c-danger)" fill-opacity="0.88" />
      <text x="344" y="44" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="20" fill="#0c1122">+</text>
      <text x="344" y="14" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-danger)">C</text>
      <circle cx="344" cy="44" r="28" fill="transparent" class="cursor-pointer" @click="near = !near" />
    </g>

    <!-- 构件标注 -->
    <g font-size="15" fill="var(--c-text-dim)">
      <text x="100" y="64" text-anchor="end">导体棒</text>
      <line x1="106" y1="60" x2="194" y2="60" stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.6" />
      <text x="100" y="112" text-anchor="end">绝缘瓶塞</text>
      <line x1="106" y1="108" x2="176" y2="108" stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.6" />
      <text x="100" y="180" text-anchor="end">金属丝</text>
      <line x1="106" y1="176" x2="196" y2="176" stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.6" />
      <text x="100" y="254" text-anchor="end">金属箔</text>
      <line x1="106" y1="250" x2="186" y2="250" stroke="var(--c-text-dim)" stroke-width="1.1" opacity="0.6" />
    </g>
  </svg>
</template>
