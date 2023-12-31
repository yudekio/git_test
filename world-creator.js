const nameInputEl = document.querySelector("#name");
const worldSizeEl = document.querySelector("#world-size");
const worldSeasonEl = document.querySelector("#world-season");
const emojiEl = document.querySelector("#emoji");

let selectedSeason = worldSeasonEl.options[worldSeasonEl.selectedIndex].value;
const selectedSize = parseInt(
  worldSizeEl.options[worldSizeEl.selectedIndex].value
);

const worldData = {
  name: "default",
  size: 6,
  season: "winter",
};

let nameInput = nameInputEl.value;

console.log(nameInput);

function createWorld() {
  nameInput = nameInputEl.value;
  worldData.name = nameInput;
  worldData.size = selectedSize;
  worldData.season = selectedSeason;

  window.location.href = `/pages/world.html?name=${encodeURIComponent(
    worldData.name
  )}&size=${encodeURIComponent(worldData.size)}&season=${encodeURIComponent(
    worldData.season
  )}`;
}

function changeEmoji() {
  selectedSeason = worldSeasonEl.options[worldSeasonEl.selectedIndex].value;
  emojiEl.innerText =
    selectedSeason === "winter"
      ? "❄️"
      : selectedSeason === "spring"
      ? "🌸"
      : selectedSeason === "summer"
      ? "☀️"
      : "🍁";
}

function init() {
  changeEmoji();
}

init();
