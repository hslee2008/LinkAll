<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">New Notification</h1>

    <br />

    <div class="mx-10">
      <v-text-field
        v-model="title"
        variant="outlined"
        placeholder="Notification Title"
      >
      </v-text-field>
      <v-textarea
        v-model="contents"
        placeholder="Notification Contents"
        variant="outlined"
      ></v-textarea>
      <v-btn color="primary" @click="Post">Post</v-btn>
    </div>
  </div>
</template>

<script setup>
import { set, ref as dbRef } from "firebase/database";

const router = useRouter();
const { $db } = useNuxtApp();

const title = ref("");
const contents = ref("");

const Post = () => {
  const date = new Date();
  const time = date.getTime();

  const notificationRef = dbRef($db, `/notification/${time}`);
  set(notificationRef, {
    title: title.value,
    contents: contents.value,
    time,
  });

  router.push("/");
};
</script>
