const loginState = qs(".login_state");
const logoutState = qs(".logout_state");

let db_userName = "비회원";
let db_userEmail = null;
let isLogin = false;
let userUid = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    isLogin = true;
    userUid = user.uid;
    hide(loginState);
    show(logoutState, "block");

    db.collection("users")
      .doc(userUid)
      .get()
      .then((res) => {
        db_userName = res.data().nickname;
        db_userEmail = res.data().email;
      });
  } else {
    isLogin = false;
    show(loginState, "block");
    hide(logoutState);
  }
});
