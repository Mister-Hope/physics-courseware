<template>
  <!-- 第 10 页：连续与分立的对照——左边是宏观单摆（能量可以取区间里的任何值），右边是"振动着的带电微粒"（能量只能取 ε 的整数倍，教材口径）；分步出现：左图 → 右图。
     注意：右栏不能写成"原子、电子的能量取 ε 的整数倍"——原子能级并不等间距，会和第 12 页的能级图自相矛盾。 -->
  <svg
    viewBox="0 0 960 262"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="宏观世界的能量取值连续，振动着的带电微粒的能量只能取能量子的整数倍"
  >
    <g :style="{ visibility: step >= 1 ? 'visible' : 'hidden' }">
      <text x="76" y="26" font-size="19" fill="var(--c-text)">宏观世界</text>
      <CourseArrow :from="{ x: 76, y: 232 }" :to="{ x: 76, y: 46 }" stroke="var(--c-text-dim)" stroke-width="2" />
      <text x="58" y="40" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">E</text>
      <rect x="96" y="46" width="364" height="186" fill="color-mix(in srgb, var(--c-physics) 20%, transparent)" />
      <line x1="96" y1="140" x2="289" y2="140" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.7" />
      <circle cx="300" cy="140" r="11" fill="var(--c-accent)" />
      <text x="96" y="254" font-size="18" fill="var(--c-text-dim)">能量连续变化，任何值都能取到</text>
    </g>
    <g :style="{ visibility: step >= 2 ? 'visible' : 'hidden' }">
      <text x="516" y="26" font-size="19" fill="var(--c-text)">微观世界</text>
      <CourseArrow :from="{ x: 516, y: 232 }" :to="{ x: 516, y: 46 }" stroke="var(--c-text-dim)" stroke-width="2" />
      <text x="498" y="40" font-size="19" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text-dim)">E</text>
      <line x1="536" y1="84" x2="890" y2="84" stroke="var(--c-accent-2)" stroke-width="7" stroke-linecap="round" />
      <line x1="536" y1="126" x2="890" y2="126" stroke="var(--c-accent-2)" stroke-width="7" stroke-linecap="round" />
      <line x1="536" y1="168" x2="890" y2="168" stroke="var(--c-accent-2)" stroke-width="7" stroke-linecap="round" />
      <line x1="536" y1="210" x2="890" y2="210" stroke="var(--c-accent-2)" stroke-width="7" stroke-linecap="round" />
      <circle cx="700" cy="168" r="11" fill="var(--c-accent)" />
      <text x="906" y="90" font-size="19" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Main" font-style="normal">4</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">ε</tspan>
      </text>
      <text x="906" y="132" font-size="19" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Main" font-style="normal">3</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">ε</tspan>
      </text>
      <text x="906" y="174" font-size="19" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Main" font-style="normal">2</tspan>
        <tspan font-family="KaTeX_Math" font-style="italic">ε</tspan>
      </text>
      <text x="906" y="216" font-size="19" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Math" font-style="italic">ε</tspan>
      </text>
      <line x1="536" y1="189" x2="640" y2="189" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="5 5" opacity="0.75" />
      <text x="652" y="195" font-size="16" fill="var(--c-text-dim)">中间这些值取不到</text>
      <text x="536" y="254" font-size="18" fill="var(--c-text-dim)">带电微粒的能量只能取 ε、2ε、3ε…… 这些分立值</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
/** 第 10 页图：能量取值的"连续 vs 分立"对照（step 1 出宏观，step 2 出微观） */
const { step = 0 } = defineProps<{ step?: number }>();
</script>
