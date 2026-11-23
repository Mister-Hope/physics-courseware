<template>
  <svg viewBox="0 0 320 200" width="320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="cover-wave-right">
        <rect x="190" y="0" width="130" height="200" />
      </clipPath>
    </defs>
    <g stroke="var(--c-accent-2)" stroke-width="1.8" opacity="0.5">
      <line x1="42" y1="44" x2="42" y2="156" />
      <line x1="72" y1="44" x2="72" y2="156" />
      <line x1="102" y1="44" x2="102" y2="156" />
      <line x1="132" y1="44" x2="132" y2="156" />
      <line x1="162" y1="44" x2="162" y2="156" />
    </g>
    <circle cx="30" cy="100" r="4" fill="var(--c-accent)" />
    <rect x="186" y="18" width="8" height="62" rx="2" fill="var(--c-neutral-500)" />
    <rect x="186" y="120" width="8" height="62" rx="2" fill="var(--c-neutral-500)" />
    <g clip-path="url(#cover-wave-right)" fill="none" stroke="var(--c-accent)" stroke-width="1.8" opacity="0.7">
      <path d="M 190 52 A 48 48 0 0 1 238 100" />
      <path d="M 190 52 A 48 48 0 0 0 190 148" />
      <path d="M 190 28 A 72 72 0 0 1 262 100" />
      <path d="M 190 28 A 72 72 0 0 0 190 172" />
      <path d="M 190 4 A 96 96 0 0 1 286 100" />
      <path d="M 190 4 A 96 96 0 0 0 190 196" />
    </g>
    <circle cx="190" cy="100" r="4" fill="var(--c-physics)" />
    <line x1="18" y1="180" x2="302" y2="180" stroke="var(--c-neutral-600)" stroke-width="1" opacity="0.6" />
  </svg>
</template>
