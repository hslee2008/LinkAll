<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Emails Allowed for Notification</h1>

    <br />

    <p
      v-for="(item, i) in [...new Set(Object.values(emails ?? {}))]"
      class="ml-10 mr-10"
    >
      {{ item }}
    </p>

    <v-btn
      class="ml-10 mt-5"
      variant="outlined"
      @click="copy([...new Set(Object.values(emails ?? {}))].join(','))"
    >
      <v-icon start>mdi-content-copy</v-icon> Copy
    </v-btn>

    <br /><br />
    <br /><br />

    <v-snackbar v-model="snackbar">
      {{ $t("copied") }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          {{ $t("close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
const emails = ref("");

const { $db } = useNuxtApp();

const snackbar = ref(false);

onMounted(() => {
  const notifRef = dbRef($db, "emails/notificationallowed");
  onValue(notifRef, (snapshot) => {
    const data = snapshot.val();
    emails.value = data;
  });
});

function copy(string) {
  navigator.clipboard.writeText(string);
  snackbar.value = true;
}
</script>
