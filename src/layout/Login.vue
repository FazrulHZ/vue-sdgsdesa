<template>
  <v-container fill-height fluid style="background: #F5F5F5;">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" class="hidden-sm-and-down pa-6">
        <v-img src="@/assets/img/login.svg"></v-img>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="15">
          <v-card-text>
            <div class="ma-3">
              <p class="text-center" style="font-size:35px; color: #800000">
                <span class="font-weight-thin">SDGs</span>-<span>Desa</span>
              </p>
              <div class="text-center">
                Dari UNG, Untuk Desa
              </div>
              <div class="my-5">
                <v-row class="justify-center">
                  <v-img
                    src="@/assets/img/ung-logo.png"
                    max-width="50"
                    max-height="50"
                    class="mr-1"
                  ></v-img>
                  <v-img
                    src="@/assets/img/sdgs-logo.png"
                    max-width="45"
                    max-height="45"
                    class="my-auto"
                  ></v-img>
                </v-row>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="mt-5 mb-5">
              <v-alert dense dismissible type="error" v-model="alertGagal">
                {{ pesanGagal }}
              </v-alert>
              <h3>LOGIN</h3>
            </div>
            <v-form ref="form">
              <div>
                <v-text-field
                  v-model="user_name"
                  outlined
                  label="Username"
                  append-icon="mdi-account"
                  :rules="userRules"
                  autocomplete="off"
                ></v-text-field>
                <v-text-field
                  v-model="user_password"
                  label="Password"
                  outlined
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  class="input-group--focused"
                  @click:append="show = !show"
                  :rules="passwordRules"
                  autocomplete="off"
                ></v-text-field>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="loadingButton"
              class="mb-5"
              rounded
              large
              block
              outlined
              color="utama"
              @click="login()"
            >
              Login
            </v-btn>
            <v-btn
              v-else
              class="mb-5"
              rounded
              large
              block
              outlined
              color="utama"
              loading
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookie from "@/helper/cookie.js";

export default {
  data: () => ({
    valid: true,
    loadingButton: true,
    alertGagal: false,
    pesanGagal: "",

    user_name: "",
    userRules: [(value) => !!value || "NIK Tidak Boleh Kosong"],

    user_password: "",
    passwordRules: [(value) => !!value || "Password Tidak Boleh Kosong"],
    show: false,
  }),

  methods: {
    validate() {
      return this.$refs.form.validate();
    },

    async login() {
      this.loadingButton = false;
      this.validate();
      const url = process.env.VUE_APP_API_BASE + "login";

      if (this.validate()) {
        let data = {
          user_name: this.user_name,
          user_password: this.user_password,
        };

        try {
          const response = await this.http.post(url, data);
          if (response.data.success) {
            await Cookie.set(
              "myCookie",
              Cookie.enc(
                JSON.stringify({
                  session_ok: response.data.success,
                  user_nama: response.data.data.identitas.user_nama,
                  user_name: response.data.data.identitas.user_name,
                  kabupaten_id: response.data.data.identitas.kabupaten_id,
                  kecamatan_id: response.data.data.identitas.kecamatan_id,
                  desa_id: response.data.data.identitas.desa_id,
                  user_lvl: response.data.data.identitas.user_lvl,
                  user_foto: response.data.data.identitas.user_foto,
                  token: response.data.data.token,
                })
              )
            );
            this.alertGagal = false;
            this.$router.push("/").catch(() => {});
            this.loadingButton = true;
          }
        } catch (error) {
          console.log(error);
          this.pesanGagal = error.response.data.message;
          this.alertGagal = true;
          this.loadingButton = true;
          window.scrollTo(0, 0);
        }
      } else {
        this.loadingButton = true;
      }
    },
  },
};
</script>
