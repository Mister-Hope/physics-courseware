<script setup>
import { useSlideContext } from "@slidev/client";
import { computed } from "vue";

/**
 * 顶栏：本课件含**两个课时**（第 1–16 页 = 第一课时 1.2；第 17 页起 = 第二课时 1.3）。 共享的 CourseTopBar 只接一个静态
 * section，所以这里按当前页码切换内页课题名， 免得第二课时的每页顶栏都挂着第一课时的课题。
 */
const { $nav } = useSlideContext();

const SECTION_2_FROM_PAGE = 17;
const section = computed(() =>
  $nav.value.currentPage >= SECTION_2_FROM_PAGE
    ? "带电粒子在匀强磁场中的运动"
    : "磁场对运动电荷的作用力",
);
</script>

<template>
  <CourseTopBar chapter="第一章 安培力与洛伦兹力" :section="section" />
</template>
