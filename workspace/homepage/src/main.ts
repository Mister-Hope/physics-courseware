import "./style.css";
import { coursePages } from "virtual:course-pages";

import { textbooks } from "./courses.config";
import type { CourseMeta } from "./courses.config";
import { escapeHtml, highlight, searchCourses } from "./search";
import type { SearchHit } from "./search";

/* ---------- 状态 ---------- */

/**
 * 分册路径：`/bx1/`、`/xx2/` …（`/` 为「全部」）。
 *
 * Tab 用 `history.pushState` 改地址，直接访问该路径即激活对应分册；浏览器前进 / 后退走 popstate。
 */
const bookSlugs = new Set(textbooks.map((group) => group.slug));

/**
 * 从地址栏第一段解析当前分册。
 *
 * @returns 分册 slug；不是分册路径时返回 ''（全部）
 */
const readSlugFromLocation = (): string => {
  const first = location.pathname.split("/")[1] ?? "";

  return bookSlugs.has(first) ? first : "";
};

let activeSlug = readSlugFromLocation();

/** 搜索关键词（已 trim）；空串表示未搜索、按分册浏览 */
let searchQuery = "";

/**
 * 分册对应的地址。
 *
 * @param slug 分册 slug；空字符串表示「全部」
 * @returns 全部是 `/`，其余是 `/<分册 slug>/`
 */
const bookHref = (slug: string): string => (slug === "" ? "/" : `/${slug}/`);

/** 主页「我要上课」把自定义 logo 按姓名存到 localStorage，课件端用同一 key 取（见共享 addon utils/lesson-params.ts） */
const LOGO_LOCAL_PREFIX = "courseware.logo:";
const LOGO_MAX_BYTES = 1.5 * 1024 * 1024;

/* ---------- 渲染 ---------- */

/**
 * 渲染一张课件卡片。
 *
 * @param course 课件元数据
 * @param hit 搜索命中结果：给了就高亮标题 / 标签，并在卡片上标出分册（搜索结果来自全部分册）
 * @returns 卡片 HTML
 */
const renderCourseCard = (course: CourseMeta, hit?: SearchHit): string => {
  const title = hit ? highlight(course.title, hit.titleRanges) : escapeHtml(course.title);
  const tags = course.tags
    .map((tag) => {
      const ranges = hit?.tagRanges.get(tag);

      return `<span class="tag${ranges ? " tag-match" : ""}">${
        ranges ? highlight(tag, ranges) : escapeHtml(tag)
      }</span>`;
    })
    .join("");
  const book = hit ? `<span class="card-book">${escapeHtml(hit.group.shortName)}</span>` : "";

  return `<a class="course-card" href="/${course.slug}/" target="_blank">
      <div class="card-chapter">${escapeHtml(course.chapter)}</div>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${escapeHtml(course.description)}</p>
      <div class="card-footer">
        ${book}
        <div class="card-tags">
          ${tags}
        </div>
      </div>
    </a>`;
};

/**
 * 搜索无结果时的空态。
 *
 * @returns 带一键清除按钮的空态 HTML（避免用户被困在搜索态）
 */
const renderSearchEmpty = (): string =>
  `<div class="group-empty search-empty">
      <p>没有找到与「<span class="search-empty-q">${escapeHtml(searchQuery)}</span>」匹配的课件</p>
      <p class="search-empty-hint">试试更短的关键词，或直接用标签，如「电容」「v-t 图像」「习题课」。</p>
      <button class="search-empty-clear" type="button">清除搜索</button>
    </div>`;

/* ---------- 内容 ---------- */

/** 列表统计行：普通视图显示当前分册数量，搜索态显示命中数与来源分册数 */
const renderMeta = (): void => {
  const meta = document.querySelector<HTMLElement>("#result-meta");
  if (!meta) return;

  if (searchQuery) {
    const hits = searchCourses(searchQuery, textbooks)?.hits ?? [];
    const bookCount = new Set(hits.map((hit) => hit.group.slug)).size;

    // 无结果由列表里的空态说明，统计行让位（免得同一句话说两遍）
    meta.hidden = hits.length === 0;
    meta.textContent =
      hits.length > 0 ? `找到 ${hits.length} 门课件 · 来自 ${bookCount} 个分册` : "";
    return;
  }

  meta.hidden = false;

  const group = textbooks.find((item) => item.slug === activeSlug);
  const total = activeSlug
    ? (group?.courses.length ?? 0)
    : textbooks.reduce((sum, item) => sum + item.courses.length, 0);

  meta.textContent = group ? `${group.name} · 共 ${total} 门课件` : `共 ${total} 门课件`;
};

const renderContent = (): void => {
  const grid = document.querySelector("#course-grid");
  if (!grid) return;

  grid.classList.add("is-flat");

  // 搜索态：全部分册一起搜，结果按相关度排序（卡片上带分册角标）
  if (searchQuery) {
    const hits = searchCourses(searchQuery, textbooks)?.hits ?? [];

    grid.innerHTML =
      hits.length === 0
        ? renderSearchEmpty()
        : hits.map((hit) => renderCourseCard(hit.course, hit)).join("");
    renderMeta();
    return;
  }

  const allCourses = activeSlug
    ? textbooks.filter((g) => g.slug === activeSlug).flatMap((g) => g.courses)
    : textbooks.flatMap((g) => g.courses);

  grid.innerHTML =
    allCourses.length === 0
      ? '<div class="group-empty">暂无课件</div>'
      : allCourses.map((course) => renderCourseCard(course)).join("");
  renderMeta();
};

/* ---------- Tab ────────── */

const renderTabs = (): void => {
  const tabsEl = document.querySelector("#tabs");
  if (!tabsEl) return;

  const allTab = `<a class="tab${activeSlug === "" ? " active" : ""}" href="/" data-slug="">全部</a>`;
  const bookTabs = textbooks
    .map(
      (group) =>
        `<a class="tab${activeSlug === group.slug ? " active" : ""}" href="${bookHref(group.slug)}" data-slug="${group.slug}">${group.shortName}</a>`,
    )
    .join("");

  tabsEl.innerHTML = allTab + bookTabs;
};

/** 浏览器标题栏随分册 / 搜索变化，收藏 / 分享时能看出当前状态 */
const updatePageTitle = (): void => {
  if (searchQuery) {
    document.title = `搜索「${searchQuery}」 · 高中物理人教版课件`;
    return;
  }

  const group = textbooks.find((item) => item.slug === activeSlug);

  document.title = group ? `${group.shortName} · 高中物理人教版课件` : "高中物理人教版课件";
};

/**
 * 切换分册：同步标题、页签与课程卡片（地址栏由调用方改）。
 *
 * @param slug 分册 slug；空字符串表示「全部」
 */
const setActiveSlug = (slug: string): void => {
  activeSlug = slug;
  updatePageTitle();
  renderTabs();
  renderContent();
};

/** 页签点击：改地址栏（可收藏 / 分享 / 新标签页打开）并切换内容 */
const bindTabs = (): void => {
  const tabsEl = document.querySelector<HTMLElement>("#tabs");
  if (!tabsEl) return;

  tabsEl.addEventListener("click", (event) => {
    // 保留 Ctrl / ⌘ / Shift / 中键的浏览器原生行为（新标签页打开该分册）
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;

    const tab = (event.target as Element | null)?.closest<HTMLAnchorElement>(".tab");
    if (!tab) return;

    event.preventDefault();

    const slug = tab.dataset.slug ?? "";
    if (slug === activeSlug) return;

    history.pushState({ slug }, "", bookHref(slug));
    setActiveSlug(slug);
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

/* ---------- 搜索 ---------- */

const search = {
  input: query("#course-search") as HTMLInputElement,
  clear: query("#search-clear") as HTMLButtonElement,
  box: query(".search-box") as HTMLDivElement,
  tabs: query("#tabs"),
};

/** 中文输入法组合输入中：此时不重绘，等组合结束再搜 */
let isComposing = false;

/**
 * 从地址栏读取搜索词（`?q=…`）。
 *
 * @returns 搜索词；没有时返回空串
 */
const readQueryFromLocation = (): string =>
  (new URLSearchParams(location.search).get("q") ?? "").trim();

/**
 * 把搜索词同步进地址栏（replaceState：不新增历史记录，刷新 / 分享能恢复）。
 *
 * @param value 搜索词；空串表示从地址栏移除 `?q=`
 */
const syncQueryToLocation = (value: string): void => {
  const url = new URL(location.href);

  if (value) url.searchParams.set("q", value);
  else url.searchParams.delete("q");

  history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
};

/**
 * 应用搜索词并重绘：空词回到分册视图。
 *
 * @param raw 输入框原文
 * @param options 选项
 * @param options.fromInput 来自输入框：不回写 value（避免打断光标 / 输入法）
 * @param options.syncUrl 是否把关键词同步进地址栏
 */
const applySearch = (
  raw: string,
  options: { fromInput?: boolean; syncUrl?: boolean } = {},
): void => {
  const value = raw.trim();
  const isSearching = value !== "";

  searchQuery = value;
  if (!options.fromInput) search.input.value = value;
  search.clear.hidden = !isSearching;
  search.box.classList.toggle("has-value", isSearching);
  // 搜索是全局的（跨分册），搜索态让分册页签让位，避免「当前分册」与全局结果打架
  search.tabs.hidden = isSearching;

  updatePageTitle();
  renderContent();

  if (options.syncUrl !== false) syncQueryToLocation(value);
};

/** 清空搜索，回到当前分册视图 */
const clearSearch = (): void => {
  search.input.value = "";
  applySearch("");
  search.input.focus();
};

const bindSearch = (): void => {
  search.input.addEventListener("compositionstart", () => {
    isComposing = true;
  });
  search.input.addEventListener("compositionend", () => {
    isComposing = false;
    applySearch(search.input.value, { fromInput: true });
  });
  search.input.addEventListener("input", (event) => {
    // 中文输入法拼写阶段不要打断，等组合结束（或拼音已上屏的 input）再搜
    if (isComposing || event.isComposing) return;

    applySearch(search.input.value, { fromInput: true });
  });
  search.input.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && search.input.value) {
      event.preventDefault();
      clearSearch();
    }
  });

  search.clear.addEventListener("click", clearSearch);
  // 空态是动态渲染的，用事件委托接「清除搜索」
  document.querySelector("#course-grid")?.addEventListener("click", (event) => {
    if ((event.target as Element | null)?.closest(".search-empty-clear")) {
      event.preventDefault();
      clearSearch();
    }
  });

  // 全局快捷键：`/` 聚焦搜索框（正在输入或弹窗打开时不抢键）
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;

    const target = event.target as Element | null;
    if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
    if (teach.backdrop.hidden === false) return;

    event.preventDefault();
    search.input.focus();
    search.input.select();
  });
};

// 浏览器前进 / 后退：分册与搜索词都从地址栏重新解析
globalThis.addEventListener("popstate", () => {
  setActiveSlug(readSlugFromLocation());
  applySearch(readQueryFromLocation(), { syncUrl: false });
});

/* ---------- 启动 ---------- */

const yearEl = document.querySelector("#footer-year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

renderCourseSelect();
bindTabs();
bindSearch();
setActiveSlug(activeSlug);
applySearch(readQueryFromLocation(), { syncUrl: false });
updateLink();
