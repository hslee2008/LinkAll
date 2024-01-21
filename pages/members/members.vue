<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("members") }}
    </h1>

    <div class="d-flex justify-center">
      <div class="d-flex flex-column">
        <div class="container mt-10">
          <v-col class="text-center ma-auto" style="flex: 0.3">
            <ImgMember
              src="/members/junho.jpeg"
              class="ma-auto"
              :elevation="0"
            ></ImgMember>

            <p class="mt-3">{{ t("founder") }}</p>
            <b>{{ t("Junho Hwang") }}</b>
          </v-col>

          <v-col style="flex: 2">
            <div class="container align-center mt-4">
              <v-col class="inner-col ml-5 pr-14 py-auto text-justify">
                Hello, I'm currently in the international track of the HAFS
                graduating class of 2026. I founded LinkAll with the support of
                our co-founder in January 2024 for a revolutionary shift in the
                focus on donations and to activate direct methods to help
                individuals in need.
              </v-col>

              <v-col class="ml-13">
                <ul>
                  <li>YTN-HUFS English Debating Championship 2020 Champion</li>
                  <li>School Debating Championship 2021 Champion</li>
                  <li>
                    School Debating Championship 2021 Individual Speaker (1st
                    place)
                  </li>
                  <li>
                    Korea
                    <abbr
                      title="Korea for the World Schools Debating Championship"
                    >
                      WSDC
                    </abbr>
                    2023 Top 24
                  </li>
                  <li>E-ICON World Contest 2023 Champion (1st place)</li>
                  <li>
                    Hankyung Economy Experience Competition 2023 (Grand Prize)
                  </li>
                </ul>
              </v-col>
            </div>

            <div class="sns-container">
              <v-btn
                href="https://www.instagram.com/h.junho420"
                target="_blank"
                icon="mdi-instagram"
                :elevation="0"
              ></v-btn>
            </div>
          </v-col>
        </div>

        <div class="container mt-10">
          <v-col class="text-center ma-auto" style="flex: 0.3">
            <ImgMember
              src="/members/hyunseung.jpg"
              class="ma-auto"
              :elevation="0"
            ></ImgMember>

            <p class="mt-3">{{ t("co-founder") }}</p>
            <b>{{ t("Hyunseung Lee") }}</b>
          </v-col>

          <v-col style="flex: 2">
            <div class="container align-center mt-4">
              <v-col class="inner-col ml-5 pr-14 py-auto text-justify">
                Hi! I co-founded LinkAll with the visionary of our founder.
                Together, we embarked on a mission like mentioned above. As a
                high school junior, I took charge of the technical aspects,
                coding and shaping the technological foundation of LinkAll.
              </v-col>

              <v-col class="ml-13">
                <ul v-if="locale === 'ko'" style="width: 90%">
                  <li>
                    한국과학창의재단 2022 청소년과학탐구반 융합탐구과제 최우수상
                    (과학기술정보통신부 장관상)
                  </li>
                  <li>
                    2023년 신나는 SW·AI 교육수기공모전 최우수상
                    (과학기술정보통신부 장관상)
                  </li>
                  <li>경기도교육감 표창장 (경기미래교육)</li>
                  <li>
                    한국과학창의재단 2021년 청소년 과학 탐구 동아리 금상
                    (한국과학창의재단 이사장상)
                  </li>
                  <li>
                    한국과학창의재단 2021년 청소년 과학 탐구 동아리 개인 활동
                    은상 (한국과학창의재단 이사장상)
                  </li>
                  <li>한국코드페어 해커톤 동상 (한국정보과학학회 회장상)</li>
                </ul>
                <ul v-else-if="locale === 'en'">
                  <li>
                    <abbr
                      title="Korea Foundation for the Advancement of Science & Creativity"
                    >
                      KFASC
                    </abbr>
                    2022 Youth Science Exploration Group Convergence Exploration
                    Project (Grand Prize)
                  </li>
                  <li>
                    <abbr title="Ministry of Science and ICT"> MSIT </abbr>
                    2023 Exciting SW·AI Education Essay Contest (Grand Prize)
                  </li>
                  <li>
                    Gyeonggi Provincial Superintendent of Education Commendation
                    (Gyeonggi Future Education)
                  </li>
                  <li>
                    <abbr
                      title="Korea Foundation for the Advancement of Science & Creativity"
                    >
                      KFASC
                    </abbr>
                    2021 Youth Science Exploration Club Gold Award
                    <abbr
                      title="Korea Foundation for the Advancement of Science & Creativity"
                    >
                      (KFASC
                    </abbr>
                    Award)
                  </li>
                  <li>
                    <abbr
                      title="Korea Foundation for the Advancement of Science & Creativity"
                    >
                      KFASC
                    </abbr>
                    2021 Youth Science Exploration Individual Activities Silver
                    Award
                    <abbr
                      title="Korea Foundation for the Advancement of Science & Creativity"
                    >
                      (KFASC
                    </abbr>
                    Award)
                  </li>
                  <li>
                    Korea Code Fair Hackathon Bronze Prize
                    <abbr
                      title="Korean Institute of Information Scientists and Engineers"
                    >
                      (KIISE
                    </abbr>
                    Chairman's Award)
                  </li>
                </ul>
              </v-col>
            </div>

            <div class="sns-container">
              <v-btn
                href="https://play.google.com/store/apps/dev?id=7815903651523223132"
                target="_blank"
                icon="mdi-google-play"
                :elevation="0"
              ></v-btn>

              <v-btn
                href="https://github.com/hslee2008"
                target="_blank"
                icon="mdi-github"
                :elevation="0"
              ></v-btn>

              <v-btn
                href="mailto:hyunseunglee2008@gmail.com"
                target="_blank"
                icon="mdi-email"
                :elevation="0"
              ></v-btn>
            </div>
          </v-col>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

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
  border-right: dotted;
}

.sns-container {
  margin-left: 20px;
}

@media (max-width: 900px) {
  .container {
    flex-direction: column;
  }
}

@media (max-width: 900px) {
  .inner-col {
    border-right: none;
    inline-size: auto;
  }
}
</style>
