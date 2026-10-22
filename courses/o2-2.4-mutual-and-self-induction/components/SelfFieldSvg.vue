<!--
  第 7 页示意图：线圈自身电流变化时，穿过它自己的磁场也在变。
  只画线圈、自身磁场与电流方向，不写结论。
-->
<template>
  <svg viewBox="85 40 265 175" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 线圈自身的磁场：从线圈内部穿过，从两侧绕回 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.7" stroke-dasharray="12 9" class="field-flow" opacity="0.75">
      <path d="M 178 102 C 142 102, 142 140, 178 140" />
      <path d="M 178 92 C 116 92, 116 150, 178 150" />
      <path d="M 242 102 C 278 102, 278 140, 242 140" />
      <path d="M 242 92 C 304 92, 304 150, 242 150" />
    </g>

    <!-- 线圈 -->
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.8">
      <ellipse cx="210" cy="104" rx="30" ry="7" />
      <ellipse cx="210" cy="118" rx="30" ry="7" />
      <ellipse cx="210" cy="132" rx="30" ry="7" />
      <ellipse cx="210" cy="146" rx="30" ry="7" />
      <path d="M 240 104 V 118" />
      <path d="M 180 118 V 132" />
      <path d="M 240 132 V 146" />
    </g>

    <!-- 引线 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 210 97 V 48" />
      <path d="M 210 153 V 206" />
    </g>

    <!-- 电流方向：画在下引线上 -->
    <CourseArrow :from="{ x: 210, y: 196 }" :to="{ x: 210, y: 160 }" stroke="var(--c-accent-2)" :stroke-width="3.4" />
    <text x="224" y="186" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-accent-2)">I</text>
  </svg>
</template>
