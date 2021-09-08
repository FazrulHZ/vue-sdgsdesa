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
        <v-toolbar-title>Tambah Penduduk</v-toolbar-title>
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
            <!-- Nomor Induk KTP -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Nomor Induk KTP</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="penduduk_nik"
              ></v-text-field>
            </v-col>

            <!-- Nama Lengkap -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Nama Lengkap</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="penduduk_nama"
              ></v-text-field>
            </v-col>

            <!-- Umur -->
            <v-col cols="12" md="2" class="mb-n8">
              <span class="subtitle-2">Umur</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="penduduk_umur"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Tempat Lahir -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Tempat Lahir</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="penduduk_tempatlahir"
              ></v-text-field>
            </v-col>

            <!-- Tanggal Lahir -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Tanggal Lahir</span>
              <v-menu
                ref="tglLahirPicker"
                v-model="tglLahirPicker"
                :close-on-content-click="false"
                :return-value.sync="penduduk_tgllahir"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    flat
                    outlined
                    class="mt-2"
                    v-model="penduduk_tgllahir"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="penduduk_tgllahir" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="tglLahirPicker = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.tglLahirPicker.save(penduduk_tgllahir)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <!-- Jenis Kelamin -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Jenis Kelamin</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refKelamin"
                item-value="id"
                item-text="nama"
                v-model="penduduk_kelamin"
              ></v-select>
            </v-col>

            <!-- Satatus -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Status</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refStatus"
                item-value="id"
                item-text="nama"
                v-model="penduduk_kawin"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <!-- Suku -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Suku</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="penduduk_suku"
              ></v-text-field>
            </v-col>

            <!-- Agama -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Agama</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refAgama"
                item-value="id"
                item-text="nama"
                v-model="penduduk_agama"
              ></v-select>
            </v-col>

            <!-- Warga Negara -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Warga Negara</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refWN"
                item-value="id"
                item-text="nama"
                v-model="penduduk_wn"
              ></v-select>
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

import refreshView from "@/store/penduduk/viewPenduduk";
import getRef from "@/helper/getRef.js";

export default {
  data: () => ({
    session: "",
    ModalAdd: false,
    btnLoading: true,
    tglLahirPicker: false,

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],
    refRt: [],
    refKelamin: [],
    refStatus: [],
    refAgama: [],
    refWN: [],

    penduduk_nik: "",
    penduduk_nama: "",
    penduduk_kelamin: "",
    penduduk_tempatlahir: "",
    penduduk_tgllahir: "",
    penduduk_umur: "",
    penduduk_kawin: "",
    penduduk_agama: "",
    penduduk_suku: "",
    penduduk_wn: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    rt_id: "",
  }),

  methods: {
    async openModal() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
      this.refKabupaten = await getRef.Kabupaten();
      this.refKelamin = await getRef.Jenkel();
      this.refStatus = await getRef.Status();
      this.refAgama = await getRef.Agama();
      this.refWN = await getRef.WN();
      this.ModalAdd = true;
    },

    async add() {
      this.btnLoading = false;

      const data = {
        penduduk_nik: this.penduduk_nik,
        penduduk_nama: this.penduduk_nama,
        penduduk_kelamin: this.penduduk_kelamin,
        penduduk_tempatlahir: this.penduduk_tempatlahir,
        penduduk_tgllahir: this.penduduk_tgllahir,
        penduduk_umur: this.penduduk_umur,
        penduduk_kawin: this.penduduk_kawin,
        penduduk_agama: this.penduduk_agama,
        penduduk_suku: this.penduduk_suku,
        penduduk_wn: this.penduduk_wn,
        kabupaten_id: this.kabupaten.kabupaten_id,
        kecamatan_id: this.kecamatan.kecamatan_id,
        desa_id: this.desa.desa_id,
        rt_id: this.rt_id,
      };

      const url = process.env.VUE_APP_API_BASE + "penduduk";
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
