<script setup lang="ts">
/**
 * 第 17 页：同一个斜拉单摆，改用"垂直于悬线方向"的正交分解（静态，不可拖）。
 *
 * 左侧：小球、悬线，以及 G 与 F 在"垂直于悬线"方向上的分量（两者等大反向 ⇒ 这个方向上合力为零）。 右侧：同一组力的闭合三角形（G、T、F）。
 *
 * 物理：沿垂直悬线方向，拉力没有分量 ⇒ F sinφ = G sinθ（φ 为 F 与悬线的夹角）。
 */
const THETA = 30;
const PHI = 60; // 演示用的一个非最小方向

const rad = (deg: number): number => (deg * Math.PI) / 180;

const VIEW = { x: 40, y: 46, width: 512, height: 190 };
const PIVOT = { x: 300, y: 64 };
const ROPE_LEN = 110;
const BALL_R = 18;
const G_PX = 62;
const ARC_R = 46;

const TRI = { width: 300, height: 200 };
const TRI_A = { x: 140, y: 24 };
const TRI_G = 150;

const sinTh = Math.sin(rad(THETA));
const cosTh = Math.cos(rad(THETA));

/** 悬线方向（由球指向悬点）与"垂直悬线、指向右上方"的方向 */
const ropeDir = { x: -sinTh, y: -cosTh };
const perpDir = { x: cosTh, y: -sinTh };

const ball = { x: PIVOT.x + ROPE_LEN * sinTh, y: PIVOT.y + ROPE_LEN * cosTh };

const sinPhi = Math.sin(rad(PHI));
const fRatio = sinTh / sinPhi;
const tRatio = Math.cos(rad(PHI)) / sinPhi;

/** 三个力的箭头长度（G 画成 G_PX 长） */
const gLen = G_PX;
const tLen = G_PX * tRatio;
const fLen = G_PX * fRatio;
/** 垂直悬线方向上的两个分量：等大反向（各 = G sinθ） */
const perpLen = G_PX * sinTh;

const tip = (dir: { x: number; y: number }, len: number): { x: number; y: number } => ({
  x: ball.x + dir.x * len,
  y: ball.y + dir.y * len,
});

const forceDir = { x: Math.cos(rad(PHI)), y: Math.sin(rad(PHI)) };

const gTip = tip({ x: 0, y: 1 }, gLen);
const tTip = tip(ropeDir, tLen);
const fTip = tip(forceDir, fLen);
const fPerpTip = tip(perpDir, perpLen);
const gPerpTip = tip({ x: -perpDir.x, y: -perpDir.y }, perpLen);
const lineA = tip({ x: -perpDir.x, y: -perpDir.y }, 62);
const lineB = tip(perpDir, 62);

/** 悬线方向与垂直方向之间的直角标记（说明这条虚线垂直于悬线） */
const rightAngle = `M ${ball.x + ropeDir.x * 13} ${ball.y + ropeDir.y * 13} L ${ball.x + ropeDir.x * 13 + perpDir.x * 13} ${ball.y + ropeDir.y * 13 + perpDir.y * 13} L ${ball.x + perpDir.x * 13} ${ball.y + perpDir.y * 13}`;

/** θ 圆弧（悬点处，从竖直虚线转到悬线） */
const thetaArc = `M ${PIVOT.x} ${PIVOT.y + ARC_R} A ${ARC_R} ${ARC_R} 0 0 1 ${PIVOT.x + ARC_R * sinTh} ${PIVOT.y + ARC_R * cosTh}`;

/** 闭合矢量三角形：G（A→B）、T（B→C）、F（C→A） */
const vertexB = { x: TRI_A.x, y: TRI_A.y + TRI_G };
const vertexC = {
  x: vertexB.x + TRI_G * tRatio * ropeDir.x,
  y: vertexB.y + TRI_G * tRatio * ropeDir.y,
};
</script>

<template>
  <div class="mfd-wrap">
    <div class="mfd-fig">
      <svg
        :viewBox="`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SurfaceHatch
          :from="{ x: 60, y: 64 }"
          :to="{ x: 540, y: 64 }"
          side="above"
          color="#94a3b8"
          :line-width="3"
          :thickness="12"
          :gap="30"
        />
        <line
          :x1="PIVOT.x"
          :y1="PIVOT.y"
          :x2="ball.x"
          :y2="ball.y"
          stroke="#94a3b8"
          stroke-width="2.4"
        />
        <line
          :x1="PIVOT.x"
          :y1="PIVOT.y"
          :x2="PIVOT.x"
          :y2="PIVOT.y + ARC_R + 8"
          stroke="#64748b"
          stroke-width="1.3"
          stroke-dasharray="5 4"
          opacity="0.85"
        />
        <path :d="thetaArc" fill="none" stroke="#94a3b8" stroke-width="1.6" />
        <text
          :x="PIVOT.x + 10"
          :y="PIVOT.y + 30"
          fill="#94a3b8"
          font-family="KaTeX_Math"
          font-style="italic"
          font-size="19"
        >
          θ
        </text>
        <circle :cx="PIVOT.x" :cy="PIVOT.y" r="4" fill="#94a3b8" />
        <!-- 垂直于悬线的虚线 -->
        <line
          :x1="lineA.x"
          :y1="lineA.y"
          :x2="lineB.x"
          :y2="lineB.y"
          stroke="#cbd5e1"
          stroke-width="1.5"
          stroke-dasharray="6 5"
          opacity="0.8"
        />
        <path :d="rightAngle" fill="none" stroke="#cbd5e1" stroke-width="1.2" />
        <circle
          :cx="ball.x"
          :cy="ball.y"
          :r="BALL_R"
          fill="rgba(96,165,250,0.22)"
          stroke="#60a5fa"
          stroke-width="2.4"
        />
        <!-- 拉力（沿悬线） -->
        <g v-click="1">
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="tTip"
            :head-size="12"
            stroke="#2dd4bf"
            stroke-width="3.4"
          />
          <text
            :x="tTip.x - 30"
            :y="tTip.y - 12"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
          >
            F
          </text>
          <text
            :x="tTip.x - 17"
            :y="tTip.y - 7"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="13"
          >
            T
          </text>
          <!-- 重力 -->
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="gTip"
            :head-size="12"
            stroke="#f87171"
            stroke-width="3.6"
          />
          <text
            :x="gTip.x + 9"
            :y="gTip.y - 5"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="20"
          >
            G
          </text>
          <!-- 外力 -->
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="fTip"
            :head-size="12"
            stroke="#e2a846"
            stroke-width="3.6"
          />
          <text
            :x="fTip.x + 8"
            :y="fTip.y + 6"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="20"
          >
            F
          </text>
          <!-- 垂直悬线方向上的两个分量：G⊥ 与 F⊥（等大反向） -->
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="gPerpTip"
            :head-size="9"
            stroke="#f87171"
            stroke-width="2.4"
            stroke-dasharray="6 4"
          />
          <text
            :x="gPerpTip.x - 34"
            :y="gPerpTip.y + 18"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="16"
          >
            G
          </text>
          <text
            :x="gPerpTip.x - 23"
            :y="gPerpTip.y + 22"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="11"
          >
            ⊥
          </text>
          <CourseArrow
            :from="{ x: ball.x, y: ball.y }"
            :to="fPerpTip"
            :head-size="9"
            stroke="#e2a846"
            stroke-width="2.4"
            stroke-dasharray="6 4"
          />
          <text
            :x="fPerpTip.x + 6"
            :y="fPerpTip.y - 4"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="16"
          >
            F
          </text>
          <text
            :x="fPerpTip.x + 17"
            :y="fPerpTip.y"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="11"
          >
            ⊥
          </text>
          <text
            :x="lineB.x - 8"
            :y="lineB.y - 12"
            fill="#94a3b8"
            font-family="KaTeX_Main"
            font-size="13"
          >
            垂直于悬线
          </text>
        </g>
      </svg>
    </div>

    <div class="mfd-tri">
      <svg :viewBox="`0 0 ${TRI.width} ${TRI.height}`" xmlns="http://www.w3.org/2000/svg">
        <g v-click="1">
          <CourseArrow
            :from="TRI_A"
            :to="vertexB"
            :head-size="12"
            stroke="#f87171"
            stroke-width="3.6"
          />
          <CourseArrow
            :from="vertexB"
            :to="vertexC"
            :head-size="12"
            stroke="#2dd4bf"
            stroke-width="3.4"
          />
          <CourseArrow
            :from="vertexC"
            :to="TRI_A"
            :head-size="12"
            stroke="#e2a846"
            stroke-width="3.6"
          />
          <text
            :x="TRI_A.x - 24"
            :y="(TRI_A.y + vertexB.y) / 2 + 6"
            fill="#f87171"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
          >
            G
          </text>
          <text
            :x="(vertexB.x + vertexC.x) / 2 - 8"
            :y="(vertexB.y + vertexC.y) / 2 + 8"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
          >
            F
          </text>
          <text
            :x="(vertexB.x + vertexC.x) / 2 + 5"
            :y="(vertexB.y + vertexC.y) / 2 + 13"
            fill="#2dd4bf"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="13"
          >
            T
          </text>
          <text
            :x="(TRI_A.x + vertexC.x) / 2 + 12"
            :y="(TRI_A.y + vertexC.y) / 2 - 6"
            fill="#e2a846"
            font-family="KaTeX_Math"
            font-style="italic"
            font-size="19"
          >
            F
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.mfd-wrap {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.2rem;
  align-items: center;
}

.mfd-fig,
.mfd-tri {
  min-width: 0;
}
</style>
