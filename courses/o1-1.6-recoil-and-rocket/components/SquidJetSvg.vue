<template>
  <svg viewBox="0 0 420 220" width="420" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 84 110 C 84 76 114 58 150 64 C 182 69 202 88 206 110 C 202 132 182 151 150 156 C 114 162 84 144 84 110 Z"
      fill="var(--c-neutral-700)"
      stroke="var(--c-neutral-300)"
      stroke-width="2"
    />
    <path d="M 204 92 L 238 72 L 224 108 Z" fill="var(--c-neutral-500)" stroke="var(--c-neutral-300)" stroke-width="1.4" />
    <path d="M 204 128 L 238 148 L 224 112 Z" fill="var(--c-neutral-500)" stroke="var(--c-neutral-300)" stroke-width="1.4" />
    <g fill="none" stroke="var(--c-neutral-300)" stroke-width="2.4" stroke-linecap="round">
      <path d="M 90 96 C 70 86 54 84 42 90" />
      <path d="M 88 108 C 66 104 48 106 34 114" />
      <path d="M 90 120 C 70 130 54 136 42 146" />
      <path d="M 96 132 C 80 148 66 158 54 170" />
    </g>
    <circle cx="132" cy="98" r="6" fill="var(--c-accent)" />
    <circle cx="134" cy="96" r="2" fill="var(--c-panel)" />
    <path d="M 206 110 C 218 104 226 106 232 112 C 226 118 218 120 206 114" fill="none" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <g fill="var(--c-accent-2)" opacity="0.85">
      <circle cx="260" cy="104" r="3" />
      <circle cx="284" cy="116" r="2.4" />
      <circle cx="306" cy="102" r="2" />
      <circle cx="326" cy="118" r="2.8" />
    </g>
    <CourseArrow :from="{ x: 240, y: 110 }" :to="{ x: 392, y: 110 }" stroke="var(--c-accent-2)" stroke-width="2.6" label="喷水" />
    <CourseArrow :from="{ x: 120, y: 190 }" :to="{ x: 34, y: 190 }" stroke="var(--c-accent)" stroke-width="2.6" label="运动" :label-dy="-12" />
  </svg>
</template>
