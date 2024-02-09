<template>
  <v-parallax
    src="/background/background.png"
    lazy-src="/background/background.png"
    :height="windowHeight"
  >
    <div class="d-flex justify-center align-center index" style="width: 100%">
      <div style="width: 100%">
        <h2 class="text-center font-weight-medium text-h3">Think for All</h2>
        <h1 class="text-center font-weight-bold text-h1 mt-3 mb-10">
          Link All
        </h1>

        <div class="d-flex justify-center mb-10 mt-5">
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

        <div
          class="only-desktop-flex d-flex justify-center container mx-3"
          style="gap: 150px"
        >
          <div class="text-center">
            <p class="headline">{{ taughtStudents }}</p>
            <p class="text">{{ $t("taught_students") }}</p>
          </div>

          <div class="text-center">
            <p class="headline">{{ wonDonated }}</p>
            <p class="text">{{ $t("won_donated") }}</p>
          </div>

          <div class="text-center">
            <p class="headline">{{ hoursOf }}</p>
            <p class="text">{{ $t("hours_of_volunteering") }}</p>
          </div>
        </div>
        <div class="only-mobile-flex d-flex justify-center ga-5 mt-14 mx-3">
          <v-card elevation="0" class="text-center pa-2" variant="tonal">
            <p class="headline">{{ taughtStudents }}</p>
            <br />
            <p class="text">{{ $t("taught_students") }}</p>
          </v-card>

          <v-card
            elevation="0"
            class="text-center pa-2"
            variant="tonal"
            min-width="130px"
          >
            <p class="headline">{{ wonDonated }}</p>
            <br />
            <p class="text">{{ $t("won_donated") }}</p>
          </v-card>

          <v-card elevation="0" class="text-center pa-2" variant="tonal">
            <p class="headline">{{ hoursOf }}</p>
            <br />
            <p class="text">{{ $t("hours_of_volunteering") }}</p>
          </v-card>
        </div>
      </div>
    </div>
  </v-parallax>

  <br /><br /><br />

  <h2 class="text-center text-h2">LinkAll Programs</h2>

  <hr />
  <br />

  <v-container fluid style="width: 90%">
    <v-row justify="center">
      <template v-for="(i, index) in classList" :key="index">
        <v-col
          v-for="item in Object.values(classList[index] ?? {})"
          :key="item.classID"
          cols="12"
          sm="6"
          md="3"
        >
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                v-bind="props"
                elevation="0"
                height="300px"
                varaint="tonal"
                class="cardy rounded-lg"
                :to="`/class/${item.subject}/${item.classID}`"
              >
                <div class="ml-2">
                  <v-card-title class="headline">
                    <v-icon start size="x-small">{{ item.icon }}</v-icon>
                    {{ item.subject.toUpperCase() }}
                  </v-card-title>
                  <v-card-text class="text-h6 mt-2">
                    {{ item.englishDisplayName }}
                  </v-card-text>
                </div>

                <img
                  :src="`/members/${item.teacherID}.png`"
                  height="200"
                  style="right: 0; bottom: 0; position: absolute"
                />

                <v-card
                  style="position: absolute; bottom: 0; margin-bottom: 30px"
                  class="d-flex ml-2"
                  elevation="0"
                  color="transparent"
                >
                  <div class="my-auto mr-6">
                    <v-card-title class="text-left text-white">
                      {{ item.englishTeacherName }}
                    </v-card-title>
                    <v-card-subtitle class="text-left text-white">
                      {{ item.koreanTeacherName }}
                    </v-card-subtitle>
                  </div>

                  <v-slide-x-transition>
                    <v-btn
                      v-if="isHovering"
                      elevation="0"
                      icon="mdi-arrow-right-drop-circle"
                      size="large"
                      class="mt-3"
                      variant="elevated"
                    ></v-btn>
                  </v-slide-x-transition>
                </v-card>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>

  <br />

  <v-carousel
    hide-delimiter-background
    delimiter-icon="mdi-square"
    color="#5C6BC0"
    height="400"
    show-arrows="hover"
    cycle
    continuous
  >
    <v-carousel-item rounded>
      <v-sheet height="100%" tile>
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">Think for All</div>
        </div>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item rounded>
      <v-sheet height="100%" tile>
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">LinkAll</div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

  <br />
  <br />
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
        href="https://www.instagram.com/linkall_/"
        target="_blank"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-youtube"
        variant="text"
        :href="`https://${mobile ? 'm' : 'www'}.youtube.com/@LinkAllCommunity`"
        target="_blank"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div>
      Copyright &copy; LinkAll {{ new Date().getFullYear() }} &mdash; All rights
      reserved
    </div>

    <div class="version">v0.0.6</div>
  </v-footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { ref as dbRef, onValue } from "firebase/database";

const { t } = useI18n();
const { $db } = useNuxtApp();
const { mobile } = useDisplay();

const windowHeight = ref(0);

const taughtStudents = ref("0");
const wonDonated = ref("0");
const hoursOf = ref("0");
const classList = ref([]);

onMounted(() => {
  windowHeight.value = window.innerHeight;

  const siteValuesRef = dbRef($db, "edit");
  onValue(siteValuesRef, (snapshot) => {
    const data = snapshot.val();
    taughtStudents.value = data.taughtStudents;
    wonDonated.value = data.wonDonated;
    hoursOf.value = data.hoursOf;
  });

  const classRef = dbRef($db, "class");
  onValue(classRef, (snapshot) => {
    const data = snapshot.val();
    const values = Object.values(data ?? {});
    classList.value = values;
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

.version {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px;
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

  .version {
    position: relative;
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
  margin-top: 200px;
}

@media (max-width: 1275px) {
  .index {
    margin-top: 100px;
  }
}

.cardy:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    black 150%,
    black 300%
  );
}
</style>
