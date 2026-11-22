/* oxlint-disable max-lines -- 3D 引课与 P3 连续供电链场景：C0-C6 六步引课 + P3 四步一镜到底供电链（手表->白线->Type-C->苹果风白色适配器->墙面插座） */
/**
 * 第 2 页（P2，6 击）与第 3 页（P3，4 击）共用的 Three.js 实时 3D 场景引擎（09-第3轮修改方案版）
 *
 * 严格遵循 `09-第3轮修改方案-P2-P3与模型.md`：
 *
 * 1. 全局背景透明（`alpha: true`, `scene.background = null`），无深蓝底、无卡片边框，3D 画布无缝嵌入 PPT 并占满 16:9
 *    整页，主体自动避让左上标题与右上校徽。
 * 2. 充电音效保留、默认开，无开关 UI；每次进入或重播 P2 C1 接触瞬间自动播放一次本地 Web Audio 合成音效。
 * 3. P2（mode = "intro"，6 击 C0–C6）：
 *
 *    - C0：只展示手表（正面朝相机，表盘在画面中心，屏幕暗；无充电器、无充电 UI、无声音）。
 *    - C1：镜头先从正面平滑移到侧前 45°；充电器从后方飞入画面，白线向表的左边引出，磁吸接触、微回弹（无磁吸箭头，只用极淡对准微光环）→ 屏幕亮、绿色闪电、12 点顺时针充电环到 65% →
 *      播放充电音效。
 *    - C2：镜头仍在侧前，充电 UI 保留；弹出问题“电能是如何传输的？”。
 *    - C3：镜头先平滑绕到右后方 38°，再开始后盖与充电头半透明动画（先绕镜头、后做透明）；屏幕保持不透明，露出黄铜色受电线圈（后方为深色柔性 PCB + 芯片 + 金色排线）与充电头内的送电线圈。
 *    - C4：线圈变半透明，**只显示送电线圈**内部的蓝色电子沿螺旋连续运动（1 圈约 1.6 秒，速度柔和清晰）；无灯笼磁场、无受电线圈电流。
 *    - C5：出现 3 水平环 + 8 竖环的 3D 灯笼磁场；送电线圈蓝色电子继续流动；受电线圈仍无电流。
 *    - C6：受电线圈出现感应蓝色电子连续运动；灯笼磁场与送电线圈电流继续。
 * 4. P3（mode = "chain"，4 击 C0–C4 一条连续 3D 镜头，不是四格示意图）：
 *
 *    - C0：承接磁吸充电中的手表与充电器近景。
 *    - C1：镜头从手表/充电器平滑拉远并左移，露出充电盘向左延伸的完整白色线缆，末端是精致的 **USB Type-C 插头**（悬在白色电源适配器接口前方）。
 *    - C2：Type-C 插头平滑插入**苹果风格白色圆角电源适配器**，适配器插在左侧**墙面五孔插座**上；镜头停在“插座—白色适配器—Type-C—白线—充电器—手表”的完整 3D 全景链路。
 *    - C3：完整链路视角下，适配器与充电盘处微亮提示，配合 HUD 标注 220 V 交流 -> 5 V 直流 -> 高频交变电流。
 *    - C4：镜头平滑拉回手表与充电器特写，引出“220 V 能直接给手表充吗？变压器在哪？”进入 P4。
 */
import type { BufferGeometry, Material } from "three";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BoxGeometry,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PMREMGenerator,
  Quaternion,
  RingGeometry,
  Scene,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { createWatchAssembly } from "./watchAssembly";
import type { WatchModelApi } from "./watchAssembly";

const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;
const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const createRoundedRectShape = (w: number, h: number, r: number): Shape => {
  const shape = new Shape();
  const hw = w / 2;
  const hh = h / 2;
  const cr = Math.min(r, hw * 0.95, hh * 0.95);
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.absarc(hw - cr, -hh + cr, cr, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hh - cr);
  shape.absarc(hw - cr, hh - cr, cr, 0, Math.PI / 2, false);
  shape.lineTo(-hw + cr, hh);
  shape.absarc(-hw + cr, hh - cr, cr, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hh + cr);
  shape.absarc(-hw + cr, -hh + cr, cr, Math.PI, Math.PI * 1.5, false);
  return shape;
};

// 本地离线 Web Audio 合成器（09 §1.1：充电音效保留、默认开、无开关 UI；每次触发或重播 C1 时播放）
interface WatchSoundEngine {
  playSnapAndChime: () => void;
  dispose: () => void;
}

const createWatchSoundEngine = (): WatchSoundEngine => {
  let ctx: AudioContext | null = null;
  return {
    // oxlint-disable-next-line max-statements -- 合成磁吸咔嗒、轻微碰撞与双音提示音
    playSnapAndChime() {
      try {
        const AudioCtx =
          (globalThis as unknown as { AudioContext?: typeof AudioContext }).AudioContext ??
          (globalThis as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        ctx ??= new AudioCtx();
        if (ctx.state === "suspended") void ctx.resume();

        const now = ctx.currentTime;
        // 1. 磁吸“咔嗒”清脆高频瞬态
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(1480, now);
        clickOsc.frequency.exponentialRampToValueAtTime(260, now + 0.038);
        clickGain.gain.setValueAtTime(0.28, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.042);
        clickOsc.connect(clickGain).connect(ctx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.045);

        // 2. 低频轻微物理吸附碰撞声
        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = "sine";
        thudOsc.frequency.setValueAtTime(165, now + 0.005);
        thudOsc.frequency.exponentialRampToValueAtTime(58, now + 0.075);
        thudGain.gain.setValueAtTime(0.24, now + 0.005);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        thudOsc.connect(thudGain).connect(ctx.destination);
        thudOsc.start(now + 0.005);
        thudOsc.stop(now + 0.085);

        // 3. 紧接着 140 ms 后的清脆双音充电提示音（G5 -> D6）
        const notes = [
          { freq: 783.99, delay: 0.14, dur: 0.28 },
          { freq: 1174.66, delay: 0.24, dur: 0.42 },
        ];
        for (const n of notes) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(n.freq, now + n.delay);
          gain.gain.setValueAtTime(0.001, now + n.delay);
          gain.gain.linearRampToValueAtTime(0.18, now + n.delay + 0.018);
          gain.gain.exponentialRampToValueAtTime(0.001, now + n.delay + n.dur);
          osc.connect(gain).connect(ctx.destination);
          osc.start(now + n.delay);
          osc.stop(now + n.delay + n.dur + 0.02);
        }
      } catch {
        // 忽略浏览器未交互前的音频上下文限制
      }
    },
    dispose() {
      if (ctx) {
        void ctx.close();
        ctx = null;
      }
    },
  };
};

export type WatchSceneMode = "intro" | "chain";

interface StepPose {
  watchX: number;
  watchZ: number;
  chargerZ: number;
  chargerVisible: boolean;
  backCoverOpacity: number;
  coilTranslucent: boolean;
  chargeProgress: number;
  txCurrentAlpha: number;
  fieldAlpha: number;
  rxCurrentAlpha: number;
  chainVisible: boolean;
  socketX: number;
  adapterX: number;
  adapterY: number;
  adapterRotX: number;
  adapterRotZ: number;
  typeCPlugOffsetX: number;
  typeCPlugRotX: number;
  camPos: Vector3;
  camLookAt: Vector3;
}

/** P2 引课 6 击（C0–C6，09 §2）： */
const INTRO_POSES: StepPose[] = [
  // C0 (step 0): 正面只展示手表，表盘在画面中心，屏幕暗；充电器远在手表正后方（沿表背法线 -Z 轴远端 z = -10.5，与手表完全平行）
  {
    watchX: 0,
    watchZ: 0,
    chargerZ: -10.5,
    chargerVisible: false,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(0, 0.45, 11.8),
    camLookAt: new Vector3(0, 0, 0),
  },
  // C1 (step 1): 镜头转到右前侧，充电器始终与表完全平行（无任何旋转、X=0），沿着表的正后方（-Z -> +Z）从屏幕右侧往左侧飞入并随透视自然放大，最终磁吸贴合表背！
  {
    watchX: 0,
    watchZ: 0.25,
    chargerZ: -0.29,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(5.6, 1.45, 9.2),
    camLookAt: new Vector3(-0.35, -0.05, -0.2),
  },
  // C2 (step 2): 镜头仍在侧前，充电 UI 保留，弹出问题“电能是如何传输的？”
  {
    watchX: 0,
    watchZ: 0.25,
    chargerZ: -0.29,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(5.8, 1.5, 9),
    camLookAt: new Vector3(-0.4, -0.05, -0.2),
  },
  // C3 (step 3): 先绕到右后方 38°，再半透明剖开后盖与充电头，露出黄铜色受电线圈（+深色 PCB/芯片/排线）与送电线圈（+从白线穿入的两根引出导线）
  {
    watchX: 0,
    watchZ: 0.78,
    chargerZ: -1.82,
    chargerVisible: true,
    backCoverOpacity: 0.14,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(7.5, 1.85, -7.2),
    camLookAt: new Vector3(-0.15, -0.05, -0.52),
  },
  // C4 (step 4): 只显示送电线圈及白线内两根引出导线里的蓝色电子连续正弦往返运动（电子在导线内推动进入线圈）；无灯笼磁场、无受电线圈电流
  {
    watchX: 0,
    watchZ: 0.82,
    chargerZ: -1.88,
    chargerVisible: true,
    backCoverOpacity: 0.14,
    coilTranslucent: true,
    chargeProgress: 0.65,
    txCurrentAlpha: 1,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(7.8, 1.95, -6.9),
    camLookAt: new Vector3(-0.18, -0.05, -0.55),
  },
  // C5 (step 5): 出现灯笼磁场；送电线圈电流继续；受电线圈仍无电流
  {
    watchX: 0,
    watchZ: 0.85,
    chargerZ: -1.94,
    chargerVisible: true,
    backCoverOpacity: 0.14,
    coilTranslucent: true,
    chargeProgress: 0.65,
    txCurrentAlpha: 1,
    fieldAlpha: 1,
    rxCurrentAlpha: 0,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(8.1, 2.1, -6.7),
    camLookAt: new Vector3(-0.2, -0.05, -0.55),
  },
  // C6 (step 6): 受电线圈出现感应蓝色电子正弦往返运动；灯笼磁场与送电线圈电流继续；上屏答案
  {
    watchX: 0,
    watchZ: 0.85,
    chargerZ: -1.94,
    chargerVisible: true,
    backCoverOpacity: 0.14,
    coilTranslucent: true,
    chargeProgress: 0.65,
    txCurrentAlpha: 1,
    fieldAlpha: 1,
    rxCurrentAlpha: 1,
    chainVisible: false,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -1.35,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: 0,
    camPos: new Vector3(8.1, 2.1, -6.7),
    camLookAt: new Vector3(-0.2, -0.05, -0.55),
  },
];

/**
 * P3 连续 3D 供电链镜头 7 击（C0–C7）：
 *
 * - C0 (step 0): 手表与磁吸充电器充电近景，长白线延伸出左侧画面外
 * - C1 (step 1): 镜头拉远并整体向左平移，顺着长白线自然露出原先在画外的 USB Type-C 插头
 * - C2 (step 2): 苹果充电器与 USB Type-C 插头在插座平面上同步旋转 90°（rotation.x = 0 ->
 *   π/2），使原本上下排列的两片扁插脚旋转为左右竖立平行，精准插进国标五孔插座上部“上两孔（地线两侧）”；Type-C 同步旋转 90° 插进适配器
 * - C3 (step 3): 先展示墙面插座“220 V 交流”
 * - C4 (step 4): 再点击显示问题“220 V 能直接给手表充电吗？”
 * - C5 (step 5): 再点击显示“白色电源适配器”标题，底下是一个问号“？”
 * - C6 (step 6): 再点击显示白色电源适配器底部的文字“220 V 交流 ⇒ 5 V 直流”
 * - C7 (step 7): 再点击拔出 USB，整个表连带着充电头、充电线向右飞出画面；插座自动脱离两个插头向左飞出画面；充电器旋转到屏幕中央正面显示（插头在下、USB
 *   在上），并自动浮现指针与《变压器》提示！
 */
const CHAIN_POSES: StepPose[] = [
  // C0 (step 0)
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -16.4,
    adapterY: -0.45,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 1.55,
    typeCPlugRotX: 0,
    camPos: new Vector3(4.8, 1.45, 9.2),
    camLookAt: new Vector3(0.4, -0.05, -0.25),
  },
  // C1 (step 1): 镜头左移拉远，顺着白线自然露出画面外的 USB Type-C 插头（此时插头尚未旋转，rotX = 0）
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -16.4,
    adapterY: -0.45,
    adapterRotX: 0,
    adapterRotZ: 0,
    typeCPlugOffsetX: 1.45,
    typeCPlugRotX: 0,
    camPos: new Vector3(-7.4, 1.55, 14.5),
    camLookAt: new Vector3(-8.2, -0.65, -0.55),
  },
  // C2 (step 2): 充电器与 USB Type-C 插头在插座平面上同步旋转 90° (rotX: 0 -> π/2)，插进墙面国标插座上部的两孔（地线两侧）！
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -0.18,
    adapterRotX: Math.PI / 2,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: Math.PI / 2,
    camPos: new Vector3(-9.8, 2.25, 23.6),
    camLookAt: new Vector3(-10.1, -0.65, -0.65),
  },
  // C3 (step 3): 先展示墙面插座“220 V 交流”
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -0.18,
    adapterRotX: Math.PI / 2,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: Math.PI / 2,
    camPos: new Vector3(-9.8, 2.25, 23.6),
    camLookAt: new Vector3(-10.1, -0.65, -0.65),
  },
  // C4 (step 4): 显示问题“220 V 能直接给手表充电吗？”
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -0.18,
    adapterRotX: Math.PI / 2,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: Math.PI / 2,
    camPos: new Vector3(-9.8, 2.25, 23.6),
    camLookAt: new Vector3(-10.1, -0.65, -0.65),
  },
  // C5 (step 5): 显示“白色电源适配器”标题 + 底下问号“？”
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -0.18,
    adapterRotX: Math.PI / 2,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: Math.PI / 2,
    camPos: new Vector3(-9.8, 2.25, 23.6),
    camLookAt: new Vector3(-10.1, -0.65, -0.65),
  },
  // C6 (step 6): 显示白色电源适配器底部的文字“220 V ⇒ 5 V”
  {
    watchX: 0,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -19.25,
    adapterX: -17.1,
    adapterY: -0.18,
    adapterRotX: Math.PI / 2,
    adapterRotZ: 0,
    typeCPlugOffsetX: 0,
    typeCPlugRotX: Math.PI / 2,
    camPos: new Vector3(-9.8, 2.25, 23.6),
    camLookAt: new Vector3(-10.1, -0.65, -0.65),
  },
  // C7 (step 7): 拔出 USB，手表连带充电头、充电线向右飞出画面 (watchX = +16)；插座脱离两个插头向左飞出画面 (socketX = -32)；充电器旋转到屏幕中央正面显示（插头在下、USB 在上：adapterRotZ = π/2, adapterRotX = 0.34）！
  {
    watchX: 16.5,
    watchZ: 0.35,
    chargerZ: -0.19,
    chargerVisible: true,
    backCoverOpacity: 1,
    coilTranslucent: false,
    chargeProgress: 0.65,
    txCurrentAlpha: 0,
    fieldAlpha: 0,
    rxCurrentAlpha: 0,
    chainVisible: true,
    socketX: -32.5,
    adapterX: -9.8,
    adapterY: 0.35,
    adapterRotX: 0.34,
    adapterRotZ: Math.PI / 2,
    typeCPlugOffsetX: 18.5,
    typeCPlugRotX: Math.PI / 2,
    camPos: new Vector3(-9.8, 1.55, 10.6),
    camLookAt: new Vector3(-9.8, 0.15, -0.75),
  },
];

const clonePose = (p: StepPose): StepPose => ({
  ...p,
  camPos: p.camPos.clone(),
  camLookAt: p.camLookAt.clone(),
});

interface LanternVerticalLoop {
  curve: CatmullRomCurve3;
  innerMat: MeshBasicMaterial;
  outerMat: MeshBasicMaterial;
  arrows: { mesh: Mesh; baseU: number }[];
}

export class WatchIntroModel {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  private readonly watchApi!: WatchModelApi;
  private readonly lanternGroup = new Group();
  private snapPulseRing!: Mesh;
  private snapPulseMat!: MeshBasicMaterial;

  // P3 供电链 3D 资产组（延伸长白线 + USB Type-C 插头 + 苹果风白色圆角电源适配器 + 墙面插座）
  private readonly chainGroup = new Group();
  private readonly typeCPlugGroup = new Group();
  private readonly adapterGroup = new Group();
  private readonly wallSocketGroup = new Group();
  private dynamicCableMesh!: Mesh;
  private cableMat!: MeshStandardMaterial;

  // 灯笼磁通笼：3 个同心水平环 + 8 个均匀竖环
  private readonly horizontalRings: {
    mesh: Mesh;
    mat: MeshBasicMaterial;
    frac: number;
    baseR: number;
  }[] = [];
  private readonly verticalLoops: LanternVerticalLoop[] = [];

  // 螺旋线圈导管内部的蓝色电子流（09 §5：蓝色电子沿半透明黄铜螺旋连续运动，1 圈约 1.5 秒）
  private txParticleMesh!: InstancedMesh;
  private rxParticleMesh!: InstancedMesh;
  private txParticleMat!: MeshBasicMaterial;
  private rxParticleMat!: MeshBasicMaterial;
  private readonly particleCount = 92;

  private readonly sound = createWatchSoundEngine();
  private snapSoundPlayed = false;

  private readonly poses: StepPose[];
  private currentPose: StepPose;
  private startPose: StepPose;
  private targetPose: StepPose;

  private currentStep = 0;
  private tweenStart = 0;
  private tweenDuration = 850;
  private isC1Compound = false;
  private isC3TurnThenReveal = false;
  private isAnimating = false;
  private active = true;
  private destroyed = false;
  private rafId = 0;
  private appliedPixelRatio = 1;
  private resizeObserver: ResizeObserver | null = null;
  private pmremGenerator: PMREMGenerator | null = null;
  private readonly dummy = new Object3D();
  private readonly upVec = new Vector3(0, 1, 0);

  constructor(
    private readonly container: HTMLElement,
    private readonly mode: WatchSceneMode = "intro",
  ) {
    this.poses = mode === "chain" ? CHAIN_POSES : INTRO_POSES;

    this.scene = new Scene();
    // 09 §1.3：不要深蓝色背景，背景完全透明，无缝嵌入 PPT！
    this.scene.background = null;

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    this.camera = new PerspectiveCamera(32, width / height, 0.1, 220);

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(new Color("#000000"), 0);
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.16;
    container.append(this.renderer.domElement);

    this.pmremGenerator = new PMREMGenerator(this.renderer);
    const roomEnv = new RoomEnvironment();
    this.scene.environment = this.pmremGenerator.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose();

    this.currentPose = clonePose(this.poses[0]);
    this.startPose = clonePose(this.poses[0]);
    this.targetPose = clonePose(this.poses[0]);

    this.setupLights();
    this.watchApi = createWatchAssembly(this.scene);
    this.buildSnapPulse();
    this.buildLanternMagneticCage();
    this.buildCoilBlueElectrons();
    this.buildPowerChain3DAssets();

    this.syncRendererScale(true);
    this.applyPose(this.currentPose, 1, 0);
    this.renderOnce();

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);
  }

  // 重播当前步骤动画（供 C1 重播音效或课堂复看）
  replayStep(): void {
    if (this.destroyed) return;
    if (this.mode === "intro" && this.currentStep === 1) {
      this.currentPose = clonePose(INTRO_POSES[0]);
      this.setStep(1, true);
    }
  }

  private getElementScale(): number {
    const layoutW = this.container.clientWidth;
    if (!layoutW) return 1;
    return this.container.getBoundingClientRect().width / layoutW;
  }

  private syncRendererScale(force = false): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;

    const ratio = clamp((globalThis.devicePixelRatio || 1) * this.getElementScale(), 1, 2);
    const changed = Math.abs(ratio - this.appliedPixelRatio) >= 0.02;
    if (changed) {
      this.appliedPixelRatio = ratio;
      this.renderer.setPixelRatio(ratio);
    }
    if (changed || force) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    }
  }

  handleResize(): void {
    if (this.destroyed) return;
    this.syncRendererScale(true);
    this.renderOnce();
  }

  private setupLights(): void {
    this.scene.add(new AmbientLight("#e2e8f0", 0.85));
    this.scene.add(new HemisphereLight("#f8fafc", "#0f172a", 0.9));

    const keyLight = new DirectionalLight("#ffffff", 1.9);
    keyLight.position.set(10, 14, 15);
    this.scene.add(keyLight);

    const backKeyLight = new DirectionalLight("#f8fafc", 1.75);
    backKeyLight.position.set(10, 10, -15);
    this.scene.add(backKeyLight);

    const fillLight = new DirectionalLight("#93c5fd", 0.95);
    fillLight.position.set(-14, 5, 10);
    this.scene.add(fillLight);
  }

  private buildSnapPulse(): void {
    // 09 §1.2：去掉磁吸箭头，只用很淡的对准微光环提示磁吸接触
    this.snapPulseMat = new MeshBasicMaterial({
      color: "#6ee7b7",
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const ringGeo = new RingGeometry(1.38, 1.56, 48);
    this.snapPulseRing = new Mesh(ringGeo, this.snapPulseMat);
    this.scene.add(this.snapPulseRing);
  }

  private buildLanternMagneticCage(): void {
    this.scene.add(this.lanternGroup);

    // 1. 3 个同心水平环（内亮外淡）
    const hConfigs = [
      { r: 0.56, tube: 0.018, frac: 0.5, alphaScale: 0.92 },
      { r: 0.94, tube: 0.016, frac: 0.32, alphaScale: 0.68 },
      { r: 1.32, tube: 0.014, frac: 0.68, alphaScale: 0.45 },
    ];
    for (const cfg of hConfigs) {
      const geo = new TorusGeometry(cfg.r, cfg.tube, 12, 56);
      const mat = new MeshBasicMaterial({
        color: "#e2a846",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const mesh = new Mesh(geo, mat);
      this.horizontalRings.push({ mesh, mat, frac: cfg.frac, baseR: cfg.alphaScale });
      this.lanternGroup.add(mesh);
    }

    // 2. 8 个均匀分布的竖环（内亮外淡 + 方向圆锥箭头，场线上不放粒子）
    const numMeridians = 8;
    const coneGeo = new ConeGeometry(0.048, 0.14, 12);

    for (let i = 0; i < numMeridians; i += 1) {
      const phi = (i * Math.PI * 2) / numMeridians + 0.21;
      const cos = Math.cos(phi);
      const sin = Math.sin(phi);

      const curve = new CatmullRomCurve3(
        [
          new Vector3(0.46 * cos, 0.46 * sin, -0.85),
          new Vector3(0.42 * cos, 0.42 * sin, 0),
          new Vector3(0.46 * cos, 0.46 * sin, 0.85),
          new Vector3(1.18 * cos, 1.18 * sin, 0.62),
          new Vector3(1.52 * cos, 1.52 * sin, 0),
          new Vector3(1.18 * cos, 1.18 * sin, -0.62),
        ],
        true,
      );

      const innerGeo = new TubeGeometry(curve, 44, 0.017, 8, true);
      const innerMat = new MeshBasicMaterial({
        color: "#fbbf24",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      this.lanternGroup.add(new Mesh(innerGeo, innerMat));

      const outerGeo = new TubeGeometry(curve, 44, 0.036, 8, true);
      const outerMat = new MeshBasicMaterial({
        color: "#e2a846",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      this.lanternGroup.add(new Mesh(outerGeo, outerMat));

      const arrows: { mesh: Mesh; baseU: number }[] = [];
      for (const baseU of [0.16, 0.66]) {
        const arrowMesh = new Mesh(coneGeo, innerMat);
        arrows.push({ mesh: arrowMesh, baseU });
        this.lanternGroup.add(arrowMesh);
      }

      this.verticalLoops.push({ curve, innerMat, outerMat, arrows });
    }
  }

  private buildCoilBlueElectrons(): void {
    // 09 §5：蓝色电子在半透明黄铜线圈内部沿螺旋连续运动
    const electronGeo = new SphereGeometry(0.025, 10, 10);

    this.txParticleMat = new MeshBasicMaterial({
      color: "#60a5fa",
      transparent: true,
      opacity: 0,
    });
    this.txParticleMesh = new InstancedMesh(electronGeo, this.txParticleMat, this.particleCount);
    this.watchApi.chargerRoot.add(this.txParticleMesh);

    this.rxParticleMat = new MeshBasicMaterial({
      color: "#38bdf8",
      transparent: true,
      opacity: 0,
    });
    this.rxParticleMesh = new InstancedMesh(electronGeo, this.rxParticleMat, this.particleCount);
    this.watchApi.root.add(this.rxParticleMesh);
  }

  // oxlint-disable-next-line max-statements -- 构建 P3 写实 3D 供电链（Type-C 插头 + 苹果风白色圆角电源适配器 + 墙面插座）
  private buildPowerChain3DAssets(): void {
    this.scene.add(this.chainGroup);
    this.chainGroup.visible = false;

    this.cableMat = new MeshStandardMaterial({
      color: "#f1f5f9",
      metalness: 0.03,
      roughness: 0.42,
    });

    const whiteGlossPlasticMat = new MeshPhysicalMaterial({
      color: "#f8fafc",
      metalness: 0.02,
      roughness: 0.18,
      clearcoat: 0.65,
      clearcoatRoughness: 0.15,
    });

    const metalShellMat = new MeshStandardMaterial({
      color: "#cbd5e1",
      metalness: 0.9,
      roughness: 0.22,
    });

    const darkPortMat = new MeshStandardMaterial({
      color: "#1e293b",
      metalness: 0.4,
      roughness: 0.5,
    });

    // 1. 动态延伸白线（连接充电器线缆末端与 USB Type-C 插头）
    const initCableCurve = new CatmullRomCurve3([
      new Vector3(-1.75, -0.18, -0.76),
      new Vector3(-4.5, -0.95, -0.85),
      new Vector3(-8.4, -1.45, -0.95),
    ]);
    this.dynamicCableMesh = new Mesh(
      new TubeGeometry(initCableCurve, 32, 0.115, 14, false),
      this.cableMat,
    );
    this.chainGroup.add(this.dynamicCableMesh);

    // 2. USB Type-C 插头（白色圆润捏柄 + 护套 + 银色椭扁 Type-C 金属舌片）
    this.chainGroup.add(this.typeCPlugGroup);
    const plugBodyShape = createRoundedRectShape(0.42, 0.64, 0.18);
    const plugBodyGeo = new ExtrudeGeometry(plugBodyShape, {
      depth: 0.78,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    });
    plugBodyGeo.rotateY(Math.PI / 2);
    plugBodyGeo.translate(-0.39, 0, 0);
    this.typeCPlugGroup.add(new Mesh(plugBodyGeo, whiteGlossPlasticMat));

    // Type-C 右侧尾纤护套
    const plugStrainGeo = new CylinderGeometry(0.12, 0.15, 0.36, 20);
    plugStrainGeo.rotateZ(Math.PI / 2);
    const plugStrainMesh = new Mesh(plugStrainGeo, this.cableMat);
    plugStrainMesh.position.set(0.55, 0, 0);
    this.typeCPlugGroup.add(plugStrainMesh);

    // Type-C 左侧银色椭扁金属插头舌片（朝 -X 插入适配器）
    const tongueShape = createRoundedRectShape(0.18, 0.44, 0.08);
    const tongueGeo = new ExtrudeGeometry(tongueShape, {
      depth: 0.34,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });
    tongueGeo.rotateY(Math.PI / 2);
    tongueGeo.translate(-0.72, 0, 0);
    this.typeCPlugGroup.add(new Mesh(tongueGeo, metalShellMat));

    // 3. 苹果 20W 扁跑道形电源适配器（参照真品图 Image 1：USB-C 插口在右端平行端面 +X，两片扁插脚在左端平行对面 -X，机身扁平朝向镜头）
    this.chainGroup.add(this.adapterGroup);
    // 跑道形截面（宽 2.28 沿 Y，扁厚 1.18 沿 Z，圆角半径 0.56 形成经典跑道椭圆截面），沿 X 轴挤出长 2.45
    const pillSection = createRoundedRectShape(1.18, 2.28, 0.56);
    const adapterBodyGeo = new ExtrudeGeometry(pillSection, {
      depth: 2.35,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      curveSegments: 36,
    });
    adapterBodyGeo.translate(0, 0, -1.175);
    adapterBodyGeo.rotateY(Math.PI / 2);
    this.adapterGroup.add(new Mesh(adapterBodyGeo, whiteGlossPlasticMat));

    // 两端浅灰内凹平行端面（Apple 20W 标志性的端面内嵌浅灰装饰面）
    const endFaceMat = new MeshStandardMaterial({
      color: "#e2e8f0",
      metalness: 0.04,
      roughness: 0.35,
    });
    const endFaceShape = createRoundedRectShape(0.96, 2.06, 0.46);
    const endFaceGeo = new ExtrudeGeometry(endFaceShape, {
      depth: 0.04,
      bevelEnabled: false,
      curveSegments: 32,
    });
    endFaceGeo.rotateY(Math.PI / 2);
    const rightEndFace = new Mesh(endFaceGeo, endFaceMat);
    rightEndFace.position.set(1.205, 0, 0);
    const leftEndFace = new Mesh(endFaceGeo, endFaceMat);
    leftEndFace.position.set(-1.245, 0, 0);
    this.adapterGroup.add(rightEndFace, leftEndFace);

    // 右端面（+X）中央的 USB Type-C 母口暗槽
    const portGeo = new BoxGeometry(0.1, 0.48, 0.2);
    const portMesh = new Mesh(portGeo, darkPortMat);
    portMesh.position.set(1.22, 0, 0);
    this.adapterGroup.add(portMesh);

    // 左端平行对面（-X）伸出的两片国标扁金属插脚（上下平行排列在左端面上，带圆润顶端）
    const prongGeo = new BoxGeometry(0.95, 0.1, 0.38);
    for (const py of [-0.46, 0.46]) {
      const prong = new Mesh(prongGeo, metalShellMat);
      prong.position.set(-1.68, py, 0);
      this.adapterGroup.add(prong);
    }

    // 4. 墙面 220 V 交流五孔插座面板（立在左侧 X = -15.65，并向镜头微偏转 28° 以便同时看清插座五孔与适配器扁插脚插入过程）
    this.chainGroup.add(this.wallSocketGroup);
    const socketPlateMat = new MeshPhysicalMaterial({
      color: "#cbd5e1",
      metalness: 0.06,
      roughness: 0.48,
      clearcoat: 0.15,
    });
    const socketTrimMat = new MeshStandardMaterial({
      color: "#94a3b8",
      metalness: 0.15,
      roughness: 0.45,
    });
    const plateShape = createRoundedRectShape(4.1, 4.3, 0.34);
    const plateGeo = new ExtrudeGeometry(plateShape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    plateGeo.translate(0, 0, -0.14);
    this.wallSocketGroup.add(new Mesh(plateGeo, socketPlateMat));

    // 插座内圈装饰框
    const innerFrameShape = createRoundedRectShape(3.1, 3.3, 0.22);
    const innerFrameGeo = new ExtrudeGeometry(innerFrameShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    innerFrameGeo.translate(0, 0, 0.14);
    this.wallSocketGroup.add(new Mesh(innerFrameGeo, socketTrimMat));

    // 标准国标五孔插座插槽：
    // 1. 两脚插座位于上部地线两侧（左右两根竖直平行插槽：[-0.58, 0.72, 0] 与 [0.58, 0.72, 0]）
    // 2. 三脚插座：顶部竖直地线孔 [0, 0.22, 0]（位于两脚插槽之间偏下一点，使适配器插在两脚插槽时地线孔仍清晰可见！）+ 下方“倒八字”斜孔（左孔上宽下窄 rotZ = +0.52，右孔上宽下窄 rotZ = -0.52）
    const slotGeo = new BoxGeometry(0.12, 0.42, 0.09);
    for (const [sx, sy, rotZ] of [
      [-0.58, 0.72, 0],
      [0.58, 0.72, 0],
      [0, 0.22, 0],
      [-0.54, -0.55, 0.52],
      [0.54, -0.55, -0.52],
    ] as [number, number, number][]) {
      const slot = new Mesh(slotGeo, darkPortMat);
      slot.position.set(sx, sy, 0.22);
      slot.rotation.z = rotZ;
      this.wallSocketGroup.add(slot);
    }

    // 插座正面朝右前方（绕 Y 轴转 62°），使观众既能看清五孔面板，又能看清扁适配器平行左端的两片插脚插进插座！
    this.wallSocketGroup.rotation.y = Math.PI * 0.34;
    this.wallSocketGroup.position.set(-19.25, -0.9, -0.85);
  }

  // 切换到指定点击步：P2 为 C0..C6 共 6 击，P3 为 C0..C4 共 4 击
  setStep(step: number, forceReplay = false): void {
    if (this.destroyed) return;
    const clamped = clamp(step, 0, this.poses.length - 1);
    const isForward = clamped > this.currentStep || forceReplay;
    const prevStep = this.currentStep;
    this.currentStep = clamped;

    this.startPose = clonePose(this.currentPose);
    this.targetPose = clonePose(this.poses[clamped]);
    this.tweenStart = performance.now();

    if (this.mode === "intro" && clamped === 1 && isForward) {
      // C1：镜头先动 -> 充电器在手表左后侧完整亮相 -> 飞入磁吸接触 -> 音效 + 充电环
      this.isC1Compound = true;
      this.isC3TurnThenReveal = false;
      this.tweenDuration = 2350;
      this.snapSoundPlayed = false;
    } else if (this.mode === "intro" && prevStep === 2 && clamped === 3) {
      // 09 §2.1 C3：先绕镜头到右后方 35-45°，再开始半透明动画（先绕镜头、后做透明）
      this.isC1Compound = false;
      this.isC3TurnThenReveal = true;
      this.tweenDuration = 1280;
    } else {
      this.isC1Compound = false;
      this.isC3TurnThenReveal = false;
      this.tweenDuration = this.mode === "chain" ? 1050 : 840;
    }

    if (!this.isAnimating && this.active) {
      this.isAnimating = true;
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  // oxlint-disable-next-line max-statements -- 驱动 C1 复合动画、C3 先绕镜头后透明动画、以及 C4-C6 连续蓝色电子流
  private readonly tick = (now: number): void => {
    if (this.destroyed || !this.active) {
      this.isAnimating = false;
      return;
    }

    const elapsed = now - this.tweenStart;
    const tRaw = clamp(elapsed / this.tweenDuration, 0, 1);

    if (this.isC1Compound) {
      // C1 复合动画：
      // 0.00 ~ 0.45: 镜头率先从正面移向侧前 45°，充电器从表后方飞入磁吸对准接触
      // 0.45 ~ 0.58: 接触瞬间播放磁吸咔嗒+充电提示音效，充电头轻微回弹 + 柔和微光环
      // 0.50 ~ 0.98: 屏幕亮起绿色闪电 + 12 点顺时针充电环 ease-in-out 走至 65%
      const camEase = easeOutCubic(clamp(tRaw / 0.48, 0, 1));
      this.currentPose.camPos.lerpVectors(this.startPose.camPos, this.targetPose.camPos, camEase);
      this.currentPose.camLookAt.lerpVectors(
        this.startPose.camLookAt,
        this.targetPose.camLookAt,
        camEase,
      );

      this.currentPose.chargerVisible = true;
      // 镜头在 0.00 ~ 0.34 率先转到右前侧，此时充电器在手表正后方远端 (0, 0, -10.5)，在右前侧镜头下正好位于屏幕右侧，且与手表完全平行；
      // 0.16 ~ 0.64: 充电器沿表背正后方轴线 (X = 0, Z: -10.5 -> -0.29) 从屏幕右侧向左侧平稳飞入并逐渐放大，最终磁吸咔嗒贴合表背！
      const approachT = clamp((tRaw - 0.16) / 0.48, 0, 1);
      const approachEase = easeInOutCubic(approachT);
      let bounceOffset = 0;
      if (tRaw >= 0.64 && tRaw < 0.8) {
        const bt = (tRaw - 0.64) / 0.16;
        bounceOffset = -Math.sin(bt * Math.PI) * 0.14 * (1 - bt);
      }

      this.currentPose.watchX = 0;
      this.currentPose.watchZ =
        this.startPose.watchZ + (this.targetPose.watchZ - this.startPose.watchZ) * approachEase;
      this.currentPose.chargerZ =
        -10.5 + (this.targetPose.chargerZ - -10.5) * approachEase + bounceOffset;

      if (tRaw >= 0.63 && !this.snapSoundPlayed) {
        this.snapSoundPlayed = true;
        this.sound.playSnapAndChime();
      }

      if (tRaw < 0.65) {
        this.currentPose.chargeProgress = 0;
      } else {
        const ringT = clamp((tRaw - 0.65) / 0.33, 0, 1);
        this.currentPose.chargeProgress = 0.01 + 0.64 * easeInOutCubic(ringT);
      }

      this.currentPose.backCoverOpacity = 1;
      this.currentPose.coilTranslucent = false;
      this.currentPose.txCurrentAlpha = 0;
      this.currentPose.fieldAlpha = 0;
      this.currentPose.rxCurrentAlpha = 0;
    } else if (this.isC3TurnThenReveal) {
      // 09 §2.1 C3：前 58% 时间先平滑绕镜头到右后方 38°（此时背盖仍保持实体），后 42% 时间才开始背盖半透明与微剖开
      const camT = clamp(tRaw / 0.58, 0, 1);
      const camEase = easeInOutCubic(camT);
      this.currentPose.camPos.lerpVectors(this.startPose.camPos, this.targetPose.camPos, camEase);
      this.currentPose.camLookAt.lerpVectors(
        this.startPose.camLookAt,
        this.targetPose.camLookAt,
        camEase,
      );

      const revealT = clamp((tRaw - 0.55) / 0.45, 0, 1);
      const revealEase = easeOutCubic(revealT);
      const lerpReveal = (a: number, b: number): number => a + (b - a) * revealEase;

      this.currentPose.watchZ = lerpReveal(this.startPose.watchZ, this.targetPose.watchZ);
      this.currentPose.chargerZ = lerpReveal(this.startPose.chargerZ, this.targetPose.chargerZ);
      this.currentPose.backCoverOpacity = lerpReveal(
        this.startPose.backCoverOpacity,
        this.targetPose.backCoverOpacity,
      );
      this.currentPose.chargerVisible = true;
      this.currentPose.coilTranslucent = false;
      this.currentPose.txCurrentAlpha = 0;
      this.currentPose.fieldAlpha = 0;
      this.currentPose.rxCurrentAlpha = 0;
    } else {
      const ease = easeInOutCubic(tRaw);
      const lerp = (a: number, b: number): number => a + (b - a) * ease;
      this.currentPose.watchX = lerp(this.startPose.watchX, this.targetPose.watchX);
      this.currentPose.watchZ = lerp(this.startPose.watchZ, this.targetPose.watchZ);
      this.currentPose.chargerZ = lerp(this.startPose.chargerZ, this.targetPose.chargerZ);
      this.currentPose.chargerVisible = this.targetPose.chargerVisible;
      this.currentPose.backCoverOpacity = lerp(
        this.startPose.backCoverOpacity,
        this.targetPose.backCoverOpacity,
      );
      this.currentPose.coilTranslucent = this.targetPose.coilTranslucent;
      this.currentPose.chargeProgress = lerp(
        this.startPose.chargeProgress,
        this.targetPose.chargeProgress,
      );
      this.currentPose.txCurrentAlpha = lerp(
        this.startPose.txCurrentAlpha,
        this.targetPose.txCurrentAlpha,
      );
      this.currentPose.fieldAlpha = lerp(this.startPose.fieldAlpha, this.targetPose.fieldAlpha);
      this.currentPose.rxCurrentAlpha = lerp(
        this.startPose.rxCurrentAlpha,
        this.targetPose.rxCurrentAlpha,
      );
      this.currentPose.chainVisible = this.targetPose.chainVisible;
      this.currentPose.socketX = lerp(this.startPose.socketX, this.targetPose.socketX);
      this.currentPose.adapterX = lerp(this.startPose.adapterX, this.targetPose.adapterX);
      this.currentPose.adapterY = lerp(this.startPose.adapterY, this.targetPose.adapterY);
      this.currentPose.adapterRotX = lerp(this.startPose.adapterRotX, this.targetPose.adapterRotX);
      this.currentPose.adapterRotZ = lerp(this.startPose.adapterRotZ, this.targetPose.adapterRotZ);
      this.currentPose.typeCPlugOffsetX = lerp(
        this.startPose.typeCPlugOffsetX,
        this.targetPose.typeCPlugOffsetX,
      );
      this.currentPose.typeCPlugRotX = lerp(
        this.startPose.typeCPlugRotX,
        this.targetPose.typeCPlugRotX,
      );

      this.currentPose.camPos.lerpVectors(this.startPose.camPos, this.targetPose.camPos, ease);
      this.currentPose.camLookAt.lerpVectors(
        this.startPose.camLookAt,
        this.targetPose.camLookAt,
        ease,
      );
    }

    // 是否有需要连续运行的电流/磁场动效（P2 C4–C6，或 P3 C3）
    const hasContinuousFlow =
      (this.mode === "intro" && this.currentStep >= 4) ||
      (this.mode === "chain" && this.currentStep === 3);

    // 09 §5：电子速度控制在 1 圈约 1.5 秒（约 0.65 圈/秒），绝不闪烁、不快到看不清流向
    const elapsedSec = now * 0.001;
    this.applyPose(this.currentPose, tRaw, elapsedSec);
    this.renderer.render(this.scene, this.camera);

    if (tRaw < 1 || hasContinuousFlow) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.currentPose = clonePose(this.targetPose);
      this.applyPose(this.currentPose, 1, 0.35);
      this.renderer.render(this.scene, this.camera);
      this.isAnimating = false;
    }
  };

  // oxlint-disable-next-line max-statements -- 同步手表、充电器、P3供电链、灯笼磁场与蓝色电子速度
  private applyPose(pose: StepPose, tweenProgress: number, timeSec: number): void {
    // 充电器始终与表完全平行（rotation.y = 0, position.x = 0），沿手表正后方轴线 (Z 轴) 运动，在右前侧镜头下自然呈现“从屏幕右侧往左侧飞入并放大”！
    let chargerScale = 1;
    if (this.isC1Compound && tweenProgress < 0.64) {
      const flyT = clamp((tweenProgress - 0.16) / 0.48, 0, 1);
      chargerScale = 0.62 + 0.38 * easeInOutCubic(flyT);
    }

    this.watchApi.root.position.set(pose.watchX, 0, pose.watchZ);
    this.watchApi.chargerRoot.position.set(pose.watchX, 0, pose.chargerZ);
    this.watchApi.chargerRoot.rotation.set(0, 0, 0);
    this.watchApi.chargerRoot.scale.setScalar(chargerScale);
    this.watchApi.chargerRoot.visible = pose.chargerVisible;

    this.watchApi.setBackCoverOpacity(pose.backCoverOpacity);
    this.watchApi.setCoilTranslucent(pose.coilTranslucent);
    this.watchApi.setChargeProgress(pose.chargeProgress);

    // P3 连续 3D 供电链位姿同步
    this.chainGroup.visible = pose.chainVisible;
    const shortCable = this.watchApi.chargerRoot.getObjectByName("PuckShortCableMesh");
    if (shortCable) shortCable.visible = !pose.chainVisible;

    if (pose.chainVisible) {
      const showAdapterAndSocket = this.currentStep >= 2;
      this.adapterGroup.visible = showAdapterAndSocket;
      this.wallSocketGroup.visible = showAdapterAndSocket;
      this.typeCPlugGroup.visible = true;

      this.wallSocketGroup.position.set(pose.socketX, -0.9, -0.85);
      this.adapterGroup.position.set(pose.adapterX, pose.adapterY, -0.75);
      this.adapterGroup.rotation.set(pose.adapterRotX, 0, pose.adapterRotZ);

      const plugX = -15.45 + pose.typeCPlugOffsetX;
      this.typeCPlugGroup.position.set(plugX, pose.adapterY, -0.75);
      this.typeCPlugGroup.rotation.set(pose.typeCPlugRotX, 0, 0);

      // 更新连接充电器左端护套与 Type-C 插头尾部的平滑长白线（随手表与 Type-C 同步右飞出画）
      const startPt = new Vector3(pose.watchX - 1.75, -0.18, pose.chargerZ - 0.3);
      const endPt = new Vector3(plugX + 0.68, pose.adapterY, -0.75);
      const midPt1 = new Vector3(
        startPt.x + (endPt.x - startPt.x) * 0.35,
        -0.58,
        (startPt.z + endPt.z) * 0.5,
      );
      const midPt2 = new Vector3(
        startPt.x + (endPt.x - startPt.x) * 0.72,
        pose.adapterY + 0.08,
        endPt.z,
      );
      this.dynamicCableMesh.geometry.dispose();
      this.dynamicCableMesh.geometry = new TubeGeometry(
        new CatmullRomCurve3([startPt, midPt1, midPt2, endPt]),
        44,
        0.115,
        14,
        false,
      );
    }

    // C1 磁吸接触瞬间的极淡对准微光环（无箭头）
    if (this.isC1Compound && tweenProgress >= 0.56 && tweenProgress <= 0.84) {
      const p = (tweenProgress - 0.56) / 0.28;
      this.snapPulseMat.opacity = Math.sin(p * Math.PI) * 0.42;
      const s = 0.96 + p * 0.32;
      this.snapPulseRing.scale.set(s, s, 1);
      this.snapPulseRing.position.set(0, 0, pose.chargerZ + 0.02);
    } else {
      this.snapPulseMat.opacity = 0;
    }

    // 灯笼磁通笼位置与箭头更新（当 fieldAlpha <= 0.005 时彻底隐藏 lanternGroup，杜绝 C4 出现任何黑色透明残影箭头！）
    this.lanternGroup.visible = pose.fieldAlpha > 0.005;
    const rxWorldZ = pose.watchZ - 0.35;
    const txWorldZ = pose.chargerZ - 0.13;
    const midZ = (rxWorldZ + txWorldZ) * 0.5;
    const halfGap = Math.max(0.25, (rxWorldZ - txWorldZ) * 0.5);

    this.lanternGroup.position.set(0, 0, midZ);
    this.lanternGroup.scale.set(1, 1, halfGap / 0.85);

    // 物理严格对应的正弦交变电流与交变磁场（周期 T ≈ 3.2 秒，ω = 2π / 3.2 ≈ 1.96 rad/s）：
    // 1. 送电线圈电流 i₁(t) = I₀ sin(ωt) => 电子沿螺旋的角位移 φ₁(t) ∝ -cos(ωt)，速度 v₁(t) ∝ sin(ωt)：
    //    正半周顺时针加速→减速→过零点停顿→负半周逆时针加速→减速，周期性顺/逆时针往返振荡！
    // 2. 磁感应强度与磁通量 Φ(t) ∝ i₁(t) ∝ sin(ωt)：
    //    与送电线圈电流完全同相！当电子顺时针流（sin > 0）时磁感线箭头朝 +Z 穿过受电线圈并达峰值；
    //    当电子减速到 0 换向瞬间（sin = 0），磁场减弱为 0；当电子逆时针流（sin < 0）时磁感线箭头反向（朝 -Z）并达反向峰值！
    // 3. 受电线圈感应电动势与感应电流 i₂(t) ∝ -dΦ/dt ∝ -cos(ωt)（法拉第电磁感应定律 + 楞次定律）：
    //    电子角位移 φ₂(t) ∝ -sin(ωt)，同样一会儿顺时针、一会儿逆时针正弦往返振荡，且与磁通量变化率严格对应！
    const omega = (Math.PI * 2) / 3.2;
    const phase = timeSec * omega;
    const sinWave = Math.sin(phase);
    const cosWave = Math.cos(phase);
    const waveMag = Math.abs(sinWave);
    const dirSign = sinWave >= 0 ? 1 : -1;

    if (this.lanternGroup.visible) {
      const visualMag = 0.12 + 0.88 * waveMag;
      for (const hRing of this.horizontalRings) {
        hRing.mat.opacity = pose.fieldAlpha * hRing.baseR * 0.78 * visualMag;
        hRing.mesh.position.z = (hRing.frac - 0.5) * 1.4;
      }

      // 磁感线推进位移与送电线圈电子位移同相（-cos(phase)），使箭头随正弦电流同步往返并翻转朝向
      const fieldDrift = -0.14 * cosWave;
      const quat = new Quaternion();
      for (const vLoop of this.verticalLoops) {
        vLoop.innerMat.opacity = pose.fieldAlpha * 0.88 * visualMag;
        vLoop.outerMat.opacity = pose.fieldAlpha * 0.25 * visualMag;

        for (const arrow of vLoop.arrows) {
          const u = (((arrow.baseU + fieldDrift) % 1) + 1) % 1;
          const pos = vLoop.curve.getPointAt(u);
          const tangent = vLoop.curve.getTangentAt(u).multiplyScalar(dirSign).normalize();
          arrow.mesh.position.copy(pos);
          quat.setFromUnitVectors(this.upVec, tangent);
          arrow.mesh.quaternion.copy(quat);
        }
      }
    }

    // 蓝色电子沿半透明黄铜螺旋的正弦交变往返运动（振幅 ±1.15 圈，即 parameter u 摆幅 ±0.165，正半周顺时针、负半周逆时针！）
    const { rxCurve, txCurve } = this.watchApi.getCoilPaths();
    this.txParticleMat.opacity = pose.txCurrentAlpha * 0.96;
    this.rxParticleMat.opacity = pose.rxCurrentAlpha * 0.96;
    this.txParticleMesh.visible = pose.txCurrentAlpha > 0.005;
    this.rxParticleMesh.visible = pose.rxCurrentAlpha > 0.005;

    const swingAmp = 0.165; // 7 匝螺旋下，0.165 对应约 1.15 圈的顺时针/逆时针往返摆幅，肉眼极易看清正反交替流向
    const txOffset = -swingAmp * cosWave; // 速度 d(txOffset)/dt = +swingAmp * ω * sin(ωt)，与磁通方向 sinWave 完全同相！
    const rxOffset = -swingAmp * sinWave; // 速度 d(rxOffset)/dt = -swingAmp * ω * cos(ωt) ∝ -dΦ/dt，严格满足法拉第定律与楞次定律！

    for (let i = 0; i < this.particleCount; i += 1) {
      const baseFrac = i / this.particleCount;

      const uTx = (((baseFrac + txOffset) % 1) + 1) % 1;
      this.dummy.position.copy(txCurve.getPointAt(uTx));
      this.dummy.updateMatrix();
      this.txParticleMesh.setMatrixAt(i, this.dummy.matrix);

      const uRx = (((baseFrac + rxOffset) % 1) + 1) % 1;
      this.dummy.position.copy(rxCurve.getPointAt(uRx));
      this.dummy.updateMatrix();
      this.rxParticleMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.txParticleMesh.instanceMatrix.needsUpdate = true;
    this.rxParticleMesh.instanceMatrix.needsUpdate = true;

    this.camera.position.copy(pose.camPos);
    this.camera.lookAt(pose.camLookAt);
  }

  renderOnce(): void {
    if (this.destroyed || !this.active) return;
    this.renderer.render(this.scene, this.camera);
  }

  setActive(active: boolean): void {
    if (this.destroyed || this.active === active) return;
    this.active = active;
    if (!active && this.isAnimating) {
      cancelAnimationFrame(this.rafId);
      this.isAnimating = false;
    } else if (active) {
      this.syncRendererScale(true);
      const hasContinuousFlow =
        (this.mode === "intro" && this.currentStep >= 4) ||
        (this.mode === "chain" && this.currentStep === 3);
      if (hasContinuousFlow && !this.isAnimating) {
        this.isAnimating = true;
        this.rafId = requestAnimationFrame(this.tick);
      } else {
        this.renderOnce();
      }
    }
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.active = false;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.sound.dispose();
    this.watchApi.dispose();
    this.pmremGenerator?.dispose();
    this.pmremGenerator = null;

    const materials = new Set<Material>();
    const geometries = new Set<BufferGeometry>();
    this.scene.traverse((obj) => {
      const { geometry, material } = obj as {
        geometry?: BufferGeometry;
        material?: Material | Material[];
      };
      if (geometry) geometries.add(geometry);
      if (!material) return;
      for (const item of Array.isArray(material) ? material : [material]) materials.add(item);
    });
    for (const geo of geometries) geo.dispose();
    for (const mat of materials) mat.dispose();

    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
