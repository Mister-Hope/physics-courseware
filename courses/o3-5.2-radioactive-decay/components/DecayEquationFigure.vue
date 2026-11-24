<!-- 第 3、4 页：衰变示意，母核放出 α 或 β 粒子后变成新核 -->
<script setup lang="ts">
import { computed } from "vue";

interface Props {
  mode?: "alpha" | "beta";
  showResult?: boolean;
}

const { mode = "alpha", showResult = false } = defineProps<Props>();

const parentTex = computed((): string =>
  mode === "alpha" ? String.raw`{}_{92}^{238}\text{U}` : String.raw`{}_{90}^{234}\text{Th}`,
);

const daughterTex = computed((): string =>
  mode === "alpha" ? String.raw`{}_{90}^{234}\text{Th}` : String.raw`{}_{91}^{234}\text{Pa}`,
);

const particleTex = computed((): string =>
  mode === "alpha" ? String.raw`{}_{2}^{4}\text{He}` : String.raw`{}_{-1}^{\phantom{-}0}\text{e}`,
);

const particleName = computed((): string =>
  mode === "alpha" ? String.raw`\alpha` : String.raw`\beta`,
);
</script>

<template>
  <div class="decay-figure">
    <div class="decay-cell">
      <div class="decay-ball decay-ball--parent"><Latex class="text-lg" :tex="parentTex" /></div>
      <div class="mini-note">母核</div>
    </div>
    <div class="decay-arrow"><mdi-arrow-right class="icon-md" /></div>
    <div class="decay-cell" :class="{ 'vp-hidden': !showResult }">
      <div class="decay-ball decay-ball--daughter">
        <Latex class="text-lg" :tex="daughterTex" />
      </div>
      <div class="mini-note">新核</div>
    </div>
    <div class="decay-plus" :class="{ 'vp-hidden': !showResult }"><Latex tex="+" /></div>
    <div class="decay-cell" :class="{ 'vp-hidden': !showResult }">
      <div class="decay-ball decay-ball--particle">
        <Latex class="text-lg" :tex="particleTex" />
      </div>
      <div class="mini-note"><Latex :tex="particleName" /> 粒子</div>
    </div>
  </div>
</template>
