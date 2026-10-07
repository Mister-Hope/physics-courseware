<script setup lang="ts">
import { computed } from "vue";

/**
 * 平抛运动是"匀变速曲线运动"的证据图：每隔相同时间取一个时刻， 三个时刻的速度矢量（v = v_x + v_y，方向越来越陡）首尾相接， 相邻两个速度矢量之差就是 Δv = gΔt——长度相同、方向都竖直向下。
 *
 * 取 v_0 = 4 m/s、g = 10 m/s²，三个时刻 t = 0.35 s、0.7 s、1.05 s： 位置 x = v_0t、y = ½gt²，速度分量 v_x = 4、v_y = gt。
 */
const v0 = 4;
const GRAVITY = 10;
const TIMES = [0.35, 0.7, 1.05];
/** 像素比例：水平 1 m → 90 px，竖直 1 m → 42 px，速度 1 m/s → 7 px */
const X_SCALE = 90;
const Y_SCALE = 42;
const V_SCALE = 7;
const ORIGIN = { x: 80, y: 60 };

interface Sample {
  pos: { x: number; y: number };
  tip: { x: number; y: number };
  vy: number;
  label: string;
}

const samples = computed((): Sample[] =>
  TIMES.map((t, index) => {
    const vy = GRAVITY * t;
    const speed = Math.hypot(v0, vy);
    const pos = { x: ORIGIN.x + v0 * t * X_SCALE, y: ORIGIN.y + 0.5 * GRAVITY * t * t * Y_SCALE };
    return {
      pos,
      tip: { x: pos.x + (v0 / speed) * speed * V_SCALE, y: pos.y + (vy / speed) * speed * V_SCALE },
      vy,
      label: `v_${index + 1}`,
    };
  }),
);

const trajectory = computed(() => `M ${ORIGIN.x} ${ORIGIN.y} L ${samples.value.map((sample) => `${sample.pos.x} ${sample.pos.y}`).join(" L ")}`);
</script>

<template>
  <div class="delta-v">
    <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="每隔相同时间的速度矢量与速度变化量">
      <path :d="trajectory" fill="none" stroke="rgba(148,163,184,0.7)" stroke-width="2.6" stroke-linecap="round" />
      <line x1="60" y1="300" x2="520" y2="300" stroke="rgba(148,163,184,0.35)" stroke-width="1.6" stroke-dasharray="7 6" />
      <circle :cx="ORIGIN.x" :cy="ORIGIN.y" r="4.5" fill="#e2e8f0" />
      <text :x="ORIGIN.x - 26" :y="ORIGIN.y - 10" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="#e2e8f0">O</text>
      <CourseArrow :from="ORIGIN" :to="{ x: ORIGIN.x + 108, y: ORIGIN.y }" stroke="#e2a846" :stroke-width="3" />
      <text :x="ORIGIN.x + 36" :y="ORIGIN.y - 12" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#e2a846">
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">0</tspan>
      </text>
      <g v-for="(s, i) in samples" :key="i">
        <circle :cx="s.pos.x" :cy="s.pos.y" r="5" fill="#e2a846" />
        <CourseArrow :from="s.pos" :to="s.tip" stroke="#f87171" :stroke-width="3.2" />
        <text :x="s.tip.x + 8" :y="s.tip.y + 4" font-family="KaTeX_Math" font-style="italic" font-size="19" fill="#fca5a5">
          v
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="13" dy="4">{{ i + 1 }}</tspan>
        </text>
      </g>
      <CourseArrow :from="samples[0].tip" :to="samples[1].tip" stroke="#60a5fa" :stroke-width="3" stroke-dasharray="8 6" />
      <CourseArrow :from="samples[1].tip" :to="samples[2].tip" stroke="#60a5fa" :stroke-width="3" stroke-dasharray="8 6" />
      <text
        :x="samples[0].tip.x + 14"
        :y="(samples[0].tip.y + samples[1].tip.y) / 2"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="#93c5fd"
      >
        Δv
      </text>
      <text
        :x="samples[1].tip.x + 14"
        :y="(samples[1].tip.y + samples[2].tip.y) / 2"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="18"
        fill="#93c5fd"
      >
        Δv
      </text>
    </svg>
  </div>
</template>

<style scoped>
.delta-v {
  min-width: 0;
}

.delta-v svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
