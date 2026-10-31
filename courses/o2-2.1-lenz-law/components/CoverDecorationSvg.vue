<!--
  封面装饰：条形磁体（上 S 下 N）从上方插入螺线管，线圈渗出感应电流。
  磁体与线圈都用共享图元：BarMagnet（竖放、N 在下）+ Solenoid（竖放、连续螺旋线、从下端看逆时针）。
  N 极插入 = B_i 向上 = 俯视逆时针，所以前方导线上的感应电流向右。
  图按 16px 体系绘制（viewBox 240×150），放在封面右下角。
-->
<template>
  <svg viewBox="0 0 240 150" width="270" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 螺线管：竖放、连续螺旋线，从下端看逆时针 -->
    <Solenoid
      :x="120"
      :y="96"
      :length="52"
      :radius="36"
      :turns="4.5"
      direction="ccw"
      orientation="vertical"
      color="var(--c-accent)"
      :line-width="2.4"
      :back-opacity="0.42"
      back-dash
    />

    <!-- 条形磁体：上 S 下 N，从上方插入 -->
    <BarMagnet :x="120" :y="32" :length="46" :width="22" n-side="bottom" />

    <!-- 插入方向 -->
    <CourseArrow :from="{ x: 162, y: 16 }" :to="{ x: 162, y: 50 }" stroke="var(--c-text-dim)" :stroke-width="2" :head-size="8" />

    <!-- 感应电流：前方导线上的一小段箭头（俯视逆时针 = 向右） -->
    <CourseArrow :from="{ x: 105.7, y: 111.6 }" :to="{ x: 134.3, y: 110.3 }" stroke="var(--c-physics)" :stroke-width="2.8" :head-size="9" />
  </svg>
</template>
