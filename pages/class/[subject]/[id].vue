<template>
  <div class="mt-180 mx-5 mb-10">
    <div class="top-div">
      <div class="mr-7">
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

        <p class="text-justify">
          <span v-if="locale === 'en'">
            {{ classInfo.englishClassDescription }}
          </span>
          <span v-else-if="locale === 'ko'">
            {{ classInfo.koreanClassDescription }}
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
        <h2 style="font-family: Grape Nuts" class="font-weight-black ml-3 mb-3">
          - Think for All, Link All.
        </h2>

        <div class="my-10">
          <v-table style="border: 1px solid black; border-radius: 10px">
            <thead>
              <tr>
                <th class="text-left">Category</th>
                <th class="text-left">Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Grade</th>
                <td>{{ classInfo.grade }}</td>
              </tr>
              <tr>
                <th>Est. Student</th>
                <td>{{ classInfo.estStudent }}</td>
              </tr>
              <tr>
                <th>Class Time</th>
                <td>{{ classInfo.estTime }}</td>
              </tr>
            </tbody>
          </v-table>
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

        <ImgMember
          :src="`/members/${classInfo.teacherID}.png`"
          elevation="0"
          width="250"
        />

        <p class="text-justify my-4 ma-auto" style="width: 250px">
          <span v-if="locale === 'en'">
            {{ classInfo.englishAboutMe }}
          </span>
          <span v-else-if="locale === 'ko'">
            {{ classInfo.koreanAboutMe }}
          </span>
        </p>

        <v-dialog width="500" transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              block
              class="my-4 mb-10 rounded-lg"
              color="yellow-darken-1"
              :elevation="0"
              :disabled="!loggedin"
            >
              {{ $t("Apply Now") }}
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Apply for a class">
              <v-card-text>
                <v-form>
                  <p>Select Class Date</p>
                  <v-radio-group v-model="classNumber">
                    <v-radio
                      v-for="(radio, index) in classInfo.classDates"
                      :label="`(${index + 1}) ${radio}`"
                      :key="index + 1"
                      :value="index + 1"
                    >
                    </v-radio>
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
                  :disabled="
                    s_name === '' ||
                    s_email === '' ||
                    g_name === '' ||
                    g_email === ''
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
import { useI18n } from "vue-i18n";
import { push, ref as dbRef, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const { t, locale } = useI18n();
const { $db, $auth } = useNuxtApp();
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
      if (
        user.email === "h.junho420@gmail.com" ||
        user.email === "hyunseunglee2008@gmail.com"
      ) {
        isAdmin.value = true;
      }
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

.side-div {
  margin-right: 20px;
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
