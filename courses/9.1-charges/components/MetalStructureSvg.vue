<script setup lang="ts">
/**
 * 金属的微观结构（教材行 31）：正离子在平衡位置附近振动、自由电子穿梭其间，所以金属是导体。
 * - mode="conductor"：讲导体与绝缘体（第 10 页），showElectronFlow 出电子运动轨迹，showInsulator 出绝缘体对照。
 * - mode="induction"：讲静电感应（第 12 页），showInducedCharges 出自由电子向近端移动与两端电荷。
 */
withDefaults(
  defineProps<{
    mode?: "conductor" | "induction";
    showElectronFlow?: boolean;
    showInsulator?: boolean;
    showInducedCharges?: boolean;
  }>(),
  { mode: "conductor", showElectronFlow: false, showInsulator: false, showInducedCharges: false },
);

const ions = [
  { x: 104, y: 92 },
  { x: 214, y: 92 },
  { x: 324, y: 92 },
  { x: 434, y: 92 },
  { x: 104, y: 192 },
  { x: 214, y: 192 },
  { x: 324, y: 192 },
  { x: 434, y: 192 },
];

/** 自由电子必须与正离子等量（金属整体对外不显电性），且全部落在导体轮廓内 */
const freeElectrons = [
  { x: 126, y: 142 },
  { x: 176, y: 142 },
  { x: 226, y: 142 },
  { x: 276, y: 142 },
  { x: 326, y: 142 },
  { x: 376, y: 142 },
  { x: 426, y: 142 },
  { x: 462, y: 142 },
];

/** 静电感应：自由电子被带正电的 C 吸引到近端（左侧） */
const scattered = [
  { x: 210, y: 140 },
  { x: 250, y: 162 },
  { x: 290, y: 130 },
  { x: 330, y: 166 },
  { x: 368, y: 138 },
  { x: 400, y: 158 },
];
const attracted = [
  { x: 176, y: 138 },
  { x: 196, y: 160 },
  { x: 216, y: 130 },
  { x: 236, y: 166 },
  { x: 256, y: 140 },
  { x: 276, y: 158 },
];
</script>

<template>
  <svg v-if="mode === 'conductor'" viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 导体轮廓：让学生看出这是"一块金属" -->
    <rect x="58" y="52" width="420" height="180" rx="14" fill="var(--c-surface)" fill-opacity="0.3" stroke="var(--c-text)" stroke-width="2" />

    <g v-for="(p, i) in ions" :key="'ion' + i">
      <circle :cx="p.x" :cy="p.y" r="16" fill="var(--c-danger)" fill-opacity="0.2" stroke="var(--c-danger)" stroke-width="2" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="19" fill="var(--c-danger)">+</text>
    </g>

    <g v-if="showElectronFlow">
      <path d="M 126 142 C 76 108 76 178 126 142" fill="none" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.75" />
      <path d="M 226 142 C 176 108 176 178 226 142" fill="none" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.75" />
      <path d="M 326 142 C 276 108 276 178 326 142" fill="none" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.75" />
      <path d="M 426 142 C 376 108 376 178 426 142" fill="none" stroke="var(--c-velocity)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.75" />
      <CourseArrow :from="{ x: 240, y: 220 }" :to="{ x: 310, y: 220 }" stroke="var(--c-velocity)" stroke-width="2.4" />
    </g>

    <g v-for="(p, i) in freeElectrons" :key="'e' + i">
      <circle :cx="p.x" :cy="p.y" r="9" fill="var(--c-velocity)" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="12" fill="#0c1122">−</text>
    </g>

    <!-- 绝缘体对照 -->
    <g v-if="showInsulator">
      <rect x="40" y="244" width="440" height="64" rx="12" fill="var(--c-surface)" fill-opacity="0.3" stroke="var(--c-border)" stroke-width="1.4" />
      <circle cx="86" cy="276" r="13" fill="var(--c-danger)" fill-opacity="0.8" />
      <text x="86" y="276" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">+</text>
      <circle cx="112" cy="264" r="8" fill="var(--c-velocity)" />
      <text x="112" y="264" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="11" fill="#0c1122">−</text>
      <circle cx="112" cy="290" r="8" fill="var(--c-velocity)" />
      <text x="112" y="290" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="11" fill="#0c1122">−</text>
      <circle cx="62" cy="262" r="8" fill="var(--c-velocity)" />
      <text x="62" y="262" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="11" fill="#0c1122">−</text>
      <text x="310" y="276" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">绝缘体：几乎没有自由移动的电荷</text>
    </g>
  </svg>

  <svg v-else viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 带电体 C -->
    <circle cx="56" cy="156" r="22" fill="var(--c-danger)" fill-opacity="0.88" />
    <text x="56" y="156" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#0c1122">+</text>
    <text x="56" y="116" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-danger)">C</text>

    <!-- 导体 -->
    <rect x="150" y="100" width="280" height="110" rx="12" fill="var(--c-surface)" fill-opacity="0.55" stroke="var(--c-text)" stroke-width="2" />

    <g v-if="showInducedCharges">
      <CourseArrow :from="{ x: 320, y: 156 }" :to="{ x: 286, y: 156 }" stroke="var(--c-velocity)" stroke-width="2.6" />
      <text x="176" y="106" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-velocity)">−</text>
      <text x="196" y="106" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-velocity)">−</text>
      <text x="392" y="212" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-danger)">+</text>
      <text x="412" y="212" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-danger)">+</text>
      <text x="176" y="240" text-anchor="middle" font-size="15" fill="var(--c-velocity)">近端：异种电荷</text>
      <text x="400" y="240" text-anchor="middle" font-size="15" fill="var(--c-danger)">远端：同种电荷</text>
    </g>

    <g v-for="(p, i) in showInducedCharges ? attracted : scattered" :key="'ie' + i">
      <circle :cx="p.x" :cy="p.y" r="9" fill="var(--c-velocity)" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="12" fill="#0c1122">−</text>
    </g>
  </svg>
</template>
