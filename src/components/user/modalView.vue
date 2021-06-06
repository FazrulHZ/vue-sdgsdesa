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
              <v-avatar size="200">
                <v-img
                  :src="getIMG(viewItem.user_foto)"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>

          <v-row>
            <!-- NIK User -->
            <v-col cols="12" md="4" class="mb-n8">
              <span class="subtitle-2">NIK User</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                v-model="viewItem.user_ktp"
                readonly
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
                v-model="viewItem.user_nama"
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
                v-model="viewItem.user_alamat"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <!-- Nomor Telpon -->
            <v-col cols="12" md="3">
              <span class="subtitle-2">Nomor Telpon</span>
              <v-text-field
                dense
                flat
                outlined
                class="mt-2"
                append-icon="mdi-phone"
                v-model="viewItem.user_tlp"
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
        return process.env.VUE_APP_API_BASE + "upload/userDefault.png";
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
