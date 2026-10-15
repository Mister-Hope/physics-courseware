export default {
  cooldown: (pkg) => {
    if (
      ["@mr-hope/", "@oxfmt/", "@oxlint/"].some((prefix) => pkg.startsWith(prefix)) ||
      ["oxc-config-hope", "oxfmt", "oxlint"].includes(pkg)
    )
      return 0;

    return 1;
  },
  workspace: true,
  upgrade: true,
  timeout: 360000,
};
