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
            <v-col cols="12" md="3" class="mb-n8">
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
            <v-col cols="12" md="3" class="mb-n8">
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
            <v-col cols="12" md="3" class="mb-n8">
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

            <!-- RT/RW -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">RT/RW</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.rt_nama"
                readonly
              ></v-text-field>
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
                v-model="viewItem.penduduk_no"
                readonly
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
                v-model="viewItem.penduduk_nik"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Nama Kepala Keluarga -->
            <v-col cols="12" md="5" class="mb-n8">
              <span class="subtitle-2">Nama Kepala Keluarga</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.penduduk_nama"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Telpon -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="viewItem.penduduk_tlp"
                readonly
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
                v-model="viewItem.penduduk_alamat"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- Kepemilikan Lahan -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Kepemilikan Lahan</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.penduduk_lahan"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Luas Tanah -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Luas Tanah</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.penduduk_tanah"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Luas Lantai -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Luas Lantai</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.penduduk_lantai"
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
import modalView from "@/store/penduduk/modalView";

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
        return modalView.state.penduduk;
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
