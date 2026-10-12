<script setup lang="ts">
/**
 * 第 36 页「例 1：无人机与队伍」的题目图。
 *
 * 干净状态只给题干里的事实：队伍初/末位置、去程 1000 m、回程方向（虚线）；
 * `showReturn` 打开（点击出答案后）才标出回程距离 800 m——这是推导出来的，不能提前给。
 */
defineProps<{ showReturn?: boolean }>();
</script>

<template>
  <!-- 例1「无人机与队伍」题目图：150 m 长的队伍匀速前进，队长在队尾放出无人机飞到出发点前方 1000 m 处侦察，返回队长处时队伍已前进 200 m -->
  <svg viewBox="0 0 560 240" style="display: block; width: 100%; max-width: 560px; margin: 0 auto">
    <SurfaceHatch
      :from="{ x: 30, y: 196 }"
      :to="{ x: 530, y: 196 }"
      side="below"
      :thickness="14"
      :gap="26"
      color="rgba(148,163,184,0.5)"
      :line-width="2.2"
      :hatch-width="1.2"
    />
    <rect x="70" y="116" width="135" height="16" rx="4" fill="rgba(148,163,184,0.35)" stroke="rgba(148,163,184,0.9)" stroke-width="1.6" />
    <rect x="270" y="116" width="135" height="16" rx="4" fill="rgba(148,163,184,0.35)" stroke="rgba(148,163,184,0.9)" stroke-width="1.6" />
    <circle cx="70" cy="124" r="5" fill="#e2a846" />
    <circle cx="270" cy="124" r="5" fill="#e2a846" />
    <text x="62" y="108" text-anchor="middle" font-size="15" fill="#cbd5e1" stroke="#0f1425" stroke-width="3" paint-order="stroke">队尾（队长）</text>
    <text x="210" y="126" font-size="15" fill="#cbd5e1" stroke="#0f1425" stroke-width="3" paint-order="stroke">队首</text>
    <text x="270" y="108" text-anchor="middle" font-size="15" fill="#cbd5e1" stroke="#0f1425" stroke-width="3" paint-order="stroke">队长</text>
    <line x1="70" y1="152" x2="205" y2="152" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <line x1="70" y1="147" x2="70" y2="157" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <line x1="205" y1="147" x2="205" y2="157" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <text x="137" y="146" text-anchor="middle" font-size="15" fill="#94a3b8" stroke="#0f1425" stroke-width="3" paint-order="stroke">150 m</text>
    <CourseArrow :from="{ x: 74, y: 172 }" :to="{ x: 266, y: 172 }" stroke="#e2a846" stroke-width="3" />
    <text x="170" y="189" text-anchor="middle" font-size="15" fill="#e2a846" stroke="#0f1425" stroke-width="3" paint-order="stroke">队伍前进 200 m</text>
    <CourseArrow :from="{ x: 70, y: 124 }" :to="{ x: 470, y: 50 }" stroke="#e2a846" stroke-width="3" />
    <text x="266" y="72" text-anchor="middle" font-size="15" fill="#e2a846" stroke="#0f1425" stroke-width="3" paint-order="stroke">1000 m</text>
    <CourseArrow
      :from="{ x: 470, y: 50 }"
      :to="{ x: 270, y: 124 }"
      stroke="#60a5fa"
      stroke-width="3"
      stroke-dasharray="8 5"
      opacity="0.75"
    />
    <text v-if="showReturn" x="425" y="95" text-anchor="middle" font-size="15" fill="#60a5fa" stroke="#0f1425" stroke-width="3" paint-order="stroke">800 m</text>
    <circle cx="470" cy="50" r="4.5" fill="#e2a846" />
    <line x1="470" y1="50" x2="470" y2="26" stroke="#e2a846" stroke-width="2" />
    <path d="M 470 26 L 488 31 L 470 36 Z" fill="#e2a846" />
    <text x="470" y="18" text-anchor="middle" font-size="15" fill="#e2a846" stroke="#0f1425" stroke-width="3" paint-order="stroke">侦察点</text>
  </svg>
</template>