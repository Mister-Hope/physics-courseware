<script setup lang="ts">
// 封面右下角装饰：借共享坐标轴组件画一张轻量的 a–F 拟合图（自带箭头、F/a 轴标签，不带刻度数字）
</script>

<template>
  <div class="cover-plot">
    <CoordAxes
      :x-range="[-0.5, 6.6]"
      :y-range="[-0.5, 5.4]"
      :x-axis="{ quantity: 'F' }"
      :y-axis="{ quantity: 'a' }"
      :ticks="{ x: [1, 2, 3, 4, 5], y: [1, 2, 3, 4], labels: false, origin: false }"
      :curves="[
        {
          points: [
            { x: 0, y: 0 },
            { x: 5.6, y: 4.9 },
          ],
          stroke: 'var(--c-accent)',
          width: 2.6,
        },
      ]"
      :labels="[
        { x: 1, y: 0.82, dot: 4.5, dotColor: 'var(--c-accent-2)' },
        { x: 2, y: 1.8, dot: 4.5, dotColor: 'var(--c-accent-2)' },
        { x: 3, y: 2.56, dot: 4.5, dotColor: 'var(--c-accent-2)' },
        { x: 4, y: 3.56, dot: 4.5, dotColor: 'var(--c-accent-2)' },
      ]"
      :view="{ width: 260, height: 190 }"
      :font-scale="0.95"
    />
  </div>
</template>

<style scoped>
.cover-plot {
  width: 300px;
  /* CoordAxes 的 svg 是 overflow: visible，横轴量标签会画到 viewBox 下沿之外；
     封面装饰盒贴右下角（m-8），标签因此压到画布底边只剩 12px。
     整体上抬 20px，把装饰的最下沿重新拉回余量 ≥20px（浮动动画只向上 -8px，不影响最坏值）。 */
  position: relative;
  top: -20px;
}
</style>
