<script setup lang="ts">
/**
 * 第 12 页（P12）：铁芯发热会让电压比变小吗？（3 击，静态 3D 铁芯涡流/微热机位 + 右侧思想引导文字）
 *
 * 严格按第三轮《给Gemini的任务清单.md》 §3 实现：
 *
 * - 直接复用 TransformerCoreModel ("iron-static") 场景，镜头对着铁芯，落定后画面不动，无循环动画。
 * - 第 0 拍（常显）：铁芯里消耗的能量，会改变电压比吗？
 * - 第 1 击：变化的磁通量在铁芯中激起涡流，铁芯发热。
 * - 第 2 击：P₁ > P₂（P₁ = P₂ + P_铁）
 * - 第 3 击：电压比仍是 U₁/U₂ = n₁/n₂，但 I₁ 变大：I₁/I₂ > n₂/n₁。
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const s1 = computed(() => step >= 1);
const s2 = computed(() => step >= 2);
const s3 = computed(() => step >= 3);

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
    const instance = new TransformerCoreModel(container, "iron-static");
    instance.setStep(0, true);
    model = instance;
    mode.value = "3d";
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
  observer?.disconnect();
  observer = null;
  releaseModel();
});
</script>

<template>
  <div class="ti-loss-wrap">
    <!-- 左栏：静态 3D 铁芯涡流与发热特写 -->
    <div class="ti-loss-stage-box">
      <div ref="stageEl" class="ti-loss-stage">
        <svg
          v-if="mode === '2d'"
          viewBox="0 0 420 350"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 70 80 H 350 V 270 H 70 Z M 130 140 V 210 H 290 V 140 Z"
            fill="var(--c-surface-solid)"
            fill-rule="evenodd"
            stroke="var(--c-neutral-500)"
            stroke-width="2"
          />
          <ellipse
            cx="170"
            cy="110"
            rx="10"
            ry="22"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="2"
          />
          <ellipse
            cx="210"
            cy="110"
            rx="10"
            ry="22"
            fill="none"
            stroke="var(--c-danger)"
            stroke-width="2"
          />
          <ellipse
            cx="250"
            cy="110"
            rx="10"
            ry="22"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>

    <!-- 右栏：第 0 拍提问 + 3 击思想引导（严格照抄文案，全部使用 div + is-hidden 占位） -->
    <div class="ti-loss-right">
      <div class="ask ti-loss-ask">铁芯里消耗的能量，会改变电压比吗？</div>

      <div class="ti-loss-card" :class="{ 'is-hidden': !s1 }">
        <div class="ti-loss-text">变化的磁通量在铁芯中激起涡流，铁芯发热。</div>
      </div>

      <div class="ti-loss-card" :class="{ 'is-hidden': !s2 }">
        <div class="ti-loss-eq">
          <Latex tex="P_1 > P_2" />（<Latex tex="P_1 = P_2 + P_{\text{铁}}" />）
        </div>
      </div>

      <div class="ti-loss-card ti-loss-key" :class="{ 'is-hidden': !s3 }">
        <div class="ti-loss-text">
          电压比仍是 <Latex tex="\dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" />，但
          <Latex tex="I_1" /> 变大：<Latex tex="\dfrac{I_1}{I_2} > \dfrac{n_2}{n_1}" />。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ti-loss-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.35fr);
  gap: 1.15rem;
  align-items: center;

  width: 100%;
  min-width: 0;
  height: 410px;
}

.ti-loss-stage-box {
  position: relative;
  overflow: hidden;
  height: 360px;
}

.ti-loss-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.ti-loss-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.ti-loss-right {
  display: flex;
  flex-direction: column;
  gap: 0.72rem;
  justify-content: center;

  min-width: 0;
}

.ti-loss-ask {
  margin: 0;
  font-size: 1.06rem;
  line-height: 1.4;
}

.ti-loss-card {
  padding: 0.68rem 0.98rem;
  border: 1px solid rgb(255 255 255 / 11%);
  border-left: 3px solid var(--c-accent);
  border-radius: var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 46 / 80%), rgb(10 15 28 / 64%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 7%),
    0 8px 22px rgb(0 0 0 / 18%);

  backdrop-filter: blur(14px);

  transition: opacity 0.3s ease;
}

.ti-loss-key {
  border-left-color: var(--c-danger);
}

.ti-loss-text {
  color: var(--c-text);
  font-size: 0.96rem;
  line-height: 1.55;
}

.ti-loss-eq {
  color: var(--c-text);
  font-weight: 700;
  font-size: 1.08rem;
  line-height: 1.45;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
