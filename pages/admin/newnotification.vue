<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">New Notification</h1>

    <br />

    <div class="mx-10">
      <v-text-field
        v-model="title"
        variant="outlined"
        placeholder="Notification Title"
      >
      </v-text-field>
      <v-textarea
        v-model="contents"
        placeholder="Notification Contents"
        variant="outlined"
      ></v-textarea>
      <v-btn color="primary" elevation="0" @click="Post">Post</v-btn>
    </div>

    <br /><br /><br />

    <h1 class="text-center">Edit/Delete Notification</h1>

    <br />

    <v-list class="mx-5">
      <v-dialog
        v-for="(item, i) in notificationList"
        :key="item.title"
        width="500"
      >
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
              <v-textarea
                v-model="item.contents"
                variant="outlined"
                rows="10"
              ></v-textarea>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :text="t('update')"
                color="primary"
                @click="UpdateNotification(() => (isActive.value = false))"
              ></v-btn>
              <v-btn
                :text="t('delete')"
                color="red"
                @click="DeleteNotification(i, () => (isActive.value = false))"
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

const notificationList = ref([]);

const Post = () => {
  const date = new Date();
  const time = date.getTime();

  const notificationRef = dbRef($db, `/notification/${time}`);
  set(notificationRef, {
    title: title.value,
    contents: contents.value,
    time,
  });

  router.push("/");
};

const DeleteNotification = (i, close) => {
  const notificationRef = dbRef($db, "notification");
  notificationList.value.splice(i, 1);
  set(notificationRef, notificationList.value);

  close();
};

const UpdateNotification = (close) => {
  const notificationRef = dbRef($db, "notification");
  set(notificationRef, notificationList.value);

  close();
};

onMounted(() => {
  const notificationRef = dbRef($db, "notification");
  onValue(notificationRef, (snapshot) => {
    const data = snapshot.val();
    const values = Object.values(data ?? {});
    notificationList.value = values;
  });
});
</script>
