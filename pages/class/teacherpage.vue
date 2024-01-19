<template>
  <div class="mt-180 mx-5 mb-10">
    <h1>Teacher's Page (id: {{ parsedEmail }})</h1>

    <div v-if="classes[parsedEmail]">
      <h2>Classes</h2>

      <v-card
        v-for="(classObj, index) in Object.values(
          classes[parsedEmail]['to-join'] ?? {}
        )"
        :key="Object.keys(classes[parsedEmail]['to-join'] ?? {})[index]"
        elevation="10"
        class="pa-3 my-5"
      >
        <v-card-title>
          {{ Object.keys(classes["h_junho420"]["to-join"] ?? {})[index] }}
          Class
        </v-card-title>

        <v-list class="ml-4">
          <div
            v-for="student in Object.values(classObj ?? {})"
            :key="student"
            class="d-flex"
            style="gap: 50px"
          >
            <v-list-item
              lines="two"
              rounded
              style="background-color: rgb(221, 208, 208)"
              class="my-4"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-account"></v-icon>
              </template>

              <v-list-item-title>{{ student.s_name }}</v-list-item-title>
              <v-list-item-title>{{ student.s_email }}</v-list-item-title>

              <v-list-item-action class="mt-3">
                <v-btn color="primary" :href="`mailto:${student.s_email}`">
                  Mail Student
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item
              lines="two"
              rounded
              style="background-color: rgb(178, 172, 172)"
              class="my-4"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-account"></v-icon>
              </template>

              <v-list-item-title>{{ student.g_name }}</v-list-item-title>
              <v-list-item-title>{{ student.g_email }}</v-list-item-title>

              <v-list-item-action class="mt-3">
                <v-btn color="primary" :href="`mailto:${student.g_email}`">
                  Mail Guardian
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onValue, ref as dbRef } from "firebase/database";

const { $db, $auth } = useNuxtApp();

const parsedEmail = ref("");
const classes = ref({});

$auth.onAuthStateChanged((user) => {
  if (user) {
    parsedEmail.value = user.email.split("@")[0].replaceAll(".", "_");
  }
});

const teacherRef = onValue(dbRef($db, "classes"), (snapshot) => {
  classes.value = snapshot.val();
});
</script>
