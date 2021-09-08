<template>
  <v-dialog
    v-model="modalEdit"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Edit Data Desa</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
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
                v-model="editedItem.kabupaten_id"
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
                v-model="editedItem.kecamatan_id"
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
                v-model="editedItem.desa_nama"
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
                v-model="editedItem.desa_email"
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
                v-model="editedItem.desa_web"
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
                v-model="editedItem.desa_fb"
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
                v-model="editedItem.desa_twitter"
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
                v-model="editedItem.desa_ig"
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
                v-model="editedItem.desa_yt"
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
                v-model="editedItem.desa_status_pemerintahan"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Preview -->
            <v-col cols="12">
              <span class="subtitle-2">Foto desa</span>
              <v-img
                :src="getIMG(editedItem.desa_foto)"
                max-width="200"
              ></v-img>
            </v-col>
          </v-row>

          <v-row>
            <!-- Foto -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Unggah Foto Baru</span>
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
            <v-btn v-if="btnLoading" color="primary" depressed @click="edit()"
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

import modalEdit from "@/store/desa/modalEdit";
import refreshView from "@/store/desa/viewDesa";
import getRef from "@/helper/getRef.js";

export default {
  computed: {
    modalEdit: {
      get() {
        return modalEdit.state.modalEdit;
      },
      set(value) {
        modalEdit.commit("toggleModal", value);
      },
    },

    editedItem: {
      get() {
        return modalEdit.state.desa;
      },
      set(value) {
        console.log(value);
      },
    },

    watchKabupaten: {
      get() {
        return modalEdit.state.desa.kabupaten_id;
      },
    },
  },

  watch: {
    async modalEdit() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
      this.refKabupaten = await getRef.Kabupaten();
    },

    async watchKabupaten() {
      this.refKecamatan = await getRef.Kecamatan(this.editedItem.kabupaten_id);
    },
  },

  created() {
    if (
      this.$vuetify.breakpoint.name == "xs" ||
      this.$vuetify.breakpoint.name == "sm"
    ) {
      this.CWidth = "100%";
    }
  },

  data: () => ({
    session: "",
    btnLoading: true,

    refKabupaten: [],
    refKecamatan: [],

    desa_foto: "",
    urlImage: "",
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + "upload/desaGambar/" + value;
      } else {
        return process.env.VUE_APP_API_BASE + "upload/default.jpg";
      }
    },

    async edit() {
      this.btnLoading = false;

      const data = new FormData();
      data.append("desa_id", this.editedItem.desa_id);
      data.append("desa_nama", this.editedItem.desa_nama);
      data.append("desa_email", this.editedItem.desa_email);
      data.append("desa_web", this.editedItem.desa_web);
      data.append("desa_fb", this.editedItem.desa_fb);
      data.append("desa_twitter", this.editedItem.desa_twitter);
      data.append("desa_ig", this.editedItem.desa_ig);
      data.append("desa_yt", this.editedItem.desa_yt);
      data.append(
        "desa_status_pemerintahan",
        this.editedItem.desa_status_pemerintahan
      );
      data.append("kabupaten_id", this.editedItem.kabupaten_id);
      data.append("kecamatan_id", this.editedItem.kecamatan_id);
      data.append("desa_foto", this.desa_foto);

      const url = process.env.VUE_APP_API_BASE + "desainfo";
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

    closeModal() {
      this.modalEdit = false;
    },
  },
};
</script>
