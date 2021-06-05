<template>
  <v-dialog v-model="modalView" :width="CWidth">
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Detail Lembaga Kemasyaratan Desa</v-toolbar-title>
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
            <!-- Nama LKD -->
            <v-col cols="12" md="12" class="mb-n8">
              <span class="subtitle-2">Nama LKD</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.lkd_nama"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Jumlah Pengurus -->
            <v-col cols="12" md="6">
              <span class="subtitle-2">Jumlah Pengurus</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.lkd_pengurus"
                readonly
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
                v-model="viewItem.lkd_anggota"
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
import modalView from "@/store/lkd/modalView";

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
        return modalView.state.lkd;
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
