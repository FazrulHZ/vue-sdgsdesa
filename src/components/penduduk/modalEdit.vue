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
            <v-col cols="12" md="3" class="mb-n8">
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
            <v-col cols="12" md="3" class="mb-n8">
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
            <v-col cols="12" md="3" class="mb-n8">
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

            <!-- RT/RW -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">RT/RW</span>
              <v-autocomplete
                dense
                flat
                outlined
                class="mt-2"
                :items="refRt"
                item-text="rt_nama"
                item-value="rt_id"
                v-model="editedItem.rt_id"
              ></v-autocomplete>
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
                v-model="editedItem.penduduk_nik"
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
                v-model="editedItem.penduduk_nama"
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
                v-model="editedItem.penduduk_umur"
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
                v-model="editedItem.penduduk_tempatlahir"
              ></v-text-field>
            </v-col>

            <!-- Tanggal Lahir -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Tanggal Lahir</span>
              <v-menu
                ref="tglLahirPicker"
                v-model="tglLahirPicker"
                :close-on-content-click="false"
                :return-value.sync="editedItem.penduduk_tgllahir"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    flat
                    outlined
                    class="mt-2"
                    v-model="editedItem.penduduk_tgllahir"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.penduduk_tgllahir"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="tglLahirPicker = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.tglLahirPicker.save(editedItem.penduduk_tgllahir)
                    "
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
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
                v-model="editedItem.penduduk_kelamin"
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
                v-model="editedItem.penduduk_kawin"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <!-- Suku -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Suku</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.penduduk_suku"
              ></v-text-field>
            </v-col>

            <!-- Agama -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Agama</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refAgama"
                item-value="id"
                item-text="nama"
                v-model="editedItem.penduduk_agama"
              ></v-select>
            </v-col>

            <!-- Warga Negara -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Warga Negara</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refWN"
                item-value="id"
                item-text="nama"
                v-model="editedItem.penduduk_wn"
              ></v-select>
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
import modalEdit from "@/store/penduduk/modalEdit";
import refreshView from "@/store/penduduk/viewPenduduk";
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
        return modalEdit.state.penduduk;
      },
      set(value) {
        console.log(value);
      },
    },

    watchKabupaten: {
      get() {
        return modalEdit.state.penduduk.kabupaten_id;
      },
    },

    watchKecamatan: {
      get() {
        return modalEdit.state.penduduk.kecamatan_id;
      },
    },

    watchDesa: {
      get() {
        return modalEdit.state.penduduk.desa_id;
      },
    },
  },

  watch: {
    editedItem() {
      this.editedItem.penduduk_tgllahir = this.tglFormat(
        this.editedItem.penduduk_tgllahir
      );
    },

    async modalEdit() {
      this.refKabupaten = await getRef.Kabupaten();
      this.refKelamin = await getRef.Jenkel();
      this.refStatus = await getRef.Status();
      this.refAgama = await getRef.Agama();
      this.refWN = await getRef.WN();
    },

    async watchKabupaten() {
      this.refKecamatan = await getRef.Kecamatan(this.editedItem.kabupaten_id);
    },

    async watchKecamatan() {
      this.refDesa = await getRef.Desa(this.editedItem.kecamatan_id);
    },

    async watchDesa() {
      this.refRt = await getRef.RT(this.editedItem.desa_id);
    },
  },

  data: () => ({
    btnLoading: true,
    tglLahirPicker: false,

    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],
    refRt: [],
    refKelamin: [],
    refStatus: [],
    refAgama: [],
    refWN: [],
  }),

  methods: {
    async edit() {
      this.btnLoading = false;

      const data = {
        penduduk_id: this.editedItem.penduduk_id,
        penduduk_nik: this.editedItem.penduduk_nik,
        penduduk_nama: this.editedItem.penduduk_nama,
        penduduk_kelamin: this.editedItem.penduduk_kelamin,
        penduduk_tempatlahir: this.editedItem.penduduk_tempatlahir,
        penduduk_tgllahir: this.editedItem.penduduk_tgllahir,
        penduduk_umur: this.editedItem.penduduk_umur,
        penduduk_kawin: this.editedItem.penduduk_kawin,
        penduduk_agama: this.editedItem.penduduk_agama,
        penduduk_suku: this.editedItem.penduduk_suku,
        penduduk_wn: this.editedItem.penduduk_wn,
        kabupaten_id: this.editedItem.kabupaten_id,
        kecamatan_id: this.editedItem.kecamatan_id,
        desa_id: this.editedItem.desa_id,
        rt_id: this.editedItem.rt_id,
      };

      const url = process.env.VUE_APP_API_BASE + "penduduk";
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
            console.log(response.data.success);
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
          this.btnLoading = true;
          this.closeModal();
        });
    },

    closeModal() {
      this.modalEdit = false;
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
