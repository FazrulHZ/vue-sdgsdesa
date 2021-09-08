<template>
  <v-dialog
    v-model="modalEdit"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Edit Data Kartu Keluarga</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="mx-7 mt-5">
          <v-row>
            <!-- Kabupaten / Kota -->
            <v-col cols="12" md="3" class="mb-n8">
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
            <v-col cols="12" md="3" class="mb-n8">
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

            <!-- Desa -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Desa</span>
              <v-autocomplete
                dense
                flat
                outlined
                class="mt-2"
                :items="refDesa"
                item-text="desa_nama"
                item-value="desa_id"
                v-model="editedItem.desa_id"
              ></v-autocomplete>
            </v-col>

            <!-- RT/RW -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">RT/RW</span>
              <v-autocomplete
                dense
                flat
                outlined
                class="mt-2"
                :items="refRt"
                item-text="rt_nama"
                item-value="rt_id"
                v-model="editedItem.rt_id"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nomor Kartu Keluarga -->
            <v-col cols="12" md="7" class="mb-n8">
              <span class="subtitle-2">Nomor Kartu Keluarga</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_no"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- NIK Kepala Keluarga -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">NIK Kepala Keluarga</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_nik"
              ></v-text-field>
            </v-col>

            <!-- Nama Kepala Keluarga -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Nama Kepala Keluarga</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_nama"
              ></v-text-field>
            </v-col>

            <!-- Telpon -->
            <v-col cols="12" md="2" class="mb-n8">
              <span class="subtitle-2">Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="editedItem.kk_tlp"
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
                v-model="editedItem.kk_alamat"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- Kepemilikan Lahan -->
            <v-col cols="12" md="2" class="mb-n8">
              <span class="subtitle-2">Kepemilikan Lahan</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_lahan"
              ></v-text-field>
            </v-col>

            <!-- Luas Tanah -->
            <v-col cols="12" md="2" class="mb-n8">
              <span class="subtitle-2">Luas Tanah</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_tanah"
              ></v-text-field>
            </v-col>

            <!-- Luas Lantai -->
            <v-col cols="12" md="2">
              <span class="subtitle-2">Luas Lantai</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_lantai"
              ></v-text-field>
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

import modalEdit from "@/store/kk/modalEdit";
import refreshView from "@/store/kk/viewKk";
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
        return modalEdit.state.kk;
      },
      set(value) {
        console.log(value);
      },
    },

    watchKabupaten: {
      get() {
        return modalEdit.state.kk.kabupaten_id;
      },
    },

    watchKecamatan: {
      get() {
        return modalEdit.state.kk.kecamatan_id;
      },
    },

    watchDesa: {
      get() {
        return modalEdit.state.kk.desa_id;
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

    async watchKecamatan() {
      this.refDesa = await getRef.Desa(this.editedItem.kecamatan_id);
    },

    async watchDesa() {
      this.refRt = await getRef.RT(this.editedItem.desa_id);
    },
  },

  data: () => ({
    session: "",
    btnLoading: true,

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],
    refRt: [],
  }),

  methods: {
    async edit() {
      this.btnLoading = false;

      const data = {
        kk_id: this.editedItem.kk_id,
        kk_no: this.editedItem.kk_no,
        kk_nama: this.editedItem.kk_nama,
        kk_nik: this.editedItem.kk_nik,
        kk_alamat: this.editedItem.kk_alamat,
        kk_tlp: this.editedItem.kk_tlp,
        kk_lahan: this.editedItem.kk_lahan,
        kk_lantai: this.editedItem.kk_lantai,
        kk_tanah: this.editedItem.kk_tanah,
        kabupaten_id: this.editedItem.kabupaten_id,
        kecamatan_id: this.editedItem.kecamatan_id,
        desa_id: this.editedItem.desa_id,
        rt_id: this.editedItem.rt_id,
      };

      const url = process.env.VUE_APP_API_BASE + "kk";
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
            console.log(response.data.success);
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
          this.btnLoading = true;
          this.closeModal();
        });
    },

    closeModal() {
      this.modalEdit = false;
    },
  },
};
</script>
