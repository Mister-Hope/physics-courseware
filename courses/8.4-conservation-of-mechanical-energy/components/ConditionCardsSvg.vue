<script setup lang="ts">
/**
 * 第 11 / 12 页（守恒条件的判断）：教材练习 1 的四个情境，一次只画两个。
 * `pair="ab"` 画 A 跳伞匀速下落、B 抛出的标枪；`pair="cd"` 画 C 沿光滑斜面匀速上升、D 压缩弹簧的小球。
 * 只画情境、不画受力分析——判断留给学生，做功分析由页面文字逐条给出。
 */
withDefaults(defineProps<{ pair?: "ab" | "cd" }>(), { pair: "ab" });
</script>

<template>
  <svg class="fig-cond-cards" viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="380" height="190" rx="16" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <rect x="420" y="20" width="380" height="190" rx="16" fill="none" stroke="var(--c-border)" stroke-width="1.6" />
    <template v-if="pair === 'ab'">
      <text x="52" y="52" font-size="16" fill="var(--c-text-dim)" font-family="system-ui">A 跳伞运动员匀速下落</text>
      <path d="M 120 118 Q 180 74 240 118" fill="var(--c-accent-2)" fill-opacity="0.16" stroke="var(--c-accent-2)" stroke-width="2.6" />
      <line x1="124" y1="116" x2="148" y2="158" stroke="var(--c-neutral-300)" stroke-width="1.8" />
      <line x1="236" y1="116" x2="212" y2="158" stroke="var(--c-neutral-300)" stroke-width="1.8" />
      <circle cx="180" cy="166" r="12" fill="var(--c-accent)" fill-opacity="0.3" stroke="var(--c-accent)" stroke-width="2.6" />
      <CourseArrow :from="{ x: 204, y: 166 }" :to="{ x: 204, y: 206 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
      <text x="214" y="196" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
      <text x="452" y="52" font-size="16" fill="var(--c-text-dim)" font-family="system-ui">B 抛出的标枪在空中运动</text>
      <path d="M 500 172 Q 600 96 700 132" fill="none" stroke="var(--c-neutral-500)" stroke-width="1.6" stroke-dasharray="7 6" opacity="0.7" />
      <line x1="512" y1="146" x2="640" y2="110" stroke="var(--c-neutral-300)" stroke-width="4.5" stroke-linecap="round" />
      <path d="M 640 110 l 22 -4 l -14 16 z" fill="var(--c-neutral-300)" />
      <CourseArrow :from="{ x: 528, y: 142 }" :to="{ x: 580, y: 128 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
      <text x="548" y="166" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    </template>
    <template v-else>
      <text x="52" y="52" font-size="16" fill="var(--c-text-dim)" font-family="system-ui">C 金属块沿光滑斜面匀速上升</text>
      <line x1="70" y1="182" x2="330" y2="104" stroke="var(--c-neutral-300)" stroke-width="3.4" stroke-linecap="round" />
      <SurfaceHatch :from="{ x: 70, y: 182 }" :to="{ x: 330, y: 104 }" side="below" :thickness="12" :gap="20" />
      <g transform="rotate(-23 200 132)">
        <rect x="178" y="120" width="44" height="24" rx="4" fill="var(--c-accent)" fill-opacity="0.25" stroke="var(--c-accent)" stroke-width="2.6" />
      </g>
      <line x1="200" y1="126" x2="292" y2="88" stroke="var(--c-neutral-500)" stroke-width="2" />
      <CourseArrow :from="{ x: 224, y: 118 }" :to="{ x: 274, y: 98 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
      <text x="236" y="142" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
      <text x="452" y="52" font-size="16" fill="var(--c-text-dim)" font-family="system-ui">D 压缩弹簧后又被弹回的小球</text>
      <line x1="452" y1="182" x2="768" y2="182" stroke="var(--c-neutral-300)" stroke-width="3" stroke-linecap="round" />
      <SurfaceHatch :from="{ x: 452, y: 182 }" :to="{ x: 768, y: 182 }" side="below" :thickness="12" :gap="20" />
      <rect x="748" y="112" width="16" height="70" rx="3" fill="var(--c-neutral-500)" fill-opacity="0.6" />
      <path
        d="M 748 147 l -9 -7 l -18 14 l -18 -14 l -18 14 l -18 -14 l -18 14 l -9 -7"
        fill="none"
        stroke="var(--c-ok)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="600" cy="147" r="13" fill="var(--c-accent)" fill-opacity="0.3" stroke="var(--c-accent)" stroke-width="2.6" />
      <CourseArrow :from="{ x: 496, y: 147 }" :to="{ x: 556, y: 147 }" stroke="var(--c-accent-2)" :stroke-width="2.4" />
      <text x="516" y="132" font-size="15" fill="var(--c-accent-2)" font-family="KaTeX_Math" font-style="italic">v</text>
    </template>
  </svg>
</template>

<style scoped>
.fig-cond-cards {
  display: block;
  width: 100%;
  height: auto;
}
</style>
