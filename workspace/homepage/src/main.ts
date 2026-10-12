import "./style.css";
import { textbooks } from "./courses.config";
import type { CourseMeta } from "./courses.config";
import { coursePages } from "./pages.generated";

/* ---------- 状态 ---------- */

let activeSlug = ""; // '' = 全部

/** 主页「我要上课」把自定义 logo 按姓名存到 localStorage，课件端用同一 key 取（见共享 addon utils/lesson-params.ts） */
const LOGO_LOCAL_PREFIX = "courseware.logo:";
const LOGO_MAX_BYTES = 1.5 * 1024 * 1024;

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

/* ---------- 「我要上课」弹窗 ---------- */

const query = (selector: string): HTMLElement => {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`${selector} 不存在`);

  return el;
};

const teach = {
  backdrop: query("#teach-backdrop") as HTMLDivElement,
  form: query("#teach-form") as HTMLFormElement,
  name: query("#teach-name") as HTMLInputElement,
  course: query("#teach-course") as HTMLSelectElement,
  page: query("#teach-page") as HTMLInputElement,
  pageHint: query("#teach-page-hint"),
  logoCustom: query("#teach-logo-custom") as HTMLDivElement,
  logoPick: query("#teach-logo-pick") as HTMLButtonElement,
  logoFile: query("#teach-logo-file") as HTMLInputElement,
  logoPreview: query("#teach-logo-preview") as HTMLImageElement,
  logoHint: query("#teach-logo-hint"),
  saved: query("#teach-saved") as HTMLDivElement,
  savedList: query("#teach-saved-list") as HTMLDivElement,
  link: query("#teach-link") as HTMLInputElement,
  copy: query("#teach-copy") as HTMLButtonElement,
};

/** 当前选中的自定义 logo 存储 key（上传即按姓名存，选「本机已保存」则用该记录的 key） */
let customLogoKey = "";

const logoMode = (): string =>
  document.querySelector<HTMLInputElement>('input[name="teach-logo"]:checked')?.value ?? "default";

const currentSlug = (): string => teach.course.value;

const currentTotal = (): number => coursePages[currentSlug()] ?? 1;

const clampPage = (): void => {
  const total = currentTotal();
  const value = Math.trunc(Number(teach.page.value));

  teach.page.value = String(Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1), total));
};

/** 起始页提示 + 把越界值收回范围 */
const syncPageHint = (): void => {
  const total = currentTotal();
  teach.pageHint.textContent = `共 ${total} 页`;
  teach.page.max = String(total);
  teach.page.min = "1";
  clampPage();
};

/** 下拉列表按分册分组 */
const renderCourseSelect = (): void => {
  const groups = textbooks.filter((g) => g.courses.length > 0);
  const flat = groups.flatMap((g) => g.courses);

  teach.course.innerHTML = groups
    .map(
      (group) =>
        `<optgroup label="${group.name}">${group.courses
          .map(
            (course) =>
              `<option value="${course.slug}"${course.slug === flat[0]?.slug ? " selected" : ""}>${course.chapter} ${course.title}</option>`,
          )
          .join("")}</optgroup>`,
    )
    .join("");

  syncPageHint();
};

/**
 * 弹窗里生成授课链接：/<slug>/<页号>?teacher=…&logo=…（页 1 省略 /1）。
 *
 * @returns 相对路径的授课链接（调用方用 `new URL(href, location.href)` 绝对化）
 */
const buildTeachHref = (): string => {
  const name = teach.name.value.trim();
  const rawPage = Math.trunc(Number(teach.page.value));

  // 起始页：非法输入按 1，越界收回 [1, 总页数]
  const safePage = Number.isNaN(rawPage) ? 1 : Math.max(rawPage, 1);
  const page = Math.min(safePage, currentTotal());
  const mode = logoMode();

  const params = new URLSearchParams();
  if (name) params.set("teacher", name);
  if (mode === "hide") params.set("logo", "hide");
  else if (mode === "custom" && customLogoKey) params.set("logo", customLogoKey);

  const pagePath = page > 1 ? `/${page}` : "";
  const search = params.toString();

  return `/${currentSlug()}${pagePath}${search ? `?${search}` : ""}`;
};

const updateLink = (): void => {
  teach.link.value = new URL(buildTeachHref(), location.href).href;
};

const showLogoCustom = (): void => {
  teach.logoCustom.hidden = logoMode() !== "custom";
};

/**
 * 「本机已保存」列表里的单个 chip：点它直接选用该 key 的 logo。
 *
 * @param saved 本机保存过的 { name: 存储 key, src: dataURL }
 * @returns Chip 按钮元素
 */
const renderSavedChip = (saved: { name: string; src: string }): HTMLButtonElement => {
  const chip = document.createElement("button");

  chip.type = "button";
  chip.className = "teach-saved-chip";
  chip.title = `使用 ${saved.name} 的已保存 logo`;
  chip.innerHTML = `<img src="${saved.src}" alt="" /><span>${saved.name}</span>`;

  const useSaved = (): void => {
    const radio = document.querySelector<HTMLInputElement>(
      'input[name="teach-logo"][value="custom"]',
    );
    if (radio) radio.checked = true;
    customLogoKey = saved.name;
    showLogoCustom();
    teach.logoPreview.src = saved.src;
    teach.logoPreview.hidden = false;
    updateLink();
  };
  chip.addEventListener("click", useSaved);

  return chip;
};

/** 列出本机按姓名保存过的 logo（教师换人选 / 帮他人传时用） */
const renderSavedLogos = (): void => {
  teach.savedList.innerHTML = "";

  const saved: { name: string; src: string }[] = [];
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key == null || !key.startsWith(LOGO_LOCAL_PREFIX)) continue;
      const value = localStorage.getItem(key);
      const isSavedLogo = value != null && value.startsWith("data:image/");
      if (isSavedLogo) saved.push({ name: key.slice(LOGO_LOCAL_PREFIX.length), src: value });
    }
  } catch {
    /* localStorage 不可用时静默，只保留「上传」一条路 */
  }

  teach.saved.hidden = saved.length === 0;
  for (const item of saved) teach.savedList.append(renderSavedChip(item));
};

const saveCustomLogo = (dataUrl: string): void => {
  const name = teach.name.value.trim() || "__custom__";
  customLogoKey = name;

  try {
    localStorage.setItem(LOGO_LOCAL_PREFIX + name, dataUrl);
    renderSavedLogos();
  } catch {
    /* 超出配额等：仅提示，不阻断本次生成链接 */
    teach.logoHint.textContent =
      "⚠️ 本机保存失败（空间不足？），本次仍可生成链接，但换页面后图片会丢失。";
  }
};

const openTeachModal = (): void => {
  renderSavedLogos();
  updateLink();
  showLogoCustom();
  teach.backdrop.hidden = false;
};

const closeTeachModal = (): void => {
  teach.backdrop.hidden = true;
};

/* ---------- 弹窗事件 ---------- */

teach.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!teach.name.value.trim()) {
    teach.name.focus();
    return;
  }
  clampPage();
  window.open(buildTeachHref(), "_blank", "noopener");
  closeTeachModal();
});

(query("#teach-btn") as HTMLButtonElement).addEventListener("click", openTeachModal);
(query("#teach-close") as HTMLButtonElement).addEventListener("click", closeTeachModal);
teach.backdrop.addEventListener("click", (event) => {
  if (event.target === teach.backdrop) closeTeachModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && teach.backdrop.hidden === false) closeTeachModal();
});

teach.name.addEventListener("input", updateLink);
teach.course.addEventListener("change", () => {
  syncPageHint();
  updateLink();
});
teach.page.addEventListener("input", () => {
  clampPage();
  updateLink();
});

document.querySelectorAll<HTMLInputElement>('input[name="teach-logo"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    showLogoCustom();
    updateLink();
  });
});

teach.logoPick.addEventListener("click", () => {
  teach.logoFile.click();
});

teach.logoFile.addEventListener("change", () => {
  const file = teach.logoFile.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    teach.logoHint.textContent = "⚠️ 请选择图片文件（PNG / JPG / SVG）。";
    return;
  }
  if (file.size > LOGO_MAX_BYTES) {
    teach.logoHint.textContent = "⚠️ 图片过大（>1.5MB）。浏览器本地存储有限，请压缩后再试。";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const dataUrl = typeof reader.result === "string" ? reader.result : "";
    if (!dataUrl) return;

    teach.logoPreview.src = dataUrl;
    teach.logoPreview.hidden = false;
    teach.logoHint.textContent = teach.name.value.trim()
      ? `已保存到本机，与「${teach.name.value.trim()}」绑定。`
      : "已选择；填写姓名后再次选择图片即可按姓名保存。";
    saveCustomLogo(dataUrl);
    updateLink();
  });
  reader.readAsDataURL(file);
});

teach.copy.addEventListener("click", () => {
  const url = teach.link.value;
  if (!url) return;

  const feedback = (text: string): void => {
    const original = teach.copy.textContent;
    teach.copy.textContent = text;
    setTimeout(() => {
      teach.copy.textContent = original;
    }, 1600);
  };

  navigator.clipboard
    .writeText(url)
    .then(() => {
      feedback("已复制 ✓");
    })
    .catch(() => {
      teach.link.select();
      feedback("请手动复制（Ctrl+C）");
    });
});

/* ---------- 启动 ---------- */

const yearEl = document.querySelector("#footer-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

renderCourseSelect();
renderTabs();
renderContent();
updateLink();
