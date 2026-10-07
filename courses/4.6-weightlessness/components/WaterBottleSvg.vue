<script setup lang="ts">
/**
 * 侧壁扎孔的塑料瓶（§4.6 完全失重页）
 *
 * `falling` 为 false：瓶子静止，在液体内部压强 p = ρgh 作用下水从小孔呈抛物线喷出； `falling` 为 true：瓶子与水以 a = g 自由下落（完全失重），各水层间没有相互压力，水不再从小孔流出。
 */
const { falling = false, label = "" } = defineProps<{
  falling?: boolean;
  label?: string;
}>();
</script>

<template>
  <svg viewBox="0 0 220 300" width="100%" style="max-width: 200px" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 透明 PET 塑料瓶身立体光泽渐变 -->
      <linearGradient id="lbBottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="rgba(226,232,240,0.22)" />
        <stop offset="22%" stop-color="rgba(248,250,252,0.08)" />
        <stop offset="78%" stop-color="rgba(148,163,184,0.06)" />
        <stop offset="100%" stop-color="rgba(148,163,184,0.24)" />
      </linearGradient>
      <!-- 瓶内水体深浅渐变 -->
      <linearGradient id="lbWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(56,189,248,0.42)" />
        <stop offset="55%" stop-color="rgba(59,130,246,0.48)" />
        <stop offset="100%" stop-color="rgba(29,78,216,0.58)" />
      </linearGradient>
      <!-- 蓝色防滑瓶盖渐变 -->
      <linearGradient id="lbCapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2563eb" />
        <stop offset="45%" stop-color="#60a5fa" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
    </defs>

    <!-- ==================== 1. 自由下落状态时的竖直下坠运动流线（falling === true） ==================== -->
    <g v-if="falling" stroke="rgba(45,212,191,0.38)" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="4 4">
      <line x1="50" y1="36" x2="50" y2="96" />
      <line x1="58" y1="64" x2="58" y2="118" />
      <line x1="166" y1="36" x2="166" y2="86" />
    </g>

    <!-- ==================== 2. 瓶内水体与液面弯月面 ==================== -->
    <!-- 水体填充（贴合瓶身内壁 x: 70..150, y: 118..254） -->
    <path d="M 70 118 H 150 V 242 A 12 12 0 0 1 138 254 H 82 A 12 12 0 0 1 70 242 Z" fill="url(#lbWaterGrad)" />
    <!-- 液面椭圆透视波纹与弯月面高光 -->
    <ellipse cx="110" cy="118" rx="40" ry="3.4" fill="rgba(125,211,252,0.32)" stroke="#7dd3fc" stroke-width="1.6" />

    <!-- ==================== 3. 流线型矿泉水塑料瓶身、加强筋与螺纹瓶盖 ==================== -->
    <!-- 瓶盖与防盗锁环 -->
    <rect x="91" y="14" width="38" height="15" rx="3.5" fill="url(#lbCapGrad)" stroke="#93c5fd" stroke-width="1.3" />
    <!-- 瓶盖防滑竖纹 -->
    <g stroke="rgba(255,255,255,0.38)" stroke-width="1.1" stroke-linecap="round">
      <line x1="97" y1="16.5" x2="97" y2="26.5" />
      <line x1="103" y1="16.5" x2="103" y2="26.5" />
      <line x1="110" y1="16.5" x2="110" y2="26.5" />
      <line x1="117" y1="16.5" x2="117" y2="26.5" />
      <line x1="123" y1="16.5" x2="123" y2="26.5" />
    </g>
    <!-- 瓶口锁环 -->
    <rect x="88" y="29" width="44" height="4.5" rx="1.8" fill="rgba(148,163,184,0.45)" stroke="#94a3b8" stroke-width="1.1" />

    <!-- 流线型渐扩瓶肩与圆柱瓶身外轮廓 -->
    <path
      d="M 92 33.5 C 92 44 68 50 68 66 L 68 242 A 13 13 0 0 0 81 255 L 102 255 Q 110 251 118 255 L 139 255 A 13 13 0 0 0 152 242 L 152 66 C 152 50 128 44 128 33.5 Z"
      fill="url(#lbBottleGrad)"
      stroke="rgba(203,213,225,0.72)"
      stroke-width="1.8"
      stroke-linejoin="round"
    />

    <!-- 瓶身三道环形加强凹槽肋线 -->
    <path d="M 68.5 88 Q 110 92 151.5 88" fill="none" stroke="rgba(203,213,225,0.32)" stroke-width="1.3" />
    <path d="M 68.5 144 Q 110 148 151.5 144" fill="none" stroke="rgba(203,213,225,0.32)" stroke-width="1.3" />
    <path d="M 68.5 172 Q 110 176 151.5 172" fill="none" stroke="rgba(203,213,225,0.32)" stroke-width="1.3" />

    <!-- 瓶壁左侧竖向高光折射带 -->
    <path d="M 76 66 L 76 238" stroke="rgba(248,250,252,0.38)" stroke-width="3.2" stroke-linecap="round" />

    <!-- ==================== 4. 侧壁小孔 (152, 198) 与喷水 / 失重状态表现 ==================== -->
    <!-- 侧壁小孔圈 -->
    <ellipse cx="152" cy="198" rx="2.4" ry="3.8" fill="#0f1425" stroke="#cbd5e1" stroke-width="1.4" />

    <!-- 状态 A：静止 (!falling) —— 液体压强将水从小孔呈抛物线急射而出 -->
    <g v-if="!falling">
      <!-- 喷射水柱外层流体与中心高光水芯 -->
      <path d="M 153 198 C 178 201 195 221 205 253" fill="none" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" />
      <path d="M 153 198 C 178 201 195 221 205 253" fill="none" stroke="#bae6fd" stroke-width="1.8" stroke-linecap="round" />
      <!-- 末端飞溅水滴 -->
      <circle cx="187" cy="225" r="3.2" fill="#38bdf8" />
      <circle cx="198" cy="242" r="3.6" fill="#60a5fa" />
      <circle cx="207" cy="259" r="2.8" fill="#7dd3fc" />
    </g>

    <!-- 状态 B：自由下落 (falling) —— 完全失重 a = g，小孔处水珠受表面张力封住不外流 -->
    <g v-else>
      <!-- 小孔处微凸但不流出的表面张力水珠 -->
      <path d="M 152 194.5 A 3.8 3.8 0 0 1 152 201.5" fill="#38bdf8" stroke="#bae6fd" stroke-width="1" />
      <!-- 自由下落加速度 g 箭头 -->
      <CourseArrow :from="{ x: 194, y: 98 }" :to="{ x: 194, y: 162 }" stroke="#2dd4bf" :stroke-width="3" label="g" :label-dx="13" />
    </g>

    <text v-if="label" x="110" y="288" text-anchor="middle" font-size="16" font-weight="500" fill="#cbd5e1">
      {{ label }}
    </text>
  </svg>
</template>
