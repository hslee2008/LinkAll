<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Site Values</h1>

    <br />

    <DivCenter class="ma-4">
      <div style="min-width: 400px">
        <v-label>Taught Students</v-label>
        <v-text-field
          v-model="taughtStudents"
          variant="outlined"
        ></v-text-field>
        <v-label>won donated</v-label>
        <v-text-field v-model="wonDonated" variant="outlined"></v-text-field>
        <v-label>hours of volunteering</v-label>
        <v-text-field v-model="hoursOf" variant="outlined"></v-text-field>

        <DivCenter>
          <v-btn @click="updateSiteValue" elevation="0"> Update</v-btn>
        </DivCenter>
      </div>
    </DivCenter>
  </div>
</template>

<script setup>
import { ref as dbRef, update, onValue } from "firebase/database";

const taughtStudents = ref("0");
const wonDonated = ref("0");
const hoursOf = ref("0");

const router = useRouter();
const { $db } = useNuxtApp();

function updateSiteValue() {
  const siteValuesRef = dbRef($db, "edit");
  update(siteValuesRef, {
    taughtStudents: taughtStudents.value,
    wonDonated: wonDonated.value,
    hoursOf: hoursOf.value,
  });

  router.push("/");
}

onMounted(() => {
  const siteValuesRef = dbRef($db, "edit");
  onValue(siteValuesRef, (snapshot) => {
    const data = snapshot.val();
    taughtStudents.value = data.taughtStudents;
    wonDonated.value = data.wonDonated;
    hoursOf.value = data.hoursOf;
  });
});
</script>
