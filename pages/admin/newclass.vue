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
          placeholder="ex) hslee.2008@gmail.com -> hslee.2008"
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
          placeholder="ex) 1h / class"
          variant="outlined"
        ></v-text-field>

        <v-label>Class Dates</v-label>
        <v-list>
          <v-list-item v-for="(item, index) in classDates" :key="item">
            <span> Class {{ index + 1 }}. {{ item }} </span>

            <v-list-item-action>
              <v-btn
                icon="mdi-delete"
                variant="plain"
                size="small"
                @click="deleteClassDate(index)"
              ></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-text-field
          v-model="toAdd"
          placeholder="2024/3/3"
          variant="outlined"
        ></v-text-field>
        <v-btn elevation="0" @click="add">
          <v-icon start>mdi-plus</v-icon>
          add
        </v-btn>

        <DivCenter>
          <v-btn @click="makeNewClass" elevation="0">Make New Class</v-btn>
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
const subjectArray = ref(["english", "math", "arts", "tech"]);
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
