<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("committees") }}
    </h1>

    <DivCenter classS="my-3">
      <div class="text-center my-4">
        <h2>Organizing Team</h2>
      </div>

      <v-row align="start" no-gutters class="ga-3">
        <v-col
          v-for="orgteam in Object.values(members).filter(
            (a) => a.role === 'founder' || a.role === 'co-founder'
          )"
          :key="orgteam.id"
          class="mx-2"
        >
          <ImgMember
            :src="orgteam.image"
            :elevation="0"
            :showLink="true"
            :width="width <= 550 ? 150 : 200"
            :name="orgteam.id"
          ></ImgMember>
          <p class="text-center title">{{ t(orgteam.role) }}</p>
          <p class="text-center text-h6">
            <span v-if="locale === 'en'">{{ orgteam.englishFullName }}</span>
            <span v-else>{{ orgteam.koreanFullName }}</span>
          </p>
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="ga-3">
        <v-col
          v-for="orgteam in Object.values(members).filter(
            (a) => a.role === 'designer'
          )"
          :key="orgteam.id"
          class="mx-2"
        >
          <ImgMember
            :src="orgteam.image"
            :elevation="0"
            :showLink="true"
            :width="width <= 550 ? 150 : 200"
            :name="orgteam.id"
          ></ImgMember>
          <p class="text-center title">{{ t(orgteam.role) }}</p>
          <p class="text-center text-h6">
            <span v-if="locale === 'en'">{{ orgteam.englishFullName }}</span>
            <span v-else>{{ orgteam.koreanFullName }}</span>
          </p>
        </v-col>
      </v-row>
    </DivCenter>

    <br /><br />

    <DivCenter classS="my-3">
      <div class="text-center my-4">
        <h2>Education Team</h2>
      </div>

      <v-row
        align="start"
        no-gutters
        :class="`ga-${width <= 550 ? '3' : '12'}`"
      >
        <v-col
          v-for="eduteam in Object.values(members).filter(
            (a) => a.role === 'teacher' || a.role === 'founder'
          )"
          :key="eduteam.id"
          class="mx-2"
        >
          <ImgMember
            :src="eduteam.image"
            :elevation="0"
            :showLink="true"
            :width="width <= 550 ? 150 : 200"
            :name="eduteam.id"
          ></ImgMember>
          <p class="text-center title">{{ t("teacher") }}</p>
          <p class="text-center text-h6">
            <span v-if="locale === 'en'">{{ eduteam.englishFullName }}</span>
            <span v-else>{{ eduteam.koreanFullName }}</span>
          </p>
        </v-col>
      </v-row>
    </DivCenter>

    <br />
    <br />
  </div>
</template>

<script setup>
const { t, locale } = useI18n();
const { $db } = useNuxtApp();
const { width } = useDisplay();

const members = ref([]);

onMounted(() => {
  onValue(
    dbRef($db, "members"),
    (snapshot) =>
      (members.value = sortByOrderAndConvertToObject(snapshot.val()))
  );
});

useHead({
  title: t("committees"),
});
</script>

<style scoped>
.title {
  background: -webkit-linear-gradient(#01a9fd, #4d00f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

a {
  text-decoration: none;
  color: inherit;
}

.flex-item {
  margin-left: 30px;
  margin-right: 30px;
}

.break {
  flex-basis: 100%;
  height: 0;
}

@media (max-width: 650px) {
  .flex-item {
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
}
</style>
