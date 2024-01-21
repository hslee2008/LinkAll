<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("committees") }}
    </h1>

    <div class="d-flex justify-center mt-6">
      <div>
        <div class="d-flex">
          <div class="mr-7">
            <v-sheet elevation="10" class="rounded-lg">
              <v-img
                src="/members/junho.jpeg"
                style="width: 150px; height: 198px"
                class="mb-3 rounded-lg"
              ></v-img>
            </v-sheet>
            <p class="text-center text-h6">{{ t("Junho Hwang") }}</p>
          </div>

          <div class="ml-7">
            <v-sheet elevation="10" class="rounded-lg">
              <v-img
                src="/members/hyunseung.jpg"
                style="width: 150px; height: 198px"
                class="mb-3 rounded-lg"
              ></v-img>
            </v-sheet>
            <p class="text-center text-h6">{{ t("Hyunseung Lee") }}</p>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: t("committees"),
});
</script>
