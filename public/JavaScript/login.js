const loginState = document.querySelector(".login_state");
const logoutState = document.querySelector(".logout_state");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loginState.style.display = "none";
    logoutState.style.display = "block";
  } else {
    loginState.style.display = "block";
    logoutState.style.display = "none";
  }
});
