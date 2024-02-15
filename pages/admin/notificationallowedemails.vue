<template>
  <div class="top-div-without-bg">
    <h1 class="text-center">Emails Allowed for Notification</h1>

    <br />

    <p class="ml-10">{{ Object.values(emails ?? {}).join(", ") }}</p>
  </div>
</template>

<script setup>
const emails = ref("");

const { $db } = useNuxtApp();

onMounted(() => {
  const notifRef = dbRef($db, "emails/notificationallowed");
  onValue(notifRef, (snapshot) => {
    const data = snapshot.val();
    emails.value = data;
  });
});
</script>
