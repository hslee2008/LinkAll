<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Add / Edit School</h1>

    <br />

    <DivCenter>
      <v-img v-if="urll" :src="urll"></v-img>

      <div style="width: 500px">
        <p class="mb-3 text-justify">
          Use
          <a href="https://remove.bg" target="_blank">Background Remover</a> to
          make the image transparent.
        </p>
        <v-file-input
          accept="image/*"
          label="File input"
          variant="outlined"
          prepend-inner-icon="mdi-paperclip"
          prepend-icon=""
          @change="previewImage"
        ></v-file-input>
        <v-text-field
          v-model="schoolID"
          variant="outlined"
          label="School Abbreviation (i.e. HAFS, PGHS)"
        ></v-text-field>
        <v-text-field
          v-model="schoolKoreanName"
          variant="outlined"
          label="School Korean Name (i.e. 판교고등학교)"
        ></v-text-field>
        <v-text-field
          v-model="schoolEnglishName"
          variant="outlined"
          label="School English Name (i.e. Pangyo High School)"
        ></v-text-field>
        <v-text-field
          v-model="schoolMemberNumber"
          variant="outlined"
          label="School Member Number (i.e. 5, 1)"
        ></v-text-field>
        <v-text-field
          v-model="schoolHomepage"
          variant="outlined"
          label="School Home Page URL"
        ></v-text-field>
      </div>

      <v-btn @click="Upload" variant="tonal">Save</v-btn>

      <br /><br /><br />
    </DivCenter>
  </div>
</template>

<script setup>
import { ref as sRef, uploadBytes } from "firebase/storage";

const router = useRouter();
const { $db, $storage } = useNuxtApp();

const schoolID = ref("");
const schoolEnglishName = ref("");
const schoolKoreanName = ref("");
const schoolHomepage = ref("");
const schoolMemberNumber = ref(0);

const imageData = ref(null);

function previewImage(e) {
  imageData.value = e.target.files[0];
}

function Upload() {
  const storageRef = sRef($storage, `school/${schoolID.value}.png`);
  uploadBytes(storageRef, imageData.value);
  getDownloadURL(storageRef, (url) => {
    const school = dbRef($db, `school/${schoolID.value}`);
    set(school, {
      id: schoolID.value,
      schoolEnglishName: schoolEnglishName.value,
      schoolKoreanName: schoolKoreanName.value,
      schoolMemberNumber: schoolMemberNumber.value,
      schoolHomepage: schoolHomepage.value,
      image: url,
    });
  }).catch((e) => alert("There is no image"));

  router.go(0);
}
</script>
