<template>
  <!-- 第 28 页「例题：粗绳悬挂在天花板上」：绳分成三段（颜色深浅表示），越靠上的截面要承担的下面绳重越多，拉力箭头越长 -->
  <svg class="fig" viewBox="0 0 440 330" xmlns="http://www.w3.org/2000/svg">
    <SurfaceHatch :from="{ x: 70, y: 86 }" :to="{ x: 340, y: 86 }" side="above" :thickness="12" :gap="24" color="#cbd5e1" :line-width="4" />
    <line x1="70" y1="86" x2="340" y2="86" stroke="#cbd5e1" stroke-width="2.4" />
    <text x="352" y="80" text-anchor="start" font-size="17" fill="#94a3b8">天花板</text>

    <line x1="200" y1="86" x2="200" y2="159" stroke="#94a3b8" stroke-width="11" stroke-linecap="round" />
    <line x1="200" y1="159" x2="200" y2="233" stroke="#cbd5e1" stroke-width="11" stroke-linecap="round" />
    <line x1="200" y1="233" x2="200" y2="306" stroke="#e2e8f0" stroke-width="11" stroke-linecap="round" />
    <line x1="189" y1="159" x2="211" y2="159" stroke="#64748b" stroke-width="2" />
    <line x1="189" y1="233" x2="211" y2="233" stroke="#64748b" stroke-width="2" />

    <CourseArrow :from="{ x: 250, y: 255 }" :to="{ x: 250, y: 233 }" stroke="#e2a846" stroke-width="3.4" />
    <CourseArrow :from="{ x: 250, y: 203 }" :to="{ x: 250, y: 159 }" stroke="#e2a846" stroke-width="3.4" />
    <CourseArrow :from="{ x: 250, y: 152 }" :to="{ x: 250, y: 86 }" stroke="#e2a846" stroke-width="3.4" />
    <line x1="207" y1="233" x2="243" y2="233" stroke="#e2a846" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.75" />
    <line x1="207" y1="159" x2="243" y2="159" stroke="#e2a846" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.75" />

    <text x="264" y="250" text-anchor="start" font-size="18" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">T</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">1</tspan>
    </text>
    <text x="264" y="186" text-anchor="start" font-size="18" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">T</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">2</tspan>
    </text>
    <text x="264" y="124" text-anchor="start" font-size="18" fill="#e2a846">
      <tspan font-family="KaTeX_Math" font-style="italic">T</tspan>
      <tspan font-family="KaTeX_Main" font-size="12" dy="4">3</tspan>
    </text>

    <text x="200" y="326" text-anchor="middle" font-size="17" fill="#94a3b8">自由端</text>
    <text x="214" y="300" text-anchor="start" font-size="17" fill="#94a3b8">
      <tspan font-family="KaTeX_Math" font-style="italic">T</tspan>
      = 0
    </text>
  </svg>
</template>

<style scoped>
.fig {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
