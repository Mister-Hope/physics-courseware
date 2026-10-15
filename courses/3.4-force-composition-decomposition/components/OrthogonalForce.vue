<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 正交分解法：把一个力 F 分解到互相垂直的两条坐标轴上。
 *
 * F 的方向与坐标系的倾角都能调：设 F 与水平方向成 θ、x 轴与水平方向成 φ，则 F 与 x 轴的夹角 α = θ − φ，两个分力由真实三角函数算出：Fₓ = F cosα、F_y = F
 * sinα（负值表示与轴的正方向相反）。 把 x 轴转到与 F 重合（α = 0）时，F_y = 0——这就是"让尽量多的力落在坐标轴上"的选轴技巧。
 */
const VIEW = { width: 620, height: 300 };
/** 每牛顿多少用户单位 */
const SCALE = 18;
const origin = { x: 280, y: 190 };
const AXIS_LEN = 200;

const force = ref(8);
const theta = ref(60);
const phi = ref(0);

const rad = (deg: number): number => (deg * Math.PI) / 180;
const pointAt = (deg: number, len: number): { x: number; y: number } => ({
  x: origin.x + len * Math.cos(rad(deg)),
  y: origin.y - len * Math.sin(rad(deg)),
});

/** F 与 x 轴的夹角（度） */
const alpha = computed(() => theta.value - phi.value);
const forceX = computed(() => force.value * Math.cos(rad(alpha.value)));
const forceY = computed(() => force.value * Math.sin(rad(alpha.value)));

const xEnd = computed(() => pointAt(phi.value, AXIS_LEN));
const xBack = computed(() => pointAt(phi.value + 180, 90));
const yEnd = computed(() => pointAt(phi.value + 90, AXIS_LEN));
const yBack = computed(() => pointAt(phi.value - 90, 90));

const forceTip = computed(() => pointAt(theta.value, force.value * SCALE));
const fxTip = computed(() => pointAt(phi.value, forceX.value * SCALE));
const fyTip = computed(() => pointAt(phi.value + 90, forceY.value * SCALE));

const arcRadius = 76;
const arcStart = computed(() => pointAt(phi.value, arcRadius));
const arcEnd = computed(() => pointAt(theta.value, arcRadius));
/** 圆弧方向：α ≥ 0 时逆时针（屏幕上是 sweep 0） */
const arcSweep = computed(() => (alpha.value >= 0 ? 0 : 1));
const arcLabel = computed(() => pointAt(phi.value + alpha.value / 2, 104));

const pct = (value: number, total: number): number => (value / total) * 100;

const mid = (
  a: { x: number; y: number },
  b: { x: number; y: number },
): { x: number; y: number } => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const fmt = (v: number): string => v.toFixed(1);

const forceTex = computed(() => `F = ${force.value}\\ \\text{N}`);
const thetaTex = computed(() => `\\theta = ${theta.value}^\\circ`);
const phiTex = computed(() => `\\varphi = ${phi.value}^\\circ`);
const alphaTex = computed(() => `\\alpha = \\theta - \\varphi = ${alpha.value}^\\circ`);
const fxTex = computed(() => `F_x = F\\cos\\alpha = ${fmt(forceX.value)}\\ \\text{N}`);
const fyTex = computed(() => `F_y = F\\sin\\alpha = ${fmt(forceY.value)}\\ \\text{N}`);
</script>

<template>
  <div class="split-wide" style="

--cols: minmax(0, 1.3fr) minmax(0, 1fr)">
    <div class="figure relative min-w-0">
      <svg :viewBox="`0 0 ${VIEW.width} ${VIEW.height}`">
        <line
          :x1="origin.x - 90"
          :y1="origin.y"
          :x2="origin.x + 90"
          :y2="origin.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          stroke-dasharray="5 5"
          opacity="0.4"
        />
        <line
          :x1="xBack.x"
          :y1="xBack.y"
          :x2="origin.x"
          :y2="origin.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          opacity="0.5"
        />
        <line
          :x1="yBack.x"
          :y1="yBack.y"
          :x2="origin.x"
          :y2="origin.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          opacity="0.5"
        />
        <CourseArrow
          :from="origin"
          :to="xEnd"
          stroke="var(--c-text-dim)"
          stroke-width="2.4"
          pointer-events="none"
        />
        <CourseArrow
          :from="origin"
          :to="yEnd"
          stroke="var(--c-text-dim)"
          stroke-width="2.4"
          pointer-events="none"
        />
        <line
          :x1="fxTip.x"
          :y1="fxTip.y"
          :x2="forceTip.x"
          :y2="forceTip.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="6 5"
          opacity="0.6"
        />
        <line
          :x1="fyTip.x"
          :y1="fyTip.y"
          :x2="forceTip.x"
          :y2="forceTip.y"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="6 5"
          opacity="0.6"
        />
        <path
          :d="`M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 0 ${arcSweep} ${arcEnd.x} ${arcEnd.y}`"
          fill="none"
          stroke="var(--c-physics)"
          stroke-width="1.8"
        />
        <CourseArrow
          :from="origin"
          :to="fxTip"
          stroke="var(--c-accent-2)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="origin"
          :to="fyTip"
          stroke="var(--c-accent)"
          stroke-width="3.2"
          pointer-events="none"
        />
        <CourseArrow
          :from="origin"
          :to="forceTip"
          stroke="var(--c-physics)"
          stroke-width="3.8"
          pointer-events="none"
        />
        <circle :cx="origin.x" :cy="origin.y" r="4" fill="var(--c-text)" />
      </svg>
      <ChartLabel
        :x-percent="pct(xEnd.x, VIEW.width)"
        :y-percent="pct(xEnd.y, VIEW.height)"
        :parts="[{ tex: 'x' }]"
        anchor="right"
        :dx="8"
        color="var(--c-text-dim)"
      />
      <ChartLabel
        :x-percent="pct(yEnd.x, VIEW.width)"
        :y-percent="pct(yEnd.y, VIEW.height)"
        :parts="[{ tex: 'y' }]"
        anchor="top-right"
        :dy="-4"
        color="var(--c-text-dim)"
      />
      <ChartLabel
        :x-percent="pct(mid(origin, forceTip).x, VIEW.width)"
        :y-percent="pct(mid(origin, forceTip).y, VIEW.height)"
        :parts="[{ tex: 'F' }]"
        anchor="top-right"
        :dx="4"
        color="var(--c-physics)"
        halo
      />
      <ChartLabel
        :x-percent="pct(mid(origin, fxTip).x, VIEW.width)"
        :y-percent="pct(mid(origin, fxTip).y, VIEW.height)"
        :parts="[{ tex: 'F_x' }]"
        anchor="bottom-right"
        :dy="-6"
        color="var(--c-accent-2)"
        halo
      />
      <ChartLabel
        :x-percent="pct(mid(origin, fyTip).x, VIEW.width)"
        :y-percent="pct(mid(origin, fyTip).y, VIEW.height)"
        :parts="[{ tex: 'F_y' }]"
        anchor="top-left"
        :dx="-6"
        color="var(--c-accent)"
        halo
      />
      <ChartLabel
        :x-percent="pct(arcLabel.x, VIEW.width)"
        :y-percent="pct(arcLabel.y, VIEW.height)"
        :parts="[{ tex: '\\alpha' }]"
        color="var(--c-physics)"
      />
    </div>

    <div class="demo-panel">
      <div class="demo-row">
        <span class="demo-name"><Latex tex="F" /></span>
        <input
          v-model.number="force"
          type="range"
          min="2"
          max="10"
          step="1"
          aria-label="力的大小"
        />
        <span class="demo-val"><Latex :tex="forceTex" /></span>
      </div>
      <div class="demo-row">
        <span class="demo-name"><Latex tex="\theta" /></span>
        <input
          v-model.number="theta"
          type="range"
          min="0"
          max="90"
          step="5"
          aria-label="力与水平方向的夹角"
        />
        <span class="demo-val"><Latex :tex="thetaTex" /></span>
      </div>
      <div class="demo-row">
        <span class="demo-name"><Latex tex="\varphi" /></span>
        <input
          v-model.number="phi"
          type="range"
          min="-30"
          max="60"
          step="5"
          aria-label="x 轴的倾角"
        />
        <span class="demo-val"><Latex :tex="phiTex" /></span>
      </div>

      <div class="demo-readout">
        <div class="mini-note"><Latex :tex="alphaTex" /></div>
        <div style="color: var(--c-accent-2)"><Latex :tex="fxTex" /></div>
        <div style="color: var(--c-accent)"><Latex :tex="fyTex" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 左图右文走共享 .split-wide；控制行 / 面板 / 读数走共享 .demo-*；小字注释走共享 .mini-note */
.demo-row {
  --demo-read: 5.4rem;
  font-size: 0.95rem;
}

.demo-val {
  font-size: 0.9rem;
}

.demo-readout {
  gap: 0.2rem;
  font-size: 0.95rem;
}
</style>
