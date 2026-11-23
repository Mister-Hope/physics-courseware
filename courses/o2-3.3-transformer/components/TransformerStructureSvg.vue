<script setup lang="ts">
/**
 * 第 4 页（P4）：变压器的结构与作用（3 击，13-Gemini4修改清单.md §2.1 & §2.2）
 *
 * 点击顺序（严格落实 13 §2.2）：
 *
 * - 第 1 击（step = 1）：完全正视图的变压器；展示两个线圈和铁芯；用引线分别指到左线圈、右线圈、铁芯，出三个文字标注。
 * - 第 2 击（step = 2）：隐藏刚才的两个线圈通用标注；把模型向右旋转、把左侧放大；闪烁左（原）线圈；显示原线圈文字和引线。 【关键要求】：旋转过程中，原线圈的文字/引线锚点放在 3D 世界坐标里实时投影到屏幕，跟着 3D 模型一起旋转！
 * - 第 3 击（step = 3）：闪烁右（副）线圈；显示副线圈文字和 3D 世界坐标实时投影引线。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";
import type { ProjectedTransformerAnchors } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const stageSize = reactive({ w: 540, h: 365 });

// 3D 世界坐标实时投影到容器像素坐标系的锚点（随模型旋转每一帧同步更新）
const anchors = reactive<ProjectedTransformerAnchors>({
  leftCoil: { x: 185, y: 245 },
  rightCoil: { x: 355, y: 245 },
  coreTop: { x: 270, y: 82 },
});

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

// C1: 显示正视图的三个基础结构标注（线圈、线圈、铁芯）
const showC1GenericCoils = computed(() => step === 1);
const showCoreLabel = computed(() => step >= 1);
// C2: 隐藏刚才的两个通用线圈标注，向右旋转放大左侧，闪烁左（原）线圈，显示原线圈文字和跟随旋转的 3D 引线
const showPrimaryLabel = computed(() => step >= 2);
// C3: 闪烁右（副）线圈，显示副线圈文字和跟随 3D 的引线
const showSecondaryLabel = computed(() => step >= 3);

// 将容器像素坐标换算到 SVG overlay 的 540×365 视口坐标，使引线与文字跟随 3D 模型旋转
const leftPt = computed(() => {
  const sx = 540 / Math.max(stageSize.w, 1);
  const sy = 365 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.leftCoil.x * sx),
    y: Math.round(anchors.leftCoil.y * sy),
  };
});

const rightPt = computed(() => {
  const sx = 540 / Math.max(stageSize.w, 1);
  const sy = 365 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(anchors.rightCoil.x * sx),
    y: Math.round(anchors.rightCoil.y * sy),
  };
});

const corePt = computed(() => {
  const sx = 540 / Math.max(stageSize.w, 1);
  const sy = 365 / Math.max(stageSize.h, 1);
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
  <div class="ts3-wrap">
    <!-- 左栏：写实 3D 变压器 + 3D 世界坐标实时投影引线标注（随旋转实时跟随） -->
    <div class="ts3-stage-box">
      <div ref="stageEl" class="ts3-stage">
        <svg v-if="mode === '2d'" viewBox="0 0 540 365" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

      <!-- 3D 锚点实时投影引线层：锚点与折线、文字在旋转过程中全程跟随 3D 模型一起移动 -->
      <svg class="ts3-overlay" viewBox="0 0 540 365" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- 闭合铁芯标注（第 1 击起常显，跟随 3D 铁芯上横轭锚点） -->
        <g :opacity="showCoreLabel ? 1 : 0" class="ts3-fade">
          <polyline
            :points="`${corePt.x},${corePt.y} ${corePt.x + 24},${corePt.y - 42} ${corePt.x + 76},${corePt.y - 42}`"
            fill="none"
            stroke="#e2e8f0"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="corePt.x" :cy="corePt.y" r="3.5" fill="#e2e8f0" />
          <text :x="corePt.x + 84" :y="corePt.y - 37" text-anchor="start" font-size="15" font-weight="700" fill="#e2e8f0">闭合铁芯</text>
        </g>

        <!-- 第 1 击：正视图下指到左线圈、右线圈的通用“线圈”标注（第 2 击隐藏） -->
        <g :opacity="showC1GenericCoils ? 1 : 0" class="ts3-fade">
          <polyline
            :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 24},${leftPt.y + 52} ${leftPt.x - 62},${leftPt.y + 52}`"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="leftPt.x" :cy="leftPt.y" r="3.5" fill="var(--c-accent-2)" />
          <text :x="leftPt.x - 70" :y="leftPt.y + 57" text-anchor="end" font-size="15" font-weight="700" fill="var(--c-accent-2)">线圈</text>

          <polyline
            :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 24},${rightPt.y + 52} ${rightPt.x + 62},${rightPt.y + 52}`"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.6"
            stroke-dasharray="4 3"
          />
          <circle :cx="rightPt.x" :cy="rightPt.y" r="3.5" fill="var(--c-accent)" />
          <text :x="rightPt.x + 70" :y="rightPt.y + 57" text-anchor="start" font-size="15" font-weight="700" fill="var(--c-accent)">线圈</text>
        </g>

        <!-- 第 2 击：模型向右旋转并放大左侧时，原线圈的引线与文字跟随 3D 模型同步旋转移动！ -->
        <g :opacity="showPrimaryLabel ? 1 : 0" class="ts3-fade">
          <polyline
            :points="`${leftPt.x},${leftPt.y} ${leftPt.x - 22},${leftPt.y + 52} ${leftPt.x - 54},${leftPt.y + 52}`"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="1.8"
            stroke-dasharray="4 3"
          />
          <circle :cx="leftPt.x" :cy="leftPt.y" r="3.8" fill="var(--c-accent-2)" />
          <text :x="leftPt.x - 60" :y="leftPt.y + 57" text-anchor="end" font-size="15" font-weight="700" fill="var(--c-accent-2)">原线圈（初级）</text>
        </g>

        <!-- 第 3 击：闪烁右（副）线圈，显示副线圈文字和 3D 跟随引线 -->
        <g :opacity="showSecondaryLabel ? 1 : 0" class="ts3-fade">
          <polyline
            :points="`${rightPt.x},${rightPt.y} ${rightPt.x + 22},${rightPt.y + 52} ${rightPt.x + 54},${rightPt.y + 52}`"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="1.8"
            stroke-dasharray="4 3"
          />
          <circle :cx="rightPt.x" :cy="rightPt.y" r="3.8" fill="var(--c-accent)" />
          <text :x="rightPt.x + 60" :y="rightPt.y + 57" text-anchor="start" font-size="15" font-weight="700" fill="var(--c-accent)">副线圈（次级）</text>
        </g>
      </svg>
    </div>

    <!-- 右栏：教材定义与三要素（按第 1、2、3 击节奏同步点亮） -->
    <div class="ts3-info">
      <DefinitionBox term="变压器的构造">
        <div>变压器由<span class="def-term">闭合铁芯</span>和绕在铁芯上的<span class="def-term">两个线圈</span>组成。</div>
      </DefinitionBox>

      <div class="ts3-item ts3-item-gold" :class="{ 'is-hidden': !showCoreLabel }">
        <span class="ts3-dot ts3-dot-gold" />
        <div>
          <div class="ts3-item-title">闭合铁芯</div>
          <div class="ts3-item-desc">用来导磁、构成闭合磁路。</div>
        </div>
      </div>

      <div class="ts3-item ts3-item-blue" :class="{ 'is-hidden': !showPrimaryLabel }">
        <span class="ts3-dot ts3-dot-blue" />
        <div>
          <div class="ts3-item-title">原线圈（初级线圈）</div>
          <div class="ts3-item-desc">与<b>交流电源</b>相连接，输入交流电压 <Latex tex="U_1" />。</div>
        </div>
      </div>

      <div class="ts3-item ts3-item-teal" :class="{ 'is-hidden': !showSecondaryLabel }">
        <span class="ts3-dot ts3-dot-teal" />
        <div>
          <div class="ts3-item-title">副线圈（次级线圈）</div>
          <div class="ts3-item-desc">与<b>负载</b>相连接，输出感应交流电压 <Latex tex="U_2" />。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ts3-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.46fr) minmax(0, 1.04fr);
  gap: 1rem;
  align-items: center;

  width: 100%;
  min-width: 0;
}

.ts3-stage-box {
  position: relative;
  overflow: hidden;
  height: 325px;
}

.ts3-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.ts3-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.ts3-overlay {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.ts3-fade {
  transition: opacity 0.28s ease;
}

.ts3-info {
  --def-pad-y: 0.45rem;
  --def-pad-x: 0.88rem;

  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  min-width: 0;
}

.ts3-item {
  display: flex;
  gap: 0.6rem;
  align-items: center;

  padding: 0.42rem 0.82rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 46 / 76%), rgb(11 16 28 / 60%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 7%),
    0 8px 20px rgb(0 0 0 / 16%);

  backdrop-filter: blur(12px);

  transition: opacity 0.3s ease;
}

.ts3-item-blue {
  border-color: var(--c-accent-2-border);
}

.ts3-item-teal {
  border-color: color-mix(in srgb, var(--c-accent) 45%, transparent);
}

.ts3-item-gold {
  border-color: rgb(226 232 240 / 35%);
}

.ts3-dot {
  flex: none;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}

.ts3-dot-blue {
  background: var(--c-accent-2);
  box-shadow: 0 0 8px var(--c-accent-2);
}

.ts3-dot-teal {
  background: var(--c-accent);
  box-shadow: 0 0 8px var(--c-accent);
}

.ts3-dot-gold {
  background: #cbd5e1;
  box-shadow: 0 0 8px #cbd5e1;
}

.ts3-item-title {
  color: var(--c-text);
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1.3;
}

.ts3-item-desc {
  margin-top: 0.14rem;
  color: var(--c-text-dim);
  font-size: 0.85rem;
  line-height: 1.38;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
