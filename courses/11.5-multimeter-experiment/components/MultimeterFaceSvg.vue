<script setup lang="ts">
// 第 2–3 页：多用电表外形与表盘示意（机身 / 弧形刻度窗 / 选择开关 / 机械调零旋钮 / 红黑插孔）
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    pointer?: number;
    faceOn?: boolean;
    knobOn?: boolean;
    screwOn?: boolean;
  }>(),
  { pointer: 0.42, faceOn: false, knobOn: false, screwOn: false },
);

const CX = 320;
const CY = 196;
const START = 24;
const SPAN = 132;

function pt(f: number, r: number) {
  const a = ((START + f * SPAN) * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}
function arc(r: number) {
  const a = pt(0, r);
  const b = pt(1, r);
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${r} ${r} 0 ${SPAN > 180 ? 1 : 0} 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

const majors = Array.from({ length: 41 }, (_, i) => i / 40);
const minors = Array.from({ length: 41 }, (_, i) => (i + 0.5) / 40);
const numbers = Array.from({ length: 9 }, (_, i) => i / 8);

const ptr = computed(() => pt(props.pointer, 128));
const ptrBase = computed(() => pt(props.pointer - 0.004, 30));
const ptrBase2 = computed(() => pt(props.pointer + 0.004, 30));
</script>

<template>
  <svg viewBox="0 0 640 340" w-full h-full>
    <rect x="20" y="20" width="600" height="310" rx="26" fill="#0d1426" stroke="var(--c-stroke)" stroke-width="1.5" />
    <text x="320" y="14" text-anchor="middle" font-size="12" fill="var(--c-text-faint)">模拟多用电表示意图</text>
    <rect x="44" y="38" width="552" height="170" rx="14" fill="#101a2e" :stroke="faceOn ? 'var(--c-gold)' : 'var(--c-stroke)'" stroke-width="1.6" />
    <text x="320" y="58" text-anchor="middle" font-size="12" fill="var(--c-text-faint)">表　盘</text>
    <g fill="none" stroke="var(--c-line-strong)" stroke-width="1.8">
      <path :d="arc(150)" />
      <path :d="arc(118)" />
    </g>
    <g stroke="var(--c-text)" stroke-width="1.6">
      <line v-for="f in majors" :key="'M' + f" :x1="pt(f, 150).x" :y1="pt(f, 150).y" :x2="pt(f, 139).x" :y2="pt(f, 139).y" />
    </g>
    <g stroke="var(--c-text-faint)" stroke-width="1.1">
      <line v-for="f in minors" :key="'m' + f" :x1="pt(f, 150).x" :y1="pt(f, 150).y" :x2="pt(f, 144).x" :y2="pt(f, 144).y" />
    </g>
    <text v-for="f in numbers" :key="'n' + f" :x="pt(f, 164).x" :y="pt(f, 164).y + 4" text-anchor="middle" font-size="12" fill="var(--c-text)">
      {{ Math.round(f * 10) }}
    </text>
    <text x="150" y="118" font-size="12" fill="var(--c-warn)">Ω</text>
    <text x="500" y="118" font-size="12" fill="var(--c-text-faint)">V / mA</text>
    <polygon :points="`${ptr.x},${ptr.y} ${ptrBase.x},${ptrBase.y} ${ptrBase2.x},${ptrBase2.y}`" fill="var(--c-gold)" />
    <circle :cx="CX" :cy="CY" r="6" fill="var(--c-line-strong)" stroke="var(--c-bg)" stroke-width="2" />
    <g>
      <circle cx="320" cy="234" r="11" fill="#0a1120" :stroke="screwOn ? 'var(--c-gold)' : 'var(--c-line-strong)'" stroke-width="1.6" />
      <line x1="314" y1="234" x2="326" y2="234" :stroke="screwOn ? 'var(--c-gold)' : 'var(--c-line-strong)'" stroke-width="1.6" />
      <text x="340" y="239" font-size="11" fill="var(--c-text-faint)">机械调零旋钮</text>
    </g>
    <g>
      <circle cx="320" cy="288" r="34" fill="#0a1120" :stroke="knobOn ? 'var(--c-gold)' : 'var(--c-line-strong)'" stroke-width="1.8" />
      <circle cx="320" cy="288" r="24" fill="none" stroke="var(--c-line-strong)" stroke-width="1" />
      <line x1="320" y1="288" x2="306" y2="264" :stroke="knobOn ? 'var(--c-gold)' : 'var(--c-text)'" stroke-width="3" />
      <text x="262" y="262" text-anchor="middle" font-size="11" fill="var(--c-text-faint)">OFF</text>
      <text x="288" y="238" text-anchor="middle" font-size="12" fill="var(--c-text)">─V</text>
      <text x="320" y="230" text-anchor="middle" font-size="12" fill="var(--c-text)">─A</text>
      <text x="352" y="238" text-anchor="middle" font-size="12" fill="var(--c-warn)">Ω</text>
      <text x="378" y="262" text-anchor="middle" font-size="12" fill="var(--c-text)">~V</text>
      <text x="320" y="332" text-anchor="middle" font-size="11" fill="var(--c-text-faint)">选择开关（功能与量程）</text>
    </g>
    <g>
      <circle cx="78" cy="288" r="10" fill="#0a1120" stroke="var(--c-neg)" stroke-width="1.6" />
      <text x="78" y="312" text-anchor="middle" font-size="11" fill="var(--c-neg)">黑表笔 −</text>
      <circle cx="140" cy="288" r="10" fill="#0a1120" stroke="var(--c-pos)" stroke-width="1.6" />
      <text x="140" y="312" text-anchor="middle" font-size="11" fill="var(--c-pos)">红表笔 +</text>
    </g>
    <g>
      <rect x="470" y="272" width="110" height="34" rx="8" fill="rgba(96,165,250,0.10)" stroke="var(--c-neg)" stroke-width="1.2" />
      <text x="525" y="294" text-anchor="middle" font-size="12" fill="var(--c-neg)">黑表笔插“−”</text>
      <rect x="470" y="230" width="110" height="34" rx="8" fill="rgba(248,113,113,0.10)" stroke="var(--c-pos)" stroke-width="1.2" />
      <text x="525" y="252" text-anchor="middle" font-size="12" fill="var(--c-pos)">红表笔插“+”</text>
    </g>
  </svg>
</template>
