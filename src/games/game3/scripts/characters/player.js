import Projectile from "../projectiles/projectiles.js";
import { enemies } from "../index.js";
import {
  characterVariables,
  healthLabel,
  manaLabel,
  xpLabel,
  displayLevel,
  healthBar,
  manaBar,
  xpBar,
} from "../utils/constants.js";

const canvas = document.getElementById("map-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 900;

export const projectiles = [];

export default class Character {
  constructor(name, isPlayer) {
    this.name = name;
    this.isPlayer = isPlayer;
    this.stats = { ...characterVariables };
    this.image = new Image();
    this.image.src = "../game3/images/raven.png";

    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;

    this._isAutoFiring = false;
    this._singleCallCheck = false;
    this._cooldownTime = 3000 / this.stats.attackSpeed;

    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.width = 100;
    this.height = 100;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;

    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  updateBars() {
    // Update widths
    healthBar.style.width = `${player.stats.health}%`;
    manaBar.style.width = `${player.stats.mana}%`;
    xpBar.style.width = `${player.stats.experience}%`;

    // Update labels
    healthLabel.textContent = `Health: ${player.stats.health}%`;
    manaLabel.textContent = `Mana: ${player.stats.mana}%`;
    xpLabel.textContent = `XP: ${player.stats.experience}%`;
    displayLevel.textContent = `LV: ${player.stats.level}`;
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

  drawHealthBar(x, y) {
    const barWidth = this.width;
    const barHeight = 5;
    const healthRatio = this.stats.health / this.stats.maxHealth;

    // Draw health bar background
    ctx.fillStyle = "red";
    ctx.fillRect(x, y - 10, barWidth, barHeight);

    // Draw health bar foreground (based on health ratio)
    ctx.fillStyle = "green";
    ctx.fillRect(x, y - 10, barWidth * healthRatio, barHeight);

    // Draw a black border around the health bar
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y - 10, barWidth, barHeight);
  }

  gainExperience(amount) {
    this.stats.experience += amount;
    console.log(`${this.name} gains ${amount} experience!`);

    if (this.stats.experience >= 100) {
      this.levelUp();
    }
  }

  levelUp() {
    this.stats.level++;
    this.stats.experience = 0;
    this.stats.maxHealth += 10;
    this.stats.attack += 5;
    this.stats.defense += 2;
    console.log(`${this.name} has leveled up to level ${this.stats.level}!`);
  }

  heal(amount) {
    this.stats.health = Math.min(
      this.stats.maxHealth,
      this.stats.health + amount
    );
    console.log(
      `${this.name} heals for ${amount} health. Current health: ${this.stats.health}/${this.stats.maxHealth}`
    );
  }

  spendGold(amount) {
    if (this.stats.gold >= amount) {
      this.stats.gold -= amount;
      console.log(`${this.name} spends ${amount} gold.`);
    } else {
      console.log(`${this.name} doesn't have enough gold.`);
    }
  }

  takeDamage(amount) {
    this.stats.health -= amount;
    if (this.stats.health <= 0 && this.isPlayer === true) {
      this.stats.health = 0;
      console.log(`${this.name} has been defeated!`);
      alert("Try Again!");
      location.reload();
    } else if (this.stats.health <= 0) {
      this.stats.health = 0;
      console.log(`${this.name} has been defeated!`);
    }
  }

  handleItemCollection(item, index) {
    this.item = item;
    this.index = index;
    droppedItems.forEach((item, index) => {
      if (
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y
      ) {
        item.applyEffect(player); // Apply item effect
        droppedItems.splice(index, 1); // Remove the item after collection
      }
    });
  }
  updateImage(deltaTime) {
    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
      this.timeSinceFlap = 0;
    }
    return this.frame;
  }

  runFunctionsWithDelta(deltaTime) {
    if (this.isPlayer) {
      this.drawHealthBar();
    } else {
    }
    this.updateImage(deltaTime);
    this.drawHealthBar(this.x, this.y);
    //this.updateBars();
  }
}
