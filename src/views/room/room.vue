<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Quản lý phòng trọ</v-toolbar-title>
      <v-divider class="mx-2"></v-divider>
      <v-spacer></v-spacer>
      <v-dialog persistent v-model="dialogAdd" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="light-blue darken-3" dark class="mb-2" v-on="on">Thêm phòng</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Thêm phòng</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.name_room" label="Mã phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.building" label="Dãy nhà"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_gender" label="Loại phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.max_student" label="Tối đa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_status" label="Trạng thái"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_price" label="Giá phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_size" label="Diện tích"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="light-blue darken-3" @click="save">Lưu</v-btn>
            <v-btn small color="red darken-1" @click="close">Huỷ Bỏ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Item</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.name_room" input="disabled" label="Mã phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.building" label="Dãy nhà"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_gender" label="Loại phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.max_student" label="Tối đa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_status" label="Trạng thái"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_price" label="Giá phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_size" label="Diện tích"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="light-blue darken-3" @click="update">Lưu</v-btn>
            <v-btn small color="red darken-1" @click="close">Huỷ Bỏ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent v-model="dialogView" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">View Item</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.name_room" label="Mã phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.building" label="Dãy nhà"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_gender" label="Loại phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.current_student" label="Số sinh viên"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.max_student" label="Tối đa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_status" label="Trạng thái"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_price" label="Giá phòng"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.room_size" label="Diện tích"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" @click="close">Cancel</v-btn>
            <v-btn small color="blue-grey lighten-4" @click="close">Xem Ds</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-toolbar flat color="white">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <div>
        Phòng Còn Trống:
        <input
          class="mx-2"
          type="checkbox"
          v-model="getRoomFree"
          v-on-change="getRoomFree"
        />
      </div>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-10">
      <v-btn small color="light-blue darken-3" @click="save">Lưu</v-btn>
      <template v-slot:items="props">
        <td>{{ props.item.name_room }}</td>
        <td class="text-sm-left">{{ props.item.building }}</td>
        <td class="text-sm-left">{{ props.item.room_gender }}</td>
        <td class="text-sm-left">{{ props.item.current_student }}</td>
        <td class="text-sm-left">{{ props.item.max_student }}</td>
        <td class="text-center layout px-0 center">
          <div class="my-2">
            <v-btn small color="amber lighten-1" @click="editItem(props.item)">Edit</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="red darken-1" @click="deleteItem(props.item)">Delete</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="blue-grey lighten-4" @click="viewItem(props.item)">Views</v-btn>
          </div>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn small color="light-blue darken-3" @click="initialize">Tải lại danh sách</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  getRoomFree: false,
  data: () => ({
    dialogAdd: false,
    dialogDelete: false,
    dialogView: false,
    dialogEdit: false,
    headers: [
      {
        text: "Mã phòng",
        width: "20%",
        sortable: false,
        value: "name_room"
      },
      {
        text: "Dãy nhà",
        value: "building"
      },
      {
        text: "Loại phòng",
        value: "room_gender"
      },
      {
        text: "Số người",
        value: "current_student"
      },
      {
        text: "Tối đa",
        value: "max_student"
      },
      {
        text: "Thực Thi",
        value: "actions",
        sortable: false
      }
    ],
    desserts: [],
    editedIndex: -1,
    xItem: {
      name: "",
      age: 0,
      gender: "",
      course: 0,
      room: ""
    },
    defaultItem: {
      name: "",
      age: 0,
      gender: "",
      course: 0,
      room: ""
    }
  }),

  computed: {
    getRoomFree: () => {
      axios.get("/admin_room/check-by-free").then(res => {
        this.desserts = res.data.data;
      });
    }
  },

  watch: {
    dialogAdd(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.close();
    },
    dialogView(val) {
      val || this.close();
    },
    dialogEdit(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("/admin_room").then(res => {
        this.desserts = res.data.data;
      });
    },

    // getRoomFree() {
    //   axios.get("/admin_room/check-by-free").then(res => {
    //     this.desserts = res.data.data;
    //   });
    // },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.xItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    async deleteItem(item) {
      const alert = await this.$swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
      if (alert.value) {
        const index = this.desserts.indexOf(item);
        axios.delete(`/admin_room/room/${item.id_room}`).then(() => {
          this.desserts.splice(index, 1);
        });
        this.dialogDelete = false;
      }
      return item;
    },
    viewItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.xItem = Object.assign({}, item);
      this.dialogView = true;
    },
    close() {
      this.dialogAdd = false;
      this.dialogDelete = false;
      this.dialogEdit = false;
      this.dialogView = false;
      setTimeout(() => {
        this.xItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.xItem);
      } else {
        this.desserts.push(this.xItem);
      }
      this.close();
    },
    update() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.xItem);
      } else {
        this.desserts.push(this.xItem);
      }
      this.close();
    }
  }
};
</script>