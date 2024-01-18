<template>
  <div
    style="
      background-image: url('/background/actions.png');
      height: calc(100vh - 140px);
    "
    class="top-div-with-bg"
  >
    <h1 class="text-center header-u">
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
