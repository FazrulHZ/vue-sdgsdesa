<template>
  <div>
    <div class="mb-10">
      <v-alert
        border="left"
        colored-border
        color="utama"
        elevation="2"
        class="px-5"
      >
        <v-row>
          <v-col cols="4" md="2">
            <v-row class="pa-2 justify-center">
              <v-img
                src="@/assets/img/ung-logo.png"
                max-width="60"
                max-height="60"
                class="mr-2"
              ></v-img>
              <v-img
                src="@/assets/img/sdgs-logo.png"
                max-width="55"
                max-height="55"
                class="my-auto"
              ></v-img>
            </v-row>
          </v-col>
          <v-col cols="8" md="6" class="my-auto">
            <h3>DARI UNIVERSITAS NEGERI GORONTALO, UNTUK DESA</h3>
          </v-col>
        </v-row>
      </v-alert>
    </div>

    <div>
      <v-row>
        <v-col cols="12" md="3" v-if="session.user_lvl == 1">
          <v-card elevation="2" to="/desa">
            <v-row no-gutters class="pa-3">
              <div class="mr-3 my-auto">
                <v-icon size="65" :color="iconColor">mdi-home-group</v-icon>
              </div>
              <div>
                <div>
                  <h1>{{ jumlahDesa }}</h1>
                </div>
                <div>
                  Desa
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3" v-else>
          <v-card elevation="2" to="/profildesa">
            <v-row no-gutters class="pa-3">
              <div class="mr-3 my-auto">
                <v-icon size="65" :color="iconColor"
                  >mdi-folder-home-outline</v-icon
                >
              </div>
              <div>
                <div>
                  <h1>Profil</h1>
                </div>
                <div>
                  Desa
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card elevation="2" to="/rt">
            <v-row no-gutters class="pa-3">
              <div class="mr-3 my-auto">
                <v-icon size="65" :color="iconColor"
                  >mdi-home-city-outline</v-icon
                >
              </div>
              <div>
                <div>
                  <h1>{{ jumlahRT }}</h1>
                </div>
                <div>
                  RT / RW
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card elevation="2" to="/kk">
            <v-row no-gutters class="pa-3">
              <div class="mr-3 my-auto">
                <v-icon size="65" :color="iconColor"
                  >mdi-card-account-details-outline</v-icon
                >
              </div>
              <div>
                <div>
                  <h1>{{ jumlahKK }}</h1>
                </div>
                <div>
                  Keluarga
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card elevation="2" to="/penduduk">
            <v-row no-gutters class="pa-3">
              <div class="mr-3 my-auto">
                <v-icon size="65" :color="iconColor"
                  >mdi-clipboard-account-outline</v-icon
                >
              </div>
              <div>
                <div>
                  <h1>{{ jumlahPenduduk }}</h1>
                </div>
                <div>
                  Penduduk
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Cookie from "@/helper/cookie.js";

export default {
  data: () => ({
    session: "",
    iconColor: "utama",
    drawer: null,

    jumlahDesa: 0,
    jumlahRT: 0,
    jumlahKK: 0,
    jumlahPenduduk: 0,
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
    this.getDesa();
    this.getRT();
    this.getKK();
    this.getPenduduk();
  },

  methods: {
    getDesa() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "desainfo/", {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then((res) => {
          this.jumlahDesa = res.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getRT() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "rt/", {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then((res) => {
          this.jumlahRT = res.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getKK() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "kk/", {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then((res) => {
          this.jumlahKK = res.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPenduduk() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "penduduk/", {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then((res) => {
          this.jumlahPenduduk = res.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
