<!-- 卡文迪什扭秤（第 8 页）：大球吸引小球使 T 形架扭转，石英丝扭转角由平面镜反射光点在刻度尺上的移动反映出来 -->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /** 0 = 未受力；1 = 大球吸引小球、扭秤扭转、光点移开 */
  step?: number;
}>();

const twisted = computed(() => step >= 1);

/** T 形架绕悬点转过一个很小的角度 */
const frameTransform = computed(() => (twisted.value ? "rotate(-7 240 120)" : ""));

/** 平面镜中心（在竖直杆上，随架子一起转） */
const mirrorCenter = computed(() => (twisted.value ? { x: 244, y: 151 } : { x: 240, y: 151 }));

/** 反射光点在刻度尺上的位置：扭转后被放大成看得见的移动 */
const spotX = computed(() => (twisted.value ? 402 : 380));

const lamp = { x: 52, y: 63 };
/** 刻度尺刻度 */
const ticks = Array.from({ length: 11 }, (_, index) => 336 + index * 12.2);
</script>

<template>
  <svg viewBox="0 0 470 262" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
    <!-- 天花板：石英丝吊在上面 -->
    <SurfaceHatch :from="{ x: 150, y: 24 }" :to="{ x: 330, y: 24 }" side="above" :thickness="12" :gap="16" />

    <!-- 入射光线 -->
    <CourseArrow :from="lamp" :to="mirrorCenter" stroke="#60a5fa" :stroke-width="2.2" />
    <!-- 反射光线 -->
    <CourseArrow :from="mirrorCenter" :to="{ x: spotX - 6, y: 44 }" stroke="#f87171" :stroke-width="2.2" />

    <!-- 光源 -->
    <rect x="20" y="46" width="26" height="32" rx="6" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" stroke-width="2" />
    <text x="33" y="98" text-anchor="middle" font-size="15" fill="#94a3b8">光源</text>

    <!-- 刻度尺 -->
    <rect x="336" y="28" width="122" height="22" rx="4" fill="rgba(148,163,184,0.12)" stroke="#94a3b8" stroke-width="1.6" />
    <line v-for="tick in ticks" :key="tick" :x1="tick" y1="28" :x2="tick" y2="42" stroke="#94a3b8" stroke-width="1.3" />
    <text x="397" y="20" text-anchor="middle" font-size="15" fill="#94a3b8">刻度尺</text>

    <!-- 扭转前光点的位置（虚线空圈）与当前光点 -->
    <circle cx="380" cy="39" r="5" fill="none" stroke="rgba(248,113,113,0.75)" stroke-width="1.6" stroke-dasharray="3 3" />
    <circle :cx="spotX" cy="39" r="5" fill="#f87171" />

    <!-- 石英丝 -->
    <line x1="240" y1="24" x2="240" y2="120" stroke="#cbd5e1" stroke-width="1.8" />
    <text x="226" y="74" text-anchor="end" font-size="15" fill="#94a3b8">石英丝 N</text>

    <!-- T 形架（竖直杆 + 平面镜 + 水平杆 + 两端小球），受力后整体转过一个小角度 -->
    <g :transform="frameTransform">
      <line x1="240" y1="120" x2="240" y2="190" stroke="#cbd5e1" stroke-width="3" />
      <rect x="228" y="136" width="24" height="30" rx="3" fill="rgba(226,168,70,0.22)" stroke="#e2a846" stroke-width="2" />
      <text x="216" y="156" text-anchor="end" font-size="16" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">M</text>
      <line x1="160" y1="190" x2="320" y2="190" stroke="#cbd5e1" stroke-width="3" />
      <circle cx="160" cy="190" r="11" fill="rgba(96,165,250,0.28)" stroke="#60a5fa" stroke-width="2" />
      <circle cx="320" cy="190" r="11" fill="rgba(96,165,250,0.28)" stroke="#60a5fa" stroke-width="2" />
      <text x="160" y="222" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#93c5fd">m</text>
      <text x="320" y="222" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#93c5fd">m</text>
    </g>

    <!-- 两个大球：放在小球旁边，距离相等 -->
    <circle cx="112" cy="190" r="18" fill="rgba(226,168,70,0.2)" stroke="#e2a846" stroke-width="2.2" />
    <circle cx="368" cy="190" r="18" fill="rgba(226,168,70,0.2)" stroke="#e2a846" stroke-width="2.2" />
    <text x="112" y="236" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">m′</text>
    <text x="368" y="236" text-anchor="middle" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">m′</text>
  </svg>
</template>
