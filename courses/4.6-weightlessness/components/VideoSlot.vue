<script setup lang="ts">
/**
 * 第 4 页：电梯实测视频位
 *
 * 老师拍好视频后传入 src（如 `images/elevator.mp4`）即可播放；不传 src 时显示占位框， 版面与真实视频完全一致，课件可以先定稿、视频后补。
 */
const { src = "", title = "电梯里的示数变化" } = defineProps<{
  /** 视频地址；留空则显示占位框 */
  src?: string;
  /** 占位框里的视频标题 */
  title?: string;
}>();
</script>

<template>
  <div class="video-slot">
    <video v-if="src" :src="src" controls playsinline />
    <div v-else class="video-slot-empty">
      <mdi-play-circle-outline class="video-slot-icon" />
      <span class="video-slot-title">{{ title }}</span>
    </div>
  </div>
</template>

<style scoped>
.video-slot {
  overflow: hidden;

  width: 100%;
  max-width: 740px;
  aspect-ratio: 16 / 9;
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
