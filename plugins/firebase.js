import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

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

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const storage = firebase.storage();
  const db = firebase.database();

  nuxtApp.vueApp.provide("auth", auth);
  nuxtApp.provide("auth", auth);

  nuxtApp.vueApp.provide("storage", storage);
  nuxtApp.provide("storage", storage);

  nuxtApp.vueApp.provide("db", db);
  nuxtApp.provide("db", db);
});
