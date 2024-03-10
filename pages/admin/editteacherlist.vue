<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Teachers</h1>

    <br />

    <DivCenter>
      <div class="container">
        <v-textarea
          v-model="teachersList"
          variant="outlined"
          label="Teacher List"
        ></v-textarea>

        <br />

        <DivCenter>
          <v-btn @click="updateTeachers" variant="tonal">Update</v-btn>
        </DivCenter>

        <br /><br />
      </div>
    </DivCenter>
  </div>
</template>

<script setup>
const teachersList = ref("");

const router = useRouter();
const { $db } = useNuxtApp();

function updateTeachers() {
  const teachersRef = dbRef($db, "teachers");
  set(teachersRef, teachersList.value);
  router.push("/");
}

onMounted(() => {
  const teachersRef = dbRef($db, "teachers");
  onValue(teachersRef, (snapshot) => {
    const data = snapshot.val();
    teachersList.value = data;
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
