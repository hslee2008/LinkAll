<template>
  <div class="mt-180 mx-5 mb-10">
    <div class="d-flex">
      <div class="mr-7">
        <div class="d-flex">
          <h1 class="mr-3">LinkAll English Debate 2024 February</h1>
          <h2 class="my-auto">| Junho Hwang</h2>
        </div>

        <p class="text-justify">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>

        <div class="d-flex my-10">
          <div class="my-auto">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Category</th>
                  <th class="text-left">Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Grade</th>
                  <td>5 ~ 7</td>
                </tr>
                <tr>
                  <th>Class Fee</th>
                  <td>$3 / class</td>
                </tr>
                <tr>
                  <th>Class time</th>
                  <td>1h / class</td>
                </tr>
              </tbody>
            </v-table>

            <p style="color: red">
              * Note that 100% of the class fee will be donated
            </p>
          </div>

          <v-table class="ml-5">
            <thead>
              <tr>
                <th class="text">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2021. 02. 02</td>
              </tr>
              <tr>
                <td>2021. 02. 03</td>
              </tr>
              <tr>
                <td>2021. 02. 04</td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <div class="d-flex" style="gap: 30px">
          <v-img
            src="/background/original.png"
            width="50px"
            class="rounded-lg"
          ></v-img>
          <v-img
            src="/background/original.png"
            width="50px"
            class="rounded-lg"
          ></v-img>
          <v-img
            src="/background/original.png"
            width="50px"
            class="rounded-lg"
          ></v-img>
        </div>
      </div>

      <div class="ml-7">
        <h2 class="text-center text-decoration-underline">Junho Hwang</h2>

        <v-img
          src="/members/junho.jpeg"
          width="250px"
          class="rounded-shaped"
          elevation="3"
        ></v-img>

        <p class="text-justify my-4" style="width: 250px">
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
          imperdiet nec ut, sed euismod convenire principes at. Est et nobis
          iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
          sententiae.
        </p>
        <v-dialog width="500" transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              block
              class="my-4 mb-10 rounded-lg"
              color="yellow-darken-1"
              elevation="0"
            >
              Apply Now
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Apply for a class">
              <v-card-text>
                <v-form>
                  <p>Select Class Date</p>
                  <v-radio-group v-model="classNumber">
                    <v-radio label="(1) 2024/02/02" value="1"></v-radio>
                    <v-radio label="(2) 2024/02/03" value="2"></v-radio>
                    <v-radio label="(3) 2024/02/04" value="3"></v-radio>
                  </v-radio-group>

                  <v-text-field
                    v-model="s_name"
                    label="Student Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="s_email"
                    label="Student Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_name"
                    label="Guardian Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="g_email"
                    label="Guardian Email"
                  ></v-text-field>
                  <v-text-field
                    v-model="d_name"
                    label="Donator Name"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Submit"
                  color="red"
                  block
                  class="mb-3"
                  @click="
                    () => {
                      saveToDatabase();
                      isActive.value = false;
                      thankYou = true;
                    }
                  "
                ></v-btn>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </div>

    <v-dialog width="500px" v-model="thankYou">
      <v-card class="d-flex flex-column align-center pa-4">
        <p>
          Thank you for your submission. We will contact you via email to
          confirm your submission. If you have any questions, please contact
          <a href="mailto:linkallcommunity@gmail.com"
            >linkallcommunity@gmail.com</a
          >
        </p>

        <v-btn
          @click="thankYou = false"
          block
          color="primary"
          class="mt-3"
          elevation="0"
        >
          Got it!
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { push, ref as dbRef } from "firebase/database";

const { t, locale } = useI18n();
const { $db } = useNuxtApp();

const classNumber = ref("1");
const s_name = ref("");
const s_email = ref("");
const g_name = ref("");
const g_email = ref("");
const d_name = ref("");
const thankYou = ref(false);

const saveToDatabase = () => {
  const classRef = dbRef(
    $db,
    `classes/h_junho420/to-join/${classNumber.value}`
  );
  push(classRef, {
    classNumber: classNumber.value,
    s_name: s_name.value,
    s_email: s_email.value,
    g_name: g_name.value,
    g_email: g_email.value,
    d_name: d_name.value,
  });
};

useHead({
  title: t("class"),
});
</script>
