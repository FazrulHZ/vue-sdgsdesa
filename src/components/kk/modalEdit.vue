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
                v-model="editedItem.kecamatan_id"
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
                v-model="editedItem.desa_id"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama kk/RW -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Nama kk/RW</span>
              <v-text-field
                dense
                flat
                outlined
                placeholder="No. kk/RW"
                class="mt-2"
                :rules="kk_namaRules"
                v-model="editedItem.kk_nama"
              ></v-text-field>
            </v-col>

            <!-- Nama Ketua kk/RW -->
            <v-col cols="12" md="9" class="mb-n8">
              <span class="subtitle-2">Nama Ketua kk/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_ketua"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Alamat kk/RW -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Alamat kk/RW</span>
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
            <!-- kk/RW Telpon -->
            <v-col cols="12" md="2" class="mb-n8">
              <span class="subtitle-2">kk/RW Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="editedItem.kk_tlp"
              ></v-text-field>
            </v-col>

            <!-- Topografi kk/RW -->
            <v-col cols="12" md="8" class="mb-n8">
              <span class="subtitle-2">Topografi kk/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.kk_topografi"
              ></v-text-field>
            </v-col>

            <!-- Jumlah Warga kk/RW -->
            <v-col cols="12" md="2">
              <span class="subtitle-2">Jumlah Warga kk/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-account-group"
                v-model="editedItem.kk_jumlah_warga"
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
  },

  watch: {
    async modalEdit() {
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
    btnLoading: true,
    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],

    kk_namaRules: [
      (v) =>
        v.split(" ").length <= 1 ||
        "Harap jangan menggunakan spasi, contoh (001/001)",
    ],
  }),

  methods: {
    async edit() {
      this.btnLoading = false;

      const data = {
        kk_id: this.editedItem.kk_id,
        kk_nama: this.editedItem.kk_nama,
        kk_ketua: this.editedItem.kk_ketua,
        kk_alamat: this.editedItem.kk_alamat,
        kk_tlp: this.editedItem.kk_tlp,
        kk_topografi: this.editedItem.kk_topografi,
        kk_jumlah_warga: this.editedItem.kk_jumlah_warga,
        kabupaten_id: this.editedItem.kabupaten_id,
        kecamatan_id: this.editedItem.kecamatan_id,
        desa_id: this.editedItem.desa_id,
      };

      const url = process.env.VUE_APP_API_BASE + "kk";
      this.http
        .put(url, data)
        .then((response) => {
          this.btnLoading = true;
          if (response.data.success) {
            refreshView.commit("refreshData", true);
            refreshView.commit("alekk", response.data.message);
            refreshView.commit("berhasilAlekk", true);
            refreshView.commit("gagalAlekk", false);
            refreshView.commit("success", response.data.success);
          } else {
            refreshView.commit("refreshData", true);
            refreshView.commit("alekk", response.data.message);
            refreshView.commit("gagalAlekk", true);
            refreshView.commit("berhasilAlekk", false);
            refreshView.commit("success", response.data.success);
          }
          this.closeModal();
        })
        .catch((error) => {
          refreshView.commit("refreshData", true);
          refreshView.commit("alekk", error.response.data.message);
          refreshView.commit("gagalAlekk", true);
          refreshView.commit("berhasilAlekk", false);
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
