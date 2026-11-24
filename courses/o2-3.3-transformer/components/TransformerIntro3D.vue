<script setup lang="ts">
/**
 * 第 4 页（P4）：变压器的结构与作用（5 击，全屏 3D 舞台 + 按击浮现的文字浮层，参照 CoreMasterScene.vue）
 *
 * 严格按第三轮《给Gemini的任务清单.md》 §1 实现：
 *
 * - 0 击（step = 0）：正视图 + 构造定义浮层（独占）。
 * - 第 1 击（step = 1）：正视图不变，定义淡出，换成原理提问浮层（独占）。
 * - 第 2 击（step = 2）：镜头绕到原线圈（只露左半截在右侧），左侧浮出原线圈说明（独占）。
 * - 第 3 击（step = 3）：镜头下沉绕到铁芯（只露上半截在下半区），上方浮出闭合铁芯说明（独占）。
 * - 第 4 击（step = 4）：镜头绕到副线圈（只露右半截在左侧），右侧浮出副线圈说明（独占）。
 * - 第 5 击（step = 5）：镜头拉远、变压器整体缩小在左侧，右侧一次性全出「构造定义 + 三条说明」（字号同步缩小，四块互不重叠）。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";
import type { ProjectedTransformerAnchors } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const stageSize = reactive({ w: 883, h: 400 });

const anchors = reactive<ProjectedTransformerAnchors>({
  leftCoil: { x: 185, y: 245 },
  rightCoil: { x: 355, y: 245 },
  coreTop: { x: 270, y: 82 },
});

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const isStep0 = computed(() => step === 0);
const isStep1 = computed(() => step === 1);
const isStep2 = computed(() => step === 2);
const isStep3 = computed(() => step === 3);
const isStep4 = computed(() => step === 4);
const isStep5 = computed(() => step >= 5);

const leftPt = computed(() => {
  const sx = 880 / Math.max(stageSize.w, 1);
  const sy = 400 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.leftCoil.x * sx),
    y: Math.round(anchors.leftCoil.y * sy),
  };
});

const rightPt = computed(() => {
  const sx = 880 / Math.max(stageSize.w, 1);
  const sy = 400 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.rightCoil.x * sx),
    y: Math.round(anchors.rightCoil.y * sy),
  };
});

const corePt = computed(() => {
  const sx = 880 / Math.max(stageSize.w, 1);
  const sy = 400 / Math.max(stageSize.h, 1);
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
  <div class="ti-root">
    <!-- Three.js 全屏 3D 舞台 -->
    <div ref="stageEl" class="ti-stage">
      <svg
        v-if="mode === '2d'"
        viewBox="0 0 880 400"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 140 85 H 400 V 315 H 140 Z M 192 135 V 265 H 348 V 135 Z"
          fill="var(--c-surface-solid)"
          fill-rule="evenodd"
          stroke="var(--c-neutral-500)"
          stroke-width="2"
        />
        <Solenoid
          :x="166"
          :y="200"
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
          :y="200"
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

    <!-- 3D 锚点实时投影引线层（随镜头旋转和位移实时跟随） -->
    <svg
      class="ti-overlay"
      viewBox="0 0 880 400"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- 0 / 1 击：正视图下指到闭合铁芯与两个线圈的构造标注 -->
      <g :opacity="isStep0 || isStep1 ? 1 : 0" class="ti-fade">
        <polyline
          :points="`${corePt.x},${corePt.y} ${corePt.x + 24},${corePt.y - 36} ${corePt.x + 72},${corePt.y - 36}`"
          fill="none"
          stroke="#e2e8f0"
          stroke-width="1.6"
          stroke-dasharray="4 3"
        />
        <circle :cx="corePt.x" :cy="corePt.y" r="3.5" fill="#e2e8f0" />
        <text
          :x="corePt.x + 80"
          :y="corePt.y - 31"
          text-anchor="start"
          font-size="15"
          font-weight="700"
          fill="#e2e8f0"
        >
          闭合铁芯
        </text>

        <polyline
          :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 22},${leftPt.y + 44} ${leftPt.x - 58},${leftPt.y + 44}`"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="1.6"
          stroke-dasharray="4 3"
        />
        <circle :cx="leftPt.x" :cy="leftPt.y" r="3.5" fill="var(--c-accent-2)" />
        <text
          :x="leftPt.x - 66"
          :y="leftPt.y + 49"
          text-anchor="end"
          font-size="15"
          font-weight="700"
          fill="var(--c-accent-2)"
        >
          线圈
        </text>

        <polyline
          :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 22},${rightPt.y + 44} ${rightPt.x + 58},${rightPt.y + 44}`"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.6"
          stroke-dasharray="4 3"
        />
        <circle :cx="rightPt.x" :cy="rightPt.y" r="3.5" fill="var(--c-accent)" />
        <text
          :x="rightPt.x + 66"
          :y="rightPt.y + 49"
          text-anchor="start"
          font-size="15"
          font-weight="700"
          fill="var(--c-accent)"
        >
          线圈
        </text>
      </g>

      <!-- 第 2 击：原线圈（初级）实时跟随引线 -->
      <g :opacity="isStep2 ? 1 : 0" class="ti-fade">
        <polyline
          :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 22},${leftPt.y + 44} ${leftPt.x - 54},${leftPt.y + 44}`"
          fill="none"
          stroke="var(--c-accent-2)"
          stroke-width="1.8"
          stroke-dasharray="4 3"
        />
        <circle :cx="leftPt.x" :cy="leftPt.y" r="3.8" fill="var(--c-accent-2)" />
        <text
          :x="leftPt.x - 60"
          :y="leftPt.y + 49"
          text-anchor="end"
          font-size="15"
          font-weight="700"
          fill="var(--c-accent-2)"
        >
          原线圈（初级）
        </text>
      </g>

      <!-- 第 3 击：闭合铁芯实时跟随引线 -->
      <g :opacity="isStep3 ? 1 : 0" class="ti-fade">
        <polyline
          :points="`${corePt.x},${corePt.y} ${corePt.x + 24},${corePt.y - 34} ${corePt.x + 76},${corePt.y - 34}`"
          fill="none"
          stroke="#e2e8f0"
          stroke-width="1.8"
          stroke-dasharray="4 3"
        />
        <circle :cx="corePt.x" :cy="corePt.y" r="3.8" fill="#e2e8f0" />
        <text
          :x="corePt.x + 84"
          :y="corePt.y - 29"
          text-anchor="start"
          font-size="15"
          font-weight="700"
          fill="#e2e8f0"
        >
          闭合铁芯
        </text>
      </g>

      <!-- 第 4 击：副线圈（次级）实时跟随引线 -->
      <g :opacity="isStep4 ? 1 : 0" class="ti-fade">
        <polyline
          :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 22},${rightPt.y + 44} ${rightPt.x + 54},${rightPt.y + 44}`"
          fill="none"
          stroke="var(--c-accent)"
          stroke-width="1.8"
          stroke-dasharray="4 3"
        />
        <circle :cx="rightPt.x" :cy="rightPt.y" r="3.8" fill="var(--c-accent)" />
        <text
          :x="rightPt.x + 60"
          :y="rightPt.y + 49"
          text-anchor="start"
          font-size="15"
          font-weight="700"
          fill="var(--c-accent)"
        >
          副线圈（次级）
        </text>
      </g>
    </svg>

    <!-- 0 击：构造定义（独占，正视图在左、定义在右） -->
    <div class="ti-zone ti-zone-right-center" :class="{ 'is-hidden': !isStep0 }">
      <DefinitionBox term="变压器的构造">
        <div>
          变压器由<span class="def-term">闭合铁芯</span>和绕在铁芯上的<span class="def-term"
            >两个线圈</span
          >组成。
        </div>
      </DefinitionBox>
    </div>

    <!-- 1 击：原理提问（独占，定义淡出换成提问） -->
    <div class="ti-zone ti-zone-right-center" :class="{ 'is-hidden': !isStep1 }">
      <div class="ask ti-ask-single">两个线圈之间没有导线直接相连，电能是如何传输的？</div>
    </div>

    <!-- 2 击：原线圈说明（独占，镜头绕到原线圈在右，文字浮在左侧） -->
    <div class="ti-zone ti-zone-left" :class="{ 'is-hidden': !isStep2 }">
      <div class="ti-float-card ti-card-blue">
        <span class="step-no">1</span>
        <div class="ti-float-text">
          <b>原线圈（初级线圈）</b>通入交变电流 → 产生<b>变化的磁场</b>
        </div>
      </div>
    </div>

    <!-- 3 击：闭合铁芯说明（独占，铁芯上半截在下半区，文字浮在铁芯上方） -->
    <div class="ti-zone ti-zone-top" :class="{ 'is-hidden': !isStep3 }">
      <div class="ti-float-card ti-card-silver">
        <span class="step-no">2</span>
        <div class="ti-float-text"><b>闭合铁芯</b>导磁 → 约束原线圈产生的磁场，使它穿过副线圈</div>
      </div>
    </div>

    <!-- 4 击：副线圈说明（独占，副线圈在左，文字浮在右侧） -->
    <div class="ti-zone ti-zone-right" :class="{ 'is-hidden': !isStep4 }">
      <div class="ti-float-card ti-card-gold">
        <span class="step-no">3</span>
        <div class="ti-float-text">
          <b>副线圈（次级线圈）</b>在变化的磁场中产生<b>感应电动势</b>
        </div>
      </div>
    </div>

    <!-- 5 击：拉远复盘（四块一次全出：构造定义 + 三条说明，字号同步缩小，单列纵向排在右侧） -->
    <div class="ti-zone ti-zone-right-chain" :class="{ 'is-hidden': !isStep5 }">
      <div class="ti-recap-def">
        <DefinitionBox term="变压器的构造">
          <div>
            变压器由<span class="def-term">闭合铁芯</span>和绕在铁芯上的<span class="def-term"
              >两个线圈</span
            >组成。
          </div>
        </DefinitionBox>
      </div>

      <div class="ti-chain-row ti-card-blue">
        <span class="step-no">1</span>
        <div class="ti-chain-text">
          <b>原线圈（初级线圈）</b>通入交变电流 → 产生<b>变化的磁场</b>
        </div>
      </div>

      <div class="ti-chain-row ti-card-silver">
        <span class="step-no">2</span>
        <div class="ti-chain-text"><b>闭合铁芯</b>导磁 → 约束原线圈产生的磁场，使它穿过副线圈</div>
      </div>

      <div class="ti-chain-row ti-card-gold">
        <span class="step-no">3</span>
        <div class="ti-chain-text">
          <b>副线圈（次级线圈）</b>在变化的磁场中产生<b>感应电动势</b>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ti-root {
  position: relative;
  overflow: visible;
  width: 100%;
  height: 400px;
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

/* 参照 CoreMasterScene.vue 的绝对定位浮层写法 */
.ti-zone {
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

/* 0 击与 1 击：正视图在左，定义/提问在右侧居中 */
.ti-zone-right-center {
  top: 0;
  right: 0;
  bottom: 0;
  width: 42%;
}

.ti-ask-single {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.45;
}

.ti-float-card {
  display: flex;
  gap: 0.75rem;
  align-items: center;

  padding: 0.78rem 1.15rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: var(--radius-lg);

  background: linear-gradient(135deg, rgb(20 28 44 / 84%), rgb(10 15 26 / 70%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 9%),
    0 12px 30px rgb(0 0 0 / 24%);

  backdrop-filter: blur(16px);
}

/* 2 击：原线圈在右，文字浮在左侧并从左边缘探出 */
.ti-zone-left {
  top: 0;
  bottom: 0;
  left: -1.95rem;
  width: 50%;
}

.ti-zone-left .ti-float-card {
  padding: 0.85rem 1.2rem 0.85rem 2.3rem;
  border-left: none;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

/* 3 击：铁芯上半截在下方，文字浮在铁芯上方居中 */
.ti-zone-top {
  top: 0.45rem;
  left: 50%;
  width: 68%;
  transform: translateX(-50%);
}

/* 4 击：副线圈在左，文字浮在右侧并从右边缘探出 */
.ti-zone-right {
  top: 0;
  right: -1.95rem;
  bottom: 0;
  width: 50%;
}

.ti-zone-right .ti-float-card {
  padding: 0.85rem 2.3rem 0.85rem 1.2rem;
  border-right: none;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

.ti-float-text {
  color: var(--c-text);
  font-size: 0.96rem;
  line-height: 1.42;
}

.ti-card-blue {
  border-color: var(--c-accent-2-border);
}

.ti-card-silver {
  border-color: rgb(226 232 240 / 38%);
}

.ti-card-gold {
  border-color: var(--c-accent-border);
}

/* 5 击：拉远复盘 —— 照 CoreMasterScene.vue 的 .cm-zone-right-chain 纵向排四块，字号同步缩小 */
.ti-zone-right-chain {
  top: 0;
  right: -1.95rem;
  bottom: 0;

  gap: 0.48rem;

  width: 55.5%;
  padding: 0.25rem 0 0.25rem 1rem;
}

.ti-recap-def {
  --def-pad-y: 0.36rem;
  --def-pad-x: 0.78rem;
  margin-right: 1.95rem;
  font-size: 0.78rem;
}

.ti-chain-row {
  display: flex;
  gap: 0.6rem;
  align-items: center;

  padding: 0.48rem 1.95rem 0.48rem 0.9rem;
  border: 1px solid rgb(255 255 255 / 10%);
  border-right: none;
  border-radius: var(--radius-md) 0 0 var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 44 / 82%), rgb(10 15 26 / 68%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 7%),
    0 8px 22px rgb(0 0 0 / 20%);

  backdrop-filter: blur(14px);
}

.ti-chain-text {
  color: var(--c-text);
  font-size: 0.78rem;
  line-height: 1.38;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
