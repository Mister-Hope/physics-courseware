import "./style.css";
import { textbooks } from "./courses.config";
import type { CourseMeta } from "./courses.config";

/* ---------- 状态 ---------- */

let activeSlug = ""; // '' = 全部

/* ---------- 渲染 ---------- */

const renderTag = (tag: string): string => `<span class="tag">${tag}</span>`;

const renderCourseCard = (course: CourseMeta): string =>
  `<a class="course-card" href="/${course.slug}/" target="_blank">
      <div class="card-chapter">${course.chapter}</div>
      <h3 class="card-title">${course.title}</h3>
      <p class="card-desc">${course.description}</p>
      <div class="card-footer">
        <div class="card-tags">
          ${course.tags.map(renderTag).join("")}
        </div>
      </div>
    </a>`;

/* ---------- 内容 ---------- */

const renderContent = (): void => {
  const grid = document.querySelector("#course-grid");
  if (!grid) return;

  grid.classList.add("is-flat");

  const allCourses = activeSlug
    ? textbooks.filter((g) => g.slug === activeSlug).flatMap((g) => g.courses)
    : textbooks.flatMap((g) => g.courses);

  grid.innerHTML =
    allCourses.length === 0
      ? '<div class="group-empty">暂无课件</div>'
      : allCourses.map((course) => renderCourseCard(course)).join("");
};

/* ---------- Tab ────────── */

const renderTabs = (): void => {
  const tabsEl = document.querySelector("#tabs");
  if (!tabsEl) return;

  const allTab = `<button class="tab${activeSlug === "" ? " active" : ""}" data-slug="">全部</button>`;
  const bookTabs = textbooks
    .map(
      (group) =>
        `<button class="tab${activeSlug === group.slug ? " active" : ""}" data-slug="${group.slug}">${group.shortName}</button>`,
    )
    .join("");

  tabsEl.innerHTML = allTab + bookTabs;

  tabsEl.querySelectorAll<HTMLButtonElement>(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeSlug = btn.dataset.slug ?? "";
      renderTabs();
      renderContent();
    });
  });
};

/* ---------- 启动 ---------- */

const yearEl = document.querySelector("#footer-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

renderTabs();
renderContent();
