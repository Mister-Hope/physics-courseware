<!--
  第 5 页：左手定则的「方向关系」示意（不画真实手掌）。
  —— 掌心所在的平面用半透明矩形表示；B 垂直穿入掌心（⊗）；
     四指沿 I 向上；拇指沿 F 向左。三个方向两两垂直，等价于左手定则的动作。
-->
<template>
  <svg
    viewBox="0 0 420 340"
    width="420"
    height="340"
    class="course-fig"
    role="img"
    aria-label="左手定则方向关系示意"
  >
    <rect
      x="60"
      y="70"
      width="300"
      height="240"
      rx="20"
      fill="color-mix(in srgb, var(--c-accent-2) 6%, transparent)"
      stroke="color-mix(in srgb, var(--c-accent-2) 34%, transparent)"
      stroke-width="1.6"
      stroke-dasharray="8 6"
    />
    <text x="86" y="102" font-size="15" fill="var(--c-text-mute)">掌心</text>
    <FieldMark
      :x="210"
      :y="190"
      dir="in"
      :r="22"
      :line-width="1.8"
      color="var(--c-accent)"
      label="B"
      :label-size="16"
    />
    <CourseArrow
      :from="{ x: 210, y: 190 }"
      :to="{ x: 210, y: 98 }"
      stroke="var(--c-accent-2)"
      :stroke-width="3.6"
      label="I"
      :label-dx="14"
      :label-dy="-6"
    />
    <CourseArrow
      :from="{ x: 210, y: 190 }"
      :to="{ x: 98, y: 190 }"
      stroke="var(--c-danger)"
      :stroke-width="3.6"
      label="F"
      :label-dx="0"
      :label-dy="-14"
    />
    <text x="228" y="122" font-size="15" fill="var(--c-accent-2)">四指</text>
    <text x="112" y="214" font-size="15" fill="var(--c-danger)">拇指</text>
  </svg>
</template>
