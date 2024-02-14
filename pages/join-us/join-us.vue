<template>
  <div class="mt-180">
    <h1 class="text-center header-u">
      {{ t("join us") }}
    </h1>

    <div v-if="userInfo === null">
      <h2 class="text-center mt-10">
        {{ t("login is required") }}
      </h2>

      <DivCenter>
        <v-btn to="/account/login" class="mt-2" color="primary">
          {{ t("login") }}
        </v-btn>
      </DivCenter>
    </div>

    <div v-else-if="registering">
      <h1 class="text-center">
        {{ t("your data is being examined") }}
      </h1>
    </div>

    <div v-else-if="accepted">
      <h1 class="text-center">
        {{ t("accepted") }}
      </h1>

      <br /><br />

      <DivCenter>
        <div>
          <div id="error-image"></div>

          <v-img
            :src="picOfMe"
            alt="accepted user profile image setting"
            class="ma-auto mb-3 accepted-image"
          >
            <template v-slot:error>
              <Teleport to="#error-image">
                <v-img src="/screenshot/postimg.png" class="rounded-lg"></v-img>
                <p class="text-center">Your image is invalid</p>
                <p class="text-center">Copy the second link from above</p>
              </Teleport>
            </template>
          </v-img>

          <div v-if="!picOfMe">
            <p>
              use services like
              <a href="https://postimages.org/">post images</a> to host your
              image
            </p>
            <p class="mb-2">copy direct link [직접 링크]</p>
          </div>

          <v-text-field
            v-model="picOfMe"
            required
            variant="outlined"
          ></v-text-field>

          <br />

          <DivCenter class="mb-15">
            <v-btn @click="update" variant="outlined">update</v-btn>
          </DivCenter>
        </div>
      </DivCenter>
    </div>

    <DivCenter v-else-if="userInfo" class="pa-10">
      <v-row class="ga-5 mb-5">
        <v-text-field
          v-model="firstName"
          :label="t('first name')"
          required
          variant="outlined"
          hide-details
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :label="t('last name')"
          required
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-row>

      <v-row class="ga-5 my-5">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="t('email')"
          prepend-inner-icon="mdi-email"
          variant="outlined"
          required
          hide-details
          style="min-width: 200px"
        ></v-text-field>
        <v-text-field
          v-model="phone"
          :rules="phoneNumRules"
          :label="t('phone number') + ' (010-1234-5678)'"
          prepend-inner-icon="mdi-phone"
          variant="outlined"
          required
          hide-details
          style="min-width: 300px"
        ></v-text-field>
      </v-row>

      <v-row class="ga-5 my-5">
        <v-combobox
          v-model="country"
          :items="items"
          required
          :label="t('Country of Residence')"
          variant="outlined"
        ></v-combobox>
      </v-row>

      <v-row class="ga-5 my-5">
        <v-text-field
          v-model="schoolName"
          :label="t('school name')"
          variant="outlined"
          prepend-inner-icon="mdi-school"
          required
          hide-details
          class=""
        ></v-text-field>
      </v-row>
      <v-row class="ga-5 my-5">
        <v-select
          v-model="grade"
          :label="t('current grade')"
          :items="itemsGrade"
          required
          variant="outlined"
        ></v-select>
      </v-row>

      <v-row class="ga-5">
        <v-radio-group v-model="radios">
          <v-radio
            :label="t('Educator / Mentor')"
            value="Educator / Mentor"
          ></v-radio>
          <v-radio :label="t('Researcher')" value="Researcher"></v-radio>
          <v-radio :label="t('Designer')" value="Designer"></v-radio>
          <v-radio :label="t('other')" value="other"></v-radio>

          <v-text-field
            v-if="radios === 'other'"
            variant="outlined"
            class="ml-2"
            v-model="radiosOther"
          ></v-text-field>
        </v-radio-group>

        <v-radio-group v-model="howFound">
          <v-radio :label="t('Social Media')" value="Social Media"></v-radio>
          <v-radio
            :label="t('Friend or Teacher')"
            value="Friend or Teacher"
          ></v-radio>
          <v-radio
            :label="t('Event / Tournament')"
            value="Event / Tournament"
          ></v-radio>
          <v-radio :label="t('other')" value="other"></v-radio>

          <v-text-field
            v-if="howFound === 'other'"
            variant="outlined"
            class="ml-2"
            v-model="howFoundOther"
          ></v-text-field>
        </v-radio-group>
      </v-row>

      <v-row class="ga-5">
        <v-textarea
          v-model="brief"
          :label="t('brief introduction')"
          required
          variant="outlined"
          hide-details
        ></v-textarea>
      </v-row>

      <DivCenter class="my-10">
        <v-btn
          color="primary"
          :disabled="
            firstName === '' ||
            lastName === '' ||
            phone === '' ||
            email === '' ||
            schoolName === '' ||
            country === '' ||
            grade === '' ||
            radios === '' ||
            howFound === '' ||
            brief === ''
          "
          @click="submit"
        >
          {{ t("submit") }}
        </v-btn>
      </DivCenter>
    </DivCenter>
  </div>
</template>

<script setup>
const { t } = useI18n();
const { $db, $auth } = useNuxtApp();

const router = useRouter();

const registering = ref(false);
const accepted = ref(false);

const picOfMe = ref("");

const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");
const schoolName = ref("");
const country = ref("");
const grade = ref("");
const radios = ref("");
const radiosOther = ref("");
const howFound = ref("");
const howFoundOther = ref("");
const brief = ref("");

const userInfo = ref(null);

onMounted(async () => {
  await $auth.onAuthStateChanged((user) => {
    if (user) {
      userInfo.value = user;
    }
  });

  if (userInfo.value.uid === null) {
    alert("에러 로그인을 안했습니다");
    router.push("/");
  }

  onValue(dbRef($db, "join-us-waiting"), async (snapshot) => {
    const keys = Object.keys((await snapshot.val()) ?? {});

    if (keys.includes(userInfo.value.uid)) {
      registering.value = true;
    } else {
      registering.value = false;
    }
  });

  onValue(dbRef($db, "accepted"), async (snapshot) => {
    const keys = Object.keys((await snapshot.val()) ?? {});

    if (keys.includes(userInfo.value.uid)) {
      accepted.value = true;
    } else {
      accepted.value = false;
    }
  });

  onValue(dbRef($db, `accepted/${userInfo.value.uid}`), async (snapshot) => {
    const data = await snapshot.val();

    if (data) {
      picOfMe.value = data.picOfMe;
    }
  });
});

const submit = () => {
  push(dbRef($db, `join-us-waiting/${userInfo.value.uid}`), {
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    email: email.value,
    schoolName: schoolName.value,
    country: country.value,
    grade: grade.value,
    radios: radios.value === "other" ? radiosOther.value : radios.value,
    howFound: howFound.value === "other" ? howFoundOther.value : howFound.value,
    brief: brief.value,
  });

  router.go(0);
};

function update() {
  try {
    set(dbRef($db, `accepted/${userInfo.value.uid}`), {
      picOfMe: picOfMe.value,
    });
  } catch (e) {
    alert(e.message);
  }

  router.go(0);
}

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

<style scoped>
.accepted-image {
  width: 500px;
}

@media (max-width: 550px) {
  .accepted-image {
    width: 90vw;
  }
}
</style>
