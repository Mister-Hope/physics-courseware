<template>
  <!-- 例2「两车与小鸟」题目图：A、B 两车相距 1000 m 相向而行（10 m/s 与 30 m/s），小鸟从 A 车处以 50 m/s 在两车之间往复飞行 -->
  <svg viewBox="0 0 560 230" style="display: block; width: 100%; max-width: 560px; margin: 0 auto">
    <SurfaceHatch
      :from="{ x: 30, y: 178 }"
      :to="{ x: 530, y: 178 }"
      side="below"
      :thickness="14"
      :gap="26"
      color="rgba(148,163,184,0.5)"
      :line-width="2.2"
      :hatch-width="1.2"
    />
    <rect x="40" y="138" width="64" height="26" rx="6" fill="color-mix(in srgb, var(--c-velocity) 28%, transparent)" stroke="var(--c-velocity)" stroke-width="2" />
    <circle cx="56" cy="171" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="88" cy="171" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <text x="72" y="157" text-anchor="middle" font-size="16" fill="var(--c-neutral-300)">A</text>
    <rect x="456" y="138" width="64" height="26" rx="6" fill="color-mix(in srgb, var(--c-accent) 22%, transparent)" stroke="var(--c-accent)" stroke-width="2" />
    <circle cx="472" cy="171" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <circle cx="504" cy="171" r="7" fill="var(--c-bg-soft)" stroke="var(--c-neutral-300)" stroke-width="2" />
    <text x="488" y="157" text-anchor="middle" font-size="16" fill="var(--c-neutral-300)">B</text>
    <CourseArrow :from="{ x: 106, y: 150 }" :to="{ x: 454, y: 150 }" stroke="color-mix(in srgb, var(--c-text-dim) 90%, transparent)" stroke-width="2.4" stroke-dasharray="8 5" />
    <text x="288" y="141" text-anchor="middle" font-size="15" fill="var(--c-text-dim)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">1000 m</text>
    <path
      d="M 104 86 L 133 52 L 162 86 L 191 52 L 220 86 L 249 52 L 278 86 L 307 52 L 336 86 L 365 52 L 394 86 L 423 52 L 452 86"
      fill="none"
      stroke="var(--c-physics)"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="104" cy="86" r="4.5" fill="var(--c-physics)" />
    <text x="98" y="80" text-anchor="end" font-size="15" fill="var(--c-neutral-300)">起点</text>
    <circle cx="278" cy="86" r="5" fill="var(--c-physics)" />
    <text x="278" y="108" text-anchor="middle" font-size="16" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">50</tspan>
      <tspan font-family="KaTeX_Main">m/s</tspan>
    </text>
    <CourseArrow :from="{ x: 46, y: 124 }" :to="{ x: 100, y: 124 }" stroke="var(--c-velocity)" stroke-width="3" />
    <text x="81" y="114" text-anchor="middle" font-size="15" fill="var(--c-velocity)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">10 m/s</text>
    <CourseArrow :from="{ x: 514, y: 124 }" :to="{ x: 460, y: 124 }" stroke="var(--c-accent)" stroke-width="3" />
    <text x="495" y="114" text-anchor="middle" font-size="15" fill="var(--c-accent)" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">30 m/s</text>
  </svg>
</template>
