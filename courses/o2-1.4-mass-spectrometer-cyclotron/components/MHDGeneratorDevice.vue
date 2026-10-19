<!--
  P17 / P18 · 磁流体发电机（MHD generator）
  两平行金属板 A（上）B（下）水平放置、间距 d，板间是垂直纸面向里的匀强磁场（裸 × 阵列 + B 标注）；
  左侧喷入等离子体束（红 + ／ 蓝 − 小球，标 v）。稳定时 q·U/d = qvB ⇒ U = Bvd。
  mode="lab"：**左图右面板**（总高 = max(图, 面板)，容器 700px 时 ≤ 240px）——左栏装置图、右栏 v / B / d 三个单行滑块 +
  大号读数 U = Bvd（下附代入数值小字行）；按 step 分步出「离子偏转与板上堆积 → 板间电场与 U 标注 → 外电路电阻 R」；
  mode="figure"：只给干净装置图（两板、间距 d、磁场阵列、水平束流 v），不画偏转 / 堆积 / 电场 / 外电路。
-->
<script setup lang="ts">
import { computed, ref } from "vue";

/** 画布上的一个点（viewBox 用户单位） */
interface Point {
  x: number;
  y: number;
}

/** 束流里的一颗带电粒子（正电荷红 / 负电荷蓝） */
interface ChargeBall extends Point {
  sign: string;
  color: string;
}

const { mode = "lab", step = 0 } = defineProps<{
  /** `lab` = 带滑块与读数的演示；`figure` = 只给干净装置图 */
  mode?: "figure" | "lab";
  /** 页面点击步（只对 lab 有效）：1 出偏转与堆积、2 出板间电场与 U、3 出外电路 */
  step?: number;
}>();

/* ── 可控量：喷入速度 v、磁感应强度 B、板间距 d ── */
const v = ref(1000);
const B = ref(0.5);
const d = ref(0.2);

/** 稳定时电场力与洛伦兹力平衡：q·U/d = qvB ⇒ U = Bvd（真实公式，随三个滑块变化） */
const voltage = computed(() => B.value * v.value * d.value);

/** 读数里的数字：去掉多余小数位（0.50 → 0.5、100.00 → 100） */
const fmt = (num: number, digits = 3): string => String(Number(num.toFixed(digits)));

const readoutTex = computed(() => `U = Bvd = ${fmt(voltage.value)}\\ \\text{V}`);
const substTex = computed(
  () =>
    `${B.value.toFixed(2)}\\ \\text{T} \\times ${v.value}\\ \\text{m/s} \\times ${d.value.toFixed(2)}\\ \\text{m}`,
);

const sliders = computed(() => [
  {
    key: "v",
    labelTex: "v",
    valueTex: `${v.value}\\ \\text{m/s}`,
    value: v.value,
    min: 200,
    max: 2000,
    step: 50,
    color: "var(--c-velocity)",
  },
  {
    key: "B",
    labelTex: "B",
    valueTex: `${B.value.toFixed(2)}\\ \\text{T}`,
    value: B.value,
    min: 0.2,
    max: 1,
    step: 0.05,
    color: "var(--c-accent)",
  },
  {
    key: "d",
    labelTex: "d",
    valueTex: `${d.value.toFixed(2)}\\ \\text{m}`,
    value: d.value,
    min: 0.1,
    max: 0.5,
    step: 0.05,
    color: "var(--c-physics)",
  },
]);

const onInput = (key: string, event: Event): void => {
  const next = Number((event.target as HTMLInputElement).value);
  if (key === "v") v.value = next;
  else if (key === "B") B.value = next;
  else d.value = next;
};

/* ── 画布几何（viewBox 用户单位，按 16px 体系给；纵向上裁到 24–276，板间距拉满时不空、不越界）── */
const Y_MID = 150; // 束流中线 = 两板的对称线
const X_IN = 170; // 板左端（等离子体从这里进入板间）
const X_OUT = 470; // 板右端（外电路从这里接出）
const T_PLATE = 7; // 板的厚度（与同课 SpeedSelectorDevice 的极板同宽）
const X_SPLIT = 270; // 离子轨迹打到板上的横坐标
const X_DIM = 452; // 间距 d 的双头标注线
const X_RES = 590; // 外电路电阻的中心（竖放）
const DOT_X0 = 190; // 磁场阵列区域
const DOT_X1 = 412;
const DOT_SP = 18; // 阵列间距（规范值）
const BEAM_X0 = 30; // 束流起点
const BEAM_X1 = 230; // 未偏转时束流末端
const BEAM_XS = [45, 80, 115, 150, 185, 220]; // 束流小球的位置
const U_X = 304; // 电压 U 的标注位置（正对中间那条电场箭头）
const E_XS = [236, U_X, 372]; // 板间电场箭头
const MARK_XS = [286, 318, 350]; // 板上电荷堆积记号

/** 画出来的板间距 ∝ d（d: 0.1 m → 60、0.5 m → 156） */
const gap = computed(() => 60 + 240 * (d.value - 0.1));
const yA = computed(() => Y_MID - gap.value / 2); // 上板 A（正极）
const yB = computed(() => Y_MID + gap.value / 2); // 下板 B（负极）
const yAIn = computed(() => yA.value + T_PLATE / 2); // 上板内表面
const yBIn = computed(() => yB.value - T_PLATE / 2); // 下板内表面

const lab = computed(() => mode === "lab");
const showDeflect = computed(() => lab.value && step >= 1);
const showField = computed(() => lab.value && step >= 2);
const showCircuit = computed(() => lab.value && step >= 3);

/* ── 板间匀强磁场：裸 × 阵列，行数随板间距变化、始终在板间居中 ── */
const dotCols = Math.floor((DOT_X1 - DOT_X0) / DOT_SP) + 1;
const dotRows = computed(() => Math.max(2, Math.floor((gap.value - 28) / DOT_SP) + 1));
const dotOrigin = computed<Point>(() => ({
  x: DOT_X0 + (DOT_X1 - DOT_X0 - (dotCols - 1) * DOT_SP) / 2,
  y: Y_MID - ((dotRows.value - 1) * DOT_SP) / 2,
}));

/* ── 等离子体束的水平段：一旦开始画偏转，束流就止于板口 ── */
const beamEnd = computed(() => (showDeflect.value ? X_IN : BEAM_X1));
const PLUS = "+";
const MINUS = "−";
const PLUS_COLOR = "var(--c-danger)";
const MINUS_COLOR = "var(--c-velocity)";

const beamBalls = computed<ChargeBall[]>(() => {
  const xs = showDeflect.value ? BEAM_XS.filter((x) => x <= X_IN) : BEAM_XS;
  return xs.map((x, i) => ({
    x,
    y: Y_MID,
    sign: i % 2 === 0 ? PLUS : MINUS,
    color: i % 2 === 0 ? PLUS_COLOR : MINUS_COLOR,
  }));
});

/** 喷入速度 v 的箭头与标注 */
const vFrom: Point = { x: 58, y: Y_MID - 30 };
const vTo: Point = { x: 138, y: Y_MID - 30 };
const vLabel: Point = { x: 98, y: Y_MID - 42 };

/** 二次贝塞尔曲线上参数 t 处的点（离子偏转轨迹） */
const quadPoint = (p0: Point, c: Point, p1: Point, t: number): Point => ({
  x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * c.x + t ** 2 * p1.x,
  y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t ** 2 * p1.y,
});

/** 偏转：正离子向上板 A 弯、负离子向下板 B 弯（v 向右、B 向里 ⇒ F = qv×B） */
const deflect = computed(() => {
  const p0: Point = { x: X_IN, y: Y_MID };
  const cTop: Point = { x: X_IN + 80, y: Y_MID };
  const cBot: Point = { x: X_IN + 80, y: Y_MID };
  const endTop: Point = { x: X_SPLIT, y: yAIn.value };
  const endBot: Point = { x: X_SPLIT, y: yBIn.value };
  const path = (c: Point, end: Point): string =>
    `M ${p0.x} ${p0.y} Q ${c.x} ${c.y} ${end.x} ${end.y}`;
  const balls: ChargeBall[] = [0.52, 0.84].flatMap((t) => {
    const onTop = quadPoint(p0, cTop, endTop, t);
    const onBot = quadPoint(p0, cBot, endBot, t);
    return [
      { x: onTop.x, y: onTop.y, sign: PLUS, color: PLUS_COLOR },
      { x: onBot.x, y: onBot.y, sign: MINUS, color: MINUS_COLOR },
    ];
  });
  return { top: path(cTop, endTop), bot: path(cBot, endBot), balls };
});

/** 板上堆积的电荷记号（贴在内表面一侧）：正电荷在上板 A、负电荷在下板 B */
const marks = computed<ChargeBall[]>(() =>
  MARK_XS.flatMap((x) => [
    { x, y: yAIn.value + 16, sign: PLUS, color: PLUS_COLOR },
    { x, y: yBIn.value - 16, sign: MINUS, color: MINUS_COLOR },
  ]),
);

/** 板间电场（从正极板 A 指向负极板 B）与电压标注 */
const eArrows = computed(() =>
  E_XS.map((x) => ({ from: { x, y: yAIn.value + 8 }, to: { x, y: yBIn.value - 8 } })),
);
const uLabelY = computed(() => yA.value - 14);

/** 外电路：两条导线分别止于上、下板右端与电阻两端（电阻竖放，占 48） */
const wirePaths = computed(() => [
  `M ${X_OUT} ${yA.value} H ${X_RES} V ${Y_MID - 24}`,
  `M ${X_OUT} ${yB.value} H ${X_RES} V ${Y_MID + 24}`,
]);

/** 间距 d 的双头标注：两条箭头分别指向上、下板内表面 */
const dimFrom: Point = { x: X_DIM, y: Y_MID };
const dimTop = computed<Point>(() => ({ x: X_DIM, y: yAIn.value }));
const dimBot = computed<Point>(() => ({ x: X_DIM, y: yBIn.value }));

/** 压在磁场阵列 / 束流上的文字：加一层深色描边光晕 */
const HALO = { stroke: "var(--c-bg)", "stroke-width": 4, "paint-order": "stroke" };
</script>

<template>
  <div class="mg-wrap" :class="lab ? 'mg-wrap-lab' : 'mg-wrap-figure'">
    <div class="mg-fig">
      <svg
        class="mg-svg"
        :class="{ 'mg-svg-figure': !lab }"
        :viewBox="lab ? '0 24 640 252' : '0 24 520 252'"
        :width="lab ? undefined : 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- 板间匀强磁场：裸 × 阵列（垂直纸面向里） -->
        <FieldDots
          :x="dotOrigin.x"
          :y="dotOrigin.y"
          :cols="dotCols"
          :rows="dotRows"
          :spacing="DOT_SP"
          :size="4"
          :line-width="1.4"
          :opacity="0.65"
          dir="in"
        />
        <!-- 两平行金属板 A（上）B（下） -->
        <line
          :x1="X_IN"
          :y1="yA"
          :x2="X_OUT"
          :y2="yA"
          stroke="var(--c-neutral-300)"
          :stroke-width="T_PLATE"
          stroke-linecap="round"
        />
        <line
          :x1="X_IN"
          :y1="yB"
          :x2="X_OUT"
          :y2="yB"
          stroke="var(--c-neutral-300)"
          :stroke-width="T_PLATE"
          stroke-linecap="round"
        />
        <!-- 间距 d 的双头标注 -->
        <CourseArrow
          :from="dimFrom"
          :to="dimTop"
          stroke="var(--c-neutral-300)"
          :stroke-width="2.2"
        />
        <CourseArrow
          :from="dimFrom"
          :to="dimBot"
          stroke="var(--c-neutral-300)"
          :stroke-width="2.2"
        />
        <!-- 等离子体束的水平段（深色垫底，压住阵列上的记号） -->
        <line
          :x1="BEAM_X0"
          :y1="Y_MID"
          :x2="beamEnd"
          :y2="Y_MID"
          stroke="var(--c-bg)"
          stroke-opacity="0.9"
          :stroke-width="20"
          stroke-linecap="round"
        />
        <g v-for="(ball, i) in beamBalls" :key="`mg-beam-${i}`">
          <circle
            :cx="ball.x"
            :cy="ball.y"
            r="6.5"
            fill="var(--c-bg)"
            fill-opacity="0.75"
            :stroke="ball.color"
            stroke-width="1.8"
          />
          <text
            :x="ball.x"
            :y="ball.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="11"
            :fill="ball.color"
          >
            {{ ball.sign }}
          </text>
        </g>
        <!-- 喷入速度 v -->
        <CourseArrow :from="vFrom" :to="vTo" stroke="var(--c-velocity)" :stroke-width="3.4" />
        <!-- step ≥ 2：板间电场（由 A 指向 B），画在偏转轨迹之下 -->
        <template v-if="showField">
          <CourseArrow
            v-for="(arrow, i) in eArrows"
            :key="`mg-e-${i}`"
            :from="arrow.from"
            :to="arrow.to"
            stroke="var(--c-physics)"
            :stroke-width="2.6"
          />
        </template>
        <!-- step ≥ 1：正负离子分别偏向上、下板，并在板上堆积 -->
        <template v-if="showDeflect">
          <path
            :d="deflect.top"
            fill="none"
            stroke="var(--c-danger)"
            stroke-width="3"
            stroke-linecap="round"
          />
          <path
            :d="deflect.bot"
            fill="none"
            stroke="var(--c-velocity)"
            stroke-width="3"
            stroke-linecap="round"
          />
          <g v-for="(ball, i) in deflect.balls" :key="`mg-traj-${i}`">
            <circle
              :cx="ball.x"
              :cy="ball.y"
              r="6"
              fill="var(--c-bg)"
              fill-opacity="0.75"
              :stroke="ball.color"
              stroke-width="1.8"
            />
            <text
              :x="ball.x"
              :y="ball.y"
              text-anchor="middle"
              dominant-baseline="central"
              font-family="KaTeX_Main"
              font-size="10"
              :fill="ball.color"
            >
              {{ ball.sign }}
            </text>
          </g>
          <text
            v-for="(mark, i) in marks"
            :key="`mg-mark-${i}`"
            v-bind="HALO"
            :x="mark.x"
            :y="mark.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-family="KaTeX_Main"
            font-size="20"
            :fill="mark.color"
          >
            {{ mark.sign }}
          </text>
        </template>
        <!-- step ≥ 3：外电路（导线止于电阻两端） -->
        <template v-if="showCircuit">
          <g fill="none" stroke="var(--c-text)" stroke-width="1.6" stroke-linecap="round">
            <path v-for="(wire, i) in wirePaths" :key="`mg-wire-${i}`" :d="wire" />
          </g>
          <CircuitResistor :x="X_RES" :y="Y_MID" orientation="vertical" label="R" />
        </template>
        <!-- 标注写在最上层：板名、间距、磁场、速度、电压 -->
        <text
          v-bind="HALO"
          x="180"
          :y="yA - 12"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-neutral-300)"
        >
          A
        </text>
        <text
          v-bind="HALO"
          x="180"
          :y="yB + 26"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-neutral-300)"
        >
          B
        </text>
        <text
          v-bind="HALO"
          :x="DOT_X1 + 14"
          :y="yA + 30"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-accent)"
        >
          B
        </text>
        <text
          v-bind="HALO"
          :x="X_DIM + 12"
          :y="Y_MID + 7"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-neutral-300)"
        >
          d
        </text>
        <text
          v-bind="HALO"
          :x="vLabel.x"
          :y="vLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-velocity)"
        >
          v
        </text>
        <text
          v-if="showField"
          v-bind="HALO"
          :x="U_X"
          :y="uLabelY"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-physics)"
        >
          U
        </text>
      </svg>
    </div>

    <!-- lab：右栏三个单行滑块 + 大号读数（总高与左栏图取大者，容器 700px 时 ≤ 240px） -->
    <div v-if="lab" class="mg-panel">
      <div class="mg-sliders">
        <div v-for="item in sliders" :key="item.key" class="mg-slider">
          <span class="mg-slider-name" :style="{ color: item.color }">
            <Latex :tex="item.labelTex" />
          </span>
          <input
            class="mg-range"
            type="range"
            :min="item.min"
            :max="item.max"
            :step="item.step"
            :value="item.value"
            :style="{ accentColor: item.color }"
            @input="onInput(item.key, $event)"
          />
          <span class="mg-slider-value" :style="{ color: item.color }">
            <Latex :tex="item.valueTex" />
          </span>
        </div>
      </div>
      <div class="mg-readout">
        <Latex class="mg-readout-main" :tex="readoutTex" />
        <span class="mg-readout-sub mini-note"><Latex :tex="substTex" /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mg-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  width: 100%;
  min-width: 0;
}

/* lab：左图右面板，总高由 max(图, 面板) 决定（容器 700px 时 ≤ 240px） */
.mg-wrap-lab {
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.mg-wrap-figure {
  width: max-content;
  max-width: 100%;
}

.mg-fig {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  min-width: 0;
}

.mg-svg {
  display: block;
  width: 100%;
  height: auto;
  max-height: 340px;
}

.mg-svg-figure {
  width: 520px;
  max-width: 100%;
  max-height: none;
  margin-inline: auto;
}

.mg-panel {
  display: flex;
  flex: 0 0 290px;
  flex-direction: column;
  gap: 0.4rem;

  min-width: 0;
  padding: 0.5rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);
}

.mg-sliders {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mg-slider {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.4rem;
  align-items: center;

  min-width: 0;
}

.mg-slider-name {
  font-weight: 700;
  font-size: 0.95rem;
}

.mg-slider-value {
  font-weight: 800;
  font-size: 0.82rem;
  white-space: nowrap;
}

.mg-range {
  width: 100%;
  height: 1rem;
  cursor: pointer;
}

.mg-readout {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: flex-start;

  min-width: 0;
  padding-top: 0.3rem;
  border-top: 1px solid var(--c-border);
}

.mg-readout-main {
  color: var(--c-accent);

  font-weight: 800;
  font-size: 1.22rem;
  line-height: 1.1;
  white-space: nowrap;
}

.mg-readout-sub {
  color: var(--c-text-dim);
  line-height: 1.2;
  white-space: nowrap;
}
</style>
