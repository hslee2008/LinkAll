<template>
  <v-app>
    <NuxtLayout>
      <v-app-bar
        absolute
        height="140"
        clipped-left
        class="px-5"
        elevation="0"
        :style="`background-color: transparent;${
          url === '/' ? '' : 'border-bottom: 1px solid #e0e0e0'
        }`"
      >
        <h2>LinkAll</h2>

        <v-spacer />

        <div>
          <div style="display: flex; justify-content: right; gap: 10px">
            <v-responsive max-width="180" style="margin-top: 5px">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="SEARCH"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-responsive>

            <div v-if="userInfo">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-avatar>
                    <v-img
                      v-bind="props"
                      :src="userInfo.photoURL"
                      style="width: 40px; height: 40px"
                      class="rounded-lg"
                    />
                  </v-avatar>
                </template>

                <v-list>
                  <v-list-item to="/account">
                    <v-list-item-title> My Account </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="logout">
                    <v-list-item-title> Logout </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-btn
              v-else
              rounded="lg"
              to="/account/join"
              icon="mdi-account-circle"
            />
          </div>

          <div>
            <v-btn to="/"> HOME </v-btn>
            <v-btn to="/about-us"> ABOUT US </v-btn>

            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn to="/actions" v-bind="props"> ACTIONS </v-btn>
              </template>

              <v-list>
                <v-list-item to="/actions/education">
                  <v-list-item-title> EDUCATION </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn to="/member"> MEMBER </v-btn>

            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn to="/join-us" v-bind="props"> JOIN US </v-btn>
              </template>

              <v-list>
                <v-list-item to="/join-us">
                  <v-list-item-title> JOIN US </v-list-item-title>
                </v-list-item>
                <v-list-item to="/donation">
                  <v-list-item-title> DONATION </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-app-bar>

      <v-main>
        <NuxtPage class="mb-10" />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<script setup>
const isScrolledToTop = ref(true);

const route = useRoute();
const router = useRouter();
const url = computed(() => route.path);
const userInfo = ref(null);

const { $auth } = useNuxtApp();
$auth.onAuthStateChanged((user) => {
  if (user) {
    userInfo.value = user;
  }
});

const logout = () => {
  $auth.signOut();
  localStorage.removeItem("user");
  userInfo.value = null;
  router.push("/");
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolledToTop.value = window.scrollY < 10;
  });
});
</script>

<style>
.v-main {
  --v-layout-top: 0px !important;
}
</style>
