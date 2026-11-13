<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 电梯六种运动状态表（第 9、10 页）
 *
 * - Mode="reading"（第 9 页）：先给出「示数与重力相比」这一列（大于/等于/小于）； 然后**从上到下 6 次点击**逐个出现「现象」（超重/失重/—）； 再**6
 *   次点击**逐个出现左侧的「运动状态」（加速上升 … 减速下降）。
 * - Mode="accel"（第 10 页）：运动状态、示数、现象常显；加速度方向**从上到下 6 次点击**逐个出现， 匀速行的加速度写 0。结论（与运动方向无关）由页面自己加。
 *
 * 每一步只新增内容、不顶跑已可见内容：未出现的格子用 visibility:hidden 占位（不用 v-if）。
 */
const { mode = "reading" } = defineProps<{ mode?: "reading" | "accel" }>();

const { $clicks } = useSlideContext();
const step = computed(() => Math.max(0, $clicks.value ?? 0));
const isAccel = computed(() => mode === "accel");

interface Row {
  state: string;
  relation: string;
  tag: "超重" | "失重" | null;
  arrow: "↑" | "↓" | "0";
  group: "up" | "down";
}

const ROWS: Row[] = [
  { state: "加速上升", relation: "大于", tag: "超重", arrow: "↑", group: "up" },
  { state: "匀速上升", relation: "等于", tag: null, arrow: "0", group: "up" },
  { state: "减速上升", relation: "小于", tag: "失重", arrow: "↓", group: "up" },
  { state: "加速下降", relation: "小于", tag: "失重", arrow: "↓", group: "down" },
  { state: "匀速下降", relation: "等于", tag: null, arrow: "0", group: "down" },
  { state: "减速下降", relation: "大于", tag: "超重", arrow: "↑", group: "down" },
];

/** 现象列：读表页从上到下逐个出现（第 1–6 击）；加速度页常显 */
const showTag = (index: number): boolean => {
  if (isAccel.value) return true;
  return step.value >= index + 1;
};

/** 运动状态列：读表页在现象列出完之后，再从上到下逐个出现（第 7–12 击） */
const showState = (index: number): boolean => {
  if (isAccel.value) return true;
  return step.value >= ROWS.length + index + 1;
};

/** 加速度方向：加速度页从上到下逐个出现 */
const showArrow = (index: number): boolean => isAccel.value && step.value >= index + 1;

const relationClass = (row: Row): string => {
  if (row.relation === "大于") return "is-bigger";
  if (row.relation === "小于") return "is-smaller";
  return "is-even";
};

/** 现象列的颜色：CSS 类名用 kebab-case，中文标签只用于显示 */
const tagClass = (tag: Row["tag"]): string => {
  if (tag === "超重") return "is-overweight";
  if (tag === "失重") return "is-weightless";
  return "is-none";
};
</script>

<template>
  <div class="est" :class="{ 'est-accel': isAccel }">
    <div class="est-row est-head">
      <div>运动状态</div>
      <div>示数与重力相比</div>
      <div>现象</div>
      <div v-if="isAccel">加速度方向</div>
    </div>

    <div v-for="(row, i) in ROWS" :key="row.state" class="est-row" :class="`est-${row.group}`">
      <div class="est-cell est-state" :class="{ 'est-hidden': !showState(i) }">{{ row.state }}</div>
      <div class="est-cell est-rel" :class="relationClass(row)">{{ row.relation }}</div>
      <div class="est-cell est-tag" :class="[tagClass(row.tag), { 'est-hidden': !showTag(i) }]">
        {{ row.tag ?? "—" }}
      </div>
      <div v-if="isAccel" class="est-cell est-arrow" :class="{ 'est-hidden': !showArrow(i) }">
        <span class="est-arrow-glyph">{{ row.arrow }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.est {
  display: grid;
  gap: 0.18rem;

  width: 100%;
  max-width: 100%;

  font-size: 0.88rem;
}

.est-row {
  display: grid;
  grid-template-columns: 1.2fr 1.15fr 0.8fr;
  gap: 0.4rem;
  align-items: center;

  padding: 0.11rem 0.8rem;
  border: 1px solid var(--c-border);
  border-radius: 0.7rem;

  background: rgb(30 41 59 / 38%);
}

.est-accel .est-row {
  grid-template-columns: 1.06fr 1.02fr 0.68fr 0.76fr;
}

.est-head {
  border-color: transparent;

  background: transparent;
  color: var(--c-text-dim);

  font-weight: 700;
  font-size: 0.74rem;
  white-space: nowrap;
}

.est-cell {
  min-width: 0;
}

.est-state {
  color: var(--c-text);
  font-weight: 700;
}

.est-rel {
  font-weight: 700;
}

.est-rel.is-bigger {
  color: var(--c-danger);
}

.est-rel.is-smaller {
  color: var(--c-velocity);
}

.est-rel.is-even {
  color: var(--c-text-dim);
}

.est-tag {
  font-weight: 700;
  font-size: 0.82rem;
  text-align: center;
}

.est-tag.is-overweight {
  color: var(--c-danger);
}

.est-tag.is-weightless {
  color: var(--c-velocity);
}

.est-tag.is-none {
  color: var(--c-neutral-600);
}

.est-arrow {
  text-align: center;
}

.est-arrow-glyph {
  color: var(--c-accent);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1;
}

.est-hidden {
  visibility: hidden;
}
</style>
