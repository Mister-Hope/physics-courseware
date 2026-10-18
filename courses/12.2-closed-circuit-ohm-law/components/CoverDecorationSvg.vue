<!-- 封面装饰：一个完整的小回路（电源 + 灯泡 + 电阻），呼应"闭合电路"主题 -->
<template>
  <svg viewBox="0 0 880 260" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path d="M150 90 H730" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M150 200 H730" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitBattery :x="440" :y="145" orientation="vertical" polarity emf="E" />
    <path d="M440 90 V137" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M440 153 V200" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M150 90 V133" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M150 200 V157" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitBulb :x="150" :y="145" orientation="vertical" label="L" />
    <path d="M730 90 V121" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <path d="M730 200 V169" stroke="var(--c-wire)" stroke-width="1.6" fill="none" stroke-linecap="round" />
    <CircuitResistor :x="730" :y="145" orientation="vertical" label="R" />
    <CourseArrow :from="{ x: 240, y: 98 }" :to="{ x: 320, y: 98 }" stroke="var(--c-accent)" stroke-width="2.4" label="I" />
    <CourseArrow :from="{ x: 640, y: 192 }" :to="{ x: 560, y: 192 }" stroke="var(--c-accent)" stroke-width="2.4" />
  </svg>
</template>
