<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("committees") }}
    </h1>

    <DivCenter class="mt-3">
      <div class="d-flex">
        <div class="mr-7">
          <ImgMember src="/members/junho.png"></ImgMember>
          <p class="text-center text-h6">{{ t("Junho Hwang") }}</p>
        </div>

        <div class="ml-7">
          <ImgMember src="/members/hyunseung.png"></ImgMember>
          <p class="text-center text-h6">{{ t("Hyunseung Lee") }}</p>
        </div>
      </div>
    </DivCenter>

    <br />
    <br />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: t("committees"),
});
</script>
