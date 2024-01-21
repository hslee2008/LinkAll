<template>
  <v-parallax src="/background/original.png" :height="windowHeight">
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>

    <div class="d-flex justify-center align-center index" style="width: 100%">
      <div style="width: 100%">
        <h1 class="text-center font-weight-medium text-h3">Think for All</h1>
        <h1 class="text-center font-weight-bold text-h1 mt-3 mb-10">
          Link All
        </h1>

        <div class="d-flex justify-center mb-6 mt-5">
          <v-btn
            rounded="lg"
            to="/join-us/donation"
            color="primary"
            height="75"
          >
            <h2>
              <v-icon start>mdi-gift</v-icon>
              {{ $t("donate") }}
              <v-icon end>mdi-gift</v-icon>
            </h2>
          </v-btn>
        </div>

        <div class="d-flex justify-center container" style="gap: 50px">
          <div class="text-center" elevation="10">
            <p class="headline">0</p>
            <p class="text">{{ $t("taught_students") }}</p>
          </div>

          <div class="text-center" elevation="10">
            <p class="headline">0</p>
            <p class="text">{{ $t("won_donated") }}</p>
          </div>

          <div class="text-center" elevation="10">
            <p class="headline">0</p>
            <p class="text">{{ $t("hours_of_volunteering") }}</p>
          </div>
        </div>
      </div>
    </div>
  </v-parallax>

  <br />

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8" height="400px" to="/class/english">
          <v-card-text class="headline text-center"> English </v-card-text>

          <v-card-text class="d-flex justify-center align-center h-75 text-h3">
            Click<br /><br /><br />
            to see<br /><br /><br />
            test page
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8" height="400px">
          <v-card-text class="headline text-center"> Korean </v-card-text>

          <v-card-text class="d-flex justify-center align-center h-75 text-h3">
            Coming Soon
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8" height="400px">
          <v-card-text class="headline text-center"> Arts </v-card-text>

          <v-card-text class="d-flex justify-center align-center h-75 text-h3">
            Coming Soon
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8" height="400px">
          <v-card-text class="headline text-center"> Tech </v-card-text>

          <v-card-text class="d-flex justify-center align-center h-75 text-h3">
            Coming Soon
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <br />

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-img src="/background/background.png" class="rounded-lg">
          <div class="d-flex justify-center align-center h-100">
            <h1 class="text-h1">Coming</h1>
          </div>
        </v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img src="/background/background.png" class="rounded-lg">
          <div class="d-flex justify-center align-center h-100">
            <h1 class="text-h1">Very</h1>
          </div>
        </v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img src="/background/background.png" class="rounded-lg">
          <div class="d-flex justify-center align-center h-100">
            <h1 class="text-h1">Soon</h1>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>

  <br />

  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div>
      <v-btn
        class="mx-4"
        icon="mdi-gmail"
        variant="text"
        href="mailto:linkallcommunity@gmail.com"
        target="_blank"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-instagram"
        variant="text"
        href="https://www.instagram.com/linkall2024/"
        target="_blank"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-youtube"
        variant="text"
        href="https://www.youtube.com/@LinkAllCommunity"
        target="_blank"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div>
      Copyright © LinkAll {{ new Date().getFullYear() }} — All rights reserved
    </div>
  </v-footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { onValue, ref as dbRef, set } from "firebase/database";

const { $db } = useNuxtApp();
const { t } = useI18n();

const windowHeight = ref(0);

onMounted(() => (windowHeight.value = window.innerHeight));

useHead({
  title: "LinkAll - " + t("home"),
});
</script>

<style scoped>
.headline {
  font-weight: 900;
  font-size: 40px;
  padding-top: 30px;
}

@media (max-width: 600px) {
  .headline {
    font-size: 25px;
  }

  .text-h1 {
    font-size: 10px;
  }

  .container {
    flex-direction: column;
    width: 100%;
  }
}

p > a {
  color: #1976d2;
  text-decoration: none;
}

p > a:hover {
  color: #2196f3;
  text-decoration: underline;
}

.index {
  margin-top: 175px;
}

@media (max-width: 1275px) {
  .index {
    margin-top: 100px;
  }
}
</style>
