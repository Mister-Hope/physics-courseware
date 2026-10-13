<script setup lang="ts">
/**
 * 电流表外接法（相对电源外接）电路图： 开关接在电源负极一侧（断开开关时电压表示数归零）；电压表并联在外电路两端（测路端电压）；
 * 电流表只串在外电路（变阻器）这一支路上。滑动变阻器按正常接法画：电阻线圈两端都接入， 滑片从侧面接触线圈并引出一条支路接到线圈上端。 step ≥ 1 用虚线框圈出"外电路"。
 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="circuit-wrap">
    <svg viewBox="0 0 520 300" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- 外电路导线 -->
      <g fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round">
        <line x1="70" y1="70" x2="306" y2="70" />
        <line x1="354" y1="70" x2="450" y2="70" />
        <line x1="450" y1="70" x2="450" y2="130" />
        <line x1="450" y1="200" x2="450" y2="250" />
        <line x1="450" y1="250" x2="160" y2="250" />
        <line x1="110" y1="250" x2="70" y2="250" />
        <line x1="70" y1="70" x2="70" y2="146" />
        <line x1="70" y1="162" x2="70" y2="250" />
        <!-- 电压表支路：并联在外电路两端 -->
        <line x1="230" y1="70" x2="230" y2="134" />
        <line x1="230" y1="186" x2="230" y2="250" />
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
      <!-- 开关（接在电源负极一侧） -->
      <circle cx="110" cy="250" r="3.4" fill="#cbd5e1" />
      <circle cx="160" cy="250" r="3.4" fill="#cbd5e1" />
      <line
        x1="110"
        y1="250"
        x2="152"
        y2="231"
        stroke="#cbd5e1"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <text
        x="135"
        y="222"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="22"
        fill="#cbd5e1"
      >
        S
      </text>
      <!-- 电流表（只在外电路上） -->
      <circle
        cx="330"
        cy="70"
        r="24"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="330"
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
        cx="230"
        cy="160"
        r="26"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="230"
        y="167"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="24"
        fill="#f1f5f9"
      >
        V
      </text>
      <text
        x="196"
        y="167"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
      >
        U
      </text>
      <!-- 滑动变阻器：矩形是电阻线圈（两端都接入），滑片从侧面接触并引出一条支路接到线圈上端 -->
      <rect
        x="443"
        y="130"
        width="14"
        height="70"
        rx="3"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <line
        x1="492"
        y1="165"
        x2="470"
        y2="165"
        stroke="#cbd5e1"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path d="M 470 159 L 458 165 L 470 171 Z" fill="#cbd5e1" />
      <path
        d="M 492 165 V 116 H 450"
        fill="none"
        stroke="#cbd5e1"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <circle cx="450" cy="116" r="3.2" fill="#cbd5e1" />
      <text
        x="430"
        y="172"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#f1f5f9"
      >
        R
      </text>
      <!-- 电流方向（外电路中的电流） -->
      <path d="M 388 62 L 400 70 L 388 78 Z" fill="#e2a846" />
      <text
        x="394"
        y="52"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
      >
        I
      </text>
      <!-- 分步标注：电压表并联在外电路两端 -->
      <g v-if="step >= 1">
        <rect
          x="205"
          y="44"
          width="300"
          height="224"
          rx="12"
          fill="none"
          stroke="#e2a846"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="355" y="292" text-anchor="middle" font-size="21" fill="#e2a846">
          电压表并联在外电路两端
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
