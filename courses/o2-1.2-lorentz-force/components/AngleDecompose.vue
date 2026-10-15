<!--
  一般式推导图（"如果 v 与 B 不垂直"页）
  —— 仿教材图 1.2-5：速度 v 与磁场 B 成夹角 θ 时，把 B 分解为
     B∥ = B cosθ（沿 v 方向，不产生力）与 B⊥ = B sinθ（垂直 v，产生力）。
  意图：用"只有垂直于 v 的磁场分量产生洛伦兹力"推出一般式 F = qvB sinθ。
  几何约定（旧版踩过的坑）：θ 弧必须**以 O 为圆心**、两端正好落在 v 与 B 两条射线上，
  半径 r = 78 → 起点 (O.x+78, O.y)、终点 (O.x+78cosθ, O.y−78sinθ)（θ = 50°）。
  标注走 ChartLabel（真 KaTeX，能画 \perp / \parallel），容器与 SVG 宽高比严格一致。
  待细化方向：θ 角可拖拽改变、分量虚线出现动画。
-->
<script setup>
// O = (120, 320)，θ = 50°，B 长 200 → B 端点 (248.6, 166.8)
const OX = 120;
const OY = 320;
const THETA = (50 * Math.PI) / 180;
const R = 78;
const arcStart = { x: OX + R, y: OY };
const arcEnd = { x: OX + R * Math.cos(THETA), y: OY - R * Math.sin(THETA) };
const arc = `M ${arcStart.x.toFixed(1)} ${arcStart.y} A ${R} ${R} 0 0 0 ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}`;
/**
 * 图内标注走 ChartLabel，位置按 viewBox(520×400) 换算成百分比
 *
 * @param x 用户单位横坐标
 * @param y 用户单位纵坐标
 * @returns 换算后的百分比坐标
 */
const pct = (x, y) => ({ x: (x / 520) * 100, y: (y / 400) * 100 });
const labelBPerp = pct(262, 244);
const labelBPar = pct(186, 332);
const labelTheta = pct(206, 280);
</script>

<template>
  <div class="relative w-full">
    <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <!-- 原点 O -->
      <circle cx="120" cy="320" r="4.5" fill="var(--c-neutral-200)" />

      <!-- v：水平向右（蓝） -->
      <CourseArrow
        :from="{ x: 120, y: 320 }"
        :to="{ x: 452, y: 320 }"
        stroke="var(--c-velocity)"
        stroke-width="5"
      />
      <!-- B：与 v 成 θ = 50°（金） -->
      <CourseArrow
        :from="{ x: 120, y: 320 }"
        :to="{ x: 249, y: 167 }"
        stroke="var(--c-accent)"
        stroke-width="5"
      />
      <!-- B∥ = B cosθ：沿 v 方向的分量（金色虚线，不产生力） -->
      <CourseArrow
        :from="{ x: 120, y: 320 }"
        :to="{ x: 249, y: 320 }"
        stroke="var(--c-accent)"
        stroke-width="3.4"
        stroke-dasharray="9 6"
        style="opacity: 0.85"
      />
      <!-- B⊥ = B sinθ：垂直 v 的分量（金色虚线，产生洛伦兹力） -->
      <CourseArrow
        :from="{ x: 249, y: 320 }"
        :to="{ x: 249, y: 167 }"
        stroke="var(--c-accent)"
        stroke-width="3.4"
        stroke-dasharray="9 6"
        style="opacity: 0.85"
      />

      <!-- 直角标记（B∥ ⊥ B⊥） -->
      <path
        d="M 239 320 L 239 310 L 249 310"
        fill="none"
        stroke="color-mix(in srgb, var(--c-accent) 75%, transparent)"
        stroke-width="1.6"
      />

      <!-- θ 角弧：以 O 为圆心，两端落在 v、B 上 -->
      <path :d="arc" fill="none" stroke="var(--c-neutral-50)" stroke-width="2.2" />

      <!-- 单字母标注（SVG 里只能用 KaTeX 字体；带角标/运算符的交给 ChartLabel） -->
      <text
        x="242"
        y="152"
        text-anchor="middle"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="var(--c-accent)"
      >
        B
      </text>
      <text
        x="464"
        y="330"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="26"
        fill="var(--c-velocity)"
      >
        v
      </text>
      <text
        x="104"
        y="352"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="24"
        fill="var(--c-neutral-200)"
      >
        O
      </text>
    </svg>

    <!-- 图内公式标注（真 KaTeX，能画 \perp / \parallel） -->
    <ChartLabel
      :x-percent="labelBPerp.x"
      :y-percent="labelBPerp.y"
      anchor="right"
      :parts="[{ tex: 'B_{\\perp} = B\\sin\\theta' }]"
      color="#2dd4bf"
      :size="19"
      halo
    />
    <ChartLabel
      :x-percent="labelBPar.x"
      :y-percent="labelBPar.y"
      anchor="bottom-right"
      :parts="[{ tex: 'B_{\\parallel} = B\\cos\\theta' }]"
      color="#e2a846"
      :size="19"
      halo
    />
    <ChartLabel
      :x-percent="labelTheta.x"
      :y-percent="labelTheta.y"
      :parts="[{ tex: '\\theta' }]"
      color="#f8fafc"
      :size="20"
      halo
    />
  </div>
</template>
