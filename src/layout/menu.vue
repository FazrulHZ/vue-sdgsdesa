<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item-group active-class="primary--text text--accent-4">
        <v-list-item class="py-2">
          <v-list-item-title>
            <h2 class="primary--text">
              SDGs Desa
            </h2>
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="'/'">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import drawerState from "@/store/drawerMenu";
export default {
  computed: {
    drawer: {
      get() {
        return drawerState.state.drawer;
      },
      set(value) {
        // console.log('is drawer open: ' + value)
        drawerState.commit("toggle", value);
      },
    },
  },
};
</script>
