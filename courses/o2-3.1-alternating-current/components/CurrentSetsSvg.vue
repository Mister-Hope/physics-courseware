<!--
  第 5 页：交变电流、直流、恒定电流的包含关系。
  交流与直流互斥；恒定电流是直流的一个子集。
-->
<template>
  <svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="交变电流与直流互斥，恒定电流是直流的子集">
    <ellipse cx="185" cy="118" rx="105" ry="70" fill="var(--c-accent)" fill-opacity="0.1" stroke="var(--c-accent)" stroke-width="1.6" />
    <text x="185" y="56" fill="var(--c-accent)" font-size="18" font-weight="600" text-anchor="middle">交变电流</text>
    <path d="M 110 122 C 135 82, 160 82, 185 122 S 235 162, 260 122" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" />

    <ellipse cx="535" cy="112" rx="160" ry="88" fill="var(--c-accent-2)" fill-opacity="0.08" stroke="var(--c-accent-2)" stroke-width="1.6" />
    <text x="535" y="42" fill="var(--c-accent-2)" font-size="18" font-weight="600" text-anchor="middle">直流</text>
    <text x="535" y="178" fill="var(--c-text-dim)" font-size="13" text-anchor="middle">方向不随时间变化</text>

    <ellipse cx="535" cy="118" rx="104" ry="52" fill="var(--c-accent)" fill-opacity="0.14" stroke="var(--c-accent)" stroke-width="1.4" stroke-dasharray="5 4" />
    <text x="535" y="114" fill="var(--c-text)" font-size="16" font-weight="600" text-anchor="middle">恒定电流</text>
    <text x="535" y="137" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">大小也不变</text>

    <path d="M 310 118 L 350 118" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="4 4" />
    <text x="330" y="110" fill="var(--c-text-dim)" font-size="13" text-anchor="middle">互斥</text>
  </svg>
</template>
