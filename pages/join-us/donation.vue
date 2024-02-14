<template>
  <div class="top-div-with-bg">
    <h1 class="text-center header-u">
      {{ t("donation") }}
    </h1>

    <v-card
      class="mt-10 top-container rounded-lg"
      elevation="0"
      color="#ededed"
    >
      <v-card-text v-if="locale === 'en'" class="text-justify donation-text">
        Thank you for your interest in donation. Your steps of actions give the
        precious opportunity for students to learn, and have education. Your
        action is changing a person's life. Your thoughtful donation will be
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

      <v-dialog v-model="dialog1" width="500">
        <v-card :title="t('transfer')">
          <v-card-text class="my-3">
            <div class="transfer">
              <div class="ma-auto mb-2">
                <v-btn variant="flat" @click="copy">
                  <v-icon start>mdi-content-copy</v-icon> copy
                </v-btn>
              </div>

              <div class="ma-auto">
                3333294607629 카카오뱅크<br />
                (예금주: 김현희)
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" color="red" @click="dialog1 = false"></v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-snackbar v-model="snackbar">
      {{ $t("copied") }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();
const { $auth } = useNuxtApp();
const userInfo = ref(null);

const snackbar = ref(false);
const dialog1 = ref(false);

onMounted(() => {
  $auth.onAuthStateChanged(() => {
    userInfo.value = $auth.currentUser;
  });
});

const openDialog1 = () => {
  dialog1.value = true;
};

function copy() {
  navigator.clipboard.writeText("3333294607629");
  snackbar.value = true;
}

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

.transfer {
  display: flex;
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

@media (max-width: 450px) {
  .top-container {
    margin-left: 20px;
    margin-right: 20px;
  }

  .donation-image {
    height: 70px;
    width: 70px;
  }
}

@media (max-width: 400px) {
  .transfer {
    flex-direction: column;
  }
}
</style>
