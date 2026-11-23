<script setup lang="ts">
// 第 6 页：斜槽末端小球碰撞装置（斜槽 + 铁架台 + 铅垂线 + 三个落点）
// step：1 = 铅垂线定 O 点，2 = 三个落地位置与水平距离
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <svg viewBox="0 0 900 430" class="is-svg" role="img" aria-label="斜槽末端小球碰撞装置">
    <SurfaceHatch :from="{ x: 60, y: 392 }" :to="{ x: 840, y: 392 }" side="below" />
    <path d="M 150 78 V 380" stroke="var(--c-text)" stroke-width="4" stroke-linecap="round" />
    <path d="M 100 378 H 210" stroke="var(--c-text)" stroke-width="2.6" stroke-linecap="round" />
    <rect
      x="118"
      y="376"
      width="74"
      height="10"
      rx="3"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text)"
      stroke-width="1.4"
    />
    <rect
      x="136"
      y="82"
      width="28"
      height="14"
      rx="3"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text)"
      stroke-width="1.4"
    />
    <path
      d="M 144 78 Q 250 104 356 178 Q 418 220 500 226 H 600"
      fill="none"
      stroke="var(--c-surface-solid)"
      stroke-width="18"
      stroke-linecap="round"
    />
    <path
      d="M 144 78 Q 250 104 356 178 Q 418 220 500 226 H 600"
      fill="none"
      stroke="var(--c-border)"
      stroke-width="1.3"
    />
    <line
      x1="606"
      y1="226"
      x2="676"
      y2="226"
      stroke="var(--c-accent-2)"
      stroke-width="1.2"
      stroke-dasharray="5 4"
    />
    <text x="684" y="231" font-size="14" fill="var(--c-accent-2)">末端水平</text>
    <circle
      cx="556"
      cy="214"
      r="10"
      fill="var(--c-surface-solid)"
      stroke="var(--c-accent-2)"
      stroke-width="1.8"
    />
    <circle
      cx="600"
      cy="214"
      r="8"
      fill="var(--c-surface-solid)"
      stroke="var(--c-accent)"
      stroke-width="1.8"
    />
    <CourseArrow
      :from="{ x: 496, y: 190 }"
      :to="{ x: 540, y: 190 }"
      stroke="var(--c-accent-2)"
      :stroke-width="1.6"
    />
    <text x="530" y="204" text-anchor="end" font-size="14" fill="var(--c-text-dim)">球 1</text>
    <text x="612" y="196" font-size="14" fill="var(--c-text-dim)">球 2</text>
    <text x="150" y="130" font-size="14" fill="var(--c-text-dim)">斜槽</text>
    <text x="168" y="352" font-size="14" fill="var(--c-text-dim)">铁架台</text>
    <g v-if="step >= 1">
      <path
        d="M 600 226 V 390"
        fill="none"
        stroke="var(--c-text-mute)"
        stroke-width="1.3"
        stroke-dasharray="5 4"
      />
      <path
        d="M 593 368 H 607 L 600 384 Z"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-mute)"
        stroke-width="1.2"
      />
      <text x="614" y="300" font-size="14" fill="var(--c-text-dim)">铅垂线</text>
      <circle cx="600" cy="390" r="3.4" fill="var(--c-accent)" />
      <text
        x="600"
        y="414"
        text-anchor="middle"
        font-size="14"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="var(--c-text)"
      >
        O
      </text>
    </g>
    <g v-if="step >= 2">
      <path
        d="M 600 222 Q 668 268 722 388"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="1.3"
        stroke-dasharray="5 4"
        opacity="0.9"
      />
      <path
        d="M 600 222 Q 638 290 690 388"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.3"
        stroke-dasharray="5 4"
        opacity="0.9"
      />
      <path
        d="M 600 222 Q 716 258 796 388"
        fill="none"
        stroke="var(--c-text-dim)"
        stroke-width="1.3"
        stroke-dasharray="5 4"
        opacity="0.9"
      />
      <g fill="var(--c-text)">
        <circle cx="722" cy="390" r="3.2" />
        <circle cx="690" cy="390" r="3.2" />
        <circle cx="796" cy="390" r="3.2" />
      </g>
      <text
        x="722"
        y="414"
        text-anchor="middle"
        font-size="13"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="var(--c-accent-2)"
      >
        M1
      </text>
      <text
        x="688"
        y="414"
        text-anchor="middle"
        font-size="13"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="var(--c-accent)"
      >
        M1′
      </text>
      <text
        x="798"
        y="414"
        text-anchor="middle"
        font-size="13"
        font-family="KaTeX_Math"
        font-style="italic"
        fill="var(--c-text-dim)"
      >
        M2
      </text>
    </g>
  </svg>
</template>

<style scoped>
.is-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
