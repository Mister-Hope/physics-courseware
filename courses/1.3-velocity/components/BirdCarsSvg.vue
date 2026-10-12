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
    <rect x="40" y="138" width="64" height="26" rx="6" fill="rgba(96,165,250,0.28)" stroke="#60a5fa" stroke-width="2" />
    <circle cx="56" cy="171" r="7" fill="#0f1425" stroke="#cbd5e1" stroke-width="2" />
    <circle cx="88" cy="171" r="7" fill="#0f1425" stroke="#cbd5e1" stroke-width="2" />
    <text x="72" y="157" text-anchor="middle" font-size="16" fill="#cbd5e1">A</text>
    <rect x="456" y="138" width="64" height="26" rx="6" fill="rgba(226,168,70,0.22)" stroke="#e2a846" stroke-width="2" />
    <circle cx="472" cy="171" r="7" fill="#0f1425" stroke="#cbd5e1" stroke-width="2" />
    <circle cx="504" cy="171" r="7" fill="#0f1425" stroke="#cbd5e1" stroke-width="2" />
    <text x="488" y="157" text-anchor="middle" font-size="16" fill="#cbd5e1">B</text>
    <CourseArrow
      :from="{ x: 106, y: 150 }"
      :to="{ x: 454, y: 150 }"
      stroke="rgba(148,163,184,0.9)"
      stroke-width="2.4"
      stroke-dasharray="8 5"
    />
    <text x="288" y="141" text-anchor="middle" font-size="15" fill="#94a3b8" stroke="#0f1425" stroke-width="3" paint-order="stroke">1000 m</text>
    <path
      d="M 104 86 L 133 52 L 162 86 L 191 52 L 220 86 L 249 52 L 278 86 L 307 52 L 336 86 L 365 52 L 394 86 L 423 52 L 452 86"
      fill="none"
      stroke="#2dd4bf"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="104" cy="86" r="4.5" fill="#2dd4bf" />
    <text x="98" y="80" text-anchor="end" font-size="15" fill="#cbd5e1">起点</text>
    <circle cx="278" cy="86" r="5" fill="#2dd4bf" />
    <text x="278" y="108" text-anchor="middle" font-size="16" fill="#2dd4bf"><tspan font-family="KaTeX_Math" font-style="italic">50</tspan><tspan font-family="KaTeX_Main"> m/s</tspan></text>
    <CourseArrow :from="{ x: 46, y: 124 }" :to="{ x: 100, y: 124 }" stroke="#60a5fa" stroke-width="3" />
    <text x="81" y="114" text-anchor="middle" font-size="15" fill="#60a5fa" stroke="#0f1425" stroke-width="3" paint-order="stroke">10 m/s</text>
    <CourseArrow :from="{ x: 514, y: 124 }" :to="{ x: 460, y: 124 }" stroke="#e2a846" stroke-width="3" />
    <text x="495" y="114" text-anchor="middle" font-size="15" fill="#e2a846" stroke="#0f1425" stroke-width="3" paint-order="stroke">30 m/s</text>
  </svg>
</template>