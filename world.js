const urlParams = new URLSearchParams(window.location.search);

const worldNameEl = document.querySelector("#name");

const worldData = {
  name: urlParams.get("name"),
  size: urlParams.get("size"),
  season: urlParams.get("season"),
};

function init() {
  worldData.name == -""
    ? (worldNameEl.innerText = "world")
    : (worldNameEl.innerText = worldData.name);
}

init();

console.log(worldData.name);
