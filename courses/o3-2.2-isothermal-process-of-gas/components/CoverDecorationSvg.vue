<!-- 封面装饰：注射器（左侧）+ p-V 等温线（右侧），点明本课主题 -->
<template>
  <svg viewBox="0 0 340 210" width="340" xmlns="http://www.w3.org/2000/svg">
    <!-- 注射器 -->
    <rect x="46" y="52" width="46" height="112" rx="6" fill="rgba(96,165,250,0.08)" stroke="var(--c-text-dim)" stroke-width="2" />
    <rect x="52" y="120" width="34" height="38" fill="rgba(96,165,250,0.22)" />
    <rect x="50" y="112" width="38" height="9" rx="3" fill="var(--c-text-dim)" />
    <line x1="69" y1="40" x2="69" y2="112" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <line x1="56" y1="40" x2="82" y2="40" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <rect x="62" y="164" width="14" height="14" fill="var(--c-text-dim)" opacity="0.6" />
    <line x1="69" y1="178" x2="69" y2="192" stroke="var(--c-text-dim)" stroke-width="2" />
    <!-- p-V 等温线 -->
    <line x1="150" y1="164" x2="312" y2="164" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <line x1="150" y1="164" x2="150" y2="42" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <path d="M 176 156 C 196 100 218 78 246 68 C 268 60 290 56 306 54" fill="none" stroke="var(--c-accent)" stroke-width="2.8" stroke-linecap="round" />
    <circle cx="196" cy="106" r="4.6" fill="var(--c-accent)" />
    <text x="204" y="102" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">p</text>
    <text x="298" y="182" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-text)">V</text>
  </svg>
</template>
