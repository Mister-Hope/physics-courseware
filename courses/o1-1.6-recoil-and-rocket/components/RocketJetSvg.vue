<template>
  <svg viewBox="0 0 360 300" width="360" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.55" fill="var(--c-neutral-300)">
      <circle cx="34" cy="44" r="1.5" />
      <circle cx="76" cy="26" r="1" />
      <circle cx="302" cy="38" r="1.4" />
      <circle cx="326" cy="88" r="1" />
      <circle cx="46" cy="112" r="1.1" />
      <circle cx="286" cy="18" r="1" />
    </g>
    <path
      d="M 180 30 C 196 54 202 90 196 132 L 164 132 C 158 90 164 54 180 30 Z"
      fill="var(--c-neutral-200)"
      stroke="var(--c-neutral-500)"
      stroke-width="1.6"
    />
    <path d="M 180 30 C 188 42 192 56 194 68 L 166 68 C 168 56 172 42 180 30 Z" fill="var(--c-accent)" />
    <circle cx="180" cy="90" r="9" fill="var(--c-panel)" stroke="var(--c-accent-2)" stroke-width="2" />
    <path d="M 164 112 L 138 148 L 164 138 Z" fill="var(--c-accent)" opacity="0.9" />
    <path d="M 196 112 L 222 148 L 196 138 Z" fill="var(--c-accent)" opacity="0.9" />
    <path d="M 169 132 C 173 154 177 168 180 180 C 183 168 187 154 191 132 Z" fill="var(--c-danger)" opacity="0.9" />
    <path d="M 175 132 C 177 146 179 158 180 166 C 181 158 183 146 185 132 Z" fill="var(--c-accent)" />
    <g stroke="var(--c-physics)" stroke-width="2" opacity="0.55">
      <path d="M 158 214 L 148 236" />
      <path d="M 202 218 L 212 242" />
      <path d="M 180 226 L 180 252" />
    </g>
    <CourseArrow :from="{ x: 180, y: 214 }" :to="{ x: 180, y: 276 }" stroke="var(--c-physics)" stroke-width="2.4" label="燃气" :label-dx="14" :label-dy="4" />
    <CourseArrow :from="{ x: 252, y: 124 }" :to="{ x: 252, y: 52 }" stroke="var(--c-accent)" stroke-width="2.4" label="火箭" :label-dx="14" />
  </svg>
</template>
