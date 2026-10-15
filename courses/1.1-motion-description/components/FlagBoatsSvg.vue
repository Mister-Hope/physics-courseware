<!-- 1.1 例题：旗帜题——河岸上的旗向右飘，船 A 的旗向右、船 B 的旗向左（精修版） -->
<script setup lang="ts">
const { step = 2 } = defineProps<{
  /** Slidev 点击步数： 0: 原始题图（干净无剧透，供课堂提问：A/B 船各做何种运动？） 1: 判定风向（岸旗指示自然风向右）及 A 船旗与风同向分析 2: B 船旗与风反向分析（必向右且 v_B > v_风，选 C） */
  step?: number;
}>();
</script>

<template>
  <svg viewBox="0 0 560 380" class="fb-svg" role="img" aria-label="旗帜题：河岸与两条船上的旗帜">
    <defs>
      <!-- 天空与水面自然深色渐变 -->
      <linearGradient id="fbs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0a1224" />
        <stop offset="100%" stop-color="#14213d" />
      </linearGradient>

      <linearGradient id="fbs-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#142f4c" />
        <stop offset="35%" stop-color="#0e2238" />
        <stop offset="100%" stop-color="#081422" />
      </linearGradient>

      <!-- 河岸质感 -->
      <linearGradient id="fbs-quay" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-neutral-700)" />
        <stop offset="100%" stop-color="var(--c-surface-solid)" />
      </linearGradient>

      <!-- 游船主壳上层高光白 -->
      <linearGradient id="fbs-hull-white" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--c-neutral-50)" />
        <stop offset="70%" stop-color="var(--c-neutral-200)" />
        <stop offset="100%" stop-color="var(--c-neutral-300)" />
      </linearGradient>

      <!-- 游船水下藏青吃水龙骨 -->
      <linearGradient id="fbs-hull-blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0369a1" />
      </linearGradient>

      <!-- 红色丝绸旗帜渐变 -->
      <linearGradient id="fbs-flag" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#dc2626" />
        <stop offset="60%" stop-color="#ef4444" />
        <stop offset="100%" stop-color="var(--c-force)" />
      </linearGradient>

      <!-- 舱窗深蓝防眩反光 -->
      <linearGradient id="fbs-window" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--c-physics-light)" />
        <stop offset="60%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0369a1" />
      </linearGradient>

      <!-- 风向箭头标标头 -->
      <marker id="fbs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <polygon points="1,1 7,4 1,7 2.5,4" fill="var(--c-accent-glow)" />
      </marker>
    </defs>

    <!-- 1. 天空与远山 -->
    <rect x="0" y="0" width="560" height="136" fill="url(#fbs-sky)" />
    <!-- 远山层次 -->
    <path
      d="M -20 136 L 40 110 Q 110 88 180 114 L 260 94 Q 340 76 420 106 L 500 88 Q 540 78 580 110 L 580 136 Z"
      fill="color-mix(in srgb, var(--c-neutral-700) 45%, transparent)"
    />
    <path d="M 60 136 L 140 120 Q 220 106 300 124 L 400 112 Q 490 102 580 126 L 580 136 Z" fill="color-mix(in srgb, var(--c-surface-solid) 60%, transparent)" />

    <!-- 2. 水域与波光涟漪 -->
    <rect x="0" y="136" width="560" height="244" fill="url(#fbs-water)" />
    <line x1="0" y1="136" x2="560" y2="136" stroke="color-mix(in srgb, var(--c-physics-light) 30%, transparent)" stroke-width="1.2" />
    <g stroke="color-mix(in srgb, var(--c-velocity-light) 18%, transparent)" stroke-width="1.2" stroke-linecap="round">
      <line x1="120" y1="152" x2="190" y2="152" />
      <line x1="330" y1="148" x2="410" y2="148" />
      <line x1="480" y1="154" x2="540" y2="154" />
      <line x1="160" y1="180" x2="260" y2="180" stroke-dasharray="14 10" />
      <line x1="370" y1="176" x2="480" y2="176" stroke-dasharray="16 10" />
      <line x1="130" y1="324" x2="280" y2="324" stroke-dasharray="20 14" />
      <line x1="340" y1="330" x2="520" y2="330" stroke-dasharray="24 16" />
    </g>

    <!-- 3. 左侧河岸、石质码头与岸上红旗 -->
    <!-- 码头基座 -->
    <path d="M 0 106 L 68 106 L 78 124 L 78 380 L 0 380 Z" fill="url(#fbs-quay)" stroke="var(--c-neutral-600)" stroke-width="1.4" />
    <!-- 岸顶绿色草坡与石沿 -->
    <rect x="0" y="103" width="68" height="6" fill="#15803d" stroke="#166534" stroke-width="0.8" />
    <line x1="0" y1="109" x2="68" y2="109" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="78" y1="124" x2="78" y2="380" stroke="color-mix(in srgb, var(--c-neutral-900) 80%, transparent)" stroke-width="2" />

    <!-- 河岸横排文字标牌（清晰优雅，拒绝竖排-90度旋转） -->
    <g transform="translate(36, 134)">
      <rect
        x="-26"
        y="-11"
        width="52"
        height="22"
        rx="4"
        fill="color-mix(in srgb, var(--c-neutral-900) 85%, transparent)"
        stroke="var(--c-neutral-500)"
        stroke-width="1"
      />
      <text x="0" y="4" text-anchor="middle" font-size="12" font-weight="700" fill="var(--c-neutral-200)">河岸</text>
    </g>

    <!-- 岸上旗杆立柱 -->
    <rect x="29" y="99" width="10" height="5" rx="1.5" fill="var(--c-neutral-600)" />
    <line x1="34" y1="99" x2="34" y2="28" stroke="var(--c-neutral-300)" stroke-width="2.6" stroke-linecap="round" />
    <circle cx="34" cy="27" r="3" fill="var(--c-accent-light)" stroke="#d97706" stroke-width="1" />

    <!-- 岸上旗帜：向右飘扬（自然风向右的黄金依据） -->
    <path d="M 34 30 C 52 26, 62 34, 78 28 L 68 41 L 80 54 C 64 48, 50 56, 34 50 Z" fill="url(#fbs-flag)" stroke="#991b1b" stroke-width="1.2" />
    <path d="M 36 36 Q 52 33 60 39" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.2" />

    <!-- 4. 风向分析指示（step >= 1 时亮起） -->
    <g v-if="step >= 1" transform="translate(100, 48)">
      <!-- 流线与箭头 -->
      <line x1="0" y1="0" x2="72" y2="0" stroke="var(--c-accent-glow)" stroke-width="2.6" marker-end="url(#fbs-arrow)" />
      <rect
        x="12"
        y="-14"
        width="48"
        height="18"
        rx="4"
        fill="color-mix(in srgb, var(--c-neutral-900) 92%, transparent)"
        stroke="var(--c-accent-glow)"
        stroke-width="1"
      />
      <text x="36" y="-1" text-anchor="middle" font-size="11" font-weight="700" fill="var(--c-accent-glow)">风向向右</text>
    </g>

    <!-- ==================== 5. 船 A（旗向右飘） ==================== -->
    <g transform="translate(210, 246)">
      <!-- 水中吃水倒影与破水波纹 -->
      <ellipse cx="0" cy="24" rx="72" ry="7" fill="rgba(2,132,199,0.18)" />
      <path d="M 64 21 Q 74 24 80 20 Q 72 26 60 24 Z" fill="rgba(255,255,255,0.6)" />

      <!-- 游艇主体（真实比例流线型现代快艇） -->
      <!-- 水下藏青吃水龙骨 -->
      <path d="M -64 21 C -40 23, 36 23, 68 21 C 56 28, -20 30, -50 27 Z" fill="url(#fbs-hull-blue)" stroke="#0369a1" stroke-width="1" />
      <!-- 金色水线 -->
      <line x1="-65" y1="21" x2="69" y2="21" stroke="var(--c-accent-glow)" stroke-width="1.6" />

      <!-- 水上高光白船体 -->
      <path d="M -66 21 L -62 10 C -40 9, 30 8, 54 9 L 75 21 Z" fill="url(#fbs-hull-white)" stroke="var(--c-text-dim)" stroke-width="1.2" />

      <!-- 驾驶舱与挡风舷窗 -->
      <path d="M -36 10 L -28 -2 C -10 -3, 16 -2, 28 3 L 36 10 Z" fill="var(--c-neutral-700)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <path d="M -24 8 L -19 0 C -4 -1, 14 0, 24 4 L 28 8 Z" fill="url(#fbs-window)" />

      <!-- 前甲板不锈钢护栏 -->
      <path d="M 40 9 L 64 10 L 71 20" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-linecap="round" />

      <!-- 舱顶测风桅杆立柱 -->
      <line x1="0" y1="-2" x2="0" y2="-46" stroke="var(--c-neutral-300)" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="0" cy="-46" r="2.4" fill="var(--c-accent-light)" />

      <!-- 船 A 旗帜：向右飘（与风同向） -->
      <path d="M 0 -45 C 16 -48, 26 -41, 40 -46 L 31 -35 L 42 -24 C 28 -29, 16 -23, 0 -28 Z" fill="url(#fbs-flag)" stroke="#991b1b" stroke-width="1.1" />
      <path d="M 2 -40 Q 16 -43 24 -37" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1" />

      <!-- 船名 A 标识牌 -->
      <circle cx="0" cy="15" r="9.5" fill="var(--c-neutral-900)" stroke="var(--c-physics-light)" stroke-width="1.4" />
      <text x="0" y="19" text-anchor="middle" font-size="12" font-weight="800" fill="var(--c-neutral-200)">A</text>

      <!-- 教学分析批注（随 step 显示）：位置完美包裹旗帜，文字移至外侧(左侧)防重叠 -->
      <g v-if="step >= 1">
        <!-- 蓝框精准对齐旗帜范围 (x: 0~42, y: -48~-24) -->
        <rect x="-3" y="-50" width="48" height="28" rx="5" fill="none" stroke="var(--c-physics-light)" stroke-width="1.5" stroke-dasharray="4 3" />
        <!-- 提示移至 A 船外侧（左侧），彻底拉开与 B 船的间距 -->
        <g transform="translate(-104, -46)">
          <rect
            x="0"
            y="0"
            width="94"
            height="20"
            rx="4"
            fill="color-mix(in srgb, var(--c-neutral-900) 92%, transparent)"
            stroke="var(--c-physics-light)"
            stroke-width="1"
          />
          <text x="47" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#7dd3fc">旗向右 (与风同向)</text>
        </g>
      </g>

      <!-- A 船状态结论 (step >= 1) -->
      <g v-if="step >= 1" transform="translate(0, 42)">
        <rect
          x="-78"
          y="-10"
          width="156"
          height="20"
          rx="4"
          fill="color-mix(in srgb, var(--c-neutral-900) 92%, transparent)"
          stroke="color-mix(in srgb, var(--c-physics-light) 50%, transparent)"
          stroke-width="1"
        />
        <text x="0" y="4" text-anchor="middle" font-size="10.5" fill="var(--c-neutral-300)">可能静止 / 向左 / 向右但慢于风</text>
      </g>
    </g>

    <!-- ==================== 6. 船 B（旗向左飘） ==================== -->
    <g transform="translate(425, 246)">
      <!-- 水中吃水倒影与破水波纹 -->
      <ellipse cx="0" cy="24" rx="72" ry="7" fill="rgba(2,132,199,0.18)" />
      <path d="M 64 21 Q 74 24 80 20 Q 72 26 60 24 Z" fill="rgba(255,255,255,0.6)" />

      <!-- 游艇主体（同样造型优美的现代艇） -->
      <!-- 水下藏青吃水龙骨 -->
      <path d="M -64 21 C -40 23, 36 23, 68 21 C 56 28, -20 30, -50 27 Z" fill="url(#fbs-hull-blue)" stroke="#0369a1" stroke-width="1" />
      <!-- 金色水线 -->
      <line x1="-65" y1="21" x2="69" y2="21" stroke="var(--c-accent-glow)" stroke-width="1.6" />

      <!-- 水上高光白船体 -->
      <path d="M -66 21 L -62 10 C -40 9, 30 8, 54 9 L 75 21 Z" fill="url(#fbs-hull-white)" stroke="var(--c-text-dim)" stroke-width="1.2" />

      <!-- 驾驶舱与挡风舷窗 -->
      <path d="M -36 10 L -28 -2 C -10 -3, 16 -2, 28 3 L 36 10 Z" fill="var(--c-neutral-700)" stroke="var(--c-neutral-600)" stroke-width="1.2" />
      <path d="M -24 8 L -19 0 C -4 -1, 14 0, 24 4 L 28 8 Z" fill="url(#fbs-window)" />

      <!-- 前甲板不锈钢护栏 -->
      <path d="M 40 9 L 64 10 L 71 20" fill="none" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-linecap="round" />

      <!-- 舱顶测风桅杆立柱 -->
      <line x1="0" y1="-2" x2="0" y2="-46" stroke="var(--c-neutral-300)" stroke-width="2.2" stroke-linecap="round" />
      <circle cx="0" cy="-46" r="2.4" fill="var(--c-accent-light)" />

      <!-- 船 B 旗帜：向左飘（与风反向！核心考点） -->
      <path d="M 0 -45 C -16 -48, -26 -41, -40 -46 L -31 -35 L -42 -24 C -28 -29, -16 -23, 0 -28 Z" fill="url(#fbs-flag)" stroke="#991b1b" stroke-width="1.1" />
      <path d="M -2 -40 Q -16 -43 -24 -37" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1" />

      <!-- 船名 B 标识牌 -->
      <circle cx="0" cy="15" r="9.5" fill="var(--c-neutral-900)" stroke="var(--c-accent-glow)" stroke-width="1.4" />
      <text x="0" y="19" text-anchor="middle" font-size="12" font-weight="800" fill="var(--c-neutral-200)">B</text>

      <!-- 教学分析批注（随 step 显示）：位置完美包裹旗帜，文字移至外侧(右侧)防重叠 -->
      <g v-if="step >= 2">
        <!-- 黄框精准对齐旗帜范围 (x: -42~0, y: -48~-24) -->
        <rect x="-45" y="-50" width="48" height="28" rx="5" fill="none" stroke="var(--c-accent-glow)" stroke-width="1.5" stroke-dasharray="4 3" />
        <!-- 提示移至 B 船外侧（右侧），彻底拉开与 A 船的间距 -->
        <g transform="translate(10, -46)">
          <rect
            x="0"
            y="0"
            width="94"
            height="20"
            rx="4"
            fill="color-mix(in srgb, var(--c-neutral-900) 92%, transparent)"
            stroke="var(--c-accent-glow)"
            stroke-width="1"
          />
          <text x="47" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="#fcd34d">旗向左 (与风反向)</text>
        </g>
      </g>

      <!-- B 船状态结论 (step >= 2，锁定选项 C) -->
      <g v-if="step >= 2" transform="translate(0, 42)">
        <rect
          x="-88"
          y="-10"
          width="176"
          height="20"
          rx="4"
          fill="color-mix(in srgb, var(--c-neutral-900) 95%, transparent)"
          stroke="#ef4444"
          stroke-width="1.2"
        />
        <text x="0" y="4" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fca5a5">
          必向右且 v
          <tspan font-size="8" dy="2">B</tspan>
          <tspan font-size="10.5" dy="-2">></tspan>
          v
          <tspan font-size="8" dy="2">风</tspan>
          <tspan font-size="10.5" dy="-2">（正确选项 C）</tspan>
        </text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.fb-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
