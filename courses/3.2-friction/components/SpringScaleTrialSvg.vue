<script setup lang="ts">
import { computed, ref } from "vue";

/** 第 7 页方案一：弹簧测力计水平拉着木块在桌面上匀速运动（表身用共享组件 <SpringScale>、右侧手部用 <GripHand> 画） */

/** 木块右侧挂环边缘——测力计挂钩最左端 (hookEnd.x) 落在这里 */
const HOOK_X = 88;
/** 测力计轴线高度（与木块中部齐平） */
const AXIS_Y = 56;
/** 外壳长 124 → 外壳宽 124 / 5.5 ≈ 22.55，故外壳上沿 y = 56 − 11.27 = 44.73 */
const CASE_Y = 44.73;

const scale = ref<{
  extension: number;
  ringEnd: { x: number; y: number };
} | null>(null);

/** Mirror 时图形会沿轴反向多伸出 extension：外壳位置 = 挂钩端 + extension（用组件暴露值算，不手抄内部几何） */
const scaleX = computed(() => HOOK_X + (scale.value?.extension ?? 0));
/** 测力计右端吊环最右缘横坐标（供右侧 <GripHand> 精准捏住吊环） */
const ringEndX = computed(() => scale.value?.ringEnd.x ?? 292.7);
</script>

<template>
  <!-- 第 7 页方案一：用弹簧测力计水平拉着木块匀速运动——测力计一直在动，读数难读准 -->
  <svg viewBox="0 20 372 80" class="fig-svg fig-lg" xmlns="http://www.w3.org/2000/svg">
    <!-- 水平实验桌面（y=84，lineWidth=2.4 → 上外沿 82.8） -->
    <SurfaceHatch :from="{ x: 8, y: 84 }" :to="{ x: 364, y: 84 }" side="below" :thickness="11" :gap="24" color="#94a3b8" />

    <!-- 被拉木块（y: 34..81.5，stroke-width=2.2 → 下外沿 82.6，与桌面严格相切不重叠） -->
    <rect x="14" y="34" width="70" height="47.5" rx="4" fill="rgba(226,168,70,0.2)" stroke="#e2a846" stroke-width="2.2" />
    <!-- 木块右侧挂钩圆环 -->
    <circle cx="87" cy="56" r="3" fill="none" stroke="#e2a846" stroke-width="1.8" />

    <!-- 水平弹簧测力计 -->
    <SpringScale ref="scale" :x="scaleX" :y="CASE_Y" :length="124" :force="2.4" color="#cbd5e1" accent="#e2a846" orientation="horizontal" mirror label="2.4" />

    <!-- 右侧手部捏住测力计吊环向右匀速拉动 -->
    <GripHand :x="ringEndX" :y="AXIS_Y" side="right" />

    <!-- 向右拉动的方向箭头 -->
    <CourseArrow :from="{ x: ringEndX + 43, y: AXIS_Y }" :to="{ x: 368, y: AXIS_Y }" stroke="#e2a846" stroke-width="3" />
  </svg>
</template>
