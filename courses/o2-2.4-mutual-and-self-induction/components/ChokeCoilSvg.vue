<!--
  第 15 页「自感的利用」之二：扼流圈。
  线圈（套铁芯）串在导线中：直流（上方直线箭头）能通过、一直通到右边；交流（下方波浪箭头）
  被线圈挡住（红叉）。标签「直流」「交流」与箭头同色、字号 16（按 1:1 渲染 = 16px）。
  viewBox 420×84 与同页另外三张图一致。
-->
<template>
  <svg viewBox="0 0 420 84" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 铁芯（先画，线圈盖在上面） -->
    <rect x="205" y="37" width="94" height="10" rx="2" fill="var(--c-neutral-700)" opacity="0.55" />
    <!-- 扼流圈线圈：横放连续螺旋线 4 匝，套在铁芯上；接线端都在下缘 (207,58) / (297,58) -->
    <Solenoid
      :x="252"
      :y="42"
      :length="90"
      :radius="16"
      :turns="4"
      direction="cw"
      :phase="180"
      :line-width="2.8"
      :back-opacity="0.3"
    />
    <!-- 导线：线圈串在中间 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round">
      <path d="M 24 58 H 207" />
      <path d="M 297 58 H 396" />
    </g>
    <!-- 直流：直线箭头穿过线圈、一直通到右边 -->
    <CourseArrow
      :from="{ x: 76, y: 16 }"
      :to="{ x: 396, y: 16 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.6"
    />
    <text x="26" y="22" font-size="16" fill="var(--c-velocity)">直流</text>
    <!-- 交流：波浪箭头到线圈前被挡住 -->
    <path
      d="M 78 70 q 5 -12 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0 t 10 0"
      fill="none"
      stroke="var(--c-velocity)"
      stroke-width="2.4"
      stroke-linecap="round"
    />
    <text x="26" y="76" font-size="16" fill="var(--c-velocity)">交流</text>
    <!-- 红叉：交流被挡住 -->
    <path
      d="M 199 63 L 211 75 M 211 63 L 199 75"
      stroke="var(--c-danger)"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>
