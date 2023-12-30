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

function createCanvas() {
  let cellCounter = 0;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("div");
    row.style = "display: flex; height: calc(62% / 6); width: 62%";
    for (let j = 0; j < 6; j++) {
      let cell = document.createElement("div");
      cell.style = `width: 100%;
      height: 100%;
                background-color: #0baa60;
                border: 2px solid rgb(189, 189, 189);
                box-sizing: border-box;`;
      cellCounter++;
      cell.setAttribute("index", cellCounter);

      row.appendChild(cell);
    }
    document.querySelector("#game").appendChild(row);
  }
}

createCanvas();
console.log(document.querySelector('[index="35"]'));
