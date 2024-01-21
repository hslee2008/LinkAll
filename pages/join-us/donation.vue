<template>
  <div
    style="background-image: url('/background/donation.png')"
    class="top-div-with-bg container"
  >
    <h1 class="text-center header-u">
      {{ t("donation") }}
    </h1>

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="3">
          <v-card elevation="8">
            <v-card-text class="headline text-center"> Donation of x$ will do y </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card elevation="8">
            <v-card-text class="headline text-center"> Donation of x$ will do y </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card elevation="8">
            <v-card-text class="headline text-center"> Donation of x$ will do y </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-card elevation="8">
            <v-card-text class="headline text-center"> Donation of x$ will do y </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="d-flex justify-center mt-12">
      <v-card
        @click="openDialog1"
        style="margin-right: 20px"
        color="transparent"
        :elevation="0"
      >
        <img
          height="150px"
          class="rounded-lg"
          src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/two-hands-holding-mobile-phones-transferring-money-between-accounts-isolated-on-a-pink-background-marina-demeshko.jpg"
        />
        <v-card-title class="text-center">{{ t("transfer") }}</v-card-title>
      </v-card>

      <v-card
        @click="openDialog2"
        style="margin-left: 20px"
        color="transparent"
        :elevation="0"
      >
        <img
          height="150px"
          class="rounded-lg"
          src="https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/352383286_217268490641033_7276792902224323196_n.png?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=M7x9ceOrykEAX_a60-l&_nc_ht=scontent-ssn1-1.xx&oh=00_AfAme9tmu2jcUs0lD8ummf70kTCTIVZ5vU1ELLc1Ct38Ug&oe=65AED870"
        />
        <v-card-title class="text-center">{{ t("paypal") }}</v-card-title>
      </v-card>

      <v-dialog v-model="dialog1" width="500">
        <v-card :title="t('transfer')">
          <v-card-text class="my-3">
            3333294607629 카카오뱅크<br />
            (예금주: 김현희)
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" color="red" @click="dialog1 = false"></v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" width="500">
        <v-card :title="t('paypal')">
          <v-card-text class="my-3">
            <v-select
              v-model="donateAmount"
              :items="[0.5, 1, 3, 5, 10, 15, 25, 50]"
              label="Donate Amount (USD)"
              variant="outlined"
            ></v-select>

            <div id="paypal-button-container"></div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" color="red" @click="dialog2 = false"></v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

const dialog1 = ref(false);
const dialog2 = ref(false);
const donateAmount = ref("0.5");

onMounted(() => {
  $auth.onAuthStateChanged(() => {
    userInfo.value = $auth.currentUser;
  });
});

const openDialog1 = () => {
  dialog1.value = true;
};
const openDialog2 = () => {
  dialog2.value = true;

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
};

useHead({
  title: t("donation"),
});
</script>

<style scoped>
.container {
  height: calc(100vh - 140px);
}

@media (max-width: 1275px) {
  .container {
    height: calc(100vh - 65px);
  }
}
</style>
