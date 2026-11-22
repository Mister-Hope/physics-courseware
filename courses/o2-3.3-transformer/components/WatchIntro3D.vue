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
 * - C4（step 4）：只显示送电线圈电流；无新增文字。
 * - C5（step 5）：出现灯笼磁场；送电线圈电流继续；受电线圈无电流；无新增文字。
 * - C6（step 6）：受电线圈出现感应电流；问题下方上屏答案 `利用了送电线圈与受电线圈之间的互感`（字号比问题再小半档）。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { WatchIntroModel } from "./watch3d/watchModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: WatchIntroModel | null = null;
let observer: IntersectionObserver | null = null;

const showC1 = computed(() => step >= 1);
const showC2 = computed(() => step >= 2);
const showC3 = computed(() => step >= 3);
const showC6 = computed(() => step >= 6);

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
    const instance = new WatchIntroModel(container, "intro");
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
        <div class="wi-answer" :class="{ 'is-hidden': !showC6 }">
          利用了送电线圈与受电线圈之间的互感
        </div>
      </div>
    </div>

    <!-- C3–C6 指针引线与小字线圈标签（09 §2：受电线圈（手表背盖内） / 送电线圈（充电器内），不压器件、避让右上校徽） -->
    <svg
      class="wi-leader-svg"
      :class="{ 'is-hidden': !showC3 }"
      viewBox="0 0 880 455"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- 指向表背受电线圈的引线 -->
      <polyline
        points="495,188 575,135 616,135"
        fill="none"
        stroke="var(--c-accent)"
        stroke-width="1.5"
        stroke-dasharray="4 3"
      />
      <circle cx="495" cy="188" r="3.2" fill="var(--c-accent)" />
      <!-- 指向充电头送电线圈的引线 -->
      <polyline
        points="596,258 608,310 616,310"
        fill="none"
        stroke="var(--c-accent-2)"
        stroke-width="1.5"
        stroke-dasharray="4 3"
      />
      <circle cx="596" cy="258" r="3.2" fill="var(--c-accent-2)" />
    </svg>

    <div class="wi-right-labels" :class="{ 'is-hidden': !showC3 }">
      <div class="wi-coil-label">
        <span class="wi-dot wi-dot-gold" />
        <span>受电线圈（手表背盖内）</span>
      </div>
      <div class="wi-coil-label">
        <span class="wi-dot wi-dot-blue" />
        <span>送电线圈（充电器内）</span>
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
  top: 52%;
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

.wi-right-labels {
  position: absolute;
  top: 0;
  right: 0.8rem;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  justify-content: center;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

/* 线圈标签用小字，无重型卡片框 */
.wi-coil-label {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;

  color: var(--c-text);

  font-weight: 600;
  font-size: 0.88rem;
}

.wi-dot {
  flex: none;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.wi-dot-gold {
  background: var(--c-accent);
}

.wi-dot-blue {
  background: var(--c-accent-2);
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
