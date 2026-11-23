<!--
  第 14 页：可见光在电磁波谱中只占极窄的一段。
  上条是整条电磁波谱（对数频率示意，不标刻度），可见光只是一条细缝；
  下条把这一段放大，并标出 400~760 nm 与七种颜色。
-->
<template>
  <div class="em-narrow">
    <div class="em-narrow-head">
      <span>无线电波</span>
      <span class="em-narrow-head-mid">整个电磁波谱</span>
      <span><Latex tex="\gamma" /> 射线</span>
    </div>
    <div class="em-narrow-track-wrap">
      <div class="em-narrow-track">
        <div class="em-narrow-sliver"></div>
      </div>
      <div class="em-narrow-callout">
        <div class="em-narrow-callout-line"></div>
        <div class="em-narrow-callout-tag">可见光</div>
      </div>
    </div>
    <div class="em-narrow-zoom">
      <div class="em-narrow-zoom-head">可见光放大</div>
      <div class="em-narrow-zoom-track">
        <div v-for="c in colors" :key="c.name" class="em-narrow-color" :class="{ 'is-dark': c.dark }" :style="{ background: c.color, flex: c.span }">
          {{ c.name }}
        </div>
      </div>
      <div class="em-narrow-zoom-scale">
        <span><Latex tex="760\ \text{nm}" /></span>
        <span><Latex tex="400\ \text{nm}" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colors = [
  { name: "红", color: "firebrick", span: 130 },
  { name: "橙", color: "darkorange", span: 30 },
  { name: "黄", color: "gold", dark: true, span: 30 },
  { name: "绿", color: "yellowgreen", dark: true, span: 70 },
  { name: "青", color: "turquoise", dark: true, span: 50 },
  { name: "蓝", color: "royalblue", span: 20 },
  { name: "紫", color: "mediumorchid", span: 30 },
];
</script>

<style scoped>
.em-narrow {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  width: 100%;
  min-width: 0;
}

.em-narrow-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--c-text-dim);
  font-size: 0.85rem;
}

.em-narrow-head-mid {
  color: var(--c-text-mute);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}

.em-narrow-track-wrap {
  position: relative;
}

.em-narrow-track {
  position: relative;

  overflow: hidden;

  height: 4rem;

  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);

  background: linear-gradient(
    90deg,
    var(--c-accent-2),
    var(--c-sky),
    var(--c-accent),
    var(--c-danger),
    mediumorchid,
    violet
  );
}

.em-narrow-sliver {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 66.3%;

  width: 1.75%;

  border-right: 2px solid var(--c-accent);
  border-left: 2px solid var(--c-accent);

  background: var(--c-accent-light);
  box-shadow: 0 0 14px var(--c-accent-glow);
}

.em-narrow-callout {
  position: absolute;
  top: 4.1rem;
  left: 67.2%;

  display: flex;
  flex-direction: column;
  align-items: center;

  transform: translateX(-50%);
}

.em-narrow-callout-line {
  width: 1px;
  height: 0.7rem;
  background: var(--c-accent);
}

.em-narrow-callout-tag {
  padding: 0.08rem 0.55rem;

  border: 1px solid var(--c-accent);
  border-radius: 999px;

  color: var(--c-accent);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.em-narrow-zoom {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  margin-top: 2rem;
}

.em-narrow-zoom-head {
  color: var(--c-text-mute);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}

.em-narrow-zoom-track {
  display: flex;

  overflow: hidden;

  height: 3.6rem;

  border-radius: var(--radius-md);
}

.em-narrow-color {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  min-width: 0;

  color: var(--c-text);
  font-size: 0.82rem;
  font-weight: 600;
}

.em-narrow-color.is-dark {
  color: var(--c-bg);
}

.em-narrow-zoom-scale {
  display: flex;
  justify-content: space-between;

  color: var(--c-text-mute);
  font-size: 0.78rem;
}
</style>
