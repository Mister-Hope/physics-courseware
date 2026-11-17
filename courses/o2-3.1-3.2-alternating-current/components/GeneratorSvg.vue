<!--
  第 4 页：交流发电机结构。N、S 极上下放置，矩形线圈绕水平轴转动，
  线圈两端接滑环 K、L，电刷 E、F 经外电路负载 R 闭合。
  只画结构，不画受力与速度（那些留给第 5 页的四位置图）。
-->
<template>
  <svg
    viewBox="0 0 680 272"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="交流发电机结构：磁极上下放置，线圈绕水平轴转动，经滑环、电刷与外电路负载 R 连接"
  >
    <rect
      x="80"
      y="6"
      width="520"
      height="32"
      rx="6"
      fill="var(--c-danger)"
      fill-opacity="0.12"
      stroke="var(--c-danger)"
      stroke-opacity="0.45"
      stroke-width="1.4"
    />
    <text x="340" y="29" fill="var(--c-danger)" font-size="22" font-weight="700" text-anchor="middle">N</text>
    <rect
      x="80"
      y="226"
      width="520"
      height="30"
      rx="6"
      fill="var(--c-accent-2)"
      fill-opacity="0.12"
      stroke="var(--c-accent-2)"
      stroke-opacity="0.45"
      stroke-width="1.4"
    />
    <text x="340" y="249" fill="var(--c-accent-2)" font-size="22" font-weight="700" text-anchor="middle">S</text>
    <CourseArrow
      v-for="x in [110, 590]"
      :key="`field-${x}`"
      :from="{ x, y: 46 }"
      :to="{ x, y: 220 }"
      stroke="var(--c-text-dim)"
      stroke-width="1.6"
      stroke-dasharray="6 5"
    />
    <text x="122" y="62" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14">B</text>
    <line x1="190" y1="156" x2="470" y2="156" stroke="var(--c-accent)" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.5" />
    <text x="202" y="147" fill="var(--c-text-dim)" font-size="11">转轴</text>
    <polygon points="248,100 392,88 392,212 248,224" fill="var(--c-accent)" fill-opacity="0.07" stroke="none" />
    <polyline points="248,100 392,88" fill="none" stroke="var(--c-accent)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
    <polyline points="392,212 248,224 248,100" fill="none" stroke="var(--c-accent)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
    <text x="320" y="76" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">矩形线圈</text>
    <text x="238" y="96" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="end">A</text>
    <text x="402" y="84" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="16">B</text>
    <text x="402" y="216" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="16">C</text>
    <text x="238" y="228" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="end">D</text>
    <polyline points="392,88 470,88 486,137" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.75" />
    <polyline points="392,212 470,212 506,175" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.75" />
    <ellipse cx="486" cy="156" rx="6" ry="19" fill="none" stroke="var(--c-accent)" stroke-width="2.6" />
    <ellipse cx="506" cy="156" rx="6" ry="19" fill="none" stroke="var(--c-accent)" stroke-width="2.6" />
    <text x="476" y="140" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="14" text-anchor="end">K</text>
    <text x="516" y="140" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="14">L</text>
    <rect x="478" y="126" width="16" height="10" rx="2" fill="var(--c-text-dim)" opacity="0.55" />
    <rect x="498" y="176" width="16" height="10" rx="2" fill="var(--c-text-dim)" opacity="0.55" />
    <line x1="486" y1="126" x2="486" y2="108" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <line x1="506" y1="186" x2="506" y2="204" stroke="var(--c-text-dim)" stroke-width="1.4" />
    <circle cx="486" cy="105" r="2.6" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" />
    <circle cx="506" cy="207" r="2.6" fill="none" stroke="var(--c-text-dim)" stroke-width="1.3" />
    <text x="468" y="122" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14" text-anchor="end">E</text>
    <text x="524" y="202" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="14">F</text>
    <polyline points="486,105 552,105 552,150" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.85" />
    <rect x="546" y="150" width="12" height="40" rx="2" fill="var(--c-bg)" stroke="var(--c-accent)" stroke-width="1.4" />
    <text x="566" y="175" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="14">R</text>
    <polyline points="552,190 552,207 506,207" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.85" />
    <text x="320" y="268" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">K、L：滑环　　E、F：电刷　　R：外电路负载</text>
  </svg>
</template>
