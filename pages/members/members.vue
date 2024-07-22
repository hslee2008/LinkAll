<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("members") }}
    </h1>

    <DivCenter>
      <div
        v-for="member in members"
        :key="member.id"
        :id="member.id"
        class="container mb-10"
      >
        <div>
          <v-col class="text-center ma-auto">
            <ImgMember
              :src="member.image"
              class="ma-auto box"
              :elevation="0"
            ></ImgMember>

            <p v-if="member.role.includes('founder')" class="mt-3 title">
              {{ t(member.role) }}
            </p>
            <b v-if="locale === 'en'">{{ member.englishFullName }}</b>
            <b v-else>{{ member.koreanFullName }}</b>

            <div class="d-flex justify-center">
              <v-btn
                v-if="member.sns.gmail"
                :href="`mailto:${member.sns.gmail.trim()}`"
                target="_blank"
                icon="mdi-gmail"
                :elevation="0"
                density="compact"
              ></v-btn>

              <v-btn
                v-if="member.sns.instagram"
                :href="`https://www.instagram.com/${member.sns.instagram.trim()}`"
                target="_blank"
                icon="mdi-instagram"
                :elevation="0"
                density="compact"
              ></v-btn>
            </div>
          </v-col>
        </div>

        <v-col>
          <div>
            <v-col class="inner-col text-justify">
              <div>
                <span v-if="locale === 'en'">
                  {{ member.englishAboutMe }}
                </span>

                <span v-else-if="locale === 'ko'">
                  {{ member.koreanAboutMe }}
                </span>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'" class="text-justify">
                <li
                  v-for="eAward in member.englishAwards.split(',')"
                  :key="eAward"
                >
                  {{ eAward }}
                </li>
              </ul>
              <ul v-if="locale === 'ko'">
                <li
                  v-for="kAward in member.koreanAwards.split(',')"
                  :key="kAward"
                >
                  {{ kAward }}
                </li>
              </ul>
            </v-col>
          </div>
        </v-col>
      </div>
    </DivCenter>

    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
const { mobile } = useDisplay();
const { t, locale } = useI18n();
const { $db } = useNuxtApp();

const members = ref({});

onMounted(async () => {
  await onValue(
    dbRef($db, "members"),
    (snapshot) =>
      (members.value = sortByOrderAndConvertToObject(snapshot.val()))
  );
});

useHead({
  title: t("members"),
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.inner-col {
  inline-size: 500px;
  overflow-wrap: break-word;
}

@media (max-width: 900px) {
  .inner-col {
    border-right: none;
    inline-size: auto;
    padding-right: 15px;
  }
  .container {
    flex-direction: column;
  }
}

.title {
  background: -webkit-linear-gradient(#01a9fd, #4d00f4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.box {
  border: solid 5px transparent;
}

@keyframes bg-spin {
  to {
    --border-angle: 1turn;
  }
}

.box:hover {
  display: grid;
  place-content: center;
  color: red;
  text-shadow: 0 1px 0 #000;

  --border-angle: 0turn;
  --main-bg: conic-gradient(
    from var(--border-angle),
    white,
    white 5%,
    white 60%,
    white 95%
  );

  border: solid 5px transparent;
  border-radius: 12px !important;
  --gradient-border: conic-gradient(
    from var(--border-angle),
    transparent 25%,
    #4d00f4,
    #01a9fd 99%,
    transparent
  );

  background:
    var(--main-bg) padding-box,
    var(--gradient-border) border-box,
    var(--main-bg) border-box;

  background-position: center center;

  animation: bg-spin 3s linear infinite;
  animation-play-state: running;
}

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}
</style>
