<script setup lang="ts">
/**
 * 多用电表表盘（J0411 型）—— 移植自
 * physics-modal（~/projects/physics-modal/src/views/multimeter/components/MultimeterDial.vue），
 * 按本仓口径改写：SVG 文字一律用 font-size / font-family **表现属性**（common.css 对 `svg [font-size]` 有
 * `attr(font-size px, 16px) !important` 钉桩，属性写法才生效，UnoCSS 文字类压不过它），不依赖 stone 调色板。
 *
 * 刻度几何（真实规则，非手画）：
 *
 * - 欧姆刻度：不均匀、左 ∞ 右 0，刻度值 n 的位置 = R_中/(R_中+n)（R_中 = 15 Ω）；
 * - 直流刻度：量程 250 / 50 / 10 三排数字共用一条弧，均匀 50 小格；
 * - 交流刻度：第三排专用 10 V~ 刻度。 指针偏转 0（最左，欧姆 ∞）~ 1（最右，欧姆 0 / 满偏）。
 */
import { computed } from "vue";

import { GEARS, ohmPositionOf } from "./multimeter-model";

const {
  deflection,
  gearId = "off",
  viewBox = "0 0 700 450",
  screwOn = false,
} = defineProps<{
  /** 指针偏转：0 = 最左（欧姆 ∞），1 = 最右（欧姆 0 / 满偏） */
  deflection: number;
  /** 挡位 id，如 "ohm_100" / "dcv_10"（默认 OFF） */
  gearId?: string;
  /** 裁剪 viewBox，便于按版面取用（默认整表盘） */
  viewBox?: string;
  /** 高亮机械调零螺丝（"认识多用电表"那页用） */
  screwOn?: boolean;
}>();

const gear = computed(() => GEARS.find((g) => g.id === gearId) ?? GEARS[0]);

// 同一页可能放两个表盘，滤镜 id 必须唯一
const uid = `md${Math.round(Math.random() * 1e8).toString(36)}`;

const CENTER_X = 350;
const CENTER_Y = 336;
const START_ANGLE = -45;
const END_ANGLE = 45;
const SWEEP = END_ANGLE - START_ANGLE;

const needleAngle = computed(() => START_ANGLE + Math.max(0, Math.min(1, deflection)) * SWEEP);

const polarToCartesian = (radius: number, angleDeg: number): { x: number; y: number } => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER_X + radius * Math.sin(rad), y: CENTER_Y - radius * Math.cos(rad) };
};

const describeArc = (radius: number, startAngle: number, endAngle: number): string => {
  const start = polarToCartesian(radius, startAngle);
  const end = polarToCartesian(radius, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
};

/** 表盘文字统一走表现属性：量/数字用 KaTeX_Main，字号不带单位（16px 体系） */
const t = (size: number, fill: string, weight = "400"): Record<string, string | number> => ({
  "font-size": size,
  "font-family": "KaTeX_Main, serif",
  "font-weight": weight,
  fill,
});

// ── 1. 欧姆刻度（最上一排，红、非线性、左 ∞ 右 0）──
const OHM_RADIUS = 282;
const ohmMajorTicks = [
  { label: "0", position: ohmPositionOf(0) },
  { label: "5", position: ohmPositionOf(5) },
  { label: "10", position: ohmPositionOf(10) },
  { label: "15", position: ohmPositionOf(15), isMid: true },
  { label: "20", position: ohmPositionOf(20) },
  { label: "30", position: ohmPositionOf(30) },
  { label: "40", position: ohmPositionOf(40) },
  { label: "50", position: ohmPositionOf(50) },
  { label: "100", position: ohmPositionOf(100) },
  { label: "200", position: ohmPositionOf(200) },
  { label: "500", position: ohmPositionOf(500) },
  { label: "1k", position: ohmPositionOf(1000) },
  { label: "∞", position: 0 },
];
const ohmMinorTicks = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 25, 35, 45, 60,
  70, 80, 90, 150, 300, 400,
].map((resistance) => ({
  position: ohmPositionOf(resistance),
  long: Number.isInteger(resistance) && resistance >= 1 && resistance <= 4,
}));

// ── 2. 直流刻度（0~250 / 0~50 / 0~10 三排数字共用一条弧，50 小格）──
const LINEAR_RADIUS = 234;
const linTicks = Array.from({ length: 51 }, (_, division) => ({
  index: division,
  angle: START_ANGLE + (division / 50) * SWEEP,
  isMajor: division % 10 === 0,
  isMedium: division % 5 === 0 && division % 10 !== 0,
  val250: division * 5,
  val50: division,
  val10: (division / 5).toFixed(1),
}));

// ── 3. 交流 10 V~ 专用刻度（第三排）──
const AC_RADIUS = 188;
const acTicks = Array.from({ length: 26 }, (_, division) => ({
  index: division,
  angle: START_ANGLE + (division / 25) * SWEEP,
  isMajor: division % 5 === 0,
}));
const acMajorLabels = ["0", "0.5", "1", "1.5", "2", "2.5"].map((value, i) => ({
  value,
  angle: START_ANGLE + (i / 5) * SWEEP,
}));

/** 当前挡位该读哪一排刻度线 */
const activeScale = computed(() => {
  if (gear.value.category === "ohm") return "ohm";
  if (gear.value.id === "acv_10") return "ac";
  if (gear.value.category === "off") return "none";
  return "linear";
});

const ohmOpacity = computed(() => (activeScale.value === "ohm" ? 1 : 0.7));
const linOpacity = computed(() => (activeScale.value === "linear" ? 1 : 0.7));
const acOpacity = computed(() => (activeScale.value === "ac" ? 1 : 0.7));
</script>

<template>
  <div class="mt-dial">
    <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg" class="mt-dial-svg">
      <defs>
        <filter :id="`${uid}-glow`" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
          <feOffset dx="1" dy="1.5" result="ob" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        x="12"
        y="10"
        width="676"
        height="430"
        rx="10"
        fill="#faf9f5"
        stroke="#d5d3cb"
        stroke-width="1.5"
      />
      <g transform="translate(48, 40)">
        <path
          d="M 0 16 Q 14 -4 28 16 Q 14 10 0 16 Z"
          fill="none"
          stroke="#262626"
          stroke-width="1.8"
        />
        <path d="M 14 0 L 14 16" stroke="#262626" stroke-width="1.5" />
        <text x="34" y="9" v-bind="t(13, '#292524', '700')">航 舟</text>
        <text x="34" y="21" v-bind="t(10, '#57534e')">®</text>
      </g>
      <g transform="translate(560, 36)">
        <polygon points="65,10 80,0 95,10 80,20" fill="none" stroke="#262626" stroke-width="1.4" />
        <text x="80" y="14" text-anchor="middle" v-bind="t(10, '#292524', '700')">JY</text>
        <path
          d="M 0 14 L 0 4 Q 7 -2 14 4 L 14 14 Z"
          fill="none"
          stroke="#262626"
          stroke-width="1.2"
        />
        <circle cx="7" cy="8" r="3" fill="none" stroke="#262626" stroke-width="1" />
        <text x="26" y="14" v-bind="t(11, '#44403c')">2.5</text>
        <text x="44" y="14" v-bind="t(11, '#44403c')">5.0</text>
      </g>
      <text x="350" y="258" text-anchor="middle" v-bind="t(19, '#1c1917', '900')">A - V - Ω</text>
      <text x="350" y="278" text-anchor="middle" v-bind="t(12, '#44403c', '700')">杭州电表厂</text>
      <g transform="translate(38, 332)">
        <text x="2" y="0" v-bind="t(10, '#78716c', '600')">XK32-059 9202</text>
        <rect
          x="0"
          y="6"
          width="144"
          height="54"
          rx="6"
          fill="#ffffff"
          stroke="#64748b"
          stroke-width="1.5"
        />
        <text x="12" y="28" v-bind="t(14, '#0c0a09', '900')">5000 Ω/V ―</text>
        <text x="12" y="50" v-bind="t(14, '#0c0a09', '900')">2500 Ω/V ～</text>
      </g>
      <g transform="translate(534, 332)">
        <text x="2" y="0" v-bind="t(10, '#78716c', '600')">JY213-87</text>
        <rect
          x="0"
          y="6"
          width="128"
          height="54"
          rx="6"
          fill="#ffffff"
          stroke="#64748b"
          stroke-width="1.5"
        />
        <text x="64" y="28" text-anchor="middle" v-bind="t(13, '#0c0a09', '900')">MODEL J0411</text>
        <text x="64" y="49" text-anchor="middle" v-bind="t(11, '#57534e', '700')">No. 9520162</text>
      </g>
      <g :opacity="ohmOpacity">
        <path
          :d="describeArc(OHM_RADIUS, START_ANGLE - 1, END_ANGLE + 1)"
          fill="none"
          stroke="#c81e1e"
          :stroke-width="activeScale === 'ohm' ? 2.4 : 1.8"
        />
        <text
          :x="polarToCartesian(OHM_RADIUS - 6, END_ANGLE + 5).x"
          :y="polarToCartesian(OHM_RADIUS - 6, END_ANGLE + 5).y"
          v-bind="t(16, '#b91c1c', '700')"
        >
          Ω
        </text>
        <line
          v-for="(tick, idx) in ohmMinorTicks"
          :key="`os${idx}`"
          :x1="polarToCartesian(OHM_RADIUS, START_ANGLE + tick.position * SWEEP).x"
          :y1="polarToCartesian(OHM_RADIUS, START_ANGLE + tick.position * SWEEP).y"
          :x2="
            polarToCartesian(OHM_RADIUS + (tick.long ? 9 : 5), START_ANGLE + tick.position * SWEEP)
              .x
          "
          :y2="
            polarToCartesian(OHM_RADIUS + (tick.long ? 9 : 5), START_ANGLE + tick.position * SWEEP)
              .y
          "
          stroke="#dc2626"
          :stroke-width="tick.long ? 1.4 : 1"
        />
        <template v-for="tick in ohmMajorTicks" :key="`om${tick.label}`">
          <line
            :x1="polarToCartesian(OHM_RADIUS, START_ANGLE + tick.position * SWEEP).x"
            :y1="polarToCartesian(OHM_RADIUS, START_ANGLE + tick.position * SWEEP).y"
            :x2="
              polarToCartesian(
                OHM_RADIUS + (tick.isMid ? 12 : 10),
                START_ANGLE + tick.position * SWEEP,
              ).x
            "
            :y2="
              polarToCartesian(
                OHM_RADIUS + (tick.isMid ? 12 : 10),
                START_ANGLE + tick.position * SWEEP,
              ).y
            "
            stroke="#b91c1c"
            :stroke-width="tick.isMid ? 2.4 : 1.5"
          />
          <text
            :x="polarToCartesian(OHM_RADIUS + 23, START_ANGLE + tick.position * SWEEP).x"
            :y="polarToCartesian(OHM_RADIUS + 23, START_ANGLE + tick.position * SWEEP).y"
            text-anchor="middle"
            dominant-baseline="central"
            v-bind="
              t(
                tick.isMid ? 14 : 12.5,
                tick.isMid ? '#991b1b' : '#b91c1c',
                tick.isMid ? '700' : '600',
              )
            "
          >
            {{ tick.label }}
          </text>
        </template>
      </g>
      <g :opacity="linOpacity">
        <path
          :d="describeArc(LINEAR_RADIUS, START_ANGLE - 1, END_ANGLE + 1)"
          fill="none"
          stroke="#1c1917"
          :stroke-width="activeScale === 'linear' ? 2.2 : 1.5"
        />
        <text
          :x="polarToCartesian(LINEAR_RADIUS - 10, END_ANGLE + 5).x"
          :y="polarToCartesian(LINEAR_RADIUS - 10, END_ANGLE + 5).y"
          v-bind="t(14, '#1c1917', '700')"
        >
          mA·V
        </text>
        <text
          :x="polarToCartesian(LINEAR_RADIUS - 20, START_ANGLE).x"
          :y="polarToCartesian(LINEAR_RADIUS - 20, START_ANGLE).y"
          text-anchor="middle"
          dominant-baseline="central"
          v-bind="t(12, '#292524', '700')"
        >
          0
        </text>
        <template v-for="tick in linTicks" :key="`lt${tick.index}`">
          <line
            :x1="polarToCartesian(LINEAR_RADIUS, tick.angle).x"
            :y1="polarToCartesian(LINEAR_RADIUS, tick.angle).y"
            :x2="
              polarToCartesian(
                LINEAR_RADIUS - (tick.isMajor ? 11 : tick.isMedium ? 7 : 4),
                tick.angle,
              ).x
            "
            :y2="
              polarToCartesian(
                LINEAR_RADIUS - (tick.isMajor ? 11 : tick.isMedium ? 7 : 4),
                tick.angle,
              ).y
            "
            stroke="#1c1917"
            :stroke-width="tick.isMajor ? 1.6 : tick.isMedium ? 1.1 : 0.8"
          />
          <template v-if="tick.isMajor && tick.index > 0">
            <text
              :x="polarToCartesian(LINEAR_RADIUS - 20, tick.angle).x"
              :y="polarToCartesian(LINEAR_RADIUS - 20, tick.angle).y"
              text-anchor="middle"
              dominant-baseline="central"
              v-bind="
                t(
                  12,
                  gear.scaleType === 'linear_250' ? '#0369a1' : '#57534e',
                  gear.scaleType === 'linear_250' ? '700' : '400',
                )
              "
            >
              {{ tick.val250 }}
            </text>
            <text
              :x="polarToCartesian(LINEAR_RADIUS - 32, tick.angle).x"
              :y="polarToCartesian(LINEAR_RADIUS - 32, tick.angle).y"
              text-anchor="middle"
              dominant-baseline="central"
              v-bind="
                t(
                  11,
                  gear.scaleType === 'linear_50' ? '#0369a1' : '#57534e',
                  gear.scaleType === 'linear_50' ? '700' : '400',
                )
              "
            >
              {{ tick.val50 }}
            </text>
            <text
              :x="polarToCartesian(LINEAR_RADIUS - 44, tick.angle).x"
              :y="polarToCartesian(LINEAR_RADIUS - 44, tick.angle).y"
              text-anchor="middle"
              dominant-baseline="central"
              v-bind="
                t(
                  11,
                  gear.scaleType === 'linear_10' ? '#0369a1' : '#57534e',
                  gear.scaleType === 'linear_10' ? '700' : '400',
                )
              "
            >
              {{ tick.val10 }}
            </text>
          </template>
        </template>
      </g>
      <g :opacity="acOpacity">
        <path
          :d="describeArc(AC_RADIUS, START_ANGLE - 1, END_ANGLE + 1)"
          fill="none"
          stroke="#1e293b"
          :stroke-width="activeScale === 'ac' ? 2 : 1.3"
        />
        <g
          :transform="`translate(${(polarToCartesian(AC_RADIUS + 6, START_ANGLE - 4).x - 46).toFixed(1)}, ${(polarToCartesian(AC_RADIUS + 6, START_ANGLE - 4).y - 8).toFixed(1)})`"
        >
          <path d="M 0 6 Q 6 0 12 6 T 24 6" fill="none" stroke="#1e293b" stroke-width="1.2" />
          <text x="28" y="9" v-bind="t(12, '#292524', '700')">2.5V ~</text>
        </g>
        <line
          v-for="tick in acTicks"
          :key="`ac${tick.index}`"
          :x1="polarToCartesian(AC_RADIUS, tick.angle).x"
          :y1="polarToCartesian(AC_RADIUS, tick.angle).y"
          :x2="polarToCartesian(AC_RADIUS - (tick.isMajor ? 8 : 4), tick.angle).x"
          :y2="polarToCartesian(AC_RADIUS - (tick.isMajor ? 8 : 4), tick.angle).y"
          stroke="#334155"
          :stroke-width="tick.isMajor ? 1.5 : 0.8"
        />
        <text
          v-for="label in acMajorLabels"
          :key="`acl${label.value}`"
          :x="polarToCartesian(AC_RADIUS - 17, label.angle).x"
          :y="polarToCartesian(AC_RADIUS - 17, label.angle).y"
          text-anchor="middle"
          dominant-baseline="central"
          v-bind="
            t(
              11,
              activeScale === 'ac' ? '#be123c' : '#57534e',
              activeScale === 'ac' ? '700' : '600',
            )
          "
        >
          {{ label.value }}
        </text>
      </g>
      <g>
        <circle
          cx="350"
          cy="386"
          r="18"
          :fill="screwOn ? '#fde68a' : '#e2e8f0'"
          :stroke="screwOn ? '#e2a846' : '#475569'"
          :stroke-width="screwOn ? 3 : 1.8"
        />
        <circle cx="350" cy="386" r="14" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2" />
        <circle cx="350" cy="386" r="10" fill="#e2e8f0" />
        <line
          x1="339"
          y1="386"
          x2="361"
          y2="386"
          :stroke="screwOn ? '#b45309' : '#0f172a'"
          stroke-width="3"
          stroke-linecap="round"
        />
        <text
          x="350"
          y="422"
          text-anchor="middle"
          v-bind="t(12, screwOn ? '#b45309' : '#78716c', screwOn ? '700' : '400')"
        >
          机械调零（指针定位螺丝）
        </text>
      </g>
      <g
        :transform="`rotate(${needleAngle.toFixed(2)} ${CENTER_X} ${CENTER_Y})`"
        :filter="`url(#${uid}-glow)`"
      >
        <path d="M 346.5 336 L 347.5 352 Q 350 355 352.5 352 L 353.5 336 Z" fill="#262626" />
        <polygon points="348.8,336 349.6,56 350,36 350.4,56 351.2,336" fill="#dc2626" />
        <circle cx="350" cy="336" r="12" fill="#262626" stroke="#525252" stroke-width="1.5" />
        <circle cx="350" cy="336" r="5" fill="#dc2626" />
        <circle cx="350" cy="336" r="2" fill="#ffffff" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.mt-dial {
  width: 100%;
  min-width: 0;
}
.mt-dial-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
