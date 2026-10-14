<!--
  选必二 1.3（第二课时）· 拓展页配图：正方形匀强磁场（边长 a）里，怎样射入待得最久？
  ── 两种入射点 ──
     variant="mid"    ：P = 一条边的中点；左图 ② 中等 r（轨迹圆与对边相切）、右图 ③ 较大 r（出射在对边角点，弦最长）
     variant="corner" ：P = 一个顶点；  左图 ② 中等 r（贴边擦入、出射在对边）、右图 ③ 较大 r（出射在对角顶点）
  ── 几何（物理坐标，边长 a = 1；画图乘 S = 140 并把 y 轴翻到屏幕向下）──
     mid  ② r=0.6a  C=(0.0528,0.4000) P=(0.5,0) Q=(0,0.9977)，弧擦过上边切点 T=(0.0528,1)
     mid  ③ r=1.5a  C=(1.9949,-0.1225) P=(0.5,0) Q=(1,1)，弦 = 到角点的最长弦 √5a/2
     corner ② r=0.7a C=(0,0.7) P=(0,0) Q=(0.6325,1)，速度沿底边擦入
     corner ③ r=1.5a C=(-0.4354,1.4354) P=(0,0) Q=(1,1)，弦 = 对角线 √2a
  ── 画法 ──
     磁场记号用共享 <FieldDots>（阵列裸 ×，铁律：不套圈）；轨迹弧 / 弦 / 速度箭头都画在阵列之后（上层）。
     大 r 构型的圆心跑出画面，只画弧与弦、不画圆心半径（中段构型才画 C 与两条虚线半径）。
-->
<script setup>
const { variant = "mid" } = defineProps({
  /** Mid = 从一条边的中点射入；corner = 从一个顶点射入 */
  variant: { type: String, default: "mid" },
});

/** 画布与两个面板（viewBox 用户单位）；两幅正方形等宽、左右留白对称，便于下方图注对齐 */
const VB = { w: 350, h: 196 };
const S = 140;
const O = [
  { x: 20, y: 26 },
  { x: 200, y: 26 },
];

const num = (v) => v.toFixed(2);
const TWO_PI = Math.PI * 2;
const mod = (v, m) => ((v % m) + m) % m;
// 物理坐标（x 向右、y 向上，边长 1）→ 面板 svg 坐标
const mp = (o, p) => ({ x: o.x + p[0] * S, y: o.y + (1 - p[1]) * S });

// 由圆心 c、半径 r、两端 p1/p2 与弧上一点 through 生成 SVG 圆弧（自动判 sweep / large-arc）
const arc = ({ c, r, p1, p2, through }) => {
  const a1 = Math.atan2(p1.y - c.y, p1.x - c.x);
  const a2 = Math.atan2(p2.y - c.y, p2.x - c.x);
  const d1 = mod(a2 - a1, TWO_PI);
  const d0 = mod(a1 - a2, TWO_PI);
  const on = (ang) => ({ x: c.x + r * Math.cos(ang), y: c.y + r * Math.sin(ang) });
  const far = (q) => Math.hypot(q.x - through.x, q.y - through.y);
  const sweep = far(on(a1 + d1 / 2)) <= far(on(a1 - d0 / 2)) ? 1 : 0;
  const delta = sweep === 1 ? d1 : d0;
  return `M ${num(p1.x)} ${num(p1.y)} A ${num(r)} ${num(r)} 0 ${delta > Math.PI ? 1 : 0} ${sweep} ${num(p2.x)} ${num(p2.y)}`;
};

/** 几何数据（物理坐标，边长 a = 1；v = 入射方向单位向量，lift = 速度箭头整体上移量） */
const GEO = {
  mid: [
    {
      r: 0.6,
      c: [0.0528, 0.4],
      p: [0.5, 0],
      q: [0, 0.9977],
      through: [0.0528, 1],
      v: [0.6667, 0.7454],
      lift: 0,
      vLabel: [126, 152],
      showC: true,
    },
    {
      r: 1.5,
      c: [1.9949, -0.1225],
      p: [0.5, 0],
      q: [1, 1],
      through: [0.6534, 0.5483],
      v: [0.0817, 0.9967],
      lift: 0,
      vLabel: [282, 142],
      showC: false,
    },
  ],
  corner: [
    {
      r: 0.7,
      c: [0, 0.7],
      p: [0, 0],
      q: [0.6325, 1],
      through: [0.5916, 0.3258],
      v: [1, 0],
      lift: 7,
      vLabel: [74, 150],
      showC: true,
    },
    {
      r: 1.5,
      c: [-0.4354, 1.4354],
      p: [0, 0],
      q: [1, 1],
      through: [0.6252, 0.3748],
      v: [0.9567, 0.29],
      lift: 0,
      vLabel: [252, 173],
      showC: false,
    },
  ],
};

// 逐面板算出全部 svg 坐标
const panels = () => {
  const list = GEO[variant === "corner" ? "corner" : "mid"];
  return list.map((g, i) => {
    const o = O[i];
    const c = mp(o, g.c);
    const p = mp(o, g.p);
    const q = mp(o, g.q);
    const through = mp(o, g.through);
    const r = g.r * S;
    const from = { x: p.x, y: p.y - g.lift };
    const to = { x: p.x + 46 * g.v[0], y: p.y - g.lift - 46 * g.v[1] };
    return {
      o,
      c,
      p,
      q,
      r,
      arc: arc({ c, r, p1: p, p2: q, through }),
      chord: `M ${num(p.x)} ${num(p.y)} L ${num(q.x)} ${num(q.y)}`,
      radii: `M ${num(c.x)} ${num(c.y)} L ${num(p.x)} ${num(p.y)} M ${num(c.x)} ${num(c.y)} L ${num(q.x)} ${num(q.y)}`,
      from,
      to,
      vLabel: g.vLabel,
      showC: g.showC,
      corner: i === 1,
    };
  });
};

const MATH = "KaTeX_Math, 'Times New Roman', serif";
const FS = 22;
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };
</script>

<template>
  <div class="w-full">
    <svg :viewBox="`0 0 ${VB.w} ${VB.h}`" xmlns="http://www.w3.org/2000/svg" class="h-auto w-full">
      <template v-for="(panel, i) in panels()" :key="i">
        <rect
          :x="panel.o.x"
          :y="panel.o.y"
          :width="S"
          :height="S"
          fill="rgba(226,168,70,0.06)"
          stroke="var(--c-accent)"
          stroke-opacity="0.75"
          stroke-width="2.2"
        />
        <FieldDots
          :x="panel.o.x + 22"
          :y="panel.o.y + 22"
          :cols="4"
          :rows="4"
          :spacing="24"
          :size="4"
          :lineWidth="1.4"
          :opacity="0.5"
          dir="in"
        />
        <path
          :d="panel.chord"
          fill="none"
          stroke="rgba(203,213,225,0.55)"
          stroke-width="1.8"
          stroke-dasharray="7 6"
        />
        <path
          :d="panel.arc"
          fill="none"
          stroke="#60a5fa"
          stroke-width="3.6"
          stroke-linecap="round"
        />
        <template v-if="panel.showC">
          <path
            :d="panel.radii"
            fill="none"
            stroke="rgba(226,168,70,0.85)"
            stroke-width="1.7"
            stroke-dasharray="8 7"
          />
          <circle :cx="panel.c.x" :cy="panel.c.y" r="4.6" fill="#f8fafc" />
          <text
            v-bind="HALO"
            :x="panel.c.x + 10"
            :y="panel.c.y - 8"
            :font-family="MATH"
            font-style="italic"
            :font-size="FS"
            fill="#f8fafc"
          >
            C
          </text>
        </template>
        <CourseArrow :from="panel.from" :to="panel.to" stroke="#60a5fa" stroke-width="3.2" />
        <text
          v-bind="HALO"
          :x="panel.vLabel[0]"
          :y="panel.vLabel[1]"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="#60a5fa"
        >
          v
        </text>
        <circle :cx="panel.p.x" :cy="panel.p.y" r="5.4" fill="#f8fafc" />
        <circle
          :cx="panel.q.x"
          :cy="panel.q.y"
          r="5.4"
          :fill="panel.corner ? '#e2a846' : '#f8fafc'"
        />
        <text
          v-bind="HALO"
          :x="panel.p.x - 14"
          :y="panel.p.y + 24"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="#f8fafc"
        >
          P
        </text>
        <text
          v-bind="HALO"
          :x="panel.q.x > 250 ? panel.q.x - 26 : panel.q.x + 10"
          :y="panel.q.y + 26"
          :font-family="MATH"
          font-style="italic"
          :font-size="FS"
          fill="#f8fafc"
        >
          Q
        </text>
      </template>
    </svg>
    <div class="fig-cap">左：相切构型　　右：过角构型</div>
  </div>
</template>
