import { player } from "../index.js";
import Projectile from "../projectiles/projectiles.js";

let backgroundOffset = { x: 0, y: 0 };
const backgroundWidth = 3000; // Width of the background image
const backgroundHeight = 3000;

export default class Enemy {
  constructor(name, isPlayer, mapSizeX, mapSizeY, randomX, randomY) {
    this.backgroundOffsetX = 0;
    this.backgroundOffsetY = 0;
    this.mapSizeX = mapSizeX;
    this.mapSizeY = mapSizeY;
    this.velocity = 5; // Random velocity
    this.projectileDelay = Math.random() * 2000 + 1000; // Random firing interval (1-3 seconds)
    this.lastProjectileTime = 0;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.backgroundOffsetX = 0;
    this.backgroundOffsetY = 0;
    this.x = 0;
    this.y = 0;
  }

  draw(deltaTime) {
    if (!this.imageLoaded) {
      return;
    }
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.runFunctionsWithDelta(deltaTime);
  }

  update(deltaTime) {
    if (this.isPlayer === false) {
      this.movement();
    }
    this.runFunctionsWithDelta(deltaTime);
  }

  spawn() {
    // const spawnX = Math.random() * (backgroundWidth - this.width);
    // const spawnY = Math.random() * (backgroundHeight - this.height);
    // this.draw();
    // this.x = spawnX;
    // this.y = spawnY;
  }

  movement(deltaTime) {
    const previousX = this.x;
    const previousY = this.y;
    if (this.isPlayer === false) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
    console.log(this.x, this.y);
    this.runFunctionsWithDelta(deltaTime);
  }

  offsetMovement(mapOffsetX, mapOffsetY) {
    this.backgroundOffsetX = mapOffsetX;
    this.backgroundOffsetY = mapOffsetY;

    this.x = 0 - this.backgroundOffsetX;
    this.y = 0 - this.backgroundOffsetY;
  }

  fireProjectile() {
    const angle = Math.atan2(player.y - this.y, player.x - this.x); // Angle to the player
    const projectile = new Projectile(
      this.x + this.width / 2,
      this.y + this.height / 2,
      angle
    );
    enemyProjectiles.push(projectile); // Add to enemy projectile array
  }

  die() {
    // Chance to drop an item (e.g., 30%)
    if (Math.random() < 0.9) {
      const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
      const item = new Item(
        this.x + this.width / 2,
        this.y + this.height / 2,
        itemType
      );
      droppedItems.push(item);
      console.log(`${itemType} item dropped!`);
    }
    console.log(`${this.name} has been defeated.`);
  }

  handleCollisions(player) {
    // Change direction if the enemy reaches the edge of the canvas
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.stats.speedX *= -1; // Reverse horizontal direction
      this.x = Math.max(0, Math.min(this.x, canvas.width - this.width)); // Clamp position
    }

    if (this.y <= 0 || this.y + this.height >= canvas.height) {
      this.stats.speedY *= -1; // Reverse vertical direction
      this.y = Math.max(0, Math.min(this.y, canvas.height - this.height)); // Clamp position
    }

    // Check for collision with the player
    if (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    ) {
      this.stats.speedX = 0; // Stop horizontal movement
      this.stats.speedY = 0; // Stop vertical movement
    }
  }

  /*chasePlayer (){
    enemy.direction.x = Math.sign(playerPosition.x - enemy.x);
    enemy.direction.y = Math.sign(playerPosition.y - enemy.y);}*/
}
