<!--
  P3 左栏：电 → 磁 / 磁 → 电？ 的对照简图。
  上半只作一瞥式示意（一根通电导线 + 一枚小磁针），**不重画 13.1 的奥斯特实验装置**，避免与 13.1 撞图。
  下半：条形磁体插入螺线管，螺线管两端接电流表——这就是法拉第想验证的"磁生电"。
-->
<template>
  <div class="figure">
    <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text x="28" y="26" font-size="21" fill="var(--c-accent)">电 → 磁</text>
      <!-- 通电导线（只画一瞥，不展开成 13.1 的实验装置） -->
      <line x1="34" y1="78" x2="214" y2="78" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round" />
      <CourseArrow :from="{ x: 58, y: 58 }" :to="{ x: 152, y: 58 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
      <!-- 小磁针 -->
      <circle cx="150" cy="120" r="19" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <line x1="150" y1="120" x2="165" y2="105" stroke="var(--c-danger)" stroke-width="3" stroke-linecap="round" />
      <line x1="150" y1="120" x2="135" y2="135" stroke="var(--c-velocity)" stroke-width="3" stroke-linecap="round" />
      <circle cx="150" cy="120" r="3.2" fill="var(--c-text)" />
      <text x="150" y="160" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">小磁针偏转</text>

      <text x="28" y="198" font-size="21" fill="var(--c-velocity)">磁 → 电 ？</text>
      <!-- 条形磁体（S 蓝 / N 红） -->
      <rect x="28" y="236" width="46" height="28" rx="3" fill="var(--c-velocity)" />
      <rect x="74" y="236" width="46" height="28" rx="3" fill="var(--c-danger)" />
      <text x="51" y="257" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-bg-soft)">S</text>
      <text x="97" y="257" text-anchor="middle" font-family="KaTeX_Main" font-size="18" fill="var(--c-bg-soft)">N</text>
      <CourseArrow :from="{ x: 130, y: 250 }" :to="{ x: 170, y: 250 }" stroke="var(--c-accent)" :stroke-width="2.2" />
      <!-- 螺线管 -->
      <g fill="none" stroke="var(--c-accent)" stroke-width="2.2">
        <ellipse cx="190" cy="250" rx="10" ry="30" />
        <ellipse cx="214" cy="250" rx="10" ry="30" />
        <ellipse cx="238" cy="250" rx="10" ry="30" />
        <ellipse cx="262" cy="250" rx="10" ry="30" />
      </g>
      <!-- 引线与电流表 -->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 190 220 V 200 H 330 V 217" />
        <path d="M 262 280 V 292 H 330 V 249" />
      </g>
      <CircuitMeter :x="330" :y="233" kind="a" />
      <text x="330" y="288" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">电流表</text>
    </svg>
  </div>
</template>
