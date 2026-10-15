<script setup lang="ts">
/**
 * 向心力突然消失，物体沿 P 点的切线飞出 —— 6.4 生活中的圆周运动（第 13 页）
 *
 * 虚线圆是原来做圆周运动的轨道；物体在圆上的 P 点处向心力突然消失，此后不再转弯， 沿 P 点的切线做直线运动。P 取在圆的右上方（自正上方向右偏 48°）， 切线方向 t 由半径方向 u 旋转 90° 严格得到（u·t = 0），因此这条直线**只与圆相切于 P 一点**， 速度 v
 * 与飞出方向同在切线上。半径虚线 OP 与直角标记用来点明「切线与半径垂直」。 showEscape 打开后再画出半径虚线、直角标记、飞出直线与速度箭头。
 */
const { showEscape = true } = defineProps<{
  /** 点击后出现：半径虚线与直角标记、沿切线飞出的直线与速度 v */
  showEscape?: boolean;
}>();

interface Point {
  x: number;
  y: number;
}

const O: Point = { x: 140, y: 132 };
const R = 104;
/** P 的方位角：自正上方起向右偏 48° */
const PHI = (48 * Math.PI) / 180;
/** 半径方向的单位向量（O → P） */
const u: Point = { x: Math.sin(PHI), y: -Math.cos(PHI) };
/** 切线方向的单位向量：u 旋转 90°，与半径严格垂直 */
const t: Point = { x: Math.cos(PHI), y: Math.sin(PHI) };
const P: Point = { x: O.x + R * u.x, y: O.y + R * u.y };

/** 小球半径 */
const BALL_R = 10;
// 沿切线取点：从球心出发走 `d`，让线段从球面开始、不从球心穿出来
const alongTangent = (d: number): Point => ({ x: P.x + d * t.x, y: P.y + d * t.y });
/** 速度箭头尖端 */
const V_TIP = alongTangent(88);
/** 飞出直线的箭头尖端 */
const ESCAPE_TIP = alongTangent(243);
const vFrom = alongTangent(BALL_R + 1);

/** 直角标记：PO 与切线之间的小方块 */
const MARK = 16;
const markA: Point = { x: P.x - MARK * u.x, y: P.y - MARK * u.y };
const markC: Point = { x: P.x + MARK * t.x, y: P.y + MARK * t.y };
const markB: Point = { x: markA.x + MARK * t.x, y: markA.y + MARK * t.y };
const markPath = `M ${markA.x.toFixed(1)} ${markA.y.toFixed(1)} L ${markB.x.toFixed(1)} ${markB.y.toFixed(1)} L ${markC.x.toFixed(1)} ${markC.y.toFixed(1)}`;

// 飞出直线上的取点：`frac` 为全程比例，`off` 为沿法向 u 的偏移（负值＝线的左下方）
const onEscape = (frac: number, off: number): Point => ({
  x: P.x + frac * 243 * t.x + off * u.x,
  y: P.y + frac * 243 * t.y + off * u.y,
});

/** 文字位置：都让开线条与圆的外侧 */
const escapeLabel = onEscape(0.62, -50);
const vLabel: Point = { x: V_TIP.x + 20 * u.x, y: V_TIP.y + 20 * u.y + 5 };
const Plabel: Point = { x: P.x + 22, y: P.y - 14 };
const Olabel: Point = { x: O.x - 18, y: O.y + 26 };
</script>

<template>
  <div>
    <svg viewBox="20 14 380 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="向心力消失后物体沿 P 点的切线方向飞出">
      <defs>
        <radialGradient id="tangent-escape-ball" cx="36%" cy="30%" r="72%">
          <stop offset="0" stop-color="#ffffff" />
          <stop offset="0.55" stop-color="var(--c-text)" />
          <stop offset="1" stop-color="var(--c-text-dim)" />
        </radialGradient>
      </defs>
      <circle :cx="O.x" :cy="O.y" :r="R" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-dasharray="9 8" opacity="0.65" />
      <circle :cx="O.x" :cy="O.y" r="4.5" fill="var(--c-text-dim)" />
      <text :x="Olabel.x" :y="Olabel.y" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">O</text>
      <g :class="{ 'centri-hidden': !showEscape }">
        <line
          :x1="O.x"
          :y1="O.y"
          :x2="P.x"
          :y2="P.y"
          stroke="color-mix(in srgb, var(--c-text-dim) 85%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <path :d="markPath" fill="none" stroke="color-mix(in srgb, var(--c-text-dim) 95%, transparent)" stroke-width="1.4" />
        <CourseArrow :from="vFrom" :to="V_TIP" stroke="var(--c-velocity)" :stroke-width="3" />
        <text :x="vLabel.x" :y="vLabel.y" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-velocity)">v</text>
        <CourseArrow :from="V_TIP" :to="ESCAPE_TIP" stroke="var(--c-accent)" :stroke-width="3.4" stroke-dasharray="12 8" />
        <text :x="escapeLabel.x" :y="escapeLabel.y" text-anchor="middle" font-size="17" fill="var(--c-accent)">沿切线飞出</text>
      </g>
      <circle
        :cx="P.x"
        :cy="P.y"
        :r="BALL_R"
        fill="url(#tangent-escape-ball)"
        stroke="color-mix(in srgb, var(--c-text-dim) 95%, transparent)"
        stroke-width="1"
      />
      <text :x="Plabel.x" :y="Plabel.y" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">P</text>
    </svg>
  </div>
</template>

<style scoped>
.centri-hidden {
  visibility: hidden;
}
</style>
