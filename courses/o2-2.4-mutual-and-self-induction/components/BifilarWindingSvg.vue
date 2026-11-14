<!--
  第 15 页「自感的防治」之二：双线绕法。
  两根导线并排同向绕在同一个骨架上：画成两条绕向相同的连续螺旋线（起点相差半周，
  沿轴错开半个螺距，看起来就是双线并绕）；两根线的电流方向相反（蓝色箭头：上面那根向左、
  下面那根向右，两端方向一致），磁场互相抵消，自感大大减小。
  viewBox 420×84 与同页另外三张图一致。
-->
<template>
  <svg viewBox="0 0 420 84" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 骨架（先画，绕线盖在上面） -->
    <rect x="120" y="38" width="170" height="12" rx="3" fill="var(--c-neutral-700)" opacity="0.55" />
    <!-- 两根导线同向并排绕同一骨架：接线端分别在上缘 y=26 与下缘 y=62，x=145 / 265 -->
    <Solenoid :x="205" :y="44" :length="120" :radius="18" :turns="3" direction="ccw" :phase="180" :line-width="2.6" :back-opacity="0.26" />
    <Solenoid
      :x="205"
      :y="44"
      :length="120"
      :radius="18"
      :turns="3"
      direction="ccw"
      :phase="0"
      color="var(--c-accent-light)"
      :line-width="2.6"
      :back-opacity="0.26"
    />
    <!-- 两根导线的引出线 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round">
      <path d="M 145 62 H 50" />
      <path d="M 265 62 H 370" />
      <path d="M 145 26 H 50" />
      <path d="M 265 26 H 370" />
    </g>
    <!-- 电流方向相反：下面那根向右、上面那根向左（两端方向一致） -->
    <CourseArrow :from="{ x: 58, y: 62 }" :to="{ x: 106, y: 62 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 310, y: 62 }" :to="{ x: 362, y: 62 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 106, y: 26 }" :to="{ x: 58, y: 26 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
    <CourseArrow :from="{ x: 362, y: 26 }" :to="{ x: 310, y: 26 }" stroke="var(--c-velocity)" :stroke-width="2.6" />
  </svg>
</template>
