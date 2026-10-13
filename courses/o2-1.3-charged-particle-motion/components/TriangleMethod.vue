<!--
  选必2 1.3《带电粒子在匀强磁场中的运动》（第二课时）——「作三角形」解题思路页的配图。
  画的是带电粒子在匀强磁场里做匀速圆周运动时，一段圆弧轨迹（A 入射、B 出射）上的
  「弦 — 半径 — 圆心角 — 弦切角」几何关系，图上只有符号、没有任何数值：
    · 轨迹圆弧 AB（实线蓝 #60a5fa），两端点 A、B 都在弧上（小白蓝点）；
    · 圆心 C（小白点）：C→A、C→B 各一条虚线半径，标 r；
    · 弦 AB（细实线）；弦的中点 M，连 CM 成虚线并画直角标记 ⟹ 圆心到弦的垂线平分弦；
    · 圆心角 ∠ACB = α（C 处一段小圆弧，紫 #c4b5fd）；
    · A 点切线（⟂ CA，金色虚线，向弧外伸出）与弦 AB 的夹角＝弦切角 α/2
      ⟹ 弦切角 = 圆心角的一半（α 与 α/2 并排摆着，这层关系一眼可见）；
    · 图底一句结论 AB = 2r·sin(α/2)，把弦长、半径、圆心角三者串起来。
  角度取 α = 120°：弦切角 60°、两条半径与弦的夹角都是 30°（等腰三角形），
  且圆心角的角平分线取正上方 ⟹ 整图左右对称、CM 竖直、AB 水平，直角标记最好认。
  本组件无 props，页面写 <TriangleMethod /> 即常显、不分步。
  占满所在栏：容器按 viewBox 同比例（700 : 420）给 aspect-ratio，svg 用 h-full w-auto max-w-full；
  这样即使被放进 .half-grid 这种「行高 auto」的栏里，容器高度也有定数
  （否则百分比高度解析不出来，会退回 SVG 默认的 300×150，图缩成一小团）。
-->
<script setup>
/** 画布（viewBox 用户单位）；容器 aspect-ratio 与它保持一致 */
const W = 700;
const H = 420;
/** 圆心 C 与半径 r：画布上只出现符号 r，不出现任何长度数值 */
const CX = 352;
const CY = 310;
const R = 240;
/** 圆心角 α（度）：图内只写符号 α 与 α/2，不写 120°、60° 这类数值 */
const ALPHA = 120;
/** 角标圆弧半径、直角标记边长、切线的伸出长度（用户单位） */
const ARC_C = 58;
const ARC_A = 34;
const SQUARE = 13;
const TAN_TOP = 40;
const TAN_STUB = 40;
/** 字号：SVG 里是 viewBox 用户单位，渲染后还要乘缩放比，所以给足（标注 26–28、结论 30） */
const FS_POINT = 28;
const FS_ANGLE = 26;
const FS_FORMULA = 30;
const DEG = Math.PI / 180;

/** 符号一律走 LaTeX 口径：量用 KaTeX_Math 斜体，正体（运算符、sin、数字、括号）用 KaTeX_Main */
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const MAIN = "KaTeX_Main, 'Times New Roman', serif";
/** 图内标注统一加深色描边光晕，压在圆弧/虚线上也读得清 */
const HALO = { stroke: "#0f1425", "stroke-width": 3, "paint-order": "stroke" };

// 数学角 φ（度，y 向上、逆时针为正）→ 屏幕坐标（y 向下）。
// φ = 90° 是圆的正上方：把圆心角的角平分线取在正上方，整图就左右对称。
const onCircle = (phi) => ({ x: CX + R * Math.cos(phi * DEG), y: CY - R * Math.sin(phi * DEG) });
/** 弧的两个端点：各在角平分线两侧 α/2 处 ⟹ ∠ACB = α */
const A = onCircle(90 + ALPHA / 2);
const B = onCircle(90 - ALPHA / 2);
const C = { x: CX, y: CY };
/** 弦的中点（对称 ⟹ CM 竖直、AB 水平，CM 就是弦的垂直平分线） */
const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

const unit = (x, y) => {
  const len = Math.hypot(x, y) || 1;

  return { x: x / len, y: y / len };
};
// 从点 p 沿方向 dir 走 len
const go = (p, dir, len) => ({ x: p.x + dir.x * len, y: p.y + dir.y * len });
const num = (v) => v.toFixed(2);
const line = (p, q) => `M ${num(p.x)} ${num(p.y)} L ${num(q.x)} ${num(q.y)}`;

/** 三条辅助线的方向：C→A、C→B、弦 A→B */
const caDir = unit(A.x - CX, A.y - CY);
const cbDir = unit(B.x - CX, B.y - CY);
const chordDir = unit(B.x - A.x, B.y - A.y);
/** A 点切线：垂直于半径 CA，取指向弧外（右上）的那一侧；与弦 AB 的夹角即弦切角 α/2 */
const tanDir = { x: -caDir.y, y: caDir.x };
// r 标注的让位方向：从半径中点朝「背离圆心角」的一侧偏出去，压不到半径线上
const outward = (dir) => {
  const mid = go(C, dir, R / 2);
  const left = go(mid, { x: -dir.y, y: dir.x }, 1);
  const right = go(mid, { x: dir.y, y: -dir.x }, 1);

  return Math.abs(left.x - CX) > Math.abs(right.x - CX)
    ? { x: -dir.y, y: dir.x }
    : { x: dir.y, y: -dir.x };
};

/** 轨迹圆弧 AB：从 A 绕过正上方到 B（屏幕上是顺时针，sweep-flag = 1）——真圆弧，不是贝塞尔近似 */
const arcPath = `M ${num(A.x)} ${num(A.y)} A ${R} ${R} 0 0 1 ${num(B.x)} ${num(B.y)}`;
/** 弦 AB 与三条辅助线（两条半径 + C→M） */
const chordPath = line(A, B);
const auxPath = `${line(C, A)} ${line(C, B)} ${line(M, C)}`;
/** A 点切线：在 A 的另一侧留一小截、向弧外伸到画布上部，读起来是一条直线 */
const tanInner = go(A, tanDir, -TAN_STUB);
const tanOuter = go(A, tanDir, (A.y - TAN_TOP) / -tanDir.y);
const tangentPath = line(tanInner, tanOuter);
/** 圆心角 α 的角标圆弧（以 C 为心，从 CA 转到 CB、过正上方 ⟹ 顺时针 sweep-flag = 1） */
const alphaArcPath = `M ${num(go(C, caDir, ARC_C).x)} ${num(go(C, caDir, ARC_C).y)} A ${ARC_C} ${ARC_C} 0 0 1 ${num(
  go(C, cbDir, ARC_C).x,
)} ${num(go(C, cbDir, ARC_C).y)}`;
/** 弦切角 α/2 的角标圆弧（以 A 为心，从弦 AB 转到切线，逆时针 sweep-flag = 0） */
const halfArcPath = `M ${num(go(A, chordDir, ARC_A).x)} ${num(go(A, chordDir, ARC_A).y)} A ${ARC_A} ${ARC_A} 0 0 0 ${num(
  go(A, tanDir, ARC_A).x,
)} ${num(go(A, tanDir, ARC_A).y)}`;
/** M 处的直角标记：CM 竖直、弦水平，方角向弦的内侧（右下）画 */
const squarePath = `M ${num(M.x + SQUARE)} ${num(M.y)} L ${num(M.x + SQUARE)} ${num(M.y + SQUARE)} L ${num(M.x)} ${num(
  M.y + SQUARE,
)}`;

// 标注位置（逐个核过：彼此不重叠，也不压圆弧/半径/切线）：
// A、B 放在弧外上方；r 放在两条半径的外侧；α 放在 CM 左侧的扇形里（避开 CM 虚线）；
// α/2 放在弦与切线之间的楔形里、且比角平分线更贴弦一点（让开蓝色圆弧）。
// 关键坐标（按 352/310/240/120° 算出）：A(144.2, 190)、B(559.8, 190)、M(352, 190)、C(352, 310)；
// α 标注 (310, 237) 距 CM 虚线 42、距 CA 半径线 42；α/2 标注 (212, 170)——它左缘 x≈188 处蓝弧在
// y≈135、标注顶端约 148（留 ~13 空隙），底边距弦 15；切线从 A 右上伸到 (230.8, 40)。
const labelA = { x: A.x - 30, y: A.y - 15 };
const labelB = { x: B.x + 30, y: B.y - 15 };
const labelC = { x: CX, y: CY + 38 };
const labelM = { x: M.x + 17, y: M.y - 12 };
const labelRL = go(go(C, caDir, R / 2), outward(caDir), 24);
const labelRR = go(go(C, cbDir, R / 2), outward(cbDir), 24);
const labelAlpha = go(C, { x: Math.cos(240 * DEG), y: Math.sin(240 * DEG) }, 84);
const labelHalf = { x: 212, y: 170 };
/** 结论公式放在图底居中：弦长 ↔ 半径 ↔ 圆心角 */
const formula = { x: 352, y: 396 };
</script>

<template>
  <div
    class="flex min-h-0 w-full flex-1 items-center justify-center"
    :style="{ aspectRatio: `${W} / ${H}` }"
  >
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-auto max-w-full"
    >
      <!-- 轨迹圆弧 AB -->
      <path :d="arcPath" fill="none" stroke="#60a5fa" stroke-width="3.6" stroke-linecap="round" />
      <!-- 弦 AB -->
      <path :d="chordPath" fill="none" stroke="rgba(203,213,225,0.85)" stroke-width="2.2" />
      <!-- 两条虚线半径 + 圆心到弦中点的连线（CM ⊥ AB，平分弦） -->
      <path
        :d="auxPath"
        fill="none"
        stroke="rgba(148,163,184,0.9)"
        stroke-width="2.2"
        stroke-dasharray="9 7"
      />
      <!-- A 点切线（垂直于 CA，向弧外伸出） -->
      <path
        :d="tangentPath"
        fill="none"
        stroke="#e2a846"
        stroke-width="2.6"
        stroke-dasharray="10 7"
      />
      <!-- 圆心角 α 的角标圆弧 -->
      <path :d="alphaArcPath" fill="none" stroke="#c4b5fd" stroke-width="2.6" />
      <!-- 弦切角 α/2 的角标圆弧 -->
      <path :d="halfArcPath" fill="none" stroke="#e2a846" stroke-width="2.4" />
      <!-- M 处的直角标记 -->
      <path
        :d="squarePath"
        fill="none"
        stroke="rgba(226,232,240,0.8)"
        stroke-width="2.2"
        stroke-linejoin="round"
      />
      <!-- 入射点 A、出射点 B（在弧上）与圆心 C -->
      <circle :cx="A.x" :cy="A.y" r="5.5" fill="#bfdbfe" />
      <circle :cx="B.x" :cy="B.y" r="5.5" fill="#bfdbfe" />
      <circle :cx="CX" :cy="CY" r="5.5" fill="rgba(226,232,240,0.95)" />
      <!-- 端点与圆心标注 -->
      <text
        v-bind="HALO"
        :x="labelA.x"
        :y="labelA.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#e2e8f0"
      >
        A
      </text>
      <text
        v-bind="HALO"
        :x="labelB.x"
        :y="labelB.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#e2e8f0"
      >
        B
      </text>
      <text
        v-bind="HALO"
        :x="labelC.x"
        :y="labelC.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#e2e8f0"
      >
        C
      </text>
      <text
        v-bind="HALO"
        :x="labelM.x"
        :y="labelM.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#e2e8f0"
      >
        M
      </text>
      <!-- 两条半径都标 r（对称，暗示 CA = CB = r） -->
      <text
        v-bind="HALO"
        :x="labelRL.x"
        :y="labelRL.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#e2e8f0"
      >
        r
      </text>
      <text
        v-bind="HALO"
        :x="labelRR.x"
        :y="labelRR.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#e2e8f0"
      >
        r
      </text>
      <!-- 圆心角 α -->
      <text
        v-bind="HALO"
        :x="labelAlpha.x"
        :y="labelAlpha.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_POINT"
        fill="#c4b5fd"
      >
        α
      </text>
      <!-- 弦切角 α/2：与圆心角的 α 并排，弦切角 = 圆心角的一半 -->
      <text
        v-bind="HALO"
        :x="labelHalf.x"
        :y="labelHalf.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_ANGLE"
        fill="#e2a846"
      >
        <tspan>α</tspan>
        <tspan :font-family="MAIN" font-style="normal">/2</tspan>
      </text>
      <!-- 结论：弦长、半径与圆心角的关系（dx 控制词间空隙，不依赖空格是否被保留） -->
      <text
        v-bind="HALO"
        :x="formula.x"
        :y="formula.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS_FORMULA"
        fill="#e2e8f0"
      >
        <tspan>AB</tspan>
        <tspan dx="9" :font-family="MAIN" font-style="normal">=</tspan>
        <tspan dx="9" :font-family="MAIN" font-style="normal">2</tspan>
        <tspan>r</tspan>
        <tspan dx="9" :font-family="MAIN" font-style="normal">sin</tspan>
        <tspan :font-family="MAIN" font-style="normal">(</tspan>
        <tspan>α</tspan>
        <tspan :font-family="MAIN" font-style="normal">/2)</tspan>
      </text>
    </svg>
  </div>
</template>
