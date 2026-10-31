<!--
  电磁驱动（第 17、18 页）：蹄形磁体绕竖直支点转动，两磁极间的铝框跟着转。
  俯视图。step 每加一，磁体转过 90°，铝框只转过约 70°——铝框总是落后于磁场，
  正因为它与磁场之间有相对运动，才会有感应电流、才会受到推动它的安培力。
-->
<script setup lang="ts">
import { computed } from "vue";

const { step = 0 } = defineProps<{
  /** 0 静止；1 磁体转 90°；2 磁体再转 90°（累计 180°） */
  step?: number;
}>();

const magnetAngle = computed(() => Math.max(0, Math.min(step, 2)) * 90);
const frameAngle = computed(() => magnetAngle.value * 0.62);
</script>

<template>
  <svg
    class="fig-svg"
    viewBox="0 0 620 360"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="旋转的蹄形磁体带动铝框转动"
  >
    <text x="310" y="32" text-anchor="middle" font-size="20" fill="var(--c-text-dim)">
      从上向下看
    </text>
    <g :transform="`rotate(${magnetAngle} 310 190)`" class="fd-magnet">
      <path
        d="M 84 150 L 84 100 L 536 100 L 536 150"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="26"
        stroke-linejoin="round"
      />
      <!-- 两个极靴：配色与字母同共享 BarMagnet（N 红 / S 蓝、KaTeX_Main 正体、深底色字母） -->
      <rect x="60" y="150" width="48" height="84" rx="3" fill="var(--c-danger)" />
      <rect x="512" y="150" width="48" height="84" rx="3" fill="var(--c-velocity)" />
      <text
        x="84"
        y="202"
        text-anchor="middle"
        font-size="28"
        font-family="KaTeX_Main"
        fill="var(--c-bg-soft)"
      >
        N
      </text>
      <text
        x="536"
        y="202"
        text-anchor="middle"
        font-size="28"
        font-family="KaTeX_Main"
        fill="var(--c-bg-soft)"
      >
        S
      </text>
      <!-- 磁极间的磁场：从 N 指向 S -->
      <line
        x1="108"
        y1="192"
        x2="468"
        y2="192"
        stroke="var(--c-accent)"
        stroke-width="1.8"
        stroke-dasharray="7 6"
      />
      <CourseArrow
        :from="{ x: 466, y: 192 }"
        :to="{ x: 506, y: 192 }"
        stroke="var(--c-accent)"
        stroke-width="2.4"
      />
    </g>
    <g :transform="`rotate(${frameAngle} 310 190)`" class="fd-frame">
      <rect
        x="250"
        y="140"
        width="120"
        height="100"
        rx="3"
        fill="none"
        stroke="var(--c-neutral-300)"
        stroke-width="4"
      />
    </g>
    <circle cx="310" cy="190" r="4" fill="var(--c-neutral-500)" />
  </svg>
</template>

<style scoped>
.fd-magnet,
.fd-frame {
  transition: transform 2.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
