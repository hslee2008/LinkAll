<template>
  <div class="mt-180 mx-5 mb-10">
    <v-select
      v-model="parsedEmail"
      :items="keys"
      class="my-3"
      variant="outlined"
      label="Select teacher ID"
    ></v-select>

    <div v-if="classes[parsedEmail]">
      <div v-for="item in Object.keys(classes[parsedEmail]['to-join'])">
        <br /><br />

        <h2 class="text-center">{{ item }}</h2>

        <v-card
          v-for="(classObj, index) in Object.values(
            classes[parsedEmail]['to-join'][item] ?? {}
          )"
          :key="Object.keys(classes[parsedEmail]['to-join'][item] ?? {})[index]"
          elevation="0"
        >
          <v-expansion-panels>
            <v-expansion-panel style="border: 3px solid red" class="my-3">
              <v-expansion-panel-title>
                Class
                {{
                  Object.keys(classes[parsedEmail]["to-join"][item] ?? {})[
                    index
                  ]
                }}
              </v-expansion-panel-title>

              <v-table>
                <thead>
                  <tr>
                    <th class="font-weight-bold" style="width: 50%">
                      Students' Email
                    </th>
                    <th class="font-weight-bold" style="width: 50%">
                      Guardians' Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {{
                        Object.values(classObj ?? {})
                          .map((stu) => stu.s_email)
                          .join(", ")
                      }}
                    </th>
                    <th>
                      {{
                        Object.values(classObj ?? {})
                          .map((stu) => stu.g_email)
                          .join(", ")
                      }}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <v-btn
                        variant="tonal"
                        @click="
                          copy(
                            Object.values(classObj ?? {})
                              .map((stu) => stu.s_email)
                              .join(', ')
                          )
                        "
                      >
                        <v-icon start>mdi-content-copy</v-icon> copy
                      </v-btn>
                    </th>
                    <th>
                      <v-btn
                        variant="tonal"
                        @click="
                          copy(
                            Object.values(classObj ?? {})
                              .map((stu) => stu.g_email)
                              .join(', ')
                          )
                        "
                      >
                        <v-icon start>mdi-content-copy</v-icon> copy
                      </v-btn>
                    </th>
                  </tr>
                </tbody>
              </v-table>

              <v-expansion-panel-text>
                <v-list>
                  <div
                    v-for="(student, i) in Object.values(classObj ?? {})"
                    :key="i"
                    style="
                      border: 3px solid black;
                      border-radius: 15px;
                      padding: 5px;
                      margin-bottom: 50px;
                    "
                  >
                    <div :class="`d-flex my-3 ${xs ? 'flex-column' : ''}`">
                      <v-list-item lines="two">
                        <v-list-item-title class="font-weight-bold">{{
                          student.s_name
                        }}</v-list-item-title>
                        <v-list-item-title>{{
                          student.s_email
                        }}</v-list-item-title>
                      </v-list-item>

                      <v-list-item lines="two">
                        <v-list-item-title class="font-weight-bold">{{
                          student.g_name
                        }}</v-list-item-title>
                        <v-list-item-title>{{
                          student.g_email
                        }}</v-list-item-title>
                      </v-list-item>

                      <v-list-item lines="two">
                        <v-list-item-action class="mt-1">
                          <v-btn
                            color="primary"
                            :href="`mailto:${student.s_email}`"
                          >
                            <v-icon start>mdi-gmail</v-icon> Student
                          </v-btn>
                        </v-list-item-action>

                        <v-list-item-action class="mt-1">
                          <v-btn
                            color="primary"
                            :href="`mailto:${student.g_email}`"
                          >
                            <v-icon start>mdi-gmail</v-icon> Guardian
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </div>

                    <v-list-item lines="two">
                      <v-list-item-title
                        class="text-decoration-underline text-center mb-3"
                      >
                        Terms of Agreement
                      </v-list-item-title>
                      <v-table>
                        <thead>
                          <tr>
                            <th>Personal Info (contact)</th>
                            <th>Personal Info (class documents)</th>
                            <th>email notification</th>
                            <th>photos</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{{ student?.toa?.toa1 ?? "false" }}</th>
                            <th>{{ student?.toa?.toa2 ?? "false" }}</th>
                            <th>{{ student?.toa?.toa3 ?? "false" }}</th>
                            <th>{{ student?.toa?.toa4 ?? "false" }}</th>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-list-item>
                  </div>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </div>
    </div>

    <v-snackbar v-model="snackbar">
      {{ $t("copied") }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
const { $db, $auth } = useNuxtApp();
const { xs } = useDisplay();

const parsedEmail = ref("");
const keys = ref([]);
const classes = ref({});

const snackbar = ref(false);

onMounted(() => {
  $auth.onAuthStateChanged((user) => {
    if (user) {
      parsedEmail.value = user.email?.split("@")[0].replaceAll(".", "_");
    }

    if (process.env.NODE_ENV === "development") {
      parsedEmail.value = "h_junho420";
    }
  });

  onValue(dbRef($db, "classes"), (snapshot) => {
    const data = snapshot.val();
    classes.value = data;
    keys.value = Object.keys(data ?? {});
  });
});

function copy(string) {
  navigator.clipboard.writeText(string);
  snackbar.value = true;
}
</script>
