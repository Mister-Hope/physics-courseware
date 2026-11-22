<script setup lang="ts">
/**
 * P16：无线充电为什么效率低（单舞台双 3D 组装 + 侧边引线标注）
 *
 * 左侧：P2 的 intro 场景固定在 C3（后盖打开、双线圈可见），负责手表/充电盘/线圈；
 * 右侧：P3 的 chain 场景固定在 C6（插座+适配器+线+手表），水平镜像后只保留
 *       插座/适配器/线，表与充电盘被左侧压住，形成“手表左—线—墙插右”的一条链。
 * 3 击只控制 7 个标签与底部答案出现，不新增 3D 动画。
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import CallbackWirelessSvg from "./CallbackWirelessSvg.vue";
import { WatchIntroModel } from "./watch3d/watchModel";

const { step = 0 } = defineProps<{ step?: number }>();

const introEl = ref<HTMLDivElement>();
const chainEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let introModel: WatchIntroModel | null = null;
let chainModel: WatchIntroModel | null = null;
let observer: IntersectionObserver | null = null;

const showChain = computed(() => step >= 1);
const showCoils = computed(() => step >= 2);
const showWatch = computed(() => step >= 3);
const showAnswer = computed(() => step >= 3);

const hasWebGl = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const releaseModels = (): void => {
  introModel?.destroy();
  chainModel?.destroy();
  introModel = null;
  chainModel = null;
};

const startModels = (): void => {
  const intro = introEl.value;
  const chain = chainEl.value;
  if (introModel || chainModel || !intro || !chain) return;
  if (intro.clientWidth === 0 || chain.clientWidth === 0) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  try {
    const introInstance = new WatchIntroModel(intro, "intro");
    introModel = introInstance;
    introInstance.setStep(3);
    introInstance.setActive(true);
    introInstance.handleResize();

    const chainInstance = new WatchIntroModel(chain, "chain");
    chainModel = chainInstance;
    chainInstance.setStep(8);
    chainInstance.setActive(true);
    chainInstance.handleResize();

    mode.value = "3d";
  } catch {
    releaseModels();
    mode.value = "2d";
  }
};

onMounted(() => {
  if (!introEl.value || !chainEl.value) return;
  if (!hasWebGl()) {
    mode.value = "2d";
    return;
  }

  startModels();

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (entry.isIntersecting) {
        startModels();
        introModel?.setActive(true);
        chainModel?.setActive(true);
        introModel?.handleResize();
        chainModel?.handleResize();
      } else {
        introModel?.setActive(false);
        chainModel?.setActive(false);
      }
    },
    { threshold: 0.05 },
  );
  observer.observe(introEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
  releaseModels();
});
</script>

<template>
  <div class="p16-root">
    <div class="p16-question">无线充电为什么充电效率较低？</div>

    <div v-if="mode === '2d'" class="p16-fallback">
      <CallbackWirelessSvg :step="step" />
    </div>

    <div v-else class="p16-stage">
      <!-- 右侧墙面：插座装在墙上 -->
      <div class="p16-wall" />

      <!-- 左：手表/充电盘/双线圈近景（intro C3） -->
      <div class="p16-canvas p16-canvas-intro">
        <div ref="introEl" class="p16-canvas-inner" />
      </div>

      <!-- 右：整条供电链（chain C6，水平镜像：墙插在右） -->
      <div class="p16-canvas p16-canvas-chain">
        <div ref="chainEl" class="p16-canvas-inner" />
      </div>

      <!-- 引线层 -->
      <svg class="p16-leaders" viewBox="0 0 980 400" preserveAspectRatio="none" aria-hidden="true">
        <g :opacity="showChain ? 1 : 0">
          <polyline points="900,26 910,120 920,180" />
          <circle cx="920" cy="180" r="3.5" />
          <polyline points="860,96 850,150 858,193" />
          <circle cx="858" cy="193" r="3.5" />
          <polyline points="560,26 550,130 540,196" />
          <circle cx="540" cy="196" r="3.5" />
        </g>
        <g :opacity="showCoils ? 1 : 0">
          <polyline points="104,150 140,170 336,184" />
          <circle cx="336" cy="184" r="3.5" />
          <polyline points="92,286 300,268 600,270" />
          <circle cx="600" cy="270" r="3.5" />
          <polyline points="88,348 300,270 578,200" />
          <circle cx="578" cy="200" r="3.5" />
        </g>
        <g :opacity="showWatch ? 1 : 0">
          <polyline points="96,238 132,212 300,300" />
          <circle cx="300" cy="300" r="3.5" />
        </g>
      </svg>

      <!-- 标签：左侧是表和线圈，右侧是墙插/适配器/线 -->
      <div v-show="showChain" class="p16-label p16-label-socket">
        <b>220 V 交流</b><span>墙插</span>
      </div>
      <div v-show="showChain" class="p16-label p16-label-adapter">
        <b>适配器</b><span>降压 + 整流</span>
      </div>
      <div v-show="showChain" class="p16-label p16-label-usb">
        <b>USB 5 V 直流</b><span>适配器输出</span>
      </div>
      <div v-show="showCoils" class="p16-label p16-label-pad">
        <b>充电盘</b><span>DC → 高频交流</span>
      </div>
      <div v-show="showCoils" class="p16-label p16-label-tx">
        <b>送电线圈</b><span>产生变化磁场</span>
      </div>
      <div v-show="showCoils" class="p16-label p16-label-rx">
        <b>受电线圈</b><span>互感产生电流</span>
      </div>
      <div v-show="showWatch" class="p16-label p16-label-watch">
        <b>手表</b><span>整流稳压 → 电池</span>
      </div>
    </div>

    <div v-show="showAnswer" class="p16-answer">
      空气磁路、漏磁大；链路中还有能量损耗。
    </div>
  </div>
</template>

<style scoped>
.p16-root {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  min-height: 0;
  padding-bottom: 1.9rem;

  box-sizing: border-box;
}

.p16-question {
  flex: none;

  margin: 0 0 0.35rem;

  color: var(--c-text);
  font-weight: 700;
  font-size: 0.92rem;

  text-align: center;
  letter-spacing: 0.01em;
}

.p16-stage {
  position: relative;

  flex: 1;
  min-height: 0;

  overflow: hidden;
}

/* 右侧墙面 */
.p16-wall {
  position: absolute;
  top: 8%;
  right: 0;
  bottom: 6%;
  z-index: 0;

  width: 22%;

  background:
    linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 2.2%) 35%, rgb(255 255 255 / 4%) 100%),
    repeating-linear-gradient(90deg, rgb(255 255 255 / 2%) 0 1px, transparent 1px 26px);
  border-left: 1px solid rgb(255 255 255 / 6%);

  pointer-events: none;
}

/* 左：手表/充电盘近景 */
.p16-canvas-intro {
  position: absolute;
  top: 0;
  left: 18%;
  z-index: 2;

  width: 48%;
  height: 100%;
}

/* 右：整条链，水平镜像后墙插在右；左端表/充电盘被 intro 压住 */
.p16-canvas-chain {
  position: absolute;
  top: 0;
  left: 24%;
  z-index: 1;

  width: 78%;
  height: 100%;

  transform: scaleX(-1);
  clip-path: inset(0 0 0 20%);
}

.p16-canvas-inner {
  position: absolute;
  inset: 0;
}

.p16-canvas-inner :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.p16-leaders {
  position: absolute;
  inset: 0;
  z-index: 4;

  width: 100%;
  height: 100%;

  pointer-events: none;
}

.p16-leaders polyline {
  fill: none;
  stroke: rgb(226 168 70 / 78%);
  stroke-width: 1.4;
  stroke-dasharray: 5 4;
}

.p16-leaders circle {
  fill: var(--c-accent);
}

.p16-label {
  position: absolute;
  z-index: 3;

  display: flex;
  flex-direction: column;
  gap: 0.06rem;

  max-width: 9.5rem;
  padding: 0.24rem 0.48rem;

  color: var(--c-text);
  font-size: 0.66rem;
  line-height: 1.28;

  background: rgb(9 13 26 / 82%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 0.45rem;

  backdrop-filter: blur(8px);

  pointer-events: none;
}

.p16-label b {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 0.7rem;
}

.p16-label span {
  color: var(--c-text-dim);
}

.p16-label-socket {
  top: 3%;
  right: 1.5%;
}

.p16-label-adapter {
  top: 21%;
  right: 2%;
}

.p16-label-usb {
  top: 3%;
  left: 52%;
}

.p16-label-pad {
  bottom: 18%;
  left: 22%;
}

.p16-label-tx {
  bottom: 2%;
  left: 4%;
}

.p16-label-rx {
  top: 34%;
  left: 4%;
}

.p16-label-watch {
  bottom: 40%;
  left: 4%;
}

.p16-answer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  color: var(--c-accent);
  font-weight: 600;
  font-size: 0.8rem;

  text-align: center;
}

.p16-fallback {
  flex: 1;
  min-height: 0;
}
</style>
