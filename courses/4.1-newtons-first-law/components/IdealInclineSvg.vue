<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed, onUnmounted, ref, watch } from "vue";

interface Point {
  x: number;
  y: number;
}

const { $clicks, $clicksContext, $page, $nav } = useSlideContext();

/** 轨道最低点交汇处（地面高度 y = 330）与左轨道上端起点 */
const VERTEX: Point = { x: 270, y: 330 };
const LEFT_TOP: Point = { x: 138, y: 138 };

/** 小球半径与轨道描边半宽：球心到轨道中心线的法向距离 OFFSET = 12 + 2.2 = 14.2，确保小球严格在轨道上方滚动而不穿模 */
const BALL_R = 12;
const TRACK_OFFSET = 14.2;

/** 释放点与右侧各轨道终点的球心等高线纵坐标 */
const SAME_Y = 152;

const HIGHLIGHT = "rgba(226,168,70,0.95)";
const DIM = "rgba(148,163,184,0.5)";

/** 小球沿左斜面滚到最低点的时间（秒） */
const ROLL_TIME = 1.15;
/** 最后一步：小球在水平面上永不停息匀速滚动的速度（viewBox 单位/秒） */
const SCROLL_SPEED = 420;

/** 右侧三条对接轨道上端顶点（略高于等高线 SAME_Y=152，使小球停在等高线时仍在轨道内侧，不悬空出界） */
const TRACKS: Point[] = [
  { x: 402, y: 138 },
  { x: 590, y: 138 },
  { x: 836, y: 138 },
];

/** 轨道编号标注位置 */
const TRACK_LABELS: { text: string; x: number; y: number }[] = [
  { text: "①", x: 396, y: 126 },
  { text: "②", x: 584, y: 126 },
  { text: "③", x: 830, y: 126 },
];

/** 地面斜剖线间距与屏幕内固定刻度池（通过取模循环平移实现无限滚动地面） */
const TICK_GAP = 56;
const GROUND_TICKS: number[] = Array.from({ length: 24 }, (_, index) => -56 + index * TICK_GAP);

/**
 * 计算从 start 到 end（从左往右，即 end.x >= start.x）有向线段的朝上单位法向量
 *
 * @param start 线段起点
 * @param end 线段终点
 * @returns 朝上的单位法向量
 */
const upwardNormal = (start: Point, end: Point): Point => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;

  return { x: dy / len, y: -dx / len };
};

/**
 * 求球心在平行的法向偏移轨道（距轨道 OFFSET）上，纵坐标恰为 targetY 时的精确位置
 *
 * @param from 轨道线段的起点
 * @param to 轨道线段的终点
 * @param normal 轨道的法向方向
 * @param targetY 目标纵坐标
 * @returns 球心坐标
 */
const ballCenterAtY = (from: Point, to: Point, normal: Point, targetY: number): Point => {
  const baseFrom: Point = {
    x: from.x + normal.x * TRACK_OFFSET,
    y: from.y + normal.y * TRACK_OFFSET,
  };
  const dy = to.y - from.y;
  const t = Math.abs(dy) > 1e-6 ? (targetY - baseFrom.y) / dy : 0;

  return {
    x: baseFrom.x + (to.x - from.x) * t,
    y: targetY,
  };
};

/**
 * 求球心在左斜面（法向 normalLeft）与右斜面/水平面（法向 normalRight）交汇谷底处的精确角平分线切点： 在该点处球心到左、右两轨道的垂直距离均严格等于 TRACK_OFFSET
 *
 * @param normalLeft 左斜面的单位法向量
 * @param normalRight 右斜面 / 水平面的单位法向量
 * @returns 谷底处的球心坐标
 */
const cornerBallCenter = (normalLeft: Point, normalRight: Point): Point => {
  const denom = 1 + normalLeft.x * normalRight.x + normalLeft.y * normalRight.y || 1;

  return {
    x: VERTEX.x + (TRACK_OFFSET * (normalLeft.x + normalRight.x)) / denom,
    y: VERTEX.y + (TRACK_OFFSET * (normalLeft.y + normalRight.y)) / denom,
  };
};

const nLeft = upwardNormal(LEFT_TOP, VERTEX);
const nHoriz: Point = { x: 0, y: -1 };

/** 左侧释放点球心坐标（y 严格落在 SAME_Y = 152） */
const releaseBall: Point = ballCenterAtY(VERTEX, LEFT_TOP, nLeft, SAME_Y);

/** 右侧三条轨道在等高线 SAME_Y = 152 处的球心坐标 */
const targetBalls: Point[] = TRACKS.map((track) => {
  const nRight = upwardNormal(VERTEX, track);

  return ballCenterAtY(VERTEX, track, nRight, SAME_Y);
});

interface Stage {
  /** 小球球心在这一步走的真实折线（严格悬浮于轨道表面上方 TRACK_OFFSET） */
  path: Point[];
  /** 滚完这条折线的时间（秒） */
  duration: number;
  /** 是否让小球在水平面上无限匀速滚下去（最后一步） */
  scroll: boolean;
}

const STAGES: Stage[] = [
  {
    path: [releaseBall, cornerBallCenter(nLeft, upwardNormal(VERTEX, TRACKS[0])), targetBalls[0]],
    duration: 1.5,
    scroll: false,
  },
  {
    path: [releaseBall, cornerBallCenter(nLeft, upwardNormal(VERTEX, TRACKS[1])), targetBalls[1]],
    duration: 1.9,
    scroll: false,
  },
  {
    path: [releaseBall, cornerBallCenter(nLeft, upwardNormal(VERTEX, TRACKS[2])), targetBalls[2]],
    duration: 2.3,
    scroll: false,
  },
  {
    path: [releaseBall, cornerBallCenter(nLeft, nHoriz)],
    duration: ROLL_TIME,
    scroll: true,
  },
];

// 本页的一次点击 = 一次演示：$clicks = 0 时静止，之后依次是三条轨道，最后一次是水平面无限匀速滚动
const step = computed(() => Math.max(0, Math.min($clicks.value - 1, STAGES.length - 1)));
const stage = computed(() => STAGES[step.value]);

const elapsed = ref(0);
let raf = 0;
let startTime = 0;

/**
 * 按物理加减速规律映射弧长比例（下坡匀加速、上坡匀减速至 0，最后一步下坡加速后无缝衔接水平匀速）
 *
 * @param linearRatio 线性弧长比例
 * @param isScrollStage 是否为滚动阶段
 * @returns 映射后的弧长比例
 */
const easedRatio = (linearRatio: number, isScrollStage: boolean): number => {
  const r = Math.max(0, Math.min(1, linearRatio));

  if (isScrollStage) return r * r;

  return r < 0.5 ? 2 * r * r : 1 - 2 * (1 - r) * (1 - r);
};

/**
 * 按弧长在折线上取点
 *
 * @param path 折线顶点（首尾相连）
 * @param ratio 目标点占折线总长的比例
 * @returns 折线上的点坐标
 */
const posAt = (path: Point[], ratio: number): Point => {
  const segments = path.slice(0, -1).map((point, index) => ({ from: point, to: path[index + 1] }));
  const lengths = segments.map((segment) => Math.hypot(segment.to.x - segment.from.x, segment.to.y - segment.from.y));
  const total = lengths.reduce((sum, length) => sum + length, 0) || 1;
  let remain = Math.max(0, Math.min(1, ratio)) * total;

  for (let index = 0; index < segments.length; index += 1) {
    if (remain <= lengths[index] || index === segments.length - 1) {
      const share = lengths[index] ? Math.min(1, remain / lengths[index]) : 1;

      return {
        x: segments[index].from.x + (segments[index].to.x - segments[index].from.x) * share,
        y: segments[index].from.y + (segments[index].to.y - segments[index].from.y) * share,
      };
    }

    remain -= lengths[index];
  }

  return path[path.length - 1];
};

const rawRatio = computed(() => Math.min(1, elapsed.value / stage.value.duration));
const rollRatio = computed(() => easedRatio(rawRatio.value, stage.value.scroll));
const ball = computed<Point>(() => posAt(stage.value.path, rollRatio.value));

/** 最后一步水平匀速滚动的累计距离（不设上限，持续增长） */
const continuousOffset = computed(() => {
  if (!stage.value.scroll) return 0;

  return Math.max(0, elapsed.value - ROLL_TIME) * SCROLL_SPEED;
});

/** 斜面与“同一高度”虚线向左移出画面的位移（完全移出左边界 1200px 后固定即可） */
const sceneOffset = computed(() => Math.min(1200, continuousOffset.value));

/** 地面斜剖线通过取模循环左移：实现永不枯竭的无尽地面滚动 */
const groundTickOffset = computed(() => continuousOffset.value % TICK_GAP);

/** 最后一步水平轨迹线的左起点横坐标 */
const horizTrailStartX = computed(() => Math.max(-20, ball.value.x - continuousOffset.value));

/** 小球滚动自转角度（度）：随滚过弧长与水平无尽位移持续旋转 */
const ballAngle = computed(() => {
  const { path } = stage.value;
  let totalLen = 0;

  for (let index = 0; index < path.length - 1; index += 1) totalLen += Math.hypot(path[index + 1].x - path[index].x, path[index + 1].y - path[index].y);

  const dist = totalLen * rollRatio.value + continuousOffset.value;

  return (dist / BALL_R) * (180 / Math.PI);
});

/** 小球已经滚过的球心轨迹 */
const trailPoints = computed(() => {
  const samples = 28;
  const points: string[] = [];

  for (let index = 0; index <= samples; index += 1) {
    const point = posAt(stage.value.path, (rollRatio.value * index) / samples);

    points.push(`${point.x},${point.y}`);
  }

  return points.join(" ");
});

const isHorizontal = computed(() => step.value === STAGES.length - 1);
const groundStroke = computed(() => (isHorizontal.value ? HIGHLIGHT : DIM));
const groundWidth = computed(() => (isHorizontal.value ? 4.8 : 3));
const trackStroke = (index: number): string => (step.value === index ? HIGHLIGHT : DIM);
const trackWidth = (index: number): number => (step.value === index ? 4.8 : 3);
const trackLabelColor = (index: number): string => (step.value === index ? "#e2a846" : "#64748b");

const tick = (now: number): void => {
  const currentStage = stage.value;

  if (currentStage.scroll) {
    // 最后一步（水平面）：时间不封顶，让地面斜线与小球永远匀速滚动下去
    elapsed.value = (now - startTime) / 1000;
    raf = requestAnimationFrame(tick);
  } else {
    elapsed.value = Math.min(currentStage.duration, (now - startTime) / 1000);
    if (elapsed.value < currentStage.duration) raf = requestAnimationFrame(tick);
  }
};

/** 播放本步的演示：小球从出发点滚下，沿当前轨道上升（或水平无限滚下去） */
const run = (): void => {
  cancelAnimationFrame(raf);
  elapsed.value = 0;
  startTime = performance.now();
  raf = requestAnimationFrame(tick);
};

/** 回到出发点（还没开始演示时） */
const reset = (): void => {
  cancelAnimationFrame(raf);
  elapsed.value = 0;
};

const advance = (): void => {
  if ($page.value !== $nav.value.currentSlideNo) return;
  if ($clicks.value < $clicksContext.total) void $nav.value.next();
};

watch($clicks, () => {
  if ($clicks.value > 0) run();
  else reset();
});
onUnmounted(() => cancelAnimationFrame(raf));
</script>

<template>
  <!-- 第 5 页：伽利略理想斜面实验——三条轨道逐条演示；最后小球在水平面上永不停息地匀速滚下去 -->
  <svg class="fig-incline" viewBox="0 100 1120 260" xmlns="http://www.w3.org/2000/svg" @click="advance">
    <!-- 1. 无限长水平地面主线与循环左移的地面斜剖线（实现无尽轨道效果） -->
    <g :transform="`translate(${-groundTickOffset}, 0)`" stroke="rgba(148,163,184,0.32)" stroke-width="1.6" stroke-linecap="round">
      <line v-for="tx in GROUND_TICKS" :key="`tick-${tx}`" :x1="tx" :y1="330" :x2="tx - 10" :y2="342" />
    </g>
    <line x1="-40" y1="330" x2="1160" y2="330" :stroke="groundStroke" :stroke-width="groundWidth" stroke-linecap="round" />

    <!-- 2. 斜面轨道组（最后一步随 sceneOffset 平滑移出左边界） -->
    <g :transform="`translate(${-sceneOffset}, 0)`">
      <!-- 左侧斜面三角底座暗影衬托 -->
      <polygon :points="`${LEFT_TOP.x},${LEFT_TOP.y} ${LEFT_TOP.x},${VERTEX.y} ${VERTEX.x},${VERTEX.y}`" fill="rgba(148,163,184,0.08)" />
      <line :x1="LEFT_TOP.x" :y1="LEFT_TOP.y" :x2="LEFT_TOP.x" :y2="VERTEX.y" stroke="rgba(148,163,184,0.25)" stroke-width="1.6" stroke-dasharray="5 4" />

      <!-- 左侧释放斜面轨道 -->
      <line :x1="LEFT_TOP.x" :y1="LEFT_TOP.y" :x2="VERTEX.x" :y2="VERTEX.y" stroke="rgba(203,213,225,0.82)" stroke-width="4.4" stroke-linecap="round" />

      <!-- 右侧三条不同倾角的对接斜面轨道及序号标注 -->
      <line
        v-for="(track, i) in TRACKS"
        :key="`track-${track.x}`"
        :x1="VERTEX.x"
        :y1="VERTEX.y"
        :x2="track.x"
        :y2="track.y"
        :stroke="trackStroke(i)"
        :stroke-width="trackWidth(i)"
        stroke-linecap="round"
      />
      <text
        v-for="(item, i) in TRACK_LABELS"
        :key="`label-${item.text}`"
        :x="item.x"
        :y="item.y"
        font-size="16"
        :fill="trackLabelColor(i)"
        text-anchor="middle"
      >
        {{ item.text }}
      </text>

      <!-- “同一高度”水平虚线与完整文字标注 -->
      <line :x1="releaseBall.x" :y1="SAME_Y" x2="942" :y2="SAME_Y" stroke="rgba(226,168,70,0.45)" stroke-width="2" stroke-dasharray="8 6" />
      <text x="956" :y="SAME_Y + 7" font-size="21" fill="#e2a846" font-weight="600">同一高度</text>

      <!-- 释放点与三条轨道最高点的球心等高虚线圆环 -->
      <circle
        :cx="releaseBall.x"
        :cy="releaseBall.y"
        :r="BALL_R"
        fill="rgba(226,168,70,0.08)"
        stroke="rgba(226,168,70,0.6)"
        stroke-width="2"
        stroke-dasharray="5 4"
      />
      <circle
        v-for="(target, i) in targetBalls"
        :key="`dot-${target.x}`"
        :cx="target.x"
        :cy="target.y"
        :r="BALL_R"
        fill="none"
        :stroke="trackStroke(i)"
        stroke-width="2"
        stroke-dasharray="5 4"
      />

      <!-- 小球球心滚过的轨迹线 -->
      <polyline
        :points="trailPoints"
        fill="none"
        stroke="rgba(226,168,70,0.5)"
        stroke-width="3.2"
        stroke-dasharray="6 5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- 3. 最后一步在水平面上滚过留下的水平延伸轨迹虚线 -->
    <line
      v-if="isHorizontal && continuousOffset > 0"
      :x1="horizTrailStartX"
      :y1="ball.y"
      :x2="ball.x"
      :y2="ball.y"
      stroke="rgba(226,168,70,0.5)"
      stroke-width="3.2"
      stroke-dasharray="6 5"
      stroke-linecap="round"
    />

    <!-- 4. 在轨道上方持续滚动的立体金属小球 -->
    <g :transform="`translate(${ball.x}, ${ball.y})`">
      <circle :r="BALL_R" fill="#e2a846" stroke="#fef08a" stroke-width="1.5" />
      <g :transform="`rotate(${ballAngle})`">
        <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(15,20,37,0.45)" stroke-width="1.8" stroke-linecap="round" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(15,20,37,0.45)" stroke-width="1.8" stroke-linecap="round" />
      </g>
      <circle cx="-3.5" cy="-4" r="3" fill="rgba(255,255,255,0.65)" />
    </g>
  </svg>
</template>

<style scoped>
.fig-incline {
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
