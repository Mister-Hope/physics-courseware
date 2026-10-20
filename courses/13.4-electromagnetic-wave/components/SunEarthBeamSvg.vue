<!-- 第 6 页：太阳发出的电磁波穿过真空到达地球——电磁波的传播不需要介质 -->
<script setup lang="ts">
const wavePath = (y: number): string => {
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = 170 + (530 * i) / 100;
    const yy = y + 9 * Math.sin((2 * Math.PI * (x - 170)) / 46);
    pts.push(`${x.toFixed(1)} ${yy.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
};
const waves = [wavePath(106), wavePath(141), wavePath(176)];
</script>

<template>
  <svg viewBox="0 0 880 285" width="100%" xmlns="http://www.w3.org/2000/svg">
    <text x="440" y="28" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">太空（真空）</text>
    <CelestialSun :x="110" :y="146" :r="54" label="太阳" />
    <CelestialEarth :x="770" :y="146" :r="60" label="地球" />
    <g fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" opacity="0.85">
      <path :d="waves[0]" />
      <path :d="waves[1]" />
      <path :d="waves[2]" />
    </g>
    <text x="440" y="72" text-anchor="middle" font-size="17" fill="var(--c-accent)">电磁波（光）穿过真空</text>
    <CourseArrow :from="{ x: 520, y: 252 }" :to="{ x: 680, y: 252 }" stroke="var(--c-accent)" stroke-width="2.6" />
    <text x="508" y="257" text-anchor="end" font-size="15" fill="var(--c-text-dim)">传播方向</text>
  </svg>
</template>
