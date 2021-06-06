<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Data Lembaga Kemasyaratan Desa</h3>
          <v-spacer></v-spacer>
          <CModalAdd />
        </v-row>
      </v-card>
    </div>

    <div>
      <v-alert v-model="alertBerhasil" type="success" dense dismissible>
        {{ alertMassage }}
      </v-alert>
      <v-alert v-model="alertGagal" type="error" dense dismissible>
        {{ alertMassage }}
      </v-alert>
    </div>

    <v-data-table
      :headers="headers"
      :items="lkds"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <CModalView />
        <CModalEdit />
        <CModalDelete />
      </template>
      <template v-slot:[`item.nomor`]="{ item }">
        {{
          lkds
            .map(function(x) {
              return x.lkd_id;
            })
            .indexOf(item.lkd_id) + 1
        }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-1" @click="viewItem(item)">
          mdi-archive
        </v-icon>
        <v-icon small class="mr-1" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CModalAdd from "@/components/lkd/modalAdd";
import CModalEdit from "@/components/lkd/modalEdit";
import CModalDelete from "@/components/lkd/modalDelete";
import CModalView from "@/components/lkd/modalView";

import modalView from "@/store/lkd/modalView";
import modalEdit from "@/store/lkd/modalEdit";
import modalHapus from "@/store/lkd/modalHapus";
import refreshView from "@/store/lkd/viewLkd";

export default {
  components: {
    CModalAdd,
    CModalEdit,
    CModalDelete,
    CModalView,
  },
  computed: {
    refresh: {
      get() {
        return refreshView.state.Refresh;
      },
    },
    alertMassage: {
      get() {
        return refreshView.state.alertMassage;
      },
    },
    success: {
      get() {
        return refreshView.state.success;
      },
      set(value) {
        refreshView.commit("alert", value);
      },
    },
    alertBerhasil: {
      get() {
        return refreshView.state.alertBerhasil;
      },
      set(value) {
        refreshView.commit("berhasilAlert", value);
      },
    },
    alertGagal: {
      get() {
        return refreshView.state.alertGagal;
      },
      set(value) {
        refreshView.commit("gagalAlert", value);
      },
    },
  },
  watch: {
    refresh() {
      this.getData();
      setTimeout(() => {
        this.alertGagal = false;
        this.alertBerhasil = false;
      }, 5000);
    },
  },
  data: () => ({
    lkds: [],
    lkd: {},
    viewIndex: "",
    editedIndex: "",
    dleteIndex: "",
    headers: [
      {
        text: "No",
        value: "nomor",
        width: "50px",
        align: "center",
        sortable: false,
      },
      { text: "Nama LKD", align: "start", value: "lkd_nama" },
      { text: "Desa", align: "start", value: "desa_nama" },
      { text: "Kecamatan", align: "start", value: "kecamatan_nama" },
      { text: "Kabupaten", align: "start", value: "kabupaten_nama" },
      { text: "Action", value: "action", width: "100px" },
    ],
  }),
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "lkd")
        .then((res) => {
          refreshView.commit("refreshData", false);
          this.lkds = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewItem(item) {
      this.viewIndex = this.lkds.indexOf(item);
      this.lkd = Object.assign({}, item);
      modalView.commit("toggleModal", true);
      modalView.commit("viewModal", Object.assign({}, item));
    },
    editItem(item) {
      this.editedIndex = this.lkds.indexOf(item);
      this.lkd = Object.assign({}, item);
      modalEdit.commit("toggleModal", true);
      modalEdit.commit("viewModal", Object.assign({}, item));
    },
    deleteItem(item) {
      this.dleteIndex = this.lkds.indexOf(item);
      this.lkd = Object.assign({}, item);
      modalHapus.commit("toggleModal", true);
      modalHapus.commit("viewModal", Object.assign({}, item));
    },
  },
};
</script>
