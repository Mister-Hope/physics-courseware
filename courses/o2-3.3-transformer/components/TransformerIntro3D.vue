<script setup lang="ts">
/**
 * 第 4 页（P4）：变压器的结构与原理合并页（4 击，无公式、无 U/n 符号）
 *
 * 严格按《给Gemini的任务清单.md》 §1 实现：
 *
 * - 0 击（step = 0）：完全正视图的 3D 变压器（STRUCTURE_POSES[0]）+ 右侧构造定义 DefinitionBox（严格保留）。
 * - 第 1 击（step = 1）：正视图保持，右栏把定义换成原理的提问“两个线圈之间没有导线直接相连，电能是如何传输的？”。
 * - 第 2 击（step = 2）：原线圈（初级线圈）引线 + 右栏第 1 条“原线圈（初级线圈）通入交变电流 → 产生变化的磁场” + 3D
 *   演原线圈电流与磁通（PRINCIPLE_POSES[1]）。
 * - 第 3 击（step = 3）：闭合铁芯引线 + 右栏第 2 条“闭合铁芯导磁 → 约束原线圈产生的磁场，使它穿过副线圈” + 3D 演铁芯闭合磁路（PRINCIPLE_POSES[2]）。
 * - 第 4 击（step = 4）：副线圈（次级线圈）引线 + 右栏第 3 条“副线圈（次级线圈）在变化的磁场中产生感应电动势” + 3D
 *   演副线圈感应电流（PRINCIPLE_POSES[3]）；不加“靠互感工作”的总结。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";
import type { ProjectedTransformerAnchors } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const stageSize = reactive({ w: 540, h: 350 });

const anchors = reactive<ProjectedTransformerAnchors>({
  leftCoil: { x: 185, y: 245 },
  rightCoil: { x: 355, y: 245 },
  coreTop: { x: 270, y: 82 },
});

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const isStep0 = computed(() => step <= 1);
const showQuestion = computed(() => step >= 1);
const showPrimary = computed(() => step === 2);
const showCore = computed(() => step === 3);
const showSecondary = computed(() => step === 4);

const leftPt = computed(() => {
  const sx = 540 / Math.max(stageSize.w, 1);
  const sy = 350 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.leftCoil.x * sx),
    y: Math.round(anchors.leftCoil.y * sy),
  };
});

const rightPt = computed(() => {
  const sx = 540 / Math.max(stageSize.w, 1);
  const sy = 350 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.rightCoil.x * sx),
    y: Math.round(anchors.rightCoil.y * sy),
  };
});

const corePt = computed(() => {
  const sx = 540 / Math.max(stageSize.w, 1);
  const sy = 350 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.coreTop.x * sx),
    y: Math.round(anchors.coreTop.y * sy),
  };
});

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

const handleAnchorsUpdate = (next: ProjectedTransformerAnchors): void => {
  const container = stageEl.value;
  if (container && container.clientWidth > 0 && container.clientHeight > 0) {
    stageSize.w = container.clientWidth;
    stageSize.h = container.clientHeight;
  }
  anchors.leftCoil.x = next.leftCoil.x;
  anchors.leftCoil.y = next.leftCoil.y;
  anchors.rightCoil.x = next.rightCoil.x;
  anchors.rightCoil.y = next.rightCoil.y;
  anchors.coreTop.x = next.coreTop.x;
  anchors.coreTop.y = next.coreTop.y;
};

const startModel = (): void => {
  const container = stageEl.value;
  if (model || !container || container.clientWidth === 0) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  try {
    const instance = new TransformerCoreModel(container, "intro", handleAnchorsUpdate);
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
  <div class="ti-wrap">
    <!-- 左栏：写实 3D 变压器 + 3D 世界坐标实时投影引线标注 -->
    <div class="ti-stage-box">
      <div ref="stageEl" class="ti-stage">
        <svg
          v-if="mode === '2d'"
          viewBox="0 0 540 350"
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
            color="var(--c-accent)"
          />
        </svg>
      </div>

      <!-- 3D 锚点实时投影引线层：0/1 击在正视图下展示通用构造，2/3/4 击随 3D 镜头逐个报名字 -->
      <svg
        class="ti-overlay"
        viewBox="0 0 540 350"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <!-- 0 击：正视图下指到闭合铁芯与两个线圈的构造标注 -->
        <g :opacity="isStep0 ? 1 : 0" class="ti-fade">
          <polyline
            :points="`${corePt.x},${corePt.y} ${corePt.x + 24},${corePt.y - 38} ${corePt.x + 76},${corePt.y - 38}`"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="corePt.x" :cy="corePt.y" r="3.5" fill="#e2e8f0" />
          <text
            :x="corePt.x + 84"
            :y="corePt.y - 33"
            text-anchor="start"
            font-size="15"
            font-weight="700"
            fill="#e2e8f0"
          >
            闭合铁芯
          </text>

          <polyline
            :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 24},${leftPt.y + 46} ${leftPt.x - 62},${leftPt.y + 46}`"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="leftPt.x" :cy="leftPt.y" r="3.5" fill="var(--c-accent-2)" />
          <text
            :x="leftPt.x - 70"
            :y="leftPt.y + 51"
            text-anchor="end"
            font-size="15"
            font-weight="700"
            fill="var(--c-accent-2)"
          >
            线圈
          </text>

          <polyline
            :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 24},${rightPt.y + 46} ${rightPt.x + 62},${rightPt.y + 46}`"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="rightPt.x" :cy="rightPt.y" r="3.5" fill="var(--c-accent)" />
          <text
            :x="rightPt.x + 70"
            :y="rightPt.y + 51"
            text-anchor="start"
            font-size="15"
            font-weight="700"
            fill="var(--c-accent)"
          >
            线圈
          </text>
        </g>

        <!-- 第 2 击起：原线圈（初级）实时跟随引线 -->
        <g :opacity="showPrimary ? 1 : 0" class="ti-fade">
          <polyline
            :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 22},${leftPt.y + 46} ${leftPt.x - 54},${leftPt.y + 46}`"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.8"
            stroke-dasharray="4 3"
          />
          <circle :cx="leftPt.x" :cy="leftPt.y" r="3.8" fill="var(--c-accent-2)" />
          <text
            :x="leftPt.x - 60"
            :y="leftPt.y + 51"
            text-anchor="end"
            font-size="15"
            font-weight="700"
            fill="var(--c-accent-2)"
          >
            原线圈（初级）
          </text>
        </g>

        <!-- 第 3 击起：闭合铁芯实时跟随引线 -->
        <g :opacity="showCore ? 1 : 0" class="ti-fade">
          <polyline
            :points="`${corePt.x},${corePt.y} ${corePt.x + 24},${corePt.y - 38} ${corePt.x + 76},${corePt.y - 38}`"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="1.8"
            stroke-dasharray="4 3"
          />
          <circle :cx="corePt.x" :cy="corePt.y" r="3.8" fill="#e2e8f0" />
          <text
            :x="corePt.x + 84"
            :y="corePt.y - 33"
            text-anchor="start"
            font-size="15"
            font-weight="700"
            fill="#e2e8f0"
          >
            闭合铁芯
          </text>
        </g>

        <!-- 第 4 击起：副线圈（次级）实时跟随引线 -->
        <g :opacity="showSecondary ? 1 : 0" class="ti-fade">
          <polyline
            :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 22},${rightPt.y + 46} ${rightPt.x + 54},${rightPt.y + 46}`"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.8"
            stroke-dasharray="4 3"
          />
          <circle :cx="rightPt.x" :cy="rightPt.y" r="3.8" fill="var(--c-accent)" />
          <text
            :x="rightPt.x + 60"
            :y="rightPt.y + 51"
            text-anchor="start"
            font-size="15"
            font-weight="700"
            fill="var(--c-accent)"
          >
            副线圈（次级）
          </text>
        </g>
      </svg>
    </div>

    <!-- 右栏：0 击显示构造定义；第 1 击换成原理提问；2/3/4 击逐个部件“报名字 + 一句功能”（全部用 div + is-hidden 占位，零位移） -->
    <div class="ti-info">
      <!-- 0 击：严格保留的教材构造定义（叠放在同一容器顶部，与第 1 击提问原位切换，不顶跑下方三步） -->
      <div class="ti-top-slot">
        <div class="ti-def-layer" :class="{ 'is-hidden': !isStep0 }">
          <DefinitionBox term="变压器的构造">
            <div>
              变压器由<span class="def-term">闭合铁芯</span>和绕在铁芯上的<span class="def-term"
                >两个线圈</span
              >组成。
            </div>
          </DefinitionBox>
        </div>

        <div class="ask ti-ask" :class="{ 'is-hidden': !showQuestion }">
          两个线圈之间没有导线直接相连，电能是如何传输的？
        </div>
      </div>

      <!-- 第 2/3/4 击：三条部件名字 + 一句功能（无任何公式与 U/n 符号） -->
      <div class="step-list ti-steps">
        <div class="step-item" :class="{ 'is-hidden': step < 2 }">
          <span class="step-no">1</span>
          <div class="ti-step-body">
            <b>原线圈（初级线圈）</b>通入交变电流 → 产生<b>变化的磁场</b>
          </div>
        </div>

        <div class="step-item" :class="{ 'is-hidden': step < 3 }">
          <span class="step-no">2</span>
          <div class="ti-step-body"><b>闭合铁芯</b>导磁 → 约束原线圈产生的磁场，使它穿过副线圈</div>
        </div>

        <div class="step-item" :class="{ 'is-hidden': step < 4 }">
          <span class="step-no">3</span>
          <div class="ti-step-body">
            <b>副线圈（次级线圈）</b>在变化的磁场中产生<b>感应电动势</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ti-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 1.02fr);
  gap: 1.1rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.ti-stage-box {
  position: relative;
  overflow: hidden;
  height: 350px;
}

.ti-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.ti-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.ti-overlay {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.ti-fade {
  transition: opacity 0.28s ease;
}

.ti-info {
  --def-pad-y: 0.45rem;
  --def-pad-x: 0.88rem;
  --hint-pad-y: 0.36rem;

  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
}

.ti-top-slot {
  display: grid;
  align-items: center;
}

.ti-def-layer,
.ti-ask {
  grid-area: 1 / 1;
  transition: opacity 0.3s ease;
}

.ti-ask {
  margin: 0;
  font-size: 0.94rem;
  line-height: 1.38;
}

.ti-steps {
  gap: 0.42rem;
}

.ti-step-body {
  color: var(--c-text);
  font-size: 0.84rem;
  line-height: 1.38;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
