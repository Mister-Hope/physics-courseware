<!-- 第 2 页引课图：匀强电场中正电荷只受静电力，沿示意轨迹由 A 点运动到 B 点 -->
<template>
  <svg viewBox="0 0 600 240" width="100%" xmlns="http://www.w3.org/2000/svg">
    <CourseArrow
      v-for="(y, i) in [40, 110, 180]"
      :key="i"
      :from="{ x: 55, y }"
      :to="{ x: 545, y }"
      stroke="var(--c-accent)"
      stroke-width="1.6"
      opacity="0.45"
    />
    <text x="548" y="30" text-anchor="end" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">E</text>
    <path d="M 120 118 C 220 195 350 190 462 118" fill="none" stroke="var(--c-neutral-300)" stroke-width="2" stroke-dasharray="8 6" opacity="0.75" />
    <polygon points="468,113 461,112 458,104" fill="var(--c-neutral-300)" opacity="0.75" />
    <circle cx="470" cy="110" r="5" fill="none" stroke="var(--c-accent)" stroke-width="2" />
    <text x="484" y="105" fill="var(--c-accent)" font-size="14">B</text>
    <circle cx="120" cy="110" r="9" fill="rgb(248 113 113 / 22%)" stroke="var(--c-force)" stroke-width="2" />
    <path d="M 115 110 H 125 M 120 105 V 115" stroke="var(--c-force)" stroke-width="1.8" stroke-linecap="round" />
    <text x="112" y="140" text-anchor="middle" fill="var(--c-accent)" font-size="14">A</text>
    <CourseArrow :from="{ x: 133, y: 110 }" :to="{ x: 208, y: 110 }" stroke="var(--c-force)" stroke-width="3" label="F" />
  </svg>
</template>
