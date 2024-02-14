<template>
  <v-sheet :elevation="elevation" class="rounded-lg mb-3">
    <v-img
      :src="src"
      :style="`width: ${width}px; height: ${(width * 198) / 150}px; ${bordered ? 'border: 0.1px black solid' : ''}`"
      alt="member image"
      draggable="false"
      class="rounded-lg ma-auto"
    >
      <v-btn
        v-if="showLink"
        icon="mdi-open-in-new"
        variant="plain"
        class="text-white"
        size="small"
        :to="`/members/members/#${name}`"
        style="position: absolute; bottom: 0; right: 0"
      ></v-btn>
    </v-img>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  src: String,
  width: {
    type: Number || String,
    default: 150,
  },
  elevation: {
    type: Number || String,
    default: 10,
  },
  showLink: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  name: String,
});
</script>
