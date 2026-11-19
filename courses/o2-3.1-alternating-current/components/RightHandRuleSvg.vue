<!--
  第 15 页：右手定则。磁场垂直纸面向里，导体 AB 向右运动，
  拇指指向 v，磁感线穿入掌心，四指指向感应电流 I。
-->
<template>
  <svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="右手定则：磁场向里，导体向右运动，感应电流向上">
    <FieldDots :x="30" :y="30" :cols="24" :rows="11" :spacing="20" dir="in" />
    <line x1="380" y1="58" x2="380" y2="232" stroke="var(--c-accent)" stroke-width="5" stroke-linecap="round" />
    <circle cx="380" cy="58" r="4" fill="var(--c-accent)" />
    <circle cx="380" cy="232" r="4" fill="var(--c-accent)" />
    <text x="380" y="45" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">A</text>
    <text x="380" y="252" fill="var(--c-text)" font-family="KaTeX_Math" font-style="italic" font-size="16" text-anchor="middle">B</text>
    <CourseArrow :from="{ x: 380, y: 145 }" :to="{ x: 545, y: 145 }" stroke="var(--c-accent-2)" stroke-width="3.2" label="v" :label-dy="-10" />
    <CourseArrow :from="{ x: 340, y: 210 }" :to="{ x: 340, y: 88 }" stroke="var(--c-danger)" stroke-width="3.4" label="I" :label-dx="-16" :label-dy="0" />
    <text x="380" y="272" fill="var(--c-text-dim)" font-size="12" text-anchor="middle">B 垂直纸面向里</text>
  </svg>
</template>
