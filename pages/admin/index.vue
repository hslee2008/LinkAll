<template>
  <div class="top-div-without-bg" style="background-color: #b5b5b5">
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
