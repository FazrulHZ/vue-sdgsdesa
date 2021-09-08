<template>
  <v-dialog
    v-model="ModalAdd"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on: modal, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            small
            fab
            text
            v-bind="attrs"
            v-on="{ ...tooltip, ...modal }"
            @click="openModal()"
          >
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
        </template>
        <span>Tambah Data</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Tambah Data Desa</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="ModalAdd = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="mx-7 mt-5">
          <v-row>
            <!-- Kabupaten / Kota -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Kabupaten / Kota</span>
              <v-autocomplete
                dense
                flat
                outlined
                class="mt-2"
                :items="refKabupaten"
                item-text="kabupaten_nama"
                item-value="kabupaten_id"
                v-model="kabupaten"
                return-object
                @change="selectKecamatan"
              ></v-autocomplete>
            </v-col>

            <!-- Kecamatan -->
            <v-col cols="12" md="5" class="mb-n8">
              <span class="subtitle-2">Kecamatan</span>
              <v-autocomplete
                dense
                flat
                outlined
                class="mt-2"
                :items="refKecamatan"
                item-text="kecamatan_nama"
                item-value="kecamatan_id"
                v-model="kecamatan_id"
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
                v-model="desa_nama"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Email Desa -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Email Desa</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="desa_email"
                append-icon="mdi-email"
              ></v-text-field>
            </v-col>

            <!-- Website Desa -->
            <v-col cols="12" md="8" class="mb-n8">
              <span class="subtitle-2">Website Desa</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="desa_web"
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
                v-model="desa_fb"
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
                v-model="desa_twitter"
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
                v-model="desa_ig"
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
                v-model="desa_yt"
                append-icon="mdi-youtube"
                placeholder="Masukan url"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Status Pemerintahan -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Status Pemerintahan</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="desa_status_pemerintahan"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Foto -->
            <v-col cols="12" class="mb-n8">
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

          <v-row>
            <!-- Preview -->
            <v-col cols="12" class="mb-5">
              <v-img :src="urlImage" max-width="200"></v-img>
            </v-col>
          </v-row>

          <hr />
          <div class="text-right mr-5 mt-5 pb-5">
            <v-btn v-if="btnLoading" color="primary" depressed @click="add()"
              >SIMPAN</v-btn
            >
            <v-btn v-else color="primary" depressed loading>SIMPAN</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookie from "@/helper/cookie.js";

import refreshView from "@/store/desa/viewDesa";
import getRef from "@/helper/getRef.js";

export default {
  data: () => ({
    session: "",
    ModalAdd: false,
    btnLoading: true,

    refKabupaten: [],
    refKecamatan: [],

    desa_nama: "",
    desa_email: "",
    desa_web: "",
    desa_fb: "",
    desa_twitter: "",
    desa_ig: "",
    desa_yt: "",
    desa_status_pemerintahan: "",
    desa_foto: "",
    kabupaten: "",
    kecamatan_id: "",
    urlImage: "",
  }),

  methods: {
    async openModal() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
      this.refKabupaten = await getRef.Kabupaten();
      this.ModalAdd = true;
    },

    async add() {
      this.btnLoading = false;

      const data = new FormData();
      data.append("desa_nama", this.desa_nama);
      data.append("desa_email", this.desa_email);
      data.append("desa_web", this.desa_web);
      data.append("desa_fb", this.desa_fb);
      data.append("desa_twitter", this.desa_twitter);
      data.append("desa_ig", this.desa_ig);
      data.append("desa_yt", this.desa_yt);
      data.append("desa_status_pemerintahan", this.desa_status_pemerintahan);
      data.append("desa_foto", this.desa_foto);
      data.append("kabupaten_id", this.kabupaten.kabupaten_id);
      data.append("kecamatan_id", this.kecamatan_id);

      const url = process.env.VUE_APP_API_BASE + "desainfo";
      this.http
        .post(url, data, {
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
          this.closeModal();
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

    onFile(value) {
      this.desa_foto = value;
      this.urlImage = URL.createObjectURL(this.desa_foto);
    },

    async selectKecamatan(value) {
      this.refKecamatan = await getRef.Kecamatan(value.kabupaten_id);
    },

    closeModal() {
      this.ModalAdd = false;
    },
  },
};
</script>
