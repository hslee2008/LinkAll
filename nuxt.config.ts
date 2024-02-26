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
    "@vite-pwa/nuxt",
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
    },
    display: "swap",
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
      {
        from: "firebase/auth",
        imports: ["getAuth"],
      },
    ],
  },
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) return;

      nitroConfig.prerender?.routes?.push("/class/english/book-club");
      nitroConfig.prerender?.routes?.push("/class/english/debate");
      nitroConfig.prerender?.routes?.push("/class/math/geometry");
      nitroConfig.prerender?.routes?.push("/class/math/logical-math");
    },
  },
  pwa: {
    manifest: {
      name: "Think for All - LinkAll",
      short_name: "LinkAll",
      description:
        "LinkAll is a nongovernmental, nonprofit organization established in January 2024, under the fundamental purpose of giving primary education for all students around the world, starting from South Korea. We wish to minimize the educational gap, and provide elemental happiness towards all children.",
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
          src: "/icon/logo.png",
          sizes: "1080x1080",
          type: "image/png",
        },
        {
          src: "/icon/512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icon/192x192.png",
          sizes: "192x192",
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
});
