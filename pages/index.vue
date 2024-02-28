<template>
  <v-parallax
    src="/background/background.png"
    lazy-src="/background/background.png"
    :height="windowHeight"
  >
    <div class="d-flex justify-center align-center index" style="width: 100%">
      <div style="width: 100%">
        <h2
          class="text-center font-weight-medium text-h3"
          style="font-family: Posterama"
        >
          Think for All
        </h2>
        <h1
          class="text-center font-weight-bold text-h1 mt-3 mb-10"
          style="Posterama"
        >
          Link All
        </h1>

        <div class="d-flex justify-center mb-10 mt-5">
          <v-btn
            rounded="lg"
            to="/join-us/donation"
            color="#046FFE"
            height="75"
          >
            <h2>
              <v-icon start>mdi-heart-box</v-icon>
              {{ $t("donate") }}
              <v-icon end>mdi-heart-box</v-icon>
            </h2>
          </v-btn>
        </div>

        <div v-if="mobile" class="d-flex justify-center ga-5 mt-14 mx-3">
          <v-card class="text-center pa-2" variant="tonal">
            <v-progress-circular
              v-if="taughtStudents === 0"
              class="my-6"
              indeterminate
            ></v-progress-circular>
            <p v-else class="headline">
              {{ taughtStudents }}
            </p>
            <br />
            <p class="text">{{ $t("taught_students") }}</p>
          </v-card>

          <v-card class="text-center pa-2" variant="tonal" min-width="130px">
            <v-progress-circular
              v-if="wonDonated === 0"
              class="my-6"
              indeterminate
            ></v-progress-circular>
            <p v-else class="headline">
              {{ wonDonated }}
            </p>
            <br />
            <p class="text">{{ $t("won_donated") }}</p>
          </v-card>

          <v-card class="text-center pa-2" variant="tonal">
            <v-progress-circular
              v-if="hoursOf === 0"
              class="my-6"
              indeterminate
            ></v-progress-circular>
            <p v-else class="headline">
              {{ hoursOf }}
            </p>
            <br />
            <p class="text">{{ $t("hours_of_volunteering") }}</p>
          </v-card>
        </div>
        <div
          v-else
          class="d-flex justify-center container mx-3 ml-3"
          style="gap: 150px"
        >
          <div class="text-center">
            <p class="headline">
              <v-progress-circular
                v-if="taughtStudents === 0"
                indeterminate
              ></v-progress-circular>
              <span v-else>
                {{ taughtStudents }}
              </span>
            </p>
            <p class="text">{{ $t("taught_students") }}</p>
          </div>

          <div class="text-center">
            <p class="headline">
              <v-progress-circular
                v-if="wonDonated === 0"
                indeterminate
              ></v-progress-circular>
              <span v-else>
                {{ wonDonated }}
              </span>
            </p>
            <p class="text">{{ $t("won_donated") }}</p>
          </div>

          <div class="text-center">
            <p class="headline">
              <v-progress-circular
                v-if="hoursOf === 0"
                indeterminate
              ></v-progress-circular>
              <span v-else>
                {{ hoursOf }}
              </span>
            </p>
            <p class="text">{{ $t("hours_of_volunteering") }}</p>
          </div>
        </div>
      </div>
    </div>
  </v-parallax>

  <br /><br />
  <br /><br />

  <div class="index-container">
    <div style="min-width: 300px" class="mx-3">
      <v-sheet height="100%" tile>
        <div class="text-h3 text-center">Notification</div>

        <v-list
          style="border: 1px solid grey"
          class="rounded-lg mt-7 ml-2 mr-2"
        >
          <v-dialog
            v-for="(item, i) in notificationList"
            :key="item.title"
            width="500"
          >
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ new Date(item.time).toLocaleDateString() }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-title>{{ item.title }}</v-card-title>

                <Markdown
                  :source="item.contents"
                  :linkify="true"
                  :breaks="true"
                  class="mx-4"
                />

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    :text="t('close')"
                    color="red"
                    block
                    @click="isActive.value = false"
                  ></v-btn>

                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-list>
      </v-sheet>
    </div>
    <div>
      <h2 class="text-center mb-8 text-h3">LinkAll Programs</h2>
      <div v-if="width >= 1130">
        <DivCenter classS="pa-4">
          <div class="d-flex">
            <div
              v-for="(item, i) in classList.slice(
                page * 3 - 3,
                page * 3 - 3 + 3
              )"
              :key="i"
            >
              <v-card class="mx-3" elevation="0">
                <ClassInfo :item="item" width="350"></ClassInfo>
              </v-card>
            </div>
          </div>

          <v-pagination
            class="mt-3"
            v-model="page"
            :length="Math.ceil(classList.length / 3)"
            rounded="circle"
          ></v-pagination>
        </DivCenter>
      </div>
      <v-container v-else>
        <v-row justify="center">
          <template v-for="(item, index) in classList" :key="index">
            <v-col>
              <DivCenter>
                <ClassInfo :item="item" width="350"></ClassInfo>
              </DivCenter>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </div>
  </div>

  <br /><br />
  <br /><br />

  <v-carousel
    delimiter-icon="mdi-square"
    hide-delimiter-background
    color="#04aefd"
    height="calc(100vw * 2731/3723 * 2/3)"
    width="100vw"
    continuous
  >
    <v-carousel-item rounded>
      <v-sheet height="100%" tile>
        <div class="d-flex fill-height justify-center align-center bg-image">
          <div class="ml-3">
            <div class="text-h2">
              Think For All, <span class="font-weight-bold">Link All</span>
            </div>
            <div class="text-h6">A Revolution of Education</div>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item rounded>
      <v-sheet height="100%" tile>
        <div class="d-flex fill-height justify-center align-center">
          <div>
            <v-img src="/logo-text-long.png" />
            <br />
            <div class="text-h2 font-weight-bold">GRAND OPEN</div>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

  <br /><br />
  <br /><br />

  <v-sheet>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="item in picList" :key="item.title">
        <v-card max-width="300" elevation="0" class="mx-3">
          <v-img :src="item.link" class="rounded-lg"></v-img>
          <h2 class="text-center my-3">{{ item.title }}</h2>
          <p width="200" class="text-justify">{{ item.contents }}</p>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>

  <br /><br />
  <br /><br />

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

    <br />

    <div class="version">v1.0.1</div>
  </v-footer>
</template>

<script setup>
import Markdown from "vue3-markdown-it";

const { t } = useI18n();
const { $db } = useNuxtApp();
const { mobile, width } = useDisplay();

const windowHeight = ref(0);
const page = ref(1);

const taughtStudents = ref(0);
const wonDonated = ref(0);
const hoursOf = ref(0);

const classList = ref([]);
const notificationList = ref([]);
const picList = ref([]);

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

    for (let i = 0; i < values.length; i++) {
      for (let j in Object.values(values[i] ?? {})) {
        classList.value.push(Object.values(values[i] ?? {})[j]);
      }
    }

    classList.value = classList.value.sort((a, b) => a.order - b.order);
  });

  const notificationRef = dbRef($db, "notification");
  onValue(notificationRef, (snapshot) => {
    const data = snapshot.val();
    const values = Object.values(data ?? {});
    notificationList.value = values;
  });

  const picRef = dbRef($db, "pic");
  onValue(picRef, (snapshot) => {
    const data = snapshot.val();
    const values = Object.values(data ?? {});
    picList.value = values;
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
  color: lightgrey;
  text-decoration: underline;
}

.text-h1 {
  font-size: 100px !important;
}

.bg-image {
  background-image: url(/background/background.png);
  background-position: center;
  background-size: 100%;
}

.index-container {
  display: flex;
}

@media (max-width: 1470px) {
  .index-container {
    flex-direction: column-reverse;
    gap: 30px;
  }
}

@media (max-width: 600px) {
  .headline {
    font-size: 25px;
  }

  .text-h2 {
    font-size: 50px !important;
  }

  .container {
    flex-direction: column;
    width: 100%;
  }

  .version {
    position: relative;
  }

  .bg-image {
    background-image: url(/background/background.png);
    background-position: center;
    background-size: 100%;
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
    margin-top: 130px;
  }
}
</style>
