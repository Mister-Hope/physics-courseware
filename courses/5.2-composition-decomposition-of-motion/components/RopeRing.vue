<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 关联速度 · 绳—环模型：两根互相垂直的杆上各套一个环，用不可伸长的绳相连。 A 以 v_A 沿竖直杆下滑、绳与竖直杆成 θ 角时，两端沿绳方向的分量相等： v_A cosθ = v_B
 * sinθ ⇒ v_B = v_A·cotθ。 showDecomp=false 时只给干净题目图（题干页用）。
 */
const {
  showDecomp = true,
  showPanel = true,
  readout = true,
} = defineProps<{
  /** 是否画出速度分解（题干页先给干净图） */
  showDecomp?: boolean;
  /** 是否显示角度滑杆 */
  showPanel?: boolean;
  /** 是否显示读数 */
  readout?: boolean;
}>();

const VIEW_W = 500;
const VIEW_H = 440;
/** 竖直杆 x、水平杆 y、绳长（像素） */
const ROD_X = 110;
const ROD_Y = 330;
const ROPE_LEN = 300;
/** 速度比例：每 1 m/s 画多长 */
const SCALE = 80;
/** 分解箭头相对绳的横向偏移，两条分量并排才看得清 */

const theta = ref(40);
const rad = (deg: number): number => (deg * Math.PI) / 180;
const cosT = computed(() => Math.cos(rad(theta.value)));
const sinT = computed(() => Math.sin(rad(theta.value)));

const ringA = computed(() => ({ x: ROD_X, y: ROD_Y - ROPE_LEN * cosT.value }));
const ringB = computed(() => ({ x: ROD_X + ROPE_LEN * sinT.value, y: ROD_Y }));
/** A → B 的单位向量与其法向 */
const dirAB = computed(() => {
  const dx = ringB.value.x - ringA.value.x;
  const dy = ringB.value.y - ringA.value.y;
  const len = Math.hypot(dx, dy);
  return { x: dx / len, y: dy / len };
});

const vB = computed(() => cosT.value / sinT.value);
const aTip = computed(() => ({ x: ringA.value.x, y: ringA.value.y + SCALE }));
const bTip = computed(() => ({ x: ringB.value.x + vB.value * SCALE, y: ringB.value.y }));
/**
 * 两端沿绳方向的分量：从各自的速度箭头尖端**向绳方向作垂线**，垂足就是分量的末端。 两个分量都从物体本身出发（A 端从 A、B 端从 B），大小都是 v_A cosθ，方向都沿
 * A→B（右下）。
 */
const shareLen = computed(() => SCALE * cosT.value);
const aShare = computed(() => ({
  from: { x: ringA.value.x, y: ringA.value.y },
  to: {
    x: ringA.value.x + shareLen.value * dirAB.value.x,
    y: ringA.value.y + shareLen.value * dirAB.value.y,
  },
}));
const bShare = computed(() => ({
  from: { x: ringB.value.x, y: ringB.value.y },
  to: {
    x: ringB.value.x + shareLen.value * dirAB.value.x,
    y: ringB.value.y + shareLen.value * dirAB.value.y,
  },
}));
/** 两条垂线：速度箭头尖端 → 分量的末端 */
const aPerp = computed(() => ({ from: aTip.value, to: aShare.value.to }));
const bPerp = computed(() => ({ from: bTip.value, to: bShare.value.to }));

/**
 * 垂足处的直角符号：以垂足为顶点，沿"绳方向"与"垂线方向"各取一小段，
 * 画一个边长 12 的小方角，标明这条虚线确实垂直于绳。
 */
const rightAngleMark = (foot: { x: number; y: number }, along: { x: number; y: number }, perp: { x: number; y: number }): string => {
  const size = 12;
  const p1 = { x: foot.x + size * along.x, y: foot.y + size * along.y };
  const p2 = { x: foot.x + size * perp.x, y: foot.y + size * perp.y };
  const p3 = { x: p1.x + size * perp.x, y: p1.y + size * perp.y };
  return `M ${p1.x} ${p1.y} L ${p3.x} ${p3.y} L ${p2.x} ${p2.y}`;
};
/** 垂足处两个方向的单位矢量：沿绳（指向分量末端）与沿垂线（指向速度尖端） */
const unitTo = (
  from: { x: number; y: number },
  to: { x: number; y: number },
): { x: number; y: number } => {
  const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  return { x: (to.x - from.x) / len, y: (to.y - from.y) / len };
};
const aMark = computed(() =>
  rightAngleMark(
    aShare.value.to,
    unitTo(aShare.value.from, aShare.value.to),
    unitTo(aShare.value.to, aPerp.value.from),
  ),
);
const bMark = computed(() =>
  rightAngleMark(
    bShare.value.to,
    unitTo(bShare.value.from, bShare.value.to),
    unitTo(bShare.value.to, bPerp.value.from),
  ),
);
/** 说明文字放在绳中点右侧（避开绳与杆） */
const noteLabel = computed(() => ({
  x: (ringA.value.x + ringB.value.x) / 2 + 26 * cosT.value,
  y: (ringA.value.y + ringB.value.y) / 2 - 26 * sinT.value,
}));
/** θ 角：绳与竖直杆（A 下方）之间的夹角 */
const arcRadius = 62;
const arcStart = computed(() => ({ x: ringA.value.x, y: ringA.value.y + arcRadius }));
const arcEnd = computed(() => ({
  x: ringA.value.x + arcRadius * dirAB.value.x,
  y: ringA.value.y + arcRadius * dirAB.value.y,
}));
</script>

<template>
  <div class="sim">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="两根垂直杆上的环用绳相连"
    >
      <!-- 两根互相垂直的杆 -->
      <line
        :x1="ROD_X"
        y1="30"
        :x2="ROD_X"
        :y2="ROD_Y"
        stroke="color-mix(in srgb, var(--c-neutral-300) 80%, transparent)"
        stroke-width="7"
        stroke-linecap="round"
      />
      <line
        :x1="ROD_X"
        :y1="ROD_Y"
        x2="460"
        :y2="ROD_Y"
        stroke="color-mix(in srgb, var(--c-neutral-300) 80%, transparent)"
        stroke-width="7"
        stroke-linecap="round"
      />
      <SurfaceHatch
        :from="{ x: ROD_X, y: ROD_Y }"
        :to="{ x: 460, y: ROD_Y }"
        side="below"
        :thickness="12"
      />
      <!-- 环 + 绳 -->
      <line
        :x1="ringA.x"
        :y1="ringA.y"
        :x2="ringB.x"
        :y2="ringB.y"
        stroke="var(--c-neutral-300)"
        stroke-width="2.6"
      />
      <circle
        :cx="ringA.x"
        :cy="ringA.y"
        r="10"
        fill="color-mix(in srgb, var(--c-bg) 90%, transparent)"
        stroke="var(--c-force)"
        stroke-width="3"
      />
      <circle
        :cx="ringB.x"
        :cy="ringB.y"
        r="10"
        fill="color-mix(in srgb, var(--c-bg) 90%, transparent)"
        stroke="var(--c-velocity)"
        stroke-width="3"
      />
      <text
        :x="ringA.x - 30"
        :y="ringA.y + 6"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-force)"
      >
        A
      </text>
      <text
        :x="ringB.x - 4"
        :y="ringB.y + 34"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-velocity-light)"
      >
        B
      </text>
      <!-- θ 角 -->
      <path
        :d="`M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`"
        fill="none"
        stroke="var(--c-neutral-300)"
        stroke-width="2"
      />
      <text
        :x="ringA.x + 14"
        :y="ringA.y + 58"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-neutral-300)"
      >
        θ
      </text>
      <!-- 速度与分解 -->
      <g v-if="showDecomp">
        <CourseArrow :from="ringA" :to="aTip" stroke="var(--c-force)" :stroke-width="3.4" />
        <CourseArrow :from="ringB" :to="bTip" stroke="var(--c-velocity)" :stroke-width="3.4" />
        <line
          :x1="aPerp.from.x"
          :y1="aPerp.from.y"
          :x2="aPerp.to.x"
          :y2="aPerp.to.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 80%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <line
          :x1="bPerp.from.x"
          :y1="bPerp.from.y"
          :x2="bPerp.to.x"
          :y2="bPerp.to.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 80%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <CourseArrow
          :from="aShare.from"
          :to="aShare.to"
          stroke="var(--c-accent)"
          :stroke-width="3.2"
        />
        <CourseArrow
          :from="bShare.from"
          :to="bShare.to"
          stroke="var(--c-accent)"
          :stroke-width="3.2"
        />
        <text
          :x="ringA.x - 34"
          :y="ringA.y + SCALE + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="var(--c-force)"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">A</tspan>
        </text>
        <text
          :x="bTip.x + 8"
          :y="ringB.y - 12"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="var(--c-velocity-light)"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">B</tspan>
        </text>
        <text
          :x="noteLabel.x"
          :y="noteLabel.y"
          text-anchor="start"
          font-family="KaTeX_Main"
          font-size="14"
          fill="color-mix(in srgb, var(--c-accent) 95%, transparent)"
        >
          两端沿绳分量相等
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="sim-panel">
      <CourseSlider
        v-model="theta"
        :min="20"
        :max="70"
        label="绳与竖直杆的夹角"
        label-width="11rem"
      />
    </div>
    <div v-if="readout" class="sim-readout">
      <Latex :tex="`v_B = v_A\\cot\\theta = ${vB.toFixed(2)}\\,v_A`" />
    </div>
  </div>
</template>

<style scoped>
.sim {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.sim svg {
  display: block;
  width: 100%;
  height: auto;
}

.sim-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}




.sim-readout {
  color: var(--c-text);
  font-size: 0.95rem;
  text-align: center;
}
</style>
