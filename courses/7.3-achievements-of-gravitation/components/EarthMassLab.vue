<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 3 页交互：把地球放上"引力秤"。
 *
 * 不计地球自转时，地面上质量为 m 的物体所受重力就等于地球对它的万有引力： mg = G·m·m地/R²，两边的 m 约掉，得 m地 = gR²/G。 拖动 g、R
 * 两个滑块（都是能在地面上测出来的量），实时算出地球质量， 并与公认值 5.98×10²⁴ kg 对照——这就是卡文迪什"称量地球的重量"的含义。
 */

/** 万有引力常量，按教材取 6.67×10⁻¹¹ N·m²/kg² */
const G = 6.67e-11;
/** 公认的地球质量，用来对照（教材与天文年历的取值） */
const REFERENCE = 5.98e24;

/** 地面重力加速度 g（m/s²）：赤道附近约 9.78，两极附近约 9.83 */
const g = ref(9.8);
/** 地球半径 R（10⁶ m）：约 6.37×10⁶ m */
const radius = ref(6.4);

/** 由 mg = Gm m地/R² 解出 m地 = gR²/G —— 真实公式，数值随两个滑块变化 */
const mass = computed(() => (g.value * (radius.value * 1e6) ** 2) / G);
/** 地球半径读数：6.40×10⁶ m（整段交给 KaTeX，数字与量级之间不会有 HTML 空格） */
const radiusTex = computed(() => `${radius.value.toFixed(2)}\\times10^{6}\\ \\text{m}`);
/** 算出的地球质量读数：6.02×10²⁴ kg */
const massTex = computed(() => `${(mass.value / 1e24).toFixed(2)}\\times10^{24}\\ \\text{kg}`);
/** 与公认值的相对偏差（%） */
const deviation = computed(() => ((mass.value - REFERENCE) / REFERENCE) * 100);
/** 偏差文字：正负号用 Unicode 减号才不会看成连字符 */
const deviationText = computed(
  () => `${deviation.value >= 0 ? "+" : "−"}${Math.abs(deviation.value).toFixed(2)}`,
);
</script>

<template>
  <div class="em">
    <div class="em-panel">
      <div class="em-grid">
        <div class="em-cell">
          <div class="em-row">
            <Latex tex="g" /> = <b class="em-num">{{ g.toFixed(2) }}</b>
            <Latex tex="\text{m/s}^2" />
          </div>
          <input
            v-model.number="g"
            class="em-slider"
            type="range"
            min="9.7"
            max="9.9"
            step="0.01"
          />
        </div>
        <div class="em-cell">
          <div class="em-row">
            <Latex tex="R" /> = <b class="em-num"><Latex :tex="radiusTex" /></b>
          </div>
          <input
            v-model.number="radius"
            class="em-slider"
            type="range"
            min="6.2"
            max="6.6"
            step="0.02"
          />
        </div>
      </div>
      <div class="em-out">
        <Latex tex="m_{\text{地}} = \frac{gR^2}{G}" /> =
        <b class="em-num"><Latex :tex="massTex" /></b>
      </div>
      <div class="em-cmp">
        公认值 <Latex tex="5.98\times10^{24}\ \text{kg}" />，相差
        <b class="em-num">{{ deviationText }}</b
        >%
      </div>
    </div>
    <div class="em-fig">
      <svg
        viewBox="0 0 240 200"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="地球与地面上质量为 m 的物体所受的重力"
      >
        <CelestialEarth :x="104" :y="122" :r="56" />
        <rect
          x="96"
          y="54"
          width="16"
          height="12"
          rx="3"
          fill="rgba(226,168,70,0.3)"
          stroke="#e2a846"
          stroke-width="1.6"
        />
        <text
          x="104"
          y="46"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="16"
          fill="#cbd5e1"
        >
          m
        </text>
        <CourseArrow
          :from="{ x: 104, y: 70 }"
          :to="{ x: 104, y: 96 }"
          stroke="#f87171"
          stroke-width="2.8"
          label="mg"
          :label-dx="9"
          :label-dy="3"
        />
        <CourseArrow
          :from="{ x: 104, y: 122 }"
          :to="{ x: 160, y: 122 }"
          stroke="#60a5fa"
          stroke-width="2.6"
          label="R"
          :label-dx="-2"
          :label-dy="-9"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.em {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.em-panel {
  display: flex;
  flex: 0 0 56%;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
}

.em-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.em-cell {
  min-width: 0;
}

.em-row {
  color: var(--c-text);
  font-size: 0.95rem;
}

.em-slider {
  width: 100%;
  accent-color: var(--c-accent);
}

.em-num {
  padding: 0 0.15rem;
  color: var(--c-accent);
  font-size: 1.1rem;
}

.em-out {
  padding-top: 0.3rem;
  border-top: 1px solid var(--c-border);
  font-size: 1.05rem;
}

.em-cmp {
  color: var(--c-text-dim);
  font-size: 0.9rem;
}

.em-fig {
  display: flex;
  flex: 0 0 30%;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.em-fig svg {
  display: block;
  width: auto;
  max-width: 100%;
  height: 8.5rem;
}
</style>
