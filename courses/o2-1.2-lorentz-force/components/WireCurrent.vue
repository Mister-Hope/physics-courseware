<!--
  引课页：电流微观图景（精修版）
  —— 金属导线内部：
     1. 正离子（Cu²⁺，金色）：以密集规整晶格固定在导线骨架中（16 个），正离子间绘制晶格网格线；
     2. 自由电子（e⁻，蓝色）：以精确 1:2 数量比例（32 个）更小巧地穿梭于晶格通道间，
        每个电子均带有向左的漂移速度矢量微箭头（← v）；
     3. 顶部标明电子漂移速度 v（← 向左）；
     4. 底部金色粗箭头标明电流方向 I（→ 向右），直观呈现“电流方向与自由电子漂移方向相反”。
-->
<script setup lang="ts">
import { ref } from "vue";

/** 右上角切换按钮控制的当前状态：true = 有电流（自由电子定向移动），false = 无电流（无定向移动） */
const hasCurrent = ref(true);
const toggleCurrent = (): void => {
  hasCurrent.value = !hasCurrent.value;
};

// 16 个正离子（2 行 × 8 列晶格排列）
const ions = [
  // 上排 (y = 80)
  { x: 90, y: 80 },
  { x: 190, y: 80 },
  { x: 290, y: 80 },
  { x: 390, y: 80 },
  { x: 490, y: 80 },
  { x: 590, y: 80 },
  { x: 690, y: 80 },
  { x: 790, y: 80 },
  // 下排 (y = 128)
  { x: 90, y: 128 },
  { x: 190, y: 128 },
  { x: 290, y: 128 },
  { x: 390, y: 128 },
  { x: 490, y: 128 },
  { x: 590, y: 128 },
  { x: 690, y: 128 },
  { x: 790, y: 128 },
];

// 32 个自由电子（严格 1:2 数量比，穿梭于上、中、下三条微观通道）
const electrons = [
  // 中间主流通道 (16 个)
  { x: 55, y: 104 },
  { x: 115, y: 101 },
  { x: 145, y: 107 },
  { x: 175, y: 101 },
  { x: 215, y: 106 },
  { x: 255, y: 102 },
  { x: 315, y: 107 },
  { x: 355, y: 102 },
  { x: 415, y: 106 },
  { x: 455, y: 102 },
  { x: 515, y: 106 },
  { x: 555, y: 103 },
  { x: 615, y: 107 },
  { x: 655, y: 102 },
  { x: 715, y: 106 },
  { x: 755, y: 103 },
  // 上部通道 (8 个)
  { x: 140, y: 66 },
  { x: 240, y: 65 },
  { x: 340, y: 67 },
  { x: 440, y: 65 },
  { x: 540, y: 66 },
  { x: 640, y: 65 },
  { x: 740, y: 67 },
  { x: 835, y: 66 },
  // 下部通道 (8 个)
  { x: 65, y: 142 },
  { x: 140, y: 142 },
  { x: 240, y: 141 },
  { x: 340, y: 142 },
  { x: 440, y: 141 },
  { x: 540, y: 142 },
  { x: 640, y: 141 },
  { x: 740, y: 142 },
];
</script>

<template>
  <div class="relative w-full">
    <!-- 右上角：切换电流有无（有电流：电子定向移动 + 电流 I 箭头；无电流：箭头全部消失）
         两种状态的底色 / 描边按 token 表达（不再用调色板工具类） -->
    <button
      type="button"
      :aria-pressed="hasCurrent"
      aria-label="切换电流有无"
      @click="toggleCurrent"
      class="absolute top-0 right-0 z-10 cursor-pointer rounded-lg border px-2.5 py-1 text-[13px] font-semibold leading-tight transition-all select-none"
      :class="hasCurrent ? 'text-amber-300' : 'current-toggle-off'"
      :style="
        hasCurrent
          ? {
              backgroundColor: 'color-mix(in srgb, var(--c-accent-light) 15%, transparent)',
              borderColor: 'color-mix(in srgb, var(--c-accent-light) 70%, transparent)',
            }
          : {
              backgroundColor: 'color-mix(in srgb, var(--c-neutral-900) 80%, transparent)',
              borderColor: 'color-mix(in srgb, var(--c-neutral-700) 70%, transparent)',
            }
      "
    >
      <template v-if="hasCurrent">电流：有</template>
      <template v-else>电流：无</template>
    </button>

    <svg
      viewBox="0 0 900 210"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full select-none"
      role="img"
      aria-label="电流微观图景：正离子与自由电子定向移动"
    >
      <defs>
        <!-- 导线透明圆柱体外壳渐变 -->
        <linearGradient id="cm-wire-body" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stop-color="color-mix(in srgb, var(--c-neutral-700) 40%, transparent)"
          />
          <stop
            offset="30%"
            stop-color="color-mix(in srgb, var(--c-surface-solid) 65%, transparent)"
          />
          <stop
            offset="70%"
            stop-color="color-mix(in srgb, var(--c-neutral-900) 80%, transparent)"
          />
          <stop
            offset="100%"
            stop-color="color-mix(in srgb, var(--c-surface-solid) 50%, transparent)"
          />
        </linearGradient>

        <!-- 导线上下内壁高光线 -->
        <linearGradient id="cm-wire-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="color-mix(in srgb, var(--c-text-dim) 10%, transparent)" />
          <stop offset="50%" stop-color="color-mix(in srgb, var(--c-text-dim) 40%, transparent)" />
          <stop offset="100%" stop-color="color-mix(in srgb, var(--c-text-dim) 10%, transparent)" />
        </linearGradient>

        <!-- 正离子立体金属球体渐变 (Cu²⁺) -->
        <radialGradient id="cm-ion-3d" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fde68a" />
          <stop offset="30%" stop-color="var(--c-accent-glow)" />
          <stop offset="75%" stop-color="#d97706" />
          <stop offset="100%" stop-color="#b45309" />
        </radialGradient>

        <!-- 自由电子小微球渐变 (e⁻) -->
        <radialGradient id="cm-electron-3d" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#bae6fd" />
          <stop offset="40%" stop-color="var(--c-physics-light)" />
          <stop offset="85%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#0369a1" />
        </radialGradient>

        <!-- 电子微观发光光晕 -->
        <filter id="cm-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- ==================== 1. 顶部图例与漂移速度矢量 v ==================== -->
      <!-- 图例 1：金色正离子 -->
      <g transform="translate(48, 28)">
        <circle cx="0" cy="0" r="7.5" fill="url(#cm-ion-3d)" stroke="#fde68a" stroke-width="0.8" />
        <text x="0" y="3.5" text-anchor="middle" font-size="10" font-weight="800" fill="#78350f">
          +
        </text>
        <text x="14" y="5" font-size="15" font-weight="600" fill="var(--c-accent)">正离子</text>
      </g>

      <!-- 图例 2：蓝色自由电子 -->
      <g transform="translate(160, 28)">
        <circle
          cx="0"
          cy="0"
          r="5"
          fill="url(#cm-electron-3d)"
          stroke="#bae6fd"
          stroke-width="0.8"
        />
        <line
          x1="-2.2"
          y1="0"
          x2="2.2"
          y2="0"
          stroke="#ffffff"
          stroke-width="1.1"
          stroke-linecap="round"
        />
        <text x="12" y="5" font-size="15" font-weight="600" fill="var(--c-velocity)">自由电子</text>
      </g>

      <!-- 电子定向漂移速度 v 标尺（向左粗箭头）——仅在有电流时显示 -->
      <g v-if="hasCurrent">
        <CourseArrow
          :from="{ x: 800, y: 28 }"
          :to="{ x: 670, y: 28 }"
          stroke="var(--c-physics-light)"
          stroke-width="3.4"
        />
        <text
          x="654"
          y="35"
          text-anchor="end"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="22"
          font-weight="700"
          fill="var(--c-physics-light)"
        >
          v
        </text>
      </g>

      <!-- ==================== 2. 导线主体（圆柱形金属管截面） ==================== -->
      <!-- 导线背景与轮廓 -->
      <rect
        x="40"
        y="52"
        width="820"
        height="104"
        rx="22"
        fill="url(#cm-wire-body)"
        stroke="color-mix(in srgb, var(--c-text-dim) 35%, transparent)"
        stroke-width="1.6"
      />
      <!-- 导线上下内边缘高光线 -->
      <line x1="60" y1="53" x2="840" y2="53" stroke="url(#cm-wire-edge)" stroke-width="1.2" />
      <line x1="60" y1="155" x2="840" y2="155" stroke="url(#cm-wire-edge)" stroke-width="1.2" />

      <!-- ==================== 3. 晶格连线（虚线表现金属晶格结构） ==================== -->
      <g
        stroke="color-mix(in srgb, var(--c-accent) 18%, transparent)"
        stroke-width="1.2"
        stroke-dasharray="4 4"
      >
        <!-- 横向晶格连线 -->
        <line x1="90" y1="80" x2="790" y2="80" />
        <line x1="90" y1="128" x2="790" y2="128" />
        <!-- 纵向晶格连线 -->
        <line
          v-for="col in [90, 190, 290, 390, 490, 590, 690, 790]"
          :key="`grid-v-${col}`"
          :x1="col"
          y1="80"
          :x2="col"
          y2="128"
        />
      </g>

      <!-- ==================== 4. 密集正离子阵列（16 个，带立体质感与正电荷） ==================== -->
      <g v-for="(ion, idx) in ions" :key="`ion-${idx}`">
        <!-- 晶格节点阴影/底晕 -->
        <circle
          :cx="ion.x"
          :cy="ion.y"
          r="12"
          fill="color-mix(in srgb, var(--c-accent-glow) 10%, transparent)"
        />
        <!-- 立体金属离子球体 -->
        <circle
          :cx="ion.x"
          :cy="ion.y"
          r="9.5"
          fill="url(#cm-ion-3d)"
          stroke="#fef08a"
          stroke-width="0.9"
        />
        <!-- 离子偏心高光 -->
        <circle :cx="ion.x - 3" :cy="ion.y - 3" r="2.2" fill="#ffffff" opacity="0.75" />
        <!-- 离子中心正电荷「+」符号 -->
        <g stroke="#78350f" stroke-width="1.4" stroke-linecap="round">
          <line :x1="ion.x - 3.2" :y1="ion.y" :x2="ion.x + 3.2" :y2="ion.y" />
          <line :x1="ion.x" :y1="ion.y - 3.2" :x2="ion.x" :y2="ion.y + 3.2" />
        </g>
      </g>

      <!-- ==================== 5. 小巧自由电子穿梭海（32 个，带向左漂移小箭头 ←） ==================== -->
      <g v-for="(e, idx) in electrons" :key="`e-${idx}`">
        <!-- 电子向左定向漂移速度微箭头：主杆向左，在左端收拢为指向左侧的尖锐箭头 ←（仅在有电流时显示） -->
        <g v-if="hasCurrent">
          <path
            :d="`M ${e.x - 4.5} ${e.y} H ${e.x - 17} l 3.5 -2.5 m -3.5 2.5 l 3.5 2.5`"
            fill="none"
            stroke="var(--c-physics-light)"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.9"
          />
        </g>

        <!-- 电子发光外晕 -->
        <circle
          :cx="e.x"
          :cy="e.y"
          r="6"
          fill="color-mix(in srgb, var(--c-physics-light) 30%, transparent)"
          filter="url(#cm-glow)"
        />
        <!-- 电子立体微球本体 (r = 4.2，明显更小更小巧) -->
        <circle
          :cx="e.x"
          :cy="e.y"
          r="4.2"
          fill="url(#cm-electron-3d)"
          stroke="#bae6fd"
          stroke-width="0.7"
        />
        <!-- 电子高光点 -->
        <circle :cx="e.x - 1.2" :cy="e.y - 1.2" r="1.1" fill="#ffffff" opacity="0.9" />
        <!-- 负电荷「−」符号 -->
        <line
          :x1="e.x - 1.8"
          :y1="e.y"
          :x2="e.x + 1.8"
          :y2="e.y"
          stroke="#ffffff"
          stroke-width="0.9"
          stroke-linecap="round"
          opacity="0.95"
        />
      </g>

      <!-- ==================== 6. 电流方向 I（金色粗箭头，向右）——仅在有电流时显示 ==================== -->
      <!-- 电流粗箭头：向右，与自由电子向左漂移形成强烈视觉反差 -->
      <g v-if="hasCurrent">
        <CourseArrow
          :from="{ x: 50, y: 184 }"
          :to="{ x: 804, y: 184 }"
          stroke="var(--c-accent)"
          stroke-width="5"
        />
        <text
          x="824"
          y="193"
          font-family="KaTeX_Math, serif"
          font-style="italic"
          font-size="28"
          font-weight="700"
          fill="var(--c-accent)"
        >
          I
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 保持满宽响应式渲染 */

/* 未选中态的文字色 + hover 提亮（原来是调色板工具类）：
   不用共享的 `.text-dim`，因为它带 `!important`，hover 规则压不过它。 */
.current-toggle-off {
  color: var(--c-text-dim);
}

.current-toggle-off:hover {
  color: var(--c-neutral-200);
}
</style>
