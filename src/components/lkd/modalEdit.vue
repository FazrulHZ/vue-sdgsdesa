<template>
  <v-dialog v-model="modalEdit" :width="CWidth">
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
            <!-- Nama LKD -->
            <v-col cols="12" md="12" class="mb-n8">
              <span class="subtitle-2">Nama LKD</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.lkd_nama"
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
                v-model="editedItem.lkd_pengurus"
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
                v-model="editedItem.lkd_anggota"
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
import modalEdit from "@/store/lkd/modalEdit";
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
        return modalEdit.state.lkd;
      },
      set(value) {
        console.log(value);
      },
    },

    watchKabupaten: {
      get() {
        return modalEdit.state.lkd.kabupaten_id;
      },
    },

    watchKecamatan: {
      get() {
        return modalEdit.state.lkd.kecamatan_id;
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
    CWidth: "60%",

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],
  }),

  methods: {
    async edit() {
      this.btnLoading = false;

      const data = {
        lkd_id: this.editedItem.lkd_id,
        lkd_nama: this.editedItem.lkd_nama,
        lkd_pengurus: this.editedItem.lkd_pengurus,
        lkd_anggota: this.editedItem.lkd_anggota,
        kabupaten_id: this.editedItem.kabupaten_id,
        kecamatan_id: this.editedItem.kecamatan_id,
        desa_id: this.editedItem.desa_id,
      };

      const url = process.env.VUE_APP_API_BASE + "lkd";
      this.http
        .put(url, data)
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
