let allDeleteButton = document.querySelectorAll(".delete_button");
let allItemBox = document.querySelectorAll(".item_Box");

// 매개변수로 item 정보 및 node를 받아 node의 첫번째 자식으로 item 추가 하는 함수
function showItemList(item, node) {
  const item_Box = document.createElement("div");
  const photo_Box = document.createElement("div");
  const item_Img = document.createElement("img");
  const item_contents = document.createElement("div");
  const edit_Button_Box = document.createElement("div");
  const item_Edit_Img = document.createElement("img");
  const item_Delete_Img = document.createElement("img");
  item_Box.classList.add("item_Box");
  item_Box.setAttribute("id", item.id);
  photo_Box.classList.add("photo_Box");
  item_contents.classList.add("item_contents");
  edit_Button_Box.classList.add("edit_Button_Box");
  item_Img.setAttribute("src", item.imagePath);
  item_Img.setAttribute("alt", "item_Image");
  item_Edit_Img.setAttribute(
    "src",
    "https://firebasestorage.googleapis.com/v0/b/wishcruncher.appspot.com/o/image%2Fedit_Icon.svg?alt=media&token=f99ed243-b18c-4325-a8ac-b53502d01e32"
  );
  item_Edit_Img.setAttribute("alt", "edit_Icon");
  item_Edit_Img.classList.add("edit_Button");
  item_Edit_Img.setAttribute("id", `main_edit_${item.id}`);
  item_Delete_Img.setAttribute(
    "src",
    "https://firebasestorage.googleapis.com/v0/b/wishcruncher.appspot.com/o/image%2Fdelete_Icon.svg?alt=media&token=b33f7962-c6c2-49d3-ad34-a94d78042fd9"
  );
  item_Delete_Img.setAttribute("alt", "delete_Icon");
  item_Delete_Img.classList.add("delete_button");
  item_Delete_Img.setAttribute("id", `main_delete_${item.id}`);

  node.prepend(item_Box);
  item_Box.append(photo_Box, item_contents, edit_Button_Box);
  photo_Box.append(item_Img);

  const newItem = {
    제품: item["제품"],
    가격: item["가격"],
    위시레벨: item["위시레벨"],
  };

  for (let key in newItem) {
    const item_category_box = document.createElement("div");
    const item_Category = document.createElement("span");
    const item_Category_content = document.createElement("span");
    item_category_box.classList.add("item_category_box");
    item_Category.classList.add("item_Category");
    item_Category_content.classList.add("item_Category_content");

    item_contents.append(item_category_box);
    item_category_box.append(item_Category, item_Category_content);
    item_Category.textContent = key;
    item_Category_content.textContent = newItem[key];
  }

  edit_Button_Box.append(item_Edit_Img, item_Delete_Img);
  allDeleteButton = document.querySelectorAll(".delete_button");
  allItemBox = document.querySelectorAll(".item_Box");

  // 위시리스트 삭제
  allDeleteButton.forEach((deleteBtn, idx) => {
    deleteBtn.addEventListener("click", (e) => {
      const targetId = e.target.id;
      const targetIdNum = targetId.split("_")[2];
      const itemReset = document.querySelectorAll(".item_Box");
      itemReset.forEach((item) => {
        if (item.id === targetIdNum) {
          item.remove();
        }
      });
      if (isLogin) {
        db.collection("users").doc(userUid).collection("wish").doc(`item${targetIdNum}`).delete();
      } else {
        if (!clientData.length) {
          return showEmptyItem(user_item_area);
        }
        clientData.forEach((item, index) => {
          if (item.id === Number(targetIdNum)) {
            clientData.splice(index, 1);
          }
        });
      }
    });
  });
}

// 데이터가 없을 때 나타낼 안내창
function showEmptyItem(node) {
  const empty_box = document.createElement("div");
  empty_box.setAttribute("id", "empty_box");
  empty_box.textContent = "정보가 없습니다.";
  node.append(empty_box);
}
