<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
/** 第 6 页「演示：观察磁体周围的磁场」——玻璃板上撒铁屑后的分布： 未撒（空白板）→ 撒上铁屑 → 轻敲（沿磁场排列）→ 叠加磁感线 → 某点切线方向。 铁屑取向按有限长条形磁铁的两磁极模型解析式计算，磁感线按 RK4 数值积分从 N 极逐点连到 S 极。 */
import { computed } from "vue";

const { step: stepProp = 0 } = defineProps<{
  /** 分步：1 撒铁屑、2 轻敲排列、3 叠加磁感线、4 标某点切线 */
  step?: number;
}>();

const { $clicks } = useSlideContext();
const step = computed(() => Math.max(stepProp, Number($clicks.value ?? 0)));

const W = 780;
const H = 340;
// 磁铁：中心 (390,170)，半长 a、半宽 b（用户单位，16px 体系）
const CX = 390;
const CY = 170;
const A = 120;
const BW = 34;
// 有限长条形磁铁：两端等效为 ±两个磁极（点偶极只是远场近似，它的磁感线在本画布内闭合不回 S 极）
// B = (r − r_N)/|r − r_N|³ − (r − r_S)/|r − r_S|³（系数只决定场强标度、不影响方向）
const barField = (x: number, y: number): readonly [number, number] => {
  const dxN = x - (CX + A);
  const dyN = y - CY;
  const dxS = x - (CX - A);
  const dyS = y - CY;
  // 磁极附近 r → 0：给 r³ 一个下限，避免除零得到 Infinity / NaN（方向仍由偏移矢决定）
  const rN3 = Math.max(Math.hypot(dxN, dyN) ** 3, 1e-3);
  const rS3 = Math.max(Math.hypot(dxS, dyS) ** 3, 1e-3);

  return [dxN / rN3 - dxS / rS3, dyN / rN3 - dyS / rS3] as const;
};

const fieldAngle = (x: number, y: number): number => {
  const [bx, by] = barField(x, y);
  return Math.atan2(by, bx);
};

// ── 铁屑颗粒（模块级预生成一次，抖动固定）────────────────────
/* eslint-disable no-bitwise, prefer-math-trunc, operator-assignment --
   mulberry32 是「32 位整数位运算」伪随机数发生器：位运算是它的定义，换成算术会改变分布与序列 */
const mulberry32 = (seed: number): (() => number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
/* eslint-enable no-bitwise, prefer-math-trunc, operator-assignment */

interface Grain {
  x: number;
  y: number;
  jitter: number;
  len: number;
  op: number;
  tone: number;
}

const GRAINS: Grain[] = (() => {
  const rnd = mulberry32(20261018);
  const out: Grain[] = [];
  for (let gy = 34; gy < H - 20; gy += 30) {
    for (let gx = 44; gx < W - 20; gx += 34) {
      const x = gx + (rnd() - 0.5) * 24;
      const y = gy + (rnd() - 0.5) * 22;
      // 磁铁内部不撒
      if (Math.abs(x - CX) < A + 6 && Math.abs(y - CY) < BW + 6) continue;
      out.push({
        x,
        y,
        jitter: (rnd() - 0.5) * 1.1,
        len: 8 + rnd() * 6,
        op: 0.5 + rnd() * 0.4,
        tone: rnd(),
      });
    }
  }
  return out;
})();

// ── 磁感线（从 N 极出发沿磁场积分到 S 极）────────────────────
interface FieldLine {
  d: string;
  pts: [number, number][];
}

/* eslint-disable max-statements, complexity --
   RK4 逐点积分是一条线性数值流水线（每步都要带上一步的 4 个斜率与游标），拆成子函数只会把
   十几个状态变量到处传，反而更难核对物理过程 */
const buildLines = (): FieldLine[] => {
  const lines: FieldLine[] = [];
  const seeds: [number, number][] = [];
  for (let i = 1; i <= 4; i++) {
    const s = i * 13;
    seeds.push([CX + A - 4, CY - s], [CX + A - 4, CY + s], [CX - A + 4, CY - s], [CX - A + 4, CY + s]);
  }
  seeds.push([CX + 4, CY - BW - 4], [CX + 4, CY + BW + 4], [CX - 4, CY - BW - 4], [CX - 4, CY + BW + 4]);

  for (const [sx, sy] of seeds) {
    let x = sx;
    let y = sy;
    let dir: 1 | -1 = sx > CX ? 1 : -1;
    const pts: [number, number][] = [[x, y]];
    let stuck = 0;
    for (let i = 0; i < 900; i++) {
      const [bx, by] = barField(x, y);
      const mag = Math.hypot(bx, by);
      if (!Number.isFinite(mag) || mag < 1e-9) break;
      const ux = (bx / mag) * dir;
      const uy = (by / mag) * dir;
      const h = 3;
      // RK4
      const [b2x, b2y] = barField(x + (h / 2) * ux, y + (h / 2) * uy);
      const m2 = Math.hypot(b2x, b2y) || 1;
      const u2x = (b2x / m2) * dir;
      const u2y = (b2y / m2) * dir;
      const [b3x, b3y] = barField(x + (h / 2) * u2x, y + (h / 2) * u2y);
      const m3 = Math.hypot(b3x, b3y) || 1;
      const u3x = (b3x / m3) * dir;
      const u3y = (b3y / m3) * dir;
      const [b4x, b4y] = barField(x + h * u3x, y + h * u3y);
      const m4 = Math.hypot(b4x, b4y) || 1;
      const u4x = (b4x / m4) * dir;
      const u4y = (b4y / m4) * dir;
      x += (h / 6) * (ux + 2 * u2x + 2 * u3x + u4x);
      y += (h / 6) * (uy + 2 * u2y + 2 * u3y + u4y);
      if (x < -30 || x > W + 30 || y < -30 || y > H + 30) break;
      pts.push([x, y]);
      // 终点判定：回到磁铁另一极附近
      const nearOther = (dir === 1 && Math.abs(y - CY) < BW + 14 && x < CX + 20) || (dir === -1 && Math.abs(y - CY) < BW + 14 && x > CX - 20);
      if (nearOther && i > 60) {
        stuck += 1;
        if (stuck > 4) break;
      }
    }
    if (pts.length < 8) continue;
    lines.push({ d: pts.map((p, i) => `${i ? "L" : "M"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "), pts });
  }
  return lines;
}

const lines = buildLines();

const showLines = computed(() => step.value >= 3);

// 第 4 步：取最长那条线做切线示意，取其上一点
const tangent = computed(() => {
  if (step.value < 4) return null;
  const [longest] = [...lines].sort((a, b) => b.pts.length - a.pts.length);
  if (!longest) return null;
  const idx = Math.min(40, longest.pts.length - 2);
  const [x1, y1] = longest.pts[idx];
  const [x2, y2] = longest.pts[idx + 1];
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const L = 110;
  const ax = x1 - Math.cos(ang) * L;
  const ay = y1 - Math.sin(ang) * L;
  const bx = x1 + Math.cos(ang) * L;
  const by = y1 + Math.sin(ang) * L;
  return { x: x1, y: y1, ax, ay, bx, by };
});
</script>

<template>
  <svg :width="W" :height="H" :viewBox="`0 0 ${W} ${H}`" class="block max-w-full" style="margin: 0 auto">
    <defs>
      <marker id="mf-tan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" :fill="'var(--c-accent)'" />
      </marker>
      <clipPath id="mf-board-clip">
        <rect x="16" y="18" :width="W - 32" :height="H - 36" rx="14" />
      </clipPath>
    </defs>

    <!-- 玻璃板 -->
    <rect x="16" y="18" :width="W - 32" :height="H - 36" rx="14" fill="rgba(15,20,37,0.55)" stroke="var(--c-border)" stroke-width="1.5" />

    <g clip-path="url(#mf-board-clip)">
      <!-- 铁屑（step≥1 出现；step≥2 沿磁场排列） -->
      <g v-if="step >= 1">
        <line
          v-for="(g, i) in GRAINS"
          :key="i"
          :x1="g.x - (step >= 2 ? (g.len / 2) * Math.cos(fieldAngle(g.x, g.y) + g.jitter) : g.len / 2)"
          :y1="g.y - (step >= 2 ? (g.len / 2) * Math.sin(fieldAngle(g.x, g.y) + g.jitter) : 0)"
          :x2="g.x + (step >= 2 ? (g.len / 2) * Math.cos(fieldAngle(g.x, g.y) + g.jitter) : g.len / 2)"
          :y2="g.y + (step >= 2 ? (g.len / 2) * Math.sin(fieldAngle(g.x, g.y) + g.jitter) : 0)"
          :stroke="g.tone > 0.45 ? '#94a3b8' : '#cbd5e1'"
          stroke-width="1.7"
          stroke-linecap="round"
          :opacity="g.op * (step >= 2 ? 0.95 : 0.7)"
        />
      </g>

      <!-- 条形磁铁（画在铁屑之上，始终可见） -->
      <g>
        <rect :x="CX - A" :y="CY - BW" :width="A" :height="BW * 2" rx="5" fill="rgba(248,113,113,0.85)" stroke="#f87171" stroke-width="1.5" />
        <rect :x="CX" :y="CY - BW" :width="A" :height="BW * 2" rx="5" fill="rgba(96,165,250,0.85)" stroke="#60a5fa" stroke-width="1.5" />
        <text :x="CX - A / 2" :y="CY + 6" text-anchor="middle" font-size="21" font-weight="700" fill="#0b1020" font-family="KaTeX_Main">N</text>
        <text :x="CX + A / 2" :y="CY + 6" text-anchor="middle" font-size="21" font-weight="700" fill="#0b1020" font-family="KaTeX_Main">S</text>
      </g>

      <!-- 磁感线 -->
      <g v-if="showLines" fill="none" stroke="var(--c-field)" stroke-width="1.8" opacity="0.85">
        <path v-for="(l, i) in lines" :key="i" :d="l.d" />
      </g>

      <!-- 某点切线方向 -->
      <g v-if="tangent">
        <line
          :x1="tangent.ax"
          :y1="tangent.ay"
          :x2="tangent.bx - Math.cos(Math.atan2(tangent.by - tangent.ay, tangent.bx - tangent.ax)) * 6"
          :y2="tangent.by - Math.sin(Math.atan2(tangent.by - tangent.ay, tangent.bx - tangent.ax)) * 6"
          stroke="var(--c-accent)"
          stroke-width="2.4"
          stroke-dasharray="7 5"
          marker-end="url(#mf-tan)"
        />
        <circle :cx="tangent.x" :cy="tangent.y" r="4.5" fill="var(--c-accent)" />
        <text :x="tangent.x + 10" :y="tangent.y - 10" font-size="14" fill="var(--c-text-dim)" font-family="KaTeX_Main">P</text>
      </g>
    </g>

    <!-- 板下示意：磁场方向由 N 极出发 -->
    <text :x="W / 2" :y="H - 4" text-anchor="middle" font-size="13" fill="var(--c-text-dim)" font-family="KaTeX_Main" :opacity="step >= 1 ? 1 : 0">
      玻璃板上撒铁屑 · 轻敲后沿磁场方向排列
    </text>
  </svg>
</template>
