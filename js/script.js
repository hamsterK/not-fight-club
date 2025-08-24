const header = document.querySelector("header");
const registerContainer = document.querySelector(".register");
const characterNameInput = document.querySelector("#character-name");
const createCharacterBtn = document.querySelector("#create-character-btn");
const characterPageContainer = document.querySelector(
  ".container-character-page"
);
const characterSettings = document.querySelector(".container-settings");
const startFight = document.querySelector(".start-fight");
const fightBtn = document.querySelector("#fight-btn");

const fightPage = document.querySelector(".fight-page");
const rivalName = document.querySelector(".rival-name");
const rivalImage = document.querySelector(".character-image.rival");
const myName = document.querySelector(".my-character-name");
const myImage = document.querySelector(".my-character-image");
const attackBtn = document.querySelector("#attack-btn");
const attackErrorMessage = document.querySelector("#attack-error-msg");
const fightProgressText = document.getElementById("fight-progress-text");
const myHealthBar = document.getElementById("my-health");
const myHealthBarText = document.getElementById("my-health-bar-text");
const rivalHealthBar = document.getElementById("rival-health");
const rivalHealthBarText = document.getElementById("rival-health-bar-text");

const rivalCharacters = [
  { name: "Evil Snake", image: "assets/characters/snake-fighter.jpg" },
  { name: "Evil Dragon", image: "assets/characters/evil_dragon.jpg" },
  { name: "Evil Cat", image: "assets/characters/evil_cat.jpg" },
  { name: "Evil Raccoon", image: "assets/characters/evil_raccoon.jpg" },
  { name: "Evil Shark", image: "assets/characters/evil_shark.jpg" },
  { name: "Evil Hamster", image: "assets/characters/evil_" },
];

let rivalInfo;
let myAttackStrength;
let rivalAttackStrength;
let myHealth;
let rivalHealth;
let readyToFight = true;

let userData = localStorage.getItem("userData");
if (userData) {
  userData = JSON.parse(userData);
  startFight.classList.remove("hidden");
  header.classList.remove("hidden");
} else {
  registerContainer.classList.remove("hidden");
  createCharacterBtn.addEventListener("click", () => {
    const characterName = characterNameInput.value.trim();
    if (characterName) {
      userData = { name: characterName, wins: 0, losses: 0 };
      localStorage.setItem("userData", JSON.stringify(userData));
      registerContainer.classList.add("hidden");
      header.classList.remove("hidden");
      startFight.classList.remove("hidden");
    }
  });
}

fightBtn.addEventListener("click", () => {
  startFight.classList.add("hidden");
  fightPage.classList.remove("hidden");
  rivalInfo =
    rivalCharacters[Math.floor(Math.random() * rivalCharacters.length)];
  rivalName.textContent = rivalInfo.name;
  rivalImage.src = rivalInfo.image;
  myName.textContent = userData.name;
  myImage.src = userData.image || "assets/characters/cat-fighter.jpg";
  myHealth = 150;
  rivalHealth = 150;
  myAttackStrength = 10;
  rivalAttackStrength = 15;
  readyToFight = true;
  attackBtn.classList.remove("hidden");
});

attackBtn.addEventListener("click", () => {
  const { attackZone, defenseZones } = updateZones();
  if (!validateDefenseZones(defenseZones)) {
    return;
  }

  getAttackResult(attackZone, defenseZones);
  updateHealthBars();
});

function updateZones() {
  const attackZone = document.querySelector(
    'input[name="attack-zone"]:checked'
  ).value;
  const defenseZone = document.querySelectorAll(
    'input[name="defense-zone"]:checked'
  );
  const defenseZones = Array.from(defenseZone).map((x) => x.value);

  return { attackZone, defenseZones };
}

function validateDefenseZones(defenseZones) {
  if (defenseZones.length != 2) {
    attackErrorMessage.textContent = "You must select 2 defense zones";
    return false;
  } else {
    attackErrorMessage.textContent = "";
    return true;
  }
}

function createLog(message) {
  const newLine = document.createElement("p");
  newLine.textContent = message;
  fightProgressText.appendChild(newLine);
}

function getAttackResult(attackZone, defenseZones) {
  const zones = ["head", "neck", "stomach", "body", "legs"];
  const rivalAttackZone = zones[Math.floor(Math.random() * zones.length)];
  let rivalDefenseZones = new Set();
  while (rivalDefenseZones.length < 2) {
    rivalDefenseZones.add(zones[Math.floor(Math.random() * zones.length)]);
  }
  rivalDefenseZones = Array.from(rivalDefenseZones);

  if (rivalDefenseZones.includes(attackZone)) {
    message = `${userData.name} attacked ${rivalInfo.name} to ${attackZone}, but ${rivalInfo.name} defended it.`;
    createLog(message);
  } else {
    message = `${userData.name} attacked ${rivalInfo.name} to ${attackZone}, ${rivalInfo.name} lost ${myAttackStrength} health points`;
    createLog(message);
    rivalHealth -= myAttackStrength;
    if (rivalHealth <= 0) {
      message = `${userData.name} won the fight!`;
      createLog(message);
      userData.wins += 1;
      localStorage.setItem("userData", JSON.stringify(userData));
      readyToFight = false;
      attackBtn.classList.add("hidden");
      attackErrorMessage.textContent = "The fight is over";
      return;
    }
  }

  if (defenseZones.includes(rivalAttackZone)) {
    message = `${rivalInfo.name} attacked ${userData.name} to ${rivalAttackZone}, but ${userData.name} defended it.`;
    createLog(message);
  } else {
    message = `${rivalInfo.name} attacked ${userData.name} to ${rivalAttackZone}, ${userData.name} lost ${rivalAttackStrength} health points`;
    createLog(message);
    myHealth -= rivalAttackStrength;
    if (myHealth <= 0) {
      message = `${rivalInfo.name} won the fight!`;
      createLog(message);
      userData.losses += 1;
      localStorage.setItem("userData", JSON.stringify(userData));
      readyToFight = false;
      attackBtn.classList.add("hidden");
      attackErrorMessage.textContent = "The fight is over";
      return;
    }
  }
}

function updateHealthBars() {
  if (myHealth <= 0) {
    myHealthBar.value = 0;
  } else {
    myHealthBar.value = myHealth;
  }
  myHealthBarText.textContent = `HEALTH ${myHealth}/150`;

  if (rivalHealth <= 0) {
    rivalHealthBar.value = 0;
  } else {
    rivalHealthBar.value = rivalHealth;
  }
  rivalHealthBarText.textContent = `HEALTH ${rivalHealth}/150`;
}
