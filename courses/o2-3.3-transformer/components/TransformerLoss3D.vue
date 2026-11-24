<script setup lang="ts">
/**
 * 第 9 页（P9）：理想变压器与变压器中的能量损耗（5 击，纯定性，全页不出现任何公式）
 *
 * 左侧同一台 3D 变压器，右侧三张损耗卡 + 理想化三条件：
 *
 * 1. C1 铜损：原、副线圈发红色微光（发热），铁芯不红。
 * 2. C2 铁损：镜头拉近铁芯的一小段，展示变化磁场下的涡旋电场，铁芯内部泛红光。
 * 3. C3 漏磁：原线圈一侧与铁芯转角漏出磁感线，副线圈磁通量变化率变小。
 * 4. C4 收拢：三张卡收成「铜损 / 铁损 / 漏磁」六个字 + 一句总结，模型同时呈现三种现象。
 * 5. C5 理想化：只列三个条件（无漏磁 / 无损耗 / 无内阻）；电压比、电流比等公式留到下一页推导。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { TransformerCoreModel } from "./transformer3d/transformerModel";

const { step = 0 } = defineProps<{ step?: number }>();

const stageEl = ref<HTMLDivElement>();
const mode = ref<"pending" | "3d" | "2d">("pending");

let model: TransformerCoreModel | null = null;
let observer: IntersectionObserver | null = null;

const showCopper = computed(() => step >= 1);
const showIron = computed(() => step >= 2);
const showLeak = computed(() => step >= 3);
const isCompact = computed(() => step >= 4);
const showSummary = computed(() => step === 4);
const showIdeal = computed(() => step >= 5);

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
    const instance = new TransformerCoreModel(container, "loss");
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
  <div class="tl-wrap">
    <!-- 左栏：同一台 3D 变压器实时对应演示铜损、铁损、漏磁、三者并存、以及理想变压器 -->
    <div class="tl-stage-box">
      <div ref="stageEl" class="tl-stage">
        <svg
          v-if="mode === '2d'"
          viewBox="0 0 420 350"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M 90 60 H 330 V 290 H 90 Z M 138 108 V 242 H 282 V 108 Z"
            fill="var(--c-surface-solid)"
            fill-rule="evenodd"
            stroke="var(--c-neutral-500)"
            stroke-width="2"
          />
          <Solenoid
            :x="114"
            :y="175"
            :length="105"
            :radius="26"
            :turns="8"
            direction="ccw"
            orientation="vertical"
            :phase="180"
            :line-width="2.4"
            color="var(--c-accent-2)"
          />
          <Solenoid
            :x="306"
            :y="175"
            :length="92"
            :radius="26"
            :turns="4"
            direction="cw"
            orientation="vertical"
            :phase="0"
            :line-width="2.4"
            color="var(--c-physics)"
          />
          <!-- 2D 降级图：主磁路（沿铁芯的金色环流） -->
          <rect
            x="114"
            y="84"
            width="192"
            height="182"
            rx="12"
            fill="none"
            stroke="var(--c-accent)"
            stroke-width="2"
            stroke-dasharray="6 4"
            opacity="0.72"
          />
          <!-- 2D 降级图：漏磁回路（从原线圈一端鼓到绕组间与外侧空气、再回到原线圈另一端的蓝色闭合回路，不经过副线圈） -->
          <g
            v-if="showLeak && !showIdeal"
            fill="none"
            stroke="var(--c-accent-2)"
            stroke-width="2"
            stroke-dasharray="4 3"
          >
            <path d="M 118 118 C 192 98, 192 252, 118 232 Z" />
            <path d="M 118 130 C 166 116, 166 234, 118 220 Z" opacity="0.82" />
            <path d="M 108 120 C 46 104, 46 246, 108 230 Z" opacity="0.88" />
          </g>
        </svg>
      </div>
    </div>

    <!-- 右栏：三张损耗卡（C1~C3 展开带公式，C4~C5 收拢只留 6 个字）+ C4 一句话总结 + C5 理想变压器三条件与三公式 -->
    <div class="tl-right">
      <!-- 三张卡：C1..C3 完整展示；C4 起收拢成紧凑三小卡，只留“铜损 / 铁损 / 漏磁” 6 个字 -->
      <div class="tl-loss-cards" :class="{ 'is-compact': isCompact }">
        <div
          class="tl-card tl-copper"
          :class="[{ 'is-hidden': !showCopper }, { 'is-active': step === 1 }]"
        >
          <div class="tl-kicker">铜损</div>
          <template v-if="!isCompact">
            <div class="tl-note">
              线圈有电阻，通电发热（原、副线圈都有）；内阻分压使 <Latex tex="U_2" /> 比理想值低。
            </div>
          </template>
        </div>

        <div
          class="tl-card tl-iron"
          :class="[{ 'is-hidden': !showIron }, { 'is-active': step === 2 }]"
        >
          <div class="tl-kicker">铁损</div>
          <template v-if="!isCompact">
            <div class="tl-note">交变磁场在铁芯中产生涡流，铁芯发热，效率降低。</div>
          </template>
        </div>

        <div
          class="tl-card tl-leak"
          :class="[{ 'is-hidden': !showLeak }, { 'is-active': step === 3 }]"
        >
          <div class="tl-kicker">漏磁</div>
          <template v-if="!isCompact">
            <div class="tl-note">
              原线圈产生的一部分磁通量经空气自行闭合，未穿过副线圈，使副线圈磁通量变化率变小、<Latex
                tex="U_2"
              />
              偏低。
            </div>
          </template>
        </div>
      </div>

      <!-- C4：收拢后的一句简短总结 -->
      <div v-if="showSummary" class="tl-summary-bar">
        实际变压器同时存在以上三种损耗：输出功率小于输入功率，实测输出电压也略低于理想值。
      </div>

      <!-- C5：理想变压器（合并原 P11 的三条件 + 三公式） -->
      <div v-if="showIdeal" class="tl-ideal-panel">
        <div class="tl-ideal-header">
          <span class="tl-ideal-badge">理想化模型</span>
          <span class="tl-ideal-title">忽略次要因素 → <b>理想变压器</b></span>
        </div>

        <div class="tl-cond-grid">
          <div class="tl-cond-card">
            <div class="tl-cond-name">无漏磁</div>
            <div class="tl-cond-desc">磁通量全部集中在铁芯内穿过两线圈</div>
          </div>
          <div class="tl-cond-card">
            <div class="tl-cond-name">无损耗</div>
            <div class="tl-cond-desc">无铜损、无铁损，没有能量损失</div>
          </div>
          <div class="tl-cond-card">
            <div class="tl-cond-name">无内阻</div>
            <div class="tl-cond-desc">原、副线圈的电阻视为零</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tl-wrap {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.35fr);
  gap: 1.05rem;
  align-items: center;

  width: 100%;
  min-width: 0;
  height: 332px;
}

.tl-stage-box {
  position: relative;
  overflow: hidden;
  height: 328px;
}

.tl-stage {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.tl-stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.tl-right {
  display: flex;
  flex-direction: column;
  gap: 0.58rem;
  justify-content: center;

  min-width: 0;
  height: 100%;
}

.tl-loss-cards {
  display: flex;
  flex-direction: column;
  gap: 0.48rem;
}

/* C4、C5 收拢状态：三张卡变小横排，去掉公式与说明，只留 6 个字：铜损、铁损、漏磁 */
.tl-loss-cards.is-compact {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.55rem;
}

.tl-card {
  display: flex;
  flex-direction: column;
  gap: 0.16rem;

  padding: 0.42rem 0.78rem;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: var(--radius-md);

  background: linear-gradient(135deg, rgb(20 28 46 / 78%), rgb(10 15 28 / 62%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 7%),
    0 8px 22px rgb(0 0 0 / 18%);

  backdrop-filter: blur(14px);

  transition:
    opacity 0.28s ease,
    border-color 0.28s ease,
    padding 0.28s ease;
}

.tl-loss-cards.is-compact .tl-card {
  align-items: center;
  justify-content: center;
  padding: 0.36rem 0.5rem;
}

.tl-copper {
  border-left: 3px solid var(--c-danger);
}

.tl-iron {
  border-left: 3px solid var(--c-accent);
}

.tl-leak {
  border-left: 3px solid var(--c-velocity);
}

.tl-card.is-active {
  border-color: rgb(255 255 255 / 26%);
}

.tl-kicker {
  font-weight: 800;
  font-size: 0.92rem;
  line-height: 1.25;
}

.tl-copper .tl-kicker {
  color: var(--c-danger);
}

.tl-iron .tl-kicker {
  color: var(--c-accent);
}

.tl-leak .tl-kicker {
  color: var(--c-velocity);
}

.tl-note {
  color: var(--c-text-dim);
  font-size: 0.75rem;
  line-height: 1.42;
}

.tl-summary-bar {
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--c-accent-border);
  border-radius: var(--radius-md);

  background: linear-gradient(135deg, rgb(226 168 70 / 12%), rgb(15 22 38 / 72%));
  color: var(--c-text);

  font-weight: 600;
  font-size: 0.86rem;
  line-height: 1.5;
}

.tl-ideal-panel {
  display: flex;
  flex-direction: column;
  gap: 0.52rem;

  padding: 0.65rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--c-accent) 42%, transparent);
  border-radius: var(--radius-lg);

  background: linear-gradient(145deg, rgb(22 31 52 / 84%), rgb(11 16 29 / 70%));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 10%),
    0 12px 28px rgb(0 0 0 / 22%);

  backdrop-filter: blur(16px);
}

.tl-ideal-header {
  display: flex;
  gap: 0.55rem;
  align-items: center;
}

.tl-ideal-badge {
  padding: 0.14rem 0.55rem;
  border-radius: 999px;

  background: var(--c-accent-soft);
  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.7rem;
}

.tl-ideal-title {
  color: var(--c-text);
  font-size: 0.88rem;
}

.tl-ideal-title b {
  color: var(--c-accent);
}

.tl-cond-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.48rem;
}

.tl-cond-card {
  padding: 0.42rem 0.55rem;
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 0.55rem;
  background: rgb(255 255 255 / 3%);
}

.tl-cond-name {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 0.84rem;
}

.tl-cond-desc {
  margin-top: 0.14rem;
  color: var(--c-text-dim);
  font-size: 0.68rem;
  line-height: 1.35;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
