<template>
  <v-dialog v-model="modalView" :width="CWidth">
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Detail Kartu Keluarga</v-toolbar-title>
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
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.kabupaten_nama"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Kecamatan -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Kecamatan</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.kecamatan_nama"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Desa -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Desa</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.desa_nama"
                readonly
              ></v-text-field>
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
                v-model="viewItem.kk_nama"
                readonly
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
                v-model="viewItem.kk_ketua"
                readonly
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
                v-model="viewItem.kk_alamat"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- kk/RW Telpon -->
            <v-col cols="12" md="4">
              <span class="subtitle-2">kk/RW Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="viewItem.kk_tlp"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Topografi kk/RW -->
            <v-col cols="12" md="5">
              <span class="subtitle-2">Topografi kk/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.kk_topografi"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Jumlah Warga kk/RW -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Jumlah Warga kk/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-account-group"
                v-model="viewItem.kk_jumlah_warga"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from "@/store/kk/modalView";

export default {
  computed: {
    modalView: {
      get() {
        return modalView.state.modalView;
      },
      set(value) {
        modalView.commit("toggleModal", value);
      },
    },
    viewItem: {
      get() {
        return modalView.state.kk;
      },
      set(value) {
        console.log(value);
      },
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
    CWidth: "60%",
  }),

  methods: {
    closeModal() {
      this.modalView = false;
    },
  },
};
</script>
