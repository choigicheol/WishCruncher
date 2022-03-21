function makeHeader() {
  const header = document.querySelector("#header_container");
  header.innerHTML = `
      <nav id="header_area">
        <div class="header_menu">
          <a id="header_logo" href="index.html"
            ><img src="../Images/logo.png"
          /></a>
        </div>
        <div class="header_menu header_text_menu">
          <span class="home_text_menu"> <a href="index.html">Home</a></span>
          <span class="mypage_text_menu">MyPage</span>
        </div>
        <div class="header_menu login_menu">
          <span><a class="login_state" href="login.html">Login</a></span>
          <span class="logout_state">Logout</span>
        </div>
      </nav>`;
}

makeHeader();
