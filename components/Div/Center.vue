<template>
  <div :class="`d-flex justify-center align-center ${classS}`">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  classS: {
    type: String,
    default: "",
  },
});
</script>
