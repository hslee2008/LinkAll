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

    <DivCenter>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="3">
            <v-card elevation="8" to="/class/english">
              <v-card-text class="headline text-center"> English </v-card-text>

              <v-card-text class="text-h6">
                LinkAll English Book Club Open!
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="8" height="200px" width="200px">
              <v-card-text class="headline text-center"> Korean </v-card-text>

              <v-card-text
                class="d-flex justify-center align-center h-75 text-h6"
              >
                Coming Soon
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="8" height="200px" width="200px">
              <v-card-text class="headline text-center"> Arts </v-card-text>

              <v-card-text
                class="d-flex justify-center align-center h-75 text-h6"
              >
                Coming Soon
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-card elevation="8" height="200px" width="200px">
              <v-card-text class="headline text-center"> Tech </v-card-text>

              <v-card-text
                class="d-flex justify-center align-center h-75 text-h6"
              >
                Coming Soon
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </DivCenter>
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
