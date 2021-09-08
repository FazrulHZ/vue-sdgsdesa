<template>
  <v-app-bar color="utama" dark app>
    <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title>Sustainable Development Goals</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar size="36">
            <v-img :src="getIMG(user_foto)"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <v-img :src="getIMG(user_foto)"></v-img>
            </v-avatar>
            <div class="my-3">
              <h4>{{ user_nama }}</h4>
            </div>
            <v-divider></v-divider>
            <v-btn depressed text block>
              Profil
            </v-btn>
            <v-divider></v-divider>
            <v-btn depressed text @click="logOut()" block>
              Sigin Out
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import drawerState from "@/store/drawerMenu";
import Cookie from "@/helper/cookie.js";

export default {
  data: () => ({
    session: "",
    drawer: null,
    
    user_nama: "",
    user_foto: "",
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
    this.user_nama = this.session.user_nama;
    this.user_foto = this.session.user_foto;
  },

  methods: {
    toggleDrawer() {
      drawerState.commit("toggle", !drawerState.state.drawer);
    },

    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + "upload/userGambar/" + value;
      } else {
        return process.env.VUE_APP_API_BASE + "upload/userDefault.png";
      }
    },

    logOut() {
      Cookie.delete();
      this.$router.push("/login");
    },
  },
};
</script>
