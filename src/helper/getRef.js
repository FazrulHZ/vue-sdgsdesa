/* eslint-disable space-before-function-paren */

import axios from 'axios'

export default {
    Kabupaten: async () => {
        const url = process.env.VUE_APP_API_BASE + 'refkabupaten'
        const response = await axios.get(url)
        return response.data.data
    },

    Kecamatan: async (kabupaten_id) => {
        const url = process.env.VUE_APP_API_BASE + 'refkecamatan/' + kabupaten_id
        const response = await axios.get(url)
        return response.data.data
    },

    Desa: async (kecamatan_id) => {
        const url = process.env.VUE_APP_API_BASE + 'refdesa/' + kecamatan_id
        const response = await axios.get(url)
        return response.data.data
    },

    RT: async (desa_id) => {
        const url = process.env.VUE_APP_API_BASE + 'refrt/' + desa_id
        const response = await axios.get(url)
        return response.data.data
    }
}
