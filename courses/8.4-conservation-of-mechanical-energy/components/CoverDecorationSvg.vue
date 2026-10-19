<template>
  <!-- 第 1 页封面装饰：同一个单摆的三个位置（两侧最高点、中间最低点）＋ 动能/势能两条能量条——
       摆到两侧时势能大、到最低点时动能大，两者之和不变。纯装饰，不承担信息。 -->
  <svg class="fig-cover" viewBox="0 0 860 300" xmlns="http://www.w3.org/2000/svg">
    <line x1="70" y1="58" x2="660" y2="58" stroke="var(--c-neutral-500)" stroke-width="6" stroke-linecap="round" />
    <circle cx="204" cy="58" r="6" fill="var(--c-neutral-500)" />
    <circle cx="430" cy="58" r="6" fill="var(--c-neutral-500)" />
    <circle cx="656" cy="58" r="6" fill="var(--c-neutral-500)" />
    <path d="M 204 58 Q 150 150 108 218" fill="none" stroke="var(--c-neutral-500)" stroke-width="1.8" stroke-dasharray="7 8" opacity="0.7" />
    <path d="M 430 58 Q 430 160 430 226" fill="none" stroke="var(--c-neutral-500)" stroke-width="1.8" stroke-dasharray="7 8" opacity="0.55" />
    <path d="M 656 58 Q 710 150 752 218" fill="none" stroke="var(--c-neutral-500)" stroke-width="1.8" stroke-dasharray="7 8" opacity="0.7" />
    <line x1="204" y1="58" x2="108" y2="224" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <line x1="430" y1="58" x2="430" y2="226" stroke="var(--c-neutral-300)" stroke-width="2.6" stroke-linecap="round" />
    <line x1="656" y1="58" x2="752" y2="224" stroke="var(--c-accent)" stroke-width="2.6" stroke-linecap="round" />
    <circle cx="108" cy="234" r="16" fill="var(--c-accent)" fill-opacity="0.22" stroke="var(--c-accent)" stroke-width="3" />
    <circle cx="430" cy="236" r="16" fill="var(--c-accent)" fill-opacity="0.4" stroke="var(--c-accent)" stroke-width="3" />
    <circle cx="752" cy="234" r="16" fill="var(--c-accent)" fill-opacity="0.22" stroke="var(--c-accent)" stroke-width="3" />
    <line x1="96" y1="234" x2="430" y2="234" stroke="var(--c-neutral-500)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.6" />
    <line x1="430" y1="234" x2="764" y2="234" stroke="var(--c-neutral-500)" stroke-width="1.6" stroke-dasharray="7 7" opacity="0.6" />
    <rect x="700" y="86" width="34" height="86" rx="8" fill="var(--c-ok)" fill-opacity="0.18" stroke="var(--c-ok)" stroke-width="2.4" />
    <rect x="748" y="120" width="34" height="52" rx="8" fill="var(--c-accent-2)" fill-opacity="0.18" stroke="var(--c-accent-2)" stroke-width="2.4" />
    <line x1="694" y1="86" x2="790" y2="86" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="7 6" opacity="0.55" />
    <text x="762" y="76" font-size="15" fill="var(--c-accent)" font-family="system-ui" text-anchor="middle">总量不变</text>
  </svg>
</template>

<style scoped>
.fig-cover {
  display: block;
  width: 100%;
  height: auto;
}
</style>
