<!--
  涡流的危害与减小（第 11 页）：同一交变磁通穿过整块铁芯与硅钢片叠片。
  左：涡流沿整块铁芯绕大回路，电阻小、电流大、发热多；
  右：片间绝缘，涡流被限制在每一薄片内，回路短、电阻大、电流小。
-->
<template>
  <svg
    class="fig-svg"
    viewBox="0 0 720 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="整块铁芯与硅钢片叠片的涡流对比"
  >
    <defs>
      <linearGradient id="lc-core" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(203 213 225 / 26%)" />
        <stop offset="100%" stop-color="rgb(148 163 184 / 14%)" />
      </linearGradient>
      <linearGradient id="lc-sheet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(203 213 225 / 30%)" />
        <stop offset="100%" stop-color="rgb(148 163 184 / 18%)" />
      </linearGradient>
    </defs>
    <text x="190" y="28" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
      整块铁芯
    </text>
    <text x="510" y="28" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
      硅钢片叠片（片间绝缘）
    </text>
    <rect
      x="96"
      y="44"
      width="190"
      height="204"
      rx="6"
      fill="url(#lc-core)"
      stroke="#94a3b8"
      stroke-width="2"
    />
    <rect
      x="118"
      y="64"
      width="146"
      height="164"
      rx="26"
      fill="none"
      stroke="#e2a846"
      stroke-width="4.5"
      stroke-dasharray="16 11"
      class="lc-flow"
    />
    <CourseArrow
      :from="{ x: 168, y: 66 }"
      :to="{ x: 214, y: 66 }"
      stroke="#e2a846"
      stroke-width="3"
    />
    <CourseArrow
      :from="{ x: 214, y: 226 }"
      :to="{ x: 168, y: 226 }"
      stroke="#e2a846"
      stroke-width="3"
    />
    <text x="191" y="282" text-anchor="middle" font-size="15" fill="#e2a846">
      涡流回路大，发热多
    </text>
    <g>
      <rect
        x="430"
        y="44"
        width="18"
        height="204"
        rx="2"
        fill="url(#lc-sheet)"
        stroke="#94a3b8"
        stroke-width="1.4"
      />
      <rect
        x="458"
        y="44"
        width="18"
        height="204"
        rx="2"
        fill="url(#lc-sheet)"
        stroke="#94a3b8"
        stroke-width="1.4"
      />
      <rect
        x="486"
        y="44"
        width="18"
        height="204"
        rx="2"
        fill="url(#lc-sheet)"
        stroke="#94a3b8"
        stroke-width="1.4"
      />
      <rect
        x="514"
        y="44"
        width="18"
        height="204"
        rx="2"
        fill="url(#lc-sheet)"
        stroke="#94a3b8"
        stroke-width="1.4"
      />
      <rect
        x="542"
        y="44"
        width="18"
        height="204"
        rx="2"
        fill="url(#lc-sheet)"
        stroke="#94a3b8"
        stroke-width="1.4"
      />
      <rect
        x="570"
        y="44"
        width="18"
        height="204"
        rx="2"
        fill="url(#lc-sheet)"
        stroke="#94a3b8"
        stroke-width="1.4"
      />
    </g>
    <g fill="none" stroke="#e2a846" stroke-width="2" stroke-dasharray="5 5">
      <ellipse cx="439" cy="146" rx="6" ry="62" class="lc-flow" />
      <ellipse cx="467" cy="146" rx="6" ry="62" class="lc-flow" />
      <ellipse cx="495" cy="146" rx="6" ry="62" class="lc-flow" />
      <ellipse cx="523" cy="146" rx="6" ry="62" class="lc-flow" />
      <ellipse cx="551" cy="146" rx="6" ry="62" class="lc-flow" />
      <ellipse cx="579" cy="146" rx="6" ry="62" class="lc-flow" />
    </g>
    <text x="510" y="282" text-anchor="middle" font-size="15" fill="#94a3b8">
      涡流被切断，发热少
    </text>
    <g fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-linecap="round">
      <path d="M 380 112 L 380 88" />
      <path d="M 380 180 L 380 204" />
    </g>
    <g fill="var(--c-accent-2)">
      <path d="M 380 82 l -6 12 l 12 0 z" />
      <path d="M 380 210 l -6 -12 l 12 0 z" />
    </g>
    <text
      x="380"
      y="152"
      text-anchor="middle"
      font-size="14"
      fill="var(--c-accent-2)"
      transform="rotate(-90 380 152)"
    >
      交变磁通
    </text>
  </svg>
</template>

<style scoped>
.lc-flow {
  animation: lc-dash 2.6s linear infinite;
}

@keyframes lc-dash {
  to {
    stroke-dashoffset: 42;
  }
}
</style>
