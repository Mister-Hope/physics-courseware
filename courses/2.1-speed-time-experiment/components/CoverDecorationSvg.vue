<template>
  <!-- 第 1 页：封面装饰图，v-t 图像 ＋ 十字线描点 ＋ 斜率三角形 -->
  <svg viewBox="0 0 240 160" width="330" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="cover-axis-arrow" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 12 12">
        <path d="M 0 0 L 12 6 L 0 12 z" fill="#94a3b8" />
      </marker>
    </defs>
    <line x1="24" y1="134" x2="226" y2="134" stroke="currentColor" stroke-width="1.6" marker-end="url(#cover-axis-arrow)" />
    <line x1="24" y1="134" x2="24" y2="22" stroke="currentColor" stroke-width="1.6" marker-end="url(#cover-axis-arrow)" />
    <line x1="92" y1="101" x2="180" y2="101" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.65" />
    <line x1="180" y1="101" x2="180" y2="59" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.65" />
    <line x1="24" y1="134" x2="212.6" y2="42.6" stroke="#e2a846" stroke-width="2.6" stroke-linecap="round" />
    <g stroke="#f1f5f9" stroke-width="1.3" opacity="0.75">
      <line x1="43" y1="117" x2="53" y2="127" />
      <line x1="43" y1="127" x2="53" y2="117" />
      <line x1="65" y1="107" x2="75" y2="117" />
      <line x1="65" y1="117" x2="75" y2="107" />
      <line x1="87" y1="96" x2="97" y2="106" />
      <line x1="87" y1="106" x2="97" y2="96" />
      <line x1="109" y1="86" x2="119" y2="96" />
      <line x1="109" y1="96" x2="119" y2="86" />
      <line x1="131" y1="74" x2="141" y2="84" />
      <line x1="131" y1="84" x2="141" y2="74" />
      <line x1="153" y1="65" x2="163" y2="75" />
      <line x1="153" y1="75" x2="163" y2="65" />
      <line x1="175" y1="53" x2="185" y2="63" />
      <line x1="175" y1="63" x2="185" y2="53" />
      <line x1="197" y1="43" x2="207" y2="53" />
      <line x1="197" y1="53" x2="207" y2="43" />
    </g>
    <text x="12" y="152" font-family="KaTeX_Math" font-style="italic" font-size="13" fill="#94a3b8">O</text>
    <text x="228" y="152" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="#94a3b8">t</text>
    <text x="30" y="16" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="#94a3b8">v</text>
    <text x="138" y="118" font-family="KaTeX_Math" font-style="italic" font-size="12" fill="#60a5fa">Δt</text>
    <text x="188" y="86" font-family="KaTeX_Math" font-style="italic" font-size="12" fill="#60a5fa">Δv</text>
  </svg>
</template>
