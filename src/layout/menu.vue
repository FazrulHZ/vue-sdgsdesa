<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item-group active-class="utama--text text--accent-4">
        <v-list-item class="py-2" disabled>
          <v-list-item-icon>
            <v-icon color="utama">mdi-database-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="utama--text">
            beta
            <div style="font-size: large" class="font-weight-black">
              Open Data
            </div>
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="'/'">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/desa'" v-if="session.user_lvl == 1">
          <v-list-item-icon>
            <v-icon>mdi-home-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Survei Desa</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/profildesa'" v-else>
          <v-list-item-icon>
            <v-icon>mdi-folder-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Profil Desa</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/rt'">
          <v-list-item-icon>
            <v-icon>mdi-home-city-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>RT/RW</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/kk'">
          <v-list-item-icon>
            <v-icon>mdi-card-account-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Kartu Keluarga</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/penduduk'">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Individu</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/lkd'">
          <v-list-item-icon>
            <v-icon>mdi-office-building-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>LKD</v-list-item-title>
        </v-list-item>

        <v-divider v-if="session.user_lvl == 1"></v-divider>

        <v-list-item :to="'/user'" v-if="session.user_lvl == 1">
          <v-list-item-icon>
            <v-icon>mdi-shield-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>User</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Cookie from "@/helper/cookie.js";

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

  data: () => ({
    session: "",
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
  },
};
</script>
