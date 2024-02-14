<template>
  <div class="mt-180 mx-5 mb-10">
    <h1 class="text-center">
      Teacher's Page [<span class="text-decoration-underline">
        {{ parsedEmail }} </span
      >]
    </h1>

    <div v-if="classes[parsedEmail]">
      <div v-for="item in Object.keys(classes[parsedEmail]['to-join'])">
        <br /><br /><br />

        <h2 class="text-center">{{ item }}</h2>

        <v-card
          v-for="(classObj, index) in Object.values(
            classes[parsedEmail]['to-join'][item] ?? {}
          )"
          :key="Object.keys(classes[parsedEmail]['to-join'][item] ?? {})[index]"
          elevation="0"
        >
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                Class
                {{
                  Object.keys(classes[parsedEmail]["to-join"][item] ?? {})[
                    index
                  ]
                }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-card-subtitle
                  v-if="collectedDates[item][index]"
                  class="my-4"
                >
                  date: {{ collectedDates[item][index] }}
                </v-card-subtitle>
                <v-card-subtitle v-else>
                  date is not specified
                </v-card-subtitle>

                <v-list>
                  <div
                    v-for="student in Object.values(classObj ?? {})"
                    :key="student"
                    class="d-flex"
                  >
                    <v-list-item lines="two">
                      <v-list-item-title class="font-weight-bold">{{
                        student.s_name
                      }}</v-list-item-title>
                      <v-list-item-title>{{
                        student.s_email
                      }}</v-list-item-title>

                      <v-list-item-action class="mt-1">
                        <v-btn
                          color="primary"
                          :href="`mailto:${student.s_email}`"
                        >
                          <v-icon start>mdi-gmail</v-icon> Student
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>

                    <v-list-item lines="two">
                      <v-list-item-title class="font-weight-bold">{{
                        student.g_name
                      }}</v-list-item-title>
                      <v-list-item-title>{{
                        student.g_email
                      }}</v-list-item-title>

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
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $db, $auth } = useNuxtApp();

const parsedEmail = ref("");
const classes = ref({});
const collectedDates = ref({});

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

  for (const item in data[parsedEmail.value]["to-join"]) {
    collectedDates.value[item] = [];

    for (const innerItem in data[parsedEmail.value]["to-join"][item]) {
      collectedDates.value[item].push(
        Object.values(data[parsedEmail.value]["to-join"][item][innerItem])[0]
          .date
      );
    }
  }
});
</script>
