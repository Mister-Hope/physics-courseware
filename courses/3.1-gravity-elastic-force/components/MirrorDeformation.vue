<script setup lang="ts">
import { computed, ref } from "vue";

/**
 * 通过平面镜观察桌面的微小形变（光路放大法）。 两面小平面镜分别被铁架支在桌面上的 1/3、2/3 处（镜子只占上方一小段，下面是支架），
 * 激光笔平放在桌面最左侧：光束从左侧支架那一段下方穿过，先射到右边的小镜子， 再被左边的小镜子反射，最后打到墙上形成一个光点。 桌面未形变时两镜完全竖直、平行；挤压两镜之间的桌面 → 桌面下凹 →
 * 两镜上端向内靠拢一点， 每反射一次光线偏转 2θ、两次共 4θ，再乘上到墙的距离，光点就有肉眼可见的移动。
 */

const DEG = Math.PI / 180;

/** 两面小镜子的位置与镜面高度范围（下方是铁架支起来的部分） */
const MIRROR_L = 250;
const MIRROR_R = 420;
const MIRROR_TOP = 240;
const MIRROR_BOTTOM = 320;
const TABLE_Y = 420;

/** 激光笔：平放在桌面最左侧，光束略微向上倾斜 */
const AIM = 14;
const LASER = { x: 90, y: 380 };
/** 挤压到最大时两镜上端向内靠拢的角度；静息时两镜完全竖直、平行 */
const LEAN_PRESS = 1;

const WALL_X = 620;

const press = ref(0);

/**
 * 镜面方向（由镜面下端指向镜顶）
 *
 * @param betaDeg 镜面与竖直方向的夹角（度，正为上端向右偏）
 * @returns 镜面方向（单位向量）
 */
const uOf = (betaDeg: number): { x: number; y: number } => {
  const beta = betaDeg * DEG;

  return { x: Math.sin(beta), y: -Math.cos(beta) };
};

/**
 * 镜面法线
 *
 * @param betaDeg 镜面倾角（度）
 * @returns 法线（单位向量）
 */
const nOf = (betaDeg: number): { x: number; y: number } => {
  const beta = betaDeg * DEG;

  return { x: Math.cos(beta), y: Math.sin(beta) };
};

/**
 * 反射：d' = d − 2(d·n)n
 *
 * @param dir 入射方向（单位向量）
 * @param normal 镜面法线（单位向量）
 * @returns 反射方向
 */
const reflect = (
  dir: { x: number; y: number },
  normal: { x: number; y: number },
): { x: number; y: number } => {
  const dot = 2 * (dir.x * normal.x + dir.y * normal.y);

  return { x: dir.x - dot * normal.x, y: dir.y - dot * normal.y };
};

/**
 * 射线与"小镜面"（一段线段）求交
 *
 * @param origin 射线起点
 * @param dir 射线方向
 * @param baseX 镜面下端的横坐标
 * @param betaDeg 镜面倾角
 * @returns 交点与参数 t；不相交时为 null
 */
const hitMirror = (
  origin: { x: number; y: number },
  dir: { x: number; y: number },
  baseX: number,
  betaDeg: number,
): { point: { x: number; y: number }; t: number } | null => {
  const mirrorUnit = uOf(betaDeg);
  const den = dir.x * mirrorUnit.y - dir.y * mirrorUnit.x;

  if (Math.abs(den) < 1e-9) return null;

  const t = ((baseX - origin.x) * mirrorUnit.y - (MIRROR_BOTTOM - origin.y) * mirrorUnit.x) / den;

  if (t <= 1e-6) return null;

  const point = { x: origin.x + t * dir.x, y: origin.y + t * dir.y };
  const along = (point.x - baseX) * mirrorUnit.x + (point.y - MIRROR_BOTTOM) * mirrorUnit.y;

  // 只接受落在镜面上的交点：从镜面上方或下方掠过都不算
  if (along < 0 || along > MIRROR_BOTTOM - MIRROR_TOP) return null;

  return { point, t };
};

/**
 * 逐段求解整条光路
 *
 * @param leanDeg 两镜上端各自向内靠拢的角度（度）
 * @returns 折线顶点与墙上光点
 */
const traceOf = (
  leanDeg: number,
): { points: { x: number; y: number }[]; spot: { x: number; y: number } | null } => {
  const betaL = leanDeg;
  const betaR = -leanDeg;
  const points: { x: number; y: number }[] = [{ ...LASER }];
  let origin = { ...LASER };
  let dir = { x: Math.cos(AIM * DEG), y: -Math.sin(AIM * DEG) };

  for (let step = 0; step < 20; step += 1) {
    const candidates = [
      { beta: betaL, hit: hitMirror(origin, dir, MIRROR_L, betaL) },
      { beta: betaR, hit: hitMirror(origin, dir, MIRROR_R, betaR) },
    ]
      .filter(
        (item): item is { beta: number; hit: { point: { x: number; y: number }; t: number } } =>
          item.hit != null,
      )
      .sort((first, second) => first.hit.t - second.hit.t);

    if (candidates.length === 0) {
      // 不再碰到任何镜面：沿原方向飞向墙
      if (dir.x <= 0) return { points, spot: null };

      const toWall = (WALL_X - origin.x) / dir.x;
      const spot = { x: WALL_X, y: origin.y + toWall * dir.y };

      if (spot.y < 30 || spot.y > 410) return { points, spot: null };

      points.push(spot);

      return { points, spot };
    }

    const [{ beta, hit }] = candidates;

    points.push(hit.point);
    origin = hit.point;
    dir = reflect(dir, nOf(beta));
  }

  return { points, spot: null };
};

const trace = computed(() => traceOf(press.value * LEAN_PRESS));
/** 未挤压时的光点高度 */
const homeSpotY = computed(() => traceOf(0).spot?.y ?? TABLE_Y);
/** 光路的 SVG 路径 */
const rayPath = computed(() =>
  trace.value.points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" "),
);

/** 激光笔外壳（平放在桌面上的小矩形，略微上倾） */
const penCorners = computed(() => {
  const dirX = Math.cos(AIM * DEG);
  const dirY = -Math.sin(AIM * DEG);
  const perpX = -dirY;
  const perpY = dirX;
  const back = { x: LASER.x - 54 * dirX, y: LASER.y - 54 * dirY };
  const half = 7;

  return (
    [
      [LASER.x + half * perpX, LASER.y + half * perpY],
      [back.x + half * perpX, back.y + half * perpY],
      [back.x - half * perpX, back.y - half * perpY],
      [LASER.x - half * perpX, LASER.y - half * perpY],
    ] as [number, number][]
  )
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
});

/** 两面小镜子的镜面（含挤压后的微小内倾） */
const mirrorLines = computed(() => {
  const left = uOf(press.value * LEAN_PRESS);
  const right = uOf(-press.value * LEAN_PRESS);
  const height = MIRROR_BOTTOM - MIRROR_TOP;

  return [
    {
      x1: MIRROR_L,
      y1: MIRROR_BOTTOM,
      x2: MIRROR_L + height * left.x,
      y2: MIRROR_BOTTOM + height * left.y,
    },
    {
      x1: MIRROR_R,
      y1: MIRROR_BOTTOM,
      x2: MIRROR_R + height * right.x,
      y2: MIRROR_BOTTOM + height * right.y,
    },
  ];
});
</script>

<template>
  <div class="md">
    <svg
      class="md-svg"
      viewBox="0 0 660 470"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="光依次被两面小平面镜反射、把桌面微小形变放大的演示"
    >
      <rect :x="WALL_X" y="30" width="26" height="390" fill="rgba(148,163,184,0.16)" />
      <line :x1="WALL_X" y1="30" :x2="WALL_X" :y2="TABLE_Y" stroke="#94a3b8" stroke-width="2.4" />
      <text :x="WALL_X + 13" y="24" font-size="15" fill="#94a3b8" text-anchor="middle">墙</text>
      <line
        :x1="WALL_X"
        :y1="homeSpotY"
        :x2="WALL_X + 30"
        :y2="homeSpotY"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-dasharray="5 4"
      />
      <line x1="40" :y1="TABLE_Y" x2="560" :y2="TABLE_Y" stroke="#94a3b8" stroke-width="3" />
      <rect
        x="40"
        :y="TABLE_Y"
        width="520"
        height="20"
        rx="4"
        fill="rgba(148,163,184,0.22)"
        stroke="#64748b"
        stroke-width="1.6"
      />
      <rect x="120" :y="TABLE_Y + 20" width="16" height="28" fill="#475569" />
      <rect x="500" :y="TABLE_Y + 20" width="16" height="28" fill="#475569" />
      <text x="44" :y="TABLE_Y - 10" font-size="15" fill="#94a3b8">桌面</text>
      <CourseArrow
        :from="{ x: 335, y: 372 }"
        :to="{ x: 335, y: 414 }"
        stroke="#f87171"
        stroke-width="3"
      />
      <text x="347" y="392" font-size="16" fill="#f87171">挤压</text>
      <g fill="#64748b">
        <rect :x="MIRROR_L - 26" :y="TABLE_Y - 10" width="52" height="10" rx="3" />
        <rect
          :x="MIRROR_L - 4"
          :y="MIRROR_BOTTOM"
          width="8"
          :height="TABLE_Y - 10 - MIRROR_BOTTOM"
        />
        <rect :x="MIRROR_R - 26" :y="TABLE_Y - 10" width="52" height="10" rx="3" />
        <rect
          :x="MIRROR_R - 4"
          :y="MIRROR_BOTTOM"
          width="8"
          :height="TABLE_Y - 10 - MIRROR_BOTTOM"
        />
      </g>
      <line
        :x1="mirrorLines[0].x1"
        :y1="mirrorLines[0].y1"
        :x2="mirrorLines[0].x2"
        :y2="mirrorLines[0].y2"
        stroke="#7dd3fc"
        stroke-width="10"
        stroke-linecap="round"
      />
      <line
        :x1="mirrorLines[1].x1"
        :y1="mirrorLines[1].y1"
        :x2="mirrorLines[1].x2"
        :y2="mirrorLines[1].y2"
        stroke="#60a5fa"
        stroke-width="10"
        stroke-linecap="round"
      />
      <text
        :x="MIRROR_L - 10"
        y="232"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#7dd3fc"
        text-anchor="middle"
      >
        M
      </text>
      <text
        :x="MIRROR_R + 12"
        y="232"
        font-family="KaTeX_Math"
        font-style="italic"
        font-size="20"
        fill="#60a5fa"
        text-anchor="middle"
      >
        N
      </text>
      <polygon
        :points="penCorners"
        fill="rgba(226,168,70,0.25)"
        stroke="#e2a846"
        stroke-width="2.2"
      />
      <text x="30" y="360" font-size="15" fill="#e2a846">激光笔</text>
      <path :d="rayPath" fill="none" stroke="#e2a846" stroke-width="2.8" stroke-linejoin="round" />
      <circle v-if="trace.spot" :cx="trace.spot.x" :cy="trace.spot.y" r="7" fill="#f87171" />
      <circle :cx="WALL_X" :cy="homeSpotY" r="3.4" fill="#94a3b8" />
      <text
        v-if="trace.spot"
        :x="WALL_X - 10"
        :y="trace.spot.y + 6"
        font-size="17"
        fill="#f87171"
        text-anchor="end"
        stroke="#0f1425"
        stroke-width="3.5"
        paint-order="stroke"
      >
        光点
      </text>
    </svg>
    <div class="md-ctrl">
      <label class="md-label">
        <span>按压力度（轻 ↔ 重）</span>
        <input v-model.number="press" type="range" min="0" max="1" step="0.02" />
      </label>
    </div>
  </div>
</template>

<style scoped>
.md {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;

  width: 100%;
}

.md-svg {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.md-ctrl {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  align-items: center;

  width: 100%;
  max-width: 27rem;
}

.md-label {
  display: flex;
  gap: 0.7rem;
  align-items: center;

  width: 100%;

  color: var(--c-text-dim);

  font-size: 0.78rem;
}

.md-label input {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent);
}
</style>
