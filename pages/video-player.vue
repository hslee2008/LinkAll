<template>
  <div style="margin-top: calc(50vh - 180px)" class="d-flex justify-center">
    <video width="900" controls>
      <source :src="`/video/${video}.mp4`" type="video/mp4" />
      Your browser does not support HTML video.
    </video>
  </div>

  <br />

  <div>
    <h1 class="text-center mb-10" style="text-decoration: underline">
      {{ title.replaceAll("-", " ") }}
    </h1>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const route = useRoute();
const { video, title } = route.query;

useHead({
  title: t("video player"),
});
</script>
