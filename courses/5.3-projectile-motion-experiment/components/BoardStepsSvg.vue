<script setup lang="ts">
/** 第 11、13 页：用竖直方向 1 : 4 : 9 : 16 份的下降高度构造等时间间隔。 小球位置取 y ∝ t²（相邻挡板对应的时刻正好是 T、2T、3T、4T）； step 1 出四个挡板位置与「几份」，step 2 出对应时刻；showHorizontal 时补上水平间隔的比较。 */
import { computed } from "vue";

const { step = 0, showHorizontal = false } = defineProps<{ step?: number; showHorizontal?: boolean }>();

const origin = { x: 86, y: 52 };
const DX = 84;
const DY = 17;
const COUNT = 4;
const dots = computed(() =>
  Array.from({ length: COUNT }, (_, i) => {
    const stepIndex = i + 1;

    return { stepIndex, x: origin.x + DX * stepIndex, y: origin.y + DY * stepIndex * stepIndex };
  }),
);
const pathD = computed(() => {
  const samples = 40;
  const points = Array.from({ length: samples + 1 }, (_, i) => {
    const t = (COUNT * i) / samples;

    return { x: origin.x + DX * t, y: origin.y + DY * t * t };
  });

  return points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
});
const BASE_Y = 412;
const dxSpans = computed(() => dots.value.slice(1).map((dot, i) => ({ from: dots.value[i].x, to: dot.x, mid: (dots.value[i].x + dot.x) / 2 })));
const times = ["T", "2T", "3T", "4T"];
</script>

<template>
  <svg viewBox="0 0 560 452" width="100%" style="max-width: 520px" xmlns="http://www.w3.org/2000/svg">
    <line :x1="origin.x" :y1="origin.y" :x2="origin.x" :y2="origin.y + 348" stroke="rgba(148,163,184,0.4)" stroke-width="1.6" stroke-dasharray="7 5" />
    <line
      :x1="origin.x"
      :y1="origin.y"
      :x2="origin.x + DX * COUNT + 62"
      :y2="origin.y"
      stroke="rgba(148,163,184,0.4)"
      stroke-width="1.6"
      stroke-dasharray="7 5"
    />
    <path :d="pathD" fill="none" stroke="rgba(226,168,70,0.6)" stroke-width="2.2" stroke-dasharray="9 6" />
    <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="var(--c-text)" />
    <text :x="origin.x - 14" :y="origin.y + 8" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="21" fill="#e2e8f0">O</text>
    <g v-if="step >= 1">
      <line
        v-for="dot in dots"
        :key="`plate-${dot.stepIndex}`"
        :x1="dot.x - 32"
        :y1="dot.y + 9"
        :x2="dot.x + 32"
        :y2="dot.y - 9"
        stroke="#94a3b8"
        stroke-width="6"
        stroke-linecap="round"
      />
      <line
        v-for="dot in dots"
        :key="`tick-${dot.stepIndex}`"
        :x1="origin.x - 7"
        :y1="dot.y"
        :x2="origin.x + 7"
        :y2="dot.y"
        stroke="#e2a846"
        stroke-width="2.2"
      />
      <text v-for="dot in dots" :key="`share-${dot.stepIndex}`" :x="origin.x - 16" :y="dot.y + 6" text-anchor="end" font-size="19" fill="#e2a846">
        {{ dot.stepIndex * dot.stepIndex }} 份
      </text>
    </g>
    <g v-if="step >= 2">
      <text
        v-for="(dot, i) in dots"
        :key="`time-${dot.stepIndex}`"
        :x="dot.x + 44"
        :y="dot.y + 5"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#2dd4bf"
      >
        {{ times[i] }}
      </text>
    </g>
    <circle v-for="dot in dots" :key="`dot-${dot.stepIndex}`" :cx="dot.x" :cy="dot.y" r="6.5" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <g v-if="showHorizontal">
      <line
        v-for="dot in dots"
        :key="`drop-${dot.stepIndex}`"
        :x1="dot.x"
        :y1="dot.y"
        :x2="dot.x"
        :y2="BASE_Y"
        stroke="rgba(148,163,184,0.3)"
        stroke-width="1.4"
        stroke-dasharray="5 5"
      />
      <line :x1="dots[0].x - 40" :y1="BASE_Y" :x2="dots[COUNT - 1].x + 30" :y2="BASE_Y" stroke="#94a3b8" stroke-width="1.8" />
      <g stroke="#e2a846" stroke-width="2.6">
        <template v-for="(span, i) in dxSpans" :key="`dx-${i}`">
          <line :x1="span.from" :y1="BASE_Y" :x2="span.to" :y2="BASE_Y" />
          <line :x1="span.from" :y1="BASE_Y - 8" :x2="span.from" :y2="BASE_Y + 8" />
          <line :x1="span.to" :y1="BASE_Y - 8" :x2="span.to" :y2="BASE_Y + 8" />
        </template>
      </g>
      <text
        v-for="(span, i) in dxSpans"
        :key="`dx-text-${i}`"
        :x="span.mid"
        :y="BASE_Y + 28"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#e2a846"
      >
        Δx
      </text>
    </g>
  </svg>
</template>
