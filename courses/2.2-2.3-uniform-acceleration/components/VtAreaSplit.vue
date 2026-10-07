<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * V-t 图下方面积的拆分：把梯形看成"矩形 v₀T"与"三角形 ½aT²"的叠加， 三种模式分别对应匀加速、匀减速、以及图线穿过 t 轴（正负面积取代数和）。
 *
 * 随翻页分 4 步：图线/梯形 → 矩形 → 三角形 → 合计数值。 所有数值由公式算出（面积与位移双向核对），分步只切 visibility，不删不插、不位移。
 * 坐标系（轴线/箭头/刻度/O/标签/曲线/区域填充/点标注）全部交给共享 `CoordAxes`，本组件只留"这段运动的数据 + 右侧读数面板 + 分步节奏"。
 */

type ModeName = "accel" | "decel" | "reverse";

interface ModeConfig {
  /** 初速度 m/s */
  v0: number;
  /** 加速度 m/s² */
  a: number;
  /** 观察的时长 s */
  T: number;
  /** 纵轴显示的负向范围 m/s（≤0） */
  axisMin: number;
  /** 纵轴显示的正向范围 m/s */
  axisMax: number;
  kind: ModeName;
}

const { mode = "accel" } = defineProps<{ mode?: ModeName }>();

const { $clicks } = useSlideContext();

const MODES: Record<ModeName, ModeConfig> = {
  /**
   * 匀加速：v₀ = 5，T = 6 内匀升到 15（a = 10/6） → 矩形 v₀T = 30、三角形 ½aT² = 30、位移 x = 60。 v₀ 给足 5（而不是
   * 2）是为了让底下那块矩形有分量——太小的 v₀ 会把矩形压成一条扁条。
   */
  // axisMax 比末速度多留 1.5：末端箭头才不会顶在 15 那个刻度上（横轴 6/6.4 是同一口径）
  accel: { v0: 5, a: 10 / 6, T: 6, axisMin: 0, axisMax: 16.5, kind: "accel" },
  /** 匀减速：v₀ = 12，a = −1.5，T = 6 → v = 3，x = 45 */
  decel: { v0: 12, a: -1.5, T: 6, axisMin: 0, axisMax: 12.5, kind: "decel" },
  /** 减速到反向：v₀ = 8，a = −2，T = 6 → v = −4，越过 t 轴后位移取负 */
  reverse: { v0: 8, a: -2, T: 6, axisMin: -6, axisMax: 12, kind: "reverse" },
};

const cfg = computed(() => MODES[mode]);

const vEnd = computed(() => cfg.value.v0 + cfg.value.a * cfg.value.T);
/** 位移（= 面积的正负代数和，这里用公式算，用来和图上面积核对） */
const exact = computed(
  () => cfg.value.v0 * cfg.value.T + 0.5 * cfg.value.a * cfg.value.T * cfg.value.T,
);

/** 越过 t 轴的时刻（解 v₀ + at = 0） */
const tZero = computed(() => -cfg.value.v0 / cfg.value.a);
/** T 轴上方的正位移面积 */
const posArea = computed(() => 0.5 * cfg.value.v0 * tZero.value);
/** T 轴下方的负位移面积（带符号） */
const negArea = computed(() => 0.5 * vEnd.value * (cfg.value.T - tZero.value));

const step = computed(() => Math.max(0, Math.min($clicks.value, 3)));

const panelTitle = computed(() => {
  switch (cfg.value.kind) {
    case "decel": {
      return "外接矩形 − 缺角三角形";
    }
    case "reverse": {
      return "完整矩形 − 大三角形";
    }
    default: {
      return "矩形 + 三角形";
    }
  }
});

/**
 * 数值 + 单位的 KaTeX 源码
 *
 * @param value 数值（m）
 * @returns KaTeX 源码字符串
 */
const meterTex = (value: number): string => `${value.toFixed(1)}\\ \\text{m}`;

/**
 * 带正负号的长度读数（面积、位移都可能为负）
 *
 * @param value 数值（m）
 * @returns KaTeX 源码字符串
 */
const signedMeterTex = (value: number): string =>
  `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(1)}\\ \\text{m}`;

/** 矩形里被斜线剪掉的那部分（轴上方）＝矩形 − 正位移 */
const cutArea = computed(() => cfg.value.v0 * cfg.value.T - posArea.value);

/**
 * 面板读数：每行 = 中文名 + 数学表达式（KaTeX）+ 读数（KaTeX）
 *
 * @returns 当前模式的面板行（含各自出现的点击步）
 */
const rows = computed(() => {
  const config = cfg.value;

  if (config.kind === "reverse") {
    return [
      {
        name: "完整外接矩形",
        nameTex: "v_0t",
        valueTex: meterTex(config.v0 * config.T),
        tone: "rect",
        showAt: 1,
      },
      {
        name: "减去大三角形",
        nameTex: "\\frac{1}{2}at^2",
        valueTex: signedMeterTex(0.5 * config.a * config.T * config.T),
        tone: "neg",
        showAt: 2,
      },
      { name: "总位移", nameTex: "x", valueTex: meterTex(exact.value), tone: "exact", showAt: 3 },
      {
        name: "用平均速度核对",
        nameTex: "x = \\bar{v}t",
        valueTex: meterTex(exact.value),
        tone: "exact",
        showAt: 3,
      },
    ];
  }

  const rectArea = config.v0 * config.T;
  const triArea = 0.5 * config.a * config.T * config.T;

  return [
    {
      name: config.kind === "decel" ? "外接矩形" : "矩形",
      nameTex: "v_0t",
      valueTex: meterTex(rectArea),
      tone: "rect",
      showAt: 1,
    },
    {
      name: config.kind === "decel" ? "缺掉的三角形" : "三角形",
      nameTex: "\\frac{1}{2}at^2",
      valueTex: signedMeterTex(triArea),
      tone: config.kind === "decel" ? "neg" : "tri",
      showAt: 2,
    },
    { name: "位移", nameTex: "x", valueTex: meterTex(exact.value), tone: "exact", showAt: 3 },
  ];
});

/**
 * ViewBox 尺寸：匀加速/匀减速用 500 × 300（比迁移前的 560 × 300 窄 11%——图上窄一点，绘图区比例才不扁）； 越轴模式 500 ×
 * 262（轴在中间、绘图区本来就高，再长就挤了）。
 */
const chartView = computed(() => ({
  width: 500,
  height: cfg.value.kind === "reverse" ? 262 : 300,
}));
/** 轴比数据多留一小截（迁移前轴线画到 t ≈ 6.34）：曲线末端、箭头与 v 标注都有落脚处 */
const X_MAX = 6.4;
/** 横轴贴轴端、写在上侧（与迁移前一致）；纵轴量与单位沿用"v /(m/s)"的写法 */
const AXIS_X = { quantity: "t", unit: "s", side: "above" } as const;
const AXIS_Y = { quantity: "v", unit: "(m/s)" } as const;

/** 曲线 v = v₀ + at（迁移前是白线，这里用同色的 --c-text） */
const chartCurves = computed(() => [
  {
    points: [
      { x: 0, y: cfg.value.v0 },
      { x: cfg.value.T, y: vEnd.value },
    ],
    stroke: "var(--c-text)",
  },
]);

/** 区域填充：每种模式的分块顺序 = 由淡到实，`showAt` 控制第几次点击出现 */
const chartAreas = computed(() => {
  const config = cfg.value;
  const span = config.T;

  if (config.kind === "reverse") {
    return [
      {
        // 完整外接矩形（虚线）
        points: [
          { x: 0, y: 0 },
          { x: span, y: 0 },
          { x: span, y: config.v0 },
          { x: 0, y: config.v0 },
        ],
        fill: "var(--c-accent)",
        fillOpacity: 0.08,
        stroke: "var(--c-accent)",
        width: 1.2,
        dashed: "6 4",
        showAt: 1,
      },
      {
        // 轴上方被剪掉的那块
        points: [
          { x: 0, y: config.v0 },
          { x: span, y: config.v0 },
          { x: span, y: 0 },
          { x: tZero.value, y: 0 },
        ],
        fill: "var(--c-danger)",
        fillOpacity: 0.26,
        stroke: "var(--c-danger)",
        width: 1.1,
        showAt: 2,
      },
      {
        // 轴上方的正位移
        points: [
          { x: 0, y: 0 },
          { x: 0, y: config.v0 },
          { x: tZero.value, y: 0 },
        ],
        fill: "var(--c-accent)",
        fillOpacity: 0.34,
        stroke: "var(--c-accent)",
        width: 1.1,
        showAt: 2,
      },
      {
        // 轴下方的倒扣
        points: [
          { x: tZero.value, y: 0 },
          { x: span, y: 0 },
          { x: span, y: vEnd.value },
        ],
        fill: "var(--c-danger)",
        fillOpacity: 0.5,
        stroke: "var(--c-danger)",
        width: 1.4,
        showAt: 2,
      },
    ];
  }

  const isDecel = config.kind === "decel";
  const triColor = isDecel ? "var(--c-danger)" : "var(--c-accent-2)";

  return [
    {
      // 淡底梯形（一开始就在）
      points: [
        { x: 0, y: 0 },
        { x: span, y: 0 },
        { x: span, y: vEnd.value },
        { x: 0, y: config.v0 },
      ],
      fill: "var(--c-accent)",
      fillOpacity: 0.1,
      showAt: 0,
    },
    {
      // 外接矩形
      points: [
        { x: 0, y: 0 },
        { x: span, y: 0 },
        { x: span, y: config.v0 },
        { x: 0, y: config.v0 },
      ],
      fill: "var(--c-accent)",
      fillOpacity: 0.26,
      stroke: "var(--c-accent)",
      width: 1.2,
      showAt: 1,
    },
    {
      // 三角形（匀加速是图线上方多出来的一块，匀减速是矩形缺掉的一块）
      points: [
        { x: 0, y: config.v0 },
        { x: span, y: config.v0 },
        { x: span, y: vEnd.value },
      ],
      fill: triColor,
      fillOpacity: isDecel ? 0.3 : 0.32,
      stroke: triColor,
      width: 1.2,
      showAt: 2,
    },
  ];
});

/** 纵轴刻度值：越轴模式有负刻度；匀减速范围只到 12.5，不能给 15（会把纵轴量标签顶出画布） */
const yTicks = computed<number[]>(() => {
  if (cfg.value.kind === "reverse") return [-5, 5, 10];

  return cfg.value.kind === "decel" ? [5, 10] : [5, 10, 15];
});

/** 点标注与图内公式：分块叫什么就标什么，`showAt` 与面积同步（标注走 HTML + KaTeX，见 .agents/notes/coordinate-axes-api.md） */
const chartLabels = computed(() => {
  const config = cfg.value;
  // 起点标注 v₀ 的位置按模式让开：匀加速的斜线从起点往上穿（压线），匀减速的起点正好在量程顶端（与纵轴量标签抢左上角）。
  // dx / dy 都是屏幕 px 口径；reverse 的起点不在这两个麻烦位置，保持原样。
  const v0Base = { x: 0, y: config.v0, tex: "v_0", color: "var(--c-accent)" };
  // 匀加速的斜线从起点陡着往上走，标注放"起点上方"一定会被斜线穿过；
  // 放到起点下侧（正好在矩形左上角里），斜线就永远碰不到它。匀减速的起点在量程顶端，往下让 24px 躲开纵轴量标签。
  const v0Label =
    config.kind === "decel"
      ? { ...v0Base, anchor: "bottom-right" as const, dy: 24 }
      : { ...v0Base, anchor: "bottom-right" as const };
  const named = [
    v0Label,
    {
      x: config.T,
      y: vEnd.value,
      tex: "v",
      anchor: "center" as const,
      dx: 8,
      color: "var(--c-accent)",
    },
  ];

  if (config.kind === "reverse") {
    return [
      ...named,
      {
        x: 5.8,
        y: 5.5,
        tex: "v_0t",
        anchor: "top-left" as const,
        halo: true,
        color: "var(--c-text)",
        showAt: 1,
      },
      {
        x: 3.4,
        y: 7.3,
        parts: [{ text: "剪掉" }, { tex: `${cutArea.value.toFixed(0)}\\ \\text{m}` }],
        anchor: "top-right" as const,
        halo: true,
        color: "var(--c-text)",
        showAt: 2,
      },
      {
        x: 0.26,
        y: 1.6,
        parts: [{ text: "正位移" }, { tex: `${posArea.value.toFixed(0)}\\ \\text{m}` }],
        anchor: "top-right" as const,
        halo: true,
        color: "var(--c-text)",
        showAt: 2,
      },
      {
        x: 3.8,
        y: -3,
        parts: [{ text: "倒扣" }, { tex: `${Math.abs(negArea.value).toFixed(0)}\\ \\text{m}` }],
        anchor: "top-right" as const,
        halo: true,
        color: "var(--c-text)",
        showAt: 2,
      },
    ];
  }

  const isDecel = config.kind === "decel";

  return [
    ...named,
    {
      // 放进金色外接矩形里居中（与 v₀ 拉开一整个图宽的量级，不会再挤成一团）
      x: config.T / 2,
      y: config.v0 / 2,
      tex: "v_0t",
      anchor: "center" as const,
      color: "var(--c-accent)",
      showAt: 1,
    },
    {
      // 三角形重心：匀加速 (2T/3, (2v₀+v)/3)、匀减速同理，正好在斜边下方的空白里，不再压在线上
      x: (2 * config.T) / 3,
      y: (2 * config.v0 + vEnd.value) / 3,
      tex: `${isDecel ? "-" : ""}\\frac{1}{2}at^2`,
      anchor: "center" as const,
      color: isDecel ? "var(--c-danger)" : "var(--c-accent-2)",
      showAt: 2,
    },
  ];
});
</script>

<template>
  <div class="vt-split">
    <div class="vt-split-figure">
      <CoordAxes
        :x-range="[0, X_MAX]"
        :y-range="[cfg.axisMin, cfg.axisMax]"
        :x-axis="AXIS_X"
        :y-axis="AXIS_Y"
        :view="chartView"
        :ticks="{ x: [2, 4, 6], y: yTicks }"
        :curves="chartCurves"
        :areas="chartAreas"
        :labels="chartLabels"
        :step="step"
      />
    </div>

    <div class="vt-split-panel">
      <div class="sp-title" :class="{ 'vt-hidden': step < 2 }">{{ panelTitle }}</div>

      <div
        v-for="row in rows"
        :key="row.name"
        class="sp-row"
        :class="{ 'vt-hidden': step < row.showAt }"
      >
        <span class="sp-label">
          <span>{{ row.name }}</span>
          <Latex v-if="row.nameTex" :tex="row.nameTex" />
        </span>
        <b class="sp-value" :class="`sp-value-${row.tone}`"><Latex :tex="row.valueTex" /></b>
      </div>

      <div v-if="cfg.kind !== 'reverse'" class="sp-formula" :class="{ 'vt-hidden': step < 3 }">
        <Latex tex="x = v_0t + \frac{1}{2}at^2" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vt-split {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;

  min-width: 0;
}

.vt-split-figure {
  min-width: 0;
}

.vt-hidden {
  visibility: hidden;
}

.vt-split-panel {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
}

.sp-title {
  color: var(--c-accent);

  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5;
  white-space: nowrap;
}

.sp-row {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: space-between;

  min-height: 1.7rem;
  border-bottom: 1px solid var(--c-border);

  font-size: 0.9rem;
}

.sp-label {
  display: inline-flex;
  gap: 0.3rem;
  align-items: baseline;

  color: var(--c-text-dim);

  white-space: nowrap;
}

.sp-value {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.sp-value-rect {
  color: var(--c-accent);
}

.sp-value-tri,
.sp-value-pos {
  color: var(--c-accent-2);
}

.sp-value-neg {
  color: var(--c-danger);
}

.sp-value-exact {
  color: var(--c-accent);
  font-size: 1rem;
}

.sp-formula {
  margin-top: 0.15rem;
  color: var(--c-text-dim);
  font-size: 0.9rem;
  white-space: nowrap;
}
</style>
