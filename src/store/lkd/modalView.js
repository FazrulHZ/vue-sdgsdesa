import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalView: false,
        lkd: {
            lkd_id: "",
            lkd_nama: "",
            lkd_ketua: "",
            lkd_alamat: "",
            lkd_tlp: "",
            lkd_topografi: "",
            lkd_jumlah_warga: "",
            kabupaten_id: "",
            kecamatan_id: "",
            desa_id: "",
            created_at: "",
            kabupaten_nama: "",
            kecamatan_nama: "",
            desa_nama: ""
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalView = value
        },
        viewModal(state, value) {
            state.lkd = value
        }
    }
})
