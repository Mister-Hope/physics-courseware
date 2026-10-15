<!--
  第二课时 · 例题一配图：带电粒子在匀强磁场中偏转（求 B）
  ── 题干（由 slides.md 给出，本组件只画图）──
     一个带负电的粒子，比荷 q/m，从坐标原点 O 沿 x 轴正半轴方向以速度 v_0 射入，
     磁场垂直纸面向里。粒子经过第四象限内的点 P，OP 与 y 轴夹角为 θ，OP = L。求磁感应强度 B。
  ── 第一眼（showPath = showSolution = false）只有"干净题目图" ──
     坐标系（O、x、y）、⊗ 阵列（B 垂直纸面向里）、P 点与标注、OP（细虚线）、
     L 标注（弦 OP 外侧、中点附近）、O 处的 θ 角弧（下半 y 轴方向与 OP 之间）、入射速度 v_0（蓝，沿 +x）。
     注意：轨迹圆弧不给——学生要先自己判出偏转方向、画出轨迹，才有后续几何。
  ── 第 1 次点击（showPath = true）才画出蓝色轨迹圆弧 ──
  ── 第 2 次点击（showSolution = true）才新增讲解标注 ──
     圆心 C（点 + 标注）、虚线半径 CO 与 CP（标 r）、OP 中点 M（点 + 标注）、
     CM 虚线 + M 处直角标记（CM ⊥ OP）、C 处圆心角小弧。
     这些标注在 false 时根本不存在（都包在同一个 v-if 里），所以切换不会顶跑任何已有元素。
  ── 几何来源（全部按 viewBox 用户单位算，Lead 可核验）──
     O = (170, 200)；C = (170, 320)（在 O 正下方 120）；R = 120；
     x 轴 O → (660, 200)（箭头），y 轴 (170, 430) → (170, 45)（顶端箭头），viewBox 720×430。
     为什么 C 在 O 正下方：负电粒子（q < 0）、B 垂直纸面向里（−z），F = q v × B；
       v 沿 +x ⟹ v × B 沿 +y，乘上 q < 0 后 F 沿 −y（屏幕里向下）；圆心在洛伦兹力指向的一侧，
       且入射处半径 ⊥ 切线 v_0（切线沿 +x）⟹ 半径竖直 ⟹ C 在 O 正下方 120 处。
     轨迹圆参数式：(x, y) = (C.x + R sinφ, C.y − R cosφ)。
       φ = 0 → (170, 200) = O；d/dφ = (R cosφ, R sinφ)，在 φ = 0 处为 (+R, 0) ⟹ 切线严格沿 +x ✓。
     弦切角关系：切线 +x 与弦 OP 的夹角 = 90° − θ，它等于弦 OP 所对的圆周角 = ½∠OCP
       ⟹ ∠OCP = 2(90° − θ) = 180° − 2θ = 120°（θ = 30°），也就是参数 φ_end = 120°。
     P = (170 + 120 sin120°, 320 − 120 cos120°) = (170 + 60√3, 380) ≈ (273.92, 380)，落在第四象限 ✓。
     自洽复核：|OP| = √((60√3)² + 180²) = √43200 = 120√3 = √3 R；
       又 △OCP 等腰、CM ⊥ OP 平分 OP，OM = R cosθ ⟹ |OP| = 2R cosθ ⟹ R = L/(2cosθ) = L/√3（θ = 30°），
       与 |OP| = √3 R 互相印证 ✓。
     M = OP 中点 ≈ (221.96, 290)；CM ⊥ OP 复核：CM·OP = (51.96)(103.92) + (−30)(180) ≈ 0 ✓；
       OM = |OP|/2 = 103.92 = R cosθ ⟹ cosθ = OM/R，即 R = L/(2cosθ)。
     轨迹是 SVG 真圆弧（A 命令，不是贝塞尔"看着像圆"）：M 170 200 A 120 120 0 0 1 273.92 380
       —— 从圆心角 −90° 扫到 +30°（圆心角 120° < 180° ⟹ large-arc = 0、sweep = 1，屏幕上顺时针）。
  ── 图上不写任何数值刻度或数值答案（只有符号）──
-->
<script setup>
defineProps({
  /** 是否画出蓝色轨迹圆弧：例题页写 :show-path="$clicks >= 1"（学生先自己判方向、画轨迹） */
  showPath: { type: Boolean, default: false },
  /** 是否显示讲解标注（圆心 / 半径 / 中点 / 直角）：例题页写 :show-solution="$clicks >= 2" */
  showSolution: { type: Boolean, default: false },
});

const DEG = Math.PI / 180;

/** 入射点 O（也是坐标原点） */
const O = { x: 170, y: 200 };
/** 圆心 C：在 O 正下方（负电 + B 向里 ⟹ F 向下） */
const C = { x: 170, y: 320 };
/** 轨迹半径（viewBox 用户单位） */
const R = 120;
/** 出射点参数角 φ_end = 180° − 2θ = 120°（题给 θ = 30°） */
const PHI_END = 120 * DEG;

/**
 * 轨迹圆参数式：(x, y) = (C.x + R sinφ, C.y − R cosφ)
 *
 * φ = 0 正是 O，且切线沿 +x（v_0 方向）；φ 增大沿弧向 P。
 *
 * @param phi 参数角（弧度）
 * @returns 该参数角对应的屏幕坐标点
 */
const onCircle = (phi) => ({ x: C.x + R * Math.sin(phi), y: C.y - R * Math.cos(phi) });

/** 出射点 P = (170 + 60√3, 380) ≈ (273.92, 380) */
const P = onCircle(PHI_END);
/** OP 的中点 M ≈ (221.96, 290)：等腰三角形 OCP 中 CM ⊥ OP、平分 OP */
const M = { x: (O.x + P.x) / 2, y: (O.y + P.y) / 2 };

/**
 * 单位向量（from → to）：直角标记与标注偏移都用它
 *
 * @param from 起点
 * @param to 终点
 * @returns 由 from 指向 to 的单位向量
 */
const unit = (from, to) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: dx / len, y: dy / len };
};

/** 轨迹圆弧（真圆弧）：起点 O、终点 P，圆心角 120° ⟹ large-arc = 0、sweep = 1 */
const arcPath = `M ${O.x} ${O.y} A ${R} ${R} 0 0 1 ${P.x.toFixed(2)} ${P.y.toFixed(2)}`;

/** O 处 θ 角弧（半径 44）：从 OP 方向（自 +x 轴向屏幕下方量 60°）扫到向下的 y 轴方向（90°），正好 θ = 30° */
const THETA_R = 44;
const thetaArcPath = `M ${(O.x + THETA_R * Math.cos(60 * DEG)).toFixed(2)} ${(O.y + THETA_R * Math.sin(60 * DEG)).toFixed(2)} A ${THETA_R} ${THETA_R} 0 0 1 ${O.x} ${O.y + THETA_R}`;
/** θ 标注：放在角平分线（75°）上、圆弧外侧；半径取 58 才与两条射线各留出约 15 的净空 */
const THETA_LABEL_R = 58;
const thetaLabel = {
  x: O.x + THETA_LABEL_R * Math.cos(75 * DEG),
  y: O.y + THETA_LABEL_R * Math.sin(75 * DEG),
};

/**
 * L 标注：贴在弦 OP 的外侧（背离圆心 C 的一侧）
 *
 * —— CM 是 OP 的垂直平分线、正好过中点，所以"标在中点旁"会被 CM 压住： 沿 OP 挪到 0.34 处（离 CM 线约 33）再垂直外移 24。
 */
const L_AT = 0.34;
const L_OFF = 24;
const opDir = unit(O, P);
const lLabel = {
  x: O.x + L_AT * (P.x - O.x) + L_OFF * opDir.y,
  y: O.y + L_AT * (P.y - O.y) - L_OFF * opDir.x,
};

/** 半径标注（符号 r）：贴在虚线半径 CO、CP 中段的外侧，避开 CM、OP 与 θ 标注 */
const uCP = unit(C, P);
const rCoLabel = { x: C.x - 20, y: (C.y + O.y) / 2 };
const rCpLabel = {
  x: (C.x + P.x) / 2 - 20 * uCP.y,
  y: (C.y + P.y) / 2 + 20 * uCP.x,
};

/** M 处直角标记：沿 MC 与 MP 两个方向各取 11，画出角内的小方框 */
const RA = 11;
const uMC = unit(M, C);
const uMP = unit(M, P);
const ra1 = { x: M.x + RA * uMC.x, y: M.y + RA * uMC.y };
const ra2 = { x: ra1.x + RA * uMP.x, y: ra1.y + RA * uMP.y };
const ra3 = { x: M.x + RA * uMP.x, y: M.y + RA * uMP.y };
const rightAnglePath = `M ${ra1.x.toFixed(1)} ${ra1.y.toFixed(1)} L ${ra2.x.toFixed(1)} ${ra2.y.toFixed(1)} L ${ra3.x.toFixed(1)} ${ra3.y.toFixed(1)}`;

/** C 处圆心角小弧（半径 34）：从 CO 方向（−90°）扫到 CP 方向（+30°），即 ∠OCP = 180° − 2θ = 120° */
const CENTRAL_R = 34;
const centralArcPath = `M ${C.x} ${C.y - CENTRAL_R} A ${CENTRAL_R} ${CENTRAL_R} 0 0 1 ${(C.x + CENTRAL_R * Math.cos(30 * DEG)).toFixed(2)} ${(C.y + CENTRAL_R * Math.sin(30 * DEG)).toFixed(2)}`;

/** 磁场 ⊗ 阵列（背景层）：间距 110（≈ 满格的 1/4），铺满画面又不糊住图形 */
const B_DOT_R = 8;
/** × 的两端：r/√2 ≈ 5.66，正好落在圆上 */
const B_DOT_OFF = 5.66;
const B_COLS = Array.from({ length: 7 }, (_, i) => 30 + i * 110);
const B_ROWS = Array.from({ length: 4 }, (_, i) => 45 + i * 110);
const B_DOTS = B_COLS.flatMap((x) => B_ROWS.map((y) => ({ x, y })));

/** 数学标注的深色描边光晕（压在 ⊗ 阵列或线上也看得清） */
const HALO = { stroke: "#0f1425", "stroke-width": "4", "paint-order": "stroke" };
</script>

<template>
  <div class="flex min-h-0 w-full flex-1 items-center justify-center">
    <svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto max-w-full">
      <!-- 磁场：⊗（垂直纸面向里）阵列（间距 110），暖金半透明（背景层） -->
      <g
        stroke="color-mix(in srgb, var(--c-accent) 55%, transparent)"
        stroke-width="1.4"
        fill="none"
      >
        <template v-for="(d, i) in B_DOTS" :key="`b${i}`">
          <circle :cx="d.x" :cy="d.y" :r="B_DOT_R" />
          <line
            :x1="d.x - B_DOT_OFF"
            :y1="d.y - B_DOT_OFF"
            :x2="d.x + B_DOT_OFF"
            :y2="d.y + B_DOT_OFF"
          />
          <line
            :x1="d.x + B_DOT_OFF"
            :y1="d.y - B_DOT_OFF"
            :x2="d.x - B_DOT_OFF"
            :y2="d.y + B_DOT_OFF"
          />
        </template>
      </g>
      <!-- 坐标系：y 轴整条竖线（顶端箭头）+ x 轴 -->
      <CourseArrow
        :from="{ x: O.x, y: 430 }"
        :to="{ x: O.x, y: 45 }"
        stroke="color-mix(in srgb, var(--c-neutral-300) 80%, transparent)"
        stroke-width="2"
      />
      <CourseArrow
        :from="O"
        :to="{ x: 660, y: O.y }"
        stroke="color-mix(in srgb, var(--c-neutral-300) 80%, transparent)"
        stroke-width="2"
      />
      <text
        v-bind="HALO"
        x="186"
        y="44"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="var(--c-neutral-200)"
      >
        y
      </text>
      <text
        v-bind="HALO"
        x="668"
        y="212"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="var(--c-neutral-200)"
      >
        x
      </text>
      <text
        v-bind="HALO"
        x="156"
        y="224"
        text-anchor="end"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="var(--c-neutral-50)"
      >
        O
      </text>
      <!-- 轨迹圆弧：真圆弧 A，从 O（切线沿 +x）扫到 P（第 1 次点击才出现） -->
      <path
        v-if="showPath"
        :d="arcPath"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <!-- OP：题目给定的弦（细虚线）+ L 标注 -->
      <line
        :x1="O.x"
        :y1="O.y"
        :x2="P.x"
        :y2="P.y"
        stroke="color-mix(in srgb, var(--c-neutral-300) 60%, transparent)"
        stroke-width="1.6"
        stroke-dasharray="7 6"
      />
      <text
        v-bind="HALO"
        :x="lLabel.x"
        :y="lLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="var(--c-neutral-200)"
      >
        L
      </text>
      <!-- P 点与标注 -->
      <circle :cx="P.x" :cy="P.y" r="6" fill="var(--c-neutral-50)" />
      <text
        v-bind="HALO"
        :x="P.x + 16"
        :y="P.y + 8"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="var(--c-neutral-50)"
      >
        P
      </text>
      <!-- O 处的 θ 角弧：下半 y 轴方向与 OP 之间（CO 正沿下半 y 轴，故 θ 也就是 △OMC 在 O 处的角） -->
      <path :d="thetaArcPath" fill="none" stroke="var(--c-accent)" stroke-width="2.2" />
      <text
        v-bind="HALO"
        :x="thetaLabel.x"
        :y="thetaLabel.y"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="var(--c-accent)"
      >
        θ
      </text>
      <!-- 入射速度 v_0：从 O 沿 +x（与 x 轴重合的那一段用蓝色加粗箭头压出来） -->
      <CourseArrow
        :from="O"
        :to="{ x: 262, y: O.y }"
        stroke="var(--c-velocity)"
        stroke-width="3.4"
      />
      <text
        v-bind="HALO"
        x="216"
        y="184"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="22"
        fill="var(--c-velocity)"
      >
        <tspan>v</tspan>
        <tspan dy="5" font-size="15">0</tspan>
      </text>
      <!-- ===== 以下都是点击后才新增的讲解标注（false 时完全不存在，不影响任何已有元素的位置）===== -->
      <g v-if="showSolution">
        <!-- 圆心 C 与虚线半径 CO、CP（标 r） -->
        <circle :cx="C.x" :cy="C.y" r="6" fill="var(--c-neutral-50)" />
        <text
          v-bind="HALO"
          :x="C.x - 18"
          :y="C.y + 22"
          text-anchor="end"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-neutral-50)"
        >
          C
        </text>
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="O.x"
          :y2="O.y"
          stroke="color-mix(in srgb, var(--c-accent) 90%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="P.x"
          :y2="P.y"
          stroke="color-mix(in srgb, var(--c-accent) 90%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <text
          v-bind="HALO"
          :x="rCoLabel.x"
          :y="rCoLabel.y"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="var(--c-accent)"
        >
          r
        </text>
        <text
          v-bind="HALO"
          :x="rCpLabel.x"
          :y="rCpLabel.y"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="22"
          fill="var(--c-accent)"
        >
          r
        </text>
        <!-- C 处圆心角小弧（∠OCP = 180° − 2θ，只示意、不标数值） -->
        <path
          :d="centralArcPath"
          fill="none"
          stroke="color-mix(in srgb, var(--c-accent) 75%, transparent)"
          stroke-width="1.8"
        />
        <!-- OP 的中点 M + CM 虚线 + M 处直角标记（CM ⊥ OP） -->
        <circle :cx="M.x" :cy="M.y" r="5" fill="var(--c-neutral-50)" />
        <text
          v-bind="HALO"
          :x="M.x + 12"
          :y="M.y - 8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="24"
          fill="var(--c-neutral-50)"
        >
          M
        </text>
        <line
          :x1="C.x"
          :y1="C.y"
          :x2="M.x"
          :y2="M.y"
          stroke="color-mix(in srgb, var(--c-velocity) 90%, transparent)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <path
          :d="rightAnglePath"
          fill="none"
          stroke="color-mix(in srgb, var(--c-text) 85%, transparent)"
          stroke-width="1.8"
        />
      </g>
    </svg>
  </div>
</template>
