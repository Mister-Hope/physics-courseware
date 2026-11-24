<script setup lang="ts">
/**
 * 第 13 页（P13）：漏磁会让电压比变小吗？（3 击，静态 3D 原线圈漏磁机位 + 右侧思想引导文字）
 *
 * 严格按第三轮《给Gemini的任务清单.md》 §3 实现：
 *
 * - 直接复用 TransformerCoreModel ("leak-static") 场景，镜头对着原线圈一侧到铁芯外，落定后画面不动，无循环动画。
 * - 第 0 拍（常显）：磁场没有全部穿过副线圈，电压比会变吗？
 * - 第 1 击：一部分磁通量经空气自行闭合，不穿过副线圈。
 * - 第 2 击：\Phi_2 < \Phi_1 \ \Rightarrow\ \dfrac{E_2}{E_1} < \dfrac{n_2}{n_1}
 * - 第 3 击：漏磁把电压比拉低：\dfrac{U_2}{U_1} 比 \dfrac{n_2}{n_1} 更小。
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
    const instance = new TransformerCoreModel(container, "leak-static");
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
  <div class="tl-static-wrap">
    <!-- 左栏：静态 3D 原线圈漏磁机位（能清楚看出磁通量绕到铁芯之外、不进副线圈） -->
    <div class="tl-static-stage-box">
      <div ref="stageEl" class="tl-static-stage">
        <svg
          v-if="mode === '2d'"
          viewBox="0 0 420 350"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 90 60 H 330 V 290 H 90 Z M 138 108 V 242 H 282 V 108 Z"
            fill="var(--c-surface-solid)"
            fill-rule="evenodd"
            stroke="var(--c-neutral-500)"
            stroke-width="2"
          />
          <Solenoid
            :x="114"
            :y="175"
            :length="105"
            :radius="26"
            :turns="8"
            direction="ccw"
            orientation="vertical"
            :phase="180"
            :line-width="2.4"
            color="var(--c-accent-2)"
          />
          <Solenoid
            :x="306"
            :y="175"
            :length="92"
            :radius="26"
            :turns="4"
            direction="cw"
            orientation="vertical"
            :phase="0"
            :line-width="2.4"
            color="var(--c-accent)"
          />
          <g fill="none" stroke="var(--c-accent-2)" stroke-width="2" stroke-dasharray="4 3">
            <path d="M 118 118 C 192 98, 192 252, 118 232 Z" />
            <path d="M 118 130 C 166 116, 166 234, 118 220 Z" opacity="0.82" />
            <path d="M 108 120 C 46 104, 46 246, 108 230 Z" opacity="0.88" />
          </g>
        </svg>
      </div>
    </div>

    <!-- 右栏：第 0 拍提问 + 3 击思想引导（严格照抄文案，全部使用 div + is-hidden 占位） -->
    <div class="tl-static-right">
      <div class="ask tl-static-ask">磁场没有全部穿过副线圈，电压比会变吗？</div>

      <div class="tl-static-card" :class="{ 'is-hidden': !s1 }">
        <div class="tl-static-text">一部分磁通量经空气自行闭合，不穿过副线圈。</div>
      </div>

      <div class="tl-static-card" :class="{ 'is-hidden': !s2 }">
        <div class="tl-static-eq">
          <Latex tex="\Phi_2 < \Phi_1 \ \Rightarrow\ \dfrac{E_2}{E_1} < \dfrac{n_2}{n_1}" />
        </div>
      </div>

      <div class="tl-static-card tl-static-key" :class="{ 'is-hidden': !s3 }">
        <div class="tl-static-text">
          漏磁把电压比拉低：<Latex tex="\dfrac{U_2}{U_1}" /> 比
          <Latex tex="\dfrac{n_2}{n_1}" /> 更小。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tl-static-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.35fr);
  gap: 1.15rem;
  align-items: center;

  width: 100%;
  min-width: 0;
  height: 410px;
}

.tl-static-stage-box {
  position: relative;
  overflow: hidden;
  height: 360px;
}

.tl-static-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.tl-static-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.tl-static-right {
  display: flex;
  flex-direction: column;
  gap: 0.72rem;
  justify-content: center;

  min-width: 0;
}

.tl-static-ask {
  margin: 0;
  font-size: 1.06rem;
  line-height: 1.4;
}

.tl-static-card {
  padding: 0.68rem 0.98rem;
  border: 1px solid rgb(255 255 255 / 11%);
  border-left: 3px solid var(--c-accent-2);
  border-radius: var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 46 / 80%), rgb(10 15 28 / 64%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 7%),
    0 8px 22px rgb(0 0 0 / 18%);

  backdrop-filter: blur(14px);

  transition: opacity 0.3s ease;
}

.tl-static-key {
  border-left-color: var(--c-accent);
}

.tl-static-text {
  color: var(--c-text);
  font-size: 0.96rem;
  line-height: 1.55;
}

.tl-static-eq {
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
