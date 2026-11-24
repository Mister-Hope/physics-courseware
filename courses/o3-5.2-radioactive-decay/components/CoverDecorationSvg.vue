<!-- 封面装饰：原子核放出 α 粒子，右下角是剩余原子核数随时间的衰减曲线 -->
<template>
  <svg viewBox="0 0 340 210" width="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="rd-cover-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.32" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <!-- 母核光晕 -->
    <circle cx="92" cy="108" r="66" fill="url(#rd-cover-glow)" />
    <!-- 母核 -->
    <g fill="var(--c-accent)" fill-opacity="0.88" stroke="var(--c-bg)" stroke-width="1.2">
      <circle cx="78" cy="94" r="14" />
      <circle cx="99" cy="90" r="13" />
      <circle cx="88" cy="112" r="13" />
      <circle cx="108" cy="109" r="12" />
      <circle cx="70" cy="112" r="11" />
      <circle cx="94" cy="126" r="10" />
    </g>
    <!-- α 粒子 -->
    <g fill="var(--c-physics)" fill-opacity="0.9" stroke="var(--c-bg)" stroke-width="1">
      <circle cx="232" cy="70" r="7.5" />
      <circle cx="246" cy="64" r="7" />
      <circle cx="241" cy="78" r="6.5" />
      <circle cx="254" cy="75" r="6.5" />
    </g>
    <text x="262" y="62" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-physics)">α</text>
    <path d="M 128 92 C 160 62 186 52 216 62" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="5 6" stroke-linecap="round" />
    <!-- 衰减曲线 -->
    <path
      d="M 150 150 C 168 150 178 174 198 180 C 226 188 262 189 310 189"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-linecap="round"
      opacity="0.8"
    />
    <circle cx="236" cy="185" r="3.5" fill="var(--c-accent)" />
  </svg>
</template>
