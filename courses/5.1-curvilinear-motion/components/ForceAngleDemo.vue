<script setup lang="ts">
// 用于第 10 页（把合力沿速度方向、垂直速度方向分解）：
// 直接用鼠标拖动合力 F 的箭头，改变 F 与速度 v 的夹角 α，看 F 的两个分量怎么变。
//
// 轨迹是按公式画出来的真抛物线：只受恒力时 r = r₀ + v t + ½ a t²，
// 所以轨迹在 P 点的切线**沿 v（水平向右）**，之后才逐渐向 F 所指的一侧弯曲。
// 二次贝塞尔能精确表示一段抛物线：控制点取在 P 右侧、与 P 等高，起点切线即为水平。
// 只给定量几何关系与定性结论（速率变大 / 不变 / 变小），不做数值积分、不上屏数值刻度。
import { computed, ref } from "vue";

interface Point {
  x: number;
  y: number;
}

/** 物体所在位置（速度、合力都从这里画起，略向下留出上方垂直分量与 F 标签的呼吸空间） */
const pointP: Point = { x: 320, y: 180 };
const V_LEN = 240;
const F_LEN = 136;
const VIEW_W = 880;
const VIEW_H = 250;
/** 抛物线示意：位移里"沿 v"的部分取 248、"沿 a"的部分取 62 */
const S_V = 248;
const S_A = 62;
/** 抛物线控制点距 P 的水平距离（= S_V / 2，此时二次贝塞尔正好是抛物线） */
const C_DX = S_V / 2;

const alpha = ref(60);

const rad = computed(() => (alpha.value * Math.PI) / 180);

const vTip = computed<Point>(() => ({ x: pointP.x + V_LEN, y: pointP.y }));

/** 合力箭头终点 */
const fTip = computed<Point>(() => ({
  x: pointP.x + F_LEN * Math.cos(rad.value),
  y: pointP.y - F_LEN * Math.sin(rad.value),
}));

/** 沿 v 方向的分量（与 v 同向为正、反向为负） */
const parTip = computed<Point>(() => ({ x: pointP.x + F_LEN * Math.cos(rad.value), y: pointP.y }));

/** 垂直 v 方向的分量（始终指向屏幕上方） */
const perpTip = computed<Point>(() => ({ x: pointP.x, y: pointP.y - F_LEN * Math.sin(rad.value) }));

/** 是否明显存在沿 v 分量 / 垂直 v 分量（避免接近 0 时箭头退化成一团） */
const hasPar = computed(() => Math.abs(Math.cos(rad.value)) > 0.06);
const hasPerp = computed(() => Math.sin(rad.value) > 0.06);

/** 夹角 α 弧线：更贴近顶点 P（r = 34，标签置于 r = 50）， 避免原版 r = 58 / 88 过大导致与合力 F 及投影虚线挤在一起。 */
const arc = computed(() => {
  const r = 34;
  const ex = pointP.x + r * Math.cos(rad.value);
  const ey = pointP.y - r * Math.sin(rad.value);
  const half = rad.value / 2;
  const labelR = alpha.value < 28 ? 54 : 48;
  return {
    d: `M ${pointP.x + r} ${pointP.y} A ${r} ${r} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)}`,
    sector: `M ${pointP.x} ${pointP.y} L ${pointP.x + r} ${pointP.y} A ${r} ${r} 0 0 0 ${ex.toFixed(1)} ${ey.toFixed(1)} Z`,
    label: {
      x: pointP.x + labelR * Math.cos(half),
      y: pointP.y - labelR * Math.sin(half) - (alpha.value < 22 ? 6 : 0),
    },
  };
});

/** 合力 F 标签：放在箭头尖端外延处，彻底避开内侧 α 弧线 */
const fLabelPos = computed<Point>(() => ({
  x: fTip.x + 24 * Math.cos(rad.value),
  y: fTip.y - 24 * Math.sin(rad.value),
}));

/** "沿 v 的分量" 文字位置： 始终居中对齐在水平分力线段 P -> parTip 正下方（y = pointP.y + 34）， 当水平分力较短时适度向分力方向偏置，避免压在 P 点正下方。 */
const parLabelPos = computed<Point>(() => {
  const dx = parTip.value.x - pointP.x;
  const offset = Math.abs(dx) < 84 ? (dx >= 0 ? 44 : -44) : dx / 2;
  return {
    x: pointP.x + offset,
    y: pointP.y + 34,
  };
});

/**
 * "垂直 v 的分量" 文字位置： 动态放在正交分解矩形的**外侧**—— α ≤ 90° 时矩形在右侧，文字放竖直轴左侧（右对齐）； α > 90° 时矩形在左侧，文字放竖直轴右侧（左对齐）。
 * 这样在 0°~180° 任意角度下都绝不会与合力 F 或虚线相交！
 */
const perpLabel = computed(() => {
  const onLeft = alpha.value <= 90;
  const midY = (pointP.y + perpTip.value.y) / 2;
  return {
    x: onLeft ? pointP.x - 16 : pointP.x + 16,
    y: Math.min(pointP.y - 28, midY + 4),
    anchor: onLeft ? ("end" as const) : ("start" as const),
  };
});

/** 共线时轨迹仍是直线（与 v 重合），不再单画轨迹 */
const collinear = computed(() => alpha.value === 0 || alpha.value === 180);

/** 恒力下的真实轨迹（抛物线）：起点切线沿 v，向 F 所指的一侧弯曲 */
const bend = computed(() => {
  if (collinear.value) return null;
  const end = {
    x: pointP.x + S_V + S_A * Math.cos(rad.value),
    y: pointP.y - S_A * Math.sin(rad.value),
  };
  return {
    d: `M ${pointP.x} ${pointP.y} Q ${pointP.x + C_DX} ${pointP.y} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
    end,
  };
});

/* ── 拖动 F 箭头改变 α（鼠标 / 触屏都走 pointer 事件）── */
const svgRef = ref<SVGSVGElement | null>(null);
const dragging = ref(false);

const toLocal = (event: PointerEvent): Point => {
  const rect = svgRef.value?.getBoundingClientRect();
  if (!rect) return pointP;
  return {
    x: ((event.clientX - rect.left) / rect.width) * VIEW_W,
    y: ((event.clientY - rect.top) / rect.height) * VIEW_H,
  };
};

const setAlphaFrom = (point: Point): void => {
  const deg = (Math.atan2(pointP.y - point.y, point.x - pointP.x) * 180) / Math.PI;
  alpha.value = Math.min(180, Math.max(0, Math.round(deg)));
};

const onDown = (event: PointerEvent): void => {
  dragging.value = true;
  setAlphaFrom(toLocal(event));
};

const onMove = (event: PointerEvent): void => {
  if (dragging.value) setAlphaFrom(toLocal(event));
};

const onUp = (): void => {
  dragging.value = false;
};

const conclusion = computed(() => {
  if (alpha.value === 0) return "共线：轨迹仍是直线，速率变大";
  if (alpha.value === 180) return "共线：轨迹仍是直线，速率变小";
  if (alpha.value < 90) return "速率变大，轨迹向合力一侧弯曲";
  if (alpha.value === 90) return "速率不变，方向时刻改变";
  return "速率变小，轨迹向合力一侧弯曲";
});

const tagClass = computed(() => {
  if (collinear.value || alpha.value === 90) return "fad-tag fad-tag-flat";
  return alpha.value < 90 ? "fad-tag fad-tag-up" : "fad-tag fad-tag-down";
});
</script>

<template>
  <div class="fad">
    <svg
      ref="svgRef"
      viewBox="0 0 880 250"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ 'fad-grabbing': dragging }"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointerleave="onUp"
    >
      <!-- 速度方向水平基准延长虚线（辅助观察共线与反向分量） -->
      <line
        :x1="pointP.x - F_LEN - 24"
        :y1="pointP.y"
        :x2="vTip.x + 12"
        :y2="pointP.y"
        stroke="#64748b"
        stroke-width="1.4"
        stroke-dasharray="5 5"
        opacity="0.35"
      />

      <!-- 真实抛物线轨迹（P 点切线沿 v，向合力一侧弯曲） -->
      <path
        v-if="bend"
        :d="bend.d"
        fill="none"
        stroke="#2dd4bf"
        stroke-width="3.2"
        stroke-dasharray="10 7"
        stroke-linecap="round"
        opacity="0.78"
      />
      <text
        v-if="bend"
        :x="bend.end.x + 12"
        :y="bend.end.y + 6"
        font-family="KaTeX_Main, sans-serif"
        font-size="19"
        font-weight="600"
        fill="#2dd4bf"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        轨迹
      </text>

      <!-- 正交分解投影虚线（仅当两个分量均非零时绘制矩形邻边） -->
      <template v-if="hasPar && hasPerp">
        <line
          :x1="perpTip.x"
          :y1="perpTip.y"
          :x2="fTip.x"
          :y2="fTip.y"
          stroke="#94a3b8"
          stroke-width="1.8"
          stroke-dasharray="6 5"
          opacity="0.58"
        />
        <line
          :x1="parTip.x"
          :y1="parTip.y"
          :x2="fTip.x"
          :y2="fTip.y"
          stroke="#94a3b8"
          stroke-width="1.8"
          stroke-dasharray="6 5"
          opacity="0.58"
        />
      </template>

      <!-- 紧贴交点 P 的 α 角扇形与弧线（r = 34） -->
      <template v-if="alpha > 2">
        <path :d="arc.sector" fill="rgba(241, 245, 249, 0.08)" />
        <path :d="arc.d" fill="none" stroke="#f1f5f9" stroke-width="2.2" opacity="0.88" />
      </template>
      <text
        v-if="alpha > 0"
        :x="arc.label.x"
        :y="arc.label.y"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="22"
        fill="#f1f5f9"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        α
      </text>

      <!-- 速度矢量 v（标签置于箭头尖端右侧，彻底避开下方水平分力文字） -->
      <CourseArrow :from="pointP" :to="vTip" stroke="#60a5fa" stroke-width="3.6" />
      <text
        :x="vTip.x + 14"
        :y="pointP.y + 6"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="22"
        fill="#60a5fa"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        v
      </text>

      <!-- 垂直 v 的分量箭头与外侧自适应标签 -->
      <CourseArrow
        v-if="hasPerp"
        :from="pointP"
        :to="perpTip"
        stroke="#e2a846"
        stroke-width="3"
        stroke-dasharray="8 5"
      />
      <text
        v-if="hasPerp"
        :x="perpLabel.x"
        :y="perpLabel.y"
        :text-anchor="perpLabel.anchor"
        font-family="KaTeX_Main, sans-serif"
        font-size="18"
        font-weight="600"
        fill="#e2a846"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        垂直 v 的分量
      </text>

      <!-- 沿 v 的分量箭头与正下方跟随标签 -->
      <CourseArrow
        v-if="hasPar"
        :from="pointP"
        :to="parTip"
        stroke="#e2a846"
        stroke-width="3"
        stroke-dasharray="8 5"
      />
      <text
        v-if="hasPar"
        :x="parLabelPos.x"
        :y="parLabelPos.y"
        text-anchor="middle"
        font-family="KaTeX_Main, sans-serif"
        font-size="18"
        font-weight="600"
        fill="#e2a846"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        沿 v 的分量
      </text>

      <!-- 合力矢量 F（标签置于箭头尖端外侧，与内侧 α 互不干扰） -->
      <CourseArrow :from="pointP" :to="fTip" stroke="#e2a846" stroke-width="4" />
      <text
        :x="fLabelPos.x"
        :y="fLabelPos.y"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        font-size="22"
        fill="#e2a846"
        text-anchor="middle"
        dominant-baseline="central"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        F
      </text>

      <!-- 质点 P 与合力末端可拖拽热区环 -->
      <circle
        :cx="pointP.x"
        :cy="pointP.y"
        r="8.5"
        fill="#f1f5f9"
        stroke="#0f1425"
        stroke-width="2"
      />
      <circle
        :cx="fTip.x"
        :cy="fTip.y"
        r="11"
        fill="rgba(226,168,70,0.20)"
        stroke="#e2a846"
        stroke-width="2"
      />
    </svg>
    <div class="fad-bar">
      <span class="fad-value">α = {{ alpha }}°</span>
      <span :class="tagClass">{{ conclusion }}</span>
    </div>
  </div>
</template>

<style scoped>
.fad {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  width: 100%;
  min-width: 0;
}

.fad svg {
  cursor: grab;
  touch-action: none;
}

.fad-grabbing {
  cursor: grabbing;
}

.fad-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.1rem;
  align-items: center;

  color: var(--c-text-dim, #94a3b8);

  font-size: 0.9rem;
}

.fad-hint {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
}

.fad-value {
  color: #f1f5f9;
  font-variant-numeric: tabular-nums;
}

.fad-tag {
  font-weight: 700;
}

.fad-tag-up {
  color: #2dd4bf;
}

.fad-tag-flat {
  color: #60a5fa;
}

.fad-tag-down {
  color: #f87171;
}
</style>
