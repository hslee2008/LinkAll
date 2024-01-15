<template>
  <v-parallax dark src="./background.png" :height="windowHeight">
    <v-col class="d-flex justify-center align-center" style="margin-top: 165px">
      <div>
        <h1 style="text-align: center; font-weight: 700; font-size: 60px">
          Think for All
        </h1>
        <h1 style="text-align: center; font-weight: 900; font-size: 70px">
          Link All
        </h1>

        <div class="d-flex justify-center mb-6 mt-5">
          <v-btn rounded="lg" to="/donation" color="primary" height="75">
            <h2>
              <v-icon start>mdi-gift</v-icon>
              {{ $t("donate") }}
              <v-icon end>mdi-gift</v-icon>
            </h2>
          </v-btn>
        </div>

        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
              <div class="text-center" elevation="10">
                <v-card-text class="headline"> 0 </v-card-text>

                <v-card-text> {{ $t("taught_students") }} </v-card-text>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <div class="text-center" elevation="10">
                <v-card-text class="headline"> 0 </v-card-text>

                <v-card-text> {{ $t("won_donated") }} </v-card-text>
              </div>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <div class="text-center" elevation="10">
                <v-card-text class="headline"> 0 </v-card-text>

                <v-card-text> {{ $t("hours_of_volunteering") }} </v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-col>
  </v-parallax>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> English </v-card-text>

          <v-card-text>
            <p>
              <a href="/video-player?video=temp&title=LinkAll-Reading-Project">
                1. LinkAll Reading Project
              </a>
            </p>
            <p>2. Become a writer!</p>
            <p>3. Debating Startup</p>
            <p>4. Journey to Knowledge</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> Korean </v-card-text>

          <v-card-text> </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> Arts </v-card-text>

          <v-card-text> </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card elevation="8">
          <v-card-text class="headline text-center"> Tech </v-card-text>

          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <br />
  <br />
  <br />

  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-img
          src="https://picsum.photos/seed/picsum/800/350"
          class="rounded-lg"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>

  <br />

  <v-footer class="bg-indigo-lighten-1 text-center d-flex flex-column">
    <div>
      <v-btn class="mx-4" icon="mdi-facebook" variant="text"></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-instagram"
        variant="text"
        href="https://www.instagram.com/linkall2024/"
        target="_blank"
      ></v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-youtube"
        variant="text"
        href="https://www.youtube.com/@LinkAllCommunity"
        target="_blank"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div>
      Copyright © LinkAll {{ new Date().getFullYear() }} — All rights reserved
    </div>
  </v-footer>
</template>

<script setup>
const windowHeight = ref(0);

onMounted(() => {
  windowHeight.value = window.innerHeight;
});

useHead({
  title: "LinkAll - Home",
});
</script>

<style scoped>
.headline {
  font-weight: 900;
  font-size: 40px;
  padding-top: 30px;
}

p > a {
  color: #1976d2;
  text-decoration: none;
}

p > a:hover {
  color: #2196f3;
  text-decoration: underline;
}
</style>
