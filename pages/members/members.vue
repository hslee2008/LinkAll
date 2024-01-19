<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("members") }}
    </h1>

    <div class="d-flex justify-center">
      <div class="d-flex flex-column">
        <div class="d-flex mt-10">
          <div class="text-center my-auto" style="flex: 0.3">
            <v-img
              src="/members/junho.jpeg"
              draggable="false"
              height="150px"
              width="100px"
              class="rounded-shaped ma-auto"
            ></v-img>

            <p class="mt-3">{{ t("founder") }}</p>
            <b>{{ t("Junho Hwang") }}</b>
          </div>

          <div style="flex: 2">
            <div class="d-flex align-center mt-4">
              <div
                style="
                  inline-size: 500px;
                  overflow-wrap: break-word;
                  border-right: solid;
                "
                class="ml-5 pr-14 py-auto text-justify"
              >
                Hello, I'm currently in the international track of the HAFS
                graduating class of 2026. I founded LinkAll with the support of
                our co-founder in January 2024 for a revolutionary shift in the
                focus on donations and to activate direct methods to help
                individuals in need.
              </div>

              <div class="ml-13">
                <ul>
                  <li>
                    <span style="font-size: 12px">YTN-HUFS</span> English
                    Debating Championship 2020 Champion
                  </li>
                  <li>School Debating Championship 2021 Champion</li>
                  <li>
                    School Debating Championship 2021 Individual Speaker (1st)
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
                  <li>E-ICON World Contest 2023 Champion (1st)</li>
                  <li>
                    <span style="font-size: 13px">
                      Hankyung Economy Experience
                    </span>
                    Competition 2023 (Grand)
                  </li>
                </ul>
              </div>
            </div>

            <div class="ml-2 d-flex">
              <v-btn
                href="https://www.instagram.com/h.junho420"
                target="_blank"
                icon="mdi-instagram"
                elevation="0"
              ></v-btn>
            </div>
          </div>
        </div>

        <div class="d-flex mt-10">
          <div class="text-center my-auto" style="flex: 0.3">
            <v-img
              src="/members/hyunseung.jpg"
              draggable="false"
              height="150px"
              width="100px"
              class="rounded-shaped ma-auto"
            ></v-img>

            <p class="mt-3">{{ t("co-founder") }}</p>
            <b>{{ t("Hyunseung Lee") }}</b>
          </div>

          <div style="flex: 2">
            <div class="d-flex align-center mt-4">
              <div
                style="
                  inline-size: 500px;
                  overflow-wrap: break-word;
                  border-right: solid;
                "
                class="ml-5 pr-14 py-auto text-justify"
              >
                Hi! I co-founded LinkAll with the visionary of our founder.
                Together, we embarked on a mission like mentioned above. As a
                high school junior, I took charge of the technical aspects,
                coding and shaping the technological foundation of LinkAll.
              </div>

              <div class="ml-13">
                <ul v-if="locale === 'ko'">
                  <li>
                    <abbr title="한국과학창의재단">KFASC</abbr> 이사장상
                    <b>(x 2)</b>
                  </li>
                  <li>
                    <abbr title="과학기술정보통신부">과기부</abbr> 장관상
                    <b>(x 2)</b>
                  </li>
                  <li><abbr title="한국정보과학회">KIISE</abbr> 회장상</li>
                  <li>경기도교육감상</li>
                  <li>경기도교원단체총연합회장상</li>
                </ul>
                <ul v-else-if="locale === 'en'">
                  <li>
                    <abbr
                      title="Korea Foundation for the Advancement of Science & Creativity"
                    >
                      KFASC
                    </abbr>
                    Chairman's Award
                    <b>(x 2)</b>
                  </li>
                  <li>
                    <abbr title="Ministry of Science and ICT">MSIT</abbr>
                    Ministry's Award
                    <b>(x 2)</b>
                  </li>
                  <li>
                    <abbr
                      title="Korean Institute of Information Scientists and Engineers"
                      >KIISE</abbr
                    >
                    Chairman's Award
                  </li>
                  <li>Superintendent of Education Award (Gyeongi-do)</li>
                  <li>
                    <abbr title="Korean Federation of Teachers' Associations"
                      >KFTA</abbr
                    >
                    Chairman's Award
                  </li>
                </ul>
              </div>
            </div>

            <div class="ml-2 d-flex">
              <v-btn
                href="https://play.google.com/store/apps/dev?id=7815903651523223132"
                target="_blank"
                icon="mdi-google-play"
                elevation="0"
              ></v-btn>

              <v-btn
                href="https://github.com/hslee2008"
                target="_blank"
                icon="mdi-github"
                elevation="0"
              ></v-btn>

              <v-btn
                href="mailto:hyunseunglee2008@gmail.com"
                target="_blank"
                icon="mdi-email"
                elevation="0"
              ></v-btn>
            </div>
          </div>
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
