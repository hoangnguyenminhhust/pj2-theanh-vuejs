<template>
  <div class="body">
    <!-- Header -->
    <header>
      <div class="container">
        <div class="logo-container">
          <a href>
            <img src="../../assets/images/homepage/logo.png" alt="logo" />
          </a>
        </div>
        <div class="login-button">
          <a href="/signup">
            <button class="f-heading">Sign up</button>
          </a>
          <a href="/signin">
            <button class="f-heading">Sign in</button>
          </a>
        </div>
      </div>
    </header>
    <!-- Banner -->
    <div id="menu">
      <div class="container">
        <!-- Menu -->
        <nav class="f-content">
          <div>
            <a href>
              <i class="fas fa-home"></i>
            </a>
          </div>
          <div onclick="directTo('#introduction')">Introduction</div>
          <div onclick="directTo('#aboutus')">About us</div>
          <div onclick="directTo('#contact')">Contact</div>
        </nav>
      </div>
    </div>
    <!-- Content -->
    <div id="header-content">
      <div class="container">
        <div class="f-content">
          <h2>LET US HELP YOU FIND YOUR DREAM ROOM!!</h2>
        </div>
      </div>
    </div>
    <div id="main-content">
      <!--content1-->
      <div id="introduction" class="container">
        <div class="header-content">
          <div class="f-heading">
            <h4>INTRODUCTION</h4>
          </div>
          <div class="f-content">
            <h3>Our website will help you find the room that best suits your requirements in our dormitory.</h3>
          </div>
        </div>
        <div class="image-content">
          <img
            src="http://kenh14cdn.com/2017/20292629-1092606424202925-5645121901939929709-n-1501232138873.jpg"
            alt
          />
        </div>
      </div>

      <!--content2-->

      <!--content3-->
      <div id="contact" class="container">
        <div class="header-content">
          <div class="f-heading">
            <h4>CONT ACT</h4>
          </div>
          <div class="f-content">
            <h3>
              All your contributions should be sent to the email box: teamGINP15
              Thank you!
            </h3>
          </div>
        </div>
        <div class="image-content">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69m38MLs5vzvScwS5mM0zBdXxjGFTNhD6OB4wjlV2D5C48-M9"
            alt
          />
        </div>
      </div>
    </div>
    <!--footer-->
    <footer class="f-content">
      <p>Địa chỉ: Số 1 Đại Cồ Việt - Hà Nội</p>
      <p>Address: NO.1 Dai Co Viet street - Ha Noi</p>
    </footer>
    <div class="modals">
      <b-modal id="sign-up" title="Đăng kí">
        <p class="my-4"></p>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    signUp: {},
    signIn: {}
  }),
  methods: {

  }
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  /* border: 1px red solid; */
}

body {
  background: #ffffff;
}
</style>
