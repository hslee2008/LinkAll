<template>
  <div class="top-div-without-bg">
    <h1 class="header-u text-center">{{ $t("registered class") }}</h1>

    <br />

    <DivCenter>
      <div :class="`d-flex ga-3 ${sm ? 'flex-column' : ''}`">
        <div v-for="(item, index) in classInfo" :key="index">
          <ClassInfo :item="item" width="350"></ClassInfo>

          <v-card-title class="my-3 text-center">{{
            dates[index]
          }}</v-card-title>

          <v-card-actions>
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-spacer />
                <v-btn v-bind="props" color="red" variant="outlined">
                  수업 등록 취소
                </v-btn>
                <v-spacer />
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
          </v-card-actions>
        </div>
      </div>
    </DivCenter>

    <br /><br /><br />
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

onMounted(async () => {
  await $auth.onAuthStateChanged((user) => {
    if (user) {
      userInfo.value = user;
    }
  });

  const myAccount = await dbRef($db, `account/${userInfo.value.uid}/`);
  await onValue(myAccount, async (snapshot) => {
    const values = await snapshot.val();

    for (const item in Object.keys(values ?? {}).filter(
      (item) => item !== "readnotification"
    )) {
      const date = new Date(Object.values(values ?? {})[item].date);

      if (Object.keys(values))
        if (new Date() > date) {
          const toDelete = dbRef(
            $db,
            `account/${userInfo.value.uid}/${Object.keys(values ?? {})[item]}`
          );
          set(toDelete, null);
        }

      dates.value.push(Object.values(values ?? {})[item]?.date);
      subject.value.push(Object.values(values ?? {})[item]?.subject);
      classID.value.push(Object.keys(values ?? {})[item]);
    }
  });

  for (let i = 0; i < subject.value.length; i++) {
    const classRef = await dbRef(
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
