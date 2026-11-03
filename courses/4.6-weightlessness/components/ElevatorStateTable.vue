<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 电梯六个运动状态与"示数 / 加速度方向"的对应表（§4.6 第 6、7 页）
 *
 * 按"先问后答"分步：第 1 击出第二列，第 2 击出"现象"列（示数表）或给加速度方向着色（加速度表）， 让学生自己把状态、示数/加速度、超重失重联系起来。
 */
const { mode = "reading" } = defineProps<{
  /** Reading：示数与重力的关系；acceleration：加速度的方向 */
  mode?: "reading" | "acceleration";
}>();

const { $clicks } = useSlideContext();
const step = computed(() => $clicks.value);

/** 第二列（示数与重力 / 加速度方向）在第 1 击后出现 */
const showValue = computed(() => step.value >= 1);
/** 现象列：加速度表沿用前一页的结论、常显；示数表点第 2 次才出 */
const showTag = computed(() => mode === "acceleration" || step.value >= 2);
/** 加速度表第 2 击给方向着色，把"加速度向上 = 超重"的共同点点出来 */
const colorValue = computed(() => mode === "acceleration" && step.value >= 2);

interface Row {
  readonly state: string;
  readonly value: string;
  readonly tone: "over" | "under" | "even";
  readonly tag: "over" | "under" | "none";
}

const UP = computed<readonly Row[]>(() =>
  mode === "reading"
    ? [
        { state: "加速上升", value: "大于", tone: "over", tag: "over" },
        { state: "匀速上升", value: "等于", tone: "even", tag: "none" },
        { state: "减速上升", value: "小于", tone: "under", tag: "under" },
      ]
    : [
        { state: "加速上升", value: "向上", tone: "over", tag: "over" },
        { state: "匀速上升", value: "0", tone: "even", tag: "none" },
        { state: "减速上升", value: "向下", tone: "under", tag: "under" },
      ],
);

const DOWN = computed<readonly Row[]>(() =>
  mode === "reading"
    ? [
        { state: "加速下降", value: "小于", tone: "under", tag: "under" },
        { state: "匀速下降", value: "等于", tone: "even", tag: "none" },
        { state: "减速下降", value: "大于", tone: "over", tag: "over" },
      ]
    : [
        { state: "加速下降", value: "向下", tone: "under", tag: "under" },
        { state: "匀速下降", value: "0", tone: "even", tag: "none" },
        { state: "减速下降", value: "向上", tone: "over", tag: "over" },
      ],
);

const valueHeader = computed(() => (mode === "reading" ? "示数与重力" : "加速度方向"));

const tagText = (tag: Row["tag"]): string =>
  tag === "over" ? "超重" : tag === "under" ? "失重" : "—";
</script>

<template>
  <div class="est">
    <section class="est-group">
      <div class="est-group-name">上升</div>
      <div class="est-head">
        <span>运动状态</span>
        <span>{{ valueHeader }}</span>
        <span>现象</span>
      </div>
      <div class="est-list">
        <div v-for="row in UP" :key="row.state" class="est-row">
          <span class="est-state">{{ row.state }}</span>
          <span
            class="est-value"
            :class="[{ 'est-hidden': !showValue }, colorValue ? `est-tone-${row.tone}` : '']"
            >{{ row.value }}</span
          >
          <span class="est-tag" :class="[`est-tag-${row.tag}`, { 'est-hidden': !showTag }]">{{
            tagText(row.tag)
          }}</span>
        </div>
      </div>
    </section>

    <section class="est-group">
      <div class="est-group-name">下降</div>
      <div class="est-head">
        <span>运动状态</span>
        <span>{{ valueHeader }}</span>
        <span>现象</span>
      </div>
      <div class="est-list">
        <div v-for="row in DOWN" :key="row.state" class="est-row">
          <span class="est-state">{{ row.state }}</span>
          <span
            class="est-value"
            :class="[{ 'est-hidden': !showValue }, colorValue ? `est-tone-${row.tone}` : '']"
            >{{ row.value }}</span
          >
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.3rem;

  width: 100%;
  min-width: 0;
}

.est-group {
  display: flex;
  flex-direction: column;
  gap: 0.26rem;
  min-width: 0;
}

.est-group-name {
  padding-left: 0.75rem;
  border-left: 3px solid var(--c-accent);

  color: var(--c-accent);

  font-weight: 700;
  font-size: 1.02rem;
  line-height: 1.5;
}

.est-head,
.est-row {
  display: grid;
  grid-template-columns: 1.25fr 1fr 0.72fr;
  gap: 0.5rem;
  align-items: center;
}

.est-head {
  padding: 0 0.85rem 0.12rem;
  color: var(--c-text-dim);
  font-size: 0.82rem;
}

.est-list {
  display: flex;
  flex-direction: column;
  gap: 0.26rem;

  padding-left: 0.85rem;
  border-left: 1px solid var(--c-border);
}

.est-row {
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--c-surface-solid) 45%, transparent);
  font-size: 1.02rem;
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

  padding: 0.04rem 0.6rem;
  border: 1px solid var(--c-border);
  border-radius: 999px;

  font-weight: 700;
  font-size: 0.9rem;
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
