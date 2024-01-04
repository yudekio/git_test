const urlParams = new URLSearchParams(window.location.search);

const worldNameEl = document.querySelector("#name");

const worldData = {
  name: urlParams.get("name"),
  size: urlParams.get("size"),
  season: urlParams.get("season"),
};

function init() {
  worldNameEl.innerText =
    worldData.name === null || worldData.name === "" ? "world" : worldData.name;
}

init();

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const individuals = [];

let predator;
let hasPredator = false;

function Individual(x, y, gender, isPredator) {
  this.x = x;
  this.y = y;
  this.gender = gender;
  this.age = 0;
  this.name = generateName();
  this.children = [];
  this.isPredator = isPredator;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.isPredator ? 25 : 20, 0, 2 * Math.PI);
    ctx.fillStyle = this.isPredator
      ? "red"
      : this.gender === "male"
      ? "blue"
      : "pink";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.fillText(this.name, this.x - 15, this.y - 25);
  };

  this.moveRandomly = function () {
    const speed = this.isPredator ? 8 : 4;

    const nearestIndividual = individuals.reduce((nearest, other) => {
      if (other.gender === this.gender && other !== this) {
        const distanceToOther = Math.sqrt(
          (other.x - this.x) ** 2 + (other.y - this.y) ** 2
        );
        if (!nearest || distanceToOther < nearest.distance) {
          return { individual: other, distance: distanceToOther };
        }
      }
      return nearest;
    }, null);

    if (nearestIndividual) {
      const angle = Math.atan2(
        nearestIndividual.individual.y - this.y,
        nearestIndividual.individual.x - this.x
      );
      this.x += Math.cos(angle) * speed;
      this.y += Math.sin(angle) * speed;
    } else {
      this.x += (Math.random() - 0.5) * speed;
      this.y += (Math.random() - 0.5) * speed;
    }

    this.x = Math.max(0, Math.min(canvas.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height, this.y));
    if (hasPredator) {
      if (this.isPredator) {
        this.x += (Math.random() - 0.5) * speed;
        this.y += (Math.random() - 0.5) * speed;
      } else {
        const angleToPredator = Math.atan2(
          predator.y - this.y,
          predator.x - this.x
        );
        this.x -= Math.cos(angleToPredator) * speed;
        this.y -= Math.sin(angleToPredator) * speed;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
    }
  };
}

function generateName() {
  const names = ["John", "Jane", "Bob", "Alice", "Charlie", "Eve"];
  return names[Math.floor(Math.random() * names.length)];
}

function spawnIndividual() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const gender = Math.random() < 0.5 ? "male" : "female";
  const isPredator = Math.random() < 0.005;

  const individual = new Individual(x, y, gender, isPredator);

  if (isPredator) {
    hasPredator = true;
    predator = individual;
    console.log("Predator spawned:", predator);
  }

  individuals.push(individual);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  individuals.forEach((individual) => {
    individual.draw();
  });
}

function update() {
  individuals.forEach((individual) => {
    individual.age++;
    individual.moveRandomly();
  });
}

function handleMouseHover(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  individuals.forEach((individual) => {
    const distance = Math.sqrt(
      (mouseX - individual.x) ** 2 + (mouseY - individual.y) ** 2
    );
    if (distance < 20) {
      console.log(
        `Name: ${individual.name}, Age: ${individual.age}, Children: ${individual.children.length}`
      );
    }
  });
}

function simulate() {
  spawnIndividual();
  update();
  draw();
  setTimeout(simulate, 100);
}

canvas.addEventListener("mousemove", handleMouseHover);

simulate();
