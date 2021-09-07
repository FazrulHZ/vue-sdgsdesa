import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalEdit: false,
        user: {
            user_id: "",
            user_ktp: "",
            user_nama: "",
            user_name: "",
            user_tlp: "",
            user_alamat: "",
            user_foto: "",
            user_lvl: "",
            created_at: ""
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalEdit = value
        },
        viewModal(state, value) {
            state.user = value
        }
    }
})
