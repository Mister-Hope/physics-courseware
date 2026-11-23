<!-- 第 12 页：斜面上的弹簧振子；showForces 显示 mg、N、弹簧力与 mg sinθ，showDisplacement 显示 O 与 x -->
<script setup lang="ts">
const { showForces = false, showDisplacement = false } = defineProps<{
  showForces?: boolean;
  showDisplacement?: boolean;
}>();

const A = { x: 50, y: 70 };
const B = { x: 470, y: 290 };
const DX = B.x - A.x;
const DY = B.y - A.y;
const LEN = Math.hypot(DX, DY);
const UX = DX / LEN;
const UY = DY / LEN;
const NX = UY;
const NY = -UX;
const BALL_R = 14;

const pointOnIncline = (t: number): { x: number; y: number } => ({ x: A.x + DX * t, y: A.y + DY * t });

const support = pointOnIncline(0.08);
const equilibrium = pointOnIncline(0.55);
const ballOnLine = pointOnIncline(0.68);
const ball = { x: ballOnLine.x + NX * BALL_R, y: ballOnLine.y + NY * BALL_R };
const springEnd = ballOnLine;
const springPath = ((): string => {
  const coils = 12;
  const amp = 7;
  const parts: string[] = [`M ${support.x} ${support.y}`];
  for (let i = 1; i < coils; i += 1) {
    const t = i / coils;
    const px = support.x + (springEnd.x - support.x) * t + NX * (i % 2 === 0 ? amp : -amp);
    const py = support.y + (springEnd.y - support.y) * t + NY * (i % 2 === 0 ? amp : -amp);
    parts.push(`L ${px} ${py}`);
  }
  parts.push(`L ${springEnd.x} ${springEnd.y}`);
  return parts.join(" ");
})();
const angleDeg = (Math.atan2(DY, DX) * 180) / Math.PI;
const xOffset = -22;
const xFrom = { x: equilibrium.x + NX * xOffset, y: equilibrium.y + NY * xOffset };
const xTo = { x: ballOnLine.x + NX * xOffset, y: ballOnLine.y + NY * xOffset };
const forceMgTo = { x: ball.x, y: ball.y + 64 };
const forceNTo = { x: ball.x + NX * 54, y: ball.y + NY * 54 };
const forceSpringTo = { x: ball.x - UX * 62, y: ball.y - UY * 62 };
const forceMgSinTo = { x: ball.x + UX * 54, y: ball.y + UY * 54 };
</script>

<template>
  <svg viewBox="0 0 520 340" class="em-incline-svg" role="img" aria-label="斜面上的弹簧振子示意图">
    <polygon :points="`${A.x},${A.y} ${B.x},${B.y} 470,330 50,330`" fill="var(--c-surface)" opacity="0.45" />
    <SurfaceHatch :from="A" :to="B" side="left" />
    <line :x1="A.x" :y1="A.y" :x2="B.x" :y2="B.y" stroke="var(--c-border-glow)" stroke-width="2" />
    <line :x1="B.x - 90" :y1="B.y" :x2="B.x" :y2="B.y" stroke="var(--c-text-mute)" stroke-width="1" stroke-dasharray="5 4" opacity="0.7" />
    <path :d="`M ${B.x - 38} ${B.y} A 38 38 0 0 0 ${B.x - 34.1} ${B.y - 16.9}`" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" />
    <text :x="B.x - 54" :y="B.y - 8" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text-dim)">θ</text>
    <g :transform="`rotate(${angleDeg} ${support.x} ${support.y})`">
      <rect :x="support.x - 6" :y="support.y - 22" width="12" height="44" rx="2" fill="var(--c-text-mute)" opacity="0.8" />
    </g>
    <path :d="springPath" fill="none" stroke="var(--c-accent-2)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
    <circle :cx="ball.x" :cy="ball.y" :r="BALL_R" fill="var(--c-accent)" stroke="var(--c-accent-light)" stroke-width="2" />
    <g v-if="showForces">
      <CourseArrow :from="ball" :to="forceMgTo" stroke="var(--c-danger)" stroke-width="3" />
      <CourseArrow :from="ball" :to="forceNTo" stroke="var(--c-sky)" stroke-width="2.8" />
      <CourseArrow :from="ball" :to="forceSpringTo" stroke="var(--c-accent)" stroke-width="3" />
      <CourseArrow :from="ball" :to="forceMgSinTo" stroke="var(--c-text-dim)" stroke-width="2.2" stroke-dasharray="6 4" />
      <text :x="forceMgTo.x + 10" :y="forceMgTo.y + 4" text-anchor="start" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-danger)">
        mg
      </text>
      <text :x="forceNTo.x + 8" :y="forceNTo.y - 6" text-anchor="start" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="var(--c-sky)">N</text>
      <text
        :x="forceSpringTo.x - 4"
        :y="forceSpringTo.y - 8"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="var(--c-accent)"
      >
        F<tspan font-family="KaTeX_Main" font-size="13" font-style="normal" dy="5">弹</tspan>
      </text>
      <text
        :x="forceMgSinTo.x + 6"
        :y="forceMgSinTo.y - 6"
        text-anchor="start"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="21"
        fill="var(--c-text-dim)"
      >
        mg<tspan font-family="KaTeX_Main" font-style="normal">sin</tspan><tspan font-family="KaTeX_Math" font-style="italic">θ</tspan>
      </text>
    </g>
    <g v-if="showForces || showDisplacement">
      <circle :cx="equilibrium.x" :cy="equilibrium.y" r="4" fill="var(--c-physics)" />
      <text
        :x="equilibrium.x - 10"
        :y="equilibrium.y + 24"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-physics)"
      >
        O
      </text>
    </g>
    <g v-if="showDisplacement">
      <CourseArrow :from="xFrom" :to="xTo" stroke="var(--c-physics)" stroke-width="2.4" />
      <text :x="xTo.x - 4" :y="xTo.y + 22" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-physics)">x</text>
    </g>
  </svg>
</template>

<style scoped>
.em-incline-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
