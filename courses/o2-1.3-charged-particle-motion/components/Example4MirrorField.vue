<!--
  选必二 1.3（第二课时）· 例 4 配图：圆形磁场之外再加一层「方向相反」的匀强磁场
  ── 题干（由 slides.md 给出，本组件只画图）──
     接例 3：圆形匀强磁场区域（半径 R、磁感应强度 B 垂直纸面向里，画 ⊗）。区域外是方向相反
     的匀强磁场（画 ⊙）——**【题中不限定它的大小】**。粒子从边界上的 A 点沿半径方向（指向圆心 O）
     射入，问：它射出后沿着怎样的轨迹走？还会再次沿半径方向射回圆心吗？
  ── 关键结论（本图要呈现的）──
     不需要"圆外磁场与圆内一样大"：只要方向相反，粒子**一定会**回到边界上、并且速度正好
     沿半径指向圆心 O。理由在图上就是两个直角：
       例 3 已证 OM ⊥ CM（M 为出射点）；而 v′ 沿 OM ⟹ 圆外轨迹圆的圆心 C′ 也落在
         「过 M 且垂直于 OM」的那条直线上 ⟹ C、M、C′ 共线；
       把 M 关于直线 OC′ 作镜像得 N：O 在镜像轴上 ⟹ |ON| = |OM| = R ⟹ N 也在边界上；
       镜像不改角度 ⟹ ∠ONC′ = ∠OMC′ = 90° ⟹ 速度 ⊥ C′N ⟹ 速度沿 ON ⟹ **指向 O**。
  ── 分步 ——
     showInner=false：边界圆 + ⊗（圆内）+ ⊙（圆外）+ 圆心 O + 射入点 A + 半径线 OA（虚线）
                      + 入射速度 v（从 A 指向 O）——题目已给，常显；
     showInner=true ：第 1 次点击 → 内部的轨迹弧 A→M（M 为射出点）+ 出射速度 v′（沿 OM 向外）；
     showOuter=true ：第 2 次点击 → 圆外的轨迹弧 M→N + 对称轴 OC′（细虚线）+ 交点 N；
     showBack =true ：第 3 次点击 → N 处的速度 v″（沿 NO、又指向圆心 O）。
  ── 几何（全部按 viewBox 用户单位，可由公式复核）──
     O = (330, 250)、R = 150；r = 0.8R = 120（图上只写符号）。
     A = 圆的最高点 (330, 100)；C = (450, 100)（AC ⊥ AO）；M = A 关于 OC 的镜像 = (476.34, 217.07)
       （复核：|OM| = 150.0 = R ✓、|CM| = 120.0 = r ✓）。
     圆外轨迹：半径 r′ = 0.6r = 72 —— **特意取 r′ ≠ r**，说明圆外磁场大小与圆内无关。
       圆心 C′ 在「过 M 且垂直于 OM」的直线上、离 M 为 r′：单位向量 w = unit(C→M) = (0.2194, 0.9756)
       （即 M − C 的方向）⟹ C′ = M + r′w = (492.14, 287.31)（复核 |OC′| = √(R² + r′²) = 166.4 ✓）。
       N = M 关于直线 OC′ 的镜像 ≈ (447.26, 343.53)；复核 |ON| = 150.0 = R ✓、∠ONC′ = 90° ✓。
     圆外那段弧 M→N：圆心角 ≈ 231.3°（> 180° ⟹ large-arc = 1），屏幕上顺时针 ⟹ sweep-flag = 1
       （它从 M 绕过右侧再回到 N，全程都在磁场区域之外 ✓）。
-->
<script setup>
defineProps({
  /** 第 1 次点击：内部轨迹弧 A→M 与出射速度 */
  showInner: { type: Boolean, default: false },
  /** 第 2 次点击：圆外的轨迹弧 M→N、对称轴与交点 N */
  showOuter: { type: Boolean, default: false },
  /** 第 3 次点击：N 处的速度（又指向圆心） */
  showBack: { type: Boolean, default: false },
});

/** 画布：viewBox 直接取「图形外接范围 + 一点余量」，不留大片空白 （容器 aspect-ratio 与它保持一致） */
const VB = { x: 168, y: 46, w: 414, h: 366 };

/** 磁场圆：圆心 O、半径 R；圆内 ⊗、圆外 ⊙ */
const O = { x: 330, y: 250 };
const R = 150;
/** 内部轨道半径 r = 0.8R；射入点 A 取圆的最高点 */
const r = 0.8 * R;
const A = { x: O.x, y: O.y - R };
/** C：内部轨迹圆心（AC ⊥ AO，取洛伦兹力指向的一侧） */
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

/** M：射出点 = A 关于 OC 的镜像（例 3 的几何） */
const M = reflect(A, O, C);

const num = (v) => v.toFixed(2);
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
const go = (p, dir, len) => ({ x: p.x + dir.x * len, y: p.y + dir.y * len });

/** 圆外轨道：r′ = 0.6r（与圆内无关）；圆心 C′ 在过 M 且垂直于 OM 的直线上（w = unit(C→M)） */
const w = unit(C, M);
const rOut = 0.6 * r;
const COuter = go(M, w, rOut);
/** N：再次射回磁场的点 = M 关于直线 OC′ 的镜像；O 在镜像轴上 ⟹ N 也在边界上 */
const N = reflect(M, O, COuter);

/** 内部弧 A→M：逆时针、劣弧；圆外弧 M→N：顺时针、优弧 */
const innerArc = `M ${num(A.x)} ${num(A.y)} A ${r} ${r} 0 0 0 ${num(M.x)} ${num(M.y)}`;
const outerArc = `M ${num(M.x)} ${num(M.y)} A ${num(rOut)} ${num(rOut)} 0 1 1 ${num(N.x)} ${num(N.y)}`;
/** 题目给定：半径线 AO（虚线） */
const aoPath = `M ${num(A.x)} ${num(A.y)} L ${num(O.x)} ${num(O.y)}`;
/** 对称轴：直线 OC′ 向两端各伸出一截（细虚线；M、N 关于它对称） */
const axisPath = `M ${num(go(O, unit(COuter, O), 44).x)} ${num(go(O, unit(COuter, O), 44).y)} L ${num(go(COuter, unit(O, COuter), 96).x)} ${num(go(COuter, unit(O, COuter), 96).y)}`;
/** 三个速度箭头：入射 v（A → O）、出射 v′（M 向外）、再次射回 v″（N → O） */
const vIn = { from: A, to: go(A, unit(A, O), 52) };
const vOut = { from: M, to: go(M, unit(O, M), 50) };
const vBack = { from: N, to: go(N, unit(N, O), 52) };

/** 圆内 ⊗ 阵列（间距 74、整体错开 37：不让 ⊗ 压在竖直的半径线 OA 上） */
const IN_MARK_R = 7;
const IN_MARK_ARM = 5;
const IN_STEP = 74;
const IN_MARKS = [];
for (let gx = -1; gx <= 1; gx += 1) {
  for (let gy = -1; gy <= 1; gy += 1) {
    const x = O.x + 37 + gx * IN_STEP;
    const y = O.y + gy * IN_STEP;

    if (Math.hypot(x - O.x, y - O.y) <= R - 44) IN_MARKS.push({ x, y });
  }
}

/** 圆外 ⊙ 阵列：铺满画面、只保留离边界足够远、且不落在右下方那块代价（留给轨迹）的 */
const OUT_MARKS = [];
for (let gx = 0; gx <= 9; gx += 1) {
  for (let gy = 0; gy <= 6; gy += 1) {
    const x = VB.x + 34 + gx * 74;
    const y = VB.y + 46 + gy * 74;

    if (Math.hypot(x - O.x, y - O.y) >= R + 40 && x < VB.x + VB.w - 14 && y < VB.y + VB.h - 14)
      OUT_MARKS.push({ x, y });
  }
}

/** 图内字号与统一深色光晕（中文用系统字体，KaTeX 字体没有汉字字形） */
const FS = 25;
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const CJK = "system-ui, -apple-system, 'PingFang SC', sans-serif";
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };

/** 标注位置 */
const labelA = { x: A.x - 34, y: A.y - 14 };
const labelO = { x: O.x - 20, y: O.y + 28 };
const labelM = { x: M.x + 12, y: M.y - 18 };
const labelN = { x: N.x - 34, y: N.y + 30 };
const labelV = { x: vIn.to.x + 16, y: vIn.to.y + 6 };
const labelVOut = { x: vOut.to.x - 8, y: vOut.to.y - 16 };
const labelVBack = { x: vBack.to.x + 6, y: vBack.to.y + 26 };
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
      <!-- 圆外：方向相反的匀强磁场（⊙） -->
      <g fill="none" stroke="color-mix(in srgb, var(--c-velocity) 42%, transparent)" stroke-width="1.4">
        <template v-for="(m, i) in OUT_MARKS" :key="`o${i}`">
          <circle :cx="m.x" :cy="m.y" r="6.6" />
          <circle :cx="m.x" :cy="m.y" r="1.9" fill="color-mix(in srgb, var(--c-velocity) 42%, transparent)" />
        </template>
      </g>
      <!-- 磁场区域：边界圆 + 圆内 ⊗ -->
      <circle
        :cx="O.x"
        :cy="O.y"
        :r="R"
        fill="color-mix(in srgb, var(--c-accent) 7%, transparent)"
        stroke="color-mix(in srgb, var(--c-accent) 70%, transparent)"
        stroke-width="2.2"
      />
      <g fill="none" stroke="color-mix(in srgb, var(--c-accent) 50%, transparent)" stroke-width="1.3" stroke-linecap="round">
        <template v-for="(m, i) in IN_MARKS" :key="`i${i}`">
          <circle :cx="m.x" :cy="m.y" :r="IN_MARK_R" />
          <line
            :x1="m.x - IN_MARK_ARM"
            :y1="m.y - IN_MARK_ARM"
            :x2="m.x + IN_MARK_ARM"
            :y2="m.y + IN_MARK_ARM"
          />
          <line
            :x1="m.x + IN_MARK_ARM"
            :y1="m.y - IN_MARK_ARM"
            :x2="m.x - IN_MARK_ARM"
            :y2="m.y + IN_MARK_ARM"
          />
        </template>
      </g>
      <!-- 半径线 AO（虚线）+ 入射速度 -->
      <path
        :d="aoPath"
        fill="none"
        stroke="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)"
        stroke-width="1.8"
        stroke-dasharray="8 7"
      />
      <CourseArrow :from="vIn.from" :to="vIn.to" stroke="var(--c-velocity)" stroke-width="3.2" />
      <text
        v-bind="HALO"
        :x="labelV.x"
        :y="labelV.y"
        :font-family="MATH"
        font-style="italic"
        :font-size="FS"
        fill="var(--c-velocity)"
      >
        v
      </text>
      <circle :cx="O.x" :cy="O.y" r="4" fill="var(--c-neutral-300)" />
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
      <circle :cx="A.x" :cy="A.y" r="5.4" fill="var(--c-neutral-50)" />
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
      <!-- 第 1 次点击：内部轨迹弧 A→M + 出射速度 -->
      <template v-if="showInner">
        <path
          :d="innerArc"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <CourseArrow :from="vOut.from" :to="vOut.to" stroke="var(--c-velocity)" stroke-width="3.6" />
        <text
          v-bind="HALO"
          :x="labelVOut.x"
          :y="labelVOut.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-velocity)"
        >
          v′
        </text>
        <circle :cx="M.x" :cy="M.y" r="5.4" fill="var(--c-neutral-50)" />
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
      <!-- 第 2 次点击：圆外的轨迹弧 M→N + 对称轴 OC′ -->
      <template v-if="showOuter">
        <path
          :d="axisPath"
          fill="none"
          stroke="color-mix(in srgb, var(--c-accent) 45%, transparent)"
          stroke-width="1.6"
          stroke-dasharray="10 9"
        />
        <path
          :d="outerArc"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="3.4"
          stroke-linecap="round"
        />
        <circle :cx="N.x" :cy="N.y" r="5.4" fill="var(--c-neutral-50)" />
        <text
          v-bind="HALO"
          :x="labelN.x"
          :y="labelN.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-neutral-50)"
        >
          N
        </text>
      </template>
      <!-- 第 3 次点击：N 处的速度又指向圆心 O -->
      <template v-if="showBack">
        <CourseArrow :from="vBack.from" :to="vBack.to" stroke="var(--c-physics)" stroke-width="3.6" />
        <text
          v-bind="HALO"
          :x="labelVBack.x"
          :y="labelVBack.y"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="var(--c-physics)"
        >
          v″
        </text>
      </template>
      <!-- 图例：圆内 / 圆外的磁场方向（大小可以不同） -->
      <g>
        <circle
          :cx="VB.x + 26"
          :cy="VB.y + 30"
          r="10"
          fill="none"
          stroke="color-mix(in srgb, var(--c-accent) 85%, transparent)"
          stroke-width="1.8"
        />
        <line
          :x1="VB.x + 18.9"
          :y1="VB.y + 22.9"
          :x2="VB.x + 33.1"
          :y2="VB.y + 37.1"
          stroke="color-mix(in srgb, var(--c-accent) 85%, transparent)"
          stroke-width="1.8"
        />
        <line
          :x1="VB.x + 33.1"
          :y1="VB.y + 22.9"
          :x2="VB.x + 18.9"
          :y2="VB.y + 37.1"
          stroke="color-mix(in srgb, var(--c-accent) 85%, transparent)"
          stroke-width="1.8"
        />
        <text :x="VB.x + 44" :y="VB.y + 36" :font-family="CJK" :font-size="FS - 8" fill="var(--c-accent)">
          圆内：磁场 B
        </text>
        <circle
          :cx="VB.x + 26"
          :cy="VB.y + 66"
          r="10"
          fill="none"
          stroke="color-mix(in srgb, var(--c-velocity) 85%, transparent)"
          stroke-width="1.8"
        />
        <circle :cx="VB.x + 26" :cy="VB.y + 66" r="2.6" fill="color-mix(in srgb, var(--c-velocity) 85%, transparent)" />
        <text :x="VB.x + 44" :y="VB.y + 72" :font-family="CJK" :font-size="FS - 8" fill="var(--c-velocity)">
          圆外：方向相反的磁场
        </text>
      </g>
    </svg>
  </div>
</template>
