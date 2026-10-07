<script setup lang="ts">
import { computed, ref } from "vue";

type Answer = "reaction" | "balance" | "neither";

interface Choice {
  key: Answer;
  label: string;
}

interface Item {
  scene: string;
  answer: Answer;
  reason: string;
}

const choices: Choice[] = [
  { key: "reaction", label: "作用力与反作用力" },
  { key: "balance", label: "一对平衡力" },
  { key: "neither", label: "都不是" },
];

/** 前四组取自教材「猴子吊在空中」「木块放在桌面上」两个例子，最后一组是斜面易错项 */
const items: Item[] = [
  {
    scene: "猴子静止吊在树枝上：猴子受到的重力 与 树枝对猴子的拉力",
    answer: "balance",
    reason: "两个力都作用在猴子这同一个物体上；而且一个是重力、一个是弹力，性质不同。",
  },
  {
    scene: "树枝对猴子的拉力 与 猴子对树枝的拉力",
    answer: "reaction",
    reason: "两个力分别作用在猴子和树枝两个物体上，而且都是弹力——性质相同。",
  },
  {
    scene: "木块静止在水平桌面上：木块受到的重力 与 桌面对木块的支持力",
    answer: "balance",
    reason: "两个力都作用在木块上；一个是重力、一个是弹力，性质不同。",
  },
  {
    scene: "桌面对木块的支持力 与 木块对桌面的压力",
    answer: "reaction",
    reason: "两个力分别作用在木块和桌面两个物体上，都是弹力。",
  },
  {
    scene: "木块静止在粗糙斜面上：木块受到的重力 与 斜面对木块的支持力",
    answer: "neither",
    reason:
      "两者都作用在木块上，但不在同一条直线上、大小也不相等（还有沿斜面的静摩擦力一起参与平衡），所以既不是一对平衡力，也不是一对作用力与反作用力。",
  },
];

const index = ref(0);
const picked = ref<(Answer | null)[]>(items.map(() => null));

const current = computed<Item>(() => items[index.value]);
const chosen = computed<Answer | null>(() => picked.value[index.value]);
const isRight = computed<boolean>(() => chosen.value === current.value.answer);

const choose = (key: Answer): void => {
  if (picked.value[index.value] != null) return;
  picked.value[index.value] = key;
};

const navigate = (step: number): void => {
  const next = index.value + step;
  if (next >= 0 && next < items.length) index.value = next;
};
</script>

<template>
  <div class="pb-wrap">
    <div class="pb-count">第 {{ index + 1 }} / {{ items.length }} 题</div>
    <div class="pb-scene">{{ current.scene }}</div>
    <div class="pb-actions">
      <button
        v-for="c in choices"
        :key="c.key"
        class="pb-btn"
        :class="{
          right: chosen !== null && c.key === current.answer,
          wrong: chosen !== null && c.key === chosen && chosen !== current.answer,
        }"
        type="button"
        :disabled="chosen !== null"
        @click="choose(c.key)"
      >
        {{ c.label }}
      </button>
    </div>
    <div class="pb-result" :class="{ 'pb-hidden': chosen === null }">
      <span class="pb-badge" :class="isRight ? 'ok' : 'no'">{{
        isRight ? "判断正确" : "判断错误"
      }}</span>
      {{ current.reason }}
    </div>
    <div class="pb-nav">
      <button class="pb-nav-btn" type="button" :disabled="index === 0" @click="navigate(-1)">
        上一题
      </button>
      <button
        class="pb-nav-btn"
        type="button"
        :disabled="index === items.length - 1"
        @click="navigate(1)"
      >
        下一题
      </button>
    </div>
  </div>
</template>

<style scoped>
.pb-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  width: 100%;
  min-width: 0;
  max-width: 52rem;
  margin: 0 auto;
}

.pb-count {
  color: var(--c-text-dim, #94a3b8);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.pb-scene {
  color: #f1f5f9;
  font-weight: 700;
  font-size: 1.22rem;
  line-height: 1.5;
}

.pb-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.pb-btn {
  padding: 0.5rem 1.3rem;
  border: 1px solid rgb(148 163 184 / 30%);
  border-radius: 2rem;

  background: rgb(148 163 184 / 8%);
  color: #cbd5e1;

  font-weight: 600;
  font-size: 0.95rem;

  cursor: pointer;

  transition: all 0.2s ease;
}

.pb-btn:disabled {
  opacity: 0.75;
  cursor: default;
}

.pb-btn:hover:not(:disabled) {
  border-color: rgb(226 168 70 / 60%);
  background: rgb(226 168 70 / 12%);
  color: #f1f5f9;
}

.pb-btn.right {
  border-color: rgb(52 211 153 / 55%);
  background: rgb(52 211 153 / 14%);
  color: #34d399;
  opacity: 1;
}

.pb-btn.wrong {
  border-color: rgb(248 113 113 / 55%);
  background: rgb(248 113 113 / 14%);
  color: #f87171;
  opacity: 1;
}

.pb-result {
  display: flex;
  gap: 0.7rem;
  align-items: baseline;

  min-height: 4.4rem;
  padding: 0.7rem 0.9rem;
  border-radius: 1rem;

  background: rgb(30 41 59 / 55%);
  color: #cbd5e1;

  font-size: 0.98rem;
  line-height: 1.6;
}

.pb-hidden {
  visibility: hidden;
}

.pb-badge {
  flex: 0 0 auto;

  padding: 0.1rem 0.6rem;
  border-radius: 2rem;

  font-weight: 700;
  font-size: 0.78rem;
}

.pb-badge.ok {
  border: 1px solid rgb(52 211 153 / 35%);
  background: rgb(52 211 153 / 12%);
  color: #34d399;
}

.pb-badge.no {
  border: 1px solid rgb(248 113 113 / 35%);
  background: rgb(248 113 113 / 12%);
  color: #f87171;
}

.pb-nav {
  display: flex;
  gap: 0.8rem;
}

.pb-nav-btn {
  padding: 0.3rem 1.1rem;
  border: 1px solid rgb(148 163 184 / 25%);
  border-radius: 2rem;

  background: transparent;
  color: #cbd5e1;

  font-size: 0.82rem;

  cursor: pointer;
}

.pb-nav-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.pb-nav-btn:hover:not(:disabled) {
  border-color: rgb(148 163 184 / 55%);
  color: #f1f5f9;
}
</style>
