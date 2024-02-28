<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("committees") }}
    </h1>

    <DivCenter classS="my-3">
      <div class="text-center my-4">
        <h2>Organizing Team</h2>
      </div>

      <div class="d-flex my-3">
        <div class="mx-7">
          <ImgMember
            :elevation="0"
            showLink
            src="/members/junho.png"
            name="junho"
          ></ImgMember>
          <p class="text-center">{{ t("founder") }}</p>
          <p class="text-center text-h6">{{ t("Junho Hwang") }}</p>
        </div>

        <div class="mx-7">
          <ImgMember
            :elevation="0"
            showLink
            src="/members/hyunseung.png"
            name="hyunseung"
          ></ImgMember>
          <p class="text-center">{{ t("co-founder") }}</p>
          <p class="text-center text-h6">{{ t("Hyunseung Lee") }}</p>
        </div>
      </div>

      <div class="d-flex justify-center my-3">
        <div class="mx-7">
          <ImgMember
            :elevation="0"
            showLink
            src="/members/woojin.png"
            name="woojin"
          ></ImgMember>
          <p class="text-center">{{ t("Designer") }}</p>
          <p class="text-center text-h6">{{ t("Woojin Cho") }}</p>
        </div>
      </div>
    </DivCenter>

    <br /><br />

    <DivCenter classS="my-3">
      <div class="text-center my-4">
        <h2>Education Team</h2>
      </div>

      <div class="d-flex">
        <div class="d-flex-break">
          <div class="flex-item">
            <ImgMember
              :elevation="0"
              :showLink="true"
              src="/members/junho.png"
              name="junho"
            ></ImgMember>
            <p class="text-center">{{ t("teacher") }}</p>
            <p class="text-center text-h6">{{ t("Junho Hwang") }}</p>
          </div>

          <div :class="`flex-item ${mobile ? 'mt-5' : ''}`">
            <ImgMember
              :elevation="0"
              :showLink="true"
              src="/members/doyung.png"
              name="doyung"
            ></ImgMember>
            <p class="text-center">{{ t("teacher") }}</p>
            <p class="text-center text-h6">{{ t("Doyung Yun") }}</p>
          </div>
        </div>

        <div class="d-flex-break">
          <div class="flex-item">
            <ImgMember
              :elevation="0"
              :showLink="true"
              src="/members/yoojong.png"
              name="joojong"
            ></ImgMember>
            <p class="text-center">{{ t("teacher") }}</p>
            <p class="text-center text-h6">{{ t("Yoojong Seo") }}</p>
          </div>
        </div>
      </div>
    </DivCenter>

    <br />
    <br />
  </div>
</template>

<script setup>
const { t } = useI18n();
const { mobile } = useDisplay();

useHead({
  title: t("committees"),
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.flex-item {
  margin-left: 30px;
  margin-right: 30px;
}

.d-flex-break {
  display: flex;
}

@media (max-width: 650px) {
  .flex-item {
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
}

@media (max-width: 550px) {
  .d-flex-break {
    display: block;
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
}
</style>
