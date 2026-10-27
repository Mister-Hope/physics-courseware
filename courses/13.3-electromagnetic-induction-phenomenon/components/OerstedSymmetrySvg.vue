<!--
  P3 左栏：电 → 磁 / 磁 → 电？ 的对照简图。
  上半只作一瞥式示意（一根通电导线 + 导线正下方的小磁针），**不重画 13.1 的奥斯特实验装置**，避免与 13.1 撞图。
  小磁针画成椭圆（水平磁针盘的透视）+ 躺在盘面上的指针，学生才看得出磁针在电流的正下方。
  下半：条形磁体插入螺线管，螺线管两端接指针电流表——这就是法拉第想验证的"磁生电"。
-->
<template>
  <div class="figure">
    <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text x="28" y="26" font-size="21" fill="var(--c-accent)">电 → 磁</text>
      <!-- 通电导线（只画一瞥，不展开成 13.1 的实验装置） -->
      <line x1="34" y1="78" x2="214" y2="78" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round" />
      <CourseArrow :from="{ x: 58, y: 58 }" :to="{ x: 152, y: 58 }" stroke="var(--c-accent)" :stroke-width="2.4" label="I" />
      <!-- 小磁针：水平放置的磁针盘（椭圆 = 透视压扁），盘心正对导线中点 x=124 的正下方；
           中间那条很淡的竖直虚线点明"磁针在电流正下方" -->
      <line x1="124" y1="86" x2="124" y2="116" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="3 4" opacity="0.8" />
      <ellipse cx="124" cy="116" rx="36" ry="13" fill="var(--c-surface)" stroke="var(--c-text-dim)" stroke-width="1.8" />
      <!-- 指针：躺在盘面内的细菱形；红 N 端指向纸内（导线正下方 B 垂直纸面向里）、蓝 S 端相反 -->
      <path d="M 144.7 105.4 L 125.3 118.5 L 122.7 113.5 Z" fill="var(--c-danger)" />
      <path d="M 103.3 126.7 L 122.7 113.5 L 125.3 118.5 Z" fill="var(--c-velocity)" />
      <circle cx="124" cy="116" r="3.2" fill="var(--c-text)" />
      <text x="124" y="152" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">小磁针偏转</text>

      <text x="28" y="198" font-size="21" fill="var(--c-velocity)">磁 → 电 ？</text>
      <!-- 条形磁体（S 蓝 / N 红）：只有整块磁体最外端两个角是圆角，S/N 分界处是直角 -->
      <path d="M 31 236 H 74 V 264 H 31 A 3 3 0 0 1 28 261 V 239 A 3 3 0 0 1 31 236 Z" fill="var(--c-velocity)" />
      <path d="M 74 236 H 117 A 3 3 0 0 1 120 239 V 261 A 3 3 0 0 1 117 264 H 74 Z" fill="var(--c-danger)" />
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
      <!-- 引线与指针电流表：两段引线分别止于表盘圆周（圆心 330,233、r=24）-->
      <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
        <path d="M 190 220 V 200 H 330 V 209" />
        <path d="M 262 280 V 292 H 330 V 257" />
      </g>
      <PointerAmmeter :x="330" :y="233" :r="24" :angle="0" />
      <text x="360" y="240" font-size="17" fill="var(--c-text-dim)">电流表</text>
    </svg>
  </div>
</template>
