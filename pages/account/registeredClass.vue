<template>
  <div class="top-div-without-bg ml-8">
    <h1 class="header-u text-center">{{ $t("registered class") }}</h1>

    <ClassInfo :item="classInfo[0]"></ClassInfo>
  </div>
</template>

<script setup>
const { $db } = useNuxtApp();

const userInfo = ref({});
const classInfo = ref([]);
const classID = ref([]);
const subject = ref([]);

onMounted(async () => {
  const auth = getAuth();
  if (auth.currentUser) {
    userInfo.value = auth.currentUser;
  }

  const myAccount = dbRef($db, `account/${userInfo.value.uid}/`);
  await onValue(myAccount, async (snapshot) => {
    const values = await snapshot.val();

    for (const item in Object.keys(values ?? {})) {
      subject.value.push(Object.values(values ?? {})[item].subject);
      classID.value.push(Object.keys(values ?? {})[item]);
    }
  });

  for (let i = 0; i < subject.value.length; i++) {
    const classRef = dbRef(
      $db,
      `class/${subject.value[i]}/${classID.value[i]}`
    );
    onValue(classRef, async (snapshot) => {
      classInfo.value.push(await snapshot.val());
    });
  }
});
</script>
