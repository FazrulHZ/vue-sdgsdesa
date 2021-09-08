<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Profil</h3>
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
          <div class="mt-2 text-center">
            <v-avatar size="250">
              <v-img :src="urlImage" class="mx-auto"></v-img>
            </v-avatar>
          </div>
        </v-col>

        <v-col cols="12" md="8">
          <v-card>
            <v-form ref="form">
              <div class="mx-7 mt-5">
                <v-row>
                  <!-- NIK User -->
                  <v-col cols="12" md="12" class="mb-n8">
                    <span class="subtitle-2">NIK</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="user.user_ktp"
                      :readonly="allowEdit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Nama User -->
                  <v-col cols="12" md="4" class="mb-n8">
                    <span class="subtitle-2">Nama User</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="user.user_name"
                      :readonly="allowEdit"
                      autocomplete="off"
                    ></v-text-field>
                  </v-col>

                  <!-- Nama -->
                  <v-col cols="12" md="8" class="mb-n8">
                    <span class="subtitle-2">Nama</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="user.user_nama"
                      :readonly="allowEdit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row v-if="!allowEdit">
                  <!-- Password User -->
                  <v-col cols="12" class="mb-n8">
                    <span class="subtitle-2">Password User</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      v-model="user_password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      class="mt-2 input-group--focused"
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Alamat -->
                  <v-col cols="12" class="mb-n8">
                    <span class="subtitle-2">Alamat</span>
                    <v-textarea
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="user.user_alamat"
                      :readonly="allowEdit"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Nomor Telpon -->
                  <v-col cols="12" md="6" class="mb-n8">
                    <span class="subtitle-2">Nomor Telpon</span>
                    <v-text-field
                      dense
                      flat
                      outlined
                      class="mt-2"
                      v-model="user.user_tlp"
                      append-icon="mdi-phone"
                      :readonly="allowEdit"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row v-if="!allowEdit">
                  <!-- Foto -->
                  <v-col cols="12" class="mb-n8">
                    <span class="subtitle-2">Unggah Foto Baru</span>
                    <v-file-input
                      dense
                      flat
                      outlined
                      prepend-icon
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pilih Foto user"
                      append-icon="mdi-camera"
                      @change="onFile"
                      ref="avatar"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- User Level -->
                  <v-col cols="12" class="mb-n8">
                    <span class="subtitle-2">User Level</span>
                    <v-select
                      dense
                      flat
                      outlined
                      class="mt-2"
                      :items="refUserlvl"
                      item-value="id"
                      item-text="nama"
                      v-model="user.user_lvl"
                      :readonly="allowEdit"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <!-- Kabupaten / Kota -->
                  <v-col cols="12" md="4" class="mb-n8 mb-md-0">
                    <span class="subtitle-2">Kabupaten / Kota</span>
                    <v-autocomplete
                      dense
                      flat
                      outlined
                      class="mt-2"
                      :items="refKabupaten"
                      item-text="kabupaten_nama"
                      item-value="kabupaten_id"
                      v-model="user.kabupaten_id"
                      :readonly="allowEdit"
                    ></v-autocomplete>
                  </v-col>

                  <!-- Kecamatan -->
                  <v-col cols="12" md="4" class="mb-n8 mb-md-0">
                    <span class="subtitle-2">Kecamatan</span>
                    <v-autocomplete
                      dense
                      flat
                      outlined
                      class="mt-2"
                      :items="refKecamatan"
                      item-text="kecamatan_nama"
                      item-value="kecamatan_id"
                      v-model="user.kecamatan_id"
                      :readonly="allowEdit"
                    ></v-autocomplete>
                  </v-col>

                  <!-- Desa -->
                  <v-col cols="12" md="4">
                    <span class="subtitle-2">Desa</span>
                    <v-autocomplete
                      dense
                      flat
                      outlined
                      class="mt-2"
                      :items="refDesa"
                      item-text="desa_nama"
                      item-value="desa_id"
                      v-model="user.desa_id"
                      :readonly="allowEdit"
                    ></v-autocomplete>
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

import refreshView from "@/store/user/viewUser";

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
    show: false,
    allowEdit: true,

    refUserlvl: [],
    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],

    user: {},

    user_password: "",
    user_foto: "",
    urlImage: "",
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
    this.refKabupaten = await getRef.Kabupaten();
    this.refUserlvl = await getRef.Userlvl();
    this.getData();
  },

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + "upload/userGambar/" + value;
      } else {
        return process.env.VUE_APP_API_BASE + "upload/userDefault.png";
      }
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "user/profil", {
          headers: {
            Authorization: "Bearer " + this.session.token,
          },
        })
        .then(async (res) => {
          refreshView.commit("refreshData", false);
          this.user = res.data.data;
          this.refKecamatan = await getRef.Kecamatan(this.user.kabupaten_id);
          this.refDesa = await getRef.Desa(this.user.kecamatan_id);
          this.urlImage = this.getIMG(this.user.user_foto);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async selectKecamatan(value) {
      this.refKecamatan = await getRef.Kecamatan(value.kabupaten_id);
    },

    onFile(value) {
      this.user_foto = value;
      this.urlImage = URL.createObjectURL(this.user_foto);
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
      data.append("user_id", this.user.user_id);
      data.append("user_ktp", this.user.user_ktp);
      data.append("user_nama", this.user.user_nama);
      data.append("user_name", this.user.user_name);
      data.append("user_password", this.user_password);
      data.append("user_tlp", this.user.user_tlp);
      data.append("user_alamat", this.user.user_alamat);
      data.append("user_foto", this.user_foto);
      data.append("user_lvl", this.user.user_lvl);
      data.append("kabupaten_id", this.user.kabupaten_id);
      data.append("kecamatan_id", this.user.kecamatan_id);
      data.append("desa_id", this.user.desa_id);

      const url = process.env.VUE_APP_API_BASE + "user/profil";
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
          this.allowEdit = true;
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
