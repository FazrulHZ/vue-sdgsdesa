<template>
  <v-dialog
    v-model="modalEdit"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Edit Data RT/RW</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
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
                v-model="editedItem.kabupaten_id"
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
                v-model="editedItem.kecamatan_id"
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
                v-model="editedItem.desa_id"
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
                v-model="editedItem.rt_nama"
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
                v-model="editedItem.rt_ketua"
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
                v-model="editedItem.rt_alamat"
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
                v-model="editedItem.rt_tlp"
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
                v-model="editedItem.rt_topografi"
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
                v-model="editedItem.rt_jumlah_warga"
                autocomplete="off"
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

import modalEdit from "@/store/rt/modalEdit";
import refreshView from "@/store/rt/viewRt";
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
        return modalEdit.state.rt;
      },
      set(value) {
        console.log(value);
      },
    },

    watchKabupaten: {
      get() {
        return modalEdit.state.rt.kabupaten_id;
      },
    },

    watchKecamatan: {
      get() {
        return modalEdit.state.rt.kecamatan_id;
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
  },

  data: () => ({
    session: "",
    btnLoading: true,

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],

    rt_namaRules: [
      (v) =>
        v.split(" ").length <= 1 ||
        "Harap jangan menggunakan spasi, contoh (001/001)",
    ],
  }),

  methods: {
    async edit() {
      this.btnLoading = false;

      const data = {
        rt_id: this.editedItem.rt_id,
        rt_nama: this.editedItem.rt_nama,
        rt_ketua: this.editedItem.rt_ketua,
        rt_alamat: this.editedItem.rt_alamat,
        rt_tlp: this.editedItem.rt_tlp,
        rt_topografi: this.editedItem.rt_topografi,
        rt_jumlah_warga: this.editedItem.rt_jumlah_warga,
        kabupaten_id: this.editedItem.kabupaten_id,
        kecamatan_id: this.editedItem.kecamatan_id,
        desa_id: this.editedItem.desa_id,
      };

      const url = process.env.VUE_APP_API_BASE + "rt";
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

    closeModal() {
      this.modalEdit = false;
    },
  },
};
</script>
