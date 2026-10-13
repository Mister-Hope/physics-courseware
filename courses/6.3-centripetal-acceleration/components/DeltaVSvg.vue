<!--
  第 3 页：用速度的变化量 Δv 判断向心加速度的方向（教材"拓展学习"的四步）。
  每个小图中：物体沿圆（虚线轨迹）做匀速圆周运动，A、B 是它先后经过的两点（屏幕上顺时针）。
   甲 —— 画出 A、B 两点的速度 v_A、v_B（沿切线）；
   乙 —— 把 v_A 平移到 B 点（灰色虚线箭头）；
   丙 —— 由 v_A 的箭头端指向 v_B 的箭头端，作出 Δv（等腰三角形）；
   丁 —— 让 B 靠近 A（A、B 只隔 16°，中点取在圆的最右端）：此时 Δv 几乎与 v 垂直、水平指回圆心 O。
  版面：四个小图各占一个等宽面板，共用同一套局部坐标、整体平移 i * 190 —— 四圆等大、间距均匀、基线对齐；
  标注一律带深色描边光晕，避免压住箭头与虚线；小图下方的图注按面板居中，互不接触。
-->
<script setup lang="ts">
withDefaults(defineProps<{ step?: number }>(), { step: 0 });

interface Vec {
  x: number;
  y: number;
}

interface ArrowSpec {
  from: Vec;
  to: Vec;
  stroke: string;
  width: number;
  /** 虚线样式（平移用的辅助箭头） */
  dash?: string;
  /** 箭头三角形长度；不写则按线宽自动 */
  head?: number;
}

interface LabelSpec {
  text: string;
  /** 角标（如 v 的 A、B） */
  sub?: string;
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  size: number;
  fill: string;
  /** 物理量符号用 KaTeX_Math 斜体；汉字用 KaTeX_Main */
  math: boolean;
}

interface CapSeg {
  t: string;
  /** 物理量符号段（斜体） */
  math?: boolean;
  /** 角标段（更小、下沉） */
  sub?: boolean;
}

const PANEL = 190;
const CX = 95;
const CY = 126;
const R = 66;
const V = 58;
const CAP_Y = 240;
const TAGS = ["甲", "乙", "丙", "丁"];

const CAPTIONS: CapSeg[][] = [
  [{ t: "画出 " }, { t: "A", math: true }, { t: "、" }, { t: "B", math: true }, { t: " 的速度" }],
  [{ t: "把 " }, { t: "v", math: true }, { t: "A", sub: true }, { t: " 平移到 " }, { t: "B", math: true }, { t: " 点" }],
  [{ t: "作出速度变化量 " }, { t: "Δv", math: true }],
  [{ t: "Δv", math: true }, { t: " 指向圆心" }],
];

const rad = (d: number) => (d * Math.PI) / 180;
/** 圆周上角度 deg 处的点（屏幕坐标，y 轴向下） */
const onCircle = (deg: number): Vec => ({ x: CX + R * Math.cos(rad(deg)), y: CY + R * Math.sin(rad(deg)) });
/** 顺时针经过该处时的速度方向（切线） */
const tangent = (deg: number): Vec => ({ x: -Math.sin(rad(deg)), y: Math.cos(rad(deg)) });
const along = (p: Vec, d: Vec, k: number): Vec => ({ x: p.x + d.x * k, y: p.y + d.y * k });
/** 由圆心指向 deg 方向的单位矢量：把点的标注甩到圆外 */
const outward = (deg: number): Vec => ({ x: Math.cos(rad(deg)), y: Math.sin(rad(deg)) });

/** 前三个小图 A、B 相隔 40°；丁图只隔 16°（中点取在圆的最右端）， 此时作出的 Δv 恰与 v 垂直、水平指回圆心 —— 这正是"B 无限靠近 A 时 Δv 沿半径"的关键。 */
const panels = [0, 1, 2, 3].map((i) => {
  const small = i === 3;
  const thetaA = small ? -8 : 200;
  const thetaB = small ? 8 : 240;
  const A = onCircle(thetaA);
  const B = onCircle(thetaB);
  const vAtip = along(A, tangent(thetaA), V);
  const vBtip = along(B, tangent(thetaB), V);
  const vAtipAtB = along(B, tangent(thetaA), V);

  const arrows: ArrowSpec[] = [
    { from: A, to: vAtip, stroke: "#60a5fa", width: 3 },
    { from: B, to: vBtip, stroke: "#60a5fa", width: 3 },
  ];
  if (i === 1) arrows.push({ from: B, to: vAtipAtB, stroke: "#94a3b8", width: 2.4, dash: "7 5", head: 9 });
  if (i >= 2) arrows.push({ from: vAtipAtB, to: vBtip, stroke: "#e2a846", width: 3.2, head: small ? 10 : 12 });

  const labels: LabelSpec[] = [
    { text: TAGS[i], x: 14, y: 30, anchor: "start", size: 27, fill: "#94a3b8", math: false },
    { text: "O", x: CX - 9, y: CY + 19, anchor: "end", size: 23, fill: "#94a3b8", math: true },
  ];
  if (small) {
    // 丁图里 A、B 挤在圆的最右端，两个标注统一右对齐、排到圆的左侧
    labels.push(
      { text: "A", x: 145, y: 106, anchor: "end", size: 23, fill: "#f1f5f9", math: true },
      { text: "B", x: 145, y: 153, anchor: "end", size: 23, fill: "#f1f5f9", math: true },
     { text: "Δv", x: 150, y: 214, anchor: "end", size: 24, fill: "#e2a846", math: true });
  } else {
    const aAt = along(A, outward(thetaA), 14);
    labels.push(
      { text: "A", x: aAt.x, y: aAt.y, anchor: "middle", size: 23, fill: "#f1f5f9", math: true },
      { text: "B", x: 80, y: 81, anchor: "start", size: 23, fill: "#f1f5f9", math: true },
     { text: "v", sub: "A", x: vAtip.x - 13, y: vAtip.y + 2, anchor: "end", size: 25, fill: "#60a5fa", math: true }, { text: "v", sub: "B", x: vBtip.x + 10, y: vBtip.y + 6, anchor: "start", size: 25, fill: "#60a5fa", math: true });
    if (i === 1) labels.push({ text: "v", sub: "A", x: vAtipAtB.x + 8, y: vAtipAtB.y + 10, anchor: "start", size: 22, fill: "#94a3b8", math: true });

    if (i === 2) labels.push({ text: "Δv", x: 124, y: 21, anchor: "middle", size: 24, fill: "#e2a846", math: true });
  }

  return { x: i * PANEL, A, B, arrows, labels, caption: CAPTIONS[i] };
});
</script>

<template>
  <svg
    viewBox="0 0 760 258"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    style=" display: block;max-width: 60rem; margin: 0 auto"
    role="img"
    aria-label="分四步作出速度的变化量 Δv，并看出它指向圆心"
  >
    <g v-for="(p, i) in panels" v-show="i <= step" :key="i" :transform="`translate(${p.x} 0)`">
      <circle :cx="CX" :cy="CY" :r="R" fill="none" stroke="#2dd4bf" stroke-width="2.4" stroke-dasharray="8 7" opacity="0.55" />
      <line :x1="CX" :y1="CY" :x2="p.A.x" :y2="p.A.y" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.45" />
      <line :x1="CX" :y1="CY" :x2="p.B.x" :y2="p.B.y" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="5 5" opacity="0.45" />
      <circle :cx="CX" :cy="CY" r="3.4" fill="#94a3b8" />
      <circle :cx="p.A.x" :cy="p.A.y" r="5" fill="#f1f5f9" />
      <circle :cx="p.B.x" :cy="p.B.y" r="5" fill="#f1f5f9" />
      <CourseArrow
        v-for="(a, k) in p.arrows"
        :key="k"
        :from="a.from"
        :to="a.to"
        :stroke="a.stroke"
        :stroke-width="a.width"
        :stroke-dasharray="a.dash"
        :head-size="a.head ?? 0"
      />
      <text
        v-for="(l, k) in p.labels"
        :key="k"
        :x="l.x"
        :y="l.y"
        :text-anchor="l.anchor"
        :font-family="l.math ? 'KaTeX_Math' : 'KaTeX_Main'"
        :font-style="l.math ? 'italic' : 'normal'"
        :font-size="l.size"
        :fill="l.fill"
        stroke="#0f1425"
        stroke-width="4"
        paint-order="stroke"
      >
        {{ l.text }}
        <tspan v-if="l.sub" font-family="KaTeX_Main" font-style="normal" :font-size="l.size * 0.58" dy="5">{{ l.sub }}</tspan>
      </text>
      <text :x="CX" :y="CAP_Y" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="#94a3b8">
        <tspan
          v-for="(seg, si) in p.caption"
          :key="si"
          :font-family="seg.math ? 'KaTeX_Math' : 'KaTeX_Main'"
          :font-style="seg.math ? 'italic' : 'normal'"
          :font-size="seg.sub ? 13 : 19"
          :dy="seg.sub ? 4 : p.caption[si - 1]?.sub ? -4 : 0"
        >
          {{ seg.t }}
        </tspan>
      </text>
    </g>
  </svg>
</template>
