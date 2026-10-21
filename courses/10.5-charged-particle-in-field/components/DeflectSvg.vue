<script setup lang="ts">
/**
 * 第 8–11 页：电子以 v0 垂直进入匀强电场后的偏转。 分步标注全部由页面控制（show-path / show-force / show-y / show-vperp / show-resultant / show-exit），
 * 题目原图（极板、v0、U、d、l）常显；受力、轨迹、分速度、偏转角都是分析类标注，点击后才出。
 */
defineProps<{
  /** 极板间受静电力（红色 F 箭头） */
  showForce?: boolean;
  /** 极板间的抛物线轨迹 */
  showPath?: boolean;
  /** 出射点到初速度方向的偏移 y */
  showY?: boolean;
  /** 出射速度的垂直分速度 v⊥ */
  showVperp?: boolean;
  /** 出射速度 v 与偏转角 θ */
  showResultant?: boolean;
  /** 出射后的匀速直线运动方向 */
  showExit?: boolean;
  /** 显示例 2 的已知数据（U = 200 V、d = 2.0 cm、l = 6.0 cm） */
  values?: boolean;
}>();
</script>

<template>
  <svg viewBox="0 0 520 300" width="520" height="300" font-family="Inter, system-ui, sans-serif">
    <line x1="130" y1="46" x2="430" y2="46" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="130" y1="40" x2="130" y2="52" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="430" y1="40" x2="430" y2="52" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="280" y="36" text-anchor="middle" fill="var(--c-neutral-300)" font-size="14">
      <tspan font-style="italic" font-family="KaTeX_Math">U</tspan>
      <tspan v-if="values" font-family="KaTeX_Main">= 200 V</tspan>
    </text>
    <rect x="130" y="74" width="300" height="6" rx="2" fill="var(--c-accent)" fill-opacity="0.3" stroke="var(--c-accent)" stroke-width="1.5" />
    <rect x="130" y="220" width="300" height="6" rx="2" fill="var(--c-velocity)" fill-opacity="0.24" stroke="var(--c-velocity)" stroke-width="1.5" />
    <text x="136" y="66" fill="var(--c-accent)" font-size="14" font-weight="700">A +</text>
    <text x="136" y="244" fill="var(--c-velocity)" font-size="14" font-weight="700">B −</text>
    <CourseArrow :from="{ x: 200, y: 86 }" :to="{ x: 200, y: 214 }" stroke="var(--c-field)" stroke-width="2" opacity="0.7" />
    <CourseArrow :from="{ x: 280, y: 86 }" :to="{ x: 280, y: 214 }" stroke="var(--c-field)" stroke-width="2" opacity="0.7" />
    <CourseArrow :from="{ x: 360, y: 86 }" :to="{ x: 360, y: 214 }" stroke="var(--c-field)" stroke-width="2" opacity="0.7" />
    <text x="396" y="126" fill="var(--c-field)" font-size="15" font-style="italic" font-family="KaTeX_Math">E</text>
    <line x1="100" y1="150" x2="430" y2="150" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="6 5" stroke-opacity="0.45" />
    <CourseArrow :from="{ x: 36, y: 150 }" :to="{ x: 78, y: 150 }" stroke="var(--c-velocity)" stroke-width="2.6" />
    <text x="57" y="170" text-anchor="middle" fill="var(--c-velocity)" font-size="15">
      <tspan font-style="italic" font-family="KaTeX_Math">v</tspan>
      <tspan dy="4" font-size="10" font-style="italic" font-family="KaTeX_Math">0</tspan>
    </text>
    <circle cx="92" cy="150" r="7" fill="var(--c-velocity)" stroke="var(--c-text)" stroke-width="1.2" />
    <text x="92" y="153.5" text-anchor="middle" fill="var(--c-text)" font-size="10" font-weight="700">−</text>
    <line x1="112" y1="80" x2="112" y2="220" stroke="var(--c-text-dim)" stroke-width="1.1" />
    <line x1="106" y1="80" x2="118" y2="80" stroke="var(--c-text-dim)" stroke-width="1.1" />
    <line x1="106" y1="220" x2="118" y2="220" stroke="var(--c-text-dim)" stroke-width="1.1" />
    <text x="104" y="132" text-anchor="end" fill="var(--c-neutral-300)" font-size="14">
      <tspan font-style="italic" font-family="KaTeX_Math">d</tspan>
      <tspan v-if="values" font-family="KaTeX_Main">= 2.0 cm</tspan>
    </text>
    <line x1="130" y1="262" x2="430" y2="262" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="130" y1="256" x2="130" y2="268" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <line x1="430" y1="256" x2="430" y2="268" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text x="280" y="286" text-anchor="middle" fill="var(--c-neutral-300)" font-size="14">
      <tspan font-style="italic" font-family="KaTeX_Math">l</tspan>
      <tspan v-if="values" font-family="KaTeX_Main">= 6.0 cm</tspan>
    </text>
    <path v-if="showPath" d="M 130 150 Q 280 150 430 100" fill="none" stroke="var(--c-physics)" stroke-width="2.6" stroke-linecap="round" />
    <line v-if="showExit" x1="430" y1="100" x2="510" y2="73" stroke="var(--c-physics)" stroke-width="1.8" stroke-dasharray="7 5" stroke-opacity="0.75" />
    <g v-if="showForce">
      <CourseArrow :from="{ x: 150, y: 150 }" :to="{ x: 150, y: 106 }" stroke="var(--c-force)" stroke-width="2.8" />
      <text x="160" y="126" fill="var(--c-force)" font-size="15" font-style="italic" font-family="KaTeX_Math">F</text>
    </g>
    <g v-if="showY">
      <line x1="430" y1="100" x2="430" y2="150" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="5 4" />
      <text x="440" y="130" fill="var(--c-neutral-300)" font-size="15" font-style="italic" font-family="KaTeX_Math">y</text>
    </g>
    <g v-if="showVperp">
      <CourseArrow :from="{ x: 430, y: 100 }" :to="{ x: 430, y: 54 }" stroke="var(--c-velocity)" stroke-width="2.6" />
      <text x="440" y="74" fill="var(--c-velocity)" font-size="15">
        <tspan font-style="italic" font-family="KaTeX_Math">v</tspan>
        <tspan dy="4" font-size="10" font-family="KaTeX_Math">⊥</tspan>
      </text>
    </g>
    <g v-if="showResultant">
      <line x1="430" y1="100" x2="476" y2="100" stroke="var(--c-text-dim)" stroke-width="1.1" stroke-dasharray="5 4" />
      <CourseArrow :from="{ x: 430, y: 100 }" :to="{ x: 497, y: 75 }" stroke="var(--c-velocity)" stroke-width="2.8" />
      <path d="M 458 100 A 28 28 0 0 0 456.6 91.2" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.4" />
      <text x="466" y="98" fill="var(--c-neutral-300)" font-size="15" font-style="italic" font-family="KaTeX_Math">θ</text>
      <text x="486" y="72" fill="var(--c-velocity)" font-size="15" font-style="italic" font-family="KaTeX_Math">v</text>
    </g>
  </svg>
</template>
