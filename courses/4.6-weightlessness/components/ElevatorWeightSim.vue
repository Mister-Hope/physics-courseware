<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 电梯里称体重（§4.6 第 12 页，核心交互）
 *
 * 六个运动状态点着看：视重 F_N = m(g + a)（a 以竖直向上为正）实时重算， 人身上的支持力箭头长度随 F_N/mg 变化，秤的示数与"超重 / 失重"标签同步更新。
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
        <div class="ew-line">
          <span>视重 <Latex tex="F_N" /></span>
          <b>{{ fn }} N</b>
        </div>
        <div class="ew-line ew-line-dim">
          <span>重力 <Latex tex="mg" /></span>
          <b>{{ WEIGHT }} N</b>
        </div>
        <div class="ew-verdict" :class="`ew-verdict-${verdictKey}`">{{ verdict }}</div>
        <div class="ew-formula"><Latex :tex="formulaTex" /></div>
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
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.ew {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  width: 100%;
  min-width: 0;
}

.ew-main {
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.ew-figure {
  flex: 0 1 auto;
  width: 190px;
  min-width: 0;
}

.ew-panel {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;
  max-width: 380px;
}

.ew-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 1.1rem;
}

.ew-line b {
  color: var(--c-accent);
  font-size: 1.45rem;
  font-variant-numeric: tabular-nums;
}

.ew-line-dim b {
  color: var(--c-text-dim);
  font-size: 1.1rem;
}

.ew-verdict {
  align-self: flex-start;

  padding: 0.15rem 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  font-weight: 700;
  font-size: 1.05rem;
}

.ew-verdict-over {
  border-color: rgb(248 113 113 / 55%);
  color: #f87171;
}

.ew-verdict-under {
  border-color: rgb(96 165 250 / 55%);
  color: #60a5fa;
}

.ew-verdict-even {
  color: var(--c-text-dim);
}

.ew-formula {
  font-size: 0.95rem;
}

.ew-buttons {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.5rem;
  width: 100%;
}

.ew-buttons button {
  padding: 0.4rem 0.2rem;
  border: 1px solid var(--c-border);
  border-radius: 0.7rem;

  background: var(--c-surface);
  color: var(--c-text);

  font-size: 0.92rem;
  font-family: inherit;
  white-space: nowrap;

  cursor: pointer;

  transition: all 0.16s ease;
}

.ew-buttons button:hover {
  border-color: var(--c-border-glow);
  color: var(--c-accent);
}

.ew-on {
  border-color: var(--c-border-glow) !important;
  background: rgb(226 168 70 / 14%) !important;
  color: var(--c-accent) !important;
  font-weight: 700;
}
</style>
