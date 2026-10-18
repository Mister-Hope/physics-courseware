<script setup lang="ts">
// 匀强电场：等距平行箭头
const uniLines = [86, 111, 136, 161];
// 等量异种：四条外弯场线 + 一条直线
const dipOuter = [
  "M 66 108 C 96 58 144 58 174 108",
  "M 66 132 C 96 182 144 182 174 132",
  "M 60 96 C 40 60 40 60 52 40",
  "M 180 144 C 200 180 200 180 188 200",
];
const dipMids = [
  { x1: 96, y1: 73.75, x2: 120, y2: 73.75 },
  { x1: 96, y1: 166.25, x2: 120, y2: 166.25 },
];
</script>

<template>
  <!-- 第 11 页：四种典型电场线——正电荷 / 负电荷 / 等量异种电荷 / 匀强电场 -->
  <svg viewBox="0 0 560 440" class="w-full h-full">
    <defs>
      <marker
        id="flg-a"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
      </marker>
      <marker
        id="flg-b"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
      </marker>
      <marker
        id="flg-c"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
      </marker>
      <marker
        id="flg-d"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c-field)" />
      </marker>
    </defs>
    <line x1="280" y1="12" x2="280" y2="428" stroke="var(--c-line)" stroke-dasharray="4 6" />
    <line x1="12" y1="220" x2="548" y2="220" stroke="var(--c-line)" stroke-dasharray="4 6" />
    <circle
      cx="140"
      cy="115"
      r="30"
      fill="var(--c-danger)"
      fill-opacity="0.08"
      stroke="var(--c-danger)"
      stroke-opacity="0.3"
      stroke-dasharray="3 6"
    />
    <path
      d="M 140 85 L 140 46"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 140 145 L 140 184"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 110 115 L 71 115"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 170 115 L 209 115"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 119 94 L 91 66"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 161 94 L 189 66"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 119 136 L 91 164"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <path
      d="M 161 136 L 189 164"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-a)"
    />
    <circle cx="140" cy="115" r="13" fill="var(--c-danger)" fill-opacity="0.9" />
    <text
      x="140"
      y="115"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="14"
      fill="#fff"
    >
      +
    </text>
    <circle
      cx="420"
      cy="115"
      r="30"
      fill="var(--c-velocity)"
      fill-opacity="0.08"
      stroke="var(--c-velocity)"
      stroke-opacity="0.3"
      stroke-dasharray="3 6"
    />
    <path
      d="M 420 85 L 420 46"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 420 145 L 420 184"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 390 115 L 351 115"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 450 115 L 489 115"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 399 94 L 371 66"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 441 94 L 469 66"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 399 136 L 371 164"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <path
      d="M 441 136 L 469 164"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-b)"
    />
    <circle cx="420" cy="115" r="13" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text
      x="420"
      y="115"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="14"
      fill="#fff"
    >
      −
    </text>
    <path
      v-for="(d, i) in dipOuter"
      :key="`do${i}`"
      :d="d"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      :marker-end="i < 2 ? `url(#flg-c)` : undefined"
    />
    <path
      d="M 100 120 L 140 120"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      fill="none"
      marker-end="url(#flg-c)"
    />
    <line
      v-for="(m, i) in dipMids"
      :key="`dm${i}`"
      :x1="m.x1"
      :y1="m.y1"
      :x2="m.x2"
      :y2="m.y2"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      marker-end="url(#flg-c)"
    />
    <circle cx="88" cy="120" r="12" fill="var(--c-danger)" fill-opacity="0.9" />
    <text
      x="88"
      y="120"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="13"
      fill="#fff"
    >
      +
    </text>
    <circle cx="152" cy="120" r="12" fill="var(--c-velocity)" fill-opacity="0.9" />
    <text
      x="152"
      y="120"
      text-anchor="middle"
      dominant-baseline="central"
      font-family="KaTeX_Main"
      font-size="13"
      fill="#fff"
    >
      −
    </text>
    <line
      v-for="y in uniLines"
      :key="`u${y}`"
      x1="354"
      :y1="y"
      x2="486"
      :y2="y"
      stroke="var(--c-field)"
      stroke-opacity="0.7"
      stroke-width="2"
      marker-end="url(#flg-d)"
    />
    <text
      x="140"
      y="212"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="14"
      fill="var(--c-text-mute)"
    >
      +Q
    </text>
    <text
      x="420"
      y="212"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="14"
      fill="var(--c-text-mute)"
    >
      −Q
    </text>
    <text
      x="120"
      y="322"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="14"
      fill="var(--c-text-mute)"
    >
      +Q
    </text>
    <text
      x="158"
      y="322"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="14"
      fill="var(--c-text-mute)"
    >
      −Q
    </text>
    <text
      x="420"
      y="322"
      text-anchor="middle"
      font-family="KaTeX_Math"
      font-style="italic"
      font-size="14"
      fill="var(--c-text-mute)"
    >
      E
    </text>
  </svg>
</template>
