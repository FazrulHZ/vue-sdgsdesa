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
            <v-col cols="12" md="5" class="mb-n8">
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
          </v-row>

          <v-row>
            <!-- Nama user -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Nama user</span>
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
            <!-- Email user -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">Email user</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_email"
                append-icon="mdi-email"
              ></v-text-field>
            </v-col>

            <!-- Website user -->
            <v-col cols="12" md="8" class="mb-n8">
              <span class="subtitle-2">Website user</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_web"
                append-icon="mdi-web"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Facebook user -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Facebook user</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_fb"
                append-icon="mdi-facebook"
              ></v-text-field>
            </v-col>

            <!-- Twitter user -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Twitter user</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_twitter"
                append-icon="mdi-twitter"
              ></v-text-field>
            </v-col>

            <!-- Instagram user -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Instagram user</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_ig"
                append-icon="mdi-instagram"
              ></v-text-field>
            </v-col>

            <!-- Youtube user -->
            <v-col cols="12" md="3" class="mb-n8">
              <span class="subtitle-2">Youtube user</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_yt"
                append-icon="mdi-youtube"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Status Pemerintahan -->
            <v-col cols="12" class="mb-n8">
              <span class="subtitle-2">Status Pemerintahan</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="editedItem.user_status_pemerintahan"
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
        return modalEdit.state.user;
      },
      set(value) {
        console.log(value);
      },
    },

    watchKabupaten: {
      get() {
        return modalEdit.state.user.kabupaten_id;
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
    refKabupaten: [],
    refKecamatan: [],

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
      data.append("user_nama", this.editedItem.user_nama);
      data.append("user_email", this.editedItem.user_email);
      data.append("user_web", this.editedItem.user_web);
      data.append("user_fb", this.editedItem.user_fb);
      data.append("user_twitter", this.editedItem.user_twitter);
      data.append("user_ig", this.editedItem.user_ig);
      data.append("user_yt", this.editedItem.user_yt);
      data.append(
        "user_status_pemerintahan",
        this.editedItem.user_status_pemerintahan
      );
      data.append("kabupaten_id", this.editedItem.kabupaten_id);
      data.append("kecamatan_id", this.editedItem.kecamatan_id);
      data.append("user_foto", this.user_foto);

      let config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const url = process.env.VUE_APP_API_BASE + "userinfo";
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
