import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  build: {
    transpile: ["vue-i18n"],
  },
  css: [
    "/assets/css/div.css",
    "/assets/css/title.css",
    "/assets/css/utils.css",
  ],
  modules: [
    "@nuxtjs/google-fonts",
    "nuxt-gtag",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "vuetify-nuxt-module",
    "nuxt-marquee",
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
      "Protest Guerrilla": true,
      Galada: true,
      "Yatara One": true,
      Comfortaa: true,
    },
    display: "swap",
    overwriting: true,
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
  gtag: { id: process.env.NODE_ENV === "production" ? "G-0HQQD54YMS" : "" },
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "/admin",
    },
  },
  site: {
    url: "https://thinkforall-linkall.com",
  },
  sitemap: {
    exclude: ["/admin"],
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {},
  },
  imports: {
    presets: [
      {
        from: "vue-i18n",
        imports: ["useI18n"],
      },
      {
        from: "vuetify",
        imports: ["useDisplay"],
      },
      {
        from: "firebase/database",
        imports: [
          "onValue",
          "set",
          "update",
          "push",
          ["ref", "dbRef"],
          "DataSnapshot",
        ],
      },
    ],
  },
});
