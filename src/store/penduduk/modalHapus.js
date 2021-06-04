import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        kk: {
            kk_id: "",
            kk_no: "",
            kk_nama: "",
            kk_nik: "",
            kk_alamat: "",
            kk_tlp: "",
            kk_lahan: "",
            kk_lantai: "",
            kk_tanah: "",
            kabupaten_id: "",
            kecamatan_id: "",
            desa_id: "",
            rt_id: "",
            created_at: "",
            kabupaten_nama: "",
            kecamatan_nama: "",
            desa_nama: "",
            rt_nama: ""
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.kk = value
        }
    }
})
