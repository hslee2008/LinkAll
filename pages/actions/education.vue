<template>
  <div class="top-div-with-bg">
    <h1 class="text-center header-u mb-3">
      {{ t("education") }}
    </h1>

    <div>
      <div>
        <v-tabs v-model="tab" direction="vertical">
          <v-tab value="English">
            <v-icon start>mdi-translate</v-icon> {{ $t("english") }}
          </v-tab>
          <v-tab value="Math">
            <v-icon start>mdi-math-compass</v-icon> {{ $t("math") }}
          </v-tab>
          <v-tab value="Korean">
            <v-icon start>mdi-ideogram-cjk</v-icon> {{ $t("korean") }}
          </v-tab>
          <v-tab value="History">
            <v-icon start>mdi-pillar</v-icon> {{ $t("history") }}
          </v-tab>
          <v-tab value="Science">
            <v-icon start>mdi-flask</v-icon> {{ $t("science") }}
          </v-tab>
          <v-tab value="Economy">
            <v-icon start>mdi-finance</v-icon> {{ $t("economy") }}
          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="English" class="d-flex justify-center">
              <v-card
                v-if="classes.english && tab === 'English'"
                v-for="(item, index) in Object.values(
                  classes.english ?? {}
                ).sort((a, b) => a.order - b.order)"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </v-window-item>

            <v-window-item value="Math" class="d-flex justify-center">
              <v-card
                v-if="classes.math && tab === 'Math'"
                v-for="(item, index) in Object.values(classes.math ?? {}).sort(
                  (a, b) => a.order - b.order
                )"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </v-window-item>

            <v-window-item value="Korean" class="d-flex justify-center">
              <v-card
                v-if="classes.korean && tab === 'Korean'"
                v-for="(item, index) in Object.values(
                  classes.korean ?? {}
                ).sort((a, b) => a.order - b.order)"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </v-window-item>

            <v-window-item value="History" class="d-flex justify-center">
              <v-card
                v-if="classes.history && tab === 'History'"
                v-for="(item, index) in Object.values(
                  classes.history ?? {}
                ).sort((a, b) => a.order - b.order)"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </v-window-item>

            <v-window-item value="Science" class="d-flex justify-center">
              <v-card
                v-if="classes.science && tab === 'Science'"
                v-for="(item, index) in Object.values(
                  classes.science ?? {}
                ).sort((a, b) => a.order - b.order)"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </v-window-item>

            <v-window-item value="Economy" class="d-flex justify-center">
              <v-card
                v-if="classes.science && tab === 'Economy'"
                v-for="(item, index) in Object.values(
                  classes.economy ?? {}
                ).sort((a, b) => a.order - b.order)"
                :key="index"
                elevation="0"
                class="ma-3 rounded-lg"
              >
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const { $db } = useNuxtApp();

const classRef = dbRef($db, "class");
const classes = ref({});
const tab = ref("English");

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
