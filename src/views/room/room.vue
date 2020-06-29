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
      <v-dialog persistent v-model="dialogEdit" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Sửa thông tin phòng</span>
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
      <!-- <v-dialog persistent v-model="dialogListStudent" max-width="900px">
        <v-card>
          <v-card-title>
            <span class="headline">Danh sách SV</span>
          </v-card-title>

          <v-data-table :headers="headers2" :items="dessertsSv" class="elevation-10">
            <template v-slot:items="props">
              <td>{{ props.item.full_name }}</td>
              <td class="text-sm-left">{{ props.item.cmnd_number }}</td>
              <td class="text-sm-left">{{ props.item.birthday }}</td>
              <td class="text-sm-left">{{ props.item.course }}</td>
              <td class="text-sm-left">{{ props.item.status }}</td>
              <td class="text-center layout px-0 center">
                <div class="my-2">
                  <v-btn small color="red darken-1" @click="deleteStudentOutRoom(props.item)">Delete</v-btn>
                </div>
              </td>
            </template>
          </v-data-table>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="light-blue darken-3" @click="addSvRoom()">Thêm Sv</v-btn>
            <v-btn small color="red darken-1" @click="close">Huỷ Bỏ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>-->
      <v-dialog persistent v-model="dialogView" max-width="500px">
        <v-card class="mx-auto" max-width="500">
          <v-card-text>
            <p class="display-1 text--primary">Thông tin chi tiết phòng</p>
            <p>---------------------------------------------------------------------------------------------------------</p>
            <div class="text--primary">Toà nhà: {{ xItem.building }}</div>
            <div class="text--primary">Mã phòng: {{ xItem.name_room }}</div>
            <div class="text--primary">Loại phòng: {{ xItem.room_gender === 'm' ? 'Nam' : 'Nữ' }}</div>
            <div class="text--primary">Số sinh viên hiện tại: {{ xItem.current_student }}</div>
            <div class="text--primary">Số sinh viên tối đa: {{ xItem.max_student }}</div>
            <div class="text--primary">Trạng thái phòng: {{ xItem.room_status }}</div>
            <div class="text--primary">Giá phòng: {{ xItem.room_price }}</div>
            <div class="text--primary">Diện tích phòng: {{ xItem.room_size }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              small
              color="blue-grey lighten-4"
              @click="viewListStudent(xItem)"
            >Xem Danh sách sinh viên</v-btn>
            <v-btn small color="red darken-1" @click="close">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-toolbar flat color="white">
      <div>
        Phòng Còn Trống:
        <input
          class="mx-2"
          type="checkbox"
          v-model="getRoomFree"
          @change="getRoomFree2(getRoomFree)"
        />
      </div>
      <div>
        Phòng Hư Hại:
        <input
          class="mx-2"
          type="checkbox"
          v-model="getRoomDisable"
          @change="getRoomDisable2(getRoomDisable)"
        />
      </div>
    </v-toolbar>
    <v-toolbar flat color="white">
      <v-select
        v-model="selectionTypeBuilding"
        :items="listBuildings"
        @change="filterByBuilding(selectionTypeBuilding)"
        label="Toà Nhà"
      ></v-select>

      <v-spacer></v-spacer>

      <v-select
        v-model="selectionTypeRoom"
        :items="listRooms"
        label="Phòng"
        @change="filterByBuildingAndRoom(selectionTypeBuilding,selectionTypeRoom)"
      ></v-select>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-10">
      <v-btn small color="light-blue darken-3" @click="save">Lưu</v-btn>
      <template v-slot:items="props">
        <td>{{ props.item.name_room }}</td>
        <td class="text-sm-left">{{ props.item.building }}</td>
        <td class="text-sm-left">{{ props.item.room_gender === 'm' ? 'Nam' : 'Nữ' }}</td>
        <td class="text-sm-left">{{ props.item.current_student }}</td>
        <td class="text-sm-left">{{ props.item.max_student }}</td>
        <td class="text-center layout px-0 center">
          <div class="my-2">
            <v-btn small color="amber lighten-1" @click="editItem(props.item)">Sửa</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="red darken-1" @click="deleteItem(props.item)">Xóa</v-btn>
          </div>
          <div class="my-2">
            <v-btn
              small
              color="blue-grey lighten-4"
              @click="$router.push(`/room/${props.item.id_room}`)"
            >Chi tiết</v-btn>
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
  data: () => ({
    getRoomFree: false,
    getRoomDisable: false,
    selectionTypeRoom: true,
    selectionTypeBuilding: true,
    dessertsSv: [],
    listBuildings: ["B3", "B4", "B5", "B6", "B7", "B8"],
    listRooms: [],
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
        sortable: false,
        align: "center",
        width: 70
      }
    ],
    headers2: [
      {
        text: "Tên Sv",
        width: "20%",
        sortable: false,
        value: "full_name"
      },
      {
        text: "CMND",
        value: "cmnd_number"
      },
      {
        text: "Ngày sinh",
        value: "birthday"
      },
      {
        text: "Khoá học",
        value: "course"
      },
      {
        text: "Trạng thái",
        value: "status"
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
    },
    dialogListStudent(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initializeSv(id_room) {
      axios.get(`/admin_room/get-list-student/${id_room}`).then(res => {
        this.dessertsSv = res.data.data;
      });
    },
    initialize() {
      axios.get("/admin_room").then(res => {
        this.desserts = res.data.data;
      });
    },
    async viewListStudent(item) {
      await this.initializeSv(item.id_room);
      this.editedIndex = this.dessertsSv.indexOf(item);
      this.xItem = Object.assign({}, item);
      this.dialogListStudent = true;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.xItem = Object.assign({}, item);
      this.dialogEdit = true;
    },

    async deleteStudentOutRoom(item) {
      const alert = await this.$swal.fire({
        title: "Chắc chắn ?",
        text: "Bạn có muốn xoá sinh viên khỏi phòng",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
      if (alert.value) {
        const index = this.dessertsSv.indexOf(item);
        this.dessertsSv.splice(index, 1);
        this.dialogDelete = false;
      }
    },
    async deleteItem(item) {
      const alert = await this.$swal.fire({
        title: "Chắc chắn ?",
        text: "Bạn muốn xoá phòng này",
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
      this.dialogListStudent = false;
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
        axios.post(`/admin_room`, this.xItem).then(() => {});
      }
      this.close();
    },
    update() {
      try {
        axios
          .put(`/admin_room/room/${this.xItem.id_room}`, this.xItem)
          .then(() => {
            this.close();
            this.$swal.fire({
              icon: "success",
              title: "Thêm sinh viên thành công",
              timer: 2000
            });
          });
      } catch (error) {
        alert(error);
      }
    },
    getRoomFree2(status) {
      if (status === true) {
        axios.get("/admin_room/check-by-free").then(res => {
          this.getRoomDisable = false;

          this.desserts = res.data.data;
        });
      }
      if (status === false) {
        this.initialize();
      }
    },
    getRoomDisable2(status) {
      if (status === true) {
        axios.get("/admin_room/check-by-fail").then(res => {
          this.getRoomFree = false;

          this.desserts = res.data.data;
        });
      }
      if (status === false) {
        this.initialize();
      }
    },
    filterByBuilding(building) {
      axios.get(`/admin_room/check-by-building/${building}`).then(res => {
        this.desserts = res.data.data;
        const newArr = [];
        res.data.data.map(e => {
          newArr.push(e.name_room);
        });
        this.listRooms = newArr;
      });
    },

    filterByBuildingAndRoom(building, room) {
      axios
        .get(`/admin_room/check-by-building-room/${building}/${room}`)
        .then(res => {
          this.desserts = res.data.data;
        });
    },
    addSvRoom() {}
  }
};
</script>
