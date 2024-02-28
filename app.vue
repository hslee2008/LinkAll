<template>
  <v-app>
    <VitePwaManifest />
    <NuxtLoadingIndicator color="linear-gradient(to right, skyblue , blue)" />

    <v-navigation-drawer
      v-if="mobile"
      v-model="drawer"
      location="right"
      class="pa-3"
    >
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
        @update:modelValue="routerWithSearch"
        prepend-inner-icon="mdi-magnify"
        :label="t('search')"
        :items="locale === 'en' ? searchItemsEnglish : searchItemsKorean"
        item-title="name"
        item-value="value"
        :filter-keys="['raw.name', 'raw.text']"
        variant="outlined"
        auto-select-first
      ></v-autocomplete>

      <div class="d-flex flex-column">
        <v-btn to="/" :elevation="0">
          {{ t("home") }}
        </v-btn>
        <v-btn to="/about-us" :elevation="0">
          {{ t("about us") }}
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :elevation="0">
              {{ t("actions") }} <v-icon end> $dropdown </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="/actions/education">
              <v-list-item-title> {{ t("education") }} </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn :elevation="0" v-bind="props">
              {{ t("members") }} <v-icon end> $dropdown </v-icon>
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
              {{ t("join us") }} <v-icon end> $dropdown </v-icon>
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
      class="pl-5"
      :elevation="scrollY === 0 ? 0 : 4"
      :style="`${scrollY === 0 ? 'background-color: transparent;' : ''}`"
    >
      <NuxtLink to="/">
        <img src="/logo-text-long.png" width="100" class="mt-1" />
      </NuxtLink>

      <v-spacer />

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-badge
            v-bind="props"
            color="#95D6F4"
            :content="notificationList.length"
            offset-x="15"
            offset-y="15"
          >
            <v-btn icon="mdi-bell" color="yellow-darken-2"></v-btn>
          </v-badge>
        </template>

        <v-card>
          <v-list v-if="notificationList.length > 0">
            <v-dialog
              v-for="(item, i) in notificationList"
              :key="item.title"
              width="500"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :title="`${i + 1}. ${item.title}`"
                  :subtitle="new Date(item.time).toDateString()"
                ></v-list-item>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-text>
                    <Markdown
                      :source="item.contents"
                      :linkify="true"
                      :breaks="true"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      :text="t('close')"
                      color="red"
                      block
                      @click="isActive.value = false"
                    ></v-btn>

                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-list>
          <v-card v-else elevation="0">
            <v-card-title>{{ $t("nothing new") }}</v-card-title>
          </v-card>

          <v-card-actions v-if="notificationList.lengthn && userInfo">
            <v-spacer />

            <v-btn @click="readall" color="red" block>read all</v-btn>

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-menu>

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
                alt="profile"
                style="width: 40px; height: 40px"
                draggable="false"
                class="rounded-lg"
              />
            </v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item
                v-if="isAdmin"
                to="/admin/"
                bg-color="purple"
                base-color="purple"
              >
                <v-list-item-title>
                  <v-icon start>mdi-incognito</v-icon> Admin
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="isTeacher"
                to="/teacher/teacherspage"
                bg-color="purple"
                base-color="purple"
              >
                <v-list-item-title>
                  <v-icon start>mdi-human-male-board</v-icon> Teacher
                </v-list-item-title>
              </v-list-item>

              <v-divider />

              <v-list-item to="/account/account">
                <v-list-item-title>
                  <v-icon start>mdi-account-box</v-icon>
                  {{ t("my account") }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item to="/account/registeredClass">
                <v-list-item-title>
                  <v-icon start>mdi-google-classroom</v-icon>
                  {{ t("registered class") }}
                </v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item @click="logout">
                <v-list-item-title>
                  <v-icon start>mdi-logout-variant</v-icon>
                  {{ t("logout") }}
                </v-list-item-title>
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
    <template v-else>
      <v-app-bar
        v-if="scrollY <= 67.5"
        height="140"
        absolute
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
        <NuxtLink v-else to="/" class="ml-6">
          <img src="/logo-text-long.png" width="150" />
        </NuxtLink>

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
              class="w-0 mt-1"
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
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              :label="t('search')"
              @update:modelValue="routerWithSearch"
              :items="locale === 'en' ? searchItemsEnglish : searchItemsKorean"
              item-title="name"
              item-value="value"
              :filter-keys="['raw.name', 'raw.text']"
              variant="outlined"
              density="compact"
              class="mt-1"
              auto-select-first
            ></v-autocomplete>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-badge
                  v-bind="props"
                  color="#95D6F4"
                  :content="notificationList.length"
                  offset-x="15"
                  offset-y="10"
                >
                  <v-btn
                    icon="mdi-bell"
                    variant="text"
                    color="yellow-darken-2"
                  ></v-btn>
                </v-badge>
              </template>

              <v-card>
                <v-list v-if="notificationList.length > 0">
                  <v-dialog
                    v-for="(item, i) in notificationList"
                    :key="item.title"
                    width="500"
                  >
                    <template v-slot:activator="{ props }">
                      <v-list-item
                        v-bind="props"
                        :title="`${i + 1}. ${item.title}`"
                        :subtitle="new Date(item.time).toDateString()"
                      ></v-list-item>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card>
                        <v-card-text>
                          <Markdown
                            :source="item.contents"
                            :linkify="true"
                            :breaks="true"
                          />
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            :text="t('close')"
                            color="red"
                            block
                            @click="isActive.value = false"
                          ></v-btn>

                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-list>
                <v-card v-else elevation="0">
                  <v-card-title>{{ $t("nothing new") }}</v-card-title>
                </v-card>

                <v-card-actions v-if="notificationList.length">
                  <V-spacer />

                  <v-btn @click="readall" color="red" block>
                    {{ $t("clear") }}
                  </v-btn>

                  <V-spacer />
                </v-card-actions>
              </v-card>
            </v-menu>

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
                      alt="profile"
                      style="width: 40px; height: 40px"
                      draggable="false"
                      class="rounded-lg"
                    />
                  </v-avatar>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item
                      v-if="isAdmin"
                      to="/admin/"
                      bg-color="purple"
                      base-color="purple"
                    >
                      <v-list-item-title>
                        <v-icon start>mdi-incognito</v-icon> Admin
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="isTeacher"
                      to="/teacher/teacherspage"
                      bg-color="purple"
                      base-color="purple"
                    >
                      <v-list-item-title>
                        <v-icon start>mdi-human-male-board</v-icon> Teacher
                      </v-list-item-title>
                    </v-list-item>

                    <v-divider />

                    <v-list-item to="/account/account">
                      <v-list-item-title>
                        <v-icon start>mdi-account-box</v-icon>
                        {{ t("my account") }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/account/registeredClass">
                      <v-list-item-title>
                        <v-icon start>mdi-google-classroom</v-icon>
                        {{ t("registered class") }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider />
                    <v-list-item @click="logout">
                      <v-list-item-title>
                        <v-icon start>mdi-logout-variant</v-icon>
                        {{ t("logout") }}
                      </v-list-item-title>
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
            <Menu></Menu>
          </div>
        </div>
      </v-app-bar>
      <v-app-bar v-else>
        <NuxtLink to="/">
          <img src="/logo-text-long.png" width="125" class="ml-4 mt-1" />
        </NuxtLink>

        <v-spacer />

        <div class="mr-5">
          <Menu></Menu>
        </div>
      </v-app-bar>
    </template>

    <NuxtLayout>
      <v-main>
        <NuxtPage class="pb-10" />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<script setup>
import Markdown from "vue3-markdown-it";

import koSearch from "./data/koSearch.json";
import enSearch from "./data/enSearch.json";

import { getAuth, sendEmailVerification } from "firebase/auth";

const route = useRoute();
const router = useRouter();
const auth = getAuth();
const { t, locale } = useI18n();
const { mobile } = useDisplay();
const { $auth, $db } = useNuxtApp();

const url = computed(() => route.path);
const tempLocaleObject = ref(locale === "ko" ? "한국어" : "English");
const isAdmin = ref(false);
const isTeacher = ref(false);
const userInfo = ref(null);

const notificationList = ref([]);
const readnotification = ref(0);

const scrollY = ref(0);
const drawer = ref(false);

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

function onScroll() {
  scrollY.value = window.top.scrollY;
}

onMounted(() => {
  $auth.onAuthStateChanged((user) => {
    if (user) {
      userInfo.value = user;

      isAdmin.value = checkAdmin(user.email);
      isTeacher.value = checkTeacher(user.email);

      const accountRef = dbRef(
        $db,
        `account/${userInfo.value.uid}/readnotification`
      );
      onValue(accountRef, async (snapshot) => {
        const data = await snapshot.val();
        readnotification.value = data ?? 0;

        const notificationRef = dbRef($db, "notification");
        onValue(notificationRef, (snapshot) => {
          const data = snapshot.val();
          const values = Object.values(data ?? {});
          notificationList.value = values;
        });

        for (let i = 0; i < parseInt(readnotification.value); i++) {
          notificationList.value.pop();
        }
      });
    }
  });

  window.addEventListener("scroll", onScroll, true);

  locale.value = localStorage.getItem("locale") ?? "en";
  tempLocaleObject.value = locale.value === "ko" ? "한국어" : "English";

  // secret console.log() page
  if (process.env.NODE_ENV === "production") {
    console.clear();
    console.log("Built by Hyunseung Lee");
    console.log(
      "https://instagram.com/ihxnsxng\nhttps://github.com/hslee2008\nhttps://play.google.com/store/apps/dev?id=7815903651523223132"
    );
  }
});

const readall = () => {
  readnotification.value = notificationList.value.length;

  const accountRef = dbRef(
    $db,
    `account/${userInfo.value.uid}/readnotification`
  );
  set(accountRef, readnotification.value);
};

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll, true);
});

const search = ref("");
const searchItemsEnglish = enSearch.data;
const searchItemsKorean = koSearch.data;
const links = {
  Home: "/",
  "About Us": "/about-us",
  Education: "/actions/education",
  Members: "/members/members",
  Committees: "/members/committees",
  "Join Us": "/join-us/join-us",
  Donation: "/join-us/donation",
};

const routerWithSearch = (newSearch) => {
  router.push(links[newSearch]);
};

const logout = () => {
  $auth.signOut();
  userInfo.value = null;
  router.push("/");
};

const verifyEmail = () => {
  sendEmailVerification(auth, userInfo.email, {
    url: "https://thinkforall-linkall.web.app/",
  }).then(() => {
    alert("Email sent. Come back and refresh the page.");
  });
};

useHead({
  htmlAttrs: {
    lang: locale,
  },
});
</script>

<style scoped>
.v-main {
  --v-layout-top: 0px !important;
}

a {
  text-decoration: none;
  color: inherit;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
