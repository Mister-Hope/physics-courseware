<template>
  <!-- 第 19 页：四种接触方式下弹力的方向——面接触、点接触、曲面接触都垂直于接触处的公切面；
       杆斜搭在箱子的棱上时，接触处是杆面与棱，公切面沿杆面，所以弹力垂直于杆（斜向左上）。 -->
  <svg class="fig" viewBox="0 0 660 305" style="max-width: 28rem" xmlns="http://www.w3.org/2000/svg">
    <!-- ── 左上：面接触（物块压在水平地面上）── -->
    <line x1="25" y1="100" x2="295" y2="100" stroke="#cbd5e1" stroke-width="3" />
    <rect x="110" y="58" width="100" height="42" rx="5" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <text x="160" y="138" text-anchor="middle" font-size="15" fill="#94a3b8">面接触</text>

    <!-- ── 右上：点接触（球压在斜面上）── -->
    <line x1="355" y1="110" x2="645" y2="66" stroke="#cbd5e1" stroke-width="3" />
    <circle cx="482.8" cy="72.4" r="18" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <text x="500" y="138" text-anchor="middle" font-size="15" fill="#94a3b8">点接触</text>

    <!-- ── 右下：曲面接触（球压在半球形腔的顶部，沿半径）── -->
    <path d="M 405 175 A 95 95 0 0 0 595 175" fill="none" stroke="#cbd5e1" stroke-width="3.4" />
    <circle cx="500" cy="248" r="22" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <text x="500" y="298" text-anchor="middle" font-size="15" fill="#94a3b8">曲面接触</text>

    <!-- ── 左下：杆斜搭在箱子的棱上（接触处是杆面，弹力垂直于杆）── -->
    <line x1="20" y1="265" x2="300" y2="265" stroke="#cbd5e1" stroke-width="3" />
    <rect x="95" y="215" width="135" height="50" rx="4" fill="rgba(148,163,184,0.2)" stroke="#cbd5e1" stroke-width="2.4" />
    <line x1="32" y1="265" x2="149.5" y2="171.7" stroke="#e2a846" stroke-width="4.2" stroke-linecap="round" />
    <text x="160" y="298" text-anchor="middle" font-size="15" fill="#94a3b8">杆搭在棱上</text>

    <g v-click="2">
      <!-- 面接触：垂直于地面 -->
      <CourseArrow :from="{ x: 160, y: 100 }" :to="{ x: 160, y: 42 }" stroke="#e2a846" stroke-width="3" />
      <path d="M 160 92 L 169 92 L 169 100" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="176" y="66" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>

      <!-- 点接触：垂直于斜面 -->
      <CourseArrow :from="{ x: 485.5, y: 90.2 }" :to="{ x: 478.8, y: 45.7 }" stroke="#e2a846" stroke-width="3" />
      <polyline points="493.4,89 492.2,81.1 484.3,82.3" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="456" y="54" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>

      <!-- 曲面接触：沿半径（垂直于此处的公切面） -->
      <line x1="500" y1="175" x2="500" y2="270" stroke="#60a5fa" stroke-width="1.2" stroke-dasharray="5 4" />
      <circle cx="500" cy="175" r="4" fill="#64748b" />
      <line x1="440" y1="270" x2="560" y2="270" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 5" />
      <CourseArrow :from="{ x: 500, y: 270 }" :to="{ x: 500, y: 232 }" stroke="#e2a846" stroke-width="3" />
      <path d="M 510 270 L 510 261 L 501 261" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="556" y="264" font-size="14" fill="#94a3b8" text-anchor="end">切线</text>
      <text x="516" y="246" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>

      <!-- 杆搭在棱上：角沿垂直于杆的方向顶住杆 -->
      <circle cx="95" cy="215" r="3.5" fill="#f87171" />
      <CourseArrow :from="{ x: 95, y: 215 }" :to="{ x: 57.7, y: 168 }" stroke="#e2a846" stroke-width="3" />
      <polyline points="102.1,209.4 96.5,202.3 89.4,207.9" fill="none" stroke="#f87171" stroke-width="1.8" />
      <text x="40" y="184" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="#e2a846">F</text>
    </g>
  </svg>
</template>
