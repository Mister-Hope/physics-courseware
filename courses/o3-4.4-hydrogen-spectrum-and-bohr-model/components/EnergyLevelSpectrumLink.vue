<!-- 4.4 P10：能级跃迁与巴耳末系谱线联动——点击跃迁箭头或谱线，查看对应的能量差与波长（真实公式计算） -->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 里德伯常量，单位 m⁻¹ */
const RYDBERG = 1.097e7;

/** 氢原子各能级：y 为示意阶梯的纵坐标，e 为能量（eV） */
const LEVELS = [
  { n: 1, y: 252, e: -13.6 },
  { n: 2, y: 132, e: -3.4 },
  { n: 3, y: 108, e: -1.51 },
  { n: 4, y: 88, e: -0.85 },
  { n: 5, y: 72, e: -0.54 },
  { n: 6, y: 58, e: -0.38 },
];

/** 谱带横向映射：400–700 nm → x 520–830 */
const X_MIN = 520;
const X_MAX = 830;
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

/** 四条可见谱线：n → 2 的跃迁 */
const LINES = [
  spectralLine(3, "Hα", "var(--c-danger)"),
  spectralLine(4, "Hβ", "var(--c-physics)"),
  spectralLine(5, "Hγ", "var(--c-accent-2)"),
  spectralLine(6, "Hδ", "var(--c-hint-important)"),
];

/** 可见光谱带下的波长刻度（nm） */
const TICKS = [400, 500, 600, 700];

/** 四条跃迁箭头分四车道，避免重叠 */
const LANES: Record<number, number> = { 3: 100, 4: 170, 5: 240, 6: 310 };

const selected = ref(3);

/** 当前选中的谱线 */
const current = computed(() => LINES.find((line) => line.n === selected.value) ?? LINES[0]);

/** 能级的纵坐标 */
const levelY = (n: number): number => LEVELS.find((level) => level.n === n)?.y ?? 0;

/** 能级短横的颜色：选中的跃迁两端点亮 */
const barFill = (n: number): string => {
  if (n === selected.value) return current.value.color;
  if (n === 2) return "var(--c-accent)";

  return "var(--c-text-dim)";
};

/** 能级短横的不透明度 */
const barOpacity = (n: number): number => (n === selected.value || n === 2 ? 1 : 0.4);
</script>

<template>
  <div class="hs-link">
    <svg viewBox="0 0 860 270" width="100%" xmlns="http://www.w3.org/2000/svg">
      <text x="60" y="36" font-size="10" fill="var(--c-text-dim)">激发态</text>
      <text x="60" y="266" font-size="10" fill="var(--c-text-dim)">基态</text>
      <rect
        x="520"
        y="46"
        width="310"
        height="160"
        rx="4"
        fill="var(--c-bg-soft)"
        stroke="var(--c-border)"
      />
      <g v-for="level in LEVELS" :key="level.n">
        <rect
          x="60"
          :y="level.y - 1.2"
          width="332"
          :height="level.n === selected || level.n === 2 ? 2.6 : 1.8"
          rx="1.2"
          :fill="barFill(level.n)"
          :opacity="barOpacity(level.n)"
        />
        <text
          x="402"
          :y="level.y + 4"
          font-family="KaTeX_Main"
          font-size="11"
          :fill="level.n === 2 ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        >
          n = {{ level.n }}
        </text>
        <text
          x="436"
          :y="level.y + 4"
          font-family="KaTeX_Main"
          font-size="10.5"
          :fill="level.n === 2 ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        >
          {{ level.e.toFixed(2).replace("-", "−") }} eV
        </text>
      </g>
      <g v-for="line in LINES" :key="line.n" style="cursor: pointer" @click="selected = line.n">
        <rect
          :x="LANES[line.n] - 16"
          :y="levelY(line.n) - 6"
          width="32"
          :height="138 - levelY(line.n)"
          fill="transparent"
        />
        <circle
          :cx="LANES[line.n]"
          :cy="levelY(line.n) + 2"
          :r="line.n === selected ? 3.2 : 2.2"
          :fill="line.color"
          :opacity="line.n === selected ? 1 : 0.45"
        />
        <CourseArrow
          :from="{ x: LANES[line.n], y: levelY(line.n) + 5 }"
          :to="{ x: LANES[line.n], y: 128 }"
          :stroke="line.color"
          :stroke-width="line.n === selected ? 3.2 : 1.8"
          :stroke-dasharray="line.n === selected ? undefined : '4 3'"
          :opacity="line.n === selected ? 1 : 0.45"
        />
        <text
          :x="line.x"
          y="38"
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          :fill="line.color"
          :opacity="line.n === selected ? 1 : 0.5"
        >
          {{ line.name }}
        </text>
        <rect :x="line.x - 14" y="44" width="28" height="166" fill="transparent" />
        <rect
          :x="line.x - (line.n === selected ? 8 : 5)"
          y="48"
          :width="line.n === selected ? 16 : 10"
          height="158"
          :fill="line.color"
          :opacity="line.n === selected ? 0.22 : 0.1"
        />
        <rect
          :x="line.x - (line.n === selected ? 2 : 1.5)"
          y="48"
          :width="line.n === selected ? 4 : 3"
          height="158"
          :fill="line.color"
          :opacity="line.n === selected ? 1 : 0.5"
        />
      </g>
      <g v-for="tick in TICKS" :key="tick">
        <line
          :x1="xOf(tick)"
          y1="206"
          :x2="xOf(tick)"
          y2="213"
          stroke="var(--c-border)"
          stroke-width="1"
        />
        <text
          :x="xOf(tick)"
          y="230"
          :text-anchor="tick === 400 ? 'start' : tick === 700 ? 'end' : 'middle'"
          font-family="KaTeX_Main"
          font-size="10"
          fill="var(--c-text-dim)"
        >
          {{ tick }} nm
        </text>
      </g>
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
