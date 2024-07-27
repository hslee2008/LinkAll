<template>
  <div class="mt-180 mx-5 mb-10">
    <div class="top-div">
      <div class="bottom-div">
        <div class="d-flex">
          <v-icon class="my-auto mr-3 ml-1" size="x-large">{{
            classInfo.icon
          }}</v-icon>

          <div v-if="classInfo.englishOfficialName">
            <div v-if="locale === 'en'" class="title-container">
              <h1 class="mr-3">{{ classInfo.englishOfficialName }}</h1>
              <h2 class="my-auto">➤ {{ classInfo.englishTeacherName }}</h2>
            </div>
            <div v-else-if="locale === 'ko'" class="title-container">
              <h1 class="mr-3">{{ classInfo.koreanOfficialName }}</h1>
              <h2 class="my-auto">➤ {{ classInfo.koreanTeacherName }}</h2>
            </div>
          </div>
          <v-skeleton-loader v-else type="heading"></v-skeleton-loader>
        </div>

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
          border-color="#04aefd"
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
            <v-table style="border: 1px solid grey; border-radius: 10px">
              <thead style="background-color: #95d6f4">
                <tr>
                  <th class="text-center font-weight-bold">
                    {{ $t("Category") }}
                  </th>
                  <th class="text-center font-weight-bold">
                    {{ $t("Information") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">{{ $t("Language") }}</td>
                  <td class="text-center">
                    {{ classInfo.lang ?? "Not Specified" }}
                  </td>
                </tr>
                <tr>
                  <td class="text-center">{{ $t("Grade") }}</td>
                  <td class="text-center">{{ classInfo.grade }}</td>
                </tr>
                <tr>
                  <td class="text-center">{{ $t("Est. Student") }}</td>
                  <td class="text-center">{{ classInfo.estStudent }}</td>
                </tr>
                <tr>
                  <td class="text-center">{{ $t("Class Time") }}</td>
                  <td class="text-center">{{ classInfo.estTime }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>

          <div :style="width >= 1020 ? 'width: 50%' : ''">
            <v-data-table
              style="border: 1px solid grey; border-radius: 10px"
              items-per-page="4"
              :items="
                classInfo?.classDates
                  ?.map((date, i) => {
                    return {
                      Date: date,
                      Theme:
                        classInfo[
                          locale === 'en'
                            ? 'englishClassSchedule'
                            : 'koreanClassSchedule'
                        ][i],
                      Students: Object.keys(numbersForEachClass[i + 1] ?? {})
                        .length,
                    };
                  })
                  .toReversed()
              "
              :no-data-text="$t('no class')"
            >
              <template v-slot:item.Date="{ item }">
                <p
                  :style="`${isAfterOneDay(item.Date) ? 'text-decoration: line-through' : ''}`"
                >
                  {{ item.Date }}
                </p>
              </template>
              <template v-slot:item.Theme="{ item }">
                <p
                  :style="`${isAfterOneDay(item.Date) ? 'text-decoration: line-through' : ''}`"
                >
                  {{ item.Theme }}
                </p>
              </template>
              <template v-slot:item.Students="{ item }">
                <p
                  :style="`${isAfterOneDay(item.Date) ? 'text-decoration: line-through' : ''}`"
                >
                  {{ item.Students }}
                </p>
              </template>
            </v-data-table>
          </div>
        </div>

        <div v-if="classInfo.reviews">
          <h2 class="mb-3">학생들의 후기 보기</h2>
          <v-slide-group
            v-model="model"
            selected-class="bg-success"
            show-arrows
          >
            <v-slide-group-item
              v-for="review in classInfo.reviews"
              :key="review.displayName"
            >
              <v-card width="250" variant="tonal">
                <v-card-text class="text-justify">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar
                        color="grey-darken-3"
                        :image="review.userInfo.photoURL"
                      ></v-avatar>
                    </template>

                    <v-list-item-title>
                      {{ review.userInfo.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle>LinkAll 학생</v-list-item-subtitle>
                  </v-list-item>

                  <DivCenter>
                    <v-rating
                      v-model="review.rating"
                      color="amber"
                      background-color="grey lighten-2"
                      readonly
                    ></v-rating>
                  </DivCenter>
                  {{ review.review }}
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
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
            :src="classInfo.image"
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
              color="blue-darken-1"
              :elevation="0"
              :disabled="
                classInfo?.classDates?.filter((r) => !isAfterOneDay(r))
                  ?.length === 0 || alreadyApplied
              "
            >
              {{ $t("Apply Now") }}
            </v-btn>

            <p
              v-if="
                classInfo?.classDates?.filter((r) => !isAfterOneDay(r))
                  ?.length === 0
              "
              class="text-red"
            >
              {{ $t("no class") }}
            </p>
            <div
              v-if="alreadyApplied"
              style="border: 1px solid grey"
              class="pa-3 rounded-lg"
            >
              <p class="text-justify">
                {{ $t("already applied") }}
              </p>
              <v-alert class="mt-2"> {{ appliedInfo[id]?.date }}</v-alert>
              <DivCenter classS="mt-3">
                <v-btn variant="tonal" to="/account/registeredClass">
                  <v-icon start>mdi-open-in-new</v-icon>
                  {{ $t("registered class") }}
                </v-btn>
              </DivCenter>
            </div>
            <div v-if="alreadyApplied" class="mt-3">
              <v-btn variant="tonal" block @click="review = !review">
                <v-icon start>mdi-star</v-icon>
                {{ $t("review") }}
              </v-btn>
            </div>

            <v-alert v-if="locale === 'ko'" class="mt-3 text-justify">
              마감된 수업은 대기자로 등록받습니다. 결원 발생시 별도로
              연락드리겠습니다.
            </v-alert>
            <v-alert v-else-if="locale === 'en'" class="mt-3 text-justify">
              Closed classes will be placed on a waiting list. We will contact
              you separately if vacancies become available.
            </v-alert>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title class="text-center">
                LinkAll 수업 등록하기
              </v-card-title>

              <v-card-text>
                <div class="mb-2">
                  <v-radio-group
                    v-model="classNumber"
                    hide-details
                    class="py-3 pl-3 rounded-lg"
                    style="border: 1px solid grey"
                  >
                    <v-radio
                      v-for="(radio, index) in classInfo?.classDates"
                      v-show="!isAfterOneDay(radio)"
                      :label="radio"
                      :key="index + 1"
                      :value="index + 1"
                    ></v-radio>

                    <div
                      v-if="
                        classInfo?.classDates?.filter((r) => !isAfterOneDay(r))
                          ?.length === 0
                      "
                    >
                      수업이 없습니다
                    </div>
                  </v-radio-group>
                </div>

                <div class="mb-13">
                  <v-expansion-panels>
                    <v-expansion-panel
                      elevation="0"
                      style="border: 1px solid grey"
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
                        <v-checkbox v-model="toa1" hide-details>
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
                        <v-checkbox v-model="toa2" hide-details>
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
                        <v-checkbox v-model="toa3" hide-details>
                          <template v-slot:label>
                            <span v-if="locale === 'en'">
                              Emails Notifications from LinkAll
                            </span>
                            <span v-else-if="locale === 'ko'">
                              이메일을 통한 LinkAll 뉴스
                            </span>
                          </template>
                        </v-checkbox>
                        <v-checkbox v-model="toa4" hide-details>
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
                          class="mb-5 mt-4"
                          variant="tonal"
                          block
                          @click="
                            () => {
                              toa1 = true;
                              toa2 = true;
                              toa3 = true;
                              toa4 = true;
                            }
                          "
                        >
                          <v-icon>mdi-check</v-icon>
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

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  :text="t('close')"
                  color="red"
                  @click="isActive.value = false"
                ></v-btn>
                <v-btn
                  text="Submit"
                  color="blue"
                  @click="
                    () => {
                      checkUserInfo();
                      saveToDatabase();
                      isActive.value = false;
                      thankYou = true;
                    }
                  "
                  :disabled="toa1 === false || toa2 === false"
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

    <v-dialog width="500px" v-model="anonLogin">
      <v-card class="d-flex flex-column align-center pa-4">
        <p class="text-justify">
          로그인이 되어있지 않습니다. 수업을 신청하기 위해서 익명으로 로그인 후
          등록하시겠습니까?
        </p>

        <v-row class="ga-3 my-5">
          <v-btn
            @click="anonLogin = false"
            color="red"
            class="mt-3"
            :elevation="0"
          >
            취소하기
          </v-btn>
          <v-btn
            @click="tryAnonymousLogin"
            color="primary"
            class="mt-3"
            :elevation="0"
          >
            익명으로 로그인하기
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog width="500px" v-model="review">
      <v-card class="d-flex flex-column align-center pa-4">
        <v-card-text>
          <p class="text-justify">
            수업을 들은 후 후기를 남겨주세요. 후기를 남겨주시면 다른 학생들에게
            큰 도움이 됩니다.
          </p>

          <DivCenter>
            <v-rating
              v-model="reviewInfo.rating"
              color="amber"
              background-color="grey lighten-2"
              class="mt-3"
            ></v-rating>
          </DivCenter>

          <v-textarea
            v-model="reviewInfo.review"
            label="후기"
            variant="outlined"
            class="mt-3"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-btn
            @click="addReview"
            color="primary"
            class="mt-3"
            variant="tonal"
          >
            후기 남기기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-fab
    v-if="
      isAdmin ||
      classInfo.teacherEmailID ===
        userInfo.email?.split('@')[0].replaceAll('.', '_')
    "
    absolute
    position="bottom start"
    size="50"
    icon="mdi-pencil"
    color="primary"
    :to="`/class/edit/?subject=${subject}&id=${id}`"
    class="ma-3"
  ></v-fab>
</template>

<script setup>
import { signInAnonymously } from "firebase/auth";

const { t, locale } = useI18n();
const { $db, $auth } = useNuxtApp();
const { width } = useDisplay();
const route = useRoute();

const max = ref(0);
const min = ref(0);
const classInfo = ref({});

const past = ref([]);
const future = ref([]);

const isAdmin = ref(false);
const userInfo = ref({});
const alreadyApplied = ref(false);
const appliedInfo = ref({});
const numbersForEachClass = ref([]);

const subject = route.query.subject;
const id = route.query.id;

const classNumber = ref(null);
const s_name = ref("");
const s_email = ref("");
const g_name = ref("");
const g_email = ref("");

const toa1 = ref(false);
const toa2 = ref(false);
const toa3 = ref(false);
const toa4 = ref(false);

const anonLogin = ref(false);
const review = ref(false);
const loggedin = ref(false);
const thankYou = ref(false);

const reviewInfo = ref({});

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
      numbersForEachClass.value = (await snapshot.val()) || [];
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

  for (let i in classInfo.value.classDates) {
    const classDate = classInfo.value.classDates[i];
    if (isAfterOneDay(classDate)) {
      past.value.push(classDate);
    } else {
      future.value.push(classDate);
    }
  }
});

const tryAnonymousLogin = () => {
  const auth = getAuth();
  signInAnonymously(auth).then(() => {
    saveToDatabase();
    anonLogin.value = false;
    thankYou.value = true;
  });
};

const checkUserInfo = () => {
  if (!userInfo.value.uid) {
    anonLogin.value = true;
  }
};

const saveToDatabase = () => {
  const classRef = dbRef(
    $db,
    `classes/${classInfo.value.teacherEmailID}/to-join/${classInfo.value.classID}/${classNumber.value}/${userInfo.value.uid}`
  );

  let date = "";
  date = classInfo.value.classDates[parseInt(classNumber.value) - 1];

  console.log(date);
  console.log(classNumber.value);
  console.log(classInfo.value.classDates);

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

function addReview() {
  const reviewRef = dbRef(
    $db,
    `/class/${subject}/${id}/reviews/${userInfo.value.uid}`
  );
  set(reviewRef, {
    rating: reviewInfo.value.rating,
    review: reviewInfo.value.review,
    userInfo: {
      name: userInfo.value.displayName,
      photoURL: userInfo.value.photoURL,
    },
  });
  review.value = false;
}
</script>

<style>
th {
  background-color: #95d6f4 !important;
}
</style>

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
  overflow: hidden;
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
    font-size: 1.25rem;
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
