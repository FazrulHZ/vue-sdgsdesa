<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <v-main style="background: #EEEEEE;">
      <v-container class="pa-5">
        <router-view />
      </v-container>
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
