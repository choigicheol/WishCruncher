// 로그아웃 실행
logoutState.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then((res) => {
      window.location.replace("index.html");
      userUid = null;
    });
});
loginState.style.display = "block";
logoutState.style.display = "none";
