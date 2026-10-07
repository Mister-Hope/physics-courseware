import { defineHopeConfig } from "oxc-config-hope/oxfmt";

export default defineHopeConfig({
  ignorePatterns: [".agents/skills/"],
  overrides: [
    {
      files: ["*Svg.vue"],
      options: {
        printWidth: 160,
      },
    },
  ],
});
