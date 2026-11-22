<script setup lang="ts">
/**
 * 第 5 页（P5）：变压器的工作原理（放在实验前，3 击，不出现任何公式与 U/n 符号，M9 & M10 & M13）
 *
 * 严格按 07-给Gemini4的执行指令.md §1 M9 & §4 & §6：
 *
 * - 0 击：提问“原、副线圈之间没有导线直接相连，电能是如何从原线圈传输到副线圈的？”
 * - C1（step >= 1）：原线圈接入交变电流，大小和方向不断变化，激发变化的磁场（线圈半透明，血管式管内微粒子往返）
 * - C2（step >= 2）：闭合铁芯导磁（铁芯半透明+3D线框，5 条纯箭头环流随交流增强/减弱/反向），变化的磁通量几乎全部穿过两个线圈
 * - C3（step >= 3）：变化的磁通量在副线圈中激起感应电动势，闭合回路中产生感应电流（变压器利用互感现象工作；电场能 -> 磁场能 -> 电场能）
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

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
    const instance = new TransformerCoreModel(container, "principle");
    instance.setStep(step);
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
  <div class="tp-wrap">
    <!-- 左栏：写实 3D 变压器（聚焦磁感线时铁芯半透明+3D线框+5条纯箭头环流+管内红细胞微粒子） -->
    <div class="tp-stage-box">
      <div ref="stageEl" class="tp-stage">
        <svg
          v-if="mode === '2d'"
          viewBox="0 0 540 360"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 140 65 H 400 V 295 H 140 Z M 192 115 V 245 H 348 V 115 Z"
            fill="var(--c-surface-solid)"
            fill-rule="evenodd"
            stroke="var(--c-neutral-500)"
            stroke-width="2"
          />
          <Solenoid
            :x="166"
            :y="180"
            :length="110"
            :radius="30"
            :turns="8"
            direction="ccw"
            orientation="vertical"
            :phase="180"
            :line-width="2.4"
            color="var(--c-accent-2)"
          />
          <Solenoid
            :x="374"
            :y="180"
            :length="96"
            :radius="30"
            :turns="4"
            direction="cw"
            orientation="vertical"
            :phase="0"
            :line-width="2.4"
            color="var(--c-physics)"
          />
        </svg>
      </div>
    </div>

    <!-- 右栏：无任何公式与 U/n 符号，只讲“交变电流 -> 变化磁通 -> 铁芯导磁 -> 副线圈感应电流” -->
    <div class="tp-info">
      <div class="ask tp-ask">两个线圈之间没有导线直接相连，电能是如何传输的？</div>

      <div class="step-list tp-steps">
        <div class="step-item" :class="{ 'is-hidden': !s1 }">
          <span class="step-no">1</span>
          <div class="tp-step-body">
            <b>原线圈通入交变电流</b>：电流大小、方向不断变化，在铁芯中激发<b>变化的磁场</b>（电场能
            → 磁场能）。
          </div>
        </div>

        <div class="step-item" :class="{ 'is-hidden': !s2 }">
          <span class="step-no">2</span>
          <div class="tp-step-body">
            <b>闭合铁芯约束并导磁</b
            >：铁芯使变化的磁场几乎全部穿过副线圈，两线圈的<b>磁通量</b>同步变化。
          </div>
        </div>

        <div class="step-item" :class="{ 'is-hidden': !s3 }">
          <span class="step-no">3</span>
          <div class="tp-step-body">
            <b>副线圈产生感应电动势</b
            >：变化的磁场在副线圈中激起<b>感应电动势</b>，输出<b>感应电流</b>（磁场能 → 电场能）。
          </div>
        </div>
      </div>

      <div class="tip-hint" :class="{ 'is-hidden': !s3 }">
        <b>变压器利用互感现象工作。</b>原线圈必须通入变化的电流。
      </div>
    </div>
  </div>
</template>

<style scoped>
.tp-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.32fr) minmax(0, 1fr);
  gap: 1.3rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.tp-stage-box {
  position: relative;

  overflow: hidden;

  height: 360px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-xl);

  background: var(--c-bg);
}

.tp-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.tp-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.tp-info {
  --hint-pad-y: 0.32rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.tp-ask {
  font-size: 0.94rem;
  line-height: 1.35;
}

.tp-steps {
  gap: 0.32rem;
}

.tp-step-body {
  color: var(--c-text);
  font-size: 0.8rem;
  line-height: 1.32;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
