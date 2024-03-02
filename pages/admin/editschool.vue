<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Add / Edit School</h1>

    <br />

    <DivCenter>
      <v-img v-if="urll" :src="urll"></v-img>

      <div
        v-for="s in Object.values(school ?? {})"
        :key="s.id"
        style="width: 500px"
      >
        <br /><br />

        <v-img :src="s.image" width="100" class="ma-auto"></v-img>

        <br />

        <v-text-field
          v-model="s.id"
          variant="outlined"
          label="School Abbreviation (i.e. HAFS, PGHS)"
        ></v-text-field>
        <v-text-field
          v-model="s.schoolKoreanName"
          variant="outlined"
          label="School Korean Name (i.e. 판교고등학교)"
        ></v-text-field>
        <v-text-field
          v-model="s.schoolEnglishName"
          variant="outlined"
          label="School English Name (i.e. Pangyo High School)"
        ></v-text-field>
        <v-text-field
          v-model="s.schoolMemberNumber"
          variant="outlined"
          label="School Member Number (i.e. 5, 1)"
        ></v-text-field>
        <v-text-field
          v-model="s.schoolHomepage"
          variant="outlined"
          label="School Home Page URL"
        ></v-text-field>
      </div>

      <v-btn @click="Update" variant="tonal">Update</v-btn>

      <br /><br /><br />
    </DivCenter>
  </div>
</template>

<script setup>
const router = useRouter();
const { $db } = useNuxtApp();

const school = ref({});

function Update() {
  const schoolRef = dbRef($db, "school");
  set(schoolRef, school.value);
  router.push("/about-us");
}

onMounted(() => {
  const schoolRef = dbRef($db, "school");
  onValue(schoolRef, (snapshot) => (school.value = snapshot.val()));
});
</script>
