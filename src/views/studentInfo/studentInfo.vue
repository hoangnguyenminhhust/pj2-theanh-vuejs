<template>
  <div>
    
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data: () => ({
    studentInfo: {},
    roomate: {}
  }),

  async created() {
    const studentRes = await axios.get('/student_student');
    const roomateRes = await axios.get('/student_student/roomate');
    this.studentInfo = studentRes.data.data;
    this.roomate = roomateRes.data.data
  }
};
</script>
