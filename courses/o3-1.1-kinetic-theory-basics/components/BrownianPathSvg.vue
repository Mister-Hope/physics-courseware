<!-- 第 6 页：布朗运动，每隔一段时间记录微粒位置的连线 -->
<template>
  <svg viewBox="0 0 440 260" width="440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="58" y="48" width="324" height="170" rx="12" fill="rgba(15,23,42,0.5)" stroke="var(--c-border)" stroke-width="1.5" />
    <polyline
      points="92,190 124,150 104,112 152,82 190,112 170,150 214,170 250,130 230,96 284,76 320,112 300,150 344,174 330,204 282,190 260,164"
      fill="none"
      stroke="var(--c-accent-2)"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <g fill="var(--c-accent-2)">
      <circle cx="92" cy="190" r="3.4" />
      <circle cx="124" cy="150" r="3.4" />
      <circle cx="104" cy="112" r="3.4" />
      <circle cx="152" cy="82" r="3.4" />
      <circle cx="190" cy="112" r="3.4" />
      <circle cx="170" cy="150" r="3.4" />
      <circle cx="214" cy="170" r="3.4" />
      <circle cx="250" cy="130" r="3.4" />
      <circle cx="230" cy="96" r="3.4" />
      <circle cx="284" cy="76" r="3.4" />
      <circle cx="320" cy="112" r="3.4" />
      <circle cx="300" cy="150" r="3.4" />
      <circle cx="344" cy="174" r="3.4" />
      <circle cx="330" cy="204" r="3.4" />
      <circle cx="282" cy="190" r="3.4" />
      <circle cx="260" cy="164" r="3.4" />
    </g>
    <circle cx="92" cy="190" r="6" fill="var(--c-physics)" />
    <circle cx="260" cy="164" r="6" fill="var(--c-danger)" />
    <text x="96" y="216" fill="var(--c-physics)" font-size="11" font-family="sans-serif">开始</text>
    <text x="268" y="154" fill="var(--c-danger)" font-size="11" font-family="sans-serif">结束</text>
    <text x="220" y="36" fill="var(--c-text-dim)" font-size="11" font-family="sans-serif" text-anchor="middle">每隔 30 s 记录一次微粒位置</text>
    <text x="220" y="242" fill="var(--c-text-mute)" font-size="10" font-family="sans-serif" text-anchor="middle">连线只是位置记录，不是微粒的真实路径</text>
  </svg>
</template>
