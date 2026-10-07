<script setup lang="ts">
/**
 * 教材习题 1 表格（5.4 抛体运动的规律）：落地量由哪些量决定、与质量是否有关。 第一列（物理量）常显；第二、三列按 `step` 分步揭示 —— `step ≥ 行号`
 * 时那一行的结论才出现。 用 `visibility: hidden` 占位而不是 `v-if`：点击时只多出新行，已显示的行不会被顶跑。
 */
const { step = 0 } = defineProps<{
  /** 已完成的点击步数：页面里传 `:step="$clicks"` */
  step?: number;
}>();
</script>

<template>
  <div class="drop-factors">
    <table class="drop-table">
      <thead>
        <tr>
          <th>物理量</th>
          <th>由哪些量决定</th>
          <th>与质量 <Latex tex="m" /> 有关吗</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>物体在空中运动的时间</td>
          <td :class="{ 'vp-hidden': step < 1 }">
            只由 <Latex tex="h" /> 决定：<Latex tex="t = \sqrt{\frac{2h}{g}}" />
          </td>
          <td :class="{ 'vp-hidden': step < 1 }">无关</td>
        </tr>
        <tr>
          <td>水平位移</td>
          <td :class="{ 'vp-hidden': step < 2 }">
            由 <Latex tex="v_0" /> 与 <Latex tex="h" /> 决定：<Latex
              tex="x = v_0\sqrt{\frac{2h}{g}}"
            />
          </td>
          <td :class="{ 'vp-hidden': step < 2 }">无关</td>
        </tr>
        <tr>
          <td>落地时瞬时速度的大小</td>
          <td :class="{ 'vp-hidden': step < 3 }">
            由 <Latex tex="v_0" /> 与 <Latex tex="h" /> 决定：<Latex tex="v = \sqrt{v_0^2 + 2gh}" />
          </td>
          <td :class="{ 'vp-hidden': step < 3 }">无关</td>
        </tr>
        <tr>
          <td>落地时瞬时速度的方向</td>
          <td :class="{ 'vp-hidden': step < 4 }">
            由 <Latex tex="v_0" /> 与 <Latex tex="h" /> 决定：<Latex
              tex="\tan\theta = \frac{\sqrt{2gh}}{v_0}"
            />
          </td>
          <td :class="{ 'vp-hidden': step < 4 }">无关</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.drop-factors {
  overflow: hidden;

  min-width: 0;
  border: 1px solid var(--c-border);
  border-radius: 1.25rem;

  background: var(--c-surface);

  backdrop-filter: blur(16px);
}

.drop-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  line-height: 1.7;
}

.drop-table th,
.drop-table td {
  vertical-align: middle;
  padding: 0.6rem 1rem;
  text-align: left;
}

.drop-table thead th {
  background: rgb(148 163 184 / 8%);
  color: var(--c-text-dim);
  font-weight: 600;
  font-size: 0.9rem;
}

.drop-table tbody tr + tr {
  border-top: 1px solid var(--c-border);
}

.drop-table tbody td:first-child {
  font-weight: 600;
  white-space: nowrap;
}

.drop-table tbody td:last-child {
  color: var(--c-accent);
  text-align: center;
  white-space: nowrap;
}

/* 分步内容始终占位，只把"还没轮到"的藏起来：点击时只出现新元素，已有元素绝不位移 */
.vp-hidden {
  visibility: hidden;
}
</style>
