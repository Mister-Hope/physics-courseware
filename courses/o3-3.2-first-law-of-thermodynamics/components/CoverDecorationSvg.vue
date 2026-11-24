<!-- 封面装饰：汽缸被压缩（W）、被火焰加热（Q），内能上升（ΔU） -->
<template>
  <svg viewBox="0 0 380 230" width="330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="汽缸、活塞、热量与内能变化的示意">
    <g stroke="var(--c-text-dim)" stroke-width="2.2" fill="none" stroke-linecap="round">
      <path d="M130 58 L130 178 L250 178 L250 58" />
      <path d="M126 86 L254 86" />
      <path d="M190 40 L190 86" />
      <path d="M166 40 L214 40" />
    </g>
    <g fill="var(--c-physics)" opacity="0.75">
      <circle cx="150" cy="110" r="3.2" />
      <circle cx="174" cy="104" r="3.2" />
      <circle cx="200" cy="110" r="3.2" />
      <circle cx="226" cy="104" r="3.2" />
      <circle cx="158" cy="132" r="3.2" />
      <circle cx="184" cy="126" r="3.2" />
      <circle cx="210" cy="132" r="3.2" />
      <circle cx="236" cy="126" r="3.2" />
      <circle cx="150" cy="154" r="3.2" />
      <circle cx="176" cy="148" r="3.2" />
      <circle cx="202" cy="154" r="3.2" />
      <circle cx="228" cy="148" r="3.2" />
      <circle cx="162" cy="170" r="3.2" />
      <circle cx="192" cy="166" r="3.2" />
      <circle cx="222" cy="170" r="3.2" />
    </g>
    <line x1="156" y1="224" x2="234" y2="224" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" />
    <g fill="var(--c-danger)" opacity="0.85">
      <path d="M162 222 C162 210 170 206 172 194 C174 206 182 210 182 222 Z" />
      <path d="M188 222 C188 206 198 200 200 184 C202 200 212 206 212 222 Z" />
      <path d="M218 222 C218 210 226 206 228 194 C230 206 238 210 238 222 Z" />
    </g>
    <CourseArrow :from="{ x: 190, y: 10 }" :to="{ x: 190, y: 34 }" stroke="var(--c-velocity)" :stroke-width="2.6" :head-size="10" />
    <CourseArrow :from="{ x: 300, y: 170 }" :to="{ x: 300, y: 104 }" stroke="var(--c-accent)" :stroke-width="2.6" :head-size="10" />
    <text x="198" y="30" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-velocity)">W</text>
    <text x="308" y="142" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-accent)">ΔU</text>
    <text x="138" y="214" font-family="KaTeX_Math" font-style="italic" font-size="15" fill="var(--c-danger)">Q</text>
  </svg>
</template>
