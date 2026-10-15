/**
 * 设计 token 的颜色正本（**唯一定义处**：`workspace/shared/styles/common.css` 的 `:root`）。
 *
 * 两个用途共用这一份，避免"审计一套、codemod 另一套"：
 *
 * - `scripts/style-audit.ts`：判断"写死的色值是不是本来就是某个 token"（是 → 硬错误；不是 → 观察配色是否跑偏）
 * - `scripts/tokenize-svg-colors.ts`：把 SVG 表现属性里的字面色值换成 `var(--c-*)`
 */

/** Token → 颜色值。同一个值有多个 token 时只列"映射目标"一个 */
export const TOKEN_COLORS: Record<string, string> = {
  // ── 语义主色（common.css 正本）──
  "--c-accent": "#e2a846",
  "--c-accent-glow": "#f59e0b",
  "--c-accent-2": "#3b82f6",
  "--c-accent-2-glow": "#2563eb",
  "--c-accent-light": "#fbbf24",
  "--c-velocity": "#60a5fa",
  "--c-velocity-light": "#93c5fd",
  // `#f87171` 既是 --c-danger 也是 --c-force（同值）：CSS 语义用 --c-danger，SVG 里的"力"用 --c-force
  "--c-danger": "#f87171",
  "--c-physics": "#2dd4bf",
  "--c-physics-light": "#38bdf8",
  "--c-ok": "#34d399",
  "--c-text": "#f1f5f9",
  "--c-text-dim": "#94a3b8",
  "--c-bg": "#090d1a",
  "--c-bg-soft": "#0f1425",
  "--c-surface-solid": "#1e293b",
  // ── 中性色阶 ──
  "--c-neutral-50": "#f8fafc",
  "--c-neutral-200": "#e2e8f0",
  "--c-neutral-300": "#cbd5e1",
  "--c-neutral-500": "#64748b",
  "--c-neutral-600": "#475569",
  "--c-neutral-700": "#334155",
  "--c-neutral-900": "#0f172a",
};

/** `#34d399` 与 `#4ade80` 是同一个"正确"语义的双轨，统一到 `--c-ok` */
const ALIASES: Record<string, string> = { "#4ade80": "--c-ok" };

const expandHex = (value: string): string | null => {
  const raw = value.trim().toLowerCase();

  if (!/^#[0-9a-f]{3}$|^#[0-9a-f]{6}$/u.test(raw)) return null;

  if (raw.length === 4) {
    return `#${raw
      .slice(1)
      .split("")
      .map((c) => c + c)
      .join("")}`;
  }

  return raw;
};

export interface ParsedColor {
  /** 归一化的 6 位小写 hex；认不出返回 null */
  hex: string | null;
  /** 0–1 的透明度；不写就是 1 */
  alpha: number;
}

// 0–255 的通道值 → 两位小写 hex
const toHex = (part: string): string =>
  Math.max(0, Math.min(255, Number(part)))
    .toString(16)
    .padStart(2, "0");

// `50%` / `0.5` → 0.5；没写透明度、或写成认不出的值时按不透明（1）处理
const parseAlpha = (raw: string | undefined): number => {
  if (!raw) return 1;

  const percent = raw.endsWith("%");
  const value = Number(percent ? raw.slice(0, -1) : raw) / (percent ? 100 : 1);

  return Number.isFinite(value) ? value : 1;
};

/**
 * 认一个 CSS 颜色字面值：`#abc` / `#aabbcc` / `rgb(r,g,b)` / `rgb(r g b)` / `rgb(r g b / a%)`。
 *
 * @param value 一个 CSS 颜色字面值
 * @returns 归一化的 hex（认不出的复杂函数为 null）与 0–1 的透明度
 */
export const parseColor = (value: string): ParsedColor => {
  const input = value.trim();

  const hex = expandHex(input);

  if (hex) return { hex, alpha: 1 };

  const rgb =
    /^rgba?\(\s*(?<r>\d+)[\s,]+(?<g>\d+)[\s,]+(?<b>\d+)\s*(?:[/,]\s*(?<alpha>[\d.]+%?)\s*)?\)$/iu.exec(
      input,
    );

  if (!rgb?.groups) return { hex: null, alpha: 1 };

  const { r, g, b, alpha: alphaRaw } = rgb.groups;

  return {
    hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
    alpha: parseAlpha(alphaRaw),
  };
};

const tokenOfTokenValue = new Map<string, string>();

for (const [token, value] of Object.entries(TOKEN_COLORS)) {
  const hex = expandHex(value);

  if (hex && !tokenOfTokenValue.has(hex)) tokenOfTokenValue.set(hex, token);
}

for (const [value, token] of Object.entries(ALIASES)) {
  const hex = expandHex(value);

  if (hex && !tokenOfTokenValue.has(hex)) tokenOfTokenValue.set(hex, token);
}

/**
 * Hex（含 3 位写法）→ token 名。
 *
 * @param value Hex 色值（3 位或 6 位写法）
 * @returns 对应的 token 名；不在 token 表里则为 null
 */
export const tokenOfHex = (value: string): string | null => {
  const hex = expandHex(value);

  if (!hex) return null;

  return ALIASES[hex] ?? tokenOfTokenValue.get(hex) ?? null;
};

/**
 * UnoCSS / Tailwind 调色板里**取值与 token 完全相同**的那几档 → token。
 *
 * 用途：`text-emerald-400` 和 `#34d399` 是同一件事，都是"绕过 token 写死颜色"； 审计里按同一条规则处理（色值等于已存在 token ⇒ 硬错误）。
 * 判据：值逐字节相等才算，避免"看着差不多"的误报。
 */
export const PALETTE_TO_TOKEN: Record<string, string> = {
  "slate-50": "--c-neutral-50",
  "slate-100": "--c-text",
  "slate-200": "--c-neutral-200",
  "slate-300": "--c-neutral-300",
  "slate-400": "--c-text-dim",
  "slate-500": "--c-neutral-500",
  "slate-600": "--c-neutral-600",
  "slate-700": "--c-neutral-700",
  "slate-800": "--c-surface-solid",
  "slate-900": "--c-neutral-900",
  "blue-300": "--c-velocity-light",
  "blue-400": "--c-velocity",
  "blue-500": "--c-accent-2",
  "blue-600": "--c-accent-2-glow",
  "red-400": "--c-danger",
  "amber-400": "--c-accent-light",
  "amber-500": "--c-accent-glow",
  "emerald-400": "--c-ok",
  "teal-400": "--c-physics",
  "sky-400": "--c-physics-light",
};

/** 调色板工具类的通用形状：`text-slate-400` / `bg-blue-500/20` / `border-amber-500` … */
export const PALETTE_CLASS =
  /\b(?:text|bg|border|ring|outline|fill|stroke|decoration|from|via|to|shadow|divide|accent|caret|placeholder)-(?<family>slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?<shade>50|100|200|300|400|500|600|700|800|900|950)\b/gu;
