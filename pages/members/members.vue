<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("members") }}
    </h1>

    <DivCenter>
      <div id="junho" class="container mt-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/junho.png"
              class="ma-auto"
              :elevation="10"
            ></ImgMember>

            <p class="mt-3">{{ t("founder") }}</p>
            <b>{{ t("Junho Hwang") }}</b>
          </v-col>
        </div>

        <v-col style="flex: 2">
          <div class="container align-center ga-5">
            <v-col class="inner-col py-auto text-justify">
              <div>
                <span v-if="locale === 'en'">
                  Hello, I'm currently in the international track of the HAFS
                  graduating class of 2026. I founded LinkAll with the support
                  of our co-founder in January 2024 for a revolutionary shift in
                  the focus on donations and to activate direct methods to help
                  individuals in need.
                </span>

                <span v-else-if="locale === 'ko'">
                  안녕하세요, 반갑습니다. 저는 현재
                  용인한국외국어대학교부설고등학교 2026년도 졸업반 국제 트랙에
                  속해 있습니다. 저는 2024년 1월에 공동 창립자의 지원을 받아
                  LinkAll 단체를 설립했습니다. 이 단체 및 프로젝트는 기부에 대한
                  관심을 혁신적으로 전환하고 도움이 필요한 사회 속 사람들을 직접
                  돕기 위한 방법을 활성화하는 것에 목표를 두고 있습니다.
                </span>
              </div>

              <div class="mt-3 d-flex ga-4">
                <v-btn
                  href="mailto:h.junho420@gmail.com"
                  target="_blank"
                  icon="mdi-gmail"
                  :elevation="0"
                  density="compact"
                ></v-btn>

                <v-btn
                  href="https://www.instagram.com/h.junho420"
                  target="_blank"
                  icon="mdi-instagram"
                  :elevation="0"
                  density="compact"
                ></v-btn>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'">
                <li>YTN DC Champion (2020)</li>
                <li>KSDO Champion, Individual 1st Place (2021)</li>
                <li>Korea WSDC Top 24 (2023)</li>
                <li>E-ICON World Contest 1st Place (2023)</li>
                <li>Middle School International MUN SC Head Chair (2023)</li>
                <li>Hankyung Economy Competition 1st Place (2023)</li>
                <li>Ministry of Education Minister's Award x 2 (2023)</li>
                <li>Cogito Debate Society 19th Captain</li>
              </ul>
              <ul v-if="locale === 'ko'">
                <li>YTN/HUFS 전국영어토론대회 우승 (2020)</li>
                <li>한국 학교 토론 선수권 대회 우승, 개인상 1위 (2021)</li>
                <li>대한민국 영어토론 국가대표 24인 (2023)</li>
                <li>E-ICON 세계 앱개발 대회 1위 (2023)</li>
                <li>
                  세계 중학생 모의유엔 대회 안전보장이사회 대표 의장 (2023)
                </li>
                <li>한경경제체험대회 대상 (2023)</li>
                <li>교육부 장관상 x 2 (2023)</li>
                <li>외대부고 코기토 영어토론 동아리 19대 부장</li>
              </ul>
            </v-col>
          </div>
        </v-col>
      </div>

      <div id="hyunseung" class="container mt-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/hyunseung.png"
              class="ma-auto"
              :elevation="10"
            ></ImgMember>

            <p class="mt-3">{{ t("co-founder") }}</p>
            <b>{{ t("Hyunseung Lee") }}</b>
          </v-col>
        </div>

        <v-col style="flex: 2">
          <div class="container align-center ga-5">
            <v-col class="inner-col py-auto text-justify">
              <div>
                <span v-if="locale === 'en'">
                  Hi! I co-founded LinkAll with the visionary of our founder.
                  Together, we embarked on a mission like mentioned above. As a
                  Pangyo High School junior, I took charge of the technical
                  aspects, coding and shaping the technological foundation of
                  LinkAll.
                </span>
                <span v-else-if="locale === 'ko'">
                  안녕하세요! LinkAll을 창립하면서 우리 창립자의 비전과 함께
                  힘을 모았고, 이를 통해 앞서 언급한 다양한 목표를 수행하고
                  있습니다. 저는 판교고등학교 1학년생으로, 기술적인 부분에 대한
                  책임을 지며 LinkAll의 기술적 기반을 코딩하고 형성하는 과정에
                  있습니다.
                </span>
              </div>

              <div class="mt-3 d-flex ga-4">
                <v-btn
                  href="mailto:hyunseunglee2008@gmail.com"
                  target="_blank"
                  icon="mdi-gmail"
                  :elevation="0"
                  density="compact"
                ></v-btn>

                <v-btn
                  href="https://github.com/hslee2008"
                  target="_blank"
                  icon="mdi-github"
                  :elevation="0"
                  density="compact"
                ></v-btn>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'">
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
              <ul v-else-if="locale === 'ko'" style="width: 90%">
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
                  한국과학창의재단 2021년 청소년 과학 탐구 동아리 개인 활동 은상
                  (한국과학창의재단 이사장상)
                </li>
                <li>한국코드페어 해커톤 동상 (한국정보과학학회 회장상)</li>
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
  padding-right: 30px;
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
</style>
