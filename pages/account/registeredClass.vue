<template>
  <div class="top-div-without-bg">
    <h1 class="header-u text-center">{{ $t("registered class") }}</h1>

    <DivCenter>
      <div :class="`d-flex ga-3 ${sm ? 'flex-column' : ''}`">
        <div v-for="(item, index) in classInfo" :key="index">
          <ClassInfo :item="item"></ClassInfo>
          <p class="my-3">{{ dates[index] }}</p>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" color="red" text="수업 등록 취소"> </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="수업 등록 취소">
                <v-card-text> 수업 등록을 취소하겠습니까? </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    text="삭제"
                    color="red"
                    @click="deleteClass(index)"
                  ></v-btn>
                  <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
    </DivCenter>
  </div>
</template>

<script setup>
const { $db, $auth } = useNuxtApp();
const { sm } = useDisplay();

const userInfo = ref({});
const classInfo = ref([]);
const classID = ref([]);
const subject = ref([]);
const dates = ref([]);

$auth.onAuthStateChanged((user) => {
  if (user) {
    userInfo.value = user;
  }
});

onMounted(async () => {
  const myAccount = dbRef($db, `account/${userInfo.value.uid}/`);
  await onValue(myAccount, async (snapshot) => {
    const values = await snapshot.val();

    for (const item in Object.keys(values ?? {})) {
      const date = new Date(Object.values(values ?? {})[item].date);

      if (new Date() > date) {
        const toDelete = dbRef(
          $db,
          `account/${userInfo.value.uid}/${Object.keys(values ?? {})[item]}`
        );
        set(toDelete, null);
      }

      dates.value.push(Object.values(values ?? {})[item].date);
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

async function deleteClass(index) {
  const deleteClassInfo = classInfo.value[index];
  classInfo.value.splice(index, 1);

  const myAccount = await dbRef(
    $db,
    `account/${userInfo.value.uid}/${deleteClassInfo.classID}`
  );
  await onValue(myAccount, async (snapshot) => {
    const data = await snapshot.val();

    const toDeleteTeacher = await dbRef(
      $db,
      `classes/${deleteClassInfo.teacherEmailID}/to-join/${deleteClassInfo.classID}/${data.classNumber}/${userInfo.value.uid}`
    );
    await set(toDeleteTeacher, null);
  });

  const toDeleteStudent = await dbRef(
    $db,
    `account/${userInfo.value.uid}/${deleteClassInfo.classID}`
  );
  await set(toDeleteStudent, null);
}
</script>
