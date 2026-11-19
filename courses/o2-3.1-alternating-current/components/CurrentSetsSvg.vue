<!--
  第 5 页：用一个集合表示全部电流，按方向是否变化一分为二；
  恒定电流是直流中“大小也不变”的那一部分。
-->
<template>
  <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="电流分为交变电流和直流；恒定电流是直流的子集">
    <defs>
      <clipPath id="ac-left-half">
        <rect x="0" y="0" width="380" height="260" />
      </clipPath>
      <clipPath id="ac-right-half">
        <rect x="380" y="0" width="380" height="260" />
      </clipPath>
    </defs>

    <ellipse cx="380" cy="130" rx="300" ry="100" fill="var(--c-accent)" fill-opacity="0.08" clip-path="url(#ac-left-half)" />
    <ellipse cx="380" cy="130" rx="300" ry="100" fill="var(--c-accent-2)" fill-opacity="0.1" clip-path="url(#ac-right-half)" />
    <ellipse cx="380" cy="130" rx="300" ry="100" fill="none" stroke="var(--c-text-dim)" stroke-width="1.8" />
    <line x1="380" y1="30" x2="380" y2="230" stroke="var(--c-text-dim)" stroke-width="1.6" />

    <text x="245" y="112" fill="var(--c-accent)" font-size="20" font-weight="600" text-anchor="middle">交变电流</text>
    <text x="245" y="138" fill="var(--c-text-dim)" font-size="14" text-anchor="middle">方向随时间变化</text>
    <path d="M 175 170 C 200 140, 225 140, 250 170 S 300 200, 325 170" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />

    <text x="520" y="104" fill="var(--c-accent-2)" font-size="20" font-weight="600" text-anchor="middle">直流</text>
    <text x="520" y="130" fill="var(--c-text-dim)" font-size="14" text-anchor="middle">方向不变，大小可以变化</text>

    <circle cx="520" cy="180" r="40" fill="var(--c-accent-2)" fill-opacity="0.16" stroke="var(--c-accent-2)" stroke-width="1.5" />
    <text x="520" y="176" fill="var(--c-text)" font-size="15" font-weight="600" text-anchor="middle">恒定电流</text>
    <text x="520" y="196" fill="var(--c-text-dim)" font-size="11" text-anchor="middle">大小也不变</text>

    <text x="380" y="22" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">所有电流</text>
  </svg>
</template>
