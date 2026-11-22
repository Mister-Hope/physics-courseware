<!--
  封面装饰：闭合铁芯 + 左右原副线圈（5 匝 vs 3 匝），展示互感与变压。
  线圈用共享 Solenoid（连续螺旋线），铁芯内用闭合虚线环表示被铁芯约束的变化的磁场（磁通量）。
-->
<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 闭合铁芯：外框 + 厚度投影 -->
    <rect x="96" y="34" width="140" height="128" rx="8" fill="none" stroke="var(--c-neutral-700)" stroke-width="18" opacity="0.55" />
    <rect x="90" y="38" width="140" height="128" rx="8" fill="none" stroke="var(--c-neutral-500)" stroke-width="18" />
    <!-- 铁芯内闭合磁路虚线回路 -->
    <rect x="90" y="38" width="140" height="128" rx="6" fill="none" stroke="var(--c-accent)" stroke-width="1.8" stroke-dasharray="6 5" opacity="0.85" />
    <!-- 原线圈（左，5 匝） -->
    <Solenoid
      :x="90"
      :y="102"
      :length="74"
      :radius="16"
      :turns="5"
      direction="ccw"
      orientation="vertical"
      :phase="180"
      :line-width="2.8"
      :back-opacity="0.32"
      color="var(--c-accent-2)"
    />
    <!-- 副线圈（右，3 匝） -->
    <Solenoid
      :x="230"
      :y="102"
      :length="66"
      :radius="16"
      :turns="3"
      direction="cw"
      orientation="vertical"
      :phase="0"
      :line-width="2.8"
      :back-opacity="0.32"
      color="var(--c-physics)"
    />
    <!-- 左右引出端子 -->
    <g fill="none" stroke-width="2" stroke-linecap="round">
      <path d="M 74 65 H 36" stroke="var(--c-accent-2)" />
      <path d="M 74 139 H 36" stroke="var(--c-accent-2)" />
      <path d="M 246 69 H 284" stroke="var(--c-physics)" />
      <path d="M 246 135 H 284" stroke="var(--c-physics)" />
    </g>
    <circle cx="36" cy="65" r="3.5" fill="var(--c-accent-2)" />
    <circle cx="36" cy="139" r="3.5" fill="var(--c-accent-2)" />
    <circle cx="284" cy="69" r="3.5" fill="var(--c-physics)" />
    <circle cx="284" cy="135" r="3.5" fill="var(--c-physics)" />
  </svg>
</template>
