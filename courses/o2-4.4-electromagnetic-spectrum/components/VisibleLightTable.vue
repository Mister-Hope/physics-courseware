<!--
  第 7 页：可见光各色光的波长与频率表。
  照录教材表 2，颜色圆点只作视觉提示，数值与教材一致。
-->
<script setup lang="ts">
interface LightColor {
  name: string;
  css: string;
  wavelength: string;
  frequency: string;
}

const colors: LightColor[] = [
  { name: "红", css: "red", wavelength: "760 \\sim 630", frequency: "3.9 \\sim 4.8" },
  { name: "橙", css: "orange", wavelength: "630 \\sim 600", frequency: "4.8 \\sim 5.0" },
  { name: "黄", css: "gold", wavelength: "600 \\sim 570", frequency: "5.0 \\sim 5.3" },
  { name: "绿", css: "limegreen", wavelength: "570 \\sim 500", frequency: "5.3 \\sim 6.0" },
  { name: "青", css: "cyan", wavelength: "500 \\sim 450", frequency: "6.0 \\sim 6.7" },
  { name: "蓝", css: "blue", wavelength: "450 \\sim 430", frequency: "6.7 \\sim 7.0" },
  { name: "紫", css: "violet", wavelength: "430 \\sim 400", frequency: "7.0 \\sim 7.5" },
];
</script>

<template>
  <div class="em-light-table">
    <table>
      <thead>
        <tr>
          <th>颜色</th>
          <th>波长 / <Latex tex="\text{nm}" /></th>
          <th>频率 / <Latex tex="10^{14}\ \text{Hz}" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="color in colors" :key="color.name">
          <td><span class="em-dot" :style="{ background: color.css }"></span>{{ color.name }}</td>
          <td><Latex :tex="color.wavelength" /></td>
          <td><Latex :tex="color.frequency" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.em-light-table {
  width: min(100%, 640px);
  min-width: 0;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.76rem;
}

th,
td {
  padding: 0.18rem 0.5rem;
  text-align: center;
  white-space: nowrap;
}

th {
  border-bottom: 1px solid var(--c-border);

  color: var(--c-text-dim);
  font-weight: 600;

  background: color-mix(in srgb, var(--c-surface) 68%, transparent);
}

td {
  border-bottom: 1px solid color-mix(in srgb, var(--c-border) 55%, transparent);
}

tbody tr:last-child td {
  border-bottom: 0;
}

td:first-child {
  color: var(--c-text);
  font-weight: 600;
}

.em-dot {
  display: inline-block;

  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.4rem;
  border-radius: 50%;

  vertical-align: 0.02em;
}

:deep(.katex) {
  font-size: 1em;
}
</style>
