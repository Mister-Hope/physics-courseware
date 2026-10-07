/**
 * 404 页面的「智能」部分。
 *
 * 取地址栏第一段路径，判断它是不是一个课件目录（课件清单在构建期由 courses.config.ts 注入， 部署时 `dist/<slug>/` 就是这些目录），由此决定按钮：
 *
 * - 是课件目录 → 额外给出「返回课件首页」（回到该课件第一页）
 * - 不是 → 只留「返回课件列表」
 */
import { textbooks } from "./courses.config";

const courseTitles = new Map(
  textbooks.flatMap((group) => group.courses.map((course) => [course.slug, course.title] as const)),
);

const pathText = document.querySelector<HTMLElement>("#path");
const courseButton = document.querySelector<HTMLAnchorElement>("#btn-course");
const listButton = document.querySelector<HTMLAnchorElement>("#btn-list");
const hint = document.querySelector<HTMLElement>("#hint");

const { pathname } = location;

if (pathText) pathText.textContent = `${pathname}${location.search}`;

const slug = pathname.split("/").find(Boolean) ?? "";
const title = courseTitles.get(slug);

if (slug && title && courseButton && listButton) {
  courseButton.href = `/${slug}/`;
  courseButton.hidden = false;

  // 有课件可回时，把「返回课件首页」顶成主按钮、「返回课件列表」降为次要按钮
  if (listButton.classList.contains("btn-primary")) {
    listButton.classList.replace("btn-primary", "btn-ghost");
    courseButton.classList.replace("btn-ghost", "btn-primary");
  }

  if (hint) {
    hint.textContent = `已识别到课件《${title}》，可以回到它的第一页重新开始。`;
    hint.hidden = false;
  }
}
