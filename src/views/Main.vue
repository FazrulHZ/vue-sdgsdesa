<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/layout/header";
import Menu from "@/layout/menu";
export default {
  components: {
    Header,
    Menu,
  },

  data: () => ({ drawer: null }),
};
</script>
