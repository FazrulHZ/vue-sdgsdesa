import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalView: false,
        user: {
            user_id: "",
            user_ktp: "",
            user_nama: "",
            user_tlp: "",
            user_alamat: "",
            user_foto: "",
            created_at: ""
        }
    },

    mutations: {
        toggleModal(state, value) {
            state.modalView = value
        },
        viewModal(state, value) {
            state.user = value
        }
    }
})
