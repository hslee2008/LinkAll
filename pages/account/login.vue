<template>
  <div class="container top-div-without-bg">
    <div class="login-container">
      <div class="d-flex justify-center align-center mx-12 login-content">
        <div class="text-center login-form">
          <h2 class="text-center slogan">"Join our journey"</h2>
          <h3 class="text-center mb-7 subtitle">- LinkAll -</h3>

          <v-btn
            prepend-icon="mdi-google"
            color="red"
            block
            class="social-login-btn"
            @click="loginWithGoogle"
          >
            {{ t("login with google") }}
          </v-btn>
          <v-btn
            to="/account/create"
            color="green"
            block
            class="social-login-btn"
          >
            {{ t("create account") }}
          </v-btn>

          <br />

          <div class="mt-2">
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
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.sign-up-container {
  border-right: 2px solid #ddd;
  padding-right: 20px;
  margin-right: 20px;
}

.sign-up-content {
  height: calc(100vh - 160px);
  width: calc(100vw - 1300px);
}

.slogan {
  font-weight: bold;
  font-size: 24px;
  color: #333;
}

.subtitle {
  font-family: "Grape Nuts", cursive;
  font-size: 20px;
  color: #666;
}

.sign-up-btn {
  margin-top: 20px;
}

.login-container {
  padding-left: 20px;
}

.login-content {
  width: calc(100vw - 400px);
}

.login-form {
  width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-u {
  font-size: 28px;
  color: #444;
}

.social-login-btn {
  margin-top: 10px;
}

@media (max-width: 1275px) {
  .container {
    flex-direction: column-reverse;
  }

  .sign-up-container {
    border-right: none;
    padding-right: 0;
    margin-right: 0;
  }

  .sign-up-content,
  .login-content {
    width: 100%;
  }

  .login-form {
    width: 100%;
    padding: 10px;
  }
}

@media (max-width: 600px) {
  .login-form {
    padding: 10px;
    width: calc(100vw - 100px);
    margin-top: 15px;
  }

  .login-container {
    padding-left: 0;
    display: flex;
    justify-content: center;
    align-items: center;


  }
}
</style>
