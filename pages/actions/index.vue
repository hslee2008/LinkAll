<template>
  <div
    style="background-image: url('/background/actions.png')"
    class="top-div-with-bg"
  >
    <div>
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
        <br />
        <br />
        <v-btn width="300" height="50">
          {{ t("coming soon") }}
        </v-btn>
      </div>
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

<style scoped>
.top-div-with-bg {
  height: calc(100vh - 140px);
}

@media (max-width: 1265px) {
  .top-div-with-bg {
    height: calc(100vh - 65px);
  }
}
</style>
