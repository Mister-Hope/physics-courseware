<script setup lang="ts">
/** 电流表外接法（相对电源外接）电路图：电压表直接并联在电源两端，电流表串在外电路（变阻器）支路里。 step ≥ 1 时标出"电压表直接接在电源两端"（虚线框圈住电源 + 电压表支路）。 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="circuit-wrap">
    <svg viewBox="0 0 520 300" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- 外电路导线：上边、右边（变阻器）、下边（开关）、左边（电源） -->
      <g fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round">
        <line x1="70" y1="70" x2="274" y2="70" />
        <line x1="326" y1="70" x2="450" y2="70" />
        <line x1="450" y1="70" x2="450" y2="130" />
        <line x1="450" y1="190" x2="450" y2="250" />
        <line x1="450" y1="250" x2="265" y2="250" />
        <line x1="215" y1="250" x2="70" y2="250" />
        <line x1="70" y1="70" x2="70" y2="146" />
        <line x1="70" y1="162" x2="70" y2="250" />
        <!-- 电压表支路：直接跨接在电源两端 -->
        <line x1="150" y1="70" x2="150" y2="134" />
        <line x1="150" y1="186" x2="150" y2="250" />
      </g>
      <!-- 电源：长线为正极（上），短线为负极（下） -->
      <g stroke="#f1f5f9" stroke-linecap="round">
        <line x1="48" y1="146" x2="92" y2="146" stroke-width="2.6" />
        <line x1="58" y1="162" x2="82" y2="162" stroke-width="5" />
      </g>
      <text
        x="34"
        y="162"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#f1f5f9"
      >
        E, r
      </text>
      <!-- 电流表 -->
      <circle
        cx="300"
        cy="70"
        r="26"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="300"
        y="77"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="24"
        fill="#f1f5f9"
      >
        A
      </text>
      <!-- 电压表 -->
      <circle
        cx="150"
        cy="160"
        r="26"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="150"
        y="167"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="24"
        fill="#f1f5f9"
      >
        V
      </text>
      <text
        x="116"
        y="167"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
      >
        U
      </text>
      <!-- 滑动变阻器 -->
      <rect
        x="428"
        y="130"
        width="44"
        height="60"
        rx="5"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <line
        x1="450"
        y1="96"
        x2="450"
        y2="124"
        stroke="#cbd5e1"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path d="M 444 116 L 450 128 L 456 116 Z" fill="#cbd5e1" />
      <text
        x="484"
        y="167"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#f1f5f9"
      >
        R
      </text>
      <!-- 开关 -->
      <circle cx="215" cy="250" r="3.4" fill="#cbd5e1" />
      <circle cx="265" cy="250" r="3.4" fill="#cbd5e1" />
      <line
        x1="215"
        y1="250"
        x2="256"
        y2="231"
        stroke="#cbd5e1"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <text
        x="236"
        y="222"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="22"
        fill="#cbd5e1"
      >
        S
      </text>
      <!-- 电流方向 -->
      <path d="M 392 62 L 404 70 L 392 78 Z" fill="#e2a846" />
      <text
        x="398"
        y="52"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
      >
        I
      </text>
      <!-- 分步标注：电压表直接并电源两端 -->
      <g v-if="step >= 1">
        <rect
          x="36"
          y="42"
          width="158"
          height="228"
          rx="12"
          fill="none"
          stroke="#e2a846"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="150" y="292" text-anchor="middle" font-size="21" fill="#e2a846">
          电压表直接接在电源两端
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.circuit-wrap {
  width: 100%;
  margin: 0 auto;
}

.circuit-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
