<template>
  <!-- 封面装饰：悬挂的单摆 + 摆动的圆弧 + 一条正弦波 -->
  <svg viewBox="0 0 380 230" width="330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="单摆装饰图">
    <path
      d="M60 34 H320 M70 34 L62 25 M90 34 L82 25 M110 34 L102 25 M130 34 L122 25 M150 34 L142 25 M170 34 L162 25 M190 34 L182 25 M210 34 L202 25 M230 34 L222 25 M250 34 L242 25 M270 34 L262 25 M290 34 L282 25 M310 34 L302 25"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-opacity=".45"
    />
    <line x1="60" y1="34" x2="320" y2="34" stroke="var(--c-text-dim)" stroke-width="3" stroke-linecap="round" stroke-opacity=".6" />
    <circle cx="190" cy="34" r="4" fill="var(--c-text-dim)" />
    <line x1="190" y1="34" x2="154" y2="141" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="5 6" stroke-opacity=".35" />
    <circle cx="154" cy="141" r="9" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-opacity=".35" />
    <line x1="190" y1="34" x2="226" y2="141" stroke="var(--c-accent)" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="226" cy="141" r="10" fill="var(--c-accent)" fill-opacity=".28" stroke="var(--c-accent)" stroke-width="2" />
    <path d="M154 141 Q190 172 226 141" fill="none" stroke="var(--c-accent)" stroke-width="1.6" stroke-dasharray="5 6" stroke-opacity=".5" />
    <path d="M226 196 q18 -16 36 0 t36 0 t36 0 t36 0" fill="none" stroke="var(--c-accent-2)" stroke-width="2.4" stroke-linecap="round" stroke-opacity=".7" />
    <circle cx="226" cy="196" r="3" fill="var(--c-accent-2)" fill-opacity=".7" />
    <circle cx="334" cy="196" r="3" fill="var(--c-accent-2)" fill-opacity=".7" />
  </svg>
</template>
