<template>
  <div class="d-flex" style="margin-top: 150px">
    <div style="border-right: 10px solid black">
      <div
        class="d-flex justify-center align-center mx-12"
        style="height: calc(100vh - 160px)"
      >
        <div>
          <h1 class="text-center">"Join our journey"</h1>
          <h3 class="text-center mb-7">- LinkAll -</h3>

          <div class="text-center">
            <v-btn to="/account/create" variant="outlined">
              {{ t("create account") }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div
        class="d-flex justify-center align-center mx-12"
        style="width: calc(100vw - 400px)"
      >
        <div class="text-center" style="width: 400px">
          <h1
            style="
              font-size: 50px;
              margin-top: 10px;
              margin-bottom: 10px;
              text-decoration: underline;
            "
          >
            {{ t("login") }}
          </h1>

          <div class="mt-4">
            <v-btn
              prepend-icon="mdi-google"
              color="red"
              block
              @click="loginWithGoogle"
            >
              {{ t("login with google") }}
            </v-btn>
            <v-btn
              class="mt-1"
              color="primary"
              block
              prepend-icon="mdi-facebook"
              @click="loginWithFacebook"
            >
              {{ t("login with facebook") }}
            </v-btn>
          </div>

          <div class="mt-12">
            <v-form ref="form">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :label="t('email')"
                required
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="my-3"
                v-model="password"
                :rules="passwordRules"
                :label="t('password')"
                type="password"
                required
                variant="outlined"
              ></v-text-field>

              <v-btn color="primary" @click="loginWithEmail">
                {{ t("login") }}
              </v-btn>
            </v-form>

            <div v-if="wrongCredentials" class="mt-7">
              <v-alert type="error" :text="t('please try again')"></v-alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

const { t } = useI18n();
const router = useRouter();

const email = ref("");
const password = ref("");
const wrongCredentials = ref(false);

const loginWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider).then(() => router.push("/"));
};

const loginWithFacebook = () => {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider).then(() => router.push("/"));
};

const loginWithEmail = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => router.push("/"))
    .catch(() => {
      wrongCredentials.value = true;
    });
};

const emailRules = [
  (v) => !!v || t("email is required"),
  (v) => /.+@.+\..+/.test(v) || t("email must be valid"),
];
const passwordRules = [
  (v) => !!v || t("password is required"),
  (v) => v.length >= 6 || t("password must be at least 6 characters"),
];

useHead({
  title: t("login"),
});
</script>
