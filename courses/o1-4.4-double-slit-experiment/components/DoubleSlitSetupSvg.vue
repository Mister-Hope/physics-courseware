<!-- 第 4 页：双缝干涉实验装置与光路（step 0 光源单缝双缝；1 遮光筒与屏、条纹；2 透镜） -->
<template>
  <svg viewBox="0 0 660 214" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="20" y="84" width="54" height="44" rx="6" fill="#e2a846" fill-opacity="0.18" stroke="#e2a846" stroke-width="1.4" />
    <text x="47" y="146" text-anchor="middle" font-family="KaTeX_Main" font-size="14" fill="#c8d3ea">光源</text>
    <path d="M 74 106 L 110 106" stroke="#e2a846" stroke-width="2" opacity="0.85" />
    <path d="M 74 120 L 110 120" stroke="#e2a846" stroke-width="2" opacity="0.85" />
    <g v-if="step >= 2">
      <ellipse cx="118" cy="106" rx="9" ry="30" fill="#2dd4bf" fill-opacity="0.14" stroke="#2dd4bf" stroke-width="1.4" opacity="0.9" />
      <text x="118" y="160" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#2dd4bf">透镜</text>
    </g>
    <rect x="146" y="76" width="11" height="60" rx="2" fill="#fb923c" fill-opacity="0.5" stroke="#fb923c" stroke-width="1.2" />
    <text x="151" y="152" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#fb923c">滤光片</text>
    <rect x="196" y="50" width="10" height="56" rx="2" fill="#8b98b8" opacity="0.8" />
    <rect x="196" y="120" width="10" height="44" rx="2" fill="#8b98b8" opacity="0.8" />
    <text x="201" y="182" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#c8d3ea">单缝</text>
    <rect x="256" y="50" width="10" height="40" rx="2" fill="#8b98b8" opacity="0.8" />
    <rect x="256" y="102" width="10" height="26" rx="2" fill="#8b98b8" opacity="0.8" />
    <rect x="256" y="140" width="10" height="24" rx="2" fill="#8b98b8" opacity="0.8" />
    <text x="261" y="182" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#c8d3ea">双缝</text>
    <g>
      <rect x="276" y="66" width="292" height="94" rx="8" fill="none" stroke="#8b98b8" stroke-width="1.3" stroke-dasharray="6 6" />
      <text x="284" y="58" font-family="KaTeX_Main" font-size="13" fill="#8b98b8">遮光筒</text>
      <rect x="568" y="58" width="12" height="110" rx="2" fill="#0f1425" stroke="#c8d3ea" stroke-opacity="0.4" stroke-width="1.2" />
      <g v-if="step >= 1">
        <rect v-for="band in bands" :key="band.y" x="570" :y="band.y" width="8" height="7" rx="1.6" fill="#fbbf24" :opacity="band.opacity" />
        <path v-for="ray in rays" :key="ray" :d="ray" stroke="#e2a846" stroke-width="1.3" opacity="0.38" />
      </g>
    </g>
    <text x="574" y="184" text-anchor="middle" font-family="KaTeX_Main" font-size="13" fill="#c8d3ea">屏</text>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  step?: number;
}

const { step = 0 } = defineProps<Props>();

const gaps = [96, 134];

const bands = Array.from({ length: 9 }, (_, index) => ({
  y: 72 + index * 11,
  opacity: 0.16 + 0.84 * Math.max(0, 1 - Math.abs(index - 4) / 4.4),
}));

const targets = [78, 120, 162];

const rays = gaps.flatMap((from) => targets.map((to) => `M 266 ${from} L 568 ${to}`));
</script>
