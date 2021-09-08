<template>
  <v-dialog v-model="ModalAdd" :width="CWidth">
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
        <v-toolbar-title>Tambah Lembaga Kemasyaratan Desa</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="ModalAdd = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form" lazy-validation>
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
            <v-col cols="12" md="4" class="mb-n8">
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
            <v-col cols="12" md="4" class="mb-n8">
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
            <!-- Nama LKD -->
            <v-col cols="12" md="12" class="mb-n8">
              <span class="subtitle-2">Nama LKD</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="lkd_nama"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Jumlah Pengurus -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Jumlah Pengurus</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="lkd_pengurus"
              ></v-text-field>
            </v-col>

            <!-- Jumlah Anggota -->
            <v-col cols="12" md="6">
              <span class="subtitle-2">Jumlah Anggota</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="lkd_anggota"
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

import refreshView from "@/store/lkd/viewLkd";
import getRef from "@/helper/getRef.js";

export default {
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
    ModalAdd: false,
    btnLoading: true,
    CWidth: "60%",

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],

    lkd_nama: "",
    lkd_pengurus: "",
    lkd_anggota: "",
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
        lkd_nama: this.lkd_nama,
        lkd_pengurus: this.lkd_pengurus,
        lkd_anggota: this.lkd_anggota,
        kabupaten_id: this.kabupaten.kabupaten_id,
        kecamatan_id: this.kecamatan.kecamatan_id,
        desa_id: this.desa_id,
      };

      const url = process.env.VUE_APP_API_BASE + "lkd";
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
