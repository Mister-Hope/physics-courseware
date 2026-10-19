<script setup lang="ts">
import { computed } from "vue";

/**
 * 第 7 页「长度收缩的方向」辨析图：同一个正方形（边长 l₀），速度**大小都是 0.6c**，方向分别向右 / 向上 / 斜向右上， 第 4 格画出常见误解「整体缩小」并打 ✗。
 *
 * 真实公式：设运动方向的单位矢量 n̂，则只把沿 n̂ 的分量压到 1/γ（γ = 1/√(1−(v/c)²)），垂直于 n̂ 的分量不变： r' = r − (1 − 1/γ)(r·n̂) n̂
 * β = 0.6 ⇒ γ = 1.25、1/γ = 0.8。于是：向右 → 横向压扁；向上 → 纵向压扁；斜向 → 沿斜向压扁成菱形。 「整体缩小」则是各边都乘 0.8 的相似形（面积 0.64
 * 倍），与相对论结果（面积 1/γ = 0.8 倍）不同。
 */

/** 三个方向都用同一个速度大小 0.6c（只改方向，便于对照） */
const BETA = 0.6;
const GAMMA = 1 / Math.sqrt(1 - BETA ** 2);
/** 沿运动方向压到 1/γ 倍 */
const FACTOR = 1 / GAMMA;

/** 点击后才画出收缩后的形状（先让学生自己判断） */
const { showResult = false } = defineProps<{ showResult?: boolean }>();

interface Point {
  x: number;
  y: number;
}

/** 正方形半边长、图心（viewBox 用户单位） */
const HALF = 32;
const CX = 65;
const CY = 65;

/** 三个方向：向右、向上、斜向右上（45°） */
const DIRECTIONS = [
  { deg: 0, cap: "向右" },
  { deg: 90, cap: "向上" },
  { deg: 45, cap: "斜向右上" },
] as const;

/** 正方形四角（相对中心） */
const corners: Point[] = [
  { x: -HALF, y: -HALF },
  { x: HALF, y: -HALF },
  { x: HALF, y: HALF },
  { x: -HALF, y: HALF },
];

/**
 * 把一个"相对中心"的点按运动方向做长度收缩
 *
 * @param point 相对正方形中心的点
 * @param deg 运动方向（度；屏幕坐标下 0° 向右、90° 向上）
 * @returns 收缩后相对中心的点
 */
const contract = (point: Point, deg: number): Point => {
  const rad = (deg * Math.PI) / 180;
  const n = { x: Math.cos(rad), y: -Math.sin(rad) };
  const along = point.x * n.x + point.y * n.y;
  const shrink = 1 - FACTOR;

  return { x: point.x - shrink * along * n.x, y: point.y - shrink * along * n.y };
};

/**
 * 画多边形的 `points` 串
 *
 * @param deg 运动方向（度）
 * @param scale 整体缩放（1 = 原正方形）
 * @returns `x,y x,y …`（绝对坐标）
 */
const polygon = (deg: number, scale = 1): string =>
  corners
    .map((point) => {
      const out = contract({ x: point.x * scale, y: point.y * scale }, deg);

      return `${(CX + out.x).toFixed(1)},${(CY + out.y).toFixed(1)}`;
    })
    .join(" ");

/** 原正方形（四格常显的虚线） */
const OUTLINE = corners.map((point) => `${CX + point.x},${CY + point.y}`).join(" ");

/** 三个方向收缩后的形状 */
const SHAPES = computed(() =>
  DIRECTIONS.map((item) => ({ cap: item.cap, points: polygon(item.deg) })),
);

/** 误解「整体缩小」：各边都乘 0.8 的相似形 */
const WRONG = polygon(0, FACTOR);

/** 速度箭头的两端与标签位置（每格一套，viewBox 130×130） */
const ARROWS = [
  { from: { x: 36, y: 20 }, to: { x: 94, y: 20 }, label: { x: 65, y: 12 } },
  { from: { x: 18, y: 96 }, to: { x: 18, y: 38 }, label: { x: 18, y: 30 } },
  { from: { x: 16, y: 116 }, to: { x: 44, y: 88 }, label: { x: 22, y: 126 } },
] as const;
</script>

<template>
  <div class="sl">
    <div class="sl-grid">
      <div v-for="(item, index) in SHAPES" :key="item.cap" class="sl-cell">
        <div class="sl-cap">{{ item.cap }} <Latex tex="0.6c" /></div>
        <svg
          class="sl-svg"
          viewBox="0 0 130 130"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          :aria-label="`正方形以 0.6c ${item.cap}运动时的长度收缩`"
        >
          <polygon
            :points="OUTLINE"
            fill="none"
            stroke="#94a3b8"
            stroke-width="1.6"
            stroke-dasharray="6 5"
          />
          <polygon
            v-if="showResult"
            :points="item.points"
            fill="rgba(226,168,70,0.2)"
            stroke="#e2a846"
            stroke-width="2.2"
          />
          <CourseArrow
            :from="ARROWS[index].from"
            :to="ARROWS[index].to"
            stroke="#2dd4bf"
            stroke-width="2.6"
          />
          <text
            :x="ARROWS[index].label.x"
            :y="ARROWS[index].label.y"
            fill="#2dd4bf"
            font-size="15"
            font-family="KaTeX_Math"
            font-style="italic"
            text-anchor="middle"
          >
            v
          </text>
        </svg>
      </div>

      <div class="sl-cell">
        <div class="sl-cap">整体缩小？</div>
        <svg
          class="sl-svg"
          viewBox="0 0 130 130"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="误解：以为正方形各边都等比缩小"
        >
          <polygon
            :points="OUTLINE"
            fill="none"
            stroke="#94a3b8"
            stroke-width="1.6"
            stroke-dasharray="6 5"
          />
          <polygon
            v-if="showResult"
            :points="WRONG"
            fill="rgba(248,113,113,0.18)"
            stroke="#f87171"
            stroke-width="2.2"
          />
          <g v-if="showResult" stroke="#f87171" stroke-width="3.2" stroke-linecap="round">
            <line x1="100" y1="16" x2="120" y2="36" />
            <line x1="120" y1="16" x2="100" y2="36" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sl {
  width: 100%;
  min-width: 0;
}

.sl-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.9rem;
}

.sl-cell {
  min-width: 0;
  text-align: center;
}

.sl-cap {
  margin-bottom: 0.1rem;

  color: var(--c-text-dim);

  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}

.sl-svg {
  display: block;
  width: 100%;
  height: auto;
}
</style>
