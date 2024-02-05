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
    "@vite-pwa/nuxt",
    "nuxt-gtag",
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
  pwa: {
    manifest: {
      name: "Think for All - LinkAll",
      short_name: "LinkAll",
      description:
        "LinkAll is a nongovernmental, nonprofit organization established in 2024, under the fundamental purpose of spreading the real meaning of donation and simplifying the action for the whole humanity to participate.",
      lang: "ko",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      dir: "ltr",
      icons: [
        {
          src: "/icon/icon.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "/icon/144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
      ],
      screenshots: [
        {
          src: "/screenshot/desktop.png",
          sizes: "2554x1314",
          type: "image/png",
          form_factor: "wide",
        },
        {
          src: "/screenshot/mobile.png",
          sizes: "1074x1216",
          type: "image/png",
          form_factor: "narrow",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  experimental: {
    payloadExtraction: true,
    viewTransition: true,
    typedPages: true,
  },
  sourcemap: {
    server: false,
    client: false,
  },
  gtag: { id: "G-0HQQD54YMS" },
});
 