<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Profil Desa</h3>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="edit()">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Data</span>
          </v-tooltip>
        </v-row>
      </v-card>
    </div>

    <div>
      <v-alert v-model="alertBerhasil" type="success" dense dismissible>
        {{ alertMassage }}
      </v-alert>
      <v-alert v-model="alertGagal" type="error" dense dismissible>
        {{ alertMassage }}
      </v-alert>
    </div>

    <div>
      <v-row>
        <v-col cols="12" md="4">
          <div class="mt-2">
            <v-card>
              <v-img :src="urlImage" class="mx-auto"></v-img>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" md="8">
          <v-card>
            <v-form ref="form">
              <div class="mx-7 mt-5">
                <v-row>
                  <!-- Kabupaten / Kota -->
                  <v-col cols="12" md="6" class="mb-n8">
                    <span class="subtitle-2">Kabupaten / Kota</span>
                    <v-autocomplete
                      dense
                      flat
                      outlined
                      class="mt-2"
                      :items="refKabupaten"
                      item-text="kabupaten_nama"
                      item-value="kabupaten_id"
                      v-model="desa.kabupaten_id"
                      return-object
                      @change="selectKecamatan"
                      :readonly="allowEdit"
                    ></v-autocomplete>
                  </v-col>

                  <!-- Kecamatan -->
                  <v-col cols="12" md="6" class="mb-n8">
                    <span class="subtitle-2">Kecamatan</span>
                    <v-autocomplete
                      dense
                      flat
                      outlined
                      class="mt-2"
                      :items="refKecamatan"
                      item-text="kecamatan_nama"
                      item-value="kecamatan_id"
                      v-model="desa.kecamatan_id"
                      :readonly="allowEdit"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Nama Desa -->
                  <v-col cols="12" class="mb-n8">
                    <span class="subtitle-2">Nama Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_nama"
                      :readonly="allowEdit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Email Desa -->
                  <v-col cols="12" md="7" class="mb-n8">
                    <span class="subtitle-2">Email Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_email"
                      :readonly="allowEdit"
                      append-icon="mdi-email"
                    ></v-text-field>
                  </v-col>

                  <!-- Website Desa -->
                  <v-col cols="12" md="5" class="mb-n8">
                    <span class="subtitle-2">Website Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_web"
                      :readonly="allowEdit"
                      append-icon="mdi-web"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Facebook Desa -->
                  <v-col cols="12" md="3" class="mb-n8">
                    <span class="subtitle-2">Facebook Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_fb"
                      :readonly="allowEdit"
                      append-icon="mdi-facebook"
                      placeholder="Masukan url"
                    ></v-text-field>
                  </v-col>

                  <!-- Twitter Desa -->
                  <v-col cols="12" md="3" class="mb-n8">
                    <span class="subtitle-2">Twitter Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_twitter"
                      :readonly="allowEdit"
                      append-icon="mdi-twitter"
                      placeholder="Masukan url"
                    ></v-text-field>
                  </v-col>

                  <!-- Instagram Desa -->
                  <v-col cols="12" md="3" class="mb-n8">
                    <span class="subtitle-2">Instagram Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_ig"
                      :readonly="allowEdit"
                      append-icon="mdi-instagram"
                      placeholder="Masukan url"
                    ></v-text-field>
                  </v-col>

                  <!-- Youtube Desa -->
                  <v-col cols="12" md="3" class="mb-n8">
                    <span class="subtitle-2">Youtube Desa</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_yt"
                      :readonly="allowEdit"
                      append-icon="mdi-youtube"
                      placeholder="Masukan url"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Status Pemerintahan -->
                  <v-col cols="12">
                    <span class="subtitle-2">Status Pemerintahan</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="desa.desa_status_pemerintahan"
                      :readonly="allowEdit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row v-if="!allowEdit">
                  <!-- Foto -->
                  <v-col cols="12">
                    <span class="subtitle-2">Foto</span>
                    <v-file-input
                      dense
                      flat
                      outlined
                      prepend-icon
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pilih Foto desa"
                      append-icon="mdi-camera"
                      @change="onFile"
                      ref="avatar"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <hr v-if="!allowEdit" />
                <div class="text-right mt-5 pb-5" v-if="!allowEdit">
                  <v-btn
                    color="secondary"
                    depressed
                    @click="batalEdit()"
                    class="mr-2"
                    >BATAL</v-btn
                  >
                  <v-btn
                    v-if="btnLoading"
                    color="primary"
                    depressed
                    @click="simpan()"
                    >SIMPAN</v-btn
                  >
                  <v-btn v-else color="primary" depressed loading>SIMPAN</v-btn>
                </div>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Cookie from "@/helper/cookie.js";
import getRef from "@/helper/getRef.js";
import refreshView from "@/store/desa/viewDesa";

export default {
  computed: {
    refresh: {
      get() {
        return refreshView.state.Refresh;
      },
    },

    alertMassage: {
      get() {
        return refreshView.state.alertMassage;
      },
    },

    success: {
      get() {
        return refreshView.state.success;
      },
      set(value) {
        refreshView.commit("alert", value);
      },
    },

    alertBerhasil: {
      get() {
        return refreshView.state.alertBerhasil;
      },
      set(value) {
        refreshView.commit("berhasilAlert", value);
      },
    },

    alertGagal: {
      get() {
        return refreshView.state.alertGagal;
      },
      set(value) {
        refreshView.commit("gagalAlert", value);
      },
    },
  },

  watch: {
    refresh() {
      this.getData();
      setTimeout(() => {
        this.alertGagal = false;
        this.alertBerhasil = false;
      }, 5000);
    },
  },

  data: () => ({
    session: "",
    btnLoading: true,
    allowEdit: true,

    refKabupaten: [],
    refKecamatan: [],

    desa: {},

    desa_foto: "",
    urlImage: "",
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
    this.refKabupaten = await getRef.Kabupaten();
    this.getData();
  },

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + "upload/desaGambar/" + value;
      } else {
        return process.env.VUE_APP_API_BASE + "upload/default.jpg";
      }
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "desainfo/profil", {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then(async (res) => {
          refreshView.commit("refreshData", false);
          this.desa = res.data.data;
          this.refKecamatan = await getRef.Kecamatan(this.desa.kabupaten_id);
          this.urlImage = this.getIMG(this.desa.desa_foto);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async selectKecamatan(value) {
      this.refKecamatan = await getRef.Kecamatan(value.kabupaten_id);
    },

    onFile(value) {
      this.desa_foto = value;
      this.urlImage = URL.createObjectURL(this.desa_foto);
    },

    edit() {
      this.allowEdit = false;
    },

    batalEdit() {
      this.allowEdit = true;
    },

    simpan() {
      this.btnLoading = false;

      const data = new FormData();
      data.append("desa_id", this.desa.desa_id);
      data.append("desa_nama", this.desa.desa_nama);
      data.append("desa_email", this.desa.desa_email);
      data.append("desa_web", this.desa.desa_web);
      data.append("desa_fb", this.desa.desa_fb);
      data.append("desa_twitter", this.desa.desa_twitter);
      data.append("desa_ig", this.desa.desa_ig);
      data.append("desa_yt", this.desa.desa_yt);
      data.append(
        "desa_status_pemerintahan",
        this.desa.desa_status_pemerintahan
      );
      data.append("desa_foto", this.desa_foto);

      const url = process.env.VUE_APP_API_BASE + "desainfo/profil";
      this.http
        .put(url, data, {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then((response) => {
          this.btnLoading = true;
          if (response.data.success) {
            refreshView.commit("refreshData", true);
            refreshView.commit("alert", response.data.message);
            refreshView.commit("berhasilAlert", true);
            refreshView.commit("gagalAlert", false);
            refreshView.commit("success", response.data.success);
          } else {
            refreshView.commit("refreshData", true);
            refreshView.commit("alert", response.data.message);
            refreshView.commit("gagalAlert", true);
            refreshView.commit("berhasilAlert", false);
            refreshView.commit("success", response.data.success);
          }
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          refreshView.commit("refreshData", true);
          refreshView.commit("alert", error.response.data.message);
          refreshView.commit("gagalAlert", true);
          refreshView.commit("berhasilAlert", false);
          refreshView.commit("success", error.response.data.success);
          console.log(error.response.status);
          this.btnLoading = true;
          this.closeModal();
        });
    },
  },
};
</script>
