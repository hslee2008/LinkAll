<template>
  <div
    style="background-image: url('/background/donation.png')"
    class="top-div-with-bg"
  >
    <h1 class="text-center" style="font-size: 50px; text-decoration: underline">
      {{ t("donation") }}
    </h1>

    <div class="d-flex justify-center align-center">
      <v-card width="300" class="ml-10 mt-8" elevation="8">
        <v-card-item>
          <v-card-title>BLA</v-card-title>
          <v-card-subtitle>BLIBLA</v-card-subtitle>
        </v-card-item>

        <v-card-text> BLABv-card-text </v-card-text>
      </v-card>
      <v-card width="300" class="ml-10 mt-8" elevation="8">
        <v-card-item>
          <v-card-title>BLA</v-card-title>
          <v-card-subtitle>BLIBLA</v-card-subtitle>
        </v-card-item>

        <v-card-text> BLABv-card-text </v-card-text>
      </v-card>
      <v-card width="300" class="ml-10 mt-8" elevation="8">
        <v-card-item>
          <v-card-title>BLA</v-card-title>
          <v-card-subtitle>BLIBLA</v-card-subtitle>
        </v-card-item>

        <v-card-text> BLABv-card-text </v-card-text>
      </v-card>
      <v-card width="300" class="ml-10 mt-8" elevation="8">
        <v-card-item>
          <v-card-title>BLA</v-card-title>
          <v-card-subtitle>BLIBLA</v-card-subtitle>
        </v-card-item>

        <v-card-text> BLABv-card-text </v-card-text>
      </v-card>
    </div>

    <div class="d-flex justify-center mt-12">
      <div style="width: 500px">
        <v-select
          v-model="donateAmount"
          :items="[0.5, 1, 3, 5, 10, 15, 25, 50]"
          label="Donate Amount (USD)"
          variant="outlined"
        ></v-select>

        <div id="paypal-button-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loadScript } from "@paypal/paypal-js";
import { ref as dbRef, set, onValue } from "firebase/database";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { $db, $auth } = useNuxtApp();
const userInfo = ref(null);

const donateAmount = ref("0.5");

onMounted(() => {
  $auth.onAuthStateChanged(() => {
    userInfo.value = $auth.currentUser;
  });

  loadScript({
    "client-id":
      "Abac69CCZicy3Y8PbA2VJdZMp_UJPY-nbwhwy9fZA5Dlh2YQXBgYCUKVhtZCq3kO5Cd1iGZDMewBTcGx",
  }).then((paypal) => {
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: donateAmount.value,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert(
              "Transaction completed by " + details.payer.name.given_name + "!"
            );

            set(dbRef($db, `users/${userInfo.value.uid}/donation`), {
              amount: donateAmount.value,
              date: new Date().toISOString(),
            });

            onValue(
              dbRef($db, `users/${userInfo.value.uid}/total-donation`),
              (snapshot) => {
                if (snapshot.exists()) {
                  const total =
                    parseInt(snapshot.val().amount) + donateAmount.value;

                  set(
                    dbRef($db, `users/${userInfo.value.uid}/total-donation`),
                    total
                  );
                } else {
                  set(
                    dbRef($db, `users/${userInfo.value.uid}/total-donation`),
                    donateAmount.value
                  );
                }
              }
            );
          });
        },
      })
      .render("#paypal-button-container");
  });
});

useHead({
  title: t("donation"),
  script: [
    {
      src: "https://www.paypalobjects.com/donate/sdk/donate-sdk.js",
    },
  ],
});
</script>
