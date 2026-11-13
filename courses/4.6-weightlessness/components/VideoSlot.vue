<script setup lang="ts">
import demoVideo from "../videos/demo.mp4?url";

/**
 * 第 3 页：电梯实测视频位
 *
 * 本课拍好的视频放在 `courses/4.6-weightlessness/videos/demo.mp4`，这里用 `?url` 引入 —— 构建时会随产物一起输出、路径自动带上
 * `--base`，不用手动拼目录。 传 `src` 可以换成别的视频；不传时用本课的 demo。
 */
const { src = demoVideo, title = "电梯里的示数变化" } = defineProps<{
  /** 视频地址；缺省用本课的 demo.mp4 */
  src?: string;
  /** 占位框（没有视频时）里的标题 */
  title?: string;
}>();
</script>

<template>
  <div class="video-slot">
    <video v-if="src" :src="`${src}#t=0.1`" controls playsinline preload="metadata" />
    <div v-else class="video-slot-empty">
      <mdi-play-circle-outline class="video-slot-icon" />
      <span class="video-slot-title">{{ title }}</span>
    </div>
  </div>
</template>

<style scoped>
.video-slot {
  overflow: hidden;

  /* 实拍视频是 768×576（4:3），槽位按 4:3 给，高度受页面可用高度约束 */
  width: auto;
  max-width: 100%;
  height: 424px;
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);

  background: color-mix(in srgb, var(--c-surface-solid) 55%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--c-neutral-500) 12%, transparent);
}

.video-slot video {
  display: block;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.video-slot-empty {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

.video-slot-icon {
  width: 3.4rem;
  height: 3.4rem;
  color: var(--c-accent);
  opacity: 0.85;
}

.video-slot-title {
  color: var(--c-neutral-300);
  font-size: 1rem;
  letter-spacing: 0.08em;
}
</style>
