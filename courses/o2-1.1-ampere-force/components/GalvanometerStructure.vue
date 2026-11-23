<!-- 第 12 页：磁电式电流表结构示意（沿转轴正视，磁体、极靴、软铁芯、线圈、游丝、指针） -->
<script setup>
defineProps({ step: { type: Number, default: 0 } });
</script>

<template>
  <svg viewBox="0 0 480 340" class="course-fig" role="img" aria-label="磁电式电流表结构示意">
    <!-- 蹄形磁铁的两极 -->
    <rect
      x="42"
      y="78"
      width="44"
      height="184"
      rx="8"
      fill="var(--c-danger)"
      opacity="0.16"
      stroke="var(--c-danger)"
      stroke-width="1.8"
    />
    <text
      x="64"
      y="170"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="var(--c-danger)"
      font-size="20"
      font-weight="700"
    >
      N
    </text>
    <rect
      x="394"
      y="78"
      width="44"
      height="184"
      rx="8"
      fill="var(--c-accent-2)"
      opacity="0.16"
      stroke="var(--c-accent-2)"
      stroke-width="1.8"
    />
    <text
      x="416"
      y="170"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="var(--c-accent-2)"
      font-size="20"
      font-weight="700"
    >
      S
    </text>
    <!-- 极靴：把磁场聚成辐向 -->
    <path
      d="M92 112 Q150 128 150 170 Q150 212 92 228"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="9"
      stroke-linecap="round"
      opacity="0.55"
    />
    <path
      d="M388 112 Q330 128 330 170 Q330 212 388 228"
      fill="none"
      stroke="var(--c-text-dim)"
      stroke-width="9"
      stroke-linecap="round"
      opacity="0.55"
    />
    <!-- 软铁芯 -->
    <circle
      cx="240"
      cy="170"
      r="58"
      fill="var(--c-surface-solid)"
      stroke="var(--c-text-dim)"
      stroke-width="2"
    />
    <!-- 线圈两侧 -->
    <rect
      x="176"
      y="132"
      width="18"
      height="76"
      rx="4"
      fill="var(--c-accent-2)"
      opacity="0.28"
      stroke="var(--c-accent-2)"
      stroke-width="1.6"
    />
    <rect
      x="286"
      y="132"
      width="18"
      height="76"
      rx="4"
      fill="var(--c-accent-2)"
      opacity="0.28"
      stroke="var(--c-accent-2)"
      stroke-width="1.6"
    />
    <FieldMark :x="185" :y="170" dir="in" :r="11" label="" />
    <FieldMark :x="295" :y="170" dir="out" :r="11" label="" />
    <!-- 游丝与指针 -->
    <path
      d="M240 132 C228 122 228 112 240 108 C252 104 252 92 240 88"
      fill="none"
      stroke="var(--c-accent)"
      stroke-width="2"
    />
    <CourseArrow
      :from="{ x: 240, y: 132 }"
      :to="{ x: 300, y: 64 }"
      stroke="var(--c-danger)"
      :stroke-width="2.4"
    />
    <!-- 表盘 -->
    <path d="M172 58 Q240 30 308 58" fill="none" stroke="var(--c-text-dim)" stroke-width="2" />
    <line x1="240" y1="48" x2="240" y2="58" stroke="var(--c-text-dim)" stroke-width="2" />
    <!-- 标注（点击后出现） -->
    <g v-show="step >= 1">
      <text x="64" y="300" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">磁体</text>
      <text x="150" y="270" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">极靴</text>
      <text x="240" y="266" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">
        软铁芯
      </text>
      <text x="185" y="300" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">线圈</text>
      <text x="330" y="118" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">游丝</text>
      <text x="330" y="62" text-anchor="middle" fill="var(--c-text-dim)" font-size="14">指针</text>
    </g>
  </svg>
</template>
