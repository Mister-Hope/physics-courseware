<script setup lang="ts">
// “第几秒内 / 前几秒 / 第几秒初末”辨析用的时间轴（第 5、6 页共用）
//
// segments 模式（第 5 页）：竖直虚线从刻度向上 / 向下延伸；区间用“中间断开、文字补在断口里的彩色双向箭头”表示
//   —— 第 1 s 内（0–1）、第 2 s 内（1–2）在轴上方，前 2 s（0–2）在轴下方，区间有多长箭头就张多开；
// moments 模式（第 6 页）：竖直箭头分别从上方、下方对准轴上的整秒时刻（尖端落在时刻点上）；
//   上一秒的初末在一侧（第 1 s 初 / 第 1 s 末、第 3 s 初 / 第 3 s 末在上），第 2 s 初 / 第 2 s 末在下，
//   轴下方的箭杆让开刻度数字（在数字处断开）。
import { computed } from "vue";

/** 标注里的文字片段：中文走系统字体，数值与单位走 KaTeX 字体 */
interface Part {
  text: string;
  math?: boolean;
}

interface SegmentItem {
  from: number;
  to: number;
  side: "above" | "below";
  /** 箭头所在行相对轴线的偏移（屏幕 px） */
  offset: number;
  color: string;
  parts: Part[];
}

interface MomentItem {
  value: number;
  side: "above" | "below";
  color: string;
  parts: Part[];
}

/** `NumberAxis` 的 `#overlay` 插槽给出来的坐标换算 */
interface SlotGeom {
  x: (value: number) => number;
  axisY: number;
  px2user: number;
}

/** 标注字号（屏幕 px） */
const LABEL_SIZE = 15;
/** 箭头线宽与箭头三角形长度（屏幕 px） */
const ARROW_WIDTH = 2.2;
const HEAD_SIZE = 12;
/** 断口里文字两侧的留白 / 断口以外每侧箭头的最短长度（屏幕 px） */
const GAP_PAD = 12;
const ARM_MIN = 16;

/** 第 5 页：上下两行箭头的位置（相对轴线，屏幕 px）；虚线略长于箭头，像尺寸线的界线一样“对齐刻度” */
const SEGMENT_UP_ROW = 74;
const SEGMENT_UP_GUIDE = 96;
const SEGMENT_DOWN_ROW = 60;
/** 向下的虚线从刻度数字下方起笔，免得从数字中间穿过去 */
const SEGMENT_DOWN_GUIDE_FROM = 38;
const SEGMENT_DOWN_GUIDE_TO = 68;

/** 第 6 页：箭头尾端离轴线的距离、标注离尾端的距离（屏幕 px） */
const MOMENT_ARM = 74;
const MOMENT_LABEL_GAP = 8;
/** 轴下方的箭杆让开刻度数字：数字大约占轴线下方 14–25 px，箭杆在数字上下各断开一点 */
const MOMENT_BREAK_TOP = 14;
const MOMENT_BREAK_BOTTOM = 29;

/** ViewBox 只决定比例（渲染高 ≈ 容器宽 × 高 ÷ 宽）；第 6 页轴下方要放箭头，图高一些 */
const VIEW = { width: 640, height: 148 };
const MOMENT_VIEW = { width: 640, height: 160 };

const SEGMENTS: SegmentItem[] = [
  {
    from: 0,
    to: 1,
    side: "above",
    offset: SEGMENT_UP_ROW,
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "1 s", math: true }, { text: " 内" }],
  },
  {
    from: 1,
    to: 2,
    side: "above",
    offset: SEGMENT_UP_ROW,
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "2 s", math: true }, { text: " 内" }],
  },
  {
    from: 0,
    to: 2,
    side: "below",
    offset: SEGMENT_DOWN_ROW,
    color: "var(--c-accent-2)",
    parts: [{ text: "前 " }, { text: "2 s", math: true }],
  },
];

// 同一秒的“初”和“末”放在同一侧：第 1 s 初末、第 3 s 初末在上，第 2 s 初末在下
const MOMENTS: MomentItem[] = [
  {
    value: 0,
    side: "above",
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "1 s", math: true }, { text: " 初" }],
  },
  {
    value: 1,
    side: "above",
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "1 s", math: true }, { text: " 末" }],
  },
  {
    value: 1,
    side: "below",
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "2 s", math: true }, { text: " 初" }],
  },
  {
    value: 2,
    side: "above",
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "3 s", math: true }, { text: " 初" }],
  },
  {
    value: 2,
    side: "below",
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "2 s", math: true }, { text: " 末" }],
  },
  {
    value: 3,
    side: "above",
    color: "var(--c-accent)",
    parts: [{ text: "第 " }, { text: "3 s", math: true }, { text: " 末" }],
  },
];

const props = defineProps<{ mode: "segments" | "moments" }>();

const isWide = (char: string): boolean => /[\u2E80-\u9FFF\uFF00-\uFFEF]/.test(char);

/** 估算一段标注占多宽（屏幕 px）：中文按 1 em、其余按 0.55 em */
const partsWidth = (parts: Part[]): number => {
  let em = 0;

  for (const part of parts) for (const char of part.text) em += isWide(char) ? 1 : 0.55;

  return em * LABEL_SIZE;
};

/** 第 5 页：每段区间一对箭头，两头的尖端落在刻度虚线上，中间断开、留出文字的位置 */
const buildSegments = ({ x, axisY, px2user }: SlotGeom) =>
  SEGMENTS.map((item) => {
    const y = axisY + (item.side === "above" ? -item.offset : item.offset) * px2user;
    const from = x(item.from);
    const to = x(item.to);
    const center = (from + to) / 2;
    const wanted = (partsWidth(item.parts) / 2 + GAP_PAD) * px2user;
    const limit = Math.max((to - from) / 2 - ARM_MIN * px2user, 3 * px2user);
    const half = Math.min(wanted, limit);

    return {
      key: `${item.side}-${item.from}-${item.to}`,
      color: item.color,
      parts: item.parts,
      text: { x: center, y },
      left: { from: { x: center - half, y }, to: { x: from, y } },
      right: { from: { x: center + half, y }, to: { x: to, y } },
    };
  });

/** 第 5 页：刻度处的竖直虚线（向上的三条；向下的两条只服务于轴下方的区间） */
const buildGuides = ({ x, axisY, px2user }: SlotGeom) => {
  const up = { y1: axisY - 5 * px2user, y2: axisY - SEGMENT_UP_GUIDE * px2user };
  const down = {
    y1: axisY + SEGMENT_DOWN_GUIDE_FROM * px2user,
    y2: axisY + SEGMENT_DOWN_GUIDE_TO * px2user,
  };

  return [
    ...SEGMENTS.filter((item) => item.side === "above").flatMap((item) => [
      { key: `up-${item.from}`, x: x(item.from), ...up },
      { key: `up-${item.to}`, x: x(item.to), ...up },
    ]),
    ...SEGMENTS.filter((item) => item.side === "below").flatMap((item) => [
      { key: `down-${item.from}`, x: x(item.from), ...down },
      { key: `down-${item.to}`, x: x(item.to), ...down },
    ]),
  ];
};

/** 第 6 页：每个时刻一条竖直箭头，尖端落在轴上的时刻点；标注写在箭头尾端 */
const buildMoments = ({ x, axisY, px2user }: SlotGeom) =>
  MOMENTS.map((item, index) => {
    const above = item.side === "above";
    const atStart = item.value === 0;
    const tipX = x(item.value);
    const tailY = axisY + (above ? -MOMENT_ARM : MOMENT_ARM) * px2user;

    return {
      key: `${item.value}-${item.side}-${index}`,
      color: item.color,
      parts: item.parts,
      arrow: {
        from: { x: tipX, y: above ? tailY : axisY + MOMENT_BREAK_TOP * px2user },
        to: { x: tipX, y: axisY },
      },
      // 轴下方的箭杆在刻度数字处断开，免得从数字上穿过去
      shaft: above
        ? null
        : {
            from: { x: tipX, y: axisY + MOMENT_BREAK_BOTTOM * px2user },
            to: { x: tipX, y: tailY },
          },
      text: {
        // 轴左端的时刻：标注贴着箭头向右排，免得越出画布
        x: tipX + (atStart ? 6 * px2user : 0),
        y: tailY + (above ? -MOMENT_LABEL_GAP : MOMENT_LABEL_GAP) * px2user,
        anchor: atStart ? "start" : "middle",
        baseline: above ? "auto" : "hanging",
      },
    };
  });

const view = computed(() => (props.mode === "segments" ? VIEW : MOMENT_VIEW));
</script>

<template>
  <NumberAxis
    :range="[0, 3.4]"
    :axis="{ quantity: 't', unit: 's' }"
    :ticks="{ step: 1 }"
    :view="view"
  >
    <template #overlay="{ x, axisY, px2user }">
      <!-- 第 5 页：竖直虚线 + 中间断裂的双向箭头 -->
      <template v-if="props.mode === 'segments'">
        <g
          stroke="var(--c-text-dim)"
          :stroke-width="1.6 * px2user"
          :stroke-dasharray="`${7 * px2user} ${5 * px2user}`"
          stroke-linecap="round"
          :opacity="0.55"
        >
          <line
            v-for="guide in buildGuides({ x, axisY, px2user })"
            :key="guide.key"
            :x1="guide.x"
            :y1="guide.y1"
            :x2="guide.x"
            :y2="guide.y2"
          />
        </g>

        <template v-for="item in buildSegments({ x, axisY, px2user })" :key="item.key">
          <CourseArrow
            :from="item.left.from"
            :to="item.left.to"
            :stroke="item.color"
            :stroke-width="ARROW_WIDTH * px2user"
            :head-size="HEAD_SIZE * px2user"
          />
          <CourseArrow
            :from="item.right.from"
            :to="item.right.to"
            :stroke="item.color"
            :stroke-width="ARROW_WIDTH * px2user"
            :head-size="HEAD_SIZE * px2user"
          />
          <text
            :x="item.text.x"
            :y="item.text.y"
            text-anchor="middle"
            dominant-baseline="central"
            :font-size="LABEL_SIZE * px2user"
            font-weight="700"
            :fill="item.color"
          >
            <tspan
              v-for="(part, index) in item.parts"
              :key="index"
              :font-family="part.math ? 'KaTeX_Main' : undefined"
            >
              {{ part.text }}
            </tspan>
          </text>
        </template>
      </template>

      <!-- 第 6 页：竖直箭头对准时刻点，一个时刻两种叫法就一上一下 -->
      <template v-else>
        <template v-for="item in buildMoments({ x, axisY, px2user })" :key="item.key">
          <line
            v-if="item.shaft"
            :x1="item.shaft.from.x"
            :y1="item.shaft.from.y"
            :x2="item.shaft.to.x"
            :y2="item.shaft.to.y"
            :stroke="item.color"
            :stroke-width="ARROW_WIDTH * px2user"
          />
          <CourseArrow
            :from="item.arrow.from"
            :to="item.arrow.to"
            :stroke="item.color"
            :stroke-width="ARROW_WIDTH * px2user"
            :head-size="HEAD_SIZE * px2user"
          />
          <text
            :x="item.text.x"
            :y="item.text.y"
            :text-anchor="item.text.anchor"
            :dominant-baseline="item.text.baseline"
            :font-size="LABEL_SIZE * px2user"
            font-weight="700"
            :fill="item.color"
          >
            <tspan
              v-for="(part, index) in item.parts"
              :key="index"
              :font-family="part.math ? 'KaTeX_Main' : undefined"
            >
              {{ part.text }}
            </tspan>
          </text>
        </template>
      </template>
    </template>
  </NumberAxis>
</template>
