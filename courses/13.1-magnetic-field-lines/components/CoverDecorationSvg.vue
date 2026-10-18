<script setup lang="ts">
/** 封面装饰（13.1 磁场 磁感线）：条形磁体 + 从 N 极出发回到 S 极的磁感线 + 左下一枚指向的小磁针。 只作装饰，尺寸与位置由 course-cover 的插槽决定。 */
</script>

<template>
  <svg viewBox="0 0 260 190" width="250" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g fill="none" stroke="var(--c-field)" stroke-width="1.6" stroke-linecap="round" opacity="0.8">
      <path d="M 196 84 C 240 70 254 32 202 28 C 148 24 104 46 70 86" />
      <path d="M 196 116 C 240 130 254 168 202 172 C 148 176 104 154 70 114" />
      <path d="M 198 94 C 228 86 240 56 200 52 C 158 48 126 62 104 86" />
      <path d="M 198 106 C 228 114 240 144 200 148 C 158 152 126 138 104 114" />
      <path d="M 240 100 H 256" />
      <path d="M 4 100 H 54" />
    </g>
    <rect x="60" y="80" width="140" height="40" rx="9" fill="var(--c-velocity)" />
    <path d="M 130 80 H 191 Q 200 80 200 89 V 111 Q 200 120 191 120 H 130 Z" fill="var(--c-danger)" />
    <text x="95" y="107" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-text)">S</text>
    <text x="165" y="107" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-text)">N</text>
    <g>
      <path d="M 30 132 L 36 150 L 30 168 L 24 150 Z" fill="none" stroke="var(--c-border-glow)" stroke-width="1" />
      <path d="M 30 134 L 35 150 L 25 150 Z" fill="var(--c-danger)" />
      <path d="M 25 150 L 35 150 L 30 166 Z" fill="var(--c-velocity)" />
    </g>
  </svg>
</template>
