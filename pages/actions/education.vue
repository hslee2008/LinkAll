<template>
  <div class="top-div-with-bg">
    <h1 class="text-center header-u mb-3">
      {{ t("education") }}
    </h1>

    <div class="top-container">
      <div>
        <v-row class="my-4 ma-auto">
          <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
            <v-card
              class="d-flex justify-center align-center mr-3 pr-6 br-dotted rounded-0"
              min-width="150"
              elevation="0"
            >
              <v-card-title>
                <v-icon start>mdi-translate</v-icon> {{ $t("english") }}
              </v-card-title>
            </v-card>

            <div class="d-flex">
              <v-card
                v-if="classes.english"
                v-for="(item, index) in Object.values(
                  classes.english ?? {}
                ).sort((a, b) => a.order - b.order)"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
              <v-card
                v-else
                elevation="0"
                height="300px"
                width="350"
                min-width="150"
                varaint="tonal"
                class="cardy rounded-lg mx-3"
              >
                <div class="ml-2">
                  <v-card-title class="headline text-center">
                    <v-icon start size="x-small">mdi-translate</v-icon>
                    ENGLISH
                  </v-card-title>
                  <v-card-text class="text-h6 mt-2 text-center">
                    Coming Soon!
                  </v-card-text>
                </div>
              </v-card>
            </div>
          </v-card>
        </v-row>

        <v-row class="my-4 ma-auto">
          <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
            <v-card
              class="d-flex justify-center align-center mr-3 pr-6 br-dotted rounded-0"
              min-width="150"
              elevation="0"
            >
              <v-card-title>
                <v-icon start>mdi-math-compass</v-icon> {{ $t("math") }}
              </v-card-title>
            </v-card>

            <v-card
              v-if="classes.math"
              v-for="(item, index) in Object.values(classes.math ?? {}).sort(
                (a, b) => a.order - b.order
              )"
              :key="index"
              elevation="0"
              class="ma-3 rounded-lg"
            >
              <ClassInfo :item="item" width="350"></ClassInfo>
            </v-card>
            <v-card
              v-else
              elevation="0"
              height="300px"
              width="350"
              min-width="150"
              varaint="tonal"
              class="cardy rounded-lg mx-3"
            >
              <div class="ml-2">
                <v-card-title class="headline text-center">
                  <v-icon start size="x-small">mdi-math-compass</v-icon>
                  MATH
                </v-card-title>
                <v-card-text class="text-h6 mt-2 text-center">
                  Coming Soon!
                </v-card-text>
              </div>
            </v-card>
          </v-card>
        </v-row>

        <v-row class="my-4 ma-auto">
          <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
            <v-card
              elevation="0"
              class="d-flex justify-center align-center mr-3 pr-3 br-dotted rounded-0"
              min-width="150"
            >
              <v-card-title>
                <v-icon start>mdi-ideogram-cjk</v-icon>
                {{ $t("korean") }}
              </v-card-title>
            </v-card>

            <v-card
              v-if="classes.korean"
              v-for="(item, index) in Object.values(classes.korean ?? {}).sort(
                (a, b) => a.order - b.order
              )"
              :key="index"
              elevation="0"
              class="ma-3 rounded-lg"
            >
              <ClassInfo :item="item" width="350"></ClassInfo>
            </v-card>
            <v-card
              v-else
              elevation="0"
              height="300px"
              width="350"
              min-width="150"
              varaint="tonal"
              class="cardy rounded-lg mx-3"
            >
              <div class="ml-2">
                <v-card-title class="headline text-center">
                  <v-icon start size="x-small">mdi-ideogram-cjk</v-icon>
                  Korean
                </v-card-title>
                <v-card-text class="text-h6 mt-2 text-center">
                  Coming Soon!
                </v-card-text>
              </div>
            </v-card>
          </v-card>
        </v-row>

        <v-row class="my-4 ma-auto">
          <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
            <v-card
              elevation="0"
              class="d-flex justify-center align-center mr-3 pr-3 br-dotted rounded-0"
              min-width="150"
            >
              <v-card-title>
                <v-icon start>mdi-pillar</v-icon> {{ $t("history") }}
              </v-card-title>
            </v-card>

            <v-card
              v-if="classes.history"
              v-for="(item, index) in Object.values(classes.history ?? {}).sort(
                (a, b) => a.order - b.order
              )"
              :key="index"
              elevation="0"
              class="ma-3 rounded-lg"
            >
              <ClassInfo :item="item" width="350"></ClassInfo>
            </v-card>
            <v-card
              v-else
              elevation="0"
              height="300px"
              width="350"
              min-width="150"
              varaint="tonal"
              class="cardy rounded-lg mx-3"
            >
              <div class="ml-2">
                <v-card-title class="headline text-center">
                  <v-icon start size="x-small">mdi-pillar</v-icon>
                  History
                </v-card-title>
                <v-card-text class="text-h6 mt-2 text-center">
                  Coming Soon!
                </v-card-text>
              </div>
            </v-card>
          </v-card>
        </v-row>

        <v-row class="my-4 ma-auto">
          <v-card elevation="0" class="rounded-lg d-flex d-flex-break pa-4">
            <v-card
              elevation="0"
              class="d-flex justify-center align-center mr-3 pr-3 br-dotted rounded-0"
              min-width="150"
            >
              <v-card-title>
                <v-icon start>mdi-flask</v-icon> {{ $t("science") }}
              </v-card-title>
            </v-card>

            <v-card
              v-if="classes.science"
              v-for="(item, index) in Object.values(classes.science ?? {}).sort(
                (a, b) => a.order - b.order
              )"
              :key="index"
              elevation="0"
              class="ma-3 rounded-lg"
            >
              <ClassInfo :item="item" width="350"></ClassInfo>
            </v-card>
            <v-card
              v-else
              elevation="0"
              height="300px"
              width="350"
              min-width="150"
              varaint="tonal"
              class="cardy rounded-lg mx-3"
            >
              <div class="ml-2">
                <v-card-title class="headline text-center">
                  <v-icon start size="x-small">mdi-flask</v-icon>
                  Sciecne
                </v-card-title>
                <v-card-text class="text-h6 mt-2 text-center">
                  Coming Soon!
                </v-card-text>
              </div>
            </v-card>
          </v-card>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
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

@media (max-width: 766px) {
  .d-flex {
    flex-direction: column;
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

  .top-container {
    display: flex;
    justify-content: center;
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
