<script setup lang="ts">
import { useId } from "vue";

/** SVG 里 id/url(#id) 必须按实例唯一：Slidev 会同时挂载相邻页，重名 id 会让填充整体失效 */
const uid = useId();
/**
 * 第 2 页：弹簧测力计竖直悬挂钩码（静止）
 *
 * 钩码静止 ⇒ 二力平衡：拉力 F_T 与重力 mg 等大反向，于是测力计示数反映了钩码的重力。 钩码受力一律从其几何中心起笔；表身、刻度、挂钩全部交给共享 `<SpringScale>`，不手画。
 *
 * 几何：外壳宽 S = length / 5.5；挂钩末端 hookEnd = CASE.y + L + 0.64S + extension， extension = (force / maxForce) × (L − 1.05S)；指针位置 ≈ CASE.y + 0.8S + 0.7S + ratio × (L
 * − 1.05S) （共享组件内的固定比例，见 `.agents/notes/spring-scale.md`）。
 */
/** 外壳左上角（吊环一侧）与外壳长度 */
const CASE = { x: 56, y: 38 };
const LENGTH = 150;
const FORCE_N = 3;
const MAX_FORCE = 5;

const { showForces = true } = defineProps<{
  /** 是否画钩码受力箭头（先问后答：点击后再显力） */
  showForces?: boolean;
}>();

/** 外壳宽与轴线横坐标 */
const CASE_W = LENGTH / 5.5;
const AXIS_X = CASE.x + CASE_W / 2;
/** 挂钩末端纵坐标（含随示数外伸的 extension） */
const HOOK_END_Y = CASE.y + LENGTH + 0.64 * CASE_W + (FORCE_N / MAX_FORCE) * (LENGTH - 1.05 * CASE_W);
/** 钩码几何中心：挂在挂钩末端下方 */
const WEIGHT_CY = HOOK_END_Y + 28;
/** 钩码受力箭头长度 */
const ARROW = 38;
/** 指针所在高度：scaleTop = 0.8S + 0.7S，scaleSpan = L − 1.05S，示数 3 N ⇒ 量程的 0.6 */
const POINTER_Y = CASE.y + 0.8 * CASE_W + 0.7 * CASE_W + (FORCE_N / MAX_FORCE) * (LENGTH - 1.05 * CASE_W);
</script>

<template>
  <svg viewBox="0 0 190 360" style="width: auto; max-width: 100%; height: 285px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 钩码金属圆柱的体积感渐变 -->
      <linearGradient :id="uid + '-ssWeightGrad'" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--c-neutral-600)" />
        <stop offset="40%" stop-color="var(--c-neutral-200)" />
        <stop offset="100%" stop-color="var(--c-neutral-500)" />
      </linearGradient>
      <linearGradient :id="uid + '-ssWeightTopGrad'" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--c-neutral-200)" />
        <stop offset="100%" stop-color="var(--c-neutral-500)" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 天花板（悬挂点） ==================== -->
    <SurfaceHatch :from="{ x: 14, y: 16 }" :to="{ x: 146, y: 16 }" side="above" :thickness="9" :gap="14" color="var(--c-text-dim)" :line-width="2" />

    <!-- ==================== 2. 弹簧测力计（共享组件） ==================== -->
    <SpringScale :x="CASE.x" :y="CASE.y" :length="LENGTH" :force="FORCE_N" />

    <!-- ==================== 3. 悬挂的钩码 ==================== -->
    <g>
      <!-- 钩码上端挂环（挂在测力计挂钩上） -->
      <circle :cx="AXIS_X" :cy="HOOK_END_Y + 8" r="5" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" />
      <!-- 挂环与码身之间的短颈 -->
      <line :x1="AXIS_X" :y1="HOOK_END_Y + 13" :x2="AXIS_X" :y2="HOOK_END_Y + 17" stroke="var(--c-neutral-300)" stroke-width="2" />
      <!-- 码身：金属圆柱 -->
      <rect :x="AXIS_X - 17" :y="HOOK_END_Y + 17" width="34" height="29" rx="4" :fill="'url(#' + uid + '-ssWeightGrad)'" stroke="var(--c-text-dim)" stroke-width="1.6" />
      <!-- 码身顶面 -->
      <ellipse :cx="AXIS_X" :cy="HOOK_END_Y + 21" rx="15" ry="4" :fill="'url(#' + uid + '-ssWeightTopGrad)'" stroke="var(--c-text-dim)" stroke-width="1.2" />
      <!-- 码身中部的槽口 -->
      <line :x1="AXIS_X - 17" :y1="HOOK_END_Y + 31" :x2="AXIS_X + 17" :y2="HOOK_END_Y + 31" stroke="var(--c-neutral-900)" stroke-width="1.6" opacity="0.7" />
    </g>

    <!-- ==================== 4. 示数标注（虚线指引指向指针高度） ==================== -->
    <line :x1="CASE.x + CASE_W" :y1="POINTER_Y" x2="96" :y2="POINTER_Y" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="4 3" opacity="0.75" />
    <text x="100" :y="POINTER_Y + 6" font-size="17" fill="var(--c-neutral-300)">示数</text>
    <text x="134" :y="POINTER_Y + 7" font-family="KaTeX_Main" font-size="22" font-weight="600" fill="var(--c-accent)">
      <tspan>3.0 N</tspan>
    </text>

    <!-- ==================== 5. 钩码受力：拉力 F_T（向上）与重力 mg（向下），均从几何中心起笔 ==================== -->
    <g v-if="showForces">
      <CourseArrow :from="{ x: AXIS_X, y: WEIGHT_CY }" :to="{ x: AXIS_X, y: WEIGHT_CY - ARROW }" stroke="var(--c-accent)" :stroke-width="3" />
      <text
        :x="AXIS_X + 14"
        :y="WEIGHT_CY - ARROW + 14"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-accent)"
        stroke="var(--c-bg-soft)"
        stroke-width="3.2"
        paint-order="stroke"
      >
        <tspan>F</tspan>
        <tspan dy="5" font-size="12" font-family="KaTeX_Main" font-style="normal">T</tspan>
      </text>

      <CourseArrow :from="{ x: AXIS_X, y: WEIGHT_CY }" :to="{ x: AXIS_X, y: WEIGHT_CY + ARROW }" stroke="var(--c-force)" :stroke-width="3" />
      <text
        :x="AXIS_X + 14"
        :y="WEIGHT_CY + ARROW + 2"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-force)"
        stroke="var(--c-bg-soft)"
        stroke-width="3.2"
        paint-order="stroke"
      >
        <tspan>mg</tspan>
      </text>

      <!-- 受力共点：钩码几何中心 -->
      <circle :cx="AXIS_X" :cy="WEIGHT_CY" r="3.4" fill="var(--c-neutral-50)" stroke="var(--c-neutral-900)" stroke-width="1.4" />
    </g>
  </svg>
</template>
