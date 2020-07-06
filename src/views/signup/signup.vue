<template>
  <div style="position: fixed; width: 100%; height: 100%">
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <!-- <div class="app-logo-inverse mx-auto mb-3" /> -->

          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title text-center">
                  <h4 class="mt-2">
                    <div>Welcome back,</div>
                    <span>Vui lòng điền thông tin đăng kí</span>
                  </h4>
                </div>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-form-input
                        type="email"
                        required
                        placeholder="Email..."
                        v-model="signUp.email"
                        :state="stateInput(signUp.email)"
                        aria-describedby="input-1-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-1-live-feedback">Email không được để trống</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        required
                        placeholder="Họ và tên..."
                        :state="stateInput(signUp.full_name)"
                        v-model="signUp.full_name"
                        aria-describedby="input-2-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-2-live-feedback">Tên không được để trống</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        required
                        placeholder="Ngày Sinh..."
                        :state="stateInput(signUp.birthday)"
                        v-model="signUp.birthday"
                        aria-describedby="input-3-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="input-3-live-feedback"
                      >Ngày sinh không được để trống</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        required
                        placeholder="Khóa..."
                        v-model="signUp.course"
                        :state="stateInput(signUp.course)"
                        aria-describedby="input-4-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback id="input-4-live-feedback">Khóa không được để trống</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        required
                        placeholder="Số điện thoại..."
                        v-model="signUp.phone"
                        :state="stateInput(signUp.phone)"
                        aria-describedby="input-5-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="input-5-live-feedback"
                      >Số điện thoại không được để trống</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        type="text"
                        required
                        placeholder="Chứng minh thư..."
                        v-model="signUp.cmnd_number"
                        :state="stateInput(signUp.cmnd_number)"
                        aria-describedby="input-6-live-feedback"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-invalid-feedback
                      id="input-6-live-feedback"
                    >Số chứng minh nhân dân không được để trống</b-form-invalid-feedback>
                  </b-col>
                  <b-col>
                    <b-form-group>
                      <b-form-group>
                        <b-form-input
                          id="exampleInput1"
                          type="text"
                          required
                          placeholder="Tên đăng nhập..."
                          v-model="signUp.username"
                          :state="stateInput(signUp.username)"
                          aria-describedby="input-7-live-feedback"
                        ></b-form-input>
                        <b-form-invalid-feedback
                          id="input-7-live-feedback"
                        >Số chứng minh nhân dân không được để trống</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-input
                        type="password"
                        required
                        placeholder="Mật khẩu..."
                        v-model="signUp.password"
                        :state="checkPassword(signUp.password)"
                        aria-describedby="input-8-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="input-8-live-feedback"
                        v-if="!confirmPassword"
                      >Mật khẩu không được để trống</b-form-invalid-feedback>
                      <b-form-invalid-feedback
                        id="input-8-live-feedback"
                        v-if="confirmPassword"
                      >Mật khẩu không trùng</b-form-invalid-feedback>
                    </b-form-group>
                    <!-- <b-form-invalid-feedback
                      id="input-8-live-feedback"
                      v-if="!checkPassword()"
                    >Mật khẩu và xác nhận không giống</b-form-invalid-feedback>-->
                    <b-form-group>
                      <b-form-input
                        id="exampleInput2"
                        type="password"
                        required
                        v-model="confirmPassword"
                        placeholder="Xác nhận mật khẩu..."
                        :state="stateInput(confirmPassword)"
                        aria-describedby="input-9-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="input-9-live-feedback"
                      >Xác nhận mật khẩu không được để trống</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div class="divider" />
                <h6 class="mb-0">
                  login?
                  <a href="/signin" class="text-primary">Go to login</a>
                </h6>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button variant="primary" size="lg" @click="submitSignUp()">Sign Up</b-button>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  data: () => ({
    signUp: {
      username: "",
      password: "",
      full_name: "",
      email: "",
      birthday: "",
      course: "",
      phone: "",
      cmnd_number: ""
    },
    confirmPassword: "",
    state: false
  }),

  methods: {
    stateInput(input) {
      if (this.state) return input ? null : false;
    },

    checkPassword(password) {
      if (this.state) {
        if (!password) {
          return false;
        }
        if (password !== this.confirmPassword) {
          return false;
        }
      }
      return null;
    },

    async submitSignUp() {
      this.state = true;
      let i;
      for (i in this.signUp) {
        if (!this.signUp[i]) return;
      }
      try {
        await axios.post("/student_student/signup", this.signUp);
        this.$swal.fire({
          icon: "success",
          title: "Đăng kí thành công",
          timer: 2000
        });
        this.state = false;
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>
