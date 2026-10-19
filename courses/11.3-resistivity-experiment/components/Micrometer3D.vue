<script setup lang="ts">
/**
 * 第一课时：螺旋测微器三维演示（移植自 `~/projects/physics-modal` 的 Micrometer3D / geometry / textures）。
 *
 * 三维模型只负责"多一个视角"：读数一律由 `calculateMicrometerReading` 用同一套规则算出， 与二维刻度图（MicrometerSvg）完全一致——螺距 0.5 mm
 * ÷ 可动刻度 50 等分 = 0.01 mm/格。
 *
 * 三条工程约定：
 *
 * 1. Three 按需加载（首次可见时才 `await import`），离开该页暂停渲染，卸载时销毁 renderer 并释放 GPU 上下文；
 * 2. 拿不到 WebGL（headless 浏览器 / 关掉硬件加速的教室电脑 / 远程投屏）时**自动降级**为二维刻度图， 滑块与读数照常可用，不抛未捕获异常；
 * 3. 画布尺寸跟随容器，隐藏页尺寸为 0 时不初始化。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import type { Micrometer3D as Micrometer3DModel } from "./micrometer3d/model";
import type { ViewPreset } from "./micrometer3d/types";
import { calculateMicrometerReading } from "./micrometerReading";

const { step = 0 } = defineProps<{ step?: number }>();

/** 演示初始读数，与下一页的读数示例一致 */
const INITIAL_READING = 6.725;
const MAX_READING = 12;

const stage = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const reading = ref(INITIAL_READING);
const view = ref<ViewPreset>("overview");

const result = computed(() => calculateMicrometerReading(reading.value));
const readoutTex = computed(() => `l = ${result.value.formatted}\\ \\text{mm}`);
const sleeveTex = computed(() => `${result.value.sleeveTotalMm.toFixed(1)}\\ \\text{mm}`);
const thimbleTex = computed(
  () =>
    `${result.value.thimbleGrids.toFixed(1)} \\times 0.01\\ \\text{mm} = ${result.value.thimbleMm.toFixed(3)}\\ \\text{mm}`,
);

let model: Micrometer3DModel | null = null;
let intersectionObserver: IntersectionObserver | null = null;
let starting = false;

/** 显式探测 WebGL 能力（不要只靠 try/catch：拿不到上下文时有些浏览器不抛错） */
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

const fallbackTo2d = (): void => {
  releaseModel();
  mode.value = "2d";
};

const startModel = async (): Promise<void> => {
  const container = stage.value;
  if (model || starting || !container || container.clientWidth === 0) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  starting = true;
  try {
    const { Micrometer3D } = await import("./micrometer3d/model");
    const instance = new Micrometer3D(container, (value) => {
      const next = Math.round(value * 1000) / 1000;
      if (Math.abs(next - reading.value) > 0.0005) reading.value = next;
    });
    instance.setReading(reading.value, false);
    instance.setViewPreset(view.value);
    instance.controls.enablePan = false;
    instance.controls.enableZoom = false;
    model = instance;
    mode.value = "3d";
    container.addEventListener(
      "webglcontextlost",
      () => {
        fallbackTo2d();
      },
      { once: true },
    );
  } catch {
    mode.value = "2d";
  } finally {
    starting = false;
  }
};

/** 切换视角：不缩放、不拖拽平移，只保留拖动旋转 */
const setView = (preset: ViewPreset): void => {
  view.value = preset;
  model?.setViewPreset(preset);
};

watch(reading, (value) => {
  model?.setReading(value, true);
});

onMounted(() => {
  if (!stage.value) return;

  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (entry.isIntersecting) {
        void startModel();
        model?.setActive(true);
        model?.handleResize();
      } else {
        model?.setActive(false);
      }
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(stage.value);
});

onBeforeUnmount(() => {
  intersectionObserver?.disconnect();
  intersectionObserver = null;
  releaseModel();
});
</script>

<template>
  <div class="mm3d">
    <div ref="stage" class="mm3d-stage">
      <MicrometerSvg v-if="mode === '2d'" :reading="reading" :step="step" />
    </div>
    <div class="mm3d-panel">
      <div class="mm3d-value"><Latex :tex="readoutTex" /></div>
      <CourseSlider
        v-model="reading"
        :min="0"
        :max="MAX_READING"
        :step="0.001"
        accent="blue"
        layout="bare"
        aria-label="转动微分筒改变读数"
      />
      <div class="mm3d-views">
        <button
          type="button"
          class="mm3d-view"
          :class="{ 'is-active': view === 'overview' }"
          @click="setView('overview')"
        >
          整体
        </button>
        <button
          type="button"
          class="mm3d-view"
          :class="{ 'is-active': view === 'closeup' }"
          @click="setView('closeup')"
        >
          刻度特写
        </button>
      </div>
      <div class="mm3d-list">
        <div>固定刻度 <Latex :tex="sleeveTex" /></div>
        <div>可动刻度 <Latex :tex="thimbleTex" /></div>
      </div>
      <div v-if="mode === '2d'" class="mm3d-note">当前环境没有 WebGL，已改用二维刻度图</div>
    </div>
  </div>
</template>

<style scoped>
.mm3d {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  align-items: center;
  gap: 1.2rem;
  min-width: 0;
}

.mm3d-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  aspect-ratio: 2 / 1;
  overflow: hidden;
  border: 1px solid var(--c-border);
  border-radius: 1rem;
  background: radial-gradient(circle at 50% 40%, rgb(30 41 59 / 55%), rgb(9 13 26 / 90%));
}

.mm3d-stage :deep(canvas) {
  display: block;
}

.mm3d-panel {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
}

.mm3d-value {
  color: var(--c-accent);
  font-size: 1.45rem;
  font-variant-numeric: tabular-nums;
}

.mm3d-views {
  display: flex;
  gap: 0.5rem;
}

.mm3d-view {
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 0.6rem;
  color: var(--c-text-dim);
  background: var(--c-surface);
  font-size: 0.85rem;
  cursor: pointer;
}

.mm3d-view.is-active {
  border-color: var(--c-accent);
  color: var(--c-accent);
}

.mm3d-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--c-text-dim);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.mm3d-note {
  color: var(--c-text-mute);
  font-size: 0.75rem;
}
</style>
