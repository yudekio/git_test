let card1 = document.querySelector(".card-1");
let card2 = document.querySelector(".card-2");
let card3 = document.querySelector(".card-3");
let AIText = document.getElementById("AI");
let result = document.getElementById("result");
let button = document.getElementById("btn");
let mmrEl = document.getElementById("mmr");

card1.addEventListener("click", card1ClickHandler);
card2.addEventListener("click", card2ClickHandler);
card3.addEventListener("click", card3ClickHandler);
button.addEventListener("click", init);

const cardArr = ["лед", "огонь", "молния"];
let firstCard = "";
let secondCard = "";
AIText.innerHTML = "";
let mmr = localStorage.getItem("mmrKey");
if (mmr === null) {
  mmr = 0;
} else {
  mmr = parseInt(mmr);
}
mmrEl.innerHTML = `MMR: ${mmr}`;
function revealText(card) {
  let newName = chooseRandomName(cardArr);
  firstCard = newName;
  replaceName(card, newName);
  card.childNodes[0].classList.remove("hide-text");

  // Remove event listeners after the first click
  card1.removeEventListener("click", card1ClickHandler);
  card2.removeEventListener("click", card2ClickHandler);
  card3.removeEventListener("click", card3ClickHandler);

  AI();
  youLose(compare());
  showRestart();
  addMMR();
}

function card1ClickHandler(event) {
  revealText(event.currentTarget);
}

function card2ClickHandler(event) {
  revealText(event.currentTarget);
}

function card3ClickHandler(event) {
  revealText(event.currentTarget);
}

function chooseRandomName(arr) {
  return arr[Math.floor(Math.random() * 3)];
}

function replaceName(el, name) {
  el.childNodes[0].innerHTML = name;
}

function AI() {
  let AIName = chooseRandomName(cardArr);
  secondCard = AIName;
  setTimeout(() => (AIText.innerHTML = AIName), 2000);
}

function printing(str) {
  for (let i = 0; i <= str.length - 1; i++) {
    setTimeout(() => (result.innerHTML += str[i]), 100 * i);
  }
}

function youLose(text) {
  setTimeout(() => printing(text), 3000);
}

function compare() {
  return firstCard.length > secondCard.length
    ? `Вы победили! (+30) ${firstCard} сильнее ${secondCard}`
    : firstCard.length < secondCard.length
    ? `Вы проиграли.. (-25) ${firstCard} слабее ${secondCard}`
    : `Ничья! (+0) ${firstCard} равно ${secondCard}`;
}

function resultMMR() {
  return firstCard.length > secondCard.length
    ? 30
    : firstCard.length < secondCard.length
    ? -25
    : 0;
}

function updateMMR() {
  mmr += resultMMR();
  localStorage.setItem("mmrKey", mmr);
  mmrEl.innerHTML = `MMR: ${mmr}`;
}

function addMMR() {
  setTimeout(() => updateMMR(), 6000);
}

function showRestart() {
  setTimeout(() => btn.classList.toggle("hide-text"), 7000);
}

function init() {
  card1.addEventListener("click", card1ClickHandler);
  card2.addEventListener("click", card2ClickHandler);
  card3.addEventListener("click", card3ClickHandler);

  const cardArr = ["лед", "огонь", "молния"];
  firstCard = "";
  secondCard = "";
  AIText.innerHTML = "";
  result.innerHTML = "";
  card1.childNodes[0].classList.add("hide-text");
  card2.childNodes[0].classList.add("hide-text");
  card3.childNodes[0].classList.add("hide-text");
  button.classList.add("hide-text");
}
function calculateBMI(height, weight) {
  // The formula for BMI is weight in kilograms divided by height in meters squared
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi;
}
