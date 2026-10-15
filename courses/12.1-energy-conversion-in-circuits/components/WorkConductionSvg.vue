<script setup lang="ts">
/**
 * 电流做功的实质：恒定电场对自由电荷的静电力做功（精修美化版） 细节调整：
 *
 * 1. 电子尺寸适度缩小（r=7），符合微观粒子与导线截面比例；
 * 2. 去除奇异荧光与过度模糊光晕，回归严谨朴实的物理教科书质感；
 * 3. 漂移速度/运动微箭头移至电子正旁边（水平同轴在左侧 ←），与电子动作紧密相随；
 * 4. 保留电压 U 两侧虚线垂直对准导体端面，无杂乱微小文字。
 */
const { width = 560, carrierType = "electron" } = defineProps<{
  width?: number;
  carrierType?: "electron" | "positive";
}>();
</script>

<template>
  <svg viewBox="0 0 560 250" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <defs>
      <!-- 导线管体金属圆柱体纯净渐变 -->
      <linearGradient id="ew-wire-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="color-mix(in srgb, var(--c-neutral-700) 28%, transparent)" />
        <stop offset="25%" stop-color="color-mix(in srgb, var(--c-surface-solid) 50%, transparent)" />
        <stop offset="75%" stop-color="color-mix(in srgb, var(--c-neutral-900) 65%, transparent)" />
        <stop offset="100%" stop-color="color-mix(in srgb, var(--c-surface-solid) 35%, transparent)" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 电压 U 与两端对齐虚线 ==================== -->
    <g>
      <!-- 左端垂直对齐虚线 (从电压箭头起点垂直落至导体左截面 x=50) -->
      <line x1="50" y1="40" x2="50" y2="108" stroke="var(--c-velocity)" stroke-width="1.4" stroke-dasharray="4 3.5" opacity="0.6" />
      <!-- 右端垂直对齐虚线 (从电压箭头终点垂直落至导体右截面 x=510) -->
      <line x1="510" y1="40" x2="510" y2="108" stroke="var(--c-velocity)" stroke-width="1.4" stroke-dasharray="4 3.5" opacity="0.6" />

      <!-- 电势差 U 测量双向箭头线 -->
      <line x1="54" y1="40" x2="506" y2="40" stroke="var(--c-velocity)" stroke-width="1.8" stroke-dasharray="6 4" />
      <!-- 左箭头 (指向左边界) -->
      <polygon points="50,40 59,36 59,44" fill="var(--c-velocity)" />
      <!-- 右箭头 (指向右边界) -->
      <polygon points="510,40 501,36 501,44" fill="var(--c-velocity)" />

      <!-- 电压符号 U (KaTeX 纯数学斜体) -->
      <text
        x="280"
        y="32"
        text-anchor="middle"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="21"
        font-weight="600"
        fill="var(--c-velocity)"
      >
        U
      </text>
    </g>

    <!-- ==================== 2. 恒定电场 E 与 静电力 F ==================== -->
    <g>
      <!-- 恒定电场 E 矢量箭头 (向右，高电势指向低电势) -->
      <g stroke="var(--c-physics-light)" stroke-width="2" stroke-linecap="round" opacity="0.95">
        <line x1="160" y1="68" x2="255" y2="68" />
        <polygon points="263,68 253,64 253,72" fill="var(--c-physics-light)" stroke="none" />
      </g>
      <text x="208" y="60" text-anchor="middle" font-family="KaTeX_Math, 'Times New Roman', serif" font-style="italic" font-size="18" fill="var(--c-physics-light)">E</text>

      <!-- 静电力 F 矢量箭头：
           在真实自由电子模型下：受力 F = qE 向左（与电场相反）；
           在等效正电荷模型下：受力 F 向右。
      -->
      <template v-if="carrierType === 'electron'">
        <!-- 静电力向左 (针对自由电子 e⁻) -->
        <g stroke="var(--c-force)" stroke-width="2.4" stroke-linecap="round">
          <line x1="395" y1="68" x2="305" y2="68" />
          <polygon points="297,68 307,63.5 307,72.5" fill="var(--c-force)" stroke="none" />
        </g>
        <text
          x="351"
          y="60"
          text-anchor="middle"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="19"
          font-weight="600"
          fill="var(--c-force)"
        >
          F
        </text>
      </template>
      <template v-else>
        <!-- 正电荷等效受力向右 -->
        <g stroke="var(--c-force)" stroke-width="2.4" stroke-linecap="round">
          <line x1="305" y1="68" x2="395" y2="68" />
          <polygon points="403,68 393,63.5 393,72.5" fill="var(--c-force)" stroke="none" />
        </g>
        <text
          x="350"
          y="60"
          text-anchor="middle"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="19"
          font-weight="600"
          fill="var(--c-force)"
        >
          F
        </text>
      </template>
    </g>

    <!-- ==================== 3. 导体管身（朴实清晰，端面规整） ==================== -->
    <g>
      <!-- 导体外壳 -->
      <rect x="50" y="108" width="460" height="54" rx="12" fill="url(#ew-wire-body)" stroke="var(--c-neutral-500)" stroke-width="1.8" />
      <!-- 导体上下边缘细腻轮廓线 -->
      <line x1="62" y1="109" x2="498" y2="109" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      <line x1="62" y1="161" x2="498" y2="161" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
    </g>

    <!-- ==================== 4. 定向移动的自由电荷 ==================== -->
    <!-- 真实物理模型：自由电子 e⁻ (微观朴实尺寸 r=7，箭头紧贴在电子左侧同轴) -->
    <template v-if="carrierType === 'electron'">
      <g>
        <g v-for="cx in [100, 160, 220, 280, 340, 400, 460]" :key="'elec-' + cx" class="transition-transform duration-200">
          <!-- 电子旁边的小运动微箭头 (位于电子正左侧，水平对齐 y=135) -->
          <g stroke="var(--c-physics-light)" stroke-width="1.6" stroke-linecap="round">
            <line :x1="cx - 10" y1="135" :x2="cx - 24" y2="135" />
            <polygon :points="`${cx - 24},135 ${cx - 19},131.5 ${cx - 19},138.5`" fill="var(--c-physics-light)" stroke="none" />
          </g>

          <!-- 电子粒子圆球 (缩小至 r=7，朴实饱满青蓝，去除外发光光晕) -->
          <circle :cx="cx" cy="135" r="7" fill="#0284c7" stroke="var(--c-physics-light)" stroke-width="1.4" />
          <!-- 负电荷符号 "−" (微小工整) -->
          <line :x1="cx - 3.2" y1="135" :x2="cx + 3.2" y2="135" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" />
        </g>
      </g>
    </template>

    <!-- 等效宏观模型：正电荷 q (箭头紧贴在正电荷右侧同轴) -->
    <template v-else>
      <g>
        <g v-for="cx in [100, 160, 220, 280, 340, 400, 460]" :key="'pos-' + cx" class="transition-transform duration-200">
          <!-- 电荷微球 (r=7，质朴金色) -->
          <circle :cx="cx" cy="135" r="7" fill="#d97706" stroke="var(--c-accent-glow)" stroke-width="1.4" />
          <!-- 正电荷 "+" 符号 -->
          <line :x1="cx - 2.8" y1="135" :x2="cx + 2.8" y2="135" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />
          <line :x1="cx" y1="132.2" :x2="cx" y2="137.8" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" />

          <!-- 正电荷右侧的运动箭头 (向右 →) -->
          <g stroke="var(--c-accent-glow)" stroke-width="1.6" stroke-linecap="round">
            <line :x1="cx + 10" y1="135" :x2="cx + 24" y2="135" />
            <polygon :points="`${cx + 24},135 ${cx + 19},131.5 ${cx + 19},138.5`" fill="var(--c-accent-glow)" stroke="none" />
          </g>
        </g>
      </g>
    </template>

    <!-- ==================== 5. 宏观电流方向 I (严格向右 →) ==================== -->
    <g>
      <line x1="180" y1="202" x2="350" y2="202" stroke="var(--c-accent)" stroke-width="2.8" stroke-linecap="round" />
      <polygon points="361,202 348,196.5 348,207.5" fill="var(--c-accent)" />
      <text
        x="265"
        y="194"
        text-anchor="middle"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="21"
        font-weight="600"
        fill="var(--c-accent)"
      >
        I
      </text>
    </g>
  </svg>
</template>
