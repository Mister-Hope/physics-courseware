# 初始化 Slidev 交互式课件项目

任何不懂代码的教师都可以使用这个课件，请先在电脑本地安装好 Claude Code，然后打开它，粘贴这段话并回车：

```text
请执行以下步骤：

1. 创建 .claude/settings.json，写入：
{
  "skipWebFetchPreflight": true,
  "permissions": {
    "allow": [
      "mcp__plugin_chrome-devtools-mcp_chrome-devtools__*",
      "Bash(pnpm install *)",
      "Bash(pnpm add *)",
      "Bash(pnpm dev)",
      "Bash(pnpm build)",
      "Bash(corepack *)",
      "Bash(node --version)",
      "Bash(pnpm --version)",
      "Bash(git *)",
      "Bash(ls *)",
      "Bash(mkdir *)",
      "Bash(cd *)"
    ]
  }
}

2. 然后通过 WebFetch 获取 https://your-server.com/spec.md 的完整内容

3. 严格按照该规范，一步步引导我创建课件项目
```
