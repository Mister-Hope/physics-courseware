<script setup lang="ts">
/**
 * 第 3 页（P3）：一条连续 3D 镜头拆解供电链（7 击，按教师第 4 轮精细指令实现）
 *
 * 点击节奏：
 *
 * - 0 击（C0）：起点——手表与磁吸充电器充电近景，长白线延伸出左侧画面外。
 * - 第 1 击（C1）：镜头从手表/充电器拉远并左移，顺着长白线自然露出末端的 **USB Type-C 插头**。
 * - 第 2 击（C2）：充电器与 USB Type-C 插头在插座平面上同步旋转 90°，两片竖直扁插脚插进国标五孔插座上部两孔（地线两侧），Type-C 插进适配器。
 * - 第 3 击（C3）：先展示墙面插座 **220 V 交流**。
 * - 第 4 击（C4）：再点击显示问题 **220 V 能直接给手表充电吗？**
 * - 第 5 击（C5）：再点击显示 **电源适配器** 标题，底下是一个问号 **？**
 * - 第 6 击（C6）：再点击显示电源适配器底部的文字 **220 V ⇒ 5 V**
 * - 第 7 击（C7）：拔出 USB，整个表连带着充电头、充电线向右飞出画面；插座脱离两个插头向左飞出画面； 充电器旋转到屏幕中央正面显示（**插头在下、USB 在上**），做完动效后自动浮现指针与文字提示 **《变压器》**。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { WatchIntroModel } from "./watch3d/watchModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const showTransformerPointer = ref(false);

let model: WatchIntroModel | null = null;
let observer: IntersectionObserver | null = null;
let pointerTimer: ReturnType<typeof setTimeout> | null = null;

const isC1 = computed(() => step === 1);
const isC2 = computed(() => step === 2);
const isC3ToC6 = computed(() => step >= 3 && step <= 6);
const showSocket220 = computed(() => step >= 3 && step <= 6);
const showQuestion = computed(() => step >= 4 && step <= 6);
const showAdapterTitle = computed(() => step >= 5 && step <= 6);
const showAdapterQuestionMark = computed(() => step === 5);
const showAdapterTransform = computed(() => step === 6);
const isC7 = computed(() => step >= 7);

const clearPointerTimer = (): void => {
  if (pointerTimer != null) {
    clearTimeout(pointerTimer);
    pointerTimer = null;
  }
};

const syncC7PointerReveal = (nextStep: number): void => {
  clearPointerTimer();
  if (nextStep >= 7) {
    showTransformerPointer.value = false;
    // 等 750ms 拔出飞离与充电器旋转居中的动效完成后，自动浮现指针与《变压器》提示
    pointerTimer = setTimeout(() => {
      showTransformerPointer.value = true;
    }, 750);
  } else {
    showTransformerPointer.value = false;
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
    const instance = new WatchIntroModel(container, "chain");
    model = instance;
    mode.value = "3d";
    instance.setStep(step);
    syncC7PointerReveal(step);
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
    syncC7PointerReveal(nextStep);
  },
);

onMounted(() => {
  if (!stageEl.value) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

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
  clearPointerTimer();
  observer?.disconnect();
  observer = null;
  releaseModel();
});
</script>

<template>
  <div class="pc3-root">
    <!-- Three.js 全屏透明背景 3D 连续供电链舞台 -->
    <div ref="stageEl" class="pc3-stage">
      <svg v-if="mode === '2d'" viewBox="0 0 880 455" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="90" y="170" width="90" height="90" rx="14" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="2" />
        <rect x="230" y="180" width="110" height="70" rx="18" fill="var(--c-neutral-200)" />
        <line x1="340" y1="215" x2="640" y2="215" stroke="var(--c-neutral-200)" stroke-width="6" />
        <rect x="640" y="150" width="110" height="130" rx="26" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="2" />
      </svg>
    </div>

    <!-- C1 提示标签：露出白线与 USB Type-C 插头 -->
    <div class="pc3-tag" :class="{ 'is-hidden': !isC1 }">
      <span class="pc3-dot pc3-dot-blue" />
      <span>充电线末端 · <b>USB Type-C 插头</b></span>
    </div>

    <!-- C2 提示标签：旋转 90° 插入国标墙面插座 -->
    <div class="pc3-tag" :class="{ 'is-hidden': !isC2 }">
      <span>完整供电链路：<b>插座 → 电源适配器 → Type-C 供电线 → 磁吸充电器 → 手表</b></span>
    </div>

    <!-- C4–C6 顶部/中上方核心提问：220 V 能直接给手表充电吗？ -->
    <div class="pc3-top-question" :class="{ 'is-hidden': !showQuestion }"><Latex tex="220\ \text{V}" /> 能直接给手表充电吗？</div>

    <!-- C3–C6 底部对应节点标注：C3 出 220V 交流 -> C5 出 电源适配器 + ？ -> C6 变为 220V ⇒ 5V -->
    <div class="pc3-c3-hud" :class="{ 'is-hidden': !isC3ToC6 }">
      <div class="pc3-node-callout" :class="{ 'is-hidden': !showSocket220 }">
        <div class="pc3-node-name">墙面插座</div>
        <div class="pc3-node-val text-danger"><Latex tex="220\ \text{V}" /> 交流</div>
      </div>

      <div class="pc3-node-callout" :class="{ 'is-hidden': !showAdapterTitle }">
        <div class="pc3-node-name">电源适配器</div>
        <div class="pc3-adapter-sub">
          <div v-if="showAdapterQuestionMark" class="pc3-qmark text-accent">？</div>
          <div v-else-if="showAdapterTransform" class="pc3-node-val text-accent">
            <Latex tex="220\ \text{V} \Rightarrow 5\ \text{V}" />
          </div>
        </div>
      </div>
    </div>

    <!-- C7：拔出分离、充电器旋转到屏幕中央正面显示（插头在下、USB 在上）后，自动浮现指针与变压器文字提示 -->
    <div class="pc3-c7-reveal" :class="{ 'is-hidden': !(isC7 && showTransformerPointer) }">
      <svg class="pc3-pointer-svg" viewBox="0 0 880 455" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polyline points="440,210 532,155 595,155" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="440" cy="210" r="5" fill="var(--c-accent)" />
        <circle cx="440" cy="210" r="10" fill="none" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.65" />
      </svg>
      <div class="pc3-transformer-label">变压器</div>
    </div>
  </div>
</template>

<style scoped>
.pc3-root {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 455px;

  background: transparent;
}

.pc3-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.pc3-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.pc3-tag {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;

  display: inline-flex;
  gap: 0.5rem;
  align-items: center;

  color: var(--c-text);

  font-size: 1rem;
  white-space: nowrap;

  pointer-events: none;

  transition: opacity 0.3s ease;

  transform: translateX(-50%);
}

.pc3-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.pc3-dot-blue {
  background: var(--c-accent-2);
}

/* C4–C6 顶部/中上方核心提问 */
.pc3-top-question {
  position: absolute;
  top: 2.2rem;
  left: 38%;

  color: var(--c-text);

  font-weight: 700;
  font-size: 1.38rem;

  pointer-events: none;

  transition: opacity 0.35s ease;

  transform: translateX(-50%);
}

/* C3–C6 底部对应节点标注（对应上方左侧插座与中部白色适配器） */
.pc3-c3-hud {
  position: absolute;
  right: 1.5rem;
  bottom: 1.2rem;
  left: 2.2rem;

  display: grid;
  grid-template-columns: 11.5rem 16rem;
  gap: 2.2rem;
  align-items: start;

  pointer-events: none;

  transition: opacity 0.3s ease;
}

.pc3-node-callout {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: opacity 0.3s ease;
}

.pc3-node-name {
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 0.92rem;
}

.pc3-adapter-sub {
  min-height: 1.8rem;
}

.pc3-qmark {
  font-weight: 800;
  font-size: 1.45rem;
  line-height: 1.2;
}

.pc3-node-val {
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.35;
}

/* C7 充电器居中（插头在下、USB 在上）后自动浮现的指针与《变压器》提示 */
.pc3-c7-reveal {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}

.pc3-pointer-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.pc3-transformer-label {
  position: absolute;
  top: 132px;
  left: 604px;

  color: var(--c-accent);

  font-weight: 800;
  font-size: 1.65rem;
  letter-spacing: 0.04em;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
