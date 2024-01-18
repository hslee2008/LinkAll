<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("join us") }}
    </h1>

    <div v-if="registering">
      <h1 class="text-center">
        {{ t("your data is being examined") }}
      </h1>
    </div>

    <div v-else-if="userInfo" style="margin-left: calc(50% - 400px)">
      <div>
        <v-form v-model="valid">
          <div class="d-flex justify-center align-center">
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="firstName"
                    :label="t('first name')"
                    required
                    variant="outlined"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="lastName"
                    :label="t('last name')"
                    required
                    variant="outlined"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    :label="t('email')"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone"
                    :rules="phoneNumRules"
                    :label="t('phone number') + ' (010-1234-5678)'"
                    prepend-inner-icon="mdi-phone"
                    variant="outlined"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-combobox
                    v-model="country"
                    :items="items"
                    required
                    :label="t('Country of Residence')"
                  ></v-combobox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="schoolName"
                    :label="t('school name')"
                    variant="outlined"
                    prepend-inner-icon="mdi-school"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="grade"
                    :label="t('current grade')"
                    :items="itemsGrade"
                    required
                    variant="outlined"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="radios">
                    <v-radio
                      :label="t('Educator / Mentor')"
                      value="Educator / Mentor"
                    ></v-radio>
                    <v-radio
                      :label="t('Researcher')"
                      value="Researcher"
                    ></v-radio>
                    <v-radio :label="t('Designer')" value="Designer"></v-radio>
                    <v-radio :label="t('other')" value="other"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="4">
                  <v-radio-group v-model="howFound">
                    <v-radio
                      :label="t('Social Media')"
                      value="Social Media"
                    ></v-radio>
                    <v-radio
                      :label="t('Friend or Teacher')"
                      value="Friend or Teacher"
                    ></v-radio>
                    <v-radio
                      :label="t('Event / Tournament')"
                      value="Event / Tournament"
                    ></v-radio>
                    <v-radio :label="t('other')" value="other"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="24" md="8">
                  <v-textarea
                    v-model="brief"
                    :label="t('brief introduction')"
                    required
                    variant="outlined"
                    hide-details
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div class="my-10" style="margin-left: 350px">
            <v-btn color="primary" :disabled="!valid" @click="submit">
              {{ t("submit") }}
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
    <div v-else>
      <h2 class="text-center mt-10">
        {{ t("login is required") }}
      </h2>

      <div class="d-flex justify-center align-center">
        <v-btn to="/account/login" class="mt-2" color="primary">
          {{ t("login") }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref as dbRef, set, onValue } from "firebase/database";

const { t } = useI18n();
const { $db, $auth } = useNuxtApp();

const router = useRouter();
const registering = ref(false);

const valid = ref(true);
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");
const schoolName = ref("");
const country = ref("");
const grade = ref("");
const radios = ref("");
const howFound = ref("");
const brief = ref("");

const userInfo = ref(null);

onMounted(async () => {
  await $auth.onAuthStateChanged((user) => {
    if (user) {
      userInfo.value = user;
    } else {
      userInfo.value = null;
    }
  });

  onValue(dbRef($db, "join-us-waiting"), (snapshot) => {
    const keys = Object.keys(snapshot.val() ?? {});
    if (keys.includes(userInfo.value.uid)) {
      registering.value = true;
    } else {
      registering.value = false;
    }
  });
});

const submit = async () => {
  set(
    dbRef($db, `join-us-waiting/${userInfo.value.uid}`, {
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      email: email.value,
      schoolName: schoolName.value,
      country: country.value,
      grade: grade.value,
      radios: radios.value,
      howFound: howFound.value,
      brief: brief.value,
      userInfo: {
        uid: userInfo.value.uid,
        displayName: userInfo.value.displayName,
        email: userInfo.value.email,
        photoURL: userInfo.value.photoURL,
      },
    })
  );

  router.go(0);
};

const emailRules = [
  (value) => {
    if (value) return true;

    return "E-mail is requred.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
];
const phoneNumRules = [
  (value) => {
    if (value) return true;

    return "Phone number is requred.";
  },
  (value) => {
    if (/^\d{3}-\d{3,4}-\d{4}$/.test(value)) return true;

    return "Phone number must be valid.";
  },
];
const itemsGrade = [
  "Grade 1-6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];
const items = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua & Deps",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Rep",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo {Democratic Rep}",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland {Republic}",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea North",
  "Korea South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar, {Burma}",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "St Kitts & Nevis",
  "St Lucia",
  "Saint Vincent & the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

useHead({
  title: t("join us"),
});
</script>