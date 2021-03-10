// Change Player/Monster Name
const monsterName = document.getElementById("MonsterName");
monsterName.addEventListener("click", () => {
	monsterName.textContent = prompt("Novo nome: ", monsterName.textContent) || monsterName.textContent;
});

// https://i.ibb.co/q5kV4m0/Feliz-Forte.png
// https://i.ibb.co/hyVXxPT/Feliz-Fraco.png
// https://i.ibb.co/TBNDqBh/Morto.png
// https://i.ibb.co/tmNzj2z/Neutro.png
// https://i.ibb.co/N2M7Y6M/Triste.png 
const statusImgs = {
	FelizForte: "https://i.ibb.co/q5kV4m0/Feliz-Forte.png",
	FelizFraco: "https://i.ibb.co/hyVXxPT/Feliz-Fraco.png",
	Neutro: "https://i.ibb.co/tmNzj2z/Neutro.png",
	Triste: "https://i.ibb.co/N2M7Y6M/Triste.png ",
	Morto: "https://i.ibb.co/TBNDqBh/Morto.png",
}
const ImgPersonagem = document.getElementById("ImgPersonagem");
const AlertMensaje = document.getElementById("Alert");

let isAlive = true;

// Setup
// Status UI
const healthStatus = document.getElementById("HealthStatus");
const hungryStatus = document.getElementById("HungryStatus");
const energyStatus = document.getElementById("EnergyStatus");
const hygieneStatus = document.getElementById("HygieneStatus");
const board = document.getElementById("board");

let HealthPoints = Number(localStorage.HealthPoints || 100);
let HungryPoints = Number(localStorage.HungryPoints || 100);
let EnergyPoints = Number(localStorage.EnergyPoints || 100);
let HygienePoints = Number(localStorage.HygienePoints || 100);

// Add (Buttons Click)
const btnGym = document.getElementById("btnGym");
const btnKitchen = document.getElementById("btnKitchen");
const btnBedroom = document.getElementById("btnBedroom");
const btnBathroom = document.getElementById("btnBathroom");

btnGym.addEventListener("click", () => {
	if (EnergyPoints > 5 && HygienePoints > 5) {
		updateHealth(20);
		updateHungry(-15);
		updateEnergy(-25);
		updateHygiene(-20);
	} else {
		alertAnimation("Ou tens fome, ou falta de energia ou de higiene para ir treinar!");
	}
});

btnKitchen.addEventListener("click", () => {
	if (EnergyPoints > 5 && HygienePoints > 5) {
		updateHealth(5);
		updateHungry(25);
		updateEnergy(-5);
		updateHygiene(-10);
	} else {
		alertAnimation("Não tens energia ou então estás com pouca higiene!");
	}
});

btnBedroom.addEventListener("click", () => {
	if (HungryPoints > 1) {
		updateHealth(5);
		updateHungry(-15);
		updateEnergy(50);
	} else {
		alertAnimation("Tens fome de mais para dormir!");
	}
});

btnBathroom.addEventListener("click", () => {
	if (EnergyPoints > 1) {
		updateEnergy(-1);
		updateHygiene(50);
	} else {
		alertAnimation("Não tens energia para ir á casa de banho!");
	}
});

// Update Status // Add / Remove Status Functions
updateHealth();
function updateHealth(value = 0) {
	HealthPoints += value;
	if (HealthPoints <= 0) {
		HealthPoints = 0;
		isAlive = false;
		alertAnimation("O teu " + monsterName.textContent + " foi desta para melhor :(");
	} else if (HealthPoints >= 100) HealthPoints = 100;
	localStorage.HealthPoints = HealthPoints;

	healthStatus.title = HealthPoints;

	changeColorUI(healthStatus, HealthPoints);
	changeColorUI(board, HealthPoints, true);
	changeImage();
}

updateHungry();
function updateHungry(value = 0) {
	HungryPoints += value;
	if (HungryPoints <= 0) {
		HungryPoints = 0;
		updateHealth(-1);
	} else if (HungryPoints >= 100) HungryPoints = 100;
	localStorage.HungryPoints = HungryPoints;

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
	localStorage.EnergyPoints = EnergyPoints;

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
	localStorage.HygienePoints = HygienePoints;

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

function changeImage() {
	if (HealthPoints >= 90) ImgPersonagem.src = statusImgs.FelizForte;
	else if (HealthPoints < 90 && HealthPoints >= 60) ImgPersonagem.src = statusImgs.FelizFraco;
	else if (HealthPoints < 60 && HealthPoints >= 40) ImgPersonagem.src = statusImgs.Neutro;
	else if (HealthPoints < 40 && HealthPoints >= 1) ImgPersonagem.src = statusImgs.Triste;
	else if (HealthPoints == 0) ImgPersonagem.src = statusImgs.Morto;
}

// Remove status
let healthPointsUpdate = setInterval(() => updateHealth(-1), 10000);
let hungryPointsUpdate = setInterval(() => updateHungry(-1), 1000);
let energyPointsUpdate = setInterval(() => updateEnergy(-1), 1000);
let hygienePointsUpdate = setInterval(() => updateHygiene(-1), 1000);

// Reset Game
document.getElementById("btnReset").addEventListener("click", () => reset());
function reset() {
	updateHealth(100);
	updateHungry(100);
	updateEnergy(100);
	updateHygiene(100);
}

// Alert Animation
function alertAnimation(value) {
	AlertMensaje.textContent = value;
	AlertMensaje.style.top = 100 + "px";

	if (isAlive) setTimeout(() => AlertMensaje.style.top = -100 + "px", 5000);
}
