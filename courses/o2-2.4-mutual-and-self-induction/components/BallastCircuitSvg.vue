<!--
  第 15 页「自感的利用」之一：日光灯镇流器。
  镇流器（套在铁芯上的线圈）与灯管串联接在交流电源上；启动（断开）瞬间，镇流器产生很高的
  自感电动势把灯管点亮——线圈上方的红色闪电 +「高压」表示这个瞬间。
  布局：左＝交流电源、上＝灯管、右＝镇流器线圈，构成串联回路。
  画面按 420×84 的 viewBox 画（与同页另外三张图一致，在小格子里 1:1 渲染，字号 16 就是 16px）。
-->
<template>
  <svg viewBox="0 0 420 84" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 镇流器铁芯（先画，线圈盖在上面） -->
    <rect x="331" y="33" width="10" height="44" rx="2" fill="var(--c-neutral-700)" opacity="0.55" />
    <!-- 镇流器线圈：竖放连续螺旋线 3 匝；接线端在左缘 (322,34) / (322,76) -->
    <Solenoid :x="336" :y="55" :length="42" :radius="16" :turns="3" orientation="vertical" direction="cw" :phase="180" :line-width="2.8" :back-opacity="0.3" />
    <!-- 导线：交流电源 → 灯管 → 镇流器 → 回到电源 -->
    <g fill="none" stroke="var(--c-text)" stroke-width="2" stroke-linecap="round">
      <path d="M 52 34 V 41" />
      <path d="M 52 69 V 76" />
      <path d="M 52 34 H 128" />
      <path d="M 246 34 H 320" />
      <path d="M 52 76 H 320" />
    </g>
    <!-- 交流电源：圆 + 正弦（沿用本课变压器那张图的画法） -->
    <circle cx="52" cy="55" r="14" fill="none" stroke="var(--c-text)" stroke-width="2" />
    <path d="M 42 55 q 5 -9 10 0 t 10 0" fill="none" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <!-- 灯管：长圆角管 + 两端电极；暖色填充表示已点亮 -->
    <rect x="128" y="25" width="118" height="18" rx="9" fill="var(--c-accent)" fill-opacity="0.2" stroke="var(--c-accent)" stroke-width="2.2" />
    <line x1="140" y1="29" x2="140" y2="39" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="234" y1="29" x2="234" y2="39" stroke="var(--c-text-dim)" stroke-width="2" />
    <!-- 启动瞬间的高压：红色闪电 + 文字 -->
    <path d="M 13 2 L 3 14 H 10 L 8 22 L 18 10 H 11 Z" transform="translate(323 4)" fill="var(--c-danger)" />
    <text x="348" y="20" font-size="16" fill="var(--c-danger)">高压</text>
  </svg>
</template>
