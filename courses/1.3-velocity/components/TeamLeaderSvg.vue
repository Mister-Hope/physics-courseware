<template>
  <!-- 例3「队长往返」题目图：长为 L 的队伍以 v1 匀速前进，队长从队尾以 v2 匀速跑到队首后立即返回队尾 -->
  <svg viewBox="0 0 560 230" style="display: block; width: 100%; max-width: 560px; margin: 0 auto">
    <SurfaceHatch
      :from="{ x: 30, y: 180 }"
      :to="{ x: 530, y: 180 }"
      side="below"
      :thickness="14"
      :gap="26"
      color="rgba(148,163,184,0.5)"
      :line-width="2.2"
      :hatch-width="1.2"
    />
    <rect x="70" y="94" width="260" height="18" rx="4" fill="rgba(148,163,184,0.35)" stroke="rgba(148,163,184,0.9)" stroke-width="1.6" />
    <text x="70" y="86" text-anchor="middle" font-size="16" fill="#cbd5e1">队尾</text>
    <text x="330" y="86" text-anchor="middle" font-size="16" fill="#cbd5e1">队首</text>
    <text x="78" y="52" font-size="15" fill="#94a3b8">去程</text>
    <text x="240" y="52" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#e2a846">v<tspan font-size="11" dy="3">2</tspan></text>
    <CourseArrow :from="{ x: 70, y: 64 }" :to="{ x: 330, y: 64 }" stroke="#e2a846" stroke-width="3" />
    <CourseArrow :from="{ x: 330, y: 130 }" :to="{ x: 120, y: 130 }" stroke="#60a5fa" stroke-width="3" stroke-dasharray="8 5" />
    <text x="114" y="130" text-anchor="end" font-size="15" fill="#94a3b8">返程</text>
    <CourseArrow :from="{ x: 40, y: 103 }" :to="{ x: 66, y: 103 }" stroke="#2dd4bf" stroke-width="3" />
    <text x="53" y="124" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#2dd4bf">v<tspan font-size="11" dy="3">1</tspan></text>
    <line x1="70" y1="152" x2="180" y2="152" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <line x1="220" y1="152" x2="330" y2="152" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <line x1="70" y1="147" x2="70" y2="157" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <line x1="330" y1="147" x2="330" y2="157" stroke="rgba(148,163,184,0.6)" stroke-width="1.2" />
    <text x="200" y="158" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="#94a3b8">L</text>
  </svg>
</template>
