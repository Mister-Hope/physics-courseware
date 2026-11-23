<!-- 2.1 练习：铅笔振动 + 白纸匀速拖动，纸上留下位移—时间图像 -->
<template>
  <svg viewBox="0 0 440 200" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="52" width="300" height="112" rx="6" fill="rgba(241,245,249,.04)" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <path
      d="M 74 108 Q 98 62 122 108 T 170 108 T 218 108 T 266 108 T 314 108 T 350 108"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <line x1="70" y1="108" x2="352" y2="108" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
    <text x="362" y="112" font-family="KaTeX_Math" font-style="italic" font-size="14" fill="var(--c-text-dim)">t</text>
    <text x="66" y="44" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-dim)">纸带</text>
    <g stroke="var(--c-text)" stroke-width="2.4" stroke-linecap="round" fill="none">
      <line x1="366" y1="86" x2="366" y2="122" />
      <path d="M 366 122 L 361 133 L 371 133 Z" fill="var(--c-accent)" stroke="none" />
    </g>
    <circle cx="366" cy="120" r="4" fill="var(--c-accent)" />
    <text x="378" y="132" font-family="KaTeX_Main" font-size="12" fill="var(--c-text-dim)">铅笔</text>
    <line x1="60" y1="182" x2="30" y2="182" stroke="var(--c-velocity)" stroke-width="2" marker-end="url(#drag-arrow)" />
    <text x="94" y="186" font-family="KaTeX_Main" font-size="12" fill="var(--c-velocity)">匀速拖动白纸</text>
    <defs>
      <marker id="drag-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-velocity)" />
      </marker>
    </defs>
  </svg>
</template>
