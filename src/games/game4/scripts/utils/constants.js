export const startingMap = "../game3/images/background.png";

export const variables = {
  health: 100,
  mana: 100,
  attack: 15,
  attackSpeed: 10,
  defense: 10,
  speed: 5,
  gold: 0,
  level: 1,
  experience: 0,
  experienceNext: 100,
  maxHealth: 100,
  maxMana: 100,
  characterSpeed: 4,
  homeMap: {
    mapImage: startingMap,
    mapSizeX: 3000,
    mapSizeY: 3000,
    mapStartX: 0,
    mapStartY: 1500,
  },
  currentMap: {
    mapImage: startingMap,
    mapSizeX: 3000,
    mapSizeY: 3000,
    mapStartX: 0,
    mapStartY: 1500,
  },
};

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

export const obstacles = {
  obstacleImage: "",
  obstacleSizeX: 0,
  obstacleSizeY: 0,
  obstacleStartX: 0,
  obstacleStartY: 0,
};
