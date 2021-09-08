<template>
  <v-dialog
    v-model="ModalAdd"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
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
        <v-toolbar-title>Tambah Data User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="ModalAdd = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="mx-7 mt-5">
          <v-row>
            <!-- NIK -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">NIK</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="user_ktp"
                autocomplete="off"
              ></v-text-field>
            </v-col>

            <!-- Nama -->
            <v-col cols="12" md="8" class="mb-n8">
              <span class="subtitle-2">Nama</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="user_nama"
                autocomplete="off"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nama User -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Nama User</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="user_name"
                autocomplete="off"
              ></v-text-field>
            </v-col>

            <!-- Password User -->
            <v-col cols="12" md="6" class="mb-n8">
              <span class="subtitle-2">Password User</span>
              <v-text-field
                dense
                flat
                outlined
                v-model="user_password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                class="mt-2 input-group--focused"
                @click:append="show = !show"
                autocomplete="off"
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
                v-model="user_alamat"
                autocomplete="off"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nomor Telpon -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Nomor Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="user_tlp"
                append-icon="mdi-phone"
                autocomplete="off"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Foto -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Foto</span>
              <v-file-input
                dense
                flat
                outlined
                prepend-icon
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pilih Foto user"
                append-icon="mdi-camera"
                @change="onFile"
                ref="avatar"
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <!-- Preview -->
            <v-col cols="12" class="mb-n2">
              <v-img :src="urlImage" max-width="200"></v-img>
            </v-col>
          </v-row>

          <v-row>
            <!-- User Level -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">User Level</span>
              <v-select
                dense
                flat
                outlined
                class="mt-2"
                :items="refUserlvl"
                item-value="id"
                item-text="nama"
                v-model="user_lvl"
                autocomplete="off"
              ></v-select>
            </v-col>
          </v-row>

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
            <v-col cols="12" md="4">
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
import refreshView from "@/store/user/viewUser";
import getRef from "@/helper/getRef.js";

export default {
  data: () => ({
    token: "",
    ModalAdd: false,
    btnLoading: true,
    show: false,

    refUserlvl: [],
    refKabupaten: [],
    refKecamatan: [],
    refDesa: [],

    user_ktp: "",
    user_nama: "",
    user_name: "",
    user_password: "",
    user_tlp: "",
    user_alamat: "",
    user_foto: "",
    user_lvl: "",
    kabupaten: "",
    kecamatan: "",
    desa_id: "",
    urlImage: "",
  }),

  methods: {
    async openModal() {
      this.token = await Cookie.get("token");
      this.refUserlvl = await getRef.Userlvl();
      this.refKabupaten = await getRef.Kabupaten();
      this.ModalAdd = true;
    },
    
    async selectKecamatan(value) {
      this.refKecamatan = await getRef.Kecamatan(value.kabupaten_id);
    },
    
    async selectDesa(value) {
      this.refDesa = await getRef.Desa(value.kecamatan_id);
    },

    async add() {
      this.btnLoading = false;

      const data = new FormData();
      data.append("user_ktp", this.user_ktp);
      data.append("user_nama", this.user_nama);
      data.append("user_name", this.user_name);
      data.append("user_password", this.user_password);
      data.append("user_tlp", this.user_tlp);
      data.append("user_alamat", this.user_alamat);
      data.append("user_foto", this.user_foto);
      data.append("user_lvl", this.user_lvl);
      data.append("kabupaten_id", this.kabupaten.kabupaten_id);
      data.append("kecamatan_id", this.kecamatan.kecamatan_id);
      data.append("desa_id", this.desa_id);

      const url = process.env.VUE_APP_API_BASE + "user";
      this.http
        .post(url, data, {
          headers: {
            Authorization: "Bearer " + this.token,
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

    onFile(value) {
      this.user_foto = value;
      this.urlImage = URL.createObjectURL(this.user_foto);
    },

    closeModal() {
      this.ModalAdd = false;
    },
  },
};
</script>
