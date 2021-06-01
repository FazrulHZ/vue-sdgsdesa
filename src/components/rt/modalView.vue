<template>
  <v-dialog v-model="modalView" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Detail rt</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <!-- Nama rt -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Nama rt</span>
            <v-text-field dense flat outlined class="mt-2" v-model="viewItem.rt_nama" readonly></v-text-field>
          </v-col>

          <!-- Deskripsi rt -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Deskripsi rt</span>
            <v-text-field dense flat outlined class="mt-2" v-model="viewItem.rt_deskripsi" readonly></v-text-field>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <span class="subtitle-2">Foto rt</span>
            <v-img :src="getIMG(viewItem.rt_foto)" max-width="200"></v-img>
          </v-col>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalView from '@/store/rt/modalView'

export default {
  computed: {
    modalView: {
      get() {
        return modalView.state.modalView
      },
      set(value) {
        modalView.commit('toggleModal', value)
      }
    },
    viewItem: {
      get() {
        return modalView.state.rt
      },
      set(value) {
        console.log(value)
      }
    }
  },

  data: () => ({}),

  methods: {
    getIMG(value) {
      if (value) {
        return 'http://localhost:3000/upload/rtGambar/' + value
      } else {
        return 'http://localhost:3000/upload/default.svg'
      }
    },

    closeModal() {
      this.modalView = false
    }
  }
}
</script>
