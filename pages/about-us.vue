<template>
  <div
    style="
      margin-top: 140px;
      padding-top: 50px;
      padding-bottom: 50px;
      width: 100vw;
      background-image: url('/about-us.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    "
  >
    <h1 class="text-center" style="font-size: 50px">ABOUT US</h1>

    <br /><br />

    <div style="display: flex; justify-content: center; align-items: center">
      <div style="width: 500px">
        <h2>Purpose</h2>
        <p>
          LinkAll is a nongovernmental, nonprofit organization established in
          2024, under the fundamental purpose of spreading the real meaning of
          donation and simplifying the action for the whole humanity to
          participate
        </p>

        <br /><br />

        <h2>Vision</h2>
        <p>
          In the current status quo, many individuals and organizations view the
          act of donation as a pitiful action done from one certain group to
          another. We wish to change that view. Our belief is that all
          individuals reach a period where he/she needs a hand, and the act of
          donation is that hand, a material linking a person to a person.
        </p>

        <br /><br />

        <h2>Impact</h2>
        <p>
          The LinkAll Community currently has members from 2 different schools,
          and 1 nation. Through our actions of education, we were able to teach
          0 students and donate 0 won. We are LinkAll. (2024.1)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const yearmonth = ref("");

onMounted(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  yearmonth.value = `${year}.${month}`;
});
</script>

<style></style>
