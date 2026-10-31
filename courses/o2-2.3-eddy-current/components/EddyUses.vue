<!--
  涡流的利用（第 9 页）：左为真空冶炼炉，右为探雷器。
  两处都是"让涡流在需要的地方发热 / 让涡流的磁场反过来影响线圈中的电流"。
-->
<template>
  <svg
    class="fig-svg"
    viewBox="0 0 760 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="真空冶炼炉与探雷器"
  >
    <defs>
      <linearGradient id="eu-melt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fb923c" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#dc2626" stop-opacity="0.85" />
      </linearGradient>
      <linearGradient id="eu-pot" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgb(148 163 184 / 26%)" />
        <stop offset="50%" stop-color="rgb(203 213 225 / 16%)" />
        <stop offset="100%" stop-color="rgb(148 163 184 / 26%)" />
      </linearGradient>
    </defs>
    <text x="140" y="34" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">
      真空冶炼炉
    </text>
    <rect
      x="66"
      y="52"
      width="148"
      height="180"
      rx="8"
      fill="url(#eu-pot)"
      stroke="var(--c-text-dim)"
      stroke-width="2"
    />
    <rect x="74" y="146" width="132" height="78" fill="url(#eu-melt)" />
    <path d="M 74 146 q 33 -7 66 0 q 33 7 66 0" fill="none" stroke="#fdba74" stroke-width="2" />
    <!-- 炉外的线圈：连续螺旋线绕在炉体上（共享 Solenoid，竖向；半径 = 炉体半宽） -->
    <Solenoid
      :x="140"
      :y="142"
      :length="112"
      :radius="74"
      :turns="4"
      orientation="vertical"
      :line-width="2.6"
      :back-opacity="0.28"
    />
    <g fill="none" stroke="#fde68a" stroke-width="2.2" stroke-dasharray="7 6" class="eu-flow">
      <ellipse cx="140" cy="186" rx="42" ry="13" />
      <ellipse cx="140" cy="186" rx="20" ry="6" />
    </g>
    <text x="140" y="262" text-anchor="middle" font-size="14" fill="var(--c-text-dim)">
      线圈通入变化电流
    </text>
    <text x="140" y="284" text-anchor="middle" font-size="14" fill="#fb923c">
      金属中产生涡流，熔化
    </text>
    <text x="574" y="34" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">探雷器</text>
    <line x1="400" y1="228" x2="740" y2="228" stroke="var(--c-neutral-500)" stroke-width="2" />
    <line x1="470" y1="64" x2="560" y2="150" stroke="var(--c-text-dim)" stroke-width="2" />
    <circle cx="470" cy="60" r="8" fill="var(--c-neutral-500)" />
    <ellipse
      cx="574"
      cy="158"
      rx="34"
      ry="12"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="3"
    />
    <rect
      x="540"
      y="244"
      width="64"
      height="20"
      rx="3"
      fill="rgb(148 163 184 / 45%)"
      stroke="var(--c-text-dim)"
      stroke-width="1.4"
    />
    <g fill="none" stroke="#fde68a" stroke-width="2" stroke-dasharray="5 5" class="eu-flow">
      <ellipse cx="572" cy="254" rx="24" ry="5" />
    </g>
    <g fill="none" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.75">
      <path d="M 548 220 q 12 -14 24 0" />
      <path d="M 538 204 q 22 -26 44 0" />
      <path d="M 528 188 q 32 -38 64 0" />
    </g>
    <text x="572" y="292" text-anchor="middle" font-size="14" fill="#fb923c">金属中产生涡流</text>
  </svg>
</template>

<style scoped>
.eu-flow {
  animation: eu-dash 2.6s linear infinite;
}

@keyframes eu-dash {
  to {
    stroke-dashoffset: 39;
  }
}
</style>
