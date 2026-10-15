<script setup lang="ts">
/** 封面右下角装饰：电能分流到三种能量 —— 内能 / 机械能 / 化学能（精修美化版） */
const { width = 320 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 220 150" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <defs>
      <!-- 电能闪电柔和微光 -->
      <filter id="elec-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- 火苗微光 -->
      <filter id="flame-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- ==================== 1. 电能输入端（左侧母节点） ==================== -->
    <!-- 外层呼吸光环 -->
    <circle cx="32" cy="75" r="21.5" fill="none" stroke="color-mix(in srgb, var(--c-accent) 22%, transparent)" stroke-width="1.2" stroke-dasharray="4 3" />
    <!-- 电能底盘徽章 -->
    <circle cx="32" cy="75" r="18" fill="color-mix(in srgb, var(--c-accent) 14%, transparent)" stroke="var(--c-accent)" stroke-width="2" />
    <!-- 金色闪电（精准居中于 (32, 75)，轮廓凌厉锐利） -->
    <polygon points="34,63 26.5,74.5 31.5,74.5 28.5,87 37.5,73.5 32.5,73.5 35.5,63" fill="var(--c-accent)" filter="url(#elec-glow)" />

    <!-- ==================== 2. 三条分流支路（平滑 S 型导轨，切线精准对齐箭头） ==================== -->
    <g stroke="currentColor" fill="currentColor" opacity="0.85">
      <!-- 上支路 -> 内能（终点水平切入 y=28） -->
      <path d="M 50 75 C 92 75 110 28 146.5 28" fill="none" stroke-width="2.2" stroke-linecap="round" />
      <polygon points="153,28 146,24.5 147.5,28 146,31.5" />

      <!-- 中支路 -> 机械能（水平正向直通 y=75） -->
      <line x1="50" y1="75" x2="146.5" y2="75" stroke-width="2.2" stroke-linecap="round" />
      <polygon points="153,75 146,71.5 147.5,75 146,78.5" />

      <!-- 下支路 -> 化学能（终点水平切入 y=122） -->
      <path d="M 50 75 C 92 75 110 122 146.5 122" fill="none" stroke-width="2.2" stroke-linecap="round" />
      <polygon points="153,122 146,118.5 147.5,122 146,125.5" />
    </g>

    <!-- ==================== 3. 终点三种能量（右侧 x=172 轴线完全对齐） ==================== -->

    <!-- [支路一：内能 / 火苗] 位于 (172, 28) -->
    <g>
      <!-- 徽章底盘 -->
      <circle cx="172" cy="28" r="16" fill="color-mix(in srgb, var(--c-force) 12%, transparent)" stroke="var(--c-force)" stroke-width="1.8" />
      <!-- 外焰（流线型燃烧火苗） -->
      <path
        d="M 172 17 C 166.5 22 164.5 26.5 166 32 C 167.5 36.5 176.5 36.5 178 32 C 179.5 26.5 177.5 22 172 17 Z"
        fill="color-mix(in srgb, var(--c-force) 32%, transparent)"
        stroke="var(--c-force)"
        stroke-width="1.8"
        stroke-linejoin="round"
        filter="url(#flame-glow)"
      />
      <!-- 内焰火芯 -->
      <path d="M 172 23 C 169.5 26 168.5 28.5 170 32 C 171 34.5 173 34.5 174 32 C 175.5 28.5 174.5 26 172 23 Z" fill="var(--c-force)" opacity="0.95" />
    </g>

    <!-- [支路二：机械能 / 旋转扇叶] 位于 (172, 75) -->
    <g transform="translate(172 75)">
      <!-- 徽章底盘 -->
      <circle cx="0" cy="0" r="16" fill="color-mix(in srgb, var(--c-velocity) 12%, transparent)" stroke="var(--c-velocity)" stroke-width="1.8" />
      <!-- 旋转扇叶群（以 (0,0) 为轴心严谨 120° 等距辐射） -->
      <g stroke="var(--c-velocity)" stroke-width="1.4" fill="color-mix(in srgb, var(--c-velocity) 38%, transparent)">
        <!-- 叶片 1（正上） -->
        <ellipse cx="0" cy="-6.5" rx="3.2" ry="6" />
        <!-- 叶片 2（顺时针 120°，右下） -->
        <ellipse cx="0" cy="-6.5" rx="3.2" ry="6" transform="rotate(120)" />
        <!-- 叶片 3（顺时针 240°，左下） -->
        <ellipse cx="0" cy="-6.5" rx="3.2" ry="6" transform="rotate(240)" />
      </g>
      <!-- 扇叶中心金属轴心 -->
      <circle r="2.8" fill="var(--c-velocity)" />
      <circle r="1.1" fill="var(--c-neutral-900)" />
    </g>

    <!-- [支路三：化学能 / 蓄电池充放电] 位于 (172, 122) -->
    <g transform="translate(172 122)">
      <!-- 徽章底盘 -->
      <circle cx="0" cy="0" r="16" fill="color-mix(in srgb, var(--c-physics) 12%, transparent)" stroke="var(--c-physics)" stroke-width="1.8" />
      <!-- 电池外壳 -->
      <rect x="-6.5" y="-8.5" width="13" height="17" rx="2" fill="color-mix(in srgb, var(--c-physics) 22%, transparent)" stroke="var(--c-physics)" stroke-width="1.6" />
      <!-- 正极凸起接线端子（顶部帽） -->
      <rect x="-3" y="-11" width="6" height="2.5" rx="0.8" fill="var(--c-physics)" />
      <!-- 化学活性储能块（电量/活性物） -->
      <rect x="-4.5" y="-2.5" width="9" height="9" rx="1" fill="var(--c-physics)" opacity="0.85" />
      <!-- 正极标志 '+' -->
      <line x1="0" y1="-6.5" x2="0" y2="-3.5" stroke="var(--c-physics)" stroke-width="1.2" stroke-linecap="round" />
      <line x1="-1.5" y1="-5" x2="1.5" y2="-5" stroke="var(--c-physics)" stroke-width="1.2" stroke-linecap="round" />
    </g>
  </svg>
</template>
