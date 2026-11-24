<script setup lang="ts">
/**
 * 第 3 页（P3）：一条连续 3D 镜头拆解供电链（6 击）
 *
 * 点击节奏：
 *
 * - 0 击（C0）：起点——手表与磁吸充电器充电近景，长白线延伸出左侧画面外。
 * - 第 1 击（C1）：镜头从手表/充电器拉远并左移，顺着长白线自然露出末端的 **USB Type-C 插头**。
 * - 第 2 击（C2）：充电器与 USB Type-C 插头在插座平面上同步旋转 90°，两片竖直扁插脚插进国标五孔插座上部两孔，Type-C 插进适配器； 底部上屏 **完整供电链路**（此后一直保留，不再被后面的点击撤掉）。
 * - 第 3 击（C3）：图中指针指向 **墙面插座**，配文 `220 V 交流`；同一击上屏问题 `220 V 能直接给手表充电吗？`
 * - 第 4 击（C4）：指针指向 **供电线**，配文 `5 V`。
 * - 第 5 击（C5）：指针指向 **电源适配器**，配文 `220 V ⇒ 5 V`（箭头沿用原 PPT 的 ⇒）。
 * - 第 6 击（C6）：插座与供电线的指针收起；拔出 USB，手表连带充电头、充电线向右飞出，插座向左飞出；充电器旋转到屏幕中央正面显示（**插头在下、USB 在上**），做完动效后自动浮现指针与文字提示 **《变压器》**。
 *
 * 三处指针的圆点位置全部由 3D 实时投影给出（watchModel 的 getProjectedAnchors），不硬编码坐标。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import { WatchIntroModel } from "./watch3d/watchModel";
import type { ProjectedAnchors } from "./watch3d/watchModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");
const showTransformerPointer = ref(false);

let model: WatchIntroModel | null = null;
let observer: IntersectionObserver | null = null;
let pointerTimer: ReturnType<typeof setTimeout> | null = null;

const isC1 = computed(() => step === 1);
const showChainTag = computed(() => step >= 2 && step < 6);
const showQuestion = computed(() => step >= 3 && step < 6);
const showSocketNote = computed(() => step >= 3 && step < 6);
const showCableNote = computed(() => step >= 4 && step < 6);
const showAdapterNote = computed(() => step === 5);
const isFinalStep = computed(() => step >= 6);

/** 3D 投影锚点（容器像素） */
const anchors = reactive<ProjectedAnchors>({
  socket: { x: 146, y: 194 },
  adapter: { x: 184, y: 229 },
  usbCable: { x: 460, y: 200 },
  pad: { x: 742, y: 243 },
  txCoil: { x: 610, y: 173 },
  rxCoil: { x: 410, y: 156 },
  watch: { x: 835, y: 236 },
  field: { x: 507, y: 164 },
  cable: { x: 456, y: 186 },
});
const stageSize = reactive({ w: 883, h: 455 });

const handleAnchors = (next: ProjectedAnchors): void => {
  Object.assign(anchors, next);
  const container = stageEl.value;
  if (container && container.clientWidth > 0) {
    stageSize.w = container.clientWidth;
    stageSize.h = container.clientHeight;
  }
};

/** 容器像素 → 引线 SVG 的 viewBox 坐标 */
const svgPt = (point: { x: number; y: number }): { x: number; y: number } => ({
  x: (point.x * 880) / Math.max(stageSize.w, 1),
  y: (point.y * 455) / Math.max(stageSize.h, 1),
});

/** 锚点偏移（容器像素） */
const off = (point: { x: number; y: number }, dx: number, dy: number): { x: number; y: number } => ({
  x: point.x + dx,
  y: point.y + dy,
});

/** 两点之间的引线 points（转成 SVG 坐标） */
const leader = (from: { x: number; y: number }, to: { x: number; y: number }): string => {
  const a = svgPt(from);
  const b = svgPt(to);
  return `${a.x},${a.y} ${b.x},${b.y}`;
};

/** 供电线中点：由模型把实际生成的线缆曲线 t=0.5 投影出来，保证圆点正落在白线上 */
const cableMid = computed(() => anchors.cable);

/** 供电线的指引圆点：压在白线上边缘，虚线只从边缘向上引，不穿进白线 */
const cableDot = computed(() => off(anchors.cable, 0, -4));

/** 墙面插座的指引圆点：落在插座面板上边框上，虚线上引，不穿面板内部 */
const socketDot = computed(() => off(anchors.socket, 0, -35));

/** 电源适配器的指引圆点：落在适配器下边缘，虚线向右下引，不伸进白色机身内 */
const adapterDot = computed(() => off(anchors.adapter, 8, 7));

const socketSvg = computed(() => svgPt(socketDot.value));
const cableSvg = computed(() => svgPt(cableDot.value));
const adapterSvg = computed(() => svgPt(adapterDot.value));

/** 三处标注文字的位置（容器像素，靠截图微调） */
const socketNoteStyle = computed(() => ({
  left: `${socketDot.value.x - 48}px`,
  top: `${socketDot.value.y - 78}px`,
}));
const cableNoteStyle = computed(() => ({
  left: `${cableMid.value.x - 16}px`,
  top: `${cableMid.value.y - 68}px`,
}));
const adapterNoteStyle = computed(() => ({
  left: `${adapterDot.value.x + 58}px`,
  top: `${adapterDot.value.y + 44}px`,
}));

/** 新版 P3 只有 6 击（C0–C6），而模型里的 CHAIN_POSES 仍是旧的 8 个姿态（C0–C7）： 旧 C3–C6 四帧完全相同，新 C3/C4/C5 都停在旧 C3 姿态，新 C6 直接对应旧的飞出姿态 C7。 */
const toPoseStep = (nextStep: number): number => (nextStep >= 6 ? 7 : nextStep);

const clearPointerTimer = (): void => {
  if (pointerTimer != null) {
    clearTimeout(pointerTimer);
    pointerTimer = null;
  }
};

const syncTransformerPointerReveal = (nextStep: number): void => {
  clearPointerTimer();
  if (nextStep >= 6) {
    showTransformerPointer.value = false;
    // 等 750ms 拔出飞离与充电器旋转居中的动效完成后，自动浮现指针与《变压器》提示
    pointerTimer = setTimeout(() => {
      showTransformerPointer.value = true;
    }, 750);
  } else {
    showTransformerPointer.value = false;
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
    const instance = new WatchIntroModel(container, "chain", handleAnchors);
    model = instance;
    mode.value = "3d";
    instance.setStep(toPoseStep(step));
    syncTransformerPointerReveal(step);
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
    model?.setStep(toPoseStep(nextStep));
    syncTransformerPointerReveal(nextStep);
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
  clearPointerTimer();
  observer?.disconnect();
  observer = null;
  releaseModel();
});
</script>

<template>
  <div class="pc3-root">
    <!-- Three.js 全屏透明背景 3D 连续供电链舞台 -->
    <div ref="stageEl" class="pc3-stage">
      <svg v-if="mode === '2d'" viewBox="0 0 880 455" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="90" y="170" width="90" height="90" rx="14" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="2" />
        <rect x="230" y="180" width="110" height="70" rx="18" fill="var(--c-neutral-200)" />
        <line x1="340" y1="215" x2="640" y2="215" stroke="var(--c-neutral-200)" stroke-width="6" />
        <rect x="640" y="150" width="110" height="130" rx="26" fill="var(--c-surface-solid)" stroke="var(--c-neutral-500)" stroke-width="2" />
      </svg>
    </div>

    <!-- C1 提示标签：露出白线与 USB Type-C 插头 -->
    <div class="pc3-tag" :class="{ 'is-hidden': !isC1 }">
      <span class="pc3-dot pc3-dot-blue" />
      <span>充电线末端：<b>USB Type-C 插头</b></span>
    </div>

    <!-- C2 起提示标签：完整供电链路（教师要求：第 3 击起不再撤掉，一直保留到最后一击） -->
    <div class="pc3-tag" :class="{ 'is-hidden': !showChainTag }">
      <span class="pc3-dot pc3-dot-gold" />
      <span>完整供电链路：<b>插座 → 电源适配器 → Type-C 供电线 → 磁吸充电器 → 手表</b></span>
    </div>

    <!-- C3 起中上方核心提问：220 V 能直接给手表充电吗？ -->
    <div class="pc3-top-question" :class="{ 'is-hidden': !showQuestion }"><Latex tex="220\ \text{V}" /> 能直接给手表充电吗？</div>

    <!-- C3–C5 三处指针引线：起点由 3D 实时投影给出 -->
    <svg class="pc3-leader-svg" viewBox="0 0 880 455" preserveAspectRatio="none" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- C3 墙面插座 -->
      <g v-if="showSocketNote">
        <polyline :points="leader(socketDot, off(socketDot, 0, -24))" fill="none" stroke="var(--c-danger)" stroke-width="1.5" stroke-dasharray="4 3" />
        <circle :cx="socketSvg.x" :cy="socketSvg.y" r="4" fill="var(--c-danger)" />
      </g>
      <!-- C4 供电线 -->
      <g v-if="showCableNote">
        <polyline :points="leader(cableDot, off(cableDot, 0, -34))" fill="none" stroke="var(--c-accent-2)" stroke-width="1.5" stroke-dasharray="4 3" />
        <circle :cx="cableSvg.x" :cy="cableSvg.y" r="4" fill="var(--c-accent-2)" />
      </g>
      <!-- C5 电源适配器 -->
      <g v-if="showAdapterNote">
        <polyline :points="leader(adapterDot, off(adapterDot, 52, 42))" fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-dasharray="4 3" />
        <circle :cx="adapterSvg.x" :cy="adapterSvg.y" r="4" fill="var(--c-accent)" />
      </g>
    </svg>

    <!-- C3 墙面插座：220 V 交流 -->
    <div class="pc3-note" :class="{ 'is-hidden': !showSocketNote }" :style="socketNoteStyle">
      <div class="pc3-note-name">墙面插座</div>
      <div class="pc3-note-val text-danger"><Latex tex="220\ \text{V}" /> 交流</div>
    </div>

    <!-- C4 供电线：5 V -->
    <div class="pc3-note" :class="{ 'is-hidden': !showCableNote }" :style="cableNoteStyle">
      <div class="pc3-note-val text-accent-2"><Latex tex="5\ \text{V}" /></div>
    </div>

    <!-- C5 电源适配器：220 V ⇒ 5 V -->
    <div class="pc3-note" :class="{ 'is-hidden': !showAdapterNote }" :style="adapterNoteStyle">
      <div class="pc3-note-name">电源适配器</div>
      <div class="pc3-note-val text-accent"><Latex tex="220\ \text{V} \Rightarrow 5\ \text{V}" /></div>
    </div>

    <!-- C6：拔出分离、充电器旋转到屏幕中央正面显示（插头在下、USB 在上）后，自动浮现指针与变压器文字提示 -->
    <div class="pc3-c7-reveal" :class="{ 'is-hidden': !(isFinalStep && showTransformerPointer) }">
      <svg class="pc3-pointer-svg" viewBox="0 0 880 455" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polyline points="440,210 532,155 595,155" fill="none" stroke="var(--c-accent)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="440" cy="210" r="5" fill="var(--c-accent)" />
        <circle cx="440" cy="210" r="10" fill="none" stroke="var(--c-accent)" stroke-width="1.6" opacity="0.65" />
      </svg>
      <div class="pc3-transformer-label">变压器</div>
    </div>
  </div>
</template>

<style scoped>
.pc3-root {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 455px;

  background: transparent;
}

.pc3-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.pc3-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.pc3-tag {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;

  display: inline-flex;
  gap: 0.5rem;
  align-items: center;

  color: var(--c-text);

  font-size: 1rem;
  white-space: nowrap;

  pointer-events: none;

  transition: opacity 0.3s ease;

  transform: translateX(-50%);
}

.pc3-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.pc3-dot-blue {
  background: var(--c-accent-2);
}

/* C3 起顶部核心提问（水平完美居中，C6 隐藏） */
.pc3-top-question {
  position: absolute;
  top: 0.9rem;
  left: 50%;

  color: var(--c-text);

  font-weight: 700;
  font-size: 1.38rem;
  white-space: nowrap;

  pointer-events: none;

  transition: opacity 0.35s ease;

  transform: translateX(-50%);
}

/* C3–C5 三处指针标注（绝对定位，圆点由 3D 投影给出） */
.pc3-note {
  position: absolute;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.pc3-note-name {
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.35;
}

.pc3-note-val {
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.35;
}

.pc3-leader-svg {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.pc3-dot-gold {
  background: var(--c-accent);
}

/* C7 充电器居中（插头在下、USB 在上）后自动浮现的指针与《变压器》提示 */
.pc3-c7-reveal {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}

.pc3-pointer-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.pc3-transformer-label {
  position: absolute;
  top: 132px;
  left: 604px;

  color: var(--c-accent);

  font-weight: 800;
  font-size: 1.65rem;
  letter-spacing: 0.04em;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
