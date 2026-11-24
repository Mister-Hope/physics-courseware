<script setup lang="ts">
import { computed } from "vue";

type Tone = "accent" | "velocity" | "physics" | "danger";

interface Link {
  text: string;
  tone: Tone;
}

const { step = 4 } = defineProps<{
  /** 显示到第几条转化链（1~4），默认全部 */
  step?: number;
}>();

const tones: Record<Tone, { fill: string; stroke: string }> = {
  accent: { fill: "rgba(226, 168, 70, 0.14)", stroke: "var(--c-accent)" },
  velocity: { fill: "rgba(96, 165, 250, 0.14)", stroke: "var(--c-velocity)" },
  physics: { fill: "rgba(45, 212, 191, 0.14)", stroke: "var(--c-physics)" },
  danger: { fill: "rgba(248, 113, 113, 0.14)", stroke: "var(--c-danger)" },
};

const rows = computed(() => {
  const data: { links: Link[]; note: string }[] = [
    {
      links: [
        { text: "化学能", tone: "accent" },
        { text: "内能", tone: "velocity" },
        { text: "机械能", tone: "physics" },
      ],
      note: "内燃机",
    },
    {
      links: [
        { text: "电能", tone: "physics" },
        { text: "机械能", tone: "accent" },
      ],
      note: "电动机",
    },
    {
      links: [
        { text: "光能", tone: "accent" },
        { text: "化学能", tone: "velocity" },
      ],
      note: "光合作用",
    },
    {
      links: [
        { text: "核能", tone: "danger" },
        { text: "电能", tone: "physics" },
      ],
      note: "核电站",
    },
  ];
  return data.map((row, rowIndex) => {
    const links = row.links.map((link, i) => {
      const x = 20 + i * 138;
      return { ...link, x, y: 24 + rowIndex * 58 };
    });
    return { links, note: row.note, y: 24 + rowIndex * 58 };
  });
});

const visible = computed(() => rows.value.slice(0, Math.max(1, Math.min(4, step))));
</script>

<template>
  <!-- 能量的转化与转移：四条常见的能量转化链 -->
  <svg viewBox="0 0 520 260" width="100%" xmlns="http://www.w3.org/2000/svg">
    <g v-for="row in visible" :key="row.note">
      <g v-for="(link, i) in row.links" :key="link.text">
        <rect :x="link.x" :y="link.y" width="96" height="34" rx="9" :fill="tones[link.tone].fill" :stroke="tones[link.tone].stroke" stroke-width="1.4" />
        <text :x="link.x + 48" :y="link.y + 23" font-size="16" :fill="tones[link.tone].stroke" text-anchor="middle">{{ link.text }}</text>
        <CourseArrow
          v-if="i < row.links.length - 1"
          :from="{ x: link.x + 102, y: link.y + 17 }"
          :to="{ x: link.x + 132, y: link.y + 17 }"
          stroke="var(--c-text-dim)"
          :stroke-width="1.6"
        />
      </g>
      <text :x="row.links[row.links.length - 1].x + 150" :y="row.y + 23" font-size="15" fill="var(--c-text-dim)">{{ row.note }}</text>
    </g>
  </svg>
</template>
