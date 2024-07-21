<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Edit Class Order</h1>

    <br />

    <DivCenter>
      <div class="container">
        <div
          v-for="(i, index) in classList"
          :key="i.classID"
          class="d-flex my-3"
        >
          <p>{{ i.classID }}</p>
          <v-text-field
            v-model="classList[index].order"
            variant="outlined"
            class="ml-3"
          ></v-text-field>

          <DivCenter>
            <v-btn @click="update(index)" elevation="0"> Update</v-btn>
          </DivCenter>
        </div>
      </div>
    </DivCenter>
  </div>
</template>

<script setup>
const classList = ref([]);

const router = useRouter();
const { $db } = useNuxtApp();

function update(index) {
  const item = classList.value[index];
  const dbURL = `/class/${item.subject}/${item.classID}`;

  set(dbRef($db, dbURL), item);
}

onMounted(() => {
  const siteValuesRef = dbRef($db, "/class");
  onValue(siteValuesRef, (snapshot) => {
    classList.value = [];

    const data = snapshot.val();
    const values = Object.values(data ?? {});

    for (let i = 0; i < values.length; i++) {
      for (let j in Object.values(values[i] ?? {})) {
        classList.value.push(Object.values(values[i] ?? {})[j]);
      }
    }

    classList.value = classList.value.sort((a, b) => a.order - b.order);
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
