<template>
  <v-app-bar color="utama" dark app>
    <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title>Sustainable Development Goals</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import drawerState from "@/store/drawerMenu";
export default {
  data: () => ({ drawer: null }),
  methods: {
    toggleDrawer() {
      drawerState.commit("toggle", !drawerState.state.drawer);
    },
  },
};
</script>
