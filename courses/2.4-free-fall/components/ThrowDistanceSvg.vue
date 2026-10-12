<script setup lang="ts">
/**
 * 例题「什么时候离抛出点 15 m」的示意图。
 *
 * 竖直上抛没有水平方向运动；为了避免画成抛物线让学生误以为是斜抛运动， 这里把上升过程和下落过程画成两条并排、略有间距的竖直直线（像铁轨一样）：
 *
 * - 左侧竖直线（x = UP_X）：从抛出点 O（h = 0）竖直上升到最高点（h = 20 m，t = 2 s），途中在 t = 1 s 经过上方 15 m；
 * - 右侧竖直线（x = DOWN_X）：从最高点（h = 20 m）竖直下落到抛出点下方 15 m（t = 2 + √7 s），途中在 t = 3 s 经过上方 15 m。
 */

/** 高度 → 画布：1 m 画成 6.8 个用户单位 */
const SCALE_Y = 6.8;
/** 抛出点画在 y = 172 */
const ZERO_Y = 172;
/** 上升竖直线与下落竖直线的横坐标（像铁轨一样稍微留一点间距） */
const UP_X = 162;
const DOWN_X = 184;
const MID_X = (UP_X + DOWN_X) / 2;
/** 尺寸箭头所在竖线，以及高度辅助线的横向范围 */
const RULE_X = 114;
const LEVEL_LEFT = 108;
const LEVEL_RIGHT = 214;
/** 最高点 20 m、上方 15 m、下方 15 m 三个高度，与两个尺寸箭头的中点 */
const TOP_Y = Math.round(ZERO_Y - 20 * SCALE_Y);
const LEVEL_UP_Y = Math.round(ZERO_Y - 15 * SCALE_Y);
const LEVEL_DOWN_Y = Math.round(ZERO_Y + 15 * SCALE_Y);
const UP_MID = Math.round((LEVEL_UP_Y + ZERO_Y) / 2);
const DOWN_MID = Math.round((ZERO_Y + LEVEL_DOWN_Y) / 2);

/** 关键位置坐标 */
const origin = { x: UP_X, y: ZERO_Y };
const up1 = { x: UP_X, y: LEVEL_UP_Y };
const topUp = { x: UP_X, y: TOP_Y };
const topDown = { x: DOWN_X, y: TOP_Y };
const up2 = { x: DOWN_X, y: LEVEL_UP_Y };
const down = { x: DOWN_X, y: LEVEL_DOWN_Y };
</script>

<template>
  <svg viewBox="0 0 320 296" width="100%" style="display: block; max-width: 20rem; margin: 0 auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- 轨迹上升/下落方向小箭头 -->
      <marker id="vt15-rail-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4.8" markerHeight="4.8" orient="auto">
        <path d="M 0 1.2 L 7.2 4 L 0 6.8 z" fill="#e2a846" />
      </marker>
    </defs>

    <!-- 四条水平参考线：最高点 20 m、上方 15 m、抛出点 O、下方 15 m -->
    <line :x1="LEVEL_LEFT" :y1="TOP_Y" :x2="LEVEL_RIGHT" :y2="TOP_Y" stroke="rgba(148,163,184,0.28)" stroke-width="1.1" stroke-dasharray="3 3" />
    <line :x1="LEVEL_LEFT" :y1="LEVEL_UP_Y" :x2="LEVEL_RIGHT" :y2="LEVEL_UP_Y" stroke="rgba(148,163,184,0.35)" stroke-width="1.2" stroke-dasharray="4 4" />
    <line :x1="LEVEL_LEFT" :y1="ZERO_Y" :x2="LEVEL_RIGHT" :y2="ZERO_Y" stroke="rgba(148,163,184,0.45)" stroke-width="1.4" stroke-dasharray="5 4" />
    <line :x1="LEVEL_LEFT" :y1="LEVEL_DOWN_Y" :x2="LEVEL_RIGHT" :y2="LEVEL_DOWN_Y" stroke="rgba(148,163,184,0.35)" stroke-width="1.2" stroke-dasharray="4 4" />

    <!-- 左侧两个 15 m 尺寸标注 -->
    <line :x1="RULE_X" :y1="LEVEL_UP_Y + 4" :x2="RULE_X" :y2="ZERO_Y - 4" stroke="#94a3b8" stroke-width="1.3" />
    <line :x1="RULE_X" :y1="ZERO_Y + 4" :x2="RULE_X" :y2="LEVEL_DOWN_Y - 4" stroke="#94a3b8" stroke-width="1.3" />
    <text :x="RULE_X - 8" :y="UP_MID + 5" text-anchor="end" font-size="13" fill="#94a3b8">15 m</text>
    <text :x="RULE_X - 8" :y="DOWN_MID + 5" text-anchor="end" font-size="13" fill="#94a3b8">15 m</text>

    <!-- 上升竖直线（左轨）与下落竖直线（右轨）：像铁轨一样并排，避免画成抛物线误导为斜抛 -->
    <line :x1="UP_X" :y1="ZERO_Y" :x2="UP_X" :y2="TOP_Y" stroke="rgba(226,168,70,0.68)" stroke-width="1.8" stroke-dasharray="5 4" />
    <line :x1="DOWN_X" :y1="TOP_Y" :x2="DOWN_X" :y2="LEVEL_DOWN_Y" stroke="rgba(226,168,70,0.68)" stroke-width="1.8" stroke-dasharray="5 4" />

    <!-- 左轨向上箭头、右轨向下箭头 -->
    <line :x1="UP_X" :y1="UP_MID + 8" :x2="UP_X" :y2="UP_MID - 6" stroke="#e2a846" stroke-width="1.8" marker-end="url(#vt15-rail-arrow)" />
    <line :x1="DOWN_X" :y1="UP_MID - 6" :x2="DOWN_X" :y2="UP_MID + 8" stroke="#e2a846" stroke-width="1.8" marker-end="url(#vt15-rail-arrow)" />
    <line :x1="DOWN_X" :y1="DOWN_MID - 6" :x2="DOWN_X" :y2="DOWN_MID + 8" stroke="#e2a846" stroke-width="1.8" marker-end="url(#vt15-rail-arrow)" />

    <!-- 关键位置点 -->
    <circle :cx="origin.x" :cy="origin.y" r="4.5" fill="#94a3b8" />
    <circle :cx="topUp.x" :cy="topUp.y" r="3.6" fill="#64748b" />
    <circle :cx="topDown.x" :cy="topDown.y" r="3.6" fill="#64748b" />
    <circle :cx="up1.x" :cy="up1.y" r="5" fill="#e2a846" />
    <circle :cx="up2.x" :cy="up2.y" r="5" fill="#e2a846" />
    <circle :cx="down.x" :cy="down.y" r="5" fill="#60a5fa" />

    <!-- 文字标注 -->
    <text :x="origin.x - 10" :y="origin.y + 18" text-anchor="end" font-size="13" fill="#94a3b8">O</text>
    <text :x="MID_X" :y="TOP_Y - 10" text-anchor="middle" font-size="12" fill="#94a3b8">20 m</text>
    <text :x="up1.x - 10" :y="up1.y - 8" text-anchor="end" font-size="13" fill="#e2a846">t = 1 s</text>
    <text :x="up2.x + 10" :y="up2.y - 8" text-anchor="start" font-size="13" fill="#e2a846">t = 3 s</text>
    <text :x="down.x + 10" :y="down.y + 4" text-anchor="start" font-size="13" fill="#60a5fa">t = 2 + √7 s</text>
  </svg>
</template>
