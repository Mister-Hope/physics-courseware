<script setup lang="ts">
// 极性图例：正电（红）/ 负电（蓝）。
// 第 5、14、20 页的电路类组件原本各写了一份（尺寸、间距、透明度略有出入），这里统一成一份。
// 水桶类比页没有电荷语义，不使用本组件。
</script>

<template>
  <div class="polarity-legend">
    <span class="polarity-legend-item">
      <span class="polarity-legend-swatch" style="background: var(--c-danger)"></span>
      正电（红）
    </span>
    <span class="polarity-legend-item">
      <span class="polarity-legend-swatch" style="background: var(--c-velocity)"></span>
      负电（蓝）
    </span>
  </div>
</template>

<style scoped>
.polarity-legend {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.polarity-legend-item {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;

  font-weight: 500;
  font-size: 0.875rem;

  opacity: 0.8;
}

.polarity-legend-swatch {
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 0.125rem;
}
</style>
