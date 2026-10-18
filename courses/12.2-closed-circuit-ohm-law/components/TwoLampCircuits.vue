<!-- 第 2 页引入图：甲只接一盏灯、乙并联三盏灯接同一个电池；乙中每盏灯都比甲暗（电源有内阻） -->
<template>
  <svg viewBox="0 0 700 300" width="100%" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M60 90 H250"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M60 220 H250"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M250 90 V220"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <CircuitBattery :x="60" :y="155" orientation="vertical" polarity />
    <path
      d="M60 90 V147"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M60 163 V220"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <circle cx="155" cy="90" r="34" fill="var(--c-accent)" opacity="0.3" />
    <circle cx="155" cy="90" r="21" fill="var(--c-accent)" opacity="0.4" />
    <path
      d="M60 90 H143"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M167 90 H250"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <CircuitBulb :x="155" :y="90" label="L" />
    <text x="155" y="252" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">甲</text>
    <path
      d="M380 80 H620"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M380 230 H620"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <CircuitBattery :x="380" :y="155" orientation="vertical" polarity />
    <path
      d="M380 80 V147"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M380 163 V230"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M470 80 V143"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M470 167 V230"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M545 80 V143"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M545 167 V230"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M620 80 V143"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M620 167 V230"
      stroke="var(--c-wire)"
      stroke-width="1.6"
      fill="none"
      stroke-linecap="round"
    />
    <circle cx="470" cy="80" r="3" fill="var(--c-text)" />
    <circle cx="545" cy="80" r="3" fill="var(--c-text)" />
    <circle cx="470" cy="230" r="3" fill="var(--c-text)" />
    <circle cx="545" cy="230" r="3" fill="var(--c-text)" />
    <circle cx="470" cy="155" r="26" fill="var(--c-accent)" opacity="0.14" />
    <circle cx="545" cy="155" r="26" fill="var(--c-accent)" opacity="0.14" />
    <circle cx="620" cy="155" r="26" fill="var(--c-accent)" opacity="0.14" />
    <CircuitBulb :x="470" :y="155" orientation="vertical" />
    <CircuitBulb :x="545" :y="155" orientation="vertical" />
    <CircuitBulb :x="620" :y="155" orientation="vertical" />
    <text x="500" y="266" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">乙</text>
  </svg>
</template>
