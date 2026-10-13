<script setup lang="ts">
/**
 * 可拖动演示：改变指向圆心的"实际受力"，看轨迹怎么变 —— 6.4 生活中的圆周运动 · 第 15 页（无 props）
 *
 * 滑块给出 λ = 实际指向圆心的力 ÷ 所需向心力 m v²/r；轨迹按运动方程 a = λ·v₀²/r₀（方向始终指向圆心）数值积分得到，λ 一变轨迹立刻重算——学生自己拖，直观看到
 * "力小一点就往外张（离心）、大一点就往里收（向心）"。 灰色虚线圆是 λ = 1 时会走的那条轨道，虚线半径标出起点半径 r，起点处画出切线方向的初速度 v。
 */
import { computed, ref } from "vue";

/** 起点半径、初速度（用户单位，只影响画面尺度）与圆心在 viewBox 中的位置 */
const R0 = 110;
const V0 = 1;
const CX = 206;
const CY = 153;
/** 积分步长、最大步数（λ = 1 时正好走满一圈多一点） */
const DT = 0.5;
const MAX_STEPS = 1500;
/** 轨迹画到这里就停：飞出画面（力不够）／收到圆心附近（力过大） */
const OUTER = 148;
const INNER = 13;

/** 起点：圆的最高点（初速度沿该点的切线方向） */
const start = { x: CX, y: CY - R0 };
/** 实际受力与所需向心力的比值 */
const lambda = ref(1);

// 数值积分运动方程，返回轨迹的 path 与末点（末点再画一个小圆，轨迹不会戛然而止）
const trajectory = (value: number): { d: string; end: { x: number; y: number } } => {
  const a0 = (value * V0 * V0) / R0;
  let p = { x: 0, y: -R0 };
  let v = { x: V0, y: 0 };
  const points = [p];

  let prevR = R0;
  let prevDr = 0;

  for (let i = 0; i < MAX_STEPS; i++) {
    const r = Math.hypot(p.x, p.y);
    const ax = (-a0 * p.x) / r;
    const ay = (-a0 * p.y) / r;

    v = { x: v.x + ax * DT, y: v.y + ay * DT };
    p = { x: p.x + v.x * DT, y: p.y + v.y * DT };
    points.push(p);

    // 画到"首次径向折返"为止：力偏小时停在最远处、力偏大时停在最近处，
    // 轨迹因此单调地向外张 / 向内收，与"逐渐远离 / 靠近圆心"的判定一致。
    const rr = Math.hypot(p.x, p.y);
    const dr = rr - prevR;
    prevR = rr;

    if (i > 5 && Math.abs(dr) > 0.004) {
      if (prevDr !== 0 && Math.sign(dr) !== Math.sign(prevDr)) break;
      prevDr = dr;
    }

    if (rr > OUTER || rr < INNER) break;
  }

  const d = points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${(CX + pt.x).toFixed(1)} ${(CY + pt.y).toFixed(1)}`)
    .join(" ");
  const last = points[points.length - 1] ?? p;

  return { d, end: { x: CX + last.x, y: CY + last.y } };
};

const trace = computed(() => trajectory(lambda.value));

/** λ（HTML 层不写纯文本符号，一律交给 <Latex> 渲染） */
const lambdaTex = String.raw`\lambda`;

/** 判定：公式、文案与颜色三者绑定，颜色与轨迹同色 */
const state = computed(() => {
  if (Math.abs(lambda.value - 1) < 0.04) {
    return {
      formula: String.raw`F_{\text{实}} = m\frac{v^2}{r}`,
      text: "力恰好够，做圆周运动",
      color: "#60a5fa",
    };
  }

  if (lambda.value < 1) {
    return {
      formula: String.raw`F_{\text{实}} < m\frac{v^2}{r}`,
      text: "力不够，逐渐远离圆心",
      color: "#e2a846",
    };
  }

  return {
    formula: String.raw`F_{\text{实}} > m\frac{v^2}{r}`,
    text: "力过大，逐渐靠近圆心",
    color: "#2dd4bf",
  };
});
</script>

<template>
  <div class="centri-demo">
    <svg
      viewBox="0 0 412 306"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="拖动滑块改变实际受力的大小，观察物体轨迹形状的变化"
    >
      <circle
        :cx="CX"
        :cy="CY"
        :r="R0"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
        opacity="0.5"
      />
      <text
        x="104"
        y="276"
        text-anchor="end"
        font-size="16"
        fill="var(--c-text-dim)"
        stroke="#0f1425"
        stroke-width="2.5"
        paint-order="stroke"
      >
        <tspan font-family="KaTeX_Math" font-style="italic">λ</tspan>
        <tspan font-family="KaTeX_Main">= 1 轨道</tspan>
      </text>
      <line
        :x1="CX"
        :y1="CY"
        :x2="start.x"
        :y2="start.y"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="6 6"
        opacity="0.55"
      />
      <text
        :x="CX - 10"
        :y="CY - 52"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="var(--c-text-dim)"
        stroke="#0f1425"
        stroke-width="2.5"
        paint-order="stroke"
      >
        r
      </text>
      <path
        class="demo-traj"
        :d="trace.d"
        pathLength="1"
        stroke-dasharray="1"
        fill="none"
        :stroke="state.color"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <circle
        :cx="trace.end.x"
        :cy="trace.end.y"
        r="4.6"
        :fill="state.color"
        stroke="#0f1425"
        stroke-width="1.6"
      />
      <circle :cx="CX" :cy="CY" r="4.6" fill="var(--c-text-dim)" />
      <text
        :x="CX + 11"
        :y="CY + 23"
        font-family="KaTeX_Main"
        font-size="18"
        fill="var(--c-text-dim)"
      >
        O
      </text>
      <circle :cx="start.x" :cy="start.y" r="6.5" fill="#f1f5f9" />
      <CourseArrow
        :from="start"
        :to="{ x: start.x + 78, y: start.y }"
        stroke="#e2e8f0"
        :stroke-width="3"
        label="v"
        :label-dx="6"
        :label-dy="-11"
      />
    </svg>

    <div class="demo-panel">
      <div class="demo-head">
        <span class="demo-tag">实际受力 ÷ 所需向心力</span>
        <span class="demo-ratio"
          ><Latex :tex="lambdaTex" /><span class="demo-eq">=</span
          ><span class="demo-value" :style="{ color: state.color }">{{
            lambda.toFixed(2)
          }}</span></span
        >
      </div>

      <input
        v-model.number="lambda"
        class="demo-slider"
        type="range"
        min="0.4"
        max="1.8"
        step="0.02"
        :style="{ '--thumb-color': state.color }"
        aria-label="改变实际受力与所需向心力的比值"
      />

      <div class="demo-verdict" :style="{ color: state.color }">
        <span class="demo-dot" />
        <span class="demo-formula"><Latex :tex="state.formula" /></span>
        <span class="demo-text">{{ state.text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centri-demo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.centri-demo svg {
  display: block;

  width: 100%;
  height: auto;
}

/* 轨迹：入场时沿路径描边渐入（pathLength=1 让动画与轨迹长短无关） */
.demo-traj {
  animation: traj-draw 1.05s cubic-bezier(0.33, 0, 0.2, 1) both;
}

@keyframes traj-draw {
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
}

.demo-panel {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  min-height: 0;
  padding: 0.5rem 0.7rem 0.55rem;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 0.85rem;

  background: rgba(148, 163, 184, 0.07);
}

.demo-head {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  justify-content: space-between;
}

.demo-tag {
  color: var(--c-text-dim);
  font-size: 0.8rem;
}

.demo-ratio {
  display: inline-flex;
  gap: 0.3rem;
  align-items: baseline;

  white-space: nowrap;
}

.demo-eq {
  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.demo-value {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 1.05rem;
  font-weight: 700;
}

.demo-slider {
  --thumb-color: #60a5fa;

  width: 100%;
  height: 1.15rem;
  margin: 0;

  background: transparent;
  cursor: grab;

  appearance: none;
}

.demo-slider:active {
  cursor: grabbing;
}

.demo-slider::-webkit-slider-runnable-track {
  height: 0.42rem;
  border-radius: 999px;

  background: linear-gradient(90deg, #e2a846, #60a5fa, #2dd4bf);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.22);
}

.demo-slider::-webkit-slider-thumb {
  width: 1.05rem;
  height: 1.05rem;
  margin-top: -0.315rem;

  border: 2px solid #f1f5f9;
  border-radius: 50%;

  background: var(--thumb-color);
  box-shadow: 0 2px 8px rgba(15, 20, 37, 0.85);

  cursor: grab;

  appearance: none;
  transition: background-color 0.25s ease;
}

.demo-slider::-moz-range-track {
  height: 0.42rem;
  border-radius: 999px;

  background: linear-gradient(90deg, #e2a846, #60a5fa, #2dd4bf);
}

.demo-slider::-moz-range-thumb {
  width: 1.05rem;
  height: 1.05rem;
  border: 2px solid #f1f5f9;
  border-radius: 50%;

  background: var(--thumb-color);

  cursor: grab;
}

.demo-verdict {
  display: flex;
  gap: 0.45rem;
  align-items: center;

  min-height: 1.25rem;

  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.25;
  white-space: nowrap;
}

.demo-dot {
  flex: 0 0 auto;

  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;

  background: currentColor;
}

.demo-formula {
  flex: 0 0 auto;
}
</style>
