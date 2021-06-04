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
    },

    Jenkel: () => {
        const response =
            [
                {
                    id: "laki-laki",
                    nama: "Laki-laki",
                },
                {
                    id: "perempuan",
                    nama: "Perempuan",
                },
            ]
        return response
    },

    Status: () => {
        const response =
            [
                {
                    id: "belum kawin",
                    nama: "Belum Kawin",
                },
                {
                    id: "kawin",
                    nama: "Kawin",
                },
                {
                    id: "cerai hidup",
                    nama: "Cerai Hidup",
                },
                {
                    id: "cerai mati",
                    nama: "Cerai Mati",
                },
            ]
        return response
    },

    Agama: () => {
        const response =
            [
                {
                    id: "islam",
                    nama: "Islam",
                },
                {
                    id: "kristen",
                    nama: "Kristen",
                },
                {
                    id: "katolik",
                    nama: "Katolik",
                },
                {
                    id: "hindu",
                    nama: "Hindu",
                },
                {
                    id: "buddha",
                    nama: "Buddha",
                },
                {
                    id: "konghucu",
                    nama: "Konghucu",
                },
            ]
        return response
    },

    WN: () => {
        const response =
            [
                {
                    id: "wni",
                    nama: "Warga Negara Indonesia",
                },
                {
                    id: "wna",
                    nama: "Warga Negara Asing",
                }
            ]
        return response
    }
}
