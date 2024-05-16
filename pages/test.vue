<template>
  <div>
    <br /><br /><br /><br /><br /><br /><br /><br />
    <v-btn @click="test">test</v-btn>
  </div>
</template>

<script setup>
const { $db } = useNuxtApp();

function test() {
  const membersTotalRef = dbRef($db, `members/`);
  onValue(membersTotalRef, (datasnapshot) => {
    const data = datasnapshot.val();
    alert(Object.keys(data).length);
  });
}
</script>
