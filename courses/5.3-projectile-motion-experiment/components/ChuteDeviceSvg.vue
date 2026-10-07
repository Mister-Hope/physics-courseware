<script setup lang="ts">
/** 第 9 页：探究平抛运动水平分运动的装置（教材图 5.3-3）。 斜槽末端水平、白纸与复写纸固定在竖直背板上、可上下调节的水平挡板 N（教材上挡板严格水平）； step 1 标斜槽与小球，step 2 标纸与背板，step 3 标挡板与印迹。 */
const { step = 0 } = defineProps<{ step?: number }>();

/** 小球离开斜槽时的球心位置；水平挡板的高度；轨迹与挡板的交点就是印迹 */
const RELEASE = { x: 214, y: 123 };
const SPAN_X = 160;
const SPAN_Y = 110;
const PLATE_Y = 216;
const PLATE_FROM = 300;
const PLATE_TO = 450;
const IMPACT_T = Math.sqrt((PLATE_Y - RELEASE.y) / SPAN_Y);
const pathD = ((): string => {
  const points = Array.from({ length: 25 }, (_, i) => {
    const t = (IMPACT_T * i) / 24;

    return { x: RELEASE.x + SPAN_X * t, y: RELEASE.y + SPAN_Y * t * t };
  });

  return points.map((point, i) => `${i === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
})();
const IMPACT = { x: RELEASE.x + SPAN_X * IMPACT_T, y: PLATE_Y };
</script>

<template>
  <svg viewBox="0 0 520 360" width="100%" style="max-width: 540px" xmlns="http://www.w3.org/2000/svg">
    <rect x="196" y="26" width="290" height="306" rx="8" fill="rgba(30,41,59,0.55)" stroke="rgba(148,163,184,0.35)" stroke-width="2" />
    <rect x="212" y="42" width="258" height="274" fill="rgba(241,245,249,0.05)" stroke="rgba(148,163,184,0.35)" stroke-width="1.6" stroke-dasharray="7 5" />
    <rect x="212" y="42" width="258" height="20" fill="rgba(139,92,246,0.22)" />
    <path d="M 52 62 L 176 132 L 212 132" fill="none" stroke="#94a3b8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 52 62 L 176 132 L 212 132" fill="none" stroke="rgba(15,20,37,0.85)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="196" cy="121" r="10" fill="#60a5fa" stroke="#93c5fd" stroke-width="2" />
    <path :d="pathD" fill="none" stroke="rgba(226,168,70,0.6)" stroke-width="2.2" stroke-dasharray="9 6" />
    <line :x1="PLATE_FROM" :y1="PLATE_Y" :x2="PLATE_TO" :y2="PLATE_Y" stroke="#e2a846" stroke-width="8" stroke-linecap="round" />
    <circle :cx="IMPACT.x" :cy="IMPACT.y" r="6" fill="#f87171" />
    <circle :cx="IMPACT.x" :cy="IMPACT.y" r="12" fill="none" stroke="rgba(248,113,113,0.5)" stroke-width="1.6" stroke-dasharray="4 4" />
    <g v-if="step >= 1">
      <text x="54" y="48" font-size="18" fill="#cbd5e1">斜槽 M</text>
      <text x="180" y="166" text-anchor="middle" font-size="18" fill="#cbd5e1">小球</text>
      <text x="96" y="182" font-size="17" fill="#94a3b8">末端水平</text>
      <line x1="152" y1="176" x2="194" y2="144" stroke="rgba(148,163,184,0.45)" stroke-width="1.2" stroke-dasharray="4 4" />
    </g>
    <g v-if="step >= 2">
      <text x="480" y="322" text-anchor="end" font-size="18" fill="#94a3b8">背板</text>
      <text x="222" y="88" font-size="17" fill="#c4b5fd">白纸 · 复写纸</text>
    </g>
    <g v-if="step >= 3">
      <text x="392" y="200" text-anchor="middle" font-size="18" fill="#e2a846">挡板 N</text>
      <text :x="IMPACT.x + 20" :y="IMPACT.y + 30" font-size="17" fill="#f87171">印迹</text>
    </g>
  </svg>
</template>
