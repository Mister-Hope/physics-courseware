<template>
  <!-- 引课图（700×250，横向拉长压高度）：左＝起重机竖直提升（力与位移同向，位移只能旁侧标注，否则两者重合）；
       右＝马拉雪橇（马在前拉、绳与水平成约 34°，力的作用点在雪橇几何中心，位移画在雪橇身上，并标出夹角 α） -->
  <svg viewBox="0 0 700 250" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="起重机竖直提升重物与马拉雪橇两种情形">
    <line x1="350" y1="20" x2="350" y2="216" stroke="var(--c-text-dim)" stroke-width="1.4" stroke-dasharray="4 9" opacity="0.5" />
    <!-- ==================== 左：力与位移同向 ==================== -->
    <SurfaceHatch :from="{ x: 30, y: 200 }" :to="{ x: 320, y: 200 }" side="below" :thickness="12" :gap="20" />
    <line x1="110" y1="44" x2="210" y2="44" stroke="var(--c-text-dim)" stroke-width="3.4" />
    <line x1="160" y1="44" x2="160" y2="148" stroke="var(--c-text-dim)" stroke-width="2" />
    <rect x="125" y="148" width="70" height="52" rx="8" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.4" />
    <text x="138" y="196" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-text)">m</text>
    <CourseArrow :from="{ x: 160, y: 174 }" :to="{ x: 160, y: 104 }" stroke="var(--c-accent)" :stroke-width="3.4" label="F" :label-dx="13" :label-dy="-4" />
    <CourseArrow
      :from="{ x: 215, y: 190 }"
      :to="{ x: 215, y: 116 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.8"
      stroke-dasharray="8 6"
      label="x"
      :label-dx="12"
      :label-dy="-4"
    />
    <text x="175" y="232" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">力与位移同向</text>
    <!-- ==================== 右：力与位移成一定角度 ==================== -->
    <SurfaceHatch :from="{ x: 370, y: 200 }" :to="{ x: 680, y: 200 }" side="below" :thickness="12" :gap="20" />
    <!-- 马（线框） -->
    <g fill="none" stroke="var(--c-text-dim)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <rect x="560" y="95" width="100" height="50" rx="24" />
      <line x1="575" y1="145" x2="570" y2="200" />
      <line x1="600" y1="145" x2="596" y2="200" />
      <line x1="630" y1="145" x2="636" y2="200" />
      <line x1="652" y1="145" x2="660" y2="200" />
      <polyline points="648 107 668 85" />
      <path d="M 662 85 L 686 73 L 696 85 L 672 95 Z" />
      <line x1="668" y1="81" x2="665" y2="73" />
      <line x1="674" y1="77" x2="672" y2="69" />
      <line x1="562" y1="107" x2="546" y2="135" />
    </g>
    <!-- 雪橇（力的作用点＝几何中心） -->
    <rect x="410" y="181" width="70" height="16" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <path d="M 402 200 L 470 200 Q 481 200 481 188" fill="none" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <line x1="562" y1="109" x2="445" y2="189" stroke="var(--c-text-dim)" stroke-width="2.2" />
    <CourseArrow :from="{ x: 445, y: 189 }" :to="{ x: 509, y: 145 }" stroke="var(--c-accent)" :stroke-width="3.4" label="F" :label-dx="10" :label-dy="-12" />
    <CourseArrow
      :from="{ x: 445, y: 189 }"
      :to="{ x: 545, y: 189 }"
      stroke="var(--c-velocity)"
      :stroke-width="2.8"
      stroke-dasharray="8 6"
      label="x"
      :label-dx="10"
      :label-dy="-10"
    />
    <path d="M 487 189 A 42 42 0 0 0 479.6 165.3" fill="none" stroke="var(--c-text-dim)" stroke-width="1.6" />
    <text x="488" y="146" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text-dim)">α</text>
    <text x="525" y="232" text-anchor="middle" font-size="16" fill="var(--c-text-dim)">力与位移成一定角度</text>
  </svg>
</template>
