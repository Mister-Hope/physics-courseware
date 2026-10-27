<!--
  第 8 页示意图：自感电动势的方向（楞次定律）。
  两种情形一开始就都在：线圈 + 电流方向 I。
  自感电动势 E_L 的箭头分两步出现（先问后答）：第 1 击出左图，第 2 击出右图。
  左：电流增大 → E_L 与 I 反向；右：电流减小 → E_L 与 I 同向。
  两只线圈都是共享 Solenoid（竖放连续螺旋线，3.5 匝、半径 30），接线端落在上、下轮廓 (x,93.8) / (x,156.2)；
  两图是同一只线圈的两种情形，绕向取同一值（从下端看逆时针 = direction=ccw，与第 7 页统一）。
-->
<script setup lang="ts">
defineProps<{
  /** 当前点击步数：≥1 出左图的 E_L，≥2 再出右图的 E_L */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="90 40 620 210" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 分隔线 -->
    <line x1="360" y1="40" x2="360" y2="250" stroke="var(--c-border)" stroke-width="1.4" stroke-dasharray="4 6" />
    <!-- ── 情况一：电流增大 ── -->
    <g>
      <Solenoid
        :x="190"
        :y="125"
        :length="42"
        :radius="30"
        :turns="3.5"
        direction="ccw"
        orientation="vertical"
        :phase="270"
        :line-width="2.8"
        :back-opacity="0.32"
        color="var(--c-accent-2)"
      />
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 190 93.8 V 52" />
        <path d="M 190 156.2 V 198" />
      </g>
      <!-- 电流 I：画在下引线上，向下流出线圈 -->
      <CourseArrow :from="{ x: 190, y: 158 }" :to="{ x: 190, y: 196 }" stroke="var(--c-accent-2)" :stroke-width="3.4" />
      <text x="204" y="186" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">I</text>
      <!-- 自感电动势 E_L 向上（第 1 击出现），画在上引线上 -->
      <g v-if="(step ?? 0) >= 1">
        <CourseArrow :from="{ x: 190, y: 88 }" :to="{ x: 190, y: 58 }" stroke="var(--c-accent)" :stroke-width="3.4" />
        <text x="176" y="84" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">
          E
          <tspan baseline-shift="sub" font-size="12">L</tspan>
        </text>
      </g>
      <text x="190" y="238" text-anchor="middle" font-size="16" fill="var(--c-text)">电流增大</text>
    </g>
    <!-- ── 情况二：电流减小 ── -->
    <g>
      <Solenoid
        :x="530"
        :y="125"
        :length="42"
        :radius="30"
        :turns="3.5"
        direction="ccw"
        orientation="vertical"
        :phase="270"
        :line-width="2.8"
        :back-opacity="0.32"
        color="var(--c-accent-2)"
      />
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 530 93.8 V 52" />
        <path d="M 530 156.2 V 198" />
      </g>
      <!-- 电流 I：画在下引线上，向下流出线圈 -->
      <CourseArrow :from="{ x: 530, y: 158 }" :to="{ x: 530, y: 196 }" stroke="var(--c-accent-2)" :stroke-width="3.4" />
      <text x="544" y="186" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">I</text>
      <!-- 自感电动势 E_L 也向下（与电流同向，第 2 击出现），画在上引线上 -->
      <g v-if="(step ?? 0) >= 2">
        <CourseArrow :from="{ x: 530, y: 58 }" :to="{ x: 530, y: 88 }" stroke="var(--c-accent)" :stroke-width="3.4" />
        <text x="516" y="84" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent)">
          E
          <tspan baseline-shift="sub" font-size="12">L</tspan>
        </text>
      </g>
      <text x="530" y="238" text-anchor="middle" font-size="16" fill="var(--c-text)">电流减小</text>
    </g>
  </svg>
</template>
