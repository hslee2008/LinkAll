<template>
  <div class="top-div-without-bg">
    <h1 class="text-center header-u">
      {{ t("my account") }}
    </h1>

    <div class="mx-10 mt-4">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :label="t('display name')"
        required
      ></v-text-field>

      <div class="d-flex">
        <v-textarea
          v-model="photoURL"
          :rules="photoURLRules"
          :label="t('photo url')"
          required
        ></v-textarea>

        <v-img :src="photoURL" class="ma-auto" width="70" height="70"></v-img>
      </div>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        :label="t('email')"
        :disabled="!emailVerified"
        required
      ></v-text-field>
      <v-alert
        v-if="!emailVerified"
        type="warning"
        class="mt-3"
        :text="t('email not verified')"
      ></v-alert>

      <v-btn class="mt-3" color="primary" @click="update" :disabled="!valid">
        {{ t("update profile") }}
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

import { updateProfile, updateEmail } from "firebase/auth";

const { t } = useI18n();
const { $auth } = useNuxtApp();
const router = useRouter();

const name = ref("");
const photoURL = ref("");
const email = ref("");
const emailVerified = ref(false);

const nameRules = [(v) => !!v || t("display name is required")];
const photoURLRules = [
  (v) => !!v || t("photo URL is required"),
  (v) => v.length <= 1000 || t("photo URL must be less than 1000 characters"),
];
const emailRules = [
  (v) => !!v || t("email is required"),
  (v) => /.+@.+\..+/.test(v) || t("email must be valid"),
];

const valid = computed(() => {
  return (
    name.value.length > 0 &&
    name.value.length <= 20 &&
    photoURL.value.length > 0 &&
    photoURL.value.length <= 1000 &&
    email.value.length > 0 &&
    /.+@.+\..+/.test(email.value)
  );
});

$auth.onAuthStateChanged((user) => {
  if (user) {
    name.value = user.displayName;
    photoURL.value = user.photoURL ?? "";
    email.value = user.email;
    emailVerified.value = user.emailVerified;
  } else {
    router.push("/account/login");
  }
});

const update = () => {
  updateEmail($auth.currentUser, email.value);
  updateProfile($auth.currentUser, {
    displayName: name.value,
    photoURL: photoURL.value,
  }).then(() => router.go(0));
};

useHead({
  title: t("my account"),
});
</script>
