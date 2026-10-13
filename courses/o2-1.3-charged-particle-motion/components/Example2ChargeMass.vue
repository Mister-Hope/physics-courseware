<!--
  选必二 1.3《带电粒子在匀强磁场中的运动》第二课时 · 例题 2：由轨迹求比荷 q/m
  题干（Lead 写在 slides.md 的例题页上，本组件只画题目图）：
    第一象限内有垂直纸面向里、磁感应强度大小为 B 的匀强磁场。一个粒子从 y 轴上的点 (0, a) 沿 x 轴
    正半轴方向以速度 v0 射出，经过 x 轴正半轴上的点 (b, 0)。求粒子的比荷 q/m，并判断粒子带什么电。
  图上几何（屏幕坐标系：x 向右、y 向下；O = (150, 400)、viewBox 720 × 470）：
    · 作图用的像素量 a = 240、b = 160（只决定图的比例，画面上不出现任何数值）：
        A = (0, a)  →  屏幕 (150, 400 - 240) = (150, 160)
        B = (b, 0)  →  屏幕 (150 + 160, 400)  = (310, 400)
    · 起点速度沿 +x ⇒ 半径在 A 处垂直于 v0（竖直）⇒ 圆心 C 必在 y 轴上，设 C = (0, y0)：
        |CA| = a - y0 与 |CB| = √(b² + y0²) 都是半径
        ⇒ (a - y0)² = b² + y0²  ⇒  y0 = (a² - b²) / (2a) = (240² - 160²) / (2 × 240) = 32000 / 480 = 66.67
        ⇒ 屏幕 C = (150, 400 - 66.67) = (150, 333.33)，半径 r = a - y0 = 240 - 66.67 = 173.33
    · 自检：|CA| = 240 - 66.67 = 173.33 = r ✓；|CB| = √(160² + 66.67²) = √(25600 + 4444.4) = 173.33 = r ✓
    · 轨迹圆弧用 SVG 真圆弧（不是贝塞尔"看着像圆"）：`M A.x A.y A r r 0 largeArc sweep B.x B.y`
        A 相对 C 的方向角 = -90°（正上方），B 相对 C 的方向角 = +22.62°
          （cos = 160 / 173.33 = 0.9231、sin = 66.67 / 173.33 = 0.3846）
        屏幕坐标（y 向下）里角度增大 = 顺时针，A → B 顺时针扫过 112.62° < 180°
        ⇒ largeArc = 0（劣弧）、sweep = 1（顺时针）
        复核（按 SVG 规范 F.6.5 参数化）：圆心解正是 C = (150, 333.33)、扫角 112.62°、弧上各点到 C 的距离
        恒为 173.333；该弧还经过 θ = 0 的点 (C.x + r, C.y) = (323.33, 333.33)——圆的最右点，比 B 的 x = 310
        更靠右（弧向右鼓出），与"从 A 向右出发、逐渐向下弯到 B"的运动图景一致 ✓
    · 物理自检（弧朝哪边弯）：圆心在 A 的正下方 ⇒ 起点处洛伦兹力必须指向圆心（-y 方向）；而 v0 沿 +x、
      B 垂直纸面向里（⊗）⇒ 粒子带负电（结论由幻灯片给出，图上不写）。
  分步（题目页规矩：干净题干 + 干净题目图常显 → 点击后才出讲解标注）：
    showSolution = false：坐标系、⊗ 磁场区与虚线边框、A / B 两点与标注、a 与 b 的尺寸线、轨迹圆弧、
                          A 处沿 +x 的 v0 箭头；
    showSolution = true ：只新增圆心 C、虚线半径 CA 与 CB（各标 r）、C 落到 O 的虚线（标 y0）以及 O 处
                          直角标记（CO ⊥ OB，对应 b² + y0² = r²）——不移动、不改动上面任何常显元素。
-->
<script setup>
defineProps({
  /** True 才出现圆心 / 半径 / y0 / 直角这些讲解标注（slides.md 传 `:show-solution="$clicks >= 1"`） */
  showSolution: { type: Boolean, default: false },
});

/** 原点（屏幕坐标，y 向下）与两条坐标轴箭头的终点 */
const OX = 150;
const OY = 400;
const AXIS_X_END = 660;
const AXIS_Y_END = 60;

/** 作图像素量：a = OA、b = OB（图上不写数值，只用比例） */
const A_PX = 240;
const B_PX = 160;

const O = { x: OX, y: OY };
const A = { x: OX, y: OY - A_PX };
const B = { x: OX + B_PX, y: OY };

/** 圆心在 y 轴上：y0 = (a² - b²) / (2a)；半径 r = a - y0（推导见文件头注释） */
const Y0 = (A_PX * A_PX - B_PX * B_PX) / (2 * A_PX);
const C = { x: OX, y: OY - Y0 };
const R = A_PX - Y0;

/** 真圆弧 A → B：扫角 112.62° < 180° ⇒ largeArc = 0；屏幕 y 向下时顺时针 ⇒ sweep = 1 */
const ARC = `M ${A.x} ${A.y} A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 1 ${B.x} ${B.y}`;

/** 磁场区 = 第一象限（屏幕 x ≥ 150、y ≤ 400）；它的虚线边框正好以两条坐标轴为左边与下边 */
const FIELD = { x: OX, y: AXIS_Y_END, width: AXIS_X_END - OX, height: OY - AXIS_Y_END };

/** ⊗ 记号阵列：间距 55，横向 / 纵向分别匀出 35 / 32.5 的空当（区域外一个都不画） */
const MARK_STEP = 55;
const MARK_R = 7;
const MARK_ARM = MARK_R * 0.68;
const MARK_COLS = Math.floor(FIELD.width / MARK_STEP);
const MARK_ROWS = Math.floor(FIELD.height / MARK_STEP);
const MARK_PAD_X = (FIELD.width - (MARK_COLS - 1) * MARK_STEP) / 2;
const MARK_PAD_Y = (FIELD.height - (MARK_ROWS - 1) * MARK_STEP) / 2;
const MARKS = Array.from({ length: MARK_COLS * MARK_ROWS }, (_, i) => {
  const col = i % MARK_COLS;
  const row = Math.floor(i / MARK_COLS);

  return {
    key: `${col}-${row}`,
    x: FIELD.x + MARK_PAD_X + col * MARK_STEP,
    y: FIELD.y + MARK_PAD_Y + row * MARK_STEP,
  };
});

/** A 的尺寸线（竖，画在 y 轴左侧）与 b 的尺寸线（横，画在 x 轴下方） */
const DIM_A_X = 116;
const DIM_B_Y = 434;
const DIM_MID_Y = (A.y + OY) / 2;
const DIM_MID_X = (OX + B.x) / 2;

/** V0 箭头长度（从 A 沿 +x） */
const V_LEN = 72;
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 items-center justify-center">
    <svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto max-w-full">
      <!-- 磁场区：第一象限的矩形（底边与左边随后被坐标轴整条盖住，最终只见上边与右边的虚线） -->
      <rect
        :x="FIELD.x"
        :y="FIELD.y"
        :width="FIELD.width"
        :height="FIELD.height"
        fill="none"
        stroke="rgba(226,168,70,0.65)"
        stroke-width="1.6"
        stroke-dasharray="8 6"
      />
      <!-- ⊗ 记号阵列：垂直纸面向里（只在磁场区内） -->
      <g fill="none" stroke="rgba(226,168,70,0.55)" stroke-width="1.4" stroke-linecap="round">
        <template v-for="m in MARKS" :key="m.key">
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
      <!-- 坐标系 -->
      <CourseArrow :from="O" :to="{ x: AXIS_X_END, y: OY }" stroke="#94a3b8" stroke-width="2.4" />
      <CourseArrow :from="O" :to="{ x: OX, y: AXIS_Y_END }" stroke="#94a3b8" stroke-width="2.4" />
      <text
        x="670"
        y="414"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#cbd5e1"
      >
        x
      </text>
      <text
        x="162"
        y="54"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#cbd5e1"
      >
        y
      </text>
      <text
        x="139"
        y="419"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#cbd5e1"
      >
        O
      </text>
      <!-- a = OA：尺寸线在 y 轴左侧，两端箭头分别指向 A 与 O 的高度 -->
      <CourseArrow
        :from="{ x: DIM_A_X, y: DIM_MID_Y }"
        :to="{ x: DIM_A_X, y: A.y }"
        stroke="#94a3b8"
        stroke-width="2"
      />
      <CourseArrow
        :from="{ x: DIM_A_X, y: DIM_MID_Y }"
        :to="{ x: DIM_A_X, y: OY }"
        stroke="#94a3b8"
        stroke-width="2"
      />
      <text
        x="108"
        y="285"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#cbd5e1"
      >
        a
      </text>
      <!-- b = OB：尺寸线在 x 轴下方 -->
      <CourseArrow
        :from="{ x: DIM_MID_X, y: DIM_B_Y }"
        :to="{ x: OX, y: DIM_B_Y }"
        stroke="#94a3b8"
        stroke-width="2"
      />
      <CourseArrow
        :from="{ x: DIM_MID_X, y: DIM_B_Y }"
        :to="{ x: B.x, y: DIM_B_Y }"
        stroke="#94a3b8"
        stroke-width="2"
      />
      <text
        x="230"
        y="426"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#cbd5e1"
      >
        b
      </text>
      <!-- 轨迹圆弧（题目给定的两个端点之间） -->
      <path :d="ARC" fill="none" stroke="#60a5fa" stroke-width="3.2" stroke-linecap="round" />
      <!-- A、B 两点与标注 -->
      <circle :cx="A.x" :cy="A.y" r="5.5" fill="#f8fafc" />
      <circle :cx="B.x" :cy="B.y" r="5.5" fill="#f8fafc" />
      <text
        x="140"
        y="148"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#f8fafc"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        A
      </text>
      <text
        x="326"
        y="408"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#f8fafc"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        B
      </text>
      <!-- A 处沿 +x 的入射速度 v0 -->
      <CourseArrow :from="A" :to="{ x: A.x + V_LEN, y: A.y }" stroke="#60a5fa" stroke-width="4.2" />
      <text
        x="211"
        y="138"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
        stroke="#0f1425"
        stroke-width="3"
        paint-order="stroke"
      >
        v
        <tspan font-family="KaTeX_Main" font-style="normal" font-size="15" dy="5">0</tspan>
      </text>
      <!-- 讲解标注：圆心 C、半径 CA / CB、y0 与直角标记（只在这里新增，不动上面任何元素） -->
      <g v-if="showSolution">
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="A.x"
          :y2="A.y"
          stroke="#e2e8f0"
          stroke-width="2.6"
          stroke-dasharray="9 7"
        />
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="B.x"
          :y2="B.y"
          stroke="#e2e8f0"
          stroke-width="2.6"
          stroke-dasharray="9 7"
        />
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="O.x"
          :y2="O.y"
          stroke="#e2e8f0"
          stroke-width="2.6"
          stroke-dasharray="9 7"
        />
        <path
          :d="`M ${O.x} ${O.y - 18} L ${O.x + 18} ${O.y - 18} L ${O.x + 18} ${O.y}`"
          fill="none"
          stroke="rgba(226,232,240,0.5)"
          stroke-width="1.8"
        />
        <circle :cx="C.x" :cy="C.y" r="5" fill="#e2e8f0" />
        <text
          x="140"
          y="337"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#e2e8f0"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          C
        </text>
        <text
          x="137"
          y="250"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#e2e8f0"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          r
        </text>
        <text
          x="218"
          y="388"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#e2e8f0"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          r
        </text>
        <text
          x="143"
          y="377"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="20"
          fill="#e2e8f0"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          y
          <tspan font-family="KaTeX_Main" font-style="normal" font-size="14" dy="5">0</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
