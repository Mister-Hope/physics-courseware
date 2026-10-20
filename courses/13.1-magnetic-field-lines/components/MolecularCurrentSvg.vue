<script setup lang="ts">
/**
 * 安培分子电流假说（13.1 P18）
 * 上排：左「通电螺线管的磁场」与右「条形磁体的磁场」并置（相似）；
 * 点击 1：下方出现「分子电流 → 每个微粒就是一枚小磁体」的放大示意。
 */
import { computed } from "vue";
import { type Line, arrowsAlong, barPoles, squashLine, traceLine } from "./magField";

const { step: stepProp = 0 } = defineProps<{ step?: number }>();
const step = computed(() => Math.max(0, stepProp));

const W = 960;
const H = 320;

const makeField = (cx: number, cy: number, bounds: { x: number; y: number; w: number; h: number }) => {
  const poles = barPoles(cx, cy, 46);
  const lines: Line[] = [];
  for (const d of [-38, -20, 0, 20, 38]) {
    const line = traceLine([poles[0].x + 10, cy + d], poles, bounds, { stopRadius: 11 });
    if (line) lines.push(squashLine(line, cy, K));
  }
  return { lines, arrows: lines.map((l) => arrowsAlong(l, [0.5], 6)) };
};

const K = 0.4;
const solenoidField = makeField(250, 118, { x: 70, y: -120, w: 370, h: 380 });
const barField = makeField(710, 118, { x: 530, y: -120, w: 370, h: 380 });
</script>

<template>
  <svg :viewBox="`0 0 ${W} ${H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="mf-fig">
    <!-- 左：通电螺线管的磁场 -->
    <rect x="40" y="16" width="420" height="208" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <text x="250" y="38" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">通电螺线管的磁场</text>
    <g fill="none" stroke="var(--c-text)" stroke-width="2.2" opacity="0.8">
      <ellipse v-for="i in 6" :key="i" :cx="160 + i * 30" :cy="118" rx="16" ry="40" />
    </g>
    <g fill="none" stroke="var(--c-field)" stroke-width="1.6" opacity="0.85">
      <path v-for="(l, i) in solenoidField.lines" :key="`s${i}`" :d="l.d" />
    </g>
    <g fill="var(--c-field)">
      <path v-for="(a, i) in solenoidField.arrows" :key="`sa${i}`" :d="a[0].d" />
    </g>

    <!-- 右：条形磁体的磁场 -->
    <rect x="500" y="16" width="420" height="208" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
    <text x="710" y="38" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">条形磁体的磁场</text>
    <g fill="none" stroke="var(--c-field)" stroke-width="1.6" opacity="0.85">
      <path v-for="(l, i) in barField.lines" :key="`b${i}`" :d="l.d" />
    </g>
    <g fill="var(--c-field)">
      <path v-for="(a, i) in barField.arrows" :key="`ba${i}`" :d="a[0].d" />
    </g>
    <rect :x="710 - 46" :y="100" :width="46" :height="36" rx="5" fill="var(--c-velocity)" opacity="0.9" />
    <rect :x="710" :y="100" :width="46" :height="36" rx="5" fill="var(--c-danger)" opacity="0.9" />
    <text :x="710 - 23" :y="124" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
    <text :x="710 + 23" :y="124" text-anchor="middle" font-size="13" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>

    <!-- 下排：分子电流 → 每个微粒是小磁体 -->
    <g v-if="step >= 1">
      <rect x="250" y="234" width="460" height="76" rx="14" fill="none" stroke="var(--c-border)" stroke-width="1.3" />
      <text x="480" y="254" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main">物质内部的分子电流</text>
      <ellipse cx="380" cy="282" rx="28" ry="12" fill="none" stroke="var(--c-field)" stroke-width="2" />
      <CourseArrow :from="{ x: 374, y: 292 }" :to="{ x: 410, y: 292 }" stroke="var(--c-field)" :stroke-width="2" />
      <text x="372" y="306" text-anchor="middle" font-size="11" fill="var(--c-text-mute)" font-family="KaTeX_Main">分子电流</text>
      <rect x="470" y="268" width="40" height="26" rx="4" fill="var(--c-velocity)" opacity="0.9" />
      <rect x="510" y="268" width="40" height="26" rx="4" fill="var(--c-danger)" opacity="0.9" />
      <text x="490" y="287" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">S</text>
      <text x="530" y="287" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-bg)" font-family="KaTeX_Main">N</text>
      <text x="620" y="277" text-anchor="middle" font-size="12" fill="var(--c-text-dim)" font-family="KaTeX_Main">两侧相当于两个磁极</text>
    </g>
  </svg>
</template>

<style scoped>
.mf-fig {
  display: block;
  margin: 0 auto;
}
</style>
