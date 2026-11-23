<script setup lang="ts">
// 第 2 页：自动控制装置的三个环节（传感器 → 控制电路 → 执行装置）
// 用 step 控制"名称 / 例子"逐层出现；每个节点高度固定，出现时不会顶跑相邻元素
defineProps<{
  /** 0 = 只有三个空槽；1 = 出现名称；2 = 出现例子 */
  step: number;
}>();
</script>

<template>
  <div class="chain">
    <div class="card chain-node" :class="{ 'is-filled': step >= 1, 'is-exampled': step >= 2 }">
      <div class="chain-no">①</div>
      <div class="chain-body">
        <div class="chain-q">？</div>
        <div class="chain-name">传感器</div>
      </div>
      <div class="chain-sub">感受被测量，把它变成电学量</div>
      <div class="chain-ex"><mdi-radar /> 门的位置 → 干簧管</div>
    </div>
    <div class="chain-arrow"><mdi-arrow-right-thin class="icon-lg" /></div>
    <div class="card chain-node" :class="{ 'is-filled': step >= 1, 'is-exampled': step >= 2 }">
      <div class="chain-no">②</div>
      <div class="chain-body">
        <div class="chain-q">？</div>
        <div class="chain-name">控制电路</div>
      </div>
      <div class="chain-sub">放大、比较、转换，决定什么时候动作</div>
      <div class="chain-ex"><mdi-chip /> 通断 → 继电器线圈</div>
    </div>
    <div class="chain-arrow"><mdi-arrow-right-thin class="icon-lg" /></div>
    <div class="card chain-node" :class="{ 'is-filled': step >= 1, 'is-exampled': step >= 2 }">
      <div class="chain-no">③</div>
      <div class="chain-body">
        <div class="chain-q">？</div>
        <div class="chain-name">执行装置</div>
      </div>
      <div class="chain-sub">接通或断开负载，完成动作</div>
      <div class="chain-ex"><mdi-bell-ring-outline /> 触点 → 蜂鸣器、灯</div>
    </div>
  </div>
</template>
