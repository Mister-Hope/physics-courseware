<!--
  选必二 1.3《带电粒子在匀强磁场中的运动》第二课时 —— 「轨道平面 ⊥ B」配图
  （页面写 <PlanePerpB />：无 props、进页面即常显）
  ── 这一页说的事 ──
  只要开始 v ⊥ B：① F ⊥ v 且 F ⊥ B ⟹ 洛伦兹力始终落在垂直于 B 的平面内；
  ② 于是速度也始终留在该平面内 ⟹ 粒子在「垂直于磁感线的平面内」做匀速圆周运动。
  本图把这个空间关系摆出来：一根竖直的 B 轴穿过一块水平平面，整圈轨道（投影后是椭圆）躺在这块平面里，
  三个取样点上的 v（切线，蓝）与 F_洛（指向圆心，青）也都在这个平面内 —— 「平面 ⊥ B」一眼可见。
  ── 投影（全图只有这一套：平面、圆、箭头、标注全走 project → 统一包围盒 → 统一屏幕映射，谁都不自己加偏移）──
  世界坐标：B 沿 +y（竖直向上），轨道平面 = x-z 水平面，圆心在原点，圆 p(t) = R(cos t, 0, sin t)。
  视角两角：yaw = −32°（绕竖直轴把相机偏到左前方，水平面才张得开）、pitch = 34°（抬高俯视，让水平面上下张开）。
  正交投影 = 把世界点投到两个正交视图基上（不是斜投影）：
    X = x·cos(yaw) − z·sin(yaw)                                        屏幕右
    Y = y·cos(pitch) − ( x·sin(yaw) + z·cos(yaw) )·sin(pitch)          屏幕上（向上为正）
  作图：screen.x = OX + X·scale、screen.y = OY − Y·scale；scale 与 OX、OY 由「全图所有元素的统一包围盒」一次算出。
  ── 真算而非手调 ──
  v = 该点切线（转动方向由 q 的符号定：电子 q<0，绕 +y 反着转）；F = q(v × B) 逐点算叉乘（q = −e），
  再自检「F ⊥ v 且 F ⊥ B 且 F 指向圆心」——任一不成立就把该点的 F 箭头与标注变红，宁可自己显眼地报错，也不悄悄教错方向。
  ── 占满右栏 ──
  容器 aspect-ratio 固定 460 / 340（≈ 半页宽 420 × 60% 页高 300 的比例），配合 svg 的 h-full w-auto：
  放进 .half-grid 这种「行高自动」的栏里高度也有定数，不会被压回 SVG 默认的 300×150。图内不出现任何数值刻度。
-->
<script setup>
import { computed } from "vue";

/* ── 世界坐标 → 视图坐标：唯一的一套正交投影 ── */
const DEG = Math.PI / 180;
const YAW = -32 * DEG;
const PITCH = 34 * DEG;
const CY = Math.cos(YAW);
const SY = Math.sin(YAW);
const CP = Math.cos(PITCH);
const SP = Math.sin(PITCH);

/**
 * 世界坐标 (x, y, z) → 视图坐标（X 向右、Y 向上）
 *
 * @param x 世界 x（平面内一根轴）
 * @param y 世界 y（B 的方向）
 * @param z 世界 z（平面内另一根轴，与 x、y 成右手系）
 * @returns 视图坐标
 */
const project = (x, y, z) => ({
  X: x * CY - z * SY,
  Y: y * CP - (x * SY + z * CY) * SP,
});

/* ── 世界坐标下的作图尺寸（都是相对量，图上不出现数值刻度）── */
const R = 1; // 轨道半径
const PLATE = 1.3; // 平面示意板在 x、z 两个方向的半边长（比轨道略大一圈）
const B_BOTTOM = -0.6; // B 轴下端：穿过平面、在下方留一小截
const B_TOP = 1.9; // B 轴上端：伸到平面上方（箭头在这里）
const V_LEN = 0.62; // v 箭头长
const F_LEN = 0.52; // F_洛 箭头长
const TICK_LEN = 0.26; // 平面内的一小段线（直角标记的「另一条边」）
const MARK = 13; // 直角标记边长（屏幕用户单位）
const V_LABEL_OFF = 16; // v 标注离箭头中垂线的距离
const F_LABEL_OFF = 24; // F 标注离箭头中垂线的距离
const Q = -1.6e-19; // 电子：带负电（方向全靠它定，不靠肉眼）
const B_VEC = { x: 0, y: 1, z: 0 }; // B 沿 +y
const PHASES = [90, 210, 330]; // 圆上相隔 120° 的三个取样点

/* ── 三个取样点：v 取切线，F = q(v×B) 现算并逐点自检（真算，不写死方向）── */
const samples = PHASES.map((deg) => {
  const t = deg * DEG;
  const p = { x: R * Math.cos(t), y: 0, z: R * Math.sin(t) };
  // 转动方向由 q 的符号定：电子（q<0）绕 +y 的转向与正电荷相反
  const sense = Math.sign(Q);
  const vDir = { x: sense * -Math.sin(t), y: 0, z: sense * Math.cos(t) };
  // F = q(v × B)，B = (0, B, 0)：老实算叉乘
  const cross = {
    x: vDir.y * B_VEC.z - vDir.z * B_VEC.y,
    y: vDir.z * B_VEC.x - vDir.x * B_VEC.z,
    z: vDir.x * B_VEC.y - vDir.y * B_VEC.x,
  };
  const raw = { x: Q * cross.x, y: Q * cross.y, z: Q * cross.z };
  const rawLen = Math.hypot(raw.x, raw.y, raw.z) || 1;
  const fDir = { x: raw.x / rawLen, y: raw.y / rawLen, z: raw.z / rawLen };
  // 自检：F ⊥ v、F ⊥ B、且 F 指向圆心（圆心在原点，径向向外即 (x, 0, z)）——三条都成立才是青色
  const ok =
    Math.abs(fDir.x * vDir.x + fDir.y * vDir.y + fDir.z * vDir.z) < 1e-9 &&
    Math.abs(fDir.y) < 1e-9 &&
    fDir.x * p.x + fDir.z * p.z < -0.999;
  const vTip = { x: p.x + vDir.x * V_LEN, y: 0, z: p.z + vDir.z * V_LEN };
  const fTip = { x: p.x + fDir.x * F_LEN, y: 0, z: p.z + fDir.z * F_LEN };
  return {
    deg,
    ok,
    P: project(p.x, p.y, p.z),
    VT: project(vTip.x, vTip.y, vTip.z),
    FT: project(fTip.x, fTip.y, fTip.z),
    // 箭头中点（标注挂在它旁边，不压箭头两头）
    VM: project((p.x + vTip.x) / 2, 0, (p.z + vTip.z) / 2),
    FM: project((p.x + fTip.x) / 2, 0, (p.z + fTip.z) / 2),
  };
});

/* 画布：比例按「页面右栏（约半页宽 420）× 约 60% 页高（约 300）」取 */
const VBW = 460;
const VBH = 340;
const MARGIN = 28; // 统一包围盒四周留的余量（标注挂在图内，不会出框）
const ORBIT_SAMPLES = 180;

/**
 * 视图坐标点 → SVG points 里的一段「x,y」（1 位小数足够）
 *
 * @param p 视图坐标点
 * @returns 「x,y」
 */
const round = (p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

/**
 * 点到线段的距离：给两个标注选边用（标注不许压在另一支箭头上）
 *
 * @param p 待判点
 * @param a 线段起点
 * @param b 线段终点
 * @returns 距离
 */
const distToSeg = (p, a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy || 1;
  const u = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2));
  return Math.hypot(p.x - (a.x + u * dx), p.y - (a.y + u * dy));
};

const scene = computed(() => {
  // 轨道：整圈，逐点过 project（不在圆上另调偏移）
  const orbit = [];
  for (let i = 0; i <= ORBIT_SAMPLES; i += 1) {
    const t = (i / ORBIT_SAMPLES) * 2 * Math.PI;
    orbit.push(project(R * Math.cos(t), 0, R * Math.sin(t)));
  }
  // 平面示意板：x-z 平面里的正方形（投影后自然是平行四边形）
  const plate = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].map(([sx, sz]) => project(sx * PLATE, 0, sz * PLATE));
  // B 轴：过圆心、垂直于平面的一根磁感线
  const bBottom = project(0, B_BOTTOM, 0);
  const bTop = project(0, B_TOP, 0);
  // 平面内的一小段线：屏幕水平方向 = 世界方向 (cos yaw, 0, −sin yaw)，它确实躺在 x-z 平面里
  const tick = project(CY * TICK_LEN, 0, -SY * TICK_LEN);
  // 平面内文字的位置（在轨道椭圆之外、示意板之内）
  const plateLabel = project(-0.98, 0, -0.98);

  // 统一包围盒 → 统一屏幕映射（scale、OX、OY 全图共用）
  const all = [
    ...orbit,
    ...plate,
    bBottom,
    bTop,
    tick,
    plateLabel,
    ...samples.flatMap((s) => [s.P, s.VT, s.FT, s.VM, s.FM]),
  ];
  const xs = all.map((p) => p.X);
  const ys = all.map((p) => p.Y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min((VBW - 2 * MARGIN) / (maxX - minX), (VBH - 2 * MARGIN) / (maxY - minY));
  const OX = (VBW - (maxX - minX) * scale) / 2 - minX * scale;
  const OY = (VBH - (maxY - minY) * scale) / 2 + maxY * scale;
  const toScreen = (p) => ({ x: OX + p.X * scale, y: OY - p.Y * scale });

  // 三个取样点：v、F 箭头 + 两个标注；标注各有两个候选（箭头两侧），挑「不压另一支箭头、彼此也分得开」的一侧
  const views = samples.map((s) => {
    const P = toScreen(s.P);
    const VT = toScreen(s.VT);
    const FT = toScreen(s.FT);
    const VM = toScreen(s.VM);
    const FM = toScreen(s.FM);
    const vLen = Math.hypot(VT.x - P.x, VT.y - P.y) || 1;
    const ux = (VT.x - P.x) / vLen;
    const uy = (VT.y - P.y) / vLen;
    const fLen = Math.hypot(FT.x - P.x, FT.y - P.y) || 1;
    const fx = (FT.x - P.x) / fLen;
    const fy = (FT.y - P.y) / fLen;
    const vCands = [
      { x: VM.x - uy * V_LABEL_OFF, y: VM.y + ux * V_LABEL_OFF },
      { x: VM.x + uy * V_LABEL_OFF, y: VM.y - ux * V_LABEL_OFF },
    ];
    const fCands = [
      { x: FM.x - fy * F_LABEL_OFF, y: FM.y + fx * F_LABEL_OFF },
      { x: FM.x + fy * F_LABEL_OFF, y: FM.y - fx * F_LABEL_OFF },
    ];
    let best = { score: -Infinity, v: vCands[0], f: fCands[0] };
    for (const vc of vCands) {
      for (const fc of fCands) {
        const score =
          Math.min(distToSeg(vc, P, FT), distToSeg(fc, P, VT)) +
          0.5 * Math.hypot(vc.x - fc.x, vc.y - fc.y) +
          0.35 *
            (Math.min(Math.hypot(vc.x - P.x, vc.y - P.y), 60) +
              Math.min(Math.hypot(fc.x - P.x, fc.y - P.y), 60));
        if (score > best.score) best = { score, v: vc, f: fc };
      }
    }
    return { deg: s.deg, ok: s.ok, P, VT, FT, vLabel: best.v, fLabel: best.f };
  });

  const center = toScreen(project(0, 0, 0));
  const tickEnd = toScreen(tick);
  const bTopScreen = toScreen(bTop);
  return {
    orbitPoints: orbit.map((p) => round(toScreen(p))).join(" "),
    platePoints: plate.map((p) => round(toScreen(p))).join(" "),
    bFrom: toScreen(bBottom),
    bTo: bTopScreen,
    bLabel: { x: bTopScreen.x + 12, y: bTopScreen.y + 4 },
    plateLabel: toScreen(plateLabel),
    // 直角标记：平面内那一小段 + 它与 B 轴之间的方角（两条边都是屏幕水平／竖直，方角才是真的方）
    tickFrom: center,
    tickTo: tickEnd,
    square: `M ${(center.x + MARK).toFixed(1)} ${center.y.toFixed(1)} L ${(center.x + MARK).toFixed(1)} ${(center.y - MARK).toFixed(1)} L ${center.x.toFixed(1)} ${(center.y - MARK).toFixed(1)}`,
    samples: views,
  };
});
</script>

<template>
  <div
    class="flex min-h-0 w-full flex-1 items-center justify-center"
    :style="{ aspectRatio: `${VBW} / ${VBH}` }"
  >
    <svg
      :viewBox="`0 0 ${VBW} ${VBH}`"
      xmlns="http://www.w3.org/2000/svg"
      class="h-full w-auto max-w-full"
      aria-label="带电粒子在垂直于磁感线的平面内做匀速圆周运动"
    >
      <!-- 轨道平面：半透明平行四边形（投影后自然是平行四边形），上面标「轨道平面」 -->
      <polygon
        :points="scene.platePoints"
        fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)"
        stroke="color-mix(in srgb, var(--c-text-dim) 50%, transparent)"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <text
        :x="scene.plateLabel.x"
        :y="scene.plateLabel.y"
        text-anchor="middle"
        font-size="17"
        fill="var(--c-neutral-300)"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        轨道平面
      </text>
      <!-- B：过圆心、垂直平面的一根磁感线（金色虚线 + 箭头），箭头端标 B -->
      <CourseArrow
        :from="scene.bFrom"
        :to="scene.bTo"
        stroke="var(--c-accent)"
        stroke-width="2.8"
        stroke-dasharray="9 7"
      />
      <text
        :x="scene.bLabel.x"
        :y="scene.bLabel.y"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="var(--c-accent)"
        stroke="var(--c-bg-soft)"
        stroke-width="3.5"
        paint-order="stroke"
      >
        B
      </text>
      <!-- 直角标记：平面内的一小段线 + 它与 B 之间的方角 ⟹ 平面 ⊥ B -->
      <line
        :x1="scene.tickFrom.x"
        :y1="scene.tickFrom.y"
        :x2="scene.tickTo.x"
        :y2="scene.tickTo.y"
        stroke="color-mix(in srgb, var(--c-neutral-200) 50%, transparent)"
        stroke-width="1.8"
      />
      <path
        :d="scene.square"
        fill="none"
        stroke="color-mix(in srgb, var(--c-neutral-200) 75%, transparent)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- 匀速圆周轨迹：整圈（投影后是椭圆），虚线 -->
      <polyline
        :points="scene.orbitPoints"
        fill="none"
        stroke="color-mix(in srgb, var(--c-velocity) 50%, transparent)"
        stroke-width="2.6"
        stroke-dasharray="8 8"
        stroke-linecap="round"
      />
      <!-- 三个取样点：v 沿切线（蓝）、F_洛 指向圆心（青；自检不过变红） -->
      <g v-for="s in scene.samples" :key="`arrow-${s.deg}`">
        <CourseArrow :from="s.P" :to="s.VT" stroke="var(--c-velocity)" stroke-width="3.4" />
        <CourseArrow
          :from="s.P"
          :to="s.FT"
          :stroke="s.ok ? '#2dd4bf' : '#f87171'"
          stroke-width="4"
        />
        <circle :cx="s.P.x" :cy="s.P.y" r="7.5" fill="var(--c-velocity)" />
        <line
          :x1="s.P.x - 3.5"
          :y1="s.P.y"
          :x2="s.P.x + 3.5"
          :y2="s.P.y"
          stroke="var(--c-bg-soft)"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </g>
      <!-- 图内标注：v 与 F_洛（物理量走 KaTeX 斜体；「洛」作角标） -->
      <g v-for="s in scene.samples" :key="`label-${s.deg}`">
        <text
          :x="s.vLabel.x"
          :y="s.vLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="21"
          fill="var(--c-velocity)"
          stroke="var(--c-bg-soft)"
          stroke-width="3"
          paint-order="stroke"
        >
          v
        </text>
        <text
          :x="s.fLabel.x"
          :y="s.fLabel.y"
          text-anchor="middle"
          font-size="20"
          :fill="s.ok ? '#2dd4bf' : '#f87171'"
          stroke="var(--c-bg-soft)"
          stroke-width="3"
          paint-order="stroke"
        >
          <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
          <tspan dy="4" font-size="12">洛</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>
