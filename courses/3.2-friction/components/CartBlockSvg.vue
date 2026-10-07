<template>
  <!-- 小车 B 上的物块 A（v₂ < v₁，且 v₁ = 2v₂）：判断 A 对 B 的摩擦力方向 -->
  <svg viewBox="0 0 400 240" class="fig-svg fig-lg" xmlns="http://www.w3.org/2000/svg">
    <!-- 地面与斜剖线 -->
    <SurfaceHatch :from="{ x: 20, y: 216 }" :to="{ x: 384, y: 216 }" side="below" :thickness="12" :gap="56" />
    <line x1="20" y1="216" x2="384" y2="216" stroke="#cbd5e1" stroke-width="2.2" />

    <!-- 小车 B 车体（x: 48..252, y: 146..188） -->
    <rect x="48" y="146" width="204" height="42" rx="8" fill="rgba(96,165,250,0.16)" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <text x="150" y="172" text-anchor="middle" font-size="15" fill="var(--c-text)">小车 B</text>

    <!-- 小车车轮与轮轴（底边 cy+r = 200+16 = 216 严格相切地面，实心底色遮挡车体下框线） -->
    <circle cx="94" cy="200" r="16" fill="#0f1425" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <circle cx="94" cy="200" r="3.5" fill="var(--c-accent-2)" />
    <circle cx="206" cy="200" r="16" fill="#0f1425" stroke="var(--c-accent-2)" stroke-width="2.2" />
    <circle cx="206" cy="200" r="3.5" fill="var(--c-accent-2)" />

    <!-- 物块 A（x: 107..193, y: 94..146，居中叠放于小车 B 上表面） -->
    <rect x="107" y="94" width="86" height="52" rx="7" fill="rgba(226,168,70,0.18)" stroke="var(--c-accent)" stroke-width="2.2" />
    <text x="150" y="126" text-anchor="middle" font-size="16" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic">A</text>

    <!-- 物块 A 的速度 v₂：隔空悬浮于 A 正上方 26px 处（y=68），长度 54px（123 → 177） -->
    <CourseArrow :from="{ x: 123, y: 68 }" :to="{ x: 177, y: 68 }" stroke="var(--c-accent)" stroke-width="3.2" />
    <text x="150" y="53" text-anchor="middle" font-size="16" fill="var(--c-accent)">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
      <tspan dy="5" font-size="11">2</tspan>
    </text>

    <!-- 小车 B 的速度 v₁：隔空悬浮于小车右侧 22px 处（x=274 起），长度 108px（274 → 382，严格满足 v₁ = 2v₂） -->
    <CourseArrow :from="{ x: 274, y: 167 }" :to="{ x: 382, y: 167 }" stroke="var(--c-accent-2)" stroke-width="3.2" />
    <text x="328" y="152" text-anchor="middle" font-size="16" fill="var(--c-accent-2)">
      <tspan font-family="KaTeX_Math" font-style="italic">v</tspan>
      <tspan dy="5" font-size="11">1</tspan>
    </text>
  </svg>
</template>
