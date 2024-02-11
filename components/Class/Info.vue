<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        elevation="0"
        height="300px"
        :width="width"
        varaint="tonal"
        class="cardy rounded-lg"
        :to="`/class/${item.subject}/${item.classID}`"
      >
        <div class="ml-2">
          <v-card-title class="headline">
            <v-icon start size="x-small">{{ item.icon }}</v-icon>
            {{ item.subject.toUpperCase() }}
          </v-card-title>
          <v-card-text class="text-h6 mt-2">
            {{ item.englishDisplayName }}
          </v-card-text>
        </div>

        <div>
          <img
            :src="`/members/${item.teacherID}.png`"
            height="200"
            style="right: 0; bottom: 0; position: absolute"
          />
        </div>

        <v-card
          style="position: absolute; bottom: 0; margin-bottom: 30px"
          class="d-flex ml-2"
          elevation="0"
          color="transparent"
        >
          <div
            class="my-auto ml-4 mr-6 pb-3 rounded-lg"
            style="border: solid white"
          >
            <v-card-title class="text-left text-white">
              {{ item.englishTeacherName }}
            </v-card-title>
            <v-card-subtitle class="text-left text-white">
              {{ item.koreanTeacherName }}
            </v-card-subtitle>
          </div>

          <v-slide-x-transition>
            <v-btn
              v-if="isHovering"
              elevation="0"
              icon="mdi-arrow-right-circle"
              size="large"
              class="mt-3"
              variant="elevated"
            ></v-btn>
          </v-slide-x-transition>
        </v-card>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
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

@media (max-width: 600px) {
  .headline {
    font-size: 25px;
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
