<template>
 <div
    style="
      margin-top: 140px;
      padding-top: 50px;
      padding-bottom: 150px;
      width: 100vw;
      height: calc(100vh - 140px);
    "
  >
    <h1 class="text-center" style="font-size: 50px">MY ACCOUNT</h1>


    <div class="mx-10 mt-4">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Display Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="photoURL"
        :rules="photoURLRules"
        label="Photo URL"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        :disabled="!emailVerified"
        required
      ></v-text-field>
      <v-alert
        v-if="!emailVerified"
        type="warning"
        class="mt-3"
        text="Email is not verified" 
      ></v-alert>

      <v-btn
        class="mt-3"
        color="primary"
        @click="update"
        :disabled="!valid"
      >
        Update Profile
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { updateProfile, updateEmail } from "firebase/auth";

const { $auth } = useNuxtApp();
const router = useRouter();

const name = ref("");
const photoURL = ref("");
const email = ref("");
const emailVerified = ref(false);

const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 20 || "Name must be less than 20 characters",
];
const photoURLRules = [
  (v) => !!v || "Photo URL is required",
  (v) => v.length <= 1000 || "Photo URL must be less than 1000 characters",
];
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
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
    photoURL.value = user.photoURL ?? '';
    email.value = user.email;
    emailVerified.value = user.emailVerified;
  } else {
    router.push("/account/login");
  }
});

const update = () => {
  updateEmail($auth.currentUser, email.value)
    .then(() => {
      console.log("Email updated");
    })
    .catch((error) => {
      console.log(error);
    }); 

  updateProfile($auth.currentUser, {
    displayName: name.value,
    photoURL: photoURL.value,
  })
    .then(() => {
      router.go(0);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>