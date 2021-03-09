// Setup
// Status UI
const healthStatus = document.getElementById("HealthStatus");
const hungryStatus = document.getElementById("HungryStatus");
const energyStatus = document.getElementById("EnergyStatus");
const hygieneStatus = document.getElementById("HygieneStatus");
const board = document.getElementById("board");

let HealthPoints = 100;
let HungryPoints = 100;
let EnergyPoints = 100;
let HygienePoints = 100;

// Add (Buttons Click)
const btnGym = document.getElementById("btnGym");
const btnKitchen = document.getElementById("btnKitchen");
const btnBedroom = document.getElementById("btnBedroom");
const btnBathroom = document.getElementById("btnBathroom");

btnGym.addEventListener("click", () => {
	updateHealth(20);
	updateHungry(-15);
	updateEnergy(-25);
	updateHygiene(-20);
});

btnKitchen.addEventListener("click", () => {
	updateHealth(5);
	updateHungry(25);
	updateEnergy(-5);
	updateHygiene(-10);
});

btnBedroom.addEventListener("click", () => {
	updateHealth(5);
	updateHungry(-15);
	updateEnergy(50);
});

btnBathroom.addEventListener("click", () => {
	updateEnergy(-1);
	updateHygiene(50);
});

// Update Status // Add / Remove Status Functions
updateHealth();
function updateHealth(value = 0) {
	HealthPoints += value;
	if (HealthPoints <= 0) {
		HealthPoints = 0;
		// alert("O teu " + monsterName.textContent + " foi desta para melhor :(");
		console.log("O teu " + monsterName.textContent + " foi desta para melhor :(");
	} else if (HealthPoints >= 100) HealthPoints = 100;

	healthStatus.title = HealthPoints;

	changeColorUI(healthStatus, HealthPoints);
	changeColorUI(board, HealthPoints, true);
}

updateHungry();
function updateHungry(value = 0) {
	HungryPoints += value;
	if (HungryPoints <= 0) {
		HungryPoints = 0;
		updateHealth(-1);
	} else if (HungryPoints >= 100) HungryPoints = 100;

	hungryStatus.title = HungryPoints;

	changeColorUI(hungryStatus, HungryPoints);
}

updateEnergy();
function updateEnergy(value = 0) {
	EnergyPoints += value;
	if (EnergyPoints <= 0) {
		EnergyPoints = 0;
		updateHealth(-1);
	} else if (EnergyPoints >= 100) EnergyPoints = 100;

	energyStatus.title = EnergyPoints;

	changeColorUI(energyStatus, EnergyPoints);
}

updateHygiene();
function updateHygiene(value = 0) {
	HygienePoints += value;
	if (HygienePoints <= 0) {
		HygienePoints = 0;
		updateHealth(-1);
	} else if (HygienePoints >= 100) HygienePoints = 100;

	hygieneStatus.title = HygienePoints;

	changeColorUI(hygieneStatus, HygienePoints);
}

function changeColorUI(element, value, isBoard = false) {
	let newColor = "green";
	if (value >= 90) newColor = "green";
	else if (value < 90 && value >= 60) newColor = "yellow";
	else if (value < 60 && value >= 40) newColor = "orange";
	else if (value < 40 && value >= 1) newColor = "red";
	else if (value == 0) newColor = "black";

	if (isBoard) element.style.borderColor = newColor;
	else element.style.backgroundColor = newColor;
}

// Remove status
let healthPointsUpdate = setInterval(() => updateHealth(-1), 10000);
let hungryPointsUpdate = setInterval(() => updateHungry(-1), 1000);
let energyPointsUpdate = setInterval(() => updateEnergy(-1), 1000);
let hygienePointsUpdate = setInterval(() => updateHygiene(-1), 1000);

// Change Player/Monster Name
const monsterName = document.getElementById("MonsterName");
monsterName.addEventListener("click", () => {
	monsterName.textContent = prompt("Novo nome: ", monsterName.textContent) || monsterName.textContent;
});
