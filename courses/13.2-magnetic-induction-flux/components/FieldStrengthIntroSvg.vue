<template>
  <!--
    第 2 页：磁场有强弱——左边电磁铁吸起成堆钢板，右边小磁体只能吸起几枚铁钉（剪影式对比，不追求写实）。
    只画"装置与物体"，不画受力箭头、不写结论。
  -->
  <div class="fsi">
    <svg viewBox="0 0 460 206" width="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- 左：电磁铁（铁芯 + 线圈） -->
      <path
        d="M 62 34 H 178 V 96 H 154 V 62 H 86 V 96 H 62 Z"
        fill="var(--c-surface-solid)"
        stroke="var(--c-text-dim)"
        stroke-width="2.2"
        stroke-linejoin="round"
      />
      <rect x="70" y="26" width="100" height="22" rx="10" fill="var(--c-accent-soft)" stroke="var(--c-accent)" stroke-width="1.8" />
      <g stroke="var(--c-accent)" stroke-width="1.2" opacity="0.85">
        <line x1="84" y1="27" x2="84" y2="47" />
        <line x1="98" y1="27" x2="98" y2="47" />
        <line x1="112" y1="27" x2="112" y2="47" />
        <line x1="126" y1="27" x2="126" y2="47" />
        <line x1="140" y1="27" x2="140" y2="47" />
        <line x1="154" y1="27" x2="154" y2="47" />
      </g>
      <!-- 被吸起的钢板 -->
      <g fill="var(--c-text-dim)" opacity="0.5">
        <rect x="58" y="96" width="124" height="9" rx="2" />
        <rect x="64" y="108" width="112" height="9" rx="2" />
        <rect x="72" y="120" width="96" height="9" rx="2" />
      </g>
      <!-- 右：小磁体 -->
      <rect x="288" y="52" width="60" height="42" rx="5" fill="var(--c-danger)" />
      <rect x="348" y="52" width="60" height="42" rx="5" fill="var(--c-accent-2)" />
      <text x="318" y="80" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-text)">N</text>
      <text x="378" y="80" text-anchor="middle" font-family="KaTeX_Main" font-size="19" fill="var(--c-text)">S</text>
      <!-- 吸着的几枚铁钉 -->
      <g stroke="var(--c-text-dim)" stroke-width="2.6" stroke-linecap="round">
        <line x1="360" y1="94" x2="360" y2="128" />
        <line x1="372" y1="94" x2="372" y2="134" />
        <line x1="384" y1="94" x2="384" y2="126" />
      </g>
      <!-- 分隔 -->
      <line x1="232" y1="16" x2="232" y2="190" stroke="var(--c-border)" stroke-width="1.4" stroke-dasharray="6 6" />
    </svg>
    <ChartLabel :x-percent="26.1" :y-percent="88" :parts="[{ text: '电磁铁' }]" :size="16" />
    <ChartLabel :x-percent="76.1" :y-percent="88" :parts="[{ text: '小磁体' }]" :size="16" />
  </div>
</template>

<style scoped>
.fsi {
  position: relative;
  width: 100%;
  min-width: 0;
}

.fsi svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
