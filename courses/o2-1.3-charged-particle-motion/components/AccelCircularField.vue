<!--
  选必二 1.2 末页 · 例题配图：加速电场 + 圆形磁场（粒子最终竖直向下射出）
  题干由 slides.md 给出，本组件只画图。
  ── 分步（题目页规矩：干净题干 + 干净题目图 → 点击后才出分析标注）──
     showAnalysis=false：平行板加速电场（+ / −、U、d、E 箭头）、粒子从静止加速的直线路径、
       圆形磁场区域（裸 · 阵列 = 垂直纸面向外）、圆心 O、中心水平线、入射点 A 与速度 v、
       出射点 B 与竖直向下的速度 v；
     showAnalysis=true（第 2 次点击）：轨迹圆弧 A→B、轨迹圆心 O′、两条虚线半径 r、
       O′ 处的 90° 直角、O→A 虚线（= R）与 A 到中心线的垂足直角。
  ── 几何（viewBox 用户单位；y 向下）──
     O=(460,210)、R=130；A 相对 O 为 (-0.8R, -0.6R) ⟹ A=(356,132)；
     轨迹半径 r=1.4R=182，轨迹圆心 O′ 在 A 正下方 ⟹ O′=(356,314)；
     B=O′+(r,0)=(538,314)，|OB|=√(78²+104²)=130=R ✓（出射点落在磁场边界上）。
-->
<script setup>
defineProps({
  /** 是否显示分析标注（轨迹圆弧、轨迹圆心 O′、半径 r、直角与 R） */
  showAnalysis: { type: Boolean, default: false },
});

/** 磁场圆 */
const O = { x: 460, y: 210 };
const R = 130;
/** 入射点 / 出射点 / 轨迹圆心（r = 1.4R） */
const A = { x: 356, y: 132 };
const B = { x: 538, y: 314 };
const C = { x: 356, y: 314 };

/** 图内字号与统一深色光晕（保证压在点阵上仍清楚） */
const FS = 20;
const MATH = "KaTeX_Math, 'Times New Roman', serif";
const HALO = { stroke: "#0f1425", "stroke-width": 4, "paint-order": "stroke" };

/** 轨迹圆弧：A 在 O′ 正上方、B 在 O′ 正右方，屏幕上顺时针（sweep = 1） */
const ARC = `M ${A.x} ${A.y} A 182 182 0 0 1 ${B.x} ${B.y}`;
/** 两条虚线半径 */
const RADII = `M ${C.x} ${C.y} L ${A.x} ${A.y} M ${C.x} ${C.y} L ${B.x} ${B.y}`;
/** 圆心 O → 入射点 A（磁场半径 R，虚线） */
const OA = `M ${O.x} ${O.y} L ${A.x} ${A.y}`;
/** 分析用直角标记：垂足处（竖直向上 × 水平向右）、O′ 处（竖直向上 × 水平向右） */
const RIGHT_ANGLE = "M 356 192 L 374 192 L 374 210 M 356 296 L 374 296 L 374 314";
</script>

<template>
  <div class="flex h-full min-h-0 w-full items-center justify-center">
    <svg viewBox="145 55 490 335" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto max-w-full">
      <defs>
        <clipPath id="acf-field-clip">
          <circle :cx="O.x" :cy="O.y" :r="R" />
        </clipPath>
      </defs>

      <!-- 平行板加速电场：左板 +、右板 −（正电荷向右加速），右板留出射小孔 -->
      <g stroke="var(--c-neutral-300)" stroke-width="2.6" stroke-linecap="round">
        <line x1="170" y1="95" x2="170" y2="169" />
        <line x1="225" y1="95" x2="225" y2="124" />
        <line x1="225" y1="140" x2="225" y2="169" />
      </g>
      <text v-bind="HALO" x="160" y="102" text-anchor="end" font-family="KaTeX_Main" font-size="18" fill="var(--c-neutral-50)">+</text>
      <text v-bind="HALO" x="236" y="102" font-family="KaTeX_Main" font-size="18" fill="var(--c-neutral-50)">−</text>
      <text v-bind="HALO" x="197" y="80" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-neutral-50)">U</text>
      <!-- 板间距 d -->
      <g stroke="var(--c-neutral-300)" stroke-width="1.4" stroke-linecap="round">
        <line x1="170" y1="182" x2="225" y2="182" />
        <line x1="170" y1="176" x2="170" y2="188" />
        <line x1="225" y1="176" x2="225" y2="188" />
      </g>
      <text v-bind="HALO" x="197" y="203" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-neutral-50)">d</text>
      <!-- 电场线方向（+ → −，向右） -->
      <CourseArrow :from="{ x: 178, y: 106 }" :to="{ x: 217, y: 106 }" stroke="var(--c-physics)" stroke-width="2" />
      <CourseArrow :from="{ x: 178, y: 158 }" :to="{ x: 217, y: 158 }" stroke="var(--c-physics)" stroke-width="2" />
      <text v-bind="HALO" x="197" y="126" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" font-size="16" fill="var(--c-physics)">E</text>
      <!-- 粒子从静止开始加速的直线路径 -->
      <line x1="176" y1="132" x2="350" y2="132" stroke="color-mix(in srgb, var(--c-neutral-300) 55%, transparent)" stroke-width="1.4" />

      <!-- 圆形磁场区域：边界圆 + 垂直纸面向外的裸 · 阵列 -->
      <circle :cx="O.x" :cy="O.y" :r="R" fill="color-mix(in srgb, var(--c-accent) 6%, transparent)" stroke="color-mix(in srgb, var(--c-accent) 65%, transparent)" stroke-width="2.2" />
      <g clip-path="url(#acf-field-clip)">
        <FieldDots :x="328" :y="78" :cols="13" :rows="13" :spacing="22" :size="4" :line-width="1.4" dir="out" :opacity="0.9" />
      </g>

      <!-- 磁场中心水平线（题目给定的参考线） -->
      <line x1="300" y1="210" x2="620" y2="210" stroke="color-mix(in srgb, var(--c-neutral-300) 45%, transparent)" stroke-width="1.6" stroke-dasharray="8 7" />

      <!-- 入射点到中心水平线的距离 h = 0.6R -->
      <line x1="316" y1="132" x2="352" y2="132" stroke="color-mix(in srgb, var(--c-neutral-300) 45%, transparent)" stroke-width="1.4" stroke-dasharray="6 5" />
      <CourseArrow :from="{ x: 316, y: 168 }" :to="{ x: 316, y: 132 }" stroke="var(--c-neutral-300)" stroke-width="1.4" />
      <CourseArrow :from="{ x: 316, y: 174 }" :to="{ x: 316, y: 210 }" stroke="var(--c-neutral-300)" stroke-width="1.4" />
      <text v-bind="HALO" x="306" y="176" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-neutral-50)">h = 0.6R</text>

      <!-- 给定：磁场圆心 O、入射点 A、入射速度 v（水平向右） -->
      <circle :cx="O.x" :cy="O.y" r="4.5" fill="var(--c-neutral-300)" />
      <text v-bind="HALO" :x="O.x + 14" :y="O.y + 30" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">O</text>
      <circle :cx="A.x" :cy="A.y" r="5.5" fill="var(--c-neutral-50)" />
      <text v-bind="HALO" :x="A.x - 10" :y="A.y - 12" text-anchor="end" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">A</text>
      <CourseArrow :from="A" :to="{ x: 414, y: 132 }" stroke="var(--c-velocity)" stroke-width="3.4" />
      <text v-bind="HALO" x="386" y="121" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-velocity)">v</text>

      <!-- 给定：出射点 B 与竖直向下的出射速度 v -->
      <circle :cx="B.x" :cy="B.y" r="5.5" fill="var(--c-neutral-50)" />
      <text v-bind="HALO" :x="B.x + 14" :y="B.y + 10" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">B</text>
      <CourseArrow :from="B" :to="{ x: 538, y: 370 }" stroke="var(--c-velocity)" stroke-width="3.4" />
      <text v-bind="HALO" x="552" y="352" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-velocity)">v</text>

      <!-- 第 2 次点击之后：分析标注 -->
      <g v-if="showAnalysis">
        <path :d="ARC" fill="none" stroke="var(--c-velocity)" stroke-width="3.2" stroke-linecap="round" />
        <path :d="RADII" fill="none" stroke="color-mix(in srgb, var(--c-neutral-300) 60%, transparent)" stroke-width="1.8" stroke-dasharray="8 7" />
        <path :d="OA" fill="none" stroke="color-mix(in srgb, var(--c-neutral-300) 60%, transparent)" stroke-width="1.8" stroke-dasharray="8 7" />
        <path :d="RIGHT_ANGLE" fill="none" stroke="var(--c-neutral-300)" stroke-width="1.6" />
        <circle :cx="C.x" :cy="C.y" r="4.5" fill="var(--c-neutral-50)" />
        <text v-bind="HALO" :x="C.x + 10" :y="C.y + 30" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">O′</text>
        <text v-bind="HALO" x="338" y="230" text-anchor="end" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">r</text>
        <text v-bind="HALO" x="447" y="338" text-anchor="middle" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">r</text>
        <text v-bind="HALO" x="412" y="166" font-family="KaTeX_Math" font-style="italic" :font-size="FS" fill="var(--c-neutral-50)">R</text>
      </g>
    </svg>
  </div>
</template>
