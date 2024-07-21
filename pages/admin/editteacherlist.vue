<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Teachers</h1>

    <br />

    <div class="textarea">
      <v-textarea
        v-model="teachersList"
        variant="outlined"
        label="Teacher List"
        rows="10"
        rounded
      ></v-textarea>
    </div>

    <br />

    <DivCenter>
      <v-btn @click="updateTeachers" variant="tonal">Update</v-btn>
    </DivCenter>

    <br /><br />
  </div>
</template>

<script setup>
const teachersList = ref("");

const router = useRouter();
const { $db } = useNuxtApp();

function updateTeachers() {
  const teachersRef = dbRef($db, "teachers");
  set(teachersRef, teachersList.value.replaceAll("\n", ","));
  router.push("/");
}

onMounted(() => {
  const teachersRef = dbRef($db, "teachers");
  onValue(teachersRef, (snapshot) => {
    const data = snapshot.val();
    teachersList.value = data.replaceAll(",", "\n");
  });
});
</script>

<style scoped>
.textarea {
  margin-left: 15px;
  margin-right: 15px;
}
</style>
