<template>
  <!--
    第 7 页《匀强磁场》配图（教材图 13.2-2 风格）
    —— 两块平行的异名磁极（上 N 下 S），极板间是匀强磁场：磁感线等间距、平行、由 N 指向 S；
       左右边缘用外弯的虚线示意"除边缘部分外才可视为匀强"。
  -->
  <svg viewBox="0 0 460 300" width="460" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="26" width="340" height="42" rx="8" fill="rgba(148,163,184,0.12)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="230" y="55" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-text)">N</text>
    <rect x="60" y="232" width="340" height="42" rx="8" fill="rgba(148,163,184,0.12)" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="230" y="261" text-anchor="middle" font-family="KaTeX_Main" font-size="20" fill="var(--c-text)">S</text>
    <g v-for="x in LINES" :key="x">
      <CourseArrow :from="{ x, y: 84 }" :to="{ x, y: 224 }" stroke="var(--c-accent)" stroke-width="2.2" />
    </g>
    <path d="M 84 214 C 60 178 60 132 84 96" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.6" />
    <path d="M 376 214 C 400 178 400 132 376 96" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="6 5" opacity="0.6" />
  </svg>
</template>

<script setup>
/** 极板间等间距的磁感线（由 N 指向 S，向下） */
const LINES = [115, 160, 205, 250, 295, 340];
</script>
