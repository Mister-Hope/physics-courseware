<script setup lang="ts">
/**
 * 多用电表选择开关面板 —— 移植自
 * physics-modal（~/projects/physics-modal/src/views/multimeter/components/GearSelector.vue）。
 * 按本仓口径改写：SVG 文字用 font-size / font-family 表现属性，不依赖 UnoCSS 工具类与 stone 调色板。
 *
 * 面板上同时画出了"认识多用电表"要指认的三处：
 *
 * - 中间的大旋钮 = 选择开关（功能 + 量程，18 个挡位）；
 * - 右上 0Ω ADJ = 欧姆调零旋钮（每次换欧姆挡倍率都要重调）；
 * - 右下 +/− 插孔 = 红黑表笔插入处。 `highlight` 用来分步聚光这三处。
 */
import { computed } from "vue";

import type { Gear } from "./multimeter-model";
import { GEARS } from "./multimeter-model";

const {
  gearId = "off",
  highlight = null,
  clickable = true,
} = defineProps<{
  /** 挡位 id，如 "ohm_100" / "dcv_10"（默认 OFF） */
  gearId?: string;
  /** 分步聚光：选择开关 / 欧姆调零旋钮 / 红黑插孔 */
  highlight?: "knob" | "ohmAdj" | "terminals" | null;
  /** 药丸是否可点（认识表那页设为 false，免得误改挡位） */
  clickable?: boolean;
}>();

const emit = defineEmits<{ (e: "update:gear", gear: Gear): void }>();

const gear = computed(() => GEARS.find((g) => g.id === gearId) ?? GEARS[0]);

/** 同一页可能放两个面板，渐变 id 必须唯一 */
const uid = `gs${Math.round(Math.random() * 1e8).toString(36)}`;

const CENTER_X = 270;
const CENTER_Y = 200;

const polar = (radius: number, angleDeg: number): { x: number; y: number } => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER_X + radius * Math.sin(rad), y: CENTER_Y - radius * Math.cos(rad) };
};

const describeArc = (radius: number, startAngle: number, endAngle: number): string => {
  const start = polar(radius, startAngle);
  const end = polar(radius, endAngle);
  const diff = (endAngle - startAngle + 360) % 360;
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${radius} ${radius} 0 ${diff > 180 ? 1 : 0} 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
};

const describeSectorBand = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const iS = polar(innerRadius, startAngle);
  const oS = polar(outerRadius, startAngle);
  const oE = polar(outerRadius, endAngle);
  const iE = polar(innerRadius, endAngle);
  const diff = (endAngle - startAngle + 360) % 360;
  const la = diff > 180 ? 1 : 0;
  return `M ${iS.x.toFixed(1)} ${iS.y.toFixed(1)} L ${oS.x.toFixed(1)} ${oS.y.toFixed(1)} A ${outerRadius} ${outerRadius} 0 ${la} 1 ${oE.x.toFixed(1)} ${oE.y.toFixed(1)} L ${iE.x.toFixed(1)} ${iE.y.toFixed(1)} A ${innerRadius} ${innerRadius} 0 ${la} 0 ${iS.x.toFixed(1)} ${iS.y.toFixed(1)} Z`;
};

const INNER_RADIUS = 92;
const OUTER_RADIUS = 148;
const ARC_RADIUS = 152;

interface Sector {
  key: string;
  band: string;
  arc: string;
  color: string;
  fill: string;
}
const sectors: Sector[] = (
  [
    { key: "ohm", from: 322, to: 38, color: "#dc2626", fill: "#fee2e2" },
    { key: "acv", from: 42, to: 138, color: "#2563eb", fill: "#dbeafe" },
    { key: "dcv", from: 142, to: 238, color: "#059669", fill: "#d1fae5" },
    { key: "dcma", from: 242, to: 298, color: "#d97706", fill: "#fef3c7" },
    { key: "off", from: 302, to: 318, color: "#475569", fill: "#e2e8f0" },
  ] as const
).map((s) => ({
  key: s.key,
  color: s.color,
  fill: s.fill,
  band: describeSectorBand(INNER_RADIUS, OUTER_RADIUS, s.from, s.to),
  arc: describeArc(ARC_RADIUS, s.from, s.to),
}));

interface GearTheme {
  background: string;
  border: string;
  text: string;
  strokeWidth: number;
  tick: string;
}
const themes: Record<string, { on: GearTheme; off: GearTheme }> = {
  ohm: {
    on: {
      background: "#dc2626",
      border: "#991b1b",
      text: "#ffffff",
      strokeWidth: 2.2,
      tick: "#dc2626",
    },
    off: {
      background: "#ffffff",
      border: "#fca5a5",
      text: "#b91c1c",
      strokeWidth: 1.3,
      tick: "#f87171",
    },
  },
  acv: {
    on: {
      background: "#2563eb",
      border: "#1d4ed8",
      text: "#ffffff",
      strokeWidth: 2.2,
      tick: "#2563eb",
    },
    off: {
      background: "#ffffff",
      border: "#93c5fd",
      text: "#1d4ed8",
      strokeWidth: 1.3,
      tick: "#60a5fa",
    },
  },
  dcv: {
    on: {
      background: "#059669",
      border: "#047857",
      text: "#ffffff",
      strokeWidth: 2.2,
      tick: "#059669",
    },
    off: {
      background: "#ffffff",
      border: "#86efac",
      text: "#15803d",
      strokeWidth: 1.3,
      tick: "#4ade80",
    },
  },
  dcma: {
    on: {
      background: "#d97706",
      border: "#b45309",
      text: "#ffffff",
      strokeWidth: 2.2,
      tick: "#d97706",
    },
    off: {
      background: "#ffffff",
      border: "#fcd34d",
      text: "#b45309",
      strokeWidth: 1.3,
      tick: "#fbbf24",
    },
  },
  off: {
    on: {
      background: "#374151",
      border: "#111827",
      text: "#ffffff",
      strokeWidth: 2.2,
      tick: "#475569",
    },
    off: {
      background: "#f3f4f6",
      border: "#cbd5e1",
      text: "#374151",
      strokeWidth: 1.3,
      tick: "#94a3b8",
    },
  },
};

const gearItems = computed(() =>
  GEARS.map((g) => {
    const selected = g.id === gear.value.id;
    const theme = themes[g.category][selected ? "on" : "off"];
    const p = polar(120, g.angle);
    return {
      gear: g,
      selected,
      theme,
      outer: polar(78, g.angle),
      inner: polar(64, g.angle),
      labelX: p.x,
      labelY: p.y,
    };
  }),
);

const knobStyle = computed(() => ({
  transform: `rotate(${gear.value.angle}deg)`,
  transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
  transition: "transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1)",
}));

const t = (size: number, fill: string, weight = "400"): Record<string, string | number> => ({
  "font-size": size,
  "font-family": "KaTeX_Main, serif",
  "font-weight": weight,
  fill,
});

const onPill = (g: Gear): void => {
  if (clickable) emit("update:gear", g);
};

const ring = (on: boolean): string => (on ? "#e2a846" : "transparent");
const ringWidth = (on: boolean): number => (on ? 3.5 : 0);
</script>

<template>
  <div class="mt-gear">
    <svg viewBox="0 0 700 395" xmlns="http://www.w3.org/2000/svg" class="mt-gear-svg">
      <defs>
        <filter :id="`${uid}-shadow`" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="4" result="ob" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient :id="`${uid}-knob`" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#44403c" />
          <stop offset="60%" stop-color="#292524" />
          <stop offset="100%" stop-color="#1c1917" />
        </radialGradient>
        <radialGradient :id="`${uid}-pot`" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#f5f5f4" />
          <stop offset="70%" stop-color="#d6d3d1" />
          <stop offset="100%" stop-color="#a8a29e" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="700" height="395" rx="10" fill="#eae5d5" />
      <rect
        x="12"
        y="8"
        width="676"
        height="379"
        rx="8"
        fill="none"
        stroke="#d6d1be"
        stroke-width="1.5"
      />
      <circle
        :cx="CENTER_X"
        :cy="CENTER_Y"
        r="162"
        fill="#f5f2e9"
        stroke="#d5cfbe"
        stroke-width="1"
      />
      <circle
        :cx="CENTER_X"
        :cy="CENTER_Y"
        r="86"
        fill="#eae5d5"
        stroke="#d5cfbe"
        stroke-width="0.8"
      />
      <template v-for="s in sectors" :key="`band-${s.key}`">
        <path :d="s.band" :fill="s.fill" fill-opacity="0.75" />
        <path :d="s.arc" fill="none" :stroke="s.color" stroke-width="3.5" stroke-linecap="round" />
      </template>
      <g :transform="`translate(${CENTER_X}, ${CENTER_Y - 170})`">
        <rect
          x="-26"
          y="-13"
          width="52"
          height="24"
          rx="5"
          fill="#dc2626"
          stroke="#991b1b"
          stroke-width="1.2"
        />
        <text
          x="0"
          y="0"
          text-anchor="middle"
          dominant-baseline="central"
          v-bind="t(13, '#ffffff', '700')"
        >
          Ω
        </text>
      </g>
      <g :transform="`translate(${CENTER_X + 172}, ${CENTER_Y})`">
        <rect
          x="-28"
          y="-13"
          width="56"
          height="26"
          rx="5"
          fill="#2563eb"
          stroke="#1d4ed8"
          stroke-width="1.2"
        />
        <text
          x="0"
          y="0"
          text-anchor="middle"
          dominant-baseline="central"
          v-bind="t(13, '#ffffff', '700')"
        >
          V~
        </text>
      </g>
      <g :transform="`translate(${CENTER_X - 15}, ${CENTER_Y + 170})`">
        <rect
          x="-28"
          y="-13"
          width="56"
          height="26"
          rx="5"
          fill="#059669"
          stroke="#047857"
          stroke-width="1.2"
        />
        <text
          x="0"
          y="0"
          text-anchor="middle"
          dominant-baseline="central"
          v-bind="t(13, '#ffffff', '700')"
        >
          V―
        </text>
      </g>
      <g :transform="`translate(${CENTER_X - 172}, ${CENTER_Y})`">
        <rect
          x="-32"
          y="-13"
          width="64"
          height="26"
          rx="5"
          fill="#d97706"
          stroke="#b45309"
          stroke-width="1.2"
        />
        <text
          x="0"
          y="0"
          text-anchor="middle"
          dominant-baseline="central"
          v-bind="t(12, '#ffffff', '700')"
        >
          mA―
        </text>
      </g>
      <g v-for="item in gearItems" :key="`gear-${item.gear.id}`">
        <line
          :x1="item.inner.x"
          :y1="item.inner.y"
          :x2="item.outer.x"
          :y2="item.outer.y"
          :stroke="item.selected ? item.theme.border : item.theme.tick"
          :stroke-width="item.selected ? 2.5 : 1.5"
          stroke-linecap="round"
        />
        <g
          :transform="`translate(${item.labelX.toFixed(1)}, ${item.labelY.toFixed(1)})`"
          :class="{ 'mt-pill': clickable }"
          @click="onPill(item.gear)"
        >
          <rect x="-25" y="-14" width="50" height="28" fill="transparent" />
          <rect
            x="-22"
            y="-12"
            width="44"
            height="24"
            rx="5"
            :fill="item.theme.background"
            :stroke="item.theme.border"
            :stroke-width="item.theme.strokeWidth"
            :filter="`url(#${uid}-shadow)`"
          />
          <text
            x="0"
            y="0.5"
            text-anchor="middle"
            dominant-baseline="central"
            v-bind="t(11, item.theme.text, '700')"
          >
            {{ item.gear.label }}
          </text>
        </g>
      </g>
      <g :style="knobStyle" :class="{ 'mt-pill': clickable }">
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          :r="highlight === 'knob' ? 54 : 48"
          fill="none"
          :stroke="ring(highlight === 'knob')"
          :stroke-width="ringWidth(highlight === 'knob')"
        />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          r="48"
          fill="#1c1917"
          stroke="#44403c"
          stroke-width="2"
        />
        <line
          v-for="n in 12"
          :key="`notch-${n}`"
          :x1="CENTER_X + 44 * Math.sin((n * 30 * Math.PI) / 180)"
          :y1="CENTER_Y - 44 * Math.cos((n * 30 * Math.PI) / 180)"
          :x2="CENTER_X + 48 * Math.sin((n * 30 * Math.PI) / 180)"
          :y2="CENTER_Y - 48 * Math.cos((n * 30 * Math.PI) / 180)"
          stroke="#57534e"
          stroke-width="1.8"
        />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          r="42"
          :fill="`url(#${uid}-knob)`"
          stroke="#57534e"
          stroke-width="1.5"
        />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          r="36"
          fill="#292524"
          stroke="#1c1917"
          stroke-width="1"
        />
        <polygon
          :points="`${CENTER_X - 5},${CENTER_Y - 16} ${CENTER_X},${CENTER_Y - 40} ${CENTER_X + 5},${CENTER_Y - 16}`"
          fill="#ffffff"
        />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          r="18"
          fill="#1c1917"
          stroke="#44403c"
          stroke-width="1.5"
        />
        <circle
          :cx="CENTER_X"
          :cy="CENTER_Y"
          r="10"
          fill="#292524"
          stroke="#57534e"
          stroke-width="1"
        />
        <circle :cx="CENTER_X" :cy="CENTER_Y" r="3" fill="#a8a29e" />
      </g>
      <g transform="translate(585, 95)">
        <circle
          cx="0"
          cy="0"
          :r="highlight === 'ohmAdj' ? 32 : 26"
          fill="none"
          :stroke="ring(highlight === 'ohmAdj')"
          :stroke-width="ringWidth(highlight === 'ohmAdj')"
        />
        <circle
          cx="0"
          cy="0"
          r="26"
          fill="#d6d3d1"
          stroke="#a8a29e"
          stroke-width="1.5"
          :filter="`url(#${uid}-shadow)`"
        />
        <circle
          cx="0"
          cy="0"
          r="22"
          :fill="`url(#${uid}-pot)`"
          stroke="#78716c"
          stroke-width="1.2"
        />
        <circle
          cx="0"
          cy="0"
          r="20"
          fill="none"
          stroke="#78716c"
          stroke-width="1"
          stroke-dasharray="2, 3"
        />
        <circle cx="0" cy="0" r="13" fill="#f5f5f4" stroke="#a8a29e" stroke-width="1" />
        <line
          x1="-7"
          y1="0"
          x2="7"
          y2="0"
          stroke="#44403c"
          stroke-width="2"
          stroke-linecap="round"
        />
        <text
          x="0"
          y="-42"
          text-anchor="middle"
          :style="{ letterSpacing: '1px' }"
          v-bind="t(13, highlight === 'ohmAdj' ? '#b45309' : '#1c1917', '700')"
        >
          0Ω ADJ
        </text>
        <text
          x="0"
          y="52"
          text-anchor="middle"
          v-bind="
            t(
              11,
              highlight === 'ohmAdj' ? '#b45309' : '#78716c',
              highlight === 'ohmAdj' ? '700' : '400',
            )
          "
        >
          欧姆调零旋钮
        </text>
      </g>
      <g transform="translate(488, 175)">
        <rect
          x="-10"
          y="-10"
          width="214"
          height="170"
          rx="14"
          fill="none"
          :stroke="ring(highlight === 'terminals')"
          :stroke-width="ringWidth(highlight === 'terminals')"
        />
        <rect
          x="0"
          y="0"
          width="194"
          height="150"
          rx="10"
          fill="#262626"
          stroke="#404040"
          stroke-width="1.8"
          :filter="`url(#${uid}-shadow)`"
        />
        <line x1="20" y1="32" x2="174" y2="32" stroke="#404040" stroke-width="1" />
        <g transform="translate(52, 72)">
          <circle cx="0" cy="0" r="20" fill="#1c1917" stroke="#dc2626" stroke-width="2.2" />
          <circle cx="0" cy="0" r="14" fill="#ef4444" stroke="#b91c1c" stroke-width="1.2" />
          <circle cx="0" cy="0" r="6" fill="#0c0a09" />
          <text x="0" y="38" text-anchor="middle" v-bind="t(15, '#ef4444', '700')">+</text>
        </g>
        <g transform="translate(142, 72)">
          <circle cx="0" cy="0" r="20" fill="#1c1917" stroke="#78716c" stroke-width="2.2" />
          <circle cx="0" cy="0" r="14" fill="#44403c" stroke="#292524" stroke-width="1.2" />
          <circle cx="0" cy="0" r="6" fill="#0c0a09" />
          <text x="0" y="38" text-anchor="middle" v-bind="t(15, '#e7e5e4', '700')">−</text>
        </g>
        <text x="52" y="132" text-anchor="middle" v-bind="t(12, '#fca5a5', '700')">红表笔</text>
        <text x="142" y="132" text-anchor="middle" v-bind="t(12, '#d6d3d1', '700')">黑表笔</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.mt-gear {
  width: 100%;
  min-width: 0;
}
.mt-gear-svg {
  display: block;
  width: 100%;
  height: auto;
}
.mt-pill {
  cursor: pointer;
}
</style>
