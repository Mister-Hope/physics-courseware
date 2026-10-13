<script setup lang="ts">
/** 电流表内接法（相对电源内接）电路图：电流表与电源同在干路中，电压表并联在滑动变阻器两端。 step ≥ 1 标出"电流表串在电源干路上"；step ≥ 2 标出"电压表并联在变阻器两端"。 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="circuit-wrap">
    <svg viewBox="0 0 520 300" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round">
        <line x1="70" y1="70" x2="450" y2="70" />
        <line x1="450" y1="70" x2="450" y2="130" />
        <line x1="450" y1="190" x2="450" y2="250" />
        <line x1="450" y1="250" x2="265" y2="250" />
        <line x1="215" y1="250" x2="70" y2="250" />
        <!-- 电源干路：电流表 + 电源 -->
        <line x1="70" y1="70" x2="70" y2="86" />
        <line x1="70" y1="134" x2="70" y2="146" />
        <line x1="70" y1="162" x2="70" y2="250" />
        <!-- 电压表支路：跨接在变阻器两端 -->
        <line x1="350" y1="70" x2="350" y2="134" />
        <line x1="350" y1="186" x2="350" y2="250" />
      </g>
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
      <circle
        cx="70"
        cy="110"
        r="24"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="70"
        y="117"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="23"
        fill="#f1f5f9"
      >
        A
      </text>
      <circle
        cx="350"
        cy="160"
        r="26"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="350"
        y="167"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="24"
        fill="#f1f5f9"
      >
        V
      </text>
      <text
        x="316"
        y="167"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
      >
        U
      </text>
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
      <g v-if="step >= 1">
        <rect
          x="36"
          y="44"
          width="68"
          height="208"
          rx="12"
          fill="none"
          stroke="#e2a846"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="118" y="292" text-anchor="middle" font-size="21" fill="#e2a846">
          电流表串在干路上
        </text>
      </g>
      <g v-if="step >= 2">
        <rect
          x="322"
          y="42"
          width="132"
          height="228"
          rx="12"
          fill="none"
          stroke="#60a5fa"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="392" y="292" text-anchor="middle" font-size="21" fill="#60a5fa">
          电压表并联在变阻器两端
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
