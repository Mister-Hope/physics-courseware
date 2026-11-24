<!--
  4.2 P7：电磁波是横波（三维投影 + 亮度分层）
  —— 传播轴沿 x（水平虚轴，末端标 c）；电场 E 在竖直平面内做正弦变化（青绿），
     磁场 B 在水平面内做正弦变化（金色），两者都与传播方向垂直、且互相垂直；
     两条曲线与轴之间填半透明色块（波瓣感），水平面铺参考网格强化纵深，波峰处用短箭头指出方向。
  常显（无分步）；E 用 --c-physics，B 用 --c-accent。
-->
<template>
  <svg :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`" width="100%" xmlns="http://www.w3.org/2000/svg" class="select-none" aria-hidden="true">
    <defs>
      <filter :id="glowId" x="-25%" y="-25%" width="150%" height="150%">
        <feGaussianBlur stdDeviation="2.6" />
      </filter>
      <linearGradient :id="axisFadeId" x1="0" x2="1">
        <stop offset="0" stop-color="var(--c-text-dim)" stop-opacity="0.12" />
        <stop offset="0.18" stop-color="var(--c-text-dim)" stop-opacity="0.7" />
        <stop offset="1" stop-color="var(--c-text-dim)" stop-opacity="0.35" />
      </linearGradient>
      <linearGradient :id="eFillId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-physics)" stop-opacity="0.34" />
        <stop offset="0.5" stop-color="var(--c-physics)" stop-opacity="0.08" />
        <stop offset="1" stop-color="var(--c-physics)" stop-opacity="0.3" />
      </linearGradient>
      <linearGradient :id="bFillId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--c-accent)" stop-opacity="0.3" />
        <stop offset="0.5" stop-color="var(--c-accent)" stop-opacity="0.07" />
        <stop offset="1" stop-color="var(--c-accent)" stop-opacity="0.26" />
      </linearGradient>
    </defs>

    <g :transform="fitTransform">
      <!-- 水平面参考网格（x–z 平面，y = 0）：只给纵深，不抢主体 -->
      <g stroke="var(--c-border)" stroke-width="1" opacity="0.45">
        <line v-for="g in gridLines" :key="g.k" :x1="g.x1" :y1="g.y1" :x2="g.x2" :y2="g.y2" />
      </g>

      <!-- 波瓣填充：曲线与传播轴之间 -->
      <path :d="eFillPath" :fill="`url(#${eFillId})`" stroke="none" />
      <path :d="bFillPath" :fill="`url(#${bFillId})`" stroke="none" />

      <!-- 传播轴 -->
      <line :x1="axisStart.x" :y1="axisStart.y" :x2="axisEnd.x" :y2="axisEnd.y" :stroke="`url(#${axisFadeId})`" stroke-width="2" stroke-dasharray="9 7" />
      <CourseArrow :from="axisEnd" :to="{ x: axisEnd.x + 26, y: axisEnd.y - 10 }" stroke="var(--c-text-dim)" :stroke-width="2" :head-size="9" />
      <text :x="axisEnd.x + 34" :y="axisEnd.y - 8" font-family="KaTeX_Math" font-style="italic" font-size="27" fill="var(--c-text-dim)">c</text>

      <!-- 电场 E：竖直平面内的正弦波 -->
      <path :d="ePath" fill="none" stroke="var(--c-physics)" stroke-width="7" opacity="0.16" :filter="`url(#${glowId})`" />
      <path :d="ePath" fill="none" stroke="var(--c-physics)" stroke-width="2.8" stroke-linecap="round" />

      <!-- 磁场 B：水平面内的正弦波 -->
      <path :d="bPath" fill="none" stroke="var(--c-accent)" stroke-width="7" opacity="0.14" :filter="`url(#${glowId})`" />
      <path :d="bPath" fill="none" stroke="var(--c-accent)" stroke-width="2.8" stroke-linecap="round" />

      <!-- 波峰处的 E、B 方向箭头（从轴指向波形） -->
      <g v-for="p in crests" :key="p.k">
        <CourseArrow :from="p.base" :to="p.e" stroke="var(--c-physics)" :stroke-width="2" :head-size="8" />
        <CourseArrow :from="p.base" :to="p.b" stroke="var(--c-accent)" :stroke-width="2" :head-size="8" />
      </g>

      <!-- 量名 -->
      <text :x="eLabel.x" :y="eLabel.y" font-family="KaTeX_Math" font-style="italic" font-size="27" text-anchor="middle" fill="var(--c-physics)">E</text>
      <text :x="bLabel.x" :y="bLabel.y" font-family="KaTeX_Math" font-style="italic" font-size="27" text-anchor="middle" fill="var(--c-accent)">B</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { useId } from "vue";

const VIEW_W = 880;
const VIEW_H = 400;

/** 三维投影参数：先绕 Y 轴（yaw）再绕 X 轴（pitch），FOV 做透视缩放 */
const YAW = -0.48;
const PITCH = 0.24;
const FOV = 2600;
const CX = 0;
const CY = 0;

const LAMBDA = 210;
const AMP = 84;
const X_FROM = -30;
const X_TO = 600;
const X_MID = (X_FROM + X_TO) / 2;

const glowId = `emw-glow-${useId()}`;
const axisFadeId = `emw-axis-${useId()}`;
const eFillId = `emw-efill-${useId()}`;
const bFillId = `emw-bfill-${useId()}`;

interface Point {
  x: number;
  y: number;
}

const cosYaw = Math.cos(YAW);
const sinYaw = Math.sin(YAW);
const cosPitch = Math.cos(PITCH);
const sinPitch = Math.sin(PITCH);

/** 世界坐标 → 投影坐标（透视缩放前的画布坐标） */
const project = (wx: number, wy: number, wz: number): Point => {
  const xr = wx - X_MID;
  const x1 = xr * cosYaw + wz * sinYaw;
  const z1 = -xr * sinYaw + wz * cosYaw;
  const y2 = wy * cosPitch - z1 * sinPitch;
  const z2 = wy * sinPitch + z1 * cosPitch;
  const s = FOV / (FOV - z2);

  return { x: CX + x1 * s, y: CY - y2 * s };
};

const k = (2 * Math.PI) / LAMBDA;

const toPath = (points: Point[]): string => points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

const samples = ((): number[] => {
  const out: number[] = [];

  for (let x = X_FROM; x <= X_TO; x += 4) out.push(x);

  return out;
})();

const ePoints = samples.map((x) => project(x, AMP * Math.sin(k * (x - X_FROM)), 0));
const bPoints = samples.map((x) => project(x, 0, AMP * Math.sin(k * (x - X_FROM))));
const axisPoints = samples.map((x) => project(x, 0, 0));

/** 曲线 + 回程沿轴 → 可填充的闭环（波瓣） */
const lobePath = (points: Point[]): string =>
  `${toPath(points)} L${axisPoints[axisPoints.length - 1].x.toFixed(1)},${axisPoints[axisPoints.length - 1].y.toFixed(1)} ${[...axisPoints]
    .reverse()
    .map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")} Z`;

const ePath = toPath(ePoints);
const bPath = toPath(bPoints);
const eFillPath = lobePath(ePoints);
const bFillPath = lobePath(bPoints);

/** 整体自适应：把画好的图形按包围盒等比缩放并居中到 viewBox */
const fitTransform = ((): string => {
  const all = [...ePoints, ...bPoints, ...axisPoints];
  const xs = all.map((p) => p.x);
  const ys = all.map((p) => p.y);
  const minX = Math.min(...xs) - 54;
  const maxX = Math.max(...xs) + 96;
  const minY = Math.min(...ys) - 34;
  const maxY = Math.max(...ys) + 34;
  const bw = maxX - minX;
  const bh = maxY - minY;
  const s = Math.min((VIEW_W * 0.98) / bw, (VIEW_H * 0.96) / bh);

  return `translate(${(VIEW_W - bw * s) / 2 - minX * s} ${(VIEW_H - bh * s) / 2 - minY * s}) scale(${s})`;
})();

const axisStart = project(X_FROM - 8, 0, 0);
const axisEnd = project(X_TO, 0, 0);

/** 波峰（sin = 1）与波谷（sin = -1）处的方向箭头 */
const crests = ((): { k: string; base: Point; e: Point; b: Point }[] => {
  const out: { k: string; base: Point; e: Point; b: Point }[] = [];

  for (let x = X_FROM + LAMBDA / 4; x <= X_TO; x += LAMBDA / 2) {
    const s = Math.sin(k * (x - X_FROM));
    const dir = s > 0 ? 1 : -1;

    out.push({
      k: `c-${x.toFixed(0)}`,
      base: project(x, 0, 0),
      e: project(x, dir * (AMP + 2), 0),
      b: project(x, 0, dir * (AMP + 2)),
    });
  }

  return out;
})();

const eLabel = project(X_FROM + LAMBDA / 4, AMP + 30, 0);
const bLabel = ((): { x: number; y: number } => {
  const p = project(X_FROM + 4, 0, -AMP - 52);

  return { x: p.x - 6, y: p.y + 20 };
})();

/** 水平面网格：x 方向 12 条、z 方向 5 条 */
const gridLines = ((): { k: string; x1: number; y1: number; x2: number; y2: number }[] => {
  const out: { k: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  const zSpan = AMP + 40;

  for (let x = X_FROM; x <= X_TO; x += 55) {
    const a = project(x, 0, -zSpan);
    const b = project(x, 0, zSpan);

    out.push({ k: `gx-${x}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }

  for (const z of [-zSpan, -zSpan / 2, 0, zSpan / 2, zSpan]) {
    const a = project(X_FROM, 0, z);
    const b = project(X_TO, 0, z);

    out.push({ k: `gz-${z}`, x1: a.x, y1: a.y, x2: b.x, y2: b.y });
  }

  return out;
})();
</script>
