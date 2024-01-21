<template>
  <div class="mt-180 mx-5 mb-10">
    <div class="top-div">
      <div class="mr-7">
        <div>
          <div v-if="locale === 'en'" class="title-container">
            <h1 class="mr-3">LinkAll English Book Club (MS)</h1>
            <h2 class="my-auto">| Junho Hwang</h2>
          </div>
          <div v-else-if="locale === 'ko'" class="title-container">
            <h1 class="mr-3">LinkAll 영어 독서 동아리 (중등)</h1>
            <h2 class="my-auto">| 황준호</h2>
          </div>
        </div>

        <p class="text-justify">
          <span v-if="locale === 'en'">
            We read, we think, and we develop. The power of reading is stronger
            than you think. In our class, we will be focusing on reading skills
            and speaking skills, sharing diverse thoughts after reading a
            certain book for each class. Classes will be held once every month
            for students to have sufficient time to enjoy the book selected for
            the class they are scheduled to participate in. Details regarding
            the class will be communicated via email to applied students.
            Through our process of cooperation, debate, and personal
            development, we look forward to enhancing our skills to think for
            all in society. All donations through this class will be made
            through official organizations, and the donating activities will all
            be shared through our website.
          </span>
          <span v-else-if="locale === 'ko'">
            우리는 읽고, 생각하고, 발전합니다. 읽는 힘은 여러분이 생각하는
            것보다 더 강합니다. 우리의 수업에서는 읽기 수업과 말하기 수업에
            중점을 두며, 특정 책을 읽은 후에 각 수업에 참여한 학생들이 가지고
            있는 다양한 생각을 공유할 것입니다. 수업은 매달 한 번씩 개최되어
            학생들이 예정된 수업에 참여하기 위한 충분한 독서 및 준비 시간을 가질
            수 있도록 합니다. 수업과 관련된 세부 정보는 지원한 학생들에게
            이메일을 통해 통보될 예정입니다. 협력, 토론, 그리고 개인 발전의
            과정을 통해 우리는 사회 전체를 위해 생각하는 기술을 향상하기를
            기대합니다. 이 수업을 통한 모든 기부는 공식 기관을 통해 이루어질
            예정이며, 기부 활동은 모두 저희 웹 사이트를 통해 공유될 것입니다.
            저희 모두를 위해 생각하고, 모두를 연결합니다.
          </span>
        </p>
        <p style="color: red">
          <span v-if="locale === 'en'">
            * Note that donations after each lesson are highly encouraged. Your
            donations have the power to help and link the people in need.
          </span>
          <span v-else-if="locale === 'ko'">
            * 각 수업 후 기부를 적극 권장합니다. 여러분의 기부는 필요한 이들을
            연결하는 힘을 가지고 있습니다.
          </span>
        </p>
        <br />
        <i>- Think for All, Link All.</i>

        <div class="my-10">
          <div class="my-auto">
            <v-table v-if="locale === 'en'">
              <thead>
                <tr>
                  <th class="text-left">Category</th>
                  <th class="text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Grade</th>
                  <td>7 ~ 9</td>
                </tr>
                <tr>
                  <th>Est. Student</th>
                  <td># 6 ~ 8 / class</td>
                </tr>
                <tr>
                  <th>Class Time</th>
                  <td>1h / class</td>
                </tr>
              </tbody>
            </v-table>
            <v-table v-if="locale === 'ko'">
              <thead>
                <tr>
                  <th class="text-left">Category</th>
                  <th class="text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>학년</th>
                  <td>중1 ~ 중3</td>
                </tr>
                <tr>
                  <th>예상 인원</th>
                  <td>6 ~ 8 / 수업</td>
                </tr>
                <tr>
                  <th>업 시간</th>
                  <td>1시간 / 수업</td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <v-table>
            <thead>
              <tr>
                <th class="text">Month</th>
                <th class="text">Book Name</th>
                <th class="text">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>January</td>
                <td>Lord of the Flies</td>
                <td>2024. 01. 28</td>
              </tr>
              <tr>
                <td>February</td>
                <td>Animal Farm</td>
                <td>2024. 02.</td>
              </tr>
              <tr>
                <td>March</td>
                <td>Coming Soon</td>
                <td>Coming Soon</td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!--<div class="d-flex" style="gap: 30px">
          <v-img
            src="/background/original.png"
            width="50px"
            class="rounded-lg"
          ></v-img>
          <v-img
            src="/background/original.png"
            width="50px"
            class="rounded-lg"
          ></v-img>
          <v-img
            src="/background/original.png"
            width="50px"
            class="rounded-lg"
          ></v-img>
        </div>-->
      </div>

      <div class="side-div">
        <p class="text-center">Teacher</p>
        <h2 class="text-center text-decoration-underline">Junho Hwang</h2>

        <ImgMember src="/members/junho.png" :elevation="0" :width="200" />

        <p class="text-justify my-4 ma-auto" style="width: 250px">
          안녕하세요, 저는 LinkAll 창립자 황준호입니다. 현재 저는
          용인한국외국어대학교부설고등학교에 재학하고 있습니다. LinkAll 영어
          독서 모임 수업은 우리 조직의 최초 수업입니다. 독서와 지식의 힘을 믿고
          이 프로그램을 시작하게 되었습니다. 많은 관심 부탁드립니다!. 수업에서
          만나요! :)
        </p>

        <v-dialog width="500" transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              block
              class="my-4 mb-10 rounded-lg"
              color="yellow-darken-1"
              :elevation="0"
            >
              Apply Now
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Apply for a class">
              <v-card-text>
                <v-form>
                  <p>Select Class Date</p>
                  <v-radio-group v-model="classNumber">
                    <v-radio label="(1) 2024/02/02" value="1"></v-radio>
                    <v-radio label="(2) 2024/02/03" value="2"></v-radio>
                    <v-radio label="(3) 2024/02/04" value="3"></v-radio>
                  </v-radio-group>

                  <v-text-field
                    v-model="s_name"
                    label="Student Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="s_email"
                    label="Student Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_name"
                    label="Guardian Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_email"
                    label="Guardian Email"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Submit"
                  color="red"
                  block
                  class="mb-3"
                  @click="
                    () => {
                      saveToDatabase();
                      isActive.value = false;
                      thankYou = true;
                    }
                  "
                ></v-btn>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>

    <v-dialog width="500px" v-model="thankYou">
      <v-card class="d-flex flex-column align-center pa-4">
        <p class="text-justify">
          Thank you for your submission. We will contact you via email to
          confirm your submission. If you have any questions, please contact
          <a href="mailto:linkallcommunity@gmail.com"
            >linkallcommunity@gmail.com</a
          >. If you wish to donate, <a href="/join-us/donation">click here</a>
        </p>

        <v-btn
          @click="thankYou = false"
          block
          color="primary"
          class="mt-3"
          :elevation="0"
        >
          Got it!
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { push, ref as dbRef } from "firebase/database";

const { t, locale } = useI18n();
const { $db } = useNuxtApp();

const classNumber = ref("1");
const s_name = ref("");
const s_email = ref("");
const g_name = ref("");
const g_email = ref("");
const thankYou = ref(false);

const saveToDatabase = () => {
  const classRef = dbRef(
    $db,
    `classes/h_junho420/to-join/${classNumber.value}`
  );
  push(classRef, {
    classNumber: classNumber.value,
    s_name: s_name.value,
    s_email: s_email.value,
    g_name: g_name.value,
    g_email: g_email.value,
  });
};

useHead({
  title: t("class"),
});
</script>

<style scoped>
.top-div {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.side-div {
  margin-left: 28px;
}

.title-container {
  display: flex;
}

.table-container {
  display: flex;
}

@media (max-width: 650px) {
  .top-div {
    flex-direction: column;
  }

  .side-div {
    margin-left: 0px;
  }

  .title-container {
    flex-direction: column;
  }

  .table-container {
    flex-direction: column;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1rem;
  }
}
</style>
