<script setup lang="ts">
/**
 * 金属的微观结构（教材行 31）：正离子在平衡位置附近振动、自由电子穿梭其间，所以金属是导体。
 *
 * - Mode="conductor"（第 10 页）：自由电子画成**无规则热运动**（循环 CSS 动画，速率远大于定向移动）； showElectronFlow 另出"定向移动"箭头，showInsulator 出绝缘体对照。
 * - Mode="induction"（第 12 页）：中性点阵 + showInducedCharges 时自由电子聚到近端， 两端净电荷**个数相等**（左 4 个 −、右 4 个 +），一眼能看出电荷守恒。
 */
const {
  mode = "conductor",
  showElectronFlow = false,
  showInsulator = false,
  showInducedCharges = false,
} = defineProps<{
  mode?: "conductor" | "induction";
  showElectronFlow?: boolean;
  showInsulator?: boolean;
  showInducedCharges?: boolean;
}>();

/** 导体态：8 个正离子、8 个自由电子（金属整体对外不显电性） */
const ions = [
  { x: 104, y: 84 },
  { x: 214, y: 84 },
  { x: 324, y: 84 },
  { x: 434, y: 84 },
  { x: 104, y: 180 },
  { x: 214, y: 180 },
  { x: 324, y: 180 },
  { x: 434, y: 180 },
];
const freeElectrons = [
  { x: 120, y: 132 },
  { x: 168, y: 132 },
  { x: 216, y: 132 },
  { x: 264, y: 132 },
  { x: 312, y: 132 },
  { x: 360, y: 132 },
  { x: 408, y: 132 },
  { x: 456, y: 132 },
];

/** 静电感应态：离子点阵不动，自由电子在诱导后聚到近端（左侧） */
const indIons = [
  { x: 185, y: 132 },
  { x: 250, y: 132 },
  { x: 315, y: 132 },
  { x: 380, y: 132 },
  { x: 185, y: 178 },
  { x: 250, y: 178 },
  { x: 315, y: 178 },
  { x: 380, y: 178 },
];
const indNeutral = [
  { x: 201, y: 144 },
  { x: 266, y: 144 },
  { x: 331, y: 144 },
  { x: 396, y: 144 },
  { x: 201, y: 190 },
  { x: 266, y: 190 },
  { x: 331, y: 190 },
  { x: 396, y: 190 },
];
const indAttracted = [
  { x: 168, y: 144 },
  { x: 192, y: 144 },
  { x: 216, y: 144 },
  { x: 240, y: 144 },
  { x: 168, y: 190 },
  { x: 192, y: 190 },
  { x: 216, y: 190 },
  { x: 240, y: 190 },
];
/** 净电荷标记：左边 4 个 −（多出的电子），右边 4 个 +（少了电子的离子），个数相等 */
const minusMarks = [162, 178, 194, 210];
const plusMarks = [372, 388, 404, 420];
</script>

<template>
  <svg v-if="mode === 'conductor'" viewBox="0 0 520 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 导体轮廓：让学生看出这是"一块金属" -->
    <rect x="58" y="44" width="420" height="172" rx="14" fill="var(--c-surface)" fill-opacity="0.3" stroke="var(--c-text)" stroke-width="2" />

    <g v-for="(p, i) in ions" :key="'ion' + i">
      <circle :cx="p.x" :cy="p.y" r="16" fill="var(--c-danger)" fill-opacity="0.2" stroke="var(--c-danger)" stroke-width="2" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="19" fill="var(--c-danger)">+</text>
    </g>

    <!-- 自由电子：无规则热运动（循环动画，e2e 的 settle() 会把它钉到相位 0 再量） -->
    <g
      v-for="(p, i) in freeElectrons"
      :key="'e' + i"
      class="ms-e"
      :class="`ms-e-${i % 4}`"
      :style="{ animationDuration: `${0.9 + (i % 3) * 0.35}s`, animationDelay: `-${(i % 5) * 0.3}s` }"
    >
      <circle :cx="p.x" :cy="p.y" r="9" fill="var(--c-velocity)" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="12" fill="#0c1122">−</text>
    </g>

    <!-- 定向移动：与热运动区分开（速率小得多，画成一条细箭头） -->
    <g v-if="showElectronFlow">
      <CourseArrow :from="{ x: 150, y: 206 }" :to="{ x: 300, y: 206 }" stroke="var(--c-accent)" stroke-width="2.6" />
      <text x="225" y="228" text-anchor="middle" font-size="16" fill="var(--c-accent)">定向移动</text>
    </g>

    <!-- 绝缘体对照 -->
    <g v-if="showInsulator">
      <rect x="40" y="236" width="440" height="52" rx="12" fill="var(--c-surface)" fill-opacity="0.3" stroke="var(--c-border)" stroke-width="1.4" />
      <circle cx="86" cy="262" r="13" fill="var(--c-danger)" fill-opacity="0.8" />
      <text x="86" y="262" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="15" fill="#0c1122">+</text>
      <circle cx="112" cy="250" r="8" fill="var(--c-velocity)" />
      <text x="112" y="250" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="11" fill="#0c1122">−</text>
      <circle cx="112" cy="276" r="8" fill="var(--c-velocity)" />
      <text x="112" y="276" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="11" fill="#0c1122">−</text>
      <text x="310" y="266" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">绝缘体：几乎没有自由移动的电荷</text>
    </g>
  </svg>

  <svg v-else viewBox="0 0 520 320" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- 带电体 C -->
    <circle cx="62" cy="156" r="22" fill="var(--c-danger)" fill-opacity="0.88" />
    <text x="62" y="156" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="22" fill="#0c1122">+</text>
    <text x="62" y="116" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="var(--c-danger)">C</text>

    <!-- 导体 -->
    <rect x="150" y="100" width="280" height="110" rx="12" fill="var(--c-surface)" fill-opacity="0.55" stroke="var(--c-text)" stroke-width="2" />

    <!-- 正离子点阵（始终不动） -->
    <g v-for="(p, i) in indIons" :key="'ii' + i">
      <circle :cx="p.x" :cy="p.y" r="13" fill="var(--c-danger)" fill-opacity="0.2" stroke="var(--c-danger)" stroke-width="1.8" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="16" fill="var(--c-danger)">+</text>
    </g>

    <!-- 自由电子：诱导后聚到近端；电子的位置变化用 transition 演出来 -->
    <g
      v-for="(p, i) in indNeutral"
      :key="'ie' + i"
      class="ms-shift"
      :style="{ transform: showInducedCharges ? `translate(${(indAttracted[i]?.x ?? p.x) - p.x}px, 0)` : 'translate(0, 0)' }"
    >
      <circle :cx="p.x" :cy="p.y" r="9" fill="var(--c-velocity)" />
      <text :x="p.x" :y="p.y" text-anchor="middle" dominant-baseline="central" font-family="KaTeX_Main" font-size="12" fill="#0c1122">−</text>
    </g>

    <!-- 净电荷：左边 4 个 −、右边 4 个 +（个数相等 ⇒ 电荷守恒） -->
    <g v-if="showInducedCharges">
      <CourseArrow :from="{ x: 320, y: 156 }" :to="{ x: 286, y: 156 }" stroke="var(--c-velocity)" stroke-width="2.6" />
      <text v-for="(x, i) in minusMarks" :key="'m' + i" :x="x" y="112" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-velocity)">
        −
      </text>
      <text v-for="(x, i) in plusMarks" :key="'p' + i" :x="x" y="206" text-anchor="middle" font-family="KaTeX_Main" font-size="22" fill="var(--c-danger)">
        +
      </text>
    </g>
  </svg>
</template>

<style scoped>
/* 自由电子的无规则热运动：四个不同相位/路径的抖动，看起来是随机乱飞 */
.ms-e {
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.ms-e-0 {
  animation-name: ms-jitter-0;
}

.ms-e-1 {
  animation-name: ms-jitter-1;
}

.ms-e-2 {
  animation-name: ms-jitter-2;
}

.ms-e-3 {
  animation-name: ms-jitter-3;
}

.ms-shift {
  transition: transform 0.6s ease;
}

@keyframes ms-jitter-0 {
  0%,
  100% {
    transform: translate(0, 0);
  }

  20% {
    transform: translate(8px, -7px);
  }

  45% {
    transform: translate(-6px, 6px);
  }

  70% {
    transform: translate(5px, 7px);
  }
}

@keyframes ms-jitter-1 {
  0%,
  100% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-8px, -5px);
  }

  55% {
    transform: translate(7px, 6px);
  }

  80% {
    transform: translate(-4px, 8px);
  }
}

@keyframes ms-jitter-2 {
  0%,
  100% {
    transform: translate(0, 0);
  }

  30% {
    transform: translate(9px, 5px);
  }

  60% {
    transform: translate(-7px, -7px);
  }

  85% {
    transform: translate(3px, -8px);
  }
}

@keyframes ms-jitter-3 {
  0%,
  100% {
    transform: translate(0, 0);
  }

  35% {
    transform: translate(-9px, 7px);
  }

  65% {
    transform: translate(6px, -8px);
  }

  90% {
    transform: translate(-5px, -5px);
  }
}
</style>
