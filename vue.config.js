module.exports = {
  pluginOptions: {
    i18n: {
      locale: "sv",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/_colors.scss"; @import "@/styles/_breakpoints.scss"; @import "@/styles/_containers.scss";`,
      }
    }
  }
};
