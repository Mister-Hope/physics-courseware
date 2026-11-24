<script setup lang="ts">
/**
 * 第 10 页（P10）：电压比与电流比的理想推导（7 击，左右镜像对称 + 汇总公式与变压器零重叠）
 *
 * 全页只走「理想变压器」：不出现内阻 r₁ / r₂，也不写 U = E ± Ir 这类关系（这些留给后面的实际变压器）。
 *
 * - 0 击：整体变压器居中，原线圈输入交流电压 U₁，副线圈输出交流电压 U₂
 * - 第 1、2 击（原线圈/输入端）：变压器整体往右移（rigX = 6.95），副线圈移出画面外；左侧公式区与接线柱完全不重叠。
 *
 *   - C1：原线圈交变电流 I₁ 产生变化的磁场（穿过每匝的磁通量 Φ 变化）
 *   - C2：原线圈的感应电动势 E₁ = n₁ ΔΦ/Δt
 * - 第 3、4 击（副线圈/输出端，与前两次镜像对称）：变压器整体往左移（rigX = -6.95），原线圈移出画面外。
 *
 *   - C3：副线圈因磁通量 Φ 变化产生感应电动势与交变电流 I₂
 *   - C4：副线圈的感应电动势 E₂ = n₂ ΔΦ/Δt
 * - 第 5、6、7 击（汇总）：镜头拉远（camPos.z = 18.8），变压器缩小到左侧（rigX = -5.65），公式整体靠右（width: 53%）。
 *
 *   - C5：同一磁通量变化（无漏磁）⇒ E₁/E₂ = n₁/n₂
 *   - C6：理想化（U₁ = E₁、U₂ = E₂）⇒ U₁/U₂ = n₁/n₂
 *   - C7：P₁ = P₂ ⇒ I₁/I₂ = n₂/n₁
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const isOverview = computed(() => step === 0);
const isPrimaryFocus = computed(() => step === 1 || step === 2);
const isSecondaryFocus = computed(() => step === 3 || step === 4);
const isSummaryChain = computed(() => step >= 5);

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
            isPrimaryFocus
              ? 'translate(290, 0)'
              : isSecondaryFocus || isSummaryChain
                ? 'translate(-290, 0)'
                : ''
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
        <div class="cm-ov-title">副线圈（输出交流电压）</div>
        <div class="cm-ov-vars"><Latex tex="U_2,\ n_2" /></div>
      </div>
    </div>

    <!-- Step 1 & 2: 左侧原线圈推导区（width: 53%，变压器在右侧且副线圈完全移出画面外） -->
    <div class="cm-formula-zone cm-zone-left" :class="{ 'is-hidden': !isPrimaryFocus }">
      <!-- C1: 上方分析原线圈交变电流与变化的磁场（磁通量变化） -->
      <div class="cm-step-block" :class="[step === 1 ? 'is-active' : 'is-dim']">
        <div class="cm-step-label">原线圈：交变电流激发变化的磁场</div>
        <div class="cm-step-eq">
          <span class="cm-var-pill cm-pill-blue">交变电流 <Latex tex="I_1" /></span>
          <span class="cm-arrow">→</span>
          <span class="cm-var-pill cm-pill-gold">磁通量 <Latex tex="\Phi_1" /> 变化</span>
        </div>
      </div>

      <!-- C2: 下方列原线圈的感应电动势 E₁ = n₁ ΔΦ/Δt -->
      <div class="cm-step-block is-active" :class="{ 'is-hidden': step < 2 }">
        <div class="cm-step-label">原线圈：每匝的磁通量变化产生感应电动势</div>
        <div class="cm-step-eq cm-eq-large">
          <Latex tex="E_1 = n_1 \dfrac{\Delta\Phi_1}{\Delta t}" />
        </div>
      </div>
    </div>

    <!-- Step 3 & 4: 右侧副线圈推导区（与 Step 1 & 2 严格镜像对称！width: 53%，变压器在左侧且原线圈完全移出画面外） -->
    <div class="cm-formula-zone cm-zone-right-sym" :class="{ 'is-hidden': !isSecondaryFocus }">
      <!-- C3: 上方分析副线圈因磁通量变化产生感应电动势与交变电流 -->
      <div class="cm-step-block" :class="[step === 3 ? 'is-active' : 'is-dim']">
        <div class="cm-step-label">副线圈：磁通量变化产生感应电动势与交变电流</div>
        <div class="cm-step-eq">
          <span class="cm-var-pill cm-pill-gold">磁通量 <Latex tex="\Phi_2" /> 变化</span>
          <span class="cm-arrow">→</span>
          <span class="cm-var-pill cm-pill-teal"
            >电动势 <Latex tex="E_2" />、电流 <Latex tex="I_2"
          /></span>
        </div>
      </div>

      <!-- C4: 下方列副线圈的感应电动势 E₂ = n₂ ΔΦ/Δt -->
      <div class="cm-step-block is-active" :class="{ 'is-hidden': step < 4 }">
        <div class="cm-step-label">副线圈：它的磁通量变化激起感应电动势</div>
        <div class="cm-step-eq cm-eq-large">
          <Latex tex="E_2 = n_2 \dfrac{\Delta\Phi_2}{\Delta t}" />
        </div>
      </div>
    </div>

    <!-- Step 5..7: 右侧完整 5 公式汇总区（镜头拉远、变压器缩小在左侧，公式区整体靠右 width: 53%，与变压器零重叠，公式间距充裕） -->
    <div class="cm-formula-zone cm-zone-right-chain" :class="{ 'is-hidden': !isSummaryChain }">
      <!-- 公式 1：原线圈 -->
      <div class="cm-chain-row is-dim">
        <span class="cm-chain-tag">原线圈</span>
        <div class="cm-chain-math">
          <Latex tex="E_1 = n_1 \dfrac{\Delta\Phi_1}{\Delta t}" />
        </div>
      </div>

      <!-- 公式 2：副线圈 -->
      <div class="cm-chain-row is-dim">
        <span class="cm-chain-tag">副线圈</span>
        <div class="cm-chain-math">
          <Latex tex="E_2 = n_2 \dfrac{\Delta\Phi_2}{\Delta t}" />
        </div>
      </div>

      <!-- 公式 3 (C5)：无漏磁（同一磁通量 Φ） -> 电动势比等于匝数比 -->
      <div class="cm-chain-row" :class="[step === 5 ? 'is-active' : 'is-dim']">
        <span class="cm-chain-tag">无漏磁</span>
        <div class="cm-chain-math">
          <Latex tex="\Phi_1 = \Phi_2 \ \Rightarrow\ \dfrac{E_1}{E_2} = \dfrac{n_1}{n_2}" />
        </div>
      </div>

      <!-- 公式 4 (C6)：理想化（U₁ = E₁、U₂ = E₂）-> 电压比等于匝数比 -->
      <div
        class="cm-chain-row"
        :class="[step === 6 ? 'is-active' : 'is-dim', { 'is-hidden': step < 6 }]"
      >
        <span class="cm-chain-tag">理想化</span>
        <div class="cm-chain-math">
          <Latex tex="U_1 = E_1,\ U_2 = E_2 \ \Rightarrow\ \dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" />
        </div>
      </div>

      <!-- 公式 5 (C7)：能量守恒 P₁=P₂ -> 电流比反过来 -->
      <div
        class="cm-chain-row"
        :class="[step === 7 ? 'is-active' : 'is-dim', { 'is-hidden': step < 7 }]"
      >
        <span class="cm-chain-tag">功率守恒</span>
        <div class="cm-chain-math">
          <Latex tex="P_1 = P_2 \ \Rightarrow\ \dfrac{I_1}{I_2} = \dfrac{n_2}{n_1}" />
        </div>
      </div>
    </div>

    <!-- 3D 变压器主体旁侧的实时状态角标 -->
    <div v-if="isPrimaryFocus" class="cm-corner-tag cm-corner-right">
      <span>原线圈：<Latex tex="n_1" />、<Latex tex="I_1" />、磁通量 <Latex tex="\Phi_1" /></span>
    </div>
    <div v-if="isSecondaryFocus || isSummaryChain" class="cm-corner-tag cm-corner-left">
      <span v-if="step === 3 || step === 4">
        副线圈：<Latex tex="n_2" />、<Latex tex="I_2" />、磁通量 <Latex tex="\Phi_2" />
      </span>
      <span v-else-if="step === 5">闭合磁路：穿过每匝的磁通量都相同</span>
      <span v-else-if="step === 6">理想模型：无漏磁、不计线圈电阻</span>
      <span v-else>能量传递：<Latex tex="P_1 \rightarrow P_2" /></span>
    </div>
  </div>
</template>

<style scoped>
.cm-root {
  position: relative;
  overflow: visible;
  width: 100%;
  height: 455px;
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
  padding: 0.85rem 1.35rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: var(--radius-lg);

  background: linear-gradient(135deg, rgb(20 28 46 / 82%), rgb(10 15 28 / 65%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 10%),
    0 14px 30px rgb(0 0 0 / 24%);

  backdrop-filter: blur(16px);
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

/* 公式主区：左推导（C1-C2）与右对称推导（C3-C4）均为 width: 53.5%、相同内边距与间距，严格镜像对称且单行不折行溢出！ */
.cm-formula-zone {
  position: absolute;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 53.5%;
  padding: 0.85rem 1.05rem;

  pointer-events: none;

  transition: opacity 0.35s ease;
}

.cm-zone-left {
  left: -2.4rem;
  gap: 0.9rem;
  width: 56.5%;
  padding: 0.85rem 1.2rem 0.85rem 0;
}

.cm-zone-right-sym {
  right: -2.4rem;
  gap: 0.9rem;
  width: 56.5%;
  padding: 0.85rem 0 0.85rem 1.2rem;
}

/* C5-C7 右侧五个汇总公式：直接从屏幕右侧边缘探出来，既省空间又让每条公式宽裕单行不换行，且与左侧变压器零重叠！ */
.cm-zone-right-chain {
  right: -1.95rem;
  gap: 0.56rem;
  width: 58.5%;
  padding: 0.45rem 0 0.45rem 1.2rem;
}

.cm-step-block {
  padding: 0.72rem 0.98rem;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: var(--radius-lg);

  background: linear-gradient(135deg, rgb(20 28 44 / 82%), rgb(10 15 26 / 68%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 8%),
    0 12px 32px rgb(0 0 0 / 24%);

  backdrop-filter: blur(16px) saturate(120%);

  transition:
    opacity 0.35s ease,
    border-color 0.35s ease;
}

.cm-zone-left .cm-step-block {
  padding: 0.82rem 1.15rem 0.82rem 2.6rem;
  border-left: none;
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.cm-zone-right-sym .cm-step-block {
  padding: 0.82rem 2.6rem 0.82rem 1.15rem;
  border-right: none;
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

.cm-step-label {
  margin-bottom: 0.38rem;
  color: var(--c-text-dim);
  font-size: 0.86rem;
  white-space: nowrap;
}

.cm-step-eq {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.45rem;
  align-items: center;

  font-weight: 700;
  font-size: 1.02rem;
  white-space: nowrap;
}

.cm-eq-large {
  color: var(--c-accent);
  font-size: 1.26rem;
}

.cm-eq-gap {
  width: 0.95rem;
}

.cm-var-pill {
  padding: 0.22rem 0.62rem;
  border-radius: 999px;
  font-size: 0.88rem;
  white-space: nowrap;
}

.cm-pill-blue {
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.cm-pill-teal {
  background: color-mix(in srgb, var(--c-physics) 18%, transparent);
  color: var(--c-physics);
}

.cm-pill-gold {
  background: var(--c-accent-soft);
  color: var(--c-accent);
}

.cm-arrow {
  color: var(--c-text-dim);
}

/* 右侧竖向推导链（C5..C7）：左端圆角、右端直接延伸到屏幕外探出，内部单行不折行 */
.cm-chain-row {
  display: grid;
  grid-template-columns: 4.8rem minmax(0, 1fr);
  gap: 0.65rem;
  align-items: center;

  padding: 0.46rem 2.6rem 0.46rem 1.1rem;
  border: 1px solid rgb(255 255 255 / 10%);
  border-right: none;
  border-radius: var(--radius-md) 0 0 var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 46 / 84%), rgb(11 16 28 / 72%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 8%),
    0 10px 24px rgb(0 0 0 / 22%);

  backdrop-filter: blur(14px);

  transition:
    opacity 0.35s ease,
    border-color 0.35s ease;
}

.cm-chain-tag {
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 0.82rem;
  white-space: nowrap;
}

.cm-chain-math {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.42rem;
  align-items: center;

  font-weight: 700;
  font-size: 0.98rem;
  white-space: nowrap;
}

.cm-cond-note {
  color: var(--c-text-dim);
  font-weight: 500;
  font-size: 0.84rem;
}

/* 当前步金色高亮，历史步 82% 透明度保留，保证清晰可读 */
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
  opacity: 0.82;
}

.cm-corner-tag {
  position: absolute;
  bottom: 0.85rem;

  display: inline-flex;
  gap: 0.65rem;
  align-items: center;

  padding: 0.35rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  background: var(--c-surface);
  color: var(--c-text-dim);

  font-weight: 600;
  font-size: 0.82rem;

  backdrop-filter: blur(12px);
  pointer-events: none;
}

.cm-corner-right {
  right: 1.5rem;
}

.cm-corner-left {
  left: 1.5rem;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
