<template>
  <div class="slidev-layout cover course-cover">
    <div class="my-auto w-full">
      <div v-if="chapterNo || chapterText" class="cover-chapter">
        <span v-if="chapterNo"><span class="cover-section">§</span> {{ chapterNo }}</span>
        <span v-if="chapterNo && chapterText"> · </span>
        <span v-if="chapterText">{{ chapterText }}</span>
      </div>

      <h1 class="cover-title">{{ title }}</h1>

      <div v-if="subtitle" class="cover-subtitle">{{ subtitle }}</div>

      <div class="cover-subtitle">
        <span>授课教师：{{ teacher }}</span>
        <span v-if="classroom">授课教室：{{ classroom }}</span>
      </div>
    </div>

    <div class="cover-decoration abs-br m-8" aria-hidden="true">
      <slot />
    </div>

    <p class="cover-origin">原创：东北育才学校 张伯望</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const {
  chapter = "",
  chapterNo = "",
  lesson = "",
  subtitle = "",
  classroom = "",
  teacher = "张伯望",
  frontmatter = {},
} = defineProps<{
  /** 章名称，如「第一章 运动的描述」 */
  chapter?: string;
  /** 章节编号，如「1.1」「2.2 · 2.3」；留空则不显示 § */
  chapterNo?: string;
  /** 课时，如「第二课时」「习题课」，拼在章节行末尾 */
  lesson?: string;
  /** 本课时讲什么（可选，显示在课题名下方一行） */
  subtitle?: string;
  /** 授课教室（可选，跟在授课教师后面） */
  classroom?: string;
  /** 授课教师，默认张伯望 */
  teacher?: string;
  /** Slidev 附带的完整 frontmatter（课题名要从这里取，见下） */
  frontmatter?: { title?: string };
}>();

/**
 * 课题名称 = 本页 frontmatter 的 `title`。
 *
 * 为什么不用 props.title：Slidev 生成布局时走 `frontmatterToProps()`，会把 `title` 这类保留字段
 * （FRONTMATTER_FIELDS：title / layout / transition…）从 props 里剔除，只在额外传入的 `frontmatter` prop 里保留完整内容
 * —— 所以这里从 `frontmatter.title` 取（第一个封面取 headmatter 的 title， 第二课时封面取该页自己的 title）。
 */
const title = computed(() => frontmatter?.title ?? "");

/** 章节行 = 章名称 [· 课时]；编号单独渲染，§ 走 `.cover-section` 的字号 */
const chapterText = computed(() => [chapter, lesson].filter(Boolean).join(" · "));
</script>

<!--
  封面布局（共享 addon，所有课件共用；不要再在 slides.md 里手写封面 HTML）：
  - 由 addon 的 layouts/ 目录自动注册，headmatter 里写 `layout: course-cover`；
  - 章节行、课题名、授课信息都在这里渲染，底部固定一行 14px 的「原创：东北育才学校 张伯望」；
  - 装饰 SVG 走默认插槽（课件里直接写 `<CoverXxxSvg />`），定位与样式沿用 .cover-decoration；
  - 样式在 workspace/shared/styles/common.css，课件自己的 style.css 仍可覆盖 .cover-title / .cover-decoration。
-->
