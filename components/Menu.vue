<template>
  <v-btn to="/"> {{ t("home") }} </v-btn>
  <v-btn to="/about-us"> {{ t("about us") }} </v-btn>

  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        {{ t("actions") }} <v-icon end> $dropdown </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item to="/actions/education">
        <v-list-item-title>
          {{ t("education") }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn to="/members/members" v-bind="props">
        {{ t("members") }} <v-icon end> $dropdown </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item to="/members/members">
        <v-list-item-title> {{ t("members") }} </v-list-item-title>
      </v-list-item>
      <v-list-item to="/members/committees">
        <v-list-item-title>
          {{ t("committees") }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-menu open-on-hover>
    <template v-slot:activator="{ props }">
      <v-btn to="/join-us/join-us" v-bind="props">
        {{ t("join us") }} <v-icon end> $dropdown </v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item to="/join-us/join-us">
        <v-list-item-title> {{ t("join us") }} </v-list-item-title>
      </v-list-item>
      <v-list-item to="/join-us/donation">
        <v-list-item-title> {{ t("donation") }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const { t } = useI18n();
</script>
