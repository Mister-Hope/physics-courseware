<script setup lang="ts">
import { ref } from "vue";

interface ForceOption {
  text: string;
  correct: boolean;
  note: string;
}

interface Scene {
  title: string;
  options: ForceOption[];
}

/** 两个情景分别取自教材 §3.3 练习与应用第 3、4 题 */
const scenes: Scene[] = [
  {
    title: "油桶放在汽车上，汽车停于水平地面：油桶受到哪几个力？",
    options: [
      { text: "地球对油桶的重力", correct: true, note: "" },
      { text: "汽车对油桶的支持力", correct: true, note: "" },
      {
        text: "汽车对油桶的压力",
        correct: false,
        note: "汽车对油桶的力叫支持力；压力是油桶对汽车施加的。",
      },
      { text: "油桶对汽车的压力", correct: false, note: "这是油桶施加给汽车的力，作用在汽车上。" },
      {
        text: "汽车对油桶的摩擦力",
        correct: false,
        note: "汽车静止，油桶相对汽车没有运动趋势，不受摩擦力。",
      },
    ],
  },
  {
    title: "木块 A、B 叠放在水平桌面上，B 受水平向右的牵引力仍静止：B 受到哪几个力？",
    options: [
      { text: "地球对 B 的重力", correct: true, note: "" },
      { text: "A 对 B 的支持力", correct: true, note: "" },
      { text: "水平向右的牵引力", correct: true, note: "" },
      {
        text: "A 对 B 的摩擦力",
        correct: true,
        note: "B 有向右滑动的趋势，A 给 B 一个向左的静摩擦力。",
      },
      { text: "B 对 A 的压力", correct: false, note: "这是 B 施加给 A 的力，作用在 A 上。" },
      { text: "桌面对 B 的支持力", correct: false, note: "B 不与桌面接触，桌面不可能支持 B。" },
    ],
  },
];

const picked = ref<boolean[][]>(scenes.map((scene) => scene.options.map(() => false)));
const checked = ref<boolean[]>(scenes.map(() => false));

const toggle = (sceneIndex: number, optionIndex: number): void => {
  if (checked.value[sceneIndex]) return;
  picked.value[sceneIndex][optionIndex] = !picked.value[sceneIndex][optionIndex];
};

const check = (sceneIndex: number): void => {
  if (checked.value[sceneIndex]) {
    checked.value[sceneIndex] = false;
    picked.value[sceneIndex] = scenes[sceneIndex].options.map(() => false);

    return;
  }

  checked.value[sceneIndex] = true;
};

const wrongNotes = (sceneIndex: number): string[] =>
  scenes[sceneIndex].options
    .map((option, optionIndex) => ({ ...option, selected: picked.value[sceneIndex][optionIndex] }))
    .filter((option) => option.correct !== option.selected)
    .map(
      (option) =>
        `${option.correct ? "漏选" : "多选"}：${option.text}${option.note === "" ? "" : ` —— ${option.note}`}`,
    );

const allRight = (sceneIndex: number): boolean =>
  scenes[sceneIndex].options.every(
    (option, optionIndex) => option.correct === picked.value[sceneIndex][optionIndex],
  );
</script>

<template>
  <div class="fp-grid">
    <div v-for="(scene, sceneIndex) in scenes" :key="sceneIndex" class="fp-scene">
      <div class="fp-title">{{ scene.title }}</div>
      <button
        v-for="(option, optionIndex) in scene.options"
        :key="optionIndex"
        class="fp-opt"
        :class="{
          on: picked[sceneIndex][optionIndex],
          ok: checked[sceneIndex] && option.correct,
          no: checked[sceneIndex] && picked[sceneIndex][optionIndex] && !option.correct,
          miss: checked[sceneIndex] && !picked[sceneIndex][optionIndex] && option.correct,
        }"
        type="button"
        @click="toggle(sceneIndex, optionIndex)"
      >
        {{ option.text }}
      </button>
      <div class="fp-foot">
        <button class="fp-check" type="button" @click="check(sceneIndex)">
          {{ checked[sceneIndex] ? "重做" : "检查" }}
        </button>
      </div>
      <div class="fp-feedback" :class="{ 'fp-hidden': !checked[sceneIndex] }">
        <span v-if="allRight(sceneIndex)" class="fp-good">这些力都选对了</span>
        <span
          v-for="(note, noteIndex) in wrongNotes(sceneIndex)"
          v-else
          :key="noteIndex"
          class="fp-note"
          >{{ note }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.fp-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.4rem;

  width: 100%;
  min-width: 0;
}

.fp-scene {
  display: flex;
  flex-direction: column;
  gap: 0.16rem;
  min-width: 0;
}

.fp-title {
  margin-bottom: 0.05rem;

  color: #f1f5f9;

  font-weight: 700;
  font-size: 0.82rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.fp-opt {
  padding: 0.12rem 0.7rem;
  border: 1px solid rgb(148 163 184 / 22%);
  border-radius: 0.6rem;

  background: rgb(30 41 59 / 55%);
  color: #cbd5e1;

  font-size: 0.75rem;
  text-align: left;

  cursor: pointer;

  transition: all 0.2s ease;
}

.fp-opt:hover {
  border-color: rgb(226 168 70 / 45%);
}

.fp-opt.on {
  border-color: rgb(226 168 70 / 65%);
  background: rgb(226 168 70 / 14%);
  color: #f1f5f9;
}

.fp-opt.ok {
  border-color: rgb(52 211 153 / 55%);
  background: rgb(52 211 153 / 12%);
  color: #34d399;
}

.fp-opt.no {
  border-color: rgb(248 113 113 / 55%);
  background: rgb(248 113 113 / 12%);
  color: #f87171;
}

.fp-opt.miss {
  border-style: dashed;
  border-color: rgb(52 211 153 / 55%);
  color: #6ee7b7;
}

.fp-foot {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.15rem;
}

.fp-check {
  padding: 0.16rem 0.9rem;
  border: 1px solid rgb(59 130 246 / 50%);
  border-radius: 2rem;

  background: rgb(59 130 246 / 12%);
  color: #93c5fd;

  font-weight: 700;
  font-size: 0.74rem;

  cursor: pointer;
}

.fp-check:hover {
  filter: brightness(1.18);
}

.fp-feedback {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  min-height: 1.9rem;
  margin-top: 0.08rem;

  color: #cbd5e1;

  font-size: 0.72rem;
  line-height: 1.38;
}

.fp-hidden {
  visibility: hidden;
}

.fp-good {
  color: #34d399;
  font-weight: 700;
}

.fp-note {
  overflow-wrap: anywhere;
}
</style>
