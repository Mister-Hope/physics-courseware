<template>
  <!-- 第 14 页练习：小球从光滑曲面的 A（h1、v1）滑到 B（h2、v2），只画题目给定的量与运动方向 -->
  <svg width="340" height="300" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto">
    <line x1="20" y1="270" x2="330" y2="270" stroke="var(--c-neutral-500)" stroke-width="3" />
    <SurfaceHatch :from="{ x: 24, y: 270 }" :to="{ x: 326, y: 270 }" side="below" :thickness="12" :gap="22" />
    <path d="M 50 30 C 50 150 120 205 310 205" stroke="var(--c-neutral-300)" stroke-width="4" stroke-linecap="round" />
    <line x1="55" y1="80" x2="55" y2="270" stroke="var(--c-ok)" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.55" />
    <line x1="250" y1="205" x2="250" y2="270" stroke="var(--c-ok)" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.55" />
    <text x="18" y="176" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="27" y="180" font-size="10" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">1</text>
    <text x="210" y="244" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">h</text>
    <text x="219" y="248" font-size="10" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">2</text>
    <circle cx="55" cy="80" r="12" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <circle cx="250" cy="205" r="12" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <text x="26" y="66" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">A</text>
    <text x="222" y="194" font-size="15" fill="var(--c-text-dim)" font-family="KaTeX_Main">B</text>
    <CourseArrow :from="{ x: 55, y: 80 }" :to="{ x: 80, y: 135 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
    <text x="84" y="122" font-size="13" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="92" y="126" font-size="9" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">1</text>
    <CourseArrow :from="{ x: 250, y: 205 }" :to="{ x: 305, y: 205 }" stroke="var(--c-accent-2)" :stroke-width="2.6" />
    <text x="270" y="194" font-size="13" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="278" y="198" font-size="9" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">2</text>
  </svg>
</template>
