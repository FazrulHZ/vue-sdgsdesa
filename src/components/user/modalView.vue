<template>
  <v-dialog v-model="modalView" :width="CWidth">
    <v-card>
      <v-toolbar dark color="utama" dense flat>
        <v-toolbar-title>Detail User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="mx-7 mt-5">
          <v-row>
            <!-- Foto user -->
            <v-col cols="12" class="text-center">
              <v-img
                :src="getIMG(viewItem.user_foto)"
                max-height="200"
                class="mx-auto"
              ></v-img>
              <span class="subtitle-2">Foto user</span>
            </v-col>
          </v-row>

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
            <v-col cols="12" md="5" class="mb-n8">
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
                v-model="viewItem.user_nama"
                readonly
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
                v-model="viewItem.user_email"
                readonly
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
                v-model="viewItem.user_web"
                readonly
                append-icon="mdi-web"
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
                v-model="viewItem.user_status_pemerintahan"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <!-- Sosial Media -->
            <v-col cols="12" class="text-right mb-3">
              <v-btn icon color="primary" class="mr-2" @click="facebook()">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon color="primary" class="mr-2" @click="twitter()">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon class="mr-2" @click="instagram()">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon color="error" class="mr-2" @click="youtube()">
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from "@/store/user/modalView";

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
        return modalView.state.user;
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
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + "upload/userGambar/" + value;
      } else {
        return process.env.VUE_APP_API_BASE + "upload/default.jpg";
      }
    },

    facebook() {
      window.open("" + this.viewItem.user_fb + "", "_blank");
    },

    twitter() {
      window.open("" + this.viewItem.user_twitter + "", "_blank");
    },

    instagram() {
      window.open("" + this.viewItem.user_ig + "", "_blank");
    },

    youtube() {
      window.open("" + this.viewItem.user_yt + "", "_blank");
    },

    closeModal() {
      this.modalView = false;
    },
  },
};
</script>
