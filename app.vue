<template>
  <v-app>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <v-navigation-drawer v-model="drawer" location="right" class="pa-3">
        <div v-if="userInfo && !userInfo.emailVerified">
          <v-alert type="warning" text="Email is not verified">
            <v-btn @click="verifyEmail" variant="outlined" block class="mt-3">
              verify
            </v-btn>
          </v-alert>

          <br />
        </div>

        <v-select
          v-model="tempLocaleObject"
          :label="t('language')"
          :items="[
            { languageCode: 'ko', name: '한국어' },
            { languageCode: 'en', name: 'English' },
          ]"
          item-title="name"
          variant="outlined"
          prepend-inner-icon="mdi-translate"
          class="mt-3"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :subtitle="item.languageCode"
            ></v-list-item>
          </template>
        </v-select>

        <v-autocomplete
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          :label="t('search')"
          :items="searchItems"
          variant="outlined"
        ></v-autocomplete>

        <v-divider class="mt-4 mb-7"></v-divider>

        <div class="d-flex flex-column">
          <v-btn to="/" :elevation="0"> {{ t("home") }} </v-btn>
          <v-btn to="/about-us" :elevation="0"> {{ t("about us") }} </v-btn>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" :elevation="0">
                {{ t("actions") }} <v-icon end> mdi-chevron-down </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/actions">
                <v-list-item-title> {{ t("actions") }} </v-list-item-title>
              </v-list-item>
              <v-list-item to="/actions/education">
                <v-list-item-title> {{ t("education") }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn :elevation="0" v-bind="props">
                {{ t("members") }} <v-icon end> mdi-chevron-down </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/members/members">
                <v-list-item-title> {{ t("members") }} </v-list-item-title>
              </v-list-item>
              <v-list-item to="/members/committees">
                <v-list-item-title> {{ t("committees") }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn :elevation="0" v-bind="props">
                {{ t("join us") }} <v-icon end>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/join-us/join-us">
                <v-list-item-title> {{ t("join us") }} </v-list-item-title>
              </v-list-item>
              <v-list-item to="/join-us/donation">
                <v-list-item-title> {{ t("donation") }} </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-navigation-drawer>

      <v-app-bar
        v-if="mobile"
        absolute
        :elevation="0"
        class="pl-5"
        :style="`background-color: transparent;${
          url === '/' ? '' : 'border-bottom: 1px solid #e0e0e0'
        }`"
      >
        <h2><NuxtLink href="/">LinkAll</NuxtLink></h2>

        <v-spacer />

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
                  draggable="false"
                  class="rounded-lg"
                />
              </v-avatar>
            </template>

            <v-card>
              <v-list>
                <v-list-item v-if="isAdmin" to="/class/teacherpage">
                  <v-list-item-title>
                    <v-icon start>mdi-incognito</v-icon> (Secret) Teacher page
                  </v-list-item-title>
                </v-list-item>
                <v-list-item to="/account/account">
                  <v-list-item-title>
                    {{ t("my account") }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title> {{ t("logout") }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
        <v-btn
          v-else
          rounded="lg"
          to="/account/login"
          icon="mdi-account-circle"
        />

        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <v-app-bar
        v-else
        absolute
        height="140"
        :elevation="0"
        :style="`background-color: transparent;${
          url === '/' ? '' : 'border-bottom: 1px solid #e0e0e0'
        }`"
      >
        <v-alert
          v-if="userInfo && !userInfo.emailVerified"
          type="warning"
          text="Email is not verified"
        >
          <v-btn @click="verifyEmail" variant="outlined" class="ml-5">
            verify
          </v-btn>
        </v-alert>
        <h2 v-else class="ml-6"><NuxtLink href="/">LinkAll</NuxtLink></h2>

        <v-spacer />

        <div>
          <div style="gap: 10px" class="d-flex justify-right">
            <v-select
              v-model="tempLocaleObject"
              :label="t('language')"
              :items="[
                { languageCode: 'ko', name: '한국어' },
                { languageCode: 'en', name: 'English' },
              ]"
              item-title="name"
              variant="outlined"
              density="compact"
              class="w-0"
              prepend-inner-icon="mdi-translate"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.languageCode"
                ></v-list-item>
              </template>
            </v-select>

            <v-autocomplete
              prepend-inner-icon="mdi-magnify"
              :label="t('search')"
              v-model="search"
              :items="searchItems"
              variant="outlined"
              density="compact"
            ></v-autocomplete>

            <div v-if="userInfo" class="mr-5">
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
                      draggable="false"
                      class="rounded-lg"
                    />
                  </v-avatar>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item v-if="isAdmin" to="/class/teacherpage">
                      <v-list-item-title>
                        <v-icon start>mdi-incognito</v-icon> Teacher's Page
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/account/account">
                      <v-list-item-title>
                        {{ t("my account") }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                      <v-list-item-title> {{ t("logout") }} </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
            <v-btn
              v-else
              rounded="lg"
              to="/account/login"
              icon="mdi-account-circle"
              class="mr-5"
            />
          </div>

          <div class="mr-5">
            <v-btn to="/"> {{ t("home") }} </v-btn>
            <v-btn to="/about-us"> {{ t("about us") }} </v-btn>

            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn to="/actions" v-bind="props">
                  {{ t("actions") }} <v-icon end> mdi-chevron-down </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item to="/actions/education">
                  <v-list-item-title> {{ t("education") }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn to="/members/members" v-bind="props">
                  {{ t("members") }} <v-icon end> mdi-chevron-down </v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item to="/members/members">
                  <v-list-item-title> {{ t("members") }} </v-list-item-title>
                </v-list-item>
                <v-list-item to="/members/committees">
                  <v-list-item-title> {{ t("committees") }} </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn to="/join-us/join-us" v-bind="props">
                  {{ t("join us") }} <v-icon end>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item to="/join-us/join-us">
                  <v-list-item-title> {{ t("join us") }} </v-list-item-title>
                </v-list-item>
                <v-list-item to="/join-us/donation">
                  <v-list-item-title> {{ t("donation") }} </v-list-item-title>
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
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import { getAuth, sendEmailVerification } from "firebase/auth";

const route = useRoute();
const router = useRouter();
const auth = getAuth();
const { t, locale } = useI18n();
const { mobile } = useDisplay();
const { $auth } = useNuxtApp();

const url = computed(() => route.path);
const tempLocaleObject = ref(locale === "ko" ? "한국어" : "English");
const isAdmin = ref(false);
const userInfo = ref(null);

const drawer = ref(false);

$auth.onAuthStateChanged((user) => {
  if (user) {
    userInfo.value = user;

    if (
      user.email === "h.junho420@gmail.com" ||
      user.email === "hyunseunglee2008@gmail.com"
    ) {
      isAdmin.value = true;
    }
  }
});

watch(locale, (newLocale) => {
  localStorage.setItem("locale", newLocale);
});

watch(tempLocaleObject, (newLocale) => {
  if (newLocale === "한국어") {
    locale.value = "ko";
  } else if (newLocale === "English") {
    locale.value = "en";
  }
});

onMounted(() => {
  locale.value = localStorage.getItem("locale") ?? "en";
  tempLocaleObject.value = locale.value === "ko" ? "한국어" : "English";
});

const search = ref("");
const searchItems = [
  "Home",
  "About Us",
  "Actions",
  "Education",
  "Member",
  "Join Us",
  "Donation",
];
const links = {
  Home: "/",
  "About Us": "/about-us",
  Actions: "/actions",
  Education: "/actions/education",
  Member: "/member",
  "Join Us": "/join-us/join-us",
  Donation: "/join-us/donation",
};

watch(search, (newSearch) => {
  if (newSearch in links) {
    router.push(links[newSearch]);
  }

  search.value = "";
});

const logout = () => {
  $auth.signOut();
  userInfo.value = null;
  router.push("/");
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

<style scoped>
.v-main {
  --v-layout-top: 0px !important;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
