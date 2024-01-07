import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyDAL5lTZYE57q0W15TzM9XptCWW1Oh9ycA",
    authDomain: "thinkforall-linkall.firebaseapp.com",
    projectId: "thinkforall-linkall",
    storageBucket: "thinkforall-linkall.appspot.com",
    messagingSenderId: "216528776478",
    appId: "1:216528776478:web:e45290f653d2192f5ced0f",
    measurementId: "G-0HQQD54YMS",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
});
