<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        elevation="0"
        varaint="tonal"
        class="cardy rounded-xl"
        :width="width"
        :to="`/class/${item?.subject}/${item?.classID}`"
      >
        <div class="ml-2">
          <v-card-title class="headline">
            <v-icon start size="x-small">{{ item?.icon }}</v-icon>
            {{ item?.subject?.toUpperCase() }}
          </v-card-title>
          <v-card-text class="text-h6 mt-2">
            {{
              locale === "en"
                ? item?.englishDisplayName
                : item?.koreanDisplayName
            }}
          </v-card-text>
        </div>

        <div
          style="
            right: 0;
            bottom: 0;
            position: absolute;
            margin-bottom: -10px;
            width: 100%;
          "
          class="d-flex"
        >
          <div class="ma-auto mb-8 d-flex">
            <div class="pb-3 rounded-lg" style="border: solid white">
              <v-card-title class="text-left text-white">
                {{
                  locale === "en"
                    ? item?.englishTeacherName
                    : item?.koreanTeacherName
                }}
              </v-card-title>
              <v-card-subtitle class="text-white" style="max-width: 150px">
                {{ item?.lang }}
              </v-card-subtitle>
            </div>
          </div>

          <div>
            <img :src="`/members/${item?.teacherID}.png`" height="200" />
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
    type: String,
    default: "350px",
  },
});
</script>

<style scoped>
.headline {
  font-weight: 900;
  font-size: 40px;
  padding-top: 30px;
}

.cardy {
  height: 300px;
  border: 0.4px solid grey;
}

@media (max-width: 600px) {
  .headline {
    font-size: 25px;
  }
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
    black 200%,
    black 300%
  );
}
</style>
