import { profileVariables } from "../scripts/utils/constants.js";
import Maps from "../scripts/maps.js";
import Character from "./characters/player.js";
import Projectile from "./projectiles/projectiles.js";
import Enemy from "./characters/enemies.js";
export let lastTime = 0;
let gameOver = false;
let deltaTime;

export let enemies = [];

export let currentMap = new Maps(profileVariables.currentMap, enemies);

const canvas = document.getElementById("map-canvas");
const ctx = canvas.getContext("2d");

export const player = new Character(profileVariables.characterName, "true");

let projectiles = [];

let rectCanvas;
let mouseX;
let mouseY;
let newProjectile = new Projectile();

let newEnemy;
let enemySpawnTimer = 5000;

let currentMapStartX = canvas.style.backgroundPositionX;
let currentMapStartY = canvas.style.backgroundPositionY;
let currentMapCurrentX = 0;
let currentMapCurrentY = 0;

let mapOffsetX = 0;
let mapOffsetY = 0;

window.addEventListener("keypress", (event) => {
  if (event.key === "f" && player.isPlayer && player._isAutoFiring === false) {
    startAutoFire();
    player._isAutoFiring = !player._isAutoFiring;
  } else if (
    event.key === "f" &&
    player.isPlayer &&
    player._isAutoFiring === true
  ) {
    stopAutoFire();
    player._isAutoFiring = !player._isAutoFiring;
  }
});

canvas.addEventListener("mousemove", (event) => {
  rectCanvas = canvas.getBoundingClientRect();
  mouseX = event.clientX - rectCanvas.left;
  mouseY = event.clientY - rectCanvas.top;
});

function spawnMap() {
  currentMap.drawToCanvas();
  currentMap.eventHandlers();
}

function spawnEnemies() {
  setInterval(() => {
    const randomX = Math.random() * 3000; // Random x within canvas width
    const randomY = Math.random() * 3000; // Random y within canvas height
    newEnemy = new Enemy("Enemy", false, player.x, player.y, randomX, randomY);
    enemies.push(newEnemy);
    console.log("enemy spawned");
  }, enemySpawnTimer);
  return enemies;
}

function checkEnemyPositions() {}

function updateStats() {}

function mapInformation() {
  currentMapCurrentX = canvas.style.backgroundPositionX - currentMapStartX;
  currentMapCurrentY = canvas.style.backgroundPositionY - currentMapStartY;

  enemies.forEach((enemy) =>
    enemy.offsetMovement(currentMapCurrentX, currentMapCurrentY)
  );
}

function fireProjectile(event) {
  const dx = mouseX - (player.x + player.width / 2);
  const dy = mouseY - (player.y + player.height / 2);
  const angle = Math.atan2(dy, dx);
  const damage = 20;

  const startX = player.x + player.width / 2;
  const startY = player.y;

  newProjectile = new Projectile(startX, startY, angle, damage);
  projectiles.push(newProjectile);

  return projectiles;
}

function startAutoFire() {
  if (!player._isAutoFiring) {
    player._autoFireInterval = setInterval(() => {
      player.firedProjectile = fireProjectile();
    }, player._cooldownTime);
  }
}

function stopAutoFire() {
  if (player._isAutoFiring) {
    clearInterval(player._autoFireInterval);
  }
}

function triggerTickProcesses() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateStats();
  checkEnemyPositions();
  currentMap.drawToCanvas();
  mapInformation();
  player.draw(deltaTime);
  if (projectiles.length > 0) {
    projectiles.forEach((projectile) => projectile.draw());
    projectiles.forEach((projectile) => projectile.update());
  }
  if (enemies.length > 0) {
    enemies.forEach((newEnemy) => newEnemy.spawn());
    enemies.forEach((newEnemy) => newEnemy.update(deltaTime));
    enemies.forEach((newEnemy) => newEnemy.draw());
  }
}

function animate(timeStamp) {
  deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (!gameOver) requestAnimationFrame(animate);
  triggerTickProcesses();
}

function configStart() {
  spawnMap();
  spawnEnemies();
  animate(0);
}

configStart();

// const sharedState = { value: 0 };

// export function updateSharedState(newValue) {
//   sharedState.value = newValue;
//   document.dispatchEvent(new CustomEvent('sharedStateUpdated', { detail: sharedState }));
// }
