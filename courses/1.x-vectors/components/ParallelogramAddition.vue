<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, ref } from "vue";

/**
 * 点击分步动画：把 OB 平移到 A 的终点，补出平行四边形，得到 a + b 的坐标规律。 用 $clicks 驱动，页面 frontmatter 里要写 `clicks:
 * 4`（否则点击数永远是 0）。
 *
 * 坐标轴 / 网格 / 刻度 / O / 轴量标签交给共享 `CoordAxes`；OA、OB、平移后的箭头与各点标注留在本组件， 画在 `#overlay` 插槽里；平行四边形填充走组件的
 * `areas`（配 `showAt` 分步，几何不动）。
 */
const { $clicks } = useSlideContext();

/** 数据范围照搬旧手写 SVG：横轴 ±7、纵轴 ±6（刻度到 ±6 / ±4，末端箭头都留了余量） */
const X_MIN = -7;
const X_MAX = 7;
const Y_MIN = -6;
const Y_MAX = 6;
const TICKS_X = [-6, -4, -2, 2, 4, 6];
const TICKS_Y = [-4, -2, 2, 4];
/**
 * ViewBox 尺寸：高度从旧图的 400 提到 518——组件要给顶部轴量标签与刻度数字留位置，绘图区比旧图矮； 补上之后绘图区的横纵比例回到 1:1（旧图 SCALE 32
 * 对两轴相同），平行四边形不被压扁。 图的外壳同步收到 17rem：绘图区反而比旧图更宽，图内元素（含平行四边形）与旧图一样大。
 */
const VIEW = { width: 560, height: 518 };

const x1 = ref(3);
const y1 = ref(1);
const x2 = ref(1);
const y2 = ref(3);

const step = computed<number>(() => Math.max(0, Math.min($clicks.value, 4)));

/** 平行四边形：O → A → A+B → B（第 3 步才出现） */
const parallelogram = computed(() => [
  {
    points: [
      { x: 0, y: 0 },
      { x: x1.value, y: y1.value },
      { x: x1.value + x2.value, y: y1.value + y2.value },
      { x: x2.value, y: y2.value },
    ],
    fill: "var(--c-accent)",
    fillOpacity: 0.1,
    stroke: "var(--c-text-dim)",
    width: 1.2,
    dashed: "6 4",
    showAt: 3,
  },
]);

const aTex = computed<string>(
  () => `\\vec{a} = \\overrightarrow{OA} = (${x1.value},\\;${y1.value})`,
);
const bTex = computed<string>(
  () => `\\vec{b} = \\overrightarrow{OB} = (${x2.value},\\;${y2.value})`,
);
const sumTex = computed<string>(
  () =>
    `\\vec{a} + \\vec{b} = (x_1 + x_2,\\;y_1 + y_2) = (${x1.value + x2.value},\\;${y1.value + y2.value})`,
);

const steps = computed<string[]>(() => [
  "画出 OA 与 OB：a = OA，b = OB",
  "把 OB 平移到 A 的终点 → B′",
  "补出平行四边形 O A B′ B",
  "对角线 OB′ 就是 a + b",
]);

/** 图内标注走 `labels`（HTML + 真 KaTeX）：点名 + 坐标、矢量名，配 `showAt` 跟着分步出现 */
const labels = computed(() => [
  {
    x: x1.value,
    y: y1.value,
    tex: `A(${x1.value},\\ ${y1.value})`,
    anchor: "top-right" as const,
    color: "var(--c-accent)",
    size: 15,
    halo: true,
    showAt: 1,
  },
  {
    x: x2.value,
    y: y2.value,
    tex: `B(${x2.value},\\ ${y2.value})`,
    anchor: "top-right" as const,
    color: "var(--c-accent-2)",
    size: 15,
    halo: true,
    showAt: 1,
  },
  {
    // 沿 OA 的垂线往上挪 0.6 个单位：贴着自己的箭头，又让开 x 轴上的刻度数字
    x: x1.value / 2,
    y: y1.value / 2 + 0.6,
    tex: "a",
    anchor: "center" as const,
    color: "var(--c-accent)",
    size: 19,
    halo: true,
    showAt: 1,
  },
  {
    // 沿 OB 的垂线往右挪 0.6 个单位：落在 OB 与 OA 之间的空档
    x: x2.value / 2 + 0.6,
    y: y2.value / 2,
    tex: "b",
    anchor: "center" as const,
    color: "var(--c-accent-2)",
    size: 19,
    halo: true,
    showAt: 1,
  },
  {
    x: x1.value + x2.value,
    y: y1.value + y2.value,
    tex: `B'(${x1.value + x2.value},\\ ${y1.value + y2.value})`,
    anchor: "top-right" as const,
    color: "var(--c-physics)",
    size: 15,
    halo: true,
    showAt: 2,
  },
  {
    x: (x1.value + x2.value) / 2 + 2.2,
    y: (y1.value + y2.value) / 2 + 2.2,
    tex: "a + b",
    anchor: "top-left" as const,
    color: "var(--c-physics)",
    size: 17,
    halo: true,
    showAt: 4,
  },
]);
</script>

<template>
  <div class="pa-wrap">
    <div class="pa-figure">
      <CoordAxes
        :x-range="[X_MIN, X_MAX]"
        :y-range="[Y_MIN, Y_MAX]"
        :x-axis="{ quantity: 'x' }"
        :y-axis="{ quantity: 'y' }"
        :ticks="{ x: TICKS_X, y: TICKS_Y, grid: true, gridStep: 1, direction: 'cross' }"
        :view="VIEW"
        :areas="parallelogram"
        :labels="labels"
        :step="step"
      >
        <template #overlay="{ x, y }">
          <!-- 第 1 步：OA 与 OB -->
          <g v-if="step >= 1">
            <CourseArrow
              :from="{ x: x(0), y: y(0) }"
              :to="{ x: x(x1), y: y(y1) }"
              :head-size="12"
              stroke="var(--c-accent)"
              stroke-width="3.2"
              pointer-events="none"
            />
            <CourseArrow
              :from="{ x: x(0), y: y(0) }"
              :to="{ x: x(x2), y: y(y2) }"
              :head-size="12"
              stroke="var(--c-accent-2)"
              stroke-width="3.2"
              pointer-events="none"
            />
            <circle :cx="x(x1)" :cy="y(y1)" r="4" fill="var(--c-accent)" pointer-events="none" />
            <circle :cx="x(x2)" :cy="y(y2)" r="4" fill="var(--c-accent-2)" pointer-events="none" />
          </g>

          <!-- 第 2 步：把 OB 平移到 A 的终点 -->
          <g v-if="step >= 2">
            <CourseArrow
              :from="{ x: x(x1), y: y(y1) }"
              :to="{ x: x(x1 + x2), y: y(y1 + y2) }"
              :head-size="12"
              stroke="var(--c-accent-2)"
              stroke-width="2.6"
              stroke-dasharray="8 5"
              pointer-events="none"
            />
            <line
              :x1="x(x2)"
              :y1="y(y2)"
              :x2="x(x1 + x2)"
              :y2="y(y1 + y2)"
              stroke="var(--c-text-dim)"
              stroke-width="1.3"
              stroke-dasharray="4 4"
              opacity="0.55"
              pointer-events="none"
            />
            <circle
              :cx="x(x1 + x2)"
              :cy="y(y1 + y2)"
              r="4.5"
              fill="var(--c-physics)"
              pointer-events="none"
            />
          </g>

          <!-- 第 4 步：对角线 = a + b -->
          <g v-if="step >= 4">
            <CourseArrow
              :from="{ x: x(0), y: y(0) }"
              :to="{ x: x(x1 + x2), y: y(y1 + y2) }"
              :head-size="12"
              stroke="var(--c-physics)"
              stroke-width="3.6"
              pointer-events="none"
            />
          </g>
        </template>
      </CoordAxes>
    </div>

    <div class="pa-info">
      <div class="pa-formula"><Latex :tex="aTex" /></div>
      <div class="pa-formula"><Latex :tex="bTex" /></div>

      <div class="pa-steps">
        <div
          v-for="(text, index) in steps"
          :key="text"
          class="pa-step"
          :class="{ done: step >= index + 1 }"
        >
          <span class="pa-step-no">{{ index + 1 }}</span>
          <span>{{ text }}</span>
        </div>
      </div>

      <div v-if="step >= 4" class="pa-sum"><Latex :tex="sumTex" /></div>
      <div v-else class="pa-sum pa-sum-dim">点一下，把 a + b 拼出来 →</div>

      <div class="pa-controls">
        <label class="pa-slider">
          <span class="pa-slider-label" style="color: var(--c-accent)"><Latex tex="x_1" /></span>
          <input v-model.number="x1" type="range" min="-3" max="3" step="1" />
          <span class="pa-slider-val">{{ x1 }}</span>
        </label>
        <label class="pa-slider">
          <span class="pa-slider-label" style="color: var(--c-accent)"><Latex tex="y_1" /></span>
          <input v-model.number="y1" type="range" min="-3" max="3" step="1" />
          <span class="pa-slider-val">{{ y1 }}</span>
        </label>
        <label class="pa-slider">
          <span class="pa-slider-label" style="color: var(--c-accent-2)"><Latex tex="x_2" /></span>
          <input v-model.number="x2" type="range" min="-3" max="3" step="1" />
          <span class="pa-slider-val">{{ x2 }}</span>
        </label>
        <label class="pa-slider">
          <span class="pa-slider-label" style="color: var(--c-accent-2)"><Latex tex="y_2" /></span>
          <input v-model.number="y2" type="range" min="-3" max="3" step="1" />
          <span class="pa-slider-val">{{ y2 }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pa-wrap {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

/* 图的外壳（轴与刻度在 CoordAxes 里）：与旧手写 SVG 同一套边框 / 底色 */
.pa-figure {
  display: block;
  flex: 1 1 58%;

  min-width: 0;
  max-width: 17rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.25rem;

  background: rgb(15 20 37 / 45%);
}

.pa-info {
  display: flex;
  flex: 1 1 42%;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 0;

  font-size: 0.95rem;
  line-height: 1.6;
}

.pa-formula {
  display: flex;
  align-items: center;
}

.pa-steps {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.2rem;
}

.pa-step {
  display: flex;
  gap: 0.55rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.88rem;

  opacity: 0.4;

  transition: all 0.35s ease;
}

.pa-step.done {
  color: var(--c-text);
  opacity: 1;
}

.pa-step-no {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 1.15rem;
  height: 1.15rem;
  border: 1px solid currentcolor;
  border-radius: 50%;

  font-size: 0.68rem;
}

.pa-sum {
  display: flex;
  align-items: center;

  min-height: 1.85rem;
  margin-top: 0.15rem;
  padding-left: 0.7rem;
  border-left: 3px solid var(--c-physics);

  font-size: 1.02rem;
}

.pa-sum-dim {
  border-left-color: rgb(148 163 184 / 35%);
  color: var(--c-text-dim);
  font-size: 0.8rem;
}

.pa-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.15rem 0.8rem;
  margin-top: 0.2rem;
}

.pa-slider {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.pa-slider-label {
  flex-shrink: 0;
  width: 1.2rem;
  font-weight: 700;
  font-size: 0.75rem;
}

/* 滑杆标签是 KaTeX（x₁ 不许写成 Unicode 下标），字号跟滑杆自己走 */
.pa-slider-label :deep(.katex) {
  font-size: 1em !important;
}

.pa-slider-val {
  width: 1.1rem;
  color: var(--c-text-dim);
  font-size: 0.75rem;
  text-align: right;
}

.pa-slider input[type="range"] {
  flex: 1;

  min-width: 0;
  height: 4px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.pa-slider input[type="range"]::-webkit-slider-thumb {
  width: 13px;
  height: 13px;
  border: 2px solid var(--c-bg-soft);
  border-radius: 50%;

  background: var(--c-text-dim);

  cursor: pointer;

  appearance: none;
}
</style>
