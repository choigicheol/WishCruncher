const arrRandomText = [
  //50년 이상
  ["이번생에는 포기하는거로...", "크게 버리는 사람만이 크게 얻을 수 있다!!", "안되겠죠?"],

  //1년
  ["상당히 소박하시네요", "혹시 월 여유금액에 0 하나 더 들어간건 아닌지?", "이정도는 암산도 되지않나요?", "노잼"],
];

// 금액부분 comma (",") 지우고 숫자로 변환해주는 함수
const makeNumber = (str) => {
  return parseInt(str.split(",").join(""));
};

// 사이드바 금액 조정 버튼
const sidebar = document.querySelector("#side_bar");
const totalMoney = sidebar.querySelector("#money_input");
const moneyButton = document.querySelectorAll(".money_button");

moneyButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!totalMoney.value) {
      totalMoney.value = 0;
    }
    let total = makeNumber(totalMoney.value);

    total += makeNumber(e.target.textContent);

    totalMoney.value = makePriceComma(String(total));
  });
});

totalMoney.addEventListener("keyup", (e) => {
  makePrice(e);
});

// 사이드바 위시 레벨 조정 버튼 event 등록
const sidebarWishLevel = sidebar.querySelector("#wish_level");
const wishLevelOperationButton = sidebar.querySelectorAll(".wish_level_operation_button");
let level;
wishLevelOperationButton[0].addEventListener("click", () => {
  level = parseInt(sidebarWishLevel.textContent);
  if (level > 0) {
    sidebarWishLevel.textContent = level - 1;
  }
});

wishLevelOperationButton[1].addEventListener("click", () => {
  level = parseInt(sidebarWishLevel.textContent);
  if (level < 10) {
    sidebarWishLevel.textContent = level + 1;
  }
});

// clear 버튼
const clearButton = sidebar.querySelector("#clear_button");
clearButton.addEventListener("click", () => {
  totalMoney.value = 0;
});

// 소수점 comma 만들기
function makeDecimalNumComma(num) {
  return makePriceComma(num.slice(0, num.length - 2)) + num.slice(-2);
}

const sidebarSubmitButton = sidebar.querySelector("#sidebar_submit_button");
const wishLevel = sidebar.querySelector("#wish_level");
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
  const result_container = document.createElement("div");
  result_container.setAttribute("id", "result_container");
  result_container.innerHTML = `
    <div id="username_Box">${db_userName} 님,</div>
    <div id="total_Info">
      <div>💸 목표 금액 : ${commaSumPrice} 원</div>
      <div>⏰ 예상 완료일 : ${finishYear}년 ${finishMonth}월 ${finishDate}일</div>
    </div>
    <div id="result_Text_Info_Container">
        <p>
        목표 위시리스트를 이루기위해 매월 <span class="result_bold_text">${commaNumTotalMoney}</span> 원씩 때려넣어야 
        <span class="result_bold_text">${makeDecimalNumComma(resultYear)}</span> 년이 걸립니다.
        </p>
      <p>
        이는, 개월수 로는 <span class="result_bold_text">${makeDecimalNumComma(resultMonth)} 개월</span>
      </p>
      <p>
        일수로는 <span class="result_bold_text">${makePriceComma(resultDay)} 일</span>
      </p>
      <p>
        시간으로는 <span class="result_bold_text">${makePriceComma(resultHour)} 시간</span> 입니다.
      </p>
      <div id="randomTextContainer">
        <div> - 한줄평 - </div>
      </div>
    </div>
    `;

  // 한줄평 붙이기
  const randomTextContainer = result_container.querySelector("#randomTextContainer");
  const randomText = document.createElement("div");
  randomText.classList.add("angry_text");

  if (50 <= resultYear) {
    randomText.textContent = arrRandomText[0][Math.round(Math.random() * (arrRandomText[0].length - 1))];
  } else if (0 <= resultYear && resultYear <= 1) {
    randomText.textContent = arrRandomText[1][Math.round(Math.random() * (arrRandomText[1].length - 1))];
  } else {
    randomTextContainer.style.display = "none";
  }
  randomTextContainer.append(randomText);

  wishListContainer.prepend(result_container);

  const shareKakao = document.querySelector("#share_kakao");
  shareKakao.style.display = "inline-flex";
}

sidebarSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const numTotalMoney = makeNumber(totalMoney.value);
  sumPrice = 0;
  if (numTotalMoney > 0) {
    if (isLogin) {
      db.collection("users")
        .doc(userUid)
        .collection("wish")
        .get()
        .then((res) => {
          res.forEach((item) => {
            if (item.data().state === 0) {
              const itemPriceData = item.data()["가격"];
              const itemLevel = item.data()["위시레벨"];
              const itemPrice = itemPriceData.slice(0, itemPriceData.length - 2);
              if (parseInt(wishLevel.textContent) <= itemLevel) {
                sumPrice += makeNumber(itemPrice);
              }
            }
          });
        })
        .then((res) => {
          showResult(numTotalMoney);
        });
    } else {
      clientData.forEach((item) => {
        const itemPriceData = item["가격"];
        const itemLevel = item["위시레벨"];
        const itemPrice = itemPriceData.slice(0, itemPriceData.length - 2);
        if (parseInt(wishLevel.textContent) <= itemLevel) {
          sumPrice += makeNumber(itemPrice);
        }
      });
      showResult(numTotalMoney);
    }
  }
});
