<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Import Fontawsome -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <!-- Import Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat|Roboto" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet">
  <!-- Import CSS -->
  <link rel="stylesheet" href="../css/style.css" >
  <!-- Import Logo -->
  <link rel="icon" href="../images/logoWeb.png">
  <!-- Title -->
  <title>DomManagement</title>
</head>
<body>
  <!-- Header -->
  <header>
    <div class="container">
      <div class="logo-container">
          <a href="">
            <img src="../images/logo.png" alt="logo">
          </a>
      </div>
      <div class="login-button">
        <a href="http://localhost:8080/#/student">
            <button class="f-heading">Sign up</button>
        </a>
        <a href="/login_student">
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
          <a href=""><i class="fas fa-home"></i></a>
        </div>
        <div onclick="directTo('#introduction')">Introduction</div>
        <div onclick="directTo('#aboutus')">About us</div>
        <div onclick="directTo('#contact')">Contact</div>
      </nav>
    </div>
  </div>
  <!-- Content -->
  <div id = "header-content">
    <div class = "container">
      <div class = "f-content">
        <h2>LET US HELP YOU FIND YOUR DREAM ROOM!!</h2>
      </div>
    </div>
  </div>
  <div id="main-content">

    <!--content1-->
    <div id="introduction" class = "container">
      <div class="header-content">
        <div class = "f-heading">
          <h4>INTRODUCTION</h4>
        </div>
        <div class ="f-content">
          <h3>Our website will help you find the room that best suits your requirements in our dormitory.</h3>
        </div>
      </div>
      <div class = "image-content" >
          <img src="http://kenh14cdn.com/2017/20292629-1092606424202925-5645121901939929709-n-1501232138873.jpg" alt="">
      </div>
    </div>

    <!--content2-->
    

    <!--content3-->
    <div id="contact" class = "container">
      <div  class ="header-content">
        <div class = "f-heading">
          <h4>CONT  ACT</h4>
        </div>
        <div class = "f-content">
          <h3>
              All your contributions should be sent to the email box: teamGINP15
              Thank you!</h3>
        </div>
      </div>
      <div class ="image-content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69m38MLs5vzvScwS5mM0zBdXxjGFTNhD6OB4wjlV2D5C48-M9" alt="">
      </div>
    </div>
  </div>
  <!--footer-->
  <footer class="f-content">
    <p>
      Địa chỉ: Số 1 Đại Cồ Việt - Hà Nội
    </p>
    <p>
      Address: NO.1 Dai Co Viet street - Ha Noi
    </p>
  </footer>
  <!-- <script src="../js/index.js"></script> -->
</body>
</html>

<script>
export default {};
</script>