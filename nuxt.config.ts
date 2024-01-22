import vuetify from "vite-plugin-vuetify";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify", "vue-i18n"],
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",

    "/assets/css/div.css",
    "/assets/css/title.css",
    "/assets/css/screen.css",
  ],
  modules: [
    (_, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: any) =>
        config.plugins.push(vuetify({}))
      );
    },
    "@nuxtjs/google-fonts",
  ],
  vite: {
    resolve: {
      alias: {
        "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",
      },
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },
  googleFonts: {
    families: {
      "Libre Baskerville": true,
      "Grape Nuts": true,
      "Noto Serif": true,
    },
    display: "swap",
  },
});
