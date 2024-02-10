<template>
  <v-sheet :elevation="elevation" class="rounded-lg">
    <v-img
      :src="src"
      :style="`width: ${width}px; height: ${(width * 198) / 150}px`"
      alt="member image"
      draggable="false"
      class="mb-3 rounded-lg ma-auto"
    ></v-img>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  src: String,
  width: {
    type: Number,
    default: 150,
  },
  elevation: {
    type: Number,
    default: 10,
  },
});
</script>
