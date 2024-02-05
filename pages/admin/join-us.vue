<template>
  <div class="top-div-without-bg">
    <div>
      <h1 class="text-center">Waiting Users</h1>

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

          <v-card-actions>
            <div class="mx-auto">
              <v-btn @click="accept">Accept</v-btn>
              <v-btn @click="dialog = false">Close</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div>
      <h1 class="text-center">Accepted Users</h1>

      <v-list>
        <v-list-item v-for="(user, index) in accepted" :key="index">
          <template v-slot:prepend>
            <v-avatar v-if="user.picOfMe">
              <v-img :src="user.picOfMe" />
            </v-avatar>
            <v-avatar v-else>
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
    </div>
  </div>
</template>

<script setup>
import { ref as dbRef, onValue, set } from "firebase/database";

const { $db } = useNuxtApp();

const users = dbRef($db, "join-us-waiting");
const acceptedUsers = dbRef($db, "accepted");

const waiting = ref([]);
const accepted = ref([]);
const dialog = ref(false);
const user = ref({});

onMounted(() => {
  onValue(users, (snapshot) => {
    const waitingUsers = Object.values(snapshot.val() ?? []);
    const keys = Object.keys(snapshot.val() ?? []);

    for (const key in waitingUsers) {
      waiting.value.push({
        ...Object.values(waitingUsers[key] ?? {})[0],
        id: keys[key],
      });
    }
  });

  onValue(acceptedUsers, (snapshot) => {
    const acceptedPeople = snapshot.val() ?? {};

    for (const key in acceptedPeople) {
      accepted.value.push(acceptedPeople[key]);
    }
  });
});

const openDialog = (index) => {
  dialog.value = true;
  user.value = waiting.value[index];
};

function accept() {
  set(dbRef($db, `accepted/${user.value.id}`), user.value);
  set(dbRef($db, `join-us-waiting/${user.value.id}`), null);
  dialog.value = false;
}
</script>
