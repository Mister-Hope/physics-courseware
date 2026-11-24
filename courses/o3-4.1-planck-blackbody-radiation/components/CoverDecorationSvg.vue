<!-- 4.1 封面装饰：带小孔的黑体空腔 + 从小孔射出的辐射 + 右侧能量台阶（纯装饰，无文字语义） -->
<template>
  <svg viewBox="0 0 380 230" width="330" xmlns="http://www.w3.org/2000/svg">
    <rect x="34" y="58" width="132" height="116" rx="12" fill="var(--c-surface)" stroke="var(--c-border-glow)" stroke-width="1.5" />
    <rect x="52" y="76" width="96" height="80" rx="8" fill="var(--c-bg-soft)" stroke="var(--c-border)" stroke-width="1.2" />
    <circle cx="166" cy="116" r="6.5" fill="var(--c-accent)" />
    <circle cx="166" cy="116" r="12" fill="var(--c-accent)" fill-opacity="0.16" />
    <path d="M 176 102 C 196 88 200 132 220 116" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-linecap="round" opacity="0.75" />
    <path d="M 178 116 C 202 104 206 140 232 122" fill="none" stroke="var(--c-velocity)" stroke-width="1.6" stroke-linecap="round" opacity="0.6" />
    <path d="M 180 130 C 200 122 204 148 224 136" fill="none" stroke="var(--c-physics)" stroke-width="1.4" stroke-linecap="round" opacity="0.45" />
    <path
      d="M 246 196 C 268 196 280 150 306 150 C 326 150 334 120 356 120"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-linecap="round"
      opacity="0.55"
    />
    <circle cx="306" cy="150" r="3" fill="var(--c-accent)" fill-opacity="0.8" />
    <circle cx="356" cy="120" r="3" fill="var(--c-velocity)" fill-opacity="0.8" />
    <rect x="248" y="196" width="34" height="4" rx="2" fill="var(--c-accent)" opacity="0.55" />
    <rect x="248" y="182" width="26" height="4" rx="2" fill="var(--c-accent)" opacity="0.4" />
    <rect x="248" y="168" width="18" height="4" rx="2" fill="var(--c-accent)" opacity="0.28" />
  </svg>
</template>
