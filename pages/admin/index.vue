<template>
  <div class="top-div-with-bg" style="background-color: #b5b5b5">
    <h1 class="text-center">Admin Pages</h1>

    <br />

    <div class="text-center">
      <v-btn width="300" height="65" to="/admin/edit">
        Edit Site Values <v-icon end> mdi-pencil </v-icon>
      </v-btn>

      <br />
      <br />

      <v-btn width="300" height="65" to="/admin/teacherspage">
        See Class
        <v-icon end>mdi-human-male-board</v-icon>
      </v-btn>

      <br />
      <br />

      <v-btn width="300" height="65" to="/admin/newclass">
        New Class <v-icon end>mdi-plus</v-icon>
      </v-btn>

      <br />
      <br />

      <v-btn width="300" height="65" to="/admin/join-us">
        Joining User <v-icon end>mdi-account</v-icon>
      </v-btn>

      <br />
      <br />

      <v-btn width="300" height="65" to="/admin/newnotification">
        Notification <v-icon end>mdi-bell</v-icon>
      </v-btn>

      <br />
      <br />

      <v-btn width="300" height="65" to="/admin/notificationallowedemails">
        Emails for notification <v-icon end>mdi-email</v-icon>
      </v-btn>

      <br />
      <br />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .top-div-with-bg {
    height: auto;
  }
}
</style>
