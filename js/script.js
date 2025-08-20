const registerContainer = document.querySelector(".register");
const characterNameInput = document.querySelector("#character-name");
const createCharacterBtn = document.querySelector("#create-character-btn");
const characterPageContainer = document.querySelector(
  ".container-character-page"
);
const characterSettings = document.querySelector(".container-settings");
const startFight = document.querySelector(".start-fight");
const fightBtn = document.querySelector("#fight-btn");

const fightPage = document.querySelector(".container-fight-page");
const rivalName = document.querySelector(".rival-name");
const rivalImage = document.querySelector(".character-image.rival");
const myName = document.querySelector(".my-character-name");
const myImage = document.querySelector(".my-character-image");

const rivalCharacters = [
  { name: "Evil Snake", image: "assets/characters/snake-fighter.jpg" },
];

let userData = localStorage.getItem("userData");
if (userData) {
  userData = JSON.parse(userData);
  startFight.classList.remove("hidden");
} else {
  registerContainer.classList.remove("hidden");
  createCharacterBtn.addEventListener("click", () => {
    const characterName = characterNameInput.value.trim();
    if (characterName) {
      userData = { name: characterName, wins: 0, losses: 0 };
      localStorage.setItem("userData", JSON.stringify(userData));
      registerContainer.classList.add("hidden");
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
