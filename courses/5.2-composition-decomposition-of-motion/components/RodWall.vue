<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 关联速度 · 杆模型：长杆斜靠在竖直墙上，下端在光滑水平地面上。 下端以 v 远离墙滑动、上端沿墙下滑时，两端沿杆方向的分量相等： v cosθ = u sinθ ⇒ u = v·cotθ。
 * showDecomp=false 时只给干净题目图（题干页用）。
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

const VIEW_W = 560;
const VIEW_H = 440;
const WALL_X = 140;
const GROUND_Y = 350;
const ROD_LEN = 300;
const SCALE = 80;

const theta = ref(40);
const rad = (deg: number): number => (deg * Math.PI) / 180;
const cosT = computed(() => Math.cos(rad(theta.value)));
const sinT = computed(() => Math.sin(rad(theta.value)));

const topEnd = computed(() => ({ x: WALL_X, y: GROUND_Y - ROD_LEN * sinT.value }));
const bottomEnd = computed(() => ({ x: WALL_X + ROD_LEN * cosT.value, y: GROUND_Y }));
/** 杆的方向（下端 → 上端）与法向 */
const dirUp = computed(() => ({ x: -cosT.value, y: -sinT.value }));

const lowerSpeed = 1;
const upperSpeed = computed(() => cosT.value / sinT.value);
const bTip = computed(() => ({ x: bottomEnd.value.x + lowerSpeed * SCALE, y: bottomEnd.value.y }));
const aTip = computed(() => ({ x: topEnd.value.x, y: topEnd.value.y + upperSpeed.value * SCALE }));
/** 两端沿杆方向的分量：从各自的速度箭头尖端**向杆方向作垂线**，垂足就是分量的末端。 两个分量都从物体本身出发（上端从杆顶、下端从杆底），大小都是 v cosθ，方向都沿杆指向右下。 */
const shareLen = computed(() => SCALE * cosT.value);
const downRight = computed(() => ({ x: -dirUp.value.x, y: -dirUp.value.y }));
const aShare = computed(() => ({
  from: { x: topEnd.value.x, y: topEnd.value.y },
  to: {
    x: topEnd.value.x + shareLen.value * downRight.value.x,
    y: topEnd.value.y + shareLen.value * downRight.value.y,
  },
}));
const bShare = computed(() => ({
  from: { x: bottomEnd.value.x, y: bottomEnd.value.y },
  to: {
    x: bottomEnd.value.x + shareLen.value * downRight.value.x,
    y: bottomEnd.value.y + shareLen.value * downRight.value.y,
  },
}));
/** 两条垂线：速度箭头尖端 → 分量的末端 */
const aPerp = computed(() => ({ from: aTip.value, to: aShare.value.to }));
const bPerp = computed(() => ({ from: bTip.value, to: bShare.value.to }));
/** 说明文字放在杆中点右上方（避开杆与地面） */
const noteLabel = computed(() => ({
  x: (topEnd.value.x + bottomEnd.value.x) / 2 + 22 * sinT.value,
  y: (topEnd.value.y + bottomEnd.value.y) / 2 - 22 * cosT.value,
}));
const arcRadius = 66;
</script>

<template>
  <div class="rod-wall">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="斜靠在墙上的杆两端的速度关系"
    >
      <!-- 墙与地面 -->
      <SurfaceHatch
        :from="{ x: WALL_X, y: 40 }"
        :to="{ x: WALL_X, y: GROUND_Y }"
        side="left"
        :thickness="14"
      />
      <SurfaceHatch
        :from="{ x: WALL_X, y: GROUND_Y }"
        :to="{ x: 540, y: GROUND_Y }"
        side="below"
        :thickness="14"
      />
      <!-- 杆 -->
      <line
        :x1="topEnd.x"
        :y1="topEnd.y"
        :x2="bottomEnd.x"
        :y2="bottomEnd.y"
        stroke="#cbd5e1"
        stroke-width="6"
        stroke-linecap="round"
      />
      <!-- θ 角：杆与地面的夹角 -->
      <line
        :x1="bottomEnd.x"
        :y1="GROUND_Y"
        :x2="bottomEnd.x - 200"
        :y2="GROUND_Y"
        stroke="rgba(148,163,184,0.6)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path
        :d="`M ${bottomEnd.x - arcRadius} ${GROUND_Y} A ${arcRadius} ${arcRadius} 0 0 1 ${bottomEnd.x - arcRadius * cosT} ${GROUND_Y - arcRadius * sinT}`"
        fill="none"
        stroke="#cbd5e1"
        stroke-width="2"
      />
      <text
        :x="bottomEnd.x - arcRadius - 26"
        :y="GROUND_Y - 14"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#cbd5e1"
      >
        θ
      </text>
      <!-- 速度与沿杆分量 -->
      <g v-if="showDecomp">
        <CourseArrow :from="bottomEnd" :to="bTip" stroke="#60a5fa" :stroke-width="3.4" />
        <CourseArrow :from="topEnd" :to="aTip" stroke="#f87171" :stroke-width="3.4" />
        <line
          :x1="aPerp.from.x"
          :y1="aPerp.from.y"
          :x2="aPerp.to.x"
          :y2="aPerp.to.y"
          stroke="rgba(148,163,184,0.8)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <line
          :x1="bPerp.from.x"
          :y1="bPerp.from.y"
          :x2="bPerp.to.x"
          :y2="bPerp.to.y"
          stroke="rgba(148,163,184,0.8)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <CourseArrow :from="bShare.from" :to="bShare.to" stroke="#e2a846" :stroke-width="3.2" />
        <CourseArrow :from="aShare.from" :to="aShare.to" stroke="#e2a846" :stroke-width="3.2" />
        <text
          :x="bTip.x + 8"
          :y="bottomEnd.y - 12"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#93c5fd"
        >
          v
        </text>
        <text
          :x="topEnd.x + 12"
          :y="aTip.y + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#f87171"
        >
          u
        </text>
        <text
          :x="noteLabel.x"
          :y="noteLabel.y"
          text-anchor="start"
          font-family="KaTeX_Main"
          font-size="14"
          fill="rgba(226,168,70,0.95)"
        >
          两端沿杆分量相等
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="rod-panel">
      <label
        >杆与地面的夹角 <span class="rod-val">{{ theta }}°</span
        ><input v-model.number="theta" type="range" min="35" max="70" step="1"
      /></label>
    </div>
    <div v-if="readout" class="rod-readout">
      u = v·cot θ = <b>{{ upperSpeed.toFixed(2) }} v</b>
    </div>
  </div>
</template>

<style scoped>
.rod-wall {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.rod-wall svg {
  display: block;
  width: 100%;
  height: auto;
}

.rod-panel {
  display: flex;
  justify-content: center;
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.8rem;
}

.rod-panel label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.rod-panel input {
  width: 8rem;
}

.rod-val {
  min-width: 2.6rem;
  color: var(--c-accent, #e2a846);
  font-variant-numeric: tabular-nums;
}

.rod-readout {
  color: var(--c-text, #e2e8f0);
  font-size: 0.95rem;
  text-align: center;
}
</style>
