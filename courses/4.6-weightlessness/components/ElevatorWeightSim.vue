<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/**
 * 电梯里的体重计（§4.6 第 5、6 页）
 *
 * 核心视觉升级：
 *
 * 1. 轿厢长宽比严格遵循 1:1.6（长方体，宽 118px、高 190px）；
 * 2. 电梯与一层楼等高（FLOOR_SPACING = 190px）；
 * 3. 起始位置停在两层楼板之间（两侧楼板错落于轿厢上下，直观呈现身处两层之间的井道中）；
 * 4. 两侧楼层板采用淡色典雅线框（与课件全局风格一致，绝不使用违和写实质感），如剪影般勾勒井道分层；
 * 5. 电梯上方配置精巧的曳引滑轮机构、顶部承重支架与多股垂直钢索，井道两侧配置对称垂直导轨与限速缆绳；
 * 6. 秤底脚牢牢贴在轿厢地板上，人在轿厢内比例匀称真实，头顶距天花板预留约 3~4 个头部的充足开阔距离。
 */
const MASS = 60;
const GRAVITY = 10;
const BASE_READING = MASS * GRAVITY;
/** 加速度峰值（m/s²） */
const A_PEAK = 2;
/** 三段时长（s）：加减速更迅猛、匀速段高速飞驰 */
const T_ACCEL = 1;
const T_CONST = 2.4;
const T_DECEL = 1;
const TOTAL = T_ACCEL + T_CONST + T_DECEL;
/** 加速度从 0 升到峰值（或回到 0）的时间（s）：0.12s 迅猛建压 */
const RAMP = 0.12;

/** 楼板层高（px，与电梯轿厢等高 190px）与滚动总距离（跨越 6 层楼，速度更大） */
const FLOOR_SPACING = 190;
const FLOORS_COUNT = 6;
const SCROLL = FLOORS_COUNT * FLOOR_SPACING;

/** 楼板图案覆盖范围（首尾多层覆盖，保证高速滚动完全无缝） */
const FLOOR_INDEXES = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

const reading = ref(BASE_READING);
/** 楼板累计位移（px）：正值表示楼板向下滚、电梯在上升 */
const floorOffset = ref(0);
const playing = ref<"up" | "down" | null>(null);

let raf = 0;
let startedAt = 0;

/** 单段加速度平滑包络 */
const plateau = (t: number, duration: number): number => {
  if (t <= 0 || t >= duration) return 0;
  if (t < RAMP) return (1 - Math.cos((Math.PI * t) / RAMP)) / 2;
  if (t > duration - RAMP) return (1 - Math.cos((Math.PI * (duration - t)) / RAMP)) / 2;

  return 1;
};

/** 上升过程加速度（竖直向上为正）：加速 +A、匀速 0、减速 −A；下降取反 */
const accelAt = (t: number): number => {
  if (t < 0 || t >= TOTAL) return 0;
  if (t < T_ACCEL) return A_PEAK * plateau(t, T_ACCEL);
  if (t < T_ACCEL + T_CONST) return 0;

  return -A_PEAK * plateau(t - T_ACCEL - T_CONST, T_DECEL);
};

const SAMPLE_DT = 0.002;

const displacementTable = ((): number[] => {
  const table = [0];
  let velocity = 0;

  for (let index = 1; index * SAMPLE_DT <= TOTAL; index += 1) {
    velocity += accelAt((index - 0.5) * SAMPLE_DT) * SAMPLE_DT;
    table.push((table[index - 1] ?? 0) + velocity * SAMPLE_DT);
  }

  return table;
})();

const S_TOTAL = displacementTable[displacementTable.length - 1] ?? 0;

const displacementAt = (t: number): number => {
  const index = Math.min(Math.floor(t / SAMPLE_DT), displacementTable.length - 1);
  return displacementTable[index] ?? 0;
};

const stopAnimation = (): void => {
  cancelAnimationFrame(raf);
  raf = 0;
  playing.value = null;
};

const tick = (): void => {
  const direction = playing.value;
  if (!direction) return;

  const t = (performance.now() - startedAt) / 1000;

  if (t >= TOTAL) {
    reading.value = BASE_READING;
    floorOffset.value = direction === "up" ? SCROLL : 0;
    stopAnimation();
    return;
  }

  const accel = direction === "up" ? accelAt(t) : -accelAt(t);
  reading.value = Math.round(MASS * (GRAVITY + accel));
  const progress = displacementAt(t) / S_TOTAL;
  floorOffset.value = direction === "up" ? progress * SCROLL : SCROLL - progress * SCROLL;
  raf = requestAnimationFrame(tick);
};

const startProcess = (direction: "up" | "down"): void => {
  stopAnimation();
  floorOffset.value = direction === "up" ? 0 : SCROLL;
  reading.value = BASE_READING;
  playing.value = direction;
  startedAt = performance.now();
  raf = requestAnimationFrame(tick);
};

/** 楼板图案循环平移：静止与停靠时与轿厢底板 100% 严丝合缝平齐 */
const floorShift = computed(
  () => ((floorOffset.value % FLOOR_SPACING) + FLOOR_SPACING) % FLOOR_SPACING,
);

/** 顶部滑轮动态微转动（随电梯升降微幅旋转增加机械真实感） */
const pulleyAngle = computed(() => (floorOffset.value / FLOOR_SPACING) * 180);

/** 动态物理过程解说（提供给默认插槽使用） */
const motionPhase = computed(() => {
  if (!playing.value) {
    return {
      name: "静止待机",
      state: "normal",
      tag: "平衡状态",
      desc: "电梯静止于两层楼板之间，视重等于实际重力 (FN = mg = 600 N)。",
    };
  }
  if (reading.value > BASE_READING + 5) {
    return {
      name: playing.value === "up" ? "加速上升" : "减速下降",
      state: "overweight",
      tag: "超重状态",
      desc: "加速度方向竖直向上 (a > 0)，FN − mg = ma ⇒ 秤的示数增大 (FN > mg)。",
    };
  }
  if (reading.value < BASE_READING - 5) {
    return {
      name: playing.value === "up" ? "减速上升" : "加速下降",
      state: "underweight",
      tag: "失重状态",
      desc: "加速度方向竖直向下 (a < 0)，mg − FN = ma ⇒ 秤的示数减小 (FN < mg)。",
    };
  }
  return {
    name: playing.value === "up" ? "匀速上升" : "匀速下降",
    state: "normal",
    tag: "平衡状态",
    desc: "匀速运动加速度 a = 0，合外力为零，FN = mg ⇒ 秤的示数等于实际重力 (600 N)。",
  };
});

onBeforeUnmount(stopAnimation);
</script>

<template>
  <div class="ew">
    <div class="ew-left">
      <div class="ew-stage">
        <!-- 井道顶部：槽钢工字梁支架 + 曳引滑轮机构 -->
        <div class="ew-top-machinery">
          <!-- 顶部固定钢梁横架 -->
          <svg class="ew-sheave-svg" viewBox="0 0 292 68" xmlns="http://www.w3.org/2000/svg">
            <!-- 槽钢支承横梁 -->
            <line
              x1="12"
              y1="14"
              x2="280"
              y2="14"
              stroke="var(--c-border)"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              x1="28"
              y1="20"
              x2="264"
              y2="20"
              stroke="var(--c-border)"
              stroke-width="1.5"
              stroke-dasharray="6 4"
              opacity="0.6"
            />

            <!-- 滑轮垂直吊座吊耳 -->
            <path
              d="M 136 14 L 140 32 L 152 32 L 156 14 Z"
              fill="none"
              stroke="var(--c-border)"
              stroke-width="2"
            />
            <!-- 主曳引滑轮（中心在 (146, 32)，半径 16） -->
            <g :transform="`rotate(${pulleyAngle} 146 32)`">
              <circle
                cx="146"
                cy="32"
                r="16"
                fill="none"
                stroke="var(--c-text-dim)"
                stroke-width="2"
              />
              <circle
                cx="146"
                cy="32"
                r="13"
                fill="none"
                stroke="var(--c-border)"
                stroke-width="1"
                stroke-dasharray="3 3"
              />
              <!-- 轮辐线 -->
              <line x1="130" y1="32" x2="162" y2="32" stroke="var(--c-border)" stroke-width="1.2" />
              <line x1="146" y1="16" x2="146" y2="48" stroke="var(--c-border)" stroke-width="1.2" />
              <circle cx="146" cy="32" r="3.2" fill="var(--c-accent)" />
            </g>
          </svg>
        </div>

        <!-- 轿顶主曳引悬吊钢缆：从顶部滑轮垂直直通穿入轿厢吊头，零缝隙绝对连结 -->
        <div class="ew-suspension-cables">
          <div class="ew-scable ew-scable-l" />
          <div class="ew-scable ew-scable-m" />
          <div class="ew-scable ew-scable-r" />
        </div>
        <!-- 侧边通向对重侧的垂直细钢索（贯穿井道左侧） -->
        <div class="ew-counterweight-cable" />

        <!-- 井道垂直导轨（贴合井道壁边缘立柱） -->
        <div class="ew-guide-rail ew-guide-l" />
        <div class="ew-guide-rail ew-guide-r" />

        <!-- 两侧楼板：真实建筑剖面线框，直接延展封堵至导轨，顶面与轿厢地板平齐，无任何黄粗线 -->
        <div class="ew-wall ew-wall-l">
          <div class="ew-floors" :style="{ transform: `translateY(${floorShift}px)` }">
            <div
              v-for="index in FLOOR_INDEXES"
              :key="`l-${index}`"
              class="ew-slab ew-slab-l"
              :style="{ top: `calc(${(index - 0.5) * FLOOR_SPACING}px - 1.6px)` }"
            >
              <div class="ew-slab-hatch" />
              <div class="ew-slab-cap" />
            </div>
          </div>
        </div>

        <div class="ew-wall ew-wall-r">
          <div class="ew-floors" :style="{ transform: `translateY(${floorShift}px)` }">
            <div
              v-for="index in FLOOR_INDEXES"
              :key="`r-${index}`"
              class="ew-slab ew-slab-r"
              :style="{ top: `calc(${(index - 0.5) * FLOOR_SPACING}px - 1.6px)` }"
            >
              <div class="ew-slab-cap" />
              <div class="ew-slab-hatch" />
            </div>
          </div>
        </div>

        <!-- 轿厢（长宽比 1:1.6 的立体长方体：宽 118px、高 190px，与层高严格等高） -->
        <div class="ew-cabin">
          <!-- 轿顶绳头悬挂架与导靴 -->
          <div class="ew-cabin-top-hitch">
            <div class="ew-hitch-anchor" />
            <div class="ew-hitch-guide ew-hitch-guide-l" />
            <div class="ew-hitch-guide ew-hitch-guide-r" />
          </div>

          <!-- 轿顶暖光 LED 窄灯条 -->
          <div class="ew-light" />

          <!-- 轿厢内壁精致简约竖线装饰 -->
          <div class="ew-cabin-decor-l" />
          <div class="ew-cabin-decor-r" />

          <!-- 站在秤上的人（放大至上方预留约 1.5 个头宽的自然净空，秤示数大而醒目） -->
          <div class="ew-person">
            <PersonWeightSvg
              :fn-ratio="reading / BASE_READING"
              :needle-ratio="reading / BASE_READING"
              :reading="reading"
              :show-forces="false"
              :ground="false"
            />
          </div>

          <!-- 轿厢底部缓冲橡胶座 -->
          <div class="ew-cabin-bottom-base" />
        </div>
      </div>

      <!-- 示数读数栏 -->
      <div class="ew-reading">
        <span class="ew-reading-label">秤的示数</span>
        <span class="ew-reading-value">{{ reading }}<span class="ew-unit">N</span></span>
      </div>
    </div>

    <!-- 右侧：控制按钮与讲解正文插槽 -->
    <div class="ew-right">
      <div class="ew-buttons">
        <button type="button" :class="{ 'ew-on': playing === 'up' }" @click="startProcess('up')">
          <svg
            class="ew-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M 12 19 V 5" />
            <path d="M 5 12 L 12 5 L 19 12" />
          </svg>
          上升过程
        </button>
        <button
          type="button"
          :class="{ 'ew-on': playing === 'down' }"
          @click="startProcess('down')"
        >
          <svg
            class="ew-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M 12 5 V 19" />
            <path d="M 19 12 L 12 19 L 5 12" />
          </svg>
          下降过程
        </button>
      </div>

      <div class="ew-content">
        <slot>
          <div class="ew-status-panel">
            <div class="ew-status-header">
              <div class="ew-status-badge" :class="`ew-status-${motionPhase.state}`">
                <span class="ew-status-dot" />
                <span class="ew-status-title">{{ motionPhase.name }}</span>
                <span class="ew-status-tag">{{ motionPhase.tag }}</span>
              </div>
              <span class="ew-status-accel" v-if="motionPhase.state === 'overweight'"
                >a 竖直向上 ↑</span
              >
              <span
                class="ew-status-accel ew-accel-down"
                v-else-if="motionPhase.state === 'underweight'"
                >a 竖直向下 ↓</span
              >
              <span class="ew-status-accel" v-else>a = 0 平衡</span>
            </div>

            <p class="ew-status-desc">{{ motionPhase.desc }}</p>

            <div class="ew-phase-steps">
              <div
                class="ew-step-card"
                :class="{
                  'ew-step-active':
                    playing === 'up'
                      ? motionPhase.state === 'overweight'
                      : playing === 'down' && motionPhase.state === 'underweight',
                }"
              >
                <div class="ew-step-tag">阶段一 · 起始加速</div>
                <div class="ew-step-formula">
                  {{ playing === "down" ? "向下加速 (失重)" : "向上加速 (超重)" }}
                </div>
                <div class="ew-step-num">{{ playing === "down" ? "480 N" : "720 N" }}</div>
              </div>

              <div
                class="ew-step-card"
                :class="{ 'ew-step-active': playing && motionPhase.state === 'normal' }"
              >
                <div class="ew-step-tag">阶段二 · 中间匀速</div>
                <div class="ew-step-formula">匀速巡航 (等重)</div>
                <div class="ew-step-num">600 N</div>
              </div>

              <div
                class="ew-step-card"
                :class="{
                  'ew-step-active':
                    playing === 'up'
                      ? motionPhase.state === 'underweight'
                      : playing === 'down' && motionPhase.state === 'overweight',
                }"
              >
                <div class="ew-step-tag">阶段三 · 末尾减速</div>
                <div class="ew-step-formula">
                  {{ playing === "down" ? "向下减速 (超重)" : "向上减速 (失重)" }}
                </div>
                <div class="ew-step-num">{{ playing === "down" ? "720 N" : "480 N" }}</div>
              </div>
            </div>

            <div class="ew-tips">
              <span class="ew-tip-icon">💡</span>
              <span
                >规律：<b>加速度向上就超重，加速度向下就失重</b>；视重的增减仅取决于加速度方向，与速度方向无关。</span
              >
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ew {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  min-width: 0;
  height: 424px;
}

/* ── 左侧：电梯井道 + 秤示数 ── */
.ew-left {
  display: flex;
  flex: 0 0 292px;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
}

.ew-stage {
  position: relative;
  flex: 1 1 auto;
  overflow: hidden;
  min-width: 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-bg-soft);
}

/* 顶部滑轮机械区 */
.ew-top-machinery {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 8;
  pointer-events: none;
}

.ew-sheave-svg {
  width: 100%;
  height: 60px;
}

/* 顶部滑轮到轿顶绳头的垂直悬挂钢缆（零间隙直通入轿厢吊头，绝不悬空） */
.ew-suspension-cables {
  position: absolute;
  top: 32px;
  bottom: calc(50% + 104px);
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  pointer-events: none;
  z-index: 7;
}

.ew-scable {
  position: absolute;
  top: 0;
  bottom: 0;
}

.ew-scable-l {
  left: 0;
  width: 1.6px;
  background: var(--c-text-dim);
  opacity: 0.85;
}

.ew-scable-m {
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  top: 15px; /* 从主滑轮下缘中心切点垂直引出 */
  background: var(--c-accent);
  box-shadow: 0 0 4px color-mix(in srgb, var(--c-accent) 40%, transparent);
}

.ew-scable-r {
  right: 0;
  width: 1.6px;
  background: var(--c-text-dim);
  opacity: 0.85;
}

/* 侧边对重侧细钢缆（通长垂直贯穿） */
.ew-counterweight-cable {
  position: absolute;
  top: 36px;
  left: 105px;
  bottom: 0;
  width: 1.2px;
  border-left: 1px dashed var(--c-border);
  opacity: 0.65;
  pointer-events: none;
  z-index: 2;
}

/* 垂直导轨（贴合井道壁边缘立柱） */
.ew-guide-rail {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2.5px;
  background: var(--c-text-dim);
  opacity: 0.7;
  z-index: 4;
}

.ew-guide-l {
  left: 85px;
}

.ew-guide-r {
  right: 85px;
}

/* 两侧楼层板井道墙（延展至 85px，与导轨完全连接，消除空隙） */
.ew-wall {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 85px;
  z-index: 3;
  overflow: hidden;
}

.ew-wall-l {
  left: 0;
}

.ew-wall-r {
  right: 0;
}

.ew-floors {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 0;
}

/* 楼层截面线框：纯净优雅建筑剖面，顶面为地坪行走线，无任何黄粗线 */
.ew-slab {
  position: absolute;
  left: 0;
  right: 0;
  height: 12px;
  background: color-mix(in srgb, var(--c-surface-solid) 82%, transparent);
  border-top: 1.6px solid var(--c-text-dim);
  border-bottom: 1.2px solid color-mix(in srgb, var(--c-text-dim) 40%, transparent);
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
}

/* 剖面精细混凝土 45° 剖面浅纹 */
.ew-slab-hatch {
  flex: 1 1 auto;
  height: 100%;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 4px,
    color-mix(in srgb, var(--c-text-dim) 14%, transparent) 4px,
    color-mix(in srgb, var(--c-text-dim) 14%, transparent) 5px
  );
}

/* 楼板与导轨交接处的井道端部封头梁（门套立柱，厚实贴合导轨） */
.ew-slab-cap {
  flex: 0 0 3px;
  width: 3px;
  height: 100%;
  background: var(--c-text-dim);
  opacity: 0.85;
}

/* ── 轿厢（长宽比 1:1.6，宽 118px、高 190px，与层高严格 1:1 等高） ── */
.ew-cabin {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 118px;
  height: 190px;
  border: 1.6px solid var(--c-text-dim);
  border-radius: 6px 6px 3px 3px;
  background: var(--c-surface);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  overflow: visible;
  z-index: 6;
}

/* 轿顶绳头悬挂板 */
.ew-cabin-top-hitch {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 38px;
  height: 12px;
  border: 1.5px solid var(--c-text-dim);
  border-bottom: none;
  background: var(--c-surface);
  border-radius: 3px 3px 0 0;
}

.ew-hitch-anchor {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 4px;
  background: var(--c-accent);
  border-radius: 1px;
}

/* 轿顶吊顶灯条 */
.ew-light {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 3px;
  border-radius: 2px;
  background: var(--c-accent);
  box-shadow: 0 0 10px var(--c-accent);
  opacity: 0.85;
}

/* 轿厢内壁简约侧立线 */
.ew-cabin-decor-l {
  position: absolute;
  top: 18px;
  bottom: 24px;
  left: 6px;
  width: 1px;
  border-left: 1px solid var(--c-border);
  opacity: 0.5;
}

.ew-cabin-decor-r {
  position: absolute;
  top: 18px;
  bottom: 24px;
  right: 6px;
  width: 1px;
  border-right: 1px solid var(--c-border);
  opacity: 0.5;
}

/* 轿底减振垫底脚 */
.ew-cabin-bottom-base {
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 104px;
  height: 4px;
  border-bottom: 2px solid var(--c-text-dim);
  border-radius: 0 0 2px 2px;
  opacity: 0.8;
}

/*
  人在电梯里的容器：
  - 宽 144px，高 164px（PersonWeightSvg 比例 200:227）；
  - 轿厢总高 190px，人物+秤总高度 156.4px；
  - 秤底板紧贴轿厢底边（margin-bottom: 0）；
  - 头顶上方净空: 190 - 156.4 = 33.6px；
  - 人物头部高度为 22.4px，33.6px / 22.4px = 1.50 个头高，完美契合 1.5 个头宽的教学演示视距！
  - 秤面宽 89.3px，在 118px 轿厢内居中停放，示数窗口 52px 宽，示数大而清晰！
*/
.ew-person {
  width: 144px;
  height: 164px;
  line-height: 0;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 2;
  pointer-events: none;
}

/* 示数标签 */
.ew-reading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  min-width: 0;
  padding: 0 0.15rem;
}

.ew-reading-label {
  color: var(--c-text-dim);
  font-size: 0.95rem;
}

.ew-reading-value {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 2.5rem;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.ew-unit {
  margin-left: 0.2rem;
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 1rem;
}

/* ── 右侧控制栏 ── */
.ew-right {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;
}

.ew-buttons {
  display: flex;
  gap: 0.7rem;
  min-width: 0;
}

button {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-surface);
  color: var(--c-text);
  font: inherit;
  font-weight: 600;
  font-size: 0.98rem;
  white-space: nowrap;
  cursor: pointer;
  transition:
    border-color 0.16s ease,
    color 0.16s ease,
    background-color 0.16s ease;
}

button:hover {
  border-color: var(--c-border-glow);
  color: var(--c-accent);
}

.ew-icon {
  width: 1.05rem;
  height: 1.05rem;
}

.ew-on {
  border-color: var(--c-border-glow) !important;
  background: var(--c-accent-soft) !important;
  color: var(--c-accent) !important;
}

.ew-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  min-height: 0;
}

/* ── 默认插槽：教学状态面板 ── */
.ew-status-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.15rem;
  background: var(--c-bg-soft);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}

.ew-status-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.ew-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.88rem;
}

.ew-status-overweight {
  background: color-mix(in srgb, var(--c-danger) 16%, transparent);
  color: var(--c-danger);
  border: 1px solid color-mix(in srgb, var(--c-danger) 32%, transparent);
}

.ew-status-underweight {
  background: color-mix(in srgb, var(--c-accent-2) 16%, transparent);
  color: var(--c-accent-2);
  border: 1px solid color-mix(in srgb, var(--c-accent-2) 32%, transparent);
}

.ew-status-normal {
  background: color-mix(in srgb, var(--c-accent) 16%, transparent);
  color: var(--c-accent);
  border: 1px solid color-mix(in srgb, var(--c-accent) 32%, transparent);
}

.ew-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
}

.ew-status-tag {
  font-size: 0.72rem;
  padding: 0.08rem 0.45rem;
  border-radius: 4px;
  background: currentColor;
  color: #090d1a;
  font-weight: 700;
}

.ew-status-accel {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--c-danger);
  background: color-mix(in srgb, var(--c-danger) 10%, transparent);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.ew-accel-down {
  color: var(--c-accent-2);
  background: color-mix(in srgb, var(--c-accent-2) 10%, transparent);
}

.ew-status-desc {
  margin: 0;
  color: var(--c-text-dim);
  font-size: 0.86rem;
  line-height: 1.5;
}

.ew-phase-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

.ew-step-card {
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ew-step-active {
  border-color: var(--c-border-glow);
  background: var(--c-accent-soft);
  box-shadow: 0 0 12px color-mix(in srgb, var(--c-accent) 22%, transparent);
  transform: translateY(-1px);
}

.ew-step-tag {
  font-size: 0.7rem;
  color: var(--c-text-dim);
}

.ew-step-formula {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--c-text);
}

.ew-step-num {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--c-accent);
  font-variant-numeric: tabular-nums;
}

.ew-tips {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: 0.78rem;
  color: var(--c-text-dim);
  line-height: 1.45;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--c-accent) 8%, transparent);
  border: 1px dashed color-mix(in srgb, var(--c-accent) 25%, transparent);
}

.ew-tip-icon {
  font-size: 0.85rem;
  line-height: 1.2;
}
</style>
