<script setup lang="ts">
/**
 * 第 20 页 练习与应用 3 的题目图（教材图 9.1-5）：带正电的导体球 C 靠近不带电的导体， 沿虚线 1 分成 A、B，沿虚线 2 分成 A′、B′。题目图常显、且保持干净； 正负标注由 showChargeSigns 控制（点击后才出）。 ⚠️ 进 exercise-split 的 #fig 栏，根
 * svg 必须带与 viewBox 同比例的固有 width/height（410×220 ≈ 560×300， 受 #fig 的 42% 上限约束）；图内字号按"最后一排看得清"给，故相对 viewBox 取得较大。
 */
withDefaults(defineProps<{ showChargeSigns?: boolean }>(), { showChargeSigns: false });
</script>

<template>
  <svg viewBox="0 0 560 300" width="410" height="220" xmlns="http://www.w3.org/2000/svg">
    <!-- 带正电的导体球 C -->
    <circle cx="74" cy="140" r="22" fill="var(--c-danger)" fill-opacity="0.88" />
    <text x="74" y="140" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#0c1122">+</text>
    <text x="74" y="96" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-danger)">C</text>

    <!-- 导体 -->
    <rect x="150" y="92" width="340" height="96" rx="10" fill="var(--c-surface)" fill-opacity="0.55" stroke="var(--c-text)" stroke-width="2" />

    <!-- 虚线 1 / 虚线 2 -->
    <line x1="320" y1="76" x2="320" y2="204" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="7 6" />
    <line x1="430" y1="76" x2="430" y2="204" stroke="var(--c-text-dim)" stroke-width="1.8" stroke-dasharray="7 6" />
    <text x="320" y="60" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-text-dim)">虚线 1</text>
    <text x="430" y="60" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-text-dim)">虚线 2</text>

    <!-- 区域标签 -->
    <text x="235" y="44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">A</text>
    <text x="375" y="44" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">B</text>
    <text x="300" y="244" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">A′</text>
    <text x="458" y="244" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="24" fill="var(--c-text)">B′</text>
    <line x1="200" y1="216" x2="425" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />
    <line x1="437" y1="216" x2="482" y2="216" stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.6" />

    <!-- 点击后：四个部分的正负 -->
    <g v-if="showChargeSigns">
      <text x="196" y="140" text-anchor="middle" font-family="KaTeX_Main" font-size="26" fill="var(--c-velocity)">−</text>
      <text x="262" y="140" text-anchor="middle" font-family="KaTeX_Main" font-size="26" fill="var(--c-velocity)">−</text>
      <text x="452" y="140" text-anchor="middle" font-family="KaTeX_Main" font-size="26" fill="var(--c-danger)">+</text>
      <text x="478" y="140" text-anchor="middle" font-family="KaTeX_Main" font-size="26" fill="var(--c-danger)">+</text>
      <CourseArrow :from="{ x: 268, y: 170 }" :to="{ x: 200, y: 170 }" stroke="var(--c-velocity)" stroke-width="2.4" />
      <text x="240" y="192" text-anchor="middle" font-size="20" fill="var(--c-velocity)">自由电子向近端移动</text>
    </g>
  </svg>
</template>
