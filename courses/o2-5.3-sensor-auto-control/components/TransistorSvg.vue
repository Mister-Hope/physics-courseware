<script setup lang="ts">
// 第 10 页：NPN 三极管 VT 的符号与三个电极（基极电流控制集电极电流，作电子开关）
</script>

<template>
  <svg viewBox="0 0 470 340" class="vt-svg" role="img" aria-label="NPN 三极管符号与 b、c、e 三个电极">
    <g transform="translate(70 0)">
      <circle cx="170" cy="170" r="86" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.4" />

      <!-- 基极横杠与引线 -->
      <line x1="140" y1="128" x2="140" y2="212" stroke="var(--c-text)" stroke-width="5" stroke-linecap="round" />
      <line x1="52" y1="170" x2="140" y2="170" stroke="var(--c-text)" stroke-width="1.6" />

      <!-- 集电极 -->
      <path d="M 140 150 L 216 104 L 216 54" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />

      <!-- 发射极（箭头朝外） -->
      <path d="M 140 190 L 216 236 L 216 286" fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <polygon points="184.9,222.7 191.3,212.5 200,225" fill="var(--c-text)" />

      <!-- 电极标注 -->
      <text x="40" y="176" text-anchor="end" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">b</tspan>
      </text>
      <text x="228" y="52" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">c</tspan>
      </text>
      <text x="228" y="292" font-size="17" fill="var(--c-text)">
        <tspan font-family="KaTeX_Math" font-style="italic">e</tspan>
      </text>

      <text x="168" y="300" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Main">VT（NPN 型）</tspan>
      </text>

      <!-- 两侧说明：小电流控制大电流 -->
    </g>
  </svg>
</template>

<style scoped>
.vt-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
