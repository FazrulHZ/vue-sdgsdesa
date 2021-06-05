import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        penduduk: {
            penduduk_id: "",
            penduduk_nik: "",
            penduduk_nama: "",
            penduduk_kelamin: "",
            penduduk_tempatlahir: "",
            penduduk_tgllahir: "",
            penduduk_umur: "",
            penduduk_kawin: "",
            penduduk_agama: "",
            penduduk_suku: "",
            penduduk_wn: "",
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
            state.penduduk = value
        }
    }
})
