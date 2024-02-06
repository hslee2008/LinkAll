<template>
  <div
    class="top-div-with-bg"
    style="background-color: #b5b5b5; height: calc(100vh - 140px)"
  >
    <h1 class="text-center">Admin Pages</h1>

    <br />

    <div class="text-center">
      <v-btn width="300" height="50" to="/admin/edit">
        Edit Site Values <v-icon end>mdi-pencil</v-icon>
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="50" to="/admin/teacherspage">
        Teacher's Page
        <v-icon end>mdi-human-male-board</v-icon>
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="50" to="/admin/join-us">
        Joining User <v-icon end>mdi-account</v-icon></v-btn
      >
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .top-div-with-bg {
    height: calc(100vh - 65px) !important;
  }
}
</style>
