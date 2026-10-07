<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 分割求和：把 0~T 的匀变速运动分成 n 个小段，每段按"该段起始时刻的速度"当匀速运动， 小矩形面积之和 S_n 与真实位移 x = v₀T + ½aT² 实时对比，展示"分得越细越接近"。
 *
 * 随翻页分 4 步：n = 5 → 20 → 100 → 非常非常多（小矩形合成梯形）。 所有数值都由公式算出，没有写死的答案；坐标系（轴线/箭头/刻度/O/标签/曲线/填充）全部交给共享
 * `CoordAxes`， 本组件只负责"这段运动的数据 + 右侧读数面板 + 按点击分步"。
 */

const { $clicks } = useSlideContext();

/**
 * 这段运动（与 VtAreaSplit 的匀加速模式用同一组数据，前后呼应）：v₀ = 5，6 s 内匀升到 15， 位移 x = 60 m。教师给的画面是"v 从 5 开始、到 15
 * 结束"，纵轴也收到 15。
 */
const v0 = 5; // m/s
const a = 10 / 6; // m/s²
const T = 6; // s

/** 每一步对应的分段数（Infinity：分割得非常非常细） */
const SEGMENTS = [5, 20, 100, Number.POSITIVE_INFINITY];

const step = computed(() => Math.max(0, Math.min($clicks.value, SEGMENTS.length - 1)));
const segmentCount = computed(() => SEGMENTS[step.value]);
const nLabel = computed(() =>
  Number.isFinite(segmentCount.value) ? `${segmentCount.value} 段` : "非常非常多段",
);
/** N → ∞ 时画极限图形（梯形），不再画小矩形 */
const atLimit = computed(() => !Number.isFinite(segmentCount.value));

const vAt = (seconds: number): number => v0 + a * seconds;

/** 真实位移（与公式一致，用来和矩形面积和对比） */
const exactX = v0 * T + 0.5 * a * T * T;

/** 小矩形面积之和（逐段真算，不用闭式解） */
const rectSum = computed(() => {
  const count = segmentCount.value;

  if (!Number.isFinite(count)) return exactX;

  const dt = T / count;
  let sum = 0;

  for (let index = 0; index < count; index += 1) sum += vAt(index * dt) * dt;

  return sum;
});

const gap = computed(() => exactX - rectSum.value);

/**
 * 数值 + 单位的 KaTeX 源码（读数统一排版）
 *
 * @param value 数值（m）
 * @returns KaTeX 源码字符串
 */
const meterTex = (value: number): string => `${value.toFixed(1)}\\ \\text{m}`;

/**
 * ViewBox 尺寸：500 × 264——比迁移前（560 × 250）更窄也更高，绘图区比例才不扁。 264 是本页能承受的上限：这一页还有两行提问 + 三行结论，图再高就把结论顶出
 * `.page-grow` 了。
 */
const VIEW = { width: 500, height: 264 };
/** 轴比数据多留一小截（迁移前轴线画到 t ≈ 6.34）：曲线末端、箭头与 v 标注都有落脚处 */
const X_MAX = 6.4;
const X_RANGE: [number, number] = [0, X_MAX];
// 纵轴比最大刻度多留一截（数据到 15、轴到 16.5）：末端箭头才不会顶在刻度上（与横轴 6/6.4 同一口径）
const Y_RANGE: [number, number] = [0, 16.5];

/** 曲线 v = v₀ + at */
const chartCurves = computed(() => [
  {
    points: [
      { x: 0, y: v0 },
      { x: T, y: v0 + a * T },
    ],
    stroke: "var(--c-accent)",
  },
]);

/** 面积：分段时是一排等宽小矩形，n → ∞ 时合成梯形 */
const chartAreas = computed(() => {
  if (atLimit.value) {
    return [
      {
        points: [
          { x: 0, y: 0 },
          { x: T, y: 0 },
          { x: T, y: v0 + a * T },
          { x: 0, y: v0 },
        ],
        fill: "var(--c-accent)",
        fillOpacity: 0.24,
        stroke: "var(--c-accent)",
        width: 1.4,
      },
    ];
  }

  const count = segmentCount.value;
  const dt = T / count;

  return Array.from({ length: count }, (_, index) => {
    const left = index * dt;
    const right = left + dt;
    const height = vAt(left);

    return {
      points: [
        { x: left, y: 0 },
        { x: right, y: 0 },
        { x: right, y: height },
        { x: left, y: height },
      ],
      fill: "var(--c-accent-2)",
      fillOpacity: 0.3,
      stroke: "var(--c-accent-2)",
      width: 0.6,
    };
  });
});

/** 图上只保留两处点名：起点 v₀、终点 v（标注走 HTML + KaTeX，写法见 .agents/notes/coordinate-axes.md） */
const chartLabels = computed(() => [
  // v₀ 落在"起点下方、斜线右侧"那块空白里（起点已经抬到 5 m/s，离时间轴够远，不用再额外抬高）
  {
    x: 0,
    y: v0,
    tex: "v_0",
    anchor: "bottom-right" as const,
    color: "var(--c-accent)",
  },
  {
    x: T,
    y: v0 + a * T,
    tex: "v",
    anchor: "center" as const,
    dx: 8,
    color: "var(--c-accent)",
  },
]);
</script>

<template>
  <div class="vt-riemann">
    <div class="vt-riemann-figure">
      <CoordAxes
        :x-range="X_RANGE"
        :y-range="Y_RANGE"
        :x-axis="{ quantity: 't', unit: 's', side: 'above' }"
        :y-axis="{ quantity: 'v', unit: '(m/s)' }"
        :view="VIEW"
        :ticks="{ x: [2, 4, 6], y: [5, 10, 15] }"
        :curves="chartCurves"
        :areas="chartAreas"
        :labels="chartLabels"
      />
    </div>

    <div class="vt-riemann-panel">
      <div class="rp-step">{{ nLabel }}</div>

      <div class="rp-row">
        <span class="rp-label">小矩形面积和</span>
        <b class="rp-value rp-value-rect"><Latex :tex="meterTex(rectSum)" /></b>
      </div>

      <div class="rp-row">
        <span class="rp-label">真实位移 <Latex tex="x" /></span>
        <b class="rp-value rp-value-exact"><Latex :tex="meterTex(exactX)" /></b>
      </div>

      <div class="rp-row">
        <span class="rp-label">相差</span>
        <b class="rp-value rp-value-gap"><Latex :tex="atLimit ? '\\approx 0' : meterTex(gap)" /></b>
      </div>

      <div class="rp-note">每小段都按"该段起始时刻的速度"当作匀速运动</div>
    </div>
  </div>
</template>

<style scoped>
.vt-riemann {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 1.6rem;
  align-items: center;

  min-width: 0;
}

.vt-riemann-figure {
  min-width: 0;
}

.vt-riemann-panel {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
}

.rp-step {
  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.5;
  white-space: nowrap;
}

.rp-row {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: space-between;

  min-height: 1.7rem;
  border-bottom: 1px solid var(--c-border);

  font-size: 0.9rem;
}

.rp-label {
  display: inline-flex;
  gap: 0.3rem;
  align-items: baseline;

  color: var(--c-text-dim);

  white-space: nowrap;
}

.rp-value {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.rp-value-rect {
  color: var(--c-accent-2);
}

.rp-value-exact {
  color: var(--c-accent);
}

.rp-value-gap {
  color: var(--c-text-dim);
}

.rp-note {
  margin-top: 0.15rem;
  color: var(--c-text-dim);
  font-size: 0.78rem;
  line-height: 1.5;
}
</style>
