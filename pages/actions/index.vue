<template>
  <div
    style="
      margin-top: 140px;
      padding-top: 50px;
      padding-bottom: 50px;
      width: 100vw;
      height: calc(100vh - 140px);
      background-image: url('/actions.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    "
  >
    <h1 class="text-center" style="font-size: 50px">ACTIONS</h1>

    <br />

    <div class="text-center">
      <v-btn width="300" height="50" to="/actions/education">Education</v-btn>
      <br />
      <br />
      <v-btn width="300" height="50">Coming Soon</v-btn>
      <br />
      <br />
      <v-btn width="300" height="50">Coming Soon</v-btn>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Actions",
});
</script>