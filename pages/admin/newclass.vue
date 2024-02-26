<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">New Class</h1>

    <br />

    <DivCenter>
      <div class="container">
        <v-label>
          icon (<a
            target="_blank"
            href="https://pictogrammers.com/library/mdi/"
          >
            mdi icons </a
          >)
        </v-label>
        <v-text-field
          :prepend-inner-icon="icon"
          v-model="icon"
          variant="outlined"
        ></v-text-field>

        <v-label>English class display name</v-label>
        <v-text-field
          v-model="englishDisplayName"
          variant="outlined"
        ></v-text-field>

        <v-label>Korean class display name</v-label>
        <v-text-field
          v-model="koreanDisplayName"
          variant="outlined"
        ></v-text-field>

        <v-label>Subject</v-label>
        <v-select
          v-model="subject"
          :items="subjectArray"
          variant="outlined"
        ></v-select>

        <v-label>Class ID</v-label>
        <v-text-field v-model="classID" variant="outlined"></v-text-field>

        <v-label>Teacher Name English</v-label>
        <v-text-field
          v-model="englishTeacherName"
          variant="outlined"
        ></v-text-field>

        <v-label>Teacher Name Korean</v-label>
        <v-text-field
          v-model="koreanTeacherName"
          variant="outlined"
        ></v-text-field>

        <v-label class="text-red">
          Teacher Name English ONLY First Name ALL LOWER CAPS
        </v-label>
        <v-text-field
          v-model="teacherID"
          variant="outlined"
          base-color="red"
          bg-color="red"
          placeholder="ex) hyunseung, junho"
        ></v-text-field>

        <v-label class="text-red">
          Teacher Email only before @ (. should be replaced with _)
        </v-label>
        <v-text-field
          v-model="teacherEmailID"
          variant="outlined"
          base-color="red"
          bg-color="red"
          placeholder="ex) hslee.2008@gmail.com -> hslee_2008"
        ></v-text-field>

        <v-label>English class offical name</v-label>
        <v-text-field
          v-model="englishOfficialName"
          variant="outlined"
        ></v-text-field>

        <v-label>Korean class name</v-label>
        <v-text-field
          v-model="koreanOfficialName"
          variant="outlined"
        ></v-text-field>

        <v-label>English class description</v-label>
        <v-textarea
          v-model="englishClassDescription"
          variant="outlined"
        ></v-textarea>

        <v-label>Korean class description</v-label>
        <v-textarea
          v-model="koreanClassDescription"
          variant="outlined"
        ></v-textarea>

        <v-label>English about me</v-label>
        <v-textarea v-model="englishAboutMe" variant="outlined"></v-textarea>

        <v-label>Korean about me</v-label>
        <v-textarea v-model="koreanAboutMe" variant="outlined"></v-textarea>

        <div style="border: 1px solid blue" class="rounded-lg pa-3 mb-10">
          <v-label>Language</v-label>
          <v-text-field
            v-model="lang"
            placeholder="ex) English, 한국어 (with comma or only one)"
            variant="outlined"
          ></v-text-field>

          <v-label>Grade</v-label>
          <v-text-field
            v-model="grade"
            placeholder="ex) 7 ~ 9"
            variant="outlined"
          ></v-text-field>

          <v-label>Estimated Student per class</v-label>
          <v-text-field
            v-model="estStudent"
            placeholder="ex) 6 ~ 8 / class"
            variant="outlined"
          ></v-text-field>

          <v-label>Estimated Time per class</v-label>
          <v-text-field
            v-model="estTime"
            placeholder="9PM ~ 10PM (GMT+9)"
            variant="outlined"
          ></v-text-field>
        </div>

        <DivCenter>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="tonal" class="rounded-pill">
                <v-icon start>mdi-calendar</v-icon> Dates
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-title>Add/Edit Dates</v-card-title>

                <v-card-text>
                  <v-text-field
                    v-model="toAdd"
                    placeholder="2024/3/3"
                    variant="solo-filled"
                    class="rounded-lg"
                  ></v-text-field>
                  <DivCenter class="mb-6">
                    <v-btn variant="tonal" @click="add">
                      <v-icon start>mdi-plus</v-icon>
                      add
                    </v-btn>
                  </DivCenter>

                  <v-list>
                    <v-list-item
                      v-for="(item, index) in classDates"
                      :key="item"
                      class="rounded-lg mb-3 pa-2"
                      style="border: 1px solid blue"
                    >
                      <v-list-item-title>
                        Class {{ index + 1 }}. {{ item }}
                      </v-list-item-title>

                      <v-list-item-action class="mt-2">
                        <v-btn variant="tonal" @click="deleteClassDate(index)">
                          <v-icon start>mdi-delete</v-icon> Delete
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card-text>

                <v-card-actions class="d-flex justify-center my-3">
                  <v-btn @click="isActive.value = false" color="red">
                    {{ $t("close") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="tonal" class="rounded-pill ml-2">
                Class Schedule
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-title>Add/Edit Schedule</v-card-title>

                <v-card-text>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in classDates"
                      :key="item"
                      class="rounded-lg mb-3 pa-4"
                      style="border: 1px solid blue"
                    >
                      <v-list-item-title>
                        Class {{ index + 1 }}: {{ item }}
                      </v-list-item-title>

                      <v-text-field
                        variant="underlined"
                        placeholder="should put english class schedule explanation here"
                        v-model="englishClassSchedule[index]"
                      ></v-text-field>

                      <v-text-field
                        variant="underlined"
                        placeholder="한국어 수업 설명"
                        v-model="koreanClassSchedule[index]"
                      ></v-text-field>
                    </v-list-item>
                  </v-list>
                </v-card-text>

                <v-card-actions class="d-flex justify-center my-3">
                  <v-btn @click="isActive.value = false" color="red">
                    {{ $t("close") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </DivCenter>

        <DivCenter class="mt-10">
          <v-btn @click="makeNewClass" variant="outlined">
            Make New Class
          </v-btn>
        </DivCenter>
      </div>
    </DivCenter>

    <br /><br /><br />
  </div>
</template>

<script setup>
const router = useRouter();
const { $db } = useNuxtApp();

const icon = ref("mdi-math-compass");
const englishDisplayName = ref("");
const koreanDisplayName = ref("");
const subject = ref("");
const subjectArray = ref(["english", "math", "korean", "tech"]);
const classID = ref("");
const englishTeacherName = ref("");
const koreanTeacherName = ref("");
const teacherID = ref("");
const teacherEmailID = ref("");
const englishOfficialName = ref("");
const koreanOfficialName = ref("");
const englishClassDescription = ref("");
const koreanClassDescription = ref("");
const englishAboutMe = ref("");
const koreanAboutMe = ref("");
const grade = ref("");
const estStudent = ref("");
const estTime = ref("");
const classDates = ref([]);
const englishClassSchedule = ref([]);
const koreanClassSchedule = ref([]);
const lang = ref("");

const toAdd = ref("");
function add() {
  classDates.value.push(toAdd.value);
  toAdd.value = "";
}

function deleteClassDate(index) {
  classDates.value.splice(index, 1);
}

function makeNewClass() {
  const classRef = dbRef($db, `class/${subject.value}/${classID.value}`);
  set(classRef, {
    icon: icon.value,
    englishDisplayName: englishDisplayName.value,
    koreanDisplayName: koreanDisplayName.value,
    subject: subject.value,
    classID: classID.value,
    englishTeacherName: englishTeacherName.value,
    koreanTeacherName: koreanTeacherName.value,
    teacherID: teacherID.value,
    teacherEmailID: teacherEmailID.value,
    englishOfficialName: englishOfficialName.value,
    koreanOfficialName: koreanOfficialName.value,
    englishClassDescription: englishClassDescription.value,
    koreanClassDescription: koreanClassDescription.value,
    englishAboutMe: englishAboutMe.value,
    koreanAboutMe: koreanAboutMe.value,
    grade: grade.value,
    estStudent: estStudent.value,
    estTime: estTime.value,
    classDates: classDates.value,
    englishClassSchedule: englishClassSchedule.value,
    koreanClassSchedule: koreanClassSchedule.value,
    lang: lang.value,
  });

  router.push("/actions/education");
}
</script>

<style scoped>
.container {
  min-width: 400px;
}

@media (max-width: 450px) {
  .container {
    width: calc(100vw - 50px);
    min-width: initial;
  }
}
</style>
