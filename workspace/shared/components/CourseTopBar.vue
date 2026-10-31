<template>
  <div class="global-top">
    <Transition name="top-text" mode="out-in">
      <span class="global-top-title" :key="isCover ? 'chapter' : 'section'">
        {{ isCover ? displayChapter : displaySection }}
      </span>
    </Transition>
    <img
      v-if="logoState.mode !== 'hidden'"
      :src="logoState.src"
      :alt="logoAlt"
      class="global-top-logo"
    />
  </div>
</template>

<script setup lang="ts">
import { configs, useNav } from "@slidev/client";
import { computed } from "vue";

import logoUrl from "../assets/logo.png";
import { getSavedLogo, lessonParams } from "../utils/lesson-params";

const {
  chapter = "",
  section = "",
  logoAlt = "东北育才学校",
} = defineProps<{
  /** 封面（第 1 页）显示的章节名，如「第十章 静电场」；不传则取 headmatter 的 `chapter` */
  chapter?: string;
  /** 内页显示的课题名，如「电容器的电容」；不传则取 headmatter 的 `title` */
  section?: string;
  /** 顶栏 logo 的 alt 文本 */
  logoAlt?: string;
}>();

const nav = useNav();
const isCover = computed(() => nav.currentPage.value === 1);

/**
 * Headmatter（`slides.md` 第一页的 frontmatter）里的 `title` 与自定义字段 `chapter`。
 *
 * 顶栏挂在 `global-top` 全局层（每个单页 `SlideContext` 的外层），**不能**用 `useSlideContext()` 取
 * `$slidev.configs`；`@slidev/client` 的 `configs` 就是同一份全局配置，在任何层都能直接读。
 */
const slidevConfigs = configs as typeof configs & { chapter?: string };

/** 章节名 / 课题名：显式 prop 优先，缺省回到 headmatter（存量课件传了 prop 时行为完全不变） */
const displayChapter = computed(() => chapter || slidevConfigs.chapter || "");
const displaySection = computed(() => section || slidevConfigs.title || "");

interface LogoState {
  /** Default = 东北育才；custom = 本机保存过的自定义图（dataURL）；hidden = 不显示 */
  mode: "default" | "custom" | "hidden";
  src: string;
}

/**
 * 校徽三态（由「我要上课」生成的 ?logo 参数驱动，见 utils/lesson-params.ts）：
 *
 * - 无参数 → 东北育才
 * - Logo=hide → 隐藏
 * - Logo=<key> → 本机按 <key> 保存过 → 自定义图；本机没有 → 隐藏
 */
const logoState = computed<LogoState>(() => {
  const { logo } = lessonParams;

  if (!logo) return { mode: "default", src: logoUrl };
  if (logo === "hide") return { mode: "hidden", src: "" };

  const saved = getSavedLogo(logo);

  return saved ? { mode: "custom", src: saved } : { mode: "hidden", src: "" };
});
</script>

<style scoped>
.global-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 2.5rem;

  pointer-events: none;
}

.global-top-title {
  color: rgb(241 245 249 / 45%);

  font-weight: 600;
  font-size: 0.65rem;
  line-height: 1;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.global-top-logo {
  width: auto;
  height: 1.4rem;
  opacity: 0.7;
}

/* 文字切换动画 */
.top-text-enter-active,
.top-text-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.top-text-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.95);
}

.top-text-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(1.05);
}
</style>
