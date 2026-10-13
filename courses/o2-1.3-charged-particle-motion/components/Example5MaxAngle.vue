<!--
  选必二 1.3（第二课时）· 例 5（2）配图：弦取到直径 ⟹ 圆心角最大 ⟹ 用时最长
  ── 题干（由 slides.md 给出，本组件只画图）──
     圆形匀强磁场区域，半径 R、磁感应强度 B。粒子从边界上某点以速率 v₀ 射入。
     问：粒子在磁场中运动的最长时间是多少？
  ── 分步 ——
     showArc=false：磁场边界圆 + ⊗ + 圆心 O + 弦的两个端点 P、Q（P 是射入点）+ 直径 PQ（标 2R）；
     showArc=true ：第 1 次点击 → 轨迹圆弧（P→Q）+ 轨迹圆心 C + 两条虚线半径 CP、CQ（各标 r）
                       + C 处的圆心角 θ。
  ── 几何（全部按 viewBox 用户单位）──
     O = (310, 330)、R = 100；取 r = 1.5R = 150（图上只写符号 r、R）。
     P、Q 取圆的一对对径点：P = (210, 330)、Q = (410, 330) ⟹ 弦 PQ = 2R 是圆里最长的弦。
     轨迹圆心 C 在 PQ 的垂直平分线上：|PC| = |QC| = r ⟹ |OC| = √(r² − R²) = √(150² − 100²)
       = 111.8 ⟹ C = (310, 218.2)。
     轨迹弧 P→Q：圆心角 θ = 2·asin(R/r) ≈ 83.6°（< 180° ⟹ large-arc = 0）；
       屏幕坐标（y 向下）里 P 相对 C 的方向角为 131.8°、Q 为 48.2°，转角是"角度减小" = 逆时针
       ⟹ sweep-flag = 0。弧的中点 = C + r·(0, 1) = (310, 368.2)，到 O 的距离 r − |OC| = 38.2 < R ✓
       （整段弧都落在磁场区域里）。
     ※ 这一页只画"弦取直径"这一种（圆心角最大的）情形：弦 AB = 2r·sin(θ/2)，弦越长圆心角越大；
       圆内最长的弦是直径 2R，所以 r ≥ R 时 θ 最大不超过 π（r = R 时恰好取到 π）。
-->
<script setup>
defineProps({
  /** 是否画出轨迹弧 + 轨迹圆心 C + 半径 + 圆心角 θ */
  showArc: { type: Boolean, default: false },
});

/** 画布：viewBox 直接取「图形外接范围 + 一点余量」，不留大片空白 （页 18 右栏只占 1/4 宽，收窄 viewBox 才能把圆画大；容器 aspect-ratio 与它一致） */
const VB = { x: 182, y: 170, w: 272, h: 270 };

/** 磁场圆：圆心 O、半径 R */
const O = { x: 310, y: 330 };
const R = 100;
/** 弦取一对对径点 P、Q（图上只写符号） */
const P = { x: O.x - R, y: O.y };
const Q = { x: O.x + R, y: O.y };
/** 轨迹半径 r 与轨迹圆心 C（在 PQ 的垂直平分线上、离 O 的距离 √(r² − R²)） */
const R_TRAJ = 1.5 * R;
const H_OFF = Math.sqrt(R_TRAJ * R_TRAJ - R * R);
const C = { x: O.x, y: O.y - H_OFF };

const num = (v) => v.toFixed(2);
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const FS = 25;
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };

/** 轨迹弧 P→Q：真圆弧（sweep = 0，屏幕上逆时针），弧的中点落在 (O.x, O.y + (r − h)) */
const arcPath = `M ${num(P.x)} ${num(P.y)} A ${R_TRAJ} ${R_TRAJ} 0 0 0 ${num(Q.x)} ${num(Q.y)}`;
/** 直径 PQ 与两条虚线半径 */
const chordPath = `M ${P.x} ${P.y} L ${Q.x} ${Q.y}`;
const radiiPath = `M ${num(C.x)} ${num(C.y)} L ${num(P.x)} ${num(P.y)} M ${num(C.x)} ${num(C.y)} L ${num(Q.x)} ${num(Q.y)}`;
/** C 处的圆心角小弧（半径 46，从 CQ 转到 CP ⟹ 屏幕上顺时针 sweep = 1） */
const ANG_R = 46;
const angPoint = (phiDeg) => ({
  x: C.x + ANG_R * Math.cos((phiDeg * Math.PI) / 180),
  y: C.y + ANG_R * Math.sin((phiDeg * Math.PI) / 180),
});
const phiQ = (Math.atan2(Q.y - C.y, Q.x - C.x) * 180) / Math.PI;
const phiP = (Math.atan2(P.y - C.y, P.x - C.x) * 180) / Math.PI;
const angArc = `M ${num(angPoint(phiQ).x)} ${num(angPoint(phiQ).y)} A ${ANG_R} ${ANG_R} 0 0 1 ${num(angPoint(phiP).x)} ${num(angPoint(phiP).y)}`;
/** 射入速度 v₀：从 P 沿轨迹弧的切线方向（指向磁场区域内） */
const vIn = {
  from: P,
  to: { x: P.x + 40 * 0.745, y: P.y + 40 * 0.667 },
};

/** 磁场 ⊗ 阵列：只画在"弦以上、两条半径之间"的空当里（弦以下被轨迹弧占着）， 三个位置都核过，不压半径虚线、圆心角弧与各标注 */
const MARK_R = 6.4;
const MARK_ARM = 4.5;
const MARKS = [
  { x: O.x, y: 268 },
  { x: 262, y: 300 },
  { x: 358, y: 300 },
];
</script>

<template>
  <div
    class="flex min-h-0 w-full flex-1 items-center justify-center"
    :style="{ aspectRatio: `${VB.w} / ${VB.h}` }"
  >
    <svg
      :viewBox="`${VB.x} ${VB.y} ${VB.w} ${VB.h}`"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-auto max-w-full"
    >
      <!-- 磁场区域：边界圆 + ⊗ -->
      <circle
        :cx="O.x"
        :cy="O.y"
        :r="R"
        fill="rgba(226,168,70,0.07)"
        stroke="rgba(226,168,70,0.7)"
        stroke-width="2.2"
      />
      <g fill="none" stroke="rgba(226,168,70,0.5)" stroke-width="1.3" stroke-linecap="round">
        <template v-for="(m, i) in MARKS" :key="`b${i}`">
          <circle :cx="m.x" :cy="m.y" :r="MARK_R" />
          <line
            :x1="m.x - MARK_ARM"
            :y1="m.y - MARK_ARM"
            :x2="m.x + MARK_ARM"
            :y2="m.y + MARK_ARM"
          />
          <line
            :x1="m.x + MARK_ARM"
            :y1="m.y - MARK_ARM"
            :x2="m.x - MARK_ARM"
            :y2="m.y + MARK_ARM"
          />
        </template>
      </g>
      <!-- 题目给的弦：一对对径点之间的直径 -->
      <path :d="chordPath" fill="none" stroke="rgba(203,213,225,0.85)" stroke-width="2.2" />
      <circle :cx="O.x" :cy="O.y" r="4" fill="#cbd5e1" />
      <circle :cx="P.x" :cy="P.y" r="5.6" fill="#f8fafc" />
      <circle :cx="Q.x" :cy="Q.y" r="5.6" fill="#f8fafc" />
      <text
        v-bind="HALO"
        :x="P.x - 18"
        :y="P.y + 32"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="#f8fafc"
      >
        P
      </text>
      <text
        v-bind="HALO"
        :x="Q.x + 10"
        :y="Q.y + 32"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="#f8fafc"
      >
        Q
      </text>
      <text
        v-bind="HALO"
        :x="O.x + 12"
        :y="O.y + 30"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="#f8fafc"
      >
        O
      </text>
      <text
        v-bind="HALO"
        :x="O.x + 36"
        :y="O.y - 10"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="#cbd5e1"
      >
        2R
      </text>
      <!-- 射入速度 -->
      <CourseArrow :from="vIn.from" :to="vIn.to" stroke="#60a5fa" stroke-width="3.4" />
      <text
        v-bind="HALO"
        :x="vIn.to.x - 4"
        :y="vIn.to.y + 30"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="#60a5fa"
      >
        v
      </text>
      <!-- 第 1 次点击：轨迹弧 + 轨迹圆心 C + 半径 + 圆心角 θ -->
      <template v-if="showArc">
        <path :d="arcPath" fill="none" stroke="#60a5fa" stroke-width="3.8" stroke-linecap="round" />
        <path
          :d="radiiPath"
          fill="none"
          stroke="rgba(226,168,70,0.9)"
          stroke-width="1.9"
          stroke-dasharray="8 7"
        />
        <path :d="angArc" fill="none" stroke="#c4b5fd" stroke-width="2.4" />
        <circle :cx="C.x" :cy="C.y" r="5" fill="#f8fafc" />
        <text
          v-bind="HALO"
          :x="C.x + 12"
          :y="C.y - 10"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="#f8fafc"
        >
          C
        </text>
        <text
          v-bind="HALO"
          :x="C.x + 10"
          :y="C.y + 72"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS + 2"
          fill="#c4b5fd"
        >
          θ
        </text>
        <text
          v-bind="HALO"
          :x="C.x - 72"
          :y="C.y + 52"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS - 2"
          fill="#e2a846"
        >
          r
        </text>
        <text
          v-bind="HALO"
          :x="C.x + 64"
          :y="C.y + 52"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS - 2"
          fill="#e2a846"
        >
          r
        </text>
      </template>
    </svg>
  </div>
</template>
