<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 5 页：两个弹簧测力计 A、B 互拉——B 受的拉力与 A 受的拉力等大反向，两指针示数总是相等。 使用共享组件 <SpringScale>、<SurfaceHatch>、<GripHand> 与 <CourseArrow> 绘制， 并通过 <SpringScale> 暴露的 hookEnd 与
 * extension 实现两挂钩最远端精准咬合。
 */

const FORCE = 2.4;
const LENGTH = 198;
/** 外壳长 198 → 外壳宽 198 / 5.5 = 36，中轴线 y = 104 → 外壳上沿 CASE_Y = 104 - 18 = 86 */
const AXIS_Y = 104;
const CASE_Y = 86;
/** 左侧测力计 B 的左端吊环外缘固定在 x = 96 */
const LEFT_X = 96;

interface ScaleExposed {
  extension: number;
  hookEnd: { x: number; y: number };
  ringEnd: { x: number; y: number };
}

const scaleB = ref<ScaleExposed | null>(null);
const scaleA = ref<ScaleExposed | null>(null);

/** 右侧镜像测力计 A 的基准 x = 左表挂钩最远端 hookEnd.x + 右表外伸量 extension（确保两挂钩最远端重叠咬合） */
const rightScaleX = computed(() => {
  const hookTipX = scaleB.value?.hookEnd.x ?? 422.9;
  const ext = scaleA.value?.extension ?? 76.9;

  return hookTipX + ext;
});

/** 右侧测力计 A 的吊环最右端横坐标（供 <GripHand> 捏持） */
const ringEndAX = computed(() => scaleA.value?.ringEnd.x ?? 749.8);
</script>

<template>
  <!-- 第 5 页：两个弹簧测力计 A、B 互拉——B 受的拉力与 A 受的拉力等大反向，两指针示数总是相等 -->
  <svg viewBox="0 0 940 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- ==================== 1. 左侧固定墙面与固定锚杆 ==================== -->
    <SurfaceHatch :from="{ x: 64, y: 24 }" :to="{ x: 64, y: 184 }" side="left" :thickness="18" :gap="28" color="#94a3b8" :line-width="3.6" :hatch-width="1.8" />
    <!-- 墙面连接左表吊环的固定支杆 -->
    <line x1="64" y1="104" :x2="LEFT_X + 2" y2="104" stroke="#94a3b8" stroke-width="4.5" stroke-linecap="round" />

    <!-- ==================== 2. 左侧弹簧测力计 B（蓝色主题，正向水平放置） ==================== -->
    <SpringScale ref="scaleB" :x="LEFT_X" :y="CASE_Y" :length="LENGTH" :force="FORCE" color="#60a5fa" accent="#38bdf8" orientation="horizontal" label="2.4" />
    <text x="224" y="156" fill="#60a5fa" font-size="22" font-weight="600" text-anchor="middle">B</text>

    <!-- ==================== 3. 右侧弹簧测力计 A（琥珀金主题，镜像水平放置，挂钩最远端与 B 咬合） ==================== -->
    <SpringScale
      ref="scaleA"
      :x="rightScaleX"
      :y="CASE_Y"
      :length="LENGTH"
      :force="FORCE"
      color="#e2a846"
      accent="#fbbf24"
      orientation="horizontal"
      mirror
      label="2.4"
    />
    <text x="622" y="156" fill="#e2a846" font-size="22" font-weight="600" text-anchor="middle">A</text>

    <!-- ==================== 4. 右侧 <GripHand> 捏住 A 的吊环与向右拉力 F ==================== -->
    <GripHand :x="ringEndAX" :y="AXIS_Y" side="right" :scale="1.35" />

    <CourseArrow
      :from="{ x: ringEndAX + 58, y: AXIS_Y }"
      :to="{ x: ringEndAX + 142, y: AXIS_Y }"
      stroke="#e2a846"
      stroke-width="3.8"
      label="F"
      :label-dy="-18"
    />
  </svg>
</template>
