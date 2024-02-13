<template>
  <div class="top-div-with-bg" style="background-color: #b5b5b5">
    <h1 class="text-center">Admin Pages</h1>

    <br />

    <div class="text-center">
      <v-btn width="300" height="60" to="/admin/edit">
        Edit Site Values <v-icon end>$edit</v-icon>
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="60" to="/admin/teacherspage">
        Teacher's Page
        <v-icon end>mdi-human-male-board</v-icon>
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="60" to="/admin/join-us">
        Joining User <v-icon end>mdi-account</v-icon>
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="60" to="/admin/newclass">
        New Class <v-icon end>mdi-plus</v-icon>
      </v-btn>
      <br />
      <br />
      <v-btn width="300" height="60" to="/admin/newnotification">
        New Notification <v-icon end>mdi-bell</v-icon>
      </v-btn>
      <br />
      <br />
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
