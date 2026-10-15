<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 7 页：μ 子实验——从高空（取 10 km）产生、以 v 飞向地面的一批 μ 子，能到达地面的有多少？
 *
 * 两个预言都用真实公式算： 经典：寿命恒为 τ₀ = 2.2 μs，到达地面的比例 = e^(−h/vτ₀)； 相对论：地面上测得寿命 Δt = γτ₀（γ =
 * 1/√(1−(v/c)²)），到达比例 = e^(−h/(vΔt))。 点阵里点亮的个数 = 40 × 到达比例（四舍五入），随速度滑块真实变化。
 */

/** μ 子低速运动时的平均寿命 τ₀（s） */
const TAU0 = 2.2e-6;
/** 真空中的光速（m/s） */
const C = 3e8;
/** μ 子产生的高度（m） */
const H = 1e4;
/** 点阵里假设的 μ 子个数 */
const N = 40;

/** 当前 v/c */
const beta = ref(0.99);
/** γ = 1/√(1−(v/c)²) */
const gamma = computed(() => 1 / Math.sqrt(1 - beta.value ** 2));
/** 地面上测得的平均寿命 Δt = γτ₀（s） */
const tauRel = computed(() => gamma.value * TAU0);
/** 经典预言的平均飞行距离 vτ₀（m） */
const dClassic = computed(() => beta.value * C * TAU0);
/** 相对论预言的平均飞行距离 vΔt（m） */
const dRel = computed(() => beta.value * C * tauRel.value);
/** 从 10 km 高空落到地面的时间（s） */
const fallTime = computed(() => H / (beta.value * C));
/** 到达地面的比例 */
const pClassic = computed(() => Math.exp(-fallTime.value / TAU0));
const pRel = computed(() => Math.exp(-fallTime.value / tauRel.value));
/** 40 个 μ 子里平均能到达地面的个数 */
const nClassic = computed(() => N * pClassic.value);
const nRel = computed(() => N * pRel.value);

/**
 * 把存活的那几个点在 40 个位置里均匀铺开，避免全挤在一头
 *
 * @param count 平均能到达地面的个数
 * @returns 长度 N 的布尔数组（true = 该位置画成"到达地面"）
 */
const spreadDots = (count: number): boolean[] => {
  const alive = new Set<number>();

  for (let index = 0; index < count; index += 1)
    alive.add(Math.min(N - 1, Math.round((index + 0.5) * (N / count))));

  return Array.from({ length: N }, (_, index) => alive.has(index));
};

/** 两种预言下"到达地面"的点阵 */
const dots = computed(() => ({
  classic: spreadDots(Math.round(nClassic.value)),
  rel: spreadDots(Math.round(nRel.value)),
}));
</script>

<template>
  <div class="mu">
    <div class="mu-row">
      <div class="mu-text">
        <div class="mu-head">
          <span class="mu-tag">经典预言</span>寿命始终是 <Latex tex="\tau_0 = 2.2\ \mu\text{s}" />
        </div>
        <div class="mu-stat">
          到达地面：平均 <b class="mu-bad">{{ Math.round(nClassic) }}</b> / {{ N }} 个（{{
            (pClassic * 100).toFixed(3)
          }}%）· 平均飞行 <Latex :tex="`${dClassic.toFixed(0)}\\ \\text{m}`" />
        </div>
      </div>
      <div class="mu-dots">
        <span
          v-for="(alive, index) in dots.classic"
          :key="index"
          class="mu-dot"
          :class="{ 'is-alive': alive }"
        />
      </div>
    </div>

    <div class="mu-row">
      <div class="mu-text">
        <div class="mu-head">
          <span class="mu-tag mu-tag-2">相对论预言</span>地面上测得寿命
          <Latex
            :tex="`\\Delta t = \\gamma\\tau_0 = ${(tauRel * 1e6).toFixed(1)}\\ \\mu\\text{s}`"
          />
        </div>
        <div class="mu-stat">
          到达地面：平均 <b class="mu-ok">{{ Math.round(nRel) }}</b> / {{ N }} 个（{{
            (pRel * 100).toFixed(1)
          }}%）· 平均飞行 <Latex :tex="`${dRel.toFixed(0)}\\ \\text{m}`" />
        </div>
      </div>
      <div class="mu-dots">
        <span
          v-for="(alive, index) in dots.rel"
          :key="index"
          class="mu-dot"
          :class="{ 'is-alive': alive }"
        />
      </div>
    </div>

    <div class="mu-ctrl">
      <input
        v-model.number="beta"
        class="mu-range"
        type="range"
        min="0.95"
        max="0.9999"
        step="0.0001"
        aria-label="μ 子速度与光速的比值"
      />
      <div class="mu-read">
        <Latex :tex="`v = ${beta.toFixed(4)}c`" />
        <span class="mu-sep">·</span>
        <Latex :tex="`\\gamma = ${gamma.toFixed(2)}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mu {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  width: 100%;
  min-width: 0;
}

.mu-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
}

.mu-text {
  display: flex;
  flex-direction: column;
  gap: 0.08rem;

  min-width: 0;
}

.mu-head {
  color: var(--c-text-dim);
  font-size: 0.8rem;
  line-height: 1.4;
}

.mu-tag {
  margin-right: 0.4rem;
  padding: 0.02rem 0.4rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  color: var(--c-text-dim);

  font-size: 0.75rem;
  white-space: nowrap;
}

.mu-tag-2 {
  border-color: var(--c-accent);
  color: var(--c-accent);
}

.mu-dots {
  display: grid;
  grid-template-columns: repeat(20, 0.72rem);
  gap: 0.2rem;
}

.mu-dot {
  width: 0.72rem;
  height: 0.72rem;
  border: 1px solid var(--c-border);
  border-radius: 50%;
}

.mu-dot.is-alive {
  border-color: var(--c-accent);
  background: var(--c-accent);
  box-shadow: 0 0 4px rgba(226, 168, 70, 0.55);
}

.mu-stat {
  font-size: 0.8rem;
}

.mu-ok {
  color: var(--c-accent);
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}

.mu-bad {
  color: var(--c-danger);
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}

.mu-ctrl {
  display: flex;
  gap: 0.9rem;
  align-items: center;

  min-width: 0;
}

.mu-range {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}

.mu-read {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;

  color: var(--c-accent);
  white-space: nowrap;
}

.mu-sep {
  color: var(--c-text-dim);
}
</style>
