<template>
  <!-- P17 电感式微小位移传感器：待测物体带动软铁芯在线圈中平移，线圈的自感系数随铁芯插入深度改变 -->
  <svg viewBox="0 0 440 260" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="电感式微小位移传感器示意图">
    <rect x="40" y="112" width="64" height="44" rx="3" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="1.8" />
    <rect x="100" y="126" width="220" height="12" rx="2" fill="var(--c-neutral-300)" fill-opacity="0.8" />
    <Solenoid :x="210" :y="132" :length="120" :radius="28" :turns="4.5" direction="cw" orientation="horizontal" color="var(--c-accent)" />
    <g stroke="var(--c-text-dim)" stroke-width="2" stroke-linecap="round">
      <line x1="160" y1="160" x2="160" y2="200" />
      <line x1="260" y1="160" x2="260" y2="200" />
    </g>
    <g fill="var(--c-text-dim)">
      <circle cx="160" cy="204" r="3" />
      <circle cx="260" cy="204" r="3" />
    </g>
    <CourseArrow :from="{ x: 72, y: 90 }" :to="{ x: 34, y: 90 }" stroke="var(--c-accent-2)" :stroke-width="2" :head-size="8" />
    <CourseArrow :from="{ x: 76, y: 90 }" :to="{ x: 112, y: 90 }" stroke="var(--c-accent-2)" :stroke-width="2" :head-size="8" />
    <text x="74" y="78" font-size="11" fill="var(--c-accent-2)" text-anchor="middle">位移</text>
    <g>
      <circle cx="58" cy="98" r="8" fill="var(--c-accent-soft)" />
      <text x="58" y="101.5" font-size="10" fill="var(--c-accent)" text-anchor="middle">1</text>
      <line x1="58" y1="106" x2="58" y2="110" stroke="var(--c-accent)" stroke-width="1" />
      <circle cx="200" cy="96" r="8" fill="var(--c-accent-soft)" />
      <text x="200" y="99.5" font-size="10" fill="var(--c-accent)" text-anchor="middle">2</text>
      <line x1="200" y1="104" x2="200" y2="110" stroke="var(--c-accent)" stroke-width="1" />
      <circle cx="320" cy="112" r="8" fill="var(--c-accent-soft)" />
      <text x="320" y="115.5" font-size="10" fill="var(--c-accent)" text-anchor="middle">3</text>
      <line x1="312" y1="116" x2="304" y2="124" stroke="var(--c-accent)" stroke-width="1" />
    </g>
    <text x="220" y="244" font-size="10" fill="var(--c-text-dim)" text-anchor="middle">1 待测物体　2 软铁芯　3 空心线圈</text>
  </svg>
</template>
