<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">New Pic</h1>
    <p class="text-center">
      (using <a href="https://postimages.org/" target="_blank">postimages</a>)
    </p>

    <br />

    <div class="mx-10">
      <v-text-field v-model="title" variant="outlined" placeholder="Pic Title">
      </v-text-field>
      <v-textarea
        v-model="contents"
        placeholder="Pic Contents"
        variant="outlined"
      ></v-textarea>
      <v-text-field v-model="link" variant="outlined" placeholder="Picture URL">
      </v-text-field>

      <v-img :src="link" width="200" class="rounded-lg"></v-img>

      <br />

      <v-btn color="primary" elevation="0" @click="Post">Post</v-btn>
    </div>

    <br /><br /><br />

    <h1 class="text-center">Edit/Delete Pic</h1>

    <br />

    <v-list class="mx-5">
      <v-dialog v-for="(item, i) in picList" :key="item.title" width="500">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="`${i + 1}. ${item.title}`"
            :subtitle="new Date(item.time).toDateString()"
          ></v-list-item>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Edit/Delete">
            <v-card-text>
              <v-text-field
                v-model="item.title"
                variant="outlined"
              ></v-text-field>
              <v-textarea
                v-model="item.contents"
                variant="outlined"
                rows="10"
              ></v-textarea>
              <v-text-field
                v-model="item.link"
                variant="outlined"
              ></v-text-field>

              <v-img :src="item.link" width="200" class="rounded-lg"></v-img>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :text="t('update')"
                color="primary"
                @click="UpdatePic(() => (isActive.value = false))"
              ></v-btn>
              <v-btn
                :text="t('delete')"
                color="red"
                @click="DeletePic(i, () => (isActive.value = false))"
              ></v-btn>
              <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-list>

    <br /><br /><br />
  </div>
</template>

<script setup>
const router = useRouter();
const { $db } = useNuxtApp();

const { t } = useI18n();

const title = ref("");
const contents = ref("");
const link = ref("");

const picList = ref([]);

const Post = () => {
  const date = new Date();
  const time = date.getTime();

  const picRef = dbRef($db, `/pic/${time}`);
  set(picRef, {
    title: title.value,
    contents: contents.value,
    link: link.value,
    time,
  });

  router.push("/");
};

const DeletePic = (i, close) => {
  const picRef = dbRef($db, "pic");
  picList.value.splice(i, 1);
  set(picRef, picList.value);

  close();
};

const UpdatePic = (close) => {
  const picRef = dbRef($db, "pic");
  set(picRef, picList.value);

  close();
};

onMounted(() => {
  const picRef = dbRef($db, "pic");
  onValue(picRef, (snapshot) => {
    const data = snapshot.val();
    const values = Object.values(data ?? {});
    picList.value = values;
  });
});
</script>
