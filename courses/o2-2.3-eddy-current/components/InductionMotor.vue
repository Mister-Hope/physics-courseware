<!--
  交流感应电动机（第 20 页）：三相绕组接三相电源，在空间中产生旋转磁场；
  转子是闭合导体，磁场相对它转动时其中产生感应电流，安培力推动转子跟着转。
-->
<template>
  <svg
    class="fig-svg"
    viewBox="0 0 620 400"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="交流感应电动机的原理"
  >
    <g fill="rgb(148 163 184 / 12%)" stroke="#94a3b8" stroke-width="2">
      <g v-for="a in [0, 120, 240]" :key="a" :transform="`rotate(${a} 310 200)`">
        <rect x="278" y="36" width="64" height="56" rx="7" />
        <line x1="290" y1="50" x2="330" y2="50" stroke-width="1.6" />
        <line x1="290" y1="64" x2="330" y2="64" stroke-width="1.6" />
        <line x1="290" y1="78" x2="330" y2="78" stroke-width="1.6" />
      </g>
    </g>
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="8 7">
      <circle cx="310" cy="200" r="106" />
    </g>
    <path d="M 416 194 l -14 -4 l 4 14 z" fill="var(--c-accent)" />
    <text x="446" y="102" font-size="19" fill="var(--c-accent)">旋转磁场</text>
    <circle
      cx="310"
      cy="200"
      r="58"
      fill="rgb(148 163 184 / 10%)"
      stroke="#cbd5e1"
      stroke-width="3"
    />
    <g stroke="#cbd5e1" stroke-width="5" stroke-linecap="round">
      <line x1="310" y1="148" x2="310" y2="252" />
      <line x1="258" y1="200" x2="362" y2="200" />
    </g>
    <circle cx="310" cy="200" r="12" fill="#cbd5e1" />
    <text x="310" y="288" text-anchor="middle" font-size="19" fill="var(--c-text-dim)">转子</text>
  </svg>
</template>
