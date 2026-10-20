<template>
  <!-- 第 2 页引课图：铁块投进火炉后的五个阶段——先只发热不发光，温度继续升高才依次呈现暗红、赤红、橘红、黄白色（教材 13.5-1 的颜色顺序），
       上方一支"温度升高"箭头给出自变量。颜色是物理示意色（发光色），不标色温数值。 -->
  <svg
    viewBox="0 0 940 162"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="铁块随温度升高，由发热不发光，依次变为暗红、赤红、橘红，最后变成黄白色"
  >
    <text x="6" y="25" font-size="19" fill="var(--c-text-dim)">温度升高</text>
    <CourseArrow
      :from="{ x: 110, y: 18 }"
      :to="{ x: 906, y: 18 }"
      stroke="var(--c-text-dim)"
      stroke-width="2"
      opacity="0.8"
    />
    <rect x="27" y="31" width="166" height="86" rx="18" fill="#ff8a3d" opacity="0.1" />
    <rect x="36" y="40" width="148" height="68" rx="12" fill="#2b2b33" />
    <rect x="207" y="31" width="166" height="86" rx="18" fill="#96180b" opacity="0.18" />
    <rect x="216" y="40" width="148" height="68" rx="12" fill="#96180b" />
    <rect x="387" y="31" width="166" height="86" rx="18" fill="#d93a10" opacity="0.2" />
    <rect x="396" y="40" width="148" height="68" rx="12" fill="#d93a10" />
    <rect x="567" y="31" width="166" height="86" rx="18" fill="#f2821d" opacity="0.22" />
    <rect x="576" y="40" width="148" height="68" rx="12" fill="#f2821d" />
    <rect x="747" y="31" width="166" height="86" rx="18" fill="#ffe9b0" opacity="0.2" />
    <rect x="756" y="40" width="148" height="68" rx="12" fill="#ffe9b0" />
    <text x="110" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">
      发热、不发光
    </text>
    <text x="290" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">暗红</text>
    <text x="470" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">赤红</text>
    <text x="650" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">橘红</text>
    <text x="830" y="138" font-size="19" text-anchor="middle" fill="var(--c-text)">黄白色</text>
  </svg>
</template>
