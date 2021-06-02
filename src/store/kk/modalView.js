import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalView: false,
        rt: {
            rt_id: "",
            rt_nama: "",
            rt_ketua: "",
            rt_alamat: "",
            rt_tlp: "",
            rt_topografi: "",
            rt_jumlah_warga: "",
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
            state.rt = value
        }
    }
})
