<script setup lang="ts">
/** 安阻法（电流表 + 电阻箱）电路图：没有电压表，电流表串在干路上测干路电流，外电阻由电阻箱给出。 step ≥ 1 标出"电流表读数就是干路电流 I"。 */
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <div class="circuit-wrap">
    <svg viewBox="0 0 520 300" class="circuit-svg" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#cbd5e1" stroke-width="2.4" stroke-linecap="round">
        <line x1="70" y1="70" x2="234" y2="70" />
        <line x1="286" y1="70" x2="450" y2="70" />
        <line x1="450" y1="70" x2="450" y2="128" />
        <line x1="450" y1="192" x2="450" y2="250" />
        <line x1="450" y1="250" x2="265" y2="250" />
        <line x1="215" y1="250" x2="70" y2="250" />
        <line x1="70" y1="70" x2="70" y2="146" />
        <line x1="70" y1="162" x2="70" y2="250" />
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
        cx="260"
        cy="70"
        r="26"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="260"
        y="77"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="24"
        fill="#f1f5f9"
      >
        A
      </text>
      <rect
        x="424"
        y="128"
        width="52"
        height="64"
        rx="6"
        fill="rgba(15,20,37,0.85)"
        stroke="#cbd5e1"
        stroke-width="2.4"
      />
      <text
        x="450"
        y="168"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="#f1f5f9"
      >
        R
      </text>
      <text x="450" y="116" text-anchor="middle" font-size="18" fill="#94a3b8">电阻箱</text>
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
          x="30"
          y="42"
          width="262"
          height="228"
          rx="12"
          fill="none"
          stroke="#e2a846"
          stroke-width="2"
          stroke-dasharray="7 6"
        />
        <text x="200" y="292" text-anchor="middle" font-size="21" fill="#e2a846">
          电流表读数就是干路电流
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
