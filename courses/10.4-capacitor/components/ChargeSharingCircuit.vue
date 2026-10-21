<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import type { ComputedRef } from "vue";

// State definition
const qA = ref<number>(0); // Charge on Cap 1 (voltage range 0 to 8 V)
const qB = ref<number>(0); // Charge on Cap 2
const s1Pos = ref<"open" | "1" | "2">("open"); // Switch 1 position
const s2Closed = ref<boolean>(false); // Switch 2 closed/open status

const simState = ref<"idle" | "charging_A" | "sharing" | "discharging_B" | "discharging_A_and_B">(
  "idle",
);
const electronOffset = ref<number>(0);

let timerId: ReturnType<typeof setInterval> | null = null;

const parseHex = (hex: string): { r: number; g: number; b: number } => {
  const match = hex.replace("#", "");
  const r = Number.parseInt(match.slice(0, 2), 16);
  const g = Number.parseInt(match.slice(2, 4), 16);
  const b = Number.parseInt(match.slice(4, 6), 16);
  return { r, g, b };
};

const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const src = parseHex(color1);
  const dst = parseHex(color2);
  const r = Math.round(src.r + factor * (dst.r - src.r));
  const g = Math.round(src.g + factor * (dst.g - src.g));
  const b = Math.round(src.b + factor * (dst.b - src.b));
  return `rgb(${r}, ${g}, ${b})`;
};

// Compute colors based on voltages (charge size, where 8.0 is max)
const aUpperColor = computed(() =>
  interpolateColor("#475569", "#ef4444", Math.min(1, qA.value / 8)),
);
const aLowerColor = computed(() =>
  interpolateColor("#475569", "#3b82f6", Math.min(1, qA.value / 8)),
);
const bUpperColor = computed(() =>
  interpolateColor("#475569", "#ef4444", Math.min(1, qB.value / 8)),
);
const bLowerColor = computed(() =>
  interpolateColor("#475569", "#3b82f6", Math.min(1, qB.value / 8)),
);

// 电荷符号：随电压比例递增 1→5 个，始终居中
const makeChargeXs = (chargeFn: () => number, center: number): ComputedRef<number[]> =>
  computed(() => {
    const ratio = Math.min(1, chargeFn() / 8);
    const count = ratio <= 0.02 ? 0 : Math.min(5, Math.max(1, Math.ceil(ratio * 5)));
    const sets = [
      [center],
      [center - 8, center + 8],
      [center - 15, center, center + 15],
      [center - 20, center - 8, center + 8, center + 20],
      [center - 20, center - 10, center, center + 10, center + 20],
    ];
    return count === 0 ? [] : sets[count - 1];
  });

const chargeXsC1 = makeChargeXs(() => qA.value, 420);
const chargeXsC2 = makeChargeXs(() => qB.value, 150);

// Switch 1 Target - Mathematically exact rotation of length L = 72
const s1Target = computed(() => {
  if (s1Pos.value === "1") return { x: 252.3, y: 45.5 }; // Length = 72 at 160.1 degrees
  if (s1Pos.value === "2") return { x: 252.3, y: 94.5 }; // Length = 72 at 199.9 degrees
  return { x: 248, y: 70 }; // Length = 72 at 180 degrees
});

// S₂ 枢轴在 (205,99)，稍左于S₁触点2；向右下~28°摆到接线柱3（断开），正下摆到接线柱4（接地）
const s2Target = computed(
  () =>
    s2Closed.value
      ? { x: 205, y: 178 } // Closed: 正下连接接线柱4（接地，竖直）
      : { x: 242, y: 169 }, // Open: 右下~28°连接接线柱3（断开）
);

// Simple and literal status texts requested by user
const s1StatusText = computed(() => {
  if (s1Pos.value === "1") return "接通电源";
  if (s1Pos.value === "2") return "连接另一电容器";
  return "断开";
});

const s2StatusText = computed(() => (s2Closed.value ? "接通" : "断开"));

// Trigger simulation logic when switches are operated
const chargeCapA = (): void => {
  simState.value = "charging_A";
  const startA = qA.value;
  const steps = 15;
  let step = 0;

  timerId = setInterval(() => {
    step += 1;
    electronOffset.value += 5;
    qA.value = startA + (8 - startA) * (step / steps);

    if (step >= steps) {
      if (timerId) clearInterval(timerId);
      timerId = null;
      qA.value = 8;
      simState.value = "idle";
    }
  }, 25);
};

const shareOrDischargeCaps = (): void => {
  if (s2Closed.value) {
    simState.value = qA.value > 0 || qB.value > 0 ? "discharging_A_and_B" : "idle";
    const startA = qA.value;
    const startB = qB.value;
    const steps = 15;
    let step = 0;

    timerId = setInterval(() => {
      step += 1;
      electronOffset.value += 6;
      qA.value = startA * (1 - step / steps);
      qB.value = startB * (1 - step / steps);

      if (step >= steps) {
        if (timerId) clearInterval(timerId);
        timerId = null;
        qA.value = 0;
        qB.value = 0;
        simState.value = "idle";
      }
    }, 25);
    return;
  }

  const avgExchange = (qA.value + qB.value) / 2;
  const diff = Math.abs(qA.value - qB.value);
  if (diff < 0.02) {
    simState.value = "idle";
    return;
  }

  simState.value = "sharing";
  const startA = qA.value;
  const startB = qB.value;
  const steps = 15;
  let step = 0;

  timerId = setInterval(() => {
    step += 1;
    electronOffset.value += 5;
    qA.value = startA + (avgExchange - startA) * (step / steps);
    qB.value = startB + (avgExchange - startB) * (step / steps);

    if (step >= steps) {
      if (timerId) clearInterval(timerId);
      timerId = null;
      qA.value = avgExchange;
      qB.value = avgExchange;
      simState.value = "idle";
    }
  }, 25);
};

const dischargeCapB = (): void => {
  simState.value = "discharging_B";
  const startB = qB.value;
  const steps = 10;
  let step = 0;

  timerId = setInterval(() => {
    step += 1;
    electronOffset.value += 8;
    qB.value = startB * (1 - step / steps);

    if (step >= steps) {
      if (timerId) clearInterval(timerId);
      timerId = null;
      qB.value = 0;
      simState.value = "idle";
    }
  }, 25);
};

const runPhysicsStep = (): void => {
  if (s1Pos.value === "1") chargeCapA();
  else if (s1Pos.value === "2") shareOrDischargeCaps();
  else if (s1Pos.value === "open" && s2Closed.value && qB.value > 0) dischargeCapB();
  else simState.value = "idle";
};

const toggleS1 = (pos: "open" | "1" | "2"): void => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  s1Pos.value = pos;
  runPhysicsStep();
};

const toggleS2 = (closed: boolean): void => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  s2Closed.value = closed;
  runPhysicsStep();
};

const performReset = (): void => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  qA.value = 0;
  qB.value = 0;
  s1Pos.value = "open";
  s2Closed.value = false;
  simState.value = "idle";
};

onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<template>
  <div class="flex flex-col w-full gap-2.5">
    <!-- 电路 SVG：占满全宽 -->
    <div class="circ-svg-wrap">
      <svg viewBox="0 0 580 220" class="block w-full h-auto">
        <!-- 地线 -->
        <line x1="60" y1="180" x2="500" y2="180" stroke="var(--c-neutral-600)" stroke-width="2.5" />

        <!-- 电池 E -->
        <line x1="60" y1="40" x2="60" y2="98" stroke="var(--c-neutral-600)" stroke-width="2.5" />
        <line x1="60" y1="122" x2="60" y2="180" stroke="var(--c-neutral-600)" stroke-width="2.5" />
        <line x1="44" y1="98" x2="76" y2="98" stroke="#ef4444" stroke-width="3" />
        <line x1="52" y1="106" x2="68" y2="106" stroke="var(--c-neutral-600)" stroke-width="5" />
        <line x1="44" y1="114" x2="76" y2="114" stroke="#ef4444" stroke-width="3" />
        <line x1="52" y1="122" x2="68" y2="122" stroke="var(--c-neutral-600)" stroke-width="5" />
        <text
          x="24"
          y="22"
          font-size="14"
          font-weight="950"
          font-family="Times New Roman, STIX Two Text, serif"
          font-style="italic"
          fill="#ef4444"
          text-anchor="start"
        >
          E=8V
        </text>

        <!-- 上部导线 -->
        <line x1="60" y1="40" x2="240" y2="40" stroke="var(--c-neutral-600)" stroke-width="2.5" />

        <!-- C₂ 上极板连线 -->
        <line x1="150" y1="110" x2="150" y2="99" stroke="var(--c-neutral-600)" stroke-width="2.5" />
        <line x1="150" y1="99" x2="240" y2="99" stroke="var(--c-neutral-600)" stroke-width="2.5" />

        <!-- S1 导轨弧线 -->
        <path
          d="M 240 41 A 85 85 0 0 0 240 99"
          fill="none"
          stroke="var(--c-neutral-700)"
          stroke-dasharray="3,3"
          stroke-width="2"
        />

        <!-- S1 触点 1（充电） -->
        <g class="cursor-pointer group" @click="toggleS1('1')">
          <circle cx="240" cy="41" r="18" fill="transparent" />
          <circle
            cx="240"
            cy="41"
            r="11"
            fill="var(--c-surface-solid)"
            :stroke="s1Pos === '1' ? '#ef4444' : '#475569'"
            stroke-width="2.5"
          />
          <text x="240" y="47" font-size="15" font-weight="950" fill="#ef4444" text-anchor="middle">
            1
          </text>
        </g>

        <!-- S1 触点 0（断开） -->
        <g class="cursor-pointer group" @click="toggleS1('open')">
          <circle cx="235" cy="70" r="18" fill="transparent" />
          <circle
            cx="235"
            cy="70"
            r="11"
            fill="var(--c-surface-solid)"
            :stroke="s1Pos === 'open' ? '#94a3b8' : '#475569'"
            stroke-width="2.5"
          />
          <text
            x="235"
            y="76"
            font-size="15"
            font-weight="950"
            fill="var(--c-text-dim)"
            text-anchor="middle"
          >
            0
          </text>
        </g>

        <!-- S1 触点 2（共享） -->
        <g class="cursor-pointer group" @click="toggleS1('2')">
          <circle cx="240" cy="99" r="18" fill="transparent" />
          <circle
            cx="240"
            cy="99"
            r="11"
            fill="var(--c-surface-solid)"
            :stroke="
              s1Pos === '2'
                ? 'color-mix(in srgb, var(--c-accent-2) 55%, var(--c-danger))'
                : '#475569'
            "
            stroke-width="2.5"
          />
          <text
            x="240"
            y="105"
            font-size="15"
            font-weight="950"
            fill="color-mix(in srgb, var(--c-accent-2) 55%, var(--c-danger))"
            text-anchor="middle"
          >
            2
          </text>
        </g>

        <!-- S1 枢轴 -->
        <circle cx="320" cy="70" r="8" fill="var(--c-accent)" stroke="#101827" stroke-width="2" />
        <text
          x="320"
          y="47"
          font-size="14"
          font-weight="950"
          fill="var(--c-accent)"
          text-anchor="middle"
        >
          S₁
        </text>

        <!-- S1 刀臂 -->
        <line
          x1="320"
          y1="70"
          :x2="s1Target.x"
          :y2="s1Target.y"
          stroke="var(--c-accent)"
          stroke-width="5"
          stroke-linecap="round"
          class="transition-all duration-300 ease-in-out cursor-pointer"
          @click="toggleS1(s1Pos === 'open' ? '1' : s1Pos === '1' ? '2' : 'open')"
        />

        <!-- S₂ 接线柱3（断开，点击切换） -->
        <g class="cursor-pointer" @click="toggleS2(false)">
          <circle cx="242" cy="169" r="18" fill="transparent" />
          <circle
            cx="242"
            cy="169"
            r="11"
            fill="var(--c-surface-solid)"
            :stroke="!s2Closed ? '#94a3b8' : '#475569'"
            stroke-width="2.5"
          />
          <text
            x="242"
            y="175"
            font-size="15"
            font-weight="950"
            fill="var(--c-text-dim)"
            text-anchor="middle"
          >
            3
          </text>
        </g>

        <!-- S₂ 接线柱4（接地，点击切换） -->
        <g class="cursor-pointer" @click="toggleS2(true)">
          <circle cx="205" cy="178" r="18" fill="transparent" />
          <circle
            cx="205"
            cy="178"
            r="11"
            fill="var(--c-surface-solid)"
            :stroke="s2Closed ? '#34d399' : '#475569'"
            stroke-width="2.5"
          />
          <text
            x="205"
            y="184"
            font-size="15"
            font-weight="950"
            fill="var(--c-ok)"
            text-anchor="middle"
          >
            4
          </text>
        </g>

        <!-- S₂ 刀臂（枢轴在205,99，向右下~28°/正下摆动） -->
        <g>
          <path
            d="M 242 169 A 79 79 0 0 1 205 178"
            fill="none"
            stroke="var(--c-neutral-700)"
            stroke-dasharray="2,2"
            stroke-width="1.5"
          />
          <circle
            cx="205"
            cy="99"
            r="6"
            fill="var(--c-accent)"
            stroke="#101827"
            stroke-width="1.5"
          />
          <line
            x1="205"
            y1="99"
            :x2="s2Target.x"
            :y2="s2Target.y"
            stroke="var(--c-accent)"
            stroke-width="4"
            stroke-linecap="round"
            class="transition-all duration-200 ease-out"
          />
          <text
            x="193"
            y="92"
            font-size="14"
            font-weight="950"
            fill="var(--c-accent)"
            text-anchor="start"
          >
            S₂
          </text>
        </g>

        <!-- C₂ -->
        <g>
          <line
            x1="150"
            y1="130"
            x2="150"
            y2="180"
            stroke="var(--c-neutral-600)"
            stroke-width="2.5"
          />
          <line
            x1="120"
            y1="110"
            x2="180"
            y2="110"
            :stroke="bUpperColor"
            stroke-width="5"
            stroke-linecap="round"
            class="transition-colors duration-300"
          />
          <line
            x1="120"
            y1="130"
            x2="180"
            y2="130"
            :stroke="bLowerColor"
            stroke-width="5"
            stroke-linecap="round"
            class="transition-colors duration-300"
          />
          <text
            x="150"
            y="155"
            font-size="13"
            font-weight="950"
            fill="var(--c-velocity)"
            text-anchor="middle"
          >
            C₂
          </text>
          <text
            v-for="x in chargeXsC2"
            :key="'+' + x"
            :x="x"
            y="115"
            style="font-size: 10px"
            font-weight="950"
            fill="var(--c-force)"
            text-anchor="middle"
            dominant-baseline="central"
          >
            +
          </text>
          <text
            v-for="x in chargeXsC2"
            :key="'-' + x"
            :x="x"
            y="125"
            style="font-size: 10px"
            font-weight="950"
            fill="var(--c-velocity)"
            text-anchor="middle"
            dominant-baseline="central"
          >
            −
          </text>
        </g>

        <!-- S1 → C₁ 导线 -->
        <line x1="320" y1="70" x2="420" y2="70" stroke="var(--c-neutral-600)" stroke-width="2.5" />
        <line x1="420" y1="70" x2="420" y2="110" stroke="var(--c-neutral-600)" stroke-width="2.5" />

        <!-- C₁ -->
        <g>
          <line
            x1="420"
            y1="130"
            x2="420"
            y2="180"
            stroke="var(--c-neutral-600)"
            stroke-width="2.5"
          />
          <line
            x1="390"
            y1="110"
            x2="450"
            y2="110"
            :stroke="aUpperColor"
            stroke-width="5"
            stroke-linecap="round"
            class="transition-colors duration-300"
          />
          <line
            x1="390"
            y1="130"
            x2="450"
            y2="130"
            :stroke="aLowerColor"
            stroke-width="5"
            stroke-linecap="round"
            class="transition-colors duration-300"
          />
          <text
            x="420"
            y="155"
            font-size="13"
            font-weight="950"
            fill="var(--c-ok)"
            text-anchor="middle"
          >
            C₁
          </text>
          <text
            v-for="x in chargeXsC1"
            :key="'+' + x"
            :x="x"
            y="115"
            style="font-size: 10px"
            font-weight="950"
            fill="var(--c-force)"
            text-anchor="middle"
            dominant-baseline="central"
          >
            +
          </text>
          <text
            v-for="x in chargeXsC1"
            :key="'-' + x"
            :x="x"
            y="125"
            style="font-size: 10px"
            font-weight="950"
            fill="var(--c-velocity)"
            text-anchor="middle"
            dominant-baseline="central"
          >
            −
          </text>
        </g>

        <!-- 电压表 V（与 C₁ 并联） -->
        <line x1="420" y1="70" x2="500" y2="70" stroke="var(--c-neutral-600)" stroke-width="2.5" />
        <line x1="500" y1="70" x2="500" y2="95" stroke="var(--c-neutral-600)" stroke-width="2.5" />
        <line
          x1="500"
          y1="145"
          x2="500"
          y2="180"
          stroke="var(--c-neutral-600)"
          stroke-width="2.5"
        />
        <g class="cursor-pointer" @click="performReset">
          <circle
            cx="500"
            cy="120"
            r="20"
            fill="var(--c-surface-solid)"
            stroke="var(--c-ok)"
            stroke-width="2.5"
          />
          <text
            x="500"
            y="128"
            font-size="18"
            font-weight="950"
            font-family="Times New Roman, STIX Two Text, serif"
            font-style="italic"
            fill="var(--c-ok)"
            text-anchor="middle"
          >
            V
          </text>
        </g>
      </svg>

      <!-- 电压表读数 -->
      <div class="circ-voltage-badge">
        <span class="circ-voltage-value">{{ qA.toFixed(2) }}</span>
        <span class="circ-voltage-unit">V</span>
      </div>

      <!-- 极性图例 -->
      <PolarityLegend class="mb-2" />
    </div>

    <!-- 底部状态栏 -->
    <div class="circ-status-bar">
      <div class="flex items-center gap-1.5">
        <span class="circ-status-key">S₁</span>
        <span
          :class="s1Pos === '1' ? 'text-danger' : s1Pos === '2' ? 'text-share' : 'text-dim'"
          class="circ-status-val"
          >{{ s1StatusText }}</span
        >
      </div>
      <div class="flex items-center gap-1.5">
        <span class="circ-status-key">S₂</span>
        <span :class="s2Closed ? 'text-ok' : 'text-faint'" class="circ-status-val">{{
          s2StatusText
        }}</span>
      </div>
      <button @click="performReset" class="circ-reset-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        重置
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── SVG 容器：电路占满空间 ── */
.circ-svg-wrap {
  position: relative;
  border: 1px solid color-mix(in srgb, var(--c-neutral-700) 30%, transparent);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--c-neutral-900) 50%, transparent);
}

svg text {
  pointer-events: none !important;
  user-select: none !important;
}

/* ── 电压表读数覆盖层 ── */
.circ-voltage-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;

  display: flex;
  gap: 0.3rem;
  align-items: baseline;

  padding: 0.35rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--c-ok) 35%, transparent);
  border-radius: var(--radius-sm);

  background: color-mix(in srgb, var(--c-neutral-900) 85%, transparent);

  backdrop-filter: blur(8px);
  pointer-events: none;
}

.circ-voltage-label {
  color: var(--c-ok);
  font-weight: 950;
  font-size: 0.7rem;
  opacity: 0.7;
}

.circ-voltage-value {
  color: var(--c-ok);

  font-weight: 900;
  font-size: 1.4rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  line-height: 1;
  text-shadow: 0 0 14px color-mix(in srgb, var(--c-ok) 40%, transparent);
}

.circ-voltage-unit {
  color: var(--c-ok);
  font-weight: 700;
  font-size: 0.8rem;
}

/* ── 底部状态栏 ── */
.circ-status-bar {
  display: flex;
  gap: 1.25rem;
  align-items: center;

  padding: 0.5rem 1rem;
  border: 1px solid color-mix(in srgb, var(--c-neutral-700) 30%, transparent);
  border-radius: var(--radius-md);

  background: color-mix(in srgb, var(--c-neutral-900) 70%, transparent);
}

.circ-status-key {
  color: var(--c-accent);
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
}

.circ-status-val {
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* 「连接另一电容器」的紫色：设计系统没有紫色 token，按 §3 用蓝 + 红 token 混出同色相，
   与 S₁ 触点 2 的描边同值；比写死 #c084fc / #a78bfa 更能跟着共享 token 走。 */
.text-share {
  color: color-mix(in srgb, var(--c-accent-2) 55%, var(--c-danger));
}

.circ-reset-btn {
  display: flex;
  gap: 0.35rem;
  align-items: center;

  margin-left: auto;
  padding: 0.35rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--c-danger) 30%, transparent);
  border-radius: var(--radius-sm);

  background: color-mix(in srgb, var(--c-danger) 25%, transparent);
  color: var(--c-danger);

  font-weight: 700;
  font-size: 0.75rem;

  cursor: pointer;

  transition: all 0.2s;
}

.circ-reset-btn:hover {
  border-color: color-mix(in srgb, var(--c-danger) 50%, transparent);
  background: color-mix(in srgb, var(--c-danger) 45%, transparent);
}
</style>
