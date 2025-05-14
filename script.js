const button = document.getElementById("button");
const clickEffect = document.getElementById("click-effect");
const balance = document.getElementById("balance");
const reset = document.getElementById("reset");
const upgradeArea = document.getElementById("upgradeArea");
const upgrades = document.getElementById("upgrades");
const compactButton = document.getElementById("compactButton");
const arrow = document.getElementById("arrow");

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
  if (confirm("Are you sure you want to reset your game progress PERMANETLY?") === "true"){
  balanceValue = 0;
  updateBalance();
  }
}

function compactState() {
  if (
    window.innerWidth < 815 &&
    upgrades.className.split(" ")[1] !== "toggled") {
    upgrades.classList.replace("default", "compact");
    compactButton.classList.replace("default", "compact");
      arrow.classList.replace("right", "left");
  }
  if (compactButton.className.split(" ")[0] === "default") {
    onClick(compactButton, () => {
      upgrades.classList.replace("default", "compact");
      compactButton.classList.replace("default", "compact");
      upgrades.classList.remove("toggled");
      arrow.classList.replace("right", "left");
    });
  } else if (compactButton.className.split(" ")[0] === "compact") {
    onClick(compactButton, () => {
      upgrades.classList.replace("compact", "default");
      compactButton.classList.replace("compact", "default");
      if (window.innerWidth < 815) upgrades.classList.add("toggled");
      arrow.classList.replace("left", "right");
    });
  }
}

onClick(button, () => IDaddTempClass(button, "pressed", 200));
onClick(button, () => (balanceValue += 1));
onClick(button, () => updateBalance());
onClick(document, () => {
  IDaddTempClass(clickEffect, "click", 200);
  clickEffect.style.top = event.pageY - 12 + "px";
  clickEffect.style.left = event.pageX - 17 + "px";
});
onClick(reset, () => resetBal());

setInterval(() => {
  saveGame();
  compactState();
}, 100);
