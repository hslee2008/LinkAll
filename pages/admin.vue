<template>
  <div style="margin-top: 150px; padding: 10px">
    <div
      v-if="!passed"
      style="display: flex; justify-content: center; align-items: center"
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

    <div v-else style="margin-left: 140px">
      <h1 class="text-center" style="font-size: 50px; text-decoration: underline">Admin</h1>

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
import { ref as dbRef, onValue } from "firebase/database";

const { t } = useI18n();

const passed = ref(false);
const password = ref("");
const waiting = ref([]);

const { $db } = useNuxtApp();

watch(password, (val) => {
  if (val === "30002024") {
    passed.value = true;
  }
});

const fetchJoiningUsers = async () => {
  onValue(dbRef($db, "join-us-waiting"), (snapshot) => {
    waiting.value = snapshot.val();
  });
};

onMounted(() => {
  fetchJoiningUsers();
});

useHead({
  title: "Admin",
});
</script>
