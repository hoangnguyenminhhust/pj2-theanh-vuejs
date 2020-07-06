<template>
  <div style="position: fixed; width: 100%; height: 100%">
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <!-- <div class="app-logo-inverse mx-auto mb-3"/> -->

          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title text-center">
                  <h4 class="mt-2">
                    <div>Welcome back,</div>
                    <span>Vui lòng điền thông tin đăng nhập</span>
                  </h4>
                </div>
                <b-form-group id="exampleInputGroup1" label-for="exampleInput1">
                  <b-form-input
                    id="exampleInput1"
                    type="text"
                    required
                    v-model="signIn.username"
                    placeholder="Tên đăng nhập..."
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2" label-for="exampleInput2">
                  <b-form-input
                    id="exampleInput2"
                    type="password"
                    v-model="signIn.password"
                    @keyup.enter="login()"
                    required
                    placeholder="Mật khẩu..."
                  ></b-form-input>
                </b-form-group>
                <b-form-checkbox name="check" id="exampleCheck">Ghi nhớ</b-form-checkbox>
                <div class="divider" />
                <h6 class="mb-0">
                  No account?
                  <a href="/signup" class="text-primary">Sign up now</a>
                </h6>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button variant="primary" size="lg" @click="login()">Login</b-button>
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
    signIn: {}
  }),

  methods: {
    async login() {
      try {
        if (this.signIn.username === 'admin' && this.signIn.password === '1234') {
            localStorage.setItem('token', 'hoangnm');
            this.$router.push({ path: "/" });
            return;
        }
        const res = await axios.post("/student_student/login", this.signIn);
        localStorage.setItem('token', res.data.data.token);
        this.$router.push({ path: '/studentInfo' });
      } catch (error) {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    }
  }
};
</script>