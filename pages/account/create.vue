<template>
  <div
    style="
      margin-top: 140px;
      padding-top: 50px;
      padding-bottom: 50px;
      width: 100vw;
      height: calc(100vh - 140px);
    "
  >
    <h1 class="text-center" style="font-size: 50px">SIGN UP</h1>

    <div class="d-flex justify-center align-center">
      <div style="width: 400px">
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Display Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-text-field
            v-model="passwordConfirm"
            :rules="passwordConfirmRules"
            label="Password Confirm"
            type="password"
            required
          ></v-text-field>

          <v-btn
            class="mt-3"
            color="primary"
            @click="createAccount"
            :disabled="!valid"
          >
            Create Account
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];
const nameRules = [(v) => !!v || "Display Name is required"];
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
];
const passwordConfirmRules = [
  (v) => !!v || "Password Confirm is required",
  (v) => v === password.value || "Password must match",
];

let valid = computed(() => {
  return (
    emailRules[0](email.value) &&
    emailRules[1](email.value) &&
    passwordRules[0](password.value) &&
    passwordRules[1](password.value) &&
    passwordConfirmRules[0](passwordConfirm.value) &&
    passwordConfirmRules[1](passwordConfirm.value) &&
    nameRules[0](name.value)
  );
});

const createAccount = () => {
  const auth = getAuth();

  const { $auth } = useNuxtApp();

  createUserWithEmailAndPassword(auth, email.value, password.value).then(
    (user) => {

      $auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("user", user);
          updateProfile(user, {
            displayName: name.value,
          }).then(() => {
            console.log("update profile");
          });
        } else {
          console.log("no user");
        }
      });

      router.push("/");
    }
  );
};

useHead({
  title: "Create Account",
});
</script>
