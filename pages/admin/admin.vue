<template>
  <div class="top-div-without-bg">
    <h1 class="text-center header-u">Waiting Users</h1>

    <v-list>
      <v-list-item
        v-for="(user, index) in waiting"
        :key="index"
        @click="openDialog(index)"
      >
        <template v-slot:prepend>
          <v-avatar>
            {{ user.grade.replaceAll("Grade ", "") }}
          </v-avatar>
        </template>

        <v-list-item-title>
          {{ user.firstName }} {{ user.lastName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ user.email }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          {{ user.firstName }} {{ user.lastName }} ({{ user.grade }})
        </v-card-title>
        <v-card-subtitle>{{ user.email }} / {{ user.phone }}</v-card-subtitle>

        <v-table>
          <thead>
            <tr>
              <th class="text-center">Category</th>
              <th class="text-center">Information</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="text-center">Country</td>
              <td class="text-center">{{ user.country }}</td>
            </tr>
            <tr>
              <td class="text-center">School Name</td>
              <td class="text-center">{{ user.schoolName }}</td>
            </tr>
            <tr>
              <td class="text-center">Wanting Role</td>
              <td class="text-center">{{ user.radios }}</td>
            </tr>
            <tr>
              <td class="text-center">How this user found this website</td>
              <td class="text-center">{{ user.howFound }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-card-text>{{ user.brief }}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue } from "firebase/database";

const { $db } = useNuxtApp();

const users = dbRef($db, "join-us-waiting");
const waiting = ref([]);
const dialog = ref(false);
const user = ref({});

onMounted(() => {
  onValue(users, (snapshot) => {
    const waitingUsers = Object.values(snapshot.val() ?? []);

    for (const user of waitingUsers) {
      waiting.value.push(Object.values(user)[0]);
    }
  });
});

const openDialog = (index) => {
  dialog.value = true;
  user.value = waiting.value[index];
};
</script>
