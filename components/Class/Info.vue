<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-if="wWidth >= 784"
        v-bind="props"
        elevation="2"
        variant="tonal"
        class="card rounded-lg"
        :width="width"
        :to="`/class/class/?subject=${item?.subject}&id=${item?.classID}`"
      >
        <div class="content-container">
          <h2 class="headline text-h4 d-flex justify-center align-center">
            {{ $t(item?.subject) }}
            <v-icon end>{{ item?.icon }}</v-icon>
          </h2>
          <p class="text-center">
            {{
              locale === "en"
                ? item?.englishDisplayName
                : item?.koreanDisplayName
            }}
          </p>
        </div>

        <div class="image-container-large">
          <div>
            <img :src="item?.image" :height="180" />
          </div>
          <div class="info-container">
            <p class="text-h4 text-center">
              {{ item?.koreanTeacherName }}
            </p>
            <p class="text-h6 text-center">
              {{ item?.englishTeacherName }}
            </p>
          </div>
        </div>
      </v-card>
      <v-card
        v-else
        v-bind="props"
        variant="tonal"
        class="rounded-lg"
        :to="`/class/class/?subject=${item?.subject}&id=${item?.classID}`"
        height="325"
      >
        <div class="text-center mt-2 mb-5 px-1" style="width: 160px">
          <h2 class="text-h4 d-flex justify-center align-center">
            {{ t(item?.subject) }}
            <v-icon end size="x-small">{{ item?.icon }}</v-icon>
          </h2>
          <p class="text-center">
            {{
              locale === "en"
                ? item?.englishDisplayName
                : item?.koreanDisplayName
            }}
          </p>
        </div>
        <div
          class="d-flex justify-center"
          style="position: absolute; bottom: 0"
        >
          <img :src="item?.image" width="160" />
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
const { mobile, width: wWidth } = useDisplay();
const { locale, t } = useI18n();

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: [String, Number],
    default: "350px",
  },
});
</script>

<style scoped>
.headline {
  font-weight: 900;
  padding-top: 15px;
}

.card {
  width: 350px; /* Fixed width for large screens */
  height: 300px;
  border: 0.4px solid grey;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.content-container {
  padding: 16px;
}

.image-container-small {
  position: absolute;
  bottom: 0;
  left: 25px;
  width: calc(100% - 50px);
  margin-bottom: -10px;
}

.image-container-large {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 0 16px;
  margin-bottom: -10px;
}

.info-container {
  margin: auto 0 auto 0;
  margin-right: 25px;
}

.hover-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

@media (max-width: 380px) {
  .card {
    width: 90vw !important; /* Responsive width for smaller screens */
  }
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #95d6f4 300%);
}
</style>
