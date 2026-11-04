<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 电梯六个运动状态与"示数 / 加速度方向"的对应表（§4.6 第 6、7 页）
 *
 * Reading：运动状态 | 示数与重力 | 现象 —— 第 6 页，第 1 击出示数、第 2 击出现象。 compare：运动状态 | 加速度方向 | 示数与重力 | 现象 —— 第 7
 * 页，把第 6 页那张表整张搬过来， 再在"运动状态"后面补一列"加速度方向"；第 1 击出加速度方向、第 2 击给它着色。 上升、下降两组上下排列，让学生沿着"状态 → 示数 →
 * 加速度"逐层对照。
 */
const { mode = "reading" } = defineProps<{
  /** Reading：示数与重力（第 6 页）；compare：示数 + 加速度方向（第 7 页） */
  mode?: "reading" | "compare";
}>();

const { $clicks } = useSlideContext();
const step = computed(() => $clicks.value);

const isCompare = computed(() => mode === "compare");
/** 示数列：第 6 页第 1 击出；第 7 页沿用上一页的结论、常显 */
const showReading = computed(() => isCompare.value || step.value >= 1);
/** 现象列：第 6 页第 2 击出；第 7 页常显 */
const showTag = computed(() => isCompare.value || step.value >= 2);
/** 加速度方向列：第 7 页第 1 击才出，第 2 击着色（把"加速度向上 = 超重"点出来） */
const showAccel = computed(() => isCompare.value && step.value >= 1);
const colorAccel = computed(() => isCompare.value && step.value >= 2);

interface Row {
  readonly state: string;
  /** 示数与重力的关系 */
  readonly reading: string;
  /** 加速度方向 */
  readonly accel: string;
  /** 该状态对应的色调（超重红 / 失重蓝 / 匀速中性），示数与加速度方向共用 */
  readonly tone: "over" | "under" | "even";
  readonly tag: "over" | "under" | "none";
}

const UP: readonly Row[] = [
  { state: "加速上升", reading: "大于", accel: "向上", tone: "over", tag: "over" },
  { state: "匀速上升", reading: "等于", accel: "0", tone: "even", tag: "none" },
  { state: "减速上升", reading: "小于", accel: "向下", tone: "under", tag: "under" },
];

const DOWN: readonly Row[] = [
  { state: "加速下降", reading: "小于", accel: "向下", tone: "under", tag: "under" },
  { state: "匀速下降", reading: "等于", accel: "0", tone: "even", tag: "none" },
  { state: "减速下降", reading: "大于", accel: "向上", tone: "over", tag: "over" },
];

const groups = [
  { name: "上升", rows: UP },
  { name: "下降", rows: DOWN },
] as const;

const tagText = (tag: Row["tag"]): string =>
  tag === "over" ? "超重" : tag === "under" ? "失重" : "—";
</script>

<template>
  <div class="est" :class="{ 'est-compare': isCompare }">
    <div class="est-head">
      <span>运动状态</span>
      <span v-if="isCompare">加速度方向</span>
      <span>示数与重力</span>
      <span>现象</span>
    </div>

    <section v-for="group in groups" :key="group.name" class="est-group">
      <div class="est-group-name">{{ group.name }}</div>
      <div class="est-list">
        <div v-for="row in group.rows" :key="row.state" class="est-row">
          <span class="est-state">{{ row.state }}</span>
          <span
            v-if="isCompare"
            class="est-value"
            :class="[{ 'est-hidden': !showAccel }, colorAccel ? `est-tone-${row.tone}` : '']"
            >{{ row.accel }}</span
          >
          <span class="est-value" :class="{ 'est-hidden': !showReading }">{{ row.reading }}</span>
          <span class="est-tag" :class="[`est-tag-${row.tag}`, { 'est-hidden': !showTag }]">{{
            tagText(row.tag)
          }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.est {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;

  width: 100%;
  min-width: 0;
  max-width: 720px;
  margin: 0 auto;
}

/* 第 7 页："运动状态 | 加速度方向 | 示数与重力 | 现象" 四列，比第 6 页多一列，放宽一点 */
.est-compare {
  max-width: 840px;
}

.est-head,
.est-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.85fr;
  gap: 0.6rem;
  align-items: center;
}

.est-head {
  padding: 0 0.85rem;
  color: var(--c-text-dim);
  font-size: 0.78rem;
  line-height: 1.4;
}

.est-group {
  display: flex;
  flex-direction: column;
  gap: 0.16rem;
}

.est-group-name {
  padding-left: 0.85rem;
  border-left: 3px solid var(--c-accent);

  color: var(--c-accent);

  font-weight: 700;
  font-size: 0.86rem;
  line-height: 1.35;
}

.est-list {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;

  padding-left: 0.85rem;
  border-left: 1px solid var(--c-border);
}

.est-row {
  padding: 0.08rem 0.85rem;
  border-radius: var(--radius-sm);

  background: color-mix(in srgb, var(--c-surface-solid) 45%, transparent);

  font-size: 0.92rem;
  line-height: 1.5;
}

/* 第 7 页的四列表：多一列"加速度方向" */
.est-compare .est-head,
.est-compare .est-row {
  grid-template-columns: 1.15fr 1fr 1fr 0.85fr;
}

.est-state {
  color: var(--c-text);
  font-weight: 500;
}

.est-value {
  color: var(--c-neutral-200);
  font-weight: 500;
}

.est-tag {
  justify-self: start;

  padding: 0.02rem 0.56rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}

.est-tag-over {
  border-color: color-mix(in srgb, var(--c-danger) 55%, transparent);
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.est-tag-under {
  border-color: color-mix(in srgb, var(--c-velocity) 55%, transparent);
  background: color-mix(in srgb, var(--c-velocity) 12%, transparent);
  color: var(--c-velocity);
}

.est-tag-none {
  border-color: transparent;
  color: var(--c-text-mute);
}

.est-tone-over {
  color: var(--c-danger);
  font-weight: 700;
}

.est-tone-under {
  color: var(--c-velocity);
  font-weight: 700;
}

.est-tone-even {
  color: var(--c-text-dim);
}

.est-hidden {
  visibility: hidden;
}
</style>
