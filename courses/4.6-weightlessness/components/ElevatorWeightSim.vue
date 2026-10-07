<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 电梯里称体重（§4.6 第 12 页，核心交互）
 *
 * 六个运动状态点着看：视重 F_N = m(g + a)（a 以竖直向上为正）实时重算， 人身上的支持力箭头长度随 F_N/mg 变化，秤的示数、视重对比条与"超重 / 失重"标签同步更新。
 */
/** 人的质量（kg）与重力加速度（m/s²） */
const MASS = 60;
const GRAVITY = 10;
const WEIGHT = MASS * GRAVITY;

interface Scene {
  readonly id: string;
  readonly label: string;
  /** 竖直向上的加速度分量（m/s²）；向下为负 */
  readonly aUp: number;
  /** 速度方向：1 向上，-1 向下 */
  readonly vDir: 1 | -1;
}

const SCENES: readonly Scene[] = [
  { id: "up-accel", label: "加速上升", aUp: 2, vDir: 1 },
  { id: "up-const", label: "匀速上升", aUp: 0, vDir: 1 },
  { id: "up-decel", label: "减速上升", aUp: -2, vDir: 1 },
  { id: "down-accel", label: "加速下降", aUp: -2, vDir: -1 },
  { id: "down-const", label: "匀速下降", aUp: 0, vDir: -1 },
  { id: "down-decel", label: "减速下降", aUp: 2, vDir: -1 },
];

const activeId = ref<string>("up-accel");
const scene = computed<Scene>(() => SCENES.find((item) => item.id === activeId.value) ?? SCENES[0]);

/** 视重（＝秤对人的支持力，也＝人对秤的压力） */
const fn = computed(() => MASS * (GRAVITY + scene.value.aUp));
const ratio = computed(() => fn.value / WEIGHT);

const verdictKey = computed<"over" | "under" | "even">(() => {
  if (ratio.value > 1.0001) return "over";
  if (ratio.value < 0.9999) return "under";

  return "even";
});

const verdict = computed(
  () => ({ over: "超重", under: "失重", even: "视重等于重力" })[verdictKey.value],
);

const accelDir = computed<"down" | "up" | "none">(() => {
  if (scene.value.aUp > 0) return "up";
  if (scene.value.aUp < 0) return "down";

  return "none";
});

const speedDir = computed<"down" | "up">(() => (scene.value.vDir > 0 ? "up" : "down"));

const accelText = computed<string>(() => {
  if (scene.value.aUp > 0) return "向上 ↑";
  if (scene.value.aUp < 0) return "向下 ↓";

  return "0";
});

const formulaTex = computed(() => {
  const a = scene.value.aUp;

  if (a === 0) return `F_N = m g = ${MASS}\\times ${GRAVITY}\\ \\text{N} = ${fn.value}\\ \\text{N}`;

  const sign = a > 0 ? "+" : "-";

  return `F_N = m(g ${sign} a) = ${MASS}\\times(${GRAVITY} ${sign} ${Math.abs(a)})\\ \\text{N} = ${fn.value}\\ \\text{N}`;
});
</script>

<template>
  <div class="ew">
    <div class="ew-main">
      <div class="ew-figure">
        <PersonWeightSvg
          enclosure="elevator"
          :fn-ratio="ratio"
          :accel-dir="accelDir"
          :speed-dir="speedDir"
          :show-forces="true"
          :show-motion="true"
          :reading="fn"
        />
      </div>

      <div class="ew-panel">
        <!-- 视重与重力对比卡片 -->
        <div class="ew-metrics">
          <div class="ew-line">
            <span class="ew-label">视重 <Latex tex="F_N" /></span>
            <b :class="`ew-val-${verdictKey}`">{{ fn }} N</b>
          </div>

          <!-- 视重 vs 重力 动态比例条（直观看到 F_N 相对 mg=600N 的增减） -->
          <div class="ew-bar-track">
            <div
              class="ew-bar-fill"
              :class="`ew-bar-${verdictKey}`"
              :style="{ width: `${(fn / 900) * 100}%` }"
            />
            <div class="ew-bar-mg" title="真实重力 mg = 600 N" />
          </div>

          <div class="ew-line ew-line-dim">
            <span class="ew-label">重力 <Latex tex="mg" /></span>
            <b>{{ WEIGHT }} N</b>
          </div>
        </div>

        <!-- 状态判读与运动参量标签 -->
        <div class="ew-tags">
          <div class="ew-verdict" :class="`ew-verdict-${verdictKey}`">{{ verdict }}</div>
          <span class="ew-chip ew-chip-v">
            速度 <i>v</i> {{ speedDir === "up" ? "向上 ↑" : "向下 ↓" }}
          </span>
          <span class="ew-chip" :class="`ew-chip-a-${accelDir}`">
            加速度 <i>a</i> {{ accelText }}
          </span>
        </div>

        <!-- 动力学计算公式 -->
        <div class="ew-formula">
          <Latex :tex="formulaTex" />
        </div>
      </div>
    </div>

    <div class="ew-buttons">
      <button
        v-for="item in SCENES"
        :key="item.id"
        type="button"
        :class="{ 'ew-on': item.id === activeId }"
        @click="activeId = item.id"
      >
        <span>{{ item.vDir > 0 ? "↑" : "↓" }}</span>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.ew {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  width: 100%;
  max-width: 640px;
  min-width: 0;
}

.ew-main {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.ew-figure {
  flex: 0 1 auto;
  width: 196px;
  min-width: 0;
}

.ew-panel {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.62rem;

  min-width: 0;
  max-width: 390px;
}

.ew-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--c-border, rgba(148, 163, 184, 0.22));
  border-radius: 0.65rem;
  background: rgba(15, 23, 42, 0.55);
}

.ew-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 1.05rem;
  color: var(--c-text, #e2e8f0);
}

.ew-label {
  color: #cbd5e1;
}

.ew-math {
  font-family: "KaTeX_Math", "Times New Roman", serif;
  font-style: italic;
}

.ew-math sub {
  font-family: "KaTeX_Main", sans-serif;
  font-style: normal;
  font-size: 0.75em;
}

.ew-line b {
  font-size: 1.42rem;
  font-variant-numeric: tabular-nums;
  transition: color 0.2s ease;
}

.ew-val-over {
  color: #f87171;
}

.ew-val-under {
  color: #60a5fa;
}

.ew-val-even {
  color: var(--c-accent, #e2a846);
}

.ew-line-dim b {
  color: var(--c-text-dim, #94a3b8);
  font-size: 1.08rem;
}

.ew-bar-track {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.22);
  overflow: hidden;
}

.ew-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition:
    width 0.25s ease,
    background-color 0.25s ease;
}

.ew-bar-over {
  background: linear-gradient(90deg, #e2a846 0%, #f87171 100%);
}

.ew-bar-under {
  background: linear-gradient(90deg, #38bdf8 0%, #60a5fa 100%);
}

.ew-bar-even {
  background: #e2a846;
}

.ew-bar-mg {
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: 66.67%;
  width: 2px;
  background: #f8fafc;
  box-shadow: 0 0 4px rgba(15, 23, 42, 0.9);
}

.ew-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}

.ew-verdict {
  padding: 0.16rem 0.82rem;
  border: 1px solid var(--c-border, rgba(148, 163, 184, 0.35));
  border-radius: 0.5rem;

  font-weight: 700;
  font-size: 1rem;
}

.ew-verdict-over {
  border-color: rgb(248 113 113 / 55%);
  background: rgb(248 113 113 / 12%);
  color: #f87171;
}

.ew-verdict-under {
  border-color: rgb(96 165 250 / 55%);
  background: rgb(96 165 250 / 12%);
  color: #60a5fa;
}

.ew-verdict-even {
  border-color: rgb(226 168 70 / 45%);
  background: rgb(226 168 70 / 10%);
  color: var(--c-accent, #e2a846);
}

.ew-chip {
  padding: 0.16rem 0.55rem;
  border-radius: 0.45rem;
  font-size: 0.82rem;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.65);
  color: #cbd5e1;
}

.ew-chip i {
  font-family: "KaTeX_Math", serif;
}

.ew-chip-v {
  border-color: rgba(96, 165, 250, 0.35);
  color: #93c5fd;
}

.ew-chip-a-up,
.ew-chip-a-down {
  border-color: rgba(45, 212, 191, 0.4);
  color: #5eead4;
}

.ew-chip-a-none {
  color: #94a3b8;
}

.ew-formula {
  padding: 0.45rem 0.75rem;
  border-radius: 0.55rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.45);
  font-size: 0.95rem;
  color: #e2e8f0;
}

.ew-formula-preview i {
  font-family: "KaTeX_Math", serif;
}

.ew-formula-preview b {
  color: var(--c-accent, #e2a846);
}

.ew-buttons {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.48rem;
  width: 100%;
}

.ew-buttons button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  padding: 0.42rem 0.25rem;
  border: 1px solid var(--c-border, rgba(148, 163, 184, 0.28));
  border-radius: 0.65rem;

  background: var(--c-surface, rgba(15, 23, 42, 0.78));
  color: var(--c-text, #cbd5e1);

  font-size: 0.9rem;
  font-family: inherit;
  white-space: nowrap;

  cursor: pointer;

  transition: all 0.16s ease;
}

.ew-buttons button:hover {
  border-color: var(--c-border-glow, rgba(226, 168, 70, 0.65));
  color: var(--c-accent, #e2a846);
}

.ew-on {
  border-color: var(--c-border-glow, rgba(226, 168, 70, 0.85)) !important;
  background: rgb(226 168 70 / 16%) !important;
  color: var(--c-accent, #e2a846) !important;
  font-weight: 700;
}
</style>
