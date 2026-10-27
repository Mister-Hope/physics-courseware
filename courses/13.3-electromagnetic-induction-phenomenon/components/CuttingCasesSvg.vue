<!--
  P7：闭合电路的一部分导体在磁场中的三种运动（甲 静止 / 乙 沿磁感线运动 / 丙 切割磁感线）。
  磁场 N 上 S 下、磁感线竖直向下（在纸面内），导体棒 AB 水平：
  只有 AB **垂直于纸面前后**运动时，v 才有垂直于纸面的分量、v×B 才沿 AB，才产生电动势（丙）。
  丙图用 3D 透视画"垂直纸面向里"的两条导轨（屏幕斜向右上 ~38°）：导轨画成暗灰细轨条，**不闭合回路**；
  AB 横跨在导轨上前后滑动（实线 = 现在的位置，同色淡虚线 = 另一位置），运动方向用一个沿导轨指向纸内的
  v 箭头标出。引线只从 AB 的两端引出接电流表——回路里只有 棒 + 引线 + 电流表，没有别的"导体边框"。
  第一眼只有干净的装置图与运动方向；指针状态与"有/无感应电流"标注按 :step 逐击出现（固定 SVG 内 v-if，不顶跑版式）。
-->
<script setup lang="ts">
const { step = 0 } = defineProps<{
  /** 当前点击步：1 = 甲出答案，2 = 乙出答案，3 = 丙出答案（指针偏转） */
  step?: number;
}>();

/** 三幅小图，每幅宽 300 */
const PANELS = [
  { x: 0, name: "甲", motion: "still" as const, answerAt: 1, answer: "无感应电流" },
  { x: 300, name: "乙", motion: "alongB" as const, answerAt: 2, answer: "无感应电流" },
  { x: 600, name: "丙", motion: "cut" as const, answerAt: 3, answer: "有感应电流" },
];
const FIELD_X = [55, 90, 125, 160];

/** 丙图几何：两条**机械导轨**沿"垂直纸面向里"的进深方向（屏幕斜向右上 38°）铺开， 它们不构成回路（没有前边、也没有远端横梁）；AB 横跨在导轨上前后滑动。 引线只从实线棒 AB 的两端引出（与甲/乙 一致），绕开磁体下到电流表——回路里只有 棒 + 引线 + 电流表。 */
interface Pt {
  x: number;
  y: number;
}

/** 进深方向单位向量（屏幕右上 = 射入纸面）与导轨在屏幕上的法向 */
const CUT_DIR: Pt = { x: Math.cos((38 * Math.PI) / 180), y: -Math.sin((38 * Math.PI) / 180) };
const CUT_NORM: Pt = { x: -CUT_DIR.y, y: CUT_DIR.x };
/** 沿导轨方向走 s（用户单位）、沿导轨屏幕法向平移 k */
const onRail = (p: Pt, s: number): Pt => ({ x: p.x + CUT_DIR.x * s, y: p.y + CUT_DIR.y * s });
const shift = (p: Pt, k: number): Pt => ({ x: p.x + CUT_NORM.x * k, y: p.y + CUT_NORM.y * k });

/** 电流表表盘：引线终点 = 表盘圆周上的两个接线柱（x ± r） */
const METER = { x: 232, y: 252, r: 24 };
/** 两条导轨的近端（两轨相距 120 = AB 长），导轨从这里朝纸面里延伸 */
const RAIL_A0: Pt = { x: 34, y: 184 };
const RAIL_B0: Pt = { x: 154, y: 184 };
/** 实线棒（现在的位置）/ 虚线棒（另一位置）/ 导轨末端在导轨上的深度 */
const NEAR_S = 20;
const FAR_S = 78;
const RAIL_END_S = 96;
const ROD_NEAR_A = onRail(RAIL_A0, NEAR_S);
const ROD_NEAR_B = onRail(RAIL_B0, NEAR_S);
const ROD_FAR_A = onRail(RAIL_A0, FAR_S);
const ROD_FAR_B = onRail(RAIL_B0, FAR_S);
/** 轨道中线（两根导轨的中点连线）——运动箭头沿它画在两棒之间 */
const RAIL_MID: Pt = { x: (RAIL_A0.x + RAIL_B0.x) / 2, y: RAIL_A0.y };

/** 导轨画成一根细长的"轨条"（有宽度的小长条 → 一眼看出是机械导轨，不是导线） */
const RAIL_W = 3.2;
const railStripPath = (p: Pt): string => {
  const e = onRail(p, RAIL_END_S);
  const n = { x: CUT_NORM.x * RAIL_W, y: CUT_NORM.y * RAIL_W };
  return `M ${p.x} ${p.y} L ${p.x + n.x} ${p.y + n.y} L ${e.x + n.x} ${e.y + n.y} L ${e.x} ${e.y} Z`;
};

/** 导轨远端的小端挡（垂直于导轨的短线 → 表示"轨道到头了"；近端不加，免得和引线挤在一起） */
const RAIL_STOPS = [onRail(RAIL_A0, RAIL_END_S), onRail(RAIL_B0, RAIL_END_S)].map((p) => ({ from: shift(p, -4.5), to: shift(p, 4.5) }));

const CUT = {
  /** 两条导轨（画细、画暗：机械导轨，不是导线） */
  railLeftPath: railStripPath(RAIL_A0),
  railRightPath: railStripPath(RAIL_B0),
  railStops: RAIL_STOPS,
  /** 两导轨张成的水平面（很淡的填充，只表达"水平面/进深"，没有描边、不闭合回路） */
  planePath: `M ${RAIL_A0.x} ${RAIL_A0.y} L ${RAIL_B0.x} ${RAIL_B0.y} L ${onRail(RAIL_B0, RAIL_END_S).x} ${onRail(RAIL_B0, RAIL_END_S).y} L ${onRail(RAIL_A0, RAIL_END_S).x} ${onRail(RAIL_A0, RAIL_END_S).y} Z`,
  rodNearA: ROD_NEAR_A,
  rodNearB: ROD_NEAR_B,
  rodFarA: ROD_FAR_A,
  rodFarB: ROD_FAR_B,
  /** 运动方向：沿导轨指向纸内，画在两棒之间（不压棒） */
  arrowFrom: onRail(RAIL_MID, 28),
  arrowTo: onRail(RAIL_MID, 70),
  /** 引线：从实线棒 AB 的两端绕开 S 极，弧线接电流表两接线柱 */
  leadLeft: `M ${ROD_NEAR_A.x} ${ROD_NEAR_A.y} C 36 174, 16 186, 16 206 V 240 C 16 248, 22 ${METER.y}, 30 ${METER.y} H ${METER.x - METER.r}`,
  leadRight: `M ${ROD_NEAR_B.x} ${ROD_NEAR_B.y} C 176 178, 182 186, 192 194 C 214 208, 240 222, 254 236 C 260 242, 262 248, 262 ${METER.y} L ${METER.x + METER.r} ${METER.y}`,
};
</script>

<template>
  <div class="figure">
    <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g v-for="p in PANELS" :key="p.name">
        <!-- 面板编号 -->
        <text :x="p.x + 24" y="30" font-size="20" fill="var(--c-text-dim)">{{ p.name }}</text>
        <!-- 磁体的两极（N 红 / S 蓝）：磁感线在纸面内竖直向下 -->
        <rect :x="p.x + 25" y="46" width="170" height="20" rx="3" fill="var(--c-danger)" />
        <rect :x="p.x + 25" y="206" width="170" height="20" rx="3" fill="var(--c-velocity)" />
        <text :x="p.x + 110" y="61" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="var(--c-bg-soft)">N</text>
        <text :x="p.x + 110" y="221" text-anchor="middle" font-family="KaTeX_Main" font-size="17" fill="var(--c-bg-soft)">S</text>
        <!-- 磁感线（N → S，竖直向下）-->
        <CourseArrow
          v-for="(fx, i) in FIELD_X"
          :key="'f' + i"
          :from="{ x: p.x + fx, y: 74 }"
          :to="{ x: p.x + fx, y: 198 }"
          stroke="var(--c-accent)"
          :stroke-width="1.6"
        />
        <!-- 丙：两条机械导轨垂直于纸面（进深方向斜向右上），AB 沿导轨前后滑动 -->
        <template v-if="p.motion === 'cut'">
          <!-- 两条导轨：画成暗灰细"轨条"（有宽度的小长条 → 机械导轨，不是导线；不闭合回路） -->
          <path :d="CUT.planePath" :transform="`translate(${p.x} 0)`" fill="var(--c-accent-2)" opacity="0.07" />
          <path :d="CUT.railLeftPath" :transform="`translate(${p.x} 0)`" fill="var(--c-text-dim)" opacity="0.62" />
          <path :d="CUT.railRightPath" :transform="`translate(${p.x} 0)`" fill="var(--c-text-dim)" opacity="0.62" />
          <g stroke="var(--c-text-dim)" stroke-width="1.8" stroke-linecap="round" opacity="0.6">
            <line v-for="(stop, i) in CUT.railStops" :key="'stop' + i" :x1="p.x + stop.from.x" :y1="stop.from.y" :x2="p.x + stop.to.x" :y2="stop.to.y" />
          </g>
          <!-- 另一位置（远处）的 AB：同色、更淡的虚线 -->
          <line
            :x1="p.x + CUT.rodFarA.x"
            :y1="CUT.rodFarA.y"
            :x2="p.x + CUT.rodFarB.x"
            :y2="CUT.rodFarB.y"
            stroke="var(--c-text)"
            stroke-width="3.5"
            stroke-dasharray="7 6"
            stroke-linecap="round"
            opacity="0.42"
          />
          <!-- 现在位置的 AB：实线（引线就从它的两端引出） -->
          <line
            :x1="p.x + CUT.rodNearA.x"
            :y1="CUT.rodNearA.y"
            :x2="p.x + CUT.rodNearB.x"
            :y2="CUT.rodNearB.y"
            stroke="var(--c-text)"
            stroke-width="3.5"
            stroke-linecap="round"
          />
          <text
            :x="p.x + CUT.rodNearA.x - 8"
            :y="CUT.rodNearA.y - 7"
            text-anchor="end"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            fill="var(--c-text)"
            stroke="var(--c-bg)"
            stroke-width="3"
            paint-order="stroke"
          >
            A
          </text>
          <text
            :x="p.x + CUT.rodNearB.x + 12"
            :y="CUT.rodNearB.y + 5"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            fill="var(--c-text)"
            stroke="var(--c-bg)"
            stroke-width="3"
            paint-order="stroke"
          >
            B
          </text>
          <!-- 运动方向：沿导轨指向纸内，箭头旁标 v -->
          <CourseArrow
            :from="{ x: p.x + CUT.arrowFrom.x, y: CUT.arrowFrom.y }"
            :to="{ x: p.x + CUT.arrowTo.x, y: CUT.arrowTo.y }"
            stroke="var(--c-accent-2)"
            :stroke-width="2.6"
          />
          <text
            :x="p.x + CUT.arrowTo.x - 8"
            :y="CUT.arrowTo.y - 10"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="18"
            fill="var(--c-accent-2)"
            stroke="var(--c-bg)"
            stroke-width="3"
            paint-order="stroke"
          >
            v
          </text>
          <!-- 引线：从 AB 两端绕开 S 极、弧线接电流表（回路里没有别的导体） -->
          <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
            <path :d="CUT.leadLeft" :transform="`translate(${p.x} 0)`" />
            <path :d="CUT.leadRight" :transform="`translate(${p.x} 0)`" />
          </g>
        </template>
        <template v-else>
          <!-- 导体棒 AB 与引线（甲 静止 / 乙 沿磁感线运动）-->
          <line :x1="p.x + 45" y1="136" :x2="p.x + 175" y2="136" stroke="var(--c-text)" stroke-width="3.5" stroke-linecap="round" />
          <text :x="p.x + 40" y="130" text-anchor="end" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">A</text>
          <text :x="p.x + 180" y="130" font-family="KaTeX_Math" font-style="italic" font-size="18" fill="var(--c-text)">B</text>
          <g fill="none" stroke="var(--c-text)" stroke-width="1.8" stroke-linecap="round">
            <path :d="`M ${p.x + 45} 136 H ${p.x + 14} V 252 H ${p.x + 208}`" />
            <path :d="`M ${p.x + 175} 136 H ${p.x + 278} V 252 H ${p.x + 256}`" />
          </g>
        </template>
        <!-- 带指针的电流表（导线止于表盘圆周，r=24）-->
        <PointerAmmeter :x="p.x + METER.x" :y="METER.y" :r="METER.r" :angle="p.motion === 'cut' && step >= 3 ? 36 : 0" />
        <!-- 运动方向：静止 / 沿磁感线（上下）-->
        <text v-if="p.motion === 'still'" :x="p.x + 110" y="176" text-anchor="middle" font-size="17" fill="var(--c-text-dim)">静止</text>
        <template v-if="p.motion === 'alongB'">
          <CourseArrow :from="{ x: p.x + 250, y: 136 }" :to="{ x: p.x + 250, y: 92 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
          <CourseArrow :from="{ x: p.x + 250, y: 136 }" :to="{ x: p.x + 250, y: 180 }" stroke="var(--c-accent-2)" :stroke-width="2.2" />
        </template>
        <!-- 答案：逐击出现 -->
        <text
          v-if="step >= p.answerAt"
          :x="p.x + 150"
          y="292"
          text-anchor="middle"
          font-size="18"
          :fill="p.motion === 'cut' ? 'var(--c-accent)' : 'var(--c-text-dim)'"
        >
          {{ p.answer }}
        </text>
      </g>
    </svg>
  </div>
</template>
