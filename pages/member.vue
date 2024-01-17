<template>
  <div style="margin-top: 180px">
    <h1 class="text-center" style="font-size: 50px; text-decoration: underline">
      {{ t("members") }}
    </h1>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: t("members"),
});
</script>
