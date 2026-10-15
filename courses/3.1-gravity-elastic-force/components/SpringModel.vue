<template>
  <!-- 第 25 页「弹簧的模型」：四种挂法（一端固定墙上 / 两端反向拉 / 粗糙面上静止 / 粗糙面上匀速）。
       四幅图左端均画蓝色拉力 F，右端均画黄色向右拉力箭头——轻弹簧整根张力处处相等。
       四幅图各自包在 <g> 里平移，保证中间留出足够间距、互不重叠。 -->
  <svg
    class="fig"
    viewBox="0 0 816 150"
    style="max-width: 40rem"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <SurfaceHatch
        :from="{ x: 36, y: 16 }"
        :to="{ x: 36, y: 96 }"
        side="left"
        :thickness="12"
        :gap="28"
        color="#cbd5e1"
        :line-width="4"
      />
      <path
        d="M 36 56 L 46 56 L 54 44 L 64 68 L 74 44 L 84 68 L 94 44 L 104 68 L 112 56 L 118 56"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <CourseArrow
        :from="{ x: 36, y: 56 }"
        :to="{ x: 10, y: 56 }"
        stroke="var(--c-velocity)"
        stroke-width="3"
      />
      <text x="23" y="44" text-anchor="middle" font-size="17" fill="var(--c-velocity)">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      </text>
      <CourseArrow
        :from="{ x: 118, y: 56 }"
        :to="{ x: 152, y: 56 }"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
      <text x="86" y="132" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        一端固定在墙上
      </text>
    </g>
    <g transform="translate(36, 0)">
      <path
        d="M 196 56 L 206 56 L 214 44 L 224 68 L 234 44 L 244 68 L 254 44 L 264 68 L 272 56 L 278 56"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <CourseArrow
        :from="{ x: 196, y: 56 }"
        :to="{ x: 162, y: 56 }"
        stroke="var(--c-velocity)"
        stroke-width="3"
      />
      <text x="179" y="44" text-anchor="middle" font-size="17" fill="var(--c-velocity)">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      </text>
      <CourseArrow
        :from="{ x: 278, y: 56 }"
        :to="{ x: 312, y: 56 }"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
      <text x="237" y="132" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        两端反向拉
      </text>
    </g>
    <g transform="translate(82, 0)">
      <line x1="326" y1="104" x2="500" y2="104" stroke="var(--c-neutral-600)" stroke-width="2.4" />
      <SurfaceHatch
        :from="{ x: 332, y: 40 }"
        :to="{ x: 332, y: 104 }"
        side="left"
        :thickness="12"
        :gap="26"
        color="#cbd5e1"
        :line-width="4"
      />
      <path
        d="M 332 78 L 342 78 L 350 66 L 360 90 L 370 66 L 380 90 L 390 66 L 400 90 L 408 78 L 414 78"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <CourseArrow
        :from="{ x: 332, y: 78 }"
        :to="{ x: 306, y: 78 }"
        stroke="var(--c-velocity)"
        stroke-width="3"
      />
      <text x="319" y="66" text-anchor="middle" font-size="17" fill="var(--c-velocity)">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      </text>
      <rect
        x="414"
        y="56"
        width="44"
        height="48"
        rx="5"
        fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)"
        stroke="var(--c-neutral-300)"
        stroke-width="2.4"
      />
      <CourseArrow
        :from="{ x: 458, y: 78 }"
        :to="{ x: 492, y: 78 }"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
      <text x="404" y="132" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        粗糙面上静止
      </text>
    </g>
    <g transform="translate(128, 0)">
      <line x1="508" y1="104" x2="682" y2="104" stroke="var(--c-neutral-600)" stroke-width="2.4" />
      <SurfaceHatch
        :from="{ x: 514, y: 40 }"
        :to="{ x: 514, y: 104 }"
        side="left"
        :thickness="12"
        :gap="26"
        color="#cbd5e1"
        :line-width="4"
      />
      <path
        d="M 514 78 L 524 78 L 532 66 L 542 90 L 552 66 L 562 90 L 572 66 L 582 90 L 590 78 L 596 78"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <CourseArrow
        :from="{ x: 514, y: 78 }"
        :to="{ x: 488, y: 78 }"
        stroke="var(--c-velocity)"
        stroke-width="3"
      />
      <text x="501" y="66" text-anchor="middle" font-size="17" fill="var(--c-velocity)">
        <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      </text>
      <rect
        x="596"
        y="56"
        width="44"
        height="48"
        rx="5"
        fill="color-mix(in srgb, var(--c-text-dim) 20%, transparent)"
        stroke="var(--c-neutral-300)"
        stroke-width="2.4"
      />
      <CourseArrow
        :from="{ x: 640, y: 78 }"
        :to="{ x: 674, y: 78 }"
        stroke="var(--c-accent)"
        stroke-width="3"
      />
      <text x="588" y="132" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">
        粗糙面上匀速
      </text>
    </g>
  </svg>
</template>
