<template>
  <v-dialog
    v-model="modalEdit"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Edit Data User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
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
                v-model="editedItem.user_ktp"
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
                v-model="editedItem.user_nama"
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
                v-model="editedItem.user_alamat"
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
                v-model="editedItem.user_tlp"
                append-icon="mdi-phone"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Preview -->
            <v-col cols="12">
              <span class="subtitle-2">Foto user</span>
              <v-img
                :src="getIMG(editedItem.user_foto)"
                max-width="200"
              ></v-img>
            </v-col>
          </v-row>

          <v-row>
            <!-- Foto -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Unggah Foto Baru</span>
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
import modalEdit from "@/store/user/modalEdit";
import refreshView from "@/store/user/viewUser";

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
        return modalEdit.state.user;
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
    btnLoading: true,
    show: false,

    user_foto: "",
    urlImage: "",
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + "upload/userGambar/" + value;
      } else {
        return process.env.VUE_APP_API_BASE + "upload/default.svg";
      }
    },

    async edit() {
      this.btnLoading = false;

      const data = new FormData();
      data.append("user_id", this.editedItem.user_id);
      data.append("user_ktp", this.editedItem.user_ktp);
      data.append("user_password", this.editedItem.user_password);
      data.append("user_nama", this.editedItem.user_nama);
      data.append("user_tlp", this.editedItem.user_tlp);
      data.append("user_alamat", this.editedItem.user_twitter);
      data.append("user_foto", this.user_foto);

      let config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const url = process.env.VUE_APP_API_BASE + "user";
      this.http
        .put(url, data, config)
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
      this.modalEdit = false;
    },
  },
};
</script>
