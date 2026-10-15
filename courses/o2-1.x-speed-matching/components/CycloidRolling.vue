<!--
  选必2 1.x《复合场中的配速法与摆线运动》「两个分运动合成：摆线」的配图（精修美化版）
  物理数学精修核心：
    1. 彻底纠正绕圆心转动的分速度 v_圆 的方向与大小：
       原版误用摆线总速度导数 (1-cosθ, sinθ)，导致箭头忽长忽短且方向偏离切线；
       精修版纠正为真实的圆周分速度：v_圆 = (-V·cosθ, +V·sinθ)，模长恒为定值 V = v_平，
       且与圆心到小球的半径矢量内积恒为 0，严格、时刻沿着圆周切线方向（v_圆 ⊥ 半径）！
    2. 增加小球处的 90° 几何直角标记（⦜），直观印证切线速度与半径始终垂直；
    3. 优化红球（正电荷）质感与加粗实心符号，避免后排模糊；
    4. 标签层层避让，确保在 0 到 2π 旋转各时刻绝不遮挡圆周与轨迹；
    5. 支持播放/暂停、单步进度拖拽与合成速度 v_合 揭示。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const {
  showInitial = false,
  showExtremes = false,
  showResultant = false,
  paused = false,
  manualTheta = -1,
  width = 780,
} = defineProps<{
  /** 是否显示初态匹配（v_平 向右 + v_圆0 向左，合起来为 0） */
  showInitial?: boolean;
  /** 是否显示极值标注（尖点 v=0、最低点 v_max=2v_平、深度 2R） */
  showExtremes?: boolean;
  /** 是否显示两个分速度的合速度 v_合（切于摆线） */
  showResultant?: boolean;
  /** 是否暂停动画（用于教师单步讲解） */
  paused?: boolean;
  /** 手动控制角度（弧度 0 ~ 2π），传入非负数时以此为准 */
  manualTheta?: number;
  /** 宽度 */
  width?: number;
}>();

const W = 780;
const H = 300;
/** 1R 对应的用户单位数 */
const K = 88;
/** 第一个尖点（θ = 0）的横坐标 */
const X0 = 106;
/** 接触线（圆顶与它相切、摆线的尖点都落在它上面） */
const LINE_Y = 60;
/** 圆心滚过的那条水平线 */
const CENTER_Y = LINE_Y + K;
const THETA_MAX = 2 * Math.PI;
const SAMPLES = 240;

const toX = (wx: number): number => X0 + wx * K;
const toY = (wy: number): number => CENTER_Y - wy * K;

/**
 * 圆上的小球：θ 处的世界坐标（圆心为原点、向上为正，接触线在 y = 1）
 *
 * @param theta 圆上的角度（弧度）
 * @returns θ 处的世界坐标
 */
const onCircle = (theta: number): { x: number; y: number } => ({
  x: theta - Math.sin(theta),
  y: Math.cos(theta),
});

/**
 * 圆弧上的点（屏幕坐标；deg 取数学习惯的逆时针角，y 在函数里翻号）
 *
 * @param ox 圆心 x（屏幕坐标）
 * @param oy 圆心 y（屏幕坐标）
 * @param r 半径
 * @param deg 角度（度，逆时针为正）
 * @returns 弧上该角度的屏幕坐标
 */
const arcPoint = (ox: number, oy: number, r: number, deg: number): { x: number; y: number } => ({
  x: ox + r * Math.cos((deg * Math.PI) / 180),
  y: oy - r * Math.sin((deg * Math.PI) / 180),
});

/** 轨迹起点（第一个尖点）、最低点、第二个尖点 —— 都是摆线的几何极值 */
const START = { x: toX(0), y: LINE_Y };
const LOW = { x: toX(Math.PI), y: toY(-1) };
const END = { x: toX(THETA_MAX), y: LINE_Y };

/** θ 从 0 匀速涨到 2π（滚一整圈） */
const animTheta = ref(0);
const CYCLE = 3200; // 3.2s 周期，转速适中沉稳
let raf = 0;
let t0 = 0;

const tick = (now: number): void => {
  if (t0 === 0) t0 = now;
  if (!paused && manualTheta < 0) animTheta.value = (((now - t0) % CYCLE) / CYCLE) * THETA_MAX;

  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
});

/** 当前生效的 θ 角度 */
const theta = computed(() => {
  if (manualTheta >= 0) return Math.max(0, Math.min(THETA_MAX, manualTheta));

  return animTheta.value;
});

/** 已经画出来的那一段轨迹：随 θ 向右延伸 */
const trailD = computed(() => {
  const now = theta.value;
  const last = Math.floor((now / THETA_MAX) * SAMPLES);
  let d = "";

  for (let i = 0; i <= last; i += 1) {
    const p = onCircle((i * THETA_MAX) / SAMPLES);
    d += `${i === 0 ? "M" : "L"} ${toX(p.x).toFixed(1)} ${toY(p.y).toFixed(1)} `;
  }

  const p = onCircle(now);
  return `${d}L ${toX(p.x).toFixed(1)} ${toY(p.y).toFixed(1)}`;
});

/** 当前时刻的圆心与小球 */
const center = computed(() => ({ x: toX(theta.value), y: CENTER_Y }));
const ball = computed(() => {
  const p = onCircle(theta.value);
  return { x: toX(p.x), y: toY(p.y) };
});

/** 速度矢量的恒定模长 (与 v_平 严格等长) */
const V_LEN = K * 0.86;

/** 圆心速度箭头（水平恒定平移速度 v_平） */
const vFlatTip = computed(() => ({ x: center.value.x + V_LEN, y: CENTER_Y }));

/**
 * ═══════════════════════════════════════════════════════════════════ 核心数学几何修正：圆周转动分速度 v_圆
 * ═══════════════════════════════════════════════════════════════════ 小球相对于圆心的位置矢量（世界坐标，y向上）： r_rel
 * = (-R·sinθ, R·cosθ) 对时间求导得小球绕圆心转动的物理分速度： v_circ = d(r_rel)/dt = (-Rω·cosθ, -Rω·sinθ) =
 * (-v_平·cosθ, -v_平·sinθ) 映射到 SVG 屏幕坐标系（x向右，y向下翻转）： v_circ_screen = (-V·cosθ, +V·sinθ)
 *
 * 严格内积校验： 屏幕坐标下半径矢量 r_screen = (ball.x - center.x, ball.y - center.y) = (-K·sinθ, -K·cosθ) r_screen
 * · v_circ_screen = (-K·sinθ)(-V·cosθ) + (-K·cosθ)(+V·sinθ) = +KV·sinθ·cosθ - KV·cosθ·sinθ ≡ 0 恒成立！
 * 这保证了无论圆滚到何处，v_圆 恒严格垂直于半径（且沿逆时针转动的正确物理切向）！
 */
const vCircVec = computed(() => {
  const th = theta.value;
  return {
    x: -V_LEN * Math.cos(th),
    y: V_LEN * Math.sin(th),
  };
});

const vCircTip = computed(() => ({
  x: ball.value.x + vCircVec.value.x,
  y: ball.value.y + vCircVec.value.y,
}));

/** 严格 90° 几何直角标记（⦜）在小球处呈现 */
const rightAnglePath = computed(() => {
  const th = theta.value;
  const s = 10; // 直角符号角长
  // 沿半径向内的单位向量 (指向圆心)
  const inRad = { x: Math.sin(th), y: Math.cos(th) };
  // 沿切线速度的单位向量
  const tanV = { x: -Math.cos(th), y: Math.sin(th) };

  const p1 = { x: ball.value.x + s * tanV.x, y: ball.value.y + s * tanV.y };
  const p2 = {
    x: ball.value.x + s * tanV.x + s * inRad.x,
    y: ball.value.y + s * tanV.y + s * inRad.y,
  };
  const p3 = { x: ball.value.x + s * inRad.x, y: ball.value.y + s * inRad.y };

  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} L ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}`;
});

/** V_圆 标签位置：顺着箭头方向并微向外侧外扩，永不被圆周遮挡 */
const vCircLabel = computed(() => {
  const v = vCircVec.value;
  const th = theta.value;
  // 向圆外侧的单位法向
  const outNormal = { x: -Math.sin(th), y: -Math.cos(th) };

  return {
    x: ball.value.x + v.x * 0.65 + outNormal.x * 16,
    y: ball.value.y + v.y * 0.65 + outNormal.y * 16,
  };
});

/** 合速度 v_合 = v_平 + v_圆（严格切于摆线实际轨迹！） */
const vTotalVec = computed(() => ({
  x: V_LEN + vCircVec.value.x, // V_LEN * (1 - cosθ)
  y: vCircVec.value.y, // V_LEN * sinθ
}));

const vTotalTip = computed(() => ({
  x: ball.value.x + vTotalVec.value.x,
  y: ball.value.y + vTotalVec.value.y,
}));

/** R 标注贴在半径线外侧 */
const radiusLabel = computed(() => {
  const dx = ball.value.x - center.value.x;
  const dy = ball.value.y - center.value.y;
  const len = Math.hypot(dx, dy) || 1;

  return {
    x: (center.value.x + ball.value.x) / 2 - (dy / len) * 14,
    y: (center.value.y + ball.value.y) / 2 + (dx / len) * 14,
  };
});

/** 圆内指示小球转动的角速度弧 ω（屏幕逆时针） */
const ROT_R = K * 0.48;
const ROT_FROM = 135;
const ROT_TO = 205;
const rotArcD = computed(() => {
  const s = arcPoint(center.value.x, center.value.y, ROT_R, ROT_FROM);
  const e = arcPoint(center.value.x, center.value.y, ROT_R, ROT_TO - 12);
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${ROT_R} ${ROT_R} 0 0 0 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
});
const rotEnd = computed(() => arcPoint(center.value.x, center.value.y, ROT_R, ROT_TO - 12));
const rotHead = computed(() => arcPoint(center.value.x, center.value.y, ROT_R, ROT_TO));
const rotLabel = computed(() =>
  arcPoint(center.value.x, center.value.y, ROT_R + 18, (ROT_FROM + ROT_TO) / 2),
);

const HALO = {
  stroke: "var(--c-bg, #0f172a)",
  "stroke-width": 3.4,
  "paint-order": "stroke",
} as const;
</script>

<template>
  <div class="fig-cycloid flex justify-center w-full">
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      :width="width"
      class="fig-svg select-none overflow-visible block"
      role="img"
      aria-label="两个分运动合成：摆线运动"
    >
      <!-- 匀强磁场：垂直纸面向里的裸 × 铺满全幅（背景层） -->
      <FieldDots
        :x="12"
        :y="12"
        :cols="12"
        :rows="4"
        :spacing="62"
        :size="8"
        :line-width="2.6"
        :opacity="0.45"
        dir="in"
      />

      <!-- 圆滚过的接触线（摆线的尖点都落在它上面） -->
      <path
        :d="`M 12 ${LINE_Y} H 756`"
        stroke="var(--c-text-dim)"
        stroke-width="1.8"
        opacity="0.8"
      />

      <!-- 圆心匀速平移的那条水平虚线 -->
      <path
        :d="`M 12 ${CENTER_Y} H 756`"
        stroke="var(--c-text-dim)"
        stroke-width="1.4"
        stroke-dasharray="8 7"
        opacity="0.55"
      />

      <!-- 小球画出的摆线轨迹：随 θ 向右长出来 -->
      <!-- 暗底衬线，避免被磁场叉号打断 -->
      <path
        :d="trailD"
        fill="none"
        stroke="var(--c-bg)"
        stroke-width="7"
        stroke-linecap="round"
        opacity="0.8"
      />
      <path
        :d="trailD"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="3.6"
        stroke-linecap="round"
      />

      <!-- 滚动的圆 -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="K"
        fill="color-mix(in srgb, var(--c-velocity) 10%, transparent)"
        stroke="var(--c-velocity)"
        stroke-width="2"
      />

      <!-- 圆心到小球的半径线 -->
      <line
        :x1="center.x"
        :y1="center.y"
        :x2="ball.x"
        :y2="ball.y"
        stroke="var(--c-velocity)"
        stroke-width="2"
      />
      <!-- 圆心标记点 -->
      <circle :cx="center.x" :cy="center.y" r="3.8" fill="var(--c-velocity)" />

      <!-- 半径标号 R -->
      <text
        :x="radiusLabel.x"
        :y="radiusLabel.y + 5"
        font-size="17"
        text-anchor="middle"
        dominant-baseline="central"
        fill="var(--c-velocity)"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        :style="HALO"
      >
        R
      </text>

      <!-- 圆内：角速度弧 ω（屏幕逆时针） -->
      <path
        :d="rotArcD"
        fill="none"
        stroke="var(--c-velocity)"
        stroke-width="2.2"
        opacity="0.85"
      />
      <CourseArrow
        :from="rotEnd"
        :to="rotHead"
        stroke="var(--c-velocity)"
        :stroke-width="2.2"
        :head-size="10"
      />
      <text
        :x="rotLabel.x"
        :y="rotLabel.y + 2"
        font-size="17"
        text-anchor="middle"
        dominant-baseline="central"
        fill="var(--c-velocity)"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        :style="HALO"
      >
        ω
      </text>

      <!-- 圆心平动速度 v_平（大小恒定，向右） -->
      <CourseArrow
        :from="center"
        :to="vFlatTip"
        stroke="var(--c-velocity)"
        :stroke-width="4.2"
        :head-size="15"
      />
      <text
        :x="center.x + K * 0.43"
        :y="CENTER_Y - 14"
        font-size="19"
        text-anchor="middle"
        fill="var(--c-velocity)"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        :style="HALO"
      >
        v
        <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="13" dy="4">平</tspan>
      </text>

      <!-- ════════════════════════════════════════════════════════════
           直角几何符号：直观印证 v_圆 恒垂直于半径
           ════════════════════════════════════════════════════════════ -->
      <path :d="rightAnglePath" fill="none" stroke="rgba(255, 255, 255, 0.75)" stroke-width="1.8" />

      <!-- 红点处绕圆心转动的分速度 v_圆（严格沿切线方向，模长恒定，垂直半径） -->
      <CourseArrow
        :from="ball"
        :to="vCircTip"
        stroke="var(--c-velocity)"
        :stroke-width="4.2"
        :head-size="15"
      />
      <text
        :x="vCircLabel.x"
        :y="vCircLabel.y"
        font-size="19"
        text-anchor="middle"
        dominant-baseline="central"
        fill="var(--c-velocity)"
        font-family="KaTeX_Math, 'Times New Roman', serif"
        font-style="italic"
        :style="HALO"
      >
        v
        <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="13" dy="4">圆</tspan>
      </text>

      <!-- 可选：显示两个分运动的合成速度 v_合 = v_平 + v_圆（严格切于摆线） -->
      <g v-if="showResultant && (vTotalVec.x !== 0 || vTotalVec.y !== 0)">
        <CourseArrow
          :from="ball"
          :to="vTotalTip"
          stroke="var(--c-accent-glow)"
          :stroke-width="3.4"
          :head-size="14"
        />
        <text
          :x="vTotalTip.x + 12"
          :y="vTotalTip.y"
          font-size="18"
          text-anchor="start"
          dominant-baseline="central"
          fill="var(--c-accent-glow)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="12" dy="4">
            合
          </tspan>
        </text>
      </g>

      <!-- 小球主体：红盘（正电荷），居中白色加粗十字，清晰有质感 -->
      <circle
        :cx="ball.x"
        :cy="ball.y"
        r="9.5"
        fill="var(--c-force)"
        stroke="var(--c-bg)"
        stroke-width="2.2"
      />
      <line
        :x1="ball.x - 4.5"
        :y1="ball.y"
        :x2="ball.x + 4.5"
        :y2="ball.y"
        stroke="#ffffff"
        stroke-width="2.2"
        stroke-linecap="round"
      />
      <line
        :x1="ball.x"
        :y1="ball.y - 4.5"
        :x2="ball.x"
        :y2="ball.y + 4.5"
        stroke="#ffffff"
        stroke-width="2.2"
        stroke-linecap="round"
      />

      <!-- 初态匹配：借一个向右的 v_平，必须还一个向左的 v_圆0（合速度仍为 0） -->
      <g v-if="showInitial">
        <CourseArrow
          :from="START"
          :to="{ x: START.x + 96, y: START.y }"
          stroke="var(--c-velocity)"
          :stroke-width="4.2"
          :head-size="15"
        />
        <CourseArrow
          :from="START"
          :to="{ x: START.x - 96, y: START.y }"
          stroke="var(--c-velocity)"
          :stroke-width="4.2"
          :head-size="15"
        />
        <text
          :x="START.x + 48"
          :y="START.y - 14"
          font-size="19"
          text-anchor="middle"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="13" dy="4">
            平
          </tspan>
        </text>
        <text
          :x="START.x - 48"
          :y="START.y - 14"
          font-size="19"
          text-anchor="middle"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="13" dy="4">
            圆0
          </tspan>
        </text>
      </g>

      <!-- 极值标注：末端尖点 v = 0、最低点 v_max = 2v_平、下落深度 2R -->
      <g v-if="showExtremes">
        <path
          :d="`M ${LOW.x} ${LINE_Y} V ${LOW.y}`"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="7 6"
          opacity="0.6"
        />
        <path
          :d="`M ${LOW.x} ${LOW.y} H 756`"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
          stroke-dasharray="7 6"
          opacity="0.6"
        />
        <path
          :d="`M 756 ${LINE_Y} V ${LOW.y}`"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
        />
        <path
          :d="`M 749 ${LINE_Y} h 14 M 749 ${LOW.y} h 14`"
          stroke="var(--c-text-dim)"
          stroke-width="1.4"
        />
        <text
          x="756"
          :y="LINE_Y - 14"
          font-size="18"
          text-anchor="middle"
          font-family="KaTeX_Main, serif"
          fill="var(--c-text)"
          :style="HALO"
        >
          2
          <tspan font-family="KaTeX_Math, 'Times New Roman', serif" font-style="italic">R</tspan>
        </text>

        <!-- 最低点 2v_平 矢量并排展示 -->
        <CourseArrow
          :from="{ x: LOW.x + 8, y: LOW.y + 16 }"
          :to="{ x: LOW.x + 70, y: LOW.y + 16 }"
          stroke="var(--c-velocity)"
          :stroke-width="4.2"
          :head-size="15"
        />
        <CourseArrow
          :from="{ x: LOW.x + 70, y: LOW.y + 16 }"
          :to="{ x: LOW.x + 132, y: LOW.y + 16 }"
          stroke="var(--c-velocity)"
          :stroke-width="4.2"
          :head-size="15"
        />
        <text
          :x="LOW.x + 70"
          :y="LOW.y + 42"
          font-size="18"
          text-anchor="middle"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="13" dy="4">
            max
          </tspan>
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="18" dy="-4">
            &#160;= 2
          </tspan>
          <tspan font-family="KaTeX_Math, 'Times New Roman', serif" font-style="italic">v</tspan>
          <tspan font-family="KaTeX_Main, serif" font-style="normal" font-size="13" dy="4">
            平
          </tspan>
        </text>

        <!-- 尖点 v = 0 -->
        <text
          :x="END.x - 8"
          :y="LINE_Y - 14"
          font-size="18"
          text-anchor="end"
          fill="var(--c-velocity)"
          font-family="KaTeX_Math, 'Times New Roman', serif"
          font-style="italic"
          :style="HALO"
        >
          v
          <tspan font-family="KaTeX_Main, serif" font-style="normal">&#160;= 0</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
/* 摆线图：占满整页宽度，宽度上限交给共享的 .fig-svg（本课 style.css）读 --fig-max
   —— 第 17 页上方有标题、下方两行结论，780px（渲染高 ≈ 300px）是"图尽量大"与"不出画布"的平衡点 */
.fig-cycloid {
  width: 100%;

  --fig-max: 780px;
}
</style>
