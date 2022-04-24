const arrRandomText = [
  //50년 이상
  ["이번생에는 포기하는거로...", "크게 버리는 사람만이 크게 얻을 수 있다!!", "안되겠죠?"],

  //1년
  ["상당히 소박하시네요", "혹시 월 여유금액에 0 하나 더 들어간건 아닌지?", "이정도는 암산도 되지않나요?", "노잼"],
];

// 사이드바 금액 ++
const totalMoney = document.querySelector("#money_input");
const moneyButton = document.querySelectorAll(".money_button");
for (let i = 0; i < moneyButton.length; i++) {
  moneyButton[i].addEventListener("click", (e) => {
    if (!totalMoney.value) {
      totalMoney.value = "0";
    }
    let total = totalMoney.value.split(",").join("");
    if (e.target.name === "won1000000") {
      total = parseInt(total) + 1000000;
    } else if (e.target.name === "won100000") {
      total = parseInt(total) + 100000;
    } else if (e.target.name === "won50000") {
      total = parseInt(total) + 50000;
    } else if (e.target.name === "won10000") {
      total = parseInt(total) + 10000;
    }
    totalMoney.value = makePriceComma(String(total));
  });
}

totalMoney.addEventListener("keyup", (e) => {
  makePrice(e);
});

// 사이드바 위시 레벨 조정 버튼 event 등록
const sidebarWishLevel = document.querySelector("#wish_level");
const wishLevelOperationButton = document.querySelectorAll(".wish_level_operation_button");
for (let i = 0; i < wishLevelOperationButton.length; i++) {
  wishLevelOperationButton[i].addEventListener("click", (e) => {
    if (e.target.name === "wish_level_plus" && parseInt(sidebarWishLevel.innerHTML) < 10) {
      sidebarWishLevel.innerHTML = parseInt(sidebarWishLevel.innerHTML) + 1;
    }
    if (e.target.name === "wish_level_minus" && parseInt(sidebarWishLevel.innerHTML) > 0) {
      sidebarWishLevel.innerHTML = parseInt(sidebarWishLevel.innerHTML) - 1;
    }
  });
}

// clear 버튼
const clearButton = document.querySelector("#clear_button");
clearButton.addEventListener("click", () => {
  totalMoney.value = 0;
});

// 소수점 comma 만들기
function makeDecimalNumComma(num) {
  return makePriceComma(num.slice(0, num.length - 2)) + num.slice(-2);
}

const sidebarSubmitButton = document.querySelector("#sidebar_submit_button");
const wishLevel = document.querySelector("#wish_level");
let sumPrice = 0;
let resultMonth;
const wishListContainer = document.querySelector(".wish_list_container");

// 계산 결과 보여주는 함수
function showResult(numTotalMoney) {
  wishListContainer.removeChild(wishListContainer.firstChild);
  resultMonth = (sumPrice / numTotalMoney).toFixed(1);

  const nowDate = new Date().getTime();
  const resultYear = (resultMonth / 12).toFixed(1);

  let resultDay = (resultYear * 365).toFixed(0);
  if (resultYear === "0.0") {
    resultDay = (Number(resultMonth) * 31).toFixed(0);
  }
  const resultHour = (resultDay * 24).toFixed(0);
  const resultMillisecond = resultHour * 3600 * 1000;
  const commaSumPrice = makePriceComma(String(sumPrice));
  const commaNumTotalMoney = makePriceComma(String(numTotalMoney));
  const finishDay = new Date(nowDate + resultMillisecond);
  const finishYear = finishDay.getFullYear();
  const finishMonth = finishDay.getMonth() + 1;
  const finishDate = finishDay.getDate();

  //
  const result_Container = document.createElement("div");
  result_Container.setAttribute("id", "result_Container");
  //
  const username_Box = document.createElement("div");
  username_Box.setAttribute("id", "username_Box");
  if (db_userName) {
    username_Box.textContent = `${db_userName} 님,`;
  } else {
    username_Box.textContent = `비회원 님,`;
  }
  //
  const total_Info = document.createElement("div");
  total_Info.setAttribute("id", "total_Info");

  const total_Wish_Money_Box = document.createElement("div");
  total_Wish_Money_Box.textContent = `💸 목표 금액 : ${commaSumPrice} 원`;
  const total_Finish_Date_Box = document.createElement("div");
  total_Finish_Date_Box.textContent = `⏰ 예상 완료일 : ${finishYear}년 ${finishMonth}월 ${finishDate}일`;

  total_Info.append(total_Wish_Money_Box, total_Finish_Date_Box);

  // 결과 글 컨테이너
  const result_Text_Info_Container = document.createElement("div");
  result_Text_Info_Container.setAttribute("id", "result_Text_Info_Container");

  // 걸리는 년 수 text
  const result_Year_Info_Box = document.createElement("div");
  const result_Year_Info_Text_Head = document.createElement("span");
  const result_Year_Info_Text_Middle = document.createElement("span");
  const result_Year_Info_Text_Tail = document.createElement("span");
  const result_Total_Money = document.createElement("span");
  const result_Year = document.createElement("span");

  result_Total_Money.classList.add("result_Bold_Text");
  result_Year.classList.add("result_Bold_Text");

  result_Year_Info_Text_Head.textContent = "목표 위시리스트를 이루기위해 매월 ";
  result_Year_Info_Text_Middle.textContent = " 원씩 때려넣어야 ";
  result_Year_Info_Text_Tail.textContent = " 년이 걸립니다.";
  result_Total_Money.textContent = commaNumTotalMoney;
  result_Year.textContent = makeDecimalNumComma(resultYear);
  result_Year_Info_Box.append(
    result_Year_Info_Text_Head,
    result_Total_Money,
    result_Year_Info_Text_Middle,
    result_Year,
    result_Year_Info_Text_Tail
  );

  // 걸리는 개월 수 text
  const result_Month_Info_Box = document.createElement("div");
  const result_Month_Info_Text_Head = document.createElement("span");
  result_Month_Info_Text_Head.textContent = "이는, 개월수 로는 ";
  const result_Month = document.createElement("span");
  result_Month.classList.add("result_Bold_Text");
  result_Month.textContent = `${makeDecimalNumComma(resultMonth)} 개월`;
  result_Month_Info_Box.append(result_Month_Info_Text_Head, result_Month);

  // 걸리는 일 수 text
  const result_Day_Info_Box = document.createElement("div");

  const result_Day_Info_Text_Head = document.createElement("span");
  result_Day_Info_Text_Head.textContent = "일수로는 ";
  const result_Day = document.createElement("span");
  result_Day.classList.add("result_Bold_Text");
  result_Day.textContent = `${makePriceComma(resultDay)} 일`;
  result_Day_Info_Box.append(result_Day_Info_Text_Head, result_Day);

  // 걸리는 시간 text
  const result_Hour_Info_Box = document.createElement("div");
  const result_Hour_Info_Text_Head = document.createElement("span");
  result_Hour_Info_Text_Head.textContent = "시간으로는 ";
  const result_Hour_Info_Text_Tail = document.createElement("span");
  result_Hour_Info_Text_Tail.textContent = " 입니다.";
  const result_Hour = document.createElement("span");
  result_Hour.classList.add("result_Bold_Text");
  result_Hour.textContent = `${makePriceComma(resultHour)} 시간`;
  result_Hour_Info_Box.append(result_Hour_Info_Text_Head, result_Hour, result_Hour_Info_Text_Tail);

  const randomTextContainer = document.createElement("div");
  randomTextContainer.setAttribute("id", "randomTextContainer");

  // text Info => Container에 append
  const randomText = document.createElement("div");
  randomText.classList.add("angry_Text");
  if (50 <= resultYear) {
    const angryText = document.createElement("div");
    //TODO:
    angryText.textContent = "- 한줄평 -";

    randomText.textContent = arrRandomText[0][Math.round(Math.random() * (arrRandomText[0].length - 1))];
    randomTextContainer.append(angryText, randomText);
  } else if (0 <= resultYear && resultYear <= 1) {
    const angryText = document.createElement("div");
    // TODO:
    angryText.textContent = "- 한줄평 -";
    randomText.textContent = arrRandomText[1][Math.round(Math.random() * (arrRandomText[1].length - 1))];
    randomTextContainer.append(angryText, randomText);
  }

  result_Text_Info_Container.append(
    result_Year_Info_Box,
    result_Month_Info_Box,
    result_Day_Info_Box,
    result_Hour_Info_Box,
    randomTextContainer
  );

  result_Container.append(username_Box, total_Info, result_Text_Info_Container);
  wishListContainer.prepend(result_Container);
  const shareKakao = document.querySelector("#share_kakao");
  shareKakao.style.display = "inline-flex";
}

sidebarSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const numTotalMoney = parseInt(totalMoney.value.split(",").join(""));
  if (numTotalMoney > 0) {
    if (isLogin) {
      db.collection("users")
        .doc(userUid)
        .collection("wish")
        .get()
        .then((res) => {
          sumPrice = 0;
          res.forEach((item) => {
            if (item.data().state === 0) {
              const itemPriceData = item.data()["가격"];
              const itemLevel = item.data()["위시레벨"];
              const itemPrice = itemPriceData.slice(0, itemPriceData.length - 2);
              if (parseInt(wishLevel.innerHTML) <= itemLevel) {
                sumPrice += parseInt(itemPrice.split(",").join(""));
              }
            }
          });
        })
        .then((res) => {
          showResult(numTotalMoney);
        });
    } else {
      sumPrice = 0;
      clientData.forEach((item) => {
        const itemPriceData = item["가격"];
        const itemLevel = item["위시레벨"];
        const itemPrice = itemPriceData.slice(0, itemPriceData.length - 2);
        if (parseInt(wishLevel.innerHTML) <= itemLevel) {
          sumPrice += parseInt(itemPrice.split(",").join(""));
        }
      });
      showResult(numTotalMoney);
    }
  }
});
