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

// Open account
const signupBtn = signupForm.querySelector(".open_account");

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let userData = signupForm.querySelector("input[type='text']").value;
  let userPw = signupForm.querySelector(".password1").value;
  let userPwCheck = signupForm.querySelector(".password2").value;
  if (userData.length < 6 || userData.length > 15) {
    alert(
      "please make username longer than 6 letters and less than 15 letters"
    );
    return true;
  }
  if (userPw.length < 5) {
    alert("password has to be longer than 5 digits");
    return true;
  }
  if (userPw !== userPwCheck) {
    alert("password is incorrect");
    return true;
  }

  const data = `username=${userData}&password=${userPw}&balance=0`;
  // const data = { username: userData, password: userPw };

  fetch(localUrl + ":3000/register", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then((res) => res.json())
    .then((response) => console.log("Success:", JSON.stringify(response)))
    .catch((error) => console.error("Error:", error));

  signupForm.reset();
  removeModal();
});

// //login - test

const loginBtn = document.querySelectorAll(".login_btn");
const loginBox = document.querySelectorAll(".login_box .login_inner");
const mainCnt = document.querySelectorAll(".main_cnt");

// const signonBtn = signonForm.querySelector(".sign_on_form .sign_on");

loginBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.innerText == "Sign On") {
      console.log("lets login");
      loginAct();
      signupForm.reset();
      signonForm.reset();
    } else {
      console.log("lets logout");
      changeCtn();
    }
  });
});

const changeCtn = () => {
  loginBox.forEach((box) => {
    box.classList.toggle("remove");
  });
  mainCnt.forEach((cnt) => {
    cnt.classList.toggle("remove");
  });
};

//balance
const balance = document.querySelector("#login_page .account .balance span");
// let currentBalance = balance.innerHTML;
// let currentBalance = Number(balance.innerHTML);
// console.log("current Balance", currentBalance);
const intro = document.querySelector(".user_info span");

const loginAct = () => {
  let userData = signonForm.querySelector("input[type='text']").value;
  let userPw = signonForm.querySelector("input[type='password']").value;

  removeModal();

  //login-server
  const data = `username=${userData}&password=${userPw}`;

  fetch(localUrl + ":3000/login", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Success:", response);
      if (response.loginSuccess) {
        localStorage.setItem("x_auth", response.token);
        balance.innerHTML = response.balance;
        let allTransaction = response.transaction;
        for (let log of allTransaction) {
          makeTransaction(log);
        }
      } else {
        alert(`${response.message}`);
        return false;
      }

      changeCtn();
      intro.innerText = `${userData}`;
    })
    .catch((error) => console.error("Error:", error));
};
//transaction
const makeTransaction = (transaction) => {
  let insertTransaction = `<div class="transaction">
                    <div class="process">
                      <span ${
                        transaction.type == "transfer"
                          ? `class="withdraw">Withdraw`
                          : `>Deposit`
                      }</span>
                      <p class="amount">$${transaction.Amount}</p>

                      <p>${
                        transaction.type == "transfer"
                          ? transaction.To
                          : transaction.From
                      }</p>
                      <p>${transaction.date}</p>
                    </div>
                    <div class="result">
                      <p>$${transaction.balance}</p>
                    </div>`;

  accountDetail.insertAdjacentHTML("afterbegin", insertTransaction);
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
  });
});

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

//amountCheck
let amountValid = true;
const amountCheck = (value) => {
  if (value <= 0) {
    alert("invalid Amount, Please Try again");
    amountValid = false;
  } else if (value > 1000) {
    alert("Please contact the customer service");
    amountValid = false;
  } else {
    amountValid = true;
  }
};

//loan
const requestLoan = document.querySelector("#login_page .loan .request");
const transferSend = document.querySelector("#login_page .transfer .send");

requestLoan.addEventListener("click", () => {
  const requestAmount = document.querySelector("#login_page .loan input");

  amountCheck(requestAmount.value);
  if (amountValid) {
    let date = getDate();
    let data = `type=loan&From=The Banking Loan&date=${date}&Amount=${
      requestAmount.value
    }&To=${intro.innerText}&balance=${
      Number(balance.innerHTML) + Number(requestAmount.value)
    }`;

    fetch(localUrl + ":3000/loan", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          balance.innerHTML = data.target.balance;
          makeTransaction(data.target);
        } else {
          alert("Sorry, try it again");
        }
      });
  }
  requestAmount.value = "";
});

//transfer
const accountDetail = document.querySelector("#login_page .summary .detail");

transferSend.addEventListener("click", () => {
  const transferAmount = document.querySelector(
    "#login_page .transfer input[type='number']"
  );

  const transferTo = document.querySelector(
    "#login_page .transfer input[type='text']"
  );

  amountCheck(transferAmount.value);
  if (Number(balance.innerHTML) < Number(transferAmount.value)) {
    alert("Sorry, insufficient balance");
    transferAmount.value = "";
    transferTo.value = "";
    return false;
  }
  if (amountValid) {
    let date = getDate();
    let data = `type=transfer&From=${intro.innerText}&date=${date}&Amount=${
      transferAmount.value
    }&To=${transferTo.value}&balance=${
      Number(balance.innerHTML) - Number(transferAmount.value)
    }`;

    fetch(localUrl + ":3000/transfer", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          balance.innerHTML = data.target.balance;
          makeTransaction(data.target);
        } else {
          alert("Sorry, try it again");
        }
      });
  }
  // balance.innerText = currentBalance;
  transferAmount.value = "";
  transferTo.value = "";
});

//date
const getDate = () => {
  let dateNow = new Date();
  return dateNow.toString().split(" ").slice(1, 5).join(" ");
};
