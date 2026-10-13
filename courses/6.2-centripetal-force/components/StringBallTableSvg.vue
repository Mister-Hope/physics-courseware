<script setup lang="ts">
// 第 4 页：光滑桌面上细线牵引的小球绕图钉做匀速圆周运动（俯视）。
// step 0：细线完好，小球在圆周上；step 1：剪断细线，小球沿切线做直线运动；
// step 2：标出绳的拉力方向（指向圆心），说明"迫使小球转弯的力指向圆心"。
const { step = 0 } = defineProps<{ step?: number }>();

/** 图钉（圆周运动圆心） */
const PIN = { x: 200, y: 180 };
/** 小球位置（几何中心） */
const BALL = { x: 330, y: 120 };
const BALL_R = 13;

const R = Math.hypot(BALL.x - PIN.x, BALL.y - PIN.y);
/** 由图钉指向小球的单位向量 */
const u = { x: (BALL.x - PIN.x) / R, y: (BALL.y - PIN.y) / R };
/** 细线画到小球圆周为止，不进入球内 */
const LINE_END = { x: BALL.x - BALL_R * u.x, y: BALL.y - BALL_R * u.y };
/** 切线方向（小球被剪断后沿此方向直线飞出） */
const T = { x: -u.y, y: u.x };
/** 飞出后的第二个位置（示意"沿切线做直线运动"） */
const FLY = { x: BALL.x + 190 * T.x, y: BALL.y + 190 * T.y };
/** 切线虚线：起到小球圆周、止于终点圆外 */
const TANGENT_START = { x: BALL.x + (BALL_R + 2) * T.x, y: BALL.y + (BALL_R + 2) * T.y };
const TANGENT_END = { x: FLY.x - 18 * T.x, y: FLY.y - 18 * T.y };
/** 虚线上补一个方向箭头，说明"沿切线飞出"的朝向 */
const MID = { x: BALL.x + 100 * T.x, y: BALL.y + 100 * T.y };
const HEAD = {
  tip: { x: MID.x + 12 * T.x, y: MID.y + 12 * T.y },
  a: { x: MID.x - 6 * T.x - 8 * T.y, y: MID.y - 6 * T.y + 8 * T.x },
  b: { x: MID.x - 6 * T.x + 8 * T.y, y: MID.y - 6 * T.y - 8 * T.x },
};
/** 绳的拉力箭头（指向圆心） */
const TIP = { x: BALL.x - 92 * u.x, y: BALL.y - 92 * u.y };
/** 拉力标注位置：放在箭头下侧、并左移避开切线虚线 */
const LABEL = { x: (BALL.x + TIP.x) / 2 - 8, y: (BALL.y + TIP.y) / 2 + 44 };
</script>

<template>
  <svg viewBox="40 26 500 320" width="100%" xmlns="http://www.w3.org/2000/svg">
    <circle :cx="PIN.x" :cy="PIN.y" :r="R" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8 7" opacity="0.55" />
    <circle :cx="PIN.x" :cy="PIN.y" r="6" fill="#94a3b8" />
    <text :x="PIN.x - 16" :y="PIN.y - 12" font-family="KaTeX_Main" font-size="18" fill="#94a3b8" text-anchor="end">图钉</text>
    <g v-if="step < 1">
      <line :x1="PIN.x" :y1="PIN.y" :x2="LINE_END.x" :y2="LINE_END.y" stroke="#60a5fa" stroke-width="2.8" stroke-linecap="round" />
      <g stroke="#f87171" stroke-width="3.2" stroke-linecap="round">
        <line x1="248" y1="142" x2="270" y2="164" />
        <line x1="248" y1="164" x2="270" y2="142" />
      </g>
    </g>
    <g v-if="step >= 1">
      <line
        :x1="TANGENT_START.x"
        :y1="TANGENT_START.y"
        :x2="TANGENT_END.x"
        :y2="TANGENT_END.y"
        stroke="#2dd4bf"
        stroke-width="2.4"
        stroke-dasharray="10 8"
        stroke-linecap="round"
      />
      <path :d="`M ${HEAD.a.x} ${HEAD.a.y} L ${HEAD.tip.x} ${HEAD.tip.y} L ${HEAD.b.x} ${HEAD.b.y} Z`" fill="#2dd4bf" />
      <circle :cx="FLY.x" :cy="FLY.y" r="13" fill="rgba(45,212,191,0.2)" stroke="#2dd4bf" stroke-width="1.8" />
      <text
        :x="FLY.x + 22"
        :y="FLY.y + 6"
        font-family="KaTeX_Main"
        font-size="18"
        fill="#2dd4bf"
        text-anchor="start"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        沿切线飞出
      </text>
    </g>
    <g v-if="step >= 2">
      <CourseArrow :from="BALL" :to="TIP" stroke="#e2a846" :stroke-width="3.4" />
      <text
        :x="LABEL.x"
        :y="LABEL.y"
        font-family="KaTeX_Main"
        font-size="18"
        fill="#e2a846"
        text-anchor="middle"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        拉力指向圆心
      </text>
    </g>
    <circle :cx="BALL.x" :cy="BALL.y" :r="BALL_R" fill="#3a2f14" stroke="#e2a846" stroke-width="2" />
  </svg>
</template>
