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
        <span>授课教师：{{ displayTeacher }}</span>
        <span v-if="classroom">授课教室：{{ classroom }}</span>
      </div>
    </div>

    <div class="cover-decoration abs-br m-8" aria-hidden="true">
      <slot />
    </div>

    <p class="cover-origin">
      <span class="cover-origin-text">原创：东北育才学校 张伯望</span>
      <a
        class="cover-github"
        href="https://github.com/Mister-Hope/physics-courseware"
        target="_blank"
        rel="noopener noreferrer"
        title="在 GitHub 上查看本项目源码"
        aria-label="在 GitHub 上查看本项目源码"
      >
        <svg viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
          />
        </svg>
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { lessonParams } from "../utils/lesson-params";

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
  /** 授课教师，默认张伯望；URL 带 ?teacher=<姓名> 时以 URL 为准（主页「我要上课」生成） */
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

/** 授课教师：URL 的 ?teacher（主页「我要上课」生成，随链接可携带/可分享）优先， 其次用 frontmatter / props 里的 teacher（默认张伯望）。 */
const displayTeacher = computed(() => lessonParams.teacher || teacher);
</script>

<!--
  封面布局（共享 addon，所有课件共用；不要再在 slides.md 里手写封面 HTML）：
  - 由 addon 的 layouts/ 目录自动注册，headmatter 里写 `layout: course-cover`；
  - 章节行、课题名、授课信息都在这里渲染，底部固定一行 14px 的「原创：东北育才学校 张伯望」＋ GitHub 图标
    （图标点击在浏览器新标签页打开项目仓库）；
  - 装饰 SVG 走默认插槽（课件里直接写 `<CoverXxxSvg />`），定位与样式沿用 .cover-decoration；
  - 样式在 workspace/shared/styles/common.css，课件自己的 style.css 仍可覆盖 .cover-title / .cover-decoration。
-->
