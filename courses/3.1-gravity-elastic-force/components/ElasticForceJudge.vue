<script setup lang="ts">
import { ref } from "vue";

/** 弹力有无 / 弹力大小的多场景判断：每个场景给两个选项，点选后立刻给对错与理由。 全部场景来自教材与教案（接触不一定有弹力、斜角槽内有两处弹力、竖直杆夹球与高度无关）。 */

interface JudgeItem {
  /** 场景文字 */
  scene: string;
  /** 简图种类 */
  kind: "block" | "incline" | "groove" | "rails";
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
    scene: "小球夹在两竖直杆之间，从 A 移到 B、C，杆对球的弹力怎么变？",
    kind: "rails",
    options: ["越往上越大", "与高度无关"],
    answer: 1,
    reason: "两杆间距不变、形变程度不变：弹力大小只由形变量决定，与所在高度无关。",
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
  <div class="ej">
    <div v-for="(item, index) in items" :key="index" class="ej-card">
      <svg
        class="ej-fig"
        viewBox="0 0 120 110"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g v-if="item.kind === 'block'" stroke="#cbd5e1" stroke-width="2.4" fill="none">
          <SurfaceHatch
            :from="{ x: 6, y: 88 }"
            :to="{ x: 114, y: 88 }"
            side="below"
            :thickness="8"
            :gap="26"
            color="#cbd5e1"
            :line-width="2.4"
          />
          <circle cx="46" cy="74" r="14" fill="rgba(148,163,184,0.18)" />
          <rect x="60" y="52" width="36" height="36" fill="rgba(148,163,184,0.18)" />
        </g>
        <g v-else-if="item.kind === 'incline'" stroke="#cbd5e1" stroke-width="2.4" fill="none">
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
          <circle cx="51" cy="50" r="14" fill="rgba(148,163,184,0.18)" />
          <line x1="51" y1="36" x2="51" y2="6" stroke="#7dd3fc" />
        </g>
        <g v-else-if="item.kind === 'groove'" stroke="#cbd5e1" stroke-width="2.4" fill="none">
          <line x1="6" y1="30" x2="60" y2="88" />
          <line x1="114" y1="30" x2="60" y2="88" />
          <circle cx="60" cy="63" r="17" fill="rgba(148,163,184,0.18)" />
        </g>
        <g v-else stroke="#cbd5e1" stroke-width="2.4" fill="none">
          <line x1="47" y1="6" x2="47" y2="104" />
          <line x1="73" y1="6" x2="73" y2="104" />
          <circle cx="60" cy="42" r="11" stroke-dasharray="3 3" opacity="0.7" />
          <circle cx="60" cy="20" r="11" stroke-dasharray="3 3" opacity="0.7" />
          <circle cx="60" cy="74" r="13" fill="rgba(148,163,184,0.18)" />
          <circle cx="60" cy="74" r="2.8" fill="#e2a846" stroke="none" />
          <circle cx="60" cy="42" r="2.8" fill="#e2a846" stroke="none" />
          <circle cx="60" cy="20" r="2.8" fill="#e2a846" stroke="none" />
          <line x1="60" y1="20" x2="110" y2="20" stroke-dasharray="4 4" opacity="0.7" />
          <g
            stroke="none"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="13"
          >
            <text x="76" y="79">A</text>
            <text x="76" y="47">B</text>
            <text x="76" y="25">C</text>
          </g>
        </g>
      </svg>
      <div class="ej-body">
        <div class="ej-scene">{{ item.scene }}</div>
        <div class="ej-ans">
          <div v-if="item.chosen === null" class="ej-ops">
            <button
              v-for="(option, optionIndex) in item.options"
              :key="optionIndex"
              class="ej-btn"
              :class="{ alt: optionIndex === 1 }"
              type="button"
              @click="choose(item, optionIndex)"
            >
              {{ option }}
            </button>
          </div>
          <div v-else class="ej-result">
            <span class="ej-badge" :class="item.chosen === item.answer ? 'right' : 'wrong'">
              {{ item.chosen === item.answer ? "对" : "再想想" }}
            </span>
            <span class="ej-reason">{{ item.reason }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ej {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 0.9rem;
  width: 100%;
}

.ej-card {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;

  padding: 0.42rem 0.7rem;
  border: 1px solid rgb(148 163 184 / 12%);
  border-radius: 1.1rem;

  background: rgb(30 41 59 / 55%);
}

.ej-fig {
  flex: 0 0 5.6rem;
  width: 5.6rem;
  height: auto;
}

.ej-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.2rem;

  min-width: 0;
}

.ej-scene {
  color: #f1f5f9;
  font-size: 0.8rem;
  line-height: 1.35;
}

.ej-ans {
  min-height: 2.1rem;
}

.ej-ops {
  display: flex;
  gap: 0.45rem;
}

.ej-btn {
  padding: 0.16rem 0.7rem;
  border: 1px solid rgb(52 211 153 / 45%);
  border-radius: 2rem;

  background: rgb(52 211 153 / 12%);
  color: #34d399;

  font-size: 0.72rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.ej-btn.alt {
  border-color: rgb(96 165 250 / 45%);
  background: rgb(96 165 250 / 12%);
  color: #60a5fa;
}

.ej-btn:hover {
  filter: brightness(1.2);
}

.ej-result {
  display: flex;
  gap: 0.4rem;
  align-items: flex-start;
}

.ej-badge {
  flex-shrink: 0;

  margin-top: 0.1rem;
  padding: 0.04rem 0.42rem;
  border-radius: 2rem;

  font-weight: 700;
  font-size: 0.68rem;
}

.ej-badge.right {
  border: 1px solid rgb(52 211 153 / 35%);
  background: rgb(52 211 153 / 12%);
  color: #34d399;
}

.ej-badge.wrong {
  border: 1px solid rgb(248 113 113 / 35%);
  background: rgb(248 113 113 / 12%);
  color: #f87171;
}

.ej-reason {
  color: #cbd5e1;
  font-size: 0.72rem;
  line-height: 1.4;
}
</style>
