<template>
  <div class="top-div-with-bg">
    <h1 class="text-center header-u">
      {{ t("about us") }}
    </h1>

    <br />

    <div class="d-flex justify-center align-center">
      <div style="width: 600px" class="pl-4 pr-8">
        <h2>{{ t("purpose") }}</h2>
        <p class="text-justify">
          <span v-if="locale === 'ko'">{{ aboutus.koreanPurpose }}</span>
          <span v-if="locale === 'en'">{{ aboutus.englishPurpose }}</span>
        </p>

        <br /><br />

        <h2>{{ t("vision") }}</h2>
        <p class="text-justify">
          <span v-if="locale === 'ko'">{{ aboutus.koreanVision }}</span>
          <span v-if="locale === 'en'">{{ aboutus.englishVision }}</span>
        </p>

        <br /><br />

        <h2>{{ t("impact") }}</h2>
        <div v-if="locale === 'ko'">
          <p cass="text-justify">
            현재 LinkAll 커뮤니티는 {{ Object.keys(school ?? {}).length }}개의
            다른 학교와 {{ aboutus.countryNumber }}개 국가의 회원으로 이루어져
            있습니다. 교육 활동을 통해 우리는 {{ taughtStudents }}명의 학생에게
            가르치고, {{ wonDonated }}원을 기부할 수 있었습니다.
          </p>
        </div>
        <div v-else-if="locale === 'en'">
          <p class="text-justify">
            The LinkAll Community currently has members from
            {{ Object.keys(school ?? {}).length }} different schools, and
            {{ aboutus.countryNumber }} nation. Through our actions of
            education, we were able to teach {{ taughtStudents }} students and
            raise {{ wonDonated }} won.
          </p>
        </div>

        <br />

        <v-card variant="tonal">
          <v-container>
            <v-row align="center" justify="center">
              <v-col
                v-for="s in Object.values(school ?? {}).sort((a, b) => {
                  const value = { HAFS: 0, PGHS: 1 };
                  return value[a.id] - value[b.id];
                })"
                :key="s.id"
                class="v-col-5"
              >
                <v-card
                  color="transparent"
                  elevation="0"
                  variant="tonal"
                  target="_blank"
                  :href="s.schoolHomepage"
                >
                  <v-img
                    :src="s.image"
                    height="100px"
                    width="100px"
                    class="ma-auto"
                  ></v-img>
                </v-card>
                <p class="text-center mt-3" style="font-size: 13px !important">
                  <span v-if="locale === 'en'">
                    {{ s.schoolEnglishName }}
                  </span>
                  <span v-if="locale === 'ko'">
                    {{ s.schoolKoreanName }}
                  </span>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <br />

        <h2 style="font-family: Grape Nuts" class="text-h5 font-weight-black">
          We are LinkAll. ({{ yearmonth }})
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();
const { $db } = useNuxtApp();

const yearmonth = ref("");
const taughtStudents = ref("0");
const wonDonated = ref("0");

const aboutus = ref({});
const school = ref({});

onMounted(async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  yearmonth.value = `${year}.${month}`;

  const siteValuesRef = dbRef($db, "edit");
  await onValue(siteValuesRef, (snapshot) => {
    const data = snapshot.val();
    taughtStudents.value = data.taughtStudents;
    wonDonated.value = data.wonDonated;
  });

  const aboutusRef = dbRef($db, "aboutus");
  await onValue(aboutusRef, (snapshot) => {
    aboutus.value = snapshot.val();
  });

  const schoolRef = dbRef($db, "school");
  await onValue(schoolRef, (snapshot) => {
    school.value = snapshot.val();
  });
});

useHead({
  title: t("about us"),
});
</script>
