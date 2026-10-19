<script setup lang="ts">
/**
 * 第 19 页 练习与应用 2 的题目图（教材行 41 / 图 9.1-3）：带正电的带电体 C 移近彼此接触的导体 A、B， 两片金属箔张开。题目图常显、且保持干净；分析标注（两端电荷、电子转移方向）由 showAnalysis 控制。 ⚠️ 进 exercise-split 的 #fig 栏，根 svg
 * 必须带与 viewBox 同比例的固有 width/height（410×183 ≈ 560×250， 受 #fig 的 42% 上限约束）；图内字号按"最后一排看得清"给，故相对 viewBox 取得较大。
 */
const { showAnalysis = false } = defineProps<{ showAnalysis?: boolean }>();
</script>

<template>
  <svg viewBox="0 0 560 250" width="410" height="183" xmlns="http://www.w3.org/2000/svg">
    <line x1="60" y1="210" x2="510" y2="210" stroke="var(--c-text-dim)" stroke-width="2" opacity="0.7" />

    <!-- 带正电的带电体 C -->
    <circle cx="86" cy="96" r="20" fill="var(--c-danger)" fill-opacity="0.88" />
    <text x="86" y="96" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="20" fill="#0c1122">+</text>
    <text x="86" y="54" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-danger)">C</text>
    <line x1="86" y1="116" x2="62" y2="200" stroke="var(--c-neutral-600)" stroke-width="7" stroke-linecap="round" />

    <!-- 导体 A、B（彼此接触） -->
    <rect x="180" y="70" width="120" height="52" rx="10" fill="var(--c-surface)" fill-opacity="0.6" stroke="var(--c-text)" stroke-width="2" />
    <rect x="300" y="70" width="120" height="52" rx="10" fill="var(--c-surface)" fill-opacity="0.6" stroke="var(--c-text)" stroke-width="2" />
    <text x="240" y="54" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">A</text>
    <text x="360" y="54" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">B</text>

    <!-- 绝缘柱与金属箔 -->
    <rect x="222" y="122" width="20" height="84" rx="4" fill="var(--c-neutral-700)" />
    <rect x="342" y="122" width="20" height="84" rx="4" fill="var(--c-neutral-700)" />
    <g transform="rotate(15 200 122)">
      <line x1="200" y1="122" x2="200" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(-15 200 122)">
      <line x1="200" y1="122" x2="200" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(15 280 122)">
      <line x1="280" y1="122" x2="280" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(-15 280 122)">
      <line x1="280" y1="122" x2="280" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(15 320 122)">
      <line x1="320" y1="122" x2="320" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(-15 320 122)">
      <line x1="320" y1="122" x2="320" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(15 400 122)">
      <line x1="400" y1="122" x2="400" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>
    <g transform="rotate(-15 400 122)">
      <line x1="400" y1="122" x2="400" y2="158" stroke="var(--c-accent)" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- 点击后：两端电荷与电子转移方向 -->
    <g v-if="showAnalysis">
      <text x="196" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="24" fill="var(--c-velocity)">−</text>
      <text x="220" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="24" fill="var(--c-velocity)">−</text>
      <text x="382" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="24" fill="var(--c-danger)">+</text>
      <text x="406" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="24" fill="var(--c-danger)">+</text>
      <!-- 电子转移箭头画在导体内部（y=86），⛔ 不再横穿 x 222–242 的绝缘柱 -->
      <CourseArrow :from="{ x: 300, y: 84 }" :to="{ x: 240, y: 84 }" stroke="var(--c-velocity)" stroke-width="2.8" />
    </g>
  </svg>
</template>
