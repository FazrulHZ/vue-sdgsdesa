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
            <!-- NIK User -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">NIK User</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="user_ktp"
              ></v-text-field>
            </v-col>

            <!-- Nama User -->
            <v-col cols="12" md="8" class="mb-n8">
              <span class="subtitle-2">Nama User</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="user_nama"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Password User -->
            <v-col cols="12" class="mb-n8">
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
            <v-col cols="12" class="mb-5">
              <v-img :src="urlImage" max-width="200"></v-img>
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
import refreshView from "@/store/user/viewUser";
export default {
  data: () => ({
    ModalAdd: false,
    btnLoading: true,
    show: false,

    user_ktp: "",
    user_password: "",
    user_nama: "",
    user_tlp: "",
    user_alamat: "",
    user_foto: "",
    urlImage: "",
  }),

  methods: {
    openModal() {
      this.ModalAdd = true;
    },

    async add() {
      this.btnLoading = false;

      const data = new FormData();
      data.append("user_ktp", this.user_ktp);
      data.append("user_password", this.user_password);
      data.append("user_nama", this.user_nama);
      data.append("user_tlp", this.user_tlp);
      data.append("user_alamat", this.user_alamat);
      data.append("user_foto", this.user_foto);

      let config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const url = process.env.VUE_APP_API_BASE + "user";
      this.http
        .post(url, data, config)
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
