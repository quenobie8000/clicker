const button = document.getElementById("button");
const clickEffect = document.getElementById("click-effect");
const balance = document.getElementById("balance");
const reset = document.getElementById("reset");

let balanceStorage = localStorage.getItem("balance");
let buttonValueStorage = localStorage.getItem("buttonValue");

let balanceValue = Number(balanceStorage);
let buttonValue = Number(buttonValueStorage);
let multiplier = 0;

balance.innerHTML = balanceValue;

function onClick(element, code) {
  element.addEventListener("mousedown", () => {
    code();
  });
}

function IDaddTempClass(element, className, timeOutms) {
  element.classList.add(className);
  setTimeout(() => element.classList.remove(className), timeOutms);
}

function updateBalance() {
  balance.innerHTML = balanceValue;
}

function saveGame() {
  localStorage.setItem("balance", balanceValue);
}

function resetBal() {
  balanceValue = 0;
  updateBalance();
}

onClick(button, () => IDaddTempClass(button, "pressed", 200));
onClick(button, () => balanceValue += 1);
onClick(button, () => updateBalance());
onClick(document, () => {
  IDaddTempClass(clickEffect, "click", 200);
  clickEffect.style.top = event.pageY - 12 + "px";
  clickEffect.style.left = event.pageX - 17 + "px";
});
onClick(reset,()=>resetBal());

setInterval(()=> {
  saveGame();
},100);
