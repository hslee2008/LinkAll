<template>
  <div style="background-color: #8dd2e9" class="top-div-with-bg">
    <h1 class="text-center header-u mb-3">
      {{ t("education") }}
    </h1>

    <DivCenter>
      <v-row class="my-3 ma-auto justify-center">
        <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
          <v-card
            class="d-flex justify-center align-center mr-3 pr-6 br-dotted"
            min-width="150"
            elevation="0"
          >
            <v-card-title>
              <v-icon start>mdi-translate</v-icon> {{ $t("english") }}
            </v-card-title>
          </v-card>

          <div class="d-flex">
            <v-card
              v-for="(item, index) in classes.english"
              :key="index"
              elevation="0"
              class="ma-3 rounded-lg"
            >
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    elevation="0"
                    height="300px"
                    width="350px"
                    varaint="tonal"
                    class="cardy rounded-lg"
                    :to="`/class/${item.subject}/${item.classID}`"
                  >
                    <div class="ml-2">
                      <v-card-title class="headline text-center">
                        <v-icon start size="x-small">{{ item.icon }}</v-icon>
                        {{ item.subject.toUpperCase() }}
                      </v-card-title>
                      <v-card-text class="text-h6 mt-2 text-center">
                        {{ item.englishDisplayName }}
                      </v-card-text>
                    </div>

                    <img
                      :src="`/members/${item.teacherID}.png`"
                      height="180"
                      class="no-drag"
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
            </v-card>
          </div>
        </v-card>
      </v-row>

      <v-row class="my-3 ma-auto justify-center">
        <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
          <v-card
            class="d-flex justify-center align-center mr-3 pr-6 br-dotted"
            min-width="150"
            elevation="0"
          >
            <v-card-title>
              <v-icon start>mdi-math-compass</v-icon> {{ $t("math") }}
            </v-card-title>
          </v-card>

          <v-card
            v-for="(item, index) in classes.math"
            :key="index"
            elevation="0"
            class="ma-3 rounded-lg"
          >
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  elevation="0"
                  height="300px"
                  width="350px"
                  varaint="tonal"
                  class="cardy rounded-lg"
                  :to="`/class/${item.subject}/${item.classID}`"
                >
                  <div class="ml-2">
                    <v-card-title class="headline text-center">
                      <v-icon start size="x-small">{{ item.icon }}</v-icon>
                      {{ item.subject.toUpperCase() }}
                    </v-card-title>
                    <v-card-text class="text-h6 mt-2 text-center">
                      {{ item.englishDisplayName }}
                    </v-card-text>
                  </div>

                  <img
                    :src="`/members/${item.teacherID}.png`"
                    height="180"
                    class="no-drag"
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
          </v-card>
        </v-card>
      </v-row>

      <v-row class="my-3 ma-auto justify-center">
        <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
          <v-card
            elevation="0"
            class="d-flex justify-center align-center mr-3 pr-3 br-dotted"
            min-width="150"
          >
            <v-card-title>
              <v-icon start>mdi-palette</v-icon> {{ $t("arts") }}
            </v-card-title>
          </v-card>

          <v-card
            elevation="0"
            height="300px"
            width="350px"
            min-width="150"
            varaint="tonal"
            class="cardy rounded-lg mx-3"
          >
            <div class="ml-2">
              <v-card-title class="headline text-center">
                <v-icon start size="x-small">mdi-palette</v-icon>
                ARTS
              </v-card-title>
              <v-card-text class="text-h6 mt-2 text-center">
                Coming Soon!
              </v-card-text>
            </div>
          </v-card>
        </v-card>
      </v-row>

      <v-row class="my-3 ma-auto justify-center">
        <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
          <v-card
            elevation="0"
            class="d-flex justify-center align-center mr-3 pr-3 br-dotted"
            min-width="150"
          >
            <v-card-title>
              <v-icon start>mdi-laptop</v-icon> {{ $t("tech") }}
            </v-card-title>
          </v-card>

          <v-card
            elevation="0"
            height="300px"
            width="350px"
            min-width="150"
            varaint="tonal"
            class="cardy rounded-lg mx-3"
          >
            <div class="ml-2">
              <v-card-title class="headline text-center">
                <v-icon start size="x-small">mdi-laptop</v-icon>
                TECH
              </v-card-title>
              <v-card-text class="text-h6 mt-2 text-center">
                Coming Soon!
              </v-card-text>
            </div>
          </v-card>
        </v-card>
      </v-row>
    </DivCenter>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref as dbRef, onValue } from "firebase/database";

const { t, locale } = useI18n();
const { $db } = useNuxtApp();

const classRef = dbRef($db, "class");
const classes = ref({});

onMounted(() => {
  onValue(classRef, (snapshot) => {
    const data = snapshot.val();
    classes.value = data;
  });
});

useHead({
  title: t("education"),
});
</script>

<style scoped>
.headline {
  font-weight: 900;
  font-size: 40px;
  padding-top: 30px;
}
.br-dotted {
  border-right: dotted;
}

@media (max-width: 600px) {
  .headline {
    font-size: 25px;
  }
}

@media (max-width: 950px) {
  .d-flex-break {
    flex-direction: column;
  }

  .br-dotted {
    border-right: none;
    border-bottom: dotted;
  }
}

@media (max-width: 766px) {
  .d-flex {
    flex-direction: column;
  }
}

a {
  color: #1976d2;
  text-decoration: none;
}

a:hover {
  color: #2196f3;
  text-decoration: underline;
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
