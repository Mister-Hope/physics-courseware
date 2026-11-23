<!--
  封面装饰：一条向远处传播的电磁波（正弦波）与下方按波长排列的电磁波谱色带。
  纯装饰，不承担教学读数；只使用主题 token 与光谱本身必需的彩色渐变。
-->
<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="em-cover-wave" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-accent-2)" />
        <stop offset="55%" stop-color="var(--c-accent)" />
        <stop offset="100%" stop-color="var(--c-physics)" />
      </linearGradient>
      <linearGradient id="em-cover-spectrum" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="var(--c-accent-2)" />
        <stop offset="16%" stop-color="var(--c-physics)" />
        <stop offset="30%" stop-color="var(--c-accent)" />
        <stop offset="46%" stop-color="orange" />
        <stop offset="56%" stop-color="gold" />
        <stop offset="65%" stop-color="limegreen" />
        <stop offset="74%" stop-color="turquoise" />
        <stop offset="83%" stop-color="cornflowerblue" />
        <stop offset="92%" stop-color="mediumorchid" />
        <stop offset="100%" stop-color="plum" />
      </linearGradient>
      <clipPath id="em-cover-clip">
        <rect x="18" y="152" width="284" height="12" rx="6" />
      </clipPath>
    </defs>
    <circle cx="226" cy="78" r="72" fill="var(--c-accent)" opacity="0.06" />
    <circle cx="226" cy="78" r="46" fill="var(--c-accent-2)" opacity="0.08" />
    <path
      d="M 14 94 Q 46 46 78 94 T 142 94 T 206 94 T 270 94 T 334 94"
      fill="none"
      stroke="url(#em-cover-wave)"
      stroke-width="2.6"
      stroke-linecap="round"
      opacity="0.9"
    />
    <g clip-path="url(#em-cover-clip)">
      <rect x="18" y="152" width="284" height="12" fill="url(#em-cover-spectrum)" />
    </g>
    <circle cx="18" cy="158" r="4" fill="var(--c-accent-2)" />
    <circle cx="302" cy="158" r="4" fill="plum" />
  </svg>
</template>
