// 로그아웃 실행
logoutState.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then((res) => {
      window.location.replace("index.html");
    });
});
loginState.style.display = "block";
logoutState.style.display = "none";
