<template>
  <div
    style="
      background-image: url('/background/education.png');
      height: calc(100vh - 140px);
    "
    class="top-div-with-bg"
  >
    <h1 class="text-center header-u">
      {{ t("education") }}
    </h1>

    <v-card width="500" class="ml-10 mt-8" elevation="8">
      <v-card-item>
        <v-card-title>English</v-card-title>
        <v-card-subtitle>This is a subtitle</v-card-subtitle>
      </v-card-item>

      <v-card-text class="ml-6 d-flex" style="gap: 60px">
        <div>
          <ul>
            <li>
              <a href="/video-player?video=temp&title=LinkAll-Reading-Project">
                LinkAll Reading Project
              </a>
            </li>
            <li>Become a writer!</li>
          </ul>
        </div>

        <div>
          <ul>
            <li>Debating Startup</li>
            <li>Journey to Knowledge</li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: t("education"),
});
</script>

<style scoped>
a {
  color: #1976d2;
  text-decoration: none;
}

a:hover {
  color: #2196f3;
  text-decoration: underline;
}
</style>
