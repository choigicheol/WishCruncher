let userItems = [];
let allDeleteButton = document.querySelectorAll(".delete_Button");
let allItemBox = document.querySelectorAll(".item_Box");

// 매개변수로 item 객체를 받아 item_list에 추가 하는 함수
function add_To_Item_List(item) {
  const item_Box = document.createElement("div");
  const photo_Box = document.createElement("div");
  const item_Img = document.createElement("img");
  const item_Contents = document.createElement("div");
  const edit_Button_Box = document.createElement("div");
  const item_Edit_Img = document.createElement("img");
  const item_Delete_Img = document.createElement("img");
  item_Box.classList.add("item_Box");
  item_Box.setAttribute("id", item.id);
  photo_Box.classList.add("photo_Box");
  item_Contents.classList.add("item_Contents");
  edit_Button_Box.classList.add("edit_Button_Box");
  item_Img.setAttribute("src", item.imagePath);
  item_Img.setAttribute("alt", "item_Image");
  item_Edit_Img.setAttribute("src", "./Images/edit_Icon.svg");
  item_Edit_Img.setAttribute("alt", "edit_Icon");
  item_Edit_Img.classList.add("edit_Button");
  item_Edit_Img.setAttribute("id", item.id);
  item_Delete_Img.setAttribute("src", "./Images/delete_Icon.svg");
  item_Delete_Img.setAttribute("alt", "delete_Icon");
  item_Delete_Img.classList.add("delete_Button");
  item_Delete_Img.setAttribute("id", item.id);

  user_Item_Area.prepend(item_Box);
  item_Box.append(photo_Box, item_Contents, edit_Button_Box);
  photo_Box.append(item_Img);

  const newItem = {
    제품: item["제품"],
    가격: item["가격"],
    위시레벨: item["위시레벨"],
  };

  for (let key in newItem) {
    const item_Category_Box = document.createElement("div");
    const item_Category = document.createElement("span");
    const item_Category_content = document.createElement("span");
    item_Category_Box.classList.add("item_Category_Box");
    item_Category.classList.add("item_Category");
    item_Category_content.classList.add("item_Category_content");

    item_Contents.append(item_Category_Box);
    item_Category_Box.append(item_Category, item_Category_content);
    item_Category.textContent = key;
    item_Category_content.textContent = newItem[key];
  }

  edit_Button_Box.append(item_Edit_Img, item_Delete_Img);
  allDeleteButton = document.querySelectorAll(".delete_Button");
  allItemBox = document.querySelectorAll(".item_Box");

  // 위시리스트 삭제
  allDeleteButton.forEach((deleteBtn, idx) => {
    deleteBtn.addEventListener("click", (e) => {
      db.collection("users")
        .doc(userUid)
        .collection("wish")
        .doc(`item${e.target.id}`)
        .delete()
        .then((res) => {
          const itemReset = document.querySelectorAll(".item_Box");
          itemReset.forEach((item) => {
            item.remove();
          });
        })
        .then((res) => {
          db.collection("users")
            .doc(userUid)
            .collection("wish")
            .get()
            .then((res) => {
              if (!res.size) {
                showEmptyItem();
              } else {
                res.forEach((doc) => {
                  add_To_Item_List(doc.data());
                });
              }
            });
        });
    });
  });
}

// 데이터가 없을 때 나타낼 태그
function showEmptyItem() {
  const user_Item_Area = document.querySelector("#user_Item_Area");
  const empty_Box = document.createElement("div");
  empty_Box.setAttribute("id", "empty_Box");
  empty_Box.textContent = "정보가 없습니다.";
  user_Item_Area.append(empty_Box);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userUid = user.uid;
    db.collection("users")
      .doc(user.uid)
      .collection("wish")
      .get()
      .then((res) => {
        if (!res.size) {
          showEmptyItem();
        } else {
          res.forEach((doc) => {
            userItems.push(doc.data());
          });
          userItems.forEach((item) => {
            add_To_Item_List(item);
          });
        }
      });
  } else {
    userUid = null;
    if (!clientData.length) {
      showEmptyItem();
    } else {
    }
  }
});
