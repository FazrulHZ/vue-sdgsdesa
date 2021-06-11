<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Data User</h3>
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
      :items="users"
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
          users
            .map(function(x) {
              return x.user_id;
            })
            .indexOf(item.user_id) + 1
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
import Cookie from "@/helper/cookie.js";

import CModalAdd from "@/components/user/modalAdd";
import CModalEdit from "@/components/user/modalEdit";
import CModalDelete from "@/components/user/modalDelete";
import CModalView from "@/components/user/modalView";

import modalView from "@/store/user/modalView";
import modalEdit from "@/store/user/modalEdit";
import modalHapus from "@/store/user/modalHapus";
import refreshView from "@/store/user/viewUser";

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
    token: "",

    users: [],
    user: {},

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
      { text: "NIK", align: "start", value: "user_ktp" },
      { text: "Nama User", align: "start", value: "user_nama" },
      { text: "Telepon", align: "start", value: "user_tlp" },
      { text: "Action", value: "action", width: "100px" },
    ],
  }),

  async mounted() {
    this.token = await Cookie.get("token");
    this.getData();
  },
  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + "user", {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          refreshView.commit("refreshData", false);
          this.users = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    viewItem(item) {
      this.viewIndex = this.users.indexOf(item);
      this.user = Object.assign({}, item);
      modalView.commit("toggleModal", true);
      modalView.commit("viewModal", Object.assign({}, item));
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.user = Object.assign({}, item);
      modalEdit.commit("toggleModal", true);
      modalEdit.commit("viewModal", Object.assign({}, item));
    },

    deleteItem(item) {
      this.dleteIndex = this.users.indexOf(item);
      this.user = Object.assign({}, item);
      modalHapus.commit("toggleModal", true);
      modalHapus.commit("viewModal", Object.assign({}, item));
    },
  },
};
</script>
