<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * 关联速度/加速度 · 正方形压斜面：正方形一侧贴竖直墙，另一侧压在倾角 θ 的斜面上。
 *
 * 约束是"正方形的右下角始终压在斜面上"，所以几何关系对**任意一段位移**都成立：
 * 正方形下落 Δy、斜面体右移 Δx，则 Δy = Δx·tanθ，即 Δx = Δy·cotθ。
 * 位移有这个关系 ⇒ 速度、加速度也有同样的关系（a = A·cotθ）。
 * 画面里斜面体缓慢右移、正方形同步下落，右侧小三角形就是这条几何关系。
 */
const {
  showArrows = true,
  showTriangle = true,
  showPanel = true,
  labelBlock = "A",
  labelWedge = "a",
} = defineProps<{
  /** 是否画运动方向的箭头 */
  showArrows?: boolean;
  /** 是否画右侧的位移三角形（Δy = Δx·tanθ） */
  showTriangle?: boolean;
  /** 是否显示角度滑杆 */
  showPanel?: boolean;
  /** 正方形运动箭头的标注（如 A、v₁） */
  labelBlock?: string;
  /** 斜面体运动箭头的标注（如 a、v₂） */
  labelWedge?: string;
}>();

const VIEW_W = 640;
const VIEW_H = 420;
const WALL_X = 120;
const GROUND_Y = 340;
/** 斜面长度、正方形边长 */
const SLANT = 200;
const SIDE = 90;

const theta = ref(40);
const rad = (deg: number): number => (deg * Math.PI) / 180;
const cosT = computed(() => Math.cos(rad(theta.value)));
const sinT = computed(() => Math.sin(rad(theta.value)));

/** 斜面体缓慢右移，正方形同步下落 */
const offset = ref(30);
let raf = 0;
let started = 0;
const loop = (now: number): void => {
  if (!started) started = now;
  const phase = (((now - started) / 1000) / 5) % 1;
  offset.value = 35 + 25 * Math.cos(2 * Math.PI * phase);
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
/** 正方形底边的 y：右下角落在斜面上 */
const blockBottom = computed(() => GROUND_Y - (SIDE - offset.value) * (sinT.value / cosT.value));
const blockTop = computed(() => blockBottom.value - SIDE);
/** 接触点（正方形右下角）与法线方向（指向左上） */
const contact = computed(() => ({ x: WALL_X + SIDE, y: blockBottom.value }));
const normal = computed(() => ({ x: -sinT.value, y: -cosT.value }));
const blockCenter = computed(() => ({ x: WALL_X + SIDE / 2, y: (blockTop.value + blockBottom.value) / 2 }));
const wedgeMid = computed(() => ({ x: (corner.value.x + top.value.x) / 2, y: GROUND_Y - 12 }));
const blockTip = computed(() => ({ x: blockCenter.value.x, y: blockCenter.value.y + 62 }));
const wedgeTip = computed(() => ({ x: wedgeMid.value.x + 78, y: wedgeMid.value.y }));

/* ── 右侧小三角形：水平的 Δx 与竖直的 Δy ── */
const tri = { x0: 400, y0: 300, dx: 120 };
const triP0 = computed(() => ({ x: tri.x0, y: tri.y0 }));
const triP1 = computed(() => ({ x: tri.x0 + tri.dx, y: tri.y0 }));
const triP2 = computed(() => ({ x: tri.x0 + tri.dx, y: tri.y0 - tri.dx * (sinT.value / cosT.value) }));
/** 直角符号 */
const triRight = computed(
  () =>
    `M ${tri.x0 + tri.dx - 14} ${tri.y0} L ${tri.x0 + tri.dx - 14} ${tri.y0 - 14} L ${tri.x0 + tri.dx} ${tri.y0 - 14}`,
);
</script>

<template>
  <div class="sim">
    <svg
      :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="正方形一侧靠墙，另一侧压在斜面上"
    >
      <!-- 墙与地面 -->
      <SurfaceHatch :from="{ x: WALL_X, y: 40 }" :to="{ x: WALL_X, y: GROUND_Y }" side="left" :thickness="14" />
      <SurfaceHatch :from="{ x: WALL_X, y: GROUND_Y }" :to="{ x: 360, y: GROUND_Y }" side="below" :thickness="14" />
      <!-- 斜面体 -->
      <polygon
        :points="`${corner.x},${corner.y} ${top.x},${top.y} ${top.x},${GROUND_Y}`"
        fill="color-mix(in srgb, var(--c-velocity) 22%, transparent)"
        stroke="var(--c-velocity-light)"
        stroke-width="2.4"
      />
      <!-- 正方形（贴墙、右下角压在斜面上） -->
      <rect
        :x="WALL_X"
        :y="blockTop"
        :width="SIDE"
        :height="SIDE"
        fill="color-mix(in srgb, var(--c-force) 22%, transparent)"
        stroke="var(--c-force)"
        stroke-width="2.6"
      />
      <!-- θ 角 -->
      <line
        :x1="corner.x"
        :y1="GROUND_Y"
        :x2="corner.x + 150"
        :y2="GROUND_Y"
        stroke="color-mix(in srgb, var(--c-text-dim) 60%, transparent)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <path
        :d="`M ${corner.x + 62} ${GROUND_Y} A 62 62 0 0 0 ${corner.x + 62 * cosT} ${GROUND_Y - 62 * sinT}`"
        fill="none"
        stroke="var(--c-neutral-300)"
        stroke-width="2"
      />
      <text
        :x="corner.x + 74"
        :y="GROUND_Y - 12"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="var(--c-neutral-300)"
      >
        θ
      </text>
      <!-- 运动方向箭头 -->
      <g v-if="showArrows">
        <line
          :x1="contact.x"
          :y1="contact.y"
          :x2="contact.x + 110 * normal.x"
          :y2="contact.y + 110 * normal.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 70%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="8 6"
        />
        <CourseArrow :from="blockCenter" :to="blockTip" stroke="var(--c-force)" :stroke-width="3.4" />
        <CourseArrow :from="wedgeMid" :to="wedgeTip" stroke="var(--c-velocity)" :stroke-width="3.4" />
        <text
          :x="blockTip.x - 24"
          :y="blockTip.y + 4"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="21"
          fill="var(--c-force)"
        >
          {{ labelBlock }}
        </text>
        <text
          :x="wedgeTip.x + 8"
          :y="wedgeTip.y + 4"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="21"
          fill="var(--c-velocity)"
        >
          {{ labelWedge }}
        </text>
      </g>
      <!-- 位移三角形：Δy = Δx·tanθ -->
      <g v-if="showTriangle">
        <polygon
          :points="`${triP0.x},${triP0.y} ${triP1.x},${triP1.y} ${triP2.x},${triP2.y}`"
          fill="color-mix(in srgb, var(--c-accent) 10%, transparent)"
          stroke="none"
        />
        <polygon
          :points="`${triP0.x},${triP0.y} ${triP1.x},${triP1.y} ${triP2.x},${triP2.y}`"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="2.4"
        />
        <path :d="triRight" fill="none" stroke="var(--c-accent)" stroke-width="1.8" />
        <text
          :x="(triP0.x + triP1.x) / 2"
          :y="triP0.y + 24"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="var(--c-accent)"
        >
          Δx
        </text>
        <text
          :x="triP2.x + 10"
          :y="(triP1.y + triP2.y) / 2 + 6"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="var(--c-accent)"
        >
          Δy
        </text>
        <text
          :x="triP0.x + 46"
          :y="triP0.y - 12"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
          fill="var(--c-accent)"
        >
          θ
        </text>
        <text
          :x="triP0.x"
          :y="triP0.y + 54"
          font-family="KaTeX_Main"
          font-size="17"
          fill="var(--c-text-dim)"
        >
          Δy = Δx·tanθ
        </text>
      </g>
    </svg>
    <div v-if="showPanel" class="sim-panel">
      <CourseSlider
        v-model="theta"
        :min="25"
        :max="60"
        label="斜面倾角"
        label-width="7.5rem"
      />
    </div>
  </div>
</template>

<style scoped>
.sim-panel {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
</style>
