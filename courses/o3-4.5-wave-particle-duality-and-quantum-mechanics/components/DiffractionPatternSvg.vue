<!-- 第 7 页：电子束穿过晶体薄膜，在荧光屏上得到同心圆环衍射图样（示意） -->
<template>
  <svg viewBox="0 0 420 240" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="102" width="34" height="40" rx="7" fill="var(--c-surface)" stroke="var(--c-border)" stroke-width="1.4" />
    <circle cx="27" cy="122" r="4" fill="var(--c-accent)" />
    <line x1="48" y1="122" x2="140" y2="122" stroke="var(--c-velocity)" stroke-width="2" stroke-linecap="round" />
    <path d="M 140 122 l -10 -5 M 140 122 l -10 5" fill="none" stroke="var(--c-velocity)" stroke-width="2" stroke-linecap="round" />
    <text x="94" y="110" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">电子束</text>
    <rect x="146" y="62" width="6" height="120" rx="3" fill="var(--c-physics)" opacity="0.55" />
    <text x="149" y="204" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">晶体薄膜</text>
    <g stroke="var(--c-accent)" stroke-width="1.2" opacity="0.35">
      <line x1="152" y1="122" x2="244" y2="78" />
      <line x1="152" y1="122" x2="244" y2="166" />
      <line x1="152" y1="122" x2="244" y2="122" />
    </g>
    <rect x="244" y="30" width="158" height="184" rx="14" fill="var(--c-surface)" fill-opacity="0.5" stroke="var(--c-border)" stroke-width="1.5" />
    <g fill="none" stroke="var(--c-physics)">
      <circle cx="323" cy="122" r="22" stroke-width="1.6" />
      <circle cx="323" cy="122" r="40" stroke-width="1.7" opacity="0.85" />
      <circle cx="323" cy="122" r="58" stroke-width="1.8" opacity="0.65" />
      <circle cx="323" cy="122" r="76" stroke-width="1.9" opacity="0.45" />
    </g>
    <circle cx="323" cy="122" r="6" fill="var(--c-accent)" />
    <text x="323" y="232" font-family="KaTeX_Main" font-size="11" fill="var(--c-text-dim)" text-anchor="middle">荧光屏</text>
  </svg>
</template>
