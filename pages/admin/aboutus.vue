<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">About Us Edit</h1>

    <br />

    <DivCenter>
      <div class="container">
        <v-textarea
          v-model="aboutus.englishPurpose"
          variant="outlined"
          label="English LinkAll Purpose"
        ></v-textarea>
        <v-textarea
          v-model="aboutus.koreanPurpose"
          variant="outlined"
          label="한국어 - LinkAll 목적"
        ></v-textarea>

        <br />

        <v-textarea
          v-model="aboutus.englishVision"
          variant="outlined"
          label="English LinkAll Vision"
        ></v-textarea>
        <v-textarea
          v-model="aboutus.koreanVision"
          variant="outlined"
          label="한국어 - LinkAll 비전"
        ></v-textarea>

        <p><InputStar></InputStar> School Number is automatically detected.</p>
        <br />

        <v-text-field
          v-model="aboutus.countryNumber"
          variant="outlined"
          label="Number of Countries Participating"
        ></v-text-field>

        <br />

        <DivCenter>
          <v-btn @click="updateSiteValue" variant="tonal">Update</v-btn>
        </DivCenter>

        <br /><br /><br />
      </div>
    </DivCenter>
  </div>
</template>

<script setup>
const aboutus = ref({});

const router = useRouter();
const { $db } = useNuxtApp();

function updateSiteValue() {
  const aboutusRef = dbRef($db, "aboutus");
  update(aboutusRef, aboutus.value);
  router.push("/about-us");
}

onMounted(() => {
  const aboutusRef = dbRef($db, "aboutus");
  onValue(aboutusRef, (snapshot) => (aboutus.value = snapshot.val()));
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
