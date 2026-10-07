<script setup lang="ts">
import { computed } from "vue";

/**
 * 通用刻度尺：既可以是"精确刻度尺"（毫米/厘米刻度、可选显示数值），也可以是"示意图尺子"（只画个尺子形状）。 竖着量弹簧伸长、横着量线段长度都支持；可以直接放在其它 SVG 里（给 x / y
 * / width / height），也可以单独当 HTML 元素用。
 */

const {
  length = 200,
  showNumbers = true,
  showMillimeter = false,
  unit = "cm",
  orientation = "vertical",
  schematic = false,
  color = "#cbd5e1",
  thickness = 26,
  x = 0,
  y = 0,
  width = 0,
  height = 0,
} = defineProps<{
  /** 量程，单位 mm（如 200 表示 20 cm） */
  length?: number;
  /** 每 10 mm 标一个数值 */
  showNumbers?: boolean;
  /** 是否画 1 mm 细刻度 */
  showMillimeter?: boolean;
  /** 数值单位 */
  unit?: "cm" | "mm";
  /** 朝向 */
  orientation?: "vertical" | "horizontal";
  /** 示意图模式：只画尺子形状与稀疏刻度、不标数值（分辨不出精确读数） */
  schematic?: boolean;
  /** 刻度与文字颜色 */
  color?: string;
  /** 尺身厚度（画布用户单位） */
  thickness?: number;
  /** 放在父级 SVG 里的位置（用户单位） */
  x?: number;
  y?: number;
  /** 画出来的宽高（用户单位）——单独用时若不传则默认使用 viewBox 宽高 */
  width?: number;
  height?: number;
}>();

/** 每毫米对应多少画布用户单位（整把尺子按此比例画，再靠 width / height 缩放） */
const PX_PER_MM = 1.5;
/** 描边宽度的一半，避免尺身两端描边被 viewBox 裁切 */
const STROKE_WIDTH = 1.2;
const STROKE_HALF = STROKE_WIDTH / 2;

/** 尺身在厚度方向上的外边距偏移（对应 rect 的 10% 缩进，刻度必须从此边缘起画才不会溢出尺外） */
const edgeInset = computed(() => thickness * 0.1);
/** 尺身在厚度方向上的实际宽度（80% thickness） */
const bodyThickness = computed(() => thickness * 0.8);

/** 细刻度线基准长度：随尺身厚度自适应缩放，防止窄尺身或示意图模式下刻度刺穿尺身另一侧 */
const minorTick = computed(() =>
  schematic || !showNumbers ? bodyThickness.value * 0.24 : bodyThickness.value * 0.2,
);

/** 数字字号随尺身厚度缩放（尺子缩小后仍然看得清） */
const fontSize = computed(() => thickness * 0.38);

/** 尺身两端各留出的无刻度余量：真实刻度尺的尺身总比量程长，这样 0 与最大刻度都落在尺身内部，不会正好压在尺身端点上。 */
const endMargin = computed(() => Math.max(8, thickness * 0.6));

const isVertical = computed(() => orientation === "vertical");
/** 尺身内容长度 */
const span = computed(() => length * PX_PER_MM);
/** ViewBox 尺寸：尺身 = 量程 + 两端无刻度余量 */
const view = computed(() => {
  const total = span.value + endMargin.value * 2;

  return isVertical.value
    ? { width: thickness, height: total }
    : { width: total, height: thickness };
});

/** 刻度线：细刻度每 1 mm（示意图模式只留 10 mm），中刻度每 5 mm，长刻度每 10 mm */
const ticks = computed(() => {
  const marks: { pos: number; len: number; major: boolean }[] = [];
  const step = schematic ? 10 : showMillimeter ? 1 : 5;

  for (let value = 0; value <= length; value += step) {
    const major = value % 10 === 0;
    const mid = value % 5 === 0;

    marks.push({
      pos: endMargin.value + value * PX_PER_MM,
      len: major ? minorTick.value * 2 : mid ? minorTick.value * 1.5 : minorTick.value,
      major,
    });
  }

  return marks;
});

/** 数值标签（厘米或毫米） */
const labels = computed(() => {
  if (!showNumbers || schematic) return [];

  return ticks.value
    .filter((tick) => tick.major)
    .map((tick) => {
      const value = (tick.pos - endMargin.value) / PX_PER_MM;

      return {
        pos: tick.pos,
        text: unit === "cm" ? (value / 10).toFixed(0) : String(Math.round(value)),
      };
    });
});

/**
 * 刻度线的两个端点（从尺身边缘 edgeInset 向尺身内部画，彻底消除向尺外溢出的问题）
 *
 * @param pos 刻度位置（沿尺身方向的用户单位）
 * @param len 刻度线长度
 * @returns 线段两端点坐标
 */
const tickLine = (pos: number, len: number): { x1: number; y1: number; x2: number; y2: number } => {
  const start = edgeInset.value;
  const end = start + len;
  return isVertical.value
    ? { x1: start, y1: pos, x2: end, y2: pos }
    : { x1: pos, y1: start, x2: pos, y2: end };
};

/**
 * 数值文字的位置（位于长刻度终点与尺身背侧边缘之间的居中区域）
 *
 * @param pos 刻度位置（沿尺身方向的用户单位）
 * @returns 文字锚点坐标
 */
const labelPos = (pos: number): { x: number; y: number } =>
  isVertical.value
    ? { x: thickness * 0.66, y: pos + fontSize.value * 0.35 }
    : { x: pos, y: thickness * 0.76 };
</script>

<template>
  <svg
    :x="x"
    :y="y"
    :width="width || view.width"
    :height="height || view.height"
    :viewBox="`0 0 ${view.width} ${view.height}`"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="schematic ? '刻度尺示意图' : `刻度尺，量程 ${length} 毫米`"
  >
    <rect
      :x="isVertical ? edgeInset : STROKE_HALF"
      :y="isVertical ? STROKE_HALF : edgeInset"
      :width="isVertical ? bodyThickness : view.width - STROKE_WIDTH"
      :height="isVertical ? view.height - STROKE_WIDTH : bodyThickness"
      :rx="thickness * 0.12"
      fill="rgba(148,163,184,0.18)"
      :stroke="color"
      :stroke-width="STROKE_WIDTH"
    />
    <g :stroke="color" stroke-width="1" stroke-linecap="butt">
      <line
        v-for="(tick, index) in ticks"
        :key="`t${index}`"
        v-bind="tickLine(tick.pos, tick.len)"
      />
    </g>
    <g
      v-if="showNumbers && !schematic"
      :fill="color"
      :font-size="fontSize"
      font-family="KaTeX_Main, 'JetBrains Mono', sans-serif"
      text-anchor="middle"
    >
      <text
        v-for="(label, index) in labels"
        :key="`l${index}`"
        :x="labelPos(label.pos).x"
        :y="labelPos(label.pos).y"
      >
        {{ label.text }}
      </text>
    </g>
  </svg>
</template>
