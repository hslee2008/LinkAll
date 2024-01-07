import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  modules: [
    (_, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: any) =>
        config.plugins.push(vuetify({}))
      );
    },
  ],
});
