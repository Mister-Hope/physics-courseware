<template>
  <!-- 第 10 页：力的三角形 —— 点击 3 之后 G、F1、F2 依次平移入画，首尾相接拼成直角三角形 -->
  <svg viewBox="45 30 130 165" xmlns="http://www.w3.org/2000/svg">
    <g class="ft-g" v-click="3">
      <CourseArrow :from="{ x: 85, y: 53 }" :to="{ x: 85, y: 165 }" :head-size="10" stroke="#f87171" stroke-width="3" />
      <text x="58" y="115" fill="#f87171" font-family="KaTeX_Math" font-style="italic" font-size="15">G</text>
    </g>
    <g class="ft-f1" v-click="3">
      <CourseArrow :from="{ x: 85, y: 165 }" :to="{ x: 149.6, y: 53 }" :head-size="10" stroke="#2dd4bf" stroke-width="3" />
      <text x="134" y="120" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="143" y="123" fill="#2dd4bf" font-family="KaTeX_Math" font-style="italic" font-size="10">1</text>
    </g>
    <g class="ft-f2" v-click="3">
      <CourseArrow :from="{ x: 149.6, y: 53 }" :to="{ x: 85, y: 53 }" :head-size="10" stroke="#e2a846" stroke-width="3" />
      <text x="105" y="43" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="15">F</text>
      <text x="114" y="46" fill="#e2a846" font-family="KaTeX_Math" font-style="italic" font-size="10">2</text>
    </g>
    <g class="ft-mark" v-click="3">
      <path d="M79 53 L79 59 L85 59" fill="none" stroke="#cbd5e1" stroke-width="1.3" />
      <path d="M85 125 A40 40 0 0 1 105 130.4" fill="none" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="5 4" />
      <text x="110" y="150" fill="#94a3b8" font-family="KaTeX_Math" font-style="italic" font-size="15">θ</text>
      <text x="60" y="185" fill="#94a3b8" font-family="KaTeX_Main" font-size="13">力的三角形</text>
    </g>
  </svg>
</template>

<style scoped>
/* 三个力从各自指向的方向“平移”进画面：G 从上方落下、F1 沿自身方向、F2 从右侧滑入，最后补上直角与 θ */
.ft-g.slidev-vclick-hidden {
  transform: translateY(-90px);
}

.ft-f1.slidev-vclick-hidden {
  transform: translate(-42px, 73px);
}

.ft-f2.slidev-vclick-hidden {
  transform: translateX(76px);
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
