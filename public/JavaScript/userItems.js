const editDeleteIcon = `<img
        src="../Images/edit_Icon.svg"
        alt="edit_icon"
        class="edit_Button"
      />
      <img
        src="../Images/delete_Icon.svg"
        alt="delete_icon"
        class="delete_button"
      />`;

const finishDeleteIcon = `<img
        src="../Images/finishButton.png"
        alt="finish_icon"
        class="finish_button"
      />
      <img
        src="../Images/deleteWishButton.png"
        alt="delete_icon"
        class="delete_button"
      />`;

const removeIcon = `<img
        src="../Images/deleteWishButton.png"
        alt="remove_icon"
        class="remove_button"
      />`;

const rewindIcon = `<img
        src="../Images/rewindButton.png"
        alt="rewind_icon"
        class="rewind_button"
      />`;

const finishItems = document.querySelector("#finish_items");
const unfinishedItems = document.querySelector("#unfinished_items");
const deleteItems = document.querySelector("#delete_items");

// 위시리스트 카테고리별 다른 버튼을 제공
const itemBtnHandle = (btnType, node) => {
  node.lastChild.remove();
  const buttonBox = document.createElement("div");
  buttonBox.setAttribute("id", "button");
  buttonBox.classList.add(btnType);
  // 메인페이지 기본타입 버튼
  if (btnType === "edit_button_box") {
    buttonBox.innerHTML = editDeleteIcon;
    buttonBox.firstChild.addEventListener("click", (e) => {
      // const categoryBox = node.querySelectorAll(".item_category_box");
      // const itemContents = node.querySelectorAll(".item_category_content");
      // itemContents.forEach((contents, idx) => {
      //   // const test = node.querySelector(".item_contents");
      //   const editInput = document.createElement("input");
      //   editInput.classList.add("test");
      //   editInput.value = contents.textContent;
      //   categoryBox[idx].replaceChild(editInput, itemContents[idx]);
      // });
    });
    buttonBox.lastChild.addEventListener("click", (e) => {
      const itemReset = document.querySelectorAll(".item_box");
      itemReset.forEach((item) => {
        if (item.id === node.id) {
          item.remove();
        }
      });

      if (isLogin) {
        db.collection("users").doc(userUid).collection("wish").doc(`item${node.id}`).delete();
      }

      if (!user_item_area.childElementCount) {
        showEmptyItem(user_item_area);
      }
    });

    // mypage 남은위시 버튼
  } else if (btnType === "finish_delete_box") {
    buttonBox.innerHTML = finishDeleteIcon;

    // 남은위시 => 이뤄낸 위시
    buttonBox.firstChild.addEventListener("click", (e) => {
      e.preventDefault();
      // 버튼 교체
      buttonBox.innerHTML = removeIcon;
      node.style.opacity = 0.3;
      // 카테고리 이동
      finishItems.appendChild(buttonBox.parentElement);
      checkEmptyBox();
      if (finishEmpty) {
        finishEmpty.remove();
      }
      wishCount();
      // 데이터 수정
      db.collection("users").doc(userUid).collection("wish").doc(`item${node.id}`).update({ state: 1 });
    });

    // 남은위시 => 버린 위시
    buttonBox.lastChild.addEventListener("click", (e) => {
      // 버튼 교체
      buttonBox.innerHTML = rewindIcon;
      // 카테고리 이동
      deleteItems.appendChild(buttonBox.parentElement);
      makeProgressGraph();
      checkEmptyBox();

      if (deleteEmpty) {
        deleteEmpty.remove();
      }
      wishCount();
      // 데이터 수정
      db.collection("users").doc(userUid).collection("wish").doc(`item${node.id}`).update({ state: 2 });
    });

    // mypage 이뤄낸 위시 버튼
  } else if (btnType === "finish_box") {
    buttonBox.innerHTML = removeIcon;

    buttonBox.firstChild.addEventListener("click", (e) => {
      e.preventDefault();
      db.collection("users").doc(userUid).collection("wish").doc(`item${node.id}`).delete();
      buttonBox.parentElement.remove();
    });

    // mypage 버린 위시 버튼
  } else {
    buttonBox.innerHTML = rewindIcon;

    buttonBox.firstChild.addEventListener("click", (e) => {
      buttonBox.classList.remove("delete_box");
      // 버튼 교체
      itemBtnHandle(
        "finish_delete_box",
        deleteItems.querySelector(`#${buttonBox.parentElement.id}`),
        buttonBox.parentElement.id
      );
      // 카테고리 이동
      unfinishedItems.appendChild(buttonBox.parentElement);
      // 데이터 수정
      makeProgressGraph();
      wishCount();
      db.collection("users").doc(userUid).collection("wish").doc(`item${node.id}`).update({ state: 0 });
    });
  }
  node.append(buttonBox);
};

// item이 없을때 보여줄 텍스트
function showEmptyItem(node) {
  const empty_box = document.createElement("div");
  empty_box.setAttribute("id", "empty_box");
  empty_box.textContent = "정보가 없습니다.";
  node.append(empty_box);
}

// 위시리스트 박스 생성
function showItemList(item, node, btnType) {
  const item_box = document.createElement("div");
  item_box.classList.add("item_box");
  item_box.setAttribute("id", item.id);

  const newItem = {
    name: item["제품"],
    price: item["가격"],
    level: item["위시레벨"],
  };

  item_box.innerHTML = `
        <div class="photo_Box">
          <img src=${item.imagePath} alt="item_Image" />
        </div>
        <div class="item_contents">
          <div class="item_category_box">
            <span class="item_category">제품</span>
            <span class="item_category_content">${newItem.name}</span>
          </div>
          <div class="item_category_box">
            <span class="item_category">가격</span>
            <span class="item_category_content">${newItem.price}</span>
          </div>
          <div class="item_category_box">
            <span class="item_category">위시레벨</span>
            <span class="item_category_content">${newItem.level}</span>
          </div>
        </div>
        <div id="button"></div>`;
  if (btnType === "finish_box") {
    item_box.style.opacity = "0.3";
  }
  itemBtnHandle(btnType, item_box);
  node.prepend(item_box);
}
