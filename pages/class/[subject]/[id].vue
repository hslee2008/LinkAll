<template>
  <div class="mt-180 mx-5 mb-10">
    <div class="top-div">
      <div class="bottom-div">
        <div v-if="classInfo.englishOfficialName">
          <div v-if="locale === 'en'" class="title-container">
            <h1 class="mr-3">{{ classInfo.englishOfficialName }}</h1>
            <h2 class="my-auto">| {{ classInfo.englishTeacherName }}</h2>
          </div>
          <div v-else-if="locale === 'ko'" class="title-container">
            <h1 class="mr-3">{{ classInfo.koreanOfficialName }}</h1>
            <h2 class="my-auto">| {{ classInfo.koreanTeacherName }}</h2>
          </div>
        </div>
        <v-skeleton-loader v-else type="heading"></v-skeleton-loader>

        <p v-if="classInfo.englishClassDescription" class="text-justify mt-3">
          <span v-if="locale === 'en'">
            {{ classInfo.englishClassDescription }}
          </span>
          <span v-else-if="locale === 'ko'">
            {{ classInfo.koreanClassDescription }}
          </span>
        </p>
        <div v-else>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </div>

        <h2
          style="font-family: Grape Nuts"
          class="linkall-sign font-weight-black mb-3"
        >
          - Think for All, Link All.
        </h2>

        <br />

        <v-alert
          :border="width >= 930 ? 'start' : 'top'"
          border-color="success"
          icon="mdi-heart-box-outline"
          class="text-justify"
        >
          <span v-if="locale === 'en'">
            Note that donations after each lesson are highly encouraged. Your
            donations have the power to help and link the people in need.
          </span>
          <span v-else-if="locale === 'ko'">
            각 수업 후 기부를 적극 권장합니다. 여러분의 기부는 필요한 이들을
            연결하는 힘을 가지고 있습니다.
          </span>
        </v-alert>

        <div :class="`my-13 d-flex ga-6 ${width >= 930 ? '' : 'flex-column'}`">
          <div :style="width >= 930 ? 'width: 50%' : ''">
            <v-table
              v-if="classInfo.lang"
              style="border: 1px solid black; border-radius: 10px"
            >
              <thead style="background-color: #b0d6b2">
                <tr>
                  <th class="text-center font-weight-bold">Category</th>
                  <th class="text-center font-weight-bold">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">Language</td>
                  <td class="text-center">
                    {{ classInfo.lang ?? "Not Specified" }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">Grade</td>
                  <td class="text-center">{{ classInfo.grade }}</td>
                </tr>
                <tr>
                  <td class="text-center">Est. Student</td>
                  <td class="text-center">{{ classInfo.estStudent }}</td>
                </tr>
                <tr>
                  <td class="text-center">Class Time</td>
                  <td class="text-center">{{ classInfo.estTime }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-skeleton-loader v-else type="table-tbody"></v-skeleton-loader>
          </div>

          <div
            v-if="
              classInfo.englishClassSchedule || classInfo.koreanClassSchedule
            "
            :style="width >= 1020 ? 'width: 50%' : ''"
          >
            <v-table style="border: 1px solid black; border-radius: 10px">
              <thead style="background-color: #b0d6b2">
                <tr>
                  <th class="text-center font-weight-bold">{{ $t("Date") }}</th>
                  <th class="text-center font-weight-bold">Theme</th>
                  <th class="text-center font-weight-bold" style="padding: 0px">
                    Students
                  </th>
                  <th class="text-center font-weight-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(schedule, index) in classInfo[
                    locale === 'en'
                      ? 'englishClassSchedule'
                      : 'koreanClassSchedule'
                  ]"
                  :key="schedule"
                  :style="
                    classInfo.classDates[index]?.includes('(done)')
                      ? 'text-decoration: line-through; color: grey'
                      : appliedInfo[id]?.date ===
                          classInfo.classDates[index]?.replace(' (done)', '')
                        ? 'text-decoration: underline; color: red'
                        : ''
                  "
                >
                  <td class="text-center">
                    {{ classInfo.classDates[index]?.replace(" (done)", "") }}
                  </td>
                  <td class="text-center">{{ schedule }}</td>
                  <td class="text-center" style="">
                    {{
                      Object.keys(numbersForEachClass[index + 1] ?? {}).length
                    }}
                  </td>
                  <td class="text-center">
                    <span v-if="locale === 'en'">
                      <span
                        v-if="
                          Object.keys(numbersForEachClass[index + 1] ?? {})
                            .length < min
                        "
                      >
                        Recruiting
                      </span>
                      <span
                        v-else-if="
                          Object.keys(numbersForEachClass[index + 1] ?? {})
                            .length >= max
                        "
                      >
                        Full
                      </span>
                    </span>
                    <span v-else-if="locale === 'ko'">
                      <span
                        v-if="
                          Object.keys(numbersForEachClass[index + 1] ?? {})
                            .length < min
                        "
                      >
                        모집 중
                      </span>
                      <span
                        v-else-if="
                          Object.keys(numbersForEachClass[index + 1] ?? {})
                            .length >= max
                        "
                      >
                        마감
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <v-skeleton-loader v-else type="table-tbody"></v-skeleton-loader>
        </div>
      </div>

      <div class="side-div">
        <p class="text-center">Teacher</p>
        <h2
          v-if="classInfo.englishTeacherName || classInfo.koreanTeacherName"
          class="text-center text-decoration-underline"
        >
          {{
            locale === "en"
              ? classInfo.englishTeacherName
              : classInfo.koreanTeacherName
          }}
        </h2>
        <v-skeleton-loader v-else type="heading"></v-skeleton-loader>

        <div>
          <ImgMember
            v-if="classInfo.teacherID"
            :src="`/members/${classInfo.teacherID}.png`"
            :elevation="0"
            :width="250"
            :name="classInfo.teacherID"
            class="mt-5"
            bordered
            showLink
          />
          <v-skeleton-loader
            v-else
            type="image"
            width="250"
          ></v-skeleton-loader>
        </div>

        <p class="text-justify my-4 ma-auto about-me">
          <span v-if="locale === 'en'">
            {{ classInfo.englishAboutMe }}
          </span>
          <span v-else-if="locale === 'ko'">
            {{ classInfo.koreanAboutMe }}
          </span>
        </p>

        <v-dialog scrollable width="700" transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              block
              class="my-4 rounded-lg"
              color="yellow-darken-1"
              :elevation="0"
              :disabled="
                !loggedin ||
                !Object.keys(classInfo ?? {})?.includes('classDates') ||
                alreadyApplied
              "
            >
              {{ $t("Apply Now") }}
            </v-btn>

            <p
              v-if="!Object.keys(classInfo ?? {})?.includes('classDates')"
              class="text-red"
            >
              {{ $t("no class") }}
            </p>
            <div
              v-if="alreadyApplied"
              style="border: 1px solid black"
              class="pa-3 rounded-lg"
            >
              <p class="text-justify">
                {{ $t("already applied") }}
              </p>
              <v-alert class="mt-2"> {{ appliedInfo[id]?.date }}</v-alert>
              <DivCenter class="mt-3">
                <v-btn variant="tonal" to="/account/registeredClass">
                  <v-icon start>mdi-open-in-new</v-icon>
                  {{ $t("registered class") }}
                </v-btn>
              </DivCenter>
            </div>

            <v-alert v-if="locale === 'ko'" class="mt-3">
              마감된 수업은 대기자로 등록받습니다. 결원 발생시 별도로
              연락드리겠습니다.
            </v-alert>
            <v-alert v-else-if="locale === 'en'" class="mt-3">
              Closed classes will be placed on a waiting list. We will contact
              you separately if vacancies become available.
            </v-alert>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title class="text-center text-decoration-underline">
                Select Class Date
              </v-card-title>

              <v-card-text>
                <div class="mb-2">
                  <v-radio-group
                    v-model="classNumber"
                    hide-details
                    class="py-3 rounded-lg"
                    style="border: 1px solid black"
                  >
                    <v-radio
                      v-for="(radio, index) in classInfo.classDates"
                      :label="radio?.replace('(done)', '')"
                      :key="index + 1"
                      :value="index + 1"
                      :disabled="
                        radio?.includes('(done)') ||
                        radio?.includes('Not Decided')
                      "
                      :style="
                        classInfo.classDates[index]?.includes('(done)')
                          ? 'text-decoration: line-through; color: grey'
                          : ''
                      "
                    >
                    </v-radio>
                  </v-radio-group>
                </div>

                <div class="mb-13">
                  <v-expansion-panels>
                    <v-expansion-panel
                      elevation="0"
                      style="border: 1px solid black"
                    >
                      <v-expansion-panel-title>
                        Terms of Agreement
                        <InputStar></InputStar>

                        <template v-slot:actions>
                          <v-icon :color="toa1 && toa2 ? 'green' : 'red'">
                            {{ toa1 && toa2 ? "mdi-check" : "mdi-alert" }}
                          </v-icon>
                        </template>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-checkbox v-model="toa1">
                          <template v-slot:label>
                            <span v-if="locale === 'en'">
                              Personal Information used for teacher and student
                              contact
                            </span>
                            <span v-else-if="locale === 'ko'">
                              선생님과 학생의 연락을 위한 개인정보 활용 동의
                            </span>
                            <InputStar></InputStar>
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa2">
                          <template v-slot:label>
                            <span v-if="locale === 'en'">
                              Personal Information used for class documents of
                              students
                            </span>
                            <span v-else-if="locale === 'ko'">
                              기록을 위한 개인정보 활용 동의
                            </span>
                            <InputStar></InputStar>
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa3">
                          <template v-slot:label>
                            <span v-if="locale === 'en'">
                              Emails Notifications from LinkAll
                            </span>
                            <span v-else-if="locale === 'ko'">
                              이메일을 통한 LinkAll 뉴스
                            </span>
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa4">
                          <template v-slot:label>
                            <span v-if="locale === 'en'">
                              Usage of Class photos (Website upload, SNS upload,
                              etc.)
                            </span>
                            <span v-else-if="locale === 'ko'">
                              웹사이트, SNS 등에 업로드할 수업 사진 들
                            </span>
                          </template>
                        </v-checkbox>

                        <v-btn
                          class="mb-10"
                          variant="tonal"
                          @click="
                            () => {
                              toa1 = true;
                              toa2 = true;
                              toa3 = true;
                              toa4 = true;
                            }
                          "
                        >
                          <span v-if="locale === 'en'"> Agree to All </span>
                          <span v-else-if="locale === 'ko'">
                            모두 동의하기
                          </span>
                        </v-btn>

                        <v-alert v-if="locale === 'en'">
                          If you do not agree to uploading the class photo, the
                          student's face will be mosaiced for privacy
                          <span class="text-blue">:)</span>
                          For any inquiries, please contact
                          <a href="mailto:linkallcommunity@gmail.com">
                            linkallcommunity@gmail.com </a
                          >.
                        </v-alert>
                        <v-alert v-else-if="locale === 'ko'">
                          만일 학생의 수업 사진 활용에 동의하지 않는다면, 학생의
                          얼굴은 모자이크되서 업로드할 것입니다
                          <span class="text-blue">:)</span>
                          추가 질문이 있다면
                          <a href="mailto:linkallcommunity@gmail.com">
                            linkallcommunity@gmail.com </a
                          >를 통해 연락해 주세요.
                        </v-alert>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>

                <div class="d-flex flex-column ga-1">
                  <v-text-field
                    v-model="s_name"
                    label="Student Name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="s_email"
                    label="Student Email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_name"
                    label="Guardian Name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_email"
                    label="Guardian Email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email"
                    :rules="emailRules"
                  ></v-text-field>
                </div>
              </v-card-text>

              <v-card-actions style="border-top: 1.5px solid black">
                <v-spacer></v-spacer>

                <v-btn
                  text="Close"
                  color="red"
                  @click="isActive.value = false"
                ></v-btn>
                <v-btn
                  text="Submit"
                  color="blue"
                  @click="
                    () => {
                      saveToDatabase();
                      isActive.value = false;
                      thankYou = true;
                    }
                  "
                  :disabled="
                    s_name === '' ||
                    s_email === '' ||
                    g_name === '' ||
                    g_email === '' ||
                    toa1 === false ||
                    toa2 === false ||
                    !!!classNumber
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

    <v-layout-item
      v-if="isAdmin"
      model-value
      position="bottom"
      class="text-end"
      size="88"
    >
      <div class="ma-4">
        <v-btn
          icon="mdi-pencil"
          size="large"
          color="primary"
          elevation="8"
          :to="`/class/edit/${subject}/${id}`"
        />
      </div>
    </v-layout-item>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();
const { $db, $auth } = useNuxtApp();
const { width } = useDisplay();
const route = useRoute();

const max = ref(0);
const min = ref(0);
const classInfo = ref({});

const isAdmin = ref(false);
const userInfo = ref({});
const alreadyApplied = ref(false);
const appliedInfo = ref({});
const numbersForEachClass = ref([]);

const subject = route.params.subject;
const id = route.params.id;

const classNumber = ref("1");
const s_name = ref("");
const s_email = ref("");
const g_name = ref("");
const g_email = ref("");
const loggedin = ref(false);
const thankYou = ref(false);

const toa1 = ref(false);
const toa2 = ref(false);
const toa3 = ref(false);
const toa4 = ref(false);

const nameRules = [(v) => !!v || t("display name is required")];
const emailRules = [
  (v) => !!v || t("email is required"),
  (v) => /.+@.+\..+/.test(v) || t("email must be valid"),
];

$auth.onAuthStateChanged((user) => {
  if (user) {
    loggedin.value = true;
    userInfo.value = user;
  }
});

onMounted(async () => {
  const classRef = dbRef($db, `/class/${subject}/${id}`);
  await onValue(classRef, async (snapshot) => {
    const data = await snapshot.val();
    classInfo.value = data;

    const estStudent = data.estStudent;
    min.value = parseInt(estStudent.split("~")[0].trim());
    max.value = parseInt(
      estStudent.split("~")[1].replaceAll("/ class", "").trim()
    );

    const studentsNumber = dbRef(
      $db,
      `classes/${data.teacherEmailID}/to-join/${id}`
    );
    await onValue(studentsNumber, async (snapshot) => {
      numbersForEachClass.value = await snapshot.val();
    });
  });

  $auth.onAuthStateChanged((user) => {
    if (user) {
      isAdmin.value = checkAdmin(user.email);
    }
  });

  const myAccount = dbRef($db, `account/${userInfo.value.uid}`);
  await onValue(myAccount, async (snapshot) => {
    const data = (await snapshot.val()) ?? {};
    alreadyApplied.value = Object.keys(data ?? {}).includes(
      classInfo.value.classID
    );
    appliedInfo.value = data;
  });
});

const saveToDatabase = () => {
  const classRef = dbRef(
    $db,
    `classes/${classInfo.value.teacherEmailID}/to-join/${classInfo.value.classID}/${classNumber.value}/${userInfo.value.uid}`
  );

  let date = "";
  date = classInfo.value.classDates[parseInt(classNumber.value) - 1];

  update(classRef, {
    classNumber: classNumber.value,
    s_name: s_name.value,
    s_email: s_email.value,
    g_name: g_name.value,
    g_email: g_email.value,
    date,
    uid: userInfo.value.uid,
    toa: {
      toa1: toa1.value,
      toa2: toa2.value,
      toa3: toa3.value,
      toa4: toa4.value,
    },
  });

  onValue(classRef, (snapshot) => {
    console.log(snapshot.val());
  });

  if (toa3) {
    const notifRef = dbRef(
      $db,
      `emails/notificationallowed/${userInfo.value.uid}`
    );
    set(notifRef, s_email.value);
  }

  const myAccount = dbRef(
    $db,
    `account/${userInfo.value.uid}/${classInfo.value.classID}`
  );
  set(myAccount, {
    date,
    subject,
    classNumber: classNumber.value,
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

.about-me {
  width: 250px;
}

.side-div {
  margin-right: 20px;
}

.bottom-div {
  margin-right: 28px;
}

.title-container {
  display: flex;
}

@media (max-width: 1000px) {
  .title-container {
    flex-direction: column;
  }
}

@media (max-width: 650px) {
  .top-div {
    flex-direction: column;
  }

  .side-div {
    margin-left: 0px;
    margin-right: 5px;
  }

  .bottom-div {
    margin-right: 5px;
  }

  .title-container {
    flex-direction: column;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1rem;
  }

  .linkall-sign {
    font-size: 2rem;
  }

  .about-me {
    width: 100%;
  }
}
</style>

<i18n>
{
  "en": {
    "Date": "Date"
  },
  "ko": {
    "Date": "날짜"
  }
}
</i18n>
