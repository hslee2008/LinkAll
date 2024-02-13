import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getPerformance } from "firebase/performance";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDAL5lTZYE57q0W15TzM9XptCWW1Oh9ycA",
    authDomain: "thinkforall-linkall.firebaseapp.com",
    databaseURL:
      "https://thinkforall-linkall-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thinkforall-linkall",
    storageBucket: "thinkforall-linkall.appspot.com",
    messagingSenderId: "216528776478",
    appId: "1:216528776478:web:e45290f653d2192f5ced0f",
    measurementId: "G-0HQQD54YMS",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const db = getDatabase(app);

  nuxtApp.hook("page:transition:finish", () => {
    getPerformance(app);
    getAnalytics(app);
  });

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("db", db);
  nuxtApp.provide("db", db);

  nuxtApp.vueApp.provide("firestore", firestore);
  nuxtApp.provide("firestore", firestore);
});
