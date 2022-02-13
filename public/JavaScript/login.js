const loginState = document.querySelector(".login_state");
const logoutState = document.querySelector(".logout_state");

let db_userName = null;
let db_userEmail = null;
let isLogin = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    isLogin = true;
    userUid = user.uid;
    loginState.style.display = "none";
    logoutState.style.display = "block";
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((res) => {
        db_userName = res.data().nickname;
        db_userEmail = res.data().email;
      });
  } else {
    isLogin = false;
    loginState.style.display = "block";
    logoutState.style.display = "none";
  }
});
