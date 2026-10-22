<!--
  电子感应加速器（第 7 页）：上下磁极之间是环形真空室，
  电磁铁线圈中的电流由小变大 → 磁场由弱变强 → 真空室中产生顺时针方向的感生电场，
  电子带负电，受力方向与电场相反，因而沿逆时针方向被不断加速。
-->
<template>
  <svg class="fig-svg" viewBox="0 0 620 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="电子感应加速器的原理">
    <defs>
      <linearGradient id="bt-pole" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgb(148 163 184 / 34%)" />
        <stop offset="100%" stop-color="rgb(148 163 184 / 14%)" />
      </linearGradient>
    </defs>
    <rect x="150" y="26" width="320" height="56" rx="6" fill="url(#bt-pole)" stroke="#94a3b8" stroke-width="1.8" />
    <rect x="150" y="318" width="320" height="56" rx="6" fill="url(#bt-pole)" stroke="#94a3b8" stroke-width="1.8" />
    <text x="310" y="62" text-anchor="middle" font-size="19" fill="#94a3b8">磁极</text>
    <text x="310" y="354" text-anchor="middle" font-size="19" fill="#94a3b8">磁极</text>
    <ellipse cx="310" cy="200" rx="152" ry="72" fill="rgb(96 165 250 / 7%)" stroke="#94a3b8" stroke-width="2" />
    <ellipse cx="310" cy="200" rx="118" ry="50" fill="rgb(15 23 42 / 55%)" stroke="#64748b" stroke-width="1.6" />
    <text x="310" y="206" text-anchor="middle" font-size="19" fill="#94a3b8">环形真空室</text>
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 6" opacity="0.8">
      <path d="M 310 88 L 310 144" />
      <path d="M 310 256 L 310 312" />
    </g>
    <path d="M 310 84 l -6 12 l 12 0 z" fill="var(--c-accent)" />
    <path d="M 310 316 l -6 -12 l 12 0 z" fill="var(--c-accent)" />
    <text x="386" y="120" font-size="18" fill="var(--c-accent)">B 由下向上</text>
    <circle cx="170" cy="176" r="9" fill="#60a5fa" />
    <text x="170" y="181" text-anchor="middle" font-size="12" font-family="KaTeX_Main, serif" fill="#0f172a">−</text>
    <CourseArrow :from="{ x: 170, y: 166 }" :to="{ x: 170, y: 120 }" stroke="#60a5fa" stroke-width="2.6" />
    <text x="184" y="128" font-family="KaTeX_Math, serif" font-style="italic" font-size="19" fill="#60a5fa">v</text>
    <g fill="none" stroke="#2dd4bf" stroke-width="2.2" stroke-dasharray="8 7">
      <ellipse cx="310" cy="200" rx="86" ry="34" />
    </g>
    <path d="M 394 194 l -13 -3 l 3 13 z" fill="#2dd4bf" />
    <text x="420" y="262" font-size="18" fill="#2dd4bf">感生电场（顺时针）</text>
    <text x="310" y="386" text-anchor="middle" font-size="18" fill="var(--c-text-dim)">电子沿逆时针方向运动</text>
  </svg>
</template>
