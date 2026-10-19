<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 7 页交互：近地卫星"一个周期称出密度"。
 *
 * 卫星绕天体做匀速圆周运动，轨道半径 r、周期 T，天体半径 R、质量 M： M = 4π²r³/(G T²) —— 测出 r、T 得到中心天体质量 ρ = M/V = M /
 * ((4/3)πR³) = 3πr³/(G T² R³) 近地轨道 r ≈ R 时，上式化为 ρ = 3π/(G T²)：只要测出环绕周期就能算出密度。
 *
 * 组件里卫星走的是**真实轨道**：给定 r 后按开普勒关系 T = 2π√(r³/(GM)) 算出周期， 于是完整公式给出的密度与 r 无关（就是 M/((4/3)πR³)）； 同时给出"忽略
 * r/R、直接套近地公式"的结果，让 r/R 从 1 拉大时误差从 0 开始变大。
 */

/** 万有引力常量，按教材取 6.67×10⁻¹¹ N·m²/kg² */
const G = 6.67e-11;
const { PI } = Math;

interface Body {
  /** 天体名 */
  name: string;
  /** 质量（kg），取公认值 */
  mass: number;
  /** 半径（m） */
  radius: number;
  /** 图元种类 */
  kind: "earth" | "moon" | "planet";
}

const BODIES: Body[] = [
  { name: "地球", mass: 5.98e24, radius: 6.4e6, kind: "earth" },
  { name: "月球", mass: 7.35e22, radius: 1.74e6, kind: "moon" },
  { name: "火星", mass: 6.42e23, radius: 3.39e6, kind: "planet" },
];

const bodyIndex = ref(0);
/** 轨道半径与天体半径之比 r/R（1 = 贴着表面飞） */
const ratio = ref(1);

const body = computed(() => BODIES[bodyIndex.value]);
const radius = computed(() => body.value.radius * ratio.value);
/** 真实轨道上的周期：T = 2π√(r³/(GM)) */
const period = computed(() => 2 * PI * Math.sqrt(radius.value ** 3 / (G * body.value.mass)));
/** 完整公式算出的密度：ρ = 3πr³/(G T² R³)（等于 M/((4/3)πR³)，与 r 无关） */
const density = computed(
  () => (3 * PI * radius.value ** 3) / (G * period.value ** 2 * body.value.radius ** 3),
);
/** 忽略 r/R、直接用近地公式：ρ' = 3π/(G T²) */
const nearDensity = computed(() => (3 * PI) / (G * period.value ** 2));
/** 近地公式相对完整公式的偏差（%） */
const deviation = computed(() => ((nearDensity.value - density.value) / density.value) * 100);
const deviationText = computed(
  () => `${deviation.value >= 0 ? "+" : "−"}${Math.abs(deviation.value).toFixed(1)}`,
);
/** 周期换算成小时，给个直观参照 */
const periodHour = computed(() => period.value / 3600);

/**
 * 把数值写成 a×10ᵇ + 单位 的整段 LaTeX（数字与量级之间不会夹进 HTML 空格）
 *
 * @param value 数值
 * @param digits 有效数字位数
 * @param unitTex 单位（LaTeX 片段，如 `\text{kg/m}^3`）
 * @returns 该数的 LaTeX 源码
 */
const sciTex = (value: number, digits: number, unitTex: string): string => {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = (value / 10 ** exponent).toFixed(digits - 1);

  return `${mantissa}\\times10^{${exponent}}\\ ${unitTex}`;
};

const radiusTex = computed(() => sciTex(radius.value, 3, String.raw`\text{m}`));
const periodTex = computed(() => sciTex(period.value, 3, String.raw`\text{s}`));
const densityTex = computed(() => sciTex(density.value, 3, String.raw`\text{kg/m}^3`));
const nearTex = computed(() => sciTex(nearDensity.value, 3, String.raw`\text{kg/m}^3`));

/** 图：天体半径固定 35 个用户单位（画幅 260×220 里最大到 3 倍半径），轨道半径按 r/R 等比画出来 */
const ORBIT_UNIT = 35;
const orbitR = computed(() => ORBIT_UNIT * ratio.value);
</script>

<template>
  <div class="dl">
    <div class="dl-panel">
      <div class="dl-btns">
        <button
          v-for="(item, index) in BODIES"
          :key="item.name"
          class="dl-btn"
          :class="{ 'dl-btn-on': index === bodyIndex }"
          type="button"
          @click="bodyIndex = index"
        >
          {{ item.name }}
        </button>
      </div>
      <div class="dl-slider-row">
        <span class="dl-label"
          >轨道高度 <Latex tex="r/R" /> = <b class="dl-num">{{ ratio.toFixed(1) }}</b></span
        >
        <input v-model.number="ratio" class="dl-slider" type="range" min="1" max="3" step="0.1" />
      </div>
      <div class="dl-grid">
        <div class="dl-cell">
          <div class="dl-label">轨道半径 <Latex tex="r" /></div>
          <div class="dl-value"><Latex :tex="radiusTex" /></div>
        </div>
        <div class="dl-cell">
          <div class="dl-label">环绕周期 <Latex tex="T" /></div>
          <div class="dl-value"><Latex :tex="periodTex" /></div>
          <div class="dl-hint">
            <Latex :tex="`\\approx ${periodHour.toFixed(1)}\\ \\text{h}`" />
          </div>
        </div>
      </div>
      <div class="dl-grid">
        <div class="dl-cell">
          <div class="dl-label"><Latex tex="\rho = \frac{3\pi r^3}{G T^2 R^3}" /></div>
          <div class="dl-value"><Latex :tex="densityTex" /></div>
        </div>
        <div class="dl-cell">
          <div class="dl-label">忽略 <Latex tex="r/R" />：<Latex tex="3\pi/(GT^2)" /></div>
          <div class="dl-value dl-dim"><Latex :tex="nearTex" /></div>
          <div class="dl-hint">相差 {{ deviationText }}%</div>
        </div>
      </div>
    </div>
    <div class="dl-fig">
      <svg
        viewBox="0 0 260 220"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="天体与贴着它表面或更高处的卫星轨道"
      >
        <circle
          cx="130"
          cy="110"
          :r="orbitR"
          fill="none"
          stroke="rgba(96,165,250,0.65)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <CelestialEarth v-if="body.kind === 'earth'" :x="130" :y="110" :r="ORBIT_UNIT" />
        <CelestialMoon v-else-if="body.kind === 'moon'" :x="130" :y="110" :r="ORBIT_UNIT" />
        <CelestialPlanet v-else :x="130" :y="110" :r="ORBIT_UNIT" variant="red" />
        <CourseArrow
          :from="{ x: 130, y: 110 }"
          :to="{ x: 130, y: 110 - ORBIT_UNIT }"
          stroke="#94a3b8"
          stroke-width="2.4"
          label="R"
          :label-dx="10"
          :label-dy="1"
        />
        <line
          x1="130"
          y1="110"
          :x2="130 + orbitR - 6"
          y2="110"
          stroke="rgba(203,213,225,0.6)"
          stroke-width="1.8"
          stroke-dasharray="5 4"
        />
        <text
          :x="130 + orbitR + 12"
          y="104"
          text-anchor="start"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="#cbd5e1"
        >
          r
        </text>
        <circle :cx="130 + orbitR" cy="110" r="6" fill="#e2a846" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.dl {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.dl-panel {
  display: flex;
  flex: 0 0 58%;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
}

.dl-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.dl-btn {
  padding: 0.16rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: 2rem;

  background: transparent;
  color: var(--c-text-dim);

  font-size: 0.78rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.dl-btn-on {
  border-color: rgb(226 168 70 / 55%);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.dl-btn:hover {
  filter: brightness(1.2);
}

.dl-slider-row {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.dl-label {
  color: var(--c-text);
  font-size: 0.88rem;
}

.dl-num {
  color: var(--c-accent);
  font-size: 1.05rem;
}

.dl-slider {
  flex: 1 1 auto;
  min-width: 0;
  accent-color: var(--c-accent);
}

.dl-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.dl-cell {
  min-width: 0;
}

.dl-value {
  color: var(--c-accent);
  font-size: 1rem;
}

.dl-dim {
  color: var(--c-text-dim);
}

.dl-hint {
  color: var(--c-text-dim);
  font-size: 0.8rem;
}

.dl-fig {
  display: flex;
  flex: 0 0 32%;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.dl-fig svg {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
</style>
