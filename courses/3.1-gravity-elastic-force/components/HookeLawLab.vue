<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 探究弹簧弹力与形变量的关系：弹簧上端用铁夹固定在铁架台上，下端逐个挂上钩码（每个 50 g）， 旁边立一把刻度尺——**尺子的 0 刻线正对"不挂钩码时弹簧自然悬挂的下端"**， 挂满 8
 * 个钩码时弹簧下端正好到尺子的最大刻度（10 cm）。 右侧坐标轴一开始是空的：拖动滑块改变钩码个数 → 弹力由钩码总重给出 F = nmg、 伸长量 x 从刻度尺上读出；
 * 点"记录数据"把当前一组 (x, F) 记到图上，记够两组后出现"拟合"按钮， 点它才画出过原点的拟合直线，并给出测得的劲度系数（最小二乘斜率）。
 */

const GRAVITY = 10;
/** 每个钩码 50 g；最多挂 8 个 → 总重最大 4 N、伸长最大 10 cm */
const HOOK_MASS = 50;
const HOOK_MAX = 8;
/** 这根弹簧每挂一个钩码，刻度尺上的读数就多 1.25 cm——真实弹簧的实测行为，不是用 k 反算出来的 */
const PER_HOOK_STRETCH = 0.0125;
/** 画布比例：1 mm 画 1.5 个用户单位；弹簧原长 60 mm */
const PX_PER_MM = 1.5;
const REST_MM = 60;
const SPRING_X = 141;
const SPRING_TOP = 60;
const AMP = 19;
/** 每个钩码的画布厚度（含间隙），用来逐个往下摞 */
const HOOK_H = 7;
const HOOK_GAP = 1;

const count = ref(4);
const recorded = ref<{ x: number; y: number }[]>([]);
const fitted = ref(false);

/** 弹力 F = nmg：由"挂了几个钩码"算出来（已知量，允许带表达式） */
const force = computed(() => ((count.value * HOOK_MASS) / 1000) * GRAVITY);
/** 伸长量 x：实验里**从刻度尺上读出来的数**，不经过 k */
const stretch = computed(() => count.value * PER_HOOK_STRETCH);
/** 弹簧长度（画布单位） */
const coilLength = computed(() => (REST_MM + stretch.value * 1000) * PX_PER_MM);
/** 弹簧自然悬挂时的长度（画布单位）——刻度尺 0 刻线就在这个高度 */
const restLength = REST_MM * PX_PER_MM;
/** 弹簧下端的高度（画布单位） */
const bottomY = computed(() => SPRING_TOP + coilLength.value);
/** 不挂钩码时下端的高度 = 尺子 0 刻线 */
const zeroY = SPRING_TOP + restLength;

const springPath = computed(() => {
  const length = coilLength.value;
  const coils = 9;
  const start = SPRING_TOP + 8;
  const step = (length - 16) / (coils * 2);
  let path = `M ${SPRING_X} ${SPRING_TOP} L ${SPRING_X} ${start}`;

  for (let index = 0; index < coils * 2; index += 1)
    path += ` L ${index % 2 === 0 ? SPRING_X + AMP : SPRING_X - AMP} ${start + step * (index + 1)}`;

  return `${path} L ${SPRING_X} ${SPRING_TOP + length}`;
});

/** 把当前一组 (x, F) 记到图上（同一位置不重复记） */
const record = (): void => {
  const point = { x: Number(stretch.value.toFixed(6)), y: Number(force.value.toFixed(6)) };

  if (!recorded.value.some((item) => Math.abs(item.x - point.x) < 1e-6)) {
    recorded.value = [...recorded.value, point];
    fitted.value = false;
  }
};

/** 清除全部记录 */
const clear = (): void => {
  recorded.value = [];
  fitted.value = false;
};

/** 过原点的最小二乘斜率——这才是"测出来的"劲度系数 k（是结论，不是前提） */
const fittedK = computed(() => {
  let sxy = 0;
  let sxx = 0;

  for (const point of recorded.value) {
    sxy += point.x * point.y;
    sxx += point.x * point.x;
  }

  return sxx > 0 ? sxy / sxx : 0;
});

/** 拟合直线（点了"拟合"之后才出现） */
const fitCurve = computed(() =>
  fitted.value && recorded.value.length >= 2
    ? [
        {
          points: [
            { x: 0, y: 0 },
            { x: 0.12, y: fittedK.value * 0.12 },
          ],
          stroke: "var(--c-accent)",
          width: 3.4,
        },
      ]
    : [],
);

/** 图上元素：已记录的点（散点）+ 拟合后的当前工作点 */
const plotLabels = computed(() => [
  ...recorded.value.map((point) => ({ x: point.x, y: point.y, dot: 6, dotColor: "var(--c-text)" })),
  ...(fitted.value
    ? [
        {
          x: stretch.value,
          y: force.value,
          dot: 7,
          dotColor: "var(--c-danger)",
          tex: "P",
          anchor: "top-right" as const,
          color: "var(--c-danger)",
        },
      ]
    : []),
]);
</script>

<template>
  <div class="hl">
    <div class="hl-left">
      <div class="hl-count">
        钩码个数 <Latex tex="n" /> = <b class="hl-num">{{ count }}</b
        >（每个 <Latex tex="50\ \text{g}" />）
      </div>
      <input
        v-model.number="count"
        class="hl-slider"
        type="range"
        min="0"
        :max="HOOK_MAX"
        step="1"
      />
      <div class="hl-value">
        钩码总重 <Latex tex="F = nmg" /> = <b class="hl-num">{{ force.toFixed(1) }}</b>
        <Latex tex="\text{N}" />
      </div>
      <div class="hl-value">
        尺上读数 <Latex tex="x" /> = <b class="hl-num">{{ (stretch * 100).toFixed(2) }}</b>
        <Latex tex="\text{cm}" />
      </div>
      <div v-if="fitted" class="hl-value">
        图线斜率 <Latex tex="k" /> = <b class="hl-num">{{ fittedK.toFixed(1) }}</b>
        <Latex tex="\text{N/m}" />
      </div>
      <div class="hl-btns">
        <button class="hl-btn" type="button" @click="record">记录数据</button>
        <button
          class="hl-btn fit"
          type="button"
          :disabled="recorded.length < 2"
          @click="fitted = true"
        >
          拟合直线
        </button>
        <button class="hl-btn ghost" type="button" @click="clear">清除</button>
      </div>
    </div>
    <div class="hl-fig">
      <svg
        viewBox="0 0 260 420"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="铁架台、弹簧、钩码与刻度尺"
      >
        <rect x="14" y="386" width="156" height="18" rx="4" fill="#64748b" />
        <rect x="64" y="40" width="13" height="346" rx="3" fill="#94a3b8" />
        <rect x="77" y="46" width="60" height="9" rx="3" fill="#94a3b8" />
        <rect x="131" y="40" width="17" height="22" rx="3" fill="#64748b" />
        <path
          :d="springPath"
          fill="none"
          stroke="#e2a846"
          stroke-width="3.2"
          stroke-linecap="round"
        />
        <line
          :x1="70"
          :y1="zeroY"
          x2="168"
          :y2="zeroY"
          stroke="#94a3b8"
          stroke-width="1.4"
          stroke-dasharray="6 5"
        />
        <text x="66" :y="zeroY - 6" font-size="14" fill="#94a3b8" text-anchor="end">原长</text>
        <CourseArrow
          :from="{ x: SPRING_X + 26, y: zeroY }"
          :to="{ x: SPRING_X + 26, y: bottomY }"
          stroke="#60a5fa"
          stroke-width="2.8"
        />
        <text
          :x="SPRING_X + 32"
          :y="(zeroY + bottomY) / 2 + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="#60a5fa"
        >
          x
        </text>
        <line
          :x1="SPRING_X"
          :y1="bottomY"
          :x2="SPRING_X"
          :y2="bottomY + 10"
          stroke="#64748b"
          stroke-width="2.6"
        />
        <g v-if="count > 0">
          <rect
            v-for="index in count"
            :key="index"
            :x="SPRING_X - 23"
            :y="bottomY + 10 + (index - 1) * (HOOK_H + HOOK_GAP)"
            width="46"
            :height="HOOK_H"
            rx="2.5"
            fill="rgba(226,168,70,0.28)"
            stroke="#e2a846"
            stroke-width="1.6"
          />
        </g>
        <Ruler
          :x="176"
          :y="126"
          :width="40"
          :height="198"
          :length="100"
          :thickness="40"
          :show-numbers="true"
          unit="cm"
          color="#cbd5e1"
          body-color="rgba(148,163,184,0.18)"
        />
      </svg>
    </div>
    <div class="hl-plot">
      <CoordAxes
        :x-range="[0, 0.14]"
        :y-range="[0, 6.5]"
        :x-axis="{ quantity: 'x', unit: 'm' }"
        :y-axis="{ quantity: 'F', unit: 'N' }"
        :ticks="{ x: [0.05, 0.1], y: [2, 4, 6] }"
        :curves="fitCurve"
        :labels="plotLabels"
        :view="{ width: 460, height: 420 }"
      />
    </div>
  </div>
</template>

<style scoped>
.hl {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.hl-left {
  display: flex;
  flex: 0 0 21%;
  flex-direction: column;
  gap: 0.45rem;

  min-width: 0;
}

.hl-count {
  color: var(--c-text);
  font-size: 0.86rem;
}

.hl-slider {
  width: 100%;
  accent-color: var(--c-accent);
}

.hl-value {
  color: var(--c-text);
  font-size: 0.9rem;
}

.hl-num {
  color: var(--c-accent);
  font-size: 1.05rem;
}

.hl-fig {
  display: flex;
  flex: 0 0 26%;
  align-items: center;
  justify-content: center;
}

.hl-fig svg {
  display: block;
  width: auto;
  max-width: 100%;
  height: 16rem;
}

.hl-plot {
  flex: 0 1 16rem;
  min-width: 0;
}

.hl-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
}

.hl-btn {
  padding: 0.18rem 0.6rem;
  border: 1px solid rgb(226 168 70 / 45%);
  border-radius: 2rem;

  background: rgb(226 168 70 / 12%);
  color: #e2a846;

  font-size: 0.78rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.hl-btn.fit {
  border-color: rgb(96 165 250 / 45%);
  background: rgb(96 165 250 / 12%);
  color: #60a5fa;
}

.hl-btn.ghost {
  border-color: var(--c-border);
  background: transparent;
  color: var(--c-text-dim);
}

.hl-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

.hl-btn:hover:not(:disabled) {
  filter: brightness(1.2);
}
</style>
