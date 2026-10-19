<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 7 页：频率 → 能量子大小的真实计算。 滑块调电磁波的频率 ν（3.0×10^14 ～ 1.2×10^15 Hz），三条读数都是算出来的： ε = hν（同时给 J 与 eV，1 eV =
 * 1.6×10^-19 J）、λ = c/ν（并按波长给出所属波段与这种光的真实颜色）。 上方光谱条按波长铺真实颜色（紫 → 红 在左 → 右，与 λ 增大的方向一致），游标跟着滑块走。
 */

const H = 6.626e-34;
const C = 2.998e8;
const EV = 1.6e-19;

/** 光谱条覆盖的波长范围（nm），与滑块的频率范围一一对应 */
const LAM_LO = 250;
const LAM_HI = 1000;
const VIS_LO = 400;
const VIS_HI = 760;

/** 光谱条几何（viewBox 用户单位） */
const BAR_X0 = 40;
const BAR_X1 = 920;
const BAR_Y0 = 34;
const BAR_Y1 = 78;

/** 滑块读数：频率以 10^14 Hz 为一格（3.0 ～ 12.0），默认 5.0×10^14 Hz（约 600 nm，橙光） */
const nu14 = ref(5);
const frequency = computed(() => nu14.value * 1e14);
const energyJ = computed(() => H * frequency.value);
const energyEv = computed(() => energyJ.value / EV);
const lambdaNm = computed(() => (C / frequency.value) * 1e9);

/** 科学计数法 → KaTeX 源码，如 3.31\times 10^{-19} */
const sciTex = (value: number, digits = 2): string => {
  const exp = Math.floor(Math.log10(value));
  const mant = value / 10 ** exp;
  return `${mant.toFixed(digits)}\\times 10^{${exp}}`;
};

const energyTex = computed(
  () =>
    `\\varepsilon = h\\nu = ${sciTex(energyJ.value)}\\ \\text{J} = ${energyEv.value.toFixed(2)}\\ \\text{eV}`,
);
const lambdaTex = computed(
  () => `\\lambda = \\dfrac{c}{\\nu} = ${lambdaNm.value.toFixed(1)}\\ \\text{nm}`,
);

/** 波长（nm）→ 颜色：可见光波长与颜色的对应（布鲁顿近似）；红外/紫外不可见，给中性灰 */
const wavelengthToHex = (nm: number): string => {
  if (nm < 380 || nm > 780) return "#8b93a5";
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm < 440) {
    r = -(nm - 440) / 60;
    b = 1;
  } else if (nm < 490) {
    g = (nm - 440) / 50;
    b = 1;
  } else if (nm < 510) {
    g = 1;
    b = -(nm - 510) / 20;
  } else if (nm < 580) {
    r = (nm - 510) / 70;
    g = 1;
  } else if (nm < 645) {
    r = 1;
    g = -(nm - 645) / 65;
  } else {
    r = 1;
  }
  const channel = (value: number) => Math.round(255 * Math.max(0, Math.min(1, value)) ** 0.8);
  return `#${[channel(r), channel(g), channel(b)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
};

/** 所属波段与这种光的名字（波长口径与教材一致：400–760 nm 为可见光） */
const band = computed(() => {
  const lam = lambdaNm.value;
  if (lam > VIS_HI) return { name: "红外线（不可见）" };
  if (lam < VIS_LO) return { name: "紫外线（不可见）" };
  if (lam >= 620) return { name: "红光" };
  if (lam >= 590) return { name: "橙光" };
  if (lam >= 570) return { name: "黄光" };
  if (lam >= 495) return { name: "绿光" };
  if (lam >= 450) return { name: "青光" };
  if (lam >= 420) return { name: "蓝光" };
  return { name: "紫光" };
});

const lightColor = computed(() => wavelengthToHex(lambdaNm.value));

/** 游标在光谱条上的位置（λ 越小越靠左，与横轴同向） */
const markerX = computed(() =>
  Math.round(BAR_X0 + ((lambdaNm.value - LAM_LO) / (LAM_HI - LAM_LO)) * (BAR_X1 - BAR_X0)),
);
const labelX = (lam: number): number =>
  Math.round(BAR_X0 + ((lam - LAM_LO) / (LAM_HI - LAM_LO)) * (BAR_X1 - BAR_X0));

const aria = computed(
  () =>
    `频率 ${nu14.value.toFixed(1)}×10^14 Hz，能量子 ${energyJ.value.toExponential(2)} 焦耳` +
    `，波长 ${lambdaNm.value.toFixed(1)} 纳米，属于${band.value.name}`,
);
</script>

<template>
  <div class="pe">
    <svg
      class="pe-strip"
      viewBox="0 0 960 108"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="aria"
    >
      <defs>
        <linearGradient id="pe-visible" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#5400ff" />
          <stop offset="17%" stop-color="#00c0ff" />
          <stop offset="34%" stop-color="#5cff00" />
          <stop offset="50%" stop-color="#ffff00" />
          <stop offset="67%" stop-color="#ff6e00" />
          <stop offset="100%" stop-color="#ff0000" />
        </linearGradient>
      </defs>
      <rect x="40" :y="BAR_Y0" width="176" :height="BAR_Y1 - BAR_Y0" fill="#1b2135" />
      <rect
        :x="labelX(400)"
        :y="BAR_Y0"
        :width="labelX(760) - labelX(400)"
        :height="BAR_Y1 - BAR_Y0"
        fill="url(#pe-visible)"
      />
      <rect
        :x="labelX(760)"
        :y="BAR_Y0"
        :width="BAR_X1 - labelX(760)"
        :height="BAR_Y1 - BAR_Y0"
        fill="#2a1416"
      />
      <text x="128" y="98" font-size="17" text-anchor="middle" fill="var(--c-text-dim)">
        紫外线
      </text>
      <text :x="labelX(580)" y="98" font-size="17" text-anchor="middle" fill="var(--c-text-dim)">
        可见光
      </text>
      <text x="779" y="98" font-size="17" text-anchor="middle" fill="var(--c-text-dim)">
        红外线
      </text>
      <g>
        <text :x="markerX" y="17" font-size="20" text-anchor="middle" :fill="lightColor">
          <tspan font-family="KaTeX_Math" font-style="italic">λ</tspan>
          <tspan font-family="KaTeX_Main" font-style="normal" dx="4">
            = {{ lambdaNm.toFixed(1) }} nm
          </tspan>
        </text>
        <polygon :points="`${markerX - 7},22 ${markerX + 7},22 ${markerX},31`" :fill="lightColor" />
        <line
          :x1="markerX"
          :y1="34"
          :x2="markerX"
          :y2="78"
          :stroke="lightColor"
          stroke-width="3.4"
        />
      </g>
    </svg>

    <CourseSlider
      v-model="nu14"
      :min="3"
      :max="12"
      :step="0.1"
      label="频率"
      label-tex="\nu"
      accent="gold"
    >
      <template #value>{{ nu14.toFixed(1) }}<Latex tex="\times 10^{14}\ \text{Hz}" /></template>
    </CourseSlider>

    <div class="pe-read">
      <Latex :tex="energyTex" display />
      <div class="pe-row">
        <Latex :tex="lambdaTex" />
        <span class="pe-tag">
          <span class="pe-dot" :style="{ backgroundColor: lightColor }" />
          {{ band.name }}
        </span>
      </div>
      <div class="pe-note"><Latex tex="1\ \text{eV} = 1.6\times 10^{-19}\ \text{J}" /></div>
    </div>
  </div>
</template>

<style scoped>
.pe {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
  min-width: 0;
}

.pe-strip {
  display: block;
  width: 100%;
  height: auto;
}

.pe-read {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
}

.pe-row {
  display: flex;
  gap: 0.7rem;
  align-items: center;
}

.pe-tag {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;

  padding: 0.12rem 0.65rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);

  background: var(--c-surface);
  color: var(--c-text);

  font-size: 0.88rem;
  line-height: 1.5;
}

.pe-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
}

.pe-note {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}
</style>
