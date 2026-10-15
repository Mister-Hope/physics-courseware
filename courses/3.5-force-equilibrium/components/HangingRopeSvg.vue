<template>
  <!-- 第 10 页：悬绳 AO 与水平绳 BO 拉住重物的 O 点：F1、F2、G 按真实比例画出，θ 以竖直虚线为参照（点击 2 才出力） -->
  <svg viewBox="0 0 340 260" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="30" x2="300" y2="30" stroke="var(--c-text-dim)" stroke-width="3" />
    <line x1="60" y1="30" x2="46" y2="16" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <line x1="100" y1="30" x2="86" y2="16" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <line x1="140" y1="30" x2="126" y2="16" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <line x1="180" y1="30" x2="166" y2="16" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <line x1="220" y1="30" x2="206" y2="16" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <line x1="260" y1="30" x2="246" y2="16" stroke="var(--c-neutral-500)" stroke-width="1.6" />
    <rect x="300" y="18" width="26" height="234" fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
    <line x1="300" y1="18" x2="300" y2="252" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <line x1="118" y1="30" x2="170" y2="120" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="170" y1="120" x2="300" y2="120" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="170" y1="120" x2="170" y2="200" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <rect
      x="145"
      y="200"
      width="50"
      height="32"
      rx="6"
      fill="color-mix(in srgb, var(--c-velocity) 16%, transparent)"
      stroke="var(--c-velocity)"
      stroke-width="2"
    />
    <line x1="170" y1="120" x2="170" y2="44" stroke="var(--c-neutral-500)" stroke-width="1.3" stroke-dasharray="5 4" opacity="0.85" />
    <path d="M 170 70 A 50 50 0 0 0 145 76.7" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 4" />
    <text x="150" y="67" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="16">θ</text>
    <circle cx="170" cy="120" r="4" fill="var(--c-text)" />
    <text x="152" y="138" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="16">O</text>
    <text x="108" y="22" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">A</text>
    <text x="304" y="114" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15">B</text>
    <g v-click="2">
      <CourseArrow :from="{ x: 170, y: 120 }" :to="{ x: 129.6, y: 50 }" :head-size="10" stroke="var(--c-physics)" stroke-width="3" />
      <CourseArrow :from="{ x: 170, y: 120 }" :to="{ x: 210.4, y: 120 }" :head-size="10" stroke="var(--c-accent)" stroke-width="3" />
      <CourseArrow :from="{ x: 170, y: 120 }" :to="{ x: 170, y: 190 }" :head-size="10" stroke="var(--c-force)" stroke-width="3" />
      <text x="126" y="98" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="135" y="101" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
      <text x="196" y="110" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="205" y="113" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
      <text x="180" y="160" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
    </g>
  </svg>
</template>
