<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Quản lý sinh viên</v-toolbar-title>
      <v-divider class="mx-2"></v-divider>
      <v-spacer></v-spacer>
      <v-dialog persistent v-model="dialogEdit" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Sửa thông tin sinh viên</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="editedItem.full_name" label="Tên"></v-text-field>
                  <v-text-field v-model="editedItem.sex" label="Giới tính"></v-text-field>
                  <v-text-field v-model="editedItem.course" label="Khoá học"></v-text-field>
                  <v-text-field v-model="editedItem.phone" label="Số điện thoại"></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  <v-text-field v-model="editedItem.cmnd_number" label="Số chứng minh"></v-text-field>
                  <v-text-field v-model="editedItem.birthday" label="Ngày sinh"></v-text-field>
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

      <v-dialog persistent v-model="dialogListRoom" max-width="900px">
        <v-card>
          <v-card-title>
            <span class="headline">Danh sách phòng trống</span>
          </v-card-title>

          <v-data-table :headers="headers2" :items="dessertsRoom" class="elevation-10">
            <template v-slot:items="props">
              <td>{{ props.item.name_room }}</td>
              <td class="text-sm-left">{{ props.item.building }}</td>
              <td class="text-sm-left">{{ props.item.room_gender }}</td>
              <td class="text-sm-left">{{ props.item.current_student }}</td>
              <td class="text-sm-left">{{ props.item.max_student }}</td>
              <td class="text-center layout px-0 center">
                <div class="my-2">
                  <v-btn
                    small
                    color="blue-grey lighten-4"
                    @click="addStudent(props.item.id_room)"
                  >Thêm vào</v-btn>
                </div>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" @click="close">Huỷ Bỏ</v-btn>
        </v-card-actions>
      </v-dialog>
    </v-toolbar>
    <v-toolbar flat color="white">
      <div>
        Sinh viên đang chờ duyệt phòng:
        <input
          class="mx-2"
          type="checkbox"
          v-model="getStudentFree"
          @change="getStudentFree2(getStudentFree)"
        />
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        class="mx-2"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        v-model="search.text"
        @change="search()"
      ></v-text-field>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-10">
      <template v-slot:items="props">
        <td>{{ props.item.full_name }}</td>
        <td class="text-sm-left">{{ props.item.birthday }}</td>
        <td class="text-sm-left">{{ props.item.sex === 1? 'Nam' : 'Nữ' }}</td>
        <td class="text-sm-left">{{ props.item.course }}</td>
        <td class="text-sm-left">{{ props.item.status === 0? 'OutRoom' : 'InRoom'}}</td>
        <td class="text-sm-left">{{ props.item.phone }}</td>
        <td class="text-center layout px-0 center">
          <div class="my-2">
            <v-btn small color="amber lighten-1" @click="editStudent(props.item)">Sửa</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="red darken-1" @click="deleteItem(props.item)">Xóa</v-btn>
          </div>
          <div class="my-2">
            <v-btn
              small
              :disabled="props.item.status === 1 ? true : false"
              color="blue-grey lighten-4"
              @click="addRoom(props.item.id_student)"
            >Phòng</v-btn>
          </div>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn small color="blue-grey lighten-4" @click="initialize">Tải lại danh sách</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data: () => ({
    id_student: 0,
    getStudentFree: false,
    dialogListRoom: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      {
        text: "Tên",
        width: "20%",
        sortable: false,
        value: "full_name"
      },
      { text: "Ngày sinh", value: "birthday" },
      { text: "Giới tính", value: "sex" },
      { text: "Khoá học", value: "course" },
      { text: "Trạng thái", value: "status", sortable: true },

      { text: "Số điện thoại", value: "phone", sortable: false },
      { text: "Thực Thi", value: "actions", sortable: false, width: 50 }
    ],
    headers2: [
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
        sortable: false,
        width: 50
      }
    ],
    dessertsRoom: [],
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
    dialogDelete(val) {
      val || this.close();
    },

    dialogEdit(val) {
      val || this.close();
    },
    dialogListRoom(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initializeRoom() {
      axios.get("/admin_room/check-by-free").then(res => {
        this.dessertsRoom = res.data.data;
      });
    },
    initialize() {
      axios.get("/admin_student").then(res => {
        this.desserts = res.data.data;
      });
    },

    addRoom(id_student) {
      this.initializeRoom();
      this.id_student = id_student;
      this.dialogListRoom = true;
    },
    addStudent(id_room) {
      axios
        .get(`admin_student/add-student/${id_room}/${this.id_student}`)
        .then(async () => {
          alert("Thành công");
          await this.initialize();
        });
    },
    search() {
      axios.post(`admin_student/find-student/${this.search.text}`).then(res => {
        this.desserts = res.data.data;
      });
    },
    editStudent(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },
    alertDelete(item) {
      this.dialogDelete = true;
      return item;
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
        axios.delete(`/admin_student/${item.id_student}`).then(() => {
          this.desserts.splice(index, 1);
        });

        this.dialogDelete = false;
      }
      return item;
    },

    close() {
      this.dialogEdit = false;
      this.dialogListRoom = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    getStudentFree2(status) {
      if (status === true) {
        axios.get("/admin_student/free").then(res => {
          this.desserts = res.data.data;
        });
      }
      if (status === false) {
        this.initialize();
      }
    },
    update() {
      try {
        axios
          .put(`/admin_student/${this.editedItem.id_student}`, this.xItem)
          .then(() => {
            this.close();
            this.$swal.fire({
              icon: "success",
              title: "Sửa thông tin phòng thành công",
              timer: 2000
            });
          });
      } catch (error) {
        alert(error);
      }
    },
    save() {
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
