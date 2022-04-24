const loginState = document.querySelector(".login_state");
const logoutState = document.querySelector(".logout_state");

let db_userName = null;
let db_userEmail = null;
let isLogin = false;

// const checkLogin = () => {
firebase.auth().onAuthStateChanged((user) => {
  console.log(user, "after user");
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
// };
// checkLogin();
// export default checkLogin;
