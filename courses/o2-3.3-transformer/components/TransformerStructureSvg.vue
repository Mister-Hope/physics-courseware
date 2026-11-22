<script setup lang="ts">
/**
 * 第 4 页（P4）：变压器的结构与作用（3 击，M10, M13, M14, §6, §6.5）
 *
 * 严格按 07-给Gemini4的执行指令.md §1 M10 & §4 & §6：
 *
 * - 左侧采用真 3D 写实变压器（圆角金属铁芯 + 12:4 细绕组 + 双接线柱 u~ + 写实色环电阻 + 闭合铁芯 5 条纯箭头环流）
 * - 0 击：整体 3D 变压器，展示教材定义（闭合铁芯 + 绕在铁芯上的两个线圈）
 * - C1（step >= 1）：聚焦原线圈（初级线圈）：与交流电源连接，标注 u ~
 * - C2（step >= 2）：聚焦副线圈（次级线圈）：与负载电阻连接
 * - C3（step >= 3）：铁芯变半透明并保留 3D 线框，展示内部闭合磁路箭头环流——“铁芯把磁感线约束在闭合磁路中，磁通量几乎全部穿过两个线圈”
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
    const instance = new TransformerCoreModel(container, "structure");
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
    <!-- 左栏：写实 3D 变压器 + 不压器件的引线标注 -->
    <div class="ts3-stage-box">
      <div ref="stageEl" class="ts3-stage">
        <svg v-if="mode === '2d'" viewBox="0 0 540 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

      <!-- 避开导线的引线标注层 -->
      <svg class="ts3-overlay" viewBox="0 0 540 385" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- 原线圈标注（C1 出现，避开导线，在左下方） -->
        <g :opacity="s1 ? 1 : 0" class="ts3-fade">
          <polyline points="178,275 162,332 138,332" fill="none" stroke="var(--c-accent-2)" stroke-width="1.5" stroke-dasharray="4 3" />
          <circle cx="178" cy="275" r="3" fill="var(--c-accent-2)" />
          <text x="132" y="337" text-anchor="end" font-size="15" font-weight="700" fill="var(--c-accent-2)">原线圈（初级）</text>
        </g>
        <!-- 副线圈标注（C2 出现，避开导线，在右下方） -->
        <g :opacity="s2 ? 1 : 0" class="ts3-fade">
          <polyline points="335,275 362,332 415,332" fill="none" stroke="var(--c-physics)" stroke-width="1.5" stroke-dasharray="4 3" />
          <circle cx="335" cy="275" r="3" fill="var(--c-physics)" />
          <text x="422" y="336" text-anchor="start" font-size="15" font-weight="700" fill="var(--c-physics)">副线圈（次级）</text>
        </g>
        <!-- 闭合铁芯标注（C3 出现，在正上方） -->
        <g :opacity="s3 ? 1 : 0" class="ts3-fade">
          <polyline points="260,82 285,36 340,36" fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-dasharray="4 3" />
          <circle cx="260" cy="82" r="3" fill="var(--c-accent)" />
          <text x="348" y="41" text-anchor="start" font-size="15" font-weight="700" fill="var(--c-accent)">闭合铁芯</text>
        </g>
      </svg>
    </div>

    <!-- 右栏：教材定义与三要素（教材原话上屏，M10 & M13） -->
    <div class="ts3-info">
      <DefinitionBox term="变压器的构造">
        <div>变压器由<span class="def-term">闭合铁芯</span>和绕在铁芯上的<span class="def-term">两个线圈</span>组成。</div>
      </DefinitionBox>

      <div class="ts3-item ts3-item-blue" :class="{ 'is-hidden': !s1 }">
        <span class="ts3-dot ts3-dot-blue" />
        <div>
          <div class="ts3-item-title">原线圈（初级线圈）</div>
          <div class="ts3-item-desc">与<b>交流电源</b>（<Latex tex="u" />）相连接的线圈</div>
        </div>
      </div>

      <div class="ts3-item ts3-item-teal" :class="{ 'is-hidden': !s2 }">
        <span class="ts3-dot ts3-dot-teal" />
        <div>
          <div class="ts3-item-title">副线圈（次级线圈）</div>
          <div class="ts3-item-desc">与<b>负载</b>（用电器）相连接的线圈</div>
        </div>
      </div>

      <div class="ts3-item ts3-item-gold" :class="{ 'is-hidden': !s3 }">
        <span class="ts3-dot ts3-dot-gold" />
        <div>
          <div class="ts3-item-title">闭合铁芯</div>
          <div class="ts3-item-desc">把磁感线约束在闭合磁路中，使磁通量几乎全部穿过两个线圈。</div>
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

  height: 365px;
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
  transition: opacity 0.35s ease;
}

.ts3-info {
  --def-pad-y: 0.42rem;
  --def-pad-x: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
  min-width: 0;
}

.ts3-item {
  display: flex;
  gap: 0.55rem;
  align-items: center;

  padding: 0.34rem 0.75rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);

  transition: opacity 0.3s ease;
}

.ts3-item-blue {
  border-color: var(--c-accent-2-border);
}

.ts3-item-teal {
  border-color: color-mix(in srgb, var(--c-physics) 38%, transparent);
}

.ts3-item-gold {
  border-color: color-mix(in srgb, var(--c-accent) 42%, transparent);
}

.ts3-dot {
  flex: none;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}

.ts3-dot-blue {
  background: var(--c-accent-2);
}

.ts3-dot-teal {
  background: var(--c-physics);
}

.ts3-dot-gold {
  background: var(--c-accent);
}

.ts3-item-title {
  color: var(--c-text);
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1.3;
}

.ts3-item-desc {
  margin-top: 0.12rem;
  color: var(--c-text-dim);
  font-size: 0.85rem;
  line-height: 1.35;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
