<script setup lang="ts">
import { ref } from "vue";

interface JudgeItem {
  scene: string;
  can: boolean;
  reason: string;
  chosen: boolean | null;
}

const items = ref<JudgeItem[]>([
  {
    scene: "研究地球绕太阳公转",
    can: true,
    reason: "地球直径不到地日距离的万分之一，大小引起的运动差异可忽略",
    chosen: null,
  },
  {
    scene: "研究地球的自转",
    can: false,
    reason: "需要关注地球各部分的转动差异，形状不能忽略",
    chosen: null,
  },
  {
    scene: "研究列车从沈阳到北京的整体运动",
    can: true,
    reason: "只关注整体运动，不考虑传动机构与车轮的运动差异",
    chosen: null,
  },
  {
    scene: "研究列车通过一座桥的时间",
    can: false,
    reason: "列车长度相对桥的长度不能忽略",
    chosen: null,
  },
  {
    scene: "研究如何踢出“香蕉球”",
    can: false,
    reason: "旋转与弧线径迹和球的形状密切相关",
    chosen: null,
  },
  {
    scene: "研究足球从 A 点飞到 B 点的整体径迹",
    can: true,
    reason: "只关注整体运动，不研究旋转",
    chosen: null,
  },
]);

const choose = (item: JudgeItem, choice: boolean): void => {
  if (item.chosen != null) return;
  item.chosen = choice;
};
</script>

<template>
  <div class="judge-list">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="judge-card"
      :class="{ answered: item.chosen !== null }"
    >
      <div class="judge-head">
        <span class="judge-idx">{{ i + 1 }}</span>
        <span class="judge-scene">{{ item.scene }}</span>
        <span
          v-if="item.chosen !== null"
          class="judge-badge"
          :class="item.chosen === item.can ? 'right' : 'wrong'"
        >
          {{ item.chosen === item.can ? "正确" : "错误" }}
        </span>
      </div>

      <div v-if="item.chosen === null" class="judge-actions">
        <button class="opt-btn" type="button" @click="choose(item, true)">能看成质点</button>
        <button class="opt-btn alt" type="button" @click="choose(item, false)">不能看成质点</button>
      </div>

      <div v-else class="judge-result">
        <svg
          v-if="item.chosen === item.can"
          class="tick"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" fill="#34d399" />
        </svg>
        <svg v-else class="tick" viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"
            fill="#f87171"
          />
        </svg>
        <span class="reason">{{ item.reason }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.judge-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 0.9rem;
}

.judge-card {
  padding: 0.42rem 1rem;
  border: 1px solid rgb(148 163 184 / 10%);
  border-radius: 1.1rem;

  background: rgb(30 41 59 / 65%);

  backdrop-filter: blur(16px);

  transition: all 0.3s ease;
}

.judge-card.answered {
  border-color: rgb(148 163 184 / 18%);
}

.judge-head {
  display: flex;
  gap: 0.7rem;
  align-items: center;
}

.judge-idx {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid rgb(226 168 70 / 35%);
  border-radius: 50%;

  background: rgb(226 168 70 / 15%);
  color: #e2a846;

  font-weight: 700;
  font-size: 0.66rem;
}

.judge-scene {
  color: #f1f5f9;
  font-size: 0.86rem;
}

.judge-badge {
  flex-shrink: 0;

  margin-left: auto;
  padding: 0.1rem 0.5rem;
  border-radius: 2rem;

  font-weight: 700;
  font-size: 0.68rem;
}

.judge-badge.right {
  border: 1px solid rgb(52 211 153 / 30%);
  background: rgb(52 211 153 / 12%);
  color: #34d399;
}

.judge-badge.wrong {
  border: 1px solid rgb(248 113 113 / 30%);
  background: rgb(248 113 113 / 12%);
  color: #f87171;
}

.judge-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.38rem;
}

.opt-btn {
  padding: 0.24rem 0.9rem;
  border: 1px solid rgb(52 211 153 / 45%);
  border-radius: 2rem;

  background: rgb(52 211 153 / 12%);
  color: #34d399;

  font-size: 0.75rem;

  cursor: pointer;

  transition: all 0.25s ease;
}

.opt-btn.alt {
  border-color: rgb(248 113 113 / 45%);
  background: rgb(248 113 113 / 12%);
  color: #f87171;
}

.opt-btn:hover {
  filter: brightness(1.2);
  transform: translateY(-1px);
}

.judge-result {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  margin-top: 0.55rem;
}

.tick {
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.reason {
  color: #cbd5e1;
  font-size: 0.8rem;
  line-height: 1.5;
}
</style>
