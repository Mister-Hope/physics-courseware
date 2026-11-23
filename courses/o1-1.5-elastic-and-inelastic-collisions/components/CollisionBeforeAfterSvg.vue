<script setup lang="ts">
/** 碰前 / 碰后对比示意（第 7、8、11、12 页）：上排碰前、下排碰后， 两球质量用颜色区分（左球金、右球青），速度箭头指向运动方向、长度正比于速度大小。 stuck 为 true 时碰后画成粘在一起的整体。 */
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    v1?: number;
    v2?: number;
    v1p?: number;
    v2p?: number;
    stuck?: boolean;
    stuckTex?: string;
    showAfter?: boolean;
    sub1?: string;
    sub2?: string;
  }>(),
  {
    v1: 1,
    v2: 0,
    v1p: 0,
    v2p: 1,
    stuck: false,
    stuckTex: "2m",
    showAfter: true,
    sub1: "1",
    sub2: "2",
  },
);

const R = 20;
const Y1 = 62;
const Y2 = 158;
const X1 = 150;
const X2 = 360;
const X1A = 158;
const X2A = 282;

interface ArrowSpec {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  label: string;
  sub: string;
  lx: number;
  anchor: "start" | "end";
  ly: number;
}

const arrowLen = (v: number) => Math.max(26, Math.min(96, Math.abs(v) * 62));

const makeArrow = (cx: number, y: number, v: number, color: string, label: string, sub: string, gap: number): ArrowSpec | null => {
  if (!v) {
    return null;
  }
  const len = arrowLen(v);
  const x0 = v > 0 ? cx + gap : cx - gap;
  const x1 = v > 0 ? x0 + len : x0 - len;
  return {
    from: { x: x0, y },
    to: { x: x1, y },
    color,
    label,
    sub,
    lx: v > 0 ? x1 + 10 : x1 - 10,
    anchor: v > 0 ? "start" : "end",
    ly: y - 9,
  };
};

const beforeArrows = computed(() => {
  const list: ArrowSpec[] = [];
  const a1 = makeArrow(X1, Y1, props.v1, "var(--c-accent)", "v", props.sub1, R + 8);
  const a2 = makeArrow(X2, Y1, props.v2, "var(--c-physics)", "v", props.sub2, R + 8);
  if (a1) {
    list.push(a1);
  }
  if (a2) {
    list.push(a2);
  }
  return list;
});

const afterArrows = computed(() => {
  const list: ArrowSpec[] = [];
  if (!props.showAfter) {
    return list;
  }
  if (props.stuck) {
    const center = X1A + R;
    const arrow = makeArrow(center, Y2, props.v1p, "var(--c-accent)", "v′", props.sub1, 2 * R + 8);
    if (arrow) {
      list.push(arrow);
    }
    return list;
  }
  const a1 = makeArrow(X1A, Y2, props.v1p, "var(--c-accent)", "v′", props.sub1, R + 8);
  const a2 = makeArrow(X2A, Y2, props.v2p, "var(--c-physics)", "v′", props.sub2, R + 8);
  if (a1) {
    list.push(a1);
  }
  if (a2) {
    list.push(a2);
  }
  return list;
});

const stuckCenter = X1A + R;
</script>

<template>
  <svg viewBox="0 0 560 200" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="44" y1="62" x2="520" y2="62" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 6" opacity="0.22" />
    <line x1="44" y1="158" x2="520" y2="158" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="5 6" opacity="0.22" />
    <text x="18" y="66" font-size="13" fill="var(--c-text-dim)">碰前</text>
    <text v-if="showAfter" x="18" y="162" font-size="13" fill="var(--c-text-dim)">碰后</text>
    <circle :cx="X1" :cy="Y1" :r="R" fill="var(--c-accent)" opacity="0.92" />
    <circle :cx="X1 - 7" :cy="Y1 - 7" r="6" fill="#fff" opacity="0.16" />
    <circle :cx="X2" :cy="Y1" :r="R" fill="var(--c-physics)" opacity="0.92" />
    <circle :cx="X2 - 7" :cy="Y1 - 7" r="6" fill="#fff" opacity="0.16" />
    <text :x="X1" :y="Y1 + R + 22" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)" text-anchor="middle">
      m<tspan font-size="10" dy="4">{{ sub1 }}</tspan>
    </text>
    <text :x="X2" :y="Y1 + R + 22" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-physics)" text-anchor="middle">
      m<tspan font-size="10" dy="4">{{ sub2 }}</tspan>
    </text>
    <g v-if="showAfter">
      <template v-if="stuck">
        <rect :x="stuckCenter - 2 * R" :y="Y2 - R" :width="2 * R" :height="2 * R" fill="var(--c-accent)" opacity="0.92" />
        <rect :x="stuckCenter" :y="Y2 - R" :width="2 * R" :height="2 * R" fill="var(--c-physics)" opacity="0.92" />
        <rect
          :x="stuckCenter - 2 * R"
          :y="Y2 - R"
          :width="4 * R"
          :height="2 * R"
          :rx="R"
          fill="none"
          stroke="var(--c-text-dim)"
          stroke-width="1.2"
          opacity="0.5"
        />
        <text :x="stuckCenter" :y="Y2 + 5" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="#0f1425" text-anchor="middle">{{ stuckTex }}</text>
      </template>
      <template v-else>
        <circle :cx="X1A" :cy="Y2" :r="R" fill="var(--c-accent)" opacity="0.92" />
        <circle :cx="X1A - 7" :cy="Y2 - 7" r="6" fill="#fff" opacity="0.16" />
        <circle :cx="X2A" :cy="Y2" :r="R" fill="var(--c-physics)" opacity="0.92" />
        <circle :cx="X2A - 7" :cy="Y2 - 7" r="6" fill="#fff" opacity="0.16" />
      </template>
    </g>
    <CourseArrow
      v-for="(arrow, index) in beforeArrows"
      :key="`b-${index}`"
      :from="arrow.from"
      :to="arrow.to"
      :stroke="arrow.color"
      :stroke-width="2.6"
      :head-size="9"
    />
    <CourseArrow
      v-for="(arrow, index) in afterArrows"
      :key="`a-${index}`"
      :from="arrow.from"
      :to="arrow.to"
      :stroke="arrow.color"
      :stroke-width="2.6"
      :head-size="9"
    />
    <text
      v-for="(arrow, index) in [...beforeArrows, ...afterArrows]"
      :key="`l-${index}`"
      :x="arrow.lx"
      :y="arrow.ly"
      font-family="KaTeX_Math"
      font-style="italic"
      :font-size="15"
      :fill="arrow.color"
      :text-anchor="arrow.anchor"
    >
      {{ arrow.label }}<tspan font-size="10" dy="4">{{ arrow.sub }}</tspan>
    </text>
  </svg>
</template>
