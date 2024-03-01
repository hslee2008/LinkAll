<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        elevation="0"
        varaint="tonal"
        class="cardy rounded-lg"
        :width="width"
        :to="`/class/class/?subject=${item?.subject}&id=${item?.classID}`"
      >
        <div :class="`${width >= 300 ? 'ml-2' : ''}`">
          <h2
            :class="`headline ${width >= 300 ? 'ml-3' : 'text-center'}`"
            :style="`font-size: ${width <= 300 ? 30 : 40}px`"
          >
            <v-icon start size="x-small">{{ item?.icon }}</v-icon>
            {{ item?.subject?.toUpperCase() }}
          </h2>
          <p :class="`${width >= 300 ? 'ml-3' : 'text-center'}`">
            {{
              locale === "en"
                ? item?.englishDisplayName
                : item?.koreanDisplayName
            }}
          </p>
        </div>

        <div
          v-if="width <= 300"
          style="
            left: 0;
            bottom: 0;
            position: absolute;
            margin-bottom: -10px;
            width: 100%;
            margin-left: 25px;
          "
        >
          <img :src="item?.image" :height="width >= 300 ? 200 : width" />
        </div>

        <div
          v-if="width > 300"
          style="
            right: 0;
            bottom: 0;
            position: absolute;
            margin-bottom: -10px;
            width: 100%;
          "
          class="d-flex"
        >
          <div :class="`ma-auto mb-9`">
            <p
              v-if="locale === 'en'"
              class="text-h6 text-decoration-underline text-center"
            >
              {{ item?.englishTeacherName }}
            </p>
            <p v-else-if="locale === 'ko'" class="text-h4 text-center">
              {{ item?.koreanTeacherName }}
            </p>
            <p class="text-center">
              {{ item?.lang }}
            </p>
          </div>

          <div>
            <img :src="item?.image" :height="width >= 300 ? 200 : width" />
          </div>
        </div>

        <v-slide-x-transition
          v-if="!mobile"
          style="position: absolute; bottom: 0; right: 0"
          class="mr-12 mb-10"
        >
          <v-btn
            v-if="isHovering"
            elevation="0"
            icon="mdi-arrow-right-circle"
            size="large"
            variant="elevated"
            style="border: 1px solid black"
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
    default: {},
  },
  width: {
    type: String || Number,
    default: "350px",
  },
});
</script>

<style scoped>
.headline {
  font-weight: 900;
  padding-top: 15px;
}

.cardy {
  height: 300px;
  border: 0.4px solid grey;
}

@media (max-width: 380px) {
  .cardy {
    width: 90vw !important;
  }
}

.cardy:before {
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
