<script setup lang="ts">
import { computed, ref, watch } from "vue";

/**
 * 第 4、5 页交互：用环绕天体的轨道"称"中心天体。
 *
 * 行星绕太阳做匀速圆周运动，向心力由万有引力提供： G·m·M/r² = m·4π²r/T² —— 环绕天体的质量 m 两边约掉， 于是 M = 4π²r³/(G T²)：测出轨道半径 r
 * 和公转周期 T，只能算出中心天体的质量。
 */

/** 万有引力常量，按教材取 6.67×10⁻¹¹ N·m²/kg² */
const G = 6.67e-11;
/** 圆周率取到足够位数，保证算出的天体质量对得上公认值 */
const { PI } = Math;

interface Preset {
  /** 按钮文字 */
  button: string;
  /** 中心天体名 */
  center: string;
  /** 环绕天体名 */
  orbiting: string;
  /** 中心天体图元 */
  centerKind: "sun" | "earth" | "planet";
  /** 环绕天体图元 */
  orbitingKind: "earth" | "moon";
  /** 轨道半径 r（m） */
  r: number;
  /** 公转周期 T（s） */
  t: number;
  /** 中心天体公认质量（kg） */
  reference: number;
  /** 公认质量的 LaTeX 写法 */
  referenceTex: string;
}

/** 四个真实观测样本：地球、火星绕太阳 → 同一个太阳质量；月球绕地球、木卫一绕木星 → 各自中心天体 */
const PRESETS: Preset[] = [
  {
    button: "地球绕太阳",
    center: "太阳",
    orbiting: "地球",
    centerKind: "sun",
    orbitingKind: "earth",
    r: 1.496e11,
    t: 3.156e7,
    reference: 1.99e30,
    referenceTex: String.raw`1.99\times10^{30}`,
  },
  {
    button: "火星绕太阳",
    center: "太阳",
    orbiting: "火星",
    centerKind: "sun",
    orbitingKind: "earth",
    r: 2.279e11,
    t: 5.935e7,
    reference: 1.99e30,
    referenceTex: String.raw`1.99\times10^{30}`,
  },
  {
    button: "月球绕地球",
    center: "地球",
    orbiting: "月球",
    centerKind: "earth",
    orbitingKind: "moon",
    r: 3.844e8,
    t: 2.361e6,
    reference: 5.98e24,
    referenceTex: String.raw`5.98\times10^{24}`,
  },
  {
    button: "木卫绕木星",
    center: "木星",
    orbiting: "木卫一",
    centerKind: "planet",
    orbitingKind: "moon",
    r: 4.217e8,
    t: 1.529e5,
    reference: 1.9e27,
    referenceTex: String.raw`1.90\times10^{27}`,
  },
];

const presetIndex = ref(0);
/** 轨道半径的调整倍率（1 = 该样本的观测值） */
const rScale = ref(1);
/** 公转周期的调整倍率 */
const tScale = ref(1);

const current = computed(() => PRESETS[presetIndex.value]);

/** 切换样本时回到该样本的观测值 */
watch(presetIndex, () => {
  rScale.value = 1;
  tScale.value = 1;
});

const radius = computed(() => current.value.r * rScale.value);
const period = computed(() => current.value.t * tScale.value);

/** M = 4π²r³/(GT²) —— 真实公式，随 r、T 实时变化 */
const mass = computed(() => (4 * PI ** 2 * radius.value ** 3) / (G * period.value ** 2));

/** 与公认值的相对偏差（%） */
const deviation = computed(
  () => ((mass.value - current.value.reference) / current.value.reference) * 100,
);
const deviationText = computed(
  () => `${deviation.value >= 0 ? "+" : "−"}${Math.abs(deviation.value).toFixed(2)}`,
);

/**
 * 把数值写成 a×10ᵇ 的两段（a 保留 digits 位有效数字）
 *
 * @param value 数值
 * @param digits 有效数字位数
 * @returns 尾数与量级
 */
const sci = (value: number, digits = 3): { mantissa: string; exponent: number } => {
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** exponent;

  return { mantissa: mantissa.toFixed(digits - 1), exponent };
};

/**
 * 写成整段 KaTeX：数字与量级之间不会夹进 HTML 空格
 *
 * @param value 数值
 * @param digits 有效数字位数
 * @param unit 单位（`\text{}` 里的内容，如 m、kg）
 * @returns 整段公式的 LaTeX 源码
 */
const sciTex = (value: number, digits: number, unit: string): string => {
  const { mantissa, exponent } = sci(value, digits);

  return `${mantissa}\\times10^{${exponent}}\\ \\text{${unit}}`;
};

const radiusTex = computed(() => sciTex(radius.value, 4, "m"));
const periodTex = computed(() => sciTex(period.value, 4, "s"));
const massTex = computed(() => sciTex(mass.value, 3, "kg"));
</script>

<template>
  <div class="cm">
    <div class="cm-panel">
      <div class="cm-btns">
        <button
          v-for="(preset, index) in PRESETS"
          :key="preset.button"
          class="cm-btn"
          :class="{ 'cm-btn-on': index === presetIndex }"
          type="button"
          @click="presetIndex = index"
        >
          {{ preset.button }}
        </button>
      </div>
      <div class="cm-row">
        轨道半径 <Latex tex="r" /> = <b class="cm-num"><Latex :tex="radiusTex" /></b>
      </div>
      <input
        v-model.number="rScale"
        class="cm-slider"
        type="range"
        min="0.6"
        max="1.4"
        step="0.02"
      />
      <div class="cm-row">
        公转周期 <Latex tex="T" /> = <b class="cm-num"><Latex :tex="periodTex" /></b>
      </div>
      <input
        v-model.number="tScale"
        class="cm-slider"
        type="range"
        min="0.6"
        max="1.4"
        step="0.02"
      />
      <div class="cm-out">
        <Latex tex="M = \frac{4\pi^2 r^3}{G T^2}" /> =
        <b class="cm-num"><Latex :tex="massTex" /></b>
      </div>
      <div class="cm-cmp">
        {{ current.center }}的公认质量 <Latex :tex="current.referenceTex" />，相差
        <b class="cm-num">{{ deviationText }}</b
        >%
      </div>
    </div>
    <div class="cm-fig">
      <svg
        viewBox="0 0 230 216"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="中心天体与沿圆轨道环绕的天体"
      >
        <circle
          cx="108"
          cy="108"
          r="72"
          fill="none"
          stroke="rgba(148,163,184,0.42)"
          stroke-width="1.4"
          stroke-dasharray="6 6"
        />
        <CelestialSun v-if="current.centerKind === 'sun'" :x="108" :y="108" :r="30" />
        <CelestialEarth v-else-if="current.centerKind === 'earth'" :x="108" :y="108" :r="30" />
        <CelestialPlanet v-else :x="108" :y="108" :r="30" variant="amber" :bands="true" />
        <CelestialEarth
          v-if="current.orbitingKind === 'earth'"
          :x="180"
          :y="108"
          :r="13"
          :show-halo="false"
        />
        <CelestialMoon v-else :x="180" :y="108" :r="13" />
        <CourseArrow
          :from="{ x: 108, y: 108 }"
          :to="{ x: 166, y: 108 }"
          stroke="#60a5fa"
          stroke-width="2.6"
          stroke-dasharray="7 5"
          label="r"
          :label-dx="-4"
          :label-dy="-10"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.cm {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.cm-panel {
  display: flex;
  flex: 0 0 54%;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;
}

.cm-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.cm-btn {
  padding: 0.16rem 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: 2rem;

  background: transparent;
  color: var(--c-text-dim);

  font-size: 0.75rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.cm-btn-on {
  border-color: rgb(226 168 70 / 55%);
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.cm-btn:hover {
  filter: brightness(1.2);
}

.cm-row {
  color: var(--c-text);
  font-size: 0.92rem;
}

.cm-slider {
  width: 100%;
  accent-color: var(--c-accent);
}

.cm-num {
  padding: 0 0.15rem;
  color: var(--c-accent);
  font-size: 1.08rem;
}

.cm-out {
  padding-top: 0.3rem;
  border-top: 1px solid var(--c-border);
  font-size: 1.05rem;
}

.cm-cmp {
  color: var(--c-text-dim);
  font-size: 0.88rem;
}

.cm-fig {
  display: flex;
  flex: 0 0 30%;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.cm-fig svg {
  display: block;
  width: auto;
  max-width: 100%;
  height: 11rem;
}
</style>
