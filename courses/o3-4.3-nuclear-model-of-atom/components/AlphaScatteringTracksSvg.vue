<!-- 4.3 第 5 页 α 粒子散射的三种结果（mode="foil"）+ 第 7 页离核远近决定偏转大小（mode="nucleus"） -->
<template>
  <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="nu-track-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--c-velocity)" />
      </marker>
    </defs>
    <g v-if="mode === 'foil'">
      <rect x="178" y="30" width="7" height="260" rx="2.5" fill="var(--c-accent)" fill-opacity="0.8" stroke="var(--c-accent)" stroke-width="1" />
      <text x="192" y="282" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">金箔</text>
      <text x="232" y="282" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">F</text>
      <CourseArrow :from="{ x: 10, y: 190 }" :to="{ x: 172, y: 190 }" stroke="var(--c-velocity)" :stroke-width="2" :head-size="9" />
      <text x="48" y="172" font-size="16" fill="var(--c-text-dim)">
        <tspan font-family="KaTeX_Math" font-style="italic">α</tspan><tspan font-family="system-ui, sans-serif"> 粒子束</tspan>
      </text>
      <g class="nu-hide" :class="{ 'nu-show': step >= 1 }">
        <CourseArrow :from="{ x: 186, y: 190 }" :to="{ x: 548, y: 190 }" stroke="var(--c-velocity)" :stroke-width="2" :head-size="9" />
        <line x1="186" y1="190" x2="548" y2="166" stroke="var(--c-velocity)" stroke-width="1.2" opacity="0.55" />
        <line x1="186" y1="190" x2="548" y2="178" stroke="var(--c-velocity)" stroke-width="1.2" opacity="0.55" />
        <line x1="186" y1="190" x2="548" y2="202" stroke="var(--c-velocity)" stroke-width="1.2" opacity="0.55" />
        <line x1="186" y1="190" x2="548" y2="214" stroke="var(--c-velocity)" stroke-width="1.2" opacity="0.55" />
        <text x="356" y="248" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text)">绝大多数</text>
        <text x="356" y="270" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">几乎沿原方向前进</text>
      </g>
      <g class="nu-hide" :class="{ 'nu-show': step >= 2 }">
        <CourseArrow :from="{ x: 186, y: 190 }" :to="{ x: 394, y: 70 }" stroke="var(--c-velocity)" :stroke-width="1.8" :head-size="9" />
        <CourseArrow :from="{ x: 186, y: 190 }" :to="{ x: 284, y: 51 }" stroke="var(--c-velocity)" :stroke-width="1.8" :head-size="9" />
        <text x="310" y="36" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text)">少数</text>
        <text x="310" y="58" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">较大角度偏转</text>
      </g>
      <g class="nu-hide" :class="{ 'nu-show': step >= 3 }">
        <CourseArrow :from="{ x: 184, y: 192 }" :to="{ x: 79, y: 84 }" stroke="var(--c-danger)" :stroke-width="1.8" :head-size="9" />
        <CourseArrow :from="{ x: 184, y: 192 }" :to="{ x: 154, y: 74 }" stroke="var(--c-danger)" :stroke-width="1.8" :head-size="9" />
        <text x="14" y="34" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-danger)">极少数</text>
        <text x="14" y="56" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">
          <tspan>偏转角超过 </tspan><tspan font-family="KaTeX_Main">90°</tspan>
        </text>
      </g>
    </g>
    <g v-if="mode === 'nucleus'">
      <circle cx="300" cy="150" r="26" fill="var(--c-danger)" fill-opacity="0.12" />
      <circle cx="300" cy="150" r="10" fill="var(--c-danger)" />
      <text x="300" y="96" text-anchor="middle" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">原子核</text>
      <text x="318" y="146" font-size="18" font-family="KaTeX_Math" font-style="italic" fill="var(--c-text)">+Ze</text>
      <path d="M 10 52 C 190 54 360 60 542 66" fill="none" stroke="var(--c-velocity)" stroke-width="1.7" marker-end="url(#nu-track-head)" />
      <text x="386" y="38" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text)">离核远</text>
      <text x="386" y="60" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">几乎不偏</text>
      <g class="nu-hide" :class="{ 'nu-show': step >= 2 }">
        <path
          d="M 10 96 C 176 99 252 108 282 138 C 312 168 372 196 540 212"
          fill="none"
          stroke="var(--c-velocity)"
          stroke-width="1.7"
          marker-end="url(#nu-track-head)"
        />
        <path
          d="M 10 140 C 170 142 250 146 278 150 C 250 156 170 160 10 168"
          fill="none"
          stroke="var(--c-danger)"
          stroke-width="1.7"
          marker-end="url(#nu-track-head)"
        />
        <text x="360" y="246" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-text)">离核近</text>
        <text x="360" y="268" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">大角度偏转</text>
        <text x="40" y="202" font-size="17" font-family="system-ui, sans-serif" fill="var(--c-danger)">几乎正对核</text>
        <text x="40" y="224" font-size="16" font-family="system-ui, sans-serif" fill="var(--c-text-dim)">被撞了回来</text>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
const { mode = "foil", step = 0 } = defineProps<{ mode?: "foil" | "nucleus"; step?: number }>();
</script>

<style scoped>
.nu-hide {
  visibility: hidden;
}

.nu-show {
  visibility: visible;
}
</style>
