<!-- 第 11 页：交互式电磁波谱带——七段按波长/频率顺序排列，点击任意一段展开该段的波长数量级、频率范围与教材用途 -->
<script setup lang="ts">
import { computed, ref } from "vue";

interface Band {
  key: string;
  svgName: string;
  titleTex: string;
  titleSuffix: string;
  lamTex: string;
  freqTex: string;
  uses: string;
}

const bands: Band[] = [
  {
    key: "radio",
    svgName: "无线电波",
    titleTex: "",
    titleSuffix: "无线电波",
    lamTex: "10^{0} \\sim 10^{5}\\ \\text{m}",
    freqTex: "< 3\\times10^{9}\\ \\text{Hz}",
    uses: "长波、中波、短波用于广播及其他信号的传输",
  },
  {
    key: "micro",
    svgName: "微波",
    titleTex: "",
    titleSuffix: "微波",
    lamTex: "10^{-3} \\sim 10^{0}\\ \\text{m}",
    freqTex: "3\\times10^{9} \\sim 3\\times10^{11}\\ \\text{Hz}",
    uses: "卫星通信、电视等的信号传输；微波炉加热食物",
  },
  {
    key: "ir",
    svgName: "红外线",
    titleTex: "",
    titleSuffix: "红外线",
    lamTex: "10^{-6} \\sim 10^{-3}\\ \\text{m}",
    freqTex: "3\\times10^{11} \\sim 4\\times10^{14}\\ \\text{Hz}",
    uses: "加热理疗",
  },
  {
    key: "vis",
    svgName: "可见光",
    titleTex: "",
    titleSuffix: "可见光",
    lamTex: "400 \\sim 760\\ \\text{nm}",
    freqTex: "4\\times10^{14} \\sim 7.5\\times10^{14}\\ \\text{Hz}",
    uses: "让我们看见这个世界，也可以用于通信",
  },
  {
    key: "uv",
    svgName: "紫外线",
    titleTex: "",
    titleSuffix: "紫外线",
    lamTex: "10 \\sim 400\\ \\text{nm}",
    freqTex: "7.5\\times10^{14} \\sim 3\\times10^{16}\\ \\text{Hz}",
    uses: "消毒",
  },
  {
    key: "xray",
    svgName: "X 射线",
    titleTex: "",
    titleSuffix: "X 射线",
    lamTex: "10^{-2} \\sim 10\\ \\text{nm}",
    freqTex: "3\\times10^{16} \\sim 3\\times10^{19}\\ \\text{Hz}",
    uses: "X 射线片用于诊断病情",
  },
  {
    key: "gamma",
    svgName: "γ 射线",
    titleTex: "\\gamma",
    titleSuffix: " 射线",
    lamTex: "< 10^{-2}\\ \\text{nm}",
    freqTex: "> 3\\times10^{19}\\ \\text{Hz}",
    uses: "摧毁病变的细胞",
  },
];

const segX = (i: number) => 15 + i * 105;
const sel = ref("vis");
const cur = computed(() => bands.find((b) => b.key === sel.value) ?? bands[0]);
</script>

<template>
  <div class="spec">
    <svg viewBox="0 0 760 158" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emw-vis-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" class="vis-a" />
          <stop offset="0.34" class="vis-b" />
          <stop offset="0.67" class="vis-c" />
          <stop offset="1" class="vis-d" />
        </linearGradient>
      </defs>
      <text x="381" y="14" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
        频率
        <tspan font-family="KaTeX_Math" font-style="italic">f</tspan>
        增大
      </text>
      <CourseArrow
        :from="{ x: 15, y: 19 }"
        :to="{ x: 745, y: 19 }"
        stroke="var(--c-accent)"
        stroke-width="1.8"
      />
      <g
        v-for="(b, i) in bands"
        :key="b.key"
        class="spec-seg"
        :class="{ active: sel === b.key }"
        @click="sel = b.key"
      >
        <rect
          class="seg-rect"
          :x="segX(i)"
          :y="40"
          width="102"
          height="52"
          rx="5"
          :class="'fill-' + b.key"
        />
        <text
          x="0"
          y="114"
          text-anchor="middle"
          :transform="`translate(${segX(i) + 51}, 0)`"
          font-size="15.5"
          fill="var(--c-text)"
        >
          <tspan v-if="b.key === 'gamma'" font-family="KaTeX_Math">γ</tspan>
          {{ b.key === "gamma" ? " 射线" : b.svgName }}
        </text>
        <rect :x="segX(i)" :y="34" width="102" height="88" fill="transparent" />
      </g>
      <text x="381" y="140" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">
        波长
        <tspan font-family="KaTeX_Math" font-style="italic">λ</tspan>
        减小
      </text>
      <CourseArrow
        :from="{ x: 15, y: 146 }"
        :to="{ x: 745, y: 146 }"
        stroke="var(--c-physics)"
        stroke-width="1.8"
      />
    </svg>
    <div class="spec-panel">
      <div class="spec-title">
        <Latex v-if="cur.titleTex" :tex="cur.titleTex" />{{ cur.titleSuffix }}
      </div>
      <div class="spec-grid">
        <div><span class="spec-k">波长</span><Latex :tex="cur.lamTex" /></div>
        <div><span class="spec-k">频率</span><Latex :tex="cur.freqTex" /></div>
      </div>
      <div class="spec-uses"><span class="spec-k">用途</span>{{ cur.uses }}</div>
    </div>
  </div>
</template>

<style scoped>
.spec {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.spec-seg {
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 0.15s ease;
}
.spec-seg:hover {
  opacity: 0.85;
}
.spec-seg.active {
  opacity: 1;
}
.seg-rect {
  stroke: transparent;
  stroke-width: 3;
  transition: stroke 0.15s ease;
}
.spec-seg.active .seg-rect {
  stroke: var(--c-accent);
}
.fill-radio {
  fill: color-mix(in srgb, var(--c-accent-2) 55%, var(--c-surface));
}
.fill-micro {
  fill: color-mix(in srgb, var(--c-physics) 65%, var(--c-surface));
}
.fill-ir {
  fill: color-mix(in srgb, var(--c-danger) 70%, var(--c-accent));
}
.fill-vis {
  fill: url(#emw-vis-grad);
}
.fill-uv {
  fill: color-mix(in srgb, var(--c-accent-2) 60%, var(--c-danger));
}
.fill-xray {
  fill: color-mix(in srgb, var(--c-physics) 35%, var(--c-surface));
}
.fill-gamma {
  fill: color-mix(in srgb, var(--c-accent-2) 80%, var(--c-danger));
}
.vis-a {
  stop-color: var(--c-danger);
}
.vis-b {
  stop-color: var(--c-accent);
}
.vis-c {
  stop-color: var(--c-physics);
}
.vis-d {
  stop-color: var(--c-accent-2);
}
.spec-panel {
  display: flex;
  align-items: baseline;
  gap: 1.2rem;
  min-height: 3.1rem;
  padding: 0.6rem 0.9rem;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--c-surface) 70%, transparent);
  border: 1px solid var(--c-border);
}
.spec-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--c-accent);
  white-space: nowrap;
}
.spec-grid {
  display: flex;
  gap: 1.1rem;
  flex: 1;
  min-width: 0;
}
.spec-k {
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 0.8rem;
  color: var(--c-text-dim);
}
.spec-uses {
  font-size: 0.95rem;
  color: var(--c-text-dim);
  min-width: 0;
}
</style>
