<script setup lang="ts">
/** 引课页：摩擦过的琥珀吸引轻小物体（教材 9.1 开篇现象） */
</script>

<template>
  <svg viewBox="0 0 480 240" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 96 128 L 128 92 L 186 96 L 208 140 L 168 184 L 114 176 Z"
      fill="var(--c-accent)"
      fill-opacity="0.28"
      stroke="var(--c-accent)"
      stroke-width="2.6"
      stroke-linejoin="round"
    />
    <path d="M 128 92 L 152 130 L 208 140" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.55" />
    <path d="M 152 130 L 114 176" fill="none" stroke="var(--c-accent)" stroke-width="1.4" opacity="0.55" />
    <text x="152" y="216" text-anchor="middle" font-size="15" fill="var(--c-accent)">琥珀</text>
    <g fill="var(--c-text-dim)" fill-opacity="0.75" stroke="var(--c-text)" stroke-width="1.6">
      <path d="M 320 78 C 336 66 358 68 366 84 C 356 98 334 96 320 78 Z" transform="rotate(-24 343 82)" />
      <path d="M 300 138 C 316 126 338 128 346 144 C 336 158 314 156 300 138 Z" transform="rotate(-8 323 142)" />
      <path d="M 330 190 C 346 178 368 180 376 196 C 366 210 344 208 330 190 Z" transform="rotate(10 353 194)" />
    </g>
    <path d="M 232 108 C 258 100 282 96 300 92" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.7" />
    <path d="M 224 150 C 248 148 272 144 292 142" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.7" />
    <path d="M 234 178 C 262 182 292 186 316 190" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" stroke-dasharray="6 5" opacity="0.7" />
  </svg>
</template>
