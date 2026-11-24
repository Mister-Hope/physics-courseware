<!-- 5.5 P13：粒子物理标准模型的分类网格——夸克 6 种、轻子 6 种、规范玻色子、希格斯玻色子，按 step 一组一组展开 -->
<template>
  <div class="ep-sm">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="ep-sm-row"
      :style="{ visibility: step >= row.step ? 'visible' : 'hidden' }"
    >
      <div class="ep-sm-label">{{ row.label }}</div>
      <div class="ep-sm-items">
        <span v-for="(chip, chipIndex) in row.items" :key="chipIndex" class="ep-sm-chip">
          <Latex v-if="chip.tex" :tex="chip.tex" /><span>{{ chip.text }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SmChip {
  tex?: string;
  text: string;
}

interface SmRow {
  label: string;
  step: number;
  items: SmChip[];
}

const { step = 0 } = defineProps<{ step?: number }>();

const rows: SmRow[] = [
  {
    label: "夸克",
    step: 1,
    items: [{ text: "上夸克" }, { text: "下夸克" }, { text: "奇异夸克" }],
  },
  {
    label: "",
    step: 1,
    items: [{ text: "粲夸克" }, { text: "底夸克" }, { text: "顶夸克" }],
  },
  {
    label: "轻子",
    step: 2,
    items: [{ text: "电子" }, { text: "电子中微子" }, { tex: String.raw`\mu`, text: "子" }],
  },
  {
    label: "",
    step: 2,
    items: [
      { tex: String.raw`\mu`, text: "子中微子" },
      { tex: String.raw`\tau`, text: "子" },
      { tex: String.raw`\tau`, text: "子中微子" },
    ],
  },
  {
    label: "规范玻色子",
    step: 3,
    items: [
      { text: "光子" },
      { tex: String.raw`\text{W}`, text: "玻色子" },
      { tex: String.raw`\text{Z}`, text: "玻色子" },
      { text: "胶子" },
    ],
  },
  {
    label: "希格斯玻色子",
    step: 4,
    items: [{ text: "希格斯玻色子" }],
  },
];
</script>
