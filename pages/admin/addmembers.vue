<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Members</h1>

    <br />

    <div class="ma-3">
      <div class="mr-6 pa-6 ga-5 d-flex">
        <div style="width: 500px">
          <v-img v-if="image" :src="image" class="rounded-lg"></v-img>
          <v-select
            v-model="member.role"
            variant="outlined"
            class="mt-3"
            label="Role"
            :items="['founder', 'co-founder', 'teacher', 'designer']"
          ></v-select>
          <v-text-field
            v-model="member.englishFullName"
            variant="outlined"
            label="English Full Name"
          ></v-text-field>
          <v-text-field
            v-model="member.koreanFullName"
            variant="outlined"
            label="한국어 이름"
          ></v-text-field>
          <v-text-field
            v-model="member.id"
            variant="outlined"
            label="English First Name (all lowercase)"
          ></v-text-field>
          <v-btn color="error" class="mb-10" @click="checkForImage">
            CHECK FOR IMAGE
          </v-btn>

          <v-text-field
            v-model="member.sns.instagram"
            variant="outlined"
            prepend-inner-icon="mdi-instagram"
            label="Instagram ID"
          ></v-text-field>
          <v-text-field
            v-model="member.sns.gmail"
            variant="outlined"
            prepend-inner-icon="mdi-gmail"
            label="Gmail"
          ></v-text-field>
        </div>

        <div style="min-width: calc(100vw - 370px)">
          <v-textarea
            v-model="member.englishAboutMe"
            variant="outlined"
            label="English - About Me"
          ></v-textarea>
          <v-textarea
            v-model="member.koreanAboutMe"
            variant="outlined"
            label="한국어 - 자기 소개"
          ></v-textarea>
          <v-textarea
            v-model="member.englishAwards"
            variant="outlined"
            label="English - Awards"
          ></v-textarea>
          <v-textarea
            v-model="member.koreanAwards"
            variant="outlined"
            label="한국어 - 상"
          ></v-textarea>
        </div>

        <br /><br />
      </div>
    </div>

    <br /><br />
    <br /><br />

    <DivCenter>
      <v-btn color="primary" :disabled="!image" @click="Add">Add</v-btn>
    </DivCenter>

    <br /><br />
    <br /><br />
  </div>
</template>

<script setup>
import { ref as sRef, getDownloadURL } from "firebase/storage";

const router = useRouter();
const { $storage, $db } = useNuxtApp();

const image = ref("");
const member = ref({
  role: "",
  koreanAboutMe: "",
  englishAboutMe: "",
  englishFullName: "",
  koreanFullName: "",
  id: "",
  sns: {
    instagram: "",
    gmail: "",
  },
  koreanAwards: "",
  englishAwards: "",
  image: "",
  order: -1,
});

function checkForImage() {
  const storageRef = sRef($storage, `members/${member.value.id}.png`);

  getDownloadURL(storageRef, (url) => (image.value = url)).catch((e) =>
    alert("There is no image")
  );
}

function Add() {
  const membersRef = dbRef($db, `members/${member.value.id}`);
  set(membersRef, member.value);
  router.push("/members/members");
}
</script>
