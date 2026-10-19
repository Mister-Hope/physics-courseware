<!--
  选必二 1.4 质谱仪 · 加速电压与磁场对落点的影响（P5 全页交互）
  ── 几何（与 MassSpectrometerFigure.vue 共用同一套坐标与比例，改这里必须同步改另一个组件）──
     viewBox 640×340。离子沿 y = 292 水平向右、从缝 S3 垂直进入匀强磁场（裸 ×，垂直纸面向里），
     做半圆后回到同一竖直平面 x = 214（底片 D 就是这条线上的长条，S3 是它留出的窄缝）——
     180° 磁谱仪：落点到缝的距离正好是轨迹直径 2r。
  ── 物理 ──
     r = (1/B)·√(2mU/q)：粒子对、U、B 都真算。画布里两条半圆用同一个比例尺（线性映射），
     所以 r₁/r₂ 的真实比例被严格保持（比值只由质量比决定，与 U、B 无关）；只对"整幅大小"做了
     柔和封顶（x = 理想半径/R_MAX，k = k₀/(1+x⁸)^(1/8)），保证任何 U、B 下都不会滑出画面：
     U 变大、B 变小 → 两条半径一起变大、落点间距拉开；U 变小、B 变大 → 一起收紧。
  ── 读数 ──
     r₁、r₂、落点间距 Δd = 2(r₂−r₁) 都给真实的毫米值，另有恒定的 r₁/r₂ = √(m₁/m₂)。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

/* ── 共用几何（与 MassSpectrometerFigure.vue 完全一致）────────────────────── */
const VB = { w: 640, h: 340 };
/** 束流高度：离子沿这条水平线进入磁场 */
const BEAM_Y = 292;
/** 底片 D / 缝 S3 所在的竖直平面（也是磁场区左边界） */
const PLATE_X = 214;
/** 磁场区（匀强磁场铺满的区域） */
const FIELD = { x: 214, y: 20, w: 392, h: 306 };
/** 半圆最大可画半径：落点最高到 y = BEAM_Y − 2 × R_MAX = 32，正好落在磁场区上边界（20）以内 */
const R_MAX = 130;
const SLIT_LIP_UP = { from: 274, to: 286 };
const SLIT_LIP_DOWN = { from: 298, to: 310 };
const TICK_X = 207;
const tickHalf = 5.5;

/** 半圆轨迹：从缝 S3 沿 +x 进入、向上偏转，转过 180° 回到同一竖直平面（落点 = 2r） */
const arcPath = (r: number): string =>
  `M ${PLATE_X} ${BEAM_Y} A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 0 ${PLATE_X} ${(BEAM_Y - 2 * r).toFixed(2)}`;

/* ── 粒子对与真实物理量 ─────────────────────────────────────────────────── */
const Q = 1.6e-19; // 元电荷，C
const ATOMIC_MASS = 1.66e-27; // kg
const PAIRS = [
  {
    key: "ne",
    name: "氖-20 / 氖-22",
    m1: 20 * ATOMIC_MASS,
    m2: 22 * ATOMIC_MASS,
    label1: "20",
    label2: "22",
  },
  { key: "h", name: "氢-1 / 氢-2", m1: 1.67e-27, m2: 3.34e-27, label1: "1", label2: "2" },
] as const;

const pair = ref<string>("ne");
const massU = ref(1000); // V
const fieldB = ref(0.25); // T

const pairData = computed(() => PAIRS.find((p) => p.key === pair.value) ?? PAIRS[0]);

/** R = (1/B)·√(2mU/q)，单位 m（真实值，读数再换算成 mm） */
const radius = (m: number, u: number, b: number): number => (1 / b) * Math.sqrt((2 * m * u) / Q);
const r1 = computed(() => radius(pairData.value.m1, massU.value, fieldB.value));
const r2 = computed(() => radius(pairData.value.m2, massU.value, fieldB.value));
const r1Mm = computed(() => r1.value * 1000);
const r2Mm = computed(() => r2.value * 1000);

/* ── 真实半径 → 画布用户单位 ─────────────────────────────────────────────── */
/** 参考半径：当前粒子对在 U = 1000 V、B = 0.25 T 下的 r₂（让默认视图的大小稳定、好看） */
const r2RefMm = computed(() => radius(pairData.value.m2, 1000, 0.25) * 1000);
/** 理想比例尺（px per mm）：默认状态占画布 3/4 高 */
const kIdeal = computed(() => (0.75 * R_MAX) / r2RefMm.value);
/** 柔和封顶后的比例尺：r₁、r₂ 共用它，真实比值不变，且 r₂ 永远 ≤ R_MAX */
const kPx = computed(() => {
  const x = (kIdeal.value * r2Mm.value) / R_MAX;
  return kIdeal.value / (1 + x ** 8) ** (1 / 8);
});
const rho1 = computed(() => kPx.value * r1Mm.value);
const rho2 = computed(() => kPx.value * r2Mm.value);
const arcBig = computed(() => arcPath(rho2.value));
const arcSmall = computed(() => arcPath(rho1.value));
/** 两条半圆在底片上的落点高度 */
const hitBig = computed(() => BEAM_Y - 2 * rho2.value);
const hitSmall = computed(() => BEAM_Y - 2 * rho1.value);
/** 较轻那个的落点数字：比上面那个再低 22，且不压到束流线 */
const labelSmallY = computed(() => Math.min(hitSmall.value + 22, BEAM_Y - 4));

/** R₁/r₂ = √(m₁/m₂)：只由质量比决定，拖 U、B 都不变 */
const ratio = computed(() => Math.sqrt(pairData.value.m1 / pairData.value.m2));

/* ── 读数（真实毫米值）────────────────────────────────────────────────────── */
const r1Tex = computed(() => `r_1 = ${r1Mm.value.toFixed(1)}\\ \\text{mm}`);
const r2Tex = computed(() => `r_2 = ${r2Mm.value.toFixed(1)}\\ \\text{mm}`);
const gapTex = computed(() => `${(2 * (r2Mm.value - r1Mm.value)).toFixed(1)}\\ \\text{mm}`);
const ratioTex = computed(
  () => `\\dfrac{r_1}{r_2} = \\sqrt{\\dfrac{m_1}{m_2}} = ${ratio.value.toFixed(3)}`,
);
const uTex = computed(() => `${massU.value}\\ \\text{V}`);
const bTex = computed(() => `${fieldB.value.toFixed(2)}\\ \\text{T}`);

const selectPair = (key: string): void => {
  pair.value = key;
};
const onU = (e: Event): void => {
  massU.value = Number((e.target as HTMLInputElement).value);
};
const onB = (e: Event): void => {
  fieldB.value = Number((e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="msl-wrap">
    <div class="msl-fig" :style="{ aspectRatio: `${VB.w} / ${VB.h}` }">
      <svg
        class="msl-svg"
        viewBox="0 0 640 340"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="质谱仪中两种同位素的半圆轨迹与落点"
      >
        <!-- 磁场区：边界 + 匀强磁场阵列（裸 × ＝ 垂直纸面向里，不再画 ⊗B 图例） -->
        <rect
          :x="FIELD.x"
          :y="FIELD.y"
          :width="FIELD.w"
          :height="FIELD.h"
          fill="var(--c-accent)"
          opacity="0.06"
        />
        <rect
          :x="FIELD.x"
          :y="FIELD.y"
          :width="FIELD.w"
          :height="FIELD.h"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          opacity="0.45"
        />
        <FieldDots :x="239" :y="40" :cols="10" :rows="8" :spacing="38" dir="in" :opacity="0.5" />
        <text
          class="msl-halo msl-math"
          x="582"
          y="54"
          text-anchor="middle"
          font-size="30"
          fill="var(--c-accent)"
        >
          B
        </text>
        <!-- 照相底片 D：竖直长条，两种离子按半径大小打在它不同的高度上 -->
        <rect
          :x="PLATE_X - 3.5"
          y="20"
          width="7"
          height="266"
          rx="3"
          fill="var(--c-neutral-200)"
          opacity="0.75"
        />
        <text
          class="msl-halo msl-math"
          :x="PLATE_X"
          y="15"
          text-anchor="middle"
          font-size="18"
          fill="var(--c-neutral-200)"
        >
          D
        </text>
        <!-- 缝 S3：底片上的窄缝，离子在这里垂直进入磁场 -->
        <line
          :x1="PLATE_X"
          :y1="SLIT_LIP_UP.from"
          :x2="PLATE_X"
          :y2="SLIT_LIP_UP.to"
          stroke="var(--c-neutral-200)"
          stroke-width="7"
          opacity="0.75"
        />
        <line
          :x1="PLATE_X"
          :y1="SLIT_LIP_DOWN.from"
          :x2="PLATE_X"
          :y2="SLIT_LIP_DOWN.to"
          stroke="var(--c-neutral-200)"
          stroke-width="7"
          opacity="0.75"
        />
        <text
          class="msl-halo msl-main"
          :x="PLATE_X - 18"
          y="318"
          text-anchor="end"
          font-size="16"
          fill="var(--c-text-dim)"
        >
          S
        </text>
        <text
          class="msl-halo msl-main"
          :x="PLATE_X - 9"
          y="322"
          text-anchor="end"
          font-size="11"
          fill="var(--c-text-dim)"
        >
          3
        </text>
        <!-- 加速电场：两块平行极板 + 电势差 U -->
        <line x1="128" y1="252" x2="128" y2="332" stroke="var(--c-text)" stroke-width="3" />
        <line x1="180" y1="252" x2="180" y2="332" stroke="var(--c-text)" stroke-width="3" />
        <CourseArrow
          :from="{ x: 138, y: 266 }"
          :to="{ x: 170, y: 266 }"
          stroke="var(--c-accent-2)"
          :stroke-width="2.6"
        />
        <CourseArrow
          :from="{ x: 138, y: 318 }"
          :to="{ x: 170, y: 318 }"
          stroke="var(--c-accent-2)"
          :stroke-width="2.6"
        />
        <text
          class="msl-halo msl-math"
          x="154"
          y="242"
          text-anchor="middle"
          font-size="26"
          fill="var(--c-accent-2)"
        >
          U
        </text>
        <!-- 电离室 A 与缝 S1 -->
        <rect
          x="22"
          y="262"
          width="56"
          height="60"
          rx="10"
          fill="var(--c-surface)"
          stroke="var(--c-text)"
          stroke-width="2.4"
        />
        <text
          x="50"
          y="303"
          text-anchor="middle"
          class="msl-math"
          font-size="26"
          fill="var(--c-neutral-50)"
        >
          A
        </text>
        <line x1="94" y1="262" x2="94" y2="286" stroke="var(--c-text-dim)" stroke-width="2.4" />
        <line x1="94" y1="298" x2="94" y2="322" stroke="var(--c-text-dim)" stroke-width="2.4" />
        <text
          class="msl-halo msl-main"
          x="88"
          y="254"
          text-anchor="end"
          font-size="16"
          fill="var(--c-text-dim)"
        >
          S
        </text>
        <text
          class="msl-halo msl-main"
          x="97"
          y="258"
          text-anchor="end"
          font-size="11"
          fill="var(--c-text-dim)"
        >
          1
        </text>
        <!-- 束流：A → S1 → 两块极板 → 缝 S3 -->
        <line
          x1="78"
          y1="292"
          x2="94"
          y2="292"
          stroke="var(--c-neutral-200)"
          stroke-width="2.4"
          opacity="0.85"
        />
        <line
          x1="94"
          y1="292"
          :x2="PLATE_X"
          y2="292"
          stroke="var(--c-neutral-200)"
          stroke-width="2.4"
          opacity="0.85"
        />
        <!-- 两条半圆轨迹：半径大的是较重的那个（蓝），小的是较轻的（金） -->
        <path
          :d="arcBig"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          :d="arcSmall"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <!-- 落点：短竖线 + 质量数 -->
        <line
          :x1="TICK_X"
          :y1="hitBig - tickHalf"
          :x2="TICK_X"
          :y2="hitBig + tickHalf"
          stroke="var(--c-accent-2)"
          stroke-width="2.6"
        />
        <line
          :x1="TICK_X"
          :y1="hitSmall - tickHalf"
          :x2="TICK_X"
          :y2="hitSmall + tickHalf"
          stroke="var(--c-accent)"
          stroke-width="2.6"
        />
        <text
          class="msl-halo msl-main"
          x="201"
          :y="hitBig + 6"
          text-anchor="end"
          font-size="16"
          fill="var(--c-accent-2)"
        >
          {{ pairData.label2 }}
        </text>
        <text
          class="msl-halo msl-main"
          x="201"
          :y="labelSmallY"
          text-anchor="end"
          font-size="16"
          fill="var(--c-accent)"
        >
          {{ pairData.label1 }}
        </text>
      </svg>
    </div>

    <!-- 右栏：粒子对 / 加速电压 U · 磁感应强度 B / 三张读数卡 / 半径比高亮行 -->
    <div class="msl-panel">
      <div class="msl-group">
        <span class="msl-title mini-note">粒子对</span>
        <div class="msl-pairs">
          <button
            v-for="p in PAIRS"
            :key="p.key"
            type="button"
            class="msl-pair"
            :class="{ 'msl-pair-on': p.key === pair }"
            @click="selectPair(p.key)"
          >
            {{ p.name }}
          </button>
        </div>
      </div>

      <div class="msl-sliders">
        <label class="msl-group msl-slider">
          <span class="msl-slider-head">
            <span class="msl-slider-name"><Latex tex="U" /></span>
            <span class="msl-slider-val" style="color: var(--c-accent-2)">
              <Latex :tex="uTex" />
            </span>
          </span>
          <input
            class="msl-range"
            type="range"
            min="100"
            max="2000"
            step="50"
            :value="massU"
            style="accent-color: var(--c-accent-2)"
            @input="onU"
          />
        </label>
        <label class="msl-group msl-slider">
          <span class="msl-slider-head">
            <span class="msl-slider-name"><Latex tex="B" /></span>
            <span class="msl-slider-val" style="color: var(--c-accent)">
              <Latex :tex="bTex" />
            </span>
          </span>
          <input
            class="msl-range"
            type="range"
            min="0.05"
            max="0.5"
            step="0.01"
            :value="fieldB"
            style="accent-color: var(--c-accent)"
            @input="onB"
          />
        </label>
      </div>

      <!-- 读数：两条半径、落点间距（真实毫米值） -->
      <div class="msl-readout">
        <div class="msl-card">
          <span class="msl-tag mini-note">轨道半径 <Latex tex="r_1" /></span>
          <Latex :tex="r1Tex" class="msl-tex" />
        </div>
        <div class="msl-card">
          <span class="msl-tag mini-note">轨道半径 <Latex tex="r_2" /></span>
          <Latex :tex="r2Tex" class="msl-tex" />
        </div>
        <div class="msl-card">
          <span class="msl-tag mini-note">落点间距 <Latex tex="\Delta d = 2(r_2 - r_1)" /></span>
          <Latex :tex="gapTex" class="msl-tex" />
        </div>
      </div>

      <!-- 恒定的半径比：只由质量比决定，拖动 U、B 都不变 -->
      <div class="msl-key">
        <Latex :tex="ratioTex" class="msl-tex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── 左右两栏：左图右面板。总高 = max(图栏, 面板)，不是两者相加 ──
   容器宽 883px 时：面板固定 15rem = 330px（最宽的读数卡 ≈ 313px，留 17px 余量），
   图栏 540px（SVG 按 640×340 比例 ≈ 287 高、封顶 300）——两栏都是 345px 高（由面板内容决定），
   比"图 + 控件 + 读数"上下堆叠省下近一半高度。 */
.msl-wrap {
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  align-items: stretch;

  width: 100%;
  min-width: 0;
}

/* 左栏：图。宽度自适应，高度由 SVG 比例决定（上限 300px），垂直居中 */
.msl-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.msl-svg {
  display: block;

  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 300px;
}

/* 右栏：控件 + 读数，固定宽度 */
.msl-panel {
  display: flex;
  flex: 0 0 15rem;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 0;
}

/* 图内文字：深色光晕垫底，压在磁场叉点阵列上也读得清 */
.msl-halo {
  paint-order: stroke;
  stroke: var(--c-bg);
  stroke-linejoin: round;
  stroke-width: 4px;
}

.msl-math {
  font-style: italic;
  font-family: "KaTeX_Math", "Times New Roman", serif;
}

.msl-main {
  font-family: "KaTeX_Main", "Times New Roman", serif;
}

/* ── 控件 ── */
.msl-group {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.msl-title {
  color: var(--c-text-dim);
}

.msl-pairs {
  display: flex;
  gap: 0.35rem;
}

.msl-pair {
  padding: 0.22rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-size: 0.85rem;
  font-family: inherit;
  line-height: 1.4;
  white-space: nowrap;

  cursor: pointer;
}

.msl-pair-on {
  border-color: var(--c-accent);
  background: var(--c-accent-soft);
  color: var(--c-accent);
  font-weight: 700;
}

.msl-sliders {
  display: flex;
  gap: 1rem;
}

.msl-slider {
  flex: 1 1 0;
}

.msl-slider-head {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  justify-content: space-between;

  line-height: 1.3;
}

.msl-slider-name {
  font-weight: 700;
  font-size: 1rem;
}

.msl-slider-val {
  font-weight: 800;
  white-space: nowrap;
}

.msl-range {
  width: 100%;
  height: 1.05rem;
  margin: 0;
  cursor: pointer;
}

/* ── 读数：三行卡片（标签在左、读数在右）── */
.msl-readout {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 0.28rem;
}

.msl-card {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  justify-content: space-between;

  min-width: 0;
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);
}

.msl-tag {
  flex: 0 1 auto;
  min-width: 0;
  color: var(--c-text-dim);
  font-size: 0.78rem;
}

.msl-tex {
  flex: 0 0 auto;
  font-size: 0.95rem;
  white-space: nowrap;
}

/* ── 半径比高亮行 ── */
.msl-key {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;

  padding: 0.12rem 0.5rem;
  border: 1px solid var(--c-accent);
  border-radius: var(--radius-md);

  background: var(--c-accent-soft);
  color: var(--c-accent);
}
</style>
