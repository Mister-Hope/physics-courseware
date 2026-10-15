<template>
  <!-- 第 11 页：纸带上量出 7 段，舍去最密的第 1 段，剩下 6 段前后分半 -->
  <svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="34"
      y="40"
      width="572"
      height="34"
      rx="6"
      fill="color-mix(in srgb, var(--c-text-dim) 14%, transparent)"
      stroke="color-mix(in srgb, var(--c-text-dim) 30%, transparent)"
      stroke-width="1.2"
    />
    <rect
      x="34"
      y="40"
      width="81.7"
      height="34"
      rx="6"
      fill="color-mix(in srgb, var(--c-force) 16%, transparent)"
      stroke="var(--c-force)"
      stroke-width="1.4"
      stroke-dasharray="5 4"
    />
    <line x1="44" y1="57" x2="596" y2="57" stroke="color-mix(in srgb, var(--c-text-dim) 40%, transparent)" stroke-width="1" />
    <circle cx="44" cy="57" r="4" fill="var(--c-force)" />
    <circle cx="124" cy="57" r="4" fill="var(--c-accent)" />
    <circle cx="204" cy="57" r="4" fill="var(--c-accent)" />
    <circle cx="284" cy="57" r="4" fill="var(--c-accent)" />
    <circle cx="364" cy="57" r="4" fill="var(--c-accent)" />
    <circle cx="444" cy="57" r="4" fill="var(--c-accent)" />
    <circle cx="524" cy="57" r="4" fill="var(--c-accent)" />
    <circle cx="604" cy="57" r="4" fill="var(--c-accent)" />
    <text x="84" y="30" font-size="16" fill="var(--c-force)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">1</tspan>
      舍去
    </text>
    <text x="164" y="30" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">2</tspan>
    </text>
    <text x="244" y="30" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">3</tspan>
    </text>
    <text x="324" y="30" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">4</tspan>
    </text>
    <text x="404" y="30" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">5</tspan>
    </text>
    <text x="484" y="30" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">6</tspan>
    </text>
    <text x="564" y="30" font-size="16" fill="var(--c-text-dim)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">x</tspan>
      <tspan font-family="KaTeX_Main" dy="3" font-size="11">7</tspan>
    </text>
    <line x1="124" y1="92" x2="284" y2="92" stroke="var(--c-velocity)" stroke-width="1.4" />
    <line x1="364" y1="92" x2="524" y2="92" stroke="var(--c-velocity)" stroke-width="1.4" />
    <text x="204" y="116" font-size="15" fill="var(--c-velocity)" text-anchor="middle">前半段</text>
    <text x="444" y="116" font-size="15" fill="var(--c-velocity)" text-anchor="middle">后半段</text>
  </svg>
</template>
