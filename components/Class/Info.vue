<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        elevation="2"
        variant="tonal"
        class="card rounded-lg"
        :width="width"
        :to="`/class/class/?subject=${item?.subject}&id=${item?.classID}`"
      >
        <div :class="`content-container ${width >= 300 ? 'ml-2' : ''}`">
          <h2
            :class="`headline ${width >= 300 ? 'ml-3' : 'text-center'}`"
            :style="`font-size: ${width <= 300 ? 30 : 40}px`"
          >
            {{ item?.subject?.toUpperCase() }}
            <v-icon end size="x-small">{{ item?.icon }}</v-icon>
          </h2>
          <p :class="`${width >= 300 ? 'ml-3' : 'text-center'}`">
            {{
              locale === "en"
                ? item?.englishDisplayName
                : item?.koreanDisplayName
            }}
          </p>
        </div>

        <div v-if="width <= 300" class="image-container-small">
          <img :src="item?.image" :height="width" />
        </div>

        <div v-if="width > 300" class="image-container-large">
          <div>
            <img :src="item?.image" :height="180" />
          </div>
          <div class="info-container">
            <p
              v-if="locale === 'en'"
              class="text-h6 text-decoration-underline text-center"
            >
              {{ item?.englishTeacherName }}
            </p>
            <p v-else-if="locale === 'ko'" class="text-h4 text-center">
              {{ item?.koreanTeacherName }}
            </p>
          </div>
        </div>

        <v-slide-x-transition v-if="!mobile" class="hover-button">
          <v-btn
            v-if="isHovering"
            elevation="0"
            icon="mdi-arrow-right-circle"
            size="large"
            variant="elevated"
          ></v-btn>
        </v-slide-x-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
const { mobile } = useDisplay();
const { locale } = useI18n();

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
    width: 90vw !important;
  }
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    #95d6f4 200%,
    #95d6f4 300%
  );
}
</style>
