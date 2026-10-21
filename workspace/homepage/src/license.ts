/**
 * 授权协议页的「活」部分：把页脚年份填成当前年份。
 *
 * 页面内容本身是静态中文说明，只有年份需要每年更新，其余直接改 index.html。
 */
const yearEl = document.querySelector("#license-year");

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// 本文件是页面入口脚本，没有 import / export；显式标记为模块，避免被当作全局脚本
export {};
