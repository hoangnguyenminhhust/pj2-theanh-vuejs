<template>
  <div>
    <b-row>
      <b-col cols="3">
        <b-card>
          <b-card-header>
            <div class="header" style="font-size: 18px;">Thông tin phòng</div>
          </b-card-header>
          <b-card-body>
            <div class="text--primary"><strong>Họ và tên:</strong> {{ studentInfo[0].full_name }}</div>
            <div class="text--primary"><strong>Email:</strong> {{ studentInfo[0].email }}</div>
            <div class="text--primary"><strong>Phone:</strong> {{ studentInfo[0].phone }}</div>
            <div class="text--primary"><strong>Khóa</strong> {{ studentInfo[0].course }}</div>
            <div class="text--primary"><strong>Ngày Sinh:</strong> {{ studentInfo[0].birthday }}</div>
            <div class="text--primary"><strong>CMND:</strong> {{ studentInfo[0].cmnd_number }}</div>
          </b-card-body>
        </b-card>
      </b-col>
            <b-col cols="8">
        <b-card>
          <b-card-header style="display: flex; justify-content: space-between">
            <div class="header" style="font-size: 18px;">Sinh viên</div>
          </b-card-header>
          <b-card-body v-if="roomate">
            <v-data-table :headers="headers2" :items="roomate">
              <template v-slot:items="props">
                <td class="text-sm-left">{{ props.item.full_name }}</td>
                <td class="text-sm-left">{{ props.item.email }}</td>
                <td class="text-sm-left">{{ props.item.cmnd_number }}</td>
                <td class="text-sm-left">{{ formatDate(props.item.birthday) }}</td>
                <td class="text-sm-left">{{ props.item.course }}</td>
              </template>
            </v-data-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "../../axios";
import moment from 'moment';

export default {
  data: () => ({
    studentInfo: {},
    roomate: [],
    headers2: [
      {
        text: "Tên sinh viên",
        sortable: false,
        value: "full_name"
      },
      {
        text: "Email",
        sortable: false,
        value: "email"
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
        width: 50
      },
    ]
  }),

  methods: {
    formatDate(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY");
    },
  },
  async created() {
    const studentRes = await axios.get('/student_student');
    const roomateRes = await axios.get('/student_student/roomate');
    this.studentInfo = studentRes.data.data;
    this.roomate = roomateRes.data.data;
  }
};
</script>
