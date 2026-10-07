<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 斜抛演示台：**拖动初速度箭头的末端**改变抛射角 θ，实时看到轨迹、射高与射程的变化。
 *
 * 真实公式（页面上的数值全部由它们算出）：
 *
 * - 飞行时间 T = 2v_0 sinθ / g
 * - 射程 X = v_0 cosθ · T = (2v_0²/g)·sinθcosθ（θ = 45° 时最大——这个结论要学生自己拖出来，图上不给参考轨迹）
 * - 射高 H = v_0² sin²θ / (2g)
 *
 * `showComplement` 打开时，同时画出**互补角 90°−θ** 的轨迹（虚线）并在读数区给出它的射程—— 用来讲"互补角射程相同"，所以这两个角度的 X 必然相等。
 *
 * 坐标轴交给共享 `CoordAxes`；轨迹用 `points` 直接给，避免采样到"落地之后"的部分。 初速度箭头、角弧与拖拽热区画在 `#overlay` 里（按 viewBox
 * 用户单位作图）： 拖拽点是一个**很透明的灰圆**、并且画在**箭头的层级之下**（完整的箭头必须露出来），
 * 接收指针事件的透明热区单独再画一层放在最上面。屏幕上不写任何"拖动××"的操作提示。
 */
const {
  v0 = 20,
  g = 10,
  initialAngle = 45,
  showComplement = false,
} = defineProps<{
  /** 初速度大小（m/s） */
  v0?: number;
  /** 重力加速度（m/s²） */
  g?: number;
  /** 初始抛射角（度） */
  initialAngle?: number;
  /** 是否同时画出互补角（90°−θ）的轨迹与射程 */
  showComplement?: boolean;
}>();

/** 箭头的屏幕长度（px 口径），拖拽时长度不变、只改方向 */
const ARROW_PX = 132;
const ANGLE_MIN = 10;
const ANGLE_MAX = 80;

const angle = ref(initialAngle);
const dragging = ref(false);
const origin = ref({ x: 0, y: 0 });
const svgEl = ref<SVGSVGElement | null>(null);

const rad = computed(() => (angle.value * Math.PI) / 180);
const complement = computed(() => 90 - angle.value);
const range = computed(() => (v0 * v0 * Math.sin(2 * rad.value)) / g);

const xRange = computed((): [number, number] => [0, ((v0 * v0) / g) * 1.08]);
const yRange = computed((): [number, number] => [0, ((v0 * v0) / (2 * g)) * 1.25]);

/**
 * 某抛射角下的整条轨迹（取到落地为止）
 *
 * @param deg 抛射角（度）
 * @returns 从抛出点到落地的轨迹采样点（用户单位）
 */
const path = (deg: number): { x: number; y: number }[] => {
  const r = (deg * Math.PI) / 180;
  const total = (2 * v0 * Math.sin(r)) / g;
  const count = 56;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= count; i++) {
    const t = (total * i) / count;
    points.push({ x: v0 * Math.cos(r) * t, y: v0 * Math.sin(r) * t - 0.5 * g * t * t });
  }
  return points;
};

const current = computed(() => path(angle.value));
/** 互补角的轨迹（仅当 showComplement 且两角不同时才有意义） */
const complementCurve = computed(() => path(complement.value));

const curves = computed(() => {
  const list: {
    points: { x: number; y: number }[];
    stroke: string;
    width: number;
    dashed?: boolean;
  }[] = [{ points: current.value, stroke: "var(--c-accent)", width: 3.4 }];
  if (showComplement && complement.value !== angle.value) {
    list.push({
      points: complementCurve.value,
      stroke: "var(--c-accent-2)",
      width: 2.4,
      dashed: true,
    });
  }

  return list;
});

const labels = computed(() => {
  const list = [
    {
      x: range.value,
      y: 0,
      tex: "X",
      anchor: "bottom-right" as const,
      color: "var(--c-accent)",
      dot: 6,
      halo: true,
      size: 19,
    },
  ];
  if (showComplement && complement.value !== angle.value) {
    list.push({
      x: range.value,
      y: 0,
      tex: `\\theta' = ${complement.value}^\\circ`,
      anchor: "top-right" as const,
      color: "var(--c-accent-2)",
      halo: true,
      size: 16,
    });
  }
  return list;
});

/**
 * 初速度箭头末端（用户单位）：长度固定、方向由 θ 决定
 *
 * @param mapX 把用户单位的 x 映射成 SVG 坐标
 * @param mapY 把用户单位的 y 映射成 SVG 坐标
 * @param px2user 屏幕 px 换算成用户单位的比例
 * @returns 箭头末端在 SVG 坐标系中的位置
 */
const arrowTip = (
  mapX: (value: number) => number,
  mapY: (value: number) => number,
  px2user: number,
): { x: number; y: number } => ({
  x: mapX(0) + ARROW_PX * px2user * Math.cos(rad.value),
  y: mapY(0) - ARROW_PX * px2user * Math.sin(rad.value),
});

// 位置化签名与 SVG 圆弧的参数顺序一一对应，拆成对象反而不好对照，故保留 6 个参数
/**
 * 角弧（用户单位；半径按屏幕 px 口径换算）
 *
 * @param cx 弧心 x（用户单位）
 * @param cy 弧心 y（用户单位）
 * @param rPx 弧半径（屏幕 px）
 * @param fromDeg 起始角（度）
 * @param toDeg 终止角（度）
 * @param px2user 屏幕 px 换算成用户单位的比例
 * @returns 角弧的 path 数据
 */
// eslint-disable-next-line max-params
const arcPath = (
  cx: number,
  cy: number,
  rPx: number,
  fromDeg: number,
  toDeg: number,
  px2user: number,
): string => {
  const r = rPx * px2user;
  const start = {
    x: cx + r * Math.cos((fromDeg * Math.PI) / 180),
    y: cy + r * Math.sin((fromDeg * Math.PI) / 180),
  };
  const end = {
    x: cx + r * Math.cos((toDeg * Math.PI) / 180),
    y: cy + r * Math.sin((toDeg * Math.PI) / 180),
  };
  return `M ${start.x} ${start.y} A ${r} ${r} 0 0 ${toDeg > fromDeg ? 1 : 0} ${end.x} ${end.y}`;
};

const onDown = (event: PointerEvent, ox: number, oy: number): void => {
  const handle = event.currentTarget as SVGCircleElement;
  svgEl.value = handle.ownerSVGElement;
  origin.value = { x: ox, y: oy };
  dragging.value = true;
  handle.setPointerCapture(event.pointerId);
};

const onMove = (event: PointerEvent): void => {
  if (!dragging.value || !svgEl.value) return;
  const ctm = svgEl.value.getScreenCTM();
  if (!ctm) return;
  const point = svgEl.value.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const local = point.matrixTransform(ctm.inverse());
  const dx = local.x - origin.value.x;
  const dy = local.y - origin.value.y;
  if (dx <= 0) return;
  const deg = (Math.atan2(-dy, dx) * 180) / Math.PI;
  angle.value = Math.min(ANGLE_MAX, Math.max(ANGLE_MIN, Math.round(deg)));
};

const onUp = (event: PointerEvent): void => {
  const handle = event.currentTarget as SVGCircleElement;
  dragging.value = false;
  if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
};

const fixed = (value: number, digits = 2): string => value.toFixed(digits);
</script>

<template>
  <div class="oblique">
    <CoordAxes
      :x-range="xRange"
      :y-range="yRange"
      :x-axis="{ quantity: 'x', unit: 'm' }"
      :y-axis="{ quantity: 'y', unit: 'm' }"
      :curves="curves"
      :labels="labels"
      :ticks="{ x: [], y: [], labels: false, arrows: false }"
      :view="{ width: 600, height: 300 }"
    >
      <template #overlay="{ x, y, px2user }">
        <line
          :x1="x(0)"
          :y1="y(0)"
          :x2="x(0) + 178 * px2user"
          :y2="y(0)"
          stroke="rgba(148,163,184,0.55)"
          stroke-width="1.5"
          stroke-dasharray="7 6"
        />
        <path
          :d="arcPath(x(0), y(0), 54, -angle, 0, px2user)"
          fill="none"
          stroke="#60a5fa"
          stroke-width="2"
        />
        <circle
          :cx="arrowTip(x, y, px2user).x"
          :cy="arrowTip(x, y, px2user).y"
          :r="17 * px2user"
          fill="rgba(148,163,184,0.18)"
        />
        <CourseArrow
          :from="{ x: x(0), y: y(0) }"
          :to="arrowTip(x, y, px2user)"
          stroke="#e2a846"
          :stroke-width="3.6"
        />
        <text
          :x="x(0) + 74 * px2user"
          :y="y(0) - 22 * px2user"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#93c5fd"
          >θ</text
        >
        <text
          :x="arrowTip(x, y, px2user).x - 20 * px2user"
          :y="arrowTip(x, y, px2user).y - 10 * px2user"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#e2a846"
          >v<tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="4"
            >0</tspan
          ></text
        >
        <circle :cx="x(0)" :cy="y(0)" r="5.5" fill="#e2e8f0" />
        <circle
          class="oblique-handle"
          :cx="arrowTip(x, y, px2user).x"
          :cy="arrowTip(x, y, px2user).y"
          :r="22 * px2user"
          fill="transparent"
          @pointerdown.prevent="onDown($event, x(0), y(0))"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointercancel="onUp"
        />
      </template>
    </CoordAxes>

    <div class="oblique-readout">
      <span><Latex tex="v_0" /> = {{ v0 }} <Latex tex="\text{m/s}" /></span>
      <span><Latex tex="\theta" /> = {{ angle }}°</span>
      <span><Latex tex="X" /> = {{ fixed(range) }} <Latex tex="\text{m}" /></span>
      <span :class="{ 'oblique-hidden': !showComplement || complement === angle }">
        <Latex :tex="`\\theta' = ${complement}^\\circ`" />：{{ fixed(range) }}
        <Latex tex="\text{m}" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.oblique {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
}

.oblique-handle {
  cursor: grab;
  touch-action: none;
}

.oblique-handle:active {
  cursor: grabbing;
}

.oblique-hidden {
  visibility: hidden;
}

.oblique-readout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem 1rem;

  font-size: 0.88rem;
  font-variant-numeric: tabular-nums;
}
</style>
