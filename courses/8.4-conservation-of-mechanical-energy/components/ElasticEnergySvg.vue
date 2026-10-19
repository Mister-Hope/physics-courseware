<template>
  <!-- 第 5 页（弹性势能与动能 · 机械能）：弹性形变恢复时弹力做正功，弹性势能转化为动能——
       左为竖直弹簧把小球弹起，右为跳板把小球弹起。定性示意，不标数值。 -->
  <svg class="fig-elastic-energy" viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="14" width="388" height="212" rx="16" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <rect x="418" y="14" width="388" height="212" rx="16" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <line x1="46" y1="196" x2="370" y2="196" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <SurfaceHatch :from="{ x: 46, y: 196 }" :to="{ x: 370, y: 196 }" side="below" :thickness="12" :gap="20" />
    <path
      d="M208 196 l8 -9 l18 18 l18 -18 l18 18 l18 -18 l18 18 l8 -9"
      fill="none"
      stroke="var(--c-ok)"
      stroke-width="3.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="208" cy="146" r="14" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <CourseArrow :from="{ x: 208, y: 146 }" :to="{ x: 208, y: 112 }" stroke="var(--c-ok)" :stroke-width="3" />
    <text x="220" y="126" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-size="10" dy="3" font-family="system-ui" font-style="normal">弹</tspan>
    </text>
    <CourseArrow :from="{ x: 240, y: 138 }" :to="{ x: 240, y: 78 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
    <text x="252" y="102" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <line x1="470" y1="196" x2="794" y2="196" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
    <SurfaceHatch :from="{ x: 470, y: 196 }" :to="{ x: 794, y: 196 }" side="below" :thickness="12" :gap="20" />
    <rect x="486" y="160" width="26" height="36" rx="4" fill="var(--c-neutral-500)" fill-opacity="0.55" />
    <path d="M512 166 C 570 166 618 178 664 190" fill="none" stroke="var(--c-neutral-300)" stroke-width="7" stroke-linecap="round" />
    <circle cx="662" cy="162" r="14" fill="var(--c-accent-2)" fill-opacity="0.22" stroke="var(--c-accent-2)" stroke-width="3" />
    <CourseArrow :from="{ x: 662, y: 162 }" :to="{ x: 662, y: 128 }" stroke="var(--c-ok)" :stroke-width="3" />
    <text x="674" y="142" font-size="15" fill="var(--c-ok)" font-family="KaTeX_Math" font-style="italic">
      F<tspan font-size="10" dy="3" font-family="system-ui" font-style="normal">弹</tspan>
    </text>
    <CourseArrow :from="{ x: 694, y: 154 }" :to="{ x: 694, y: 94 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
    <text x="706" y="118" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    <text x="208" y="44" font-size="15" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">弹簧恢复原状</text>
    <text x="612" y="44" font-size="15" fill="var(--c-text-dim)" font-family="system-ui" text-anchor="middle">跳板恢复原状</text>
  </svg>
</template>

<style scoped>
.fig-elastic-energy {
  display: block;
  width: 100%;
  height: auto;
}
</style>
