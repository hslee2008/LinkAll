<template>
  <div
    style="
      margin-top: calc(50vh - 190px);
      display: flex;
      justify-content: center;
    "
  >
    <video width="900" controls>
      <source :src="`/video/${title}.mp4`" type="video/mp4" />
      Your browser does not support HTML video.
    </video>
  </div>
</template>

<script setup>
const route = useRoute();
const title = route.query.title;
</script>
