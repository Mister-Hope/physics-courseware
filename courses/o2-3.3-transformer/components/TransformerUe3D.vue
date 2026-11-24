<script setup lang="ts">
/**
 * 第 11 页（P11）：实际变压器的 U 与 E（3 击，复用第 10 页同一台 3D 与同一组机位）
 *
 * 视线顺序与第 10 页完全一致：整体 → 原线圈 → 副线圈 → 拉远；只换右侧文字。 3D 走 derivation 模式的现成 pose（0 整体 / 1 原线圈 / 3 副线圈 / 5
 * 拉远），不改模型。
 *
 * - 0 击：提问「线圈有电阻，U = E 还成立吗？」
 * - C1（step >= 1）：推到原线圈 —— 电源侧，U₁ = E₁ + I₁r₁（U₁ 比 E₁ 大）
 * - C2（step >= 2）：推到副线圈 —— 输出侧，U₂ = E₂ − I₂r₂（U₂ 比 E₂ 小）
 * - C3（step >= 3）：拉远汇总 —— U₁/U₂ > n₁/n₂，实测偏低（铜损）
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const isCameraMoving = ref(false);
let cameraMoveTimer: ReturnType<typeof setTimeout> | null = null;

// 三块文字互斥，且切镜移动过程中（720ms）先隐藏文字，等变压器飞到位后再浮现文字，彻底消除移动过程中变压器与文字重叠！
const s1 = computed(() => step === 1 && !isCameraMoving.value);
const s2 = computed(() => step === 2 && !isCameraMoving.value);
const s3 = computed(() => step >= 3 && !isCameraMoving.value);

const clearCameraTimer = (): void => {
  if (cameraMoveTimer != null) {
    clearTimeout(cameraMoveTimer);
    cameraMoveTimer = null;
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
    const instance = new TransformerCoreModel(container, "ue");
    instance.setStep(step, true);
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
  (nextStep, prevStep) => {
    clearCameraTimer();
    if (nextStep !== prevStep) {
      isCameraMoving.value = true;
      cameraMoveTimer = setTimeout(() => {
        isCameraMoving.value = false;
      }, 720);
    }
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
  clearCameraTimer();
  observer?.disconnect();
  observer = null;
  releaseModel();
});
</script>

<template>
  <div class="ue3-root">
    <div ref="stageEl" class="ue3-stage">
      <svg
        v-if="mode === '2d'"
        viewBox="0 0 960 455"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 300 95 H 560 V 325 H 300 Z M 352 145 V 275 H 508 V 145 Z"
          fill="var(--c-surface-solid)"
          fill-rule="evenodd"
          stroke="var(--c-neutral-500)"
          stroke-width="2"
        />
        <Solenoid
          :x="326"
          :y="210"
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
          :x="534"
          :y="210"
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

    <div class="ask ue3-ask">线圈有电阻，<Latex tex="U = E" /> 还成立吗？</div>

    <div
      class="ue3-note"
      :class="[s3 ? 'ue3-note-recap-a' : 'ue3-note-left', { 'is-hidden': !(s1 || s3) }]"
    >
      <div class="ue3-head ue3-head-blue">原线圈 · 电源侧</div>
      <div class="ue3-eq"><Latex tex="U_1 = E_1 + I_1 r_1" /></div>
      <div class="ue3-key ue3-key-blue">
        内阻分压 → <Latex tex="U_1" /> 高于 <Latex tex="E_1" />
      </div>
    </div>

    <div
      class="ue3-note"
      :class="[s3 ? 'ue3-note-recap-b' : 'ue3-note-right', { 'is-hidden': !(s2 || s3) }]"
    >
      <div class="ue3-head ue3-head-gold">副线圈 · 输出侧</div>
      <div class="ue3-eq"><Latex tex="U_2 = E_2 - I_2 r_2" /></div>
      <div class="ue3-key ue3-key-gold">
        内阻分压 → <Latex tex="U_2" /> 低于 <Latex tex="E_2" />
      </div>
    </div>

    <div class="ue3-note ue3-note-right ue3-note-sum" :class="{ 'is-hidden': !s3 }">
      <div class="ue3-eq"><Latex tex="\dfrac{U_1}{U_2} > \dfrac{n_1}{n_2}" /></div>
      <div class="ue3-key ue3-key-gold">实测偏低 · 铜损</div>
    </div>
  </div>
</template>

<style scoped>
.ue3-root {
  /* 位置微调旋钮：在 slides.md 里写 style="--ue3-left-top: 46%" 即可覆盖，不影响其它页 */
  --ue3-ask-top: 0.2rem;
  --ue3-ask-width: 44%;
  --ue3-left-top: 56%;
  --ue3-right-top: 54%;
  --ue3-note-width: 39%;

  position: relative;
  width: 100%;
  height: 455px;
}

.ue3-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.ue3-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.ue3-ask {
  position: absolute;
  top: var(--ue3-ask-top);
  left: 0;

  max-width: var(--ue3-ask-width);

  font-size: 1rem;
  line-height: 1.38;
}

/* 文字始终待在 3D 主体的另一侧：原线圈那击模型在右、副线圈与汇总那击模型在左 */
.ue3-note {
  position: absolute;
  top: 50%;

  display: flex;
  flex-direction: column;
  gap: 0.28rem;

  width: var(--ue3-note-width);
  padding: 0.35rem 0 0.35rem 0.95rem;
  border-left: 3px solid var(--c-border);

  transition: opacity 0.25s ease;

  transform: translateY(-50%);
}

.ue3-note-left {
  top: var(--ue3-left-top);
  left: 0.4rem;
  border-left-color: var(--c-accent-2);
}

.ue3-note-right {
  top: var(--ue3-right-top);
  right: 0.4rem;
  border-left-color: var(--c-accent);
}

/* 最后一击：右侧竖排「原线圈分析 + 副线圈分析 + 结论」三块，块之间留出明显间距，与左侧变压器严格错开 */
.ue3-note-recap-a,
.ue3-note-recap-b {
  right: 0.4rem;
  left: auto;
  width: 43%;
  transform: none;
}

.ue3-note-recap-a {
  top: 5%;
  border-left-color: var(--c-accent-2);
}

.ue3-note-recap-b {
  top: 40%;
  border-left-color: var(--c-accent);
}

.ue3-note-sum {
  top: 75%;
  right: 0.4rem;
  bottom: auto;

  width: 43%;
  border-left-color: var(--c-accent);

  transform: none;
}

.ue3-head {
  font-weight: 800;
  font-size: 0.98rem;
}

.ue3-head-blue {
  color: var(--c-accent-2);
}

.ue3-head-gold {
  color: var(--c-accent);
}

.ue3-eq {
  color: var(--c-text);
  font-size: 1.1rem;
}

.ue3-key {
  display: flex;
  gap: 0.3rem;
  align-items: baseline;
  font-size: 0.94rem;
}

.ue3-key-blue {
  color: var(--c-accent-2);
}

.ue3-key-gold {
  color: var(--c-accent);
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
