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
        <v-alert
          v-if="userInfo && !userInfo.emailVerified"
          type="warning"
          text="Email is not verified"
        >
          <v-btn @click="verifyEmail" variant="outlined" class="ml-5"
            >verify</v-btn
          >
        </v-alert>
        <h2 v-else>LinkAll</h2>

        <v-spacer />

        <div>
          <div style="display: flex; justify-content: right; gap: 10px">
            <v-responsive max-width="180">
              <v-select
                v-model="$i18n.locale"
                :items="['ko', 'en']"
                variant="outlined"
                density="compact"
              ></v-select>
            </v-responsive>

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
                      :src="
                        userInfo.photoURL ??
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAACUCAMAAAANv/M2AAAAMFBMVEX///+8vLz09PS4uLj5+fnw8PDCwsK1tbX8/Pzd3d3l5eXOzs7Z2dnr6+vh4eHHx8cAY/kEAAAFJklEQVR4nO2c25KjMAxEg6/c+f+/XUySSQIGt0PbpGrdT1M7teGMIsuyJHO7FRUVFRUVFRUVFRX9jGolhB7asZ81toMWStVXMx1KDG3TmcrOkk7uB1tNXdMO4mo2v/TYTdVMWm3k/nEm11cTrqUas4VdyzTqas6XVGusx8Aek1vT/ga3boxFiO+y5gfcRPQGMvKbuU1/7aqse8CVtzL9dVGwHn2xArK2HC/C1l2EL69lu0tcu4l15pWxTZOf+Stn/pTJjNyesvJTss3J3DCQnZp867FjMVeyy8ZM8Y2s1GIiMs/UU4b9kcych5rN7KhTMzP9+Y86rV/XKZgddcrI1yRhnqkTbulDGmSnIRl0Ijs7yVTMhBxpX4myJ1rC4VcSt9ZJDT2bOsGpIFG0eylF3BtPnK0w2ZHNXCe2s5Nkm7qPg5ZLCRKrO73+U89lFhGrUNpqatphVtt0VQy44eZ7fcST+6FWSixSSg0x9RyqqeFwJ6dGP4CfUgIvNlDDHpwo9WvkBVujXxQzcVKoodst8V0t+AGGVwlusRhthMfMTx/B/m7Lq4RgD5z0HrKTnrA/nMWsIEMfM6PUluUf2DIcjpmFgI4QlrUUEe+w7a4///k1tDRI/qERC011iHmmhsoPnFA9ItBB54AdhJPrAeVG2SHMQiBpF6UIIoBVbyBDz3sMsDwoVTLkO50wZqGRIjGjmoAU/ftg6LhLAUkIpT2AROlwvHtAAzkII2lCDrQmsBm++UfYqRkHXIWsQ5RZIHnTdH4nV+GnzI9BmRETVOehBbD3djg0ED7s+Zin80Of38iH/NDnAzWSmkX4NAJ9PlCPQJg21IUoz6dMSI5DjdOMQhNUD2PuiNmgmblHNmgwnRYCyfII0MhCrMxuleZTUM2GsBCh06jsMWjoayOEPGRzQeMHVsckbC7INj6rQ07jWGWesI0jCdNinnAAwb40RsKEpKZOYQeBi9yEfBorHAJhD518IhwC8P7hca6HpEqLKP1EuAsgD5M9eCKH0g3A5wbltFuzGfApIkoJIWLIQ5pG+Xou0PD9nxjFGqQs9pIZ6nV3qx6iPoEzPBY372jN+BH89BgzfV+RCpDRcx6y6vr23rF1LdvYpjqn1AsV1T+xZWWclp9iRep/wu1au8cY0dtntbfASG263VJup0UHNhJZjSKkJfdoiquhnz58YrkB5ZIppRskVtNacmH/mAP0symu9HLp7HHZzHRN+/oN0NnnDY2FTi+yX6V4WrvQMceP9b+HMmpimznQ0De+0QO/VCA/JTb0j5div9/H91CLoyoCdeb0yD4jTnzXQV+SO5u3Zx5ZAcestbH17vfGnbzaaztENC7etftpVGh/oUmGxiX25B+jYI+4eYcJv2Z21L7Po89tbsc2ZfUtstOWmT+26Tng4lVpr63Xfp3kYsDmKWDRcUebUnWKUeTNYaA5xTxr/XkpmD/zJnTC40gfDpfscuL7Q6L3lK3eK27JLjLc3twQnEo5hn5VJ1Jep3wmTmgRPaTnlpXycs5f3DsX7V56RKS016CeF85Ggkc7qfHOnBT5dr/ah44sAZpyXO1zlygtYxU+NNhMVz8N0F9BpUwO5vnEyEN2ynUJm4id8R0lNOqs71UheXXmd8FQqPO/4+O0i1zyyp2Txr7qDTAnjH3lm42+xL74ZUzrXhaEfP0b0mKxfwB5UQT2jxDfBXH/xnvF3lX7OsxvwL/iFmvVtZ9czb+4mi2gemF/6Pdxi4qKioqKioqKiv4z/QNmmUyMydc5WgAAAABJRU5ErkJggg=='
                      "
                      style="width: 40px; height: 40px"
                      class="rounded-lg"
                    />
                  </v-avatar>
                </template>

                <v-list>
                  <v-list-item to="/account/account">
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
              to="/account/login"
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
        <NuxtPage />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<script setup>
import { getAuth, sendEmailVerification } from "firebase/auth";

const route = useRoute();
const router = useRouter();
const auth = getAuth();
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
  userInfo.value = null;
  router.push("/")
  router.go("0");
};

const verifyEmail = () => {
  sendEmailVerification(auth, userInfo.email, {
    url: "https://thinkforall-linkall.web.app/",
  }).then(() => {
    alert("Email sent. Come back and refresh the page.");
  });
};
</script>

<style>
.v-main {
  --v-layout-top: 0px !important;
}
</style>
