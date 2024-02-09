<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("committees") }}
    </h1>

    <DivCenter class="my-3">
      <div class="text-center my-4">
        <h2>Organizing Team</h2>
      </div>

      <div class="d-flex my-3">
        <NuxtLink to="/members/members/#junho" class="mx-7">
          <ImgMember src="/members/junho.png"></ImgMember>
          <p class="text-center">{{ t("founder") }}</p>
          <p class="text-center text-h6">{{ t("Junho Hwang") }}</p>
        </NuxtLink>

        <NuxtLink to="/members/members/#hyunseung" class="mx-7">
          <ImgMember src="/members/hyunseung.png"></ImgMember>
          <p class="text-center">{{ t("co-founder") }}</p>
          <p class="text-center text-h6">{{ t("Hyunseung Lee") }}</p>
        </NuxtLink>
      </div>

      <div class="d-flex justify-center my-3">
        <NuxtLink to="/members/members/#woojin" class="mx-7">
          <ImgMember src=""></ImgMember>
          <p class="text-center">{{ t("designer") }}</p>
          <p class="text-center text-h6">{{ t("Woojin Cho") }}</p>
        </NuxtLink>
      </div>
    </DivCenter>

    <br /><br />

    <DivCenter class="my-3">
      <div class="text-center my-4">
        <h2>Education Team</h2>
      </div>

      <div class="d-flex">
        <NuxtLink to="/members/members/#junho" class="mx-7">
          <ImgMember src="/members/junho.png"></ImgMember>
          <p class="text-center">{{ t("teacher") }}</p>
          <p class="text-center text-h6">{{ t("Junho Hwang") }}</p>
        </NuxtLink>

        <NuxtLink to="/members/members/#doyung" class="mx-7">
          <ImgMember src="/members/doyung.png"></ImgMember>
          <p class="text-center">{{ t("teacher") }}</p>
          <p class="text-center text-h6">{{ t("Doyung Yun") }}</p>
        </NuxtLink>
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

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
