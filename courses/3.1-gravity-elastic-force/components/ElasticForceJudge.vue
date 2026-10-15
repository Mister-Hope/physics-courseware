<script setup lang="ts">
import { ref } from "vue";

/** 弹力有无 / 弹力大小的多场景判断：每个场景给两个选项，点选后立刻给对错与理由。 全部场景来自教材与教案（接触不一定有弹力、斜角槽内有两处弹力、球卡在窄缝上时弹力与重心位置无关）。 */

interface JudgeItem {
  /** 场景文字 */
  scene: string;
  /** 简图种类 */
  kind: "block" | "incline" | "groove" | "slit";
  /** 两个选项 */
  options: [string, string];
  /** 正确选项下标 */
  answer: number;
  /** 判定理由 */
  reason: string;
  /** 学生已选项（null 表示还没选） */
  chosen: number | null;
}

const items = ref<JudgeItem[]>([
  {
    scene: "地面上小球紧靠右侧的方块，球与方块之间（水平方向）有弹力吗？",
    kind: "block",
    options: ["有弹力", "没有弹力"],
    answer: 1,
    reason: "假设把方块拿走，球仍静止——运动状态没变，说明两者之间没有挤压形变。",
    chosen: null,
  },
  {
    scene: "竖直绳悬挂的小球靠在光滑斜面上，球与斜面之间有弹力吗？",
    kind: "incline",
    options: ["有弹力", "没有弹力"],
    answer: 1,
    reason: "绳是竖直的：若斜面给球弹力，水平方向没有别的力与之平衡，球不可能静止。",
    chosen: null,
  },
  {
    scene: "小球卡在光滑的斜角槽（V 形槽）里，球与两斜面之间有弹力吗？",
    kind: "groove",
    options: ["没有弹力", "有两处弹力"],
    answer: 1,
    reason: "两侧斜面都被球挤压发生形变，球受两个垂直接触面的支持力，与重力平衡。",
    chosen: null,
  },
  {
    scene: "小球卡在比它窄的缝隙上，重心从 A 下移到 C，弹力怎么变？",
    kind: "slit",
    options: ["越往下越大", "与重心位置无关"],
    answer: 1,
    reason:
      "球与缝隙两侧的接触点没变、形变程度没变——弹力大小只看形变程度，与重心在球心上方还是下方无关。",
    chosen: null,
  },
]);

/**
 * 记录学生的选择（每个场景只判定一次）
 *
 * @param item 场景
 * @param index 选项下标
 */
const choose = (item: JudgeItem, index: number): void => {
  if (item.chosen == null) item.chosen = index;
};
</script>

<template>
  <div class="ef-judge">
    <div v-for="(item, index) in items" :key="index" class="ef-judge-card">
      <svg
        class="ef-judge-fig"
        viewBox="0 0 120 110"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g v-if="item.kind === 'block'" stroke="var(--c-neutral-300)" stroke-width="2.4" fill="none">
          <SurfaceHatch
            :from="{ x: 6, y: 88 }"
            :to="{ x: 114, y: 88 }"
            side="below"
            :thickness="8"
            :gap="26"
            color="#cbd5e1"
            :line-width="2.4"
          />
          <circle cx="46" cy="74" r="14" fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
          <rect x="60" y="52" width="36" height="36" fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
        </g>
        <g v-else-if="item.kind === 'incline'" stroke="var(--c-neutral-300)" stroke-width="2.4" fill="none">
          <SurfaceHatch
            :from="{ x: 6, y: 96 }"
            :to="{ x: 114, y: 96 }"
            side="below"
            :thickness="8"
            :gap="26"
            color="#cbd5e1"
            :line-width="2.4"
          />
          <line x1="22" y1="88" x2="96" y2="34" />
          <line x1="24" y1="4" x2="24" y2="88" />
          <circle cx="51" cy="50" r="14" fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
          <line x1="51" y1="36" x2="51" y2="6" stroke="#7dd3fc" />
        </g>
        <g v-else-if="item.kind === 'groove'" stroke="var(--c-neutral-300)" stroke-width="2.4" fill="none">
          <line x1="6" y1="30" x2="60" y2="88" />
          <line x1="114" y1="30" x2="60" y2="88" />
          <circle cx="60" cy="63" r="17" fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
        </g>
        <g v-else stroke="var(--c-neutral-300)" stroke-width="2.4" fill="none">
          <!-- 左右两块（两个直角）拼出的深井：球比井口宽，卡在井口的两条棱上、只陷下去一点点；
               A/B/C 是重心的三个可能位置（球心上方 / 球心 / 球心下方） -->
          <path d="M 6 62 H 46 V 94 H 74 V 62 H 114 V 102 H 6 Z" fill="color-mix(in srgb, var(--c-text-dim) 16%, transparent)" />
          <SurfaceHatch
            :from="{ x: 6, y: 62 }"
            :to="{ x: 46, y: 62 }"
            side="below"
            :thickness="8"
            :gap="26"
            color="#cbd5e1"
            :line-width="2.4"
          />
          <SurfaceHatch
            :from="{ x: 74, y: 62 }"
            :to="{ x: 114, y: 62 }"
            side="below"
            :thickness="8"
            :gap="26"
            color="#cbd5e1"
            :line-width="2.4"
          />
          <circle cx="60" cy="42.5" r="24" fill="color-mix(in srgb, var(--c-text-dim) 18%, transparent)" />
          <g stroke="color-mix(in srgb, var(--c-text-dim) 55%, transparent)" stroke-width="0.9" stroke-dasharray="3 3">
            <line x1="63" y1="26.5" x2="84" y2="26.5" />
            <line x1="63" y1="42.5" x2="84" y2="42.5" />
            <line x1="63" y1="58.5" x2="84" y2="58.5" />
          </g>
          <g fill="var(--c-accent)" stroke="none">
            <circle cx="60" cy="26.5" r="2.8" />
            <circle cx="60" cy="42.5" r="2.8" />
            <circle cx="60" cy="58.5" r="2.8" />
          </g>
          <g
            stroke="none"
            fill="var(--c-accent)"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="12"
          >
            <text x="88" y="30.5">A</text>
            <text x="88" y="46.5">B</text>
            <text x="88" y="62.5">C</text>
          </g>
        </g>
      </svg>
      <div class="ef-judge-body">
        <div class="ef-judge-scene">{{ item.scene }}</div>
        <div class="ef-judge-ans">
          <div v-if="item.chosen === null" class="ef-judge-ops">
            <button
              v-for="(option, optionIndex) in item.options"
              :key="optionIndex"
              class="ef-judge-btn"
              :class="{ alt: optionIndex === 1 }"
              type="button"
              @click="choose(item, optionIndex)"
            >
              {{ option }}
            </button>
          </div>
          <div v-else class="ef-judge-result">
            <span class="ef-judge-badge" :class="item.chosen === item.answer ? 'right' : 'wrong'">
              <mdi-check-decagram v-if="item.chosen === item.answer" /><mdi-close-circle-outline v-else />{{ item.chosen === item.answer ? "对" : "再想想" }}
            </span>
            <span class="ef-judge-reason">{{ item.reason }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ef-judge {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 0.9rem;
  width: 100%;
}

.ef-judge-card {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;

  padding: 0.42rem 0.7rem;
  border: 1px solid var(--c-border);
  border-radius: 1.1rem;

  background: var(--c-surface);
}

.ef-judge-fig {
  flex: 0 0 5.6rem;
  width: 5.6rem;
  height: auto;
}

.ef-judge-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.2rem;

  min-width: 0;
}

.ef-judge-scene {
  color: var(--c-text);
  font-size: 0.8rem;
  line-height: 1.35;
}

.ef-judge-ans {
  min-height: 2.1rem;
}

.ef-judge-ops {
  display: flex;
  gap: 0.45rem;
}

.ef-judge-btn {
  padding: 0.16rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--c-ok) 45%, transparent);
  border-radius: 2rem;

  background: var(--c-ok-soft);
  color: var(--c-ok);

  font-size: 0.72rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.ef-judge-btn.alt {
  border-color: color-mix(in srgb, var(--c-accent-2) 45%, transparent);
  background: var(--c-accent-2-soft);
  color: var(--c-accent-2);
}

.ef-judge-btn:hover {
  filter: brightness(1.2);
}

.ef-judge-result {
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
}

.ef-judge-badge {
  flex-shrink: 0;

  margin-top: 0.1rem;
  padding: 0.04rem 0.42rem;
  border-radius: 2rem;

  font-weight: 700;
  font-size: 0.68rem;
}

.ef-judge-badge > svg {
  margin-right: 0.12rem;
  font-size: 0.9em;
  vertical-align: -0.12em;
}

.ef-judge-badge.right {
  border: 1px solid color-mix(in srgb, var(--c-ok) 35%, transparent);
  background: var(--c-ok-soft);
  color: var(--c-ok);
}

.ef-judge-badge.wrong {
  border: 1px solid color-mix(in srgb, var(--c-danger) 35%, transparent);
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.ef-judge-reason {
  color: var(--c-text-dim);
  font-size: 0.72rem;
  line-height: 1.4;
}
</style>
