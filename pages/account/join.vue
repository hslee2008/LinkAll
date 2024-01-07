<template>
  <div class="d-flex" style="margin-top: 150px">
    <div style="border-right: 10px solid black">
      <div
        class="d-flex justify-center align-center mx-12"
        style="height: calc(100vh - 190px)"
      >
        <div>
          <h2>Join our journey</h2>
          <h3 class="text-center">- Link All -</h3>

          <div class="text-center">
            <v-btn class="mt-4">SIGN UP</v-btn>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex justify-center align-center mx-12" style="width: calc(100vw - 400px)">
        <div class="text-center">
          <h1 style="font-size: 50px; margin-top: 10px; margin-bottom: 10px;">Login</h1>

          <v-btn prepend-icon="mdi-google" @click="loginWithGoogle">
            Login with Google
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const router = useRouter();

const loginWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider).then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    localStorage.setItem("user", JSON.stringify(user));

    router.push("/");
  });
};
</script>
