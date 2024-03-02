<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Upload Member Image</h1>

    <br />

    <DivCenter>
      <v-img v-if="urll" :src="urll"></v-img>

      <div style="width: 500px">
        <p class="mb-3 text-justify">
          Using
          <a href="https://imageresizer.com/" target="_blank"
            >Image Resizer Online</a
          >, please resize the image to exactly 354x471. Also, make it a .png
          image. Finally, use
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
          v-model="id"
          variant="outlined"
          label="ID of the member (first name lower caps)"
        ></v-text-field>
      </div>

      <v-btn @click="Upload" variant="tonal">Save</v-btn>
    </DivCenter>
  </div>
</template>

<script setup>
import { ref as sRef, uploadBytes } from "firebase/storage";

const router = useRouter();
const { $storage } = useNuxtApp();

const urll = ref("");
const id = ref("");
const imageData = ref(null);

function previewImage(e) {
  imageData.value = e.target.files[0];
}

function Upload() {
  const storageRef = sRef($storage, `members/${id.value}.png`);

  uploadBytes(storageRef, imageData.value).then(() => {
    router.push("/admin");
  });
}
</script>
