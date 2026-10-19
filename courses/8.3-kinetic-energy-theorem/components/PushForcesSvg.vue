<script setup lang="ts">
/**
 * 「车厢里打乒乓球（2）」示意图：讲"这么大的功是哪来的"。
 *
 * 三处受力（自由体式，只保留与"功"直接相关的力）：
 *
 * - 人对球施力 F（向右，作用在球上）；
 * - 球对人（拍）施反作用力 F′（向左，作用在人身上）；
 * - 车厢地板对人的脚施力 F_地（向右）——这个力的**作用点随车厢一起前进**， 地面参考系里它的位移就是"击球时间内车厢前进的路程"，所以做的功很大。
 *
 * 版面约束（第一版截图里 F_地 箭头、地面阴影、"随车厢前进"标签挤成一团）： F_地 贴着脚的高度（y=84）；"脚随车厢前进"虚线放在地面阴影带**下方**（y=128）； 文字标签放在**虚线中段下方**（y=146），避开 F_地 箭头尖（x≈430）与阴影带。
 */
</script>

<template>
  <svg
    viewBox="0 0 760 152"
    width="100%"
    style="max-width: 700px; margin-inline: auto"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="击球时人对球施力、球对人施反作用力、车厢地板对人的脚施力，脚随车厢前进"
  >
    <!-- 车厢地板 -->
    <SurfaceHatch :from="{ x: 30, y: 100 }" :to="{ x: 730, y: 100 }" side="below" :thickness="12" :gap="18" color="var(--c-text-dim)" :line-width="2" />

    <!-- 人：身体 + 脚 -->
    <rect x="300" y="18" width="64" height="70" rx="12" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2.2" />
    <text x="332" y="60" font-size="16" fill="var(--c-text)" text-anchor="middle">人</text>
    <rect x="322" y="88" width="22" height="12" rx="4" fill="var(--c-surface-solid)" stroke="var(--c-neutral-300)" stroke-width="2" />

    <!-- 球 -->
    <circle cx="486" cy="56" r="10" fill="var(--c-accent)" />

    <!-- 人对球的力 F -->
    <CourseArrow :from="{ x: 412, y: 56 }" :to="{ x: 472, y: 56 }" stroke="var(--c-force)" :stroke-width="3" />
    <text x="432" y="44" font-family="KaTeX_Math" font-style="italic" font-size="20" fill="var(--c-force)" text-anchor="middle">F</text>

    <!-- 球对人的反作用力 F′ -->
    <CourseArrow :from="{ x: 298, y: 56 }" :to="{ x: 238, y: 56 }" stroke="var(--c-force)" :stroke-width="3" />
    <text x="264" y="44" font-size="20" fill="var(--c-force)" text-anchor="middle">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-family="KaTeX_Main" font-style="normal" font-size="15">′</tspan>
    </text>

    <!-- 地板对脚的力 F_地（贴着脚的高度，作用点随车厢前进） -->
    <CourseArrow :from="{ x: 344, y: 84 }" :to="{ x: 430, y: 84 }" stroke="var(--c-physics)" :stroke-width="3" />
    <text x="440" y="80" font-size="19" fill="var(--c-physics)">
      <tspan font-family="KaTeX_Math" font-style="italic">F</tspan>
      <tspan font-size="14">地</tspan>
    </text>

    <!-- 脚随车厢前进：虚线在阴影带下方，标签在虚线中段下方 -->
    <line x1="332" y1="114" x2="332" y2="132" stroke="var(--c-text-dim)" stroke-width="1.2" stroke-dasharray="2 4" />
    <CourseArrow :from="{ x: 332, y: 128 }" :to="{ x: 456, y: 128 }" stroke="var(--c-text-dim)" :stroke-width="2.2" stroke-dasharray="7 5" />
    <text x="394" y="146" font-size="14" fill="var(--c-text-dim)" text-anchor="middle" stroke="var(--c-bg-soft)" stroke-width="3" paint-order="stroke">
      脚随车厢前进
    </text>
  </svg>
</template>
