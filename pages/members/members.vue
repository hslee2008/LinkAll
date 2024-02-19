<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("members") }}
    </h1>

    <DivCenter>
      <div id="junho" class="container mb-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/junho.png"
              class="ma-auto box"
              :elevation="0"
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
              <ul v-if="locale === 'en'" class="text-justify">
                <li>YTN DC Champion (2020)</li>
                <li>KSDO Champion, Individual 1st Place (2021)</li>
                <li>Korea WSDC Top 24 (2023)</li>
                <li>E-ICON World Contest 1st Place (2023)</li>
                <li>Middle School International MUN SC Head Chair (2023)</li>
                <li>Hankyung Economy Competition 1st Place (2023)</li>
                <li>Ministry of Education Minister's Award x 2 (2023)</li>
                <li>Cogito Debate Society 19th Captain</li>
                <li>HAFS Mathematical Contest Bronze Prize</li>
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
                <li>외대부고 수학 경시대회 동상</li>
              </ul>
            </v-col>
          </div>
        </v-col>
      </div>

      <div id="hyunseung" class="container mb-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/hyunseung.png"
              class="ma-auto box"
              :elevation="0"
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
                  안녕하세요! 저는 판교고등학교 1학년입니다. 어려서부터 흥미를
                  가지고 공부해 오던 코딩 지식을 바탕으로 LinkAll의 비전 실현을
                  돕기 위해 LinkAll의 웹사이트 제작을 담당하고 있습니다.
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

                <v-btn
                  href="https://play.google.com/store/apps/dev?id=7815903651523223132"
                  target="_blank"
                  icon="mdi-google-play"
                  :elevation="0"
                  density="compact"
                ></v-btn>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'" class="text-justify">
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
                  (2023 Gyeonggi Future Education)
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
                  Korea Code Fair Hackathon Bronze Prize (2023
                  <abbr
                    title="Korean Institute of Information Scientists and Engineers"
                  >
                    KIISE
                  </abbr>
                  Chairman's Award)
                </li>
              </ul>
              <ul
                v-else-if="locale === 'ko'"
                :class="`text-justify ${mobile ? 'mr-3 ml-1' : ''}`"
              >
                <li>
                  한국과학창의재단 2022 청소년과학탐구반 융합탐구과제 최우수상
                  (과학기술정보통신부 장관상)
                </li>
                <li>
                  2023년 신나는 SW·AI 교육수기공모전 최우수상
                  (과학기술정보통신부 장관상)
                </li>
                <li>경기도교육감 표창장 (2023년 경기미래교육)</li>
                <li>
                  한국과학창의재단 2021년 청소년 과학 탐구 동아리 금상
                  (한국과학창의재단 이사장상)
                </li>
                <li>
                  한국과학창의재단 2021년 청소년 과학 탐구 동아리 개인 활동 은상
                  (한국과학창의재단 이사장상)
                </li>
                <li>
                  한국코드페어 해커톤 동상 (2023년 한국정보과학학회 회장상)
                </li>
              </ul>
            </v-col>
          </div>
        </v-col>
      </div>

      <div id="woojin" class="container mb-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/woojin.png"
              class="ma-auto box"
              :elevation="0"
            ></ImgMember>

            <b>{{ t("Woojin Cho") }}</b>
          </v-col>
        </div>

        <v-col style="flex: 2">
          <div class="container align-center ga-5">
            <v-col class="inner-col py-auto text-justify">
              <div>
                <span v-if="locale === 'en'">
                  Hello, I am a student in the international track of the HAFS.
                  I'm here to help fulfill the vision of Linkall of providing
                  primary guidance for students' education, and I'm mainly in
                  charge of design-related works in LinkAll.
                </span>
                <span v-else-if="locale === 'ko'">
                  자기소개 안녕하세요, 저는 용인한국외국어대학교부설고등학교
                  국제 트랙에 재학 중인 학생입니다. 저는 학생들의 기본 교육을
                  지원하고자하는 LinkAll의 비전 실현을 돕기 위해 함께하고
                  있으며, 디자인 관련 업무를 주로 담당하고 있습니다.
                </span>
              </div>

              <div class="mt-3 d-flex ga-4">
                <v-btn
                  href="mailto:clmau0810@gmail.com"
                  target="_blank"
                  icon="mdi-gmail"
                  :elevation="0"
                  density="compact"
                ></v-btn>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'" class="text-justify">
                <li>Business Black Box 2023 2nd Place</li>
                <li>GS Retail Eco Creator 2023 Grand Prize</li>
                <li>Outburst 19th Designer</li>
                <li>Lux et Nox 19th Vice-Captain, Designer</li>
                <li>Token Students Designer</li>
              </ul>
              <ul v-else-if="locale === 'ko'" class="text-justify">
                <li>비스니스 블랙 박스 2023 2등</li>
                <li>GS 에코크리에이터 2023 대상</li>
                <li>외대부고 아웃버스트 19대 디자이너</li>
                <li>외대부고 영어영화평론동아리 19대 차장, 디자이너</li>
                <li>Token Students 디자이너</li>
              </ul>
            </v-col>
          </div>
        </v-col>
      </div>

      <div id="doyung" class="container mb-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/doyung.png"
              class="ma-auto box"
              :elevation="0"
            ></ImgMember>

            <b>{{ t("Doyung Yun") }}</b>
          </v-col>
        </div>

        <v-col style="flex: 2">
          <div class="container align-center ga-5">
            <v-col class="inner-col py-auto text-justify">
              <div>
                <span v-if="locale === 'en'">
                  Hello! I am a student at Hankuk Academy of Foreign Studies,
                  graduating in 2026. In LinkAll, I would like to share my
                  knowledge about math and connect people across the globe with
                  donations. Anyone who needs help in the education and learning
                  process can get our support!
                </span>
                <span v-else-if="locale === 'ko'">
                  안녕하세요! 저는 2026년에 졸업하는
                  한국외국어대학교부설고등학교 학생입니다. LinkAll에서 수학에
                  대한 지식을 공유하고 기부를 통해 사람들을 연결하고 싶습니다.
                  학습 과정에서 도움 이 필요한 사람이라면 누구나 지원받을 수
                  있습니다.
                </span>
              </div>

              <div class="mt-3 d-flex ga-4">
                <v-btn
                  href="mailto:yundozero@gmail.com"
                  target="_blank"
                  icon="mdi-gmail"
                  :elevation="0"
                  density="compact"
                ></v-btn>

                <v-btn
                  href="https://www.instagram.com/doyung___0/"
                  target="_blank"
                  icon="mdi-instagram"
                  :elevation="0"
                  density="compact"
                ></v-btn>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'" class="text-justify">
                <li>HAFS Medical Biology Organization 19th Captain</li>
              </ul>
              <ul v-else-if="locale === 'ko'" class="text-justify">
                <li>외대부고 의생명동아리 19기 부장</li>
              </ul>
            </v-col>
          </div>
        </v-col>
      </div>

      <div id="yoojong" class="container mb-10">
        <div>
          <v-col class="text-center ma-auto" style="flex: 0.2">
            <ImgMember
              src="/members/yoojong.png"
              class="ma-auto box"
              :elevation="0"
            ></ImgMember>

            <b>{{ t("Yoojong Seo") }}</b>
          </v-col>
        </div>

        <v-col style="flex: 2">
          <div class="container align-center ga-5">
            <v-col class="inner-col py-auto text-justify">
              <div>
                <span v-if="locale === 'en'">
                  Hello, I'm YooJong Seo, a student in the international track
                  of the HAFS class of 2026. Within LinkAll, I'm dedicated to
                  promoting donations through direct person-to-person education.
                </span>
                <span v-else-if="locale === 'ko'">
                  안녕하세요, 저는 2026년 HAFS 국제트랙에 속한 서유종입니다.
                  LinkAll 내에서 직접 개인 간 교육을 통해 기부를 촉진하는 데
                  전념하고 있습니다.
                </span>
              </div>

              <div class="mt-3 d-flex ga-4">
                <v-btn
                  href="mailto:yjong2007@gmail.com"
                  target="_blank"
                  icon="mdi-gmail"
                  :elevation="0"
                  density="compact"
                ></v-btn>
              </div>
            </v-col>

            <v-col class="ml-5">
              <ul v-if="locale === 'en'" class="text-justify">
                <li>HAFS Mathematical Contest Silver Prize</li>
                <li>HAFS Mathematical Contest Bronze Prize</li>
              </ul>
              <ul v-else-if="locale === 'ko'" class="text-justify">
                <li>외대부고 수학 경시대회 은상</li>
                <li>외대부고 수학 경시대회 동상</li>
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
    #08f,
    #f03 99%,
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
