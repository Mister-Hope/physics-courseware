<!--
  选必二 1.3（第二课时）· 例 3 配图：沿半径方向射入圆形匀强磁场
  ── 题干（由 slides.md 给出，本组件只画图）──
     圆形匀强磁场区域，半径 R、磁感应强度 B 垂直纸面向里；粒子从边界上的 A 点沿半径方向
     （指向圆心 O）射入。问：出射方向的反向延长线是否一定过圆心 O？
  ── 分步（题目页规矩：干净题干 + 干净题目图常显 → 点击后才出分析标注）──
     showPath = false：磁场边界圆、⊗（B 垂直纸面向里）、圆心 O、入射点 A、半径线 OA（虚线）、
                       入射速度 v（从 A 沿 AO 指向圆心）——这些都是"题目已给"的，常显；
     showPath = true ：第 1 次点击 → 画出轨迹圆弧 A→M（M 为出射点）；
     showAux  = true ：第 2 次点击 → 轨迹圆心 C、两条虚线半径 CA / CM（各标 r）、A 与 M 处的
                       直角标记（∠OAC = ∠OMC = 90°）；
     showOut  = true ：第 3 次点击 → 出射速度 v′（从 M 沿 OM 向外）+ 反向延长线（过 O 的虚线）
                       + 落点标记。
  ── 几何（全部按 viewBox 用户单位，可用公式复核）──
     O = (330, 250)、R = 150；取 r = 0.8R = 120（图上只写符号 r、R，不写数值）。
     A = 圆的最高点 = (330, 100)；v 竖直向下；AC ⊥ AO ⟹ C 在过 A 的水平线上，取 C = A + r·(1, 0)
       （由洛伦兹力方向定：B 垂直纸面向里、粒子带正电时 C 在 A 的右侧）。
     M = A 关于直线 OC 的镜像（四边形 OACM 关于 OC 对称），即出射点：
       O→C 的方向 = (120, −150)/192.09；A 在 OC 上的投影 = O + 117.09 × (0.6247, −0.7809)
       = (403.2, 158.6) ⟹ M = 2×(403.2, 158.6) − A = (476.4, 217.2)。
       自洽复核：|OM| = √(146.4² + 32.8²) = 150.0 = R ✓；|CM| = √(26.4² + 117.2²) = 120.1 = r ✓。
     轨迹弧 A→M：以 C 为心、r 为半径；圆心角 ∠ACM = 180° − ∠AOM = 180° − 2·atan(r/R) ≈ 102.7°
       （< 180° ⟹ large-arc = 0）。屏幕坐标（y 向下）里 A 相对 C 的方向角为 180°、M 为 77.3°，
       转角是"角度减小" = 逆时针 ⟹ sweep-flag = 0。
     ∠OAC = 90°（v ⊥ AO、洛伦兹力 ⊥ v ⟹ AC ⊥ AO）；∠OMC = ∠OAC = 90°（关于 OC 对称）⟹ OM ⊥ CM；
       而 v′ ⊥ CM ⟹ v′ 沿 OM 方向 ⟹ 反向延长线必过圆心 O ✓
-->
<script setup>
defineProps({
  /** 第 1 次点击：画出轨迹圆弧 */
  showPath: { type: Boolean, default: false },
  /** 第 2 次点击：圆心 C、半径 CA/CM、A 与 M 处的直角标记 */
  showAux: { type: Boolean, default: false },
  /** 第 3 次点击：出射速度 v′ 与反向延长线 */
  showOut: { type: Boolean, default: false },
});

/** 画布：viewBox 直接取「图形外接范围 + 一点余量」，不留大片空白， 这样放进窄栏（页 15 右栏只占 1/4 宽）时，圆还能画得足够大。 （容器 aspect-ratio 与它保持一致） */
const VB = { x: 170, y: 48, w: 386, h: 360 };

/** 磁场圆：圆心 O、半径 R（图上只写符号，不写数值） */
const O = { x: 330, y: 250 };
const R = 150;
/** 轨道半径 r = 0.8R：取一个"一般"的比值，免得学生以为 r 必须等于 R */
const RATIO = 0.8;
const r = R * RATIO;
/** A：入射点，取圆的最高点；入射速度沿 AO（竖直向下） */
const A = { x: O.x, y: O.y - R };
/** C：轨道圆心。v ⊥ AO ⟹ 半径 AC ⊥ AO ⟹ C 落在过 A 的水平线上 */
const C = { x: A.x + r, y: A.y };

/**
 * 点 P 关于直线 Q1Q2 的镜像
 *
 * @param P 被镜像的点
 * @param Q1 直线上一点
 * @param Q2 直线上另一点
 * @returns 镜像点
 */
const reflect = (P, Q1, Q2) => {
  const dx = Q2.x - Q1.x;
  const dy = Q2.y - Q1.y;
  const len2 = dx * dx + dy * dy || 1;
  const t = ((P.x - Q1.x) * dx + (P.y - Q1.y) * dy) / len2;
  const fx = Q1.x + t * dx;
  const fy = Q1.y + t * dy;

  return { x: 2 * fx - P.x, y: 2 * fy - P.y };
};

/** M：出射点 = A 关于 OC 的镜像（四边形 OACM 关于 OC 对称） */
const M = reflect(A, O, C);

/**
 * 单位向量（from → to）
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

const num = (v) => v.toFixed(2);
/**
 * 从 p 沿 dir 走 len
 *
 * @param p 起点
 * @param dir 单位方向
 * @param len 走的距离
 * @returns 终点坐标
 */
const go = (p, dir, len) => ({ x: p.x + dir.x * len, y: p.y + dir.y * len });

/** 轨迹圆弧 A→M：真圆弧（不是贝塞尔近似），sweep-flag = 0（屏幕上逆时针） */
const arcPath = `M ${num(A.x)} ${num(A.y)} A ${r} ${r} 0 0 0 ${num(M.x)} ${num(M.y)}`;
/** 两条虚线半径 */
const radiiPath = `M ${num(C.x)} ${num(C.y)} L ${num(A.x)} ${num(A.y)} M ${num(C.x)} ${num(C.y)} L ${num(M.x)} ${num(M.y)}`;
/** 题目给定的半径线 AO（虚线） */
const aoPath = `M ${num(A.x)} ${num(A.y)} L ${num(O.x)} ${num(O.y)}`;

/**
 * 直角标记（∠P = dir1 与 dir2 之间的角）
 *
 * @param P 角的顶点
 * @param dir1 一条边的单位方向
 * @param dir2 另一条边的单位方向
 * @param size 方角边长
 * @returns 折线路径
 */
const rightAngle = (P, dir1, dir2, size) => {
  const p1 = go(P, dir1, size);
  const p3 = go(P, dir2, size);
  const p2 = { x: p1.x + dir2.x * size, y: p1.y + dir2.y * size };

  return `M ${num(p1.x)} ${num(p1.y)} L ${num(p2.x)} ${num(p2.y)} L ${num(p3.x)} ${num(p3.y)}`;
};

/** A 处直角（AC 与 AO 之间）、M 处直角（CM 与 MO 之间） */
const rightA = rightAngle(A, unit(A, C), unit(A, O), 17);
const rightM = rightAngle(M, unit(M, C), unit(M, O), 17);

/** 入射速度 v：从 A 沿 AO（竖直向下），只画到圆心之前 */
const vIn = { from: A, to: go(A, unit(A, O), 58) };
/** 出射速度 v′：从 M 沿 OM 向外 */
const vOutDir = unit(O, M);
const vOut = { from: M, to: go(M, vOutDir, 62) };
/** 反向延长线：从 M 穿过 O 再伸出一点（出射方向的反向延长线过 O） */
const extendPath = `M ${num(M.x)} ${num(M.y)} L ${num(go(O, unit(M, O), 34).x)} ${num(go(O, unit(M, O), 34).y)}`;

/** 磁场 ⊗ 阵列（间距 66、整体错开 33：不让任何一个 ⊗ 压在竖直的半径线 OA 上） */
const MARK_R = 7.5;
const MARK_ARM = 5.3;
const MARK_STEP = 66;
const MARKS = [];
for (let gx = -2; gx <= 2; gx += 1) {
  for (let gy = -2; gy <= 2; gy += 1) {
    const x = O.x + 33 + gx * MARK_STEP;
    const y = O.y + gy * MARK_STEP;

    if (Math.hypot(x - O.x, y - O.y) <= R - 30) MARKS.push({ x, y });
  }
}

/** 图内字号（viewBox 用户单位）与统一深色光晕 */
const FS = 27;
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };

/** 标注位置（逐个核过，彼此不重叠、也不压线） */
const labelA = { x: A.x - 34, y: A.y - 16 };
const labelO = { x: O.x - 18, y: O.y + 30 };
const labelM = { x: M.x + 12, y: M.y + 28 };
const labelC = { x: C.x + 12, y: C.y + 34 };
const labelV = { x: vIn.to.x + 20, y: vIn.to.y + 2 };
const labelVOut = { x: vOut.to.x - 14, y: vOut.to.y - 18 };
/** 两条半径的 r 标注：从半径中点朝背离质心的一侧偏出去 */
const labelR1 = { x: (C.x + A.x) / 2 + 6, y: (C.y + A.y) / 2 + 28 };
const labelR2 = { x: (C.x + M.x) / 2 + 26, y: (C.y + M.y) / 2 - 6 };
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
      <!-- 磁场区域：边界圆 + ⊗（垂直纸面向里）阵列 -->
      <circle
        :cx="O.x"
        :cy="O.y"
        :r="R"
        fill="color-mix(in srgb, var(--c-accent) 6%, transparent)"
        stroke="color-mix(in srgb, var(--c-accent) 65%, transparent)"
        stroke-width="2.2"
      />
      <g fill="none" stroke="color-mix(in srgb, var(--c-accent) 50%, transparent)" stroke-width="1.4" stroke-linecap="round">
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
      <!-- 题目给定的半径线 AO（虚线）与入射速度 -->
      <path
        :d="aoPath"
        fill="none"
        stroke="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)"
        stroke-width="1.8"
        stroke-dasharray="8 7"
      />
      <CourseArrow
        :from="vIn.from"
        :to="vIn.to"
        stroke="var(--c-velocity)"
        stroke-width="3.6"
        stroke-linecap="round"
      />
      <text
        v-bind="HALO"
        :x="labelV.x"
        :y="labelV.y"
        text-anchor="middle"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-velocity)"
      >
        v
      </text>
      <!-- 圆心 O、入射点 A -->
      <circle :cx="O.x" :cy="O.y" r="4.5" fill="var(--c-neutral-300)" />
      <text
        v-bind="HALO"
        :x="labelO.x"
        :y="labelO.y"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-neutral-50)"
      >
        O
      </text>
      <circle :cx="A.x" :cy="A.y" r="6" fill="var(--c-neutral-50)" />
      <text
        v-bind="HALO"
        :x="labelA.x"
        :y="labelA.y"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-neutral-50)"
      >
        A
      </text>
      <!-- 第 1 次点击：轨迹圆弧 -->
      <template v-if="showPath">
        <path :d="arcPath" fill="none" stroke="var(--c-velocity)" stroke-width="3.6" stroke-linecap="round" />
        <circle :cx="M.x" :cy="M.y" r="6" fill="var(--c-neutral-50)" />
        <text
          v-bind="HALO"
          :x="labelM.x"
          :y="labelM.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-neutral-50)"
        >
          M
        </text>
      </template>
      <!-- 第 2 次点击：圆心 C、半径 CA/CM、A 与 M 处的直角标记 -->
      <template v-if="showAux">
        <path
          :d="radiiPath"
          fill="none"
          stroke="color-mix(in srgb, var(--c-accent) 90%, transparent)"
          stroke-width="1.9"
          stroke-dasharray="8 7"
        />
        <path :d="rightA" fill="none" stroke="color-mix(in srgb, var(--c-text) 90%, transparent)" stroke-width="2" />
        <path :d="rightM" fill="none" stroke="color-mix(in srgb, var(--c-text) 90%, transparent)" stroke-width="2" />
        <circle :cx="C.x" :cy="C.y" r="5.5" fill="var(--c-neutral-50)" />
        <text
          v-bind="HALO"
          :x="labelC.x"
          :y="labelC.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-neutral-50)"
        >
          C
        </text>
        <text
          v-bind="HALO"
          :x="labelR1.x"
          :y="labelR1.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS - 3"
          fill="var(--c-accent)"
        >
          r
        </text>
        <text
          v-bind="HALO"
          :x="labelR2.x"
          :y="labelR2.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS - 3"
          fill="var(--c-accent)"
        >
          r
        </text>
      </template>
      <!-- 第 3 次点击：出射速度 v′ 与它的反向延长线（过圆心 O） -->
      <template v-if="showOut">
        <path
          :d="extendPath"
          fill="none"
          stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)"
          stroke-width="2"
          stroke-dasharray="9 8"
        />
        <CourseArrow
          :from="vOut.from"
          :to="vOut.to"
          stroke="var(--c-velocity)"
          stroke-width="4"
          stroke-linecap="round"
        />
        <text
          v-bind="HALO"
          :x="labelVOut.x"
          :y="labelVOut.y"
          text-anchor="middle"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-velocity)"
        >
          v′
        </text>
      </template>
      <!-- 半径 R 标注（题目已给，常显）：贴在半径线 OA 中段的左侧 -->
      <text
        v-bind="HALO"
        x="310"
        y="196"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS - 3"
        fill="var(--c-neutral-300)"
      >
        R
      </text>
    </svg>
  </div>
</template>
