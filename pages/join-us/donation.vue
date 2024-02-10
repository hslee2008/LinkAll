<template>
  <div class="top-div-with-bg">
    <h1 class="text-center header-u">
      {{ t("donation") }}
    </h1>

    <v-card class="mt-10 top-container" elevation="0" variant="tonal">
      <v-card-text v-if="locale === 'en'" class="text-justify donation-text">
        Thank you for your interest in donation. Your steps of actions give the
        precious opportunity for students to learn, and have education. Your
        action is changing a person’s life. Your thoughtful donation will be
        used to support young children receive primary education, and minimize
        the educational inequality. All donating activities will be uploaded to
        our website. Once again, we appreciate your kindness towards humanity.
      </v-card-text>
      <v-card-text
        v-else-if="locale === 'ko'"
        class="text-justify donation-text"
      >
        기부에 대한 관심에 정말 감사의 마음을 표합니다. 여러분의 작은 행동은
        누군가의 지원을 가능하게 하며 많은 개인들을 우리 사회와 연결할 수 있는
        능력을 가지고 있습니다. 여러분의 사려 깊은 기부는 공식 기관을 통해
        필요한 이들을 지원하는 데 사용될 것입니다. 기부 활동은 모두 우리
        웹사이트에 업로드될 것입니다.
      </v-card-text>
      <h2 style="font-family: Grape Nuts" class="font-weight-black ml-3 mb-3">
        - Think for All, Link All.
      </h2>
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
            class="rounded-pill donation-image"
            src="/used-images/direct-transfer.jpg"
          />
        </DivCenter>
        <h2 class="text-center">{{ t("transfer") }}</h2>
        <p v-if="locale === 'en'" class="text-center">Domestic</p>
        <p v-else-if="locale === 'ko'" class="text-center">국내</p>
      </v-card>

      <v-card
        @click="openDialog2"
        color="transparent"
        :elevation="0"
        class="ma-2 pa-2"
      >
        <DivCenter>
          <img
            class="rounded-pill ma-auto donation-image"
            style="border-style: solid"
            src="/used-images/paypal.png"
          />
        </DivCenter>
        <h2 class="text-center">{{ t("paypal") }}</h2>
        <p v-if="locale === 'en'" class="text-center">Foreign</p>
        <p v-else-if="locale === 'ko'" class="text-center">해외</p>
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
      "AfS9jbsEq7ax6TRoH58Q9DZ77vPw7KHbKCaYZq6mKxXr_pWmP11fVPH7FJSdEi2trD9rJtUGgWJC__FY",
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
                  let total;

                  if (parseInt(snapshot.val().amount) === "NaN") {
                    total = donateAmount.value;
                  } else {
                    total =
                      parseInt(snapshot.val().amount) + donateAmount.value;
                  }

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

.donation-text {
  font-family: Libre Baskerville;
  font-size: 18px;
  line-height: 30px;
}

.top-container {
  margin-left: 100px;
  margin-right: 100px;
}

.donation-image {
  height: 150px;
  width: 150px;
}

@media (max-width: 1275px) {
  .container {
    height: calc(100vh - 65px);
  }

  .top-div-with-bg {
    height: auto;
  }

  .donation-text {
    font-family: Libre Baskerville;
    font-size: 17px;
    line-height: 30px;
  }

  .top-container {
    margin-left: 30px;
    margin-right: 30px;
  }

  .donation-image {
    height: 150px;
    width: 150px;
  }

  h2 {
    font-size: 18px;
  }
}

@media (max-width: 1275px) {
  .container {
    height: calc(100vh - 65px);
  }

  .top-div-with-bg {
    height: auto;
  }

  .donation-text {
    font-family: Libre Baskerville;
    font-size: 14px;
    line-height: 20px;
  }

  .top-container {
    margin-left: 10px;
    margin-right: 10px;
  }

  .donation-image {
    height: 50px;
    width: 50px;
  }

  h2 {
    font-size: 15px;
  }
}
</style>
