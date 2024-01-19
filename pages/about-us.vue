<template>
  <div
    style="background-image: url('/background/about-us.png')"
    class="top-div-with-bg"
  >
    <h1 class="text-center header-u">
      {{ t("about us") }}
    </h1>

    <br /><br />

    <div style="display: flex; justify-content: center; align-items: center">
      <div style="width: 500px">
        <h2>{{ t("purpose") }}</h2>
        <p>
          {{ t("purpose_text") }}
        </p>

        <br /><br />

        <h2>{{ t("vision") }}</h2>
        <p>
          {{ t("vision_text") }}
        </p>

        <br /><br />

        <h2>{{ t("impact") }}</h2>
        <p>{{ t("impact_text") }} ({{ yearmonth }})</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const yearmonth = ref("");

onMounted(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  yearmonth.value = `${year}.${month}`;
});

useHead({
  title: t("about us"),
});
</script>
