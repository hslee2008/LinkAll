<template>
  <div class="mt-180 mx-5 mb-10">
    <div class="top-div">
      <div class="bottom-div">
        <div>
          <div v-if="locale === 'en'" class="title-container">
            <h1 class="mr-3">{{ classInfo.englishOfficialName }}</h1>
            <h2 class="my-auto">| {{ classInfo.englishTeacherName }}</h2>
          </div>
          <div v-else-if="locale === 'ko'" class="title-container">
            <h1 class="mr-3">{{ classInfo.koreanOfficialName }}</h1>
            <h2 class="my-auto">| {{ classInfo.koreanTeacherName }}</h2>
          </div>
        </div>

        <p class="text-justify mt-3">
          <span v-if="locale === 'en'">
            {{ classInfo.englishClassDescription }}
          </span>
          <span v-else-if="locale === 'ko'">
            {{ classInfo.koreanClassDescription }}
          </span>
        </p>

        <br />

        <v-alert
          :border="!mobile ? 'start' : 'top'"
          border-color="success"
          icon="mdi-firework"
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
        <br />
        <h2
          style="font-family: Grape Nuts"
          class="linkall-sign font-weight-black ml-3 mb-3"
        >
          - Think for All, Link All.
        </h2>

        <div :class="`my-13 d-flex ga-6 ${mobile ? 'flex-column' : ''}`">
          <div :style="!mobile ? 'width: 50%' : ''">
            <v-table style="border: 1px solid black; border-radius: 10px">
              <thead style="background-color: #b0d6b2">
                <tr>
                  <th class="text-center font-weight-bold">Category</th>
                  <th class="text-center font-weight-bold">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th class="text-center">Language</th>
                  <td class="text-center">
                    {{ classInfo.lang ?? "Not Specified" }}
                  </td>
                </tr>
                <tr>
                  <th class="text-center">Grade</th>
                  <td class="text-center">{{ classInfo.grade }}</td>
                </tr>
                <tr>
                  <th class="text-center">Est. Student</th>
                  <td class="text-center">{{ classInfo.estStudent }}</td>
                </tr>
                <tr>
                  <th class="text-center">Class Time</th>
                  <td class="text-center">{{ classInfo.estTime }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <div
            v-if="
              classInfo.englishClassSchedule || classInfo.koreanClassSchedule
            "
            :style="!mobile ? 'width: 50%' : ''"
          >
            <v-table style="border: 1px solid black; border-radius: 10px">
              <thead style="background-color: #b0d6b2">
                <tr>
                  <th class="text-center font-weight-bold">Class Date</th>
                  <th class="text-center font-weight-bold">Class Theme</th>
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
                    classInfo.classDates[index].includes('(done)')
                      ? 'text-decoration: line-through; color: grey'
                      : ''
                  "
                >
                  <th class="text-center">
                    {{ classInfo.classDates[index].replace(" (done)", "") }}
                  </th>
                  <td class="text-center">{{ schedule }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </div>

      <div class="side-div">
        <p class="text-center">Teacher</p>
        <h2 class="text-center text-decoration-underline">
          {{
            locale === "en"
              ? classInfo.englishTeacherName
              : classInfo.koreanTeacherName
          }}
        </h2>

        <div>
          <ImgMember
            :src="`/members/${classInfo.teacherID}.png`"
            :elevation="0"
            :width="250"
            :name="classInfo.teacherID"
            class="mt-5"
            bordered
            showLink
          />
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
                !Object.keys(classInfo ?? {}).includes('classDates')
              "
            >
              {{ $t("Apply Now") }}
            </v-btn>

            <p
              v-if="!Object.keys(classInfo ?? {}).includes('classDates')"
              class="text-red"
            >
              {{ $t("no class") }}
            </p>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title class="text-center">Select Class Date</v-card-title>

              <v-card-text>
                <div class="mb-10">
                  <v-radio-group
                    v-model="classNumber"
                    hide-details
                    class="py-3 rounded-lg"
                    style="border: 1px solid black"
                  >
                    <v-radio
                      v-for="(radio, index) in classInfo.classDates"
                      :label="`(${index + 1}) ${radio.replace('(done)', '')}`"
                      :key="index + 1"
                      :value="index + 1"
                      :disabled="radio.includes('(done)')"
                      :style="
                        classInfo.classDates[index].includes('(done)')
                          ? 'text-decoration: line-through; color: grey'
                          : ''
                      "
                    >
                    </v-radio>
                  </v-radio-group>
                </div>

                <div class="d-flex flex-column ga-1">
                  <v-text-field
                    v-model="s_name"
                    label="Student Name"
                    variant="outlined"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="s_email"
                    label="Student Email"
                    variant="outlined"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_name"
                    label="Guardian Name"
                    variant="outlined"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_email"
                    label="Guardian Email"
                    variant="outlined"
                    :rules="emailRules"
                  ></v-text-field>
                </div>

                <div class="mt-3">
                  <v-expansion-panels elevation="0">
                    <v-expansion-panel>
                      <v-expansion-panel-title>
                        Terms of Agreement
                        <span class="text-red ml-1">*</span>

                        <template v-slot:actions>
                          <v-icon :color="toa1 && toa2 ? 'green' : 'red'">
                            {{ toa1 && toa2 ? "mdi-check" : "mdi-alert" }}
                          </v-icon>
                        </template>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <v-checkbox v-model="toa1">
                          <template v-slot:label>
                            Personal Information used for teacher and student
                            contact
                            <span class="text-red ml-1">*</span>
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa2">
                          <template v-slot:label>
                            Personal Information will be used for class
                            documents of students
                            <span class="text-red ml-1">*</span>
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa3">
                          <template v-slot:label>
                            Emails Notifications from LinkAll
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa4">
                          <template v-slot:label>
                            Usage of Class photos (Website upload, SNS upload,
                            etc.)
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
                          Agree All
                        </v-btn>

                        <v-alert>
                          If you do not agree to uploading the class photo, the
                          student's face will be mosaiced for privacy
                          <span class="text-blue">:)</span>
                          For any inquiries, please contact
                          <a href="mailto:linkallcommunity@gmail.com">
                            linkallcommunity@gmail.com
                          </a>
                        </v-alert>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
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
          icon="$edit"
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
import { getAuth } from "firebase/auth";

const { t, locale } = useI18n();
const { $db, $auth } = useNuxtApp();
const { mobile } = useDisplay();
const route = useRoute();

const classInfo = ref({});
const isAdmin = ref(false);

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

onMounted(() => {
  const auth = getAuth();
  if (auth.currentUser) {
    loggedin.value = true;
  }

  const classRef = dbRef($db, `/class/${subject}/${id}`);

  onValue(classRef, (snapshot) => {
    classInfo.value = snapshot.val();
  });

  $auth.onAuthStateChanged((user) => {
    if (user) {
      isAdmin.value = checkAdmin(user.email);
    }
  });
});

const saveToDatabase = () => {
  const classRef = dbRef(
    $db,
    `classes/${classInfo.value.teacherEmailID}/to-join/${classInfo.value.classID}/${classNumber.value}`
  );

  let date = "";
  date = classInfo.value.classDates[parseInt(classNumber.value) - 1];

  push(classRef, {
    classNumber: classNumber.value,
    s_name: s_name.value,
    s_email: s_email.value,
    g_name: g_name.value,
    g_email: g_email.value,
    date,
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
