<!--
  方向性页：热传递的方向性（Slidev 课件矢量组件）
  —— 物理核心：热力学第二定律（自发过程的单向不可逆性）
     左侧：热鸡蛋放入冷水（热量自发传递）
     右侧：最后水和鸡蛋温度相同（热平衡）
     正向：自发发生（金箭头）
     逆向：不会自发发生（红虚线箭头 + 国际禁行符 ⊘）
  精修规范：
     - 去除干扰小字和次级副标题，仅保留核心大字，画面极简清爽；
     - 鸡蛋形状为标准浑圆饱满的卵圆形，拒绝布丁感或塌扁感；
     - 字号保证 Slidev 远屏投影清晰（18~20px 粗体）。
-->
<script setup lang="ts">
const { showReverse = false } = defineProps<{
  /** 是否展示逆向（不会自发发生）过程，用于幻灯片逐步揭晓（v-click） */
  showReverse?: boolean;
}>();
</script>

<template>
  <div class="w-full flex justify-center items-center select-none">
    <svg
      viewBox="0 0 740 230"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full max-w-[820px] overflow-visible"
      role="img"
      aria-label="热传递的方向性：热鸡蛋放入冷水自发达到热平衡，逆过程不会自发发生"
    >
      <defs>
        <!-- 容器玻璃微光渐变 -->
        <linearGradient id="td-bowl-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="color-mix(in srgb, var(--c-neutral-600) 40%, transparent)" />
          <stop offset="50%" stop-color="color-mix(in srgb, var(--c-surface-solid) 55%, transparent)" />
          <stop offset="100%" stop-color="color-mix(in srgb, var(--c-neutral-900) 80%, transparent)" />
        </linearGradient>

        <!-- 冷水渐变（左碗） -->
        <linearGradient id="td-water-cold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="color-mix(in srgb, var(--c-physics-light) 30%, transparent)" />
          <stop offset="60%" stop-color="rgba(14, 116, 144, 0.45)" />
          <stop offset="100%" stop-color="rgba(3, 105, 161, 0.6)" />
        </linearGradient>

        <!-- 温水渐变（右碗 - 热平衡状态） -->
        <linearGradient id="td-water-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="color-mix(in srgb, var(--c-physics) 28%, transparent)" />
          <stop offset="60%" stop-color="rgba(13, 148, 136, 0.42)" />
          <stop offset="100%" stop-color="rgba(15, 118, 110, 0.55)" />
        </linearGradient>

        <!-- 热鸡蛋渐变（红暖温润感） -->
        <radialGradient id="td-egg-hot" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="35%" stop-color="var(--c-accent-glow)" />
          <stop offset="75%" stop-color="#ea580c" />
          <stop offset="100%" stop-color="#c2410c" />
        </radialGradient>

        <!-- 平衡鸡蛋外壳渐变（自然原色蛋壳） -->
        <radialGradient id="td-egg-eq" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="40%" stop-color="#fed7aa" />
          <stop offset="80%" stop-color="#fdba74" />
          <stop offset="100%" stop-color="#f97316" />
        </radialGradient>

        <!-- 热量扩散发光滤镜 -->
        <filter id="td-heat-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <!-- 柔和热气微光滤镜 -->
        <filter id="td-steam-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- ==================== 左侧：热鸡蛋放冷水 ==================== -->
      <g id="left-system" transform="translate(0, 0)">
        <!-- 碗底阴影 -->
        <ellipse cx="160" cy="184" rx="72" ry="7" fill="rgba(0,0,0,0.3)" />

        <!-- 碗外壁（圆润深弧容器） -->
        <path
          d="M 80 96 C 80 156 108 182 160 182 C 212 182 240 156 240 96 Z"
          fill="url(#td-bowl-glass)"
          stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
          stroke-width="2.5"
          stroke-linejoin="round"
        />

        <!-- 冷水水体 -->
        <path d="M 86 116 C 86 156 112 177 160 177 C 208 177 234 156 234 116 Z" fill="url(#td-water-cold)" />
        <!-- 水面椭圆透视 -->
        <ellipse cx="160" cy="116" rx="74" ry="11" fill="color-mix(in srgb, var(--c-physics-light) 20%, transparent)" stroke="color-mix(in srgb, var(--c-physics-light) 55%, transparent)" stroke-width="1.6" />

        <!-- 浸入水中的热鸡蛋（标准浑圆鸡蛋卵形曲线） -->
        <!-- 热力辐射光晕 -->
        <circle cx="160" cy="144" r="34" fill="color-mix(in srgb, var(--c-accent-glow) 20%, transparent)" filter="url(#td-heat-glow)" />

        <!-- 鸡蛋主体：上微敛下饱满浑圆的经典几何蛋形 -->
        <g transform="translate(160, 144) rotate(-8)">
          <path
            d="M 0 -26 C 18 -26 26 -11 26 8 C 26 21 16 27 0 27 C -16 27 -26 21 -26 8 C -26 -11 -18 -26 0 -26 Z"
            fill="url(#td-egg-hot)"
            stroke="#ea580c"
            stroke-width="1.8"
          />
          <!-- 蛋壳微弧高光 -->
          <path d="M -11 -13 C -6 -20 6 -20 11 -13" stroke="rgba(255, 255, 255, 0.6)" stroke-width="2.2" stroke-linecap="round" fill="none" />
        </g>

        <!-- 鸡蛋标签：清晰大字 -->
        <text
          x="160"
          y="149"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="16"
          font-weight="bold"
          fill="#ffffff"
          style="text-shadow: 0 1px 3px rgb(0 0 0 / 85%)"
        >
          热鸡蛋
        </text>

        <!-- 碗壁高光反光条 -->
        <path d="M 88 106 C 88 140 102 165 125 174" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2.5" stroke-linecap="round" />

        <!-- 碗口上沿口环透视线 -->
        <ellipse cx="160" cy="96" rx="80" ry="12" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)" stroke-width="2" />

        <!-- 升腾热气（3束升腾气流） -->
        <g filter="url(#td-steam-glow)">
          <path
            d="M 134 88 C 124 75 142 62 132 46 C 126 38 134 30 130 22"
            fill="none"
            stroke="var(--c-accent-glow)"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-dasharray="80"
            opacity="0.85"
          />
          <path
            d="M 160 84 C 172 70 150 56 162 40 C 168 32 158 24 163 16"
            fill="none"
            stroke="var(--c-accent-light)"
            stroke-width="3.2"
            stroke-linecap="round"
            stroke-dasharray="85"
            opacity="0.95"
          />
          <path
            d="M 186 88 C 196 75 178 62 188 46 C 194 38 186 30 190 22"
            fill="none"
            stroke="var(--c-accent-glow)"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-dasharray="80"
            opacity="0.85"
          />
        </g>

        <!-- 底部大字说明（极简，无副标题杂字） -->
        <text x="160" y="214" text-anchor="middle" font-size="20" font-weight="bold" fill="var(--c-neutral-50)">热鸡蛋放入冷水</text>
      </g>

      <!-- ==================== 中间：方向性箭头指示 ==================== -->
      <g id="middle-arrows">
        <!-- ===== ① 正向过程：自发发生（金色粗箭头） ===== -->
        <g id="forward-process">
          <CourseArrow :from="{ x: 268, y: 92 }" :to="{ x: 472, y: 92 }" stroke="var(--c-accent-glow)" stroke-width="4.5" :head-size="16" />

          <!-- “自发发生” 讲台视认高光大胶囊徽标（纯粹有力，无多余说明字） -->
          <g transform="translate(370, 70)">
            <rect
              x="-68"
              y="-18"
              width="136"
              height="36"
              rx="18"
              fill="var(--c-neutral-900)"
              stroke="var(--c-accent-glow)"
              stroke-width="2.2"
              filter="drop-shadow(0 4px 10px rgba(245, 158, 11, 0.25))"
            />
            <text x="0" y="6" text-anchor="middle" font-size="19" font-weight="bold" fill="var(--c-accent-light)" letter-spacing="1">自发发生</text>
          </g>
        </g>

        <!-- ===== ② 逆向过程：不会自发发生（条件渲染 showReverse） ===== -->
        <g v-if="showReverse" id="reverse-process">
          <!-- 红色反向虚线箭头（右向左） -->
          <CourseArrow :from="{ x: 472, y: 156 }" :to="{ x: 268, y: 156 }" stroke="#ef4444" stroke-width="3.5" stroke-dasharray="9 6" :head-size="15" />

          <!-- 国际醒目禁止图标 ⊘ -->
          <g transform="translate(370, 156)">
            <circle cx="0" cy="0" r="16" fill="var(--c-neutral-900)" stroke="#ef4444" stroke-width="2.8" />
            <line x1="-10" y1="-10" x2="10" y2="10" stroke="#ef4444" stroke-width="2.8" stroke-linecap="round" />
          </g>

          <!-- “不会自发发生” 红色醒目警示徽标（纯粹有力，无多余说明字） -->
          <g transform="translate(370, 196)">
            <rect
              x="-82"
              y="-17"
              width="164"
              height="34"
              rx="17"
              fill="var(--c-neutral-900)"
              stroke="#ef4444"
              stroke-width="2.2"
              filter="drop-shadow(0 4px 10px rgba(239, 68, 68, 0.25))"
            />
            <text x="0" y="6" text-anchor="middle" font-size="18" font-weight="bold" fill="var(--c-force)" letter-spacing="0.5">不会自发发生</text>
          </g>
        </g>
      </g>

      <!-- ==================== 右侧：最后水和鸡蛋温度相同 ==================== -->
      <g id="right-system" transform="translate(420, 0)">
        <!-- 碗底阴影 -->
        <ellipse cx="160" cy="184" rx="72" ry="7" fill="rgba(0,0,0,0.3)" />

        <!-- 碗外壁（圆润深弧容器） -->
        <path
          d="M 80 96 C 80 156 108 182 160 182 C 212 182 240 156 240 96 Z"
          fill="url(#td-bowl-glass)"
          stroke="color-mix(in srgb, var(--c-text-dim) 45%, transparent)"
          stroke-width="2.5"
          stroke-linejoin="round"
        />

        <!-- 温水水体（达到热平衡后的温润色调） -->
        <path d="M 86 116 C 86 156 112 177 160 177 C 208 177 234 156 234 116 Z" fill="url(#td-water-warm)" />
        <!-- 水面透视椭圆 -->
        <ellipse cx="160" cy="116" rx="74" ry="11" fill="color-mix(in srgb, var(--c-physics) 22%, transparent)" stroke="color-mix(in srgb, var(--c-physics) 55%, transparent)" stroke-width="1.6" />

        <!-- 热平衡后的鸡蛋（标准浑圆鸡蛋卵形曲线） -->
        <g transform="translate(160, 144) rotate(-3)">
          <path
            d="M 0 -26 C 18 -26 26 -11 26 8 C 26 21 16 27 0 27 C -16 27 -26 21 -26 8 C -26 -11 -18 -26 0 -26 Z"
            fill="url(#td-egg-eq)"
            stroke="#ea580c"
            stroke-width="1.6"
          />
          <!-- 蛋壳高光弧线 -->
          <path d="M -11 -13 C -6 -20 6 -20 11 -13" stroke="rgba(255, 255, 255, 0.6)" stroke-width="2" stroke-linecap="round" fill="none" />
        </g>

        <!-- 鸡蛋标签：清晰大字 -->
        <text
          x="160"
          y="149"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="16"
          font-weight="bold"
          fill="#ffffff"
          style="text-shadow: 0 1px 3px rgb(0 0 0 / 85%)"
        >
          鸡蛋
        </text>

        <!-- 碗壁高光反光条 -->
        <path d="M 88 106 C 88 140 102 165 125 174" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2.5" stroke-linecap="round" />

        <!-- 碗口上沿口环透视线 -->
        <ellipse cx="160" cy="96" rx="80" ry="12" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)" stroke-width="2" />

        <!-- 底部大字说明（极简，无副标题杂字） -->
        <text x="160" y="214" text-anchor="middle" font-size="20" font-weight="bold" fill="var(--c-neutral-50)">最后水和鸡蛋温度相同</text>
      </g>
    </svg>
  </div>
</template>
