<template>
  <div>
    <div style="margin-bottom: 80px; padding: 10px;">
      <b-button style="float: right" variant="warning" @click="$router.push('/')">Quay lại</b-button>
    </div>
    <b-row>
      <b-col cols="4">
        <b-card>
          <b-card-header>
            <div class="header" style="font-size: 18px;">Thông tin phòng</div>
          </b-card-header>
          <b-card-body>
            <div class="text--primary"><strong>Toà nhà:</strong> {{ roomInfo.building }}</div>
            <div class="text--primary"><strong>Mã phòng:</strong> {{ roomInfo.name_room }}</div>
            <div class="text--primary"><strong>Loại phòng:</strong> {{ roomInfo.room_gender === 'm' ? 'Nam' : 'Nữ' }}</div>
            <div class="text--primary"><strong>Số sinh viên hiện tại:</strong> {{ roomInfo.current_student }}</div>
            <div class="text--primary"><strong>Số sinh viên tối đa:</strong> {{ roomInfo.max_student }}</div>
            <div class="text--primary"><strong>Trạng thái phòng:</strong><span style="color: green"> {{ roomInfo.room_status === 1 ? 'Đang hoạt động' : 'Chưa hoạt động' }}</span></div>
            <div class="text--primary"><strong>Giá phòng:</strong> {{ roomInfo.room_price }}</div>
            <div class="text--primary"><strong>Diện tích phòng:</strong> {{ roomInfo.room_size }}</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="8">
        <b-card>
          <b-card-header style="display: flex; justify-content: space-between">
            <div class="header" style="font-size: 18px;">Sinh viên</div>
            <div>
              <b-button variant="primary" @click="addStudentDialog = true">Thêm</b-button>
            </div>
          </b-card-header>
          <b-card-body>
            <v-data-table :headers="headers2" :items="existStudents">
              <template v-slot:items="props">
                <td>{{ props.item.full_name }}</td>
                <td class="text-sm-left">{{ props.item.cmnd_number }}</td>
                <td class="text-sm-left">{{ formatDate(props.item.birthday) }}</td>
                <td class="text-sm-left">{{ props.item.course }}</td>
                <td class="text-center layout px-0 center">
                  <div class="my-2">
                    <v-btn
                      small
                      color="error"
                      @click="deleteStudentOutRoom(props.item)"
                    >Xóa</v-btn>
                  </div>
                </td>
              </template>
            </v-data-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <div>
      <v-dialog v-model="addStudentDialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">Thêm sinh viên</v-card-title>
          <v-card-text>
            <v-select
              v-model="studentId"
              :items="freeStudents"
              label="Tên"
              item-value="id_student"
              item-text="full_name"
              required
              :rules="[v => !!v || 'Không được để trống']"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="addStudentToRoom()">Thêm</v-btn>
            <v-btn color="error" text @click="addStudentDialog = false">Hủy</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
import moment from 'moment';

export default {
  data: () => ({
    studentId: "",
    addStudentDialog: false,
    roomInfo: {},
    freeStudents: [],
    existStudents: [],
    headers2: [
      {
        text: "Tên sinh viên",
        sortable: false,
        value: "full_name"
      },
      {
        text: "CMND",
        value: "cmnd_number",
      },
      {
        text: "Ngày sinh",
        value: "birthday",
        width: 50
      },
      {
        text: "Khoá học",
        value: "course",
      },
      {
        text: "Thực Thi",
        value: "actions",
        sortable: false,
        width: 50
      }
    ]
  }),

  methods: {
    async initailData() {
      // axios
      //   .get(`admin_room/room/${this.$route.params.id}`)
      //   .then(res => (this.roomInfo = res.data.data[0]));
      // axios
      //   .get("/admin_student/free")
      //   .then(res => (this.freeStudents = res.data.data));
      const res = await Promise.all([
        axios.get(`admin_room/room/${this.$route.params.id}`),
        axios.get("admin_student/free"),
        axios.get(`admin_room/get-list-student/${this.$route.params.id}`)
      ]);
      this.roomInfo = res[0].data.data[0];
      this.freeStudents = res[1].data.data;
      this.existStudents = res[2].data.data;
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

    formatDate(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY");
    },

    async addStudentToRoom() {
      await axios.get(
        `/admin_student/add-student/${this.$route.params.id}/${this.studentId}`
      );
      this.addStudentDialog = false;
      this.studentId = "";
      await this.initailData();
      this.$swal.fire({
        icon: "success",
        title: "Thêm sinh viên thành công",
        timer: 2000
      });
    }
  },

  async created() {
    await this.initailData();
  }
};
</script>