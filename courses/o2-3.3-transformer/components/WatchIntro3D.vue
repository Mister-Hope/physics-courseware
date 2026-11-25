<script setup lang="ts">
/**
 * 第 2 页（P2）：Apple Watch 引课 3D 交互演示（6 击，09-第3轮修改方案版）
 *
 * 严格遵循 `09-第3轮修改方案-P2-P3与模型.md` §1 & §2 & §7：
 *
 * - 无深蓝色背景框、无卡片边框，3D 画布透明无缝嵌入 PPT 并占满整页，自动避让左上标题与右上校徽。
 * - 充电音效保留、默认开，页面无音效开关 UI。
 * - C0（step 0）：正面只展示手表，无文字、无充电器、无声音。
 * - C1（step 1）：充电动画 + 磁吸 + 充电音效；上屏 `无线磁吸充电`（C2 起缩成很小一行，把位置让给问答）。
 * - C2（step 2）：弹出问题 `电能是如何传输的？`（“没有导线连接”只在教师口头）。
 * - C3（step 3）：先绕到背面、再半透明；上屏标签 `送电线圈（充电器内）` / `受电线圈（手表背盖内）`；问题保留。
 * - C4（step 4）：送电线圈电流；送电线圈标签下补一行 `通入高频交流电`。
 * - C5（step 5）：灯笼磁场；撤掉上一行、改为指向磁场中心的 `不断变化的磁场`。
 * - C6（step 6）：受电线圈出现感应电流；受电线圈标签下补一行 `感应出不断变化的电流`，磁场标注保留。
 * - C7（step 7）：问题下方上屏答案 `利用了送电线圈与受电线圈之间的互感`（字号比问题再小半档）。
 *
 * 三处新增指示的圆点位置全部由 3D 实时投影给出（watchModel 的 getProjectedAnchors().field）， 不硬编码，换视口 / 换镜头都对得上。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import { WatchIntroModel } from "./watch3d/watchModel";
import type { ProjectedAnchors } from "./watch3d/watchModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: WatchIntroModel | null = null;
let observer: IntersectionObserver | null = null;

const isC8Return = computed(() => step >= 8);
const showC1 = computed(() => step >= 1 && !isC8Return.value);
const showC2 = computed(() => step >= 2 && !isC8Return.value);
const showC3 = computed(() => step >= 3 && !isC8Return.value);
const showTxCurrent = computed(() => step === 4);
const showField = computed(() => step >= 5 && !isC8Return.value);
const showRxCurrent = computed(() => step >= 6 && !isC8Return.value);
const showAnswer = computed(() => step >= 7 && !isC8Return.value);

/** 3D 投影锚点（容器像素；首帧前用与镜头姿态接近的默认值，避免圆点闪一下） */
const anchors = reactive<ProjectedAnchors>({
  socket: { x: -200, y: 0 },
  adapter: { x: -200, y: 0 },
  usbCable: { x: 700, y: 170 },
  pad: { x: 620, y: 260 },
  txCoil: { x: 596, y: 258 },
  rxCoil: { x: 495, y: 188 },
  watch: { x: 800, y: 300 },
  field: { x: 507, y: 164 },
  // 供电线中点：模型投影前先放在画面外，避免首帧圆点闪一下（与 socket / adapter 同理）
  cable: { x: -200, y: 0 },
});
const stageSize = reactive({ w: 883, h: 455 });

/** 容器像素 → 引线 SVG 的 viewBox 坐标 */
const toSvg = (point: { x: number; y: number }): { x: number; y: number } => ({
  x: (point.x * 880) / Math.max(stageSize.w, 1),
  y: (point.y * 455) / Math.max(stageSize.h, 1),
});

const rxSvg = computed(() => {
  const p = toSvg(anchors.rxCoil);
  return { x: p.x - 10, y: p.y - 24 };
});
const fieldSvg = computed(() => {
  const p = toSvg(anchors.field);
  return { x: p.x + 12, y: p.y - 54 };
});
const txSvg = computed(() => {
  const p = toSvg(anchors.txCoil);
  return { x: p.x - 10, y: p.y + 134 };
});

const handleAnchors = (next: ProjectedAnchors): void => {
  Object.assign(anchors, next);
  const container = stageEl.value;
  if (container && container.clientWidth > 0) {
    stageSize.w = container.clientWidth;
    stageSize.h = container.clientHeight;
  }
};

const hasWebGl = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const releaseModel = (): void => {
  model?.destroy();
  model = null;
};

const startModel = (): void => {
  const container = stageEl.value;
  if (model || !container || container.clientWidth === 0) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  try {
    const instance = new WatchIntroModel(container, "intro", handleAnchors);
    model = instance;
    mode.value = "3d";
    instance.setStep(step);
    container.addEventListener(
      "webglcontextlost",
      () => {
        releaseModel();
        mode.value = "2d";
      },
      { once: true },
    );
  } catch {
    mode.value = "2d";
  }
};

watch(
  () => step,
  (nextStep) => {
    model?.setStep(nextStep);
  },
);

onMounted(() => {
  if (!stageEl.value) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  // 页面挂载后立即同步初始化 3D 场景与纹理，消除翻到第 2 页时的网络请求与首次构建卡顿
  startModel();

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (entry.isIntersecting) {
        startModel();
        model?.setActive(true);
        model?.handleResize();
      } else {
        model?.setActive(false);
      }
    },
    { threshold: 0.05 },
  );
  observer.observe(stageEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  releaseModel();
});
</script>

<template>
  <div class="wi-root">
    <!-- Three.js 全屏透明背景 3D 舞台（无深蓝底、无卡片边框，无缝嵌入 PPT） -->
    <div ref="stageEl" class="wi-stage">
      <svg
        v-if="mode === '2d'"
        viewBox="0 0 880 460"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="380"
          y="100"
          width="160"
          height="190"
          rx="34"
          fill="var(--c-surface-solid)"
          stroke="var(--c-neutral-500)"
          stroke-width="3"
        />
        <circle
          v-if="showC1"
          cx="460"
          cy="195"
          r="46"
          fill="none"
          stroke="var(--c-ok)"
          stroke-width="5"
        />
      </svg>
    </div>

    <!-- 左侧提示卡区（避让左上标题安全区，C1 显示“无线磁吸充电”，C2 起缩成小标签让位给问答，C6 在问题下方出答案） -->
    <div class="wi-left-hud">
      <div class="wi-c1-title" :class="[{ 'is-hidden': !showC1 }, { 'is-compact': showC2 }]">
        无线磁吸充电
      </div>

      <div class="wi-qa-group" :class="{ 'is-hidden': !showC2 }">
        <div class="wi-question">电能是如何传输的？</div>
        <div class="wi-answer" :class="{ 'is-hidden': !showAnswer }">
          利用了送电线圈与受电线圈之间的互感
        </div>
      </div>
    </div>

    <!-- C3–C7 指针引线：起点由 3D 实时投影给出，终点落在右侧标签的圆点上 -->
    <svg
      class="wi-leader-svg"
      :class="{ 'is-hidden': !showC3 }"
      viewBox="0 0 880 455"
      preserveAspectRatio="none"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- 指向表背受电线圈外缘的引线（标签在左上方，水平段 + 短折线，不穿过半透明送电线圈也不压表背线圈内部） -->
      <polyline
        :points="`${rxSvg.x},${rxSvg.y} ${rxSvg.x - 24},72 286,72`"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.6"
        stroke-dasharray="4 3"
      />
      <circle :cx="rxSvg.x" :cy="rxSvg.y" r="3.6" fill="var(--c-accent)" />
      <!-- 指向充电器送电线圈右下外缘的引线（圆点落在圆盘右下外缘，不压进半透明圆盘内部） -->
      <polyline
        :points="`${txSvg.x},${txSvg.y} ${txSvg.x + 28},314 652,314`"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="1.6"
        stroke-dasharray="4 3"
      />
      <circle :cx="txSvg.x" :cy="txSvg.y" r="3.6" fill="var(--c-accent-2)" />
      <!-- C5 起：指向两线圈之间不断变化的磁场（从磁场顶部外缘沿表壳上方水平引向右侧空白区，绝不穿过受电线圈或送电线圈！） -->
      <g v-if="showField">
        <polyline
          :points="`${fieldSvg.x},${fieldSvg.y} ${fieldSvg.x + 18},88 652,88`"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          stroke-dasharray="4 3"
        />
        <circle :cx="fieldSvg.x" :cy="fieldSvg.y" r="3.6" fill="var(--c-accent)" />
      </g>
    </svg>

    <!-- C3 起：手表一侧的标注（受电线圈）放在左上角空白处，引线不跨过送电线圈 -->
    <div class="wi-left-notes" :class="{ 'is-hidden': !showC3 }">
      <div class="wi-coil-label">
        <span>受电线圈（手表背盖内）</span>
        <span class="wi-sub" :class="{ 'is-hidden': !showRxCurrent }">感应出不断变化的电流</span>
      </div>
    </div>

    <!-- C5 起：两线圈之间不断变化的磁场标注放在右上方空白处（与右下方送电线圈左边缘对齐，引线从磁场顶部外缘向右引，不穿越任何半透明圆盘或表背） -->
    <div class="wi-field-notes" :class="{ 'is-hidden': !showField }">
      <div class="wi-coil-label">
        <span>不断变化的磁场</span>
      </div>
    </div>

    <!-- C3 起：充电器一侧的标注（送电线圈），圆点落在送电线圈外缘 -->
    <div class="wi-right-labels" :class="{ 'is-hidden': !showC3 }">
      <div class="wi-coil-label">
        <span>送电线圈（充电器内）</span>
        <span class="wi-sub wi-sub-blue" :class="{ 'is-hidden': !showTxCurrent }">
          通入高频交流电
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 09 §1.3：不要深蓝底、不要卡片/圆角边框，透明无缝嵌入 PPT 整页，并自动避让顶栏左上标题与右上校徽 */
.wi-root {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 455px;

  background: transparent;
}

.wi-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.wi-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.wi-left-hud {
  position: absolute;

  /* 原先 52% 时文字正好压在充电线白线上，整块下移，让“无线磁吸充电”也落在白线以下 */
  top: 68%;
  left: 0.4rem;

  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: flex-start;

  max-width: 27.5%;

  pointer-events: none;

  transform: translateY(-50%);
}

.wi-c1-title {
  display: flex;
  align-items: center;

  height: 1.65rem;

  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.02em;

  transition:
    opacity 0.3s ease,
    font-size 0.3s ease,
    color 0.3s ease;
}

/* C2 起缩成很小一行（固定行盒高度不变，避免产生点击位移），把位置让给问答 */
.wi-c1-title.is-compact {
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 0.85rem;
}

.wi-qa-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  transition: opacity 0.3s ease;
}

/* 问题字号中/小，不压主模型 */
.wi-question {
  color: var(--c-text);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.4;
}

/* 答案在问题下方、字号再小半档 */
.wi-answer {
  color: var(--c-accent);

  font-weight: 600;
  font-size: 0.96rem;
  line-height: 1.45;

  transition: opacity 0.3s ease;
}

.wi-leader-svg {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

.wi-left-notes {
  position: absolute;
  top: 58px;
  left: 36px;

  display: flex;
  flex-direction: column;
  gap: 36px;
  align-items: flex-start;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

.wi-field-notes {
  position: absolute;
  top: 74px;
  left: 656px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

/* 送电线圈标签：放于充电器右下方空白区，蓝点落在圆盘右侧外缘，短折线相连，不压进半透明圆盘内部 */
.wi-right-labels {
  position: absolute;
  top: 300px;
  left: 656px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

/* 线圈标签用小字，无重型卡片框 */
.wi-coil-label {
  position: relative;

  display: inline-flex;
  gap: 0.45rem;
  align-items: center;

  color: var(--c-text);

  font-weight: 600;
  font-size: 0.88rem;
}

/* 标签下补的一行“电流/感应”说明：绝对定位挂在父标签下面，不参与排版，点击时不顶跑上面两行 */
.wi-sub {
  position: absolute;
  top: calc(100% + 0.1rem);
  left: 0;

  color: var(--c-accent);

  font-weight: 600;
  font-size: 0.82rem;
  white-space: nowrap;

  transition: opacity 0.3s ease;
}

.wi-sub-blue {
  left: 0;
  color: var(--c-accent-2);
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
