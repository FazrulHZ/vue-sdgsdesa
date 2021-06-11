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
        <v-toolbar-title>Tambah Kartu Keluarga</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="ModalAdd = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form" lazy-validation>
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
                v-model="kabupaten"
                return-object
                @change="selectKecamatan"
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
                v-model="kecamatan"
                return-object
                @change="selectDesa"
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
                v-model="desa"
                return-object
                @change="selectRt"
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
                v-model="rt_id"
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
                v-model="kk_no"
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
                v-model="kk_nik"
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
                v-model="kk_nama"
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
                v-model="kk_tlp"
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
                v-model="kk_alamat"
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
                v-model="kk_lahan"
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
                v-model="kk_tanah"
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
                v-model="kk_lantai"
              ></v-text-field>
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

import refreshView from "@/store/kk/viewKk";
import getRef from "@/helper/getRef.js";

export default {
  data: () => ({
    token: "",
    ModalAdd: false,
    btnLoading: true,

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],
    refRt: [],

    kk_no: "",
    kk_nama: "",
    kk_nik: "",
    kk_alamat: "",
    kk_tlp: "",
    kk_lahan: "",
    kk_lantai: "",
    kk_tanah: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    rt_id: "",
  }),

  methods: {
    async openModal() {
      this.token = await Cookie.get("token");
      this.refKabupaten = await getRef.Kabupaten();
      this.ModalAdd = true;
    },

    async add() {
      this.btnLoading = false;

      const data = {
        kk_no: this.kk_no,
        kk_nama: this.kk_nama,
        kk_nik: this.kk_nik,
        kk_alamat: this.kk_alamat,
        kk_tlp: this.kk_tlp,
        kk_lahan: this.kk_lahan,
        kk_lantai: this.kk_lantai,
        kk_tanah: this.kk_tanah,
        kabupaten_id: this.kabupaten.kabupaten_id,
        kecamatan_id: this.kecamatan.kecamatan_id,
        desa_id: this.desa.desa_id,
        rt_id: this.rt_id,
      };

      const url = process.env.VUE_APP_API_BASE + "kk";
      this.http
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + this.token,
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

    async selectKecamatan(value) {
      this.refKecamatan = await getRef.Kecamatan(value.kabupaten_id);
    },

    async selectDesa(value) {
      this.refDesa = await getRef.Desa(value.kecamatan_id);
    },

    async selectRt(value) {
      this.refRt = await getRef.RT(value.desa_id);
    },

    closeModal() {
      this.ModalAdd = false;
    },
  },
};
</script>
