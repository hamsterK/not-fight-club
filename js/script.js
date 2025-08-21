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

const rivalCharacters = [
  { name: "Evil Snake", image: "assets/characters/snake-fighter.jpg" },
];

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
  let rivalInfo =
    rivalCharacters[Math.floor(Math.random() * rivalCharacters.length)];
  rivalName.textContent = rivalInfo.name;
  rivalImage.src = rivalInfo.image;
  myName.textContent = userData.name;
  myImage.src = userData.image || "assets/characters/cat-fighter.jpg";
});

attackBtn.addEventListener("click", () => {
  const { attackZone, defenseZones } = updateZones();
  if (!validateDefenseZones(defenseZones)) {
    return;
  }

  const newLine = document.createElement("p");
  newLine.textContent = `${myName.textContent} attacked ${rivalName.textContent} to ${attackZone}.`;
  fightProgressText.appendChild(newLine);
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
    attackErrorMessage.textContent = "You must select 2 attack zones";
    return false;
  } else {
    attackErrorMessage.textContent = "";
    return true;
  }
}
