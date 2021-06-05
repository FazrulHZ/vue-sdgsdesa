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
            <!-- Nomor Induk KTP -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Nomor Induk KTP</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.penduduk_nik"
                readonly
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
                v-model="viewItem.penduduk_nama"
                readonly
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
                v-model="viewItem.penduduk_umur"
                readonly
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
                v-model="viewItem.penduduk_tempatlahir"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Tanggal Lahir -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Tanggal Lahir</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-calendar"
                v-model="viewItem.penduduk_tgllahir"
                readonly
              ></v-text-field>
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
                v-model="viewItem.penduduk_kelamin"
                readonly
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
                v-model="viewItem.penduduk_kawin"
                readonly
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <!-- Suku -->
            <v-col cols="12" md="4">
              <span class="subtitle-2">Suku</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.penduduk_suku"
                readonly
              ></v-text-field>
            </v-col>

            <!-- Agama -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Agama</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refAgama"
                item-value="id"
                item-text="nama"
                v-model="viewItem.penduduk_agama"
                readonly
              ></v-select>
            </v-col>

            <!-- Warga Negara -->
            <v-col cols="12" md="5">
              <span class="subtitle-2">Warga Negara</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refWN"
                item-value="id"
                item-text="nama"
                v-model="viewItem.penduduk_wn"
                readonly
              ></v-select>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from "@/store/penduduk/modalView";
import getRef from "@/helper/getRef.js";

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

  watch: {
    async modalView() {
      this.refKelamin = await getRef.Jenkel();
      this.refStatus = await getRef.Status();
      this.refAgama = await getRef.Agama();
      this.refWN = await getRef.WN();
    },

    viewItem() {
      this.viewItem.penduduk_tgllahir = this.tglFormat(
        this.viewItem.penduduk_tgllahir
      );
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
    tglLahirPicker: false,

    CWidth: "60%",
    refKelamin: [],
    refStatus: [],
    refAgama: [],
    refWN: [],
  }),

  methods: {
    closeModal() {
      this.modalView = false;
    },

    tglFormat(tgl) {
      const date = new Date(tgl);
      const dateTimeFormat = new Intl.DateTimeFormat("id", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const formatted = dateTimeFormat.formatToParts(date);
      return (
        formatted[4].value + "-" + formatted[2].value + "-" + formatted[0].value
      );
    },
  },
};
</script>
