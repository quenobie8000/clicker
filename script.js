const button = document.querySelector("#button");
const clickEffect = document.querySelector("#click-effect");
const balance = document.querySelector("#balance");
const reset = document.querySelector("#reset");
const upgrades = document.querySelector("#upgrades");
const compactButton = document.querySelector("#compactButton");
const arrow = document.querySelector("#arrow");
const autoClick = document.querySelector("#AutoClick");
const autoClickP = document.querySelector("#AutoClick .upgPrice");
const autoClickA = document.querySelector("#AutoClick .upgOwned");
const autoClickRefuse = document.querySelector("#AutoClick .upgRefuse");
const CPSel = document.querySelector("#CPS");
const clickVal = document.querySelector("#ClickAmount")

let incomeInterval;

let balanceStorage = localStorage.getItem("balance");
let AutClkOwnStorage = localStorage.getItem("AutClkOwn");

let baseAutClkPri = 15;
let balanceValue = Number(balanceStorage);
let multiplier = 1;
let AutClkOwn = Number(AutClkOwnStorage);

function onClick(element, code) {
  element.addEventListener("mousedown", () => {
    code();
  });
}

function addTempClass(element, className, timeOutms) {
  element.classList.add(className);
  setTimeout(() => element.classList.remove(className), timeOutms);
}

function Formatter(num) {
  letter = [
    "", "k", "M", "B", "T", "q", "Q", "s", "S", "O", "N",
    "D", "U", "Dd", "Td", "qd", "Qd", "sd", "Sd", "Od", "Nd", 
    "V", "Uv", "Dv", "Tv", "qv", "Qv", "sv", "Sv", "Ov", "Nv", 
    "Tt", "Ut", "Dt","Ttt", "qt", "Qt", "st", "St", "Ot", "Nt"
  ]

  if (num === 0) return 0;

  exp = Math.floor(Math.log10(Math.abs(num))/3);

  if (exp >= letter.lenght) return num.toExponential(2);

  zeros = Math.pow(10, exp * 3);
  formatNum = (num / zeros).toFixed(1);
  suffix = letter[exp];

  return formatNum + suffix;
}

function resetGame() {
  balanceValue = 0;
  AutClkOwn = 0;
  calcPrice();
  calcMulti()
  startAutoIncome();
  update();
}

function update() {
  balance.innerHTML = Formatter(balanceValue);
  autoClickA.innerHTML = Formatter(AutClkOwn);
  autoClickP.innerHTML = Formatter(AutClkPri) + "$";
  AutClkPri = Math.round(AutClkPri);
  CPSel.innerHTML = AutClkOwn / 10 + "/s"
}

function saveGame() {
  localStorage.setItem("balance", balanceValue);
  localStorage.setItem("AutClkOwn", AutClkOwn);
}

function Click() {
  addTempClass(button, "pressed", 200);
  balanceValue += 1 * multiplier;
  calcPrice();
  update();
}

function upgAutClk() {
  if (balanceValue >= AutClkPri) {
    balanceValue -= AutClkPri;
    AutClkOwn++;
    startAutoIncome();
    calcPrice();
  } else if (balanceValue < AutClkPri || balanceValue < 0) {
    addTempClass(autoClickRefuse, "refused", 500);
  }
}

function calcPrice() {
  AutClkPri = Math.round(baseAutClkPri * 1.1 ** AutClkOwn);
  update();
}

function idleIncome() {
    balanceValue += 1;
    update();
}

function startAutoIncome() {
    if (incomeInterval) clearInterval(incomeInterval);
    if (AutClkOwn > 0) {
        incomeInterval = setInterval(() => {
            idleIncome();
        }, 10000 / AutClkOwn);
    }
}

function totOwn() {
  total = AutClkOwn;
  return total;
}

function calcMulti() {
  multi = Math.floor(totOwn()/50);
  multiplier = 1 + multi;
}

function compactState() {
  if (
    window.innerWidth < 815 &&
    upgrades.className.split(" ")[1] !== "toggled"
  ) {
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

onClick(game, () => update());

onClick(document, () => {
  addTempClass(clickEffect, "click", 200);
  clickEffect.style.top = event.pageY - 12 + "px";
  clickEffect.style.left = event.pageX - 17 + "px";
});
setInterval(() => {
  saveGame();
  calcMulti()
  compactState();
}, 500);

setInterval(() => {
  balance.style.top = window.innerHeight * 0.56 + "px";
  CPSel.style.top = window.innerHeight * 0.5815899 + "px";
  button.style.setProperty("--But-width", window.innerHeight * 0.4545 + "px");
  clickVal.style.left = 50% - (window.innerHeight) + "px";
}, 200);

startAutoIncome();
calcMulti()
calcPrice();
update();




// (function () {
// 	var script =  document.createElement('script');
// 	script.src="//cdn.jsdelivr.net/npm/eruda";
// 	document.body.appendChild(script);
// 	script.onload = function () {
// 		eruda.init()
// 	} 
// })();