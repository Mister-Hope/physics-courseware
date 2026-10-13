<!--
  能源利用的边界页：地球靠向太空散热，人类额外消耗能源产生的热会打破平衡、使气温上升（Slidev 课件矢量组件）
  —— 物理核心：
     1. 自然平衡：太阳辐射向地球输入能量，地球以热辐射形式向宇宙深空散热；
     2. 能源边界：人类活动消耗能源产生额外热量，若超出地球向外辐射散热的极限能力，将导致全球气温上升。
  精修规范：
     - Slidev 讲台投影级字号（核心标题 18~20px 粗体高对比），坚决摒弃 11px/12px 看不清的微小字；
     - 纯净课件矢量组件，不堆砌繁杂副标题与说明性碎片文字；
     - 太阳、地球、城市天际线、深空散热与热平衡临界状态高品质矢量渲染；
     - 全局坐标精细调校，留足顶部与底部安全边距，避免任何投影视角边缘被遮挡裁切；
     - 支持幻灯片逐步揭晓（step: 0=自然平衡基准，1=人类额外产热与温升警示，默认全显）。
-->
<script setup lang="ts">
const { step = 1, showImbalance = true } = defineProps<{
  /** 幻灯片步进： 0: 展示自然平衡（太阳辐射输入 = 向太空辐射散热） 1: (默认) 揭晓人类活动额外产热与气温上升边界结论 */
  step?: number;
  /** 直接控制是否显示额外产热不平衡状态（便于与 step 配合使用） */
  showImbalance?: boolean;
}>();
</script>

<template>
  <div class="w-full flex justify-center items-center select-none">
    <svg
      viewBox="0 0 760 248"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full max-w-[840px] overflow-visible"
      role="img"
      aria-label="能源利用的边界：太阳辐射输入、地球向太空散热以及人类额外产热打破热平衡"
    >
      <defs>
        <!-- ==================== 渐变与滤镜定义 ==================== -->

        <!-- 太阳外层日冕微光滤镜 -->
        <filter id="eb-sun-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- 地球大气层辉光滤镜 -->
        <filter id="eb-earth-halo" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <!-- 警告警示阴影滤镜 -->
        <filter id="eb-alert-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(239, 68, 68, 0.35)" />
        </filter>

        <!-- 太阳核心暖金辐射渐变 -->
        <radialGradient id="eb-sun-core" cx="40%" cy="38%" r="65%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="25%" stop-color="#fef08a" />
          <stop offset="65%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#d97706" />
        </radialGradient>

        <!-- 太阳外圈光晕色环 -->
        <radialGradient id="eb-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(251, 191, 36, 0.45)" />
          <stop offset="70%" stop-color="rgba(245, 158, 11, 0.15)" />
          <stop offset="100%" stop-color="rgba(245, 158, 11, 0)" />
        </radialGradient>

        <!-- 地球海洋球体渐变（向日面高光，背日面深邃） -->
        <radialGradient id="eb-ocean-sphere" cx="30%" cy="32%" r="70%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="45%" stop-color="#0284c7" />
          <stop offset="85%" stop-color="#0f3769" />
          <stop offset="100%" stop-color="#091e3a" />
        </radialGradient>

        <!-- 地球大气散射外晕 -->
        <radialGradient id="eb-atmosphere-rim" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stop-color="rgba(56, 189, 248, 0)" />
          <stop offset="94%" stop-color="rgba(56, 189, 248, 0.35)" />
          <stop offset="100%" stop-color="rgba(147, 197, 253, 0.8)" />
        </radialGradient>

        <!-- 地球球体暗面柔和明暗交界遮罩 (晨昏线投影) -->
        <linearGradient id="eb-earth-shadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#000000" stop-opacity="0" />
          <stop offset="65%" stop-color="#000000" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#020617" stop-opacity="0.55" />
        </linearGradient>

        <!-- 人类工业热能上升烟羽渐变 -->
        <linearGradient id="eb-industry-heat" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#f87171" stop-opacity="0" />
        </linearGradient>

        <!-- 警示卡片金属质感渐变底色 -->
        <linearGradient id="eb-alert-bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#1e1b2e" />
          <stop offset="50%" stop-color="#2d1522" />
          <stop offset="100%" stop-color="#1e1b2e" />
        </linearGradient>
      </defs>

      <!-- ==================== 深空背景微亮点缀 ==================== -->
      <g id="space-stars" opacity="0.45">
        <circle cx="210" cy="34" r="1" fill="#ffffff" />
        <circle cx="490" cy="26" r="1.2" fill="#93c5fd" />
        <circle cx="640" cy="46" r="1" fill="#ffffff" />
        <circle cx="710" cy="95" r="1.3" fill="#cbd5e1" />
        <circle cx="680" cy="175" r="1.1" fill="#93c5fd" />
        <circle cx="160" cy="185" r="1" fill="#ffffff" />
      </g>

      <!-- ==================== 区域 1：太阳辐射输入 (左侧) ==================== -->
      <g id="sun-system" transform="translate(0, 0)">
        <!-- 太阳外层弥散光晕 -->
        <circle cx="72" cy="84" r="46" fill="url(#eb-sun-halo)" />

        <!-- 太阳光芒耀斑 (8束几何光芒) -->
        <g stroke="#fbbf24" stroke-width="2.6" stroke-linecap="round" opacity="0.85">
          <line x1="72" y1="48" x2="72" y2="40" />
          <line x1="72" y1="120" x2="72" y2="128" />
          <line x1="36" y1="84" x2="28" y2="84" />
          <line x1="108" y1="84" x2="116" y2="84" />
          <line x1="46" y1="58" x2="40" y2="52" />
          <line x1="98" y1="110" x2="104" y2="116" />
          <line x1="98" y1="58" x2="104" y2="52" />
          <line x1="46" y1="110" x2="40" y2="116" />
        </g>

        <!-- 太阳光球核心 (亮黄色饱满恒星) -->
        <circle cx="72" cy="84" r="26" fill="url(#eb-sun-core)" filter="url(#eb-sun-glow)" stroke="#fef08a" stroke-width="1.8" />

        <!-- 太阳大字标牌 (19px 讲台粗体) -->
        <text x="72" y="154" text-anchor="middle" font-size="19" font-weight="bold" fill="#fbbf24" letter-spacing="1">太阳辐射</text>

        <!-- 太阳辐射入地球的高能光束箭头 -->
        <CourseArrow :from="{ x: 110, y: 84 }" :to="{ x: 258, y: 106 }" stroke="#f59e0b" :stroke-width="3.6" :head-size="14" />
        <CourseArrow :from="{ x: 106, y: 106 }" :to="{ x: 252, y: 128 }" stroke="#f59e0b" :stroke-width="3.6" :head-size="14" />

        <!-- 阳光辐射波纹线条（表现电磁辐射波） -->
        <path d="M 125 76 Q 140 72 155 76 T 185 76" fill="none" stroke="#fde047" stroke-width="1.8" stroke-linecap="round" opacity="0.75" />
        <path d="M 130 124 Q 145 120 160 124 T 190 124" fill="none" stroke="#fde047" stroke-width="1.8" stroke-linecap="round" opacity="0.75" />
      </g>

      <!-- ==================== 区域 2：地球与人类工业活动 (中央) ==================== -->
      <g id="earth-system" transform="translate(0, 0)">
        <!-- 大气外层高亮光环 -->
        <circle cx="336" cy="116" r="58" fill="none" stroke="rgba(56, 189, 248, 0.45)" stroke-width="2" filter="url(#eb-earth-halo)" />

        <!-- 地球海洋基底 -->
        <circle cx="336" cy="116" r="55" fill="url(#eb-ocean-sphere)" stroke="rgba(147, 197, 253, 0.6)" stroke-width="1.8" />

        <!-- 大陆板块轮廓 (绿色自然生态地貌) -->
        <g clip-path="url(#eb-earth-clip)">
          <!-- 剪裁路径：保持在地球圆内 -->
          <clipPath id="eb-earth-clip">
            <circle cx="336" cy="116" r="54" />
          </clipPath>

          <!-- 亚洲/欧亚主板块 -->
          <path
            d="M 302 86 C 314 80 335 82 348 88 C 362 94 368 110 358 120 C 348 128 332 122 324 116 C 312 108 296 94 302 86 Z"
            fill="#10b981"
            stroke="#059669"
            stroke-width="1"
            opacity="0.88"
          />
          <!-- 陆地内部高原地势修饰 -->
          <path d="M 326 90 C 334 86 345 88 348 95 C 344 101 334 103 328 100 Z" fill="#34d399" opacity="0.6" />

          <!-- 澳洲/南亚群岛板块 -->
          <ellipse cx="360" cy="140" rx="14" ry="9" fill="#10b981" opacity="0.88" />
          <ellipse cx="334" cy="148" rx="9" ry="6" fill="#10b981" opacity="0.85" />

          <!-- 美洲/外侧陆地边缘 -->
          <path d="M 284 118 C 288 110 296 114 297 126 C 298 138 290 146 286 140 Z" fill="#10b981" opacity="0.85" />

          <!-- 大气云系流线 (半透明白色卷云) -->
          <path d="M 292 98 Q 312 92 334 96 T 374 100" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.28" />
          <path d="M 304 134 Q 330 138 352 130 T 378 138" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.25" />

          <!-- 地球背阳面晨昏线阴影层 -->
          <circle cx="336" cy="116" r="54" fill="url(#eb-earth-shadow)" />

          <!-- 大气内辉光边缘 -->
          <circle cx="336" cy="116" r="54" fill="url(#eb-atmosphere-rim)" />
        </g>

        <!-- 地球中央大字 (20px 粗体) -->
        <text x="336" y="192" text-anchor="middle" font-size="20" font-weight="bold" fill="#e2e8f0" letter-spacing="2">地球</text>

        <!-- ===== 人类工业活动与城市群（伫立于地球表面正上方） ===== -->
        <!-- 当 step >= 1 且 showImbalance 时展示 -->
        <g v-if="step >= 1 && showImbalance" id="human-activities">
          <!-- 城市地表热量集聚微光（正对地球顶点 336，贴合地表弧形） -->
          <ellipse cx="336" cy="63.5" rx="24" ry="4.5" fill="url(#eb-industry-heat)" />

          <!-- 现代城市与工业建筑群剪影 (贴合地球曲面 336, 116，R=54，正中对称布局) -->
          <g transform="translate(310, 48)">
            <!-- 办公楼 A (略矮，左翼) -->
            <rect x="2" y="14" width="8" height="7" rx="0.5" fill="#334155" stroke="#64748b" stroke-width="0.8" />
            <!-- 工业厂房与散热塔 -->
            <path d="M 12 18 L 14 10 L 19 10 L 21 18 Z" fill="#475569" stroke="#64748b" stroke-width="0.8" />
            <!-- 核心办公高楼 B (居中) -->
            <rect x="22" y="6" width="10" height="15" rx="0.5" fill="#1e293b" stroke="#64748b" stroke-width="0.9" />
            <polygon points="27,3 25.5,6 28.5,6" fill="#ef4444" />
            <line x1="25" y1="9" x2="29" y2="9" stroke="#fbbf24" stroke-width="1" />
            <line x1="25" y1="13" x2="29" y2="13" stroke="#fbbf24" stroke-width="1" />

            <!-- 摩天大楼 C (右侧高楼) -->
            <rect x="34" y="3" width="10" height="18" rx="0.5" fill="#1e293b" stroke="#64748b" stroke-width="0.9" />
            <polygon points="39,0 37.5,3 40.5,3" fill="#ef4444" />
            <line x1="37" y1="7" x2="41" y2="7" stroke="#f87171" stroke-width="1" />
            <line x1="37" y1="12" x2="41" y2="12" stroke="#f87171" stroke-width="1" />

            <!-- 仓储/配电设施 D (右翼) -->
            <rect x="46" y="14" width="8" height="7" rx="0.5" fill="#334155" stroke="#64748b" stroke-width="0.8" />
          </g>

          <!-- 额外产热向上直冲箭头 (深红高能粗箭头，正对地球中心 336 垂直向上) -->
          <CourseArrow :from="{ x: 336, y: 44 }" :to="{ x: 336, y: 20 }" stroke="#ef4444" :stroke-width="3.8" :head-size="14" />

          <!-- 对称热浪波动波纹 -->
          <path d="M 324 34 Q 328 28 324 22" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" opacity="0.8" />
          <path d="M 348 34 Q 352 28 348 22" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" opacity="0.8" />

          <!-- “人类活动额外产热” 核心警示文字 (18px 醒目红字，正对 336 居中) -->
          <text x="336" y="14" text-anchor="middle" font-size="18" font-weight="bold" fill="#f87171" letter-spacing="0.5">人类活动额外产热</text>
        </g>
      </g>

      <!-- ==================== 区域 3：向太空辐射散热 (右侧) ==================== -->
      <g id="space-radiation" transform="translate(0, 0)">
        <!-- 4 组向冷寂深空散热的辐射热波箭头 (蓝紫/天青色) -->
        <CourseArrow :from="{ x: 382, y: 80 }" :to="{ x: 502, y: 34 }" stroke="#38bdf8" :stroke-width="3.4" :head-size="13" />
        <CourseArrow :from="{ x: 396, y: 104 }" :to="{ x: 518, y: 80 }" stroke="#38bdf8" :stroke-width="3.4" :head-size="13" />
        <CourseArrow :from="{ x: 398, y: 130 }" :to="{ x: 518, y: 152 }" stroke="#38bdf8" :stroke-width="3.4" :head-size="13" />
        <CourseArrow :from="{ x: 382, y: 152 }" :to="{ x: 502, y: 198 }" stroke="#38bdf8" :stroke-width="3.4" :head-size="13" />

        <!-- 红外辐射波折线示意 (体现长波辐射) -->
        <path d="M 432 52 Q 442 48 452 52 T 472 52" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" opacity="0.75" />
        <path d="M 442 164 Q 452 160 462 164 T 482 164" fill="none" stroke="#818cf8" stroke-width="1.8" stroke-linecap="round" opacity="0.75" />

        <!-- “向太空辐射散热” 标题大字 (19px 粗体天蓝色) -->
        <text x="536" y="120" text-anchor="start" font-size="19" font-weight="bold" fill="#38bdf8" letter-spacing="1">向太空辐射散热</text>
      </g>

      <!-- ==================== 底部：核心规律与物理边界结论 ==================== -->
      <!-- step >= 1 且 showImbalance 时展示破坏平衡与气温上升警示卡片 -->
      <g v-if="step >= 1 && showImbalance" id="bottom-conclusion" transform="translate(345, 226)">
        <!-- 醒目圆角胶囊警示栏底框 (420px 精确适中宽度，居中对称) -->
        <rect x="-210" y="-16" width="420" height="32" rx="16" fill="url(#eb-alert-bg)" stroke="#ef4444" stroke-width="1.8" filter="url(#eb-alert-shadow)" />

        <!-- 警示三角标识 (与文字间距对称分布) -->
        <g transform="translate(-178, 0)">
          <path d="M 0 -8 L 8 7 L -8 7 Z" fill="#ef4444" stroke="#fca5a5" stroke-width="1" stroke-linejoin="round" />
          <line x1="0" y1="-3" x2="0" y2="1.5" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" />
          <circle cx="0" cy="4.5" r="0.9" fill="#ffffff" />
        </g>

        <!-- 核心物理结论文字 (17px 加粗醒目文字，精确居中排版) -->
        <text x="-156" y="5.5" text-anchor="start" font-size="17" font-weight="bold" fill="#fecaca" letter-spacing="0.5">
          额外产热超出地球散热能力
          <tspan fill="#f87171" font-weight="900">→</tspan>
          <tspan fill="#ffffff" font-weight="bold">全球气温上升</tspan>
        </text>
      </g>

      <!-- step === 0 时：自然平衡基准状态标语 -->
      <g v-else id="bottom-baseline" transform="translate(345, 226)">
        <rect x="-180" y="-16" width="360" height="32" rx="16" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5" />
        <text x="0" y="5.5" text-anchor="middle" font-size="17" font-weight="bold" fill="#7dd3fc" letter-spacing="0.5">自然状态：吸热与散热保持动态平衡</text>
      </g>
    </svg>
  </div>
</template>
