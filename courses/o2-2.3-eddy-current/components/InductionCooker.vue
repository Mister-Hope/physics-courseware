<!--
  电磁炉剖面（第 2 页引课常显、第 9 页回扣复用）
  step 0：干净装置（锅 + 陶瓷面板 + 线圈）
  step 1：线圈中通入交变电流
  step 2：交变电流产生交变磁场，穿过锅底
  step 3：锅底（导体）中出现一圈圈涡流
  step 4：涡流产生焦耳热，锅底发热
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 讲解进度：0 干净装置，逐级点亮 1 电流 / 2 磁场 / 3 涡流 / 4 发热 */
  step?: number;
}>();
</script>

<template>
  <svg
    viewBox="0 0 720 300"
    xmlns="http://www.w3.org/2000/svg"
    class="fig-svg"
    role="img"
    aria-label="电磁炉加热铁锅的剖面图"
  >
    <defs>
      <linearGradient id="ic-pan-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgb(203 213 225 / 26%)" />
        <stop offset="100%" stop-color="rgb(148 163 184 / 16%)" />
      </linearGradient>
      <radialGradient id="ic-pan-heat" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#f97316" stop-opacity="0.55" />
        <stop offset="100%" stop-color="#f97316" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="ic-zoom-bg" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stop-color="rgb(148 163 184 / 18%)" />
        <stop offset="100%" stop-color="rgb(15 20 37 / 92%)" />
      </radialGradient>
    </defs>
    <g fill="none" stroke="#94a3b8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 140 40 L 170 200 L 430 200 L 460 40" />
    </g>
    <g fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round">
      <path d="M 146 46 q -24 6 -26 22" />
      <path d="M 454 46 q 24 6 26 22" />
    </g>
    <path d="M 130 200 L 430 200 L 430 187 L 130 187 Z" fill="url(#ic-pan-body)" stroke="none" />
    <rect
      x="74"
      y="200"
      width="412"
      height="12"
      rx="5"
      fill="rgb(148 163 184 / 22%)"
      stroke="#64748b"
      stroke-width="1.6"
    />
    <ellipse cx="300" cy="196" rx="140" ry="24" fill="url(#ic-pan-heat)" opacity="0.6" />
    <text x="96" y="238" font-size="15" fill="#94a3b8">陶瓷面板</text>
    <g v-if="step >= 1">
      <g fill="none" stroke="var(--c-accent-2)" stroke-width="3" stroke-linecap="round">
        <ellipse cx="280" cy="224" rx="100" ry="7" />
        <ellipse cx="280" cy="228" rx="100" ry="7" />
        <ellipse cx="280" cy="232" rx="100" ry="7" />
        <ellipse cx="280" cy="236" rx="100" ry="7" />
        <ellipse cx="280" cy="240" rx="100" ry="7" />
      </g>
      <text x="280" y="268" text-anchor="middle" font-size="15" fill="var(--c-accent-2)">
        线圈（通交变电流）
      </text>
    </g>
    <g
      v-if="step >= 2"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="1.8"
      stroke-dasharray="6 5"
      opacity="0.8"
    >
      <path d="M 196 216 C 172 188 180 160 216 176" />
      <path d="M 364 216 C 388 188 380 160 344 176" />
      <path d="M 226 214 C 214 196 222 182 240 188" />
      <path d="M 334 214 C 346 196 338 182 320 188" />
    </g>
    <g v-if="step >= 2">
      <text x="36" y="176" font-size="15" fill="var(--c-accent)">交变磁场</text>
      <path
        d="M 92 182 L 152 192"
        stroke="var(--c-accent)"
        stroke-width="1.2"
        stroke-dasharray="3 4"
        fill="none"
      />
    </g>
    <path
      v-if="step >= 3"
      d="M 422 196 L 512 150"
      fill="none"
      stroke="#94a3b8"
      stroke-width="1.2"
      stroke-dasharray="4 4"
    />
    <path
      v-if="step >= 3"
      d="M 410 206 L 512 176"
      fill="none"
      stroke="#94a3b8"
      stroke-width="1.2"
      stroke-dasharray="4 4"
    />
    <g v-if="step >= 3">
      <circle
        cx="596"
        cy="110"
        r="90"
        fill="url(#ic-zoom-bg)"
        stroke="rgb(148 163 184 / 45%)"
        stroke-width="1.6"
      />
      <circle cx="596" cy="110" r="78" fill="none" stroke="#94a3b8" stroke-width="3" />
      <g fill="none" stroke="#e2a846" stroke-width="3" stroke-linecap="round">
        <circle cx="596" cy="110" r="56" stroke-dasharray="9 7" />
        <circle cx="596" cy="110" r="36" stroke-dasharray="9 7" />
        <circle cx="596" cy="110" r="16" stroke-dasharray="7 6" />
      </g>
      <CourseArrow
        :from="{ x: 620, y: 20 }"
        :to="{ x: 572, y: 20 }"
        stroke="#e2a846"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 572, y: 200 }"
        :to="{ x: 620, y: 200 }"
        stroke="#e2a846"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 686, y: 132 }"
        :to="{ x: 686, y: 88 }"
        stroke="#e2a846"
        stroke-width="3"
      />
      <CourseArrow
        :from="{ x: 506, y: 88 }"
        :to="{ x: 506, y: 132 }"
        stroke="#e2a846"
        stroke-width="3"
      />
      <text x="596" y="232" text-anchor="middle" font-size="15" fill="#e2a846">锅底中的涡流</text>
    </g>
    <g
      fill="none"
      stroke="#fb923c"
      stroke-width="2.2"
      stroke-linecap="round"
      :opacity="step >= 4 ? 0.9 : 0.45"
    >
      <path d="M 208 166 q 9 -16 0 -32 q -9 -16 0 -30" />
      <path d="M 280 160 q 9 -16 0 -32 q -9 -16 0 -26" />
      <path d="M 352 166 q 9 -16 0 -32 q -9 -16 0 -30" />
    </g>
    <text v-if="step >= 4" x="326" y="44" font-size="15" fill="#fb923c">焦耳热</text>
  </svg>
</template>
