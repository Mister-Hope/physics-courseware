<template>
  <!-- 第 10 页：力的三角形 —— 点击 3 之后 G、F1、F2 依次平移入画，首尾相接拼成直角三角形；三个力的方向与左图一致：G 竖直向下、F1 斜向左上、F2 水平向右 -->
  <svg viewBox="45 30 130 165" xmlns="http://www.w3.org/2000/svg">
    <g class="ft-g" v-click="3">
      <CourseArrow :from="{ x: 120, y: 53 }" :to="{ x: 120, y: 165 }" :head-size="10" stroke="var(--c-force)" stroke-width="3" />
      <text x="147" y="115" fill="var(--c-force)" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
    </g>
    <g class="ft-f1" v-click="3">
      <CourseArrow :from="{ x: 120, y: 165 }" :to="{ x: 55.4, y: 53 }" :head-size="10" stroke="var(--c-physics)" stroke-width="3" />
      <text x="71" y="120" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="80" y="123" fill="var(--c-physics)" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    </g>
    <g class="ft-f2" v-click="3">
      <CourseArrow :from="{ x: 55.4, y: 53 }" :to="{ x: 120, y: 53 }" :head-size="10" stroke="var(--c-accent)" stroke-width="3" />
      <text x="100" y="43" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="109" y="46" fill="var(--c-accent)" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    </g>
    <g class="ft-mark" v-click="3">
      <path d="M108 53 L108 65 L120 65" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.3" />
      <path d="M120 125 A40 40 0 0 0 100 130.4" fill="none" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 4" />
      <text x="105" y="116" fill="var(--c-text-dim)" font-family="KaTeX_Math" font-style="italic" font-size="15" text-anchor="middle">θ</text>
      <text x="88" y="185" fill="var(--c-text-dim)" font-family="KaTeX_Main" font-size="13" text-anchor="middle">力的三角形</text>
    </g>
  </svg>
</template>

<style scoped>
/* 三个力从各自指向的方向“平移”进画面：G 从上方落下、F1 沿自身方向（从右下往左上）、F2 从左侧滑入，最后补上直角、θ 与图注 */
.ft-g.slidev-vclick-hidden {
  transform: translateY(-90px);
}

.ft-f1.slidev-vclick-hidden {
  transform: translate(42px, 73px);
}

.ft-f2.slidev-vclick-hidden {
  transform: translateX(-76px);
}

.ft-g {
  transition-delay: 0s;
}

.ft-f1 {
  transition-delay: 0.4s;
}

.ft-f2 {
  transition-delay: 0.8s;
}

.ft-mark {
  transition-delay: 1.3s;
}
</style>
