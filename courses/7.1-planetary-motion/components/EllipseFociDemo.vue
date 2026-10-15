<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 第 8 页：用“绳钉画椭圆”的装置定量看离心率——细绳两端固定在两个焦点上，绳长恒定 = 2a； 铅笔贴着绳滑动，画出的轨迹就是椭圆（到两焦点的距离之和恒等于 2a）。 手动调节 e =
 * c/a：e = 0 时两焦点重合、b = a，退化为圆；e 越大椭圆越扁，e → 1 时趋近一条线段。
 */
/** 半长轴（用户单位）：由绳长决定，滑杆只改离心率 */
const A = 105;
/** 离心率 e = c/a（滑杆直接调它，0 时两焦点重合） */
const ecc = ref(0.45);
/** 焦距 c = ae、半短轴 b = √(a² − c²) */
const cFocal = computed(() => A * ecc.value);
const semiMinor = computed(() => A * Math.sqrt(Math.max(0, 1 - ecc.value ** 2)));
/** 椭圆中心（画布坐标，y 向下） */
const C = { x: 250, y: 138 };
/** 两个焦点 */
const F1 = computed(() => ({ x: C.x - cFocal.value, y: C.y }));
const F2 = computed(() => ({ x: C.x + cFocal.value, y: C.y }));
/** 铅笔所在的位置：椭圆上参数角 305° 处 */
const PENCIL_ANG = 305;
const pencilAt = computed(() => {
  const rad = (PENCIL_ANG * Math.PI) / 180;
  return { x: C.x + A * Math.cos(rad), y: C.y + semiMinor.value * Math.sin(rad) };
});
/** 两焦点间距尺寸线（画在长轴下方 24） */
const DIM_Y = C.y + 24;
const DIM_MID = { x: C.x, y: DIM_Y };
/**
 * P → q 的单位向量
 *
 * @param p 起点
 * @param q 终点
 * @returns 由 p 指向 q 的单位向量
 */
const unit = (
  p: { x: number; y: number },
  q: { x: number; y: number },
): { x: number; y: number } => {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
};
/** 铅笔轴的方向：两段绳的角平分线的反方向（角平分线指向椭圆内部，铅笔朝外） */
const pencilDirection = computed(() => {
  const p = pencilAt.value;
  const u1 = unit(p, F1.value);
  const u2 = unit(p, F2.value);
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const len = Math.hypot(bx, by) || 1;
  return { x: -bx / len, y: -by / len };
});
const pencilBody = computed(() => {
  const p = pencilAt.value;
  const d = pencilDirection.value;
  return {
    from: { x: p.x + d.x * 7, y: p.y + d.y * 7 },
    to: { x: p.x + d.x * 36, y: p.y + d.y * 36 },
  };
});
/** 状态描述：圆 / 椭圆 / 很扁 */
const shapeText = computed(() => {
  if (ecc.value === 0) return "两焦点重合：圆（a = b）";
  if (ecc.value >= 0.9) return "很扁，趋近一条线段";
  return "椭圆（b < a）";
});
const aria = computed(
  () =>
    `绳钉画椭圆：绳长 2a 不变，离心率 e = ${ecc.value.toFixed(2)}，半短轴 b = ${(semiMinor.value / A).toFixed(2)}a，` +
    `${shapeText.value}。`,
);
</script>

<template>
  <div class="ef">
    <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="aria">
      <ellipse
        :cx="C.x"
        :cy="C.y"
        :rx="A"
        :ry="semiMinor"
        fill="none"
        stroke="#e2a846"
        stroke-width="2.4"
        opacity="0.85"
      />
      <line
        :x1="pencilAt.x"
        :y1="pencilAt.y"
        :x2="F1.x"
        :y2="F1.y"
        stroke="#cbd5e1"
        stroke-width="1.7"
        opacity="0.7"
      />
      <line
        :x1="pencilAt.x"
        :y1="pencilAt.y"
        :x2="F2.x"
        :y2="F2.y"
        stroke="#cbd5e1"
        stroke-width="1.7"
        opacity="0.7"
      />
      <line
        :x1="C.x"
        :y1="C.y"
        :x2="C.x + A"
        :y2="C.y"
        stroke="#e2a846"
        stroke-width="2"
        opacity="0.7"
      />
      <line
        :x1="C.x"
        :y1="C.y"
        :x2="C.x"
        :y2="C.y - semiMinor"
        stroke="#60a5fa"
        stroke-width="2"
        opacity="0.7"
      />
      <g v-if="cFocal > 2">
        <CourseArrow :from="DIM_MID" :to="F1" stroke="#94a3b8" stroke-width="1.6" />
        <CourseArrow :from="DIM_MID" :to="F2" stroke="#94a3b8" stroke-width="1.6" />
        <text
          :x="DIM_MID.x"
          :y="DIM_Y + 24"
          text-anchor="middle"
          font-size="16"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#94a3b8"
          class="ef-halo"
        >
          2c
        </text>
      </g>
      <g v-if="cFocal > 2">
        <text
          :x="F1.x"
          :y="F1.y - 12"
          text-anchor="middle"
          font-size="16"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#94a3b8"
          class="ef-halo"
        >
          F
        </text>
        <text
          :x="F2.x"
          :y="F2.y - 12"
          text-anchor="middle"
          font-size="16"
          font-family="KaTeX_Math"
          font-style="italic"
          fill="#94a3b8"
          class="ef-halo"
        >
          F
        </text>
      </g>
      <text
        :x="C.x + A / 2"
        :y="C.y - 10"
        text-anchor="middle"
        font-size="18"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="#e2a846"
        class="ef-halo"
      >
        a
      </text>
      <text
        :x="C.x + 14"
        :y="C.y - semiMinor / 2"
        font-size="18"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="#60a5fa"
        class="ef-halo"
      >
        b
      </text>
      <circle :cx="F1.x" :cy="F1.y" r="4.2" fill="#cbd5e1" />
      <circle :cx="F2.x" :cy="F2.y" r="4.2" fill="#cbd5e1" />
      <line
        :x1="pencilBody.from.x"
        :y1="pencilBody.from.y"
        :x2="pencilBody.to.x"
        :y2="pencilBody.to.y"
        stroke="#c98a4b"
        stroke-width="7.5"
        stroke-linecap="round"
      />
      <circle :cx="pencilAt.x" :cy="pencilAt.y" r="3.6" fill="#e2a846" />
    </svg>

    <div class="ef-panel">
      <div class="ef-row">
        <span class="ef-label">离心率 <Latex tex="e = \dfrac{c}{a}" /></span>
        <input v-model.number="ecc" class="ef-range" type="range" min="0" max="0.95" step="0.05" />
        <span class="ef-readout"
          ><b class="ef-value">{{ ecc.toFixed(2) }}</b></span
        >
      </div>
      <div class="ef-row ef-row-note">
        <span>绳长不变 ⇒ <Latex tex="2a" /> 不变；<Latex tex="c^2 + b^2 = a^2" /></span>
        <span class="ef-shape">{{ shapeText }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ef {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
  min-width: 0;
}

.ef svg {
  display: block;
  width: 100%;
  height: auto;
}

/* 图内小字压在轨道/绳上时加描边光晕 */
.ef-halo {
  paint-order: stroke;
  stroke: #0f1425;
  stroke-width: 3.4px;
}

.ef-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.ef-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;

  color: var(--c-text-dim);

  font-size: 0.8rem;
}

.ef-label {
  white-space: nowrap;
}

.ef-range {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}

.ef-readout {
  white-space: nowrap;
}

.ef-value {
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}

.ef-row-note {
  justify-content: space-between;
}

.ef-shape {
  color: var(--c-accent);
  white-space: nowrap;
}
</style>
