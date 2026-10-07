<script setup lang="ts">
import { computed, ref, useId } from "vue";

/**
 * 通过平面镜观察桌面的微小形变（光路放大法）。 两面小平面镜 M、N 分别固定在铁架上，置于桌面 1/3、2/3 处（镜子位于支架上方，下方为镂空立柱），
 * 激光笔平放在桌面左侧底座上：光束从左侧支架下方镂空处穿过，先射向右侧平面镜 N， 再反射至左侧平面镜 M，最后打在右侧墙面（光屏）上形成光点。 当向下按压两镜之间的桌面时：
 *
 * 1. 按压箭头随按压力度向下移动并拉长；
 * 2. 两桌腿之间的桌面发生微小弹性下凹；
 * 3. 左右两座平面镜连同各自的底座与支架整体随桌面切线向内偏转 θ；
 * 4. 经两次反射后光线偏转 4θ，墙上光点产生肉眼清晰可见的大幅下移。
 */

const uid = useId();
const DEG = Math.PI / 180;

/** 两面小镜子底座在桌面上的横坐标与镜面高度范围 */
const MIRROR_L = 250;
const MIRROR_R = 420;
const MIRROR_TOP = 240;
const MIRROR_BOTTOM = 320;
const TABLE_Y = 420;

/** 激光笔出光口坐标与仰角 */
const AIM = 14;
const LASER = { x: 90, y: 380 };
/** 光学反射偏角上限（1° 经两次反射放大 4θ 后在墙上产生约 66px 位移） */
const LEAN_PRESS = 1;
/** 支架+镜面整体的视觉倾角放大上限（度），让肉眼能清晰看到“镜子带着支架一起随桌面内倾” */
const VISUAL_TILT_MAX = 3.6;
/** 桌面中心最大弹性下凹量（用户单位） */
const SAG_MAX = 7.5;

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

/** 桌面在中心挤压下的下凹量与两侧镜座处的沉降 */
const centerSag = computed(() => press.value * SAG_MAX);
const mirrorBaseSag = computed(() => press.value * SAG_MAX * 0.56);

/** 支架与镜子整体绕桌面底座中心旋转的视觉角度（度）：左镜顺时针(+)，右镜逆时针(-) */
const visualTiltDeg = computed(() => press.value * VISUAL_TILT_MAX);

/**
 * 计算旋转后的镜面在指定 y 高度处的反射面精确横坐标，使激光束折点严丝合缝落在随支架一起倾斜的镜面上。
 *
 * @param side 左镜（"L"）或右镜（"R"）
 * @param y 目标点的纵坐标
 * @returns 该高度处镜面的横坐标
 */
const mirrorSurfaceXAtY = (side: "L" | "R", y: number): number => {
  const baseX = side === "L" ? MIRROR_L : MIRROR_R;
  const baseY = TABLE_Y + mirrorBaseSag.value;
  const angleRad = (side === "L" ? visualTiltDeg.value : -visualTiltDeg.value) * DEG;
  // 旋转后局部坐标 (x=0, y_local = y - baseY) 对应的全局 x 坐标
  return baseX - (y - baseY) * Math.sin(angleRad);
};

const trace = computed(() => {
  const raw = traceOf(press.value * LEAN_PRESS);
  const adjustedPoints = raw.points.map((point, idx) => {
    // 第 1 个反射点在右镜 N，第 2 个反射点在左镜 M
    if (idx === 1) return { x: mirrorSurfaceXAtY("R", point.y), y: point.y };

    if (idx === 2) return { x: mirrorSurfaceXAtY("L", point.y), y: point.y };

    return point;
  });
  return {
    points: adjustedPoints,
    spot: raw.spot,
  };
});

/** 未挤压时的光点高度 */
const homeSpotY = computed(() => traceOf(0).spot?.y ?? TABLE_Y);

/** 光路的 SVG 路径 */
const rayPath = computed(() =>
  trace.value.points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" "),
);

/** 光路各段中点方向箭头（帮助看清“激光笔 → 右镜 N → 左镜 M → 墙面光点”的传播次序） */
const rayArrows = computed(() => {
  const pts = trace.value.points;
  const list: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
  for (let i = 0; i < pts.length - 1; i += 1) {
    const a = pts[i];
    const b = pts[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    list.push({
      from: { x: mx - (dx / len) * 8, y: my - (dy / len) * 8 },
      to: { x: mx + (dx / len) * 8, y: my + (dy / len) * 8 },
    });
  }
  return list;
});

/** 桌面弹性下凹路径（两桌腿 x=128 与 x=508 之间随按压发生平滑弯曲） */
const tableSurfacePath = computed(() => {
  const sag = centerSag.value;
  const topY = TABLE_Y;
  const botY = TABLE_Y + 20;
  return `M 40 ${topY} L 128 ${topY} Q 335 ${(topY + sag * 1.9).toFixed(1)} 508 ${topY} L 560 ${topY} L 560 ${botY} L 508 ${botY} Q 335 ${(botY + sag * 1.9).toFixed(1)} 128 ${botY} L 40 ${botY} Z`;
});

const tableTopEdgePath = computed(() => {
  const sag = centerSag.value;
  return `M 40 ${TABLE_Y} L 128 ${TABLE_Y} Q 335 ${(TABLE_Y + sag * 1.9).toFixed(1)} 508 ${TABLE_Y} L 560 ${TABLE_Y}`;
});

/** 按压箭头动态位置： 随 press (0 → 1) 整体向下推进，且箭头长度略微伸长，直观表现“越压越往下使劲” */
const pressArrow = computed(() => {
  const pressValue = press.value;
  const tipY = TABLE_Y - 4 + centerSag.value;
  const fromY = 352 + pressValue * 8;
  return {
    from: { x: 335, y: fromY },
    to: { x: 335, y: tipY },
    labelY: (fromY + tipY) / 2 + 4,
  };
});

/** 激光笔外壳局部变换（平放在桌面左侧倾角支架上） */
const laserTransform = `translate(${LASER.x} ${LASER.y}) rotate(${-AIM})`;
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
      <defs>
        <!-- 桌面木纹/实验台面渐变 -->
        <linearGradient :id="`mdTable-${uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(148,163,184,0.34)" />
          <stop offset="50%" stop-color="rgba(100,116,139,0.26)" />
          <stop offset="100%" stop-color="rgba(51,65,85,0.42)" />
        </linearGradient>

        <!-- 铁架台金属立柱与底座渐变 -->
        <linearGradient :id="`mdStand-${uid}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="45%" stop-color="#94a3b8" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>

        <!-- 平面镜玻璃反射面高光渐变 -->
        <linearGradient :id="`mdMirrorM-${uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#bae6fd" />
          <stop offset="50%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#0284c7" />
        </linearGradient>
        <linearGradient :id="`mdMirrorN-${uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#93c5fd" />
          <stop offset="50%" stop-color="#60a5fa" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>

        <!-- 墙上激光光点径向发光 -->
        <radialGradient :id="`mdSpotGlow-${uid}`" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(254,202,202,1)" />
          <stop offset="38%" stop-color="rgba(248,113,113,0.85)" />
          <stop offset="100%" stop-color="rgba(248,113,113,0)" />
        </radialGradient>

        <!-- 墙面斜剖面纹理 -->
        <pattern
          :id="`mdWallHatch-${uid}`"
          width="10"
          height="10"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(148,163,184,0.24)" stroke-width="1.4" />
        </pattern>
      </defs>

      <!-- 右侧墙面（带剖面斜线与刻度标尺） -->
      <rect :x="WALL_X" y="30" width="26" height="390" fill="rgba(148,163,184,0.10)" />
      <rect :x="WALL_X" y="30" width="26" height="390" :fill="`url(#mdWallHatch-${uid})`" />
      <line :x1="WALL_X" y1="30" :x2="WALL_X" :y2="TABLE_Y" stroke="#cbd5e1" stroke-width="2.4" />
      <text
        :x="WALL_X + 13"
        y="22"
        font-size="15"
        font-weight="600"
        fill="#cbd5e1"
        text-anchor="middle"
      >
        墙
      </text>

      <!-- 未受挤压时的光点基准水平虚线与空心参考点 -->
      <line
        :x1="WALL_X - 18"
        :y1="homeSpotY"
        :x2="WALL_X + 28"
        :y2="homeSpotY"
        stroke="#94a3b8"
        stroke-width="1.4"
        stroke-dasharray="4 4"
      />
      <circle
        :cx="WALL_X"
        :cy="homeSpotY"
        r="4"
        fill="#0f1425"
        stroke="#94a3b8"
        stroke-width="1.8"
      />
      <text
        v-if="press > 0.06"
        :x="WALL_X - 12"
        :y="homeSpotY - 6"
        font-size="12"
        fill="#94a3b8"
        text-anchor="end"
      >
        原光点
      </text>

      <!-- 桌腿（支撑在 x=120 与 x=500 处） -->
      <rect
        x="118"
        :y="TABLE_Y + 18"
        width="18"
        height="30"
        rx="2"
        fill="#334155"
        stroke="#64748b"
        stroke-width="1.4"
      />
      <rect
        x="500"
        :y="TABLE_Y + 18"
        width="18"
        height="30"
        rx="2"
        fill="#334155"
        stroke="#64748b"
        stroke-width="1.4"
      />

      <!-- 未变形前的桌面水平基准虚线（按压时对比看出桌面下凹） -->
      <line
        v-if="press > 0.02"
        x1="128"
        :y1="TABLE_Y"
        x2="508"
        :y2="TABLE_Y"
        stroke="rgba(148,163,184,0.4)"
        stroke-width="1.4"
        stroke-dasharray="6 5"
      />

      <!-- 桌面本体（随按压力度产生平滑弹性下凹形变） -->
      <path
        :d="tableSurfacePath"
        :fill="`url(#mdTable-${uid})`"
        stroke="#64748b"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path
        :d="tableTopEdgePath"
        fill="none"
        stroke="#cbd5e1"
        stroke-width="2.6"
        stroke-linecap="round"
      />
      <text x="44" :y="TABLE_Y - 10" font-size="15" font-weight="600" fill="#94a3b8">桌面</text>

      <!-- 两座镜架未偏转前的竖直基准虚线（清晰衬托“镜子连同支架一起向内倾斜”） -->
      <line
        v-if="press > 0.02"
        :x1="MIRROR_L"
        :y1="MIRROR_TOP - 14"
        :x2="MIRROR_L"
        :y2="TABLE_Y"
        stroke="rgba(125,211,252,0.32)"
        stroke-width="1.3"
        stroke-dasharray="4 4"
      />
      <line
        v-if="press > 0.02"
        :x1="MIRROR_R"
        :y1="MIRROR_TOP - 14"
        :x2="MIRROR_R"
        :y2="TABLE_Y"
        stroke="rgba(96,165,250,0.32)"
        stroke-width="1.3"
        stroke-dasharray="4 4"
      />

      <!-- ==================== 左侧平面镜 M 与支架总成（绕桌面底座整体顺时针内倾） ==================== -->
      <g
        :transform="`translate(${MIRROR_L} ${(TABLE_Y + mirrorBaseSag).toFixed(2)}) rotate(${visualTiltDeg.toFixed(2)})`"
      >
        <!-- 铁架台配重底座（紧贴桌面） -->
        <path
          d="M -26 0 L -22 -9 L 22 -9 L 26 0 Z"
          :fill="`url(#mdStand-${uid})`"
          stroke="#94a3b8"
          stroke-width="1.3"
          stroke-linejoin="round"
        />
        <!-- 底座锁紧螺母 -->
        <rect x="-6" y="-13" width="12" height="4" rx="1.5" fill="#94a3b8" />

        <!-- 下方双侧镂空支架立柱（中间留出通光窗口，让激光从下方穿过而不穿模！） -->
        <rect
          x="-4.5"
          :y="MIRROR_BOTTOM - TABLE_Y"
          width="3"
          :height="TABLE_Y - MIRROR_BOTTOM - 9"
          fill="#64748b"
        />
        <rect
          x="1.5"
          :y="MIRROR_BOTTOM - TABLE_Y"
          width="3"
          :height="TABLE_Y - MIRROR_BOTTOM - 9"
          fill="#475569"
        />
        <!-- 通光孔上下横梁 -->
        <rect x="-6" :y="MIRROR_BOTTOM - TABLE_Y" width="12" height="4" rx="1.5" fill="#94a3b8" />
        <rect x="-5.5" y="-28" width="11" height="3.5" rx="1" fill="#64748b" />

        <!-- 平面镜 M 金属背板与上下卡爪（反射面在 x=0 朝右，背板在左侧 x<0） -->
        <rect
          x="-6.5"
          :y="MIRROR_TOP - TABLE_Y - 2"
          width="5"
          :height="MIRROR_BOTTOM - MIRROR_TOP + 4"
          rx="1.5"
          fill="#334155"
          stroke="#64748b"
          stroke-width="1"
        />
        <!-- 光学平面镜背剖面斜线（表示左侧为镜背、右侧为反射面） -->
        <g stroke="#7dd3fc" stroke-width="1.2" opacity="0.55">
          <line x1="-6.5" :y1="MIRROR_TOP - TABLE_Y + 6" x2="-12" :y2="MIRROR_TOP - TABLE_Y + 12" />
          <line
            x1="-6.5"
            :y1="MIRROR_TOP - TABLE_Y + 20"
            x2="-12"
            :y2="MIRROR_TOP - TABLE_Y + 26"
          />
          <line
            x1="-6.5"
            :y1="MIRROR_TOP - TABLE_Y + 34"
            x2="-12"
            :y2="MIRROR_TOP - TABLE_Y + 40"
          />
          <line
            x1="-6.5"
            :y1="MIRROR_TOP - TABLE_Y + 48"
            x2="-12"
            :y2="MIRROR_TOP - TABLE_Y + 54"
          />
          <line
            x1="-6.5"
            :y1="MIRROR_TOP - TABLE_Y + 62"
            x2="-12"
            :y2="MIRROR_TOP - TABLE_Y + 68"
          />
        </g>

        <!-- 平面镜 M 高反射镀膜镜面 -->
        <rect
          x="-2.5"
          :y="MIRROR_TOP - TABLE_Y"
          width="5"
          :height="MIRROR_BOTTOM - MIRROR_TOP"
          rx="2"
          :fill="`url(#mdMirrorM-${uid})`"
        />
        <line
          x1="1.8"
          :y1="MIRROR_TOP - TABLE_Y + 2"
          x2="1.8"
          :y2="MIRROR_BOTTOM - TABLE_Y - 2"
          stroke="#e0f2fe"
          stroke-width="1.5"
          stroke-linecap="round"
        />

        <!-- 镜顶标签 M（随镜架一同偏转） -->
        <text
          x="-6"
          :y="MIRROR_TOP - TABLE_Y - 10"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="20"
          fill="#7dd3fc"
          text-anchor="middle"
        >
          M
        </text>
      </g>

      <!-- ==================== 右侧平面镜 N 与支架总成（绕桌面底座整体逆时针内倾） ==================== -->
      <g
        :transform="`translate(${MIRROR_R} ${(TABLE_Y + mirrorBaseSag).toFixed(2)}) rotate(${(-visualTiltDeg).toFixed(2)})`"
      >
        <!-- 铁架台配重底座（紧贴桌面） -->
        <path
          d="M -26 0 L -22 -9 L 22 -9 L 26 0 Z"
          :fill="`url(#mdStand-${uid})`"
          stroke="#94a3b8"
          stroke-width="1.3"
          stroke-linejoin="round"
        />
        <rect x="-6" y="-13" width="12" height="4" rx="1.5" fill="#94a3b8" />

        <!-- 支架立柱 -->
        <rect
          x="-3.5"
          :y="MIRROR_BOTTOM - TABLE_Y"
          width="7"
          :height="TABLE_Y - MIRROR_BOTTOM - 9"
          :fill="`url(#mdStand-${uid})`"
        />
        <rect x="-6" :y="MIRROR_BOTTOM - TABLE_Y" width="12" height="4" rx="1.5" fill="#94a3b8" />

        <!-- 平面镜 N 金属背板（反射面在 x=0 朝左，背板在右侧 x>0） -->
        <rect
          x="1.5"
          :y="MIRROR_TOP - TABLE_Y - 2"
          width="5"
          :height="MIRROR_BOTTOM - MIRROR_TOP + 4"
          rx="1.5"
          fill="#334155"
          stroke="#64748b"
          stroke-width="1"
        />
        <!-- 光学平面镜背剖面斜线（表示右侧为镜背、左侧为反射面） -->
        <g stroke="#60a5fa" stroke-width="1.2" opacity="0.55">
          <line x1="6.5" :y1="MIRROR_TOP - TABLE_Y + 6" x2="12" :y2="MIRROR_TOP - TABLE_Y + 12" />
          <line x1="6.5" :y1="MIRROR_TOP - TABLE_Y + 20" x2="12" :y2="MIRROR_TOP - TABLE_Y + 26" />
          <line x1="6.5" :y1="MIRROR_TOP - TABLE_Y + 34" x2="12" :y2="MIRROR_TOP - TABLE_Y + 40" />
          <line x1="6.5" :y1="MIRROR_TOP - TABLE_Y + 48" x2="12" :y2="MIRROR_TOP - TABLE_Y + 54" />
          <line x1="6.5" :y1="MIRROR_TOP - TABLE_Y + 62" x2="12" :y2="MIRROR_TOP - TABLE_Y + 68" />
        </g>

        <!-- 平面镜 N 高反射镀膜镜面 -->
        <rect
          x="-2.5"
          :y="MIRROR_TOP - TABLE_Y"
          width="5"
          :height="MIRROR_BOTTOM - MIRROR_TOP"
          rx="2"
          :fill="`url(#mdMirrorN-${uid})`"
        />
        <line
          x1="-1.8"
          :y1="MIRROR_TOP - TABLE_Y + 2"
          x2="-1.8"
          :y2="MIRROR_BOTTOM - TABLE_Y - 2"
          stroke="#dbeafe"
          stroke-width="1.5"
          stroke-linecap="round"
        />

        <!-- 镜顶标签 N（随镜架一同偏转） -->
        <text
          x="8"
          :y="MIRROR_TOP - TABLE_Y - 10"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          font-size="20"
          fill="#60a5fa"
          text-anchor="middle"
        >
          N
        </text>
      </g>

      <!-- ==================== 桌面左侧激光笔与底座 ==================== -->
      <!-- 激光笔桌面固定楔形托架 -->
      <path
        d="M 42 420 L 48 394 L 84 385 L 90 420 Z"
        fill="#334155"
        stroke="#64748b"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- 激光笔金属笔身 -->
      <g :transform="laserTransform">
        <rect
          x="-56"
          y="-7.5"
          width="50"
          height="15"
          rx="3.5"
          fill="rgba(226,168,70,0.28)"
          stroke="#e2a846"
          stroke-width="2"
        />
        <!-- 笔身防滑环与开关按钮 -->
        <line
          x1="-42"
          y1="-7.5"
          x2="-42"
          y2="7.5"
          stroke="#e2a846"
          stroke-width="1.4"
          opacity="0.7"
        />
        <line
          x1="-18"
          y1="-7.5"
          x2="-18"
          y2="7.5"
          stroke="#e2a846"
          stroke-width="1.4"
          opacity="0.7"
        />
        <rect x="-34" y="-10.5" width="10" height="3" rx="1" fill="#fbbf24" />
        <!-- 前端出光准直镜头 -->
        <path
          d="M -6 -5.5 L 0 -3.5 L 0 3.5 L -6 5.5 Z"
          fill="#fbbf24"
          stroke="#fde68a"
          stroke-width="1.2"
        />
      </g>
      <text x="30" y="362" font-size="15" font-weight="600" fill="#e2a846">激光笔</text>

      <!-- ==================== 激光束光路（外层柔光 + 核心亮线 + 传播方向箭头） ==================== -->
      <path
        :d="rayPath"
        fill="none"
        stroke="rgba(251,191,36,0.22)"
        stroke-width="7"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <path
        :d="rayPath"
        fill="none"
        stroke="#fbbf24"
        stroke-width="2.6"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <!-- 光路传播方向小箭头 -->
      <CourseArrow
        v-for="(seg, idx) in rayArrows"
        :key="idx"
        :from="seg.from"
        :to="seg.to"
        stroke="#fbbf24"
        stroke-width="2.4"
        :head-size="8"
      />

      <!-- ==================== 动态上下移动的“挤压”箭头与桌面受压波纹 ==================== -->
      <g>
        <!-- 按压接触点弹性形变应力光晕 -->
        <ellipse
          v-if="press > 0.02"
          cx="335"
          :cy="pressArrow.to.y + 3"
          :rx="10 + press * 14"
          :ry="2.5 + press * 2.5"
          fill="rgba(248,113,113,0.22)"
          stroke="rgba(248,113,113,0.55)"
          stroke-width="1.2"
        />
        <!-- 随 press 上下移动并加粗的挤压箭头 -->
        <CourseArrow
          :from="pressArrow.from"
          :to="pressArrow.to"
          stroke="#f87171"
          :stroke-width="3 + press * 1.4"
        />
        <text
          x="349"
          :y="pressArrow.labelY"
          font-size="16"
          font-weight="600"
          fill="#f87171"
          stroke="#0f1425"
          stroke-width="3"
          paint-order="stroke"
        >
          挤压
        </text>
      </g>

      <!-- ==================== 墙面上的放大位移光点 ==================== -->
      <!-- 光点下移放大指示箭头（在按压时显示） -->
      <CourseArrow
        v-if="trace.spot && trace.spot.y - homeSpotY > 14"
        :from="{ x: WALL_X + 14, y: homeSpotY + 3 }"
        :to="{ x: WALL_X + 14, y: trace.spot.y - 3 }"
        stroke="#f87171"
        stroke-width="2"
        :head-size="7"
      />

      <g v-if="trace.spot">
        <circle :cx="trace.spot.x" :cy="trace.spot.y" r="14" :fill="`url(#mdSpotGlow-${uid})`" />
        <circle
          :cx="trace.spot.x"
          :cy="trace.spot.y"
          r="6"
          fill="#f87171"
          stroke="#fef2f2"
          stroke-width="1.6"
        />
        <text
          :x="WALL_X - 12"
          :y="trace.spot.y + 6"
          font-size="17"
          font-weight="600"
          fill="#f87171"
          text-anchor="end"
          stroke="#0f1425"
          stroke-width="3.5"
          paint-order="stroke"
        >
          光点
        </text>
      </g>
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

  color: var(--c-text-dim, #94a3b8);

  font-size: 0.78rem;
}

.md-label input {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-accent, #e2a846);
}
</style>
