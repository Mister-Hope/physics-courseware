<!--
  封面装饰图：上为串联电路、下为并联电路的两个电阻组合示意（精修美化版）
  
  物理逻辑与视觉规约：
    1. 间距与对齐优化（彻底杜绝贴线与重叠）：
       - 串联电路右端导线收至 x=168，串联徽标与并联徽标统一定位于右侧独立展示列 (x=194 轴线，宽 32px，x∈[178, 210])；
       - 串联徽标与左侧串联回路导线保持 10px 清晰呼吸间隔，绝不贴线；
       - 并联徽标与 R₂ 支路 (x=136) 及其标签保持超 16px 充裕间隔，绝不重叠；
       - 两徽标在右侧列严格垂直对齐，整体画面左右对称（左右各留约 10px 外边距）；
    2. 修正原版致命短路缺陷：
       - 原版并联外围存在死短路回线，精修版顶底母线延伸至第二支路 (x=136) 即规范弯折闭合；
    3. 全面采用统一的标准电路元件：
       - 使用 CircuitBattery 组件规范绘制电源（正极长细、负极短粗，导线严密止于极板外端）；
       - 使用 CircuitResistor 组件绘制 3:1 规范圆角定值电阻，附 KaTeX 学术下标 R₁、R₂；
    4. 微观电流动势与物理意象：
       - 串联电路（上方·金色调）：单一回路电流处处相等 (I = I₁ = I₂)，环流金光微脉冲贯通两电阻；
       - 并联电路（下方·天青蓝调）：干路电流在节点分流 (I = I₁ + I₂)，两支路两端电压相等 (U = U₁ = U₂)，生动呈现分流脉冲；
    5. 纯净矢量体系：无多余底板，零 fallback 全局 CSS 变量纯净绑定，完美适配 Slidev 封面与任意深浅背景。
-->
<script setup lang="ts">
const { width = 300 } = defineProps<{ width?: number }>();

// 文字光晕
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 2.8,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <svg
    viewBox="0 0 220 150"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
    class="select-none overflow-visible"
    role="img"
    aria-label="串联与并联电路：两个电阻的串联与并联组合封面装饰图"
  >
    <defs>
      <!-- 电阻微透晶体渐变 -->
      <linearGradient id="sp-resistor-series" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226, 168, 70, 0.16)" />
        <stop offset="100%" stop-color="rgba(226, 168, 70, 0.08)" />
      </linearGradient>

      <linearGradient id="sp-resistor-parallel" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(96, 165, 250, 0.16)" />
        <stop offset="100%" stop-color="rgba(96, 165, 250, 0.08)" />
      </linearGradient>

      <!-- 徽章渐变 -->
      <linearGradient id="sp-badge-series" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226, 168, 70, 0.22)" />
        <stop offset="100%" stop-color="rgba(226, 168, 70, 0.08)" />
      </linearGradient>
      <linearGradient id="sp-badge-parallel" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(96, 165, 250, 0.22)" />
        <stop offset="100%" stop-color="rgba(96, 165, 250, 0.08)" />
      </linearGradient>

      <!-- 节点发光微晕 -->
      <filter id="sp-node-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- ════════════════════════════════════════════════
         1. 上半部分：串联电路（Series Circuit，金色流光）
         回路：电源(24, 46) -> (24, 22) -> R₁(74, 22) -> R₂(136, 22) -> (168, 22) -> (168, 70) -> (24, 70) -> 电源
    ════════════════════════════════════════════════ -->
    <g class="series-group">
      <!-- 导线基础轮廓（圆角拐弯，平滑利落） -->
      <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.82">
        <!-- 支路从正极出向上折向右：(24, 40) -> (24, 22) -> (52, 22) -->
        <path d="M 24 40 V 24 Q 24 22 26 22 H 52" />
        <!-- R₁ 与 R₂ 之间的连线：(96, 22) -> (114, 22) -->
        <line x1="96" y1="22" x2="114" y2="22" />
        <!-- R₂ 引出向右折向下折回负极：(158, 22) -> (168, 22) -> (168, 70) -> (24, 70) -> (24, 52) -->
        <path d="M 158 22 H 166 Q 168 22 168 24 V 68 Q 168 70 166 70 H 26 Q 24 70 24 68 V 52" />
      </g>

      <!-- 动态微电流脉冲流线 (金色流动虚线) -->
      <g fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="5 15" opacity="0.75" class="animate-pulse-slow">
        <path d="M 24 40 V 22 H 52" />
        <line x1="96" y1="22" x2="114" y2="22" />
        <path d="M 158 22 H 168 V 70 H 24 V 52" />
      </g>

      <!-- 电源符号：垂直放置于 x=24, y=46，正极在上 (y=40)、负极在下 (y=52) -->
      <CircuitBattery :x="24" :y="46" orientation="vertical" :plate-gap="12" :long-plate="22" :short-plate="12" :line-width="1.8" color="var(--c-accent)" />

      <!-- 电阻 R₁：横放于 (74, 22)，长 44、宽 14.7，标签 R₁ -->
      <CircuitResistor :x="74" :y="22" :length="44" :line-width="1.8" color="var(--c-accent)" fill="url(#sp-resistor-series)" label="R₁" :label-dy="-1" />

      <!-- 电阻 R₂：横放于 (136, 22)，长 44、宽 14.7，标签 R₂ -->
      <CircuitResistor :x="136" :y="22" :length="44" :line-width="1.8" color="var(--c-accent)" fill="url(#sp-resistor-series)" label="R₂" :label-dy="-1" />

      <!-- 串联徽标：居中于 x=194, y=46，左边缘 x=178 距导线 (x=168) 有 10px 清晰间隔，绝不贴线 -->
      <g transform="translate(194, 46)">
        <rect x="-16" y="-10" width="32" height="20" rx="5" fill="url(#sp-badge-series)" stroke="var(--c-accent)" stroke-width="0.9" stroke-opacity="0.75" />
        <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c-accent)" :style="HALO">串联</text>
      </g>
    </g>

    <!-- ════════════════════════════════════════════════
         中轴极简虚线分割引导（微光通透）
    ════════════════════════════════════════════════ -->
    <line x1="16" y1="79" x2="214" y2="79" stroke="var(--c-text-dim)" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.22" />

    <!-- ════════════════════════════════════════════════
         2. 下半部分：并联电路（Parallel Circuit，天青蓝流光）
         顶母线：(24, 88) -> (80, 88) -> (136, 88)
         底母线：(24, 138) -> (80, 138) -> (136, 138)
         支路 1：(80, 88) -> R₁(80, 113) -> (80, 138)
         支路 2：(136, 88) -> R₂(136, 113) -> (136, 138)
         并联徽标居中于 x=194, y=113，与 R₂ (x=136) 保持超 16px 充裕间隔，绝不重叠！
    ════════════════════════════════════════════════ -->
    <g class="parallel-group">
      <!-- 导线基础轮廓 -->
      <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.82">
        <!-- 电源正极引出上折到顶母线并延伸至支路2：(24, 107) -> (24, 88) -> (136, 88) -->
        <path d="M 24 107 V 90 Q 24 88 26 88 H 134 Q 136 88 136 90" />
        <!-- 电源负极引出下折到底母线并延伸至支路2：(24, 119) -> (24, 138) -> (136, 138) -->
        <path d="M 24 119 V 136 Q 24 138 26 138 H 134 Q 136 138 136 136" />

        <!-- 支路 1 竖直接线：顶母线到 R₁ 上端 (80, 88) -> (80, 93)；R₁ 下端到底母线 (80, 133) -> (80, 138) -->
        <line x1="80" y1="88" x2="80" y2="93" />
        <line x1="80" y1="133" x2="80" y2="138" />

        <!-- 支路 2 竖直接线：顶角弯入 R₂ 上端 (136, 90) -> (136, 93)；底角弯出 R₂ 下端 (136, 133) -> (136, 136) -->
        <line x1="136" y1="90" x2="136" y2="93" />
        <line x1="136" y1="133" x2="136" y2="136" />
      </g>

      <!-- 动态微电流脉冲流线 (天青蓝流动虚线) -->
      <g fill="none" stroke="var(--c-accent-2)" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="5 15" opacity="0.75" class="animate-pulse-slow">
        <path d="M 24 107 V 88 H 136 V 93" />
        <line x1="80" y1="88" x2="80" y2="93" />
        <path d="M 136 133 V 138 H 24 V 119" />
        <line x1="80" y1="133" x2="80" y2="138" />
      </g>

      <!-- 电源符号：垂直放置于 x=24, y=113，正极在上 (y=107)、负极在下 (y=119) -->
      <CircuitBattery :x="24" :y="113" orientation="vertical" :plate-gap="12" :long-plate="22" :short-plate="12" :line-width="1.8" color="var(--c-accent-2)" />

      <!-- 分流接点圆点（Junction Nodes）：支路 1 接入上下母线处 -->
      <g fill="var(--c-accent-2)" filter="url(#sp-node-glow)">
        <circle cx="80" cy="88" r="2.8" />
        <circle cx="80" cy="138" r="2.8" />
      </g>

      <!-- 电阻 R₁：竖放于 (80, 113)，长 40、宽 13.3，标签 R₁ -->
      <CircuitResistor
        :x="80"
        :y="113"
        orientation="vertical"
        :length="40"
        :line-width="1.8"
        color="var(--c-accent-2)"
        fill="url(#sp-resistor-parallel)"
        label="R₁"
        :label-dx="1"
      />

      <!-- 电阻 R₂：竖放于 (136, 113)，长 40、宽 13.3，标签 R₂（右侧与并联徽标留足 16px 间隔） -->
      <CircuitResistor
        :x="136"
        :y="113"
        orientation="vertical"
        :length="40"
        :line-width="1.8"
        color="var(--c-accent-2)"
        fill="url(#sp-resistor-parallel)"
        label="R₂"
        :label-dx="1"
      />

      <!-- 并联徽标：居中于 x=194, y=113，与 R₂ (x=136) 保持充足间隔，与上方串联徽标对齐 -->
      <g transform="translate(194, 113)">
        <rect
          x="-16"
          y="-10"
          width="32"
          height="20"
          rx="5"
          fill="url(#sp-badge-parallel)"
          stroke="var(--c-accent-2)"
          stroke-width="0.9"
          stroke-opacity="0.75"
        />
        <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c-accent-2)" :style="HALO">并联</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
@keyframes pulse-flow {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -40;
  }
}

.animate-pulse-slow {
  animation: pulse-flow 4s linear infinite;
}
</style>
