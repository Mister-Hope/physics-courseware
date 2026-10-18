<script setup lang="ts">
/**
 * 第 3 页示意图：沿任意路径下滑时重力做的功（微元法）。
 *
 * step 0：整条曲线路径 A → B（常显）
 * step 1：把路径分成许多小段，每小段近似看作一段倾斜的直线
 * step 2：高亮其中一小段，标出它与重力方向的夹角 θ_i、沿这一小段的位移 l_i、这一小段的高度差 Δh_i
 * step 3：标出各小段的高度差 Δh₁、Δh₂ …
 *
 * 只标符号，不标数值。viewBox 580×250，页面里按 380px 宽渲染（≈164px 高）。
 */
const { step = 0 } = defineProps<{
  /** 当前步（0–3） */
  step?: number;
}>();

const SEG = 6;
const A = { x: 70, y: 45 };
const B = { x: 490, y: 180 };

/** 路径参数：x 匀速、y 按二次增长（从 A 平滑俯冲到 B） */
const at = (t: number) => ({ x: A.x + (B.x - A.x) * t, y: A.y + (B.y - A.y) * t * t });

const pts = Array.from({ length: SEG + 1 }, (_, i) => at(i / SEG));
const polyD = pts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
const curveD = (() => {
  let d = `M ${A.x} ${A.y}`;

  for (let i = 1; i <= 40; i++) {
    const p = at(i / 40);

    d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }

  return d;
})();

/** 高亮的那一小段（第 3 段） */
const segA = at(2 / SEG);
const segB = at(3 / SEG);
const segMid = { x: (segA.x + segB.x) / 2, y: (segA.y + segB.y) / 2 };
const dhX = segB.x + 30;

/** 各小段的高度差标注位置 */
const ticks = Array.from({ length: SEG }, (_, i) => {
  const p = at(i / SEG);
  const q = at((i + 1) / SEG);

  return { x: (p.x + q.x) / 2 + 14, y1: p.y, y2: q.y };
});
</script>

<template>
  <svg viewBox="0 0 580 250" width="100%" style="max-width: 340px" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="沿任意曲线路径下滑时重力做的功">
    <SurfaceHatch :from="{ x: 30, y: 215 }" :to="{ x: 550, y: 215 }" side="below" :thickness="12" :gap="20" />
    <line x1="44" y1="45" x2="560" y2="45" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <line x1="44" y1="180" x2="560" y2="180" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="6 5" />
    <text x="556" y="38" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="cpm-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">1</tspan>
    </text>
    <text x="556" y="173" font-size="21" fill="var(--c-text-dim)" text-anchor="end" class="cpm-lbl">
      <tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="14" dy="5">2</tspan>
    </text>

    <path v-if="step < 1" :d="curveD" fill="none" stroke="var(--c-velocity)" stroke-width="3" stroke-linecap="round" />
    <path v-else :d="polyD" fill="none" stroke="var(--c-velocity)" stroke-width="3" stroke-linejoin="round" />
    <g v-if="step >= 1">
      <circle v-for="(p, i) in pts" :key="i" :cx="p.x" :cy="p.y" r="3.4" fill="var(--c-velocity)" />
    </g>

    <g v-if="step >= 2">
      <line :x1="segA.x" :y1="segA.y" :x2="segB.x" :y2="segB.y" stroke="var(--c-accent)" stroke-width="4.6" stroke-linecap="round" />
      <line :x1="segA.x" :y1="segA.y" :x2="segA.x" :y2="segA.y + 55" stroke="var(--c-text-dim)" stroke-width="1.5" stroke-dasharray="5 5" />
      <text :x="segA.x + 24" :y="segA.y + 46" font-size="20" fill="var(--c-accent)" class="cpm-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">θ</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="4">i</tspan>
      </text>
      <text :x="segMid.x + 2" :y="segMid.y - 14" font-size="20" fill="var(--c-velocity)" text-anchor="middle" class="cpm-lbl">
        <tspan font-family="KaTeX_Math" font-style="italic">l</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="4">i</tspan>
      </text>
      <line :x1="dhX" :y1="segA.y" :x2="dhX" :y2="segB.y" stroke="var(--c-accent)" stroke-width="2.2" />
      <line :x1="dhX - 8" :y1="segA.y" :x2="dhX + 8" :y2="segA.y" stroke="var(--c-accent)" stroke-width="2.2" />
      <line :x1="dhX - 8" :y1="segB.y" :x2="dhX + 8" :y2="segB.y" stroke="var(--c-accent)" stroke-width="2.2" />
      <text :x="dhX + 11" :y="segMid.y + 6" font-size="20" fill="var(--c-accent)" class="cpm-lbl">
        <tspan font-family="KaTeX_Main">Δ</tspan><tspan font-family="KaTeX_Math" font-style="italic">h</tspan><tspan font-family="KaTeX_Main" font-size="13" dy="4">i</tspan>
      </text>
    </g>

    <g v-if="step >= 3">
      <g v-for="(t, i) in ticks" :key="i">
        <line :x1="t.x" :y1="t.y1" :x2="t.x" :y2="t.y2" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.65" />
        <line :x1="t.x - 6" :y1="t.y1" :x2="t.x + 6" :y2="t.y1" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.65" />
        <line :x1="t.x - 6" :y1="t.y2" :x2="t.x + 6" :y2="t.y2" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.65" />
      </g>
    </g>

    <circle :cx="A.x" :cy="A.y" r="6.5" fill="var(--c-accent)" />
    <circle :cx="B.x" :cy="B.y" r="6.5" fill="var(--c-accent)" />
    <text :x="A.x - 13" :y="A.y - 4" font-size="21" fill="var(--c-text)" text-anchor="end" class="cpm-lbl">A</text>
    <text :x="B.x + 13" :y="B.y + 18" font-size="21" fill="var(--c-text)" class="cpm-lbl">B</text>
  </svg>
</template>

<style scoped>
.cpm-lbl {
  paint-order: stroke;
  stroke: var(--c-bg-soft);
  stroke-width: 3.4px;
}
</style>
