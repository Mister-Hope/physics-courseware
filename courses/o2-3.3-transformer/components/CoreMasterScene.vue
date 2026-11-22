<script setup lang="ts">
/**
 * 第 6 页（P6）：核心 3D 分步推导（6 击）
 *
 * 硬要求（00-大框架与交接 §1.4 & 06-逐页文字设计稿 §7）：
 *
 * - 0 击：整体变压器居中，原线圈接交流源，副线圈接负载，U₁/U₂/n₁/n₂ 标在图上
 * - C1（step 1）：相机推近左侧；变压器移到画面最右、右半出画；原线圈电流开始来回流动，铁芯中磁感线出现（标 I₁、Φ）
 * - C2（step 2）：左侧推导（变压器在画面最右、右半出画，公式区占左 2/3）；原线圈电阻 r₁ 标出；新增 E₁ = n₁ ΔΦ/Δt、U₁ = E₁ + I₁r₁
 * - C3（step 3）：变压器边绕竖轴转体 180° 边飞到画面最左、左半出画，相机跟到右侧；副线圈出现感应电流（公式区占右 2/3）； 上一阶段 C2 公式以约 55%
 *   透明度留在同一栏上方，新增 E₂ = n₂ ΔΦ/Δt、U₂ = E₂ - I₂r₂
 * - C4（step 4）：两侧磁通路径同时高亮，Φ 相同；新增 E₁/E₂ = n₁/n₂（无漏磁）
 * - C5（step 5）：图上把 r₁、r₂、漏磁、铁损逐项“归零”/淡出（理想化）；新增 r₁ = r₂ = 0 -> U₁/U₂ = n₁/n₂
 * - C6（step 6）：副线圈接负载，功率箭头从原边流向副边；新增 P₁ = P₂ -> I₁/I₂ = n₂/n₁
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const isOverview = computed(() => step === 0);
const isLeftDerivation = computed(() => step === 1 || step === 2);
const isRightDerivation = computed(() => step >= 3);

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
    const instance = new TransformerCoreModel(container);
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
  <div class="cm-root">
    <!-- Three.js 全屏 3D 主场景 -->
    <div ref="stageEl" class="cm-stage">
      <!-- 无 WebGL 环境时的 2D 降级图 -->
      <svg
        v-if="mode === '2d'"
        viewBox="0 0 880 450"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g
          :transform="
            isLeftDerivation ? 'translate(260, 0)' : isRightDerivation ? 'translate(-260, 0)' : ''
          "
        >
          <path
            d="M 320 95 H 560 V 355 H 320 Z M 370 145 V 305 H 510 V 145 Z"
            fill="var(--c-surface-solid)"
            fill-rule="evenodd"
            stroke="var(--c-neutral-500)"
            stroke-width="2"
          />
          <rect
            v-if="step >= 1"
            x="342"
            y="118"
            width="196"
            height="214"
            rx="10"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="2.4"
            stroke-dasharray="7 5"
          />
          <Solenoid
            :x="345"
            :y="225"
            :length="110"
            :radius="30"
            :turns="6"
            direction="ccw"
            orientation="vertical"
            :phase="180"
            :line-width="3"
            color="var(--c-accent-2)"
          />
          <Solenoid
            :x="535"
            :y="225"
            :length="96"
            :radius="30"
            :turns="4"
            direction="cw"
            orientation="vertical"
            :phase="0"
            :line-width="3"
            color="var(--c-physics)"
          />
        </g>
      </svg>
    </div>

    <!-- Step 0: 整体视图的左右符号标注 -->
    <div class="cm-overview-hud" :class="{ 'is-hidden': !isOverview }">
      <div class="cm-ov-badge cm-ov-left">
        <div class="cm-ov-title">原线圈（接交流电源）</div>
        <div class="cm-ov-vars"><Latex tex="U_1,\ n_1" /></div>
      </div>
      <div class="cm-ov-badge cm-ov-right">
        <div class="cm-ov-title">副线圈（接负载）</div>
        <div class="cm-ov-vars"><Latex tex="U_2,\ n_2" /></div>
      </div>
    </div>

    <!-- Step 1 & 2: 左侧推导区（占画面左 2/3，变压器在画面最右、右半出画） -->
    <div class="cm-formula-zone cm-zone-left" :class="{ 'is-hidden': !isLeftDerivation }">
      <!-- C1: 电流与磁通出现 -->
      <div class="cm-step-block" :class="[step === 1 ? 'is-active' : 'is-dim']">
        <div class="cm-step-label">原线圈交变电流与铁芯磁通</div>
        <div class="cm-step-eq">
          <span class="cm-var-pill cm-pill-blue">交变电流 <Latex tex="I_1" /></span>
          <span class="cm-arrow">→</span>
          <span class="cm-var-pill cm-pill-gold">交变磁通 <Latex tex="\Phi" /></span>
          <span class="cm-var-pill cm-pill-red" :class="{ 'is-hidden': step < 2 }"
            >内阻 <Latex tex="r_1"
          /></span>
        </div>
      </div>

      <!-- C2: 原线圈电动势与用电端电压方程 -->
      <div class="cm-step-block is-active" :class="{ 'is-hidden': step < 2 }">
        <div class="cm-step-label">原线圈（用电端：克服感应电动势 + 内阻压降）</div>
        <div class="cm-step-eq cm-eq-large">
          <Latex tex="E_1 = n_1 \dfrac{\Delta\Phi}{\Delta t}" />
          <span class="cm-eq-gap" />
          <Latex tex="U_1 = E_1 + I_1 r_1" />
        </div>
      </div>
    </div>

    <!-- Step 3..6: 右侧推导链（占画面右 2/3，变压器在画面最左、左半出画；竖向推导链，上一阶段 55% 透明度保留） -->
    <div class="cm-formula-zone cm-zone-right" :class="{ 'is-hidden': !isRightDerivation }">
      <!-- C2 保留在顶部（55% 透明度） -->
      <div class="cm-chain-row is-dim">
        <span class="cm-chain-tag">原线圈</span>
        <div class="cm-chain-math">
          <Latex tex="E_1 = n_1 \dfrac{\Delta\Phi}{\Delta t}" />
          <span>，</span>
          <Latex tex="U_1 = E_1 + I_1 r_1" />
        </div>
      </div>

      <!-- C3: 副线圈电动势与供电端电压方程 -->
      <div class="cm-chain-row" :class="[step === 3 ? 'is-active' : 'is-dim']">
        <span class="cm-chain-tag">副线圈</span>
        <div class="cm-chain-math">
          <Latex tex="E_2 = n_2 \dfrac{\Delta\Phi}{\Delta t}" />
          <span>，</span>
          <Latex tex="U_2 = E_2 - I_2 r_2" />
        </div>
      </div>

      <!-- C4: 无漏磁（同一磁通 Φ） -> 电动势比等于匝数比 -->
      <div
        class="cm-chain-row"
        :class="[step === 4 ? 'is-active' : 'is-dim', { 'is-hidden': step < 4 }]"
      >
        <span class="cm-chain-tag">同一 <Latex tex="\Phi" /></span>
        <div class="cm-chain-math">
          <Latex tex="\dfrac{E_1}{E_2} = \dfrac{n_1}{n_2}" />
          <span class="cm-cond-note">（只需无漏磁）</span>
        </div>
      </div>

      <!-- C5: 理想化 r₁=r₂=0 -> 电压比等于匝数比 -->
      <div
        class="cm-chain-row"
        :class="[step === 5 ? 'is-active' : 'is-dim', { 'is-hidden': step < 5 }]"
      >
        <span class="cm-chain-tag">理想化</span>
        <div class="cm-chain-math">
          <Latex tex="r_1 = r_2 = 0 \ \Rightarrow\ \dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" />
        </div>
      </div>

      <!-- C6: 能量守恒 P₁=P₂ -> 电流比反过来 -->
      <div
        class="cm-chain-row"
        :class="[step === 6 ? 'is-active' : 'is-dim', { 'is-hidden': step < 6 }]"
      >
        <span class="cm-chain-tag">功率守恒</span>
        <div class="cm-chain-math">
          <Latex tex="P_1 = P_2 \ \Rightarrow\ \dfrac{I_1}{I_2} = \dfrac{n_2}{n_1}" />
        </div>
      </div>
    </div>

    <!-- 3D 变压器主体旁侧的实时状态角标 -->
    <div v-if="isLeftDerivation" class="cm-corner-tag cm-corner-right">
      <span>原线圈 <Latex tex="n_1" /> · <Latex tex="I_1" /> · <Latex tex="\Phi" /></span>
      <span class="cm-r-tag" :class="{ 'is-hidden': step < 2 }">内阻 <Latex tex="r_1" /></span>
    </div>
    <div v-if="isRightDerivation" class="cm-corner-tag cm-corner-left">
      <span v-if="step === 3"
        >副线圈 <Latex tex="n_2" /> · <Latex tex="I_2" /> · 内阻 <Latex tex="r_2"
      /></span>
      <span v-else-if="step === 4">闭合磁路 · 同一磁通 <Latex tex="\Phi" /></span>
      <span v-else-if="step === 5">理想模型 · <Latex tex="r_1=r_2=0" />、无漏磁、无铁损</span>
      <span v-else>能量传递 · <Latex tex="P_1 \rightarrow P_2" /></span>
    </div>
  </div>
</template>

<style scoped>
.cm-root {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 455px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-xl);

  background: var(--c-bg);
}

.cm-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.cm-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

/* Step 0: 整体视图左右标注 */
.cm-overview-hud {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2.4rem;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

.cm-ov-badge {
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);

  backdrop-filter: blur(14px);
}

.cm-ov-left {
  border-color: var(--c-accent-2-border);
}

.cm-ov-right {
  border-color: color-mix(in srgb, var(--c-physics) 40%, transparent);
}

.cm-ov-title {
  color: var(--c-text-dim);
  font-size: 0.9rem;
}

.cm-ov-vars {
  margin-top: 0.25rem;
  color: var(--c-text);
  font-weight: 700;
  font-size: 1.35rem;
}

/* 公式主区：左推导占左 2/3，右推导占右 2/3，不做底部公式条 */
.cm-formula-zone {
  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 65%;
  padding: 1.2rem 1.8rem;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

.cm-zone-left {
  left: 0;
  gap: 1.15rem;
  background: linear-gradient(
    90deg,
    rgb(9 13 26 / 92%) 0%,
    rgb(9 13 26 / 75%) 78%,
    transparent 100%
  );
}

.cm-zone-right {
  right: 0;
  gap: 0.42rem;
  padding: 0.65rem 1.4rem;
  background: linear-gradient(
    270deg,
    rgb(9 13 26 / 94%) 0%,
    rgb(9 13 26 / 78%) 78%,
    transparent 100%
  );
}

.cm-step-block {
  padding: 0.95rem 1.25rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: var(--c-surface);

  backdrop-filter: blur(14px);

  transition:
    opacity 0.35s ease,
    border-color 0.35s ease;
}

.cm-step-label {
  margin-bottom: 0.45rem;
  color: var(--c-text-dim);
  font-size: 0.9rem;
}

.cm-step-eq {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;

  font-weight: 700;
  font-size: 1.2rem;
}

.cm-eq-large {
  color: var(--c-accent);
  font-size: 1.4rem;
}

.cm-eq-gap {
  width: 1.2rem;
}

.cm-var-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 1rem;
}

.cm-pill-blue {
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.cm-pill-gold {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.cm-pill-red {
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.cm-arrow {
  color: var(--c-text-dim);
}

/* 右侧竖向推导链（C3..C6） */
.cm-chain-row {
  display: grid;
  grid-template-columns: 4.8rem minmax(0, 1fr);
  gap: 0.6rem;
  align-items: center;

  padding: 0.34rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: var(--c-surface);

  backdrop-filter: blur(12px);

  transition:
    opacity 0.35s ease,
    border-color 0.35s ease;
}

.cm-chain-tag {
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 0.82rem;
}

.cm-chain-math {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;

  font-weight: 700;
  font-size: 1.02rem;
}

.cm-cond-note {
  color: var(--c-text-dim);
  font-weight: 500;
  font-size: 0.85rem;
}

/* 当前步金色高亮，历史步 55% 透明度保留在同一栏上方 */
.is-active {
  border-color: var(--c-accent-border);
  color: var(--c-accent);
  opacity: 1;
}

.is-active .cm-chain-tag {
  color: var(--c-accent);
}

.is-dim {
  color: var(--c-text);
  opacity: 0.55;
}

.cm-corner-tag {
  position: absolute;
  bottom: 1rem;

  display: inline-flex;
  gap: 0.65rem;
  align-items: center;

  padding: 0.35rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface);
  color: var(--c-text);

  font-weight: 600;
  font-size: 0.88rem;

  backdrop-filter: blur(12px);
  pointer-events: none;
}

.cm-corner-right {
  right: 1.2rem;
}

.cm-corner-left {
  left: 1.2rem;
}

.cm-r-tag {
  color: var(--c-danger);
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
