<!--
  P11：洛伦兹力不做功，电能从哪来？
  正电荷既随棒向右运动（v），又沿棒向上漂移（u），实际速度 w = v + u。
  1 = v、u 与 w；2 = 总洛伦兹力 F 垂直于 w；3 = 把 F 分解为沿棒的 F₁ 与逆着 v 的 F₂。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 2 = 出现总洛伦兹力；3 = 出现两个分力 */
  step?: number;
}>();

/** 电荷位置与三个速度矢量的终点 */
const O = { x: 235, y: 205 };
const V_TIP = { x: 394, y: 205 };
const U_TIP = { x: 235, y: 145 };
const W_TIP = { x: 394, y: 145 };

/** 总洛伦兹力：与 w 垂直，指向左上 */
const W = { x: W_TIP.x - O.x, y: W_TIP.y - O.y };
const W_LEN = Math.hypot(W.x, W.y);
const F_TIP = {
  x: O.x + (W.y / W_LEN) * 130,
  y: O.y - (W.x / W_LEN) * 130,
};

/** 直角标记：沿 w 与 F 各取 14 */
const U_W = { x: W.x / W_LEN, y: W.y / W_LEN };
const U_F = { x: (F_TIP.x - O.x) / 130, y: (F_TIP.y - O.y) / 130 };
const RIGHT_ANGLE = [
  { x: O.x + U_W.x * 14, y: O.y + U_W.y * 14 },
  { x: O.x + U_W.x * 14 + U_F.x * 14, y: O.y + U_W.y * 14 + U_F.y * 14 },
  { x: O.x + U_F.x * 14, y: O.y + U_F.y * 14 },
];
</script>

<template>
  <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" class="w-full">
    <!-- 磁场垂直纸面向里 -->
    <FieldDots :x="64" :y="100" :cols="8" :rows="4" :spacing="48" dir="in" />

    <!-- 导体棒 -->
    <rect x="225" y="60" width="32" height="230" rx="4" fill="color-mix(in srgb, var(--c-text) 14%, transparent)" stroke="var(--c-text)" stroke-width="2" />

    <!-- v、u、w 的平行四边形 -->
    <g stroke="var(--c-text-mute)" stroke-width="1.2" stroke-dasharray="5 5" fill="none">
      <line :x1="V_TIP.x" :y1="V_TIP.y" :x2="W_TIP.x" :y2="W_TIP.y" />
      <line :x1="U_TIP.x" :y1="U_TIP.y" :x2="W_TIP.x" :y2="W_TIP.y" />
    </g>

    <!-- v：随棒向右 -->
    <CourseArrow :from="O" :to="V_TIP" stroke="var(--c-velocity)" :stroke-width="3" />
    <text :x="V_TIP.x + 16" :y="V_TIP.y + 7" font-family="KaTeX_Math, serif" font-style="italic" font-size="19" fill="var(--c-velocity)">v</text>

    <!-- u：沿棒向上漂移 -->
    <CourseArrow :from="O" :to="U_TIP" stroke="var(--c-physics)" :stroke-width="2.4" />
    <text :x="U_TIP.x + 6" :y="U_TIP.y - 6" font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-physics)">u</text>

    <!-- w：实际速度 -->
    <CourseArrow :from="O" :to="W_TIP" stroke="var(--c-text)" :stroke-width="2.6" />
    <text :x="W_TIP.x + 14" :y="W_TIP.y - 4" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="var(--c-text)">w</text>

    <!-- 电荷 -->
    <circle :cx="O.x" :cy="O.y" r="6.5" fill="var(--c-danger)" />
    <text :x="O.x" :y="O.y + 4" text-anchor="middle" font-family="KaTeX_Main, serif" font-size="11" fill="#fff">+</text>

    <!-- 总洛伦兹力 -->
    <template v-if="step >= 1">
      <CourseArrow :from="O" :to="F_TIP" stroke="var(--c-accent)" :stroke-width="3.2" />
      <path
        :d="`M ${RIGHT_ANGLE[0]!.x} ${RIGHT_ANGLE[0]!.y} L ${RIGHT_ANGLE[1]!.x} ${RIGHT_ANGLE[1]!.y} L ${RIGHT_ANGLE[2]!.x} ${RIGHT_ANGLE[2]!.y}`"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.3"
      />
      <text :x="F_TIP.x - 8" :y="F_TIP.y - 8" text-anchor="end" font-family="KaTeX_Math, serif" font-style="italic" font-size="18" fill="var(--c-accent)">
        F
        <tspan dy="4" font-size="12">洛</tspan>
      </text>
    </template>

    <!-- 两个分力 -->
    <template v-if="step >= 2">
      <CourseArrow :from="{ x: 252, y: O.y }" :to="{ x: 252, y: 105 }" stroke="var(--c-danger)" :stroke-width="2.6" />
      <text x="264" y="140" font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-danger)">
        F
        <tspan dy="4" font-size="11">1</tspan>
      </text>

      <CourseArrow :from="{ x: O.x, y: O.y }" :to="{ x: 152, y: O.y }" stroke="var(--c-danger)" :stroke-width="2.6" stroke-dasharray="7 5" />
      <text x="158" y="228" font-family="KaTeX_Math, serif" font-style="italic" font-size="17" fill="var(--c-danger)">
        F
        <tspan dy="4" font-size="11">2</tspan>
      </text>
    </template>
  </svg>
</template>
