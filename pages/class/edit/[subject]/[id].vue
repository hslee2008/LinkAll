<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">New Class</h1>

    <br />

    <DivCenter>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" elevation="0" color="red">Delete Class</v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Delete Class">
            <v-card-text>
              Do you really want to delete this class?
              <br />
              It will be copletely erased from the database.<br />
              There will be no way of recovering it.
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                text="Delete Class"
                prepend-icon="mdi-delete"
                color="red"
                @click="deleteClass"
              ></v-btn>

              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </DivCenter>

    <br />

    <DivCenter>
      <div style="min-width: 400px">
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
          disabled
        ></v-select>

        <v-label>Class ID</v-label>
        <v-text-field
          v-model="classID"
          variant="outlined"
          disabled
        ></v-text-field>

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
          disabled
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
          disabled
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
            <v-list-itme-title>
              Class {{ index + 1 }}. {{ item }}
            </v-list-itme-title>

            <v-list-item-actions>
              <v-btn
                icon="mdi-delete"
                variant="icon"
                size="small"
                @click="deleteClassDate(index)"
              ></v-btn>
            </v-list-item-actions>
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
          <v-btn @click="updateClass" elevation="0">Update Class</v-btn>
        </DivCenter>
      </div>
    </DivCenter>

    <br /><br /><br />
  </div>
</template>

<script setup>
import { ref as dbRef, update, onValue, set } from "firebase/database";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const { $db } = useNuxtApp();

const subjectID = route.params.subject;
const idID = route.params.id;

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

onMounted(() => {
  const classRef = dbRef($db, `class/${subjectID}/${idID}`);
  onValue(classRef, (snapshot) => {
    const data = snapshot.val();

    icon.value = data.icon;
    englishDisplayName.value = data.englishDisplayName;
    koreanDisplayName.value = data.koreanDisplayName;
    subject.value = data.subject;
    classID.value = data.classID;
    englishTeacherName.value = data.englishTeacherName;
    koreanTeacherName.value = data.koreanTeacherName;
    teacherID.value = data.teacherID;
    teacherEmailID.value = data.teacherEmailID;
    englishOfficialName.value = data.englishOfficialName;
    koreanOfficialName.value = data.koreanOfficialName;
    englishClassDescription.value = data.englishClassDescription;
    koreanClassDescription.value = data.koreanClassDescription;
    englishAboutMe.value = data.englishAboutMe;
    koreanAboutMe.value = data.koreanAboutMe;
    grade.value = data.grade;
    estStudent.value = data.estStudent;
    estTime.value = data.estTime;
    classDates.value = data.classDates;
  });

  if (classDates.value === undefined) {
    classDates.value = [];
  }
});

function deleteClassDate(index) {
  classDates.value.splice(index, 1);
}

function deleteClass() {
  const classRef = dbRef($db, `class/${subjectID}/${idID}`);
  set(classRef, null);

  const studentsRef = dbRef($db, `classses/${teacherID.value}/to-join/${idID}`);
  set(studentsRef, null);

  router.go("/actions/education");
}

function updateClass() {
  const classRef = dbRef($db, `class/${subjectID}/${idID}`);
  update(classRef, {
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
