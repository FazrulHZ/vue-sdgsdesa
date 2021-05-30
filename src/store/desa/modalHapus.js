import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalHapus: false,
        desa: {
            desa_id: "",
            desa_nama: "",
            desa_slug: "",
            desa_email: "",
            desa_web: "",
            desa_fb: "",
            desa_twitter: "",
            desa_ig: "",
            desa_yt: "",
            desa_status_pemerintahan: "",
            desa_foto: "",
            kabupaten_id: "",
            kecamatan_id: "",
            created_at: "",
            kabupaten_nama: "",
            update_at: "",
            kecamatan_nama: ""
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalHapus = value
        },
        viewModal(state, value) {
            state.desa = value
        }
    }
})
