<!--
  两个物体在同一直线上相互作用的示意图（第 2、3、6 页共用）。
  state：before = 碰撞前（B 快于 A，追上 A）；during = 碰撞瞬间（画出 A 受的 F₁、B 受的 F₂）；after = 碰撞后。
  速度箭头长度只示意大小，不对应具体数值；受力一律从物体几何中心出发。
-->
<script setup lang="ts">
import { computed } from "vue";

const { state = "before", showSystem = false } = defineProps<{
  /** 碰撞前 / 碰撞瞬间 / 碰撞后 */
  state?: "before" | "during" | "after";
  /** 是否用虚框标出"系统" */
  showSystem?: boolean;
}>();

const isDuring = computed(() => state === "during");
const isAfter = computed(() => state === "after");
</script>

<template>
  <svg viewBox="0 0 460 250" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 光滑水平面 -->
    <SurfaceHatch :from="{ x: 20, y: 232 }" :to="{ x: 440, y: 232 }" side="below" :thickness="12" :gap="22" :line-width="2" />
    <!-- 系统虚框 -->
    <rect
      v-if="showSystem"
      x="40"
      y="150"
      width="345"
      height="86"
      rx="10"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
      stroke-dasharray="8 6"
      opacity="0.9"
    />
    <text v-if="showSystem" x="46" y="144" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="15">系统</text>
    <!-- 物体 A、B -->
    <rect x="245" y="168" width="105" height="64" rx="8" fill="rgba(226, 168, 70, 0.14)" stroke="var(--c-accent)" stroke-width="2" />
    <text x="297" y="207" text-anchor="middle" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="23">A</text>
    <rect x="55" y="168" width="105" height="64" rx="8" fill="rgba(96, 165, 250, 0.14)" stroke="var(--c-velocity)" stroke-width="2" />
    <text x="107" y="207" text-anchor="middle" fill="var(--c-velocity)" font-family="KaTeX_Math" font-style="italic" font-size="23">B</text>
    <!-- 碰撞中的相互作用力（内力），从几何中心出发 -->
    <g v-if="isDuring">
      <CourseArrow :from="{ x: 300, y: 200 }" :to="{ x: 368, y: 200 }" stroke="var(--c-danger)" stroke-width="2.6" />
      <CourseArrow :from="{ x: 104, y: 200 }" :to="{ x: 36, y: 200 }" stroke="var(--c-danger)" stroke-width="2.6" />
      <text x="382" y="195" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">F<tspan dy="4" font-size="12">1</tspan></text>
      <text x="22" y="195" fill="var(--c-danger)" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">F<tspan dy="4" font-size="12">2</tspan></text>
    </g>
    <!-- 速度（画在物体上方，长度示意快慢） -->
    <g v-if="!isAfter">
      <CourseArrow :from="{ x: 252, y: 112 }" :to="{ x: 316, y: 112 }" stroke="var(--c-accent)" stroke-width="2.4" />
      <CourseArrow :from="{ x: 58, y: 112 }" :to="{ x: 164, y: 112 }" stroke="var(--c-accent)" stroke-width="2.4" />
      <text x="284" y="102" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">v<tspan dy="4" font-size="12">1</tspan></text>
      <text x="111" y="102" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">v<tspan dy="4" font-size="12">2</tspan></text>
    </g>
    <g v-else>
      <CourseArrow :from="{ x: 252, y: 112 }" :to="{ x: 344, y: 112 }" stroke="var(--c-accent)" stroke-width="2.4" />
      <CourseArrow :from="{ x: 58, y: 112 }" :to="{ x: 132, y: 112 }" stroke="var(--c-accent)" stroke-width="2.4" />
      <text x="298" y="102" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">v<tspan dy="4" font-size="12">1</tspan><tspan dy="-4" font-size="18">′</tspan></text>
      <text x="95" y="102" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="18" text-anchor="middle">v<tspan dy="4" font-size="12">2</tspan><tspan dy="-4" font-size="18">′</tspan></text>
    </g>
  </svg>
</template>
