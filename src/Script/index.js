// Setup
let HealthPoints = 100;
let HungryPoints = 100;
let EnergyPoints = 100;
let HygienePoints = 100;

// Remove status
let healthPointsUpdate = setInterval(() => {
	if (HealthPoints) HealthPoints--;
	update();
}, 10000);

let hungryPointsUpdate = setInterval(() => {
	if (HungryPoints) HungryPoints--;
	update();
}, 1000);

let energyPointsUpdate = setInterval(() => {
	if (EnergyPoints) EnergyPoints--;
	update();
}, 1000);

let hygienePointsUpdate = setInterval(() => {
	if (HygienePoints) HygienePoints--;
	update();
}, 1000);

// Add (Buttons Click)
const btnGym = document.getElementById("btnGym");
const btnKitchen = document.getElementById("btnKitchen");
const btnBedroom = document.getElementById("btnBedroom");
const btnBathroom = document.getElementById("btnBathroom");

btnGym.addEventListener("click", () => {
	EnergyPoints -= 25;
	HungryPoints -= 15;
	HygienePoints -= 20;
	HealthPoints += 20;
	update();
});

btnKitchen.addEventListener("click", () => {
	HygienePoints -= 10;
	EnergyPoints -= 5;
	HungryPoints += 25;
	HealthPoints += 5;
	update();
});

btnBedroom.addEventListener("click", () => {
	HungryPoints -= 15;
	EnergyPoints += 50;
	HealthPoints += 5;
	update();
});

btnBathroom.addEventListener("click", () => {
	EnergyPoints -= 1;
	update();
});

// Update Status
const healthStatus = document.getElementById("HealthStatus");
const hungryStatus = document.getElementById("HungryStatus");
const energyStatus = document.getElementById("EnergyStatus");
const hygieneStatus = document.getElementById("HygieneStatus");

update();
function update() {
	healthStatus.title = HealthPoints;
	hungryStatus.title = HungryPoints;
	energyStatus.title = EnergyPoints;
	hygieneStatus.title = HygienePoints;
}
