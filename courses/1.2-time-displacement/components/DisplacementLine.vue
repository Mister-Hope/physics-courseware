<script setup lang="ts">
import { computed, ref } from "vue";

const x1 = ref(5);
const x2 = ref(2);

/** 轴范围：最大刻度 ±10 再多留约 10%，末端箭头不会顶在刻度上（见 .agents/notes/coordinate-axes-conventions.md） */
const RANGE: [number, number] = [-11, 11];
const VIEW = { width: 640, height: 150 };

/** 装饰层相对轴线的偏移（屏幕 px，插槽里乘 `px2user` 折成 viewBox 单位） */
const RISE = 42;
const LABEL_LIFT = 54;
/** 箭头三角形：长 15px、半宽 8px；有向线段短于 15px 时改画一个点 */
const HEAD_LENGTH = 15;
const HEAD_HALF = 8;

const dx = computed<number>(() => x2.value - x1.value);
/** 两个滑块重合时画不出有向线段，改成一个点（位移为零） */
const hasArrow = computed<boolean>(() => Math.abs(dx.value) >= 0.3);
// 负数加括号，避免出现 "2 - -5" 这种写法
const fmt = (v: number): string => (v < 0 ? `(${v})` : `${v}`);
// 位移表达式分两行：第一行公式、第二行代入数值（等号手动换行，见模板 <br />）
const dxTexHead = String.raw`\Delta x = x_2 - x_1`;
const dxTexTail = computed<string>(
  () => String.raw`= ${fmt(x2.value)} - ${fmt(x1.value)} = ${dx.value}\ \text{m}`,
);
const magnitude = computed<number>(() => Math.abs(dx.value));
const direction = computed<string>(() => {
  if (dx.value > 0) return "x 轴正方向";
  if (dx.value < 0) return "x 轴负方向";
  return "位移为零";
});
</script>

<template>
  <div class="disp-wrap">
    <div class="controls">
      <label class="slider">
        <span class="slider-label" style="color: #60a5fa">初位置 <Latex tex="x_1" /></span>
        <input v-model.number="x1" type="range" min="-10" max="10" step="0.5" class="range blue" />
        <span class="slider-val" style="color: #60a5fa">{{ x1 }} m</span>
      </label>
      <label class="slider">
        <span class="slider-label" style="color: #e2a846">末位置 <Latex tex="x_2" /></span>
        <input v-model.number="x2" type="range" min="-10" max="10" step="0.5" class="range gold" />
        <span class="slider-val" style="color: #e2a846">{{ x2 }} m</span>
      </label>
    </div>

    <NumberAxis
      :range="RANGE"
      :axis="{ quantity: 'x', unit: 'm' }"
      :ticks="{ step: 2, origin: true }"
      :view="VIEW"
    >
      <!-- 轴上的装饰（有向线段 = 位移、初末位置标记）：按 viewBox 用户单位作图，见 .agents/notes/coordinate-axes-api.md「轴外装饰」 -->
      <template #overlay="{ x, axisY, px2user }">
        <template v-if="hasArrow">
          <line
            :x1="x(x1)"
            :y1="axisY"
            :x2="x(x2)"
            :y2="axisY"
            stroke="var(--c-accent)"
            :stroke-width="4 * px2user"
            stroke-linecap="round"
          />
          <path
            :d="`M ${x(x2)} ${axisY} L ${x(x2) - (x2 >= x1 ? 1 : -1) * HEAD_LENGTH * px2user} ${axisY - HEAD_HALF * px2user} L ${x(x2) - (x2 >= x1 ? 1 : -1) * HEAD_LENGTH * px2user} ${axisY + HEAD_HALF * px2user} Z`"
            fill="var(--c-accent)"
          />
          <line
            :x1="x(x1)"
            :y1="axisY"
            :x2="x(x1)"
            :y2="axisY - RISE * px2user"
            stroke="var(--c-accent-2)"
            :stroke-width="1.5 * px2user"
            :stroke-dasharray="`${4 * px2user} ${3 * px2user}`"
          />
          <line
            :x1="x(x2)"
            :y1="axisY"
            :x2="x(x2)"
            :y2="axisY - RISE * px2user"
            stroke="var(--c-accent)"
            :stroke-width="1.5 * px2user"
            :stroke-dasharray="`${4 * px2user} ${3 * px2user}`"
          />
          <circle :cx="x(x1)" :cy="axisY" :r="5 * px2user" fill="var(--c-accent-2)" />
          <circle :cx="x(x2)" :cy="axisY" :r="5 * px2user" fill="var(--c-accent)" />
          <text
            :x="x(x1)"
            :y="axisY - LABEL_LIFT * px2user"
            text-anchor="middle"
            :font-size="15 * px2user"
            font-weight="700"
            fill="var(--c-accent-2)"
          >
            初<tspan font-family="KaTeX_Math" font-style="italic">x</tspan
            ><tspan font-family="KaTeX_Main" :font-size="11 * px2user" :dy="2 * px2user">1</tspan>
          </text>
          <text
            :x="x(x2)"
            :y="axisY - LABEL_LIFT * px2user"
            text-anchor="middle"
            :font-size="15 * px2user"
            font-weight="700"
            fill="var(--c-accent)"
          >
            末<tspan font-family="KaTeX_Math" font-style="italic">x</tspan
            ><tspan font-family="KaTeX_Main" :font-size="11 * px2user" :dy="2 * px2user">2</tspan>
          </text>
        </template>

        <template v-else>
          <line
            :x1="x(x1)"
            :y1="axisY"
            :x2="x(x1)"
            :y2="axisY - RISE * px2user"
            stroke="var(--c-accent-2)"
            :stroke-width="1.5 * px2user"
            :stroke-dasharray="`${4 * px2user} ${3 * px2user}`"
          />
          <circle :cx="x(x1)" :cy="axisY" :r="6 * px2user" fill="var(--c-accent)" />
          <text
            :x="x(x1)"
            :y="axisY - LABEL_LIFT * px2user"
            text-anchor="middle"
            :font-size="15 * px2user"
            font-weight="700"
            fill="var(--c-accent-2)"
          >
            初 / 末<tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
          </text>
        </template>
      </template>
    </NumberAxis>

    <div class="result-card">
      <div class="result-row">
        <span class="k">位移</span>
        <span class="v"><Latex :tex="dxTexHead" /><br /><Latex :tex="dxTexTail" /></span>
      </div>
      <div class="result-row">
        <span class="k">大小</span>
        <span class="v accent">{{ magnitude }} m</span>
      </div>
      <div class="result-row">
        <span class="k">方向</span>
        <span class="v blue">{{ direction }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disp-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.slider {
  display: flex;
  gap: 0.7rem;
  align-items: center;

  /* 全局 label 自带 1px 边框，这里补足内边距，让边框不要贴着文字 */
  padding: 0.5rem 1rem;
  border-radius: 0.9rem;
}

.slider-label {
  flex-shrink: 0;

  width: 4.6rem;

  font-weight: 600;
  font-size: 0.85rem;
  text-align: right;
}

.slider-val {
  width: 3.4rem;
  font-weight: 700;
  font-size: 0.85rem;
}

.range {
  flex: 1;

  height: 5px;
  border-radius: 2rem;

  background: rgb(148 163 184 / 20%);
  outline: none;

  cursor: pointer;

  appearance: none;
}

.range::-webkit-slider-thumb {
  width: 18px;
  height: 18px;
  border: 2px solid #0f1425;
  border-radius: 50%;

  cursor: pointer;

  appearance: none;
}

.range.blue::-webkit-slider-thumb {
  background: #60a5fa;
}

.range.gold::-webkit-slider-thumb {
  background: #e2a846;
}

.result-card {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.6rem;

  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.result-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  align-items: center;

  padding: 0.5rem 0.7rem;
  border: 1px solid rgb(148 163 184 / 10%);
  border-radius: 1rem;

  background: rgb(30 41 59 / 65%);
}

.k {
  color: #94a3b8;
  font-size: 0.72rem;
}

.v {
  color: #f1f5f9;
  font-weight: 700;
  font-size: 0.95rem;
}

.v.accent {
  color: #e2a846;
}

.v.blue {
  color: #60a5fa;
}
</style>
