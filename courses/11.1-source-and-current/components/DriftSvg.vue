<!--
  第 9 页配图：一段金属导体的微观图景（精修动效版 · DriftSvg）
  物理逻辑与视觉规约：
    1. 8 个自由电子（精致小巧 r = 5.5px，内嵌清晰减号 −）；
    2. 无规则热运动：自由电子在圆柱导体内部来回飞行，与上下壁和晶格离子弹性碰撞/随机散射；
    3. step >= 3 电场建立与整体漂移：
       - 施加水平向左电场 E，自由电子在热运动之上叠加向右的定向漂移速度 v_d；
       - 当电子从右侧边缘（x >= 420）漂出时，立即从左侧（x = 40）相同纵坐标 y 处循环平滑刷新归位；
       - 每个电子同步呈现向右的金色定向移动箭头；
       - 底部标明向左的电流矢量 I 与学术结论：“自由电子定向移动方向 与 电流方向 相反”；
    4. 纯净全局 CSS 变量（零 fallback 冗余），无固定 width 属性，完美自适应 Slidev。
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

interface Props {
  /** 讲台/课件步进 (配合 Slidev 的 $clicks): 1: 纯自由电子无规则热运动 (各方向随机飞行，无定向移动) 2: 各方向机会均等解释 (宏观无电荷移动，无电流) 3: 建立电场 · 自由电子整体向右漂移 (右侧穿出左侧循环刷新 · 标出与电流方向相反) 默认 1 */
  step?: number;
}

const { step = 1 } = defineProps<Props>();

// 文字光晕
const HALO = {
  stroke: "var(--c-bg)",
  "stroke-width": 3.4,
  "paint-order": "stroke",
} as const;

// ══════════════ 导体内壁几何参数 ══════════════
const X_MIN = 40;
const X_MAX = 420;
const Y_TOP = 70;
const Y_BOTTOM = 170;
const R_ELEC = 5.5; // 电子半径稍微小巧精致

// 碰撞边界
const BORDER_TOP = Y_TOP + R_ELEC + 3; // 78.5
const BORDER_BOTTOM = Y_BOTTOM - R_ELEC - 3; // 161.5
const BORDER_LEFT = X_MIN + 8; // 48
const BORDER_RIGHT = X_MAX - 8; // 412

// ══════════════ 晶格正离子固定背景 (2 行 × 8 列) ══════════════
const LATTICE_IONS = [
  // 上排 (y = 96)
  { x: 80, y: 96 },
  { x: 125, y: 96 },
  { x: 170, y: 96 },
  { x: 215, y: 96 },
  { x: 260, y: 96 },
  { x: 305, y: 96 },
  { x: 350, y: 96 },
  { x: 395, y: 96 },
  // 下排 (y = 144)
  { x: 80, y: 144 },
  { x: 125, y: 144 },
  { x: 170, y: 144 },
  { x: 215, y: 144 },
  { x: 260, y: 144 },
  { x: 305, y: 144 },
  { x: 350, y: 144 },
  { x: 395, y: 144 },
];

// ══════════════ 8 个自由电子状态数据 ══════════════
interface Electron {
  id: number;
  x: number;
  y: number;
  vx: number; // 热运动水平速度
  vy: number; // 热运动垂直速度
  speed: number;
  scatterTimer: number; // 晶格微观碰撞计时
}

const initialPositions = [
  { x: 75, y: 95 },
  { x: 120, y: 146 },
  { x: 168, y: 88 },
  { x: 212, y: 136 },
  { x: 262, y: 102 },
  { x: 308, y: 150 },
  { x: 354, y: 92 },
  { x: 396, y: 132 },
];

const initialVelocities = [
  { angle: 0.65 * Math.PI, speed: 1.35 },
  { angle: 1.85 * Math.PI, speed: 1.45 },
  { angle: 0.25 * Math.PI, speed: 1.3 },
  { angle: 1.35 * Math.PI, speed: 1.5 },
  { angle: 0.85 * Math.PI, speed: 1.4 },
  { angle: 1.65 * Math.PI, speed: 1.35 },
  { angle: 0.45 * Math.PI, speed: 1.55 },
  { angle: 1.15 * Math.PI, speed: 1.4 },
];

const electrons = ref<Electron[]>(
  initialPositions.map((pos, i) => {
    const initV = initialVelocities[i];
    return {
      id: i,
      x: pos.x,
      y: pos.y,
      vx: initV.speed * Math.cos(initV.angle),
      vy: initV.speed * Math.sin(initV.angle),
      speed: initV.speed,
      scatterTimer: Math.floor(Math.random() * 40) + 30,
    };
  }),
);

// 是否施加电场进行定向漂移 (step >= 3)
const isElectricFieldActive = computed(() => (step ?? 1) >= 3);

// 漂移速度 (像素/帧)
const DRIFT_SPEED = 1.65;

let animationFrameId: number | null = null;
let lastTimestamp = 0;

const updatePhysics = (dt: number): void => {
  // 归一化时间步长（以 60fps ~16.6ms 为基准）
  const timeScale = Math.min(Math.max(dt / 16.6, 0.5), 1.8);
  const activeDrift = isElectricFieldActive.value;

  electrons.value.forEach((e) => {
    // 1. 无规则热运动散射 (模拟与金属离子碰撞)
    e.scatterTimer -= timeScale;
    if (e.scatterTimer <= 0) {
      // 随机扰动角度 (-45° ~ +45°)
      const currentAngle = Math.atan2(e.vy, e.vx);
      const newAngle = currentAngle + (Math.random() - 0.5) * 1.5;
      e.vx = e.speed * Math.cos(newAngle);
      e.vy = e.speed * Math.sin(newAngle);
      e.scatterTimer = Math.floor(Math.random() * 60) + 40;
    }

    // 2. 位移计算
    // 当 step >= 3 时叠加向右的漂移速度
    const effectiveVx = e.vx + (activeDrift ? DRIFT_SPEED : 0);
    e.x += effectiveVx * timeScale;
    e.y += e.vy * timeScale;

    // 3. 上下壁弹性碰撞反射
    if (e.y <= BORDER_TOP) {
      e.y = BORDER_TOP;
      e.vy = Math.abs(e.vy);
    } else if (e.y >= BORDER_BOTTOM) {
      e.y = BORDER_BOTTOM;
      e.vy = -Math.abs(e.vy);
    }

    // 4. 左右边界处理
    if (activeDrift) {
      // 【用户核心需求】：电场作用下定向向右漂移，当从右边出来时，在左边同位置 (相同 y) 刷新回去！
      if (e.x >= X_MAX + R_ELEC) {
        e.x = X_MIN - R_ELEC; // 循环回到左端入口
        // y 保持完全一致，vx 保持原有热运动矢量
      } else if (e.x < X_MIN - R_ELEC - 5) {
        // 极少数由于向左热速度偶发回退至左边界外，限制在左端
        e.x = X_MIN + R_ELEC;
        e.vx = Math.abs(e.vx);
      }
    }
    // step < 3: 纯热运动无定向漂移，在圆柱两端封闭弹性弹跳来回飞
    else if (e.x <= BORDER_LEFT) {
      e.x = BORDER_LEFT;
      e.vx = Math.abs(e.vx);
    } else if (e.x >= BORDER_RIGHT) {
      e.x = BORDER_RIGHT;
      e.vx = -Math.abs(e.vx);
    }
  });
};

const tick = (timestamp: number): void => {
  if (lastTimestamp === 0) lastTimestamp = timestamp;

  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  updatePhysics(dt);
  animationFrameId = requestAnimationFrame(tick);
};

onMounted(() => {
  lastTimestamp = 0;
  animationFrameId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  if (animationFrameId != null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
});

watch(
  () => step,
  (newStep, oldStep) => {
    // 当从 step 3 切回 step 1/2 时，若有电子超界，重新纠正到边界内
    if (newStep < 3 && oldStep >= 3) {
      electrons.value.forEach((e, i) => {
        if (e.x > BORDER_RIGHT || e.x < BORDER_LEFT) e.x = initialPositions[i].x;
      });
    }
  },
);
</script>
<template>
  <div class="drift-figure-container select-none">
    <svg
      viewBox="0 0 460 250"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="一段金属导体的微观图景：自由电子热运动与定向移动"
      class="select-none overflow-visible"
      style="display: block; margin: 0 auto"
    >
      <defs>
        <!-- 金属导线圆柱侧视渐变 -->
        <linearGradient id="drift-wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.45)" />
          <stop offset="25%" stop-color="rgba(51, 65, 85, 0.25)" />
          <stop offset="50%" stop-color="rgba(96, 165, 250, 0.08)" />
          <stop offset="75%" stop-color="rgba(51, 65, 85, 0.25)" />
          <stop offset="100%" stop-color="rgba(30, 41, 59, 0.45)" />
        </linearGradient>

        <!-- 左端面椭圆立体明暗 -->
        <linearGradient id="drift-cap-left" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.85)" />
          <stop offset="100%" stop-color="rgba(51, 65, 85, 0.4)" />
        </linearGradient>

        <!-- 右端面椭圆截面高光 -->
        <linearGradient id="drift-cap-right" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(51, 65, 85, 0.5)" />
          <stop offset="100%" stop-color="rgba(96, 165, 250, 0.2)" />
        </linearGradient>

        <!-- 自由电子发光立体渐变 -->
        <radialGradient id="drift-elec-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#bae6fd" />
          <stop offset="45%" stop-color="var(--c-accent-2)" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </radialGradient>

        <!-- 正离子立体金球渐变 -->
        <radialGradient id="drift-ion-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fde68a" />
          <stop offset="60%" stop-color="rgba(226, 168, 70, 0.4)" />
          <stop offset="100%" stop-color="rgba(180, 83, 9, 0.2)" />
        </radialGradient>

        <!-- 导线内裁切蒙版 (保证自由电子在导线两端自然出入截面) -->
        <clipPath id="drift-conductor-clip">
          <rect x="40" y="70" width="380" height="100" rx="6" />
        </clipPath>
      </defs>

      <!-- ══════════════ 1. 顶部学术标题与状态指示 ══════════════ -->
      <g>
        <text x="230" y="42" text-anchor="middle" font-size="14.5" font-weight="600" fill="var(--c-text)" :style="HALO">
          <tspan v-if="!isElectricFieldActive" fill="var(--c-text-dim)">自由电子的无规则热运动（各方向机会均等 · 无定向移动）</tspan>
          <tspan v-else fill="var(--c-accent)">外加电场作用 · 自由电子定向漂移形成电流</tspan>
        </text>

        <!-- 电场 E 标识（仅在 step >= 3 出现，标明电场向左） -->
        <g v-if="isElectricFieldActive">
          <CourseArrow
            :from="{ x: 390, y: 56 }"
            :to="{ x: 70, y: 56 }"
            stroke="var(--c-physics)"
            :stroke-width="1.8"
            stroke-dasharray="6 4"
            label="E"
            :label-dy="-9"
            :head-size="8"
          />
        </g>
      </g>

      <!-- ══════════════ 2. 导体圆柱体外壳与端面 ══════════════ -->
      <g>
        <!-- 导线管身主体填充 (两端与椭圆平滑衔接，绝不产生左端垂直剖分灰线) -->
        <path
          d="
            M 40 70
            L 420 70
            A 10 50 0 0 1 420 170
            L 40 170
            A 10 50 0 0 1 40 70
            Z
          "
          fill="url(#drift-wire-grad)"
        />

        <!-- 上下母线轮廓实线 -->
        <line x1="40" y1="70" x2="420" y2="70" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.9" />
        <line x1="40" y1="170" x2="420" y2="170" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.9" />

        <!-- 导线上方/下方高光内壁线 -->
        <line x1="40" y1="71" x2="420" y2="71" stroke="rgba(255, 255, 255, 0.2)" stroke-width="1" />
        <line x1="40" y1="169" x2="420" y2="169" stroke="rgba(15, 23, 42, 0.6)" stroke-width="1" />

        <!-- 左端截面椭圆（外侧观察面，整洁完整立体椭圆，中间绝无任何纵向灰线） -->
        <ellipse cx="40" cy="120" rx="10" ry="50" fill="url(#drift-cap-left)" stroke="var(--c-text)" stroke-width="1.6" stroke-opacity="0.95" />

        <!-- 右端截面椭圆底色填充 -->
        <ellipse cx="420" cy="120" rx="10" ry="50" fill="url(#drift-cap-right)" stroke="none" />

        <!-- 右端截面椭圆轮廓：左半部分为虚线（透视穿透内壁） -->
        <path
          d="
            M 420 70
            A 10 50 0 0 0 420 170
          "
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-dasharray="5 3.5"
          stroke-opacity="0.65"
        />

        <!-- 右端截面椭圆轮廓：右半部分为实线（外轮廓边线） -->
        <path
          d="
            M 420 70
            A 10 50 0 0 1 420 170
          "
          fill="none"
          stroke="var(--c-text)"
          stroke-width="1.6"
          stroke-opacity="0.95"
        />
      </g>

      <!-- ══════════════ 3. 导体内部背景：晶格正离子（固定在骨架上） ══════════════ -->
      <g opacity="0.32" clip-path="url(#drift-conductor-clip)">
        <g v-for="(ion, idx) in LATTICE_IONS" :key="`ion-${idx}`">
          <!-- 晶格正离子微光球 -->
          <circle :cx="ion.x" :cy="ion.y" r="5" fill="url(#drift-ion-grad)" stroke="var(--c-accent)" stroke-width="0.8" />
          <text :x="ion.x" :y="ion.y + 2.5" text-anchor="middle" font-size="7.5" font-weight="bold" fill="var(--c-accent)">+</text>
        </g>
      </g>

      <!-- ══════════════ 4. 8 个自由电子热运动与定向漂移层 ══════════════ -->
      <!-- 被圆柱体内壁裁剪，确保右端穿出与左端穿入视觉完美无瑕 -->
      <g clip-path="url(#drift-conductor-clip)">
        <g v-for="e in electrons" :key="`electron-${e.id}`">
          <!-- (A) 热运动瞬时速度微矢量 (轻盈半透明无规则箭头) -->
          <g v-if="!isElectricFieldActive" opacity="0.65">
            <line
              :x1="e.x"
              :y1="e.y"
              :x2="e.x + (e.vx / e.speed) * 16"
              :y2="e.y + (e.vy / e.speed) * 16"
              stroke="var(--c-accent-2)"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <!-- 箭头小尖头 -->
            <polygon
              :points="`
                ${e.x + (e.vx / e.speed) * 18},${e.y + (e.vy / e.speed) * 18}
                ${e.x + (e.vx / e.speed) * 13 - (e.vy / e.speed) * 3},${e.y + (e.vy / e.speed) * 13 + (e.vx / e.speed) * 3}
                ${e.x + (e.vx / e.speed) * 13 + (e.vy / e.speed) * 3},${e.y + (e.vy / e.speed) * 13 - (e.vx / e.speed) * 3}
              `"
              fill="var(--c-accent-2)"
            />
          </g>

          <!-- (B) step >= 3 时：定向漂移速度矢量箭头（醒目金色向右） -->
          <g v-else>
            <!-- 向右定向漂移箭头 (长 22px，直观彰显向右迁移趋势) -->
            <CourseArrow
              :from="{ x: e.x + R_ELEC, y: e.y }"
              :to="{ x: e.x + R_ELEC + 22, y: e.y }"
              stroke="var(--c-accent)"
              :stroke-width="2.2"
              :head-size="7"
            />
          </g>

          <!-- (C) 自由电子本体（稍微小一点 r = 5.5px，发光粒子，内嵌清晰减号） -->
          <circle :cx="e.x" :cy="e.y" :r="R_ELEC + 2.5" fill="var(--c-accent-2)" opacity="0.22" />
          <circle :cx="e.x" :cy="e.y" :r="R_ELEC" fill="url(#drift-elec-grad)" stroke="var(--c-accent-2)" stroke-width="1.2" />
          <!-- 减号标志 -->
          <text :x="e.x" :y="e.y + 2.6" text-anchor="middle" font-family="KaTeX_Main, sans-serif" font-size="8.5" font-weight="bold" fill="#ffffff">−</text>
        </g>
      </g>

      <!-- ══════════════ 5. 分析标注：电流方向与学术结论 (step >= 3) ══════════════ -->
      <g v-if="isElectricFieldActive">
        <!-- 电流方向粗箭头（向左，标明 I） -->
        <CourseArrow
          :from="{ x: 330, y: 202 }"
          :to="{ x: 130, y: 202 }"
          stroke="var(--c-accent)"
          :stroke-width="2.8"
          label="I"
          :label-dy="-11"
          :head-size="10"
        />

        <!-- 电流学术结论文字 -->
        <text x="230" y="234" text-anchor="middle" font-size="15" :style="HALO">
          <tspan fill="var(--c-accent-2)" font-weight="700">自由电子定向移动方向</tspan>
          <tspan fill="var(--c-text-dim)">与</tspan>
          <tspan fill="var(--c-accent)" font-weight="700">电流方向</tspan>
          <tspan fill="var(--c-text-dim)">相反</tspan>
        </text>
      </g>
      <g v-else-if="step === 2">
        <!-- step 2 引导性提示 -->
        <text x="230" y="215" text-anchor="middle" font-size="14" fill="var(--c-text-dim)" :style="HALO">
          朝任何方向运动的机会都一样 ⇒ 宏观无定向移动 ⇒
          <tspan fill="var(--c-accent)" font-weight="bold">无电流</tspan>
        </text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.drift-figure-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
