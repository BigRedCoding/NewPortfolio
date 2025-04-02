import {variables} from "../scripts/utils/constants.js";

const canvas = document.getElementById("map-canvas");
const ctx = canvas.getContext("2d");

//Character select elements
const createCharacterDiv = document.getElementById("createCharacterDiv");
const createCharacterBtn = document.getElementById("createCharacterBtn");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const storageMessage = document.getElementById("storageMessage");
const characterNameInput = document.getElementById("characterName");
const gameContainer = document.getElementById("game-container");
const charactersList = document.querySelector(".main__characters-list");
const selectCharacterBtn = document.getElementById("selectCharacterBtn");
const deleteCharacterBtn = document.getElementById("deleteCharacterBtn");
const createNewCharacterBtn = document.getElementById("createNewCharacterBtn");
const selectionErrorMessage = document.getElementById("selectionErrorMessage");
const characterSelectedMessage = document.getElementById(
  "characterSelectedMessage"
);
const characterDeletedMessage = document.getElementById(
  "characterDeletedMessage"
);

//Player elements

const playerDiv = document.getElementById(".player-div");

const healthLabel = document.getElementById("healthLabel");
const manaLabel = document.getElementById("manaLabel");
const xpLabel = document.getElementById("xpLabel");
const displayLevel = document.getElementById("display-level");

const healthBar = document.getElementById("healthBar");
const manaBar = document.getElementById("manaBar");
const xpBar = document.getElementById("xpBar");

//Character select functions
let selectedCharacter = null;
let selectedListItem = null;

document.addEventListener("DOMContentLoaded", function () {
  checkStorage();
  gameContainer.classList.add("hidden");
  createCharacterBtn.addEventListener("click", createCharacter);
  createNewCharacterBtn.addEventListener("click", showCreateCharacterDiv);
  selectCharacterBtn.addEventListener("click", selectCharacter);
  deleteCharacterBtn.addEventListener("click", deleteCharacter);
});

function showCreateCharacterDiv(){
  createCharacterDiv.classList.remove("hidden");
  storageMessage.classList.add("hidden");
  createNewCharacterBtn.classList.add("hidden");
}

function checkStorage() {
  while (charactersList.firstChild) {
    charactersList.removeChild(charactersList.firstChild);
  }
  console.log("check storage");
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (storedUserData) {
  

    for (const key in storedUserData) {
      const characterData = storedUserData[key];

      storageMessage.classList.remove("hidden");
      createCharacterDiv.classList.add("hidden");
      
      if (characterData.characterName && characterData.createdDate) {
        const characterItem = document.createElement("li");
        const uniqueId = `character-${characterData.characterName}-${Date.now()}`;
        characterItem.id = uniqueId;
        characterItem.classList.add("main__list-item");

        const characterDiv = document.createElement("div");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = characterData.characterName;
        characterDiv.appendChild(nameParagraph);

        const dateParagraph = document.createElement("p");
        dateParagraph.textContent = characterData.createdDate || "No creation date";
        characterDiv.appendChild(dateParagraph);

        characterItem.appendChild(characterDiv);

        characterItem.addEventListener("click", function () {
          console.log("character selected");
          selectedCharacter = characterData;

          for (const key in variables) {
            if (!characterData.hasOwnProperty(key)) {
              characterData[key] = variables[key];
              console.log("Updated character data:", characterData);
            }
          }

          selectedListItem = characterItem.id;
          console.log(selectedCharacter);
          const items = charactersList.querySelectorAll("li");
          items.forEach((item) => item.classList.remove("selected"));
          characterItem.classList.add("selected");
        });
        charactersList.appendChild(characterItem);
      }
    }

    selectCharacterBtn.classList.remove("hidden");
    deleteCharacterBtn.classList.remove("hidden");
    createNewCharacterBtn.classList.remove("hidden");
  } else {
    createCharacterDiv.classList.remove("hidden");
    storageMessage.classList.add("hidden");
    createNewCharacterBtn.classList.add("hidden");
  }
}


function createCharacter() {
  console.log("create character");

  selectionErrorMessage.classList.add("hidden");

  const characterName = characterNameInput.value.trim();

  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}-${currentDate.getFullYear()} ${String(
    currentDate.getHours()
  ).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`;

  if (characterName.length >= 2) {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};

    const uniqueKey = `${characterName}-${currentDate.getTime()}`;
    userData[uniqueKey] = {
      characterName: characterName,
      createdDate: `Created: ${formattedDate}`,
      ...variables,
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    successMessage.classList.remove("hidden");
    createCharacterDiv.classList.add("hidden");
    setTimeout(function () {
      successMessage.classList.add("hidden");
    }, 2000);
  } else {
    errorMessage.classList.remove("hidden");
  }
  
checkStorage();  
}


function selectCharacter() {
  console.log("character is selected");
  if (selectedCharacter) {
    characterSelectedMessage.classList.remove("hidden");
    selectionErrorMessage.classList.add("hidden");
    setTimeout(function () {
      characterSelectedMessage.classList.add("hidden");
    }, 2000);
  } else {
    selectionErrorMessage.classList.remove("hidden");
  }
}

function deleteCharacter() {
  console.log("trigger delete character");
  console.log(selectedListItem);

  selectionErrorMessage.classList.add("hidden");
  createCharacterDiv.classList.add("hidden");

  if (selectedCharacter) {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      for (const key in storedUserData) {
        if (storedUserData[key].characterName === selectedCharacter.characterName) {
          delete storedUserData[key];
          break;
        }
      }

      localStorage.setItem("userData", JSON.stringify(storedUserData));
    }

    const characterToRemove = document.getElementById(selectedListItem);
    if (characterToRemove) {
      characterToRemove.remove();
    }
    selectCharacterBtn.classList.add("hidden");
    deleteCharacterBtn.classList.add("hidden");
    storageMessage.classList.add("hidden");
    selectedCharacter = null;

    characterDeletedMessage.classList.remove("hidden");
    setTimeout(function () {
      characterDeletedMessage.classList.add("hidden");
    }, 2000);
  } else {
    selectionErrorMessage.classList.remove("hidden");
  }
  checkStorage();
}
