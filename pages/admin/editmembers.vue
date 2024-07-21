<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Members</h1>
    <br />
    <div class="ma-3">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="member in members"
          :key="member.id"
          class="my-3"
        >
          <v-expansion-panel-title>
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <v-img
                  v-if="memberImages[member.id]"
                  :src="memberImages[member.id]"
                  width="50"
                  class="rounded-lg"
                  style="border: 1px solid grey"
                ></v-img>
                <div class="ml-3">{{ member.englishFullName }}</div>
              </div>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <v-file-input
                label="이미지 업로드"
                variant="outlined"
                @change="uploadImage(member.id, $event)"
              ></v-file-input>
              <v-img
                v-if="memberImages[member.id]"
                :src="memberImages[member.id]"
                width="250"
                class="rounded-lg mx-auto"
                style="border: 1px solid grey"
              ></v-img>
              <div
                v-else
                class="d-flex justify-center align-center"
                style="width: 250px; height: 330.49px"
              >
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <div
                v-else
                class="d-flex justify-center align-center"
                style="width: 250px; height: 330.49px"
              >
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
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
                label="Korean Full Name"
              ></v-text-field>
              <v-text-field
                v-model="member.id"
                variant="outlined"
                label="English First Name (all lowercase)"
              ></v-text-field>
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
                label="Gmail ID"
              ></v-text-field>
              <v-text-field
                v-model="member.order"
                variant="outlined"
                label="Order"
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
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <br /><br />
    <br /><br />
    <DivCenter>
      <v-btn color="primary" @click="Update">Update</v-btn>
    </DivCenter>
    <br /><br />
    <br /><br />
  </div>
</template>
<script setup>
import {
  ref as sRef,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const router = useRouter();
const { $storage, $db } = useNuxtApp();

const members = ref({});
const memberImages = ref({});

onMounted(() => {
  onValue(dbRef($db, "members"), (snapshot) => {
    const data = snapshot.val();
    members.value = sortByOrderAndConvertToObject(data);
    Object.keys(members.value ?? {}).forEach(async (item) => {
      let link = "";
      await getDownloadURL(
        sRef($storage, `members/${members.value[item].id}.png`)
      )
        .then((url) => (link = url))
        .catch((error) => {
          alert(error);
        });
      memberImages.value[members.value[item].id] = link;
    });
  });
});

async function uploadImage(memberId, event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileRef = sRef($storage, `members/${memberId}.png`);

  // Delete the existing image first
  deleteObject(fileRef).catch((error) => {
    console.log("No existing image to delete:", error);
  });

  // Upload the new image
  await uploadBytes(fileRef, file)
    .then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      memberImages.value[memberId] = url;
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
}

function Update() {
  set(dbRef($db, "members"), members.value);
  router.push("/members/members");
}
</script>
