<template>
  <div
    class="top-div-with-bg"
    style="background-image: url('/background/donation.png')"
  >
    <h1 class="text-center header-u">
      {{ t("donation") }}
    </h1>

    <v-card class="mt-10 mx-15" elevation="0">
      <v-card-text
        v-if="locale === 'en'"
        style="
          font-family: Libre Baskerville;
          font-size: 18px;
          line-height: 30px;
        "
      >
        Thank you for your interest in donation. Your small actions have the
        ability to support someone in need, linking many individuals to our
        community. Your thoughtful donation will be used to support the ones in
        need through an official organization. All of the donating activities
        will be uploaded to our website.
      </v-card-text>
      <v-card-text
        v-else-if="locale === 'ko'"
        style="
          font-family: Noto Serif Korean;
          font-size: 18px;
          line-height: 30px;
        "
      >
        기부에 대한 관심에 정말 감사의 마음을 표합니다. 여러분의 작은 행동은
        누군가의 지원을 가능하게 하며 많은 개인들을 우리 사회와 연결할 수 있는
        능력을 가지고 있습니다. 여러분의 사려 깊은 기부는 공식 기관을 통해
        필요한 이들을 지원하는 데 사용될 것입니다. 기부 활동은 모두 우리
        웹사이트에 업로드될 것입니다.
      </v-card-text>
      <p style="font-family: Grape Nuts" class="font-weight-black ml-3 mb-3">
        - Think for All, Link All.
      </p>
    </v-card>

    <div class="pay-container mt-10 pb-5 ga-15">
      <v-card
        @click="openDialog1"
        color="transparent"
        :elevation="0"
        class="ma-2 pa-2"
      >
        <DivCenter>
          <img
            height="150px"
            width="150px"
            class="rounded-pill"
            src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/two-hands-holding-mobile-phones-transferring-money-between-accounts-isolated-on-a-pink-background-marina-demeshko.jpg"
          />
        </DivCenter>
        <h2 class="text-center">{{ t("transfer") }}</h2>
        <p v-if="locale === 'en'" class="text-center">Domestic</p>
      </v-card>

      <v-card
        @click="openDialog2"
        color="transparent"
        :elevation="0"
        class="ma-2 pa-2"
      >
        <DivCenter>
          <img
            height="150px"
            width="150px"
            class="rounded-pill ma-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCIiOw244LMuXnAk6IDgME5eFy30cxsKAJiQ&usqp=CAU"
          />
        </DivCenter>
        <h2 class="text-center">{{ t("paypal") }}</h2>
        <p v-if="locale === 'en'" class="text-center">Foreign</p>
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

const { t, locale } = useI18n();
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
.top-div-with-bg {
  height: calc(100vh);
}

.pay-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1275px) {
  .container {
    height: calc(100vh - 65px);
  }

  .top-div-with-bg {
    height: auto;
  }

  .pay-container {
    flex-direction: column;
  }
}
</style>
