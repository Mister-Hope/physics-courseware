/**
 * 授课参数（主页「我要上课」把教师身份拼进课件 URL 的 query，课件端在这里统一解析）：
 *
 * ?teacher=<姓名> 封面「授课教师」行：URL 里的姓名优先，缺省用课件 frontmatter 的 teacher（默认张伯望） ?logo=<...> 顶栏校徽三态： - 缺省 →
 * 东北育才（共享 assets/logo.png） - hide → 隐藏 logo - <姓名 / 任意 key> → 取 localStorage 里
 * `courseware.logo:<key>` （主页上传图片时按姓名保存）； 本机没有该 key 的数据 → 隐藏（不回退校徽、不打扰课堂）
 *
 * 为什么姓名进 URL、图片不进 URL：base64 图片放进 URL 会达到几十 KB～几百 KB， 生产 nginx 请求行默认约 32KB 上限会直接 414；姓名只有几十字节，走 URL
 * 让 「换电脑 / 分享 / 同机多教师」都成立。图片按姓名存 localStorage（同机互不覆盖、 换机优雅降级），URL 只带短 key。
 *
 * 为什么课件端读取一次即可：Slidev 的导航（useNav.go）会原样保留 query 参数， 一整节课里翻页 query 不变，组件在 setup 时解析一次足够。
 */

const SAVED_LOGO_PREFIX = "courseware.logo:";

export interface LessonParams {
  /** URL 里的教师姓名（已解码），无则 undefined */
  teacher?: string;
  /** URL 里的 logo 参数：'hide' 或本地存储 key，无则 undefined */
  logo?: string;
}

const readParams = (search: string): LessonParams => {
  const params = new URLSearchParams(search);
  const result: LessonParams = {};

  const teacher = params.get("teacher")?.trim();
  if (teacher) result.teacher = teacher;

  const logo = params.get("logo")?.trim();
  if (logo) result.logo = logo;

  return result;
};

/** 当前课件 URL 的授课参数（模块加载即解析；SPA 内 query 不再变化） */
export const lessonParams: LessonParams = readParams(
  typeof location === "undefined" ? "" : location.search,
);

/**
 * 取本机按 <key> 保存过的 logo（dataURL），没有则 undefined。 localStorage 可能被隐私模式禁用，一律 try/catch 静默降级。
 *
 * @param key 保存时的键（主页按教师姓名写入）
 * @returns 保存过的 dataURL；本机没有该 key 或不可用时为 undefined
 */
export const getSavedLogo = (key: string): string | undefined => {
  let saved: string | undefined;

  try {
    const raw = localStorage.getItem(SAVED_LOGO_PREFIX + key);

    if (raw?.startsWith("data:image/")) saved = raw;
  } catch {
    /* localStorage 不可用：静默降级为「未保存」 */
  }

  return saved;
};
