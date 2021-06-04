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
          <v-col cols="4" md="1">
            <v-img
              class="mx-auto"
              src="https://rekreartive.com/wp-content/uploads/2018/11/Logo-UNG-Universitas-Negeri-Gorontalo-PNG.png"
              max-width="100"
            ></v-img>
          </v-col>
          <v-col cols="8" md="6" class="my-auto">
            <h3>DARI UNIVERSITAS NEGERI GORONTALO, UNTUK DESA</h3>
          </v-col>
        </v-row>
      </v-alert>
    </div>

    <div>
      <v-row>
        <v-col cols="12" md="3">
          <v-card elevation="2" to="/desa">
            <v-row no-gutters class="pa-3">
              <div class="mr-3 my-auto">
                <v-icon size="65" :color="iconColor">mdi-home-group</v-icon>
              </div>
              <div>
                <div>
                  <h1>112</h1>
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
                  <h1>10</h1>
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
                  <h1>11</h1>
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
                  <h1>12</h1>
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
export default {
  data: () => ({
    iconColor: "utama",
    drawer: null,
  }),
};
</script>
