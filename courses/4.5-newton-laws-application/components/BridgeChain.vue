<script setup lang="ts">
const { step = 0 } = defineProps<{ step?: number }>();
</script>

<template>
  <!-- 第 3 页核心页：受力与运动由加速度这座桥连通。
       两行是同一条链、箭头都朝右，只是「已知的一端」不同：
       已知力求运动 = 从左端出发，已知运动求力 = 从右端出发。
       两行共用一个 CSS 栅格，列宽由两行内容取最大，保证上下严格对齐。 -->
  <div class="bridge">
    <span class="bridge-tag" :class="{ 'bridge-hidden': step < 1 }">已知力求运动</span>
    <span class="bridge-node" :class="{ 'bridge-hidden': step < 1 }">受力情况</span>
    <span class="bridge-link" :class="{ 'bridge-hidden': step < 1 }">
      <span><Latex tex="F = ma" /></span>
      <mdi-arrow-right />
    </span>
    <span class="bridge-node bridge-node-a" :class="{ 'bridge-hidden': step < 1 }"
      ><Latex tex="a"
    /></span>
    <span class="bridge-link" :class="{ 'bridge-hidden': step < 1 }">
      <span>运动学公式</span>
      <mdi-arrow-right />
    </span>
    <span class="bridge-node" :class="{ 'bridge-hidden': step < 1 }">运动情况</span>

    <span class="bridge-tag" :class="{ 'bridge-hidden': step < 2 }">已知运动求力</span>
    <span class="bridge-node" :class="{ 'bridge-hidden': step < 2 }">运动情况</span>
    <span class="bridge-link" :class="{ 'bridge-hidden': step < 2 }">
      <span>运动学公式</span>
      <mdi-arrow-right />
    </span>
    <span class="bridge-node bridge-node-a" :class="{ 'bridge-hidden': step < 2 }"
      ><Latex tex="a"
    /></span>
    <span class="bridge-link" :class="{ 'bridge-hidden': step < 2 }">
      <span><Latex tex="F = ma" /></span>
      <mdi-arrow-right />
    </span>
    <span class="bridge-node" :class="{ 'bridge-hidden': step < 2 }">受力情况</span>
  </div>
</template>
