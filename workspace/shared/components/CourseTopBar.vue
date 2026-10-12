<template>
  <div class="global-top">
    <Transition name="top-text" mode="out-in">
      <span class="global-top-title" :key="isCover ? 'chapter' : 'section'">
        {{ isCover ? chapter : section }}
      </span>
    </Transition>
    <img v-if="logoState.mode !== 'hidden'" :src="logoState.src" :alt="logoAlt" class="global-top-logo" />
  </div>
</template>

<script setup lang="ts">
import { useNav } from "@slidev/client";
import { computed } from "vue";

import logoUrl from "../assets/logo.png";
import { getSavedLogo, lessonParams } from "../utils/lesson-params";

const {
  chapter,
  section,
  logoAlt = "东北育才学校",
} = defineProps<{
  /** 封面（第 1 页）显示的章节名，如「第十章 静电场」 */
  chapter: string;
  /** 内页显示的课题名，如「电容器的电容」 */
  section: string;
  /** 顶栏 logo 的 alt 文本 */
  logoAlt?: string;
}>();

const nav = useNav();
const isCover = computed(() => nav.currentPage.value === 1);

interface LogoState {
  /** default = 默认校徽；custom = 本机保存过的自定义图（dataURL）；hidden = 不显示 */
  mode: "default" | "custom" | "hidden";
  src: string;
}

/**
 * 校徽三态（由「我要上课」生成的 ?logo 参数驱动，见 utils/lesson-params.ts）：
 * - 无参数      → 默认校徽
 * - logo=hide  → 隐藏
 * - logo=<key> → 本机按 <key> 保存过 → 自定义图；本机没有 → 隐藏
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
