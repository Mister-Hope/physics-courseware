<script setup lang="ts">
import { computed } from "vue";

// 第 3 页：干簧管（常开型）——磁体远离时断开，靠近时簧片磁化吸合
// 上半部分是结构示意（玻璃管 + 两片簧片 + 永磁体 M），下半部分是它在电路图中的符号
const { step = 0 } = defineProps<{
  /** 0 = 磁体远离（断开），1 = 磁体靠近（接通） */
  step?: number;
}>();

const on = computed(() => step >= 1);
</script>

<template>
  <svg
    viewBox="0 0 440 344"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="干簧管：磁体靠近时簧片吸合接通；下方为它的电路符号"
  >
    <!-- ── 结构示意：玻璃管 + 两片簧片 ── -->
    <line
      x1="4"
      y1="89"
      x2="52"
      y2="89"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <line
      x1="388"
      y1="89"
      x2="436"
      y2="89"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <rect
      x="52"
      y="58"
      width="336"
      height="62"
      rx="31"
      fill="var(--c-accent-2)"
      fill-opacity="0.05"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.5"
      stroke-width="1.6"
    />
    <!-- 两片软磁性簧片：断开时尖端留缝，吸合时相碰 -->
    <polyline
      :points="on ? '52,86 214,89' : '52,86 206,88'"
      fill="none"
      :stroke="on ? 'var(--c-accent)' : 'var(--c-text)'"
      stroke-width="3.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <polyline
      :points="on ? '388,92 214,89' : '388,92 222,90'"
      fill="none"
      :stroke="on ? 'var(--c-accent)' : 'var(--c-text)'"
      stroke-width="3.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle v-if="on" cx="214" cy="89" r="11" fill="var(--c-accent)" opacity="0.16" />
    <circle v-if="on" cx="214" cy="89" r="4" fill="var(--c-accent)" />
    <!-- 永磁体 M：远离 → 靠近（整体上移） -->
    <g
      :transform="on ? 'translate(0 -40)' : 'translate(0 0)'"
      style="transition: transform 0.45s ease"
    >
      <BarMagnet :x="220" :y="186" :length="72" :width="24" n-side="top" />
      <text
        x="268"
        y="192"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="17"
        fill="var(--c-text-dim)"
      >
        M
      </text>
    </g>
    <!-- 靠近时：磁体与干簧管之间的磁场（示意） -->
    <g v-if="on" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.7">
      <line x1="200" y1="133" x2="200" y2="122" />
      <line x1="220" y1="131" x2="220" y2="121" />
      <line x1="240" y1="133" x2="240" y2="122" />
    </g>
    <!-- 标注 -->
    <text x="220" y="42" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
      <tspan font-family="KaTeX_Math" font-style="italic">SA</tspan>
      <tspan>（干簧管）</tspan>
    </text>

    <!-- ── 下半部分：电路符号 ── -->
    <line
      x1="24"
      y1="236"
      x2="416"
      y2="236"
      stroke="var(--c-border)"
      stroke-width="1"
      stroke-dasharray="5 5"
    />
    <text x="24" y="262" font-size="14" fill="var(--c-text-dim)">电路符号</text>
    <line
      x1="70"
      y1="300"
      x2="140"
      y2="300"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <line
      x1="300"
      y1="300"
      x2="370"
      y2="300"
      stroke="var(--c-text-dim)"
      stroke-width="1.8"
      stroke-linecap="round"
    />
    <rect
      x="140"
      y="278"
      width="160"
      height="44"
      rx="22"
      fill="var(--c-accent-2)"
      fill-opacity="0.05"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.5"
      stroke-width="1.4"
    />
    <polyline
      points="150,296 213,299"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <polyline
      points="290,304 227,301"
      fill="none"
      stroke="var(--c-text)"
      stroke-width="3"
      stroke-linecap="round"
    />
    <text
      x="386"
      y="306"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="17"
      fill="var(--c-text-dim)"
    >
      SA
    </text>
  </svg>
</template>
