const storage = firebase.storage();
var clientData = [];
const item_Input = document.querySelectorAll(".add_Item_Input");
var item_Image_File = document.querySelector("#upload_Photo_Input");
const thumb_Image = document.querySelector("#thumb_Image");

item_Image_File.addEventListener("change", () => {
  item_Image_File.files[0].preview = URL.createObjectURL(
    item_Image_File.files[0]
  );
  thumb_Image.setAttribute("src", item_Image_File.files[0].preview);
  upload_Plus_Image.style.display = "none";
  thumb_Image.style.display = "block";
});

function uploadClientDatabaseItem(uploadUrl) {
  let item_Input_Data = {
    제품: item_Input[0].value,
    가격: `${item_Input[1].value} 원`,
    위시레벨: selectWishLevel.value,
    imagePath: uploadUrl,
  };
  if (
    item_Input[0].value.length > 0 &&
    item_Input[1].value.length > 0 &&
    selectWishLevel.value > 0
  ) {
    clientData.push(item_Input_Data);
    add_To_Item_List(item_Input_Data);
  }
  item_Input[0].value = null;
  item_Input[1].value = null;
  selectWishLevel.value = 0;
  upload_Plus_Image.style.display = "block";
  thumb_Image.style.display = "none";
  item_Image_File.value = null;
}
function uploadUserDatabaseItem(uploadUrl) {
  let item_Input_Data = {
    제품: item_Input[0].value,
    가격: `${item_Input[1].value} 원`,
    위시레벨: selectWishLevel.value,
    imagePath: uploadUrl,
  };
  if (
    item_Input[0].value.length > 0 &&
    item_Input[1].value.length > 0 &&
    selectWishLevel.value > 0
  ) {
    db.collection("users")
      .doc(userUid)
      .collection("wish")
      .get()
      .then((res) => {
        if (res.size > 0) {
          const lastItemId = res.docs[res.size - 1].data().id;
          item_Input_Data["id"] = lastItemId + 1;
          db.collection("users")
            .doc(userUid)
            .collection("wish")
            .doc(`item${lastItemId + 1}`)
            .set(item_Input_Data);
        } else {
          empty_Box.style.display = "none";
          item_Input_Data["id"] = res.size + 10;
          db.collection("users")
            .doc(userUid)
            .collection("wish")
            .doc(`item${res.size + 10}`)
            .set(item_Input_Data);
        }
      })
      .then((res) => {
        add_To_Item_List(item_Input_Data);
      })
      .then((res) => {
        item_Input[0].value = null;
        item_Input[1].value = null;
        selectWishLevel.value = 0;
        upload_Plus_Image.style.display = "block";
        thumb_Image.style.display = "none";
        item_Image_File.value = null;
      });
  }
}

// 등록버튼 눌렀을 때 위시리스트 추가
regi_Item.addEventListener("click", (e) => {
  var uploadUrl = `https://firebasestorage.googleapis.com/v0/b/wishcruncher.appspot.com/o/image%2FnoImage.png?alt=media&token=94dc86de-37ec-4971-8dbb-f15e5ce82a35`;
  e.preventDefault();
  if (userLogin) {
    if (item_Image_File.files[0]) {
      var storageRef = storage.ref();
      var imagePath = storageRef.child(
        "image/" + userUid + item_Image_File.files[0].name
      );
      var uploadImage = imagePath.put(item_Image_File.files[0]);
      uploadImage.on(
        "state_changed",
        null,
        (error) => {},
        () => {
          uploadImage.snapshot.ref.getDownloadURL().then((url) => {
            uploadUserDatabaseItem(url);
          });
        }
      );
    } else {
      uploadUserDatabaseItem(uploadUrl);
    }
  } else {
    if (item_Image_File.files[0]) {
      uploadClientDatabaseItem(item_Image_File.files[0].preview);
    } else {
      uploadClientDatabaseItem(uploadUrl);
    }
  }
});
