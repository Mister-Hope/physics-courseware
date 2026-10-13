<!--
  第 7 页例题（圆锥摆）：小球在水平面内做匀速圆周运动，细绳沿圆锥面旋转，绳与竖直方向的夹角为 θ。
  常显：悬点 O、细绳、小球、竖直轴虚线、圆周轨迹（椭圆）、夹角 θ 与绳长 l。
  分步：show-forces 出 mg / F_T / F_n 三个力（都从小球球心出发，F_n 是 mg 与 F_T 的合力，用两条虚线闭合成矩形）；
  show-radius 出半径 r（由圆心 C 向左画到圆周）。
-->
<script setup lang="ts">
withDefaults(defineProps<{ showForces?: boolean; showRadius?: boolean }>(), {
  showForces: false,
  showRadius: false,
});

const rad = (d: number) => (d * Math.PI) / 180;

/** 绳与竖直方向的夹角 */
const TH = 40;
const S = Math.sin(rad(TH));
const CS = Math.cos(rad(TH));

/** 悬点（细绳上端） */
const O = { x: 140, y: 34 };
/** 绳长（viewBox 用户单位） */
const L = 200;
/** 小球：圆周的最右端 */
const B = { x: O.x + L * S, y: O.y + L * CS };
/** 圆心 C：与小球等高、落在竖直轴上 */
const C = { x: O.x, y: B.y };
/** 圆周半径 r = l·sinθ */
const R = L * S;
/** 椭圆短半轴（透视压扁约 0.28·R，有立体感但不夸张） */
const RY = 36;

/** 竖直轴虚线：画到椭圆下方一点 */
const axisEnd = C.y + 49;

/** θ 的圆弧：绕悬点从竖直轴转到细绳（屏幕上逆时针，sweep-flag = 0） */
const R_ARC = 56;
const arcEnd = { x: O.x + R_ARC * S, y: O.y + R_ARC * CS };
const thetaArc = `M ${O.x} ${O.y + R_ARC} A ${R_ARC} ${R_ARC} 0 0 0 ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}`;

/** θ 标注：沿角平分线方向放在弧线外侧，贴近弧线 */
const thetaLabel = { x: O.x + 86 * Math.sin(rad(TH / 2)), y: O.y + 86 * Math.cos(rad(TH / 2)) };

/** L 标注：绳中点向绳的外侧（右上方）偏移，避免压绳 */
const ropeMid = { x: O.x + (L / 2) * S, y: O.y + (L / 2) * CS };
const lLabel = { x: ropeMid.x + 18 * CS, y: ropeMid.y - 18 * S };

/** 三个力都从小球球心出发，长度按真实比例：F_T = mg/cosθ、F_n = mg·tanθ */
const MG_LEN = 64;
const FT_LEN = MG_LEN / CS;
const FN_LEN = MG_LEN * Math.tan(rad(TH));
const mgTip = { x: B.x, y: B.y + MG_LEN };
const ftTip = { x: B.x - FT_LEN * S, y: B.y - FT_LEN * CS };
/** F_n 是 mg 与 F_T 的合力：箭头沿半径方向指向圆心 C，长度 = mg·tanθ */
const fnTip = { x: B.x - FN_LEN, y: B.y };
/** Mg 标注：重力箭头右侧 */
const mgLabel = { x: B.x + 12, y: B.y + 51 };
/** F_T 标注：沿绳往悬点方向再外移一段，避开 F_n 与平行四边形虚线 */
const ftMid = { x: B.x - (FT_LEN / 2) * S, y: B.y - (FT_LEN / 2) * CS };
const ftLabel = { x: ftMid.x + 30 * CS - 18 * S, y: ftMid.y - 30 * S - 18 * CS };
/** F_n 标注：放在水平箭头上方（上方已避开椭圆上缘），与箭头留出光晕余量 */
const fnLabel = { x: B.x - FN_LEN / 2, y: B.y - 30 };

/** 半径 r：由圆心向左画到圆周（与水平力箭头相反一侧，互不遮挡） */
const rLabel = { x: (C.x + (C.x - R)) / 2, y: C.y - 10 };
</script>

<template>
  <svg
    viewBox="4 24 314 232"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style=" display: block;max-width: 21rem; margin: 0 auto"
    role="img"
    aria-label="圆锥摆：小球在水平面内做圆周运动，绳与竖直方向的夹角为 θ"
  >
    <line :x1="O.x" :y1="O.y" :x2="O.x" :y2="axisEnd" stroke="#94a3b8" stroke-width="2.2" stroke-dasharray="7 6" opacity="0.65" />
    <ellipse :cx="C.x" :cy="C.y" :rx="R" :ry="RY" fill="none" stroke="#2dd4bf" stroke-width="3" stroke-dasharray="9 8" opacity="0.6" />
    <line :x1="O.x" :y1="O.y" :x2="B.x" :y2="B.y" stroke="#e2e8f0" stroke-width="2.8" />
    <path :d="thetaArc" fill="none" stroke="#fbbf24" stroke-width="2.6" />
    <text
      :x="thetaLabel.x"
      :y="thetaLabel.y"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="#fbbf24"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      θ
    </text>
    <text
      :x="lLabel.x"
      :y="lLabel.y"
      text-anchor="start"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="26"
      fill="#e2e8f0"
      stroke="#0f1425"
      stroke-width="4"
      paint-order="stroke"
    >
      l
    </text>
    <g v-if="showRadius">
      <line :x1="C.x" :y1="C.y" :x2="C.x - R" :y2="C.y" stroke="#fbbf24" stroke-width="2.6" />
      <text
        :x="rLabel.x"
        :y="rLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="#fbbf24"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        r
      </text>
    </g>
    <g v-if="showForces">
      <line :x1="ftTip.x" :y1="ftTip.y" :x2="fnTip.x" :y2="fnTip.y" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.55" />
      <line :x1="mgTip.x" :y1="mgTip.y" :x2="fnTip.x" :y2="fnTip.y" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.55" />
      <CourseArrow :from="B" :to="mgTip" stroke="#f87171" :stroke-width="3.6" />
      <CourseArrow :from="B" :to="ftTip" stroke="#60a5fa" :stroke-width="3.6" />
      <CourseArrow :from="B" :to="fnTip" stroke="#2dd4bf" :stroke-width="3.6" />
      <text
        :x="mgLabel.x"
        :y="mgLabel.y"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#f87171"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        mg
      </text>
      <text
        :x="ftLabel.x"
        :y="ftLabel.y"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="#60a5fa"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        F
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="16" dy="6">T</tspan>
      </text>
      <text
        :x="fnLabel.x"
        :y="fnLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="#2dd4bf"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        F
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="16" dy="6">n</tspan>
      </text>
    </g>
    <circle :cx="O.x" :cy="O.y" r="5" fill="#94a3b8" />
    <circle :cx="C.x" :cy="C.y" r="3.6" fill="#94a3b8" />
    <circle :cx="B.x" :cy="B.y" r="14" fill="none" stroke="rgba(226,168,70,0.3)" stroke-width="2.5" />
    <circle :cx="B.x" :cy="B.y" r="10.5" fill="#e2a846" />
    <circle :cx="B.x - 3.4" :cy="B.y - 3.4" r="4.2" fill="rgba(255,255,255,0.45)" />
  </svg>
</template>
