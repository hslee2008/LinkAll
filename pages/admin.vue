<template>
  <div class="mt-180 pa-3">
    <div
      v-if="!passed"
      class="d-flex justify-content-center align-items-center"
    >
      <v-card width="500px" elevation="10">
        <v-card-title>Admin</v-card-title>

        <v-card-text>
          <v-otp-input
            v-model="password"
            type="password"
            length="8"
          ></v-otp-input>
        </v-card-text>
      </v-card>
    </div>

    <div v-else class="mx-12">
      <h1 class="text-center header-u">Admin</h1>

      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="outlined" class="my-3">
            Schedule Class
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card
            title="Schedule Google Meet Class"
            subtitle="Note that only one meeting is allowed per class"
          >
            <v-card-text>
              <v-select
                v-model="selectedClass"
                :items="classes"
                label="Select Class"
                outlined
                class="my-3"
              ></v-select>

              <v-date-picker v-model="currentDate"></v-date-picker>

              <v-textarea
                v-model="classLink"
                label="Class Link"
                outlined
                class="my-3"
              ></v-textarea>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                color="primary"
                @click="() => save(() => (isActive.value = false))"
                class="mr-4"
              >
                Save
              </v-btn>
              <v-btn
                text="Cancel"
                color="red"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <v-list>
        <v-list-item
          v-for="user in waiting"
          :key="user.id"
          :prepend-avatar="user.userInfo.photoURL"
        >
          <v-list-item-title>
            {{ user.firstName }} {{ user.lastName }} ({{ user.country }})
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.email }} / {{ user.phone }}
          </v-list-item-subtitle>

          <v-card class="my-4 pa-3" width="200">
            <p>{{ user.grade }}</p>
            <v-card-text>{{ user.brief }}</v-card-text>
          </v-card>

          <v-list-item-action>
            <v-btn variant="tonal" class="mt-3" @click="acceptUser(user.id)">
              Accept
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref as dbRef, onValue, set } from "firebase/database";

const { t } = useI18n();

const passed = ref(false);
const password = ref("");
const waiting = ref([]);
const selectedClass = ref("");
const classes = ["English", "Korean", "Tech", "Arts"];
const classLink = ref("");

const { $db } = useNuxtApp();

const cd = new Date();
const date = cd.getFullYear() + "-" + (cd.getMonth() + 1) + "-" + cd.getDate();
const currentDate = ref(new Date(date));

const save = (close) => {
  const date = currentDate.value;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateStr = year + "-" + month + "-" + day;

  set(dbRef($db, `schedule/${selectedClass.value}`), {
    date: dateStr,
    link: classLink.value,
  });

  selectedClass.value = "";
  classLink.value = "";

  close();
};

watch(password, (val) => {
  if (val === "30002024") {
    passed.value = true;
    localStorage.setItem("adminPassed", "true");
  }
});

const fetchJoiningUsers = async () => {
  onValue(dbRef($db, "join-us-waiting"), (snapshot) => {
    waiting.value = snapshot.val();
  });
};

onMounted(() => {
  fetchJoiningUsers();

  if (localStorage.getItem("adminPassed") === "true") {
    passed.value = true;
  }
});

useHead({
  title: t("admin"),
});
</script>
