<script setup lang="ts">
/**
 * 6.1 三种传动对比：
 *
 * - Coaxial 同轴传动（第 8 页）：同一个轴上的大轮 + 小轮，ω 相同、v 与 r 成正比；
 * - Belt 皮带（链条）传动（第 9 页）：两轮半径不等，皮带绕成闭合的带环，边缘 v 相同、ω 与 r 成反比、两轮转向相同；
 * - Gear 齿轮传动（第 10 页）：两轮半径不等、直接啮合，啮合处 v 相同、ω 与 r 成反比、两轮转向相反。 各模式各有收紧的 viewBox；转向箭头可用 showRotation 分步显示（避免未点击就泄题）。
 */
const { mode = "coaxial", showRotation = true } = defineProps<{
  /** 传动方式 */
  mode?: "coaxial" | "belt" | "gear";
  /** 转向箭头是否显示（默认显示；第 9、10 页按点击步进传入） */
  showRotation?: boolean;
}>();

interface Pt {
  x: number;
  y: number;
}
interface Tick {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
const toXY = (c: Pt, deg: number, r: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return { x: c.x + r * Math.cos(a), y: c.y - r * Math.sin(a) };
};
/**
 * 圆弧采样成折线（角度增大即逆时针）
 *
 * @param c 圆心
 * @param r 半径
 * @param from 起始角度（度）
 * @param to 终止角度（度）
 * @returns 弧上的采样点
 */
const arcPts = (c: Pt, r: number, from: number, to: number): Pt[] => Array.from({ length: 41 }, (_, i): Pt => toXY(c, from + ((to - from) * i) / 40, r));
const polyD = (pts: Pt[]): string => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
/**
 * 折线末端的箭头三角形：尖端正好落在最后一个采样点上
 *
 * @param pts 折线的采样点
 * @param size 三角形长度
 * @param half 三角形底边半宽
 * @returns Polygon 的 points 数据
 */
const headOf = (pts: Pt[], size = 12, half = 6): string => {
  const p = pts[pts.length - 1];
  const q = pts[pts.length - 2];
  const ang = Math.atan2(p.y - q.y, p.x - q.x);
  const ux = Math.cos(ang);
  const uy = Math.sin(ang);
  const bx = p.x - size * ux;
  const by = p.y - size * uy;

  return `${p.x.toFixed(1)},${p.y.toFixed(1)} ${(bx + half * -uy).toFixed(1)},${(by + half * ux).toFixed(1)} ${(bx - half * -uy).toFixed(1)},${(by - half * ux).toFixed(1)}`;
};
/**
 * 转向指示箭头（同一时间内扫过的角度就体现 ω 的大小）
 *
 * @param opts 圆心、半径、起始角度、扫过角度与旋向
 * @returns 弧线 path 与末端三角
 */
const rot = (opts: { c: Pt; r: number; from: number; sweep: number; clockwise?: boolean }): { d: string; head: string } => {
  const { c, r, from, sweep, clockwise = true } = opts;
  const pts = clockwise ? arcPts(c, r, from, from - sweep) : arcPts(c, r, from, from + sweep);

  return { d: polyD(pts), head: headOf(pts) };
};
/**
 * 轮齿（按齿数均匀分布；phase 让两轮的齿在啮合点错开半个节距）
 *
 * @param c 齿轮圆心
 * @param r 节圆半径
 * @param n 齿数
 * @param phase 相位偏移（度）
 * @returns 每根齿的线段坐标
 */
const teeth = (c: Pt, r: number, n: number, phase = 0): Tick[] =>
  Array.from({ length: n }, (_, i): Tick => {
    const inner = toXY(c, phase + (i * 360) / n, r);
    const outer = toXY(c, phase + (i * 360) / n, r + 6);

    return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
  });

/* ── 同轴传动：大轮 + 小轮共轴，两轮转向箭头扫过同一个角度（ω 相同） ── */
const CO = { x: 160, y: 140 };
const CO_R1 = 88;
const CO_R2 = 42;
const coA = toXY(CO, 50, CO_R1);
const coB = toXY(CO, 50, CO_R2);
const coRot = rot({ c: CO, r: CO_R1 + 7, from: 150, sweep: 62 });

/* ── 皮带 / 链条传动：外公切线 + 两轮的包角弧组成闭合的带环 ── */
const B1 = { x: 112, y: 132 };
const B2 = { x: 264, y: 132 };
const B_R1 = 62;
const B_R2 = 31;
const B_K = (B_R1 - B_R2) / (B2.x - B1.x);
const B_NY = Math.sqrt(1 - B_K * B_K);
const P1 = { x: B1.x + B_R1 * B_K, y: B1.y - B_R1 * B_NY };
const P2 = { x: B2.x + B_R2 * B_K, y: B2.y - B_R2 * B_NY };
const P1b = { x: B1.x + B_R1 * B_K, y: B1.y + B_R1 * B_NY };
const P2b = { x: B2.x + B_R2 * B_K, y: B2.y + B_R2 * B_NY };
/** 切点方位角：大轮包角 180°+2α（从 θ 逆时针扫到 360°−θ）、小轮包角 180°−2α（从 θ 顺时针扫到 −θ） */
const B_TH = (Math.atan2(B_NY, B_K) * 180) / Math.PI;
const beltWrap1 = polyD(arcPts(B1, B_R1, B_TH, 360 - B_TH));
const beltWrap2 = polyD(arcPts(B2, B_R2, B_TH, -B_TH));
const beltRot1 = rot({ c: B1, r: B_R1 - 16, from: 40, sweep: 78 });
const beltRot2 = rot({ c: B2, r: B_R2 - 9, from: 40, sweep: 88 });

/* ── 齿轮传动：半径不等（4:3 的半径、18 齿与 12 齿的齿距相同）、齿错开半个节距 ── */
const G1 = { x: 106, y: 140 };
const G2 = { x: 226, y: 140 };
const G_R1 = 72;
const G_R2 = 48;
const gearTeeth1 = teeth(G1, G_R1, 18);
const gearTeeth2 = teeth(G2, G_R2, 12, 15);
/** 相同时间内大齿轮扫过的角小、小齿轮扫过的角大（ω ∝ 1/r） */
const gearRot1 = rot({ c: G1, r: G_R1 - 20, from: 150, sweep: 58 });
const gearRot2 = rot({ c: G2, r: G_R2 - 14, from: 32, sweep: 88, clockwise: false });
const contact = { x: G1.x + G_R1, y: G1.y };

/** 每种模式各自的 viewBox（收紧到图形外接框附近） */
const VIEW_BOX: Record<"coaxial" | "belt" | "gear", string> = {
  coaxial: "64 30 192 208",
  belt: "44 46 258 154",
  gear: "24 58 260 164",
};
const vb = VIEW_BOX[mode];
</script>

<template>
  <svg :viewBox="vb" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <template v-if="mode === 'coaxial'">
      <circle :cx="CO.x" :cy="CO.y" :r="CO_R1" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.7" />
      <circle :cx="CO.x" :cy="CO.y" :r="CO_R2" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" stroke-width="2.2" />
      <line :x1="CO.x" :y1="CO.y" :x2="coA.x" :y2="coA.y" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.6" />
      <g v-if="showRotation">
        <path :d="coRot.d" fill="none" stroke="#e2a846" stroke-width="2.8" opacity="0.9" stroke-linecap="round" />
        <polygon :points="coRot.head" fill="#e2a846" />
      </g>
      <circle :cx="CO.x" :cy="CO.y" r="4" fill="currentColor" opacity="0.8" />
      <circle :cx="coA.x" :cy="coA.y" r="5.5" fill="#e2a846" />
      <circle :cx="coB.x" :cy="coB.y" r="5.5" fill="#60a5fa" />
      <text :x="coA.x + 11" :y="coA.y + 5" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">A</text>
      <text :x="coB.x + 11" :y="coB.y + 5" font-size="17" font-family="KaTeX_Math" font-style="italic" fill="#60a5fa">B</text>
    </template>

    <template v-else-if="mode === 'belt'">
      <circle :cx="B1.x" :cy="B1.y" :r="B_R1" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.7" />
      <circle :cx="B2.x" :cy="B2.y" :r="B_R2" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.7" />
      <line :x1="P1.x" :y1="P1.y" :x2="P2.x" :y2="P2.y" stroke="#60a5fa" stroke-width="3.4" opacity="0.9" />
      <line :x1="P1b.x" :y1="P1b.y" :x2="P2b.x" :y2="P2b.y" stroke="#60a5fa" stroke-width="3.4" opacity="0.9" />
      <path :d="beltWrap1" fill="none" stroke="#60a5fa" stroke-width="3.4" opacity="0.9" stroke-linecap="round" />
      <path :d="beltWrap2" fill="none" stroke="#60a5fa" stroke-width="3.4" opacity="0.9" stroke-linecap="round" />
      <g v-if="showRotation">
        <path :d="beltRot1.d" fill="none" stroke="#e2a846" stroke-width="2.8" opacity="0.9" stroke-linecap="round" />
        <polygon :points="beltRot1.head" fill="#e2a846" />
        <path :d="beltRot2.d" fill="none" stroke="#e2a846" stroke-width="2.8" opacity="0.9" stroke-linecap="round" />
        <polygon :points="beltRot2.head" fill="#e2a846" />
      </g>
      <circle :cx="B1.x" :cy="B1.y" r="4" fill="currentColor" opacity="0.8" />
      <circle :cx="B2.x" :cy="B2.y" r="4" fill="currentColor" opacity="0.8" />
      <circle :cx="P1.x" :cy="P1.y" r="5.5" fill="#e2a846" />
      <circle :cx="P2.x" :cy="P2.y" r="5.5" fill="#e2a846" />
      <text :x="P1.x - 9" :y="P1.y - 5" text-anchor="end" font-size="21" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">A</text>
      <text :x="P2.x + 11" :y="P2.y - 4" font-size="21" font-family="KaTeX_Math" font-style="italic" fill="#e2a846">B</text>
    </template>

    <template v-else>
      <circle :cx="G1.x" :cy="G1.y" :r="G_R1" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.7" />
      <line v-for="(t, i) in gearTeeth1" :key="`g1-${i}`" :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
      <circle :cx="G2.x" :cy="G2.y" :r="G_R2" fill="none" stroke="currentColor" stroke-width="2.4" opacity="0.7" />
      <line v-for="(t, i) in gearTeeth2" :key="`g2-${i}`" :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
      <g v-if="showRotation">
        <path :d="gearRot1.d" fill="none" stroke="#e2a846" stroke-width="2.8" opacity="0.9" stroke-linecap="round" />
        <polygon :points="gearRot1.head" fill="#e2a846" />
        <path :d="gearRot2.d" fill="none" stroke="#60a5fa" stroke-width="2.8" opacity="0.9" stroke-linecap="round" />
        <polygon :points="gearRot2.head" fill="#60a5fa" />
      </g>
      <circle :cx="G1.x" :cy="G1.y" r="4" fill="currentColor" opacity="0.8" />
      <circle :cx="G2.x" :cy="G2.y" r="4" fill="currentColor" opacity="0.8" />
      <circle :cx="contact.x" :cy="contact.y" r="5.5" fill="#e2a846" />
    </template>
  </svg>
</template>
