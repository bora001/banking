const nav = document.getElementById("header");

window.addEventListener("scroll", function () {
  let scrollLocation = document.documentElement.scrollTop;
  if (scrollLocation >= nav.offsetHeight) {
    nav.classList.add("sticker");
  } else {
    nav.classList.remove("sticker");
  }
});

// modal

const openModal = document.querySelectorAll(".go_modal");
const modal = document.querySelector(".modal");
const exit = document.querySelectorAll(".modal .exit");
const signupForm = document.querySelector(".modal .sign_up_form");
const signonForm = document.querySelector(".modal .sign_on_form");
openModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnType = btn.innerText;
    if (btnType == "Open Account") {
      console.log("signup");
      signupForm.classList.remove("remove");
    } else {
      console.log("signon");
      signonForm.classList.remove("remove");
    }

    modal.classList.remove("remove");
  });
});

exit.forEach((exitBtn) => {
  exitBtn.addEventListener("click", () => {
    removeModal();
  });
});
const removeModal = () => {
  modal.classList.add("remove");
  signupForm.classList.add("remove");
  signonForm.classList.add("remove");
};

//login - test

const loginBtn = document.querySelectorAll(".login_btn");
const loginBox = document.querySelectorAll(".login_box .login_inner");

loginBtn.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
    if (btn.innerText == "Sign On") {
      console.log("lets login");
      loginAct();
      signupForm.reset();
      signonForm.reset();
    } else {
      console.log("lets logout");
    }
    loginBox.forEach((box) => {
      box.classList.toggle("remove");
    });
  });
});

const loginAct = () => {
  let userData = signonForm.querySelector("input[type='text']").value;
  let userPw = signonForm.querySelector("input[type='password']").value;
  console.log("heee", userData);
  removeModal();
  const intro = document.querySelector(".user_info span");

  intro.innerText = `${userData}`;
  console.log(intro.innerText);
};

// tab
const tabBtn = document.querySelectorAll("#sec3 .tab_btns .btn");
const tabBox = document.querySelectorAll("#sec3 .tab_box .tab");

tabBtn.forEach((btn, i, arr) => {
  tabBox[0].classList.add("active");
  btn.addEventListener("click", function () {
    let val = btn.attributes["data-tab"].value - 1;
    tabBox.forEach((box) => box.classList.remove("active"));
    tabBtn.forEach((btn) => btn.classList.remove("active"));

    btn.classList.add("active");
    tabBox[val].classList.add("active");
    // tabBox[val].style.zIndex = "9";
  });
});

//   box-shadow: 5px 5px 10px gray;

// slide

const prevArrow = document.querySelector("#sec4 .arrow_left");
const nextArrow = document.querySelector("#sec4 .arrow_right");
const ReviewCnt = document.querySelector("#sec4 .content_box");
const ReviewBox = document.querySelector("#sec4 .content_box .review_box");
const Review = document.querySelectorAll(
  "#sec4 .content_box .review_box .review"
);
const arrow = document.querySelectorAll("#sec4 .arrow");
let count = 0;
arrow.forEach((arr) => {
  arr.addEventListener("click", function () {
    if (arr.classList.contains("arrow_right")) {
      count < Review.length - 1 ? count++ : "";
    } else {
      count > 0 ? count-- : "";
    }

    // btn
    switch (count) {
      case 0:
        prevArrow.classList.add("off");
        break;
      case 3:
        nextArrow.classList.add("off");
        break;
      default:
        nextArrow.classList.remove("off");
        prevArrow.classList.remove("off");
        break;
    }

    const y = ReviewCnt.clientHeight;
    ReviewBox.style.transform = `translateY(-${y * count}px)`;
  });
});
