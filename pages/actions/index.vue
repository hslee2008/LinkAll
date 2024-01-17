<template>
  <div
    style="
      margin-top: 140px;
      padding-top: 50px;
      padding-bottom: 50px;
      width: 100vw;
      height: calc(100vh - 140px);
      background-image: url('/actions.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    "
  >
    <h1 class="text-center" style="font-size: 50px; text-decoration: underline">
      {{ t("actions") }}
    </h1>

    <br />

    <div class="text-center">
      <v-btn width="300" height="50" to="/actions/education">
        {{ t("education") }}
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="50">
        {{ t("coming soon") }}
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="50">
        {{ t("coming soon") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: t("actions"),
});
</script>
