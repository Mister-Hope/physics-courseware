<script setup lang="ts">
/**
 * P15（原 P16）：无线充电为什么效率低 —— 完全重写为单一 Three.js 场景（13-Gemini4修改清单.md §0 & §1）
 *
 * 严格按 13 §0 & §1 实现：
 *
 * - 彻底摒弃双画布、clip-path、镜像画布等临时拼凑做法，采用**单一 Three.js 3D 场景**（`WatchIntroModel(container, "callback")`）。
 * - 同一透视、比例、光照下：一个表（在左）、一个充电盘（双线圈剖开+空气磁路灯笼磁场）、一根连通 USB 线、 一个 USB-C
 *   插头（真插进适配器）、一个电源适配器、一个镜像后直接装在右侧墙面上的国标五孔插座、一面右侧立体墙面。
 * - 点击节奏：
 *
 *   - 0 击 / 第 1 击（step <= 1）：完整单场景模型（手表在左，墙插在右），无标签或按链路依次亮起右侧供电端标签（墙插 → 适配器 → USB 线）。
 *   - 第 2 击（step = 2）：按链路顺序继续亮起无线耦合端标签（充电盘 → 送电线圈 → 受电线圈 → 手表），7 个节点全部通过 3D 实时投影引线指向对应模型部件。
 *   - 第 3 击（step >= 3）：链路走完，镜头推近左侧手表与充电盘双线圈空气磁路局部，揭晓底部答案：“空气磁路、漏磁大；链路中还有能量损耗。”
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import CallbackWirelessSvg from "./CallbackWirelessSvg.vue";
import { WatchIntroModel } from "./watch3d/watchModel";
import type { CallbackProjectedAnchors } from "./watch3d/watchModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const stageSize = reactive({ w: 880, h: 380 });

const anchors = reactive<CallbackProjectedAnchors>({
  socket: { x: 760, y: 185 },
  adapter: { x: 695, y: 215 },
  usbCable: { x: 475, y: 210 },
  pad: { x: 255, y: 245 },
  txCoil: { x: 248, y: 165 },
  rxCoil: { x: 188, y: 158 },
  watch: { x: 132, y: 228 },
});

let model: WatchIntroModel | null = null;
let observer: IntersectionObserver | null = null;

// step = 0: 完整单场景模型，无标签；
// step = 1: 出右侧前半链路标签（墙插 → 适配器 → USB 线）；
// step = 2: 出左侧后半链路标签（充电盘 → 送电线圈 → 受电线圈 → 手表）；
// step = 3: 镜头推近手表与双线圈空气磁路局部，出底部答案！
const showRightChainLabels = computed(() => step >= 1 && step <= 2);
const showLeftCoilLabels = computed(() => step >= 2);
const isZoomedIn = computed(() => step >= 3);
const showAnswer = computed(() => step >= 3);

// 将容器像素坐标换算到 880×380 的 SVG 标注坐标系
const toSvg = (pt: { x: number; y: number }): { x: number; y: number } => {
  const sx = 880 / Math.max(stageSize.w, 1);
  const sy = 380 / Math.max(stageSize.h, 1);
  return {
    x: Math.round(pt.x * sx),
    y: Math.round(pt.y * sy),
  };
};

const pSocket = computed(() => toSvg(anchors.socket));
const pAdapter = computed(() => toSvg(anchors.adapter));
const pCable = computed(() => toSvg(anchors.usbCable));
const pPad = computed(() => toSvg(anchors.pad));
const pTx = computed(() => toSvg(anchors.txCoil));
const pRx = computed(() => toSvg(anchors.rxCoil));
const pWatch = computed(() => toSvg(anchors.watch));

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

const handleAnchors = (next: CallbackProjectedAnchors): void => {
  const container = stageEl.value;
  if (container && container.clientWidth > 0 && container.clientHeight > 0) {
    stageSize.w = container.clientWidth;
    stageSize.h = container.clientHeight;
  }
  anchors.socket = next.socket;
  anchors.adapter = next.adapter;
  anchors.usbCable = next.usbCable;
  anchors.pad = next.pad;
  anchors.txCoil = next.txCoil;
  anchors.rxCoil = next.rxCoil;
  anchors.watch = next.watch;
};

const startModel = (): void => {
  const container = stageEl.value;
  if (model || !container || container.clientWidth === 0) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  try {
    const instance = new WatchIntroModel(container, "callback", handleAnchors);
    model = instance;
    mode.value = "3d";
    instance.setStep(step);
    container.addEventListener(
      "webglcontextlost",
      () => {
        releaseModel();
        mode.value = "2d";
      },
      { once: true },
    );
  } catch {
    releaseModel();
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
  <div class="p16-root">
    <div class="p16-question">无线充电为什么充电效率较低？</div>

    <div v-if="mode === '2d'" class="p16-fallback">
      <CallbackWirelessSvg :step="step" />
    </div>

    <div v-else class="p16-stage">
      <!-- 单一 Three.js 场景（手表在左，连通白线居中，适配器与装在立体墙面上的国标插座在右） -->
      <div ref="stageEl" class="p16-canvas" />

      <!-- 顶部完整链路进度条（按点击顺序从右往左点亮：墙插 → 适配器 → USB 线 → 充电盘 → 送电线圈 → 受电线圈 → 手表） -->
      <div class="p16-chain-strip" :class="{ 'is-hidden': step < 1 }">
        <span class="p16-chip" :class="{ 'is-lit': step >= 1 }">墙插</span>
        <span class="p16-arr">→</span>
        <span class="p16-chip" :class="{ 'is-lit': step >= 1 }">适配器</span>
        <span class="p16-arr">→</span>
        <span class="p16-chip" :class="{ 'is-lit': step >= 1 }">USB 线</span>
        <span class="p16-arr">→</span>
        <span class="p16-chip" :class="{ 'is-lit': step >= 2 }">充电盘</span>
        <span class="p16-arr">→</span>
        <span class="p16-chip is-key" :class="{ 'is-lit': step >= 2 }">送电线圈</span>
        <span class="p16-arr">→</span>
        <span class="p16-chip is-key" :class="{ 'is-lit': step >= 2 }">受电线圈</span>
        <span class="p16-arr">→</span>
        <span class="p16-chip" :class="{ 'is-lit': step >= 2 }">手表</span>
      </div>

      <!-- 3D 世界坐标实时投影引线层（所有圆点严格落在单场景 3D 部件上） -->
      <svg class="p16-leaders" viewBox="0 0 880 380" preserveAspectRatio="none" aria-hidden="true">
        <!-- 右侧三节点引线：墙插、适配器、USB 线（C1 & C2 全景显示，C3 推近手表局部后淡出） -->
        <g :opacity="showRightChainLabels ? 1 : 0" class="p16-fade">
          <!-- 墙插 -->
          <polyline :points="`${pSocket.x},${pSocket.y} 785,84 805,84`" />
          <circle :cx="pSocket.x" :cy="pSocket.y" r="3.6" />
          <!-- 适配器 -->
          <polyline :points="`${pAdapter.x},${pAdapter.y} 675,308 698,308`" />
          <circle :cx="pAdapter.x" :cy="pAdapter.y" r="3.6" />
          <!-- USB 线 -->
          <polyline :points="`${pCable.x},${pCable.y} 495,298 518,298`" />
          <circle :cx="pCable.x" :cy="pCable.y" r="3.6" />
        </g>

        <!-- 左侧四节点引线：充电盘、送电线圈、受电线圈、手表（C2 全景与 C3 局部推近均实时跟随 3D 坐标！） -->
        <g :opacity="showLeftCoilLabels ? 1 : 0" class="p16-fade">
          <!-- 送电线圈 -->
          <polyline
            :points="
              isZoomedIn ? `${pTx.x},${pTx.y} 520,108 552,108` : `${pTx.x},${pTx.y} 352,96 376,96`
            "
          />
          <circle :cx="pTx.x" :cy="pTx.y" r="3.8" />
          <!-- 充电盘 -->
          <polyline
            :points="
              isZoomedIn
                ? `${pPad.x},${pPad.y} 520,285 552,285`
                : `${pPad.x},${pPad.y} 312,308 336,308`
            "
          />
          <circle :cx="pPad.x" :cy="pPad.y" r="3.8" />
          <!-- 受电线圈 -->
          <polyline
            :points="
              isZoomedIn ? `${pRx.x},${pRx.y} 195,96 165,96` : `${pRx.x},${pRx.y} 162,96 140,96`
            "
          />
          <circle :cx="pRx.x" :cy="pRx.y" r="3.8" />
          <!-- 手表 -->
          <polyline
            :points="
              isZoomedIn
                ? `${pWatch.x},${pWatch.y} 195,285 165,285`
                : `${pWatch.x},${pWatch.y} 138,298 116,298`
            "
          />
          <circle :cx="pWatch.x" :cy="pWatch.y" r="3.8" />
        </g>
      </svg>

      <!-- 右侧前半链路标签：墙插 → 适配器 → USB 线 -->
      <div class="p16-label p16-label-socket" :class="{ 'is-hidden': !showRightChainLabels }">
        <b>墙插 · 220 V 交流</b>
        <span>市电输入</span>
      </div>
      <div class="p16-label p16-label-adapter" :class="{ 'is-hidden': !showRightChainLabels }">
        <b>适配器</b>
        <span>变压器降压 + 整流</span>
      </div>
      <div class="p16-label p16-label-usb" :class="{ 'is-hidden': !showRightChainLabels }">
        <b>USB 线 · 5 V 直流</b>
        <span>适配器低压输出</span>
      </div>

      <!-- 左侧后半链路标签：充电盘 → 送电线圈 → 受电线圈 → 手表 -->
      <div
        class="p16-label p16-label-tx"
        :class="[{ 'is-hidden': !showLeftCoilLabels }, { 'is-zoomed': isZoomedIn }]"
      >
        <b>送电线圈</b>
        <span>激发高频交变磁场</span>
      </div>
      <div
        class="p16-label p16-label-pad"
        :class="[{ 'is-hidden': !showLeftCoilLabels }, { 'is-zoomed': isZoomedIn }]"
      >
        <b>充电盘</b>
        <span>DC → 高频交流逆变</span>
      </div>
      <div
        class="p16-label p16-label-rx"
        :class="[{ 'is-hidden': !showLeftCoilLabels }, { 'is-zoomed': isZoomedIn }]"
      >
        <b>受电线圈</b>
        <span>空气磁路互感取电</span>
      </div>
      <div
        class="p16-label p16-label-watch"
        :class="[{ 'is-hidden': !showLeftCoilLabels }, { 'is-zoomed': isZoomedIn }]"
      >
        <b>手表</b>
        <span>整流稳压 → 电池</span>
      </div>
    </div>

    <!-- 最后一击：镜头推近手表双线圈空气磁路局部后揭晓答案 -->
    <div class="p16-answer" :class="{ 'is-hidden': !showAnswer }">
      空气磁路、漏磁大；链路中还有能量损耗。
    </div>
  </div>
</template>

<style scoped>
.p16-root {
  position: relative;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  width: 100%;
  height: 455px;
  min-height: 0;
}

.p16-question {
  flex: none;

  margin: 0 0 0.25rem;

  color: var(--c-text);

  font-weight: 800;
  font-size: 1.22rem;
  letter-spacing: 0.02em;
  text-align: center;
}

.p16-stage {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.p16-canvas {
  position: absolute;
  inset: 0;
}

.p16-canvas :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.p16-chain-strip {
  position: absolute;
  top: 0.25rem;
  left: 50%;
  z-index: 4;

  display: inline-flex;
  gap: 0.28rem;
  align-items: center;

  padding: 0.24rem 0.7rem;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 999px;

  background: rgb(9 13 26 / 82%);

  white-space: nowrap;

  backdrop-filter: blur(10px);
  pointer-events: none;

  transition: opacity 0.3s ease;

  transform: translateX(-50%);
}

.p16-chip {
  padding: 0.1rem 0.45rem;
  border-radius: 999px;

  color: var(--c-text-dim);

  font-weight: 600;
  font-size: 0.64rem;

  transition:
    color 0.25s ease,
    background 0.25s ease;
}

.p16-chip.is-lit {
  background: rgb(255 255 255 / 7%);
  color: var(--c-text);
}

.p16-chip.is-key.is-lit {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.p16-arr {
  color: var(--c-text-dim);
  font-size: 0.65rem;
}

.p16-leaders {
  position: absolute;
  inset: 0;
  z-index: 3;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.p16-leaders polyline {
  fill: none;
  stroke: rgb(226 168 70 / 82%);
  stroke-dasharray: 5 4;
  stroke-width: 1.5;
}

.p16-leaders circle {
  fill: var(--c-accent);
}

.p16-fade {
  transition: opacity 0.3s ease;
}

.p16-label {
  position: absolute;
  z-index: 4;

  display: flex;
  flex-direction: column;
  gap: 0.06rem;

  padding: 0.28rem 0.58rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 0.5rem;

  background: linear-gradient(135deg, rgb(15 22 38 / 88%), rgb(9 13 26 / 78%));
  color: var(--c-text);
  box-shadow: 0 8px 20px rgb(0 0 0 / 24%);

  font-size: 0.68rem;
  line-height: 1.28;

  backdrop-filter: blur(10px);
  pointer-events: none;

  transition:
    opacity 0.3s ease,
    left 0.45s ease,
    top 0.45s ease;
}

.p16-label b {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 0.74rem;
}

.p16-label span {
  color: var(--c-text-dim);
}

.p16-label-socket {
  top: 16%;
  right: 1.2%;
}

.p16-label-adapter {
  bottom: 11%;
  left: 79.5%;
}

.p16-label-usb {
  bottom: 13%;
  left: 59%;
}

.p16-label-tx {
  top: 19%;
  left: 43%;
}

.p16-label-tx.is-zoomed {
  top: 22%;
  left: 63%;
}

.p16-label-pad {
  bottom: 11%;
  left: 38.5%;
}

.p16-label-pad.is-zoomed {
  bottom: 17%;
  left: 63%;
}

.p16-label-rx {
  top: 19%;
  left: 2.5%;
}

.p16-label-rx.is-zoomed {
  top: 19%;
  left: 4.5%;
}

.p16-label-watch {
  bottom: 14%;
  left: 1.5%;
}

.p16-label-watch.is-zoomed {
  bottom: 17%;
  left: 4.5%;
}

.p16-answer {
  flex: none;
  align-self: center;

  margin-top: 0.2rem;
  padding: 0.42rem 1.2rem;
  border: 1px solid var(--c-accent-border);
  border-radius: 999px;

  background: linear-gradient(135deg, rgb(226 168 70 / 16%), rgb(15 22 38 / 82%));
  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.94rem;
  text-align: center;

  transition: opacity 0.35s ease;
}

.p16-fallback {
  flex: 1;
  min-height: 0;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
