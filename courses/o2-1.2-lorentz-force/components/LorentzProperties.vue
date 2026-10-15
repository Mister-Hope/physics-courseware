<!--
  《洛伦兹力的特点》配图（Lead 放在"F = qvB sinθ 一般式"之后、"显像管磁偏转应用"之前）：
  沿磁场方向看（B 垂直纸面向外 ⊙），电子在纸面内做匀速圆周运动。
  在轨迹上取 3 个位置，每个位置画两个箭头：
    · v（蓝 #60a5fa）＝ 该点轨迹的切线方向（沿逆时针运动方向）；
    · F_洛（青 #2dd4bf）＝ 恒指向圆心 —— 方向不是凭感觉画的，而是按 F = q(v×B) 逐点现算
      （电子 q = −e、B 沿 +z 垂直纸面向外），算完再自检「F ⊥ v」且「F 指向圆心」，
      任一不成立就把该位置的两个箭头与方角标红（宁可自己显眼地报错，也不悄悄教错方向）。
  每个位置还有一个直角小方角，干脆地说明 F ⊥ v；顶部那一点再沿 v 画一小段虚线位移 Δs 并标 W = 0，
  点出「F ⊥ Δs ⟹ 洛伦兹力不做功」。
  图内只有方向与符号、没有任何数值刻度（纯定性示意图）。本组件无 props，进页面即常显。
  占满右栏的做法：容器 aspect-ratio 与 viewBox 同比例（460 : 360 ≈ 半页宽 : 60% 页高），
  这样放在 .half-grid 这种"行高自动"的栏里，容器高度也有定数，svg 的 h-full w-auto 才撑得满
  （否则百分比高度解析不出来，会退回 SVG 默认的 300×150，图缩成一小团）；
  放进 .page-grow 当 flex 子项时两侧尺寸本就确定，这条不生效也不碍事。
-->
<script setup>
import { computed } from "vue";

/** 电子：q = −e（负电）；B 垂直纸面向外 ⊙ 记为 +z */
const Q = -1.6e-19;
const BZ = 1;

/** 画布：比例按"页面右栏（约半页宽 420px）× 约 60% 页高（约 330px）"取，配 h-full w-auto 刚好占满 */
const W = 460;
const H = 360;
const CX = 250; // 圆心
const CY = 196;
const R = 112; // 轨迹半径
const V_LEN = 60; // v 箭头长
const F_LEN = 56; // F 箭头长
const MARK = 13; // 直角小方角的边长
const DS_LEN = 44; // Δs 小箭头长
const F_LABEL_OFF = 28; // F 标注离箭头的垂直距离

/** 三个取样点的相位（度；数学坐标 y 向上、逆时针为正）：正上、左下、右下，彼此相隔 120° */
const PHASES = [90, 210, 330];

/** 自检通过时的颜色；算错就换红色，肉眼一眼能发现 */
const OK_COLOR = "#2dd4bf";
const BAD_COLOR = "#f87171";

const rad = (deg) => (deg * Math.PI) / 180;
const add = (p, dir, len) => ({ x: p.x + dir.x * len, y: p.y + dir.y * len });

const samples = computed(() =>
  PHASES.map((deg, i) => {
    const phi = rad(deg);
    /** 电荷位置：屏幕坐标（y 向下），与圆心同源的参数方程 */
    const p = { x: CX + R * Math.cos(phi), y: CY - R * Math.sin(phi) };
    /** 速度方向：轨迹切线，取逆时针运动那一侧 */
    const v = { x: -Math.sin(phi), y: -Math.cos(phi) };
    // F = q(v×B)：先在 y 向上的数学坐标里做叉乘（B = (0,0,BZ)），再转回屏幕坐标
    const vMath = { x: v.x, y: -v.y };
    const fx = Q * vMath.y * BZ;
    const fy = -Q * vMath.x * BZ;
    const fl = Math.hypot(fx, fy) || 1;
    const f = { x: fx / fl, y: -(fy / fl) };
    // 自检一：F ⊥ v；自检二：F 指向圆心（提供向心力）
    const toCenter = { x: CX - p.x, y: CY - p.y };
    const tcLen = Math.hypot(toCenter.x, toCenter.y) || 1;
    const ok =
      Math.abs(f.x * v.x + f.y * v.y) < 0.02 &&
      (f.x * toCenter.x + f.y * toCenter.y) / tcLen > 0.98;
    /** 直角小方角：沿 v 一段、再沿 F 一段、回到 F 上 */
    const c1 = add(p, v, MARK);
    const c2 = add(c1, f, MARK);
    const c3 = add(p, f, MARK);
    return {
      deg,
      p,
      v,
      f,
      ok,
      vTip: add(p, v, V_LEN),
      fTip: add(p, f, F_LEN),
      // 顶部那一点要给虚线 Δs 让位，v 标注改放在实线箭头上方，其余两点放在箭头前方
      vLabel:
        i === 0
          ? { x: p.x + v.x * V_LEN * 0.45, y: p.y + v.y * V_LEN * 0.45 - 20 }
          : add(p, v, V_LEN + 24),
      // F 标注放在箭头中段、朝背离圆心的一侧偏出去，压不到箭头
      fLabel: add(add(p, f, F_LEN / 2), { x: f.y, y: -f.x }, F_LABEL_OFF),
      markPath: `M ${c1.x.toFixed(1)} ${c1.y.toFixed(1)} L ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} L ${c3.x.toFixed(1)} ${c3.y.toFixed(1)}`,
    };
  }),
);

/** 顶部那一点的位移小箭头：沿 v 再走一小段（F ⊥ Δs ⟹ W = F·Δs = 0） */
const ds = computed(() => {
  const [s] = samples.value;
  const to = add(s.vTip, s.v, DS_LEN);
  return {
    from: s.vTip,
    to,
    // Δs 标注放在虚线箭头下方、稍偏左（避开左上角的 ⊙ B 与 W = 0）
    labelX: (s.vTip.x + to.x) / 2 - 8,
    labelY: (s.vTip.y + to.y) / 2 + 24,
  };
});
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
      <!-- 匀速圆周运动的轨迹（虚线；整圈） -->
      <circle
        :cx="CX"
        :cy="CY"
        :r="R"
        fill="none"
        stroke="color-mix(in srgb, var(--c-velocity) 35%, transparent)"
        stroke-width="2.4"
        stroke-dasharray="7 9"
      />
      <!-- 圆心：三个 F 都指向它 -->
      <circle :cx="CX" :cy="CY" r="4" fill="color-mix(in srgb, var(--c-neutral-200) 70%, transparent)" />
      <!-- 位移 Δs：沿 v 方向的一小段（只画在顶部那一点） -->
      <CourseArrow
        :from="ds.from"
        :to="ds.to"
        stroke="var(--c-velocity-light)"
        stroke-width="2.4"
        stroke-dasharray="7 6"
        opacity="0.9"
      />
      <!-- 3 个位置：v 沿切线、F 指向圆心，外加一个直角小方角强调 F ⊥ v -->
      <g v-for="s in samples" :key="s.deg">
        <CourseArrow :from="s.p" :to="s.vTip" stroke="var(--c-velocity)" stroke-width="3.6" />
        <CourseArrow
          :from="s.p"
          :to="s.fTip"
          :stroke="s.ok ? OK_COLOR : BAD_COLOR"
          stroke-width="4"
        />
        <path
          :d="s.markPath"
          fill="none"
          :stroke="s.ok ? 'rgba(226,232,240,0.85)' : BAD_COLOR"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- 运动电荷（电子：蓝球 + 中间的减号） -->
        <circle :cx="s.p.x" :cy="s.p.y" r="8.5" fill="var(--c-velocity)" />
        <line
          :x1="s.p.x - 4"
          :y1="s.p.y"
          :x2="s.p.x + 4"
          :y2="s.p.y"
          stroke="var(--c-bg-soft)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
      <!-- 图内标注：v、F_洛、Δs、W = 0 -->
      <g v-for="s in samples" :key="`label-${s.deg}`">
        <text
          :x="s.vLabel.x"
          :y="s.vLabel.y"
          text-anchor="middle"
          font-family="KaTeX_Math, 'Times New Roman', serif"
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
          :fill="s.ok ? OK_COLOR : BAD_COLOR"
          stroke="var(--c-bg-soft)"
          stroke-width="3"
          paint-order="stroke"
        >
          <tspan font-family="KaTeX_Math, 'Times New Roman', serif" font-style="italic">F</tspan>
          <tspan dy="4" font-size="12">洛</tspan>
        </text>
      </g>
      <text
        :x="ds.labelX"
        :y="ds.labelY"
        text-anchor="middle"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="20"
        fill="var(--c-velocity-light)"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        Δs
      </text>
      <text
        x="140"
        y="84"
        text-anchor="end"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="20"
        fill="var(--c-neutral-200)"
        stroke="var(--c-bg-soft)"
        stroke-width="3"
        paint-order="stroke"
      >
        W = 0
      </text>
      <!-- 磁场：⊙ B 垂直纸面向外（视图沿 B 方向看） -->
      <g>
        <circle cx="40" cy="38" r="14" fill="none" stroke="var(--c-accent)" stroke-width="2.6" />
        <circle cx="40" cy="38" r="4" fill="var(--c-accent)" />
        <text
          x="62"
          y="46"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="22"
          fill="var(--c-accent)"
          stroke="var(--c-bg-soft)"
          stroke-width="3"
          paint-order="stroke"
        >
          B
        </text>
        <text x="78" y="44" font-size="14" fill="var(--c-text-dim)">垂直纸面向外</text>
      </g>
      <!-- 这一页的落点：F 与 v、B 都垂直 -->
      <text
        x="446"
        y="52"
        text-anchor="end"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="19"
        fill="var(--c-neutral-200)"
      >
        F ⊥ v，F ⊥ B
      </text>
    </svg>
  </div>
</template>
