<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Quản lý phòng trọ</v-toolbar-title>
      <v-divider class="mx-2"></v-divider>
      <v-spacer></v-spacer>
      <v-dialog persistent v-model="dialogAdd" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="light-blue darken-1" dark class="mb-2" v-on="on">Thêm phòng</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Thêm phòng</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Tên"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.age" label="Tuổi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.gender" label="Giới tính"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.course" label="Khoá học"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.room" label="Phòng"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="light-blue darken-1" @click="save">Lưu</v-btn>
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
                  <v-text-field v-model="editedItem.name" label="Tên"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.age" label="Tuổi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.gender" label="Giới tính"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.course" label="Khoá học"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.room" label="Phòng"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="light-blue darken-1" @click="update">Lưu</v-btn>
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
                  <v-text-field v-model="editedItem.name" label="Tên"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.age" label="Tuổi"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.gender" label="Giới tính"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.course" label="Khoá học"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.room" label="Phòng"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" @click="close">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent v-model="dialogDelete" max-width="290">
        <v-card>
          <v-card-title class="headline">Bạn có muốn xoá phòng trọ này ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="light-blue darken-1" text @click="deleteItem(item)">Xác Nhận</v-btn>
            <v-btn color="red darken-1" text @click="close">Huỷ bỏ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-10">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-sm-left">{{ props.item.age }}</td>
        <td class="text-sm-left">{{ props.item.gender }}</td>
        <td class="text-sm-left">{{ props.item.course }}</td>
        <td class="text-sm-left">{{ props.item.room }}</td>
        <td class="text-center layout px-0 center">
          <div class="my-2">
            <v-btn small color="amber lighten-1" @click="editItem(props.item)">Edit</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="red darken-1" @click="alertDelete(props.item)">Delete</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="blue-grey lighten-4" @click="viewItem(props.item)">Views</v-btn>
          </div>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn small color="amber lighten-1" @click="initialize">Tải lại danh sách</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
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
        value: "name"
      },
      { text: "Dãy nhà", value: "name" },
      { text: "Loại phòng", value: "type" },
      { text: "Số người", value: "course" },
      { text: "Tối đa", value: "room" },
      { text: "Thực Thi", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
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

  computed: {},

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
      this.desserts = [
        {
          name: "Frozen Yogurt",
          age: 159,
          gender: "male",
          course: 12,
          room: "male"
        },
        {
          name: "Ice cream sandwich",
          age: 237,
          gender: "male",
          course: 12,
          room: "male"
        },
        {
          name: "Eclair",
          age: 262,
          gender: "male",
          course: 12,
          room: "male"
        },
        {
          name: "Cupcake",
          age: 305,
          gender: "male",
          course: 12,
          room: "male"
        },
        {
          name: "Gingerbread",
          age: 356,
          gender: "male",
          course: 11,
          room: "male"
        },
        {
          name: "Jelly bean",
          age: 375,
          gender: "male",
          course: 113,
          room: "male"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    alertDelete(item) {
      this.dialogDelete = true;
      return item;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      this.desserts.splice(index, 1);
      this.dialogDelete = false;
    },

    viewItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogView = true;
    },
    close() {
      this.dialogAdd = false;
      this.dialogDelete = false;
      this.dialogEdit = false;
      this.dialogView = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    update() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
