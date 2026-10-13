<script setup lang="ts">
/** 封面装饰：太阳能（太阳）· 核能（原子）· 风能（风机）· 光伏（太阳能板）并置（精修美化版） */
const { width = 360 } = defineProps<{ width?: number }>();
</script>

<template>
  <svg viewBox="0 0 340 150" :width="width" xmlns="http://www.w3.org/2000/svg" class="select-none overflow-visible" aria-hidden="true">
    <defs>
      <!-- 太阳光晕滤镜 -->
      <filter id="solar-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- 原子核/光子辉光滤镜 -->
      <filter id="quantum-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- 太阳球体径向渐变 -->
      <radialGradient id="solar-disc" cx="40%" cy="38%" r="65%">
        <stop offset="0%" stop-color="#fef08a" />
        <stop offset="50%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </radialGradient>

      <!-- 光伏单晶硅表面反光渐变 -->
      <linearGradient id="pv-glass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(96,165,250,0.32)" />
        <stop offset="45%" stop-color="rgba(37,99,235,0.24)" />
        <stop offset="100%" stop-color="rgba(30,64,175,0.38)" />
      </linearGradient>

      <!-- 风机流线型叶片定义 -->
      <path id="aerodynamic-blade" d="M 152 55.5 Q 156.2 36.5 152 17.5 Q 147.8 36.5 152 55.5 Z" />
    </defs>

    <!-- ==================== 0. 背景能量流耦合线（虚线导轨） ==================== -->
    <!-- 太阳光辐射至光伏电池阵列的光子射线 -->
    <line x1="74" y1="46" x2="236" y2="74" stroke="#e2a846" stroke-width="1.3" stroke-dasharray="4 4" opacity="0.35" />
    <!-- 太阳与原子核能纵向能量轴 -->
    <line x1="52" y1="68" x2="52" y2="82" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.25" />

    <!-- ==================== 1. 太阳能（太阳）[严格居中于 X=52, Y=42] ==================== -->
    <g class="transition-transform duration-300">
      <!-- 柔和外光晕圈 -->
      <circle cx="52" cy="42" r="17" fill="none" stroke="rgba(245,158,11,0.22)" stroke-width="1.2" stroke-dasharray="4 2.5" />
      <!-- 太阳球体本体 -->
      <circle cx="52" cy="42" r="12.5" fill="url(#solar-disc)" stroke="#f59e0b" stroke-width="1.6" filter="url(#solar-glow)" />
      <!-- 精确 8 芒对称辐射光线（内径 18，外径 25） -->
      <g stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" opacity="0.85">
        <!-- 上下左右正交光芒 -->
        <line x1="52" y1="24" x2="52" y2="17" />
        <line x1="52" y1="60" x2="52" y2="67" />
        <line x1="34" y1="42" x2="27" y2="42" />
        <line x1="70" y1="42" x2="77" y2="42" />
        <!-- 45° 对角线光芒 -->
        <line x1="39.3" y1="29.3" x2="34.3" y2="24.3" />
        <line x1="64.7" y1="54.7" x2="69.7" y2="59.7" />
        <line x1="64.7" y1="29.3" x2="69.7" y2="24.3" />
        <line x1="39.3" y1="54.7" x2="34.3" y2="59.7" />
      </g>
    </g>

    <!-- ==================== 2. 核能（量子原子）[严格与太阳同轴 X=52, Y=108] ==================== -->
    <g class="transition-transform duration-300">
      <!-- 三条倾斜 60° 均匀交叉的电子轨道 -->
      <g fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.55">
        <!-- 水平轨道 -->
        <ellipse cx="52" cy="108" rx="22" ry="7.5" />
        <!-- +60° 倾斜轨道 -->
        <ellipse cx="52" cy="108" rx="22" ry="7.5" transform="rotate(60 52 108)" />
        <!-- -60° 倾斜轨道 -->
        <ellipse cx="52" cy="108" rx="22" ry="7.5" transform="rotate(-60 52 108)" />
      </g>

      <!-- 轨道上的电子量子粒子（青蓝与金色高亮，赋予动感） -->
      <circle cx="74" cy="108" r="2.2" fill="#38bdf8" filter="url(#quantum-glow)" />
      <circle cx="41" cy="89" r="2.2" fill="#38bdf8" filter="url(#quantum-glow)" />
      <circle cx="63" cy="127" r="2.2" fill="#38bdf8" filter="url(#quantum-glow)" />

      <!-- 原子核核心（金色核心 + 能量微晕） -->
      <circle cx="52" cy="108" r="5" fill="rgba(226,168,70,0.25)" />
      <circle cx="52" cy="108" r="3.2" fill="#e2a846" stroke="#fef08a" stroke-width="1" filter="url(#quantum-glow)" />
    </g>

    <!-- ==================== 3. 风能（现代风力发电机）[立轴 X=152] ==================== -->
    <g class="transition-transform duration-300">
      <!-- 迎风微风流动曲线（流体感流线） -->
      <path
        d="M 116 48 C 128 48 136 44 146 44"
        fill="none"
        stroke="rgba(56,189,248,0.4)"
        stroke-width="1.4"
        stroke-dasharray="3.5 3.5"
        stroke-linecap="round"
      />
      <path
        d="M 158 64 C 170 64 180 67 194 67"
        fill="none"
        stroke="rgba(56,189,248,0.4)"
        stroke-width="1.4"
        stroke-dasharray="3.5 3.5"
        stroke-linecap="round"
      />

      <!-- 风机塔筒（底部微拓宽的现代流线型塔身） -->
      <polygon points="150.8,56 153.2,56 155.2,132 148.8,132" fill="rgba(148,163,184,0.3)" stroke="currentColor" stroke-width="1.2" opacity="0.8" />
      <!-- 塔底基座 -->
      <rect x="146.5" y="130" width="11" height="2.5" rx="1" fill="currentColor" opacity="0.65" />

      <!-- 机舱箱体 (Nacelle) -->
      <rect x="147.5" y="52.5" width="11" height="6.5" rx="2.5" fill="rgba(148,163,184,0.5)" stroke="currentColor" stroke-width="1.2" opacity="0.9" />

      <!-- 三叶片转子系统（严谨以 120° 旋转，翼型叶片，带微渐变填充与描边） -->
      <g fill="rgba(226,168,70,0.22)" stroke="#e2a846" stroke-width="1.4" stroke-linejoin="round">
        <use href="#aerodynamic-blade" />
        <use href="#aerodynamic-blade" transform="rotate(120 152 55.5)" />
        <use href="#aerodynamic-blade" transform="rotate(240 152 55.5)" />
      </g>

      <!-- 轮毂中心整流罩 (Rotor Hub Cap) -->
      <circle cx="152" cy="55.5" r="4.2" fill="#e2a846" stroke="#fef08a" stroke-width="1.2" filter="url(#quantum-glow)" />
    </g>

    <!-- ==================== 4. 光伏（光伏电站阵列与稳固支架） ==================== -->
    <g class="transition-transform duration-300">
      <!-- 支架结构（解决原版悬空浮空的物理失真，三角刚性桁架接地） -->
      <!-- 后部主支撑斜撑杆 -->
      <line x1="288" y1="82" x2="264" y2="132" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5" />
      <!-- 垂直主承重柱 -->
      <line x1="264" y1="104" x2="264" y2="132" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.75" />
      <!-- 地脚螺栓基座 -->
      <rect x="257" y="130" width="14" height="2.5" rx="1" fill="currentColor" opacity="0.65" />

      <!-- 硅晶太阳能电池板主体（透视倾角晶硅蓝多层板） -->
      <!-- 底板阴影轮廓 -->
      <path d="M 246 65 L 310 65 L 294 105 L 230 105 Z" fill="none" stroke="rgba(30,58,138,0.5)" stroke-width="3" stroke-linejoin="round" />
      <!-- 晶硅受光面 -->
      <path d="M 246 64 L 310 64 L 294 104 L 230 104 Z" fill="url(#pv-glass)" stroke="#60a5fa" stroke-width="1.8" stroke-linejoin="round" />

      <!-- 电池栅线（经纬对称细分网格：3列 × 2行） -->
      <g stroke="#93c5fd" stroke-width="1.2" opacity="0.65">
        <!-- 纵向栅线（带透视角度） -->
        <line x1="267.3" y1="64" x2="251.3" y2="104" />
        <line x1="288.7" y1="64" x2="272.7" y2="104" />
        <!-- 横向中心主汇流排 -->
        <line x1="238" y1="84" x2="302" y2="84" />
      </g>

      <!-- 表面反光质感折线（科技感高光） -->
      <path d="M 252 68 L 274 68 L 262 98 L 240 98 Z" fill="rgba(255,255,255,0.06)" />
    </g>

    <!-- ==================== 5. 地平线科技基准线 ==================== -->
    <g opacity="0.65">
      <!-- 柔和主地平线 -->
      <line x1="20" y1="132" x2="320" y2="132" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="6 5" opacity="0.45" />
      <!-- 两个地表基准小刻度，强化空间稳固感 -->
      <circle cx="152" cy="132" r="1.5" fill="#e2a846" />
      <circle cx="264" cy="132" r="1.5" fill="#60a5fa" />
    </g>
  </svg>
</template>
