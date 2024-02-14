<template>
  <div class="top-div-without-bg">
    <h1 class="text-center header-u">
      {{ t("create account") }}
    </h1>

    <div class="d-flex justify-center align-center mt-3 ma-4">
      <div style="width: 400px">
        <v-form ref="form">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :label="t('display name')"
            required
            variant="outlined"
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            :label="t('email')"
            required
            variant="outlined"
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :label="t('password')"
            type="password"
            required
            variant="outlined"
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="passwordConfirm"
            :rules="passwordConfirmRules"
            :label="t('password confirm')"
            type="password"
            required
            variant="outlined"
            class="mb-3"
          ></v-text-field>

          <v-btn
            class="mt-3"
            color="primary"
            @click="createAccount"
            :disabled="valid"
          >
            {{ t("create account") }}
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const { t } = useI18n();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const emailRules = [
  (v) => !!v || t("email is required"),
  (v) => /.+@.+\..+/.test(v) || t("email must be valid"),
];
const passwordRules = [
  (v) => !!v || t("password is required"),
  (v) => v.length >= 6 || t("password must be at least 6 characters"),
];
const nameRules = [(v) => !!v || t("display name is required")];
const passwordConfirmRules = [
  (v) => !!v || t("please confirm password"),
  (v) => v === password.value || t("password must match"),
];

const valid = computed(() => {
  return (
    emailRules[0](email.value) !== true ||
    emailRules[1](email.value) !== true ||
    passwordRules[0](password.value) !== true ||
    passwordRules[1](password.value) !== true ||
    nameRules[0](name.value) !== true ||
    passwordConfirmRules[0](passwordConfirm.value) !== true ||
    passwordConfirmRules[1](passwordConfirm.value) !== true
  );
});

const createAccount = () => {
  const auth = getAuth();

  const { $auth } = useNuxtApp();

  createUserWithEmailAndPassword(auth, email.value, password.value).then(() => {
    $auth.onAuthStateChanged((user) => {
      if (user) {
        updateProfile(user, {
          displayName: name.value,
        });
      }
    });

    router.push("/");
  });
};

useHead({
  title: t("create account"),
});
</script>
