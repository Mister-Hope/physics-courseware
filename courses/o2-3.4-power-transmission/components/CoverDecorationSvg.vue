<!--
  封面装饰：高压输电铁塔把电能送往远处的城市（三根导线 = 三相）。
  铁塔用格构线，导线带一点弧垂；城市用亮窗表现"用电端"。
-->
<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- 城市灯光的地面辉光 -->
    <ellipse cx="282" cy="176" rx="62" ry="28" fill="var(--c-accent)" opacity="0.06" />
    <!-- 远处城市剪影 -->
    <g fill="var(--c-neutral-700)">
      <rect x="228" y="146" width="26" height="46" rx="1.5" />
      <rect x="258" y="126" width="30" height="66" rx="1.5" />
      <rect x="292" y="156" width="26" height="36" rx="1.5" />
    </g>
    <!-- 城市亮窗 -->
    <g fill="var(--c-accent)" opacity="0.72">
      <rect x="264" y="136" width="3" height="4" />
      <rect x="272" y="136" width="3" height="4" />
      <rect x="280" y="136" width="3" height="4" />
      <rect x="264" y="148" width="3" height="4" />
      <rect x="280" y="148" width="3" height="4" />
      <rect x="264" y="160" width="3" height="4" />
      <rect x="272" y="160" width="3" height="4" />
      <rect x="234" y="156" width="3" height="4" />
      <rect x="244" y="166" width="3" height="4" />
      <rect x="298" y="166" width="3" height="4" />
    </g>
    <!-- 铁塔：两条塔腿 + 交叉斜材 + 两层横担 -->
    <g fill="none" stroke="var(--c-neutral-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 82 192 L 92 96 L 100 96 L 110 192" />
      <path d="M 82 192 L 106.7 160 M 110 192 L 85.3 160 M 85.3 160 L 103.3 128 M 106.7 160 L 88.7 128" />
      <path d="M 85.3 160 H 106.7 M 88.7 128 H 103.3" />
      <path d="M 66 88 H 126 M 72 112 H 120" />
      <path d="M 96 92 V 58" />
      <path d="M 66 88 V 98 M 126 88 V 98 M 96 58 V 68" />
    </g>
    <g fill="var(--c-accent)">
      <circle cx="66" cy="98" r="2.4" />
      <circle cx="126" cy="98" r="2.4" />
      <circle cx="96" cy="68" r="2.4" />
    </g>
    <!-- 三相导线：中相从塔顶跨过，两侧边相挂在横担上 -->
    <g fill="none" stroke="var(--c-neutral-300)" stroke-width="1.5" stroke-linecap="round" opacity="0.72">
      <path d="M -8 60 C 30 64 64 68 96 68 C 180 72 250 68 318 64" />
      <path d="M -8 92 C 28 96 48 98 66 98" />
      <path d="M 126 98 C 186 102 252 98 318 94" />
    </g>
    <line x1="0" y1="192" x2="320" y2="192" stroke="var(--c-neutral-700)" stroke-width="1.2" opacity="0.8" />
  </svg>
</template>
