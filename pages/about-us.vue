<template>
  <div style="background-color: #abd3f1" class="top-div-with-bg">
    <h1 class="text-center header-u">
      {{ t("about us") }}
    </h1>

    <br /><br />

    <div class="d-flex justify-center align-center">
      <div style="width: 600px" class="pa-9">
        <h2>{{ t("purpose") }}</h2>
        <p>
          {{ t("purpose_text") }}
        </p>

        <br /><br />

        <h2>{{ t("vision") }}</h2>
        <p>
          {{ t("vision_text") }}
        </p>

        <br /><br />

        <h2>{{ t("impact") }}</h2>
        <div v-if="locale === 'ko'">
          <p>
            현재 LinkAll 커뮤니티는 2개의 다른 학교와 1개 국가의 회원으로
            이루어져 있습니다. 교육 활동을 통해 우리는 {{ taughtStudents }}명의
            학생에게 가르치고, {{ wonDonated }}원을 기부할 수 있었습니다.
          </p>
          <br />
          <p style="font-family: Grape Nuts" class="font-weight-black">
            우리는 LinkAll입니다. ({{ yearmonth }})
          </p>
        </div>
        <div v-else-if="locale === 'en'">
          <p>
            The LinkAll Community currently has members from 2 different
            schools, and 1 nation. Through our actions of education, we were
            able to teach {{ taughtStudents }} students and donate
            {{ wonDonated }} won.
          </p>

          <br />

          <h2 style="font-family: Grape Nuts" class="font-weight-black">
            We are LinkAll. ({{ yearmonth }})
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref as dbRef, onValue } from "firebase/database";

const { t, locale } = useI18n();
const { $db } = useNuxtApp();

const yearmonth = ref("");
const taughtStudents = ref("0");
const wonDonated = ref("0");

onMounted(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  yearmonth.value = `${year}.${month}`;

  const siteValuesRef = dbRef($db, "edit");
  onValue(siteValuesRef, (snapshot) => {
    const data = snapshot.val();
    taughtStudents.value = data.taughtStudents;
    wonDonated.value = data.wonDonated;
  });
});

useHead({
  title: t("about us"),
});
</script>
