<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 关联速度 · 接触面模型：光滑墙角处，斜劈放在光滑水平地面上，球夹在竖直墙和斜劈斜面之间。 球以 v0 沿墙下落时把斜劈向右挤开；两者在接触面法线方向上的速度分量必须相等： v0 cosθ =
 * v劈 sinθ ⇒ v劈 = v0·cotθ（θ 为斜面与水平方向的夹角）。 画面里斜劈缓慢右移、球同步下落，用来看清"沿法线分量相等"这条约束。 showDecomp=false
 * 时只给干净题目图（题干页用）。
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
const WALL_X = 120;
const GROUND_Y = 400;
/** 斜面长度、球半径、速度比例（每 1 m/s 多少像素） */
const SLANT = 300;
const BALL_R = 26;
const SCALE = 80;

const theta = ref(40);
const rad = (deg: number): number => (deg * Math.PI) / 180;
const cosT = computed(() => Math.cos(rad(theta.value)));
const sinT = computed(() => Math.sin(rad(theta.value)));

/** 斜劈缓慢右移 → 球同步下落：dx 在 0 ~ 25 px 之间来回 */
const offset = ref(0);
let raf = 0;
let started = 0;
const loop = (now: number): void => {
  if (!started) started = now;
  const phase = ((now - started) / 1000 / 5) % 1;
  offset.value = 12.5 * (1 - Math.cos(2 * Math.PI * phase));
  raf = requestAnimationFrame(loop);
};
onMounted(() => {
  raf = requestAnimationFrame(loop);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
});

const corner = computed(() => ({ x: WALL_X + offset.value, y: GROUND_Y }));
const top = computed(() => ({
  x: corner.value.x + SLANT * cosT.value,
  y: GROUND_Y - SLANT * sinT.value,
}));
/** 斜面的方向（下→上）与法线（指向球所在的一侧：左上） */
const slantDir = computed(() => ({ x: cosT.value, y: -sinT.value }));
const normal = computed(() => ({ x: -sinT.value, y: -cosT.value }));
/** 球心高度：始终与墙、斜面同时相切 */
const ballH = computed(() => (BALL_R + (BALL_R - offset.value) * sinT.value) / cosT.value);
const ballCenter = computed(() => ({ x: WALL_X + BALL_R, y: GROUND_Y - ballH.value }));
/** 球与斜面的接触点（球心到斜面的垂足） */
const contact = computed(() => {
  const rel = { x: ballCenter.value.x - corner.value.x, y: ballCenter.value.y - corner.value.y };
  const dist = rel.x * slantDir.value.x + rel.y * slantDir.value.y;
  return {
    x: corner.value.x + dist * slantDir.value.x,
    y: corner.value.y + dist * slantDir.value.y,
  };
});

const vWedge = computed(() => cosT.value / sinT.value);
const ballTip = computed(() => ({
  x: ballCenter.value.x,
  y: ballCenter.value.y + SCALE,
}));
/** 斜劈速度画在它底边中点旁侧 */
const wedgeFrom = computed(() => ({
  x: (corner.value.x + top.value.x) / 2,
  y: GROUND_Y - 10,
}));
const wedgeTip = computed(() => ({
  x: wedgeFrom.value.x + vWedge.value * SCALE,
  y: wedgeFrom.value.y,
}));
/** 法向分量：两个都是 v0 cosθ，长度自然相等 */
const shareLen = computed(() => SCALE * cosT.value);
const ballShare = computed(() => ({
  from: ballCenter.value,
  to: {
    x: ballCenter.value.x + shareLen.value * normal.value.x,
    y: ballCenter.value.y + shareLen.value * normal.value.y,
  },
}));
const wedgeShare = computed(() => {
  const origin = {
    x: contact.value.x + 40 * slantDir.value.x,
    y: contact.value.y + 40 * slantDir.value.y,
  };
  return {
    from: origin,
    to: {
      x: origin.x + shareLen.value * normal.value.x,
      y: origin.y + shareLen.value * normal.value.y,
    },
  };
});
const normalLine = computed(() => ({
  a: {
    x: contact.value.x - 40 * normal.value.x,
    y: contact.value.y - 40 * normal.value.y,
  },
  b: {
    x: contact.value.x + 150 * normal.value.x,
    y: contact.value.y + 150 * normal.value.y,
  },
}));
/** 法线说明文字：贴住法线末端，但别跑出画布 */
const normalLabel = computed(() => ({
  x: Math.max(16, normalLine.value.b.x - 20),
  y: Math.max(22, normalLine.value.b.y - 10),
}));
const arcRadius = 70;
</script>

<template>
  <div class="wedge-ball">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="斜劈在光滑地面上被下落的球挤开"
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
      <!-- 斜劈 -->
      <polygon
        :points="`${corner.x},${corner.y} ${top.x},${top.y} ${top.x},${GROUND_Y}`"
        fill="rgba(96,165,250,0.22)"
        stroke="#93c5fd"
        stroke-width="2.4"
      />
      <!-- 球 -->
      <circle
        :cx="ballCenter.x"
        :cy="ballCenter.y"
        :r="BALL_R"
        fill="rgba(248,113,113,0.35)"
        stroke="#f87171"
        stroke-width="2.6"
      />
      <!-- θ 角：斜面与水平地面 -->
      <line
        :x1="corner.x"
        :y1="GROUND_Y"
        :x2="corner.x + 260"
        :y2="GROUND_Y"
        stroke="rgba(148,163,184,0.6)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path
        :d="`M ${corner.x + arcRadius} ${GROUND_Y} A ${arcRadius} ${arcRadius} 0 0 0 ${corner.x + arcRadius * cosT} ${GROUND_Y - arcRadius * sinT}`"
        fill="none"
        stroke="#cbd5e1"
        stroke-width="2"
      />
      <text
        :x="corner.x + arcRadius + 12"
        :y="GROUND_Y - 14"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#cbd5e1"
      >
        θ
      </text>
      <!-- 速度与法向分量 -->
      <g v-if="showDecomp">
        <line
          :x1="normalLine.a.x"
          :y1="normalLine.a.y"
          :x2="normalLine.b.x"
          :y2="normalLine.b.y"
          stroke="rgba(148,163,184,0.75)"
          stroke-width="1.8"
          stroke-dasharray="8 6"
        />
        <CourseArrow :from="ballCenter" :to="ballTip" stroke="#f87171" :stroke-width="3.4" />
        <CourseArrow :from="wedgeFrom" :to="wedgeTip" stroke="#60a5fa" :stroke-width="3.4" />
        <CourseArrow :from="ballShare.from" :to="ballShare.to" stroke="#e2a846" :stroke-width="3" />
        <CourseArrow
          :from="wedgeShare.from"
          :to="wedgeShare.to"
          stroke="#e2a846"
          :stroke-width="3"
        />
        <text
          :x="ballCenter.x + 14"
          :y="ballTip.y + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#f87171"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
        </text>
        <text
          :x="wedgeTip.x + 8"
          :y="wedgeFrom.y + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#93c5fd"
        >
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">劈</tspan>
        </text>
        <text
          :x="normalLabel.x"
          :y="normalLabel.y"
          font-family="KaTeX_Main"
          font-size="14"
          fill="rgba(226,168,70,0.95)"
        >
          沿法线分量相等
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="wedge-panel">
      <label
        >斜面与水平方向的夹角 <span class="wedge-val">{{ theta }}°</span
        ><input v-model.number="theta" type="range" min="20" max="70" step="1"
      /></label>
    </div>
    <div v-if="readout" class="wedge-readout">
      v<sub>劈</sub> = v<sub>0</sub>·cot θ = <b>{{ vWedge.toFixed(2) }} v<sub>0</sub></b>
    </div>
  </div>
</template>

<style scoped>
.wedge-ball {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.wedge-ball svg {
  display: block;
  width: 100%;
  height: auto;
}

.wedge-panel {
  display: flex;
  justify-content: center;
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.8rem;
}

.wedge-panel label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.wedge-panel input {
  width: 8rem;
}

.wedge-val {
  min-width: 2.6rem;
  color: var(--c-accent, #e2a846);
  font-variant-numeric: tabular-nums;
}

.wedge-readout {
  color: var(--c-text, #e2e8f0);
  font-size: 0.95rem;
  text-align: center;
}
</style>
