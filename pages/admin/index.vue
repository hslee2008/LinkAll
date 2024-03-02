<template>
  <div class="top-div-without-bg">
    <div class="d-flex justify-center align-center">
      <v-card width="600" elevation="0">
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab value="option-1">
              <v-icon start> mdi-home </v-icon>
              Site
            </v-tab>
            <v-tab value="option-2">
              <v-icon start> mdi-google-classroom </v-icon>
              Class
            </v-tab>
            <v-tab value="option-3">
              <v-icon start> mdi-account </v-icon>
              User
            </v-tab>
            <v-tab value="option-4">
              <v-icon start> mdi-wallet-membership </v-icon>
              Members
            </v-tab>
            <v-tab value="option-5">
              <v-icon start> mdi-school </v-icon>
              School
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="option-1">
              <v-card flat>
                <v-card-text>
                  <v-btn width="300" height="55" to="/admin/edit">
                    Edit Site Stats <v-icon end> mdi-pencil </v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/aboutus">
                    Edit About Us <v-icon end> mdi-pencil </v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/newpic">
                    New Picture <v-icon end>mdi-image</v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/newnotification">
                    Notification <v-icon end>mdi-bell</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="option-2">
              <v-card flat>
                <v-card-text>
                  <v-btn width="300" height="55" to="/admin/newclass">
                    New Class <v-icon end>mdi-plus</v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/classorder">
                    Set Class Order <v-icon end>mdi-numeric-1</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="option-3">
              <v-card flat>
                <v-card-text>
                  <v-btn width="300" height="55" to="/admin/join-us">
                    Joining User <v-icon end>mdi-account</v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn
                    width="300"
                    height="55"
                    to="/admin/notificationallowedemails"
                  >
                    Emails for notification <v-icon end>mdi-email</v-icon>
                  </v-btn>

                  <br />
                  <br />
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="option-4">
              <v-card flat>
                <v-card-text>
                  <v-btn width="300" height="55" to="/admin/addmemberimage">
                    Add Member Image <v-icon end>mdi-image</v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/addmembers">
                    Add Members <v-icon end>mdi-wallet-membership</v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/editmembers">
                    Edit Members <v-icon end>mdi-wallet-membership</v-icon>
                  </v-btn>

                  <br />
                  <br />
                </v-card-text>
              </v-card>
            </v-window-item>
            <v-window-item value="option-5">
              <v-card flat>
                <v-card-text>
                  <v-btn width="300" height="55" to="/admin/school">
                    Add School <v-icon end> mdi-school </v-icon>
                  </v-btn>

                  <br />
                  <br />

                  <v-btn width="300" height="55" to="/admin/editschool">
                    Edit School <v-icon end> mdi-school </v-icon>
                  </v-btn>

                  <br />
                  <br />
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </v-card>
    </div>

    <br /><br /><br />
  </div>
</template>

<script setup>
const tab = ref("");
</script>

<style scoped>
@media (max-width: 600px) {
  .top-div-with-bg {
    height: auto;
    min-height: calc(100vh - 65px);
  }
}
</style>
