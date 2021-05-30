<template>
  <v-dialog v-model="modalEdit" max-width="50%">
    <v-card>
      <v-toolbar dark color="primary" dense flat>
        <v-toolbar-title class="subtitle-1">Edit Data desa</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeModal()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form ref="form">
        <div class="px-5 py-5">
          <!-- Nama desa -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Nama desa</span>
            <v-text-field dense flat outlined class="mt-2" v-model="editedItem.desa_nama"></v-text-field>
          </v-col>

          <!-- Nama desa -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Deskripsi desa</span>
            <v-text-field dense flat outlined class="mt-2" v-model="editedItem.desa_deskripsi"></v-text-field>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <span class="subtitle-2">Foto desa</span>
            <v-img :src="getIMG(editedItem.desa_foto)" max-width="200"></v-img>
          </v-col>

          <!-- Foto -->
          <v-col cols="12" class="mb-n8">
            <span class="subtitle-2">Unggah Foto Baru</span>
            <v-file-input dense flat outlined prepend-icon accept="image/png, image/jpeg, image/bmp" placeholder="Pilih Foto desa" append-icon="mdi-camera" @change="onFile" ref="avatar"></v-file-input>
          </v-col>

          <!-- Preview -->
          <v-col cols="12">
            <v-img :src="urlImage" max-width="200"></v-img>
          </v-col>

          <hr />
          <div class="text-right mr-5 mt-5 pb-5">
            <v-btn v-if="btnLoading" small color="primary" depressed @click="edit()">SIMPAN</v-btn>
            <v-btn v-else small color="primary" depressed loading>SIMPAN</v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import modalEdit from '@/store/desa/modalEdit'
import refreshView from '@/store/desa/viewDesa'

export default {
  computed: {
    modalEdit: {
      get() {
        return modalEdit.state.modalEdit
      },
      set(value) {
        modalEdit.commit('toggleModal', value)
      }
    },
    editedItem: {
      get() {
        return modalEdit.state.desa
      },
      set(value) {
        console.log(value)
      }
    }
  },

  data: () => ({
    btnLoading: true,
    desa_foto: '',
    urlImage: ''
  }),

  methods: {
    getIMG(value) {
      if (value) {
        return 'http://localhost:3000/upload/desaGambar/' + value
      } else {
        return 'http://localhost:3000/upload/default.svg'
      }
    },

    async edit() {
      this.btnLoading = false

      const data = new FormData()
      data.append('desa_id', this.editedItem.desa_id)
      data.append('desa_nama', this.editedItem.desa_nama)
      data.append('desa_deskripsi', this.editedItem.desa_deskripsi)
      data.append('desa_foto', this.desa_foto)

      const url = process.env.VUE_APP_API_BASE + 'desa'
      this.http
        .put(url, data)
        .then(response => {
          this.btnLoading = true
          if (response.data.success) {
            refreshView.commit('refreshData', true)
            refreshView.commit('alert', response.data.message)
            refreshView.commit('berhasilAlert', true)
            refreshView.commit('gagalAlert', false)
            refreshView.commit('success', response.data.success)
          } else {
            refreshView.commit('refreshData', true)
            refreshView.commit('alert', response.data.message)
            refreshView.commit('gagalAlert', true)
            refreshView.commit('berhasilAlert', false)
            refreshView.commit('success', response.data.success)
          }
          this.closeModal()
        })
        .catch(error => {
          refreshView.commit('refreshData', true)
          refreshView.commit('alert', error.response.data.message)
          refreshView.commit('gagalAlert', true)
          refreshView.commit('berhasilAlert', false)
          refreshView.commit('success', error.response.data.success)
          console.log(error.response.status)
          this.btnLoading = true
        })
    },

    onFile(value) {
      this.desa_foto = value
      this.urlImage = URL.createObjectURL(this.desa_foto)
    },

    closeModal() {
      this.modalEdit = false
    }
  }
}
</script>
