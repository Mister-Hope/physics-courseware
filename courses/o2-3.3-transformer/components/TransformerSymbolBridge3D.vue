<script setup lang="ts">
/**
 * 第 5 页（P5）：从实物到电路符号（2 击，置于第 4 页之后）
 *
 * 严格按第三轮《给Gemini的任务清单.md》 §5 实现：
 *
 * - 左边实物：直接复用第 4 页那套 3D 的正面静态镜头（TransformerCoreModel(container, "structure") 第 0 帧，静止不转）。
 * - 右边符号：用 §4 做好的 TransformerSymbolSvg。
 * - 点击节奏：
 *
 *   - 0 击：左侧实物正面（静止） + 文字「实物上的这两部分，在电路图里画成什么样？」
 *   - 1 击：右侧浮出符号 + 文字「一个铁芯 + 两个线圈：线圈画成一串半圆，铁芯画成一条闭合回路」
 *   - 2 击：符号上标出接线端与 n₁、n₂ + 文字「原线圈两端接交流电源，副线圈两端接负载；匝数记为 n₁、n₂」
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";
import type { ProjectedTransformerAnchors } from "./transformer3d/transformerModel";
import TransformerSymbolSvg from "./TransformerSymbolSvg.vue";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const stageSize = reactive({ w: 460, h: 320 });

const anchors = reactive<ProjectedTransformerAnchors>({
  leftCoil: { x: 158, y: 215 },
  rightCoil: { x: 302, y: 215 },
  coreTop: { x: 230, y: 72 },
});

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const showC1 = computed(() => step >= 1);
const showC2 = computed(() => step >= 2);

const leftPt = computed(() => {
  const sx = 460 / Math.max(stageSize.w, 1);
  const sy = 320 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.leftCoil.x * sx),
    y: Math.round(anchors.leftCoil.y * sy),
  };
});

const rightPt = computed(() => {
  const sx = 460 / Math.max(stageSize.w, 1);
  const sy = 320 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.rightCoil.x * sx),
    y: Math.round(anchors.rightCoil.y * sy),
  };
});

const corePt = computed(() => {
  const sx = 460 / Math.max(stageSize.w, 1);
  const sy = 320 / Math.max(stageSize.h, 1);
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
    const instance = new TransformerCoreModel(container, "structure", handleAnchorsUpdate);
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
  <div class="tsb-root">
    <!-- 顶部第 0 拍提问 -->
    <div class="ask tsb-ask">在电路图里如何表达变压器？</div>

    <!-- 中部：左实物正面静态 3D ↔ 右标准电路符号 -->
    <div class="tsb-compare">
      <!-- 左侧：第 4 页那套 3D 的正面静态镜头 -->
      <div class="tsb-left-box">
        <div ref="stageEl" class="tsb-stage">
          <svg
            v-if="mode === '2d'"
            viewBox="0 0 460 320"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 110 55 H 350 V 265 H 110 Z M 158 103 V 217 H 302 V 103 Z"
              fill="var(--c-surface-solid)"
              fill-rule="evenodd"
              stroke="var(--c-neutral-500)"
              stroke-width="2"
            />
            <Solenoid
              :x="134"
              :y="160"
              :length="98"
              :radius="26"
              :turns="8"
              direction="ccw"
              orientation="vertical"
              :phase="180"
              :line-width="2.4"
              color="var(--c-accent-2)"
            />
            <Solenoid
              :x="326"
              :y="160"
              :length="86"
              :radius="26"
              :turns="4"
              direction="cw"
              orientation="vertical"
              :phase="0"
              :line-width="2.4"
              color="var(--c-accent)"
            />
          </svg>
        </div>

        <!-- 实物正面的实时投影引线标注（闭合铁芯 + 原线圈 + 副线圈） -->
        <svg
          class="tsb-overlay"
          viewBox="0 0 460 320"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polyline
            :points="`${corePt.x},${corePt.y} ${corePt.x + 20},${corePt.y - 32} ${corePt.x + 64},${corePt.y - 32}`"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="corePt.x" :cy="corePt.y" r="3.4" fill="#e2e8f0" />
          <text
            :x="corePt.x + 72"
            :y="corePt.y - 27"
            text-anchor="start"
            font-size="14"
            font-weight="700"
            fill="#e2e8f0"
          >
            闭合铁芯
          </text>

          <polyline
            :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 18},${leftPt.y + 38} ${leftPt.x - 48},${leftPt.y + 38}`"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="leftPt.x" :cy="leftPt.y" r="3.4" fill="var(--c-accent-2)" />
          <text
            :x="leftPt.x - 54"
            :y="leftPt.y + 43"
            text-anchor="end"
            font-size="14"
            font-weight="700"
            fill="var(--c-accent-2)"
          >
            原线圈
          </text>

          <polyline
            :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 18},${rightPt.y + 38} ${rightPt.x + 48},${rightPt.y + 38}`"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="rightPt.x" :cy="rightPt.y" r="3.4" fill="var(--c-accent)" />
          <text
            :x="rightPt.x + 54"
            :y="rightPt.y + 43"
            text-anchor="start"
            font-size="14"
            font-weight="700"
            fill="var(--c-accent)"
          >
            副线圈
          </text>
        </svg>
      </div>

      <!-- 中间转换箭头 -->
      <div class="tsb-arrow" :class="{ 'is-hidden': !showC1 }">⇒</div>

      <!-- 右侧：教材电路符号（第 1 击浮出符号，第 2 击标出接线端与 n₁、n₂） -->
      <div class="tsb-right-box" :class="{ 'is-hidden': !showC1 }">
        <div class="tsb-symbol-wrap">
          <TransformerSymbolSvg :show-labels="showC2" :show-terminals="showC2" />
        </div>
      </div>
    </div>

    <!-- 底部一句话说明（不带序号圆圈，去掉标号 2 的那句话，只留文字） -->
    <div class="tsb-note-card" :class="{ 'is-hidden': !showC1 }">
      <div class="tsb-note-text">线圈画成一串半圆，原线圈和副线圈相对</div>
    </div>
  </div>
</template>

<style scoped>
.tsb-root {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  justify-content: space-between;

  width: 100%;
  min-width: 0;
  height: 410px;
}

.tsb-ask {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.35;
}

.tsb-compare {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) auto minmax(0, 0.95fr);
  gap: 0.65rem;
  align-items: center;

  min-width: 0;
  height: 255px;
}

.tsb-left-box {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.tsb-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.tsb-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.tsb-overlay {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.tsb-arrow {
  color: var(--c-accent);
  font-weight: 800;
  font-size: 1.85rem;
  transition: opacity 0.3s ease;
}

.tsb-right-box {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;

  transition: opacity 0.3s ease;
}

.tsb-symbol-wrap {
  width: 100%;
  max-width: 340px;
}

.tsb-note-card {
  display: flex;
  align-items: center;
  justify-content: center;

  /* 宽度自适应内容、整体居中，不撑满整页 */
  align-self: center;

  width: fit-content;
  max-width: 100%;
  padding: 0.65rem 1.4rem;
  border: 1px solid rgb(255 255 255 / 11%);
  border-radius: var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 46 / 80%), rgb(10 15 28 / 64%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 7%),
    0 8px 20px rgb(0 0 0 / 18%);

  backdrop-filter: blur(14px);

  transition: opacity 0.3s ease;
}

.tsb-note-text {
  color: var(--c-text);
  font-weight: 600;
  font-size: 0.96rem;
  line-height: 1.45;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
