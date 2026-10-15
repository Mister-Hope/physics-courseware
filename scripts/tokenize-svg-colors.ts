import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * `pnpm tokenize:svg-colors` —— 把 `<svg>` 表现属性里的**字面色值**换成设计 token。
 *
 * 依据：SVG 2 §6.6（表现属性的值按 CSS 值解析）+ CSS Variables §3（`var()` 可替换任何 CSS 值中的任意部分） ⇒
 * `fill="var(--c-velocity)"` 合法；带透明度的 `rgba()` 换成 `color-mix(in srgb, var(--tok) N%, transparent)`，
 * 两者都已在浏览器里实测可解析、且 UnoCSS 不会因此生成任何鬼规则。
 *
 * 只改**属性值**，不碰 `<style>` 块与 `style.css`（那些由各批次的样式统一负责）。 只映射"值与 token 逐字节等值"的写法 ⇒ 纯机械、零视觉变化。
 *
 * ```bash
 * pnpm tokenize:svg-colors            # 只统计（dry-run）
 * pnpm tokenize:svg-colors --write    # 落盘
 * ```
 *
 * ⚠️ 落盘前确认没有子代理在写同一批课件（一次改全仓 30+ 门课的文件）。
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const ATTRS = ["fill", "stroke", "stop-color", "flood-color"] as const;

/**
 * Token → 它的颜色值。`common.css` / `atoms.css` 里的正本 + 为"插画中性色阶"新补的那批。 同一个值有多个 token 时只列**一个**（映射目标）：
 *
 * - `#f87171` 既是 `--c-danger` 也是 `--c-force`（同值）⇒ 按「力一律红」映射到 `--c-force`； HTML/CSS 里的危险/错误语义仍走
 *   `--c-danger`（由各课样式统一负责）。
 */
const TOKEN_COLORS: Record<string, string> = {
  // 设计 token（common.css / atoms.css 正本）
  "--c-accent": "#e2a846",
  "--c-accent-glow": "#f59e0b",
  "--c-accent-2": "#3b82f6",
  "--c-accent-2-glow": "#2563eb",
  "--c-accent-light": "#fbbf24",
  "--c-velocity": "#60a5fa",
  "--c-velocity-light": "#93c5fd",
  "--c-force": "#f87171",
  "--c-physics": "#2dd4bf",
  "--c-physics-light": "#38bdf8",
  "--c-ok": "#34d399",
  "--c-text": "#f1f5f9",
  "--c-text-dim": "#94a3b8",
  "--c-bg": "#090d1a",
  "--c-bg-soft": "#0f1425",
  "--c-surface-solid": "#1e293b",
  // 插画中性色阶（Tailwind slate 系）
  "--c-neutral-50": "#f8fafc",
  "--c-neutral-200": "#e2e8f0",
  "--c-neutral-300": "#cbd5e1",
  "--c-neutral-500": "#64748b",
  "--c-neutral-600": "#475569",
  "--c-neutral-700": "#334155",
  "--c-neutral-900": "#0f172a",
};

/** `#34d399` 与 `#4ade80` 是同一个"正确"语义的双轨，统一到 `--c-ok` */
const EXTRA_HEX: Record<string, string> = { "#4ade80": "--c-ok" };

const toRgb = (hex: string): string => {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;

  return [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16)).join(",");
};

const HEX_TO_TOKEN = new Map<string, string>();

for (const [token, hex] of Object.entries(TOKEN_COLORS))
  if (!HEX_TO_TOKEN.has(hex)) HEX_TO_TOKEN.set(hex, token);
for (const [hex, token] of Object.entries(EXTRA_HEX))
  if (!HEX_TO_TOKEN.has(hex)) HEX_TO_TOKEN.set(hex, token);

const RGB_TO_TOKEN = new Map<string, string>();

for (const [hex, token] of HEX_TO_TOKEN)
  if (!RGB_TO_TOKEN.has(toRgb(hex))) RGB_TO_TOKEN.set(toRgb(hex), token);

/** `var(--x, #hex)` 兜底形式 → 去掉兜底值 */
const FALLBACK_RE = /^var\((?<name>--c-[a-z0-9-]+),\s*[^)]+\)$/u;
const RGB_RE =
  /^rgba?\(\s*(?<r>\d+)\s*,\s*(?<g>\d+)\s*,\s*(?<b>\d+)\s*(?:,\s*(?<alpha>[\d.]+)\s*)?\)$/u;

const formatAlpha = (alpha: number): string => `${Number((alpha * 100).toFixed(2))}%`;

const write = process.argv.includes("--write");

const collectFiles = (): string[] => {
  const courses = path.join(ROOT, "courses");
  const files: string[] = [];

  for (const entry of readdirSync(courses)) {
    if (entry.startsWith(".")) continue;

    const dir = path.join(courses, entry);
    if (!statSync(dir).isDirectory()) continue;

    const slides = path.join(dir, "slides.md");
    try {
      statSync(slides);
      files.push(slides);
    } catch {
      // 没 slides.md 的目录跳过
    }

    const components = path.join(dir, "components");
    try {
      for (const name of readdirSync(components))
        if (name.endsWith(".vue")) files.push(path.join(components, name));
    } catch {
      // 没有 components 目录
    }
  }

  return files;
};

/**
 * 把一个属性值翻译成 token 写法；不认识就返回 null（= 不修改）
 *
 * @param value SVG 表现属性的字面值（如 `#60a5fa`、`rgba(96,165,250,0.5)`、`var(--c-velocity, #60a5fa)`）
 * @returns 等价的 token 写法；不认识时返回 null
 */
const translate = (value: string): string | null => {
  const fallbackName = FALLBACK_RE.exec(value)?.groups?.name;

  if (fallbackName) return `var(${fallbackName})`;

  const token = HEX_TO_TOKEN.get(value.toLowerCase());

  if (token) return `var(${token})`;

  const groups = RGB_RE.exec(value)?.groups;

  if (!groups) return null;

  const mapped = RGB_TO_TOKEN.get(`${groups.r},${groups.g},${groups.b}`);

  if (!mapped) return null;

  const alphaRaw = groups.alpha;

  if (!alphaRaw) return `var(${mapped})`;

  const alpha = Number(alphaRaw);

  if (!Number.isFinite(alpha) || alpha >= 1) return `var(${mapped})`;
  if (alpha <= 0) return null;

  return `color-mix(in srgb, var(${mapped}) ${formatAlpha(alpha)}, transparent)`;
};

const totals = new Map<string, number>();
let changedFiles = 0;
let changedAttributes = 0;

for (const file of collectFiles()) {
  const source = readFileSync(file, "utf8");
  let hits = 0;

  const next = source.replaceAll(
    new RegExp(`(${ATTRS.join("|")})="([^"]*)"`, "gu"),
    (match, attr: string, value: string) => {
      const translated = translate(value);

      if (translated == null || translated === value) return match;

      hits += 1;
      const bucket = value.startsWith("var(") ? "去兜底值" : value;
      totals.set(bucket, (totals.get(bucket) ?? 0) + 1);
      return `${attr}="${translated}"`;
    },
  );

  if (hits === 0) continue;

  changedFiles += 1;
  changedAttributes += hits;

  if (write) writeFileSync(file, next);
  console.log(`${write ? "✏️ " : "· "}${path.relative(ROOT, file)}：${hits} 处`);
}

console.log(
  `\n${write ? "已写入" : "dry-run"}：${changedFiles} 个文件、${changedAttributes} 处属性`,
);
console.log("\n按值统计（前 30）：");

for (const [key, count] of [...totals].sort((a, b) => b[1] - a[1]).slice(0, 30))
  console.log(`  ${String(count).padStart(5)}  ${key}`);

if (!write) {
  console.log(
    "\n提示：`--write` 落盘前确认没有子代理正在写课件；落盘后逐课跑 e2e + `pnpm build` 复验。",
  );
}
