<!--
  第 4 页示意图：互感。
  与第 2 页同一个装置：大线圈 B 竖放，小线圈 A 竖放、从 B 顶端插进 B 的孔里，两圈同轴套在一起；
  A 的回路接电源与开关，B 的回路接小灯泡——两个回路之间没有导线。
  A 中电流变化时，穿过 B 的磁通量变化，B 中产生感应电动势（灯亮）。

  耦合只用「柔和光区 + 沿轴箭头」表示磁场（不画旋转虚线椭圆，避免被读成磁感线）；
  图上不写结论，结论由页面的 DefinitionBox 给出。
-->
<template>
  <svg viewBox="0 0 580 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="mutual-link-glow-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--c-accent)" stop-opacity="0.5" />
        <stop offset="100%" stop-color="var(--c-accent)" stop-opacity="0" />
      </radialGradient>
    </defs>

    <!-- 穿过两线圈的磁场：柔和填充光区 + 沿轴方向 -->
    <g class="coupling-glow">
      <ellipse cx="300" cy="145" rx="42" ry="76" fill="url(#mutual-link-glow-grad)" />
      <ellipse cx="300" cy="196" rx="58" ry="64" fill="url(#mutual-link-glow-grad)" />
    </g>
    <CourseArrow
      :from="{ x: 300, y: 206 }"
      :to="{ x: 300, y: 104 }"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      opacity="0.8"
    />

    <!-- 线圈 A（小、套在里面）：竖放 4 匝；接线端在右侧 (326,86) 上、(326,204) 下 -->
    <Solenoid
      :x="300"
      :y="145"
      :length="118"
      :radius="26"
      :turns="4"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.8"
      :back-opacity="0.3"
    />
    <!-- A 的回路：上端引出向上、向左兜一圈；下端从 B 的孔里穿下去再接回 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 326 86 V 58 H 92 V 132" />
      <path d="M 92 168 V 300 H 192" />
      <path d="M 208 300 H 326 V 204" />
    </g>
    <CircuitSwitch :x="92" :y="150" orientation="vertical" label="S" :open="true" />
    <CircuitBattery :x="200" :y="300" polarity emf="E" />

    <!-- 线圈 B（大、套在外面）：竖放 4 匝；接线端在右侧 (345,134) 上、(345,258) 下 -->
    <Solenoid
      :x="300"
      :y="196"
      :length="124"
      :radius="45"
      :turns="4"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.8"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- B 的回路 + 小灯泡（灯亮表示 B 中有电流） -->
    <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
      <path d="M 345 134 H 500 V 179" />
      <path d="M 500 213 V 258 H 345" />
    </g>
    <circle cx="500" cy="196" :r="23" fill="var(--c-accent)" opacity="0.25" />
    <CircuitBulb :x="500" :y="196" :r="17" />

    <!-- 标注（引线指到线圈） -->
    <g stroke="var(--c-text-dim)" stroke-width="1.2" opacity="0.7">
      <path d="M 206 94 H 266" fill="none" />
      <path d="M 350 196 H 382" fill="none" />
    </g>
    <text x="196" y="99" text-anchor="end" font-size="15" fill="var(--c-text-dim)">线圈 A</text>
    <text x="420" y="201" text-anchor="middle" font-size="15" fill="var(--c-text-dim)">线圈 B</text>
    <text x="528" y="201" font-size="14" fill="var(--c-text-dim)">小灯泡</text>
  </svg>
</template>
