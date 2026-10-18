<template>
  <!-- 第 2 页引课图：铁块随温度升高依次呈现暗红、赤红、橘红、黄白色（教材 13.5-1 的颜色顺序），下方一支"温度升高"箭头 -->
  <svg
    viewBox="0 0 760 162"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="铁块颜色随温度升高由暗红变为赤红、橘红，最后变成黄白色"
  >
    <text x="6" y="25" font-size="19" fill="var(--c-text-dim)">温度升高</text>
    <CourseArrow
      :from="{ x: 110, y: 18 }"
      :to="{ x: 726, y: 18 }"
      stroke="var(--c-text-dim)"
      stroke-width="2"
      opacity="0.8"
    />
    <rect x="27" y="31" width="166" height="86" rx="18" fill="#96180b" opacity="0.18" />
    <rect x="36" y="40" width="148" height="68" rx="12" fill="#96180b" />
    <rect x="207" y="31" width="166" height="86" rx="18" fill="#d93a10" opacity="0.2" />
    <rect x="216" y="40" width="148" height="68" rx="12" fill="#d93a10" />
    <rect x="387" y="31" width="166" height="86" rx="18" fill="#f2821d" opacity="0.22" />
    <rect x="396" y="40" width="148" height="68" rx="12" fill="#f2821d" />
    <rect x="567" y="31" width="166" height="86" rx="18" fill="#ffe9b0" opacity="0.2" />
    <rect x="576" y="40" width="148" height="68" rx="12" fill="#ffe9b0" />
    <text x="110" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">暗红</text>
    <text x="290" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">赤红</text>
    <text x="470" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">橘红</text>
    <text x="650" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">黄白色</text>
  </svg>
</template>
