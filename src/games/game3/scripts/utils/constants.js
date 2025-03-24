export const canvas = document.getElementById("map-canvas");
export const ctx = canvas.getContext("2d");
export const startingMap = "../game3/images/background.png";

export const playerDiv = document.getElementById(".player-div");

export const healthLabel = document.getElementById("healthLabel");
export const manaLabel = document.getElementById("manaLabel");
export const xpLabel = document.getElementById("xpLabel");
export const displayLevel = document.getElementById("display-level");

export const healthBar = document.getElementById("healthBar");
export const manaBar = document.getElementById("manaBar");
export const xpBar = document.getElementById("xpBar");

export const backgroundWidth = 3000; // Width of the background image
export const backgroundHeight = 3000;

export const itemTypes = [
  "gold",
  "heal",
  "fire-rate",
  "speed" /*
  "other1",
  "other2",
  "other3",
  "other4",
  "other5",
  "other6",*/,
];

export const characterVariables = {
  health: 100, // Maximum health points
  mana: 100,
  attack: 15, // Attack damage
  attackSpeed: 10,
  defense: 10, // Defense points
  speed: 5, // Speed (used for turn order, e.g., who attacks first)
  gold: 0, // Gold the character has
  level: 1, // Character level
  experience: 0, // Experience points
  experienceNext: 100,
  maxHealth: 100, // Max health, can be leveled up
  maxMana: 100,
};

export const profileVariables = {
  accountName: "",
  characterName: "",
  currentMap: {
    mapImage: startingMap,
    mapSizeX: 3000,
    mapSizeY: 3000,
    mapStartX: 0,
    mapStartY: 1500,
    characterSpeed: 4,
  },
};

export const obstacles = {
  obstacleImage: "",
  obstacleSizeX: 0,
  obstacleSizeY: 0,
  obstacleStartX: 0,
  obstacleStartY: 0,
};
