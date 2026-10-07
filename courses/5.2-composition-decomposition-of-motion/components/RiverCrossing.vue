<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 小船渡河动画：船对水的运动 + 水对岸的运动 → 船对岸的合运动。
 *
 * Mode="time" 船头垂直河岸：渡河时间最短，与水流速度无关； mode="displacement" v船 > v水：船头偏向上游、让合速度垂直河岸，位移最短（= 河宽 d）； v船 <
 * v水：合速度垂直河岸已不可能，此时最短位移要靠"合速度与船头垂直"， 得 s_min = d·v水/v船、cosθ = v船/v水（θ 为船头与上游河岸的夹角）； v船 =
 * v水：船头正对上游时合速度为零，船过不去。 全部读数由真实公式算出。
 */
const {
  mode = "time",
  showVectors = true,
  showPanel = true,
} = defineProps<{
  mode?: "time" | "displacement";
  /** 是否画速度矢量（题目页先给干净图，点开后再出分析） */
  showVectors?: boolean;
  /** 是否显示参数滑杆 */
  showPanel?: boolean;
}>();

const VIEW_W = 760;
const VIEW_H = 410;
/** 两岸与河面的像素位置 */
const BANK_TOP = 96;
const BANK_BOTTOM = 336;
const RIVER_H = BANK_BOTTOM - BANK_TOP;
const START_X = 120;
/** 箭头比例：每 1 m/s 画多长 */
const ARROW = 34;

const vBoat = ref(1.5);
const vWater = ref(1);
const width = ref(40);

/** 水速大于船速：垂直到达对岸不可能，需按"最短位移"构形画 */
const waterFaster = computed(() => mode === "displacement" && vWater.value > vBoat.value);
/** 水速恰好等于船速：最短位移方案退化成"停在原地" */
const stuck = computed(
  () => mode === "displacement" && Math.abs(vWater.value - vBoat.value) < 1e-6,
);

/** 船头方向（m/s 分量）。 合速度 = 船头方向 + 水流方向；v船 > v水 时让合速度垂直河岸， v船 < v水 时让合速度与船头垂直（此时位移最短）。 */
const heading = computed(() => {
  if (mode === "time") return { x: 0, y: vBoat.value };
  if (waterFaster.value || stuck.value) {
    // cos α = −v船/v水（α 为船头与水流方向的夹角）
    const ratio = vBoat.value / vWater.value;
    return {
      x: -vBoat.value * ratio,
      y: vBoat.value * Math.sqrt(Math.max(0, 1 - ratio * ratio)),
    };
  }
  const cosT = vWater.value / vBoat.value;
  return { x: -vBoat.value * cosT, y: vBoat.value * Math.sqrt(Math.max(0, 1 - cosT * cosT)) };
});
const result = computed(() => ({
  x: heading.value.x + vWater.value,
  y: heading.value.y,
}));

const scale = computed(() => RIVER_H / width.value);
/** Stuck（合速度为零）时不给时间，动画停在原点 */
const timeTotal = computed(() => (result.value.y < 0.02 ? 0 : width.value / result.value.y));
const drift = computed(() => result.value.x * timeTotal.value);
/** 最短位移（v船 < v水 时为 d·v水/v船，否则就是河宽） */
const minDisplacement = computed(() =>
  waterFaster.value ? (width.value * vWater.value) / vBoat.value : width.value,
);
const boatAngle = computed(() => (Math.atan2(-heading.value.y, heading.value.x) * 180) / Math.PI);
/** 船头与上游河岸的夹角 θ */
const thetaDeg = computed(() => {
  if (mode === "time") return 90;
  const ratio = waterFaster.value ? vBoat.value / vWater.value : vWater.value / vBoat.value;
  return (Math.acos(Math.min(1, ratio)) * 180) / Math.PI;
});

const progress = ref(0);
const flowPhase = ref(0);
let raf = 0;
let started = 0;
const T_ANIM = 3.2;
const HOLD = 1.2;

const loop = (now: number): void => {
  if (!started) started = now;
  const elapsed = (now - started) / 1000;
  progress.value = Math.min(1, (elapsed % (T_ANIM + HOLD)) / T_ANIM);
  flowPhase.value = (elapsed % 3) / 3;
  raf = requestAnimationFrame(loop);
};

onMounted(() => {
  raf = requestAnimationFrame(loop);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

const boat = computed(() => ({
  x: START_X + result.value.x * timeTotal.value * progress.value * scale.value,
  y: BANK_BOTTOM - result.value.y * timeTotal.value * progress.value * scale.value,
}));
const landing = computed(() => ({
  x: START_X + drift.value * scale.value,
  y: BANK_TOP,
}));

const flowXs = computed(() =>
  [0, 1, 2, 3, 4].map((i) => ((i * 150 + flowPhase.value * 150) % 760) + 10),
);

const tip = (
  from: { x: number; y: number },
  vec: { x: number; y: number },
): { x: number; y: number } => ({
  x: from.x + vec.x * ARROW,
  y: from.y - vec.y * ARROW,
});
const waterTip = computed(() => ({ x: boat.value.x + vWater.value * ARROW, y: boat.value.y }));
const headTip = computed(() => tip(boat.value, heading.value));
const resultTip = computed(() => tip(boat.value, result.value));
</script>

<template>
  <div class="river">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="小船渡河动画"
    >
      <!-- 两岸 -->
      <rect x="0" y="0" width="760" height="96" fill="rgba(148,163,184,0.14)" />
      <rect x="0" y="336" width="760" height="74" fill="rgba(148,163,184,0.14)" />
      <line x1="0" y1="96" x2="760" y2="96" stroke="rgba(203,213,225,0.8)" stroke-width="2.4" />
      <line x1="0" y1="336" x2="760" y2="336" stroke="rgba(203,213,225,0.8)" stroke-width="2.4" />
      <text x="24" y="60" font-family="KaTeX_Main" font-size="17" fill="rgba(203,213,225,0.85)">
        对岸
      </text>
      <text x="24" y="386" font-family="KaTeX_Main" font-size="17" fill="rgba(203,213,225,0.85)">
        出发岸
      </text>
      <!-- 水流 -->
      <g opacity="0.4">
        <path
          v-for="(y, i) in [150, 224, 298]"
          :key="i"
          :d="flowXs.map((x) => `M ${x} ${y} l 16 0 M ${x + 10} ${y - 5} l 8 5 l -8 5`).join(' ')"
          fill="none"
          stroke="#60a5fa"
          stroke-width="1.6"
        />
      </g>
      <!-- 河宽 -->
      <g opacity="0.9">
        <line x1="62" y1="96" x2="62" y2="336" stroke="rgba(226,168,70,0.9)" stroke-width="2" />
        <polygon points="62,96 56,110 68,110" fill="rgba(226,168,70,0.9)" />
        <polygon points="62,336 56,322 68,322" fill="rgba(226,168,70,0.9)" />
        <text
          x="72"
          y="230"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="#e2a846"
        >
          d
        </text>
      </g>
      <!-- 预计轨迹与实际轨迹 -->
      <line
        :x1="START_X"
        :y1="BANK_BOTTOM"
        :x2="landing.x"
        :y2="landing.y"
        stroke="rgba(148,163,184,0.6)"
        stroke-width="2"
        stroke-dasharray="8 6"
      />
      <line
        :x1="START_X"
        :y1="BANK_BOTTOM"
        :x2="boat.x"
        :y2="boat.y"
        stroke="#e2a846"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <circle
        :cx="landing.x"
        :cy="landing.y"
        r="6"
        fill="none"
        stroke="#e2a846"
        stroke-width="2.4"
      />
      <!-- 漂移 -->
      <line
        v-if="drift > 0.01"
        :x1="START_X"
        :y1="366"
        :x2="landing.x"
        :y2="366"
        stroke="rgba(96,165,250,0.8)"
        stroke-width="1.8"
        stroke-dasharray="6 5"
      />
      <!-- 船 -->
      <g :transform="`translate(${boat.x} ${boat.y}) rotate(${boatAngle})`">
        <path
          d="M -24 -8 L 14 -8 L 28 0 L 14 8 L -24 8 Z"
          fill="rgba(96,165,250,0.35)"
          stroke="#93c5fd"
          stroke-width="2.2"
        />
        <line x1="-24" y1="0" x2="28" y2="0" stroke="rgba(147,197,253,0.8)" stroke-width="1.4" />
      </g>
      <!-- 速度矢量 -->
      <g v-if="showVectors">
        <CourseArrow
          v-if="vWater > 0.02"
          :from="boat"
          :to="waterTip"
          stroke="#60a5fa"
          :stroke-width="3"
        />
        <CourseArrow :from="boat" :to="headTip" stroke="#e2a846" :stroke-width="3.2" />
        <CourseArrow
          v-if="!stuck"
          :from="boat"
          :to="resultTip"
          stroke="#f87171"
          :stroke-width="3"
          stroke-dasharray="10 5"
        />
        <text
          :x="waterTip.x + 8"
          :y="waterTip.y + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="#93c5fd"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">水</tspan>
        </text>
        <text
          :x="headTip.x - 26"
          :y="headTip.y - 10"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="#e2a846"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">船</tspan>
        </text>
        <text
          v-if="!stuck"
          :x="resultTip.x + 10"
          :y="resultTip.y + 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="#f87171"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">合</tspan>
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="river-panel">
      <label
        >船在静水中的速度 <span class="river-val">{{ vBoat.toFixed(1) }} m/s</span
        ><input v-model.number="vBoat" type="range" min="1" max="3" step="0.1"
      /></label>
      <label
        >水流速度 <span class="river-val">{{ vWater.toFixed(1) }} m/s</span
        ><input v-model.number="vWater" type="range" min="0" max="2" step="0.1"
      /></label>
      <label
        >河宽 <span class="river-val">{{ width }} m</span
        ><input v-model.number="width" type="range" min="30" max="60" step="5"
      /></label>
    </div>
    <div class="river-readout">
      <span v-if="mode === 'time'"
        >船头垂直河岸：t = d / v<sub>船</sub> = {{ timeTotal.toFixed(1) }} s，漂移
        {{ drift.toFixed(1) }} m</span
      >
      <span v-else-if="stuck"
        >v<sub>水</sub> = v<sub>船</sub>：船头正对上游时合速度为零，船过不去</span
      >
      <span v-else-if="waterFaster"
        >水比船快：到不了正对岸。最短位移 s = d·v<sub>水</sub>/v<sub>船</sub> =
        {{ minDisplacement.toFixed(1) }} m（船头与上游河岸成 θ = {{ thetaDeg.toFixed(1) }}°，cos θ =
        v<sub>船</sub>/v<sub>水</sub>）</span
      >
      <span v-else
        >船头偏向上游 θ = {{ thetaDeg.toFixed(1) }}°（cos θ = v<sub>水</sub>/v<sub>船</sub>）：t =
        {{ timeTotal.toFixed(1) }} s</span
      >
    </div>
  </div>
</template>

<style scoped>
.river {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
}

.river svg {
  display: block;
  width: 100%;
  height: auto;
}

.river-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.4rem;

  color: var(--c-text-dim, #94a3b8);

  font-size: 0.78rem;
}

.river-panel label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.river-panel input {
  width: 6.5rem;
}

.river-val {
  min-width: 3.4rem;
  color: var(--c-accent, #e2a846);
  font-variant-numeric: tabular-nums;
}

.river-readout {
  color: var(--c-text, #e2e8f0);
  font-size: 0.86rem;
  line-height: 1.35;
  text-align: center;
}
</style>
