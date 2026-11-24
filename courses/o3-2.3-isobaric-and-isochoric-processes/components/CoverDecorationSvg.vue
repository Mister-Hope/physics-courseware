<!-- 本课封面装饰：烧瓶内的气体分子 + 一条上升的状态线（温度升高，V 或 p 随之增大） -->
<template>
  <svg viewBox="0 0 380 230" width="330" xmlns="http://www.w3.org/2000/svg">
    <path d="M140 34 L140 86 L94 150 A56 56 0 0 0 206 150 L160 86 L160 34" fill="none" stroke="var(--c-text-dim)" stroke-width="2" stroke-opacity=".5" />
    <rect x="130" y="22" width="40" height="12" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-opacity=".6" />
    <circle cx="128" cy="132" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="148" cy="144" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="168" cy="128" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="140" cy="162" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="162" cy="158" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="122" cy="150" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="176" cy="144" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <circle cx="150" cy="120" r="3" fill="var(--c-physics)" fill-opacity=".75" />
    <CourseArrow :from="{ x: 46, y: 214 }" :to="{ x: 340, y: 54 }" stroke="var(--c-accent)" :stroke-width="2" :head-size="10" stroke-opacity=".65" />
    <circle cx="252" cy="101" r="11" fill="var(--c-accent)" fill-opacity=".16" />
    <circle cx="252" cy="101" r="5" fill="var(--c-accent)" />
  </svg>
</template>
