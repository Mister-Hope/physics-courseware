<script setup lang="ts">
import { computed } from "vue";

/**
 * 秋千 ≈ 粗略单摆：摆球沿圆弧摆动，绳的拉力 F_T 始终指向悬点。
 * 干净版只有横梁、绳、摆球与轨迹弧；速度/拉力箭头与直角标记点击后才出。
 * 速度与拉力**都从摆球几何中心起笔**——这样摆球处的直角（F_T ⊥ v）两边才都实、
 * 不会出现垂足一边空着的情况。拉力沿绳、速度沿切线 ⇒ 拉力不做功。
 */
const { showAnalysis = false } = defineProps<{
  /** 点击后出现：速度 v、拉力 F_T 与直角标记 */
  showAnalysis?: boolean;
}>();

const PIVOT = { x: 210, y: 34 }; // 悬点
const ROPE = 205; // 绳长
const ANG = (25 * Math.PI) / 180; // 绳与竖直方向的夹角
const ball = { x: PIVOT.x - ROPE * Math.sin(ANG), y: PIVOT.y + ROPE * Math.cos(ANG) };
/** 绳向外的单位向量（悬点 → 摆球）与切向单位向量（指向最低点，即向下运动方向） */
const uRope = { x: -Math.sin(ANG), y: Math.cos(ANG) };
const uTan = { x: Math.cos(ANG), y: Math.sin(ANG) };

/** 轨迹弧：从摆球到最低点，按采样点画（避免 SVG 圆弧 sweep 方向画反） */
const arcPath = computed(() =>
  Array.from({ length: 13 }, (_, i) => {
    const a = ANG * (1 - i / 12);
    return { x: PIVOT.x - ROPE * Math.sin(a), y: PIVOT.y + ROPE * Math.cos(a) };
  })
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" "),
);

/** 速度：从摆球中心沿切线（旁侧略小一号） */
const vTo = { x: ball.x + 86 * uTan.x, y: ball.y + 86 * uTan.y };
/** 拉力：从摆球中心沿绳指向悬点 */
const ftTo = { x: ball.x - 78 * uRope.x, y: ball.y - 78 * uRope.y };
/** 直角标记（摆球中心，两边分别沿绳与切线） */
const rightA = { x: ball.x - 16 * uRope.x, y: ball.y - 16 * uRope.y };
const rightB = { x: rightA.x + 16 * uTan.x, y: rightA.y + 16 * uTan.y };
const rightC = { x: ball.x + 16 * uTan.x, y: ball.y + 16 * uTan.y };
const rightPath = `M ${rightA.x.toFixed(1)} ${rightA.y.toFixed(1)} L ${rightB.x.toFixed(1)} ${rightB.y.toFixed(1)} L ${rightC.x.toFixed(1)} ${rightC.y.toFixed(1)}`;
</script>

<template>
  <svg viewBox="80 14 220 254" width="230" height="266" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="秋千摆到一侧的摆球，绳的拉力与速度垂直">
    <line x1="150" y1="34" x2="270" y2="34" stroke="var(--c-text-dim)" stroke-width="4.4" />
    <circle :cx="PIVOT.x" :cy="PIVOT.y" r="5" fill="var(--c-text-dim)" />
    <line :x1="PIVOT.x" :y1="PIVOT.y" :x2="ball.x" :y2="ball.y" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path :d="arcPath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 6" opacity="0.85" />
    <circle :cx="ball.x" :cy="ball.y" r="16" fill="var(--c-surface-solid)" stroke="var(--c-text)" stroke-width="2.4" />
    <g v-if="showAnalysis">
      <CourseArrow :from="ball" :to="vTo" stroke="var(--c-velocity)" :stroke-width="2.6" label="v" :label-dx="10" :label-dy="14" />
      <CourseArrow :from="ball" :to="ftTo" stroke="var(--c-force)" :stroke-width="3.2" />
      <text :x="ftTo.x + 12" :y="ftTo.y + 4" font-size="19" fill="var(--c-force)" class="pd-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
        <tspan font-family="KaTeX_Main" font-size="13" dy="5">T</tspan>
      </text>
      <path :d="rightPath" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    </g>
  </svg>
</template>

<style scoped>
.pd-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
