<!--
  能量耗散与退降（Slidev 课件矢量组件 - 讲台重构版）
  —— 教学与物理核心：
     1. 环境包裹体系：现实中所有装置都置于一个广阔的“周围环境（大热库）”中；
     2. 能量转化伴随耗散与损耗（举多组典型物理课件教具实例）：
        - 实例 A (电路/灯泡)：化学能 → 电源内阻产热(内能损耗) + 电流输送 → 灯泡转化为光能，同时灯丝强烈发热散入环境；
        - 实例 B (电动机/电风扇)：电能 → 机械能(转动做功)，线圈内阻及机械摩擦发热(废热)损耗散入环境；
        - 实例 C (热机/内燃机)：燃料化学能 → 汽缸做功机械能，绝大部分作为排气废热与机体散热耗散散入环境(卡诺效率局限)；
     3. 耗散箭头的视觉直观性：多组醒目波浪/发散热流箭头，从各装置内部清晰穿出并散失到周围环境中；
     4. 核心物理规律总结（能量守恒 vs 能量退降）：
        - 总能量守恒：转化前总能量 = 有用能量 + 耗散内能；
        - 能量品质退降：高品质（集中、做功能力强） → 低品质（分散内能）；
        - 不可逆性：散失到环境中的内能无法自发重新聚集回电池或燃料中！
  —— 幻灯片设计规范：
     - 字号精致通透（12.5px ~ 15px），元素间保留充足呼吸留白，杜绝文字或箭头互相遮挡；
     - 零提示性口语（严禁“点击下一步”等非教学文本，纯正物理学术呈现）；
     - 4 档纯净 step 控制（Slidev 原生 v-click 适配，无额外冗余按钮）：
       - step 0: 能量转化装置（三大典型实例：灯泡照明、电机运转、热机做功）；
       - step 1: 揭示伴随损耗（各环节的内阻发热、摩擦发热、排气废热，箭头指向散失）；
       - step 2: 散入周围环境（所有耗散能量汇入周围环境大热库，弥散开来）；
       - step 3: 揭示物理本质（能量退降与单向不可逆性：能量虽守恒，品质已降级，无法自发再聚集利用）。
-->
<script setup lang="ts">
interface Props {
  /**
   * 讲台/课件播放步进 (配合 Slidev 的 v-click): 0: 能量转换展示（三大典型装置：电路灯泡、电风扇电机、内燃机热机） 1: 伴随损耗揭晓（显示各环节不可避免的废热产生与耗散箭头） 2: 环境包裹与汇聚（所有损耗能量向外扩散，散入周围环境大热库） 3:
   * 核心规律结论（能量守恒但品质退降，不可自发逆转再收集利用） 默认 3（完整展示全部内容）
   */
  step?: number;
  /** 快捷展示开关，默认 true */
  showDissipation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  step: 3,
  showDissipation: true,
});
</script>

<template>
  <div class="relative w-full flex flex-col items-center select-none">
    <svg viewBox="0 0 920 480" class="w-full max-w-5xl h-auto overflow-visible font-sans" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 环境大背景温和渐变 -->
        <linearGradient id="ed-env-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111827" stop-opacity="0.95" />
          <stop offset="50%" stop-color="#0f172a" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#090d16" stop-opacity="1" />
        </linearGradient>

        <!-- 卡片微底色渐变 -->
        <linearGradient id="ed-card-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.7)" />
          <stop offset="100%" stop-color="rgba(15, 23, 42, 0.85)" />
        </linearGradient>

        <!-- 电池金属质感渐变 -->
        <linearGradient id="ed-batt-cyl" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="40%" stop-color="#3b82f6" />
          <stop offset="80%" stop-color="#1d4ed8" />
          <stop offset="100%" stop-color="#1e3a8a" />
        </linearGradient>

        <!-- 灯泡发光辉光径向渐变 -->
        <radialGradient id="ed-bulb-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
          <stop offset="35%" stop-color="#fef08a" stop-opacity="0.9" />
          <stop offset="70%" stop-color="#eab308" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#ca8a04" stop-opacity="0" />
        </radialGradient>

        <!-- 电机转子渐变 -->
        <linearGradient id="ed-motor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="60%" stop-color="#0369a1" />
          <stop offset="100%" stop-color="#075985" />
        </linearGradient>

        <!-- 气缸燃烧渐变 -->
        <linearGradient id="ed-engine-flame" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#f97316" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.2" />
        </linearGradient>

        <!-- 热量扩散发光滤镜 -->
        <filter id="ed-heat-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- ========================================================================= -->
      <!-- 0. 最外层：周围环境（大热库）大容器，完整包覆所有物理系统                   -->
      <!-- ========================================================================= -->
      <g id="surrounding-environment-wrapper">
        <!-- 外层环境大边界虚线框与背景 -->
        <rect x="10" y="10" width="900" height="460" rx="20" fill="url(#ed-env-bg-grad)" stroke="#475569" stroke-width="2" stroke-dasharray="10 6" />

        <!-- 环境大热库标志徽章 (左上角) -->
        <g transform="translate(32, 26)">
          <rect x="0" y="0" width="246" height="32" rx="7" fill="rgba(51, 65, 85, 0.65)" stroke="#64748b" stroke-width="1.3" />
          <circle cx="16" cy="16" r="5" fill="#38bdf8" />
          <text x="30" y="21" font-size="14.5" font-weight="bold" fill="#e2e8f0" letter-spacing="0.3">周围环境（广阔空间 · 大热库）</text>
        </g>

        <!-- 环境背景弥散内能微粒背景点缀 (step >= 2 时更明显) -->
        <g :opacity="props.step >= 2 ? '0.45' : '0.18'" fill="#94a3b8" class="transition-opacity duration-300">
          <circle cx="60" cy="85" r="2.8" />
          <circle cx="310" cy="38" r="2.4" />
          <circle cx="580" cy="35" r="3" />
          <circle cx="850" cy="50" r="2.6" />
          <circle cx="36" cy="220" r="2.2" />
          <circle cx="875" cy="230" r="3" />
          <circle cx="50" cy="360" r="3.2" />
          <circle cx="870" cy="360" r="2.4" />
          <circle cx="480" cy="368" r="2" />
        </g>

        <!-- 环境右上角说明标签 -->
        <text x="886" y="46" text-anchor="end" font-size="13" font-weight="medium" fill="#94a3b8">系统向外散失的能量不可逆地弥散在此</text>
      </g>

      <!-- ========================================================================= -->
      <!-- 中部三列：三大典型能量转化装置实例                                         -->
      <!-- ========================================================================= -->

      <!-- ------------------------------------------------------------------------- -->
      <!-- 实例 1：电路与照明灯泡（化学能 → 电能 → 光能，伴随电池内阻+灯丝发热损耗）    -->
      <!-- ------------------------------------------------------------------------- -->
      <g id="instance-lighting" transform="translate(32, 72)">
        <!-- 卡片背景框 -->
        <rect x="0" y="0" width="268" height="280" rx="16" fill="url(#ed-card-bg)" stroke="#334155" stroke-width="1.6" />

        <!-- 卡片头部标题 -->
        <rect x="0" y="0" width="268" height="36" rx="16" fill="rgba(30, 41, 59, 0.9)" />
        <rect x="0" y="22" width="268" height="14" fill="rgba(30, 41, 59, 0.9)" />
        <text x="134" y="23" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#f1f5f9">实例① · 电池供电与电灯照明</text>

        <!-- 装置图形区域：电池与灯泡连接 -->
        <!-- 1.1 电池 -->
        <g transform="translate(18, 52)">
          <!-- 电池柱 -->
          <rect x="0" y="8" width="34" height="46" rx="4" fill="url(#ed-batt-cyl)" stroke="#60a5fa" stroke-width="1.4" />
          <!-- 电池正极帽 -->
          <rect x="11" y="3" width="12" height="5" rx="2" fill="#fbbf24" />
          <!-- 极性符号 -->
          <text x="17" y="23" text-anchor="middle" font-size="13" font-weight="bold" fill="#fef08a">+</text>
          <text x="17" y="46" text-anchor="middle" font-size="15" font-weight="bold" fill="#93c5fd">−</text>
          <!-- 标签 -->
          <text x="17" y="68" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#e2a846">化学能</text>
        </g>

        <!-- 1.2 导线回路与输电箭头 -->
        <g stroke="#94a3b8" stroke-width="1.8" fill="none">
          <path d="M 46 66 L 102 66" />
          <path d="M 46 102 L 102 102" />
        </g>
        <CourseArrow :from="{ x: 48, y: 84 }" :to="{ x: 98, y: 84 }" stroke="#e2a846" :stroke-width="2.2" :head-size="8" />
        <text x="73" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#fbbf24">电能</text>

        <!-- 1.3 经典灯泡 (稍微下移留出顶部余量) -->
        <g transform="translate(112, 52)">
          <!-- 点亮光晕 -->
          <circle cx="34" cy="38" r="28" fill="url(#ed-bulb-core-glow)" filter="url(#ed-heat-glow)" />
          <!-- 玻璃泡 -->
          <path
            d="M 18 52 C 8 42 8 20 18 12 C 26 4 42 4 50 12 C 60 20 60 42 50 52 L 46 62 L 22 62 Z"
            fill="rgba(254, 240, 138, 0.25)"
            stroke="#fbbf24"
            stroke-width="1.8"
          />
          <!-- 灯丝炽热发光 -->
          <path d="M 28 62 L 28 38 Q 34 30 40 38 L 40 62" fill="none" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
          <!-- 螺口底座 -->
          <rect x="23" y="62" width="22" height="10" rx="2" fill="#64748b" stroke="#94a3b8" stroke-width="1" />
          <!-- 光芒线 -->
          <g stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" opacity="0.9">
            <line x1="10" y1="12" x2="3" y2="5" />
            <line x1="34" y1="2" x2="34" y2="-6" />
            <line x1="58" y1="12" x2="65" y2="5" />
          </g>
          <!-- 标签：光能 (目标有用能) -->
          <text x="34" y="-10" text-anchor="middle" font-size="13" font-weight="bold" fill="#fef08a">光能（目标利用）</text>
        </g>

        <!-- 1.4 伴随耗散与损耗 (step >= 1 时展现) -->
        <g v-if="props.step >= 1">
          <!-- 电池内阻发热损失 -->
          <path d="M 35 128 C 35 142 26 150 18 160" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" />
          <!-- 灯泡灯丝高热辐射散失 (向下与向外扩散箭头) -->
          <CourseArrow :from="{ x: 146, y: 126 }" :to="{ x: 146, y: 162 }" stroke="#ef4444" :stroke-width="2.5" :head-size="9" />
          <CourseArrow :from="{ x: 168, y: 104 }" :to="{ x: 220, y: 124 }" stroke="#ef4444" :stroke-width="2.5" :head-size="9" />

          <!-- 热能损耗文字标签（呼吸留白充足，不遮挡任何元件） -->
          <rect x="16" y="166" width="236" height="28" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1.1" />
          <text x="134" y="185" text-anchor="middle" font-size="13" font-weight="bold" fill="#f87171">伴随损耗：内阻发热 ＋ 灯泡发热</text>

          <!-- 能量去向说明 -->
          <text x="134" y="220" text-anchor="middle" font-size="13" font-weight="medium" fill="#e2e8f0">仅小部分化为光，绝大部分</text>
          <text x="134" y="242" text-anchor="middle" font-size="13" font-weight="bold" fill="#f87171">变为内能散入周围环境</text>
        </g>
        <g v-else>
          <!-- 静态转化说明 -->
          <text x="134" y="185" text-anchor="middle" font-size="13" font-weight="medium" fill="#94a3b8">转化过程：</text>
          <text x="134" y="214" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#fef08a">化学能 → 电能 → 光能</text>
        </g>
      </g>

      <!-- ------------------------------------------------------------------------- -->
      <!-- 实例 2：电动机与电风扇（电能 → 机械能，伴随线圈发热+机械摩擦耗散）           -->
      <!-- ------------------------------------------------------------------------- -->
      <g id="instance-motor" transform="translate(326, 72)">
        <!-- 卡片背景框 -->
        <rect x="0" y="0" width="268" height="280" rx="16" fill="url(#ed-card-bg)" stroke="#334155" stroke-width="1.6" />

        <!-- 卡片头部标题 -->
        <rect x="0" y="0" width="268" height="36" rx="16" fill="rgba(30, 41, 59, 0.9)" />
        <rect x="0" y="22" width="268" height="14" fill="rgba(30, 41, 59, 0.9)" />
        <text x="134" y="23" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#f1f5f9">实例② · 电机运转与电风扇</text>

        <!-- 目标有用功：机械能 (位于顶部，居中对齐) -->
        <text x="134" y="52" text-anchor="middle" font-size="13" font-weight="bold" fill="#38bdf8">机械能（扇叶吹风）</text>

        <!-- 装置图形区域：电机与转动扇叶 -->
        <g transform="translate(134, 100)">
          <!-- 电动机圆壳 -->
          <circle cx="0" cy="0" r="26" fill="url(#ed-motor-grad)" stroke="#38bdf8" stroke-width="1.8" />
          <!-- 电机中心转轴 -->
          <circle cx="0" cy="0" r="7" fill="#e2e8f0" stroke="#0284c7" stroke-width="1.8" />

          <!-- 三叶扇叶 (半透明旋转感) -->
          <g fill="rgba(56, 189, 248, 0.45)" stroke="#38bdf8" stroke-width="1.4">
            <!-- 扇叶 1 (上) -->
            <path d="M -4 -8 C -14 -26 -6 -40 4 -38 C 12 -34 12 -20 4 -8 Z" />
            <!-- 扇叶 2 (右下) -->
            <path d="M 6 4 C 24 14 34 26 30 34 C 24 38 12 34 2 6 Z" />
            <!-- 扇叶 3 (左下) -->
            <path d="M -6 4 C -20 20 -34 26 -38 18 C -40 12 -26 2 -2 6 Z" />
          </g>

          <!-- 旋转动态弧线 -->
          <path d="M -28 -18 A 34 34 0 0 1 26 -20" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="4 3" />
          <polygon points="28,-20 32,-13 25,-15" fill="#38bdf8" />
        </g>

        <!-- 输入电能指示 -->
        <text x="24" y="104" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#38bdf8">电能输入</text>
        <CourseArrow :from="{ x: 50, y: 100 }" :to="{ x: 98, y: 100 }" stroke="#38bdf8" :stroke-width="2.2" :head-size="8" />

        <!-- 2.4 伴随损耗 (step >= 1 时展现) -->
        <g v-if="props.step >= 1">
          <!-- 线圈铜损产热与轴承摩擦产热箭头（向下方与侧方耗散） -->
          <CourseArrow :from="{ x: 134, y: 130 }" :to="{ x: 134, y: 162 }" stroke="#ef4444" :stroke-width="2.5" :head-size="9" />
          <CourseArrow :from="{ x: 164, y: 98 }" :to="{ x: 218, y: 122 }" stroke="#ef4444" :stroke-width="2.5" :head-size="9" />

          <!-- 热能损耗文字标签 -->
          <rect x="16" y="166" width="236" height="28" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1.1" />
          <text x="134" y="185" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f87171">伴随损耗：线圈发热 (I²Rt) ＋ 摩擦</text>

          <!-- 能量去向说明 -->
          <text x="134" y="220" text-anchor="middle" font-size="13" font-weight="medium" fill="#e2e8f0">吹出的风受阻停下后，动能</text>
          <text x="134" y="242" text-anchor="middle" font-size="13" font-weight="bold" fill="#f87171">全部退降为环境内能</text>
        </g>
        <g v-else>
          <!-- 静态转化说明 -->
          <text x="134" y="185" text-anchor="middle" font-size="13" font-weight="medium" fill="#94a3b8">转化过程：</text>
          <text x="134" y="214" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#38bdf8">电能 → 机械能（做功）</text>
        </g>
      </g>

      <!-- ------------------------------------------------------------------------- -->
      <!-- 实例 3：内燃机与热机（燃料化学能 → 机械功，伴随绝大部分排气废热耗散）         -->
      <!-- ------------------------------------------------------------------------- -->
      <g id="instance-engine" transform="translate(620, 72)">
        <!-- 卡片背景框 -->
        <rect x="0" y="0" width="268" height="280" rx="16" fill="url(#ed-card-bg)" stroke="#334155" stroke-width="1.6" />

        <!-- 卡片头部标题 -->
        <rect x="0" y="0" width="268" height="36" rx="16" fill="rgba(30, 41, 59, 0.9)" />
        <rect x="0" y="22" width="268" height="14" fill="rgba(30, 41, 59, 0.9)" />
        <text x="134" y="23" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#f1f5f9">实例③ · 汽车内燃机（热机）</text>

        <!-- 装置图形区域：汽缸、活塞与连杆机械做功 -->
        <g transform="translate(76, 46)">
          <!-- 汽缸外壁 -->
          <path d="M 0 0 L 0 58 L 60 58 L 60 0" fill="none" stroke="#64748b" stroke-width="2.6" stroke-linecap="round" />
          <!-- 缸内高温燃气燃烧（化学能释放内能） -->
          <rect x="3" y="3" width="54" height="24" fill="url(#ed-engine-flame)" rx="2" />
          <!-- 火花塞点火提示 -->
          <circle cx="30" cy="3" r="3" fill="#fbbf24" />
          <!-- 活塞主体 -->
          <rect x="3" y="27" width="54" height="16" rx="2" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1.3" />
          <!-- 连杆 -->
          <line x1="30" y1="43" x2="44" y2="70" stroke="#cbd5e1" stroke-width="2.8" stroke-linecap="round" />
          <!-- 曲轴转动轮 -->
          <circle cx="48" cy="72" r="11" fill="none" stroke="#38bdf8" stroke-width="1.8" />
        </g>

        <!-- 燃料化学能输入 -->
        <text x="36" y="62" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f97316">燃料</text>
        <text x="36" y="80" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#e2a846">化学能</text>
        <CourseArrow :from="{ x: 42, y: 92 }" :to="{ x: 74, y: 92 }" stroke="#f97316" :stroke-width="2.2" :head-size="8" />

        <!-- 有用机械功：曲轴旋转对外做功 (效率仅 30%~40%) -->
        <g transform="translate(148, 86)">
          <CourseArrow :from="{ x: 0, y: 14 }" :to="{ x: 34, y: 14 }" stroke="#38bdf8" :stroke-width="2.2" :head-size="8" />
          <text x="40" y="18" text-anchor="start" font-size="13" font-weight="bold" fill="#38bdf8">机械做功</text>
          <text x="40" y="34" text-anchor="start" font-size="11.5" font-weight="medium" fill="#94a3b8">(仅 30%~40%)</text>
        </g>

        <!-- 3.4 伴随损耗 (step >= 1 时展现) -->
        <g v-if="props.step >= 1">
          <!-- 汽缸壁散热与排气废热粗箭头（耗散 60%~70%） -->
          <CourseArrow :from="{ x: 106, y: 126 }" :to="{ x: 106, y: 162 }" stroke="#ef4444" :stroke-width="2.8" :head-size="10" />
          <CourseArrow :from="{ x: 70, y: 114 }" :to="{ x: 28, y: 148 }" stroke="#ef4444" :stroke-width="2.4" :head-size="9" />

          <!-- 热机废热损耗文字标签 -->
          <rect x="16" y="166" width="236" height="28" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="1.1" />
          <text x="134" y="185" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#f87171">大量废热损耗：排气 ＋ 散热</text>

          <!-- 能量去向说明 -->
          <text x="134" y="220" text-anchor="middle" font-size="13" font-weight="medium" fill="#e2e8f0">高达 60%~70% 的能量以废热</text>
          <text x="134" y="242" text-anchor="middle" font-size="13" font-weight="bold" fill="#f87171">形式直接散进周围环境</text>
        </g>
        <g v-else>
          <!-- 静态转化说明 -->
          <text x="134" y="185" text-anchor="middle" font-size="13" font-weight="medium" fill="#94a3b8">转化过程：</text>
          <text x="134" y="214" text-anchor="middle" font-size="14.5" font-weight="bold" fill="#f97316">化学能 → 汽缸做功 (机械能)</text>
        </g>
      </g>

      <!-- ========================================================================= -->
      <!-- 4. 汇入环境的宏观耗散箭头 (step >= 2 时高亮，直观展现全部废热注入大环境)      -->
      <!-- ========================================================================= -->
      <g v-if="props.step >= 2" id="macro-dissipation-stream">
        <!-- 实例 1 底部向外扩散流 -->
        <path d="M 166 352 Q 166 376 190 384" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="5 3" opacity="0.85" />
        <circle cx="194" cy="385" r="3" fill="#ef4444" />

        <!-- 实例 2 底部向外扩散流 -->
        <path d="M 460 352 Q 460 374 475 384" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="5 3" opacity="0.85" />
        <circle cx="478" cy="385" r="3" fill="#ef4444" />

        <!-- 实例 3 底部向外扩散流 -->
        <path d="M 754 352 Q 754 376 730 384" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-dasharray="5 3" opacity="0.85" />
        <circle cx="726" cy="385" r="3" fill="#ef4444" />
      </g>

      <!-- ========================================================================= -->
      <!-- 5. 底部：核心物理规律与能量退降结论卡片                                      -->
      <!--    - step 2: 纯正物理学术说明（废热散入大环境，坚决无“点击下一步”等非教学提示） -->
      <!--    - step 3: 揭晓能量守恒 vs 品质退降核心定律卡片                            -->
      <!-- ========================================================================= -->
      <g v-if="props.step >= 3 && props.showDissipation" id="physics-law-summary" transform="translate(32, 376)">
        <!-- 警示条底框 -->
        <rect x="0" y="0" width="856" height="80" rx="14" fill="rgba(15, 23, 42, 0.94)" stroke="#ef4444" stroke-width="2" />

        <!-- 左侧高亮标签徽章 -->
        <g transform="translate(14, 15)">
          <rect x="0" y="0" width="176" height="50" rx="8" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" stroke-width="1.5" />
          <!-- 醒目单向禁逆图标 -->
          <circle cx="26" cy="25" r="13" fill="#ef4444" />
          <g stroke="#ffffff" stroke-width="2.2" stroke-linecap="round">
            <line x1="20" y1="19" x2="32" y2="31" />
            <line x1="32" y1="19" x2="20" y2="31" />
          </g>
          <text x="46" y="24" font-size="13.5" font-weight="bold" fill="#fca5a5">能量耗散与退降</text>
          <text x="46" y="41" font-size="12" font-weight="bold" fill="#ef4444">不可逆性定律</text>
        </g>

        <!-- 右侧两大核心对比结论 (舒适字号，绝不互相遮挡与溢出) -->
        <g transform="translate(204, 15)">
          <!-- 结论 1：能量总数守恒 -->
          <g transform="translate(0, 10)">
            <circle cx="8" cy="4" r="4.5" fill="#38bdf8" />
            <text x="20" y="10" font-size="14" font-weight="bold" fill="#f1f5f9">
              ① 能量在总量上是守恒的：
              <tspan fill="#38bdf8">初始总能量 ＝ 有用功 ＋ 耗散内能</tspan>
            </text>
          </g>

          <!-- 结论 2：能量品质退降与无法收集 -->
          <g transform="translate(0, 36)">
            <circle cx="8" cy="4" r="4.5" fill="#ef4444" />
            <text x="20" y="10" font-size="14" font-weight="bold" fill="#f87171">
              ② 但能量的品质发生了退降：
              <tspan fill="#fef08a">散失在广阔环境中的内能，绝不可能自发重新聚集利用！</tspan>
            </text>
          </g>
        </g>
      </g>

      <g v-else-if="props.step === 2" id="physics-step-hint" transform="translate(32, 386)">
        <!-- step 2 时的物理内能散失说明（严谨学术呈现，杜绝操作引导词） -->
        <rect x="0" y="0" width="856" height="54" rx="12" fill="rgba(30, 41, 59, 0.9)" stroke="#38bdf8" stroke-width="1.4" />
        <circle cx="28" cy="27" r="10" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" stroke-width="1.5" />
        <path d="M 23 27 L 27 31 L 34 23" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <text x="48" y="33" font-size="14" font-weight="bold" fill="#f1f5f9">
          内能散失过程：
          <tspan fill="#38bdf8">各装置伴随损耗的废热，持续不可阻挡地向外扩散并汇入广阔的大环境热库中</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
