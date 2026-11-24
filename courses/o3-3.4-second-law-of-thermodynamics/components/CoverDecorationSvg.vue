<!-- 封面装饰：高温/低温两块（热传导方向）+ 反向虚线与叉 + 熵的散点；无文字 -->
<template>
  <svg viewBox="0 0 260 180" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="24" y="28" width="76" height="48" rx="12" fill="rgba(248,113,113,0.16)" stroke="var(--c-danger)" stroke-width="1.6" />
    <rect x="160" y="104" width="76" height="48" rx="12" fill="rgba(96,165,250,0.14)" stroke="var(--c-velocity)" stroke-width="1.6" />
    <CourseArrow :from="{ x: 100, y: 56 }" :to="{ x: 158, y: 124 }" stroke="var(--c-accent)" :stroke-width="3" :head-size="10" />
    <CourseArrow
      :from="{ x: 154, y: 110 }"
      :to="{ x: 110, y: 70 }"
      stroke="var(--c-text-dim)"
      :stroke-width="1.6"
      :head-size="7"
      stroke-dasharray="5 5"
      opacity="0.75"
    />
    <line x1="126" y1="84" x2="142" y2="100" stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round" />
    <line x1="142" y1="84" x2="126" y2="100" stroke="var(--c-danger)" stroke-width="2.6" stroke-linecap="round" />
    <circle cx="42" cy="146" r="2.6" fill="var(--c-sky)" opacity="0.75" />
    <circle cx="58" cy="158" r="2.2" fill="var(--c-sky)" opacity="0.55" />
    <circle cx="76" cy="148" r="3" fill="var(--c-sky)" opacity="0.8" />
    <circle cx="92" cy="162" r="2.2" fill="var(--c-sky)" opacity="0.5" />
    <circle cx="110" cy="152" r="2.6" fill="var(--c-sky)" opacity="0.65" />
    <circle cx="128" cy="164" r="2" fill="var(--c-sky)" opacity="0.45" />
    <circle cx="148" cy="154" r="2.8" fill="var(--c-sky)" opacity="0.6" />
    <circle cx="168" cy="166" r="2.2" fill="var(--c-sky)" opacity="0.4" />
  </svg>
</template>
