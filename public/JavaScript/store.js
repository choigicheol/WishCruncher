import { observable, observe } from "./observer.js";

const state = observable({ money: 0 });

const userInfo = observable({
  id: null,
  email: "null",
  nickname: "비회원",
  profileImg:
    "https://firebasestorage.googleapis.com/v0/b/wishcruncher.appspot.com/o/image%2Fbasic_Profile.png?alt=media&token=bec9d886-55d2-485d-8740-70bed7eb5239",
});

const item = observable({
  id: null,
  imagePath:
    "https://firebasestorage.googleapis.com/v0/b/wishcruncher.appspot.com/o/image%2FnoImage.png?alt=media&token=94dc86de-37ec-4971-8dbb-f15e5ce82a35",
  state: 0,
  price: null,
  level: null,
  name: null,
});

const testApp = document.querySelector("#testApp");

const render = () => {
  testApp.innerHTML = `
  `;
};

document.querySelectorAll(".money_button").forEach((button) => {
  button.addEventListener("click", (e) => {
    state.money = Number(e.target.name.slice(3));
  });
});

document.querySelector("#clear_button").addEventListener("click", (e) => {
  state.money = 0;
});

observe(render);
