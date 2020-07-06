<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Quản lý phí trọ</v-toolbar-title>
      <v-divider class="mx-2"></v-divider>
      <v-spacer></v-spacer>
      <v-dialog persistent v-model="dialogAdd" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="light-blue darken-3" dark class="mb-2" v-on="on">Thêm Phí</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Thêm Phí</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select :items="xItem.room_name" label="Phòng" dense></v-select>
                </v-col>
                <v-flex xs12>
                  <v-text-field v-model="xItem.price_fee" label="Giá Sinh Hoạt"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="xItem.start" label="Ngày bắt đầu"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="xItem.end" label="Ngày kết thúc"></v-text-field>
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
            <span class="headline">Sửa Phí</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.date" label="Ngày hết hạn"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.price_fee" label="Giá phí"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.payment_status" label="Trạng thái"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.date_payment" label="Ngày thanh toán"></v-text-field>
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
                  <v-text-field v-model="xItem.full_name" label="Sinh viên"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.date" label="Ngày hết hạn"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.price_fee" label="Giá Phí"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.payment_status" label="Trạng thái"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="xItem.date_payment" label="Ngày thanh toán"></v-text-field>
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
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-10">
      <template v-slot:items="props">
        <td>{{ props.item.full_name }}</td>
        <td class="text-sm-left">{{ props.item.date }}</td>
        <td class="text-sm-left">{{ props.item.price_fee }}</td>
        <td class="text-sm-left">{{ props.item.payment_status }}</td>
        <td class="text-sm-left">{{ props.item.date_payment }}</td>
        <td class="text-center layout px-0 center">
          <div class="my-2">
            <v-btn small color="amber lighten-1" @click="editItem(props.item)">Edit</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="red darken-1" @click="deleteItem(props.item)">Delete</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="blue-grey lighten-4" @click="confirm(props.item)">Confirm</v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="blue-grey lighten-4" @click="history(props.item)">History</v-btn>
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
    dialogAdd: false,
    dialogDelete: false,
    dialogView: false,
    dialogEdit: false,
    headers: [
      {
        text: "Sinh viên",
        width: "20%",
        sortable: false,
        value: "full_name"
      },
      {
        text: "Ngày hết hạn",
        value: "date"
      },
      {
        text: "Giá phí",
        value: "price_fee"
      },
      {
        text: "Trạng thái",
        value: "payment_status"
      },
      {
        text: "Ngày thanh toán",
        value: "date_payment"
      },
      {
        text: "Thực thi",
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
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("/admin_fee").then(res => {
        this.desserts = res.data.data;
      });
    },
    async history(item) {
      axios.delete(`/admin_fee/history/${item.id_student}`).then(() => {});
    },
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
        axios.delete(`/admin_fee/${item.id_fee}`).then(() => {
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
    async confirm(item) {
      try {
        await axios
          .put(`/admin_fee/confirm_fee/${item.id_fee}`)
          .then(this.initialize());

        await this.initialize();
        this.close();
        this.$swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          timer: 2000
        });
      } catch (error) {
        alert(error);
      }
      axios.put(`/admin_fee/confirm_fee/${item.id_fee}`).then(res => {
        this.desserts = res.data.data;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.xItem);
      } else {
        this.desserts.push(this.xItem);
      }
      this.close();
    },
    async update() {
      try {
        await axios.put(
          `/admin_fee/${this.editedItem.id_fee}`,
          this.editedItem
        );
        await this.initialize();
        this.close();
        this.$swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          timer: 2000
        });
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>
