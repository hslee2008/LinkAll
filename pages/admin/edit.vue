<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Site Stats</h1>

    <br />

    <DivCenter>
      <div class="container">
        <v-text-field
          v-model="taughtStudents"
          variant="outlined"
          label="Students Taught"
        ></v-text-field>
        <v-text-field
          v-model="wonDonated"
          variant="outlined"
          label="Won Donated"
        ></v-text-field>
        <v-text-field
          v-model="hoursOf"
          variant="outlined"
          label="Hours of Volunteering"
        ></v-text-field>

        <br />

        <DivCenter>
          <v-btn @click="updateSiteValue" variant="tonal">Update</v-btn>
        </DivCenter>

        <br /><br />
      </div>
    </DivCenter>
  </div>
</template>

<script setup>
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

<style scoped>
.container {
  min-width: 400px;
}

@media (max-width: 450px) {
  .container {
    width: calc(100vw - 50px);
    min-width: initial;
  }
}
</style>
