<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 悬挂法找重心：薄板可以绕任意一个悬挂小孔自由转动，平衡时悬线的延长线（竖直线） 一定通过重心（二力平衡：绳的拉力与重力等大反向、共线）。
 * 组件把这条竖直线"画在板上"（铅笔痕），换一个孔再挂一次得到第二条痕， 两条痕的交点就是重心——完全几何计算，不做任何伪造。
 */

/** 薄板外形（局部坐标，SVG 用户单位；板在悬孔处与钉重合） */
const BOARD: readonly (readonly [number, number])[] = [
  [0, 0],
  [120, -28],
  [200, 20],
  [172, 120],
  [48, 136],
  [-16, 64],
];

/** 板上三个悬挂小孔（局部坐标） */
const HOLES: readonly { id: string; x: number; y: number }[] = [
  { id: "A", x: 32, y: 16 },
  { id: "B", x: 120, y: 112 },
  { id: "C", x: 164, y: 48 },
];

/** 固定不动的悬挂钉（世界坐标） */
const NAIL = { x: 280, y: 215 };

/** 还没悬挂时板摆放的位置（世界坐标） */
const IDLE = { x: 60, y: 250 };

/** 铅笔痕的延伸长度（两端各伸一段，交给板的裁剪路径收边） */
const MARK_HALF = 320;

/** 悬挂方式：把局部坐标旋转 θ、平移到世界坐标后，重心恰好落在钉的正下方 */
interface Placement {
  /** 旋转角（弧度） */
  theta: number;
  cos: number;
  sin: number;
  /** 平移量 */
  shiftX: number;
  shiftY: number;
}

const centroid = computed(() => {
  let area = 0;
  let centerX = 0;
  let centerY = 0;

  BOARD.forEach((point, index) => {
    const next = BOARD[(index + 1) % BOARD.length];
    const cross = point[0] * next[1] - next[0] * point[1];

    area += cross;
    centerX += (point[0] + next[0]) * cross;
    centerY += (point[1] + next[1]) * cross;
  });

  return { x: centerX / (3 * area), y: centerY / (3 * area) };
});

/**
 * 求在某个孔悬挂时板的位姿：让"孔 → 重心"的方向在世界上竖直向下
 *
 * @param hole 悬挂小孔（局部坐标）
 * @returns 旋转角与平移量
 */
const placementOf = (hole: { x: number; y: number }): Placement => {
  const { x: centerX, y: centerY } = centroid.value;
  const theta = Math.PI / 2 - Math.atan2(centerY - hole.y, centerX - hole.x);
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);

  return {
    theta,
    cos,
    sin,
    shiftX: NAIL.x - (hole.x * cos - hole.y * sin),
    shiftY: NAIL.y - (hole.x * sin + hole.y * cos),
  };
};

/**
 * 局部坐标 → 世界坐标
 *
 * @param point 局部坐标点
 * @param placement 当前位姿
 * @returns 世界坐标点
 */
const toWorld = (
  point: { x: number; y: number },
  placement: Placement,
): { x: number; y: number } => ({
  x: point.x * placement.cos - point.y * placement.sin + placement.shiftX,
  y: point.x * placement.sin + point.y * placement.cos + placement.shiftY,
});

/** 已经挂过的孔（按点击顺序） */
const picked = ref<string[]>([]);

/** 当前悬挂孔 */
const currentHole = computed(() => HOLES.find((hole) => hole.id === picked.value.at(-1)));

/** 当前位姿 */
const currentPlacement = computed(() =>
  currentHole.value ? placementOf(currentHole.value) : null,
);

/** 板上所有孔的当前世界位置（标签要跟着板走、但文字保持水平） */
const holeWorlds = computed(() => {
  const placement = currentPlacement.value;

  return HOLES.map((hole) => ({
    id: hole.id,
    x: placement ? toWorld(hole, placement).x : hole.x + IDLE.x,
    y: placement ? toWorld(hole, placement).y : hole.y + IDLE.y,
  }));
});

/** 板上已画的铅笔痕（局部坐标线段，随板一起转） */
const marks = computed(() =>
  picked.value.flatMap((id) => {
    const hole = HOLES.find((item) => item.id === id);

    if (!hole) return [];

    const { theta } = placementOf(hole);
    const dirX = Math.sin(theta);
    const dirY = Math.cos(theta);

    return [
      {
        id,
        x1: hole.x - dirX * MARK_HALF,
        y1: hole.y - dirY * MARK_HALF,
        x2: hole.x + dirX * MARK_HALF,
        y2: hole.y + dirY * MARK_HALF,
      },
    ];
  }),
);

/** 重心：板上所有痕都过它，两次悬挂后出现 */
const centerWorld = computed(() => {
  const placement = currentPlacement.value;

  return placement ? toWorld(centroid.value, placement) : null;
});

/**
 * 选一个孔悬挂（点过的不重复计入）
 *
 * @param id 孔的编号
 */
const hang = (id: string): void => {
  if (!picked.value.includes(id)) picked.value = [...picked.value, id];
};
</script>

<template>
  <div class="hb">
    <svg
      class="hb-svg"
      viewBox="0 0 560 430"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="用悬挂法确定薄板重心的演示"
    >
      <defs>
        <clipPath id="hb-clip">
          <polygon :points="BOARD.map((point) => point.join(',')).join(' ')" />
        </clipPath>
      </defs>
      <line
        x1="0"
        y1="215"
        x2="560"
        y2="215"
        stroke="#94a3b8"
        stroke-width="1"
        stroke-dasharray="4 6"
        opacity="0.22"
      />
      <g
        v-if="currentPlacement"
        :transform="`translate(${currentPlacement.shiftX} ${currentPlacement.shiftY}) rotate(${(currentPlacement.theta * 180) / Math.PI})`"
      >
        <polygon
          :points="BOARD.map((point) => point.join(',')).join(' ')"
          fill="rgba(148,163,184,0.14)"
          stroke="#cbd5e1"
          stroke-width="3"
        />
        <g clip-path="url(#hb-clip)" stroke="#e2a846" stroke-width="2.2" stroke-dasharray="9 6">
          <line
            v-for="mark in marks"
            :key="mark.id"
            :x1="mark.x1"
            :y1="mark.y1"
            :x2="mark.x2"
            :y2="mark.y2"
          />
        </g>
      </g>
      <g v-else>
        <polygon
          :points="BOARD.map((point) => point.join(',')).join(' ')"
          :transform="`translate(${IDLE.x} ${IDLE.y})`"
          fill="rgba(148,163,184,0.14)"
          stroke="#cbd5e1"
          stroke-width="3"
        />
      </g>
      <g>
        <template v-for="hole in holeWorlds" :key="hole.id">
          <circle
            :cx="hole.x"
            :cy="hole.y"
            r="16"
            fill="transparent"
            class="hb-hit"
            @click="hang(hole.id)"
          />
          <circle :cx="hole.x" :cy="hole.y" r="5" fill="none" stroke="#7dd3fc" stroke-width="2.4" />
          <text
            :x="hole.x + 12"
            :y="hole.y - 10"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
            fill="#7dd3fc"
          >
            {{ hole.id }}
          </text>
        </template>
      </g>
      <line
        :x1="NAIL.x"
        :y1="NAIL.y"
        :x2="NAIL.x"
        y2="428"
        stroke="#60a5fa"
        stroke-width="1.8"
        stroke-dasharray="7 6"
        opacity="0.75"
      />
      <g :transform="`translate(${NAIL.x} ${NAIL.y})`">
        <circle r="7" fill="#64748b" />
        <circle r="3" fill="#0f1425" />
      </g>
      <g v-if="centerWorld && picked.length >= 2">
        <circle
          :cx="centerWorld.x"
          :cy="centerWorld.y"
          r="7"
          fill="#f87171"
          stroke="#0f1425"
          stroke-width="2"
        />
        <text
          :x="centerWorld.x + 14"
          :y="centerWorld.y + 27"
          font-size="18"
          fill="#f87171"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          重心
          <tspan font-family="KaTeX_Math" font-style="italic">O</tspan>
        </text>
      </g>
      <line x1="0" y1="410" x2="560" y2="410" stroke="#94a3b8" stroke-width="2" opacity="0.25" />
    </svg>
    <div class="hb-bar">
      <span class="hb-hint">点击板上的小孔，分别悬挂两次</span>
      <button v-if="picked.length" class="hb-reset" type="button" @click="picked = []">重来</button>
    </div>
  </div>
</template>

<style scoped>
.hb {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;

  width: 100%;
}

.hb-svg {
  display: block;

  width: auto;
  max-width: 100%;
  height: 12.5rem;
  margin: 0 auto;
}

.hb-hit {
  cursor: pointer;
}

.hb-hit:hover + circle {
  stroke: #e2a846;
}

.hb-bar {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.hb-hint {
  color: var(--c-text-dim);
  font-size: 0.72rem;
}

.hb-reset {
  padding: 0.1rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 2rem;

  background: transparent;
  color: var(--c-text-dim);

  font-size: 0.72rem;

  cursor: pointer;
}

.hb-reset:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
}
</style>
