<template>
  <div class="mt-180 mx-5 mb-10">
    <v-select
      v-if="isAdmin"
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

              <DivCenter>
                <v-dialog width="500">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      color="red"
                      variant="tonal"
                      class="mb-3 mt-7"
                    >
                      Delete Class
                    </v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card title="Delete?">
                      <v-card-text> Really delete this class? </v-card-text>

                      <v-card-actions>
                        <v-btn
                          text="Delete"
                          color="red"
                          @click="
                            deleteClass(
                              item,
                              index,
                              () => (isActive.value = false)
                            )
                          "
                        ></v-btn>

                        <v-spacer></v-spacer>

                        <v-btn
                          text="Cancel"
                          @click="isActive.value = false"
                        ></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </DivCenter>

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
                    <div :class="`my-3 ${xs ? 'flex-column' : ''}`">
                      <div class="d-flex">
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
                      </div>

                      <v-list-item-action class="mt-2">
                        <v-btn
                          class="ml-4"
                          color="primary"
                          :href="`mailto:${student.s_email}`"
                        >
                          <v-icon start>mdi-gmail</v-icon> Student
                        </v-btn>

                        <v-btn
                          class="ml-4"
                          color="primary"
                          :href="`mailto:${student.g_email}`"
                        >
                          <v-icon start>mdi-gmail</v-icon> Guardian
                        </v-btn>

                        <v-btn
                          class="ml-4"
                          color="red"
                          @click="
                            DeleteStudent(
                              item,
                              Object.keys(
                                classes[parsedEmail]['to-join'][item] ?? {}
                              )[index],
                              i,
                              student.uid,
                              item
                            )
                          "
                        >
                          <v-icon start>mdi-delete</v-icon> DELETE
                        </v-btn>
                      </v-list-item-action>
                    </div>

                    <v-list-item lines="two">
                      <v-list-item-title
                        class="text-decoration-underline text-center mb-2"
                      >
                        Terms of Agreement
                      </v-list-item-title>
                      <v-table>
                        <thead>
                          <tr>
                            <th class="font-weight-bold">Contact</th>
                            <th class="font-weight-bold">Documents</th>
                            <th class="font-weight-bold">Email</th>
                            <th class="font-weight-bold">Photo</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>
                              {{ student?.toa?.toa1 ? "agreed" : "not agreed" }}
                            </th>
                            <th>
                              {{ student?.toa?.toa2 ? "agreed" : "not agreed" }}
                            </th>
                            <th>
                              {{ student?.toa?.toa3 ? "agreed" : "not agreed" }}
                            </th>
                            <th>
                              {{ student?.toa?.toa4 ? "agreed" : "not agreed" }}
                            </th>
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

const isAdmin = ref(false);

onMounted(() => {
  $auth.onAuthStateChanged((user) => {
    if (user) {
      parsedEmail.value = user.email?.split("@")[0].replaceAll(".", "_");
      isAdmin.value = checkAdmin(user.email);
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

function deleteClass(item, index, close) {
  const toDelete = dbRef(
    $db,
    `classes/${parsedEmail.value}/to-join/${item}/${index + 1}`
  );
  set(toDelete, null);
  close();
}

function DeleteStudent(index, class_i, i, uid, class_id) {
  const fromTeacher = classes.value[parsedEmail.value]["to-join"];
  const fromClass = fromTeacher[index][class_i];
  delete fromClass[Object.keys(fromClass ?? {})[i]];
  set(dbRef($db, "classes"), classes.value);

  const account = dbRef($db, `account/${uid}/${class_id}`);
  set(account, null);
}
</script>
