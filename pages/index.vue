<template>
  <v-parallax dark src="/background/background.png" :height="windowHeight">
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>

    <v-col class="d-flex justify-center align-center" style="margin-top: 165px">
      <div>
        <h1 style="text-align: center; font-weight: 700; font-size: 60px">
          Think for All
        </h1>
        <h1 style="text-align: center; font-weight: 900; font-size: 70px">
          Link All
        </h1>

        <div class="d-flex justify-center mb-6 mt-5">
          <v-btn rounded="lg" to="/join-us/donation" color="primary" height="75">
            <h2>
              <v-icon start>mdi-gift</v-icon>
              {{ $t("donate") }}
              <v-icon end>mdi-gift</v-icon>
            </h2>
          </v-btn>
        </div>

        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
              <div class="text-center" elevation="10">
                <v-card-text class="headline"> 0 </v-card-text>

                <v-card-text> {{ $t("taught_students") }} </v-card-text>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <div class="text-center" elevation="10">
                <v-card-text class="headline"> 0 </v-card-text>

                <v-card-text> {{ $t("won_donated") }} </v-card-text>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <div class="text-center" elevation="10">
                <v-card-text class="headline"> 0 </v-card-text>

                <v-card-text> {{ $t("hours_of_volunteering") }} </v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-col>
  </v-parallax>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> English </v-card-text>

          <v-card-text>
            <p>
              <a href="/video-player?video=temp&title=LinkAll-Reading-Project">
                1. LinkAll Reading Project
              </a>
            </p>
            <p>2. Become a writer!</p>
            <p>3. Debating Startup</p>
            <p>4. Journey to Knowledge</p>
          </v-card-text>

          <v-card
            v-if="schedule?.English"
            variant="tonal"
            class="ma-3"
            :href="schedule?.English.link"
            target="_blank"
          >
            <v-card-title>
              <v-icon start>mdi-laptop-account</v-icon> {{ t("class") }} ({{
                schedule.English.date
              }})
            </v-card-title>

            <v-card-text> {{ t("click here to join the class") }} </v-card-text>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> Korean </v-card-text>

          <v-card-text> </v-card-text>

          <v-card
            v-if="schedule?.Korean"
            variant="tonal"
            class="ma-3"
            :href="schedule?.Korean.link"
            target="_blank"
          >
            <v-card-title>
              <v-icon start>mdi-laptop-account</v-icon> {{ t("class") }} ({{
                schedule.Korean.date
              }})
            </v-card-title>

            <v-card-text> {{ t("click here to join the class") }} </v-card-text>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> Arts </v-card-text>

          <v-card-text> </v-card-text>

          <v-card
            v-if="schedule?.Arts"
            variant="tonal"
            class="ma-3"
            :href="schedule?.Arts.link"
            target="_blank"
          >
            <v-card-title>
              <v-icon start>mdi-laptop-account</v-icon> {{ t("class") }} ({{
                schedule.Arts.date
              }})
            </v-card-title>

            <v-card-text> {{ t("click here to join the class") }} </v-card-text>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> Tech </v-card-text>

          <v-card-text> </v-card-text>

          <v-card
            v-if="schedule?.Tech"
            variant="tonal"
            class="ma-3"
            :href="schedule?.Tech.link"
            target="_blank"
          >
            <v-card-title>
              <v-icon start>mdi-laptop-account</v-icon> {{ t("class") }} ({{
                schedule.Tech.date
              }})
            </v-card-title>

            <v-card-text> {{ t("click here to join the class") }} </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <br />
  <br />
  <br />

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>

  <br />

  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div>
      <v-btn class="mx-4" icon="mdi-facebook" variant="text"></v-btn>
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
const schedule = ref({});

onMounted(() => {
  windowHeight.value = window.innerHeight;

  onValue(dbRef($db, "schedule"), (snapshot) => {
    schedule.value = snapshot.val();

    const keys = Object.keys(schedule.value ?? {});

    for (const key of keys) {
      const date = new Date(schedule.value[key].date);
      const now = new Date();

      if (now - date > 24 * 60 * 60 * 1000) {
        set(dbRef($db, "schedule", key), null);
      }
    }
  });
});

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

p > a {
  color: #1976d2;
  text-decoration: none;
}

p > a:hover {
  color: #2196f3;
  text-decoration: underline;
}
</style>
