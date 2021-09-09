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
        <v-toolbar-title>Tambah RT/RW</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="ModalAdd = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form" lazy-validation>
        <div class="mx-7 mt-5">
          <v-row>
            <!-- Kabupaten / Kota -->
            <v-col
              cols="12"
              md="4"
              class="mb-n8"
              v-if="session.user_lvl === '1'"
            >
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
            <v-col
              cols="12"
              md="4"
              class="mb-n8"
              v-if="session.user_lvl === '1'"
            >
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
            <v-col
              cols="12"
              md="4"
              class="mb-n8"
              v-if="session.user_lvl === '1'"
            >
              <span class="subtitle-2">Desa</span>
              <v-autocomplete
                dense
                flat
                outlined
                class="mt-2"
                :items="refDesa"
                item-text="desa_nama"
                item-value="desa_id"
                v-model="desa_id"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama RT/RW -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Nama RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                placeholder="No. RT/RW"
                class="mt-2"
                :rules="rt_namaRules"
                v-model="rt_nama"
                autocomplete="off"
              ></v-text-field>
            </v-col>

            <!-- Nama Ketua RT/RW -->
            <v-col cols="12" md="9" class="mb-n8">
              <span class="subtitle-2">Nama Ketua RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="rt_ketua"
                autocomplete="off"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Alamat RT/RW -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Alamat RT/RW</span>
              <v-textarea
                dense
                flat
                outlined
                class="mt-2"
                v-model="rt_alamat"
                autocomplete="off"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- RT/RW Telpon -->
            <v-col cols="12" md="2" class="mb-n8">
              <span class="subtitle-2">RT/RW Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="rt_tlp"
                autocomplete="off"
              ></v-text-field>
            </v-col>

            <!-- Topografi RT/RW -->
            <v-col cols="12" md="8" class="mb-n8">
              <span class="subtitle-2">Topografi RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="rt_topografi"
                autocomplete="off"
              ></v-text-field>
            </v-col>

            <!-- Jumlah Warga RT/RW -->
            <v-col cols="12" md="2">
              <span class="subtitle-2">Jumlah Warga RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-account-group"
                v-model="rt_jumlah_warga"
                autocomplete="off"
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

import refreshView from "@/store/rt/viewRt";
import getRef from "@/helper/getRef.js";

export default {
  data: () => ({
    session: "",
    ModalAdd: false,
    btnLoading: true,

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],

    rt_nama: "",
    rt_namaRules: [
      (v) =>
        v.split(" ").length <= 1 ||
        "Harap jangan menggunakan spasi, contoh (001/001)",
    ],

    rt_ketua: "",
    rt_alamat: "",
    rt_tlp: "",
    rt_topografi: "",
    rt_jumlah_warga: "",
    kabupaten: "",
    kecamatan: "",
    desa_id: "",
  }),

  methods: {
    async openModal() {
      this.session = await JSON.parse(Cookie.dec(Cookie.get("myCookie")));
      this.refKabupaten = await getRef.Kabupaten();
      this.ModalAdd = true;
    },

    async add() {
      this.btnLoading = false;

      const data = {
        rt_nama: this.rt_nama,
        rt_ketua: this.rt_ketua,
        rt_alamat: this.rt_alamat,
        rt_tlp: this.rt_tlp,
        rt_topografi: this.rt_topografi,
        rt_jumlah_warga: this.rt_jumlah_warga,
        kabupaten_id: this.kabupaten.kabupaten_id,
        kecamatan_id: this.kecamatan.kecamatan_id,
        desa_id: this.desa_id,
      };

      const url = process.env.VUE_APP_API_BASE + "rt";
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

    closeModal() {
      this.ModalAdd = false;
    },
  },
};
</script>
