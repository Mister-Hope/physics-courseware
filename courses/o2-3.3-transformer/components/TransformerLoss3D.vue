<script setup lang="ts">
/**
 * 第 10 页（P10，合并原 P11）：实际变压器的能量损耗与理想变压器（5 击，13-Gemini4修改清单.md §4）
 *
 * 严格按 13 §4 实现：
 *
 * - 左侧同一台 3D 变压器，右侧三张损耗卡 + 理想变压器归纳：
 *
 *   1. 第 1 击（铜损）：原、副线圈发红色微光（体现发热），铁芯不红；卡片公式保留。
 *   2. 第 2 击（铁损）：镜头近距离拉近铁芯的一小段；展示变化磁场下的涡旋电场；铁芯内部泛红光；卡片公式保留。
 *   3. 第 3 击（漏磁）：原线圈一侧靠近电压端有漏磁感线；铁芯每个转角也有磁感线漏出；U₂ 偏低；卡片公式保留。
 *   4. 第 4 击（收拢）：三张卡变小，去掉公式，只留 6 个字：`铜损`、`铁损`、`漏磁`；右侧加一句很短的总结；左侧模型**同时呈现三种现象**。
 *   5. 第 5 击（理想变压器）：把原 P11 的三条件（无漏磁、无损耗、无内阻）和三公式（P₁=P₂、U₁/U₂=n₁/n₂、I₁/I₂=n₂/n₁）都放进这一页；
 *      左侧模型去掉非理想效应（不红、不涡流、不漏磁）。
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
            <div class="tl-formula">
              <Latex tex="P_{\text{铜}}=I_1^2r_1+I_2^2r_2" />
            </div>
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
            <div class="tl-formula">铁芯会发热</div>
            <div class="tl-note">
              交变磁场在铁芯中产生涡流，所以铁芯会发热，降低效率 <Latex tex="P_2<P_1" />。
            </div>
          </template>
        </div>

        <div
          class="tl-card tl-leak"
          :class="[{ 'is-hidden': !showLeak }, { 'is-active': step === 3 }]"
        >
          <div class="tl-kicker">漏磁</div>
          <template v-if="!isCompact">
            <div class="tl-formula">
              <Latex tex="\Phi_2<\Phi_1" />
            </div>
            <div class="tl-note">
              少量磁感线从原边及铁芯转角散出，未穿过副线圈，使副线圈磁通量变化率变小、<Latex
                tex="U_2"
              />
              偏低。
            </div>
          </template>
        </div>
      </div>

      <!-- C4：收拢后的一句简短总结 -->
      <div v-if="showSummary" class="tl-summary-bar">
        实际变压器同时存在以上三种损耗，使输出功率 <Latex tex="P_2 < P_1" />、实测输出电压
        <Latex tex="U_2" /> 略低于理想值。
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
            <div class="tl-cond-desc">原、副线圈电阻视为零（<Latex tex="r_1=r_2=0" />）</div>
          </div>
        </div>

        <div class="tl-eq-grid">
          <div class="tl-eq-box">
            <Latex tex="P_1 = P_2" />
          </div>
          <div class="tl-eq-box">
            <Latex tex="\dfrac{U_1}{U_2} = \dfrac{n_1}{n_2}" />
          </div>
          <div class="tl-eq-box">
            <Latex tex="\dfrac{I_1}{I_2} = \dfrac{n_2}{n_1}" />
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

.tl-formula {
  color: var(--c-text);
  font-size: 0.86rem;
  line-height: 1.3;
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

.tl-eq-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.48rem;
}

.tl-eq-box {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.42rem 0.35rem;
  border: 1px solid color-mix(in srgb, var(--c-accent) 32%, transparent);
  border-radius: 0.55rem;

  background: rgb(226 168 70 / 7%);
  color: var(--c-text);

  font-weight: 700;
  font-size: 0.86rem;
}

.is-hidden {
  opacity: 0;
  visibility: hidden;
}
</style>
