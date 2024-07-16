<template>
  <div class="top-div-with-bg">
    <div v-for="(item, i) in notificationList" :key="item.title" width="500">
      <v-card class="mx-4 mr-10 my-4" variant="tonal">
        <v-card-title>{{ item.title }}</v-card-title>

        <v-card-text>
          <Markdown :source="item.contents" :linkify="true" :breaks="true" />
        </v-card-text>
      </v-card>
    </div>
  </div>
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
  background-size: cover;
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
    background-size: cover;
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
