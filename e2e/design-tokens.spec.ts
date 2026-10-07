import { expect, test } from "@playwright/test";

import { listCourses } from "./courses";
import { openDeck } from "./slidev-driver";

/**
 * SVG 绘制基准守卫。
 *
 * 背景：`html` 基准字号被调大到 22px（后排可读），但写 SVG 的人（尤其 AI）默认按 16px 思考。
 * 共享设计系统（`workspace/shared/styles/common.css`）为此把 SVG 子树做成自成一体的 16px 体系：
 *
 * - `<svg>` 根字号恒为 16 用户单位，不继承 22px
 * - `font-size="N"` 属性按 N（viewBox 用户单位）生效——UnoCSS 的 attributify 会把它误当工具类 （`[font-size~="11"] {
 *   font-size: 3rem }`），所以 common.css 用 `attr()` 显式盖回去
 * - 内联 `style="font-size:13px"` 照常生效
 *
 * 这个测试往真实页面里注入探针 SVG，直接验证上面三条契约；任何一条被破坏都会在这里失败。
 */

/** 幻灯片正文字号基准（后排可读，见 AGENTS.md 设计系统） */
const EXPECTED_HTML_FONT_SIZE = "22px";
/** SVG 内部基准：写 SVG 时按 16px 思考即可 */
const EXPECTED_SVG_BASE_FONT_SIZE = "16px";

const PROBES = [
  {
    id: "probe-attr-11",
    label: 'font-size="11"',
    markup: '<text id="probe-attr-11" x="0" y="20" font-size="11">A</text>',
    expected: "11px",
  },
  {
    id: "probe-attr-24",
    label: 'font-size="24"',
    markup: '<text id="probe-attr-24" x="0" y="45" font-size="24">B</text>',
    expected: "24px",
  },
  {
    id: "probe-none",
    label: "不写字号（继承 SVG 基准）",
    markup: '<text id="probe-none" x="0" y="70">C</text>',
    expected: EXPECTED_SVG_BASE_FONT_SIZE,
  },
  {
    id: "probe-style",
    label: 'style="font-size:13px"',
    markup: '<text id="probe-style" x="0" y="95" style="font-size:13px">D</text>',
    expected: "13px",
  },
] as const;

test.describe.configure({ mode: "serial" });

for (const course of listCourses()) {
  test(`课件「${course.slug}」的 SVG 按 16px 基准绘制`, async ({ page }) => {
    await openDeck(page, course.baseURL);
    await page.waitForTimeout(300);

    const measured = await page.evaluate((probes) => {
      const host = document.querySelector(".slidev-layout") ?? document.body;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      svg.setAttribute("viewBox", "0 0 200 100");
      svg.setAttribute("width", "200");
      svg.innerHTML = probes.map((probe) => probe.markup).join("");
      host.append(svg);

      const result: Record<string, string> = {
        html: getComputedStyle(document.documentElement).fontSize,
        svgBase: getComputedStyle(svg).fontSize,
      };

      for (const probe of probes) {
        const element = document.getElementById(probe.id);

        result[probe.id] = element ? getComputedStyle(element).fontSize : "missing";
      }

      svg.remove();

      return result;
    }, PROBES);

    expect(measured.html, "幻灯片正文字号基准应保持 22px（后排可读）").toBe(
      EXPECTED_HTML_FONT_SIZE,
    );
    expect(measured.svgBase, "SVG 根字号应是 16px，不继承 html 的 22px").toBe(
      EXPECTED_SVG_BASE_FONT_SIZE,
    );

    const broken = PROBES.filter((probe) => measured[probe.id] !== probe.expected);

    expect(
      broken.map(
        (probe) => `${probe.label} → 实测 ${measured[probe.id]}（应为 ${probe.expected}）`,
      ),
      "SVG 字号契约被破坏：见 workspace/shared/styles/common.css 的「SVG 一律按 16px 基准绘制」段落",
    ).toEqual([]);

    console.log(
      `🎯 ${course.slug}：html ${measured.html}｜SVG 基准 ${measured.svgBase}｜属性/内联样式全部按书写值生效`,
    );
  });
}
