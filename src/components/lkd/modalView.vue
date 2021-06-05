<template>
  <v-dialog v-model="modalView" :width="CWidth">
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Detail RT/RW</v-toolbar-title>
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
            <!-- Nama RT/RW -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Nama RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                placeholder="No. RT/RW"
                class="mt-2"
                v-model="viewItem.rt_nama"
                readonly
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
                v-model="viewItem.rt_ketua"
                readonly
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
                v-model="viewItem.rt_alamat"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- RT/RW Telpon -->
            <v-col cols="12" md="4">
              <span class="subtitle-2">RT/RW Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="viewItem.rt_tlp"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Topografi RT/RW -->
            <v-col cols="12" md="5">
              <span class="subtitle-2">Topografi RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.rt_topografi"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Jumlah Warga RT/RW -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Jumlah Warga RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-account-group"
                v-model="viewItem.rt_jumlah_warga"
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
