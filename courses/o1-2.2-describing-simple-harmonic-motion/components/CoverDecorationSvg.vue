<template>
  <svg viewBox="0 0 260 180" width="300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="16" y1="58" x2="244" y2="58" stroke="var(--c-text-dim)" stroke-width="1" stroke-dasharray="4 6" opacity="0.3" />
    <path
      d="M 20 58 C 34 26 48 26 62 58 C 76 90 90 90 104 58 C 118 26 132 26 146 58 C 160 90 174 90 188 58 C 202 26 216 26 230 58"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2.2"
      stroke-linecap="round"
      opacity="0.85"
    />
    <circle cx="62" cy="37" r="3.2" fill="var(--c-accent)" opacity="0.9" />
    <circle cx="104" cy="79" r="3.2" fill="var(--c-accent)" opacity="0.55" />
    <SurfaceHatch
      :from="{ x: 26, y: 150 }"
      :to="{ x: 228, y: 150 }"
      side="below"
      :thickness="9"
      :gap="22"
      color="var(--c-text-dim)"
      :line-width="1.8"
      :hatch-width="1"
    />
    <SurfaceHatch
      :from="{ x: 36, y: 106 }"
      :to="{ x: 36, y: 150 }"
      side="left"
      :thickness="8"
      :gap="12"
      color="var(--c-text-dim)"
      :line-width="1.8"
      :hatch-width="1"
    />
    <path
      d="M 36 128 L 42 121 L 48 135 L 54 121 L 60 135 L 66 121 L 72 135 L 78 121 L 84 128"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect x="84" y="114" width="38" height="36" rx="5" fill="var(--c-surface-solid)" stroke="var(--c-accent-2)" stroke-width="1.8" />
    <line x1="103" y1="114" x2="103" y2="150" stroke="var(--c-accent-2)" stroke-width="1" opacity="0.35" />
    <circle cx="132" cy="132" r="2.6" fill="var(--c-accent-2)" opacity="0.8" />
  </svg>
</template>
