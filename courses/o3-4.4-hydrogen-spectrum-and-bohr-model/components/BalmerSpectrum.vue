<!-- 4.4 P4：氢原子可见光区四条谱线——点击谱线查看对应跃迁与波长（波长由巴耳末公式真实计算） -->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 里德伯常量，单位 m⁻¹ */
const RYDBERG = 1.097e7;

/** 可见光波长范围与谱带横向映射：400–700 nm → x 30–850 */
const X_MIN = 30;
const X_MAX = 850;
const LAMBDA_MIN = 400;
const LAMBDA_MAX = 700;

/** 由巴耳末公式算波长，单位 nm */
const wavelength = (n: number): number => 1e9 / (RYDBERG * (1 / 4 - 1 / n ** 2));

/** 波长 → 谱带横坐标 */
const xOf = (lambda: number): number =>
  X_MIN + ((lambda - LAMBDA_MIN) / (LAMBDA_MAX - LAMBDA_MIN)) * (X_MAX - X_MIN);

/** 生成一条谱线的绘图与读数数据 */
const spectralLine = (
  n: number,
  name: string,
  color: string,
): { n: number; name: string; color: string; lambda: number; x: number; deltaE: number } => {
  const lambda = wavelength(n);

  return { n, name, color, lambda, x: xOf(lambda), deltaE: 1240 / lambda };
};

/** 四条可见谱线：n → 2 的跃迁，颜色与谱线实际颜色近似对应 */
const LINES = [
  spectralLine(3, "Hα", "var(--c-danger)"),
  spectralLine(4, "Hβ", "var(--c-physics)"),
  spectralLine(5, "Hγ", "var(--c-accent-2)"),
  spectralLine(6, "Hδ", "var(--c-hint-important)"),
];

const selected = ref(3);

/** 当前选中的谱线 */
const current = computed(() => LINES.find((line) => line.n === selected.value) ?? LINES[0]);
</script>

<template>
  <div class="hs-spectrum">
    <svg viewBox="0 0 880 200" width="100%" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="30"
        y="58"
        width="820"
        height="52"
        rx="4"
        fill="var(--c-bg-soft)"
        stroke="var(--c-border)"
      />
      <g v-for="line in LINES" :key="line.n" style="cursor: pointer" @click="selected = line.n">
        <rect :x="line.x - 17" y="52" width="34" height="74" fill="transparent" />
        <text
          :x="line.x"
          y="44"
          text-anchor="middle"
          font-size="13.5"
          font-weight="700"
          :fill="line.color"
          :opacity="line.n === selected ? 1 : 0.55"
        >
          {{ line.name }}
        </text>
        <rect
          :x="line.x - (line.n === selected ? 7 : 4)"
          y="62"
          :width="line.n === selected ? 14 : 8"
          height="44"
          rx="7"
          :fill="line.color"
          :opacity="line.n === selected ? 0.22 : 0.1"
        />
        <rect
          :x="line.x - (line.n === selected ? 2 : 1.5)"
          y="62"
          :width="line.n === selected ? 4 : 3"
          height="44"
          rx="2"
          :fill="line.color"
          :opacity="line.n === selected ? 1 : 0.55"
        />
        <rect
          v-if="line.n === selected"
          :x="line.x - 32"
          y="120"
          width="64"
          height="22"
          rx="11"
          :fill="line.color"
          opacity="0.14"
        />
        <text
          v-if="line.n === selected"
          :x="line.x"
          y="135.5"
          text-anchor="middle"
          font-family="KaTeX_Main"
          font-size="12"
          font-weight="700"
          :fill="line.color"
        >
          {{ Math.round(line.lambda) }} nm
        </text>
      </g>
      <line x1="30" y1="158" x2="850" y2="158" stroke="var(--c-border)" stroke-width="1" />
      <line x1="30" y1="154" x2="30" y2="162" stroke="var(--c-border)" stroke-width="1" />
      <line x1="303.3" y1="154" x2="303.3" y2="162" stroke="var(--c-border)" stroke-width="1" />
      <line x1="576.7" y1="154" x2="576.7" y2="162" stroke="var(--c-border)" stroke-width="1" />
      <line x1="850" y1="154" x2="850" y2="162" stroke="var(--c-border)" stroke-width="1" />
      <text
        x="90"
        y="182"
        text-anchor="start"
        font-family="KaTeX_Main"
        font-size="11"
        fill="var(--c-text-dim)"
      >
        400 nm
      </text>
      <text
        x="330"
        y="182"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="11"
        fill="var(--c-text-dim)"
      >
        500 nm
      </text>
      <text
        x="570"
        y="182"
        text-anchor="middle"
        font-family="KaTeX_Main"
        font-size="11"
        fill="var(--c-text-dim)"
      >
        600 nm
      </text>
      <text
        x="810"
        y="182"
        text-anchor="end"
        font-family="KaTeX_Main"
        font-size="11"
        fill="var(--c-text-dim)"
      >
        700 nm
      </text>
    </svg>
    <div class="hs-readout">
      <div class="hs-cell">
        <span class="mini-note">谱线</span>
        <span class="hs-cell-v">{{ current.name }}</span>
      </div>
      <div class="hs-cell">
        <span class="mini-note">跃迁</span>
        <span class="hs-cell-v">n = {{ current.n }} → 2</span>
      </div>
      <div class="hs-cell">
        <span class="mini-note">能量差</span>
        <span class="hs-cell-v">{{ current.deltaE.toFixed(2) }} eV</span>
      </div>
      <div class="hs-cell">
        <span class="mini-note">波长</span>
        <span class="hs-cell-v">{{ Math.round(current.lambda) }} nm</span>
      </div>
    </div>
  </div>
</template>
